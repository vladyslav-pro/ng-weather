import {Component, inject, Signal} from '@angular/core';
import {WeatherService} from '../weather.service';
import {ConditionsAndZip} from '../conditions-and-zip.type';
import {DecimalPipe} from '@angular/common';
import {CurrentConditionsItemComponent} from './current-conditions-item/current-conditions-item.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {LocationService} from '../location.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
  standalone: true,
  imports: [
    DecimalPipe,
    CurrentConditionsItemComponent,
    MatTabsModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class CurrentConditionsComponent {
  private weatherService = inject(WeatherService);
  protected locationService = inject(LocationService);

  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

  removeLocation(zip: string): void {
    this.locationService.removeLocation(zip);
  }
}
