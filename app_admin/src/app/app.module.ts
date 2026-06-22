import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { TripEditComponent } from './edit-trip/edit-trip.component';

@NgModule({
  declarations: [],   // <-- EMPTY because components are standalone

  imports: [
    BrowserModule,
    AppComponent,
    TripListingComponent,
    AddTripComponent,
    TripEditComponent
  ],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule {}
