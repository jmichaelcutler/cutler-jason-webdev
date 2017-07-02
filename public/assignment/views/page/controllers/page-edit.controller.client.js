(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location, PageService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.userId;
        model.pageId = $routeParams["pageId"];
        model.updatePage = updatePage;
        model.deletePage = deletePage;
        function init() {
            PageService.findPageById(model.pageId)
                .then(function () {
                    model.page = page;
                }, findPageError);

            function findPageError(error) {
                model.message = "An error occurred, unable to find page"
            }
        }

        init();

        function updatePage(page) {
            PageService
                .updatePage(model.pageId, page)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                }, updatePageError);

            function updatePageError(error) {
                model.message = "An error occurred, unable to update page";
            }
        }

        function deletePage() {
            PageService.deletePage(model.pageId)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                }, deletePageError);

            function deletePageError(error) {
                model.message = "An error occurred, unable to delete page";
            }
        }
    }
})();