package org.example.petshopmanager.controllers;

import org.example.petshopmanager.dtos.DetalheAnimalDTO;
import org.example.petshopmanager.services.DetalheAnimalService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/detalheAnimal")
public class DetalheAnimalController {
    public DetalheAnimalService detalheAnimalService;

    public DetalheAnimalController(DetalheAnimalService detalheAnimalService){
        this.detalheAnimalService = detalheAnimalService;
    }

    @GetMapping("/")
    public List<DetalheAnimalDTO> getDetalhesAnimal() throws ExecutionException, InterruptedException {
        return detalheAnimalService.getDetalhesAnimal();
    }
}
