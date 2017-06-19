(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController() {
        var vm = this;
    }

    function NewWebsiteController() {
        var vm = this;
    }

    function EditWebsiteController() {
        var vm = this;
    }
})();
