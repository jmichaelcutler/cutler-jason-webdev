var app = require("../../express.js");
var userModel = require("../model/user/user.model.server");

app.post("/api/assignment/user", createUser);
app.get("/api/assignment/user?username", findUserByUsername);
app.get("/api/assignment/user?", findUserByCredentials);
app.get("/api/assignment/user/:userId", findUserById);
app.put("/api/assignment/user/:userId", updateUser);
app.delete("/api/assignment/user/:userId", deleteUser);

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            if (user !== null) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, userError(err, res));
}

function findUserByUsername(req, res) {
    var username = req.query["username"];
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if (user !== null) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        }, userError(err, res));
}

function findUserByCredentials(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if (user !== null) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        }, userError(err, res));
}

function findUserById(req, res) {
    var userId = req.params["userId"];
    userModel
        .findUserById(userId)
        .then(function (user) {
            if (user !== null) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        }, userError(err, res));
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(status);
        }, userError(err, res));
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(status);
        }, userError(err, res));
}

function userError(err, res) {
    res.sendStatus(404);
}