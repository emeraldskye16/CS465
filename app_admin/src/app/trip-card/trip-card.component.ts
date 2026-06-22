import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip!: Trip;

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  isLoggedOn(): boolean {
    return this.auth.isLoggedIn();
  }

  editTrip(trip: Trip): void {
    console.log('TripCardComponent#editTrip setting tripCode in localStorage', trip.code);
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    console.log('TripCardComponent#editTrip routing to TripEditComponent');
    this.router.navigate(['edit-trip']);
  }
}
