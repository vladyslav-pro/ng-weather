import {Component, inject, Input} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {WeatherService} from '../../services/weather.service';
import {ConditionsAndZip} from '../../conditions-and-zip.type';

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
  @Input({required: true}) location: ConditionsAndZip ;

  private router = inject(Router);

  protected weatherService = inject(WeatherService);

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode])
  }
}
