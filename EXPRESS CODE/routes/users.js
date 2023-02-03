//  we take modular approach to create modules.......!!  

var express = require("express");
var mysql = require("mysql");
var con = mysql.createConnection({  
    host: "localhost",  
    user: "root",  
    password: "" ,
    database:"mydb" 
  }); 

var router = express.Router();

// simple dummy route --  /users/
router.get('/', (req, res) => {
    res.send("GET Request for users!");
});

router.get('/all', (req, res) => {
    let sqlQuery = "SELECT * FROM employee";
    let query = con.query(sqlQuery, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(apiResponse(results));
    });
});
function apiResponse(results) {
    return JSON.stringify({ "status": 200, "error": null, "response": results });
}

//  /users/user--details      
// dynamic URL/route --> /:d also called url building ,(we collect the data using req.params.<variable>)
router.get('/user-details/:d', (req, res) => {
    res.send("GET! Request for Specific users!"+ req.params.id);
});
// we can pass  one or more params
router.get('/search-by-location/:state/country/:city', (req, res) => {
    res.send("GET! Request for Specific users!"+ req.params.state + req.params.city);
});

// CRUD - user
router.post('/create-users', (req, res) => {
    res.send("create users!");
});
router.put('/update-users', (req, res) => {
    res.send("update users!");
});
router.get('/read-all-users', (req, res) => {
    res.send("read all users!");
});
router.get('/get-user-details', (req, res) => {
    var userObj = {
        id: 1,
        name: "ABC",
        address: "XYZ",
        status: true
    }
    res.send(userObj);
});
router.delete('/delete-users', (req, res) => {
    res.send("delete users!");
});


module.exports = router;