import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DashBoardCounts } from '../../models/dashboard/dashboard.model';
import { LoginViewModel } from '../../models/signin/sigin';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { UserManagerService } from '../../services/sharedservices/user-manager.service';
@Component({
  selector: 'app-dashboard-counts',
  templateUrl: './dashboard-counts.component.html',
  styleUrls: ['./dashboard-counts.component.scss']
})
export class DashboardCountsComponent implements OnInit {
  dashBoardCounts: DashBoardCounts;
  user: LoginViewModel;
  constructor(private _service: DashboardService, private router: Router, private userService: UserManagerService) {
    this.dashBoardCounts = new DashBoardCounts();
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    if (this.user && this.user.userId && this.user.roleId) {

      this._service.getDashBoardCount(this.user.userId, this.user.roleId)
        .subscribe(
          data => {
            if (data) {
              this.dashBoardCounts = data;
            }
          }, error => {

          });
    }
  }
  navigeToList(type: string, num: number) {
    if (!num) {
      return false;
    }
    let url = "";
    if (type === "employee") {
      url = "/default-layout/employeeManagement";
    }
    if (type === "route") {
      url = "/default-layout/routesManagement";
    }

    if (type === "routeassigned") {
      url = "/default-layout/assignRoutes";

    }
    if (type === "machineassigned") {
      url = "/default-layout/assignedMachine";
    }
    if (type === "done") {
      url = "/default-layout/assignedMachine/d";
    }
    if (type === "partially") {
      url = "/default-layout/assignedMachine/p";
    }
    if (type === "not") {
      url = "/default-layout/assignedMachine/n";
    }

    this.router.navigateByUrl(url);
  }


}
