import { Injectable } from '@angular/core';
import { ITratamento } from 'src/tratamento';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IAnimal } from 'src/animal';
import { IDetalheAnimal } from 'src/detalhesAnimal';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public obtemTratamentos(): Observable<ITratamento[]> {
    return this.http.get<ITratamento[]>(`${this.apiServerUrl}/tratamento/`);
  }

  public obtemAnimais(): Observable<IAnimal[]> {
    return this.http.get<IAnimal[]>(`${this.apiServerUrl}/animal/`);
  }

  public obtemDetalhes(): Observable<IDetalheAnimal[]> {
    return this.http.get<IDetalheAnimal[]>(`${this.apiServerUrl}/detalheAnimal/`);
  }

  public adicionarAnimal(animal: IAnimal): Observable<IAnimal> {
    return this.http.post<IAnimal>(`${this.apiServerUrl}/animal/`, animal);  
  }  
}
