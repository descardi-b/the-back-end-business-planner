// creating the db constructor class
const connection = require("./connection");

class DB {
    constructor(connection){
        this.connection = connection;
    }

    // CRUD stuffs 
    
    // create functions
    createEmp(emp){
        return this.connection
        .promise()
        .query(
            `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE ('${emp.first_name}', '${emp.last_name}', ${emp.role_id}, ${emp.manager_id});`,
        );
    }
    createRole(roleName, roleSalary, roleDept){
        return this.connection
        .promise()
        .query(
            `INSERT INTO role(title, salary, department_id) VALUE ('${roleName}', ${roleSalary}, ${roleDept});`,
        );
    }
    createDept(department){
        return this.connection
        .promise()
        .query(
            "INSERT INTO department(name) VALUE (?);", department
        );
    }
    
    // read functions
    findAllEmp(){
        return this.connection
        .promise()
        .query(
            "SELECT * FROM employee;"
        );
    }
    
    findAllRoles(){
        return this.connection
        .promise()
        .query(
            "SELECT * FROM role;"
        );
    }
    findAllDept(){
        return this.connection
        .promise()
        .query(
            "SELECT * FROM department;"
        );
    }

    // update functions
    updateEmpRole(employeeId, roleId) {
        return this.connection
        .promise()
        .query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }
}

module.exports = new DB(connection);