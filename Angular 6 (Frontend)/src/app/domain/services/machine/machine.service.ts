import { Injectable } from '@angular/core';
import { httpCaller } from '../sharedservices/httpCaller.service';
import { httpType } from '../../shared/enums/enums';
import { Observable } from 'rxjs/observable';
//import { Machine } from '../../models/Machine/Machine';

@Injectable()
export class MachineService {

  constructor(private httpCaller: httpCaller) { }


  GetAllMachinesOnCityState(city:string="",state :string="")
  {
  return this.httpCaller.apiCaller(httpType.get, "Manager/GetAllMachinesOnCityStateSelection?city=" + city + "&state=" + state + " ");
  }
  GetAllMachinesOnSerialNumber(termianlId:string="")
  {
  return this.httpCaller.apiCaller(httpType.get, "Manager/GetAllMachinesOnTerminalId?termianlId=" + termianlId +" ");
  } 

  getMachineList(routeId: number = 0, allWithSelection = 1, userId = ""): Observable<any> {
    if (userId)
      return this.httpCaller.apiCaller(httpType.get, "Manager/GetAssignedMachineListOnSpecificRouteForEmployee?routeId=" + routeId + "&userId=" + userId + " ");
      else
      if (routeId === 0)
        return this.httpCaller.apiCaller(httpType.get, "Manager/GetMachineList");
      else
        return this.httpCaller.apiCaller(httpType.get, "Manager/GetMachineListOnSpecificRoute?routeId=" + routeId + "&allWithSelection=" + allWithSelection + " ");
  }

  getRouteList(): Observable<any> {
    return this.httpCaller.apiCaller(httpType.get, "Manager/GetRouteList");
  }

  getMachineListFromState(state): Observable<any> {
        return this.httpCaller.apiCaller(httpType.get, "Manager/GetMachineList");
  }

  getEnableDisableMachineList(routeId: number = 0, allWithSelection = 1, userId = ""): Observable<any> {
    if (userId)
      return this.httpCaller.apiCaller(httpType.get, "Manager/GetAssignedMachineListOnSpecificRouteForEmployee?routeId=" + routeId + "&userId=" + userId + " ");
    else
      if (routeId === 0)
        return this.httpCaller.apiCaller(httpType.get, "Manager/GetEnableDisableMachines");
      else
        return this.httpCaller.apiCaller(httpType.get, "Manager/GetMachineListOnSpecificRoute?routeId=" + routeId + "&allWithSelection=" + allWithSelection + " ");

  }
  getAssignedMachineListOnSpecificRouteForEmployee(userId, routeId) {
    return this.httpCaller.apiCaller(httpType.get, "Manager/GetAssignedMachineListOnSpecificRouteForEmployee?routeId=" + routeId + "&userId=" + userId + "");
  }




  /////////////////
  getTypeList(): Observable<any> {
    return this.httpCaller.apiCaller(httpType.get, "Vendor/GetVendorList");
  }
  getProductsList(vendorId): Observable<any> {
    return this.httpCaller.apiCaller(httpType.get, "Vendor/GetProductsByVendor?vendorId=" + vendorId );
  }
  getOrdersList(customerId): Observable<any> {
    return this.httpCaller.apiCaller(httpType.get, "Vendor/getOrdersList?customerId=" + customerId );
  }
  orderProducts(productSelected,productId,quantity,customerId): Observable<any> {
    return this.httpCaller.apiCaller(httpType.get, "Vendor/orderProducts?productSelected=" + productSelected + "&productId=" + productId + "&quantity=" + quantity + "&customerId=" + customerId  );
  }

  ////////////////






  updateMachine(data: any): Observable<any> {
    return this.httpCaller.apiCaller(httpType.post, "Manager/UpdateMachine", data);
  }
  deleteMachine(data: any): Observable<any> {
    return this.httpCaller.apiCaller(httpType.post, "Manager/DeleteMachine", data);
  }
  enableMachine(data: any): Observable<any> {
    return this.httpCaller.apiCaller(httpType.post, "Manager/EnableMachine", data);
  }
  saveMachine(data: any): Observable<any> {
    return this.httpCaller.apiCaller(httpType.post, "Manager/PostInsertMachine", data);
  }
  saveMachinesToProduct(data: any): Observable<any> {
    return this.httpCaller.apiCaller(httpType.post, "Manager/PostAssignMachineToRoute", data);
  }
  getAssignedMachines(userId, roleId, type): Observable<any> {
    return this.httpCaller.apiCaller(httpType.get, "Manager/GetAssignedMachines?userId=" + userId + "&roleId=" + roleId + "&t=" + type + "");
  }
  saveMachineNote(data): Observable<any> {
    return this.httpCaller.apiCaller(httpType.post, "Manager/SaveMachineNote", data);
  }
  postAssignEmployeeToRoute(data): Observable<any> {
    return this.httpCaller.apiCaller(httpType.post, "Manager/postAssignEmployeeToRoute", data);
  }

  getMachineNoteById(id: number): Observable<any> {
    return this.httpCaller.apiCaller(httpType.get, "Manager/getMachineNoteById?Id=" + id + "");
  }
  getMachineNoteByMachineId(id: number, routeId: number): Observable<any> {
    return this.httpCaller.apiCaller(httpType.get, "Manager/getMachineNoteByMachineId?Id=" + id + "&routeId=" + routeId + "");
  }
}
