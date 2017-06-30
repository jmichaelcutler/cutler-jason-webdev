(function () {
    angular
        .module("WebAppMaker")
        .controller('EditWebsiteController', EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.websiteId = $routeParams["websiteId"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function () {
                    vm.websites = websites
                }, findWebsiteError);

            function findWebsiteError(error) {
                vm.message = "An error occurred, could not find website"
            }

            // vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }

        init();

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .then(function () {
                    $location.url = "/user/" + vm.userId + "/website"
                }, updateWebsiteError);

            function updateWebsiteError(error) {
                vm.message = "An error occurred, could not update website.";
            }

            // WebsiteService.updateWebsite(vm.websiteId, website);
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function () {
                    location.url = "/user/" + vm.userId + "/website"
                }, deleteError);

            function deleteError(error) {
                vm.message = "An error occurred, could not delete website.";
            }

            // WebsiteService.deleteWebsite(vm.websiteId);
        }
    }
})();