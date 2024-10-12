import { Routes } from '@angular/router';
import {PanierComponent} from "./panier/panier.component";
import {ListproduitComponent} from "./listproduit/listproduit.component";

export const routes: Routes = [
  { path: 'Panier', component: PanierComponent },
  { path: 'home', component: ListproduitComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
