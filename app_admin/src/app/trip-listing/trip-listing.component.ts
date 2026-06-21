import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  imports: [CommonModule, NgFor, TripCardComponent],
})

export class TripListingComponent implements OnInit, OnDestroy {
  trips: Trip[] = [];
  message: string = 'Loading trips...';
  statusMessage: string = 'waiting';
  responseJson: string = '';
  private navSub: any;

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.message = 'Loading trips...';
    this.getTrips();
    // Refresh trips when navigation ends (e.g., after returning from add/edit)
    this.navSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.message = 'Loading trips...';
        this.getTrips();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.navSub) {
      this.navSub.unsubscribe();
    }
  }

  private getTrips(): void {
  console.log('TripListingComponent#getTrips calling TripDataService#getTrips');
  this.statusMessage = 'requesting';
  this.tripDataService.getTrips().subscribe({
    next: (foundTrips) => {
      console.log('Trips received:', foundTrips);
      this.statusMessage = 'success';
      this.responseJson = JSON.stringify(foundTrips);
      this.trips = foundTrips;
      this.message = foundTrips.length > 0 ? '' : 'No trips found';
      this.cd.detectChanges();
    },
    error: (err) => {
      console.error('Trip listing error:', err);
      this.statusMessage = 'error';
      this.responseJson = JSON.stringify(err);
      this.message = 'Error retrieving trips: ' + (err.message || err.statusText || 'unknown');
    }
  });
}

  public addTrip(): void {
    console.log('TripListingComponent#addTrip routing to TripAddComponent');
    this.router.navigate(['/add-trip']);
  }
}