var request = require("request");

var latLong = "lat=" + "&lon="
var distance = "&maxDistance=" +
var rating =
var minLength = "&minLength=" +



var QueryUrl = "https://www.hikingproject.com/data/get-trails?" + latLong + distance + minLength "&key=200290229-8c6cd188792cb14d607d03b6ede06a50";

request(QueryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body);
    }
});
