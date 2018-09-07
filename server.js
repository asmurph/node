var express =require('express');
//Initialize app with Express Web Framework
var app = express();
var _bodyParserPackage = require("body-parser")

var cors = require("cors");
//To parse result in json format  
app.use(_bodyParserPackage.json());

//Here we will enable CORS, so that we can access api on cross domain.  
app.use(function (req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");  
    next();  
});  


//app.use(cors());
var port=process.env.PORT || 1300;
var _sqlPackage = require('mssql'); // MS Sql Server client

app.use(express.static(__dirname + '/public'));
var sqlconfig = {
    server: "mappers.database.windows.net", // Use your SQL server name
    database: "Appointments", // Database to connect to
    user: "smurph", // Use your username
    password: "71Chevelle", // Use your password
    port: 1433,
    // Since we're on Windows Azure, we need to set the following options
    options: {
          encrypt: true
      }
   };
 
//Function to connect to database and execute query  
var QueryToExecuteInDatabase = function (response, strQuery) {  
    //close sql connection before creating an connection otherwise you will get an error if connection already exists.  
    _sqlPackage.close();  
    //Now connect your sql connection  
    _sqlPackage.connect(sqlconfig, function (error) {  
        if (error) {  
            console.log("Error while connecting to database :- " + error);  
            response.send(error);  
        }  
        else {  
            //let's create a request for sql object  
            var request = new _sqlPackage.Request();  
            //Query to run in our database  
            request.query(strQuery, function (error, responseResult) {  
                if (error) {  
                    console.log("Error while connecting to database:- " + error);  
                    response.send(error);  
                }  
                else {  
                    response.send(responseResult);  
                }  
            });  
        }  
    });             
 }  
  
  function lookupRegion(req, res)  {
  
     //close sql connection before creating an connection otherwise you will get an error if connection already exists.  
    _sqlPackage.close();  
    //Now connect your sql connection  
    _sqlPackage.connect(sqlconfig, function (error) {  
        if (error) {  
            console.log("Error while connecting to database :- " + error);  
            response.send(error);  
        }  
        else 
		{  
            //let's create a request for sql object  
            var request = new _sqlPackage.Request();  
            //Query to run in our database
              
            request.query('SELECT * FROM dbo.Region', function (err, recordset) { 
                if (error) 
				{  
                    console.log("Error while connecting to database:- " + error);  
                    response.send(error);  
                } 

				
                else
				{  
                    // send data as a response
                    res.send(recordset); 
                }  
            });  
        }  
    }); 
	
  }
  
//GET API  
app.get('/api/region', cors(), function(_req ,_res){  
    var Sqlquery = "select * from region";  
    QueryToExecuteInDatabase(_res, Sqlquery);  
});  

var regionRouter = express.Router();
regionRouter.get('/', function(req, res) {});

app.get('/',function(req,res){
console.log('hello from server');
 res.render('./public/index.html');
});

app.listen(port);
console.log('Server Listening at port'+port);

regionRouter.get('/:id', lookupRegion, function(req, res){
      res.json(req, region);
});
app.use('/regions', regionRouter);
module.exports = app;