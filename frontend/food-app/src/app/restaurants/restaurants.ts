import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.html',
  imports: [CommonModule], 
  styleUrls: ['./restaurants.sass'],
})
export class Restaurants implements OnInit {

  restaurants: any[] = [];

  constructor(private api: ApiService, private router: Router
  ) {}

  ngOnInit() {
    this.api.getRestaurants().subscribe((data: any) => {
      this.restaurants = data;
    });
  }
  openMenu(id: number) {
    this.router.navigate(['/menu', id]);
  }
}