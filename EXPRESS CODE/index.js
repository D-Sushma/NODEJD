//1. importing the Express js module into our application
var express = require("express");
var cors = require("cors");

const corsOptions = {
    // origin: "http://127.0.0.1:3000",
    // Access_Control_Allow_Origin:"http://127.0.0.1:3000",
    Access_Control_Allow_Origin:"*",
  };

// IMPORT==============
var users = require('./routes/users');
var products = require('./routes/products');
var orders = require('./routes/orders');
// ------START-------------------------------------
var con = require('./properties'); //step #1
const { query } = require("express");
const { connect } = require("./properties");

// -------END-----------------------------------------------------
//2. we are initializing the app using the express
var app = express();
app.use(cors(corsOptions));

app.use('/users', users);
app.use('/products', products);
app.use('/orders', orders);
// --------START----------------------------------------
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
app.get('/usertabledetails', (req, res) => {
    // let sqlQuery = "SELECT * FROM employee";
    let sqlQuery = "SELECT * FROM quiz_regdetails";
    let query = con.query(sqlQuery, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(apiResponse(results));
    });
});

app.get('/memberregistration', (req,res)=>{
    // console.log("member registration");
    let query = "SELECT * FROM competetion_registration";
    con.query(query, (err, results)=>{
        if(err) {console.log(err);}
        else{
            // console.log(results);
            res.send(apiResponse(results));
        }
    })
})
// JOIN 
app.get('/join', (req, res)=>{
    // console.log("put inner join");
    // let query = "SELECT quiz_regdetails.name,quiz_regdetails.lname from competetion_registration INNER JOIN quiz_regdetails WHERE competetion_registration.userid = quiz_regdetails.id";
    let query = "SELECT competetion_registration.id, competetion_registration.subject, competetion_registration.subscription, competetion_registration.status, competetion_registration.updated_at, competetion_registration.created_at, competetion_registration.expiry_date, quiz_regdetails.name,quiz_regdetails.lname from competetion_registration INNER JOIN quiz_regdetails ON competetion_registration.userid = quiz_regdetails.id";
    con.query(query, (err, results)=>{
        if(err) throw err;
        console.log(results);
        res.send(apiResponse(results));
    }) 
})

app.get('/competitionlistdetails', (req,res)=>{
    console.log("Competition List");
    let query = "SELECT * FROM competition_new_initiate";
    con.query(query, (err,results)=>{
        if(err) throw err;
        console.log(results);
        res.send(apiResponse(results));
    })
})
/**************************************************************/
app.get('/single/item/:id', (req, res) => {
    let sqlQuery = "SELECT * FROM employee WHERE id=" + req.params.id;
    // let sqlQuery = "SELECT * FROM employee";
    let query = con.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});
// create -> insert
app.post('/insert/items', (req, res) => {
    // let data = { id:req.body.id, name: req.body.name, address: req.body.address };
    // let sqlQuery = "INSERT INTO employee SET ?";
    let sqlQuery = "INSERT INTO employee (id, name, address) VALUES (8, 'bharti','durgapur')";
    let query = con.query(sqlQuery,(err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});
// delete -> delete
app.delete('/delete/items',(req, res) => {
    // let sqlQuery = "DELETE FROM employee WHERE id="+req.params.id+"";
    let sqlQuery = "DELETE FROM employee where id=8";
      
    let query = con.query(sqlQuery, (err, results) => {
      if(err) throw err;
        res.send(apiResponse(results));
    });
  });

/*** Update -> put */
app.put('/update/items',(req, res) => {
    // let sqlQuery = "UPDATE employee SET name='"+req.body.name+"', address='"+req.body.address+"' WHERE id="+req.params.id;
    let sqlQuery = "UPDATE employee SET address ='aagra' WHERE id =6";
    let query = con.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

function apiResponse(results) {
    return JSON.stringify({ "status": 200, "error": null, "response": results });
}
// --------END------------------------------------------
app.listen(4000);
// app.listen(4000, () => {
//   console.log(`Example app listening on port 3000`);
// });