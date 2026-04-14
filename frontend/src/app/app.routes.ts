import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cart', pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'history', component: HistoryComponent }
];