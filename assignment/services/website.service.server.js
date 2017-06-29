var app = require("../../express.js");

app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website", findAllWebsitesForUser);
app.get("/api/website/:websiteId", findWebsiteById);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/website:websiteId", deleteWebsite);

var websites = [
    {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
    {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
    {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
    {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
    {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
    {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
    {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
];

function createWebsite(req, res) {
    var website = req.body;
    website._id = (new Date().getTime() + "");
    website.developerId = req.params["userId"];
    websites.push(website);
    req.json(website);
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params["userId"];
    var results = [];
    for (var w in websites) {
        if (websites[w].developerId === userId) {
            results.push(websites[w]);
        }
    }
    res.json(results);
}

function findWebsiteById(req, res) {
    var websiteId = req.params["websiteId"];
    for (var w in websites) {
        if (websites[w]._id === websiteId) {
            res.json(websites[w]);
        }
    }
    res.sendStatus(404);
}

function updateWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    for (var w in websites) {
        if (websites[w]._id === websiteId) {
            websites[w].name = req.body.name;
            websites[w].developerId = req.body.developerId;
            websites[w].description = req.body.description;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWebsite(req, res) {
    var victimWebsite = req.body;
    var index = websites.indexOf(victimWebsite);
    websites.splice(index, 1);
    res.sendStatus(200);
}