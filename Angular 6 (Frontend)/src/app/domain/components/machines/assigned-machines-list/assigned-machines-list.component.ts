
import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Machine } from '../../../models/MachineModel/machineModel';
import { Vendor } from '../../../models/MachineModel/machineModel';
import { Products } from '../../../models/MachineModel/machineModel';
import { Order } from '../../../models/MachineModel/machineModel';
import { MachineService } from '../../../services/machine/machine.service';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { ProductRoute } from '../../../models/route/employeeRoutes';
import { LoginViewModel } from '../../../models/signin/sigin';
import { UserManagerService } from '../../../services/sharedservices/user-manager.service';
import { UrlParamService } from '../../../services/sharedservices/url-params-service';
import { TostService } from '../../../services/sharedservices/tost.service';
import * as MobileDetect from 'mobile-detect';

@Component({
  selector: 'app-assigned-machines-list',
  templateUrl: './assigned-machines-list.component.html',
  styleUrls: ['./assigned-machines-list.component.scss']
})
export class AssignedMachinesListComponent implements OnInit {
  public isMobile: boolean = false;
  public isProductSelect: boolean=false;
  public productQuantity: string;
  machineList: Machine[];
  vendorList: Vendor[];
  productsList: Products[];
  ordersList: Order[];
  selectedVendorId: number;
  displayedColumns = [];
  dataSource: any;
  openForSelection = false;
  routeId: number;
  @Output() emitter: EventEmitter<any>;
  user: LoginViewModel
  pageTitle: string = "Please Select Vendor for Shopping";
  constructor(private machineService: MachineService,
    private dialog: MatDialog,
    private userManagerService: UserManagerService,
    private urlService: UrlParamService,
    private tost: TostService) {
    this.machineList = [];
    this.productsList = [];
    this.ordersList = [];
    this.vendorList=[];
    this.displayedColumns = ['machineName', 'serialNo','routeName','userName', 'creteddate', 'status', 'actions'];
    this.emitter = new EventEmitter();
    this.getTypeList();
    this.getOrdersofCustomer(4);
  }
  ngOnInit() {
    

  }
  ngOnDestroy() {

  }
  public getDeviceInfo(): string {
    const md = new MobileDetect(window.navigator.userAgent);
    return md.mobile();
   
  }
  placeOrder()
  {
    alert("Order placed Successfully");
  }
  selectVendor($event) {
    this.selectedVendorId = $event.target.value;
    this.getProductsByVendor(this.selectedVendorId);
  }
  quantityChange($event) {
    this.productQuantity = $event.target.value;
  }

  getTypeList() {
    this.machineService.getTypeList()
      .subscribe(
        data => {
          this.vendorList = data;
          this.dataSource = new MatTableDataSource(this.vendorList);
        },
        error => {
          console.log(error);
          this.tost.generalhttpError();
        }
      )
  }
  getProductsByVendor(id:number) {
    this.machineService.getProductsList(id)
      .subscribe(
        data => {
          this.productsList = data;
          this.dataSource = new MatTableDataSource(this.productsList);
          this.getOrdersofCustomer(4);
        },
        error => {
          console.log(error);
          this.tost.generalhttpError();
        }
      )
  }
  getOrdersofCustomer(id:number) {
    this.machineService.getOrdersList(id)
      .subscribe(
        data => {
          this.ordersList = data;
          this.dataSource = new MatTableDataSource(this.ordersList);
        },
        error => {
          console.log(error);
          this.tost.generalhttpError();
        }
      )
  }
  SelectUnselectProduct(event: any, product: Products) { 
  if (this.productQuantity == "" || this.productQuantity==undefined) {
    this.tost.error("Please Select Quantity for order");
  }   
  else    
  {
    this.isProductSelect = (event).checked;
    let emp: LoginViewModel = (JSON.parse(localStorage.getItem("user")));
   
   let quantity=this.productQuantity;
   this.machineService.orderProducts(this.isProductSelect,product.productId,quantity,emp.userId)
   .subscribe(
     data => {
       // this.productsList = data;
       // this.dataSource = new MatTableDataSource(this.productsList);
     },
     error => {
       console.log(error);
       this.tost.generalhttpError();
     }
   )
   this.productQuantity == "";
  } 
   
  }


  //#region            
  // getAssignedMachines(type = "") {

  //   this.machineService.getAssignedMachines(this.user.userId, this.user.roleId, type)
  //     .subscribe(
  //       data => {
  //         this.machineList = data;
  //         this.dataSource = new MatTableDataSource(this.machineList);
  //         //console.log(this.machineList);
  //       },
  //       error => {
  //         console.log(error);
  //         this.tost.generalhttpError();
  //       }
  //     )
  // }
  // deleteMachine(machine: Machine) {
  //   this.machineService.deleteMachine(machine)
  //     .subscribe(
  //       data => {
  //         if (data) {
  //           this.getAssignedMachines();
  //           this.tost.generalhttpSuccess("deleted");
  //         } else {
  //           this.tost.info("machine has assigned, so can't deleted");
  //         }
  //       },
  //       error => {
  //         this.tost.generalhttpError();
  //         console.log(error)
  //       }
  //     )
  // }

