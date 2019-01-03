import { Injectable } from '@angular/core';
import { httpCaller } from '../sharedservices/httpCaller.service';
import { Observable } from 'rxjs/observable';
import { httpType } from '../../shared/enums/enums';
import { TostService } from '../sharedservices/tost.service';

@Injectable()
export class DashboardService {

  constructor(private httpCaller: httpCaller, private tost: TostService) {

  }
  getDashBoardCount(userId: string, roleId: string): Observable<any> {
    // this.tost.info('Please Wait.', 'Loading', 1000);
    return this.httpCaller.apiCaller(httpType.get, "Manager/GetDashBoardCount?userId=" + userId + "&roleId=" + roleId + "");
  }
}
