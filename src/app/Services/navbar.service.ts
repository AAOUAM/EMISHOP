import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private navbarVisible = new BehaviorSubject<boolean>(true);
  navbarVisibility = this.navbarVisible.asObservable();

  // Méthode pour masquer le Navbar
  hideNavbar() {
    this.navbarVisible.next(false);
  }

  // Méthode pour afficher le Navbar
  showNavbar() {
    this.navbarVisible.next(true);
  }
  constructor() { }
}
