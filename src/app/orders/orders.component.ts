import { Component, OnInit } from '@angular/core';
import {AsyncPipe, CurrencyPipe, DatePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommandeService } from '../Services/commande.service';
import { Commande } from '../Models/Commande';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timestamp } from '@angular/fire/firestore'; // Import Firestore Timestamp for date conversion

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule,
    NgForOf,
    NgOptimizedImage,
    AsyncPipe,
    NgIf,
    DatePipe,
  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  commandes!: Observable<Commande[]>;
  total$!: Observable<number>;

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.commandes = this.commandeService.getAllOrders().pipe(
      map((documents) =>
        documents.map((doc) => {
          // Cast the DocumentData to Commande and handle date conversion
          const commande = doc as Commande;
          return {
            ...commande,
            dateCommande: commande.dateCommande instanceof Timestamp
              ? commande.dateCommande.toDate()
              : commande.dateCommande
          };
        })
      )
    );

    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total$ = this.commandes.pipe(
      map(commandes =>
        commandes.reduce((total, commande) =>
          total + (commande.detail ? commande.detail.reduce((subTotal, item) =>
            subTotal + ((item.produit?.price || 0) * (item.quantite || 0)), 0) : 0), 0)
      )
    );
  }
}
