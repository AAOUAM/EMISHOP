import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {

  user = {
    username: '',
    civility: '',
    dateNaissance: '',
    telephone: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private AuthService : AuthService) {}

  // Method called on form submission
  inscription(form: NgForm) {
    if (form.valid) {
      console.log('Form Data:', this.user);
      this.AuthService.register(this.user.email , this.user.password);
    } else {
      console.log('Form is invalid');
    }
  }

}
