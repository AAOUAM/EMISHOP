import { Injectable } from '@angular/core';
import {LignePanier} from "../Models/LignePanier";
import {Product} from "../Models/product";

@Injectable({
  providedIn: 'root'
})
export class PanierService {


  detailPanier: LignePanier[] = [];

  displayPanier:boolean = false;
  showPanier(e:boolean){
    this.displayPanier = e;
  }

  AddToPanier(p : Product) {
    let produitExistant = this.detailPanier.find(item => item.produit.id === p.id) ;
    if (!produitExistant) {
      let newLignePanier : LignePanier = new LignePanier(p, 1) ;
      this.detailPanier.push(newLignePanier);
    }
    else {
      produitExistant.quantite++;
    }
  }

  constructor() { }
}
