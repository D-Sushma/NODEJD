//1. importing the Express js module into our application
var express = require("express");
var cors = require("cors");
// =======for formatting date
var moment = require('moment');

const corsOptions = {
    // origin: "http://127.0.0.1:3000",
    // Access_Control_Allow_Origin:"http://127.0.0.1:3000",
    Access_Control_Allow_Origin: "*",
};

// IMPORT==============
var users = require('./routes/users');
var products = require('./routes/products');
var orders = require('./routes/orders');
// ------START-------------------------------------
var con = require('./properties'); //step #1
const { query } = require("express");
const { connect } = require("./properties");

// -------END-----------------------------------------------------
//2. we are initializing the app using the express
var app = express();
app.use(cors(corsOptions));

app.use('/users', users);
app.use('/products', products);
app.use('/orders', orders);
// --------START----------------------------------------
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
app.get('/usertabledetails', (req, res) => {
    // let sqlQuery = "SELECT * FROM employee";
    let sqlQuery = "SELECT * FROM quiz_regdetails";
    let query = con.query(sqlQuery, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(apiResponse(results));
    });
});

app.get('/memberregistration', (req, res) => {
    // console.log("member registration");
    let query = "SELECT * FROM competetion_registration GROUP BY expiry_date";
    con.query(query, (err, results) => {
        if (err) { console.log(err); }
        else {
            // console.log(results);
            let eDate = [];
            for (let index = 0; index < results.length; index++) {
                const element = results[index].expiry_date;

                // let newEle =moment(element).subtract(6,'days').format('DD-MM-YYYY') +"TO"+ moment(element).format('DD-MM-YYYY');
                eDate.push({
                    label: moment(element).subtract(6,'days').format('DD-MM-YYYY')+" "+"TO"+" "+moment(element).format('DD-MM-YYYY'), value: element
                    // label: element, value: element
                    // label:newEle ,value:newEle
                });
                console.log('element', element);
            }
            console.log('eDate', eDate)
            console.log('results', results)
            res.send(apiResponse({ results: results, eDate: eDate }));
        }
    })
})
app.get('/registration', (req, res) => {
    let query = "SELECT * FROM competetion_registration WHERE (expiry_date='2022-10-23' and subject = 13)";
    con.query(query, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(apiResponse(results));
    })
}) 

app.get('/registrationUser/:tRecord', (req, res) => {
    console.log('req.params.tRecord', req.params.tRecord)
    let tr = req.params.tRecord;
    // let query = "SELECT * FROM competetion_registration WHERE (expiry_date='2022-10-23' and subject = 13)";
    let query = `SELECT * FROM competetion_registration WHERE (expiry_date='${tr}' and subject = 13)`;
    con.query(query, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(apiResponse(results));
    })
})

// JOIN 
app.get('/join', (req, res) => {
    // console.log("put inner join");
    // let query = "SELECT quiz_regdetails.name,quiz_regdetails.lname from competetion_registration INNER JOIN quiz_regdetails WHERE competetion_registration.userid = quiz_regdetails.id";
    let query = "SELECT competetion_registration.id, competetion_registration.subject, competetion_registration.subscription, competetion_registration.status, competetion_registration.updated_at, competetion_registration.created_at, competetion_registration.expiry_date, quiz_regdetails.name,quiz_regdetails.lname from competetion_registration INNER JOIN quiz_regdetails ON competetion_registration.userid = quiz_regdetails.id";
    con.query(query, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(apiResponse(results));
    })
})

