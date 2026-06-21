import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private url = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  public getTrips() {
    console.log('TripDataService#getTrips', `${this.url}/trips`);
    return this.httpClient.get<Trip[]>(`${this.url}/trips`);
  }

  public getTrip(tripCode: string) {
    console.log('TripDataService#getTrip', `${this.url}/trips/${tripCode}`);
    return this.httpClient.get<Trip>(`${this.url}/trips/${tripCode}`);
  }

  public addTrip(formData: Trip) {
    return this.httpClient.post<Trip>(`${this.url}/trips`, formData);
  }

  public updateTrip(formData: Trip) {
    return this.httpClient.put<Trip>(`${this.url}/trips/${formData.code}`, formData);
  }

  public deleteTrip(tripCode: string) {
    return this.httpClient.delete(`${this.url}/trips/${tripCode}`);
  }
}
