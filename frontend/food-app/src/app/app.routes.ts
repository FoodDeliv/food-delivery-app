import { Routes } from '@angular/router';
<<<<<<< HEAD
import { Restaurants } from './restaurants/restaurants'; 
import { Menu } from './menu/menu';

export const routes: Routes = [
  { 
    path: '', 
    component: Restaurants 
  },
  { 
    path: 'menu/:id', 
    component: Menu 
  },
  { 
    path: '**', 
    redirectTo: '' 
  } 
=======
import { Restaurants } from './restaurants/restaurants';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu';
import { LoginComponent } from './login/login';
import { SearchResultsComponent } from './search-results/search-results'; // Добавили импорт

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'restaurants', component: Restaurants },
  { path: 'menu/:id', component: RestaurantMenuComponent },
  
  { path: 'search', component: SearchResultsComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: '**', redirectTo: 'login' }
>>>>>>> 9e5c6dc834bc0a38655557944517bd879b49b812
];