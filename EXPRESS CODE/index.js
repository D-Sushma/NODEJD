//1. importing the Express js module into our application
var express = require("express"); 

// IMPORT==============
var users = require('./routes/users');
var products = require('./routes/products');


//2. we are initializing the app using the express
var app = express();

app.use('/users', users);
app.use('/products', products);

app.listen(4000);
// app.listen(3000, () => {
//   console.log(`Example app listening on port 3000`);
// });