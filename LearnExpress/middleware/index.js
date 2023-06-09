var express = require("express");
var app = express();
//** THIRD-PARTY MIDDLEWARE--> 1.require 2. encode code 3.bodyParser use
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//  create MIDDLEWARE --> has 3 para - req,res,next---------> app.use method se middleware create kiya jata hai
// app.use(function(req,res,next){
//     console.log("A new request received at"+ Date.now());
//     next();
// })

// ADVANCE MIDDLEWARE-------------
// app.use(function(req,res,next){
//     console.log("Middleware start");
//     next();
// })
// app.get("/", function(req,res,next){
//     res.send("Hello, this is from server side response & this URL is get only GET Method request");
//     next();
// })
// app.get("/", function(req,res,next){
//     console.log("End Route");
// })

// AGE CHECKING EXAMPLES-----------
        // --> 1.create middleware  
        // 2. before create middleware already make route that rout pass in middleware 
        // 3. make extra route for not valid age
app.use('/:age',(req,res,next)=>{
    if(req.params.age < 18){
        res.redirect('/fail');
    }
    next();
})
// NOTE --> faile route phle likhna hai sequence me otherwise your age is: fail show krega if hit localhost:7000/12
app.get('/fail',(req,res)=>{
    res.send("your age is low so you can't access to this site");
})
app.get('/:age',(req,res)=>{
    res.send("your age is:"+req.params.age);
})

app.listen(7000);