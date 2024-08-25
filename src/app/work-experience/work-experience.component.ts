import { Component, AfterViewInit  } from '@angular/core';
import { CommonModule } from '@angular/common';

import 'flowbite';
import { Datepicker } from 'flowbite';

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css'
})
export class WorkExperienceComponent implements AfterViewInit{
  isModalVisible = false;

  toggleModal(modalId: string): void {
    this.isModalVisible = !this.isModalVisible;
  }

  ngAfterViewInit() {
    this.initializeDatepicker();
  }
  // end of drop down set up

  // date picker set up
  private initializeDatepicker() {
    const birthday = document.getElementById('birthday-date-picker') as HTMLInputElement;
    if (birthday) {
      new Datepicker(birthday, {
        // Datepicker options
        format: 'mm-dd-yyyy'
        // Add more options as needed
      });
    } else {
      console.error('Datepicker element not found');
    }
  }
  // end of date picker set up
}
