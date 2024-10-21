import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LignePanier } from '../Models/LignePanier';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private PanierSubject = new BehaviorSubject<LignePanier[]>([]);
  //subject ne fonctionne pas ici , on a utilisé subject behavior
  constructor() {}


  addToCart(product: Product): void {
    const monpanier = this.PanierSubject.getValue();
    const Product = monpanier.find(item => item.produit.id === product.id);
    if (Product) {
      Product.quantite++;
    } else {
      monpanier.push({ produit: product, quantite: 1 });
    }

    this.PanierSubject.next(monpanier);
  }

  panier() {
    return this.PanierSubject.asObservable();
  }


  Supprimerproduit(product: Product): void {
    let currentCart = this.PanierSubject.getValue();
    currentCart = currentCart.filter(item => item.produit.id !== product.id);
    this.PanierSubject.next(currentCart);
  }


  TotalQuantite(): number {
    const currentCart = this.PanierSubject.getValue();
    return currentCart.reduce((total, item) => total + item.quantite, 0);
  }


  updatepanier(): void {
    const currentCart = this.PanierSubject.getValue();
    const updatedCart = currentCart.map(item => {
      if (item.quantite < 1) {
        item.quantite = 1; // S'assurer que la quantité soit au minimum de 1
      }
      return item;
    });

    this.PanierSubject.next(updatedCart);
  }

}
