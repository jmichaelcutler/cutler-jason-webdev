(function () {
    angular
        .module("MusicDBApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var project = this;
        project.login = login;
        project.logout = logout;

        function login(user) {
            if (user.username === null || user.password === null) {
                project.message = "Username and password are required, please try again";
            }
            UserService
                .login(user)
                .then(function (response) {
                    var user = response.data;
                    if (user.type === "user") {
                        $location.url = ("/user/" + user._id);
                    } else if (user.type === "artist") {
                        $location.url = ("/artist/" + user._id);
                    } else {
                        $location.url = ("admin");
                    }
                }, handleError);
        }

        function logout(user) {
            UserService
                .logout(user)
                .then(function (response) {
                    $location.url("/");
                }, handleError);
        }

        function handleError(error) {
            project.message = "Username " + username + " not found, please try again."
        }
    }
})();