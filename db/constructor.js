// creating the db constructor class
const connection = require("./connection");

class DB {
    constructor(connection){
        this.connection = connection;
    }

    // CRUD stuffs 
    
    // create functions
    createEmp(employee){
        return this.connection
        .promise()
        .query(
            "INSERT INTO employee SET ?;", employee
        );
    }
    createRole(role){
        return this.connection
        .promise()
        .query(
            "INSERT INTO role SET ?;", role
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