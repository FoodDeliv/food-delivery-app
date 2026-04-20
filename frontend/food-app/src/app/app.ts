import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar';
import { CommonModule } from '@angular/common';
import { NotificationService } from './services/notification'; // Импортируй свой сервис

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.sass',
  imports: [
    CommonModule,
    RouterOutlet, 
    NavbarComponent 
  ],
})
 export class App {
  protected readonly title = signal('food-app');
  
  // Объявляем переменную, но не присваиваем значение сразу
  notification$;

  constructor(private notificationService: NotificationService) {
    // Присваиваем значение здесь, когда сервис уже точно доступен
    this.notification$ = this.notificationService.notification$;
  }
}