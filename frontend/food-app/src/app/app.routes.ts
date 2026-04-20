import { Routes } from '@angular/router';
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
];