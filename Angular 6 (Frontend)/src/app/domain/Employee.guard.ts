import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardEmployee implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // if (localStorage.getItem('role') == '"1"') {
        //     return true;
        // }
        // else {
        //     return false;
        // }
        return true;
    }
}