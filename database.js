/**
 * Created by schmijan on 24.04.2017.
 */

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'pw',
    database : 'adventcalendar'
});

connection.connect(function(err){
    if(err){
        console.log("error");
    }else{
        console.log("Successfully Conn");
    }
});