(function () {
    angular
        .module("MusicDBApp")
        .factory("UserService", UserService);

    function UserService($http) {
        return {
            login: login,
            logout: logout,
            register: register,
            createUser: createUser,
            checkAdmin: checkAdmin,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            findArtistByUsername: findArtistByUsername,
            findAllArtists: findAllArtists,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function login(user) {
            return $http.post("/api/project/login", user)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout(user) {
            return $http.post("/api/project/logout", user)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            return $http.post("/api/project/register", user)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/project/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            var url = "/api/project/user?";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findArtistByUsername(username) {
            var url = "/api/project/artist?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllArtists() {
            var url = "/api/project/artist?";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/project/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/project/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/project/admin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();