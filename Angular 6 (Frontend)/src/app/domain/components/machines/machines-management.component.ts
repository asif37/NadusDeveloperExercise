import { Component, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { Machine } from '../../models/MachineModel/machineModel';
import { MachineService } from '../../services/machine/machine.service';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { ProductRoute, EmployeeRoutes } from '../../models/route/employeeRoutes';
import { UserManagerService } from '../../services/sharedservices/user-manager.service';
import { TostService } from '../../services/sharedservices/tost.service';
import { deleteConformation } from '../../shared/confirmations/delete-confirmation/delete-conformation';
import * as MobileDetect from 'mobile-detect';

@Component({
  selector: 'app-machines-management',
  templateUrl: './machines-management.component.html',
  styleUrls: ['./machines-management.component.scss']
})
export class MachinesManagementComponent implements OnInit, AfterViewInit {
  public isMobile: boolean = false;
  machineList: Machine[];
  dailogRef: MatDialogRef<deleteConformation>;
  deleteConfirm: MatDialogRef<deleteConformation>;

  //displayedColumns = [];
  //dataSource: any;
  openForSelection = false;
  routeId: number;
  machineSelectionForEmployee: boolean = false;
  employeeId: string;
  pageTitle: string = "Machine List";
  showTitle = false;
  @Output() emitter: EventEmitter<any>;
  constructor(private machineService: MachineService,
    private userService: UserManagerService,
    private dialog: MatDialog,
    private tost: TostService
  ) {
    this.machineList = [];
    if (!this.openForSelection) {
      //this.displayedColumns = ['machineName', 'serialNo', 'creteddate', 'actions'];
    }
    this.emitter = new EventEmitter();
  }
  ngOnInit() {
    this.isMobile = this.getDeviceInfo() !== null;
    if (this.openForSelection) {
      // this.displayedColumns = ['machineName', 'serialNo', 'creteddate', 'selected'];
    }
    this.getMachineList();
    // this.cdRef.detectChanges();
    //this.dataSource = new MatTableDataSource(this.machineList);

  }
  ngOnDestroy() {

  }
  public getDeviceInfo(): string {
    const md = new MobileDetect(window.navigator.userAgent);
    return md.mobile();
   
  }
  getMachineList() {
    // this.dialog.closeAll();
    let routeId = 0
    let allMachineListWithSelection = 1;
    let empId = "";
    if (this.openForSelection) {
      this.pageTitle = "Select Machines For Route";
      routeId = this.routeId;
    }
    if (this.machineSelectionForEmployee) {
      allMachineListWithSelection = 0;
    }
    if (this.machineSelectionForEmployee && this.employeeId) {
      empId = this.employeeId;
      this.pageTitle = "Assign Selected Machines To Employee";
    }

    this.machineService.getEnableDisableMachineList(routeId, allMachineListWithSelection, empId)
      .subscribe(
        data => {
          this.machineList = data;
        },
        error => {
          this.tost.generalhttpError();
          console.log(error)
        }
      )
  }
  deleteMachine(machine: Machine) {
    this.machineService.deleteMachine(machine)
      .subscribe(
        data => {     
          if (data) {
            this.tost.success("Deleted successfully");
            this.getMachineList();
          } else {
            this.tost.error("This machine has assigned so can not be delete");
            //alert("This machine has assigned so can not be delete");
          }
        },
        error => {
          this.tost.generalhttpError();
          console.log(error)
        }
      )
  }
  enableDisableMachine(machine:Machine)
  {
    this.machineService.enableMachine(machine)
      .subscribe(
        data => {
          if (data) {
            this.tost.success("Macine Enabled successfully");
            this.getMachineList();
          } else 
          {
            this.tost.error("This machine has assigned so can not be delete");
            //alert("This machine has assigned so can not be delete");
          }
        },
        error => {
          this.tost.generalhttpError();
          console.log(error)
        }
      )
  }
  addSelectedMachines() 
  {
    let productRouteList = new Array<ProductRoute>();
    this.machineList.
      forEach((
        x => {
          let productRoute = new ProductRoute();
          productRoute.routeId = this.routeId;
          productRoute.createdBy = this.userService.getCurrentUser().userId;
          productRoute.productId = x.productId;
          productRoute.selected = x.selected;
          productRouteList.push(productRoute);
        }));
    if (this.machineList.length > 0) {
      this.machineService.saveMachinesToProduct(productRouteList)
        .subscribe(data => {
          this.tost.success("Machines assigned successfully");
          this.emitter.emit(this.machineList.filter(x => x.selected));
          this.emitter.emit("close");
        });
    }
  }
  assignSelectedMachinesToEmployee() {
    let employeeRoutes = new Array<EmployeeRoutes>();
    this.machineList.forEach((x) => {
      let employeeRoute = new EmployeeRoutes();
      employeeRoute.createdBy = this.userService.getCurrentUser().userId;
      employeeRoute.isEmployeeDisable = false;
      employeeRoute.isProductDisable = false;
      employeeRoute.routeId = this.routeId;
      employeeRoute.userId = this.employeeId;
      employeeRoute.updatedBy = employeeRoute.createdBy;
      employeeRoute.productId = x.productId;
      employeeRoute.selected = x.selected;
      employeeRoutes.push(employeeRoute);
    });

    this.machineService.postAssignEmployeeToRoute(employeeRoutes)
      .subscribe(data => {
        if (data) {
          this.tost.generalhttpSuccess();
          this.emitter.emit("close");
        }
      })
  }
  ngAfterViewInit(): void {

    setTimeout(() => { this.showTitle = true; }, 1000);
  }

  confirmOnDelete(machine: Machine) {
    this.deleteConfirm = this.dialog.open(deleteConformation, {
      id: 'deleteConfirmation',
      hasBackdrop: false,
      height: '150px',
      width: '500px',
    });
    if (this.deleteConfirm.componentInstance.data) {
      this.deleteConfirm.componentInstance.data.text = "Are you sure want to delete this?";
      this.deleteConfirm.componentInstance.data.title = "Warning!"
    }
    if (this.deleteConfirm.componentInstance.emitter) {
      this.deleteConfirm.componentInstance.emitter
        .subscribe(data => {
          if (data) {
            let dailogToClose = this.dialog.getDialogById('deleteConfirmation');
            dailogToClose.close();
            this.deleteMachine(machine);
          }
           else {
            let dailogToClose = this.dialog.getDialogById('deleteConfirmation');
            dailogToClose.close();
          }
        });
    }
  }
}