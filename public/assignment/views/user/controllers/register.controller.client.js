(function () {
    angular
        .module("WebAppMaker")
        .controller('RegisterController', RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, password2) {

            if (username === null || username === '' || typeof username === 'undefined') {
                vm.error = 'Username is required';
                return;
            }

            if (password !== password2 || password === null || typeof password === 'undefined') {
                vm.error = "Passwords must match";
                return;
            }

            var found = null;

            if (found !== null) {
                vm.error = "Sorry, that username is taken";
            } else {
                var newUser = {
                    username: username,
                    password: password
                };
                UserService
                    .createUser(newUser)
                    .then(function (user) {
                        $location.url("/user/" + user._id);
                    });
            }
        }
    }
})();