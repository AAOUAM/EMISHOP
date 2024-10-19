import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false ;
  constructor() { }

  iAuth(): boolean {
    return this.isAuthenticated;
  }

  setTrue(): void {
    this.isAuthenticated = true;
  }
}
