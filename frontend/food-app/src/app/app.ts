import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Restaurants } from './restaurants/restaurants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Restaurants], 
  templateUrl: './app.html', 
  styleUrl: './app.sass',
})
export class App {
  protected readonly title = signal('food-app');
}