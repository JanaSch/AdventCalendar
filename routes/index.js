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
    var L1 = [L[0],L[1],L[2],L[3],L[4],L[5]];
    var L2 = [L[6],L[7],L[8],L[9],L[10],L[11]];
    var L3 = [L[12],L[13],L[14],L[15],L[16],L[17]];
    var L4 = [L[18],L[19],L[20],L[21],L[22],L[23]];
    res.render('index', { title: 'Advents-Kalender' , l1: L1, l2: L2, l3: L3, l4: L4});
});

router.get('/doors/:doornumber', function(req,res) {
    var doornumber = req.params.doornumber;
    var answer;
    var date = new Date();
    db_connnect.select('Objekt', doornumber, function (err, results, fields) {
        console.log(err);
        if (err) {
            console.log(err);
            res.status(500).send("Fehler!")
        } else {
            console.log('The solution is: ', results);
            if(results[0].Datum > date)
                res.render('error', {title: 'Advents-Kalender', message: 'Etwas zu neugierig?', add_on1: 'Das Türchen darf noch nicht geöffnet werden.', add_on2: 'Versuchen Sie es in ein paar Tagen noch einmal!'});
            else{
                res.render('door', {title: 'Advents-Kalender', result: results[0], date: date, answer: answer, comments: ' '});
            }
        }
    });
});

router.get('/doors/:doornumber/comments', function(req,res) {
    var doornumber = req.params.doornumber;
    db_connnect.select('Objekt', doornumber, function (err, results, fields) {
        console.log(err);
        if (err) {
            console.log(err);
            res.status(500).send("Fehler!")
        }
        else {
            console.log('The solution is: ', results);
            db_connnect.select('Antwort', doornumber, function (err, comments, fields) {
                console.log(err);
                if (err) {
                    console.log(err);
                    res.status(500).send("Fehler!")
                }
                else {
                    console.log('The solution is: ', comments);
                    res.render('door', {title: 'Advents-Kalender', result: results[0], comments: comments});
                }
            });
        }
    });
});


router.get('/doors/:doornumber/answer', function(req,res) {
    var doornumber = req.params.doornumber;
    var answer;
    var date = new Date();
    db_connnect.select('Objekt', doornumber, function (err, results, fields) {
        console.log(err);
        if (err) {
            console.log(err);
            res.status(500).send("Fehler!")
        } else {
            console.log('The solution is: ', results);
            if(results[0].Datum == date)
                res.render('error', {title: 'Advents-Kalender', message: 'Schon eine Idee?', add_on1: 'Versuchen Sie erst selbst eine Lösung auf das Rätsel zu finden.', add_on2: 'Erst ab morgen gibt es hier die korrekte Antwort!'});
            else if(results[0].Datum > date)
                res.render('error', {title: 'Advents-Kalender', message: 'Etwas zu neugierig?', add_on1: 'Das Türchen darf noch nicht geöffnet werden.', add_on2: 'Versuchen Sie es in ein paar Tagen noch einmal!'});
            else {
                answer = results[0].Antwort;
                res.render('answer', {title: 'Advents-Kalender', result: results[0], date: date, answer: answer});
            }
        }
    });
});


router.post('/doors/:doornumber', function(req, res, next) {
    var doornumber = req.params.doornumber;
    var item = {
        Autor: req.body.author,
        Kommentar: req.body.answer,
        O_ID: doornumber
    };
    db_connnect.insert(item.Autor, item.Kommentar, item.O_ID, function (err, results) {
        console.log(err);
        if (err) {
            console.log(err);
            res.status(500).send("Fehler!")
        } else {
            db_connnect.select('Antwort', doornumber, function (err, results) {
                console.log(err);
                if (err) {
                    console.log(err);
                    res.status(500).send("Fehler!")
                } else {
                    console.log('The solution is: ', results);
                }
                //console.log('The insert-solution is: ', results);
                res.redirect(req.path + '/comments');
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
