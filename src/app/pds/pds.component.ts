import { Component, AfterViewInit, NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { SidebarNavigationModule } from './../sidebar-navigation/sidebar-navigation.module';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../Supabase/supabase.service';
import { CompensationRecordsComponent } from '../compensation-records/compensation-records.component';
import { LeavesAttendanceRecordsComponent } from '../leaves-attendance-records/leaves-attendance-records.component';
import 'flowbite';
import { Datepicker } from 'flowbite';

interface SidebarItem {
  name: string;
  route: string;
}



@Component({
  
  selector: 'app-pds',
  standalone: true,
  imports: [RouterModule, SidebarNavigationModule, CommonModule, CompensationRecordsComponent, LeavesAttendanceRecordsComponent],
  templateUrl: './pds.component.html',
  styleUrl: './pds.component.css'
})

export class PDSComponent implements AfterViewInit {

  public activeView: string = "General Information";
  public viewItems: string[] = ["General Information", "Employment Records", "Compensation Records", "DTR"];

  constructor(private router: Router, private supabaseService: SupabaseService) {}
  ngAfterViewInit() {
    this.initializeDropdown();
    this.initializeDatepicker();
  }

  // drop down set up
  private initializeDropdown() {
    // Manual initialization and event handling
    // This can be used as a fallback or for custom behavior
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownMenu = document.getElementById('dropdown');

    if (dropdownButton && dropdownMenu) {
      dropdownButton.addEventListener('click', function() {
        // Toggle the 'hidden' class to show/hide the dropdown
        dropdownMenu.classList.toggle('hidden');
      });
    }
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

  // navigation bar set up
  navBarItems: SidebarItem[] = [
    { name: 'Family Background', route: '/pds-family-background' }
  ];


  navigateTo = (route: string) => this.router.navigate([route]);

  // end of navigation bar set up

  switchComponent(view: string) {
    this.activeView = view;
  }

}
