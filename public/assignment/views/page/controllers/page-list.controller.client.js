(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        vm.websiteId = $routeParams(["websiteId"]);
        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function () {
                    vm.pages = pages
                }, findPagesError);

            function findPagesError(error) {
                vm.message = "An error has occurred, unable to find pages.";
            }
        }

        init();
    }
})();
