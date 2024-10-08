import { Component } from '@angular/core';
import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { SidebarNavigationModule } from '../sidebar-navigation/sidebar-navigation.module';
import { CommonModule } from '@angular/common';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { FamilyBackgroundComponent } from './family-background/family-background.component';
import { EducationalBackgroundComponent } from './educational-background/educational-background.component';

@Component({
  selector: 'app-personal-data-sheet',
  standalone: true,
  imports: [RouterModule, SidebarNavigationModule, CommonModule, PersonalInformationComponent, FamilyBackgroundComponent, EducationalBackgroundComponent],
  templateUrl: './personal-data-sheet.component.html',
  styleUrl: './personal-data-sheet.component.css',
  animations: []
})
export class PersonalDataSheetComponent {
  date: Date | undefined;

  sections = [
    { title: 'I. Personal Information', route: 'personal-data-sheet/personal-information'},
    { title: 'II. Family Background', route: 'personal-data-sheet/family-background'},
    { title: 'III. Educational Background', route: 'personal-data-sheet/educational-background'},
    { title: 'IV. Civil Service Eligibility', route: ''},
    { title: 'V. Work Experience', route: ''},
    { title: 'VI. Voluntary Work', route: ''},
    { title: 'VII. Learning and Development Interventions', route: ''},
    { title: 'VIII. Other Information', route: ''},
  ];

  prepareRoute = (outlet: RouterOutlet) => { return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'] };

  constructor(private router: Router) {}

  navigateTo = (route : string) => this.router.navigate([route]);

}

export class NgModule { }
