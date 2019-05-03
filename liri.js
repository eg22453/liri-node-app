require("dotenv").config();
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// Next, we store the text given to us from the command line.
var usercommand = process.argv[2];
var userinput = process.argv[3];