import { Routes } from '@angular/router';
import {PanierComponent} from "./panier/panier.component";
import {ListproduitComponent} from "./listproduit/listproduit.component";
import {ProductItemsComponent} from "./product-items/product-items.component";
import {AuthComponent} from "./auth/auth.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {DetailProductComponent} from "./detail-product/detail-product.component";
import {OrdersComponent} from "./orders/orders.component";
import {AuthGuardService} from "./Services/auth-guard.service";
import {InscriptionComponent} from "./inscription/inscription.component";

export const routes: Routes = [
  { path: 'Panier', component: PanierComponent },
  { path: 'Listproduit', component: ListproduitComponent },
  { path: 'Produit/:id', component: DetailProductComponent },
  { path: 'ProductItems', component: ProductItemsComponent },
  { path: 'Auth', component: AuthComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'Orders', component: OrdersComponent , canActivate : [AuthGuardService] },
  {
    path: '',
    redirectTo: 'Listproduit',
    pathMatch: 'full'
  }
];
