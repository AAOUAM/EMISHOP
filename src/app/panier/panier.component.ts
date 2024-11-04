import {Component, Input, OnInit} from '@angular/core';
import {LignePanier} from "../Models/LignePanier";
import {NavbarComponent} from "../navbar/navbar.component";
import {Product} from "../Models/product";
import {FormsModule} from "@angular/forms";
import {CurrencyPipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {PanierService} from "../Services/panier.service";
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";
import {Router, RouterLink} from "@angular/router";
import {CommandeService} from "../Services/commande.service";
import {AuthService} from "../Services/auth.service";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { AngularFireModule } from '@angular/fire/compat';
import {Commande} from "../Models/Commande";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-panier',
  standalone: true,
  templateUrl: './panier.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgOptimizedImage,
    CurrencyPipe,
    RouterLink,
    AngularFirestoreModule,

  ],
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit {
  Panier: LignePanier[] = [];
  totalPrice: number = 0;
  Quantity : number = 0 ;

  constructor(private router : Router , private PanierService: PanierService , private CommandeService : CommandeService , private AuthService : AuthService) {
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

  async Commander() {
    const userId = await this.AuthService.getIdUser(); // Attendre l'ID utilisateur
    if (!userId) {
      console.error('User ID is not available. Cannot proceed with the order.');
      return; // Sortir si l'ID utilisateur n'est pas disponible
    }
    const montant = this.totalPrice;
    const details = this.Panier;
    const date = new Date;
    const commande = new Commande(userId, date, details, montant);
    // Add the order to Firestore
    this.CommandeService.addCommande(commande);
    this.router.navigate(['/Orders']);
  }

}
