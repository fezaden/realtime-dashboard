import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

const MOCK_USERS = [
  { username: 'admin', password: CryptoJS.SHA256('123456').toString() },
];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="login-container">
  <form class="login-card" [formGroup]="loginForm" (ngSubmit)="login()">
    <h2>Giriş Yap</h2>
    <div class="input-group">
      <label for="username">Kullanıcı Adı</label>
      <input id="username" type="text" formControlName="username" autocomplete="username" />
    </div>
    <div class="input-group">
      <label for="password">Şifre</label>
      <input id="password" type="password" formControlName="password" autocomplete="current-password" />
    </div>
    <button class="login-btn" type="submit">Giriş Yap</button>
    <div *ngIf="errorMsg" class="error-msg">{{ errorMsg }}</div>
  </form>
</div>

  `,
   styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(120deg, #e3f2fd 0%, #fafafa 100%);
    }
    .login-card {
      background: #fff;
      padding: 2.5rem 2.2rem 2rem 2.2rem;
      border-radius: 1.4rem;
      box-shadow: 0 8px 36px 0 rgba(60,80,120,0.15);
      max-width: 350px;
      min-width: 270px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      align-items: stretch;
    }
    .login-card h2 {
      margin-bottom: 1rem;
      color: #1976d2;
      text-align: center;
      font-size: 1.45rem;
      font-weight: 600;
      letter-spacing: 0.04em;
    }
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .input-group label {
      font-size: 0.99rem;
      color: #1a237e;
      margin-bottom: 0.1rem;
      font-weight: 500;
    }
    .input-group input {
      padding: 0.7rem 1rem;
      border-radius: 0.7rem;
      border: 1.2px solid #90caf9;
      background: #f6faff;
      font-size: 1.02rem;
      outline: none;
      transition: border 0.2s;
    }
    .input-group input:focus {
      border: 1.6px solid #1976d2;
      background: #e3f2fd;
    }
    .login-btn {
      margin-top: 0.7rem;
      padding: 0.7rem 0;
      border-radius: 0.7rem;
      border: none;
      background: linear-gradient(90deg, #42a5f5 0%, #1976d2 100%);
      color: #fff;
      font-size: 1.08rem;
      font-weight: bold;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: background 0.17s;
    }
    .login-btn:hover {
      background: #0d47a1;
    }
    .error-msg {
      margin-top: 0.7rem;
      color: #fff;
      background: #e53935;
      padding: 0.7rem 0.7rem;
      border-radius: 0.7rem;
      font-size: 1rem;
      text-align: center;
    }
  `]
})
export class LoginComponent {
  errorMsg = '';
  loginForm;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const { username, password } = this.loginForm.value;
    const encrypted = CryptoJS.SHA256(password!).toString();
    const found = MOCK_USERS.find(
      (u) => u.username === username && u.password === encrypted
    );
    if (found) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMsg = 'Kullanıcı adı veya şifre hatalı';
    }
  }
}
