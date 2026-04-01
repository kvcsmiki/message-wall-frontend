import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WallService {

  private api = 'https://message-wall-backend.vercel.app/api';

  private getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
  }

  async getMessages() {
    const res = await fetch(`${this.api}/messages`);
    return await res.json();
  }

  async sendMessage(content: string) {
    const res = await fetch(`${this.api}/messages`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ content })
    });

    return await res.json();
  }

  async deleteMessage(id: string) {
    const res = await fetch(`${this.api}/messages/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });

    return await res.json();
  }
}
