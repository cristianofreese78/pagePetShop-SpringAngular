package org.example.petshopmanager.dtos;


import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DetalheAnimalDTO {
    private String id;
    private String especieDetalhe;
    private ArrayList<String> pelPlumDetalhe;
    private ArrayList<String> racaDetalhe;
}
