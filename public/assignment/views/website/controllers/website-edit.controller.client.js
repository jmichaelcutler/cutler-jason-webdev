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
                model.message = "An error occurred, could not find website"
            }

            // model.website = WebsiteService.findWebsiteById(model.websiteId);
        }

        init();

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(model.websiteId, website)
                .then(function () {
                    $location.url = "/user/" + model.userId + "/website"
                }, updateWebsiteError);

            function updateWebsiteError(error) {
                model.message = "An error occurred, could not update website.";
            }

            // WebsiteService.updateWebsite(model.websiteId, website);
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(model.websiteId)
                .then(function () {
                    location.url = "/user/" + model.userId + "/website"
                }, deleteError);

            function deleteError(error) {
                model.message = "An error occurred, could not delete website.";
            }

            // WebsiteService.deleteWebsite(model.websiteId);
        }
    }
})();