var app = require("../../express.js");
var widgetModel = require("../model/widget/widget.model.server");

var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

app.post("/api/assignment/page/:pageId/widget", createWidget);
app.get("/api/assignment/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/assignment/widget/:widgetId", findWidgetById);
app.put("/api/assignment/widget/:widgetId", updateWidget);
app.delete("/api/assignment/widget/:widgetId", deleteWidget);
app.post("/api/assignment/upload", upload.single('myFile'), uploadImage);
app.put("/api/assignment/page/:pageId/widget", reorderWidgets);

function createWidget(req, res) {
    var pageId = req.params["pageId"];
    var widget = req.body;
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget);
        });
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params.pageId;
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            if (widgets !== null) {
                res.json(widgets);
            } else {
                res.sendStatus(404);
            }
        }, widgetError(err, res));
}

function findWidgetById(req, res) {
    var widgetId = req.params["widgetId"];
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.send(widget);
        }, widgetError(err, res));
}

function updateWidget(req, res) {
    var widgetId = req.params["widgetId"];
    var widget = req.body;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.sendStatus(status);
        });
}

function deleteWidget(req, res) {
    var widgetId = req.params["widgetId"];
    widgetModel
        .deleteWidget(widgetId)
        .then(function (status) {
            res.sendStatus(status);
        });
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

function reorderWidgets(req, res) {
    var pageId = req.params["pageId"];
    var start = req.params.start;
    var end = req.params.end;
    widgetModel
        .reorderWidget(pageId, start, end)
        .then(function (widgets) {
            res.sendStatus(200);
        });
}

function widgetError(err, res) {
    res.sendStatus(404);
}