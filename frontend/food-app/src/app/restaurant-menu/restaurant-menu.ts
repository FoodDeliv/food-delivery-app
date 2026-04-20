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
  restaurant: any = null;
  foods: any[] = [];
  cartCounts: { [key: number]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private notify: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      
      this.foodService.getRestaurantById(id).subscribe(data => {
        this.restaurant = data;
      });

      this.foodService.getFoodsByRestaurant(id).subscribe(data => {
        this.foods = data;
      });
    }
  }

  addToCart(food: any): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.notify.show('Войдите в аккаунт, чтобы собрать корзину 🛒', 'error');
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }
    const id = food.id;
    this.cartCounts[id] = (this.cartCounts[id] || 0) + 1;
  }

  trackByFoodId(index: number, food: any): number {
    return food.id; 
}

  removeFromCart(food: any): void {
    if (this.cartCounts[food.id] > 0) {
      this.cartCounts[food.id]--;
    }
  }
}