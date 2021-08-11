const inquirer = require('inquirer');
const cTable = require('console.table');

const questions = [
    {
        type: 'checkbox',
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
        // switch (response) {
        //     case response.taskSelection.includes('View All Departments'):
        //         console.log("Here's a list of all departments.")
        //         break;
        //     case response.taskSelection.includes('View All Roles'):
        //         console.log("Here is a list of all roles.")
        //         break;
        // }
        if(response.taskSelection.includes('View All Departments')) {
            console.log("Here's a list of all departments.")
        } else if (response.taskSelection.includes('View All Roles')) {
            console.log("Here's a list of all roles.")
        } else if (response.taskSelection.includes('View All Employees')) {
            console.log("Here's a list of all employees.")
        } else if (response.taskSelection.includes('Add A Department')) {
            console.log("Here's how to add a department.")
        } else if (response.taskSelection.includes('Add A Role')) {
            console.log("Here's how to add a role.")
        } else if (response.taskSelection.includes('Add An Employee')) {
            console.log("Here's how to add an employee.")
        } else if (response.taskSelection.includes("Update An Employee's Role")) {
            console.log("Here's how to change an employee's role.")
        } else {
            console.log("Thanks for using Employee Tracker. Goodbye!")
        }
    })
}

// Initialization of application on run
init();