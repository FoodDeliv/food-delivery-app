import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  allFoods: any[] = []; 
  userName: string = 'Друг'; // Имя по умолчанию

  constructor(
    private api: ApiService, 
    private router: Router,
    private cdr: ChangeDetectorRef,
    private cartService: CartService 
  ) {}

  ngOnInit() {
    // 1. Получаем имя пользователя из localStorage
    // Убедись, что при логине ты сохраняешь его как localStorage.setItem('user_name', name)
    const savedName = localStorage.getItem('user_name');
    if (savedName) {
      this.userName = savedName;
    }

    this.loadInitialData();
  }

  private loadInitialData() {
    // 2. Загружаем список ресторанов
    this.api.getRestaurants().subscribe({
      next: (data: any) => {
        this.restaurants = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Ошибка при получении ресторанов:', err)
    });

    // 3. Загружаем все товары для витрины
    this.api.getFoods('').subscribe({ 
      next: (data: any) => {
        this.allFoods = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Ошибка при получении товаров:', err)
    });
  }

  openMenu(id: number) {
    this.router.navigate(['/menu', id]);
  }

  addToCart(food: any) {
    this.cartService.addToCart(food);
    // Можно добавить уведомление здесь, если хочешь
  }
}