app.get('/competitionlistdetails', (req, res) => {
    console.log("Competition List");
    // let query = "SELECT * FROM competition_new_initiate";
    /**** ACCESS SINGLE COLUMN IF NOT DEFINE SHORT NAME***/
    // let  query = "SELECT competition_new_initiate.id,competition_new_initiate.competition_group_id,competition_new_initiate.subject_id,competition_new_initiate.p1,competition_new_initiate.p2, competition_new_initiate.test_date,competition_new_initiate.subscription_id,competition_new_initiate.slot_start, competition_new_initiate.slot_end, quiz_regdetails.name,quiz_regdetails.lname from competition_new_initiate INNER JOIN quiz_regdetails ON competition_new_initiate.p1 = quiz_regdetails.id"; 
    /* ******ACCESS MULTIPLE COLUMN WITH DEFINE SHORT NAME****** */
    let query = "SELECT c.*, CONCAT(q1.name,' ',q1.lname) AS p1_name, CONCAT(q2.name,' ',q2.lname) AS p2_name from competition_new_initiate c INNER JOIN quiz_regdetails q1 ON c.p1 = q1.id INNER JOIN quiz_regdetails q2 ON c.p2 = q2.id";
    con.query(query, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(apiResponse(results));
    })
})

app.get('/competitiongroupdetails', (req, res) => {
    console.log("Competition group");
    // let query = "SELECT id,competition_group_id, winner_id,test_date, COUNT(competition_group_id) as grp_cnt FROM competition_new_initiate GROUP BY competition_group_id";
    //  let query = "SELECT competition_new_initiate.id,competition_new_initiate.competition_group_id, competition_new_initiate.winner_id,competition_new_initiate.test_date, COUNT(competition_group_id) AS grp_cnt, CONCAT(quiz_regdetails.name,' ',quiz_regdetails.lname) AS winner_name FROM competition_new_initiate INNER JOIN quiz_regdetails ON competition_new_initiate.winner_id = quiz_regdetails.id GROUP BY competition_group_id";
    // let query = "SELECT c.id,c.competition_group_id, c.winner_id,c.test_date, COUNT(competition_group_id) AS grp_cnt, CONCAT(q.name,' ',q.lname) AS winner_name FROM (competition_new_initiate c INNER JOIN quiz_regdetails q ON c.winner_id = q.id) GROUP BY competition_group_id";
    let query = "SELECT t1.id,t1.competition_group_id, t1.winner_id,t1.test_date,t1.grp_cnt,CONCAT(q.name,' ',q.lname) AS winner_name from (SELECT id,competition_group_id, winner_id,test_date, COUNT(competition_group_id) as grp_cnt FROM competition_new_initiate GROUP BY competition_group_id) AS t1 LEFT JOIN quiz_regdetails q ON t1.winner_id = q.id";
    con.query(query, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(apiResponse(results));
    })
})

app.get('/moredetailstable/:id', (req, res) => {
    // console.log("more details table");
    console.log(req.params.id);
    let cgId = req.params.id;
    // let query = "SELECT * FROM competition_new_initiate WHERE competition_group_id = 'CG_2022-10-14_13_1_2_5_1'"
    // let query = `SELECT * FROM competition_new_initiate WHERE competition_group_id = "${cgId}"`;
    // ===========wrong=====
    // let query = `SELECT c.*, CONCAT(q1.name,' ',q1.lname) AS p1_name, CONCAT(q2.name,' ',q2.lname) AS p2_name FROM competition_new_initiate c INNER JOIN quiz_regdetails q1 ON c.p1 = q1.id INNER JOIN quiz_regdetails q2 ON c.p2 = q2.id WHERE competition_group_id = "${cgId}"`;
    // ==========right=======
    let query = `SELECT t1.*, q1.id AS q1_id, q2.id AS q2_id, CONCAT(q1.name,' ',q1.lname) AS p1_name, CONCAT(q2.name,' ',q2.lname) AS p2_name FROM (SELECT * FROM competition_new_initiate) AS t1 LEFT JOIN quiz_regdetails q1 ON t1.p1 = q1.id LEFT JOIN  quiz_regdetails q2 ON t1.p2 = q2.id WHERE t1.competition_group_id = "${cgId}"`;
    con.query(query, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(apiResponse(results));
    })
});
// PASS DYNAMIC DATA----------------------------->>>>>>>>>>>>
app.get('/moredetailstable1/:cgId', (req, res) => {
    // console.log("more details table");
    // let query = "SELECT competition_group_id FROM competition_new_initiate WHERE competition_group_id = 'CG_2023-01-07_13_1_0_6_1'"
    // let query = "SELECT * FROM competition_new_initiate";
    let cgId = req.params.cgId;
    let query = `SELECT * FROM competition_new_initiate WHERE competition_group_id = "${cgId}"`;
    con.query(query, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(apiResponse(results));
    })
})

