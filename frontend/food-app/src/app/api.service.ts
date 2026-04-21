import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private rootUrl = 'http://127.0.0.1:8000/api/';

  // Наш "радиопередатчик" статуса
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('access_token'));
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.rootUrl}auth/register/`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.rootUrl}auth/login/`, credentials).pipe(
      tap((res: any) => {
        if (res.access) {
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('user_name', res.username || 'Пользователь');
          this.isLoggedInSubject.next(true); // Сообщаем всем: мы вошли!
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_name');
    this.isLoggedInSubject.next(false); // Сообщаем всем: мы вышли!
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUserName(): string {
    return localStorage.getItem('user_name') || 'Друг';
  }

  getRestaurants(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get(`${this.rootUrl}food/restaurants/`, { headers });
  }

  getFoods(restaurantId: string | number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get(`${this.rootUrl}food/restaurants/${restaurantId}/foods/`, { headers });
  }
}