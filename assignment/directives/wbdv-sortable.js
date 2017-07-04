(function () {
    angular
        .module("WebAppMaker")
        .directive("wdSortable", sortWidget);

    function sortWidget($http) {
        return {
            link: linkFunction
        };

        function linkFunction(scope, element, attrs) {
            $(element).sortable({
                start: function (event, ui) {
                    scope.error = null;
                    ui.item.startPos = ui.item.index();
                },
                update: function (event, ui) {
                    var url = "/api/assignment/page/" + attrs.pageId + "/widget?initial=" + ui.item.startPos + "&final=" + ui.item.index();
                    $http.put(url)
                        .then(function () {
                        }, function () {
                            scope.error = "An error has occurred, no changes made";
                            $(element).sortable("cancel");
                        })
                }
            });
        }
    }


})();