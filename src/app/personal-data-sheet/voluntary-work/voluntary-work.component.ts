import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-voluntary-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voluntary-work.component.html',
  styleUrl: './voluntary-work.component.css'
})
export class VoluntaryWorkComponent {
  voluntaryWorkDetails = [
    { label: 'Name of Organization', type: 'text' },
    { label: 'Address of Organization', type: 'text' },
    { label: 'Inclusive Dates (From)', type: 'date' },
    { label: 'Inclusive Dates (To)', type: 'date' },
    { label: 'Number of Hours', type: 'number' },
    { label: 'Position/Nature of Work', type: 'text' }
  ];
}

export class NgModule { }
