(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, PageService) {
        var vm = this;
        vm.pageId = $routeParams["pageId"];
        function init() {
            vm.page = PageService.findPageById(vm.pageId);
        }

        init();
    }
})();
