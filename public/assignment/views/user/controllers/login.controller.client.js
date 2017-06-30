(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = function (username, password) {
            UserService
                .findUserByCredentials(username, password)
                .then(login, handleError);

            function handleError(error) {
                vm.message = "Username " + username + " not found, please try again";
            }

            function login(found) {
                if (found !== null) {
                    $location.url("/user/" + found._id);
                } else {
                    vm.message = "Username not found, please try again."
                }
            }
        };
    }
})();
