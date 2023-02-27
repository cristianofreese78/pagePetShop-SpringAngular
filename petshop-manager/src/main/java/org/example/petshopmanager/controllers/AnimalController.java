package org.example.petshopmanager.controllers;

import org.example.petshopmanager.dtos.AnimalDTO;
import org.example.petshopmanager.services.AnimalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/animal")
public class AnimalController {
    public AnimalService animalService;

    public AnimalController(AnimalService animalService){
        this.animalService = animalService;
    }

    @PostMapping("/statuslogado")
    public String statuslogado() throws InterruptedException, ExecutionException {
        return animalService.statuslogado();
    }

    @PostMapping("/")
    public String createAnimal(@RequestBody AnimalDTO animalDTO) throws InterruptedException, ExecutionException {
        return animalService.createAnimal(animalDTO);
    }

    @GetMapping("/")
    public List<AnimalDTO> getAnimais() throws ExecutionException, InterruptedException {
        return animalService.getAnimais();
    }

    @GetMapping("/{id}")
    public AnimalDTO getAnimal(@PathVariable (value = "id") String id) throws InterruptedException, ExecutionException {
        return animalService.getAnimal(id);
    }

    @PutMapping("/{id}")
    public String updateAnimal(@PathVariable(value = "id") String id,
                              @RequestBody AnimalDTO animalDTO) throws InterruptedException, ExecutionException {
        return animalService.updateAnimal(id, animalDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteAnimal(@PathVariable (value = "id") String id) throws InterruptedException, ExecutionException {
        return animalService.deleteAnimal(id);
    }
}
