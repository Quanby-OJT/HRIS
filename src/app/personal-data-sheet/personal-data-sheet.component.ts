import { Component, OnInit } from '@angular/core';
import { Event, Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { SidebarNavigationModule } from '../sidebar-navigation/sidebar-navigation.module';
import { CommonModule } from '@angular/common';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { FamilyBackgroundComponent } from './family-background/family-background.component';
import { EducationalBackgroundComponent } from './educational-background/educational-background.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-personal-data-sheet',
  standalone: true,
  imports: [RouterLinkActive, RouterOutlet,
    SidebarNavigationModule, CommonModule,
    PersonalInformationComponent, FamilyBackgroundComponent,
    EducationalBackgroundComponent, RouterLink],
  templateUrl: './personal-data-sheet.component.html',
  styleUrl: './personal-data-sheet.component.css',
  animations: []
})
export class PersonalDataSheetComponent {
  date: Date | undefined;

  sections = [
    { title: 'I. Personal Information', route: '/personal-data-sheet/personal-information'},
    { title: 'II. Family Background', route: '/personal-data-sheet/family-background'},
    { title: 'III. Educational Background', route: '/personal-data-sheet/educational-background'},
    { title: 'IV. Civil Service Eligibility', route: '/personal-data-sheet/civil-service-eligibility'},
    { title: 'V. Work Experience', route: '/personal-data-sheet/work-experience'},
    { title: 'VI. Voluntary Work', route: '/personal-data-sheet/voluntary-work'},
    { title: 'VII. Learning and Development Interventions', route: '/personal-data-sheet/learning-and-development-interventions'},
    { title: 'VIII. Other Information', route: '/personal-data-sheet/other-information'},
  ];

  prepareRoute = (outlet: RouterOutlet) => { return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'] };

  constructor(private router: Router) {}

  progressBarWidth: string = '0%'; // Default value

  currentStep : number = 0;

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.updateProgressBarWidth(event.urlAfterRedirects);
      });
  }

  updateProgressBarWidth(url: string): void {
    switch (url) {
      case '/personal-data-sheet/personal-information':
        this.progressBarWidth = '12.5%';
        break;
      case '/personal-data-sheet/family-background':
        this.progressBarWidth = '25%';
        break;
      case '/personal-data-sheet/educational-background':
        this.progressBarWidth = '37.5%';
        break;
      case '/personal-data-sheet/civil-service-eligibility':
        this.progressBarWidth = '50%';
        break;
      case '/personal-data-sheet/work-experience':
        this.progressBarWidth = '62.5%';
        break;
      case '/personal-data-sheet/voluntary-work':
        this.progressBarWidth = '75%';
        break;
      case '/personal-data-sheet/learning-and-development-interventions':
        this.progressBarWidth = '87.5%';
        break;
      case '/personal-data-sheet/other-information':
        this.progressBarWidth = '100%';
        break;
      default:
        this.progressBarWidth = '0%'; // Default progress
        break;
    }
    this.currentStep = 8 * parseFloat(this.progressBarWidth.replace('%', '')) / 100;
    console.log(this.progressBarWidth, this.currentStep);
  }

  navigateTo = (route : string) => this.router.navigate([route]);

}

export class NgModule { }
