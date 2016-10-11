/// <reference path="../common/common.ts" />
'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var AdminCtrl = (function () {
            //#endregion
            function AdminCtrl($scope, common, core) {
                var _this = this;
                this.existSpec = false;
                this.getSpecialities = function () {
                    var promise = _this.core.dataService.getSpecialities(_this.requestData, function (response, success) {
                        _this.spec = response;
                    });
                    return promise;
                };
                this.checkSpeciality = function () {
                    var i = 0;
                    while ((i < _this.spec.length) && (_this.existSpec == false)) {
                        if (_this.addSpecialityRequest.specialityName != _this.spec[i].specialityName) {
                            _this.existSpec = false;
                        }
                        else {
                            _this.existSpec = true;
                        }
                        ++i;
                    }
                };
                this.addSpeciality = function () {
                    _this.existSpec = false;
                    _this.checkSpeciality();
                    if (_this.existSpec) {
                        _this.logError('This speciality already exist!');
                    }
                    else {
                        var promise = _this.core.dataService.addSpeciality(_this.addSpecialityRequest, function (response, success) {
                            if (success) {
                                _this.addSpecialityRequest.specialityName = "";
                                _this.logSuccess('The speciality was created');
                            }
                            else {
                                _this.logError('This speciality cannot be created');
                            }
                            _this.getSpecialities();
                        });
                        return promise;
                    }
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
                this.$scope = $scope;
                this.common = common;
                this.controllerId = AdminCtrl.controllerId;
                this.core = core;
                this.log = this.common.logger.getLogFn(AdminCtrl.controllerId);
                this.logError = this.common.logger.getLogFn('', 'error');
                this.logWarning = this.common.logger.getLogFn('', 'warn');
                this.logSuccess = this.common.logger.getLogFn('', 'success');
                this.addSpecialityRequest = new App.Services.AddSpecialityRequest();
                this.requestData = new App.Services.GetSpecialityRequest();
                this.deleteSpecialityRequest = new App.Services.DeleteSpecialityRequest();
                this.activate([this.getSpecialities()]);
            }
            AdminCtrl.prototype.activate = function (promises) {
                this.common.activateController([], AdminCtrl.controllerId)
                    .then(function () { });
            };
            AdminCtrl.controllerId = 'adminCtrl';
            return AdminCtrl;
        }());
        Controllers.AdminCtrl = AdminCtrl;
        // Register with angular
        App.app.controller(AdminCtrl.controllerId, ['$scope', 'common', 'core', function ($scope, common, core) { return new AdminCtrl($scope, common, core); }]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=admin.js.map