
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
var server = app.listen(8080, function () {
 
  var host = server.address().address
  var port = server.address().port
  connectDb()
  console.log("Example app listening at "+ port)
 
});
 


/*rest api to create a new record into mysql database*/
app.post('/', function (req, res) {
   var postData  = req.body;
   
   const { name, email, subject, message}= req.body
       
const query = `INSERT INTO contact (name, email,subject, message ) VALUES ('${name}', '${email}', '${subject}', '${message}')`;

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
 
    conn
    /*selecting from database*/
    .then( (result) =>{
        result.query('select * from contact')
        .then(row => {
            console.log(row, 'row');
            res.send({
                data: row
            })
        })
    })
    .catch(error=> console.log(error)) 
  
  })
