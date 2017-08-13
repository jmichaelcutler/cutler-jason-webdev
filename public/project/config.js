(function () {
    angular
        .module("MusicDBApp")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "project"
            })
            .when("/", {
                templateUrl: "views/search/templates/search.view.client.html",
                controller: "SearchController",
                controllerAs: "project"
            })
            .when("/results", {
                templateUrl: "views/search/templates/search-results.view.client.html",
                controller: "SearchController",
                controllaerAs: "project"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.client.html"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "project"
            })
            .when("/user/profile", {})
            .when("/artist/profile", {})
    }
})();
