// var express = require("express");
// var router = express.Router();

var mysql = require('mysql');  
var con = mysql.createConnection({  
  host: "localhost",  
  user: "root",  
  password: "" ,
  database:"sarmicrosystems_q2sgeneral"
  // database:"mydb" 
});  
// con.connect(function(err) {  
//     if (err) throw err;  
//     console.log("Connected!");  
//   });  
module.exports = con;