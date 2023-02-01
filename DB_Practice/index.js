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
    var email = req.body.email;
    var mno = req.body.mno;
    // g. insert data into table registration ---> use connection import con and connect here
    con.connect(function (err) {
        if (err) throw err;
        // .......................................
        // var sql = "INSERT INTO students (name, email, mno) VALUES('" + name + "','" + email + "','" + mno + "')";
        // var sql = "SELECT * from students ";
        con.query(sql, function (err, res) {
            if (err) throw err;
            res.send('Student register success-full' + res.insertId);
        //    console.log('Student register success-full' + res);
        })
    })
})
// app.listen(7000);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})