app.get('/subjectrecord', (req, res) => {
    console.log("record basis of subject in filter section");
    // let query = "SELECT *, COUNT(expiry_date) AS subject_record FROM `competetion_registration` WHERE subject=13";
    let query = "SELECT c1.*, c2.*, COUNT(c2.expiry_date) AS c2_subject_record FROM (SELECT *, COUNT(expiry_date) AS subject_record FROM `competetion_registration` WHERE subject = 13) AS c1 INNER JOIN `competetion_registration` c2 ON  c2.id WHERE c2.subject = 6";
    con.query(query, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(apiResponse(results));
    })
})

app.get('/totalrecord', (req, res) => {
    console.log(req.params.id);
    let cgId = req.params.id;
    // console.log("total record field inside filter section");
    let query = `SELECT * FROM competetion_registration WHERE expiry_date = "${trId}"`;
    // let query = "SELECT *,COUNT(subject) AS total_record FROM `competetion_registration` where expiry_date='2022-10-09' AND subject=6";
    // let query = "SELECT * FROM `competetion_registration` WHERE subject=13 AND expiry_date='2023-02-12'";
    // let query = "SELECT COUNT(subject) AS tcount FROM `competetion_registration` GROUP BY subject=13 AND expiry_date='2023-02-12'";
    con.query(query, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(apiResponse(results));
    })
})
/**************************************************************/
// some query for filter section, --> for total reg field
// SELECT * FROM `competetion_registration` WHERE subject=6 AND expiry_date='2022-10-02'
// SELECT * FROM `competetion_registration` where expiry_date='2022-10-09' AND subject=6
/**************************************************************/
// ================== TOTAL COMPETITION==============
// SELECT * FROM `competition_new_initiate` WHERE subject_id=13 AND test_date>='2022-10-10' AND test_date<'2022-10-16'
// ===============TOTAL REGISTRATION================
// SELECT * FROM `competetion_registration` WHERE subject=13 AND expiry_date='2023-02-12'
app.get('/single/item/:id', (req, res) => {
    let sqlQuery = "SELECT * FROM employee WHERE id=" + req.params.id;
    // let sqlQuery = "SELECT * FROM employee";
    let query = con.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});
// create -> insert
app.post('/insert/items', (req, res) => {
    // let data = { id:req.body.id, name: req.body.name, address: req.body.address };
    // let sqlQuery = "INSERT INTO employee SET ?";
    let sqlQuery = "INSERT INTO employee (id, name, address) VALUES (8, 'bharti','durgapur')";
    let query = con.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});
// delete -> delete
app.delete('/delete/items', (req, res) => {
    // let sqlQuery = "DELETE FROM employee WHERE id="+req.params.id+"";
    let sqlQuery = "DELETE FROM employee where id=8";

    let query = con.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/*** Update -> put */
app.put('/update/items', (req, res) => {
    // let sqlQuery = "UPDATE employee SET name='"+req.body.name+"', address='"+req.body.address+"' WHERE id="+req.params.id;
    let sqlQuery = "UPDATE employee SET address ='aagra' WHERE id =6";
    let query = con.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

function apiResponse(results) {
    return JSON.stringify({ "status": 200, "error": null, "response": results });
}
// --------END------------------------------------------
app.listen(4000);
// app.listen(4000, () => {
//   console.log(`Example app listening on port 3000`);
// });