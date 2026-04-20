import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { Observable } from 'rxjs';
=======
import { Router } from '@angular/router'; 
import { Observable, tap } from 'rxjs';

>>>>>>> 9e5c6dc834bc0a38655557944517bd879b49b812
@Injectable({
  providedIn: 'root'
})
export class ApiService {
<<<<<<< HEAD
  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  getFoods(id: string) {
    return this.http.get(`http://127.0.0.1:8000/api/restaurants/${id}/foods/`);
  }

  getRestaurants(): Observable<any> {
    return this.http.get(`${this.baseUrl}restaurants/`);
=======
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
>>>>>>> 9e5c6dc834bc0a38655557944517bd879b49b812
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