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

  carregaCombosEspecie(){
    alert('blur');
  }
  
  public cadastrarAnimal(addForm: NgForm) :void{
    alert("Cria Registro");
    //document.getElementById('add-employee-form')?.click();

      this.cadastroService.adicionarAnimal(addForm.value).subscribe(
        (response: IAnimal) =>{
          console.log(response);
          this.listarAnimais();
          addForm.reset();
        },
        (error: HttpErrorResponse)=>{
          alert(error.message)
        }
      )
  }
  

  editarAnimal(animalId: string){
    alert("Edita Registro " + animalId);
  }

  removerAnimal(animalId: String){
    alert("Remove Registro " + animalId);
  }

}
