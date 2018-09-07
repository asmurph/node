//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 

// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
var dbConfig = {
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

// This function connects to a SQL server, executes a SELECT statement,
// and displays the results in the console.
function getCustomers() {
    // Create connection instance
    var conn = new sql.ConnectionPool(dbConfig);
   
    conn.connect()
    // Successfull connection
    .then(function () {
   
      // Create request instance, passing in connection instance
      var req = new sql.Request(conn);
   
      // Call mssql's query method passing in params
      req.query("SELECT * FROM [Region]")
      .then(function (recordset) {
        console.log(recordset);
        conn.close();
      })
      // Handle sql statement execution errors
      .catch(function (err) {
        console.log(err);
        conn.close();
      })
   
    })
    // Handle connection errors
    .catch(function (err) {
      console.log(err);
      conn.close();
    });
   }

//GET API
app.get("/api/user", function(req , res){
                //var query = "select * from [region]";
                getCustomers (res, query);
});

