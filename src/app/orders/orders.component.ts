import { Component, OnInit } from '@angular/core';
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommandeService } from '../Services/commande.service';
import { Commande } from '../Models/Commande';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'], // Fixed 'styleUrl' to 'styleUrls'
})
export class OrdersComponent implements OnInit {
  commandes$!: Observable<Commande[]>;
  total$!: Observable<number>; // New observable for total

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.commandes$ = this.commandeService.getAllCommandes();
    this.calculateTotal();
  }

  calculateTotal(): any {
    this.total$ = this.commandes$.pipe(
      map(commandes => {
        return commandes.reduce((total, commande) => {
          return total + commande.detail.reduce((subTotal, item) => {
            return subTotal + (item.produit.price * item.quantite);
          }, 0);
        }, 0);
      })
    );
  }
}
