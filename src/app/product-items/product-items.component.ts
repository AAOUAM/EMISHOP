import {Component, EventEmitter, Input, input, Output} from '@angular/core';
import {Product} from "../Models/product";
import {NgForOf, NgStyle , NgIf} from "@angular/common";

@Component({
  selector: 'app-product-items',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle ,
    NgIf
  ],
  templateUrl: './product-items.component.html',
  styleUrl: './product-items.component.css'
})
export class ProductItemsComponent {
  @Input() product!: Product;
  @Output() SelectedProduct = new EventEmitter<Product>();
  @Output() TheProduct : EventEmitter<Product> = new EventEmitter<Product>();


  clickUser() {
    this.SelectedProduct.emit(this.product)
  }

  getColor(){
      if (this.getStatut() == "En Stock"){
        return "green"
      }
      else {
        return "red"
      }
  }

  getStatut(){
    if (this.product.stock > 0){
      return "En Stock"
    }
    else{
      return "En rupture de Stock"
    }
  }


  ProductSelected() {
    this.TheProduct.emit(this.product)
  }
}
