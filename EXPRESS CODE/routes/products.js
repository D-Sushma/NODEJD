/*  ----------------MIDDLEWARE----------------- */ 
// it is just fun that have access to the req & res obj --> parsing req body add res header(req, res cycle)
// Remember the order of the methods is extremely imp - if you get this wrong your flow will be wrong
// UI -> request     -> backend API ---> middleware -->(movement hit api called handler)
// need/imp middleware --> (this helps in debugging)
//                1. security check of user's token/access/authorization
//                2. Body parsing of the request obj ki data correct hai ki nhi
//                3. sanitizing data i.e. one couple of check
//                4. logged - most common use-case (login mechanism)
// .......................................................................

var express = require("express");

var router = express.Router();

// terms of most common use-case LOGIN  --> next as middleware
// when hit api  log run and than jump /
router.use('/',(req,res,next)=> {
    // ADD HEADER=========== chech user is authenticated(login)
    // check if data is correct or all data is present
    // check if is active
    req.headers["content-type"]='application/json';
    console.log("API call received");
    next();
});

//   /products/
router.get('/', (req, res, next) => {
    res.send("Headers received"+req.headers["content-type"]);
    res.send("get all products!");
    next();
});

router.use('/',(req,res)=> {
    console.log("API call ended");
});

// products/product-details
router.get('/product-details', (req, res) => {
    var userObj = {
        id: 1,
        name: "ABC",
        address: "XYZ",
        status: true
    }
    // res.send("GET Request for Specific products!")
    res.send(userObj);
})

module.exports = router;