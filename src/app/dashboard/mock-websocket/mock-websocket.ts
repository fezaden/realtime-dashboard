import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockRealtimeService } from '../../shared/mock-realtime.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mock-websocket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-card">
      <h2>Mock WebSocket <span>(Gerçek Backend Yok!)</span></h2>
      <div class="chat-messages">
        <ul>
          <li *ngFor="let msg of messages$ | async">{{ msg }}</li>
        </ul>
      </div>
      <div class="chat-input-bar">
        <input [(ngModel)]="input" placeholder="Mesaj yaz">
        <button (click)="send()">Gönder</button>
      </div>
    </div>
  `,
  styles: [`
    .chat-card {
      max-width: 450px;
      margin: 2.5rem auto;
      background: #fff;
      border-radius: 1.4rem;
      box-shadow: 0 6px 26px 0 rgba(50,80,130,0.12);
      padding: 2.2rem 1.6rem 1.2rem 1.6rem;
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
      min-height: 420px;
    }
    h2 {
      color: #1976d2;
      margin-bottom: 0.5rem;
      font-size: 1.18rem;
      text-align: center;
      font-weight: 600;
      letter-spacing: 0.04em;
    }
    h2 span {
      color: #a0a7b7;
      font-size: 0.98em;
      font-weight: 400;
      margin-left: 0.5rem;
    }
    .chat-messages {
      flex: 1;
      min-height: 220px;
      max-height: 270px;
      overflow-y: auto;
      background: #f6faff;
      border-radius: 0.8rem;
      padding: 1rem 0.7rem 1rem 0.7rem;
      margin-bottom: 0.7rem;
    }
    .chat-messages ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
    }
    .chat-messages li {
      background: #e3f2fd;
      color: #195689;
      padding: 0.65rem 1.1rem;
      border-radius: 1rem;
      font-size: 1.04rem;
      max-width: 80%;
      align-self: flex-start;
      box-shadow: 0 1px 8px #42a5f511;
      word-break: break-word;
    }
    .chat-messages li:last-child {
      font-weight: 600;
      background: #42a5f5;
      color: #fff;
      align-self: flex-end;
    }
    .chat-input-bar {
      display: flex;
      gap: 0.7rem;
      align-items: center;
      margin-top: 0.8rem;
    }
    .chat-input-bar input {
      flex: 1;
      padding: 0.7rem 1rem;
      border-radius: 0.9rem;
      border: 1.2px solid #90caf9;
      font-size: 1.03rem;
      background: #f6faff;
      transition: border 0.18s;
      outline: none;
    }
    .chat-input-bar input:focus {
      border: 1.8px solid #1976d2;
      background: #e3f2fd;
    }
    .chat-input-bar button {
      background: linear-gradient(90deg, #42a5f5 0%, #1976d2 100%);
      border: none;
      color: #fff;
      font-weight: 600;
      padding: 0.65rem 1.7rem;
      border-radius: 0.8rem;
      font-size: 1.01rem;
      cursor: pointer;
      box-shadow: 0 2px 7px #42a5f522;
      transition: background 0.17s;
    }
    .chat-input-bar button:hover {
      background: #0d47a1;
    }
    @media (max-width: 500px) {
      .chat-card { padding: 1rem 0.3rem 0.9rem 0.3rem; }
      .chat-messages { padding: 0.5rem 0.3rem 0.5rem 0.3rem; }
    }
  `]
})
export class MockWebsocketComponent {
  input = '';
  messages$: Observable<string[]>;

  constructor(private mock: MockRealtimeService) {
    this.messages$ = this.mock.messages$;
  }

  send() {
    if (this.input) {
      this.mock.addMessage('Sen: ' + this.input);
      this.input = '';
    }
  }
}
