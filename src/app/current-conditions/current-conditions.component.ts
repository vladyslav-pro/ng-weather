import {Component, inject, Signal} from '@angular/core';
import {WeatherService} from '../weather.service';
import {ConditionsAndZip} from '../conditions-and-zip.type';
import {DecimalPipe} from '@angular/common';
import {CurrentConditionsItemComponent} from './current-conditions-item/current-conditions-item.component';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
  standalone: true,
  imports: [
    DecimalPipe,
    CurrentConditionsItemComponent
  ]
})
export class CurrentConditionsComponent {
  private weatherService = inject(WeatherService);

  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();
}
