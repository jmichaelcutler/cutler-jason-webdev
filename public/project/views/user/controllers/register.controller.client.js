(function () {
    angular
        .module("MusicDBApp")
        .controller('RegisterController', RegisterController);

    function RegisterController($location, UserService) {
        var project = this;
        project.register = register;

        function register(username, password, password2, userType) {
            if (username === null || username === '' || typeof username === 'undefined') {
                project.message = 'Username is required';
                return;
            }

            if (password === null || password2 === null || typeof password === 'undefined' || typeof password2 === 'undefined') {
                project.message = "Must provide and verify password.";
                return;
            }
            if (password !== password2) {
                project.message = "Passwords must match";
                return;
            }
            if (username === "admin") {
                project.message = "That username is not available";
            }

            var found = null;

            if (found !== null) {
                project.message = "Sorry, that username is taken";
            } else {
                var newUser = {
                    username: username,
                    password: password,
                    userType: userType
                };
                UserService
                    .register(newUser)
                    .then(function (response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        if (user.userType === "user") {
                            $location.url("/user/" + user.id);
                        } else {
                            $location.url("/artist/" + user._id);
                        }
                    }, registerError);
            }
        }

        function registerError(error) {
            project.message = "An error occurred, user was not registered";
        }
    }
})();