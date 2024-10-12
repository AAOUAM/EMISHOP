import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass, NgForOf, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ProductService} from "../Services/product.service";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgStyle,
    FormsModule,
    NgForOf,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  categories: any[] = [];
  isSearchActive: boolean = false;
  searchKey !: string;
  @Output() searchedText = new EventEmitter<string>();

  constructor(private p: ProductService) {
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
    this.searchbyCategory.emit(this.selectedCategory)
  }



  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }

  onSearchByKey() {
    this.searchedText.emit(this.searchKey)
  }
}
