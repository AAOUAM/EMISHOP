import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterModule, RouterOutlet} from '@angular/router';
import {ListproduitComponent} from "./listproduit/listproduit.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {DetailProductComponent} from "./detail-product/detail-product.component";
import {NgIf} from "@angular/common";
import {ProductService} from "./Services/product.service";
import {Product} from "./Models/product";
import {LignePanier} from "./Models/LignePanier";
import {routes} from "./app.routes";
import {AuthService} from "./Services/auth.service";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ FormsModule , RouterModule, RouterOutlet, ListproduitComponent, NavbarComponent, DetailProductComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'EMISHOP';
  afficherNavbar: boolean = true;

  products: Array<any> = [];
  constructor(private router: Router ,private service: ProductService , protected Auth : AuthService) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Masquer le Navbar sur les routes d'authentification
        if (event.url === '/inscription' || event.url === '/Auth') {
          this.afficherNavbar = false;
        } else {
          this.afficherNavbar = true;
        }
      }
    });
  }

}
