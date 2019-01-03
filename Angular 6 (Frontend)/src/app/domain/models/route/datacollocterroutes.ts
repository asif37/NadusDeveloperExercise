export class dataCollocterRoute {

    constructor() {
        this.employeeRoutes = new Array<EmployeeRoutes>();
    }
    routeId: string;
    routeName: string;
    locationAddress: string;
    city: string;
    zip: string;
    state: string;
    country: string="USA";
    createdBy: string = "";
    userName: string;
    assignedUsers: string;
    assignedMachines: string;
    employeeRoutes: Array<EmployeeRoutes>;

    public getRoute(route: dataCollocterRoute): dataCollocterRoute {
        let newRoute = new dataCollocterRoute();
        if (!route) {
            return newRoute;
        }
        else {
            newRoute.routeId = route.routeId;
            newRoute.routeName = route.routeName;
            newRoute.locationAddress = route.locationAddress;
            newRoute.city = route.city;
            newRoute.zip = route.zip;
            newRoute.state = route.state;
            newRoute.country = route.country;
            if (newRoute.employeeRoutes) {
                newRoute.employeeRoutes = route.employeeRoutes;
            } else {
                newRoute.employeeRoutes = new Array<EmployeeRoutes>();
            }
            return newRoute;
        }
    }
}

export class EmployeeRoutes {

    UserId: string;
    RouteId: number;
    ProductRouteId: number;
    IsEmployeeDisable = false;
    IsProductDisable = false;
    CreatedBy = "Asif_hameed";
    UpdatedBy = "Asif_hameed";
}

