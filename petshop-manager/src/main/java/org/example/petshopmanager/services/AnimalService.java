package org.example.petshopmanager.services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.example.petshopmanager.dtos.AnimalDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class AnimalService {

    public String statuslogado() throws InterruptedException, ExecutionException {
        return "Olá vc está logado";
    }

    public String createAnimal(AnimalDTO animalDTO) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        CollectionReference animais = dbFirestore.collection("bdAnimais");
        Query query = animais.whereEqualTo("nome", animalDTO.getNome());
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        if(querySnapshot.get().isEmpty()){
            //animalDTO.setDataRegistro(Timestamp.now());
            ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("bdAnimais").document().set(animalDTO);
            return "Registro concluido: " + collectionsApiFuture.get().getUpdateTime().toString();
        }
        return "Registro já existe";
    }

    public List<AnimalDTO> getAnimais() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection("bdAnimais").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<AnimalDTO> listaAnimalDTO = new ArrayList<AnimalDTO>();
        if (!documents.isEmpty()) {
            for (QueryDocumentSnapshot document : documents) {
                AnimalDTO animalDTO = document.toObject(AnimalDTO.class);
                animalDTO.setId(document.getId());
                listaAnimalDTO.add(animalDTO);
            }
            return listaAnimalDTO;
        }
        return null;
    }

    public AnimalDTO getAnimal(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("bdAnimais").document(id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        AnimalDTO animalDTO;
        if (document.exists()) {
            animalDTO = document.toObject(AnimalDTO.class);
            animalDTO.setId(document.getId());
            return animalDTO;
        }
        return null;
    }

    public String updateAnimal(String id, AnimalDTO animalDTO) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("bdAnimais").document(id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            animalDTO.setId(document.toObject(AnimalDTO.class).getId());
            ApiFuture<WriteResult> collectionsApiFuture = documentReference.set(animalDTO);
            return "Registro atualizado: " + collectionsApiFuture.get().getUpdateTime().toString();
        }
        return "Registro inexistente";
    }

    public String deleteAnimal(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("bdAnimais").document(id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            ApiFuture<WriteResult> writeResult = documentReference.delete();
            return "Registro removido: " + id;
        }
        return "Registro inexistente";
    }
}