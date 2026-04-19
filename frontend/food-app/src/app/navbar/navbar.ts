import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.sass'
})
export class NavbarComponent {
  cities = ['Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе', 'Тараз', 'Aктау'];
  selectedCity = 'Алматы';
  isDropdownOpen = false;

  constructor(
    private router: Router,
    public translation: TranslationService
  ) {}

  // Метод для проверки: залогинен ли пользователь?
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

  logout() {
    localStorage.removeItem('access_token'); 
    this.router.navigate(['/login']); 
  }
}