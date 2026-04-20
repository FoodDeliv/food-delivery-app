import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { CommonModule } from '@angular/common';

import { NotificationService } from '../services/notification';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search-results.html',
  styleUrl: './search-results.sass'
})
export class SearchResultsComponent implements OnInit {
  query: string = '';
  results: { restaurants: any[], foods: any[] } = { restaurants: [], foods: [] };
  isLoading: boolean = false;
  
  cartCounts: { [key: number]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private router: Router,
    private notify: NotificationService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query) {
        this.fetchResults();
      }
    });
  }

  fetchResults(): void {
    this.isLoading = true;
    
    const searchAction = this.query 
      ? this.foodService.globalSearch(this.query) 
      : this.foodService.getAll();

    searchAction.subscribe({
      next: (data) => {
        this.results = data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
  });
}
  addToCart(food: any): void {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      this.notify.show('Войдите в аккаунт, чтобы собрать корзину 🛒', 'error');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
      return;
    }

    const id = food.id;
    this.cartCounts[id] = (this.cartCounts[id] || 0) + 1;
  }

  removeFromCart(food: any): void {
    if (this.cartCounts[food.id] > 0) {
      this.cartCounts[food.id]--;
    }
  }

  getTotalCount(): number {
    return (this.results.restaurants?.length || 0) + (this.results.foods?.length || 0);
  }
}