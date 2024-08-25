import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WorkExperienceComponent } from './work-experience.component';

@NgModule({
  declarations: [WorkExperienceComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [WorkExperienceComponent]
  // other configurations
})
export class WorkExperienceModule { }
