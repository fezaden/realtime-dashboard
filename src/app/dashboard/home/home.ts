import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="main-nav">
      <a routerLink="data-grid" routerLinkActive="active">DataGrid</a>
      <a routerLink="charts" routerLinkActive="active">Charts</a>
      <a routerLink="voice-recorder" routerLinkActive="active">Voice Recorder</a>
      <a routerLink="mock-websocket" routerLinkActive="active">Mock WebSocket</a>
    </nav>
    <div class="dashboard-content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .main-nav {
      display: flex;
      gap: 2rem;
      background: #232b3a;
      padding: 1.2rem 2rem;
      border-radius: 1.5rem;
      margin-bottom: 2.5rem;
      box-shadow: 0 6px 24px 0 rgba(36,56,112,0.13);
    }
    .main-nav a {
      color: #fff;
      font-weight: 500;
      text-decoration: none;
      letter-spacing: 0.05em;
      padding: 0.65rem 1.5rem;
      border-radius: 0.9rem;
      transition:
        background 0.16s,
        color 0.16s,
        box-shadow 0.14s;
      position: relative;
    }
    .main-nav a:hover,
    .main-nav a.active {
      background: linear-gradient(90deg, #42a5f5 0%, #1976d2 90%);
      color: #fff;
      box-shadow: 0 4px 14px #42a5f541;
    }
    .main-nav a.active::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -8px;
      transform: translateX(-50%);
      width: 40%;
      height: 4px;
      border-radius: 2px;
      background: #42a5f5;
      box-shadow: 0 2px 8px #42a5f541;
    }
    .dashboard-content {
      padding: 1.2rem 0.7rem;
    }
    @media (max-width: 700px) {
      .main-nav {
        flex-direction: column;
        gap: 0.7rem;
        padding: 1rem 0.6rem;
      }
      .main-nav a {
        padding: 0.93rem 1.1rem;
        font-size: 1.07rem;
      }
    }
  `],
})
export class HomeComponent {}
