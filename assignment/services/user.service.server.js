var app = require("../../express.js");

app.post("/api/user", createUser);
app.get("/api/user?username=username", findUserByUsername);
app.get("/api/user?username=username&password=password", findUserByCredentials);
app.get("/api/user/:userId", findUserById);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

function createUser(req, res) {
    var user = req.body;
    user._id = (new Date().getTime() + "");
    users.push(user);
    res.json(user);
}

function findUserByUsername(req, res) {
    var username = req.body.username;
    for (var userId in users) {
        if (users[userId].username === username) {
            res.send(users[userId]);
        }
    }
    res.sendStatus(404);
}

function findUserByCredentials(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    for (var userId in users) {
        if (users[userId].username === username &&
            users[userId].password === password) {
            res.send(users[userId]);
        }
    }
    res.send(null);
}

function findUserById(req, res) {
    var userId = req.params["userId"];
    var user = users.find(function (user) {
        return user._id === userId;
    });
    res.send(user);
}

function updateUser(req, res) {
    var user = req.body;
    for (var u in users) {
        if (users[u]._id === req.params.userId) {
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    for (var u in users) {
        if (users[u]._id === userId) {
            users.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}