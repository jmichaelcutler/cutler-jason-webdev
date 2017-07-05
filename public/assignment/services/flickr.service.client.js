(function () {
    angular
        .module("WebAppMaker")
        .service("FlickrService", FlickrService);

    function FlickrService($http) {

        this.searchPhotos = searchPhotos;
        var key = "bcb5ce817ba1efca240c61ba3e533d5f";
        var secret = "d5f1ad07483d8c36";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search &format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();
