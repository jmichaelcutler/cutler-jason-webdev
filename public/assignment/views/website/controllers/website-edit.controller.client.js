(function () {
    angular
        .module("WebAppMaker")
        .controller('EditWebsiteController', EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService) {
        var model = this;
        model.websiteId = $routeParams["websiteId"];
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(model.websiteId)
                .then(function () {
                    model.websites = websites
                }, findWebsiteError);

            function findWebsiteError(error) {
                model.message = "An error occurred, could not find website";
            }
        }

        init();

        function updateWebsite(website) {
            if (website.name === null || typeof website.name === 'undefined') {
                model.message = "Please provide a name for your website.";
            }
            WebsiteService
                .updateWebsite(model.websiteId, website)
                .then(function () {
                    $location.url = "/user/" + model.userId + "/website";
                }, updateWebsiteError);

            function updateWebsiteError(error) {
                model.message = "An error occurred, could not update website.";
            }
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(model.websiteId)
                .then(function () {
                    location.url = "/user/" + model.userId + "/website";
                }, deleteError);

            function deleteError(error) {
                model.message = "An error occurred, could not delete website.";
            }
        }
    }
})();