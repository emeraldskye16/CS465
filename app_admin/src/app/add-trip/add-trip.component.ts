import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})

export class AddTripComponent implements OnInit {
  public addForm!: FormGroup; // Ensure this is public
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trip: TripDataService
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  public async onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      try {
        const data: any = await firstValueFrom(this.trip.addTrip(this.addForm.value));
        console.log('Trip added:', data);
        this.router.navigate(['']);
      } catch (error: any) {
        console.log('Error adding trip:', error);
      }
    }
  }

  get f() {
    return this.addForm.controls;
  }
}
