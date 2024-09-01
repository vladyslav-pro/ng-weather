import {Component, inject} from '@angular/core';
import {LocationService} from '../location.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
  imports: [
    ReactiveFormsModule
  ],
  standalone: true
})
export class ZipcodeEntryComponent {
  private service = inject(LocationService)
  zipcodeForm = new FormGroup({
    zipcode: new FormControl('', [Validators.required])
  })

  onSubmit(): void {
    this.service.addLocation(this.zipcodeForm.value.zipcode);
    this.zipcodeForm.reset();
  }

}
