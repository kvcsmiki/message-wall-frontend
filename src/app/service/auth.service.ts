import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  api = 'https://YOUR_BACKEND_URL/api';

  async login(email: string, password: string) {
    const res = await fetch(`${this.api}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    localStorage.setItem('token', data.token);
  }

  async register(email: string, password: string) {
    await fetch(`${this.api}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
