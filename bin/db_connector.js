/**
 * Created by Neubehler on 15.05.2017.
 */

var mysql = require('mysql');

module.exports.select = function (table, id, cb) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'aktest'
    });
    var select;
    switch(table) {
        case 'object':
            select = "Select * from aktest.object where ObjectID = "+id;
            break;
        case 'answer':
            select = "Select * from aktest.answer where ObjectID = "+id;
            break;
        default:
            cb(true);
            return;
            break;
        connection.query(select, function (error, results, fields) {
            connection.end();
            cb(error, results, fields);
        });
    }
};