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
    if (searchTerm === "") {
        searchTerm = "The Sign by Ace of Base";
        spotify.search({ type: 'track', query: searchTerm })
            .then(function (response) {
                var songCounter = 1;
                for (var i = 0; i < response.tracks.items.length; i++) {
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    if (songCounter === 1) {
                        console.log("TOP RESPONSE");
                    }
                    else if (songCounter !== 1) {
                        console.log("Song Number: " + songCounter);

                    }
                    console.log("-----------------------------------------------");
                    console.log("Artist: " + response.tracks.items[i].artists[0].name);
                    console.log("The song name is: " + response.tracks.items[i].name);
                    console.log("Here is a song preview from Spotify: " + response.tracks.items[i].preview_url);
                    console.log("The album containing this song is: " + response.tracks.items[i].album.name);
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("\n")
                    songCounter++;
                }
            })
            // Should any error occur, it will be logged to the terminal
            .catch(function (error) {
                console.log(error);
            });
    }
} else if (userInput === "spotify-this-song") {
    spotify.search({ type: 'track', query: searchTerm })
        .then(function (response) {
            var songCounter = 1;
            for (var i = 0; i < response.tracks.items.length; i++) {
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log("-----------------------------------------------");
                if (songCounter === 1) {
                    console.log("TOP RESPONSE");
                }
                else if (songCounter !== 1) {
                    console.log("Song Number: " + songCounter);

                }
                console.log("Artist: " + response.tracks.items[i].artists[0].name);
                console.log("The song name is: " + response.tracks.items[i].name);
                console.log("Here is a song preview from Spotify: " + response.tracks.items[i].preview_url);
                console.log("The album containing this song is: " + response.tracks.items[i].album.name);
                console.log("-----------------------------------------------");
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log("\n");
                songCounter++;
            }
        })
        .catch(function (err) {
            console.log(err);
        })
}











