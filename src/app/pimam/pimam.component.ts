import { Component, AfterViewInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SidebarNavigationModule } from '../sidebar-navigation/sidebar-navigation.module';
import 'flowbite'; // Import Flowbite JS
import { Datepicker } from 'flowbite';
import { SupabaseService } from '../Supabase/supabase.service';

// TEMPORARY INTERFACE. SHOULD FOLLOW AND MOVE TO /models
interface Attendance {
  id: number;
  name: string;
  status: string;
  schedule_in: string;
  schedule_out: string;
  clock_in: string;
  clock_out: string;
  OT_IN: string;
  OT_OUT: string;
  selected?: boolean;
}
@Component({
  selector: 'app-pimam',
  standalone: true,
  imports: [RouterModule, SidebarNavigationModule, CommonModule],
  templateUrl: './pimam.component.html',
  styleUrl: './pimam.component.css'
})
export class PimamComponent implements AfterViewInit{
  
  public attendanceRecords: Attendance[] = [];
  public daysPresent: Attendance[] = [];
  public daysAbsent: Attendance[] = [];
  public daysTardy: Attendance[] = [];


  constructor(private router: Router, private supabaseService: SupabaseService) {}
  // initialize the datepicker
  ngAfterViewInit(): void {
      const datePicker = document.getElementById('datepicker-inline');
      if(datePicker){
        const calendar = new Datepicker(datePicker);
        calendar.show();
      }
  }

  ngOnInit(): void {
    this.initializeData();
  }

  private async initializeData(): Promise<void> {
    try {
      await this.loadAttendances();
      this.getPresentDays();
      this.getAbsentDays();
      this.getTardyDays();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
  private async loadAttendances(): Promise<void> {
    try {
      //filters the attendance record based on the person logged in
      this.attendanceRecords = await this.supabaseService.getAttendances();
      this.attendanceRecords = this.attendanceRecords.filter((record) => record.name === 'carlo@yahoo.com');
    } catch (error) {
      console.error('Error loading attendances:', error);
    }
  }

  private async getPresentDays(): Promise<void> {
    try{
      console.log(this.attendanceRecords);
      this.daysPresent = await this.attendanceRecords.filter((record) => record.clock_in !== null && record.clock_out !== null);
      console.log(this.daysPresent);
    } catch (error) {
      console.error('Error loading attendances:', error);
    }
  }

  private async getAbsentDays(): Promise<void> {
    try{
      this.daysAbsent = await this.attendanceRecords.filter((record) => record.clock_in === null && record.clock_out === null);
    } catch (error) {
      console.error('Error loading attendances:', error);
    }
  }

  private async getTardyDays(): Promise<void> {
    try{
      this.daysTardy = await this.attendanceRecords.filter((record) => record.clock_in > record.schedule_in);
    } catch (error) {
      console.error('Error loading attendances:', error);
    }
  }
}
