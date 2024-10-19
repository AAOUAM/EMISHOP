import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LignePanier } from '../Models/LignePanier'; // Mettez à jour le chemin si nécessaire
import { Product } from '../Models/product'; // Mettez à jour le chemin si nécessaire

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private productCartSubject = new BehaviorSubject<LignePanier[]>([]); // Utilisation de BehaviorSubject
  // A verifier apres !!!!!!!!!!!!!!!!!!!!!!!!
  constructor() {}


  addToCart(product: Product): void {
    const currentCart = this.productCartSubject.getValue();
    const foundProduct = currentCart.find(item => item.produit.id === product.id);

    if (foundProduct) {
      foundProduct.quantite++;
    } else {
      currentCart.push({ produit: product, quantite: 1 });
    }

    this.productCartSubject.next(currentCart);
    console.log('Product added to cart:', currentCart);
  }

  getCart() {
    return this.productCartSubject.asObservable();
  }


  increaseQte(product: Product): void {
    const currentCart = this.productCartSubject.getValue();
    const foundProduct = currentCart.find(item => item.produit.id === product.id);

    if (foundProduct) {
      foundProduct.quantite++; // Augmenter la quantité
    }

    this.productCartSubject.next(currentCart);
  }

  decreaseQte(product: Product): void {
    const currentCart = this.productCartSubject.getValue();
    const foundProduct = currentCart.find(item => item.produit.id === product.id);

    if (foundProduct) {
      if (foundProduct.quantite === 1) {
        this.removeProductFromCart(product); // Si la quantité est 1, on retire le produit du panier
      } else {
        foundProduct.quantite--; // Sinon, on diminue la quantité
        this.productCartSubject.next(currentCart); // Mettre à jour le panier
      }
    }
  }

  // Retirer un produit du panier
  removeProductFromCart(product: Product): void {
    let currentCart = this.productCartSubject.getValue();
    currentCart = currentCart.filter(item => item.produit.id !== product.id); // Filtrer pour supprimer le produit
    this.productCartSubject.next(currentCart); // Notifier les abonnés
  }

  // Calculer le prix total du panier
  getTotalPrice(): number {
    const currentCart = this.productCartSubject.getValue();
    return currentCart.reduce((total, item) => total + (item.quantite * item.produit.price), 0); // Calculer le total
  }

  // Calculer la quantité totale des produits dans le panier
  getTotalQuantite(): number {
    const currentCart = this.productCartSubject.getValue();
    return currentCart.reduce((total, item) => total + item.quantite, 0); // Calculer la quantité totale
  }

  // Mettre à jour le panier, par exemple pour s'assurer que les quantités ne sont pas inférieures à 1
  updateCart(): void {
    const currentCart = this.productCartSubject.getValue(); // Récupérer le panier actuel

    // Mettre à jour les quantités dans le panier si nécessaire
    const updatedCart = currentCart.map(item => {
      if (item.quantite < 1) {
        item.quantite = 1; // S'assurer que la quantité soit au minimum de 1
      }
      return item;
    });

    this.productCartSubject.next(updatedCart); // Mettre à jour et notifier les abonnés du changement
  }

}
