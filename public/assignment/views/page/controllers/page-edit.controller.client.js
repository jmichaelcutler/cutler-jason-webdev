(function () {
    angular
        .module('WebAppMaker')
        .controller('EditPageController', EditPageController);

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.userId;
        vm.pageId = $routeParams["pageId"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        function init() {
            vm.page = PageService.findPageById(vm.pageId);
        }

        init();

        function updatePage(page) {
            PageService.updatePage(vm.pageId, page);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
        }
    }
})();