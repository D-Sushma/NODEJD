const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

/*----------------parse application/json---------------------*/
app.use(bodyParser.json());

/*---------------Database Connection-----------------------*/
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root', /* MySQL User */
    password: '', /* MySQL Password */
    database: 'mydb' /* MySQL Database */
});

/*------------Shows Mysql Connect------------------*/
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected with App...');
});

app.get('/', (req, res) => {
    res.send("Hello world");
})

/*** Get All Items ** @return response()*/
app.get('/all', (req, res) => {
    let sqlQuery = "SELECT * FROM employee";
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(apiResponse(results));
    });
});

/*** Get Single Item ** @return response() api/items/:id*/
app.get('/single/item/:id', (req, res) => {
    let sqlQuery = "SELECT * FROM employee WHERE id=" + req.params.id;
    // let sqlQuery = "SELECT * FROM employee";
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/*** Create New Item *post* @return response() */
app.get('/insert/items',(req, res) => {
    // let data = {name: req.body.name, address: req.body.address};
    
    // let sqlQuery = "INSERT INTO employee SET ?";
    let sqlQuery = "INSERT INTO employee (id, name, address) VALUES (6, 'aarti','durg')";
    
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

  /*** Update Item *put* @return response() */
app.get('/update/items/:id',(req, res) => {
    let sqlQuery = "UPDATE employee SET name='"+req.body.name+"', address='"+req.body.address+"' WHERE id="+req.params.id;
    
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

  /*** Delete Item *delete* @return response() */
app.get('/delete/items',(req, res) => {
    // let sqlQuery = "DELETE FROM employee WHERE id="+req.params.id+"";
    let sqlQuery = "DELETE FROM employee where id=null";
      
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
        res.send(apiResponse(results));
    });
  });

/*** API Response ** @return response() */
function apiResponse(results) {
    return JSON.stringify({ "status": 200, "error": null, "response": results });
}

/*---------------Server listening----------------------*/
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});