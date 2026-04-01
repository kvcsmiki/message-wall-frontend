import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormsModule } from "@angular/forms";

@Component({
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <h2>Login</h2>
    <input [(ngModel)]="email" placeholder="Email">
    <input [(ngModel)]="password" type="password" placeholder="Password">
    <button (click)="login()">Login</button>
    <button (click)="goRegister()">Register</button>
  `
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  async login() {
    await this.auth.login(this.email, this.password);
    this.router.navigate(['/wall']);
  }

  goRegister() {
    this.router.navigate(['/register']);
  }
}
