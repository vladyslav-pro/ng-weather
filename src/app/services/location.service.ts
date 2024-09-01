import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CacheService} from './cache-data.service';

export const LOCATIONS = 'locations';

@Injectable()
export class LocationService {
  private cacheService = inject(CacheService);

  private locationSubject = new BehaviorSubject<string[]>([]);
  locations$: Observable<string[]> = this.locationSubject.asObservable();

  constructor() {
    const cachedLocations = this.cacheService.getCache<string[]>(LOCATIONS);
    const locations = cachedLocations ? cachedLocations : [];
    this.locationSubject.next(locations);
  }

  addLocation(zipcode: string) {
    const currentLocations = Array.isArray(this.locationSubject.value) ? this.locationSubject.value : [];
    const updatedLocations = [...currentLocations, zipcode];
    this.locationSubject.next(updatedLocations);
    this.cacheService.setCache(LOCATIONS, updatedLocations);

  }

  removeLocation(zipcode: string) {
    const currentLocations = this.locationSubject.value;
    const updatedLocations = currentLocations.filter(loc => loc !== zipcode);
    this.locationSubject.next(updatedLocations);
    this.cacheService.setCache(LOCATIONS, updatedLocations);

  }
}
