// connecting to the mysql database
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "myBusiness"
});

connection.connect(function(err){
    if(err){
        throw(err);
    }
});

module.exports = connection;