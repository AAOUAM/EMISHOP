import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  iAuth(): boolean {
    return this.isAuthenticated;
  }

  setTrue(): void {
    this.isAuthenticated = true;
  }

  setFalse(): void {
    this.isAuthenticated = false;
  }

  login(email: string, password: string): void {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      this.setTrue();
      this.router.navigate(['/Listproduit']);
    }).catch(error => {
      alert(error.message); // Corrected error handling
    });
  }

  register(email: string, password: string): void {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(() => {
      this.setTrue();
      alert('Successfully registered');
      this.router.navigate(['/Auth']);
    }).catch(error => {
      alert(error.message); // Corrected error handling
    });
  }

  getToken(): string {
    // Implement logic to return the user's token if needed
    return "";
  }

  async getIdUser(): Promise<string | null> {
    try {
      const user = await this.fireAuth.currentUser;
      if (user) {
        const userId = user.uid; // Get the user ID
        console.log('User ID:', userId);
        return userId; // Return user ID
      } else {
        console.log('No user is signed in.');
        return null; // Return null if no user is signed in
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
      return null; // Return null on error
    }
  }

}
