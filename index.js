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
        choices: ['Front of House', 'Back of House', 'Management', 'Administration'], 
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
        choices: ['Host', 'Waitstaff', 'Bartender', 'Barback', 'Line Cook', 'Dishwasher', 'Prep Cook', 'Chef', 'Shift Supervisor', 'Assistant Manager', 'General Manager', 'Accountant', 'Marketing Rep'],
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
        choices: ['Ean Christen', 'Hyrum Harouna', 'Darina Liliya'], 
        validate: employeeManager => {
            if (employeeManager) {
                return true;
            } else {
                console.log('You must choose a manager for this employee. If this employee has no manager, enter NULL.')
            }
        }
    },
]

// change employee role prompts
const changeEmpRolePrompts = [
    {
        type: 'list',
        name: 'empChoice',
        message: 'Whose role would you like to change?',
        choices: ['Hyrum Harouna', 'Ean Christen', 'Darina Liliya', 'Helena Padma', 'Geraint Gianpiero', 'Eógan Neelam', 'Raheem Josephus', 'Voula Simon', 'Bhavana Hamish', 'Hagit Uno', 'Elijah Mel', 'Chris Fabijan', 'Urbano Kory', 'Jaroslava Zerachiel', 'Murdoch Melvyn', 'Seisyll Ryôta', 'Jana Gunn', 'Tyrese Elviira', 'Prosperine Zvonko', 'Ilene Ekewaka', 'Cyril Figgis', 'Hlengiwe Gaylord'],
        validate: empChoice => {
            if (empChoice) {
                return true;
            } else {
                console.log('You must choose an employee.')
            }
        }
    },
    {
        type: 'list',
        name: 'roleChoice',
        message: "What should this employee's new role be?",
        choices: ['Host', 'Waitstaff', 'Bartender', 'Barback', 'Line Cook', 'Dishwasher', 'Prep Cook', 'Chef', 'Shift Supervisor', 'Assistant Manager', 'General Manager', 'Accountant', 'Marketing Rep'],
        validate: roleChoice => {
            if (roleChoice) {
                return true;
            } else {
                console.log('You must choose a new role for this employee.')
            }
        }
    },
    {
        type: 'list',
        name: 'managerChoice',
        message: 'To which manager will this employee now report?',
        choices: ['Hyrum Harouna', 'Ean Christen', 'Darina Liliya'], 
        validate: newRoleDept => {
            if (newRoleDept) {
                return true;
            } else {
                console.log("You must confirm this employee's manager.")
            }
        }
    },
]

// FUNCTIONS TO VIEW DATA

function viewDepartments () {
    db.promise().query("SELECT dept_id AS id, dept_name AS departments FROM departments;")
        .then( ([rows, fields]) => {
            console.table(rows);
            furtherAction(); 
        })
        .catch(console.table)
}

function viewRoles () {
    db.promise().query("SELECT role_id AS id, job_title as title, salary, dept_name AS department FROM roles JOIN departments ON department_id = departments.dept_id;")
    .then( ([rows, fields]) => {
        console.table(rows);
        furtherAction(); 
    })
    .catch(console.table)
}

function viewEmployees () {
    let queryString = `
    SELECT employees.employee_id AS id, employees.first_name AS 'first name', employees.last_name AS 'last name', salary, job_title AS title, dept_name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    JOIN roles
    ON job_title_id = roles.role_id
    JOIN departments
    ON department_id = departments.dept_id
    JOIN employees manager 
    ON employees.manager_id = manager.employee_id
    ORDER BY employees.employee_id ASC;`

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
            console.log("Department added! Run 'View All Departments' to see your new list of departments.")
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
            console.log("Role added! Run 'View All Roles' to see your new list of roles.")
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
            console.log("Employee added! Run 'View All Employees' to see your new list of employees.")
            furtherAction();
        })
        .catch(console.table)
    })
}

