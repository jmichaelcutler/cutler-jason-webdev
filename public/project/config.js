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
                controllerAs: "project"
            })
            .when("/admin", {
                templateUrl: "views/admin/templates/admin.view.client.html",
                resolve: {
                    currentAdmin: checkAdmin
                }
            })
            .when("/admin/user", {
                templateUrl: "views/admin/templates/admin-users.view.client.html",
                controller: "AdminUserController",
                controllerAs: "project",
                resolve: {
                    currentAdmin: checkAdmin
                }
            })
            .when("/admin/artist", {
                templateUrl: "views/admin/templates/admin-artists.view.client.html",
                controller: "AdminArtistsController",
                controllerAs: "project",
                resolve: {
                    currentAdmin: checkAdmin
                }
            })
            .when("/admin/review", {
                templateUrl: "views/admin/templates/admin-reviews.view.client.html",
                resolve: {
                    currentAdmin: checkAdmin
                }
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "project"
            })
            .when("/user/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "UserProfileController",
                controllerAs: "project",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/user/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "UserProfileController",
                controllerAs: "project",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/artist/profile", {
                templateUrl: "views/artist/templates/profile.view.client.html",
                controller: "ArtistProfileController",
                controllerAs: "project",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/artist/:aid", {
                templateUrl: "views/artist/templates/profile.view.client.html",
                controller: "ArtistProfileController",
                controllerAs: "project",
                resolve: {loggedin: checkLoggedin}
            })
    }

    function checkLoggedin($q, $timeout, $http, $location, $rootScope) {
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
    }

    function checkAdmin($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then(function (currentUser) {
                if (currentUser === 0) {
                    deferred.resolve({});
                    $location.url('/');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
})();
