import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  Etat!: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.Etat = this.authService.iAuth(); // Vérifie si l'utilisateur est authentifié
    if (this.Etat) {
      return true;  // Utilisateur authentifié, accès autorisé
    } else {
      this.router.navigate(['/Auth']);  // Redirection vers la page d'inscription si non authentifié
      return false;  // Accès refusé, il faut retourner explicitement "false"
    }
  }
}
