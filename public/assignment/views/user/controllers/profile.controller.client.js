/**
 * Created by jmich on 6/18/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller('ProfileController', ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.userId = $routeParams["userId"];

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }

        init();

        function updateUser(newUser) {
            var entry = UserService.updateUser(vm.userId, newUser);
            if (!entry) {
                vm.alert = "Error, user not updated."
            }
        }
    }


})();