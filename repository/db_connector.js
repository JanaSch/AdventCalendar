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
    switch(table) {
        case 'Objekt':
            select = "Select * from Adventskalender.Objekt where O_ID = " +id;
            break;
        case 'Antwort':
            select = "Select * from Adventskalender.Antwort where O_ID = "+id;
            break;
        case 'all':
            select = "select * from Antwort a join Objekt o on o.O_ID = a.O_ID where a.O_ID = "+id;
            break;
        default:
            console.log("This is the default-select-case.");
            break;
    }
    pool.query(select,cb);
};

module.exports.insert = function (author, comment, o_id, cb) {
    console.log("Connected to database for inserting.");
    insert = "INSERT INTO Antwort(Autor, Kommentar, O_ID) VALUES ?";
    var values = [[author, comment, o_id]];
    pool.query(insert, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        cb(err,result);
    });
};