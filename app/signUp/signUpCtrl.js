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
                this.checkPassword = "";
                //allThis: boolean = true;
                this.inputType = 'password';
                this.addUser = function () {
                    var promise = _this.core.dataService.addUser(_this.addUserRequest, function (response, success) {
                        _this.user = response;
                        _this.ngDialog.open({ template: 'registrationTemplate' });
                    });
                    return promise;
                };
                this.checkUser = function () {
                    var promise = _this.core.dataService.checkUser(_this.addUserRequest, function (response, success) {
                        _this.user2 = response;
                        if (_this.user2.userName != null) {
                            _this.logError('The username is taken');
                        }
                        else {
                            _this.logSuccess('The username is free !');
                        }
                    });
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
                // this.allThis = this.core.dataService.isLogged;
                this.activate([]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            SignUpCtrl.prototype.activate = function (promises) {
                var _this = this;
                this.common.activateController(promises, this.controllerId)
                    .then(function () { _this.log('Activated Dashboard View'); });
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