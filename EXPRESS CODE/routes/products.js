//  we take modular approach to create modules.......!!  

var express = require("express");

var router = express.Router();

//   /products/
router.get('/', (req, res) => {
    res.send("get all products!")
})

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