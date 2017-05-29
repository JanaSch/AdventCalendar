var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var assert = require('assert');
var db_connnect = require('../bin/db_connector.js');

/*
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'Adventskalender'
});
*/

router.get('/', function(req, res, next) {
    var L = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    var counter = L.length;
    while(counter > 0){
        var index = Math.floor(Math.random() * counter);
        counter--;
        var temp = L[counter];
        L[counter] = L[index];
        L[index] = temp;
    }
    res.render('index', { title: 'Advents-Kalender' , list: L});
});

router.get('/doors/:doornumber', function(req,res) {
    var doornumber = req.params.doornumber;
    db_connnect.select('Objekt', doornumber, function (err, results, fields) {
        console.log(err);
        if (err) {
            console.log(err);
            res.status(500).send("Fehler!")
        } else {
            console.log('The solution is: ', results);
            var question = results[0].Frage;
            console.log(question);
            //res.render('index', { title: 'Test' });
            res.render('door', results[0]);
        }
    });
});



router.post('/doors/:doornumber', function(req, res, next) {
    var doornumber = req.params.doornumber;
    var L = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    console.log('THERE');
    var item = {
        Autor: req.body.author,
        Antwort: req.body.answer,
        O_ID: doornumber
    };
    console.log(item);
    console.log('FOO');
    db_connnect.insert(item.Autor, item.Antwort, item.O_ID, function (err, results, fields) {
        console.log(err);
        if (err) {
            console.log(err);
            res.status(500).send("Fehler!")
        } else {
            db_connnect.select('Antwort', doornumber, function (err, results, fields) {
                console.log(err);
                if (err) {
                    console.log(err);
                    res.status(500).send("Fehler!")
                } else {
                    console.log('The solution is: ', results);
                    var question = results[0];
                    console.log(question);
                    //res.render('index', { title: 'Test' });
                    //res.render('door', results[0]);
                }
                //console.log('The insert-solution is: ', results);
                res.render('/door/:doornumber');
            })
        }
    });
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
*/
/*
router.post('/insert', function(req, res, next) {
    var item = {
        Name: req.body.name,
        Antwort: req.body.Antwort
    };

    res.redirect('/');
});
*/

/*
router.post('/update', function(req, res, next) {

});

router.post('/delete', function(req, res, next) {

});

*/


module.exports = router;
