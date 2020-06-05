const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeesArray = [];


function rerun() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add additional employee?",
            choices: ["Yes", "No"],
            name: "add",
        }
    ])
        .then(function (response) {
            // console.log(response)
            if (response.add === "Yes") {
                newEmployee()
            } else {

                const teamHTML = render(employeesArray)
                fs.writeFile(outputPath, teamHTML, function (err) {

                    if (err) {
                        return console.log(err);
                    }
                    console.log("Success!");

                })
            }
        }
        );
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//array of questions
function newEmployee() {
    inquirer.prompt([

        {
            type: "input",
            message: "Employee Name",
            name: "name",
        },
        {
            type: "input",
            message: "Employee id",
            name: "id",
        },
        {
            type: "input",
            message: "Email address",
            name: "email",
        },

        {
            type: "list",
            message: "Role",
            name: "role",
            choices: ["Employee", "Manager", "Engineer", "Intern"],
        }
    ])
        .then(function (response) {
            if (response.role === "Employee") {
                const employee = new Employee(response.name, response.email, response.id)
                employeesArray.push(employee);
                rerun();
            }
            if (response.role === "Manager") {
                // //manager
                console.log(response)
                inquirer.prompt([{
                    type: "input",
                    message: "What is the office number?",
                    name: "officeNumber",
                }])
                    .then((newResponse) => {
                        console.log(newResponse)
                        const manager = new Manager(response.name, response.email, response.id, newResponse.officeNumber)
                        employeesArray.push(manager);
                        rerun()
                    })

            }
            if (response.role === "Engineer") {
                // //Engineer
                inquirer.prompt([{
                    type: "input",
                    message: "What is your github?",
                    name: "github",
                }])
                    .then((newResponse) => {
                        const engineer = new Engineer(response.name, response.email, response.id, newResponse.github)
                        employeesArray.push(engineer);
                        rerun()
                    })
            }
            if (response.role === "Intern") {
                // //intern
                inquirer.prompt([{
                    type: "input",
                    message: "What is the name of your school?",
                    name: "school",
                }])
                    .then((newResponse) => {
                        const intern = new Intern(response.name, response.email, response.id, newResponse.school)
                        employeesArray.push(intern);
                        rerun()

                    })
            }


        })
};
newEmployee();
