import {Component, Input, OnInit} from '@angular/core';
import {LignePanier} from "../Models/LignePanier";
import {NavbarComponent} from "../navbar/navbar.component";
import {Product} from "../Models/product";
import {FormsModule} from "@angular/forms";
import {CurrencyPipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {PanierService} from "../Services/panier.service";
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";

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
export class PanierComponent implements OnInit {
  Panier: LignePanier[] = [];
  totalPrice: number = 0;
  Quantity : number = 0 ;

  constructor(private PanierService: PanierService) {
  }

  ngOnInit() {
    this.PanierService.panier().subscribe(
      data => {
        this.Panier = data;
      });
    this.updatepanier()
  }

  removeFromCart(product: Product): void {
    this.PanierService.Supprimerproduit(product);
    this.updatepanier();
  }

  private calculateTotalPrice(panier: LignePanier[]): void {
    this.totalPrice = panier.reduce((total, item) => total + (item.quantite * item.produit.price), 0);
  }

  updatepanier(): void {
    this.PanierService.updatepanier();
    this.calculateTotalPrice(this.Panier);
    this.getTotalQuantite();
  }

  getTotalQuantite(){
    this.Quantity = this.PanierService.TotalQuantite();
  }
}
