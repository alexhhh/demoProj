'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var ResetPasswordCtrl = (function () {
            function ResetPasswordCtrl($scope, common, $routeParams, core, ngDialog) {
                var _this = this;
                this.controllerId = Controllers.DetailsCtrl.controllerId;
                this.resetPass = function () {
                    var promise = _this.core.dataService.resetPassword(_this.resetPassRequest, function (response, success) {
                        if (success) {
                            _this.$scope.passwordForm.$setPristine();
                            _this.ngDialog.open({ template: 'resetTemplate' });
                        }
                        else {
                            _this.logError('Cannot reset the password!');
                        }
                    });
                };
                this.$scope = $scope;
                this.$routeParams = $routeParams;
                this.common = common;
                this.core = core;
                this.ngDialog = ngDialog;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.resetPassRequest = new App.Services.ResetPasswordRequest();
                this.activate([]);
            }
            ResetPasswordCtrl.prototype.activate = function (promises) {
                this.common.activateController(promises, this.controllerId)
                    .then(function () {
                });
            };
            ResetPasswordCtrl.controllerId = 'resetPasswordCtrl';
            return ResetPasswordCtrl;
        }());
        Controllers.ResetPasswordCtrl = ResetPasswordCtrl;
        App.app.controller(ResetPasswordCtrl.controllerId, ['$scope', 'common', '$routeParams', 'core', 'ngDialog',
            function ($scope, common, $routeParams, core, ngDialog) { return new App.Controllers.ResetPasswordCtrl($scope, common, $routeParams, core, ngDialog); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=resetPasswordCtrl.js.map