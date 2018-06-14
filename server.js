// These code snippets use an open-source library. http://unirest.io/nodejs
var express = require("express");
var geocoder - require("geocoder");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 3000;



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
