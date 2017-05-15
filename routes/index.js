var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var assert = require('assert');
var db_connnect = require('../../basics/db_connector.js');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'aktest'
});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Test' });
});

router.get("/1",function(req,res) {
    db_connnect.select('object', 1, function (err, results, fields) {
        var question = results[1].Question;
        res.render('door', {Question: question});
    });
    /*connection.connect(function(err) {
        if (err) {
            console.error('Error connecting database: ' + err.stack);
            return;
        }
        else {
            var id = '1';
            var sql = 'SELECT * FROM aktest.object WHERE ObjectID = 1';
            connection.query(sql, function (error, results, fields) {
                connection.end();
                if (error) {
                    console.log('Error while performing Query.');
                }else
                    console.log('The solution is: ', results);
                res.render('index', { title: 'Test' });
            });
        }
    });*/

});



/*
router.get('/',function(req,res, next){
    res.render('index', { title: 'Test' });
    var rows = connection.query('SELECT * from object where Day = {this.Day}}' , function(err, rows, fields) {
        connection.end();
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.');
    });

});

*/

/*

// GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Test' });
});

router.get('/get-data', function(req, res, next) {
    var restultArray = [];
    mongo.connect(url, function(err, db){
        assert.equal(null, err);
        var cursor = db.collection('collectionname').find();
        cursor.forEach(function (doc,err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function(){
            db.close();
            res.render('index', {items: resultArray});
        });
    });
});

router.post('/insert', function(req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
    mongo.connect(url, function(err, db){
        assert.equal(null, err);
        db.collection('collectionname').insertOne(item, function(err, db){
            assert.equal(null, err);
            console.log('Erfolgreich');
            db.close();
        });
    });
    res.redirect('/');
});



router.post('/update', function(req, res, next) {

});

router.post('/delete', function(req, res, next) {

});

*/
module.exports = router;
