'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var ClientDetailsCtrl = (function () {
            function ClientDetailsCtrl($scope, $route, $routeParams, $location, common, core) {
                var _this = this;
                this.controllerId = Controllers.DetailsCtrl.controllerId;
                this.getClient = function (id) {
                    _this.getClientRequest.id = id;
                    var promise = _this.core.dataService.getClient(_this.getClientRequest, function (response, success) {
                        _this.clientDetails = response;
                    });
                    return promise;
                };
                this.goBack = function () {
                    if (_this.core.sesionService.userRole == 'ROLE_ADMIN') {
                        _this.$location.path('admin-users');
                    }
                    else {
                        _this.$location.path('');
                    }
                };
                this.reloadPage = function () {
                    _this.$route.reload();
                };
                this.$scope = $scope;
                this.$route = $route;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.common = common;
                this.core = core;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.currentRole = core.sesionService.userRole;
                this.thisUser = this.core.sesionService.selectedUser;
                this.getClientRequest = new App.Services.GetClientRequest();
                this.activate([this.getClient(this.$routeParams.clientId)]);
            }
            ClientDetailsCtrl.prototype.activate = function (promises) {
                this.common.activateController(promises, this.controllerId)
                    .then(function () { });
            };
            ClientDetailsCtrl.controllerId = 'clientDetailsCtrl';
            return ClientDetailsCtrl;
        }());
        Controllers.ClientDetailsCtrl = ClientDetailsCtrl;
        // register controller with angular
        App.app.controller(ClientDetailsCtrl.controllerId, ['$scope', '$route', '$routeParams', '$location', 'common', 'core',
            function ($scope, $route, $routeParams, $location, common, core) { return new App.Controllers.ClientDetailsCtrl($scope, $route, $routeParams, $location, common, core); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=clientDetailsCtrl.js.map