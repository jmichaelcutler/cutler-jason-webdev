(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($location, WidgetService, $routeParams) {

        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.pageId = $routeParams["pageId"];
        model.widgetType = $routeParams["widgetType"];
        model.createWidget = createWidget;
        model.uploadImage = uploadImage;

        function createWidget() {
            model.message = null;
            model.error = null;
            if (model.currentWidget.name === null || typeof model.currentWidget.name === 'undefined') {
                model.message = "Please provide a name for your widget!";
            }
            if (model.currentWidget === null || typeof model.currentWidget === 'undefined' || model.currentWidget === '') {
                model.currentWidget = {
                    widgetType: model.widgetType
                };
            }
            model.currentWidget.widgetType = model.widgetType;
            if ((model.currentWidget.widgetType === 'HEADING' || model.currentWidget.widgetType === 'HTML') && (model.currentWidget.text === null || typeof model.currentWidget.text === 'undefined' || model.currentWidget.text === '')) {
                model.error = "Text cannot be null for headings or HTML";
                $anchorScroll('top');
                return;
            }
            else if ((model.currentWidget.widgetType === 'IMAGE' || model.currentWidget.widgetType === 'YOUTUBE') && (model.currentWidget.url === null || typeof model.currentWidget.url === 'undefined' || model.currentWidget.url === '')) {
                model.error = "Invalid URL";
                $anchorScroll('top');
                return;
            }
            if (model.currentWidget.widgetType === 'HEADING' && typeof model.currentWidget.size === 'undefined') {
                model.error = "Size for heading must be valid";
                $anchorScroll('top');
                return;
            }
            WidgetService.createWidget(model.pageId, model.currentWidget)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                }, createWidgetError);
        }

        function createWidgetError(error) {
            model.error = "An error occurred, widget was not created.";
        }

        function uploadImage() {
            var file = document.getElementById("upload").files[0];
            var form = new FormData();
            form.append("uploadFile", file);
            WidgetService
                .uploadImage(form)
                .then(function (text) {
                    model.currentWidget.url = text;
                    model.message = "Image uploaded";
                    document.getElementById("upload").value = null;
                }, uploadImageError);

            function uploadImageError(error) {
                model.message = "An error occurred, image not uploaded";
            }
        }
    }
})();
