import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * УСТАРЕВШИЙ СЕРВИС — не используется.
 * Авторизация выполняется через ApiService (api.service.ts).
 * Этот файл оставлен для обратной совместимости, но не подключён нигде.
 * Эндпоинт /api/token/ НЕ существует в бэкенде — используйте /api/auth/login/.
 * @deprecated Используйте ApiService.login()
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ИСПРАВЛЕНО: указан правильный endpoint (был /api/token/ — такого маршрута нет)
  private apiUrl = 'http://127.0.0.1:8000/api/auth/login/';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }
}