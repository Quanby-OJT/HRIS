import { Component } from '@angular/core';
import { SupabaseService } from '../Supabase/supabase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-back',
  standalone: true,
  templateUrl: './test-back.component.html',
  styleUrls: ['./test-back.component.css'],
  imports: [FormsModule]
})
export class TestBackComponent {
  spouseSurname: string = '';
  spouseFirstName: string = '';
  spouseMiddleName: string = '';
  spouseOccupation?: string = '';
  spouseEmployer?: string = '';
  spouseBusinessAddress?: string = '';
  spouseTelephone?: string = '';

  childrenNames: string = '';
  childrenDOB?: Date;

  fatherSurname: string = '';
  fatherFirstName: string = '';
  fatherMiddleName: string = '';

  motherMaidenName: string = '';
  motherSurname: string = '';
  motherFirstName: string = '';
  motherMiddleName: string = '';

  constructor(private supabaseService: SupabaseService) {}

// Updated submitForm method to include maiden_name
async submitForm() {
  try {
    const dob = this.childrenDOB ? new Date(this.childrenDOB) : undefined;
    

    // Spouse's Information
    if (this.spouseSurname && this.spouseFirstName) {
      await this.supabaseService.insertFamilyBackground({
        //employee_id: 'your_employee_id', // Replace with actual employee_id if needed
        relationship_type: 'Spouse',
        surname: this.spouseSurname,
        first_name: this.spouseFirstName,
        middle_name: this.spouseMiddleName,
        occupation: this.spouseOccupation,
        employer_name: this.spouseEmployer,
        business_address: this.spouseBusinessAddress,
        telephone_no: this.spouseTelephone
      });
    }

    // Children's Information
    if (this.childrenNames) {
      await this.supabaseService.insertFamilyBackground({
        //employee_id: 'your_employee_id', // Replace with actual employee_id if needed
        relationship_type: 'Child',
        surname: this.childrenNames, // Assuming children's names are stored in 'surname'
        first_name: '', // Assuming children's names are full names in 'surname'
        middle_name: '',
        date_of_birth: dob ? dob.toISOString().split('T')[0] : undefined // Convert to YYYY-MM-DD
      });
    }

    // Father's Information
    if (this.fatherSurname && this.fatherFirstName) {
      await this.supabaseService.insertFamilyBackground({
        //employee_id: 'your_employee_id', // Replace with actual employee_id if needed
        relationship_type: 'Father',
        surname: this.fatherSurname,
        first_name: this.fatherFirstName,
        middle_name: this.fatherMiddleName
      });
    }

    // Mother's Information
    if (this.motherSurname && this.motherFirstName) {
      await this.supabaseService.insertFamilyBackground({
        //employee_id: 'your_employee_id', // Replace with actual employee_id if needed
        relationship_type: 'Mother',
        maiden_name: this.motherMaidenName, // Include maiden_name
        surname: this.motherSurname,
        first_name: this.motherFirstName,
        middle_name: this.motherMiddleName
      });
    }

    alert('Family background data submitted successfully!');
  } catch (error) {
    console.error('Error submitting family background data:', error);
    alert('Failed to submit family background data. Please try again.');
  }
}

  
}
