import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar'; // Убедись, что путь верный
import { CommonModule } from '@angular/common';
import { NotificationService } from './services/notification';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.sass',
  imports: [
    CommonModule,   // Нужно для *ngIf и [ngClass]
    RouterOutlet, 
    NavbarComponent // Обязательно добавь сюда, чтобы 'app-navbar' заработал
  ],
})
export class App {
  protected readonly title = signal('food-app');
  notification$;

  constructor(private notificationService: NotificationService) {
    this.notification$ = this.notificationService.notification$;
  }
}