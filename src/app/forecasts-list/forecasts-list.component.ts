import { Component } from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Forecast} from './forecast.type';
import {DatePipe, DecimalPipe} from '@angular/common';
import {ForecastItemComponent} from './forecast-item/forecast-item.component';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css'],
  imports: [
    DatePipe,
    DecimalPipe,
    ForecastItemComponent,
    RouterLink
  ],
  standalone: true
})
export class ForecastsListComponent {

  zipcode: string;
  forecast: Forecast;

  constructor(protected weatherService: WeatherService, route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.zipcode = params['zipcode'];
      weatherService.getForecast(this.zipcode)
        .subscribe(data => this.forecast = data);
    });
  }
}
