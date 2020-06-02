// TODO: Write code to define and export the Employee class

//parent class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName() {
        return this.name;
    };
    getId() {
        return this.id;
    };
    getEmail() {
        return this.email;
    };
    //Returns 'Employee'

    getRole() {
        return 'Employee'
    };
}

// 1. Run tests
// 2. Create or update classes to pass a single test case
// 3. Repeat



module.exports = Employee;