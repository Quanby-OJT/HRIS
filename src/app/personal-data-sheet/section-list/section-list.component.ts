import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-list',
  imports: [CommonModule],
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css'],
  standalone: true
})
export class SectionListComponent {
  sections = [
    { title: 'I. Personal Information' },
    { title: 'II. Family Background' },
    { title: 'III. Educational Background' },
    { title: 'IV. Civil Service Eligibility' },
    { title: 'V. Work Experience' },
    { title: 'VI. Voluntary Work' },
    { title: 'VII. Learning and Development Interventions' },
    { title: 'VIII. Other Information' },
  ];
}
