import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslationService } from '../translation.service';
import { FoodService } from '../services/food.service';
import { debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.sass'
})
export class NavbarComponent implements OnInit {
  cities = ['Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе', 'Тараз', 'Aктау'];
  selectedCity = 'Алматы';
  isDropdownOpen = false;

  // Контрол для поиска и массив подсказок
  searchControl = new FormControl('');
  suggestions: string[] = [];

  constructor(
    public router: Router,
    public translation: TranslationService,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    // Логика живого поиска
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(query => {
        if (query && query.length >= 2) {
          return this.foodService.getSuggestions(query);
        }
        return of([]);
      })
    ).subscribe({
      next: (data) => {
        this.suggestions = data;
        console.log('Подсказки:', data);
      },
      error: (err) => console.error('Ошибка поиска:', err)
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCity(city: string) {
    this.selectedCity = city;
    this.isDropdownOpen = false;
  }

  onLangChange(event: any) {
    const lang = event.target.value;
    this.translation.setLanguage(lang);
  }

  // Срабатывает при нажатии Enter или выборе из списка
  onSearchSubmit(query?: string) {
    const finalQuery = query || this.searchControl.value;
    if (finalQuery) {
      this.suggestions = []; // Скрываем подсказки
      this.router.navigate(['/search'], { queryParams: { q: finalQuery } });
    }
  }

  logout() {
    localStorage.removeItem('access_token'); 
    this.router.navigate(['/login']); 
  }
}