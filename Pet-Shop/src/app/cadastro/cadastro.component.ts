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
    console.log(this.Detalhes[0].racaDetalhe);
    console.log(this.Detalhes[0].pelPlumDetalhe);
    this.racaSelecionada = this.Detalhes[0].racaDetalhe;
    this.pelPlumSelecionada = this.Detalhes[0].pelPlumDetalhe;
  }

  limpaCombosDetalhes() {
    this.racaSelecionada = [];
    this.pelPlumSelecionada = [];
  }
  
  public cadastrarAnimal(addForm: NgForm) :void{
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

  editarAnimal(){
    alert("Edita Registro ");
  }

  removerAnimal(){
    alert("Remove Registro ");
  }
}
