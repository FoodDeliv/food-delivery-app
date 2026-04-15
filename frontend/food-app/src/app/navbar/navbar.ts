import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCity(city: string) {
    this.selectedCity = city;
    this.isDropdownOpen = false;
  }
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('access_token'); 
    this.router.navigate(['/login']); 
  }
}