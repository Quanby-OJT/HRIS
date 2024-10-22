import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import 'flowbite'; // Import Flowbite JS
import { Datepicker } from 'flowbite';
import { SidebarNavigationModule } from '../sidebar-navigation/sidebar-navigation.module';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../Supabase/supabase.service';
import { FormsModule } from '@angular/forms';

type LeaveStatus = 'Sick Leave' | 'Maternity Leave' | 'Vacation Leave';

@Component({
  selector: 'app-leaves-attendance-records',
  standalone: true,
  imports: [SidebarNavigationModule, CommonModule, FormsModule],
  templateUrl: './leaves-attendance-records.component.html',
  styleUrl: './leaves-attendance-records.component.css'
})
// export class LeavesAttendanceRecordsComponent implements AfterViewInit, OnInit - for when enabling calendar
export class LeavesAttendanceRecordsComponent implements OnInit {
  @ViewChild('datePickerInput') datepickerInput!: ElementRef<HTMLInputElement>;

  leaveRequests: any[] = [];

  isManaging: boolean = false;
  isAdjusting: boolean = false;

  adjustButtonText: string = 'Adjust Schedule';
  manageButtonText: string = 'Manage Requests';

  isModalOpen = false; 
  selectedRequest: any = null;
  newStatus: LeaveStatus = 'Sick Leave'; //temp status

  adjustLeaveAmount: number = 0;


  
  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.leaveRequests = await this.supabaseService.getLeaveRequests();
    console.log(this.leaveRequests);
  }

  // ngAfterViewInit(): void {
  //   const datePicker = document.getElementById('default-datepicker');
  //   if(datePicker){
  //     const calendar = new Datepicker(datePicker);
  //     calendar.setDate(new Date());
  //     console.log("-----------------");
  //     console.log(calendar.getDate());
  //   }

  //   this.datepickerInput.nativeElement.addEventListener('blur', (event: Event) => {
  //     console.log('Date changed:', (event.target as HTMLInputElement).value);
  //   });
  // }

  onManageButtonClick(){
    this.isManaging = !this.isManaging;
    this.manageButtonText = this.manageButtonText === 'Manage Requests' ? 'Stop Managing Requests' : 'Manage Requests'
  }

  onAdjustButtonClick(){
    this.isAdjusting = !this.isAdjusting;
    this.adjustButtonText = this.adjustButtonText === 'Adjust Schedule' ? 'Stop Adjusting Schedule' : 'Adjust Schedule'
  }

  openModal(request: any) {
    this.selectedRequest = request;
    this.isModalOpen = true;
    this.newStatus = request.status;  
  }
  
  closeModal() {
    this.isModalOpen = false; 
    this.selectedRequest = null; 
  }

  onUpdateClicked() {
    //update leave balance
    const newBalance = (this.selectedRequest.leave_balance || 0) + this.adjustLeaveAmount;
    this.supabaseService.updateLeaveBalance(this.selectedRequest.id, newBalance)
      .then(updatedData => {
        if (updatedData) {
            console.log('Status updated in Supabase:', updatedData);
        } else {
            console.error('Failed to update status in Supabase');
        }
      });
    this.selectedRequest.leave_balance = newBalance;
    this.adjustLeaveAmount = 0;
    //update request status
    if (this.selectedRequest) {
        this.selectedRequest.status = this.newStatus;
        this.supabaseService.updateLeaveRequestStatus(this.selectedRequest.id, this.newStatus)
            .then(updatedData => {
                if (updatedData) {
                    console.log('Status updated in Supabase:', updatedData);
                } else {
                    console.error('Failed to update status in Supabase');
                }
            });
        this.closeModal()
    }

    
  }

}
  
  // onDateChange(){
  //   console.log("-----------------");
  //   console.log("changed!")
  //   console.log("-----------------")
  // }

