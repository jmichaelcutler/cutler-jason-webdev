module.exports = function (app) {
    require("./services/user.service.server");
    require("./services/search.service.server");
    require("./model/models.server")();
};