function changeEmpRole() {
    return inquirer
    .prompt(changeEmpRolePrompts)
    .then(response => {

        if (response.empChoice === 'Hyrum Harouna') {
            response.empChoice = 1
        } else if (response.empChoice === 'Ean Christen') {
            response.empChoice = 2
        } else if (response.empChoice === 'Darina Liliya') {
            response.empChoice = 3
        } else if (response.empChoice === 'Helena Padma') {
            response.empChoice = 4
        } else if (response.empChoice === 'Geraint Gianpiero') {
            response.empChoice = 5
        } else if (response.empChoice === 'Eógan Neelam') {
            response.empChoice = 6
        } else if (response.empChoice === 'Raheem Josephus') {
            response.empChoice = 7
        } else if (response.empChoice === 'Voula Simon') {
            response.empChoice = 8
        } else if (response.empChoice === 'Bhavana Hamish') {
            response.empChoice = 9
        } else if (response.empChoice === 'Hagit Uno') {
            response.empChoice = 10
        } else if (response.empChoice === 'Elijah Mel') {
            response.empChoice = 11
        } else if (response.empChoice === 'Chris Fabijan') {
            response.empChoice = 12
        } else if (response.empChoice === 'Urbano Kory') {
            response.empChoice = 13
        } else if (response.empChoice === 'Jaroslava Zerachiel') {
            response.empChoice = 14
        } else if (response.empChoice === 'Murdoch Melvyn') {
            response.empChoice = 15
        } else if (response.empChoice === 'Seisyll Ryôta') {
            response.empChoice = 16
        } else if (response.empChoice === 'Jana Gunn') {
            response.empChoice = 17
        } else if (response.empChoice === 'Tyrese Elviira') {
            response.empChoice = 18
        } else if (response.empChoice === 'Prosperine Zvonko') {
            response.empChoice = 19
        } else if (response.empChoice === 'Ilene Ekewaka') {
            response.empChoice = 20
        } else if (response.empChoice === 'Cyril Figgis') {
            response.empChoice = 21
        } else if (response.empChoice === 'Hlengiwe Gaylord') {
            response.empChoice = 22
        } 

        if (response.roleChoice === 'Host') {
            response.roleChoice = 1
        } else if (response.roleChoice === 'Waitstaff') {
            response.roleChoice = 2
        } else if (response.roleChoice === 'Bartender') {
            response.roleChoice = 3
        } else if (response.roleChoice === 'Barback') {
            response.roleChoice = 4
        } else if (response.roleChoice === 'Line Cook') {
            response.roleChoice = 5
        } else if (response.roleChoice === 'Dishwasher') {
            response.roleChoice = 6
        } else if (response.roleChoice === 'Prep Cook') {
            response.roleChoice = 7
        } else if (response.roleChoice === 'Chef') {
            response.roleChoice = 8
        } else if (response.roleChoice === 'Shift Supervisor') {
            response.roleChoice = 9
        } else if (response.roleChoice === 'Assistant Manager') {
            response.roleChoice = 10
        } else if (response.roleChoice === 'General Manager') {
            response.roleChoice = 11
        } else if (response.roleChoice === 'Accountant') {
            response.roleChoice = 12
        } else if (response.roleChoice === 'Marketing Rep') {
            response.roleChoice = 13
        }

        if (response.managerChoice === 'Hyrum Harouna') {
            response.managerChoice = 1
        } else if (response.managerChoice === 'Ean Christen') {
            response.managerChoice = 2
        } else if (response.managerChoice === 'Darina Liliya') {
            response.managerChoice = 3
        }

        let queryString = `
        UPDATE employees SET job_title_id = ` + response.roleChoice + `,
        manager_id = ` + response.managerChoice + `
        WHERE employee_id = ` + response.empChoice + `;`

        db.promise().query(queryString)
        .then( ([rows, fields]) => {
            console.log("Employee role updated! Run 'View All Employees' to see your employee's updated information.")
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
            addRole();
            return;
        } else if (response.taskSelection == 'Add An Employee') {
            addEmployee();
            return;
        } else if (response.taskSelection == "Update An Employee's Role") {
            changeEmpRole();
            return;
        } else {
            console.log("Thanks for using Employee Tracker. Goodbye!")
            return;
        }
    })
}

// Initialization of application on run
init();