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
  showPassword = false; // Переменная для управления видимостью пароля
  
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  credentials = { 
    username: '', 
    password: '',
    email: '' 
  };

  constructor(private api: ApiService, private router: Router) {}

  private showMessage(text: string, type: 'success' | 'error' = 'success') {
    this.message = text;
    this.messageType = type;
    setTimeout(() => this.message = '', 4000);
  }

  onForgotPassword() {
    this.showMessage('Instructions have been sent to your email (Demo Mode).', 'success');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.showPassword = false; // Сбрасываем видимость при переключении режима
    this.message = ''; 
    this.credentials = { username: '', password: '', email: '' };
  }

  onSubmit() {
    this.isLoginMode ? this.login() : this.register();
  }

  private login() {
    this.api.login({
      username: this.credentials.username,
      password: this.credentials.password
    }).subscribe({
      next: (res: any) => {
        if (res.access) localStorage.setItem('access_token', res.access);
        this.router.navigate(['/restaurants']); 
      },
      error: (err) => {
        const errorText = err.error?.detail || 'Invalid username or password';
        this.showMessage(errorText, 'error');
      }
    });
  }

  private register() {
    this.api.register(this.credentials).subscribe({
      next: (res: any) => {
        this.showMessage('Account created successfully!', 'success');
        this.isLoginMode = true;
        this.credentials.password = '';
      },
      error: (err) => {
        const errorMessage = err.error?.error || 'Registration failed';
        this.showMessage(errorMessage, 'error');
      }
    });
  }
}