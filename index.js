const inquirer = require('inquirer');
const db = require('./db/constructor');
const connection = require('./db/connection');
require('console.table');

startPrompt = function () {
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
            const userAction = answer.action;

            switch (userAction) {
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
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateRole();
                    startPrompt();
                    break;
                default:
                    process.exit(0);
            }
        })
}

// functions for reading data

function viewDepartments() {
    // calling findAllDept from db constructor
    db.findAllDept()
        .then(([rows]) => {
            let dept = rows;
            console.log("\n");
            console.table(dept);
            startPrompt();
        })
    // .then(() => startPrompt());
}

function viewRoles() {
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

function viewEmployees() {
    // calling findAllEmp from db constructor
    db.findAllEmp()
        .then(([rows]) => {

            let employees = rows;
            console.log("\n");
            console.table(employees);
            startPrompt();
        })

}

// functions for creating

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'deptName',
                message: 'What is the name of this new department?'
            }
        ])
        // calling createDept from db constructor
        .then(({ deptName }) => db.createDept(deptName))
        .then(() => {
            console.log('Successfully added new department!')
            viewDepartments();
        })

};

function addRole() {
    db.findAllDept()
        .then(data => {

            deptIds = [];
            for (i = 0; i < data[0].length; i++) {
                deptIds[i] = data[0][i]["id"];
            }

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
                        message: 'What department id is this role in?',
                        choices: deptIds
                    }
                ])
                .then((answers) => {

                    let roleName = answers.roleName;
                    let roleSalary = answers.roleSalary;
                    let roleDept = answers.roleDept;

                    console.log(roleName, roleSalary, roleDept);

                    // pass answers through the create role method
                    db.createRole(roleName, roleSalary, roleDept);
                    console.log('Successfully added new role!')
                    viewRoles();
                });
        });
};

function addEmployee() { // adds employee
    inquirer.prompt([ // use inquirer to get user input for variables
        {
            type: "input",
            name: "first_name",
            message: "What is the first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name?"
        }
    ])
        .then((answers) => {
            console.log(answers)
            let firstName = answers.first_name; // assign values for first name
            let lastName = answers.last_name; // and last name

            // call findAllRoles method so we can map out all current roles
            db.findAllRoles()
                .then(([rows]) => {
                    let emp = rows
                    // map the data returned
                    const roleMenu = emp.map(({ id, title }) => (
                        {
                            name: title,
                            value: id
                        }
                    ));
                    // selection based on map of roles
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "roleId",
                            message: "What is this employee\'s role?",
                            choices: roleMenu
                        }
                    ])
                        .then(res => {
                            let roleId = res.roleId;

                            db.findAllEmp()
                                .then(([rows]) => {
                                    let emp = rows
                                    // map the data returned
                                    const empMenu = emp.map(({ id, first_name, last_name }) => (
                                        {
                                            name: `${first_name} ${last_name}`,
                                            value: id
                                        }
                                    ));

                                    inquirer.prompt([{ // prompt used to select a manager from the generated manager menu from above
                                        type: "list",
                                        name: "managerId",
                                        message: "Who is this employee's manager?",
                                        choices: empMenu
                                    }])
                                        .then(res => {
                                            let emp = { // assign values to the new employee
                                                manager_id: res.managerId, // assign manager id from response
                                                role_id: roleId,// assign roleId from roleId used
                                                first_name: firstName, // assign firstName where firstname is used
                                                last_name: lastName // assign last name where last name is used
                                            }

                                            // use the createEmp method to make a new employee
                                            db.createEmp(emp)

                                            console.log("Successfully added a new employee!")
                                            viewEmployees();
                                        });
                                });
                        });
                });
        });
}

function updateRole() {
    // use findAllEmp method to map out all current employees
    db.findAllEmp()
        .then(([rows]) => {
            let emp = rows;
            const empMenu = emp.map(({ id, first_name, last_name }) => (
                {
                    name: `${first_name} ${last_name}`,
                    value: id
                }
            ));
            // asks which employee the user would like to update
            inquirer.prompt([
                {
                    type: "list",
                    name: "empId",
                    message: "Which employee do you want to select?",
                    choices: empMenu
                }
            ])
                .then(res => {
                    let empId = res.empId;
                    // use find all roles to get a list of roles avaliable
                    db.findAllRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const roleMenu = roles.map(({ title, id }) => ({ // create menu to use for inquirer
                                name: title,
                                value: id
                            }));

                            inquirer.prompt([ // inquirer for a choice from generated list of roles
                                {
                                    type: "list",
                                    name: "roleId",
                                    message: "Which role do you want to assign to this employee?",
                                    choices: roleMenu
                                }
                            ])
                                .then(res => {
                                    db.updateEmpRole(empId, res.roleId) // call the update employee role function from db and change it to the role selected from the response 
                                    console.log("Successfully updated the employee's role!")
                                    viewEmployees();
                                })
                        })
                })
        })
}


startPrompt();