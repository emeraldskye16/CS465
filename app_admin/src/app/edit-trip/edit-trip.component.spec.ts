import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripEditComponent } from './edit-trip.component';

describe('TripEditComponent', () => {
  let component: TripEditComponent;
  let fixture: ComponentFixture<TripEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TripEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
