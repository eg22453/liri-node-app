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




// axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
//     function (response) {
//         console.log("The movie's rating is: " + response.data.imdbRating);
//         console.log(response.data)
//     }
// );

// 1. `node liri.js concert-this <artist/band name here>`
//      * Date of the Event (use moment to format this as "MM/DD/YYYY")

if (input1 === "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=codingbootcamp").then(
        function (response) {
            //console.log();
            //SPACES NEED TO BE ENCODED WITH A "%20" INSIDE OF THE URL
            for (var i =0; i<response.data.length; i++){
                console.log(response.data[i].venue.name)
                console.log(response.data[i].venue.city)
                console.log(response.data[i].datetime)
                console.log("")
            }
            if (!input2){
                console.log("You need to type an artist to search for!")
            }
        }
    );
}


// spotify.search({
//     type: 'track',
//     query: 'All the Small Things'
// }, function (err, data) {
//     if (err) {
//         return console.log('Error occurred: ' + err);
//     }

//     console.log(data);
// });