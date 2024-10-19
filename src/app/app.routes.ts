import { Routes } from '@angular/router';
import {PanierComponent} from "./panier/panier.component";
import {ListproduitComponent} from "./listproduit/listproduit.component";
import {ProductItemsComponent} from "./product-items/product-items.component";
import {AuthComponent} from "./auth/auth.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {DetailProductComponent} from "./detail-product/detail-product.component";
import {OrdersComponent} from "./orders/orders.component";

export const routes: Routes = [
  { path: 'Panier', component: PanierComponent },
  { path: 'Listproduit', component: ListproduitComponent },
  { path: 'DetailProduct', component: DetailProductComponent },
  { path: 'ProductItems', component: ProductItemsComponent },
  { path: 'Auth', component: AuthComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'Orders', component: OrdersComponent , canActivate : [] },
  {
    path: '',
    redirectTo: 'Listproduit',
    pathMatch: 'full'
  }
];
