const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

// OBJECTS FOR TEMPORARY STORAGE

// employee object
// let empObj = {
//     fName = "",
//     lName = "",
//     jTitle = "",
//     manager = ""
// }

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
        }
    },
    {
        type: 'number',
        name: 'salaryInput',
        message: 'What is the salary for this new role?',
        validate: salaryInput => {
            if (salaryInput) {
                return true;
            } else {
                console.log('You must enter a salary for this new role.')
            }
        }
    },
    {
        type: 'list',
        name: 'newRoleDept',
        message: 'To which department does this new role belong?',
        choices: ['Front of House', 'Back of House', 'Management', 'Administration'], // <-- NEED TO POPULATE WITH CURRENT DEPT LIST
        validate: newRoleDept => {
            if (newRoleDept) {
                return true;
            } else {
                console.log('You must enter a department for this new role.')
            }
        }
    },
]

// add employee prompts
const addEmployeePrompts = [
    {
        type: 'input',
        name: 'employeeFirstName',
        message: 'What is the first name of this new employee?',
        validate: employeeFirstName => {
            if (employeeFirstName) {
                return true;
            } else {
                console.log('You must enter a first name for this new employee.')
            }
        }
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: 'What is the last name of this new employee?',
        validate: employeeLastName => {
            if (employeeLastName) {
                return true;
            } else {
                console.log('You must enter a name for this new employee.')
            }
        }
    },
    {
        type: 'list',
        name: 'newEmployeeTitle',
        message: 'Which role does this new employee have?',
        choices: ['Host', 'Waitstaff', 'Bartender', 'Barback', 'Line Cook', 'Dishwasher', 'Prep Cook', 'Chef', 'Shift Supervisor', 'Assistant Manager', 'General Manager', 'Accountant', 'Marketing Rep'], // <-- NEED TO POPULATE WITH CURRENT JOB_TITLE LIST
        validate: newEmployeeTitle => {
            if (newEmployeeTitle) {
                return true;
            } else {
                console.log('You must choose a position for this employee.')
            }
        }
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: 'To which manager does this employee report?',
        choices: ['Ean Christen', 'Hyrum Harouna', 'Darina Liliya'], // <-- NEED TO POPULATE WITH CURRENT JOB_TITLE LIST
        validate: employeeManager => {
            if (employeeManager) {
                return true;
            } else {
                console.log('You must choose a manager for this employee. If this employee has no manager, enter NULL.')
            }
        }
    },
]

// FUNCTIONS TO VIEW DATA

function viewDepartments () {
    db.promise().query("SELECT dept_name AS departments FROM departments;")
        .then( ([rows, fields]) => {
            console.table(rows);
            furtherAction(); 
        })
        .catch(console.table)
}

function viewRoles () {
    db.promise().query("SELECT job_title as title, salary, dept_name AS department FROM roles JOIN departments ON department_id = departments.id;")
    .then( ([rows, fields]) => {
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
        console.table(rows);
        furtherAction();
    })
    .catch(console.table)
}

// FUNCTIONS TO UPDATE DATA

function addDepartment() {
    return inquirer
    .prompt(addDeptPrompts)
    .then (response => {
        let queryString = `
        INSERT INTO departments (dept_name) 
        VALUES ('` + response.deptName + `');`
        db.promise().query(queryString)
        .then( ([rows, fields]) => {
            furtherAction();
        })
        .catch(console.table)
    })
}

function addRole() {
    return inquirer
    .prompt(addRolePrompts)
    .then(response => {

        if (response.newRoleDept === 'Front of House') {
            response.newRoleDept = 1
        } else if (response.newRoleDept === 'Back of House') {
            response.newRoleDept = 2
        } else if (response.newRoleDept === 'Management') {
            response.newRoleDept = 3
        } else if (response.newRoleDept === 'Administration') {
            response.newRoleDept = 4
        }

        let queryString = `
        INSERT INTO roles (job_title, salary, department_id) 
        VALUES ('` + response.roleName + `', '` + response.salaryInput + `', ` + response.newRoleDept + `);`
        db.promise().query(queryString)
        .then( ([rows, fields]) => {
            viewRoles();
            furtherAction();
        })
        .catch(console.table)
    })
}

function addEmployee() {
    return inquirer
    .prompt(addEmployeePrompts)
    .then(response => {

        if (response.newEmployeeTitle === 'Host') {
            response.newEmployeeTitle = 1
        } else if (response.newEmployeeTitle === 'Waitstaff') {
            response.newEmployeeTitle = 2
        } else if (response.newEmployeeTitle === 'Bartender') {
            response.newEmployeeTitle = 3
        } else if (response.newEmployeeTitle === 'Barback') {
            response.newEmployeeTitle = 4
        } else if (response.newEmployeeTitle === 'Line Cook') {
            response.newEmployeeTitle = 5
        } else if (response.newEmployeeTitle === 'Dishwasher') {
            response.newEmployeeTitle = 6
        } else if (response.newEmployeeTitle === 'Prep Cook') {
            response.newEmployeeTitle = 7
        } else if (response.newEmployeeTitle === 'Chef') {
            response.newEmployeeTitle = 8
        } else if (response.newEmployeeTitle === 'Shift Supervisor') {
            response.newEmployeeTitle = 9
        } else if (response.newEmployeeTitle === 'Assistant Manager') {
            response.newEmployeeTitle = 10
        } else if (response.newEmployeeTitle === 'General Manager') {
            response.newEmployeeTitle = 11
        } else if (response.newEmployeeTitle === 'Accountant') {
            response.newEmployeeTitle = 12
        } else {
            response.newEmployeeTitle = 13
        }

        if (response.employeeManager === 'Ean Christen') {
            response.employeeManager = 2
        } else if (response.employeeManager === 'Hyrum Harouna') {
            response.employeeManager = 1
        } else if (response.employeeManager === 'Darina Liliya') {
            response.employeeManager = 3
        }

        let queryString = `
        INSERT INTO employees (first_name, last_name, job_title_id, manager_id) 
        VALUES ('` + response.employeeFirstName + `', '` + response.employeeLastName + `', ` + response.newEmployeeTitle + `, ` + response.employeeManager + `);`
        db.promise().query(queryString)
        .then( ([rows, fields]) => {
            console.log("Employee added! Here's the new list of all employees.")
            viewEmployees();
            furtherAction();
        })
        .catch(console.table)
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