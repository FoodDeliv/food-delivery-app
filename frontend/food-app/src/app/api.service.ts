import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  getFoods(id: string) {
    return this.http.get(`http://127.0.0.1:8000/api/restaurants/${id}/foods/`);
  }

  getRestaurants(): Observable<any> {
    return this.http.get(`${this.baseUrl}restaurants/`);
  }
}