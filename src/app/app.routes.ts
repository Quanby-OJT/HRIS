import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginFailedComponent } from './login-failed/login-failed.component';
import { OtpPopupComponent } from './otp-popup/otp-popup.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { SystemManagementComponent } from './system-management/system-management.component';
import { DtrComponent } from './dtr/dtr.component';
import { WorkflowComponent } from './workflow-approval/workflow-approval.component';
import { WorkflowApprovalUserComponent } from './workflow-approval-user/workflow-approval-user.component';
import { SubmitTicketComponent } from './submit-ticket/submit-ticket.component';
import { SupportTicketComponent } from './support-ticket/support-ticket.component';
import { PimamComponent } from './pimam/pimam.component';
import { authGuard } from './auth/auth.guard'; // Adjust the path if necessary
import { TestBackComponent } from './test-back/test-back.component';
import { TestBack2Component } from './test-back2/test-back2.component';
import { TestBack3Component } from './test-back3/test-back3.component';
import { TestBack4Component } from './test-back4/test-back4.component';
import { PDSComponent } from './pds/pds.component';
import { PdsFamilyBackgroundComponent } from './pds-family-background/pds-family-background.component';
import { CompensationRecordsComponent } from './compensation-records/compensation-records.component';
import { LoanInformationComponent } from './loan-information/loan-information.component';

import { MeritsAndViolationsComponent } from './merits-and-violations/merits-and-violations.component';
import { PersonalDataSheetComponent } from './personal-data-sheet/personal-data-sheet.component';
import { PersonalInformationComponent } from './personal-data-sheet/personal-information/personal-information.component';
import { FamilyBackgroundComponent } from './personal-data-sheet/family-background/family-background.component';
import { EducationalBackgroundComponent } from './personal-data-sheet/educational-background/educational-background.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'submit-ticket', component: SubmitTicketComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'user-management', component: UserManagementComponent, canActivate: [authGuard] },
  { path: 'login-failed', component: LoginFailedComponent },
  { path: 'otp-popup', component: OtpPopupComponent },
  { path: 'system-management', component: SystemManagementComponent, canActivate: [authGuard] },
  { path: 'dtr', component: DtrComponent, canActivate: [authGuard] },
  { path: 'audit-trail', component: AuditTrailComponent, canActivate: [authGuard] },
  { path: 'workflow-approval', component: WorkflowComponent, canActivate: [authGuard] },
  { path: 'support-ticket', component: SupportTicketComponent, canActivate: [authGuard] },
  { path: 'workflow-approval-user', component: WorkflowApprovalUserComponent, canActivate: [authGuard] },

  { path: 'pimam', component: PimamComponent, canActivate: [authGuard] },
  { path: 'compensation-records', component: CompensationRecordsComponent, canActivate: [authGuard] },

  { path: 'merits-and-violations', component: MeritsAndViolationsComponent, canActivate: [authGuard]},

  { path: 'test-back', component: TestBackComponent},
  { path: 'test-back2', component: TestBack2Component},
  { path: 'test-back3', component: TestBack3Component},
  { path: 'test-back4', component: TestBack4Component},
  { path: 'pds', component: PDSComponent, canActivate: [authGuard] },
  { path: 'pds-family-background', component: PdsFamilyBackgroundComponent, canActivate: [authGuard] },
  { path: 'loan-information', component: LoanInformationComponent, canActivate: [authGuard] },
  { path: 'personal-data-sheet', component: PersonalDataSheetComponent, canActivate: [authGuard] },
  { path: 'personal-data-sheet/personal-information', component: PersonalInformationComponent, canActivate: [authGuard] },
  { path: 'personal-data-sheet/family-background', component: FamilyBackgroundComponent, canActivate: [authGuard] },
  { path: 'personal-data-sheet/educational-background', component: EducationalBackgroundComponent, canActivate: [authGuard] }

];
