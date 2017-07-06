var app = require("../../express");

var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

app.post("/api/assignment/page/:pageId/widget", createWidget);
app.get("/api/assignment/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/assignment/widget/:widgetId", findWidgetById);
app.put("/api/assignment/widget/:widgetId", updateWidget);
app.delete("/api/assignment/widget/:widgetId", deleteWidget);
app.post("/api/assignment/upload", upload.single('myFile'), uploadImage);
app.put("/api/assignment/page/:pageId/widget?initial=initial&final=final", sortWidgets);

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

function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    var widget = findWidgetById(widgetId).body;
    widget.url = '/uploads/' + filename;

    var callbackUrl = "/assignment/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

    res.redirect(callbackUrl);
}

function sortWidgets(req, res) {
    try {
        var pageId = req.params["pageId"];
        var resultArray = [];
        var initial = req.body.initial;
        var final = req.body.final;
        for (var p in pages) {
            if (pages[p].pageId === pageId) {
                resultArray.push(pages[p]);
            }
        }
        var initialWidgetIndex = widgets.indexOf(resultArray[initial]);
        var finalWidgetIndex = widgets.indexOf(resultArray[final]);
        widgets.splice(finalWidgetIndex, 0, widgets.splice(initialWidgetIndex, 1)[0]);
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(404);
    }
}