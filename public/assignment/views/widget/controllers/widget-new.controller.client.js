(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($location, WidgetService, $routeParams) {

        var vm = this;
        vm.userId = $routeParams["userId"];
        vm.websiteId = $routeParams["websiteId"];
        vm.pageId = $routeParams["pageId"];
        vm.widgetType = $routeParams["widgetType"];
        vm.createWidget = createWidget;

        function createWidget() {
            vm.message = null;
            vm.error = null;
            if (vm.currentWidget === null || typeof vm.currentWidget === 'undefined' || vm.currentWidget === '') {
                vm.currentWidget = {
                    widgetType: vm.widgetType
                };
            }
            vm.currentWidget.widgetType = vm.widgetType;
            if ((vm.currentWidget.widgetType === 'HEADING' || vm.currentWidget.widgetType === 'HTML') && (vm.currentWidget.text === null || typeof vm.currentWidget.text === 'undefined' || vm.currentWidget.text === '')) {
                vm.error = "Text cannot be null for headings or HTML";
                $anchorScroll('top');
                return;
            }
            else if ((vm.currentWidget.widgetType === 'IMAGE' || vm.currentWidget.widgetType === 'YOUTUBE') && (vm.currentWidget.url === null || typeof vm.currentWidget.url === 'undefined' || vm.currentWidget.url === '')) {
                vm.error = "Invalid URL";
                $anchorScroll('top');
                return;
            }
            if (vm.currentWidget.widgetType === 'HEADING' && typeof vm.currentWidget.size === 'undefined') {
                vm.error = "Size for heading must be valid";
                $anchorScroll('top');
                return;
            }
            WidgetService.createWidget(vm.pageId, vm.currentWidget)
                .then(function () {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
                }, createWidgetError);
        }

        function createWidgetError(error) {
            vm.error = "An error occurred, widget was not created.";
        }
    }
})();
