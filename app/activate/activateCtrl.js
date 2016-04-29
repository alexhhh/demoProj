'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var ActivateCtrl = (function () {
            function ActivateCtrl($scope, common, $routeParams, core) {
                var _this = this;
                this.controllerId = Controllers.DetailsCtrl.controllerId;
                this.activateUser = function (tokenId) {
                    var requestData = new App.Services.ActivateUserRequest();
                    requestData.tokenId = _this.$routeParams.tokenId;
                    var promise = _this.core.dataService.activateUser(requestData, function (response, success) {
                    });
                    return promise;
                };
                this.$scope = $scope;
                this.$routeParams = $routeParams;
                this.common = common;
                this.core = core;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.activate([this.activateUser(this.$routeParams.tokenId)]);
            }
            ActivateCtrl.prototype.activate = function (promises) {
                var _this = this;
                this.common.activateController(promises, this.controllerId)
                    .then(function () {
                    _this.log('Activated Dashboard View');
                });
            };
            ActivateCtrl.controllerId = 'activateCtrl';
            return ActivateCtrl;
        }());
        Controllers.ActivateCtrl = ActivateCtrl;
        App.app.controller(ActivateCtrl.controllerId, ['$scope', 'common', '$routeParams', 'core',
            function ($scope, common, $routeParams, core) { return new App.Controllers.ActivateCtrl($scope, common, $routeParams, core); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=activateCtrl.js.map