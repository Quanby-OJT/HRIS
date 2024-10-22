import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-learning-and-development-interventions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learning-and-development-interventions.component.html',
  styleUrl: './learning-and-development-interventions.component.css'
})
export class LearningAndDevelopmentInterventionsComponent {
  learningAndDevelopmentDetails = [
    { label: 'Title of Learning and Development Intervention/Training Program', type: 'text' },
    { label: 'Inclusive Dates of Attendance (From)', type: 'date' },
    { label: 'Inclusive Dates of Attendance (To)', type: 'date' },
    { label: 'Number of Hours', type: 'number' },
    { label: 'Type of LD (Managerial/Technical/Etc.)', type: 'dropdown', options: ['Managerial', 'Technical', 'Supervisory', 'Foundational'] },
    { label: 'Conducted/Sponsored by', type: 'text' },
    { label: 'Certificate Given (Yes/No)', type: 'dropdown', options: ['Yes', 'No'] }
  ];
}

export class NgModule { }
