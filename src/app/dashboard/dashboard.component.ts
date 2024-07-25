import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SupabaseService } from '../Supabase/supabase.service';
import { SidebarNavigationModule } from '../sidebar-navigation/sidebar-navigation.module';
import { CalendarMonthViewDay } from 'angular-calendar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarNavigationModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isExpanded = false;
  userEmail: string = ''; // Declare userEmail
  totalEmployees: string = '0'; // Add this line to store total employees as a string
  hasTimedIn: boolean = false; // Property to track if user has timed in

  constructor(private router: Router, private supabaseService: SupabaseService) {}

  viewDate: Date = new Date();

  dayClicked(day: CalendarMonthViewDay): void {
    alert(`Clicked on ${day.date}`);
  }

  async ngOnInit() {
    await this.fetchUserEmail();
    await this.fetchDashboardData();
    await this.checkTimeInStatus(); // Check if the user has timed in
  }

  async fetchDashboardData() {
    try {
      const response = await this.supabaseService.getEmployees();
      if (!response.error) {
        const totalEmployees = response.data.length.toString(); // Convert to string
        this.totalEmployees = totalEmployees;
      } else {
        console.error('Error fetching employees:', response.error.message);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }

  async checkTimeInStatus() {
    try {
      if (!this.userEmail) {
        throw new Error('User email not available');
      }
      this.hasTimedIn = await this.supabaseService.hasTimedInToday(this.userEmail);
    } catch (error) {
      console.error('Error checking time in status:', error);
      this.hasTimedIn = false; // Default to false if there's an error
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  expandSidebar() {
    setTimeout(() => {
      this.isExpanded = true;
    }, 100);
  }

  collapseSidebar() {
    setTimeout(() => {
      this.isExpanded = false;
    }, 300);
  }

  getIconForRoute(route: string): string {
    switch (route) {
      case '/dashboard': return 'dashboard';
      case '/user-management': return 'group';
      case '/system-management': return 'settings';
      case '/payroll': return 'attach_money';
      case '/performance': return 'trending_up';
      case '/recruitment': return 'person_add';
      case '/reports': return 'assessment';
      default: return 'circle';
    }
  }

  async fetchUserEmail() {
    try {
      const { data: { user }, error: userError } = await this.supabaseService.getUser();
      if (userError) {
        console.error('User authentication error:', userError.message);
        throw userError;
      }
      if (!user || !user.email) {
        throw new Error('No authenticated user found or email is missing');
      }

      console.log('Fetched user email:', user.email);
      this.userEmail = user.email!; // Use non-null assertion operator
    } catch (error) {
      console.error('Error fetching user email:', error);
      this.userEmail = ''; // Set to empty string if there's an error
    }
  }

  async timeIn() {
    try {
      const name = this.userEmail;

      if (!name) {
        throw new Error('User email not available');
      }

      // Check if the user has already timed in today
      const hasTimedIn = await this.supabaseService.hasTimedInToday(name);
      if (hasTimedIn) {
        alert('You have already timed in today. You can only time in once per day.');
        return;
      }

      const status = 'Time In';
      const result = await this.supabaseService.insertDTRRecord(status, name);
      console.log('Time In recorded successfully:', result);
      alert('Time In recorded successfully');
      this.hasTimedIn = true; // Update the status after successful time in
    } catch (error) {
      console.error('Error recording Time In:', error);
      if (error instanceof Error) {
        alert(`Error recording Time In: ${error.message}`);
      } else {
        alert('Error recording Time In. Please try again.');
      }
    }
  }

  async timeOut() {
    try {
      const name = this.userEmail;

      if (!name) {
        throw new Error('User email not available');
      }

      const result = await this.supabaseService.updateDTRClockOut(name);
      if (result.error) {
        throw result.error;
      }
      console.log('Time Out recorded successfully:', result.data);
      alert('Time Out recorded successfully');
      this.hasTimedIn = false; // Update the status after successful time out
    } catch (error) {
      console.error('Error recording Time Out:', error);
      if (error instanceof Error) {
        alert(`Error recording Time Out: ${error.message}`);
      } else {
        alert('Error recording Time Out. Please try again.');
      }
    }
  }
}
