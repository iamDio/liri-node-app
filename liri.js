// console.log('im starting')

const prettyjson = require('prettyjson');
const fs = require('fs');
const omdb = require('omdb');
const request = require('request');
const Twitter = require('twitter');
const keys = require('./keys.js');

var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});

var params = {
    screen_name: 'mustardsnackk',
    count: 20
};

//variables to grab user input 
const userTweets = process.argv[3];
const spotSong = process.argv[4];
var movieName = process.argv.slice(2).join(' ');
const doit = process.argv[5];

if (userTweets === 'my-tweets') {
    client.get('statuses/user_timeline', params, (error, tweets, response) => {

        //console.log(response);
        for (var i = 0; i < tweets.length; i++) {
           console.log('-------------------');
            var callResults = ('Number ' + (i + 1) + '\n' + tweets[i].created_at + '\n' + '@' + tweets[i].user.name + '\n' + tweets[i].text + '\n')
            console.log(callResults);
            console.log('-------------------');
        }
    });
}

if (spotSong === 'spotify-this-song') {
    //console.log something s
    //show artist, songs name, preview link and album name from spotify in console
    //if no song is provided default ot the sign by ace of base
}

//shows information about the movie Mr. Nobody if no title is entered
if (!movieName) {
    movieName = 'Mr. Nobody';
    logInfo();
    //shows information about the movie name entered
} else if (movieName) {
    logInfo();
}


if (doit === 'do-what-it-says') {}
//console.log something
// us fs node package to take the text inside random.txt and show i want it that way


//function that runs the request to the OMDB API
function logInfo() {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=40e9cece";

    request(queryUrl, function(error, response, body) {
        if (error) {
            return console.error('error:', error); // Print the error if one occurred 
        }
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        console.log('+============================+')
        const responseJson = JSON.parse(body);
        console.log(responseJson.Title)
        console.log('Realease Year: ' + responseJson.Year);
        console.log('Plot: ' + responseJson.Plot);
        console.log('Actors: ' + responseJson.Actors);
        console.log('Language: ' + responseJson.Language);
        console.log('Country: ' + responseJson.Country);
        console.log('IMDB Rating: ' + responseJson.imdbRating);
        console.log('Rotten Tomatoes URL: ' + responseJson.tomatoURL);


    const log = '\ntitle: '+ responseJson.Title + '\nRealease Year: ' + responseJson.Year + '\nPlot: ' + responseJson.Plot + '\nActors: ' + responseJson.Actors + '\nLanguage: ' + responseJson.Language + '\nCountry: ' + responseJson.Country +'\nIMDB Rating: ' + responseJson.imdbRating + '\nRotten Tomatoes URL: ' + responseJson.tomatoURL + '\n'+userTweets + '\n';
          
        fs.appendFile('log.txt', log, (err)=> {
        	if (err) throw err;
        });
    });
}
