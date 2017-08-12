var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
    content: String,
    rating: {type: Number, min: 0, max: 5},
    _song: {type: mongoose.Schema.Types.ObjectId, ref: "SongModel"},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "review"});

module.exports = reviewSchema;