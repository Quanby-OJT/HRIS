import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarNavigationModule } from '../sidebar-navigation/sidebar-navigation.module';
import { CommonModule } from '@angular/common';

interface SidebarItem {
  name: string;
  route: string;
}

@Component({
  selector: 'app-loan-information',
  standalone: true,
  imports: [RouterModule, SidebarNavigationModule, CommonModule],
  templateUrl: './loan-information.component.html',
  styleUrl: './loan-information.component.css'
})

export class LoanInformationComponent {

}
