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
    return inquirer
        .prompt([

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
            console.log(response)
            if (response.role === "Employee") {
                // console.log("true");
            }
            if (response.role === "Manager") {
                // //manager
                console.log(response)
                inquirer.prompt([{
                    type: "input",
                    message: "What is the office number?",
                    name: "officeNumber",
                }])
                    .then((response) => {
                        const manager = new Manager(response.name, response.email, response.id, response.officeNumber)
                        employeesArray.push(manager);
                    })

            }
            if (response.role === "Engineer") {
                // //Engineer
                inquirer.prompt([{
                    type: "input",
                    message: "What is your github?",
                    name: "github",
                }])
                    .then((response) => {
                        const engineer = new engineer(response.name, response.email, response.id, response.github)
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
                    .then((response) => {
                        const intern = new Intern(response.name, response.email, response.id, response.school)
                        employeesArray.push(intern);
                        rerun()
                        console.log(employeesArray)
                    })
            }


        })
};
// prompt()
newEmployee();



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! 
