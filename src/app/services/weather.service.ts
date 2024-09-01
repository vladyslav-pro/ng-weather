import { inject, Injectable, Signal, signal} from '@angular/core';
import {Observable, of} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {CurrentConditions} from '../current-conditions/current-conditions.type';
import {ConditionsAndZip} from '../conditions-and-zip.type';
import {Forecast} from '../forecasts-list/forecast.type';
import {LocationService} from './location.service';
import {CacheService} from './cache-data.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class WeatherService {
  private http = inject(HttpClient);
  private locationService = inject(LocationService);
  private cacheService = inject(CacheService);

  static URL = 'https://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
  private currentConditions = signal<ConditionsAndZip[]>([]);

  constructor() {
    this.locationService.locations$.subscribe(locations => {
      this.updateWeatherConditions(locations);
    });
  }

  private updateWeatherConditions(locations: string[]) {
    if (!Array.isArray(locations)) {
      locations = [];
    }
    const currentZips = this.currentConditions().map(condition => condition.zip);
    const newZips = locations.filter(zip => !currentZips.includes(zip));
    const removedZips = currentZips.filter(zip => !locations.includes(zip));

    removedZips.forEach(zipcode => {
      this.removeCurrentConditions(zipcode);
    });

    newZips.forEach(zipcode => {
      this.addCurrentConditions(zipcode);
    });
  }

  addCurrentConditions(zipcode: string): void {
    const cacheKey = `currentConditions_${zipcode}`;
    const cachedData = this.cacheService.getCache<CurrentConditions>(cacheKey);

    if (cachedData) {
      this.currentConditions.update(conditions => [...conditions, { zip: zipcode, data: cachedData }]);
    } else {
      // Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
      this.http.get<CurrentConditions>(`${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`)
          .subscribe(data => {
            this.currentConditions.update(conditions => [...conditions, {zip: zipcode, data}])
            this.cacheService.setCache(cacheKey, data);
          });
    }
  }

  removeCurrentConditions(zipcode: string) {
    const cacheKey = `currentConditions_${zipcode}`;
    this.cacheService.removeCache(cacheKey);
    this.currentConditions.update(conditions => conditions.filter(condition => condition.zip !== zipcode));
  }

  getCurrentConditions(): Signal<ConditionsAndZip[]> {
    return this.currentConditions.asReadonly();
  }

  getForecast(zipcode: string): Observable<Forecast> {
    const cacheKey = `forecast_${zipcode}`;
    const cachedForecast = this.cacheService.getCache<Forecast>(cacheKey);

    if (cachedForecast) {
      return of(cachedForecast);
    } else {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get<Forecast>(`${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`)
        .pipe(
            tap(forecast => this.cacheService.setCache(cacheKey, forecast))
        )
      }
  }

  getWeatherIcon(id): string {
    switch (true) {
      case (id >= 200 && id <= 232):
        return WeatherService.ICON_URL + 'art_storm.png';
      case (id >= 501 && id <= 511):
        return WeatherService.ICON_URL + 'art_rain.png';
      case (id === 500 || (id >= 520 && id <= 531)):
        return WeatherService.ICON_URL + 'art_light_rain.png';
      case (id >= 600 && id <= 622):
        return WeatherService.ICON_URL + 'art_snow.png';
      case (id >= 801 && id <= 804):
        return WeatherService.ICON_URL + 'art_clouds.png';
      case (id === 741 || id === 761):
        return WeatherService.ICON_URL + 'art_fog.png';
      default:
        return WeatherService.ICON_URL + 'art_clear.png';
    }
  }

}
