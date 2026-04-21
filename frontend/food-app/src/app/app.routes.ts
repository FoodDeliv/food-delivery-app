import { Routes } from '@angular/router';
import { Restaurants } from './restaurants/restaurants';
import { LoginComponent } from './login/login';
import { SearchResultsComponent } from './search-results/search-results';
// Удали старый RestaurantMenuComponent, если он тебе не нужен
// Импортируй СВОЙ класс Menu
import { Menu } from './menu/menu'; 
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'restaurants', component: Restaurants },
  // ИСПРАВЛЕНО: Теперь путь ведет на твой обновленный компонент
  { path: 'menu/:id', component: Menu }, 
  { path: 'search', component: SearchResultsComponent },
  { path: 'order', component: OrderComponent },
  { path: 'cart', component: CartComponent },
  { path: 'history', component: HistoryComponent },
  { path: '', redirectTo: 'restaurants', pathMatch: 'full' },
  { path: '**', redirectTo: 'restaurants' }
];