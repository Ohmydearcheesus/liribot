var fs = require("fs");
// var env = require(".env").config();
var keys = require("./keys.js");
// var spotify = require("./spotify.js");
var axios = require("axios");
var divider = "----------------------------------------";

var search = process.argv[2];
var query = process.argv[3];

// -----------------------------------------------------------
// ---------------------- FUNCTIONS --------------------------
// -----------------------------------------------------------

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

if ((search = "concert-this")) {
  // use bandsintown API
}

if ((search = "spotify-this-song")) {
  // use spotify API
}

if ((search = "movie-this")) {
  searchShow();
}