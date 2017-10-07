var command = process.argv[2];
var input = '';
	for (var i = 3; i < process.argv.length; i++) {
		input += ' ' + process.argv[i];
	}
var request = require('request');
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var keys = require('./keys.js');

// my-tweets
function myTweets() {
	var client = new twitter(keys.twitterKeys);
	var parameters = { screen_name: 'FakeSetu', count: 20 };
	client.get('statuses/user_timeline', parameters, function(error, tweets, response) {
		if (error) {
			console.log(error);
		}

		for (var i = 0; i < tweets.length; i++) {
			var tweetText = tweets[i].text;
			var tweetCreate = tweets[i].created_at;
			console.log(tweetText + 'created on' + tweetCreate);
		}
	});
};

// spotify-this-song

// movie-this

// do-what-it-says

// switch case for functions
switch (command) {
	case 'my-tweets':
		myTweets();
		break;
	case 'spotify-this-song':

	case 'movie-this':

	case 'do-what-it-says':
}


