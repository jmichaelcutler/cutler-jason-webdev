(function () {
    angular
        .module("MusicDbApp")
        .controller("AdminArtistsController", AdminArtistsController);

    function AdminArtistsController($location, UserService) {
        var project = this;
        project.findAllArtists = findAllArtists;
        project.deleteArtist = deleteArtist;

        function findAllArtists() {
            UserService
                .findAllArtists()
                .then(function (response) {
                    project.artists = response.data;
                }, function (error) {
                    project.message = "An error occurred, artists not retrieved."
                });
        }

        function deleteArtist(artist) {
            UserService
                .deleteUser(artist._id)
                .then(function () {
                    $location.url('/admin/artist');
                }, function (error) {
                    project.message = "An error occurred, artist not deleted."
                });
        }
    }
})();