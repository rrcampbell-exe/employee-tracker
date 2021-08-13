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

const again = [
    {
        type: 'confirm',
        name: 'runAgain',
        message: 'Would you like to perform another task?'
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
                db.promise().query("INSERT INTO departments (dept_name) VALUES ('" + deptName + "');")
                .then( ([rows, fields]) => {
                    viewDepartments();
                })
                .catch(console.table)
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
    db.promise().query("SELECT dept_name AS departments FROM departments;")
        .then( ([rows, fields]) => {
            console.log("Here's a list of all departments.")
            console.table(rows);
            furtherAction(); 
        })
        .catch(console.table)
}

function viewRoles () {
    db.promise().query("SELECT job_title as title, salary, dept_name AS department FROM roles JOIN departments ON department_id = departments.id;")
    .then( ([rows, fields]) => {
        console.log("Here's a list of all roles.")
        console.table(rows);
        furtherAction(); 
    })
    .catch(console.table)
}

function viewEmployees () {
    let queryString = `
    SELECT employees.first_name AS 'first name', employees.last_name AS 'last name', salary, job_title AS title, dept_name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    JOIN roles
    ON job_title_id = roles.id
    JOIN departments
    ON department_id = departments.id
    JOIN employees manager 
    ON employees.manager_id = manager.id;`

    db.promise().query(queryString)
    .then( ([rows, fields]) => {
        console.log("Here's a list of all employees.")
        console.table(rows);
        furtherAction();
    })
    .catch(console.table)
}

// FUNCTIONS TO UPDATE DATA

function addDepartment() {
    return inquirer
    .prompt(addDeptPrompts);
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

// Function to prompt user to perform another action
function furtherAction() {
    return inquirer
    .prompt(again)
    .then(response => {
        if (response.runAgain === true) {
            init();
        } else {
            console.log("Thanks for using Employee Tracker. Goodbye!")
            return;
        }
    })
}

// Function to initialize application
function init() {
    return inquirer
    .prompt(questions)
    .then(response => {
        if (response.taskSelection == 'View All Departments') {
            viewDepartments();
            return;
        } else if (response.taskSelection == 'View All Roles') {
            viewRoles();
            return;
        } else if (response.taskSelection == 'View All Employees') {
            viewEmployees();
            return;
        } else if (response.taskSelection == 'Add A Department') {
            addDepartment();
            return;
        } else if (response.taskSelection == 'Add A Role') {
            // RUN SOME INQUIRER FUNCTION TO PROMPT FOR ROLE NAME
            addRole();
            // RUN SOME FUNCTION TO ADD A ROLE (INSERT INTO...)
            return;
        } else if (response.taskSelection == 'Add An Employee') {
            // RUN SOME INQUIRER FUNCTION TO PROMPT FOR EMPLOYEE DATA (FIRST NAME, LAST NAME, JOB TITLE, DEPT VIA FK, MANAGER VIA FK)
            addEmployee();
            // RUN SOME FUNCTION TO ADD AN EMPLOYEE (INSERT INTO...)
            return;
        } else if (response.taskSelection == "Update An Employee's Role") {
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