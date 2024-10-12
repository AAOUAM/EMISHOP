import {Component, OnInit} from '@angular/core';
import {Product} from "../Models/product";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ProductItemsComponent} from "../product-items/product-items.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {LignePanier} from "../Models/LignePanier";
import {PanierComponent} from "../panier/panier.component";
import {ProductService} from "../Services/product.service";
import {DetailProductComponent} from "../detail-product/detail-product.component";



@Component({
  selector: 'app-listproduit',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    ProductItemsComponent,
    NavbarComponent,
    PanierComponent,
    NgIf,
    DetailProductComponent

  ],
  templateUrl: './listproduit.component.html',
  styleUrl: './listproduit.component.css'
})
export class ListproduitComponent implements OnInit{

  products: Array<any> = [];


  constructor(private service: ProductService) {}

  ngOnInit() {
    this.service.getAllProducts().subscribe(
      (response : any)=>{
        this.products =  response.products
    }
    )

  }


  detailPanier: LignePanier[] = [];

  ProductAdetail! : Product ;

  displayPanier:boolean = false;
  displayDetailProduct:boolean = false;
  showPanier(e:boolean){
    this.displayPanier = e;
  }

  AddToPanier(p : Product) {
    let produitExistant = this.detailPanier.find(item => item.produit.id === p.id) ;
    if (!produitExistant) {
      let newLignePanier : LignePanier = new LignePanier(p, 1) ;
      this.detailPanier.push(newLignePanier);
    }
    else {
      produitExistant.quantite++;
    }
  }

  showProductByCategory($event: any) {
    this.service.getProductsByCategory($event).subscribe(
      (response : any)=>{
        this.products = response.products;
      }
    )
  }

  onSearchByKey(event : any){
    this.service.getProductBykey(event)
      .subscribe((response :any) =>{
        this.products = response.products;
      });
  }

  DisplayDetailProduct($event: any) {
    this.displayDetailProduct = !this.displayDetailProduct ;
    this.ProductAdetail = $event  }
}
