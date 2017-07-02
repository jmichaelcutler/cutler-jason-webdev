(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.createPage = createPage;

        function init() {
            PageService
                .findPagesByWebsiteId(model.websiteId)
                .then(function () {
                    model.pages = pages
                }, findPagesError);

            function findPagesError(error) {
                model.message = "An error occurred, pages not found.";
            }
        }

        init();

        function createPage() {
            PageService.createPage(model.websiteId, model.page)
                .then(function () {
                    $location.url = "/user" + model.userId + "/website" + model.websiteId + "/page";
                }, createError);

            function createError(error) {
                model.message = "An error occurred, unable to create page.";
            }
        }
    }
})();