import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationEnd, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarNavigationModule } from 'src/app/sidebar-navigation/sidebar-navigation.module';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, SidebarNavigationModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'] // fix typo 'styleUrl'
})
export class ViewPDSComponent implements OnInit {

  constructor(private router: Router) {}

  currentUrl: string = '';

  editRootUrl : string = '/personal-data-sheet/edit/';
  viewRootUrl : string = '/personal-data-sheet/view/';

  compensationRecordsUrl = this.viewRootUrl + 'compensation-records';
  dtrUrl : string = this.viewRootUrl + 'dtr';

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  navigateTo = (route: string) => this.router.navigate([route]);

  sections = [
    { title: 'I. Personal Information', route: this.editRootUrl + 'personal-information' },
    { title: 'II. Family Background', route: this.editRootUrl + 'family-background' },
    { title: 'III. Educational Background', route: this.editRootUrl + 'educational-background' },
    { title: 'IV. Civil Service Eligibility', route: this.editRootUrl + 'civil-service-eligibility' },
    { title: 'V. Work Experience', route: this.editRootUrl + 'work-experience' },
    { title: 'VI. Voluntary Work', route: this.editRootUrl + 'voluntary-work' },
    { title: 'VII. Learning and Development Interventions', route: this.editRootUrl + 'learning-and-development-interventions' },
    { title: 'VIII. Other Information', route: this.editRootUrl + 'other-information' },
  ];

}
