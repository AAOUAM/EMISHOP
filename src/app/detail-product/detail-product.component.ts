import {Component, Input} from '@angular/core';
import {CurrencyPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Product} from "../Models/product";

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent {
  @Input() ProductAdetaile! : Product ;
  protected readonly indexedDB = indexedDB;
}
