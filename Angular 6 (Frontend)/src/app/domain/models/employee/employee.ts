export class Employee {
    // constructor() {
    //     this.deleted = false;
    // }
    // id: string;
    firstName: string;
    id: string;
    lastName: string;
    employeeRole:string;
    email: string;
    zip: string;
    city: string;
    state: string;
    password: string;
    rememberMe: boolean;
    selected: boolean = false;
    isDisable: boolean;
    // deleted: boolean;

    getEmployee(employee: Employee): Employee {
        let newEmployee = new Employee();
        if (!employee)
            return newEmployee;
        newEmployee.id = employee.id;
        newEmployee.firstName = employee.firstName;
        newEmployee.lastName = employee.lastName;
        newEmployee.employeeRole = employee.employeeRole;
        newEmployee.email = employee.email;
        newEmployee.zip = employee.zip;
        newEmployee.city = employee.city;
        newEmployee.state = employee.state;
        newEmployee.selected = employee.selected;
        newEmployee.isDisable = employee.isDisable;
        // newEmployee.deleted = employee.deleted;
        return newEmployee;
    }
}
