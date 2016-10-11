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
                this.getMesterByUserId = function (item, callback) {
                    _this.getMesterUserIdRequest.userId = item.id;
                    var promise = _this.core.dataService.getMesterByUserId(_this.getMesterUserIdRequest, function (response, success) {
                        if (success) {
                            _this.dbUser = response;
                            _this.logSuccess('The mester was found');
                            callback();
                        }
                        else {
                            _this.logError('The mester is missing !');
                        }
                    });
                };
                this.getClientByUserId = function (item, callback) {
                    _this.getClientUserRequest.userId = item.id;
                    var promise = _this.core.dataService.getClientByUserId(_this.getClientUserRequest, function (response, success) {
                        if (success) {
                            _this.dbUser = response;
                            _this.logSuccess('The mester was found');
                            callback();
                        }
                        else {
                            _this.logError('The mester is missing !');
                        }
                    });
                };
                this.showDetails = function (item) {
                    _this.core.sesionService.selectedUser = item;
                    var _url;
                    if (item.roleId == 2) {
                        _this.getMesterByUserId(item, function () {
                            _url = 'details/' + _this.dbUser.id;
                            _this.$location.path(_url);
                        });
                    }
                    else if (item.roleId == 3) {
                        _this.getClientByUserId(item, function () {
                            _url = 'clientdetails/' + _this.dbUser.id;
                            _this.$location.path(_url);
                        });
                    }
                    else if (item.roleId == 1) {
                        _url = 'admin/' + item.id;
                        _this.$location.path(_url);
                    }
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
                this.getClientUserRequest = new App.Services.GetClientUserRequest();
                this.getMesterUserIdRequest = new App.Services.GetMesterUserIdRequest();
                this.activate([this.getAllUsers()]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            AdminUsersCtrl.prototype.activate = function (promises) {
                this.common.activateController(promises, this.controllerId)
                    .then(function () { });
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