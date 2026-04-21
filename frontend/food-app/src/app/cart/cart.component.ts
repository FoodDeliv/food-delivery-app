import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Добавили импорт
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  selectedItems: number[] = [];
  
  private readonly baseUrl = 'http://127.0.0.1:8000/api/auth/';

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef // Добавили в конструктор
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  private getOptions() {
    const token = localStorage.getItem('access_token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  loadCart(): void {
    const options = this.getOptions();
    
    this.http.get<any>(`${this.baseUrl}cart/`, options).subscribe({
      next: (data) => {
        console.log('ЧТО ПРИШЛО ИЗ DJANGO:', data);
        this.cartItems = data.items || []; 
        this.totalPrice = data.total_price || 0;
        
        // ПРИНУДИТЕЛЬНОЕ ОБНОВЛЕНИЕ ЭКРАНА
        this.cd.detectChanges(); 
      },
      error: (err) => {
        console.error('ОШИБКА ЗАГРУЗКИ:', err);
      }
    });
  }

  removeItem(itemId: number): void {
    if (confirm('Удалить этот товар из корзины?')) {
      this.http.post(`${this.baseUrl}cart/remove/`, { item_id: itemId }, this.getOptions()).subscribe({
        next: () => this.loadCart(),
        error: (err) => console.error('Ошибка удаления:', err)
      });
    }
  }

  checkout(): void {
    if (this.cartItems.length === 0) return;
    
    this.http.post(`${this.baseUrl}cart/checkout/`, {}, this.getOptions()).subscribe({
      next: () => {
        alert('Заказ успешно оформлен!');
        this.loadCart();
      },
      error: (err) => alert('Ошибка при оформлении заказа')
    });
  }
}