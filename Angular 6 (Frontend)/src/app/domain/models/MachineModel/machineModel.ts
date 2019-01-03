export class Machine {
    constructor() {
        this.deleted = false;
    }
    productId: number;
    productTypeId: number;
    productName: string;
    serialNumber: string;
    imageLocation: string;
    createdDate: string;
    createdBy: string;
    updatedate: Date;
    updatedBy: string;
    deleted: boolean;
    selected: boolean;
    routeId: number;
    routeName: string;
    userName: string;
    productAuditStatus: boolean;
    getMachine(machine: Machine): Machine {
        let newMachine = new Machine();
        if (!Machine)
            return newMachine;
        newMachine.productId = machine.productId;
        newMachine.productTypeId = machine.productTypeId;
        newMachine.productName = machine.productName;
        newMachine.serialNumber = machine.serialNumber;
        newMachine.imageLocation = machine.imageLocation
        newMachine.routeId = machine.routeId;
        return newMachine;
    }
}

export class Vendor {
    id: number;
    name: string;
    managerId: number;   
}
export class Order {
    id: number;
    productId: string;
    quantity: string;   
    toatlPrice:string;
}
export class Products {
    productId: number;
    productTypeId: number;
    productName: string;
    serialNumber: string;
    imageLocation: string;
    createdDate: string;
    createdBy: string;
    updatedate: Date;
    updatedBy: string;   
    isDisable:boolean;
    vendorId:number;
    price:string;
}
export class QuestionAnswer {

    constructor() {
        this.productAudit = new ProductAudit();
    }

    answerId: number;
    questionId: number;
    answerDescription: string;
    createdBy: number;
    updatedBy: number;

    productAudit: ProductAudit
}
export class ProductAudit {
    UserId: string;
    QuestionId: number;
    ImagePath: string;
    ProductId: number;
    ImageLocation: string;
    CreatedBy: string;
    UpdatedBy: string;
    RouteId: string;
}

export class ProductNote {
    serialNo: number;
    noteId: number;
    routeId: number;
    productId: number;
    noteDescription: string;
    createDate: Date;
    machineName: string;
    tooltip: string;
}


