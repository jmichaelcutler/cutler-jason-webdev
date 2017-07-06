(function () {
    angular
        .module("WebAppMaker")
        .directive("wbdvDirectives", sortWidget);

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
                    var initial = ui.item.startPos;
                    var final = ui.item.index();
                    var url = "/api/assignment/page/" + attrs.pageId + "/widget?initial=" + initial + "&final=" + final;
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