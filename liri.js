// Code to read and set environment variables 
require("dotenv").config();
// Code required to import the `keys.js` file and then stored it in a variable
var keys = require("./keys.js")
// Code to require moment npm
var moment = require("moment");
// Code to require spotify api npm
var Spotify = require("node-spotify-api");
// Code to use axios npm
var axios = require("axios");
// Code to require fs Node package for reading and writing text files
var fs = require("fs")
// Code to access to spotify keys
var spotify = new Spotify(keys.spotify);
// Code to read user command
var userInput = process.argv[2];
// Code to read user query
var searchTerm = process.argv.slice(3).join("+").toLowerCase();

if (userInput === "spotify-this-song") {
    if (!searchTerm) {
        searchTerm = "The Sign by Ace of Base";
    }
    spotify.search({ type: 'track', query: searchTerm })
        .then(function (response) {
            var songCounter = 1;
            for (var i = 0; i < response.tracks.items.length; i++) {

                var songData = [
                    ("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"),
                    ("-----------------------------------------------"),
                    ("Song Number: " + songCounter),
                    ("Artist: " + response.tracks.items[i].artists[0].name),
                    ("The song name is: " + response.tracks.items[i].name),
                    ("Here is a song preview from Spotify: " + response.tracks.items[i].preview_url),
                    ("The album containing this song is: " + response.tracks.items[i].album.name),
                    ("-----------------------------------------------"),
                    ("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"),
                    ("\n")

                ].join("\n\n");
                fs.appendFile("log.txt", songData, function (err) {
                    if (err) throw err;
                });
                console.log(songData);
                songCounter++
            }
        })
        .catch(function (error) {
            (error);
        });

}


else if (userInput === "concert-this") {
    axios
        .get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
        .then(function (response) {
            if (response.data.length === 0) {
                ("Sorry I was unable to find any results for this artist or band.");
            } else {
                var eventNumber = 1;
                for (var i = 0; i < response.data.length; i++) {
                    var eventData = [

                        ("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"),
                        ("Event Number: " + eventNumber),
                        ("----------------"),
                        ("Name of the venue is: " + response.data[i].venue.name),
                        ("The venue is located in: " + response.data[i].venue.city),
                        ("Date of the Event is: " + moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a')),
                        ("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"),
                        ("\n")


                    ].join("\n\n");
                    fs.appendFile("log.txt", eventData, function (err) {
                        if (err) throw err;
                    });
                    console.log(eventData);
                    eventNumber++
                }

            }
        })

}

else if (userInput === "movie-this") {
    if (searchTerm === "") {
        searchTerm = "Mr. Nobody"
    }
    axios
        .get("http://www.omdbapi.com/?t=" + searchTerm + "&apikey=trilogy")
        .then(function (response) {
            if (response.data.length === 0) {
                ("Sorry I was unable to find any results for this movie.");
            } else {
                var movieData = [
                    ("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"),
                    ("Movie information"),
                    ("-----------------"),
                    (response.data.Title),
                    ("Year released: " + response.data.Year),
                    ("IMDB rating: " + response.data.imdbRating),
                    (response.data.Ratings[1].Source + " gave this movie a " + response.data.Ratings[1].Value + " rating."),
                    ("Country Produced: " + response.data.Country),
                    ("Language/s: " + response.data.Language),
                    ("Plot: " + response.data.Plot),
                    ("Main Actors/Actresses: " + response.data.Actors),
                    ("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"),
                ].join("\n\n");
                fs.appendFile("log.txt", movieData, function (err) {
                    if (err) throw err;
                    console.log(movieData);
                });
            }

        })

}

else {
    ("No input detected. Pulling random search...");
    fs
        .readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return (error);
            }

            // Places content of random.txt file inside an array

            var dataArr = data.split(",");
            let userInput = dataArr[0];
            let searchTerm = dataArr[1].replace(/\"/g, "")

            if (userInput === "spotify-this-song") {
                spotify.search({ type: 'track', query: searchTerm })
                    .then(function (response) {
                        var songCounter = 1;
                        for (var i = 0; i < response.tracks.items.length; i++) {
                            var songData = [
                                ("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"),
                                ("-----------------------------------------------"),
                                ("Song Number: " + songCounter),
                                ("Artist: " + response.tracks.items[i].artists[0].name),
                                ("The song name is: " + response.tracks.items[i].name),
                                ("Here is a song preview from Spotify: " + response.tracks.items[i].preview_url),
                                ("The album containing this song is: " + response.tracks.items[i].album.name),
                                ("-----------------------------------------------"),
                                ("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"),
                                ("\n"),

                            ].join("\n\n");
                            fs.appendFile("log.txt", songData, function (err) {
                                if (err) throw err;
                            });
                            console.log(songData);
                            songCounter++
                        }
                    })
                    .catch(function (err) {
                        (err);
                    })
            }
            else {
                ("Does not compute. Does not compute!");
            }

        }
        )
}