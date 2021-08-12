const inquirer = require('inquirer');
const cTable = require('console.table');

const questions = [
    {
        type: 'list',
        name: 'taskSelection',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', "Update An Employee's Role", 'Exit'],
        validate: taskSelection => {
            if (taskSelection) {
                return true; 
            } else {
                console.log('You must choose at least one option.')
            }     
        }
    }
]

// Function to initialize application
function init() {
    return inquirer
    .prompt(questions)
    .then(response => {
        console.log(response);
        // switch (response.taskSelection[0]) {
        //     case 'View All Departments':
        //         console.log("Here's a list of all departments.")
        //         break;
        //     case response.taskSelection.includes('View All Roles'):
        //         console.log("Here is a list of all roles.")
        //         break;
        // }
        if (response.taskSelection == 'View All Departments') {
            console.log("Here's a list of all departments.")
            // RUN SOME FUNCTION TO DISPLAY ALL DEPARTMENTS
            return;
        } else if (response.taskSelection == 'View All Roles') {
            console.log("Here's a list of all roles.")
            // RUN SOME FUNCTION TO DISPLAY ALL ROLES
            return;
        } else if (response.taskSelection == 'View All Employees') {
            console.log("Here's a list of all employees.")
            // RUN SOME FUNCTION TO DISPLAY ALL EMPLOYEES
            return;
        } else if (response.taskSelection == 'Add A Department') {
            console.log("Here's how to add a department.")
            // RUN SOME INQUIRER FUNCTION TO PROMPT FOR DEPARTMENT NAME
            // RUN SOME FUNCTION THAT ADDS ABOVE NEW DEPARTMENT TO TABLE (INSERT INTO...)
            return;
        } else if (response.taskSelection == 'Add A Role') {
            console.log("Here's how to add a role.")
            // RUN SOME INQUIRER FUNCTION TO PROMPT FOR ROLE NAME
            // RUN SOME FUNCTION TO ADD A ROLE (INSERT INTO...)
            return;
        } else if (response.taskSelection == 'Add An Employee') {
            console.log("Here's how to add an employee.")
            // RUN SOME INQUIRER FUNCTION TO PROMPT FOR EMPLOYEE FIRST NAME
            // RUN SOME INQUIRER FUNCTION TO PROMPT FOR EMPLOYEE LAST NAME
            // RUN SOME INQUIRER FUNCTION TO PROMPT FOR EMPLOYEE JOB TITLE
            // RUN SOME INQUIRER FUNCTION TO PROMPT FOR EMPLOYEE DEPARTMENT --> LIKELY TIED TO JOB TITLE VIA FK
            // RUN SOME INQUIRER FUNCTION TO PROMPT FOR EMPLOYEE MANAGER --> LIKELY TIED TO JOB TITLE VIA FK
            // RUN SOME FUNCTION TO ADD AN EMPLOYEE (INSERT INTO...)
            return;
        } else if (response.taskSelection == "Update An Employee's Role") {
            console.log("Here's how to change an employee's role.")
            // RUN SOME FUNCTION TO DISPLAY A LIST OF EMPLOYEES (SELECT * FROM employees)
            // RUN SOME FUNCTION TO SELECT AN EMPLOYEE ()
            // RUN SOME FUNCTION TO UPDATE THEIR ROLE
            return;
        } else {
            console.log("Thanks for using Employee Tracker. Goodbye!")
            return;
        }
    })
}

// Initialization of application on run
init();