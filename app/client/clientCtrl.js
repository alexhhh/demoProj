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
                this.editClient = function () {
                    _this.addClientRequest.id = _this.core.sesionService.theClient.id;
                    _this.addClientRequest.userId = _this.core.sesionService.userDetails.id;
                    var promise = _this.core.dataService.editClient(_this.addClientRequest, function (response, success) {
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
                    _this.ngDialog.open({ template: 'passwordTemplate2', scope: _this.$scope });
                };
                this.submit = function () {
                    _this.editUserRequest.user.password = _this.clientViewModel.password;
                    _this.editUser();
                };
                this.editUser = function () {
                    var promise = _this.core.dataService.editUser(_this.editUserRequest.user, function (response, success) {
                        if (success) {
                            _this.core.sesionService.userToken = null;
                            _this.getLogCredentialsRequest.userName = _this.clientViewModel.userName;
                            _this.getLogCredentialsRequest.password = _this.editUserRequest.user.password;
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
                this.clientUserRequest = new App.Services.GetClientUserRequest();
                this.editUserRequest = new App.Services.EditUserRequest();
                this.addClientRequest = new App.Services.AddClientRequest();
                this.getLogCredentialsRequest = new App.Services.GetLogCredentialsRequest();
                this.activate([]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            ClientCtrl.prototype.activate = function (promises) {
                var _this = this;
                this.common.activateController(promises, this.controllerId)
                    .then(function () {
                    _this.editUserRequest.user = _this.core.sesionService.userDetails;
                    _this.clientViewModel.userName = _this.core.sesionService.userDetails.userName;
                    _this.clientViewModel.email = _this.core.sesionService.userDetails.email;
                    _this.clientViewModel.firstName = _this.core.sesionService.theClient.firstName;
                    _this.clientViewModel.lastName = _this.core.sesionService.theClient.lastName;
                    _this.addClientRequest.firstName = _this.clientViewModel.firstName;
                    _this.addClientRequest.lastName = _this.clientViewModel.lastName;
                });
            };
            ClientCtrl.controllerId = 'clientCtrl';
            return ClientCtrl;
        }());
        Controllers.ClientCtrl = ClientCtrl;
        App.app.controller(ClientCtrl.controllerId, ['$scope', 'common', 'core', 'ngDialog', function ($scope, common, core, ngDialog) { return new App.Controllers.ClientCtrl($scope, common, core, ngDialog); }]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=clientCtrl.js.map