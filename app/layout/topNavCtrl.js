'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var TopNavCtrl = (function () {
            //using shortcut syntax on private variables in the constructor
            function TopNavCtrl($scope, $route, common, core, ngDialog, $location) {
                var _this = this;
                this.$route = $route;
                this.controllerId = TopNavCtrl.controllerId;
                this.allThis = true;
                this.logIn = function () {
                    _this.ngDialog.open({ template: 'logInTemplate', scope: _this.$scope });
                };
                this.getLoggedUser = function () {
                    var promise = _this.core.dataService.getLoggedUser(_this.getLogCredentialsRequest, function (response, success) {
                        if (success) {
                            _this.logSuccess('You have successfully logged in!');
                            _this.userToken = response.token;
                            _this.core.sesionService.userToken = response.token;
                            _this.core.sesionService.userRole = response.role;
                            _this.core.sesionService.userDetails = response.user;
                            _this.userName = _this.getLogCredentialsRequest.userName;
                            _this.allThis = true;
                        }
                        else {
                            _this.userToken = null;
                            _this.allThis = false;
                            _this.logError('An error occurred whit the log in process!');
                        }
                    });
                };
                this.logOut = function () {
                    if (!confirm('Are you sure about this ?')) {
                        return;
                    }
                    var getLogCredentialsRequest = new App.Services.GetLogCredentialsRequest();
                    var promise = _this.core.dataService.getLogOut(getLogCredentialsRequest, function (response, success) {
                        if (success) {
                            _this.logSuccess('You have successfully logged out!');
                            _this.$location.path('#/dashboard');
                        }
                        else {
                            _this.logError('An error occurred !');
                        }
                        _this.userToken = response;
                        _this.allThis = false;
                        _this.core.sesionService.clear();
                    });
                    return _this.userToken;
                };
                this.core = core;
                this.$scope = $scope;
                this.$location = $location;
                this.common = common;
                this.ngDialog = ngDialog;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.getLogCredentialsRequest = new App.Services.GetLogCredentialsRequest();
                this.allThis = this.core.sesionService.isLogged;
                this.activate([]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            TopNavCtrl.prototype.activate = function (promises) {
                this.common.activateController(promises, this.controllerId)
                    .then(function () { });
            };
            TopNavCtrl.controllerId = 'topNavCtrl';
            return TopNavCtrl;
        }());
        Controllers.TopNavCtrl = TopNavCtrl;
        App.app.controller(TopNavCtrl.controllerId, ['$scope', '$route', 'common', 'core', 'ngDialog', '$location',
            function ($scope, $r, c, core, ngDialog, $location) { return new App.Controllers.TopNavCtrl($scope, $r, c, core, ngDialog, $location); }]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=topNavCtrl.js.map