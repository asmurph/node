var express = require('express');  
var app = express();  
var cors = require("cors");
var sql = require("mssql");

app.use(cors());

// config for your database
var config = {
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
 
app.get('/Regions', function (req, res) { 
 
 // connect to your database
 sql.connect(config, function (err) {
 
 if (err) console.log(err);
 
 // create Request object
 var request = new sql.Request();
 
 // query to the database and get the data
 request.query('SELECT * FROM dbo.Region', function (err, recordset) {
 
 if (err) console.log(err)
 
 // send data as a response
 res.send(recordset);
 
 });
 });
});
var server = app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
   });