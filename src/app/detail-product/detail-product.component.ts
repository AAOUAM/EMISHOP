import {Component, Input, OnInit} from '@angular/core';
import {CurrencyPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Product} from "../Models/product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../Services/product.service";
import {PanierService} from "../Services/panier.service";

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
export class DetailProductComponent implements OnInit{
  ProductAdetaile! : Product ;

  constructor(private route : ActivatedRoute , private service : ProductService , private panier : PanierService) {
  }

  ngOnInit(): void {
    const id : any = this.route.snapshot.params['id'];

    this.service.getProductById(id).subscribe(
      (response : any) => {
        this.ProductAdetaile = response;
      },
      (err) => {
        console.log('Error', err);
      }
    );
  }

  clickUser() {
    this.panier.addToCart(this.ProductAdetaile )
  }
}
