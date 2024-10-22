import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css'
})
export class WorkExperienceComponent {
  workExperienceInformation = [
    { label: 'Position Title', type: 'text' },
    { label: 'Department/Agency/Office/Company', type: 'text' },
    { label: 'Monthly Salary', type: 'number' }, // e.g., in currency value
    { label: 'Salary Grade & Step Increment', type: 'text' }, // Optional for government positions
    { label: 'Status of Appointment', type: 'text' }, // e.g., Permanent, Temporary, Casual
    { label: 'Inclusive Dates (From)', type: 'date' },
    { label: 'Inclusive Dates (To)', type: 'date' },
    { label: 'Government Service (Yes/No)', type: 'dropdown', options: ['Yes', 'No'] }
  ];
}

export class NgModule { }
