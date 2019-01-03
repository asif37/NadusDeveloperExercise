import { Injectable } from '@angular/core';
import { httpCaller } from '../sharedservices/httpCaller.service';
import { httpType } from '../../shared/enums/enums';
import { Observable } from 'rxjs/observable';
import { Employee } from '../../models/employee/employee';

@Injectable()
export class EmployeeService {

  constructor(private httpCaller: httpCaller) { }

  getEmployeeListForManager(): Observable<any> {
    return this.httpCaller.apiCaller(httpType.get, "Manager/GetEmployeeListForManager");
  }
  getEmployeeList(): Observable<any> {
    return this.httpCaller.apiCaller(httpType.get, "Manager/GetAllEmployees");
  }
  getEmployeeRoutes(data:any): Observable<any> {
    return this.httpCaller.apiCaller(httpType.post,"Employee/GetEmployeeRoutes",data);
  }
  updateEmployee(data: Employee): Observable<any> {
    return this.httpCaller.apiCaller(httpType.post, "Employee/UpdateEmployee", data);
  }
  deleteEmployee(data: Employee): Observable<any> {
    return this.httpCaller.apiCaller(httpType.post, "Manager/DeleteEmployee", data);
  }
  saveEmployee(data: any): Observable<any> {
    if (!data.id) {
      return this.httpCaller.apiCaller(httpType.post, "Account/Register", data);
    }
    return this.updateEmployee(data);
  }
  resetPassword(data: any): Observable<any> {
     return this.httpCaller.apiCaller(httpType.post, "Account/ResetPassword", data);
  }
  checkEmailExist(data: any): Observable<any> {
    return this.httpCaller.apiCaller(httpType.post, "Account/CheckEmailExist", data);
 }
  

  getEmployeeById(id: string): Observable<any> {
    return this.httpCaller.apiCaller(httpType.get, "Employee/GetEmployeeById?Id=" + id + "")
  }

}
