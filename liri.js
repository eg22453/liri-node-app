require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");

//var spotify = new Spotify(keys.spotify);

// Next, we store the text given to us from the command line.
var input1 = process.argv[2];
var input2 = process.argv[3];

var spotify = new Spotify({
    id: "ae22465ed5154cb2b463c3daa3595087",
    secret: "4b2408518685437eb3234f95ba83545a"
});




// `node liri.js movie-this '<movie name here>'`

// * This will output the following information to your terminal/bash window:

//   ```
//     * Title of the movie.
//     * Year the movie came out.
//     * IMDB Rating of the movie.
//     * Rotten Tomatoes Rating of the movie.
//     * Country where the movie was produced.
//     * Language of the movie.
//     * Plot of the movie.
//     * Actors in the movie.
//   ```

// * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


if (input1 === "movie-this") {
    axios.get("http://www.omdbapi.com/?t=remember%20the%20titans&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("The movie's rating is: " + response.data.Title);
            console.log("The movie's rating is: " + response.data.Year);
            console.log("The movie's rating is: " + response.data.Rated);
            console.log("The movie's rating is: " + response.data.Title);
            console.log("The movie's rating is: " + response.data.Country);
            console.log("The movie's rating is: " + response.data.Language);
            console.log("The movie's rating is: " + response.data.Plot);
            console.log("The movie's rating is: " + response.data.Actors);
        }
    );

}

// 1. `node liri.js concert-this <artist/band name here>`
//      * Date of the Event (use moment to format this as "MM/DD/YYYY")

if (input1 === "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=codingbootcamp").then(
        function (response) {
            //console.log();
            //SPACES NEED TO BE ENCODED WITH A "%20" INSIDE OF THE URL
            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.name)
                console.log(response.data[i].venue.city)
                console.log(response.data[i].datetime)
                console.log("")
            }
            if (!input2) {
                console.log("You need to type an artist to search for!")
            }
        }
    );
}


if (input1 === "spotify-this-song") {
    spotify
        .search({
            type: 'track',
            query: 'All the Small Things'
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (err) {
            console.log(err);
        });

}
// 2. `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window

//      * Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.
// spotify.search({
//     type: 'track',
//     query: 'All the Small Things'
// }, function (err, data) {
//     if (err) {
//         return console.log('Error occurred: ' + err);
//     }

//     console.log(data);
// });