(function () {
    angular
        .module("WebAppMaker")
        .controller('RegisterController', RegisterController);

    function RegisterController($location, UserService) {
        var model = this;
        model.register = register;

        function register(username, password, password2) {

            if (username === null || username === '' || typeof username === 'undefined') {
                model.message = 'Username is required';
                return;
            }

            if (password === null || password2 === null || typeof password === 'undefined' || typeof password2 === 'undefined') {
                model.message = "Must provide and verify password."
            }
            if (password !== password2) {
                model.message = "Passwords must match";
                return;
            }

            var found = null;

            if (found !== null) {
                model.error = "Sorry, that username is taken";
            } else {
                var newUser = {
                    username: username,
                    password: password
                };
                UserService
                    .register(newUser)
                    .then(function (response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id);
                    }, createError);
            }

            function createError(error) {
                model.message = "An error occurred, user was not registered.";
            }
        }
    }
})();