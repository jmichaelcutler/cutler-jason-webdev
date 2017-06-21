(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            if (!name) {
                vm.alert = "Website name cannot be null!"
            } else {
                var newWebsite = {
                    name: name,
                    description: description
                };
                var website = WebsiteService.createWebsite(vm.userId, newWebsite);
                if (website) {
                    $location.url = ("/user/" + vm.userId + "/website");
                } else {
                    vm.alert = "Unable to create website!";
                }
            }
        }
    }
})();