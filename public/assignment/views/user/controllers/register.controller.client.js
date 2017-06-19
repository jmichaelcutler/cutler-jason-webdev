(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {
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
})();