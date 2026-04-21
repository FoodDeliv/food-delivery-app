import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orders: any[] = [];
  selectedItems: number[] = [];
  // Используем прямой URL, так как в ApiService переменные скрыты (private)
  private readonly baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // Получаем заголовки с токеном авторизации
  private getOptions() {
    const token = localStorage.getItem('access_token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  loadOrders(): void {
    this.http.get<any[]>(`${this.baseUrl}orders/`, this.getOptions()).subscribe({
      next: (data) => {
        // Оставляем только те заказы, где есть товары (активная корзина)
        this.orders = data.filter(order => order.items && order.items.length > 0);
        this.selectedItems = [];
      },
      error: (error) => console.error('Ошибка загрузки корзины:', error)
    });
  }

  // --- Управление количеством ---
  increaseQuantity(itemId: number): void {
    this.cartAction('update-quantity', { item_id: itemId, action: 'increase' });
  }

  decreaseQuantity(itemId: number): void {
    this.cartAction('update-quantity', { item_id: itemId, action: 'decrease' });
  }

  removeItem(itemId: number): void {
    this.cartAction('remove', { item_id: itemId });
  }

  private cartAction(endpoint: string, body: any) {
    this.http.post(`${this.baseUrl}cart/${endpoint}/`, body, this.getOptions()).subscribe({
      next: () => this.loadOrders(),
      error: (error) => console.error(`Ошибка ${endpoint}:`, error)
    });
  }

  // --- Логика выбора (Selection) ---
  toggleItemSelection(itemId: number): void {
    if (this.selectedItems.includes(itemId)) {
      this.selectedItems = this.selectedItems.filter(id => id !== itemId);
    } else {
      this.selectedItems = [...this.selectedItems, itemId];
    }
  }

  isItemSelected(itemId: number): boolean {
    return this.selectedItems.includes(itemId);
  }

  getSelectedCount(): number {
    return this.selectedItems.length;
  }

  // --- Выбрать всё / Снять выделение ---
  toggleSelectAll(): void {
    if (this.areAllItemsSelected()) {
      this.selectedItems = [];
    } else {
      const allIds: number[] = [];
      this.orders.forEach(order => {
        order.items.forEach((item: any) => allIds.push(item.id));
      });
      this.selectedItems = allIds;
    }
  }

  areAllItemsSelected(): boolean {
    const allIds: number[] = [];
    this.orders.forEach(order => {
      order.items.forEach((item: any) => allIds.push(item.id));
    });
    return allIds.length > 0 && allIds.every(id => this.selectedItems.includes(id));
  }

  deleteSelected(): void {
    if (this.selectedItems.length === 0) return;
    this.http.post(`${this.baseUrl}cart/delete-selected/`, { item_ids: this.selectedItems }, this.getOptions()).subscribe({
      next: () => this.loadOrders(),
      error: (error) => console.error('Ошибка удаления выбранных:', error)
    });
  }

  // --- Итоги и оформление ---
  getTotalItems(order: any): number {
    return order.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
  }

  getTotalPrice(order: any): number {
    return order.items.reduce((sum: number, item: any) => sum + (item.food_price * item.quantity), 0);
  }

  clearCart(): void {
    this.http.post(`${this.baseUrl}cart/clear/`, {}, this.getOptions()).subscribe({
      next: () => this.loadOrders(),
      error: (error) => console.error('Ошибка очистки:', error)
    });
  }

  checkout(): void {
    this.http.post(`${this.baseUrl}cart/checkout/`, {}, this.getOptions()).subscribe({
      next: () => {
        alert('Заказ успешно оформлен! Проверьте историю заказов.');
        this.loadOrders();
      },
      error: (error) => alert('Ошибка при оформлении заказа')
    });
  }
}