import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardManager implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // if (localStorage.getItem('role') == '"2"') {
        //     return true;
        // }
        // else {
        //     return false;
        // }
        return true;
    }
}