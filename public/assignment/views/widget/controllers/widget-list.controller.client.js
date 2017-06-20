(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetListController', WidgetListController);

    function WidgetListController($routeParams, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams["pageId"];
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }

        init();
    }
})();