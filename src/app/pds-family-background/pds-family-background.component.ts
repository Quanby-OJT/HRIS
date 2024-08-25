import { Component, AfterViewInit } from '@angular/core';
import {Route} from '@angular/router';

import 'flowbite';
import { Datepicker } from 'flowbite'

@Component({
  selector: 'app-pds-family-background',
  standalone: true,
  imports: [],
  templateUrl: './pds-family-background.component.html',
  styleUrl: './pds-family-background.component.css'
})
export class PdsFamilyBackgroundComponent implements AfterViewInit{
  ngAfterViewInit() {
    this.initializeDatepicker();
  }

  private initializeDatepicker() {
    const birthday = document.getElementById('children-birthday-date-picker') as HTMLInputElement;
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
}
