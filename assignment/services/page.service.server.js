var app = require("../../express.js");
var pageModel = require("../model/page/page.model.server");

app.post("/api/assignment/website/:websiteId/page", createPage);
app.get("/api/assignment/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/assignment/page/:pageId", findPageById);
app.put("/api/assignment/page/:pageId", updatePage);
app.delete("/api/assignment/page/:pageId", deletePage);

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params["websiteId"];
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        });
}

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            if (pages !== null) {
                res.json(pages);
            } else {
                res.sendStatus(404);
            }
        }, pageError(err, res));
}

function findPageById(req, res) {
    var pageId = req.params["pageId"];
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            if (page !== null) {
                res.send(page);
            } else {
                res.sendStatus(404);
            }
        }, pageError(err, res));
}

function updatePage(req, res) {
    var pageId = req.params["pageId"];
    var page = req.body;
    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.sendStatus(status);
        });
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .deletePage(pageId)
        .then(function (status) {
            res.sendStatus(status);
        });
}

function pageError(err, res) {
    res.sendStatus(404);
}