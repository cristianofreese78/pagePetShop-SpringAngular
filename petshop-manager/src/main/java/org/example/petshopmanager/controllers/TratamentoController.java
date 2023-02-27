package org.example.petshopmanager.controllers;

import org.example.petshopmanager.dtos.TratamentoDTO;
import org.example.petshopmanager.services.TratamentoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/tratamento")
public class TratamentoController {
    public TratamentoService tratamentoService;

    public TratamentoController(TratamentoService tratamentoService){
        this.tratamentoService = tratamentoService;
    }

    @GetMapping("/")
    public List<TratamentoDTO> getTratamentos() throws ExecutionException, InterruptedException {
        return tratamentoService.getTratamentos();
    }
}
