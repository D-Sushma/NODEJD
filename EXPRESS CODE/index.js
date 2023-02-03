//1. importing the Express js module into our application
var express = require("express");

// IMPORT==============
var users = require('./routes/users');
var products = require('./routes/products');
var orders = require('./routes/orders');
// ------START-------------------------------------
var con = require('./properties') //step #1

// -------END-----------------------------------------------------
//2. we are initializing the app using the express
var app = express();

app.use('/users', users);
app.use('/products', products);
app.use('/orders', orders);
// --------START----------------------------------------
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
app.get('/all', (req, res) => {
    let sqlQuery = "SELECT * FROM employee";
    let query = con.query(sqlQuery, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(apiResponse(results));
    });
});

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