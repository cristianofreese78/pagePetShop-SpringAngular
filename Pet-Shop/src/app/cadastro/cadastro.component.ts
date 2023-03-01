import { HttpErrorResponse  } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IAnimal } from 'src/animal';
import { IDetalheAnimal } from 'src/detalhesAnimal';
import { ITratamento } from 'src/tratamento';
import { CadastroService } from '../cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {
  public animais: IAnimal[] = [];
  public tratamentos: ITratamento[] = [];
  public detalhesAnimal: IDetalheAnimal[] = [];  
  //public animalForm: IAnimal | null | undefined;
  modoForm =  "Enviar";
    
  especieSelecionada = '';
  racaSelecionada: String[] = [];
  pelPlumSelecionada: String[] = [];
  Detalhes: IDetalheAnimal[] =[];  
 
  constructor (private cadastroService: CadastroService){}

  ngOnInit(): void {
    this.listarTratamentos();
    this.listarAnimais();
    this.listarDetalhes(); 
  }

  public listarTratamentos(): void{    
    this.cadastroService.obtemTratamentos().subscribe(
      (response: ITratamento[]) => {
        this.tratamentos = response;     
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public listarAnimais(): void{   
    this.modoForm = "Enviar";     
    this.cadastroService.obtemAnimais().subscribe(
      (response: IAnimal[]) => {
        this.animais = response;        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );    
  }

  public listarDetalhes(): void{    
    this.cadastroService.obtemDetalhes().subscribe(
      (response: IDetalheAnimal[]) => {
        this.detalhesAnimal = response;       
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  carregaCombosDetalhes(value:string): void {
    this.especieSelecionada = value;
    this.Detalhes = this.detalhesAnimal.filter(detalhes => (detalhes.especieDetalhe == this.especieSelecionada));
    this.racaSelecionada = this.Detalhes[0].racaDetalhe;
    this.pelPlumSelecionada = this.Detalhes[0].pelPlumDetalhe;
  }

  limpaCombosDetalhes() {
    this.racaSelecionada = [];
    this.pelPlumSelecionada = [];
  }

  public enviaForm(Form: NgForm) {
    if (this.modoForm == 'Enviar') {
      this.cadastrarAnimal(Form);
    }
    else if (this.modoForm == 'Editar'){
      this.atualizarAnimal(Form);
    }
  }
  
  public cadastrarAnimal(addForm: NgForm) :void{
    //delete addForm.value.id;
    this.cadastroService.adicionarAnimal(addForm.value).subscribe(
      (response: IAnimal) =>{
        this.listarAnimais(); 
        addForm.reset();         
      },
      (error: HttpErrorResponse)=>{
        if (error.status == 200 && error.statusText == "OK") {
          this.listarAnimais();
          addForm.reset();          
        }
        else {alert(error.message); addForm.reset();}                    
      }        
    )      
  } 
  
  public atualizarAnimal(upForm: NgForm) : void{
    this.cadastroService.editarAnimal(upForm.value).subscribe(
      (response: IAnimal) =>{
        this.listarAnimais(); 
        upForm.reset();         
      },
      (error: HttpErrorResponse)=>{
        if (error.status == 200 && error.statusText == "OK") {
          this.listarAnimais();
          upForm.reset();          
        }
        else {alert(error.message); upForm.reset();}                    
      }        
    )    
  }

  carregaAnimal(upForm: NgForm, idAnimal: String | undefined) :void{
    const registroAux = this.animais.filter(regAnimais => (regAnimais.id == idAnimal));
    upForm.controls['nome'].setValue(registroAux[0].nome);
    upForm.controls['especie'].setValue(registroAux[0].especie);
    upForm.controls['peso'].setValue(registroAux[0].peso);
    upForm.controls['altura'].setValue(registroAux[0].altura);
    upForm.controls['raca'].setValue(registroAux[0].raca);
    upForm.controls['tipoPelPlum'].setValue(registroAux[0].tipoPelPlum);
    upForm.controls['tratamento'].setValue(registroAux[0].tratamento);  

    this.carregaCombosDetalhes(registroAux[0].especie);
    this.modoForm = "Editar";
  }

  public removerAnimal(rmForm: NgForm, idAnimal: String | undefined) :void{
    this.cadastroService.removeAnimal(idAnimal).subscribe(
      (response: void) =>{
        alert("Registro removido");  
        this.listarAnimais();       
      },
      (error: HttpErrorResponse)=>{
        if (error.status == 200 && error.statusText == "OK") {
          alert("Registro removido"); 
          this.listarAnimais();                
        }
        else {
          alert(error.message);
          this.listarAnimais();
        } 
      }      
    )
    rmForm.reset();    
  }
}
