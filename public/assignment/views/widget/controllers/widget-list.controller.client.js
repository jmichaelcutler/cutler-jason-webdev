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
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function trustHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function trustImage(url) {
            return $sce.trustAsUrl(url);
        }

        function embedYouTube(url) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = url.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-' + type.toLowerCase() + '.view.client.html';
        }
    }
})();