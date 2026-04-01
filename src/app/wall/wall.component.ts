import {Component, OnInit} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {WallService} from "../service/wall.service";

@Component({
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  template: `
    <div style="text-align:center">
      <input [(ngModel)]="message">
      <button (click)="sendMessage(message)" [disabled]="saving">Send</button>

      <div *ngFor="let m of messages">
        {{ m.content }}
        <button (click)="deleteMessage(m.id)" [disabled]="saving">🗑</button>
      </div>
    </div>
  `
})
export class WallComponent implements OnInit {
  message = '';
  messages: any[] = [];
  saving = false;

  constructor(
    protected readonly wallService: WallService,
  ) {
  }

  async ngOnInit() {
    this.messages = await this.wallService.getMessages();
  }

  async deleteMessage(id: string) {
    this.saving = true;
    await this.wallService.deleteMessage(id);
    this.messages = await this.wallService.getMessages();
    this.saving = false;
  }

  async sendMessage(message: string) {
    this.saving = true;
    await this.wallService.sendMessage(message);
    this.messages = await this.wallService.getMessages();
    this.message = '';
    this.saving = false;
  }
}
