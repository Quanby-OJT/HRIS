import { Component, AfterViewInit  } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { SidebarNavigationModule } from './../sidebar-navigation/sidebar-navigation.module';
import 'flowbite'; // Import Flowbite JS
import { Datepicker } from 'flowbite';

@Component({
  selector: 'app-pimam',
  standalone: true,
  imports: [RouterModule, SidebarNavigationModule],
  templateUrl: './pimam.component.html',
  styleUrl: './pimam.component.css'
})
export class PimamComponent implements AfterViewInit{
  // initialize the datepicker
  ngAfterViewInit(): void {
      const datePicker = document.getElementById('datepicker-inline');
      if(datePicker){
        const calendar = new Datepicker(datePicker);
        calendar.show();
      }
  }

  
}
