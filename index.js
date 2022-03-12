const inquirer = require('inquirer');
const db = require('./db/constructor');
const connection = require('./db/connection');
require('console.table');

startPrompt = function() {
    inquirer
    .prompt([
        {
        type: 'checkbox',
        name: 'answer',
        message: 'Welcome to the back end business builder! What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        }   
    ])
    .then((answers) => {
        if (answers.choices === 'View all departments') {
            viewDepartments();
        }
//         if (answers.choices === 'View all roles') {
//             viewRoles();
            
//         }
//         if (answers.choices === 'View all employees') {
//             viewEmployees();
            
//         }
//         if (answers.choices === 'Add a department') {
//             addDepartment();
//             console.log('success');
//         }
//         if (answers.choices === 'Add a role') {
//            addRole();
//             console.log('success');
//         }
//         if (answers.choices === 'Add an employee') {
//            addEmployee();
//             console.log('success');
//         } else {
//            updateRole();
            
//         }
    })
}

// functions for reading data

function viewDepartments(){
    // constructor function call for viewing departments
    db.findAllDept()
        .then(([rows]) => {
            let dept = rows;
            console.log("\n");
            console.table(dept);
        })
        // restart inquirer
        .then(() => startPrompt());
}

startPrompt();