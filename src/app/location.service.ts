import { Injectable } from '@angular/core';
import {WeatherService} from './weather.service';
import {BehaviorSubject, Observable} from 'rxjs';

export const LOCATIONS = 'locations';

@Injectable()
export class LocationService {
  private locationSubject = new BehaviorSubject<string[]>([]);
  locations$: Observable<string[]> = this.locationSubject.asObservable();

  constructor() {
    const locString = localStorage.getItem(LOCATIONS);
    if (locString) {
      this.locationSubject.next(JSON.parse(locString));
    }
  }

  addLocation(zipcode: string) {
    const currentLocations = this.locationSubject.value;
    const updatedLocations = [...currentLocations, zipcode];
    this.locationSubject.next(updatedLocations);
    localStorage.setItem(LOCATIONS, JSON.stringify(updatedLocations));
  }

  removeLocation(zipcode: string) {
    const currentLocations = this.locationSubject.value;
    const updatedLocations = currentLocations.filter(loc => loc !== zipcode);
    this.locationSubject.next(updatedLocations);
    localStorage.setItem(LOCATIONS, JSON.stringify(updatedLocations));
  }
}
