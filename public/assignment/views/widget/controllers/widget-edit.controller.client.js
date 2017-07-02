(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        vm.websiteId = $routeParams["websiteId"];
        vm.pageId = $routeParams["pageId"];
        vm.widgetId = $routeParams["widgetId"];
        var baseURL = "/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget";
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function () {
                    vm.page = page;
                }, findPageError);
        }

        init();

        function findPageError(error) {
            vm.error = "An error occurred, page could not be found.";
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function () {
                    $location.url(baseURL);
                }, deleteWidgetError);
        }

        function deleteWidgetError(error) {
            vm.error = "An error has occurred, widget could not be deleted."
        }

        function updateWidget() {
            if ((vm.currentWidget.widgetType === "HEADING" || vm.currentWidget.widgetType === "HTML") &&
                (vm.currentWidget.url === null || vm.currentWidget.url.$isEmpty())) {
                vm.error = "Text required";
            } else if ((vm.currentWidget.widgetType === "IMAGE" || vm.currentWidget.widgetType === "YOUTUBE") &&
                (vm.currentWidget.url === null || vm.currentWidget.url.$isEmpty())) {
                vm.error = "Invalid URL";
            } else if (vm.currentWidget.widgetType = "HEADING" && typeof vm.currentWidget.size === "undefined") {
                vm.error = "Please define a valid heading size 1-6"
            }
            WidgetService
                .updateWidget(vm.widgetId, vm.currentWidget)
                .then(function () {
                    $location.url = baseURL;
                }, updateWidgetError);
        }

        function updateWidgetError(error) {
            vm.error = "An error occurred, widget not updated.";
        }
    }
})();
