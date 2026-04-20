import { Routes } from '@angular/router';
import { Restaurants } from './restaurants/restaurants';
import { Menu } from './menu/menu';
import { LoginComponent } from './login/login';
import { SearchResultsComponent } from './search-results/search-results';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'restaurants', component: Restaurants },
  { path: 'menu/:id', component: Menu },
  // ИСПРАВЛЕНО: добавлен маршрут для компонента restaurant-menu (был пропущен при слиянии)
  { path: 'restaurant/:id', component: RestaurantMenuComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: '', redirectTo: 'restaurants', pathMatch: 'full' },
  { path: '**', redirectTo: 'restaurants' }
];