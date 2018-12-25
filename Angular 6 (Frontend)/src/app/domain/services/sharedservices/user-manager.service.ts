import { Injectable } from '@angular/core';
import { LoginViewModel } from '../../models/signin/sigin';

@Injectable()
export class UserManagerService {

  constructor() { }
  getCurrentUser(): LoginViewModel {
    let user = new LoginViewModel();
    user = JSON.parse(localStorage.getItem("user"))
    return user;
  }

}
