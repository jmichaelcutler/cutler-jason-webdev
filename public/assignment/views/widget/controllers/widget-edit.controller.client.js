(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, WidgetService, $location) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.pageId = $routeParams["pageId"];
        model.widgetId = $routeParams["widgetId"];
        var baseURL = "/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget";
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function init() {
            WidgetService
                .findWidgetById(model.widgetId)
                .then(function () {
                    model.page = page;
                }, findPageError);
        }

        init();

        function findPageError(error) {
            model.error = "An error occurred, page could not be found.";
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(model.widgetId)
                .then(function () {
                    $location.url(baseURL);
                }, deleteWidgetError);
        }

        function deleteWidgetError(error) {
            model.error = "An error has occurred, widget could not be deleted."
        }

        function updateWidget() {
            if ((model.currentWidget.widgetType === "HEADING" || model.currentWidget.widgetType === "HTML") &&
                (model.currentWidget.url === null || model.currentWidget.url.$isEmpty())) {
                model.error = "Text required";
            } else if ((model.currentWidget.widgetType === "IMAGE" || model.currentWidget.widgetType === "YOUTUBE") &&
                (model.currentWidget.url === null || model.currentWidget.url.$isEmpty())) {
                model.error = "Invalid URL";
            } else if (model.currentWidget.widgetType = "HEADING" && typeof model.currentWidget.size === "undefined") {
                model.error = "Please define a valid heading size 1-6"
            }
            WidgetService
                .updateWidget(model.widgetId, model.currentWidget)
                .then(function () {
                    $location.url = baseURL;
                }, updateWidgetError);
        }

        function updateWidgetError(error) {
            model.error = "An error occurred, widget not updated.";
        }
    }
})();
