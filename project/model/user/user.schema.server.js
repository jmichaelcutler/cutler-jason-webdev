var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    roles: {type: String, default: 'USER', enum: ['USER', 'ARTIST', 'ADMIN']},
    dateCreated: {type: Date, default: Date.now},
    _playlists: [{type: mongoose.Schema.Types.ObjectId, ref: "PlaylistModel"}],
    _reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "ReviewModel"}]
}, {collection: "user"});

module.exports = userSchema;