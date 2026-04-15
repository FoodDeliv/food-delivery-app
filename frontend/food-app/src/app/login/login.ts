import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.sass'
})
export class LoginComponent {
  isLoginMode = true;

  credentials = { 
    username: '', 
    password: '',
    email: '' 
  };

  constructor(private api: ApiService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.credentials = { username: '', password: '', email: '' };
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.login();
    } else {
      this.register();
    }
  }

  private login() {
    this.api.login({
      username: this.credentials.username,
      password: this.credentials.password
    }).subscribe({
      next: (res: any) => {
        if (res.access) {
          localStorage.setItem('access_token', res.access);
        }
        
        console.log('Токен успешно сохранен');
        this.router.navigate(['/restaurants']); 
      },
      error: (err) => {
        console.error('Ошибка при входе:', err);
        alert('Ошибка входа: ' + (err.error?.detail || 'Проверьте данные'));
      }
    });
  }

  private register() {
    console.log('Данные для регистрации:', this.credentials);
    alert('Регистрация в процессе разработки. Пока используй Sign In.');
  }
}