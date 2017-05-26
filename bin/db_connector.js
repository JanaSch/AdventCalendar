/**
 * Created by Neubehler on 15.05.2017.
 */

var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'aktest'
});

module.exports.select = function (table, id, cb) {
    console.log("Da");
    switch(table) {
        case 'object':
            select = "Select * from aktest.object where ObjectID = "+id;
            break;
        case 'answer':
            select = "Select * from aktest.answer where ObjectID = "+id;
            break;
        default:
            console.log("WTF?");
            break;

    }
    pool.query(select,cb);
};