import { Component, ChangeDetectorRef } from '@angular/core'; // Добавили ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { TranslationService } from '../translation.service'; 
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
  showPassword = false;
  
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  credentials = { 
    username: '', 
    password: '',
    email: '' 
  };

  constructor(
    private api: ApiService, 
    private router: Router,
    public translation: TranslationService,
    private cdr: ChangeDetectorRef // Внедряем детектор изменений
  ) {
    // Подписываемся на поток смены языка
    this.translation.currentLang$.subscribe(() => {
      // Когда язык в сервисе меняется, говорим компоненту обновиться
      this.cdr.detectChanges();
    });
  }

  setLang(lang: string) {
    this.translation.setLanguage(lang);
  }

  t(key: string): string {
    return this.translation.translate(key);
  }

  private showMessage(text: string, type: 'success' | 'error' = 'success') {
    this.message = text;
    this.messageType = type;
    setTimeout(() => this.message = '', 4000);
  }

 onForgotPassword() {
  this.showMessage(this.t('reset_msg'), 'success');
}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.showPassword = false;
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
      console.error('Детальная ошибка:', err); // Посмотри в консоль браузера!
      
      // 400 или 401 коды в логине обычно значат одно и то же для юзера
      if (err.status === 400 || err.status === 401) {
        this.showMessage(this.t('err_invalid_creds'), 'error');
      } else {
        this.showMessage(this.t('err_unknown'), 'error');
      }
    }
  });
}

  private register() {
  this.api.register(this.credentials).subscribe({
    next: (res: any) => {
      this.showMessage(this.t('auth_success_msg'), 'success');
      this.isLoginMode = true;
      this.credentials.password = '';
    },
    error: (err) => {
      console.error('Ошибка регистрации:', err);
      
      const errorBody = JSON.stringify(err.error);
      
      if (err.status === 400) {
        // Если в теле ошибки есть упоминание, что юзер уже есть
        if (errorBody.includes('already exists') || errorBody.includes('exists')) {
          this.showMessage(this.t('err_user_exists'), 'error');
        } else {
          // Если 400, но не дубликат (например, пустые поля)
          this.showMessage(this.t('err_invalid_creds'), 'error'); 
        }
      } else {
        this.showMessage(this.t('err_unknown'), 'error');
      }
    }
  });
}
}