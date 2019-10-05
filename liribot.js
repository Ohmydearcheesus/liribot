var fs = require("fs");
// var env = require().config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var divider = "----------------------------------------";

var search = process.argv[2];
var query = process.argv[3];

// -----------------------------------------------------------
// ---------------------- FUNCTIONS --------------------------
// -----------------------------------------------------------

////////////////////// Concert Search ////////////////////////
function searchBands() {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    query +
    "/events?app_id=codingbootcamp";

  axios
    .get(queryUrl)
    .then(function(response) {
      console.log(
        "Venue Name : " +
          response.data[0].venue.name +
          "\n\nVenue Location: " +
          response.data[0].venue.city +
          ", " +
          response.data[0].venue.country +
          "\n\nEvent Date: " +
          response.data[0].datetime
      );
    })
    .catch(function(error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

////////////////////// Spotify Search

function searchSong() {
  var spotify = new Spotify({
    id: "d66d00d52a3b44af8580a35a1a195dd6",
    secret: "2e06595fe40e47ed93a6208e945f9506"
  });

  spotify.search({ type: "track", query }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log(data.tracks.items[0]);

    console.log(
      data.tracks.items[0].album.artists[0].available_markets.name +
        " " +
        data.tracks.items[0].name +
        " " +
        data.tracks.items[0].album.external_urls.url +
        " "
    );
  });
}

/////////////////////// Movie Search /////////////////////////
function searchShow() {
  var queryUrl =
    "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";

  axios
    .get(queryUrl)
    .then(function(response) {
      // console.log(response);
      console.log(
        "Title: " +
          response.data.Title +
          "\n\nYear: " +
          response.data.Year +
          "\n\nIMDB Reviews: " +
          response.data.Ratings[0].Value +
          "\n\nRotten Tomatoes Reviews: " +
          response.data.Ratings[1].Value +
          "\n\nCountry: " +
          response.data.Country +
          "\n\nLanguage: " +
          response.data.Language +
          "\n\nPlot: " +
          response.data.Plot +
          "\n\nActors: " +
          response.data.Actors +
          "\n\n" +
          divider
      );
    })
    .catch(function(error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

// -----------------------------------------------------------
// -------------------- RUN APP LOGIC ------------------------
// -----------------------------------------------------------

if (search === "concert-this") {
  searchBands();
}

if (search === "spotify-this-song") {
  searchSong();
}

if (search === "movie-this") {
  searchShow();
}

// Still needs to....
// Utilize .env
// Set default searches (use if statements and check for empty search var)
// implement do-what-it-says
