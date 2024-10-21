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

  basicInformation : { label: string, type: string, options?: string[] | undefined }[] = [
    { label: 'First Name', type: 'text' },
    { label: 'Middle Name', type: 'text' },
    { label: 'Last Name', type: 'text' },
    { label: 'Name Extension', type: 'text' }, // e.g., Jr., Sr., III
    { label: 'Date of Birth', type: 'date' },
    { label: 'Place of Birth', type: 'text' },
    { label: 'Sex', type: 'boolean', options: ['Male', 'Female'] }, // Dropdown: Male, Female, Other
    { label: 'Civil Status', type: 'dropdown', options: ['Single', 'Married', 'Widowed', 'Separated'] }, // Dropdown: Single, Married, Divorced, Widowed
    { label: 'Height', type: 'number' }, // e.g., in cm or ft/in
    { label: 'Weight', type: 'number' }, // e.g., in kg or lbs
    { label: 'Blood Type', type: 'dropdown' } // Dropdown: A, B, AB, O
  ];

  contactDetails = [
    { label : 'Telephone No.'},
    { label : 'Mobile No.'},
    { label : 'Email Address'},
  ];

  govIdNos = [
    { label: 'GSIS ID No.'},
    { label: 'PAG-IBIG ID No.'},
    { label: 'PhilHealth ID No.'},
    { label: 'SSS No.'},
    { label: 'TIN No.'},
    { label: 'Agency Employee No.'},
  ];

  addressDetails = [
    { label : 'House/Block/Lot No.'},
    { label : 'Street'},
    { label : 'Subdivision/Village'},
    { label : 'Barangay'},
    { label : 'City/Municipality'},
    { label : 'Province'},
    { label : 'Zip Code'},
  ];

  private dropdowns: NodeListOf<Element>;

  constructor() {
    this.dropdowns = document.querySelectorAll('.dropdown');
    this.initializeDropdowns();
  }

  private initializeDropdowns(): void {
    this.dropdowns.forEach(dropdown => {
      const select = dropdown.querySelector('.select') as HTMLElement;
      const caret = dropdown.querySelector('.caret') as HTMLElement;
      const menu = dropdown.querySelector('.menu') as HTMLElement;
      const options = dropdown.querySelectorAll('.menu li') as NodeListOf<HTMLElement>;
      const selected = dropdown.querySelector('.selected') as HTMLElement;

      // Attach event listeners
      this.setupSelectClick(select, caret, menu);
      this.setupOptionClick(options, selected, select, caret, menu);
    });
  }

  private setupSelectClick(select: HTMLElement, caret: HTMLElement, menu: HTMLElement): void {
    select.addEventListener('click', () => {
      select.classList.toggle('select-clicked');
      caret.classList.toggle('caret-rotate');
      menu.classList.toggle('menu-open');
    });
  }

  private setupOptionClick(
    options: NodeListOf<HTMLElement>,
    selected: HTMLElement,
    select: HTMLElement,
    caret: HTMLElement,
    menu: HTMLElement
  ): void {
    options.forEach(option => {
      option.addEventListener('click', () => {
        selected.innerText = option.innerText;
        select.classList.remove('select-clicked');
        caret.classList.remove('caret-rotate');
        menu.classList.remove('menu-open');

        // Remove 'active' class from all options
        options.forEach(option => option.classList.remove('active'));

        // Add 'active' class to the selected option
        option.classList.add('active');
      });
    });
  }




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
