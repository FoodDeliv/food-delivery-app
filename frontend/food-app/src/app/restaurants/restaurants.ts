import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Добавили ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './restaurants.html',
  styleUrls: ['./restaurants.sass']
})
export class Restaurants implements OnInit {
  restaurants: any[] = [];
  userName: string = 'Друг';
  foods: any[] = [];
  allFoods: any[] = [];

  constructor(
    private api: ApiService, 
    private router: Router,
    private cartService: CartService,
    private cdr: ChangeDetectorRef // Помогает Angular увидеть изменения
  ) {}

  ngOnInit() {
    // Используем автодетектор для имени пользователя
    this.api.isLoggedIn$.subscribe(() => {
      this.userName = this.api.getUserName();
      this.cdr.detectChanges();
    });

    this.loadInitialData();
  }

  private loadInitialData() {
    // 1. Загружаем список ресторанов
    this.api.getRestaurants().subscribe({
      next: (data: any) => {
        console.log('Рестораны получены:', data);
        this.restaurants = data;
        this.cdr.detectChanges(); // Принудительно обновляем UI
      },
      error: (err) => {
        console.error('Ошибка при получении ресторанов:', err);
        // Если токен протух, ApiService.logout() сработает внутри перехватчика (если добавили)
      }
    });

    // 2. УДАЛЕНО: жесткая привязка к id = '123'
    // На главной странице обычно не загружают еду конкретного ресторана без выбора.
    // Если вам нужны "Популярные блюда", для этого нужен отдельный метод в API.
  }

  openMenu(id: number) {
    if (id) {
      this.router.navigate(['/menu', id]);
    }
  }

  addToCart(food: any) {
    this.cartService.addToCart(food);
    alert(`${food.name} добавлен в корзину!`);
  }
}