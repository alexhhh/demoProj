'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var MesterCtrl = (function () {
            //#endregion
            function MesterCtrl($scope, common, core, ngDialog) {
                var _this = this;
                //#region Variables
                this.controllerId = MesterCtrl.controllerId;
                this.checkPassword = "";
                this.getSpecialities = function () {
                    var requestData = new App.Services.GetSpecialityRequest();
                    var promise = _this.core.dataService.getSpecialities(requestData, function (response, success) {
                        _this.specialityList = response;
                    });
                    return promise;
                };
                this.getMester = function () {
                    _this.getMesterRequest.idMester = _this.core.sesionService.userDetails.id;
                    _this.userViewModel.userName = _this.core.sesionService.userDetails.userName;
                    var promise = _this.core.dataService.getMester(_this.getMesterRequest, function (response, success) {
                        _this.editMesterRequest.id = _this.core.sesionService.userDetails.id;
                        _this.editMesterRequest.firstName = response.firstName;
                        _this.editMesterRequest.lastName = response.lastName;
                        _this.editMesterRequest.location = response.location;
                        _this.editMesterRequest.description = response.description;
                        _this.editMesterRequest.contact = response.contact;
                        _this.editMesterRequest.contact.telNr = response.contact.telNr;
                        _this.editMesterRequest.contact.site = response.contact.site;
                        _this.editMesterRequest.contact.email = response.contact.email;
                        var ids = response.speciality.map(function (item) { return item.id; });
                        _this.specialityIds.length = 0;
                        _this.specialityIds.push.apply(_this.specialityIds, ids);
                        // this.editMesterRequest.speciality = response.speciality;
                        //  [ '128df176-4b2d-4f6b-a60e-91c557e0c3cd'];
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
                    var finalList = new Array();
                    for (var index = 0; index < _this.specialityIds.length; index++) {
                        var itemId = _this.specialityIds[index];
                        var speciality = _this.specialityList.filter(function (item) {
                            return item.id == itemId;
                        })[0];
                        if (!speciality) {
                            continue;
                        }
                        finalList.push(speciality);
                    }
                    //this.editMesterRequest.speciality.map(item => this.specialityList.filter((item) => { return null;    } )   );
                    _this.editMesterRequest.speciality = finalList;
                    var promise = _this.core.dataService.editMester(_this.editMesterRequest, function (response, success) {
                        if (success) {
                            _this.logSuccess('The mester was edited !');
                        }
                        else {
                            _this.logError('Cannot edit the mester ! review the input data! ');
                        }
                    });
                    return promise;
                };
                this.changePassword = function () {
                    _this.ngDialog.open({ template: 'passwordTemplate', scope: _this.$scope });
                };
                this.submit = function () {
                    _this.editUserRequest.password = _this.userViewModel.password;
                    _this.editUser();
                };
                this.editUser = function () {
                    _this.editUserRequest.id = _this.core.sesionService.userDetails.id;
                    var promise = _this.core.dataService.editUser(_this.editUserRequest, function (response, success) {
                        if (success) {
                            _this.core.sesionService.userToken = null;
                            _this.getLogCredentialsRequest.userName = _this.userViewModel.userName;
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
                this.getMesterRequest = new App.Services.GetMesterRequest();
                this.userViewModel = new App.Services.UserViewModel();
                this.editUserRequest = new App.Services.EditUserRequest();
                this.getLogCredentialsRequest = new App.Services.GetLogCredentialsRequest();
                this.editMesterRequest = new App.Services.AddEditMesterRequest();
                this.specialityIds = new Array();
                // Queue all promises and wait for them to finish before loading the view
                this.activate([this.getSpecialities(), this.getMester()]);
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
        App.app.controller(MesterCtrl.controllerId, ['$scope', 'common', 'core', 'ngDialog',
            function ($scope, common, core, ngDialog) { return new App.Controllers.MesterCtrl($scope, common, core, ngDialog); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=mesterCtrl.js.map