import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
    
    if (this.restaurantId) {
      this.api.getFoods(this.restaurantId).subscribe({
        next: (data: any) => {
          this.menuItems = data;
          this.cdr.detectChanges(); 
        },
        error: (err) => console.error('Ошибка загрузки меню:', err)
      });
    }
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }
}