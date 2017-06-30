/**
 * Created by jmich on 6/18/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller('ProfileController', ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        var userId = $routeParams["userId"];

        UserService
            .findUserById(userId)
            .then(renderUser);

        function renderUser(response) {
            vm.user = response.data;
        }

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function () {
                    vm.message = "User updated successfully";
                })
        }
    }


})();