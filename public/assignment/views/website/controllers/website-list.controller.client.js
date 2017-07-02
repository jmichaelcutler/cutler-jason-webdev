(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var model = this;
        model.userId = $routeParams["userId"];
        function init() {
            WebsiteService
                .findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                }, handleError);

            function handleError(error) {
                model.message = "An error has occurred, websites cannot be found.";
            }
        }
        init();
    }
})();
