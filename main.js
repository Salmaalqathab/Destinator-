var geocoder = require('geocoder');

$(document).ready(function () {


    $("#submit").on("click", function () {
        var location = $("#location").val().trim();
        var distance = $("#distance").val().trim();
        var length = $("#length").val().trim();
        var radius = $("#radius").val().trim();
        var difficulty = $("#difficulty").val().trim();

        var latitude;
        var longitude;

        var queryURL1 = "https://maps.googleapis.com/maps/api/geocode/jsonaddress=" + place + "&key=AIzaSyAn8ggebI6-nDFuKEasRkbtzdl7zz_trvQ";

        $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function (response) {
            console.log(response.results[0].geometry.location.lat);
            console.log(response.results[0].geometry.location.lng);

            latitude = response.results[0].geometry.location.lat;
            longitude = response.results[0].geometry.location.lng;
        });

        var queryUrl2 = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&maxDistance=" + radius + "&key=" + key;

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var trails = [];
            var results = response.trails;
            for (var i = 0; i < results.length; i++);
            if (results[i].difficulty == difficulty) {
                var newTrail = {
                    "name": results[i].name,
                    "type": results[i].type,
                    "summary": results[i].summary,
                    "difficulty": results[i].difficulty,
                    "rating": results[i].stars,
                    "votes": results[i].starVotes,
                    "location": results[i].location,
                    "image": results[i].imgSmallMed,
                    "length": results[i].length,
                    "ascent": results[i].ascent,
                    "descent": results[i].descent,
                    "high": results[i].high,
                    "low": results[i].low,
                    "longitude": results[i].longitude,
                    "latitude": results[i].latitude,
                }

                trails.push(newTrail);
                for (var j = 0; j < trails.length; j++) {
                    var newDiv = $("<div>").attr("class", "newTrail");
                    var trailImage = $("<img>").attr("src", trails[j].image);
                    var newH4 = $("<h4>").text(trail[j].name);
                    var newP = $("<p>").text("Summary: " + trails[j].summary);
                    var newP2 = $("<p>").text("Trail Type: " + trails[j].type);
                    var newP3 = $("<p>").text("Difficulty: " + trails[j].difficulty);
                    var newP4 = $("<p>").text("Rating: " + trails[j].rating);
                }

            }



        });
    });



});