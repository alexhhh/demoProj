'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var ClientCtrl = (function () {
            //#endregion
            function ClientCtrl($scope, common, core, ngDialog) {
                var _this = this;
                //#region Variables
                this.controllerId = ClientCtrl.controllerId;
                this.checkPassword = "";
                this.getClient = function () {
                    _this.getClientRequest.id = _this.core.sesionService.userDetails.id;
                    _this.clientViewModel.userName = _this.core.sesionService.userDetails.userName;
                    _this.clientViewModel.email = _this.core.sesionService.userDetails.email;
                    var promise = _this.core.dataService.getClient(_this.getClientRequest, function (response, success) {
                        _this.clientViewModel.firstName = response.firstName;
                        _this.clientViewModel.lastName = response.lastName;
                    });
                    return promise;
                };
                this.editClient = function () {
                    var addClientRequest = new App.Services.AddClientRequest();
                    addClientRequest.id = _this.core.sesionService.userDetails.id;
                    addClientRequest.firstName = _this.clientViewModel.firstName;
                    addClientRequest.lastName = _this.clientViewModel.lastName;
                    addClientRequest.clientUserId = _this.core.sesionService.userDetails.id;
                    var promise = _this.core.dataService.editClient(addClientRequest, function (response, success) {
                        if (success) {
                            _this.logSuccess("The client profile was modified !");
                        }
                        else {
                            _this.logError("Cannot edit the client profile!");
                        }
                    });
                    return promise;
                };
                this.changePassword = function () {
                    _this.ngDialog.open({ template: 'passwordTemplate', scope: _this.$scope });
                };
                this.submit = function () {
                    _this.editUserRequest.password = _this.clientViewModel.password;
                    _this.editUser();
                };
                this.editUser = function () {
                    _this.editUserRequest.id = _this.core.sesionService.userDetails.id;
                    var promise = _this.core.dataService.editUser(_this.editUserRequest, function (response, success) {
                        if (success) {
                            _this.core.sesionService.userToken = null;
                            _this.getLogCredentialsRequest.userName = _this.clientViewModel.userName;
                            _this.getLogCredentialsRequest.password = _this.editUserRequest.password;
                            _this.logIn();
                        }
                    });
                    return promise;
                };
                this.logIn = function () {
                    var promise = _this.core.dataService.getLoggedUser(_this.getLogCredentialsRequest, function (response, success) {
                        if (success) {
                            _this.core.sesionService.userToken = response.token;
                            _this.core.sesionService.userDetails = response.user;
                        }
                        else {
                            _this.logError('An error occurred whit the log in process!');
                        }
                    });
                };
                this.$scope = $scope;
                this.common = common;
                this.core = core;
                this.ngDialog = ngDialog;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.clientViewModel = new App.Services.ClientProfileViewModel();
                this.getClientRequest = new App.Services.GetClientRequest();
                this.editUserRequest = new App.Services.EditUserRequest();
                this.getLogCredentialsRequest = new App.Services.GetLogCredentialsRequest();
                this.activate([this.getClient()]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            ClientCtrl.prototype.activate = function (promises) {
                this.common.activateController(promises, this.controllerId)
                    .then(function () { });
            };
            ClientCtrl.controllerId = 'clientCtrl';
            return ClientCtrl;
        }());
        Controllers.ClientCtrl = ClientCtrl;
        App.app.controller(ClientCtrl.controllerId, ['$scope', 'common', 'core', 'ngDialog', function ($scope, common, core, ngDialog) { return new App.Controllers.ClientCtrl($scope, common, core, ngDialog); }]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=clientCtrl.js.map