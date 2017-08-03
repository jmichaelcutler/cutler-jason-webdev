(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($location, FlickrService, WidgetService) {
        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    var data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                }, flickrError);

            function flickrError(error) {
                model.error = "There was an error connecting with Flickr";
            }
        }

        function selectPhoto() {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService
                .updateWidget(websiteId, pageId, widgetId, {url: url})
                .then(function (response) {
                }, selectPhotoError);

            function selectPhotoError(error) {
                model.message = "An error selecting a photo has occurred";
            }
        }

    }
})();
