//  we take modular approach to create modules.......!!  
var express = require("express");
// var app = express();

var router = express.Router();

// simple dummy route --  /users/
router.use('/', (req, res)=>{
   res.send("GET! Request for users!");
});

//  /users/get-user--details
router.use('get-user-details', (req, res)=>{
   res.send("GET! Request for users!");
});

module.exports = router;