import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

interface Field {
  label : string,
  type : string,
  options? : string[],
  value?: string,
  defaultValue?: string
}

@Component({
  selector: 'app-learning-and-development-interventions',
  standalone: true,
  imports: [CommonModule, CalendarModule, DropdownModule, FormsModule],
  templateUrl: './learning-and-development-interventions.component.html',
  styleUrl: './learning-and-development-interventions.component.css'
})
export class LearningAndDevelopmentInterventionsComponent {
  date: Date | undefined;

  learningAndDevelopmentDetails : Field[] = [
    { label: 'Title of Learning and Development Intervention/Training Program', type: 'text' },
    { label: 'Inclusive Dates of Attendance (From)', type: 'date' },
    { label: 'Inclusive Dates of Attendance (To)', type: 'date' },
    { label: 'Number of Hours', type: 'text' },
    { label: 'Type of LD (Managerial/Technical/Etc.)', type: 'dropdown', options: ['Managerial', 'Technical', 'Supervisory', 'Foundational'] },
    { label: 'Conducted/Sponsored by', type: 'text' },
    { label: 'Certificate Given', type: 'boolean', options: ['Yes', 'No'] }
  ];

  toggleDropdown(dropdownId : string) {
    const dropdownButton = document.getElementById(dropdownId+'dropdownButton');
    const dropdownPanel = document.getElementById(dropdownId+'dropdownPanel');


    if (dropdownButton && dropdownPanel) {
      dropdownPanel.classList.toggle('hidden');
    }
  }

  selectOption(field: Field, option: string) {
    const dropdownPanel = document.getElementById(field.label+'dropdownPanel');

    field.value = option;

    if (dropdownPanel) {
      dropdownPanel.classList.add('hidden');
    }
  }
}

export class NgModule { }
