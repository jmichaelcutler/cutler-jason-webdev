(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (websites) {
                    vm.websites = websites;
                }, handleError);

            function handleError(error) {
                vm.message = "An error has occurred, websites cannot be found.";
            }
        }
        init();
    }
})();
