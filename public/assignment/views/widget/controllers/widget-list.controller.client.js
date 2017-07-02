(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);
    function WidgetListController($routeParams, $sce, WidgetService) {
        var model = this;
        model.userID = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.trustHtml = trustHtml;
        model.embedYouTube = embedYouTube;
        model.trustImage = trustImage;
        model.getWidgetUrlForType = getWidgetUrlForType;

        function init() {
            WidgetService
                .findWidgetsByPageId(model.pageId)
                .then(function () {
                    model.widgets = widgets;
                }, findWidgetError);
        }
        init();

        function findWidgetError(error) {
            model.error = "An error occurred, unable to find widgets.";
        }

        function trustHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function trustImage(url) {
            return $sce.trustAsUrl(url);
        }

        function embedYouTube(url) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = url.split('/');
            embedUrl += youTubeLinkParts[youTubeLinkParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-' + type.toLowerCase() + '.view.client.html';
        }
    }
})();