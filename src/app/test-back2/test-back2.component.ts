import { Component } from '@angular/core';
import { SupabaseService } from '../Supabase/supabase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-back2',
  standalone: true,
  templateUrl: './test-back2.component.html',
  styleUrls: ['./test-back2.component.css'],
  imports: [FormsModule]
})
export class TestBack2Component {
  // Define form fields
  surname: string = '';
  firstName: string = '';
  middleName: string = '';
  nameExtension: string = '';
  dateOfBirth?: Date;
  placeOfBirth: string = '';
  sex: string = '';
  civilStatus: string = '';
  height: number = 0;
  weight: number = 0;
  bloodType: string = '';
  gsisNo: string = '';
  pagibigNo: string = '';
  philhealthNo: string = '';
  sssNo: string = '';
  tinNo: string = '';
  agencyEmployeeNo: string = '';
  citizenship: string = '';
  dualCitizenshipCountry: string = '';
  residentialAddress: string = '';
  permanentAddress: string = '';
  telephoneNo: string = '';
  mobileNo: string = '';
  emailAddress: string = '';

  constructor(private supabaseService: SupabaseService) {}

  submitForm() {
    // Validate numeric fields
    if (this.height < 0 || this.height > 300) {
      console.error('Height must be between 0 and 300 cm.');
      return;
    }
    if (this.weight < 0 || this.weight > 500) {
      console.error('Weight must be between 0 and 500 kg.');
      return;
    }
    if (this.gsisNo.length > 20) {
      console.error('GSIS ID number is too long.');
      return;
    }
    if (this.pagibigNo.length > 20) {
      console.error('Pag-IBIG ID number is too long.');
      return;
    }
    if (this.philhealthNo.length > 20) {
      console.error('PhilHealth number is too long.');
      return;
    }
    if (this.sssNo.length > 20) {
      console.error('SSS number is too long.');
      return;
    }
    if (this.tinNo.length > 20) {
      console.error('TIN number is too long.');
      return;
    }
    if (this.agencyEmployeeNo.length > 20) {
      console.error('Agency employee number is too long.');
      return;
    }
  
    // Create an object with the form data
    let formattedDateOfBirth;
    if (this.dateOfBirth instanceof Date) {
      formattedDateOfBirth = this.dateOfBirth.toISOString().split('T')[0];
    } else if (typeof this.dateOfBirth === 'string' || typeof this.dateOfBirth === 'number') {
      const date = new Date(this.dateOfBirth);
      if (!isNaN(date.getTime())) {
        formattedDateOfBirth = date.toISOString().split('T')[0];
      }
    }
  
    const formData = {
      surname: this.surname,
      first_name: this.firstName,
      middle_name: this.middleName,
      name_extension: this.nameExtension,
      date_of_birth: formattedDateOfBirth,
      place_of_birth: this.placeOfBirth,
      sex: this.sex,
      civil_status: this.civilStatus,
      height: Number(this.height),
      weight: Number(this.weight),
      blood_type: this.bloodType,
      gsis_id_no: this.gsisNo,
      pag_ibig_id_no: this.pagibigNo,
      philhealth_no: this.philhealthNo,
      sss_no: this.sssNo,
      tin_no: this.tinNo,
      agency_employee_no: this.agencyEmployeeNo,
      citizenship: this.citizenship,
      dual_citizenship_country: this.dualCitizenshipCountry,
      residential_address: this.residentialAddress,
      permanent_address: this.permanentAddress,
      telephone_no: this.telephoneNo, 
      mobile_no: this.mobileNo,
      email_address: this.emailAddress,
    };
  
    // Call the Supabase service to insert data
    this.supabaseService.insertPersonalInformation(formData)
      .then(response => {
        console.log('Data inserted successfully:', response);
      })
      .catch(error => {
        console.error('Error inserting data:', error);
      });
  }
}
