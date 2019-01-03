import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultLayoutComponent } from './layouts/default/default.component';
import { ExtraLayoutComponent } from './layouts/extra/extra.component';
import { DashboardCountsComponent } from './domain/components/dashboard/dashboard-counts.component';
import { AssignedMachinesListComponent } from './domain/components/machines/assigned-machines-list/assigned-machines-list.component';
import { AuthGuardEmployee } from './domain/Employee.guard';
import { AuthGuardManager } from './domain/Manager.guard';
import { MachinesManagementComponent } from './domain/components/machines/machines-management.component';
import { Page404Component } from './layouts/extra-pages/page-404/page-404.component';
import { PageSignIn1Component } from './layouts/extra-pages/sign-in-1/sign-in-1.component';
const defaultRoutes: Routes = [
  { path: 'dashboard', component: DashboardCountsComponent },
  { path: 'signIn/:logout', component: PageSignIn1Component },
  { path: 'vendorsShopping', component: AssignedMachinesListComponent },
  { path: 'vendorsShopping/:t', component: AssignedMachinesListComponent },
  { path: 'machineManagement', component: MachinesManagementComponent, canActivate: [AuthGuardManager] },
  { path: 'login', component: PageSignIn1Component },
];

// const extraRoutes: Routes = [
//   { path: 'forgot', component: PageForgotComponent },
//   { path: 'page-404', component: Page404Component },
// ];

export const routes: Routes = [
  {
    path: '',
    component: PageSignIn1Component,
    pathMatch: 'full'
  },
  {
    path: 'default-layout',
    component: DefaultLayoutComponent,
    children: defaultRoutes
  },
  // {
  //   path: 'extra-layout',
  //   component: ExtraLayoutComponent,
  //   children: extraRoutes
  // },
  {
    path: '**',
    component: PageSignIn1Component,
    //children: defaultRoutes
  }
];
@NgModule({
  imports: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
