(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login() {
            var user = UserService.findUserByCredentials(vm.username, vm.password);

            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.message = "Unable to login";
            }
        }
    }
})();
