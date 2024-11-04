import { Injectable } from '@angular/core';
import { FirestoreModule , Firestore,collection,addDoc,collectionData,doc,getDoc,deleteDoc , updateDoc } from '@angular/fire/firestore';
import {Commande} from "../Models/Commande";
import {LignePanier} from "../Models/LignePanier";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private fireStore : Firestore) {}

   addCommande( commande : Commande){
      const collectionInstance = collection(this.fireStore , 'orders');
      // Convert Commande to plain object !!! l'erreur que j ai rencontré
      addDoc(collectionInstance , { ...commande })
        .then(()=> alert('Successfully added !!'))
        .catch(error => console.log('Error adding document:' , error));
   }


  getAllCommandes(): Observable<Commande[]> {
    const collectionInstance = collection(this.fireStore, 'orders');
    return collectionData(collectionInstance, { idField: 'id' }).pipe(
      map(data => data.map(doc => {
        const { userId, dateCommande, detail, montant } = doc;
        return new Commande(userId, dateCommande.toDate(), detail, montant); // Assurez-vous que dateCommande est converti en objet Date
      }))
    );
  }

  getOrderId(id:string){
    const collectionInstance = collection(this.fireStore,'orders')

    const docinstance = doc(this.fireStore,'orders',id)

    return getDoc(docinstance)


  }

  updateOrder(id:string){
    const docinstance = doc(this.fireStore,'products',id)
    const updatedOrder : any= {name : "updated name", montant : 1000}
    updateDoc(docinstance,updatedOrder)
      .then(()=>console.log(`Order with ${id} updated successfully ! `))
      .catch(error=>console.log(error))
  }

  deleteOrder(id:string){
    const docinstance = doc(this.fireStore,'orders',id)
    deleteDoc(docinstance)
      .then(()=>console.log('data deleted !'))
      .catch(error=>console.log(error))
  }
}
