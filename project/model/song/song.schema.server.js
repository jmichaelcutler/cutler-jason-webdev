var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
    url: String,
    title: String,
    genre: String,
    releaseYear: Number,
    label: String,
    _reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "ReviewModel"}],
    _artist: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "song"});

module.exports = songSchema;