(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        return {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            uploadImage: uploadImage,
            sortWidget: reorderWidget
        };

        function createWidget(pageId, widget) {
            var url = "/api/assignment/page/" + pageId + "widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/assignment/page/" + pageId + "widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function uploadImage() {
            var url = "/api/assignment/upload";
            return $http.post(url, form, {
                transformRequest: angular.identity,
                headers: {"Content-Type": undefined}
            })
                .then(function (response) {
                    return response.data;
                })
        }

        function reorderWidget(pageId, start, end) {
            var url = "/api/assignment/page/" + pageId + "/widget?start=" + start + "&end=" + end;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();