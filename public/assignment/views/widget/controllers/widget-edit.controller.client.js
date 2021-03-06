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
        model.uploadImage = uploadImage;

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
            model.error = "An error has occurred, widget could not be deleted.";
        }

        function updateWidget() {
            if ((model.currentWidget.widgetType === "HEADING" || model.currentWidget.widgetType === "HTML") &&
                (model.currentWidget.url === null || model.currentWidget.url.$isEmpty())) {
                model.error = "Text required";
            } else if ((model.currentWidget.widgetType === "IMAGE" || model.currentWidget.widgetType === "YOUTUBE") &&
                (model.currentWidget.url === null || model.currentWidget.url.$isEmpty())) {
                model.error = "Invalid URL";
            } else if (model.currentWidget.widgetType = "HEADING" && typeof model.currentWidget.size === "undefined") {
                model.error = "Please define a valid heading size 1-6";
            }
            if (model.currentWidget.name === null || typeof model.currentWidget.name === 'undefined') {
                model.message = "Please name your widget!";
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

        function uploadImage() {
            var file = document.getElementById('upload').files[0];
            var form = new FormData();
            form.append("uploadFile", file);
            WidgetService
                .uploadImage(form)
                .then(function (text) {
                    model.currentWidget.url = text;
                    model.message = "Image uploaded.";
                    document.getElementById("upload").value = null;
                }, uploadImageError);

            function uploadImageError(error) {
                model.error = "An error occurred, image not uploaded.";
            }
        }
    }
})();
