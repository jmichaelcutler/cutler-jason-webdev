(function () {
    angular
        .module("MusicDBApp")
        .controller("SearchController", SearchController);

    function SearchController($location, $routeParams, SearchService) {
        var project = this;
        project.findAlbumsByArtist = findAlbumsByArtist;
        project.getAlbumDetails = getAlbumDetails;

        function findAlbumsByArtist() {
            SearchService
                .findAlbumsByArtist(artist)
                .then(function (response) {
                    project.albums = response.data.results;
                    $location("/results");
                });
        }

        function getAlbumDetails(url) {
            SearchService
                .getAlbumDetails(url)
                .then(function (response) {
                    project.album = response.data;
                });
        }
    }
})();