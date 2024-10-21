import { Component } from '@angular/core';
import {AuthService} from "../Services/auth.service";
import {Router, RouterLink, Routes} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {User} from "../Models/User";

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

  user!: User ;

  constructor(private AuthService: AuthService, private route: Router) {
  }

  Login() {
    this.AuthService.setTrue();
    this.route.navigate(['/Listproduit'])

  }


  register(f: NgForm) {
    const email: string = f.value['email'];
    const password: string = f.value['password'];

    this.user.email = email ;
    this.user.password = password ;

    console.log(this.user)
    }
  }

