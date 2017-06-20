(function () {
    angular
        .module("WepAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        vm.websiteId = $routeParams(["websiteId"]);
        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        }

        init();
    }
})();
