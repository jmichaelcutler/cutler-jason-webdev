(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var model = this;
        model.login = login;

        function login(user) {
            UserService
                .login(user)
                .then(function (response) {
                    var user = response.data;
                    $location.url = ("/profile");
                });
        }
    }
})();
