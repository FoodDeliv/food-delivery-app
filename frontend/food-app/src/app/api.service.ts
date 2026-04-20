import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private rootUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.rootUrl}auth/register/`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.rootUrl}auth/login/`, credentials).pipe(
      tap((res: any) => {
        if (res.access) {
          localStorage.setItem('access_token', res.access);
        }
        // ИСПРАВЛЕНО: бэкенд теперь возвращает username напрямую
        if (res.username) {
          localStorage.setItem('user_name', res.username);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_name');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUserName(): string {
    return localStorage.getItem('user_name') || 'Друг';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRestaurants(): Observable<any> {
    return this.http.get(`${this.rootUrl}food/restaurants/`);
  }

  getFoods(restaurantId: string | number): Observable<any> {
    return this.http.get(`${this.rootUrl}food/restaurants/${restaurantId}/foods/`);
  }
}