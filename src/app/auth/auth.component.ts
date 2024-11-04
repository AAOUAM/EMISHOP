import { Component } from '@angular/core';
import { AuthService } from "../Services/auth.service";
import {Router, RouterLink} from "@angular/router";
import { FormsModule, NgForm } from "@angular/forms";
import { User } from "../Models/User";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  user: User = {
    username: '',
    email: '',
    password: '',
    sexe : '',
    tel : '',
    datenaissance : new Date
  };

  constructor(private AuthService: AuthService, private route: Router) {}


  register(f: NgForm) {
    const email: string = f.value['email'];
    const password: string = f.value['password'];

    console.log('Email:', email, 'Password:', password);

    this.AuthService.login(email , password);
  }
}
