var app = require("../../express.js");
var websiteModel = require("../model/website/website.model.server");

app.post("/api/assignment/user/:userId/website", createWebsite);
app.get("/api/assignment/user/:userId/website", findAllWebsitesForUser);
app.get("/api/assignment/website/:websiteId", findWebsiteById);
app.put("/api/assignment/website/:websiteId", updateWebsite);
app.delete("/api/assignment/website/:websiteId", deleteWebsite);


function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        });
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params["userId"];
    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            if (websites !== null) {
                res.json(websites);
            } else {
                res.sendStatus(404);
            }
        }, websiteError(err, res));
}

function findWebsiteById(req, res) {
    var websiteId = req.params["websiteId"];
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            if (website !== null) {
                res.send(website);
            } else {
                res.sendStatus(404);
            }
        }, websiteError(err, res));
}

function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params["websiteId"];
    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.sendStatus(status);
        });
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .deleteWebsite(websiteId)
        .then(function (status) {
            res.sendStatus(status);
        });
}

function websiteError(err, res) {
    res.sendStatus(err);
}