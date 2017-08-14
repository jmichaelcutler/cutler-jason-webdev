(function () {
    angular
        .module("MusicDBApp")
        .controller("ArtistProfileController", ArtistProfileController);

    function ArtistProfileController($location, $routeParams, UserService) {
        var project = this;
        project.updateUser = updateUser;
        project.deleteUser = deleteUser;
        var artistId = $routeParams["artistId"];

        UserService
            .findUserById(artistId)
            .then(renderUser, handleError);

        function renderUser(response) {
            project.user = response.data;
        }

        function deleteUser(artist) {
            UserService
                .deleteUser(artist._id)
                .then(function () {
                    $location.url('/login');
                }, deleteError);
        }

        function deleteError(error) {
            project.message = "An error occured, artist not deleted.";
        }

        function updateUser(artist) {
            UserService
                .updateUser(artist._id, artist)
                .then(function () {
                    project.message = "Artist updated successfully";
                }, updateError);
        }

        function updateError(error) {
            project.message = "An error occurred, artist was not updated.";
        }
    }

})();