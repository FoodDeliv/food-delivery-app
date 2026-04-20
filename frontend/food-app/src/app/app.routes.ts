import { Routes } from '@angular/router';
import { Restaurants } from './restaurants/restaurants';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu';
import { LoginComponent } from './login/login';
import { SearchResultsComponent } from './search-results/search-results';

import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'restaurants', component: Restaurants },
  { path: 'menu/:id', component: RestaurantMenuComponent },
  { path: 'search', component: SearchResultsComponent },

  { path: 'order', component: OrderComponent },
  { path: 'cart', component: CartComponent },
  { path: 'history', component: HistoryComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];