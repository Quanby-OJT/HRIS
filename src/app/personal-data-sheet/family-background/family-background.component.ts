import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';


interface Field {
  label : string,
  type : string,
  value? : string, // dito ilagay input value ng field for backend
  defaultValue? : string,
  options? : string[],
  selectedOption? : string
}

@Component({
  selector: 'app-family-background',
  standalone: true,
  imports: [CommonModule, CalendarModule, DropdownModule, FormsModule],
  templateUrl: './family-background.component.html',
  styleUrl: './family-background.component.css'
})
export class FamilyBackgroundComponent {
  date: Date | undefined;

  parentalInformation: Field[] = [
    { label: "Name", type: "text" },
    { label: "Occupation", type: "text" },
    { label: "Birthdate", type: "date" },
    { label: "Contact Number", type: "text" },
    { label: "Address", type: "text" },
    { label: "Marital Status of Parents", type: "dropdown",
      defaultValue: 'Select Status',
      options: ['Married', 'Separated', 'Divorced', 'Widowed'] }
  ];

  spousalInformation: Field[] = [
    { label: "Name", type: "text" },
    { label: "Occupation", type: "text" },
    { label: "Birthdate", type: "date" },
    { label: "Date of Marriage", type: "date" },
    { label: "Contact Number", type: "text" },
    { label: "Address", type: "text" },
    { label: "Employer", type: "text" }
  ];

  emergencyContact: Field[] = [
    { label: "Contact Name", type: "text" },
    { label: "Relationship to Contact", type: "dropdown" }, // Dropdown options: Parent, Sibling, Spouse, Friend, Other
    { label: "Contact Number", type: "text" },
    { label: "Contact Address", type: "text" }
  ];

  otherFamilyFields: Field[] = [
    { label: "Family Medical History", type: "text" },
    { label: "Living with Family?", type: "boolean", options : ['Yes', 'No'] }, // Can be a checkbox or toggle
    { label: "Any Deceased Family Members?", type: "boolean", options : ['Yes', 'No'] }, // Can be a checkbox or toggle
    { label: "Primary Family Language Spoken", type: "text" },
    { label: "Household Annual Income", type: "text" }
  ];

  fieldsets: { label: string, fields: Field[] }[] = [
    { label: 'Father Information', fields: this.parentalInformation },
    { label: 'Mother Information', fields: this.parentalInformation },
    { label: 'Spousal Information', fields: this.spousalInformation },
    { label: 'Emergency Contact Information', fields: this.emergencyContact },
    { label: 'Other Details', fields: this.otherFamilyFields },
  ];

  // siblingInformation: { label: string, type: string }[] = [
  //   { label: "Sibling's Name", type: "text" },
  //   { label: "Sibling's Age", type: "number" },
  //   { label: "Sibling's Occupation", type: "text" },
  //   { label: "Relationship to Sibling", type: "dropdown" }, // Dropdown options: Brother, Sister, Half-brother, etc.
  //   { label: "Sibling's Contact Number", type: "text" },
  //   { label: "Sibling's Address", type: "text" },
  //   { label: "Number of Siblings", type: "number" }
  // ];

  // childrenInformation: { label: string, type: string }[] = [
  //   { label: "Child's Name", type: "text" },
  //   { label: "Child's Birthdate", type: "date" },
  //   { label: "Child's School", type: "text" },
  //   { label: "Child's Grade Level", type: "text" }, // Can be a dropdown if specific levels are predefined
  //   { label: "Child's Health Status", type: "dropdown" } // Dropdown options: Good, Fair, Poor
  // ];
}

export class NgModule { }
