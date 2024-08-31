import {Component, inject, Input} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {LocationService} from '../../location.service';
import {WeatherService} from '../../weather.service';

@Component({
  selector: 'current-conditions-item',
  standalone: true,
  imports: [
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './current-conditions-item.component.html',
  styleUrl: './current-conditions-item.component.css'
})
export class CurrentConditionsItemComponent {
  @Input({required: true}) location ;

  private router = inject(Router);
  protected locationService = inject(LocationService);
  protected weatherService = inject(WeatherService);

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode])
  }
}
