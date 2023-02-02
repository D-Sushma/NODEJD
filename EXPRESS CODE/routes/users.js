//  we take modular approach to create modules.......!!  
var express = require("express");
// var app = express();

var router = express.Router();

// simple dummy route --  /users/
router.get('/', (req, res) => {
    res.send("GET! Request for users!");
});

//  /users/get-user--details
router.get('/user-details', (req, res) => {
    res.send("GET! Request for Specific users!");
});

// CRUD - user
router.post('/create-users', (req, res) => {
    res.send("create users!");
});
router.put('/update-users', (req, res) => {
    res.send("update users!");
});
router.get('/read-all-users', (req, res) => {
    res.send("read all users!");
});
router.get('/get-user-details', (req, res) => {
    var userObj = {
        id: 1,
        name: "ABC",
        address: "XYZ",
        status: true
    }
    res.send(userObj);
});
router.delete('/delete-users', (req, res) => {
    res.send("delete users!");
});


module.exports = router;