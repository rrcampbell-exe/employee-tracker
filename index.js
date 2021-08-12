const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

// INQUIRER QUESTIONS

// initial questions
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

// add department prompts
const addDeptPrompts = [
    {
        type: 'input',
        name: 'deptName',
        message: 'What is the name of this new department?',
        validate: deptName => {
            if (deptName) {
                return true;
            } else {
                console.log('You must enter a name for this new department.')
            }
        }
    }
]

// add role prompts
const addRolePrompts = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of this new role?',
        validate: roleName => {
            if (roleName) {
                return true;
            } else {
                console.log('You must enter a name for this new role.')
            }
        },
        type: 'list',
        name: 'newRoleDept',
        message: 'To which department does this new role belong?',
        choices: ['THIS IS WHERE YOU NEED TO DISPLAY THE FULL LIST OF DEPARTMENTS'], // <-- NEED TO POPULATE WITH CURRENT DEPT LIST
        validate: newRoleDept => {
            if (newRoleDept) {
                return true;
            } else {
                console.log('You must enter a department for this new role.')
            }
        }
    }
]

// add employee prompts
const addEmployeePrompts = [
    {
        type: 'input',
        name: 'employeeName',
        message: 'What is the name of this new employee?',
        validate: employeeName => {
            if (employeeName) {
                return true;
            } else {
                console.log('You must enter a name for this new employee.')
            }
        },
        type: 'list',
        name: 'newEmployeeTitle',
        message: 'Which role does this new employee have?',
        choices: ['THIS IS WHERE YOU NEED TO DISPLAY THE FULL LIST OF ROLES'], // <-- NEED TO POPULATE WITH CURRENT JOB_TITLE LIST
        validate: newEmployeeTitle => {
            if (newEmployeeTitle) {
                return true;
            } else {
                console.log('You must choose a position for this employee.')
            }
        }
    }
]

// FUNCTIONS TO VIEW DATA

function viewDepartments () {
    db.promise().query("SELECT dept_name AS Departments FROM departments;")
        .then( ([rows, fields]) => {
            console.log(" Here's a list of all departments.")
            console.table(rows);
        })
        .catch(console.table)
        .then( () => db.end());
    init(); // <-- CURRENTLY *WILL* GET RETURNED, BUT DISPLAY IS AWKWARD IN COMMAND LINE
}

function viewRoles () {
    db.promise().query("SELECT * FROM roles;")
    .then( ([rows, fields]) => {
        console.log("Here's a list of all roles.")
        console.table(rows);
    })
    .catch(console.table)
    .then( () => db.end());
    init(); // <-- CURRENTLY *WILL* GET RETURNED, BUT DISPLAY IS AWKWARD IN COMMAND LINE
}

function viewEmployees () {
    db.promise().query("SELECT * FROM employees;")
    .then( ([rows, fields]) => {
        console.table(rows);
    })
    .catch(console.table)
    .then( () => db.end()); // <-- LIKELY SOURCE OF ERROR WHEN ATTEMPTING TO RUN A NEW QUERY IN SAME SESSION
    init(); // <-- CURRENTLY *WILL* GET RETURNED, BUT DISPLAY IS AWKWARD IN COMMAND LINE
}

// FUNCTIONS TO UPDATE DATA

function addDepartment() {
    return inquirer
    .prompt(addDeptPrompts)
    .then(response => {
        console.log(response);
    })
}

function addRole() {
    return inquirer
    .prompt(addRolePrompts)
    .then(response => {
        console.log(response);
    })
}

function addEmployee() {
    return inquirer
    .prompt(addEmployeePrompts)
    .then(response => {
        console.log(response);
    })
}

// Function to initialize application
function init() {
    return inquirer
    .prompt(questions)
    .then(response => {
        console.log(response);
        if (response.taskSelection == 'View All Departments') {
            console.log("Here's a list of all departments.")
            // RUN SOME FUNCTION TO DISPLAY ALL DEPARTMENTS
            viewDepartments();
            return;
        } else if (response.taskSelection == 'View All Roles') {
            console.log("Here's a list of all roles.")
            // RUN SOME FUNCTION TO DISPLAY ALL ROLES
            viewRoles();
            return;
        } else if (response.taskSelection == 'View All Employees') {
            console.log("Here's a list of all employees.")
            // RUN SOME FUNCTION TO DISPLAY ALL EMPLOYEES
            viewEmployees();
            return;
        } else if (response.taskSelection == 'Add A Department') {
            console.log("Here's how to add a department.")
            // RUN SOME INQUIRER FUNCTION TO PROMPT FOR DEPARTMENT NAME
            addDepartment();
            // RUN SOME FUNCTION THAT ADDS ABOVE NEW DEPARTMENT TO TABLE (INSERT INTO...)
            return;
        } else if (response.taskSelection == 'Add A Role') {
            console.log("Here's how to add a role.")
            // RUN SOME INQUIRER FUNCTION TO PROMPT FOR ROLE NAME
            addRole();
            // RUN SOME FUNCTION TO ADD A ROLE (INSERT INTO...)
            return;
        } else if (response.taskSelection == 'Add An Employee') {
            console.log("Here's how to add an employee.")
            // RUN SOME INQUIRER FUNCTION TO PROMPT FOR EMPLOYEE DATA (FIRST NAME, LAST NAME, JOB TITLE, DEPT VIA FK, MANAGER VIA FK)
            addEmployee();
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