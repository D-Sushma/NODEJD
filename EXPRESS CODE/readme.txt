//************ index.js
//1. importing the Express js module into our application
var express = require("express"); 

// IMPORT==============
var users = require('./routes/users');
var products = require('./routes/products');


//2. we are initializing the app using the express
var app = express();

app.use('/users', users);
app.use('/products', products);

// 3. using the app we are configuring  the route of 'GET' method and path is '/getUsers'
// http methods --> GET, POST , PUT, PATCH, DELETE
/* GET(url, (callback [req, res])=>{
   ---> request captured as input
   ---> response as output
})
*/

// simple dummy route 
// app.get('/read-users', (req, res)=>{
//    res.send("List of users!");
// });

// app.get('/get-user-details', (req, res)=>{
//     var userObj = {
//         id:1,
//         name:"ABC",
//         address:"XYZ",
//         status:true
//     }
//     res.send(userObj);
// });



// finally we are starting the app at port 4000
// it internally does is called NODE feature ---> http.createServer 
// and there it will listen to the particular port now
app.listen(4000);
// app.listen(3000, () => {
//   console.log(`Example app listening on port 3000`);
// });