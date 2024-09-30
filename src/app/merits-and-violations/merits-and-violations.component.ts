import { Component, OnInit } from '@angular/core';
import { SidebarNavigationModule } from '../sidebar-navigation/sidebar-navigation.module';
import { SupabaseService } from '../Supabase/supabase.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-merits-and-violations',
  standalone: true,
  imports: [SidebarNavigationModule, ReactiveFormsModule, CommonModule , FormsModule],
  templateUrl: './merits-and-violations.component.html',
  styleUrls: ['./merits-and-violations.component.css']
})
export class MeritsAndViolationsComponent implements OnInit {
  meritsViolationsForm: FormGroup;
  profiles: any[] = [];
  filteredProfiles: any[] = []; // To hold the filtered profiles for search
  selectedProfile: any; // To hold the selected profile
  showForm: boolean = false; // To toggle the visibility of the form
  records: any[] = []; // To hold merits and violations records
  searchTerm: string = ''; // For search functionality
  isEditing: boolean = false; // Manage mode
  currentPage: number = 1; // For pagination
  pageSize: number = 10; // Number of items per page
  totalPages: number = 1; // Total number of pages
  paginatedProfiles: any[] = [];

  constructor(private fb: FormBuilder, private supabaseService: SupabaseService) {
    this.meritsViolationsForm = this.fb.group({
      violations: [''],
      merits: [''],
      date_of_record_v: [null],
      date_of_record_m: [null],
      user_id: [null, Validators.required]
    });
  }

  async ngOnInit() {
    const { data: profiles, error } = await this.supabaseService.getProfiles();
    if (error) {
      console.error('Error fetching profiles:', error);
      this.profiles = [];
    } else {
      this.profiles = profiles || [];
      this.filteredProfiles = [...this.profiles]; // Initialize filtered profiles
    }

    // Fetch records for all profiles
    this.records = await this.fetchAllRecords();
    this.totalPages = Math.ceil(this.filteredProfiles.length / this.pageSize); // Calculate total pages
    this.paginatedProfiles = this.getPaginatedProfiles(); // Initialize paginated profiles
  }

  async fetchAllRecords() {
    const { data: records, error } = await this.supabaseService.getRecords();
    if (error) {
      console.error('Error fetching records:', error);
      return [];
    }
    return records || [];
  }

  // Method to select a profile
  selectProfile(profile: any) {
    this.selectedProfile = profile;
    this.showForm = false; // Reset form visibility
  }

  // Method to go back to the employee list
  backToEmployeeList() {
    this.selectedProfile = null; // Reset selected profile
    this.showForm = false; // Reset form visibility
  }

  // Method to get records for the selected profile
  getRecordsForProfile(user_id: number) {
    return this.records.filter(record => record.user_id === user_id);
  }

  // Fetch merit count for a profile
  getMeritsCount(user_id: number) {
    return this.records.filter(record => record.user_id === user_id && record.merits).length;
  }

  // Fetch violations count for a profile
  getViolationsCount(user_id: number) {
    return this.records.filter(record => record.user_id === user_id && record.violations).length;
  }

  // Submit form for adding merits/violations
  async submitForm() {
    if (this.meritsViolationsForm.valid) {
      const formValue = { ...this.meritsViolationsForm.value, user_id: this.selectedProfile.user_id };
      const result = await this.supabaseService.insertMeritOrViolation(formValue);

      if (result) {
        console.log('Data inserted successfully:', result);
        this.records.push(formValue); // Update records locally
        this.showForm = false; // Hide the form after submission
      } else {
        console.error('Failed to insert data');
      }
    }
  }

  // Search method - Updated to refresh pagination
  searchTable() {
    if (this.searchTerm.trim() === '') {
      this.filteredProfiles = this.profiles; // Show all if no search term
    } else {
      this.filteredProfiles = this.profiles.filter(profile =>
        profile.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        profile.surname.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1; // Reset to first page after searching
    this.totalPages = Math.ceil(this.filteredProfiles.length / this.pageSize);
    this.paginatedProfiles = this.getPaginatedProfiles(); // Refresh paginated profiles
  }

  // Sort method - Updated to refresh pagination
  onSortOptionChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'asc') {
      this.filteredProfiles.sort((a, b) => a.first_name.localeCompare(b.first_name));
    } else if (value === 'desc') {
      this.filteredProfiles.sort((a, b) => b.first_name.localeCompare(a.first_name));
    } else {
      this.filteredProfiles = [...this.profiles]; // Reset to default order
    }
    this.currentPage = 1; // Reset to first page after sorting
    this.totalPages = Math.ceil(this.filteredProfiles.length / this.pageSize);
    this.paginatedProfiles = this.getPaginatedProfiles(); // Refresh paginated profiles
  }

  // Pagination logic
  getPaginatedProfiles() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredProfiles.slice(startIndex, endIndex);
  }

  // Pagination - Previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatedProfiles = this.getPaginatedProfiles(); // Update the paginated profiles
    }
  }

  // Pagination - Next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginatedProfiles = this.getPaginatedProfiles(); // Update the paginated profiles
    }
  }
}
