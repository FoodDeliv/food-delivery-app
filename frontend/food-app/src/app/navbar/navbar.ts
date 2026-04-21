import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslationService } from '../translation.service';
import { FoodService } from '../services/food.service';
import { ApiService } from '../api.service'; 
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

  isLoggedIn: boolean = false; // Переменная (не функция!)
  userName: string = '';

  searchControl = new FormControl('');
  suggestions: string[] = [];

  constructor(
    public router: Router,
    public translation: TranslationService,
    private foodService: FoodService,
    public api: ApiService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.api.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.userName = this.api.getUserName();
      this.cdr.detectChanges();
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(query => {
        if (query && query.length >= 2) return this.foodService.getSuggestions(query);
        return of([]);
      })
    ).subscribe({
      next: (data) => this.suggestions = data,
      error: (err) => console.error(err)
    });
  }

  logout() {
    this.api.logout();
  }

  toggleDropdown() { this.isDropdownOpen = !this.isDropdownOpen; }
  selectCity(city: string) { this.selectedCity = city; this.isDropdownOpen = false; }
  onLangChange(event: any) { this.translation.setLanguage(event.target.value); }
  onSearchSubmit(query?: string) {
    const finalQuery = query || this.searchControl.value;
    if (finalQuery) {
      this.suggestions = [];
      this.router.navigate(['/search'], { queryParams: { q: finalQuery } });
    }
  }
}