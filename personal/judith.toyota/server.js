
/*dependencies */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
const mariadb = require('mariadb');
app.use(cors());
 
/*db connection */
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'judith', 
     password: '',
    database: 'ALC',
     connectionLimit: 5
});

let conn =  pool.getConnection()
/*message to log to console whe db is connected */
function connectDb() {
  conn
  .then(res => console.log(res, 'connected succesfully'))
  .catch(err => console.log(err, 'error: failed to connect'))
}
 

 
/*start body-parser configuration*/
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
/*end body-parser configuration*/
 
/*create app server*/
var server = app.listen(8000,  "127.0.0.1", function () {
 
  var host = server.address().address
  var port = server.address().port
  connectDb()
  console.log("Example app listening at "+ port)
 
});
 


/*rest api to create a new record into mysql database*/
app.post('/toyota', function (req, res) {
   var postData  = req.body;
   
   const {customerID, name, state, partNumber, description, pricePerPart, quantity}= req.body
       
const query = `INSERT INTO toyota (customerID, Name, State, partNumber, Description, pricePerPart, quantity) VALUES ('${customerID}', '${name}', '${state}', '${partNumber}', '${description}', '${pricePerPart}', '${quantity}')`;
    
conn
.then( (result) =>{
    result.query(query)

    .then(row => {
        console.log(row, 'row')
        res.send({"message": "Added succesfully"});
    })
})
.catch(error=> console.log(error)) 

})

app.get('/',  function (req, res) {
    // const {customerID, Name, State, partNumber, Description, pricePerPart} =data
    conn
    /*selecting from database*/
    .then( (result) =>{
        result.query('select * from toyota')
        .then(row => {
            console.log(row, 'row');
            const {customerID, Name, State, partNumber, Description, pricePerPart}= row[0]
            res.send({
                data: row
            })
        })
    })
    .catch(error=> console.log(error)) 
    // res.render('toyota', { customerID, Name, State, partNumber, Description, pricePerPart })
  })
