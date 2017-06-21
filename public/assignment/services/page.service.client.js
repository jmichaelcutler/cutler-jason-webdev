(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        return {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = (new Date().getTime() + "");
            pages.push(page);
            return page;
        }

        function findPagesByWebsiteId(websiteId) {
            var pageList = [];
            for (var p in pages) {
                if (pages[p].websiteId === websiteId) {
                }
                {
                    pageList.push(pages[p]);
                }
            }
            return pageList;
        }

        function findPageById(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    return pages[pageId];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages[p].name = page.name;
                    pages[p].websiteId = page.websiteId;
                    pages[p].description = page.description;
                }
            }
        }

        function deletePage(pageId) {
            var victimPage = findPageById(pageId);
            var index = pages.indexOf(victimPage);
            pages.splice(index, 1);
        }
    }
})();