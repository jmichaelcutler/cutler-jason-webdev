(function () {
    angular
        .module("MusicDBAp")
        .controller("AdminUserController", AdminUserController);

    function AdminUserController($location, UserService) {
        var project = this;
        project.findAllUsers = findAllUsers;
        project.deleteUser = deleteUser;

        function findAllUsers() {
            UserService
                .findAllUsers
                .then(function (response) {
                    project.users = response.data;
                }, function (error) {
                    project.message = "An error occurred, users not retrieved."
                });
        }

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/admin/user')
                }, function (error) {
                    project.message = "An error occurred, user not deleted"
                });
        }
    }
})();