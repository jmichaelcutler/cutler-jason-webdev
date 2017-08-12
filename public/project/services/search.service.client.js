(function () {
    angular
        .module("MusicDBApp")
        .factory("SearchService", SearchService);

    function SearchService() {

        var key = process.env.DISCOGS_KEY;
        var secret = process.env.DISCOGS_SECRET;
        var baseURL = "https://api.discogs.com";

        return {
            findAlbumsByArtist: findAlbumsByArtist,
            getAlbumDetails: getAlbumDetails
        };

        function findAlbumsByArtist(artist) {
            var url = baseURL + "/database/search?artist=" + artist + "&key=" + key + "&secret=" + secret;
            $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getAlbumDetails(url) {
            $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();