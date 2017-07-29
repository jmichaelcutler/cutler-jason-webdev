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
                    $location.url = ("/user/" + user._id);
                }, handleError);
        }

        function handleError(error) {
            model.message = "Username " + username + " not found, please try again";
        }
    }
})();
