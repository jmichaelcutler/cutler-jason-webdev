(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(vm.websites = websites);
        }

        init();

        function createWebsite(name, description) {
            if (!name) {
                vm.alert = "Website name cannot be null!"
            } else {
                var newWebsite = {
                    name: name,
                    description: description
                };
                WebsiteService
                    .createWebsite(vm.userId, newWebsite)
                    .then(listWebsite);

                function listWebsite(newSite) {
                    if (newSite !== null) {
                        $location.url = "/user/" + vm.userId + "website";
                    } else {
                        vm.message("Website not created")
                    }
                }
            }
        }


    }
})();