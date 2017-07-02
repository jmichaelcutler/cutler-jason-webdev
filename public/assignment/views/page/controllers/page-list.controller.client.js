(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams(["websiteId"]);
        function init() {
            PageService
                .findPagesByWebsiteId(model.websiteId)
                .then(function () {
                    model.pages = pages
                }, findPagesError);

            function findPagesError(error) {
                model.message = "An error has occurred, unable to find pages.";
            }
        }

        init();
    }
})();
