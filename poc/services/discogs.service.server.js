var q = require(q);

const app = require("../../express.js");
const https = require("https");
const querystring = require("querystring");

var lastfmAPI = require("lastfmapi");

var lfm = new lastfmAPI({
    'api_key': process.env.DISCOGS_KEY,
    'secret': process.env.DISCOGS_SECRET,
    'req_token_url': process.env.DISCOGS_REQ_TOKEN_URL,
    'auth_url': process.env.DISCOGS_AUTH_URL,
    'access_token_url': process.env.DISCOGS_ACCESS_TOKEN_URL
});
