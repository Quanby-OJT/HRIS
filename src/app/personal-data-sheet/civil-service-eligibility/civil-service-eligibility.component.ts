import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-civil-service-eligibility',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './civil-service-eligibility.component.html',
  styleUrl: './civil-service-eligibility.component.css'
})
export class CivilServiceEligibilityComponent {
  civilServiceEligibilityInfo = [
    { label: 'Career Service', type: 'text' },
    { label: 'Rating', type: 'number' }, // e.g., percentage or score
    { label: 'Date of Examination/Conferment', type: 'date' },
    { label: 'Place of Examination/Conferment', type: 'text' },
    { label: 'License Number', type: 'text' }, // Optional
    { label: 'Date of Validity', type: 'date' } // Optional
  ];
}

export class NgModule { }
