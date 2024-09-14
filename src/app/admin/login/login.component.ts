import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthRequest} from "../../models/AuthRequest";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {JwtHelperService} from "@auth0/angular-jwt";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    MatLabel,
    MatFormField,
    MatButton,
    MatInput
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authRequest: AuthRequest = {}
  errorMessages:  string[] = [];

  constructor(private router: Router,
              private userService: UserService) {
  }
  login() {
    this.userService.authenticate(this.authRequest).subscribe({
      next:async (res) => {
        localStorage.setItem('token', res.token as string)
        localStorage.setItem('userId',res.userId?.toString()||'')
        await this.router.navigate(["/admin/dashboard"])
      },
      error:(err)=>{
        this.errorMessages = [err.error.message];
      }
    })
  }
}

