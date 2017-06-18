(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function PageService() {
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

        return {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };



        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widget._id = (new Date().getTime() + "");
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId) {
            var widgetList = [];
            for (var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    widgetList.push(widgets[w]);
                }
            }
            return widgetList;
        }

        function findWidgetById(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    return widgets[widgetId];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            widget._id = widgetId;
            deleteWidget(widgetId);
            widgets.push(widget);
        }

        function deleteWidget(widgetId) {
            var victimWidget = findWidgetById(widgetId);
            var index = widgets.indexOf(victimWidget);
            widgets.splice(index, 1);
        }
    }
});