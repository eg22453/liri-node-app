require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require("fs");

//var spotify = new Spotify(keys.spotify);
var spotify = new Spotify({
    id: "ae22465ed5154cb2b463c3daa3595087",
    secret: "4b2408518685437eb3234f95ba83545a"
});

// Next, we store the text given to us from the command line.
var input1 = process.argv[2];
var input2 = process.argv[3];


function userCommand(input1, input2) {
    switch (input1) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            dowhatitssays()
            break;
        default:
            console.log("You have not entered a valid key")
            break;
    }
}

userCommand(input1, input2)

function dowhatitssays() {
    //Do the code for this method/command
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error)
        }
        var balanceArray = data.split(",");
        input1 = balanceArray[0];
        console.log(input1)
        input2 = balanceArray[1]
        console.log(input2)
        userCommand(input1, input2)
        // userchoice(input1,input2)
    })
}

//movie-this <movie title> command, spaces need to have a + sign or %20
function movieThis() {
    //If no movie is input than Mr. Nobody will be the default movie
    if (!input2) {
        input2 = "Mr.+Nobody"
    }
    //console.log(input2)
    axios.get("http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("The movie's Title is: " + response.data.Title);
            console.log("The movie's premiere year is: " + response.data.Year);
            console.log("The movie's IMBD rating is: " + response.data.Ratings[0].Value);
            console.log("The movie's Rotten Tomatoes score is: " + response.data.Ratings[1].Value);
            console.log("The movie's Country of origin is: " + response.data.Country);
            console.log("The movie's inherent Language is: " + response.data.Language);
            console.log("The movie's Plot: " + response.data.Plot);
            console.log("The Actors in the Movie: " + response.data.Actors);
        }

    );

}

//function for finding concert information
//called in switch statement if input 1 is appropriate
function concertThis() {
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



//function to display spotifytracks
function spotifyThisSong() {
    spotify
        .search({
            type: 'track',
            query: 'All+the+Small+Things'
        })
        .then(function (response) {
            //console.log(response);
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