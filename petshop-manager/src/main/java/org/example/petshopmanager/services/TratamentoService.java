package org.example.petshopmanager.services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.example.petshopmanager.dtos.TratamentoDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class TratamentoService {

   public List<TratamentoDTO> getTratamentos() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection("bdtratamentos").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<TratamentoDTO> listaTratamentoDTO = new ArrayList<TratamentoDTO>();
        if (!documents.isEmpty()) {
            for (QueryDocumentSnapshot document : documents) {
                TratamentoDTO tratamentoDTO = document.toObject(TratamentoDTO.class);
                tratamentoDTO.setId(document.getId());
                listaTratamentoDTO.add(tratamentoDTO);
            }
            return listaTratamentoDTO;
        }
        return null;
   }
}