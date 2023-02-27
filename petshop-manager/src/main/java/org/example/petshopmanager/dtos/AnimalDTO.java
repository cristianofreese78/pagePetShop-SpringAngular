package org.example.petshopmanager.dtos;

import lombok.Data;

@Data
public class AnimalDTO {
    private String id;
    private String nome;
    private String especie;
    private String peso;
    private String raca;
    private String altura;
    private String tipoPelPlum;
    private String tratamento;
}
