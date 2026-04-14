import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/api/orders/').subscribe({
      next: (data) => {
        this.orders = [...data];
      },
      error: (error) => {
        console.error('Load orders error:', error);
      }
    });
  }

  removeItem(itemId: number): void {
    this.http.post('http://127.0.0.1:8000/api/cart/remove/', {
      item_id: itemId
    }).subscribe({
      next: () => {
        this.loadOrders();
      },
      error: (error) => {
        console.error('Remove error:', error);
      }
    });
  }

  checkout(): void {
    this.http.post('http://127.0.0.1:8000/api/cart/checkout/', {}).subscribe({
      next: () => {
        alert('Order completed');
        this.loadOrders();
      },
      error: (error) => {
        console.error('Checkout error:', error);
      }
    });
  }
}