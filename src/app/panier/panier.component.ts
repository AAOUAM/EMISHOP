import {Component, Input} from '@angular/core';
import {LignePanier} from "../Models/LignePanier";
import {NavbarComponent} from "../navbar/navbar.component";
import {Product} from "../Models/product";
import {FormsModule} from "@angular/forms";
import {CurrencyPipe, NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-panier',
  standalone: true,
  templateUrl: './panier.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgOptimizedImage,
    CurrencyPipe
  ],
  styleUrl: './panier.component.css'
})
export class PanierComponent {
  @Input() LignesPanier: LignePanier[] = [];

  get totalPrice(): number {
    return this.LignesPanier.reduce((acc, item) => acc + (item.quantite * item.produit.price), 0);
  }

  getTotalQuantite(): number {
    return this.LignesPanier.reduce((total, item) => total + item.quantite, 0);
  }

  removeFromCart(product: Product) {
    this.LignesPanier = this.LignesPanier.filter(p => p.produit.id !== product.id);
  }


  updateCart() {
    // Cette méthode est appelée lors d'un changement de quantité
    this.LignesPanier = this.LignesPanier.map(item => {
      // S'assurer que la quantité ne soit pas inférieure à 1
      if (item.quantite < 1) {
        item.quantite = 1;
      }
      return item;
    });
  }
}
