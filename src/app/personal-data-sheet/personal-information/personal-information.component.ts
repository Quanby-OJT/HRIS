import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

interface Field {
  label : string,
  type : string,
  options? : string[]
}

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [CalendarModule, FormsModule, DropdownModule, CommonModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css'
})
export class PersonalInformationComponent {
  date: Date | undefined;
  civil_status: string = '';

  basicInformation: Field[] = [
    { label: 'First Name', type: 'text' },
    { label: 'Middle Name', type: 'text' },
    { label: 'Last Name', type: 'text' },
    { label: 'Name Extension', type: 'text' },
    { label: 'Date of Birth', type: 'date' },
    { label: 'Place of Birth', type: 'text' },
    { label: 'Sex', type: 'boolean', options: ['Male', 'Female'] },
    { label: 'Civil Status', type: 'dropdown', options: ['Single', 'Married', 'Widowed', 'Separated'] },
    { label: 'Height', type: 'text' },
    { label: 'Weight', type: 'text' },
    { label: 'Blood Type', type: 'dropdown', options: ['A', 'B', 'AB', 'O'] }
  ];

  contactDetails: Field[] = [
    { label: 'Telephone No.', type: 'text' },
    { label: 'Mobile No.', type: 'text' },
    { label: 'Email Address', type: 'text' }
  ];

  govIdNos: Field[] = [
    { label: 'GSIS ID No.', type: 'text' },
    { label: 'PAG-IBIG ID No.', type: 'text' },
    { label: 'PhilHealth ID No.', type: 'text' },
    { label: 'SSS No.', type: 'text' },
    { label: 'TIN No.', type: 'text' },
    { label: 'Agency Employee No.', type: 'text' }
  ];

  addressDetails: Field[] = [
    { label: 'House/Block/Lot No.', type: 'text' },
    { label: 'Street', type: 'text' },
    { label: 'Subdivision/Village', type: 'text' },
    { label: 'Barangay', type: 'text' },
    { label: 'City/Municipality', type: 'text' },
    { label: 'Province', type: 'text' },
    { label: 'Zip Code', type: 'text' }
  ];

  fieldsets: { label: string, fields: Field[] }[] = [
    { label: 'Basic Information', fields: this.basicInformation },
    { label: 'Contact Details', fields: this.contactDetails },
    { label: 'Government Issued ID Nos', fields: this.govIdNos },
    { label: 'Current Address Details', fields: this.addressDetails },
    { label: 'Permanent Address Details', fields: this.addressDetails },
  ];

  private dropdowns!: NodeListOf<Element>;

  ngOnInit() {}

  ngAfterViewInit() {
    this.initializeDropdown();
  }

  selectStatus(status: string) {
    this.civil_status = status;
    const dropdownMenu = document.getElementById('dropdown');
    if (dropdownMenu) {
      dropdownMenu.classList.add('hidden');
    }
  }

  private initializeDropdown() {
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownMenu = document.getElementById('dropdown');

    if (dropdownButton && dropdownMenu) {
      dropdownButton.addEventListener('click', function() {
        dropdownMenu.classList.toggle('hidden');
      });
    }
  }
}

export class NgModule { }
