var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    //TODO add google properties
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    dateCreated: {type: Date, default: Date.now}
    // TODO Add playlists
    // TODO Add reviews
}, {collection: "person"});

module.exports = userSchema;