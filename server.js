var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var geocoder = require("geocoder");
var request = require("request");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 8080;



app.get("*", function (req, res) {
    fs.readFile('./home.html', function(error, content) {
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


var latitude = 40.0274;
var longitude = -105.2519;
var distance = 10;
var key = "200290229-8c6cd188792cb14d607d03b6ede06a50";

var QueryUrl = "https://www.hikingproject.com/data/get-trails?lat=" + latitude +"&lon=" + longitude + "&maxDistance=" + distance + "&key=" + key;

request(QueryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body);
    }
});




app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
