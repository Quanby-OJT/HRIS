import { Component, OnInit } from '@angular/core';
import { Event, Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { SidebarNavigationModule } from '../sidebar-navigation/sidebar-navigation.module';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-personal-data-sheet',
  standalone: true,
  imports: [RouterLinkActive, RouterOutlet,
    SidebarNavigationModule, CommonModule,
    RouterLink],
  templateUrl: './personal-data-sheet.component.html',
  styleUrl: './personal-data-sheet.component.css',
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }), // Start off-screen
        animate('300ms ease-in', style({ transform: 'translateX(0)', opacity: 1 })), // Slide in
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 })), // Slide out
      ]),
    ]),
  ],
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

  previousUrl : string = "";
  currentUrl : string = "";
  nextUrl : string = "";
  currentRoute : string ='';

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.updateProgressBarWidth(event.urlAfterRedirects);
        this.currentUrl = event.urlAfterRedirects;
        this.currentRoute = this.router.url;
        this.setPreviousUrl();
        this.setNextUrl();
        console.log("Previous URL:", this.previousUrl);
        console.log("Current URL:", this.currentUrl);
        console.log("Next URL:", this.nextUrl);
        console.log("urlAfterRedirects:", event.urlAfterRedirects);
        console.log(this.sections[2].route);
      });
  }

  updateProgressBarWidth(url: string): void {
    let currentUrlIndex : number = this.sections.findIndex(section => section.route === url);

    this.progressBarWidth = (currentUrlIndex + 1) * 12.5 + '%';
    console.log(this.progressBarWidth);
    this.currentStep = 8 * parseFloat(this.progressBarWidth.replace('%', '')) / 100;
  }

  setNextUrl() {
    // Find the index of the current section
    const currentIndex = this.sections.findIndex(section => section.route === this.currentUrl);

    // Navigate to the previous route if it exists
    if (currentIndex !== -1 && currentIndex < this.sections.length - 1) {
      this.nextUrl = this.sections[currentIndex + 1].route;
      console.log("nextURL changed!")
    }
  }

  setPreviousUrl() {
    // Find the index of the current section
    const currentIndex = this.sections.findIndex(section => section.route === this.currentUrl);

    // Navigate to the next route if it exists
    if (currentIndex >= 1 && currentIndex < this.sections.length) {
      this.previousUrl = this.sections[currentIndex - 1].route;
      console.log("previousURL changed!")
    }
  }
}
export class NgModule { }
