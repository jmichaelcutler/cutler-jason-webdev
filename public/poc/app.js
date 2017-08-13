(function () {
    angular
        .module("projectPocApp", ['ngRoute'])
        .controller("pocController", pocController);

    function pocController($http) {
        var model = this;
        model.findAlbumsByArtist = findAlbumsByArtist;
        model.getAlbumDetails = getAlbumDetails;

        function findAlbumsByArtist(artist) {
            var url = "/api/results";
            // Localhost usage
            // var url = baseURL + "/database/search?artist=" + artist + "&key=" + "TQXhPZmGqmBaRlXRnrzK&secret=PLueRMKjkJPDtSejLSbgxWMNKtctoEeW";
            $http.get(url, artist)
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
