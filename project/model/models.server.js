module.exports = function () {
    var mongoose = require('mongoose');

    mongoose.Promise = require('q').Promise;

    var connectionString = 'mongodb://localhost/test';

    if (process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
        var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
        var password = process.env.MLAB_PASSWORD_WEBDEV;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds143141.mlab.com:43141/heroku_dr1f97kl'; // user yours
    }

    mongoose.connect(connectionString);

    return {
        userModel: require("./user/user.model.server")(),
        websiteModel: require("./artist/artist.model.server")(),
        pageModel: require("./song/song.model.server")(),
        widgetModel: require("./playlist/playlist.model.server")()
    };
};
