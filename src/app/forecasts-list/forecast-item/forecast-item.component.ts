import {Component, inject, Input} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import {WeatherService} from '../../weather.service';
import { List} from '../forecast.type';

@Component({
  selector: 'forecast-item',
  standalone: true,
    imports: [
        DatePipe,
        DecimalPipe
    ],
  templateUrl: './forecast-item.component.html',
  styleUrl: './forecast-item.component.css'
})
export class ForecastItemComponent {
    @Input({required: true}) dailyForecast: List;

    protected weatherService = inject(WeatherService);

}
