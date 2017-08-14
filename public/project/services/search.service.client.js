(function () {
    angular
        .module("MusicDBApp")
        .factory("SearchService", SearchService);

    function SearchService($http) {

        return {
            findAlbumsByArtist: findAlbumsByArtist,
            getAlbumDetails: getAlbumDetails
        };

        function findAlbumsByArtist(artist) {
            var url = "/api/project/results";
            $http.get(url, artist)
                .then(function (response) {
                    return response.data.results;
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