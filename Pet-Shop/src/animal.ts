export interface IAnimal {
    id: string;
    nome: string;
    especie: string;
    peso: string;
    altura: string;
    raca: string;
    tipoPelPlum: string;
    tratamento: string;}

export const animais: IAnimal[] = [
    { id: "PddAGsTm6ZymDaLuLO9o",  nome: "Lilica", especie: "Cachorro", peso: "20", altura:"40", raca: "SRD",  tipoPelPlum:"Curto", tratamento: "Vacina"},
    { id: "TuBO0JaCJcvEigjkLo0s",  nome: "Tico", especie: "Pássaro", peso: "0.15", altura:"25", raca: "Calopsita",  tipoPelPlum:"Média", tratamento: "Consulta"},
    { id: "VUOAo5LsyDdsFWEgZWuL",  nome: "Roger", especie: "Roedor", peso: "0.12", altura:"12", raca: "Hammster",  tipoPelPlum:"Macio", tratamento: "Antibiótico"}    
]