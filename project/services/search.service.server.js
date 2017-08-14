var app = require('../../express');

app.get("/api/project/results", findAlbumsByArtist);

var key = process.env[DISCOGS_KEY];
var secret = process.env.DISCOGS_SECRET;
var baseURL = "https://api.discogs.com";

function findAlbumsByArtist($http, artist) {
    var discogUrl = baseURL + "/database/search?artist=" + artist + "&key=" + key + "&secret=" + secret;
    return $http.get(discogUrl)
        .then(function (response) {
            return response;
        });
}