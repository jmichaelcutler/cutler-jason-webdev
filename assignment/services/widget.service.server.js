var app = require("../../express");

app.post("/api/assignment/page/:pageId/widget", createWidget);
app.get("/api/assignment/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/assignment/widget/:widgetId", findWidgetById);
app.put("/api/assignment/widget/:widgetId", updateWidget);
app.delete("/api/assignment/widget/:widgetId", deleteWidget);

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