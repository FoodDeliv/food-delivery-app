import { Routes } from '@angular/router';
import { Restaurants } from './restaurants/restaurants';
import { Menu } from './menu/menu';
import { LoginComponent } from './login/login'; // Импорт твоего компонента

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'restaurants', component: Restaurants },
  { path: 'menu/:id', component: Menu },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', redirectTo: 'login' }
];