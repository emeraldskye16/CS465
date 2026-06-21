import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css'],
})
export class TripEditComponent {
  editTripFormGroup!: FormGroup;
  submitted = false;
  private tripCode: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit() {
    // Retrieve stashed trip ID

    this.tripCode = localStorage.getItem('tripCode');

    if (!this.tripCode) {
      console.error("Couldn't find tripCode in localStorage");
      this.router.navigate(['']);
      return;
    }

    // Initialize form
    this.editTripFormGroup = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    // Load trip data
    this.tripService.getTrip(this.tripCode).subscribe({
      next: (data) => {
        console.log('TripEditComponent#onInit data', data);
        this.editTripFormGroup.patchValue(data);
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.editTripFormGroup.valid) {
      this.tripService.updateTrip(this.editTripFormGroup.value).subscribe({
        next: () => this.router.navigate(['']),
        error: (err) => console.error(err)
      });
    }
  }

  deleteTrip() {
    if (this.tripCode) {
      this.tripService.deleteTrip(this.tripCode).subscribe({
        next: () => this.router.navigate(['']),
        error: (err) => console.error(err)
      });
    } else {
      console.error('Trip code missing during delete');
      this.router.navigate(['']);
    }
  }

  get f() {
    return this.editTripFormGroup.controls;
  }
}
