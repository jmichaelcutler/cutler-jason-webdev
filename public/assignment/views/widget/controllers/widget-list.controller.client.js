(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);
    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.userID = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.trustHtml = trustHtml;
        vm.embedYouTube = embedYouTube;
        vm.trustImage = trustImage;
        vm.getWidgetUrlForType = getWidgetUrlForType;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function () {
                    vm.widgets = widgets;
                }, findWidgetError);
        }
        init();

        function findWidgetError(error) {
            vm.error = "An error occurred, unable to find widgets.";
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