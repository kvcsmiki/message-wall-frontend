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
      <button (click)="wallService.sendMessage(message)">Send</button>

      <div *ngFor="let m of messages">
        {{ m.content }}
        <button (click)="wallService.deleteMessage(m.id)">🗑</button>
      </div>
    </div>
  `
})
export class WallComponent implements OnInit {
  message = '';
  messages: any[] = [];

  constructor(
    protected readonly wallService: WallService,
  ) {
  }

  async ngOnInit() {
    this.messages = await this.wallService.getMessages();
  }
}
