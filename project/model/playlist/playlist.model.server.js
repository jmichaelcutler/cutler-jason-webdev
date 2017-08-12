var mongoose = require('mongoose');
var playlistSchema = require('playlist.schema.server');
var playlistModel = mongoose.model("PlaylistModel", playlistSchema);

playlistModel.createPlaylist = createPlaylist;
playlistModel.findAllPlaylistsForUser = findAllPlaylistsForUser;
playlistModel.findPlaylistById = findPlaylistById;
playlistModel.updatePlaylist = updatePlaylist;
playlistModel.deletePlaylist = deletePlaylist;


function createPlaylist(userId, playlist) {
    playlist._user = userId;
    return playlistModel.create(playlist);
}

function findAllPlaylistsForUser(userId) {
    return playlistModel
        .find({_user: userId})
        .populate("_user")
        .exec();
}

function findPlaylistById(playlistId) {
    return playlistModel.findById(playlistId);
}

function updatePlaylist(playlistId, playlist) {
    return playlistModel.update({_id: playlistId}, {
        $set: {
            name: playlist.name,
            _user: playlist._user,
            description: playlist.description,
            _songs: playlist.songs
        }
    });
}

function deletePlaylist(playlistId) {
    return playlistModel.remove({_id: playlistId});
}