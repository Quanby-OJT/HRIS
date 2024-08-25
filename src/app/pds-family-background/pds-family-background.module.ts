import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PdsFamilyBackgroundComponent } from './pds-family-background.component';

@NgModule({
  declarations: [PdsFamilyBackgroundComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [PdsFamilyBackgroundComponent]
  // other configurations
})
export class PDSFamilyBackgroundModule { }
