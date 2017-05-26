/**
 * Created by Neubehler on 15.05.2017.
 */

var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'Adventskalender'
});

module.exports.select = function (table, id, cb) {
    console.log("Da");
    switch(table) {
        case 'Objekt':
            select = "Select * from Adventskalender.Objekt where O_ID = "+id;
            break;
        case 'Antwort':
            select = "Select * from Adventskalender.Antwort where A_ID = "+id;
            break;
        default:
            console.log("WTF?");
            break;

    }
    pool.query(select,cb);
};