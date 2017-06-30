(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        vm.websiteId = $routeParams["websiteId"];
        vm.createPage = createPage;

        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function () {
                    vm.pages = pages
                }, findPagesError);

            function findPagesError(error) {
                vm.message = "An error occurred, pages not found.";
            }
        }

        init();

        function createPage() {
            PageService.createPage(vm.websiteId, vm.page)
                .then(function () {
                    $location.url = "/user" + vm.userId + "/website" + vm.websiteId + "/page";
                }, createError);

            function createError(error) {
                vm.message = "An error occurred, unable to create page.";
            }
        }
    }
})();