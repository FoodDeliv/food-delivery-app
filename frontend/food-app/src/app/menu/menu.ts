import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.sass']
})
export class Menu implements OnInit {
  menuItems: any[] = [];
  restaurantId: string | null = null;
  
  // ИСПРАВЛЕНО: Добавлен префикс 'auth', так как в config/urls.py путь к api.urls идет через api/auth/
  private readonly baseUrl = 'http://127.0.0.1:8000/api/auth/';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient, 
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.restaurantId = params.get('id');
      if (this.restaurantId) {
        this.loadMenu(this.restaurantId);
      }
    });
  }

  loadMenu(id: string) {
    this.api.getFoods(id).subscribe({
      next: (data: any) => {
        this.menuItems = [...data]; 
        this.cdr.detectChanges(); 
      },
      error: (err: any) => {
        console.error('Ошибка при загрузке меню:', err);
      }
    });
  }

  addToCart(item: any) {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      alert('Пожалуйста, войдите в систему');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Убедись, что в Django views.py ты используешь request.data.get('food_id')
    const body = {
      food_id: item.id,
      quantity: 1
    };

    // Теперь путь будет http://127.0.0.1:8000/api/auth/cart/add/
    this.http.post(`${this.baseUrl}cart/add/`, body, { headers }).subscribe({
      next: (res) => {
        console.log('Успешно сохранено в базе:', res);
        this.cartService.addToCart(item); // оставляем для обновления счетчика на лету
        alert(`${item.name} добавлен в корзину!`);
      },
      error: (err) => {
        console.error('Детальная ошибка:', err);
        if (err.status === 401) {
          alert('Нужно заново войти в аккаунт (ошибка авторизации)');
        } else if (err.status === 404) {
          alert('Ошибка 404: Проверь, совпадает ли путь в Django urls.py');
        } else {
          alert('Не удалось добавить товар. Попробуй еще раз.');
        }
      }
    });
  }
}