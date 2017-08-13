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
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function login(user) {
            return $http.post("/api/login", user)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout(user) {
            return $http.post("/api/logout", user)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            return $http.post("/api/register", user)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(id) {
            var url = "/api/assignment/user/" + id;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/assignment/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/admin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();