import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification';

@Component({
  selector: 'app-restaurant-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-menu.html',
  styleUrl: './restaurant-menu.sass'
})
export class RestaurantMenuComponent implements OnInit {
  restaurant: any;
  foods: any[] = [];
  cartCounts: { [key: number]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private notify: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.foodService.getRestaurantById(id).subscribe(data => {
      this.restaurant = data;
    });

    this.foodService.getFoodsByRestaurant(id).subscribe(data => {
      this.foods = data;
    });
  }

  addToCart(food: any): void {
    if (!localStorage.getItem('access_token')) {
      this.notify.show('Войдите в аккаунт, чтобы собрать корзину 🛒', 'error');
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }
    this.cartCounts[food.id] = (this.cartCounts[food.id] || 0) + 1;
  }

  removeFromCart(food: any): void {
    if (this.cartCounts[food.id] > 0) this.cartCounts[food.id]--;
  }
}