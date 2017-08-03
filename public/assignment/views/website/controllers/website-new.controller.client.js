(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(model.userId)
                .then(function () {
                    model.websites = websites
                }, findWebsiteError);
            function findWebsiteError(error) {
                model.message = "An error has occurred, websites could not be loaded.";
            }
        }

        init();

        function createWebsite(name, description) {
            if (!name) {
                model.message = "Please provide a name for your website";
            } else {
                var newWebsite = {
                    name: name,
                    description: description
                };
                WebsiteService
                    .createWebsite(model.userId, newWebsite)
                    .then(listWebsite, createWebsiteError);

                function listWebsite(newSite) {
                    if (newSite !== null) {
                        $location.url = "/user/" + model.userId + "website";
                    } else {
                        model.message = "Website not created";
                    }
                }

                function createWebsiteError(error) {
                    model.message = "An error occurred, could not create website.";
                }
            }
        }


    }
})();