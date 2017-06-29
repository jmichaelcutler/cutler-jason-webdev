var app = require("../../express");

app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);

var widgets = [
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"
    },
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}

];

function createWidget(req, res) {
    var pageId = req.params["pageId"];
    var widget = req.body;
    widget._id = (new Date().getTime() + "");
    widget.pageId = pageId;
    widgets.push(widget);
    res.sendStatus(200);
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params.pageId;
    var widgetList = [];
    for (var w in widgets) {
        if (widgets[w].pageId === pageId) {
            widgetList.push(widgets[w]);
        }
    }
    res.json(widgetList);
}

function findWidgetById(req, res) {
    var widgetId = req.params["widgetId"];
    for (w in widgets) {
        if (widgets[w]._id === widgetId) {
            res.json(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWidget(req, res) {
    var widgetId = req.params["widgetId"];
    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            var index = widgets.indexOf(widgets[w]);
            widgets[index] = req.body;
            res.sendStatus(200);
        }
    }
    res.sendStatus(404);
}

function deleteWidget(req, res) {
    var widgetId = req.params["widgetId"];
    for (var w in widgets) {
        if (widgets[w] === widgetId) {
            var index = widgets.indexOf(widgets[w]);
            widgets.splice(index, 1);
        }
    }
    res.sendStatus(200);
}