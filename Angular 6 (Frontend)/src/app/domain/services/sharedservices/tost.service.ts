import { Injectable } from '@angular/core';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Injectable()
export class TostService {

  constructor(private tost: ToastrService) {
  }

  success(message: string, title?: string, timeout: number = 1500): void {
    this.clear();
    this.tost.success(message, title ? title : "Success", { timeOut: timeout });
  }
  error(message: string, title?: string, timeout: number = 1500): void {
    this.clear();
    this.tost.error(message, title ? title : "Error", { timeOut: timeout });
  }
  warning(message: string, title?: string, timeout: number = 1500): void {
    this.clear();
    this.tost.warning(message, title ? title : "Alert", { timeOut: timeout });
  }
  info(message: string, title?: string, timeout: number = 1500): void {
    this.clear();
    this.tost.info(message, title ? title : "Info", { timeOut: timeout });
  }
  generalhttpError() {
    this.clear();
    this.tost.error("Error while requesting");
  }
  generalhttpSuccess(message: string = "saved") {
    this.clear();
    this.tost.success("Sussessfully " + message + ".");
  }
  private clear() {
    console.clear()
    this.tost.clear();
  }
}
