/// <reference path="../common/common.ts" />
'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        // export interface IAdminCtrl {
        //     common:App.Shared.ICommon;
        //     controllerId: string;
        //     title:string;
        // }
        var AdminCtrl = (function () {
            //#endregion
            function AdminCtrl(common, core) {
                var _this = this;
                this.getSpecialities = function () {
                    var promise = _this.core.dataService.getSpecialities(_this.requestData, function (response, success) {
                        _this.spec = response;
                    });
                    return promise;
                };
                this.addSpeciality = function () {
                    var promise = _this.core.dataService.addSpeciality(_this.addSpecialityRequest, function (response, success) {
                        if (success) {
                            _this.logSuccess('The speciality was created');
                        }
                        else {
                            _this.logError('This speciality cannot be created');
                        }
                        _this.getSpecialities();
                    });
                    return promise;
                };
                this.deleteSpeciality = function (id) {
                    if (!confirm('Are you sure about this ?')) {
                        return;
                    }
                    _this.deleteSpecialityRequest.idSpeciality = id;
                    var promise = _this.core.dataService.deleteSpeciality(_this.deleteSpecialityRequest, function (response, success) {
                        if (success) {
                            _this.logSuccess('The speciality was deleted');
                        }
                        else {
                            _this.logError('This speciality is used by workers and cannot be deleted !');
                        }
                        _this.getSpecialities();
                    });
                    return promise;
                };
                this.common = common;
                this.controllerId = AdminCtrl.controllerId;
                this.core = core;
                // this.log = this.common.logger.getLogFn(AdminCtrl.controllerId);
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.addSpecialityRequest = new App.Services.AddSpecialityRequest();
                this.requestData = new App.Services.GetSpecialityRequest();
                this.deleteSpecialityRequest = new App.Services.DeleteSpecialityRequest();
                this.activate([this.getSpecialities()]);
            }
            AdminCtrl.prototype.activate = function (promises) {
                var _this = this;
                this.common.activateController([], AdminCtrl.controllerId)
                    .then(function () { _this.log('Activated Admin View'); });
            };
            AdminCtrl.controllerId = 'adminCtrl';
            return AdminCtrl;
        }());
        Controllers.AdminCtrl = AdminCtrl;
        // Register with angular
        App.app.controller(AdminCtrl.controllerId, ['common', 'core', function (common, core) { return new AdminCtrl(common, core); }]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=admin.js.map