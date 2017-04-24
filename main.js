var http = require("http");
var db = require('./db.js');
var express = require('express');


http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('I am a webserver in node.js.');
}).listen(8080, 'localhost');