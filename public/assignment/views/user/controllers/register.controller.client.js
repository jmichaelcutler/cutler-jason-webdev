(function () {
    angular
        .module('WebAppMaker')
        .controller('RegisterController', RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, password2) {

            if (username === null || username === '' || typeof username === 'undefined') {
                vm.error = 'username is required';
                return;
            }

            if (password !== password2 || password === null || typeof password === 'undefined') {
                vm.error = "passwords must match";
                return;
            }

            var found = UserService.findUserByUsername(username);

            if (found !== null) {
                vm.error = "sorry, that username is taken";
            } else {
                var newUser = {
                    username: username,
                    password: password
                };
                newUser = vm.createUser(newUser);
                $location.url('/user/' + newUser._id);
            }
        }
    }
})();