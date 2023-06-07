// g. import connection
var con = require('./insertConnection')
// 3...use express......................
const express = require('express')
const app = express()
const port = 7000

// c. get data from reg form
var bodyParser = require('body-parser');

// d. encode url
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ** ejs A
app.set('view engine', 'ejs');

// a. form load on this url........
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/form.html')
})
// b. make route for post method that define form.html
app.post('/', (req, res) => {
    // e. see form data than fill form and submit and see your terminal
    // console.log(req.body);
    // f. get fName, lName, gender , here i get data
    var name = req.body.name;
    var subject = req.body.subject;
    var mno = req.body.mno;
    // g. insert data into table registration ---> use connection import con and connect here
    con.connect(function (err) {
        if (err) throw err;
        // .......................................
        // ** 1st way
        // var sql = "INSERT INTO dbuser (name, subject, contact) VALUES('" + name + "','" + subject + "','" + mno + "')";
         // ** 2nd way
        var sql = "INSERT INTO dbuser (name, subject, contact) VALUES(?,?,?)";
         // ** 3rd way
        var sql = "INSERT INTO dbuser (name, subject, contact) VALUES ?";
        var values = [
            [name,subject,mno]
        ]
        // con.query(sql, function (err, results) {
        // con.query(sql,[name,subject,mno], function (err, results) {
        con.query(sql,[values], function (err, results) {
            if (err) throw err;
            res.send('Student register success-full' + results.insertId);
        //    console.log('Student register success-full' + res);
        })
    })
})

// SELECT DATA FROM MYSQL
app.get('/dbuser', (req,res)=>{
    con.connect(function(err){
        if(err) throw err;
        var sql = "SELECT * FROM dbuser";
        con.query(sql, function(err,results){
            if(err) throw err;
            console.log(results)
            res.render(__dirname+ '/dbuser',{dbuser:results});
        })
    })
})
// app.listen(7000);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})