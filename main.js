
$(document).ready(function () {
    var mymap;

    $("#random").on("click", function (event) {
        // event.preventDefault();

        var origin = $("#origin").val().trim();
        var length = $("#length").val().trim();
        var radius = $("#radius").val().trim();
        var difficulty = $("#difficulty").val().trim();


        var originArr = origin.split(" ");
        var originConcat = "";

        for (var i = 0; i < originArr.length; i++) {
            if (i === 0) {
                originConcat += originArr[i];
            } else {
                originConcat += "+" + originArr[i]
            }
        }

        console.log(originConcat);

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
                            "imageThumb": results[i].imgSqSmall,
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
                    var newH4 = $("<h4>").text(trails[j].name).attr({ "data-lat": trails[j].latitude, "data-long": trails[j].longitude, "class": "highlight" });
                    var newP = $("<p>").text("Summary: " + trails[j].summary);
                    var newP3 = $("<p>").text("Difficulty: " + trails[j].difficulty);
                    var newP4 = $("<p>").text("Rating: " + trails[j].rating + " / 5 stars");
                    var newP5 = $("<p>").text("Votes: " + trails[j].votes);
                    var newP6 = $("<p>").text("Location: " + trails[j].location);
                    var newP7 = $("<p>").text("Length: " + trails[j].length + " miles");
                    var newP8 = $("<p>").text("Ascent: " + trails[j].ascent + " ft");
                    var newP9 = $("<p>").text("Descent: " + trails[j].descent + " ft");
                    var newP10 = $("<p>").text("High Altitude: " + trails[j].high + " ft");
                    var newP11 = $("<p>").text("Low Altitude: " + trails[j].low + " ft");

                    $(newDiv).append(newH4);
                    $(newDiv).append(trailImage);
                    $(newDiv).append(newP);
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
                mymap = L.map('mapid').setView([latitude, longitude], 7);

                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox.streets',
                    accessToken: 'pk.eyJ1IjoiamF5cmVkZDExIiwiYSI6ImNqaGdsaWF3dzFpZjYzZHAzeW4wbHNmb2UifQ.COxlVvDKbzGEnSyy5Um6vg'
                }).addTo(mymap);

                for (var i = 0; i < trails.length; i++) {
                    var popup = L.popup({ className: 'popup' })
                        .setContent('<div class="popupDiv">' +
                            '<h6>' + trails[i].name + '</h6>' +
                            '<img src="' + trails[i].imageThumb + '">' +
                            '<p><b>' + 'Rating: ' + trails[i].rating + ' / 5 stars'+ '</b><br>' +
                            '<b>' + 'Length: ' + trails[i].length + ' miles' + '</b><br>' +
                            'Difficulty: ' + trails[i].difficulty +
                            '</p>' +
                            '</div>');

                    marker = new L.marker([trails[i].latitude, trails[i].longitude])
                        .bindPopup(popup)
                        .addTo(mymap);
                }


                // function onMapClick(e) {
                //     alert("You clicked the map at " + e.latlng);
                // }

                // mymap.on('click', onMapClick);

                // var popup = L.popup();

                // function onMapClick(e) {
                //     popup
                //         .setLatLng(e.latlng)
                //         .setContent("You clicked the map at " + e.latlng.toString())
                //         .openOn(mymap);
                // }
                
                // mymap.on('click', onMapClick);
            });
        });

    });

    $(document).on('mouseenter', '.highlight', function() {
        $(this).css("color", "purple");
    });

    $(document).on('mouseleave', '.highlight', function() {
        $(this).css("color", "black");
    });

    $(document).on('click', '.highlight', function() {
        mymap.panTo([$(this).data("lat"), $(this).data("long")]);
        mymap.fitBounds(L.latLngBounds([[$(this).data("lat") - .025, $(this).data("long") - .025], [$(this).data("lat") + .025, $(this).data("long") + .025]]));
    });
});
