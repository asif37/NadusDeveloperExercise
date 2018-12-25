export class EmployeeRoutes {
    productId: number;
    productRouteId: number;
    productName: string;
    routeName: string;
    routeId: number;
    userId: string;
    isEmployeeDisable: boolean
    isProductDisable: boolean
    createdBy: string;
    updatedBy: string;
    selected: boolean;
}

export class ProductRoute {
    productId: number;
    routeId: number;
    createdBy: string;
    selected: boolean;
}