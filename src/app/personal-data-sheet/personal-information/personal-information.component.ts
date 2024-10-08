import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

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

  inputFields = [
    { fieldName: 'First Name'},
    { fieldName: 'Middle Name'},
    { fieldName: 'Last Name'},
    { fieldName: 'Name Extension'},
    { fieldName: 'Date of Birth'},
    { fieldName: 'Place of Birth'},
    { fieldName: 'Sex'},
    { fieldName: 'Civil Status'},
    { fieldName: 'Height'},
    { fieldName: 'Weight'},
    { fieldName: 'Blood Type'},
    { fieldName: 'GSIS ID No.'},
    { fieldName: 'PAG-IBIG ID No.'},
    { fieldName: 'PhilHealth ID No.'},
    { fieldName: 'SSS No.'},
    { fieldName: 'TIN No.'},
    { fieldName: 'Agency Employee No.'},
  ]

  addressFields = [
    { fieldName : 'House/Block/Lot No.'},
    { fieldName : 'Street'},
    { fieldName : 'Subdivision/Village'},
    { fieldName : 'Barangay'},
    { fieldName : 'City/Municipality'},
    { fieldName : 'Province'},
    { fieldName : 'Zip Code'},
  ]

  contactFields = [
    { fieldName : 'Telephone No.'},
    { fieldName : 'Mobile No.'},
    { fieldName : 'Email Address'},
  ]


  ngOnInit() {}

  ngAfterViewInit() {
    this.initializeDropdown();
  }

  // Dropdown setup
  private initializeDropdown() {
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownMenu = document.getElementById('dropdown');

    if (dropdownButton && dropdownMenu) {
      dropdownButton.addEventListener('click', function() {
        dropdownMenu.classList.toggle('hidden');
      });
    }
  }

  selectStatus(status: string) {
    this.civil_status = status;
    const dropdownMenu = document.getElementById('dropdown');
    if (dropdownMenu) {
      dropdownMenu.classList.add('hidden');
    }
  }

}

export class NgModule { }
