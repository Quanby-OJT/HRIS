import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-family-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './family-background.component.html',
  styleUrl: './family-background.component.css'
})
export class FamilyBackgroundComponent {
  parentalInformation: { label: string, type: string }[] = [
    { label: "Name", type: "text" },
    { label: "Occupation", type: "text" },
    { label: "Birthdate", type: "date" },
    { label: "Contact Number", type: "text" },
    { label: "Address", type: "textarea" },
    { label: "Marital Status of Parents", type: "dropdown" } // Dropdown options: Married, Separated, Divorced, Widowed, etc.
  ];

  spousalInformation: { label: string, type: string }[] = [
    { label: "Name", type: "text" },
    { label: "Occupation", type: "text" },
    { label: "Birthdate", type: "date" },
    { label: "Date of Marriage", type: "date" },
    { label: "Contact Number", type: "text" },
    { label: "Address", type: "textarea" },
    { label: "Employer", type: "text" }
  ];

  emergencyContact: { label: string, type: string }[] = [
    { label: "Contact Name", type: "text" },
    { label: "Relationship to Contact", type: "dropdown" }, // Dropdown options: Parent, Sibling, Spouse, Friend, Other
    { label: "Contact Number", type: "text" },
    { label: "Contact Address", type: "textarea" }
  ];

  otherFamilyFields: { label: string, type: string }[] = [
    { label: "Family Medical History", type: "textarea" },
    { label: "Living with Family?", type: "boolean" }, // Can be a checkbox or toggle
    { label: "Any Deceased Family Members?", type: "boolean" }, // Can be a checkbox or toggle
    { label: "Primary Family Language Spoken", type: "text" },
    { label: "Household Annual Income", type: "text" }
  ];

  // siblingInformation: { label: string, type: string }[] = [
  //   { label: "Sibling's Name", type: "text" },
  //   { label: "Sibling's Age", type: "number" },
  //   { label: "Sibling's Occupation", type: "text" },
  //   { label: "Relationship to Sibling", type: "dropdown" }, // Dropdown options: Brother, Sister, Half-brother, etc.
  //   { label: "Sibling's Contact Number", type: "text" },
  //   { label: "Sibling's Address", type: "textarea" },
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
