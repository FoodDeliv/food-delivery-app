import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private router: Router) {}

  // НОВЫЙ МЕТОД: Регистрация
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}register/`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}login/`, credentials).pipe(
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

  getRestaurants(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/food/restaurants/`);
  }

  getFoods(restaurantId: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/food/restaurants/${restaurantId}/foods/`);
  }
}