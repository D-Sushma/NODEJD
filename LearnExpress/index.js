var express = require("express");
var app = express();

//  create MIDDLEWARE --> has 3 para - req,res,next----------------
// app.use(function(req,res,next){
//     console.log("A new request received at"+ Date.now());
//     next();
// })

// ADVANCE MIDDLEWARE-------------
app.use(function(req,res,next){
    console.log("Middleware start");
    next();
})
app.get("/", function(req,res,next){
    res.send("Hello, this is from server side response & this URL is get only GET Method request")
    next();
})
app.get("/", function(req,res,next){
    console.log("End Route")
})

// HTTP METHODS----------------------------
app.get("/home", function(req,res){
    res.send("Hello, this is from server side response & this URL is get only GET Method request")
})
app.post("/", function(req,res){
    res.send("Hii, this post request get on server side & this URL is get only POST Method request")
})
app.put("/", function(req,res){
    res.send("this URL is get only PUT Method request")
})
app.delete("/", function(req,res){
    res.send("this URL is get only DELETE Method request")
})
// ** get & post set in single url (run for both)
app.all("/hello", (req,res)=>{
    res.send("This URL get all type of request")
})

//  URL BUILDINGS---------------
// app.get("/:id", (req,res)=>{
//     res.send("ID is:"+ req.params.id);  //but its also get abcd....
// })
// ** only accept numeric and letter value
app.get("/:id([0-9, a-z]{4})", (req,res)=>{
    res.send("ID is:"+ req.params.id);  //but its also get abcd....
})
app.get("/users/:name/:id", (req,res)=>{
    res.send("user name is:"+req.params.name + "& ID is:"+req.params.id);  
})
// RUN WHEN URL IS NOT FOUND-------------------------
// app.get("*", (req,res)=>{
//     res.send("URL is not working");  
// })
// app.post("*", (req,res)=>{
//     res.send("URL is not working");  
// })

app.listen(8000);