import { Injectable } from '@angular/core';
import { httpCaller } from '../sharedservices/httpCaller.service';
// import { toPromise } from 'rxjs/operator/toPromise';
import { Observable } from 'rxjs';
import { httpType } from '../../shared/enums/enums';
import { LoginViewModel } from '../../models/signin/sigin';

@Injectable()
export class signInservice {

    constructor(private httpCaller: httpCaller) { }

    Login(model: LoginViewModel): Observable<any> {
        return this.httpCaller.apiCaller(httpType.post, "Account/Login", model)
        //       localStorage.setItem("user", JSON.stringify(model));
    }

}
