import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { Restaurants } from './restaurants/restaurants';
=======
import { NavbarComponent } from './navbar/navbar';
import { CommonModule } from '@angular/common';
import { NotificationService } from './services/notification'; // Импортируй свой сервис
>>>>>>> 9e5c6dc834bc0a38655557944517bd879b49b812

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, Restaurants], 
  templateUrl: './app.html', 
  styleUrl: './app.sass',
=======
  templateUrl: './app.html',
  styleUrl: './app.sass',
  imports: [
    CommonModule,
    RouterOutlet, 
    NavbarComponent 
  ],
>>>>>>> 9e5c6dc834bc0a38655557944517bd879b49b812
})
 export class App {
  protected readonly title = signal('food-app');
<<<<<<< HEAD
=======
  
  // Объявляем переменную, но не присваиваем значение сразу
  notification$;

  constructor(private notificationService: NotificationService) {
    // Присваиваем значение здесь, когда сервис уже точно доступен
    this.notification$ = this.notificationService.notification$;
  }
>>>>>>> 9e5c6dc834bc0a38655557944517bd879b49b812
}