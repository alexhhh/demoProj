'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var ResetFormCtrl = (function () {
            function ResetFormCtrl($scope, common, $routeParams, core) {
                var _this = this;
                this.controllerId = Controllers.DetailsCtrl.controllerId;
                this.getUserToken = function (tokenId) {
                    var token = new App.Services.TokenRequest();
                    token.tokenId = tokenId;
                    var promise = _this.core.dataService.getUserToken(token, function (response, success) {
                        _this.tokenRequest = response;
                    });
                    return promise;
                };
                this.resetUserPassword = function () {
                    var promise = _this.core.dataService.resetUserPassword(_this.tokenRequest, function (response, success) {
                        if (success) {
                            _this.$scope.passwordForm.$setPristine();
                            _this.logSuccess("The password is updated!");
                        }
                        else {
                            _this.logError("Cannot update the password!");
                        }
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
                this.tokenRequest = new App.Services.GetUserTokenRequest();
                this.activate([this.getUserToken(this.$routeParams.tokenId)]);
            }
            ResetFormCtrl.prototype.activate = function (promises) {
                this.common.activateController(promises, this.controllerId)
                    .then(function () {
                });
            };
            ResetFormCtrl.controllerId = 'resetFormCtrl';
            return ResetFormCtrl;
        }());
        Controllers.ResetFormCtrl = ResetFormCtrl;
        App.app.controller(ResetFormCtrl.controllerId, ['$scope', 'common', '$routeParams', 'core',
            function ($scope, common, $routeParams, core) { return new App.Controllers.ResetFormCtrl($scope, common, $routeParams, core); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=resetFormCtrl.js.map