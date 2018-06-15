
$(document).ready(function () {


    $("#submit").on("click", function (event) {
        event.preventDefault();

        var origin = $("#origin").val().trim();
        var length = $("#length").val().trim();
        var radius = $("#radius").val().trim();
        var difficulty = $("#difficulty").val().trim();


        origin.split(" ");
        var originConcat = "";
        
        for (var i = 0; i < origin.length; i++) {
            originConcat += origin[i]
        }

        var queryURL1 = "https://maps.googleapis.com/maps/api/geocode/json?address=" + originConcat + "&key=AIzaSyAn8ggebI6-nDFuKEasRkbtzdl7zz_trvQ";

        $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function (response) {
            console.log(response.results[0].geometry.location.lat);
            console.log(response.results[0].geometry.location.lng);

            var latitude = response.results[0].geometry.location.lat;
            var longitude = response.results[0].geometry.location.lng;

            var queryURL2 = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&maxDistance=" + radius + "&minLength=" + length + "&maxResults=30&key=200290229-8c6cd188792cb14d607d03b6ede06a50";

            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                var trails = [];
                var results = response.trails;
                console.log(results[0].difficulty);
                for (var i = 0; i < results.length; i++) {
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
                    }
                }
                console.log(trails);
                for (var j = 0; j < trails.length; j++) {
                    var newDiv = $("<div>").attr("class", "newTrail");
                    var trailImage = $("<img>").attr("src", trails[j].image);
                    var newH4 = $("<h4>").text(trails[j].name);
                    var newP = $("<p>").text("Summary: " + trails[j].summary);
                    var newP2 = $("<p>").text("Trail Type: " + trails[j].type);
                    var newP3 = $("<p>").text("Difficulty: " + trails[j].difficulty);
                    var newP4 = $("<p>").text("Rating: " + trails[j].rating);
                    var newP5 = $("<p>").text("Votes: " + trails[j].votes);
                    var newP6 = $("<p>").text("Location: " + trails[j].location);
                    var newP7 = $("<p>").text("Length: " + trails[j].length);
                    var newP8 = $("<p>").text("Ascent: " + trails[j].ascent);
                    var newP9 = $("<p>").text("Descent: " + trails[j].descent);
                    var newP10 = $("<p>").text("High Altitude: " + trails[j].high);
                    var newP11 = $("<p>").text("Low Altitude: " + trails[j].low);

                    $(newDiv).append(newH4);
                    $(newDiv).append(trailImage);
                    $(newDiv).append(newP);
                    $(newDiv).append(newP2);
                    $(newDiv).append(newP3);
                    $(newDiv).append(newP4);
                    $(newDiv).append(newP5);
                    $(newDiv).append(newP6);
                    $(newDiv).append(newP7);
                    $(newDiv).append(newP8);
                    $(newDiv).append(newP9);
                    $(newDiv).append(newP10);
                    $(newDiv).append(newP11);

                    $("#trail-dump").append(newDiv);
                }





            });
        });

    });



});