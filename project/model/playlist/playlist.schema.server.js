var mongoose = require('mongoose');

var playlistSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
    _songs: [{type: mongoose.Schema.ObjectId, ref: "SongModel"}]
}, {collection: "playlist"});

module.exports = playlistSchema;