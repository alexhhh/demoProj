/// <reference path="../common/common.ts" />
'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var AdminCtrl = (function () {
            //#endregion
            function AdminCtrl(common, datacontext, dataService) {
                var _this = this;
                this.getSpecialities = function () {
                    var requestData = new App.Services.GetSpecialityRequest();
                    var promise = _this.dataService.getSpecialities(requestData, function (response) {
                        _this.spec = response;
                    });
                    return promise;
                };
                this.addSpeciality = function () {
                    var promise = _this.dataService.addSpeciality(_this.addSpecialityRequest, function (response) {
                        _this.getSpecialities();
                    });
                    return promise;
                };
                this.deleteSpeciality = function (id) {
                    var deleteSpecialityRequest = new App.Services.DeleteSpecialityRequest();
                    deleteSpecialityRequest.idSpeciality = id;
                    var promise = _this.dataService.deleteSpeciality(deleteSpecialityRequest, function (response) {
                        _this.getSpecialities();
                    });
                    return promise;
                };
                this.common = common;
                this.controllerId = AdminCtrl.controllerId;
                this.title = "Admin";
                this.log = this.common.logger.getLogFn(AdminCtrl.controllerId);
                this.dataService = dataService;
                this.addSpecialityRequest = new App.Services.AddSpecialityRequest();
                this.activate([this.getSpecialities()]);
            }
            //#region private methods
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
        App.app.controller(AdminCtrl.controllerId, ['common', 'datacontext', 'dataService',
            function (common, datacontext, dataService) { return new AdminCtrl(common, datacontext, dataService); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=admin.js.map