var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var request = require("request");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 8080;



app.get("*", function (req, res) {
    fs.readFile('./index.html', function(error, content) {
        if (error) {
            res.writeHead(500);
            res.end();
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
});



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
