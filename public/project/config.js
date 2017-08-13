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
                templateUrl: "views/admin/admin.view.client.html",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "project"
            })
            .when("/user/profile", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "UserProfileController",
                controllerAs: "project",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "UserProfileController",
                controllerAs: "project",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/artist/profile", {
                templateUrl: "views/artist/profile.view.client.html",
                controller: "ArtistProfileController",
                controllerAs: "project",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/artist/:aid", {
                templateUrl: "views/artist/profile.view.client.html",
                controller: "ArtistProfileController",
                controllerAs: "project",
                resolve: {loggedin: checkLoggedin}
            })
    }

    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                deferred.resolve(user);
            } else {
                deferred.reject();
                $location.url('/');
            }
        });
        return deferred.promise;
    };
})();
