'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var AdminProfileCtrl = (function () {
            function AdminProfileCtrl($scope, $route, $routeParams, $location, common, core) {
                var _this = this;
                this.controllerId = Controllers.DetailsCtrl.controllerId;
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
                this.activate([]);
            }
            AdminProfileCtrl.prototype.activate = function (promises) {
                this.common.activateController(promises, this.controllerId)
                    .then(function () { });
            };
            AdminProfileCtrl.controllerId = 'adminProfileCtrl';
            return AdminProfileCtrl;
        }());
        Controllers.AdminProfileCtrl = AdminProfileCtrl;
        // register controller with angular
        App.app.controller(AdminProfileCtrl.controllerId, ['$scope', '$route', '$routeParams', '$location', 'common', 'core',
            function ($scope, $route, $routeParams, $location, common, core) { return new App.Controllers.AdminProfileCtrl($scope, $route, $routeParams, $location, common, core); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=adminProfileCtrl.js.map