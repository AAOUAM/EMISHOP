import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ProductService} from "../Services/product.service";
import {AuthService} from "../Services/auth.service";
import {NavbarService} from "../Services/navbar.service";


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

  navbarVisible: boolean = true;

  constructor(private cdr: ChangeDetectorRef ,private p: ProductService , private AuthService : AuthService , private router :Router , private navbarService: NavbarService) {
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

    this.navbarService.navbarVisibility.subscribe(visible => {
      this.navbarVisible = visible;
    });
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
  }

  Authen:boolean = this.AuthService.iAuth() ;

  Auth() {
    this.AuthService.setTrue() ;
    this.Authen = true;
  }

  LogOut() {
    if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      this.AuthService.setFalse();
      this.Authen = false;
      this.cdr.detectChanges();
    }
  }





}
