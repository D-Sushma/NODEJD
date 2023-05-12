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
    let sqlQuery = "SELECT * FROM dbuser";
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send((results));
    });
});

// /*** Get Single Item ** @return response() api/items/:id*/
app.get('/single/item/:id', (req, res) => {
    let sqlQuery = "SELECT * FROM dbuser WHERE id=" + req.params.id;
    // let sqlQuery = "SELECT * FROM employee";
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send((results));
    });
});

// /*** Create New Item *post* @return response() */
app.get('/insert/items',(req, res) => {
    // let data = {name: req.body.name, address: req.body.address};
    
    // let sqlQuery = "INSERT INTO employee SET ?";
    let sqlQuery = "INSERT INTO dbuser (name, contact, subject) VALUES ('aarti','45236987563','DBMS')";
    
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send((results));
    });
  });

// ** INSERT by POST method
app.post('/test', function (req, res) {
     let  name = req.body.name;
       let contact = req.body.contact;
        let subject =  req.body.subject;
    let sqlQuery = `INSERT INTO dbuser (name, contact, subject) VALUES ('${name}','${contact}','${subject}')`;
    let query = conn.query(sqlQuery, (err, results) => {
            if(err) throw err;
            res.send((results));
      });
  });

// ** NO WORK START
app.post('/insert/new', function (req, res) {
  
  let sqlQuery = `INSERT INTO dbuser
  
      (name, contact, subject) VALUES (?, ?, ?);`;

  // Value to be inserted
  let userName = "Pratik";
  let userContact = 4587963254;
  let userSubject = "English";

  let query = conn.query(sqlQuery, [userName, 
    userContact,userSubject], (err, rows) => {
      if (err) throw err;
      console.log("Row inserted with id = "
          + rows.insertId);
  });
});

// app.post('/users',(req,res)=>{
  //   createPool.query('INSERT INTO users SET?', req.body,
  //   (err,res)=>{
  //     if(err) throw err;
  //     res.status(201).send(`User added with ID: ${res.insertId}`);
  //   });
  // });
//** NO WORK END 

//   /*** Update Item *put* @return response() */
// app.get('/update/items/:id',(req, res) => {
//     let sqlQuery = "UPDATE employee SET name='"+req.body.name+"', address='"+req.body.address+"' WHERE id="+req.params.id;
    
//     let query = conn.query(sqlQuery, (err, results) => {
//       if(err) throw err;
//       res.send(apiResponse(results));
//     });
//   });

//   /*** Delete Item *delete* @return response() */
// app.get('/delete/items',(req, res) => {
//     // let sqlQuery = "DELETE FROM employee WHERE id="+req.params.id+"";
//     let sqlQuery = "DELETE FROM employee where id=null";
      
//     let query = conn.query(sqlQuery, (err, results) => {
//       if(err) throw err;
//         res.send(apiResponse(results));
//     });
//   });

// /*** API Response ** @return response() */
// function apiResponse(results) {
//     return JSON.stringify({ "status": 200, "error": null, "response": results });
// }

// /*---------------Server listening----------------------*/
app.listen(5000, () => {
    console.log('Server started on port 5000...');
});