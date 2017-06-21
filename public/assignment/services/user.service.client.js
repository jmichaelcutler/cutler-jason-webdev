(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        return {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function createUser(user) {
            user._id = (new Date().getTime() + "");
            users.push(user);
            return user;
        }

        function findUserById(id) {
            for (var userId in users) {
                if (users[userId]._id === id) {
                    return users[userId];
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var userId in users) {
                if (users[userId].username === username) {
                    return users[userId];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var userId in users) {
                if (users[userId].username === username &&
                    users[userId].password === password) {
                    return users[user.id];
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for (var v in users) {
                if (users[v]._id === userId) {
                    users[v].username = user.username;
                    users[v].password = user.password;
                    users[v].firstName = user.firstName;
                    users[v].lastName = user.lastName;
                    return users[v];
                }
            }
            return null;
        }

        function deleteUser(userId) {
            var victimUser = findUserById(userId);
            var index = users.indexOf(victimUser);
            users.splice(index, 1);
        }
    }
});