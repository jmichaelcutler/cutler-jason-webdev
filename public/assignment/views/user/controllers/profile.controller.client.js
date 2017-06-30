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
            .then(renderUser, handleError);

        function renderUser(response) {
            vm.user = response.data;
        }

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                }, deleteError);
        }

        function deleteError(error) {
            vm.message = "An error occured, user not deleted."
        }

        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function () {
                    vm.message = "User updated successfully";
                }, updateError);
        }

        function updateError(error) {
            vm.message = "An error occurred, user was not updated."
        }
    }


})();