import {Component} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <h2>Register</h2>
    <input [(ngModel)]="email">
    <input [(ngModel)]="password" type="password">
    <button (click)="register()">Register</button>
  `
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  async register() {
    await this.auth.register(this.email, this.password);
    this.router.navigate(['/']);
  }
}
