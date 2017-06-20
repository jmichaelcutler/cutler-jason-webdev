(function () {
    angular
        .module('WebAppMaker')
        .controller('NewPageController', NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        vm.websiteId = $routeParams["websiteId"];
        vm.createPage = createPage;

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        }

        init();

        function createPage() {
            PageService.createPage(vm.websiteId, vm.page);
        }
    }
})();