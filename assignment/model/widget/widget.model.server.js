var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var pageSchema = require("../page/page.schema.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = mongoose.model("PageModel", pageSchema)
;
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports(widgetModel);

Array.prototype.move(function (initial, final) {
    this
});

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel.create(widget);
}

function findAllWidgetsForPage(pageId) {
    return widgetModel
        .find({_page: pageId})
        .populate("_page")
        .exec();
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {
        _page: widget._page,
        type: widget.type,
        name: widget.name,
        text: widget.text,
        placeholder: widget.placeholder,
        description: widget.description,
        url: widget.url,
        width: widget.width,
        height: widget.height,
        rows: widget.rows,
        size: widget.size,
        class: widget.class,
        icon: widget.icon,
        deletable: widget.deletable,
        formatted: widget.formatted
    })
}

function deleteWidget(widgetId) {
    return widgetModel.remove({_id: widgetId});
}

function reorderWidget(pageId, start, end) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            if (page !== null) {
                page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
                return page.save();
            } else {
                return null;
            }
        })
}
