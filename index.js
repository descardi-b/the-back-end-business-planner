const inquirer = require('inquirer');
const db = require('./db/constructor');
const connection = require('./db/connection');
require('console.table');

startPrompt = function() {
    inquirer
    .prompt([
        {
        type: 'list',
        name: 'action',
        message: 'Welcome to the back end business builder! What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit program'],
        }   
    ])
    .then((answer) => {
        console.log(answer);
        const userAction = answer.action;

        switch(userAction) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                console.log('Adding an employee!');
                startPrompt();
                break;
            case 'Update an employee role':
                console.log('Updating!');
                startPrompt();
                break;
            default:
                process.exit(0);
        } 
    })
}

// functions for reading data

function viewDepartments(){ 
    // calling findAllDept from db constructor
    console.log('Hello!');
    db.findAllDept()
    .then(([rows]) => {
        console.log('Hey again!');
        let dept = rows;
        console.log("\n");
        console.table(dept);
        startPrompt();
    })
    // .then(() => startPrompt());
} 

function viewRoles(){
    // constructor function call for viewing departments
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        // restart inquirer
        .then(() => startPrompt());
}

function viewEmployees(){ 
    // calling findAllEmp from db constructor
    db.findAllEmp()
    .then(([rows]) => {
        console.log('Hey again!');
        let employees = rows;
        console.log("\n");
        console.table(employees);
        startPrompt();
    })
    // .then(() => startPrompt());
} 

// functions for creating

function addDepartment(){
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What is the name of this new department?'
        }
    ])
    .then(({ deptName }) => db.createDept(deptName))
    .then(() => {
        console.log('Successfully added new department!')
        startPrompt();
    })
    // calling createDept from db constructor
};

function addRole() {
    db.findAllDept()
    .then(data => 
        {console.log(data[0])

            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'What is this new role\'s title?'
                },
                {
                    type: 'input',
                    name: 'roleSalary',
                    message: 'What is the salary for this role?'
                },
                {
                    type: 'list',
                    name: 'roleDept',
                    message: 'What department is this role in?',
                    choices: data[0]
                    // have to get the id instead of the name 
                    // in the array of objs
                }
            ])
            .then((answers) => {
                console.log(answers);
                startPrompt();
            });
        });
    };

startPrompt();