import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from './services/employee/employee.service'
import { MachineService } from './services/machine/machine.service'
import { httpCaller } from './services/sharedservices/httpCaller.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthGuardEmployee } from './Employee.guard';
import { AuthGuardManager } from './Manager.guard';
import {WebcamModule} from 'ngx-webcam';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  

} from '@angular/material';

import { OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CalendarModule } from 'angular-calendar';
import { AgmCoreModule } from '@agm/core';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { dynamicLoaderHostDirective } from './shared/directives/dynamic-loader';
import { UserManagerService } from './services/sharedservices/user-manager.service'; 
import { MachinesManagementComponent } from './components/machines/machines-management.component';
import { AddMachineComponent } from './components/machines/add-machine/add-machine.component';
import { DashboardCountsComponent } from './components/dashboard/dashboard-counts.component';
import { AssignedMachinesListComponent } from './components/machines/assigned-machines-list/assigned-machines-list.component';
import { PageSignIn1Component } from '../layouts/extra-pages/sign-in-1/sign-in-1.component';
import { Page404Component } from '../layouts/extra-pages/page-404/page-404.component';

import { deleteConformation } from './shared/confirmations/delete-confirmation/delete-conformation';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    ChartsModule,
    NgxChartsModule,
    WebcamModule,
    CalendarModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAU9f7luK3J31nurL-Io3taRKF7w9BItQE'
    }),
    AmChartsModule
  ],
  providers: [AuthGuardEmployee, AuthGuardManager, EmployeeService,
    httpCaller, HttpClient, MachineService,UserManagerService
  ],
   declarations: [
    PageSignIn1Component,
     Page404Component,
    dynamicLoaderHostDirective,   
    MachinesManagementComponent,
    AddMachineComponent,
    DashboardCountsComponent,
    AssignedMachinesListComponent,
    deleteConformation
  ],
  exports: [
    CdkTableModule,
    MatTableModule,
    PageSignIn1Component,
     Page404Component
  ],
  entryComponents: [AddMachineComponent,deleteConformation],
})
export class PagesModule { }
