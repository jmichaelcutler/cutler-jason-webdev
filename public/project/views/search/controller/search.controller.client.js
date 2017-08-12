(function () {
    angular
        .module("MusicDBApp")
        .controller("SearchController", SearchController);

    function SearchController(SearchService) {
        var project = this;
        project.findAlbumsByArtist = findAlbumsByArtist;
        project.getAlbumDetails = getAlbumDetails;

        function findAlbumsByArtist(artist) {
            SearchService
                .findAlbumsByArtist(artist)
                .then(function (response) {
                    project.albums = response.data.results;
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