  // addSelectedMachines() {

  //   let productRouteList = new Array<ProductRoute>();

  //   let list = this.machineList.filter(x => x.selected)
  //   list.forEach((
  //     x => {
  //       let productRoute = new ProductRoute();
  //       productRoute.routeId = this.routeId;
  //       productRoute.createdBy = this.userManagerService.getCurrentUser().userId;
  //       productRoute.productId = x.productId;
  //       productRouteList.push(productRoute);
  //     }));
  //   if (list.length > 0) {
  //     this.machineService.saveMachinesToProduct(productRouteList)
  //       .subscribe(data => {
  //         this.tost.generalhttpSuccess();
  //         this.emitter.emit(list);
  //       });
  //   }

  // }

  // openQuestionDialog(machine: Machine = null) {
  //   this.dailogRef = this.dialog.open(MachinesQuestionsAnswersComponent, {
  //     id: 'AddQuestionAnswers',
  //     hasBackdrop: true,
  //     height: '500px',
  //     width: '800px',
  //   });
  //   this.dailogRef.componentInstance.product = machine;
  //   if (this.dailogRef.componentInstance.emitter) {
  //     this.dailogRef.componentInstance.emitter
  //       .subscribe(data => {
  //         if (data) {
  //           let dailogToClose = this.dialog.getDialogById('AddQuestionAnswers');
  //           let lastParameter = this.urlService.getlastParameter();
  //           if (lastParameter) {
  //             if (lastParameter.includes('assignedMachine')) {
  //               this.getAssignedMachines();
  //             }
  //             else if (lastParameter === "n" || lastParameter === "d" || lastParameter === "p") {
  //               if (lastParameter === "n")
  //                 this.pageTitle = "Machines List (Not Started)";
  //               else if (lastParameter === "d")
  //                 this.pageTitle = "Machines List (Done)";
  //               else if (lastParameter === "p")
  //                 this.pageTitle = "Machines List (Partially Done)";
  //               this.getAssignedMachines(lastParameter);
  //             }
  //             else {
  //               this.pageTitle = "Total Machines (Assigned)";
  //               this.getMachinesOnSpecificRouteForCurrentUser(this.user.userId, lastParameter);
  //             }
  //           }
  //           dailogToClose.close();
  //         }
  //       });
  //   }
  // }

  // aadNote(machine: Machine) {
  //   this.dailogRefNotes = this.dialog.open(MachineNotesComponent, {
  //     id: 'machineNotes',
  //     hasBackdrop: false,
  //     height: '340px',
  //     width: '800px',
  //   });
  //   this.dailogRefNotes.componentInstance.product = machine;
  //   if (this.dailogRefNotes.componentInstance.emitter) {
  //     this.dailogRefNotes.componentInstance.emitter
  //       .subscribe(data => {
  //         if (data) {
  //           let dailogToClose = this.dialog.getDialogById('machineNotes');
  //           dailogToClose.close();
  //         }
  //       });
  //   }
  //   //this.dialog.open()
  // }

  // getMachinesOnSpecificRouteForCurrentUser(userId, routeId) {
  //   this.machineService.getAssignedMachineListOnSpecificRouteForEmployee(userId, routeId)
  //     .subscribe(
  //       data => {
  //         this.machineList = data;
  //         this.dataSource = new MatTableDataSource(this.machineList);
  //         //console.log(this.machineList);
  //       },
  //       error => {
  //         this.tost.generalhttpError();
  //         console.log(error)
  //       }
  //     )
  // }

  // LoadMachineAllNotesList(machine: Machine) {
  //   this.dailogRefNotesList = this.dialog.open(MachineNotesListComponent, {
  //     id: 'machineNoteslist',
  //     hasBackdrop: true,
  //     height: '500px',
  //     width: '800px',
  //   });
  //   this.dailogRefNotesList.componentInstance.machineId = machine.productId;
  //   this.dailogRefNotesList.componentInstance.routeId = machine.routeId;
  //   this.dailogRefNotesList.componentInstance.machineName = machine.productName;
  //   if (this.dailogRefNotesList.componentInstance.emitter) {
  //     this.dailogRefNotesList.componentInstance.emitter
  //       .subscribe(data => {
  //         if (data) {
  //           let dailogToClose = this.dialog.getDialogById('machineNoteslist');
  //           dailogToClose.close();
  //         }
  //       });
  //   }
  // }
  //#endregion
}
