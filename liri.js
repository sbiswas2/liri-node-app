var command = process.argv[2];
var input = '';
	for (var i = 3; i < process.argv.length; i++) {
		input += ' ' + process.argv[i];
	}
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


// my-tweets
function myTweets() {
	var client = new Twitter(keys.twitterKeys);

	var params = { screen_name: 'FakeSetu' };
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (error) {
			console.log(error);
			return;
		};

		for (var i = 0; i < 20; i++) {
			var tweetText = tweets[i].text;
			var tweetCreate = tweets[i].created_at;
			console.log(tweetText + ' created on ' + tweetCreate);
		};
	});
};

// spotify-this-song
function getSpotify() {
	 var spotify = new Spotify(keys.spotifyKeys);

	if (input === "" || input === null) {
		input = 'The Sign';
	};

	spotify.search({ type: 'track', query: input }, function(error, data) {
		if (error) {
			console.log(error);
			return;
		};

		console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
		console.log("Song Name: " + data.tracks.items[0].name);
		console.log("Preview Link: " + data.tracks.items[0].preview_url);
		console.log("Album: " + data.tracks.items[0].album.name);
	});
};

// movie-this
function findMovie() {
	if (input === "" || input === null) {
		input = "Mr. Nobody";
	};

	var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=40e9cece";
	request(queryUrl, function(error, response, body) {
	if (error) {
		console.log(error);
		return;
	};

    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
	});
};

// do-what-it-says
function readText () {
	fs.readFile("random.txt", "utf8", function(error, data) {
  	if (error) {
  		console.log(error);
  		return;
  	}

  	var dataArr = data.split(",");
  	command = dataArr[0];
  	input = dataArr[1];
  	switchCase();
	});
};

// switch case
function switchCase() {
	switch (command) {
		case 'my-tweets':
		myTweets();
		break;
		case 'spotify-this-song':
		getSpotify();
		break;
		case 'movie-this':
		findMovie();
		break;
		case 'do-what-it-says':
		readText();
		break;
		default:
		console.log("Please type a proper command");
	};
};

switchCase();
