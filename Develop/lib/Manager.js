// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");


class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        // this.officeNumber = officeNumber;
    }

    // Overridden to return 'Manager'
    getRole() {
        return 'Manager'
    };
    getOffice() {
        return 'office number'
    }
}




module.export = Manager;