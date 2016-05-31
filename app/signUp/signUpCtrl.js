'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var SignUpCtrl = (function () {
            //using shortcut syntax on private variables in the constructor
            function SignUpCtrl($scope, $route, common, core, ngDialog) {
                var _this = this;
                //#region Variables
                this.controllerId = Controllers.DetailsCtrl.controllerId;
                this.checkUsername = false;
                this.checkPassword = "";
                this.inputType = 'password';
                this.addUser = function () {
                    if (_this.checkUsername) {
                        _this.checkUsername = false;
                        var promise = _this.core.dataService.addUser(_this.addUserRequest, function (response, success) {
                            if (success) {
                                _this.user = response;
                                _this.ngDialog.open({ template: 'registrationTemplate' });
                                _this.addUserRequest = new App.Services.AddUserRequest();
                                _this.$scope.reviewForm.$setPristine();
                                _this.checkPassword = "";
                            }
                            else {
                                _this.logError('Cannot create user!');
                            }
                        });
                        return promise;
                    }
                    else {
                        _this.logError('Invalide username!');
                    }
                };
                this.checkUser = function () {
                    _this.checkUserRequest.userName = _this.addUserRequest.userName;
                    if (_this.checkUserRequest.userName != null) {
                        var promise = _this.core.dataService.checkUser(_this.checkUserRequest, function (response, success) {
                            _this.user2 = response;
                            if (_this.user2.userName != null) {
                                _this.logError('The username is taken');
                                _this.checkUsername = false;
                            }
                            else {
                                _this.checkUsername = true;
                                _this.logSuccess('The username is free !');
                            }
                        });
                    }
                    else {
                        _this.logError('Invalid username');
                    }
                };
                this.hideShowPassword = function () {
                    if (_this.inputType == 'password') {
                        _this.inputType = 'text';
                    }
                    else {
                        _this.inputType = 'password';
                    }
                };
                this.$scope = $scope;
                this.common = common;
                this.core = core;
                this.ngDialog = ngDialog;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.addUserRequest = new App.Services.AddUserRequest();
                this.getLogCredentialsRequest = new App.Services.GetLogCredentialsRequest();
                this.checkUserRequest = new App.Services.CheckUserRequest();
                this.activate([]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            SignUpCtrl.prototype.activate = function (promises) {
                this.common.activateController(promises, this.controllerId)
                    .then(function () { });
            };
            SignUpCtrl.controllerId = 'signUpCtrl';
            return SignUpCtrl;
        }());
        Controllers.SignUpCtrl = SignUpCtrl;
        App.app.controller(SignUpCtrl.controllerId, ['$scope', '$route', 'common', 'core', 'ngDialog',
            function ($scope, $route, common, core, ngDialog) { return new App.Controllers.SignUpCtrl($scope, $route, common, core, ngDialog); }]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=signUpCtrl.js.map