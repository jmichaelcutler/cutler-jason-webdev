(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.userId;
        vm.pageId = $routeParams["pageId"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        function init() {
            PageService.findPageById(vm.pageId)
                .then(function () {
                    vm.page = page;
                }, findPageError);

            function findPageError(error) {
                vm.message = "An error occurred, unable to find page"
            }
        }

        init();

        function updatePage(page) {
            PageService
                .updatePage(vm.pageId, page)
                .then(function () {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
                }, updatePageError);

            function updatePageError(error) {
                vm.message = "An error occurred, unable to update page";
            }
        }

        function deletePage() {
            PageService.deletePage(vm.pageId)
                .then(function () {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
                }, deletePageError);

            function deletePageError(error) {
                vm.message = "An error occurred, unable to delete page";
            }
        }
    }
})();