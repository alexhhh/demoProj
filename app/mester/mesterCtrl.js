'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var MesterCtrl = (function () {
            //#endregion
            function MesterCtrl($scope, common, core) {
                var _this = this;
                //#region Variables
                this.controllerId = MesterCtrl.controllerId;
                this.getSpecialities = function () {
                    var requestData = new App.Services.GetSpecialityRequest();
                    var promise = _this.core.dataService.getSpecialities(requestData, function (response, success) {
                        _this.specialityList = response;
                    });
                    return promise;
                };
                this.addMester = function () {
                    var promise = _this.core.dataService.addMester(_this.addMesterRequest, function (response, success) {
                        _this.fullMester = response;
                        if (success) {
                            _this.logSuccess('The mester was created !');
                        }
                        else {
                            _this.logError('Cannot create the mester ! review the input data! ');
                        }
                    });
                    return promise;
                };
                this.getMester = function () {
                    _this.clearForm();
                    var promise = _this.core.dataService.getMester(_this.getMesterRequest, function (response, success) {
                        _this.fullMester = response;
                        _this.addMesterRequest.isEdit = true;
                        _this.addMesterRequest.firstName = response.firstName;
                        _this.addMesterRequest.lastName = response.lastName;
                        _this.addMesterRequest.location = response.location;
                        _this.addMesterRequest.description = response.description;
                        _this.addMesterRequest.contact = response.contact;
                        _this.addMesterRequest.speciality = response.speciality;
                        //this.addMesterRequest.speciality = ['128df176-4b2d-4f6b-a60e-91c557e0c3cd'];
                        //this.addMesterRequest.speciality.length = 0;
                        //this.addMesterRequest.speciality.push('128df176-4b2d-4f6b-a60e-91c557e0c3cd');
                        //this.addMesterRequest.speciality.length = 0;
                        //this.addMesterRequest.speciality.push('128df176-4b2d-4f6b-a60e-91c557e0c3cd');
                        if (success) {
                            _this.logSuccess('The mester was found !');
                        }
                        else {
                            _this.logError('There was an error in search! ');
                        }
                    });
                    return promise;
                };
                this.editMester = function () {
                    _this.clearForm();
                    _this.addMesterRequest.isEdit = false;
                    var promise = _this.core.dataService.editMester(_this.addMesterRequest, function (response, success) {
                        _this.fullMester = response;
                        if (success) {
                            _this.logSuccess('The mester was edited !');
                        }
                        else {
                            _this.logError('Cannot edit the mester ! review the input data! ');
                        }
                    });
                    return promise;
                };
                this.deleteMester = function () {
                    _this.deleteMesterRequest = _this.getMesterRequest;
                    var promise = _this.core.dataService.deleteMester(_this.deleteMesterRequest, function (response, success) {
                        if (success) {
                            _this.logSuccess('The mester was deleted !');
                        }
                        else {
                            _this.logError('Cannot delete the mester !');
                        }
                    });
                    return promise;
                };
                //#region private methods
                this.clearForm = function () {
                    _this.addMesterRequest = new App.Services.AddEditMesterRequest();
                    _this.$scope.mesteriForm.$setPristine();
                };
                this.$scope = $scope;
                this.common = common;
                this.core = core;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.addMesterRequest = new App.Services.AddEditMesterRequest();
                this.getMesterRequest = new App.Services.GetMesterRequest();
                this.deleteMesterRequest = new App.Services.DeleteMesterRequest();
                // Queue all promises and wait for them to finish before loading the view
                this.activate([this.getSpecialities()]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            MesterCtrl.prototype.activate = function (promises) {
                var _this = this;
                this.common.activateController(promises, this.controllerId)
                    .then(function () { _this.log('Activated Dashboard View'); });
            };
            MesterCtrl.controllerId = 'mesterCtrl';
            return MesterCtrl;
        }());
        Controllers.MesterCtrl = MesterCtrl;
        // register controller with angular
        App.app.controller(MesterCtrl.controllerId, ['$scope', 'common', 'core',
            function ($scope, common, core) { return new App.Controllers.MesterCtrl($scope, common, core); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=mesterCtrl.js.map