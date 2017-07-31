(function () {
    angular
        .module("WebAppMaker")
        .controller("LogoutController", LogoutController);

    function LogoutController($location, UserService) {
        var model = this;
        model.logout = logout;

        function logout(user) {
            UserService
                .logout()
                .then(function (response) {
                    $location.url("/");
                }, handleError);
        }

        function handleError(error) {
            model.message = "An error occurred while logging out"
        }
    }
})();