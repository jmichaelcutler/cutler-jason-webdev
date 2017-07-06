var app = require("../../express.js");

app.post("/api/assignment/website/:websiteId/page", createPage);
app.get("/api/assignment/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/assignment/page/:pageId", findPageById);
app.put("/api/assignment/page/:pageId", updatePage);
app.delete("/api/assignment/page/:pageId", deletePage);

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

function createPage(req, res) {
    var page = req.body;
    page.websiteId = req.params["websiteId"];
    page._id = (new Date().getTime() + "");
    pages.push(page);
    res.json(page);
}

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    var pageList = [];
    for (var w in pages) {
        if (pages[w].websiteId === websiteId) {
            pageList.push(pages[w]);
        }
    }
    res.json(pageList);
}

function findPageById(req, res) {
    var pageId = req.params["pageId"];
    for (var p in pages) {
        if (pages[p]._id === pageId) {
            res.json(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
}

function updatePage(req, res) {
    var pageId = req.params["pageId"];
    for (var p in pages) {
        if (pages[p]._id === pageId) {
            pages[p].name = req.body.name;
            pages[p].websiteId = req.body.websiteId;
            pages[p].description = req.body.description;
            res.sendStatus(200);
        }
    }
    res.sendStatus(404);
}

function deletePage(req, res) {
    var victimPage = req.body;
    var index = pages.indexOf(victimPage);
    pages.splice(index, 1);
    res.sendStatus(200);
}