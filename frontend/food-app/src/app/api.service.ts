import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Базовый URL теперь общий, а хвосты будем добавлять в методах
  private rootUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private router: Router) {}

  // 1. Авторизация теперь идет через /api/auth/
  register(userData: any): Observable<any> {
    return this.http.post(`${this.rootUrl}auth/register/`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.rootUrl}auth/login/`, credentials).pipe(
      tap((res: any) => {
        if (res.access) {
          localStorage.setItem('access_token', res.access);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // 2. Рестораны теперь идут через /api/food/
  getRestaurants(): Observable<any> {
    return this.http.get(`${this.rootUrl}food/restaurants/`);
  }

  getFoods(restaurantId: number): Observable<any> {
    return this.http.get(`${this.rootUrl}food/restaurants/${restaurantId}/foods/`);
  }
}