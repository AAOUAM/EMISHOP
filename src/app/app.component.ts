import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ListproduitComponent} from "./listproduit/listproduit.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {DetailProductComponent} from "./detail-product/detail-product.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListproduitComponent, NavbarComponent, DetailProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EMISHOP';

}
