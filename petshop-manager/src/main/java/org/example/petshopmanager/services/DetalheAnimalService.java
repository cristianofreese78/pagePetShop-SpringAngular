package org.example.petshopmanager.services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.example.petshopmanager.dtos.DetalheAnimalDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class DetalheAnimalService {

   public List<DetalheAnimalDTO> getDetalhesAnimal() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection("bdDetalhesAnimais").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<DetalheAnimalDTO> listaDetalheAnimalDTO = new ArrayList<DetalheAnimalDTO>();
        if (!documents.isEmpty()) {
            for (QueryDocumentSnapshot document : documents) {
                DetalheAnimalDTO detalheAnimalDTO = document.toObject(DetalheAnimalDTO.class);
                document.toObject(DetalheAnimalDTO.class).getRacaDetalhe();
                detalheAnimalDTO.setId(document.getId());
                listaDetalheAnimalDTO.add(detalheAnimalDTO);
            }
            return listaDetalheAnimalDTO;
        }
        return null;
   }
}