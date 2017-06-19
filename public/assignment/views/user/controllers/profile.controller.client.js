/**
 * Created by jmich on 6/18/2017.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams['userId'];

        model.user = userService.findUserById(model.userId);
    }
})();