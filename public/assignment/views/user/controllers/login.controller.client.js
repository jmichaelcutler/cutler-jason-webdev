(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var model = this;
        model.login = login;

        function login() {
            var user = UserService.findUserByCredentials(model.username, model.password);

            if (user) {
                $location.url("/user/" + user._id);
            } else {
                model.message = "Unable to login";
            }
        }
    }
})();
