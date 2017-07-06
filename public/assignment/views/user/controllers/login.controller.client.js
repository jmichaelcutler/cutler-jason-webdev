(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var model = this;
        model.login = function () {
            UserService
                .findUserByCredentials(model.username, model.password)
                .then(login, handleError);

            function handleError(error) {
                model.message = "Username " + username + " not found, please try again";
            }

            function login(found) {
                if (found !== null) {
                    $location.url("/user/" + found._id);
                } else {
                    model.message = "Username not found, please try again."
                }
            }
        };
    }
})();
