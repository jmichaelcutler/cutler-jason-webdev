var mongoose = require("mongoose");
var songSchema = require("song.schema.server");
var songModel = mongoose.model("SongModel", songSchema);

songModel.createSong = createSong;
songModel.findAllSongsforArtist = findAllSongsForArtist;
songModel.findSongById = findSongById;
songModel.updateSong = updateSong;
songModel.deleteSong = deleteSong;

function createSong(artist, song) {
    song._artist = artist;
    return songModel.create(song);
}

function findAllSongsForArtist(artistId) {
    return songModel
        .find({_artist: artistId})
        .populate("_song")
        .exec();
}

function findSongById(songId) {
    return songModel.findById(songId);
}

function updateSong(songId, song) {
    return songModel.update({_id: songId}, {
        $set: {
            url: song.url,
            title: song.title,
            genre: song.genre,
            releaseYear: song.releaseYear,
            label: song.label,
            _reviews: song._reviews,
            _artist: song._artist
        }
    });
}