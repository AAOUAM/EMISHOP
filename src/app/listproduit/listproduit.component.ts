import {Component, OnInit} from '@angular/core';
import {Product} from "../Models/product";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ProductItemsComponent} from "../product-items/product-items.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {LignePanier} from "../Models/LignePanier";
import {PanierComponent} from "../panier/panier.component";
import {ProductService} from "../Services/product.service";
import {DetailProductComponent} from "../detail-product/detail-product.component";
import {ActivatedRoute} from "@angular/router";



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
  products : any = [];
  selectedCategorie:string = '';
  searchText:string = '';


  constructor(private service: ProductService , private route:ActivatedRoute) {}

  ngOnInit() {
    this.service.getAllProducts().subscribe(
      (response : any)=>{
        this.products =  response.products
    })

    this.route.queryParams.subscribe(params => {
      this.selectedCategorie = params['query'];
      if (this.selectedCategorie) {
        this.service.getProductsByCategory(this.selectedCategorie).subscribe(
          (response: any) => {
            // Suppose the response is an object and 'products' is the array we need
            this.products = response.products || []; // Extraire le tableau ou un tableau vide
          },
          (err) => {
            console.log('Error fetching data:', err);
          }
        );
      }
    });

    this.route.queryParams.subscribe(params => {
      this.searchText = params['query'];
      if (this.searchText) {
        this.service.getProductBykey(this.searchText).subscribe(
          (response : any) => {
            this.products = response.products || [];
          },
          (err) => {
            console.log('Error', err);
          }
        );
      }
    });
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



  DisplayDetailProduct($event: any) {
    this.displayDetailProduct = !this.displayDetailProduct ;
    this.ProductAdetail = $event  }
}
