(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var model = this;
        model.login = login;
        model.logout = logout;

        function login(user) {
            if (user.username === null || user.password === null) {
                model.message = "Username and password are required, please try again.";
            }
            UserService
                .login(user)
                .then(function (response) {
                    var user = response.data;
                    $location.url = ("/user/" + user._id);
                }, handleError);
        }

        function logout(user) {
            UserService
                .logout(user)
                .then(function (response) {
                    $location.url("/");
                }, handleError);
        }

        function handleError(error) {
            model.message = "Username " + username + " not found, please try again";
        }
    }
})();
