module.exports = function (app) {
    require("./services/user.service.server");
    require("./services/website.service.server");
    require("./services/page.service.server");
    require("./services/widget.service.server");
    require("./model/models.server")();
    require("./directives/wam-directives")();
    require("./directives/wbdv-sortable")();
};





