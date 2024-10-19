import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {ListproduitComponent} from "./listproduit/listproduit.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {DetailProductComponent} from "./detail-product/detail-product.component";
import {NgIf} from "@angular/common";
import {ProductService} from "./Services/product.service";
import {Product} from "./Models/product";
import {LignePanier} from "./Models/LignePanier";
import {routes} from "./app.routes";
import {AuthService} from "./Services/auth.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule, RouterOutlet, ListproduitComponent, NavbarComponent, DetailProductComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EMISHOP';

  products: Array<any> = [];
  constructor(private service: ProductService , protected Auth : AuthService) {
  }

}
