import { Component } from '@angular/core';
import { SupabaseService } from '../Supabase/supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-test-back4',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './test-back4.component.html',
  styleUrls: ['./test-back4.component.css']
})
export class TestBack4Component {
  careerService: string = '';
  rating: number | null = null;
  dateOfExamination: string = '';  // Ensure proper date handling
  placeOfExamination: string = '';
  licenseNumber: string = '';
  licenseDateOfValidity: string = '';

  constructor(private supabaseService: SupabaseService) {}

  // Date formatting method similar to TestBack2
  formatDate(date: string): string {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = ('0' + (parsedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + parsedDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // Method to insert data into the civil_service_eligibility table
  submitForm() {
    // Validate and format the date of examination and license validity date
    const formattedDateOfExamination = this.formatDate(this.dateOfExamination);
    const formattedLicenseDateOfValidity = this.formatDate(this.licenseDateOfValidity);

    const formData = {
      career_service: this.careerService,
      rating: this.rating,
      date_of_examination: formattedDateOfExamination,
      place_of_examination: this.placeOfExamination,
      license_number: this.licenseNumber,
      license_date_of_validity: formattedLicenseDateOfValidity
    };

    // Call the Supabase service to insert data
    this.supabaseService.insertCivilServiceEligibility('civil_service_eligibility', formData)
      .then(response => {
        console.log('Data inserted successfully:', response);
      })
      .catch(error => {
        console.error('Error inserting data:', error);
      });
  }
}
