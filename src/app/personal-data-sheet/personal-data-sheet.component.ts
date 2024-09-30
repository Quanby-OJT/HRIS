import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarNavigationModule } from '../sidebar-navigation/sidebar-navigation.module';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { SectionListComponent } from './section-list/section-list.component';

@Component({
  selector: 'app-personal-data-sheet',
  standalone: true,
  imports: [RouterModule, SidebarNavigationModule, CommonModule, PanelModule, SectionListComponent],
  templateUrl: './personal-data-sheet.component.html',
  styleUrl: './personal-data-sheet.component.css'
})
export class PersonalDataSheetComponent {

}

export class NgModule { }
