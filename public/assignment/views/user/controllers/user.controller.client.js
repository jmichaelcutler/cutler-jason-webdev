(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, userService) {
        var model = this;

        model.login = login;

        function login(username, password) {
            var found = userService.findUserByCredentials(username, password);

            if (found !== null) {
                $location.url('/user/' + found._id);
            } else {
                model.message("Sorry, " + username + " not found or password incorrect, please try again!");
            }
        }
    }

    function RegisterController($location, userService) {
        var model = this;

        model.register = register;

        function register(username, password, password2) {
            // No username
            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if (password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match and not be null";
                return;
            }

            var found = userService.findUserByUsername(username);

            if (found !== null) {
                model.error = "Sorry, that username is in use";
            } else {
                var newUser = {
                    username: username,
                    password: password
                };
                newUser = userService.createUser(newUser);
                $location.url('/user/' + newUser._id);
            }
        }
    }

    function ProfileController($location, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams['userId'];

        model.user = userService.findUserById(model.userId);
    }
})();
