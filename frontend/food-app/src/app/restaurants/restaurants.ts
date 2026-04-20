import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Добавь импорт
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../api.service';
<<<<<<< HEAD

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './restaurants.html'
=======
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.html',
  imports: [CommonModule], 
  styleUrls: ['./restaurants.sass'],
>>>>>>> 9e5c6dc834bc0a38655557944517bd879b49b812
})
export class Restaurants implements OnInit {
  restaurants: any[] = [];

  constructor(
    private api: ApiService, 
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.api.getRestaurants().subscribe({
      next: (data: any) => {
        console.log('Данные получены:', data);
        this.restaurants = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Ошибка:', err);
      }
    });
  }

  openMenu(id: number) {
    this.router.navigate(['/menu', id]);
  }
}