(function () {
    angular
        .module("WebAppMaker")
        .directive("wdSortable", sortWidget);

    function sortWidget($http) {
        //TODO
        return {
            link: linkFunction
        };

        function linkFunction(scope, element, attrs) {
            $(element).sortable();
        }
    }


})();