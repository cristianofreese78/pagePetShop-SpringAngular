import { Component } from '@angular/core';
import { animais, IAnimal } from 'src/animal';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  animais: IAnimal[] = animais;
  
  cadastrarAnimal(){
    alert("Cria Registro");
  }

  editarAnimal(animalId: string){
    alert("Edita Registro " + animalId);
  }

  removerAnimal(animalId: String){
    alert("Remove Registro " + animalId);
  }

}
