import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarNavigationModule } from '../sidebar-navigation/sidebar-navigation.module';
import { CommonModule } from '@angular/common';
import { SectionListComponent } from './section-list/section-list.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-personal-data-sheet',
  standalone: true,
  imports: [RouterModule, SidebarNavigationModule, CommonModule, SectionListComponent, CalendarModule, FormsModule, DropdownModule],
  templateUrl: './personal-data-sheet.component.html',
  styleUrl: './personal-data-sheet.component.css'
})
export class PersonalDataSheetComponent {
  date: Date | undefined;
}

export class NgModule { }
