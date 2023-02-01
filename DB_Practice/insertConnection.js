// 1...................
var mysql = require('mysql');  
var con = mysql.createConnection({  
  host: "localhost",  
  user: "root",  
  password: "" ,
  database:"college" 
});  
// con.connect(function(err) {  
//   if (err) throw err;  
//   console.log("Connected!");  
// //   fatch data from table registration....................
// con.query("select * from registration", function(error, result){
//     if (error) throw error;
//     console.warn("all results are here", result[0].gender)
// })
// });  

module.exports = con;
