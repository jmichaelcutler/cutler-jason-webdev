(function () {
    angular
        .module("projectPocApp", [])
        .controller("pocController", pocController);

    // var key = process.env.DISCOGS_KEY;
    // var secret = process.env.DISCOGS_SECRET;
    var baseURL = "https://api.discogs.com";

    function pocController($http) {
        var model = this;
        model.findAlbumsByArtist = findAlbumsByArtist;
        model.getAlbumDetails = getAlbumDetails;

        function findAlbumsByArtist(artist) {
            // var url = baseURL + "/database/search?artist=" + artist + "&key=" + key + "&secret=" + secret;
            // Localhost usage
            var url = baseURL + "/database/search?artist=" + artist + "&key=" + "TQXhPZmGqmBaRlXRnrzK&secret=PLueRMKjkJPDtSejLSbgxWMNKtctoEeW";
            $http.get(url)
                .then(function (response) {
                    console.log(response);
                    model.albums = response.data.results;
                });
        }

        function getAlbumDetails(url) {
            $http.get(url)
                .then(function (response) {
                    console.log(response);
                    model.album = response.data;
                });
        }
    }


})();
