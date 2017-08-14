var mongoose = require('mongoose');

var playlistSchema = mongoose.Schema({
    name: String,
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    _songs: [{type: mongoose.Schema.Types.ObjectId, ref: "SongModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "playlist"});

module.exports = playlistSchema;