/* ******DYNAMIC ROUTE****** */
// 1. passing multiple dynamic values /:name/:d  
// 2. pattern matching(regular expression) 
// 3. wild card routes --> no restriction when we search 5 dig aspect 4 
// ........................................................................................
var express = require("express");

var router = express.Router();

// 1.
router.get('/search-by-location/:state/country/:city', (req, res) => {
    res.send("GET! Request for Specific users!"+ req.params.state + req.params.city);
});

//2. with regular expression  with pattern matching--> [0-9]
router.get('/search/:key([0-9]{4})', (req, res) => {
    res.send("Allow only numerics & add validation that allow onl {4 digits}, Data Captured is:"+ req.params.key);
})
// >> same route for user name with same url
router.get('/search-username/:key([a-zA-Z]{4})', (req, res) => {
    res.send("Allow only numerics & add validation that allow onl {4 digits}, Data Captured is:"+ req.params.key);
})
// 3. error handling process in terms of route=============================
router.get('*', (req,res)=>{
    var resObj ={
        statusCode: 404,
        statusMsg: "URL not Found!!"
    }
    // res.send("URL not found");
    res.send(resObj);
}) 

module.exports = router;


//=========== we will have the just route define....