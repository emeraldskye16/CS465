import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';


@Component({
  selector: 'app-trip-edit',
  template: '',
})
class TripListingComponent {}

describe('TripListingComponent', () => {
  let component: TripListingComponent;
  let fixture: ComponentFixture<TripListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TripListingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
