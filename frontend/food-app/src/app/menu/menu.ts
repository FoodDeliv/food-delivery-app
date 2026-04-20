import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Добавь импорт
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
<<<<<<< HEAD
import { CartService } from '../cart.service';
=======
import { CommonModule } from '@angular/common';
>>>>>>> 9e5c6dc834bc0a38655557944517bd879b49b812

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
<<<<<<< HEAD
  styleUrl: './menu.sass'
=======
  imports: [CommonModule],
  styleUrls: ['./menu.sass'],
>>>>>>> 9e5c6dc834bc0a38655557944517bd879b49b812
})
export class Menu implements OnInit {
  menuItems: any[] = [];
  restaurantId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cdr: ChangeDetectorRef ,
    public cartService: CartService
  ) {}
  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  ngOnInit() {
<<<<<<< HEAD
    this.restaurantId = this.route.snapshot.paramMap.get('id');
    
    if (this.restaurantId) {
      this.api.getFoods(this.restaurantId).subscribe({
        next: (data: any) => {
          console.log('Блюда загружены:', data);
          this.menuItems = data;
          this.cdr.detectChanges(); 
        },
        error: (err) => console.error('Ошибка загрузки меню:', err)
      });
    }
=======
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getFoods(this.restaurantId).subscribe((data: any) => {
      this.foods = data;
    });
  }

  addToCart(food: any) {
    console.log("Added:", food);
>>>>>>> 9e5c6dc834bc0a38655557944517bd879b49b812
  }
}