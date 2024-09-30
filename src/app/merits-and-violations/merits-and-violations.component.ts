import { Component, OnInit } from '@angular/core';
import { SidebarNavigationModule } from '../sidebar-navigation/sidebar-navigation.module';
import { RouterModule, Router } from '@angular/router';
import { SupabaseService } from '../Supabase/supabase.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-merits-and-violations',
  standalone: true,
  imports: [SidebarNavigationModule, ReactiveFormsModule, CommonModule],
  templateUrl: './merits-and-violations.component.html',
  styleUrls: ['./merits-and-violations.component.css']
})
export class MeritsAndViolationsComponent implements OnInit {
  meritsViolationsForm: FormGroup;
  profiles: any[] = []; // Declare profiles array

  constructor(private fb: FormBuilder, private supabaseService: SupabaseService) {
    this.meritsViolationsForm = this.fb.group({
      violations: [''],
      merits: [''],
      date_of_record_v: [null],
      date_of_record_m: [null],
      user_id: [null, Validators.required] // Include user_id
    });
  }

  async ngOnInit() {
    // Fetch profiles from Supabase
    const { data: profiles, error } = await this.supabaseService.getProfiles();
    if (error) {
      console.error('Error fetching profiles:', error);
      this.profiles = [];
    } else {
      this.profiles = profiles || []; // Use an empty array if profiles is null
    }
  }

  async submitForm() {
    if (this.meritsViolationsForm.valid) {
      const formValue = this.meritsViolationsForm.value;
      const result = await this.supabaseService.insertMeritOrViolation(formValue);

      if (result) {
        console.log('Data inserted successfully:', result);
      } else {
        console.error('Failed to insert data');
      }
    }
  }
}
