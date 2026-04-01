import {Component, OnInit} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  template: `
    <div style="text-align:center">
      <input [(ngModel)]="message">
      <button (click)="send()">Send</button>

      <div *ngFor="let m of messages">
        {{ m.content }}
        <button (click)="delete(m.id)">🗑</button>
      </div>
    </div>
  `
})
export class WallComponent implements OnInit {
  message = '';
  messages: any[] = [];

  api = 'https://YOUR_BACKEND_URL/api';

  async ngOnInit() {
    const res = await fetch(`${this.api}/messages`);
    this.messages = await res.json();
  }

  async send() {
    await fetch(`${this.api}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({ content: this.message })
    });

    location.reload();
  }

  async delete(id: string) {
    await fetch(`${this.api}/messages/${id}`, {
      method: 'DELETE'
    });

    location.reload();
  }
}
