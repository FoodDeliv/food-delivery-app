import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any[] = [];

  addToCart(product: any) {
    this.items.push(product);
    console.log('Товар добавлен:', product.name);
  }

  getItems() {
    return this.items;
  }

  getTotalPrice() {
    return this.items.reduce((acc, item) => acc + (item.price || 0), 0);
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}