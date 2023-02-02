const express = require('express');
const app = express();
// const mysql = require('mysql');
var mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
    // database:"test"
});
app.get('/', function (req, res) {
    res.send("hello world");
    // connection.query('SELECT * from registration ', (err, rows) => {
    //     if(err) throw err;
    //     console.log('The data from users table are: \n', rows);
    //     connection.end();
    // });
});


connection.connect((error) => {
    if (error) throw error
    console.log('Connected to MySQL Server!');
    // var sql = "CREATE DATABASE mydb";
    // var sql = "CREATE TABLE Employee(id INT(20), name VARCHAR(255), address VARCHAR(255))";
    // var sql = " INSERT INTO employee VALUES(1, 'sushma','bhilai'),(2, 'bimmi', 'jamul')";
    var sql = "SELECT * FROM employee";
    // var sql = "SELECT * FROM  registration";
    // var sql = "DELETE FROM registration WHERE gender = 'kkk'";
    // var sql = "INSERT INTO registration (id, firstName, lastName, gender) VALUES (5,'sakshi','dash','fhh')"
    // var sql = "UPDATE registration SET lastName = 'doctor' WHERE lastName = 'undefined'";
    connection.query(sql, (err, res) => {
        if (err) throw err
        // console.log("CREATED TABLE!!");
        console.log('successfull', res);
    });
});

app.listen(8000, () => {
    console.log('Server is running at port 8000');
})