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
                templateUrl: "views/search/templates/search.view.client.html",
                controller: "SearchController",
                controllerAs: "project"
            })
            .when("/project/admin", {
                templateUrl: "views/admin/admin.view.client.html"
            })
            .when("/project/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "project"
            })
            .when("/project/user/profile", {})
            .when("/project/artist/profile", {})
    }
})();
