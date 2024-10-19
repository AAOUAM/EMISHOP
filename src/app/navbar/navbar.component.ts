import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ProductService} from "../Services/product.service";
import {AuthService} from "../Services/auth.service";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgStyle,
    FormsModule,
    NgForOf,
    NgClass,
    NgIf,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  categories: any[] = [];
  isSearchActive: boolean = false;
  searchKey !: string;

  constructor(private p: ProductService , protected AuthService : AuthService , private router :Router) {
  }

  ngOnInit() {
    this.p.getListCategory().subscribe(
      (response: any) => {
        console.log(response);  // Vérifier le contenu de la réponse
        this.categories = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    );
  }


  @Input() panier!: boolean;
  @Output() panierSelected = new EventEmitter<boolean>;

  afficherPanier() {
    this.panier = !this.panier;
    this.panierSelected.emit(this.panier)
  }

  @Output() searchbyCategory = new EventEmitter<string>();

  selectedCategory!: string;


  searchbycategorie() {
    if(this.selectedCategory){
      this.router.navigate(['/Listproduit'] ,{queryParams:{ query :this.selectedCategory}});
    }
  }



  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }

  onSearchByKey() {
    if (this.searchKey) {
      this.router.navigate(['/Listproduit'], { queryParams: { query: this.searchKey } });
    }
    else{
      this.router.navigate(['/']);
    }
  }

  Auth() {
    this.AuthService.isAuthenticated = ! this.AuthService.isAuthenticated ;
  }
}
