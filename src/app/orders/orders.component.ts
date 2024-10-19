import { Component } from '@angular/core';
import {CurrencyPipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-orders',
  standalone: true,
    imports: [
        CurrencyPipe,
        FormsModule,
        NgForOf,
        NgOptimizedImage
    ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

}
