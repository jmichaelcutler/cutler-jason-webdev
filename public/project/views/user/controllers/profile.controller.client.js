(function () {
    angular
        .module("MusicDBApp")
        .controller("UserProfileController", UserProfileController);

    function UserProfileController($location, $routeParams, UserService) {
        var project = this;
        project.updateUser = updateUser;
        project.deleteUser = deleteUser;
        var userId = $routeParams["userId"];

        UserService
            .findUserById(userId)
            .then(renderUser, handleError);

        function renderUser(response) {
            project.user = response.data;
        }

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                }, deleteError);
        }

        function deleteError(error) {
            project.message = "An error occured, user not deleted.";
        }

        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function () {
                    project.message = "User updated successfully";
                }, updateError);
        }

        function updateError(error) {
            project.message = "An error occurred, user was not updated.";
        }
    }
})();