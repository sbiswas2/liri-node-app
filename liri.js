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
	// having problem with this
	var client = new Twitter(keys.twitterKeys);
	// var client = new Twitter({
	// 	consumer_key: 'mL6CubL42S1n6GMnGgCM8aHIY',
	// 	consumer_secret: '4h9sPc72fNzG12bvf1qUsySe3Pnxc5jGrwsPTHrUmVWRjPUcZH',
	// 	access_token_key: '916754027702050817-Yi3wBu5ujDJHTCL7bIqSXKSRUGX4ZCr',
	// 	access_token_secret: 'C8U58ZJ4MXcYoCzGdR9XFSO10a49mFODDyNioIRKxLmPH',
	// });

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
		}
	});
};

// spotify-this-song
function getSpotify() {
	//  having problem with this
	 var spotify = new Spotify(keys.spotifyKeys);
	// var spotify = new Spotify({
	// 	id: 'af606e4bbe09447db7752de7d9902a62',
	// 	secret: 'c4496d7453d94ef99894c9868428b73d'
	// });

	if (input === " " || input === null) {
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
	if (input === null) {
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
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
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
  	input = dataArr[1];
  	getSpotify();

	});
};

// switch case for functions
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
};
