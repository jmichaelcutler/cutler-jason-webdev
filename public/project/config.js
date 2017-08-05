(function () {
    angular
        .module("MusicDBApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "",
                controller: "",
                controllerAs: "project"
            })
            .when("/", {})
            .when("default", {})
            .when("/register", {})
            .when("/profile", {})
    }
})();
