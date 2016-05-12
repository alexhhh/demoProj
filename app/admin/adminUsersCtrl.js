'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var AdminUsersCtrl = (function () {
            function AdminUsersCtrl(common, core, $location) {
                var _this = this;
                //#region Variables
                this.controllerId = AdminUsersCtrl.controllerId;
                this.getAllUsers = function () {
                    var promise = _this.core.dataService.getUsers(_this.getUserRequest, function (response, success) {
                        _this.users = response;
                    });
                    return promise;
                };
                this.deleteUser = function (item) {
                    if (!confirm('Are you sure about this ?')) {
                        return;
                    }
                    _this.deleteUserRequest.idUser = item.id;
                    _this.deleteUserRequest.roleId = item.roleId;
                    var promise = _this.core.dataService.deleteUser(_this.deleteUserRequest, function (response, success) {
                        if (success) {
                            _this.logSuccess('The user  was deleted');
                        }
                        else {
                            _this.logError('This user cannot be deleted !');
                        }
                        _this.getAllUsers();
                    });
                };
                this.showDetails = function (item) {
                    if (item.roleId == 2) {
                        var _url = 'details/' + item.id;
                        _this.$location.path(_url);
                    }
                    else if (item.roleId == 3) {
                        _this.getClient(item.id);
                        _this.log("The client name is " + _this.clientDetails.firstName + " " + _this.clientDetails.lastName + " !");
                    }
                    else if (item.roleId == 1) {
                        _this.log("There are no details for this user!");
                    }
                };
                this.getClient = function (id) {
                    _this.getClientRequest.id = id;
                    var promise = _this.core.dataService.getClient(_this.getClientRequest, function (response, success) {
                        _this.clientDetails = response;
                    });
                    return promise;
                };
                this.common = common;
                this.core = core;
                this.$location = $location;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.getUserRequest = new App.Services.GetUserRequest();
                this.userModel = new App.Services.UserProfileViewModel();
                this.deleteUserRequest = new App.Services.DeleteUserRequest();
                this.getClientRequest = new App.Services.GetClientRequest();
                this.activate([this.getAllUsers()]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            AdminUsersCtrl.prototype.activate = function (promises) {
                var _this = this;
                this.common.activateController(promises, this.controllerId)
                    .then(function () { _this.log('Activated Dashboard View'); });
            };
            AdminUsersCtrl.controllerId = 'adminUsersCtrl';
            return AdminUsersCtrl;
        }());
        Controllers.AdminUsersCtrl = AdminUsersCtrl;
        // register controller with angular
        App.app.controller(AdminUsersCtrl.controllerId, ['common', 'core', '$location',
            function (common, core, $location) { return new App.Controllers.AdminUsersCtrl(common, core, $location); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=adminUsersCtrl.js.map