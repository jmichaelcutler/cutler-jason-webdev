(function () {
    angular
        .module('WebAppMaker')
        .controller('EditPageController', EditPageController);
    angular
        .module("WebAppMaker")
        .controller('ListPageController', ListPageController);
    angular
        .module("WebAppMaker")
        .controller('NewPageController', NewPageController);

    function EditPageController() {
        var vm = this;
    }

    function ListPageController() {
        var vm = this;
    }

    function NewPageController() {
        var vm = this;
    }
})();