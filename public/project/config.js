(function () {
    angular
        .module("MusicDBApp")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when("/project/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "project"
            })
            .when("/project/", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "project"
            })
            .when("/project/default", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "project"
            })
            .when("/project/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "project"
            })
            .when("/project/profile", {})
    }
})();
