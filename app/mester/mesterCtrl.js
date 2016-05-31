/// <reference path="./../../scripts/typings/google.maps.d.ts" />
'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var MesterCtrl = (function () {
            //#endregion
            function MesterCtrl($scope, common, core, ngDialog, NgMap) {
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
                        if (success) {
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
                            _this.markThePlace();
                            _this.logSuccess('The mester was found !');
                        }
                        else {
                            _this.logError('There was an error in search! ');
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
                this.editMesterLocation = function () {
                    _this.editLocationRequest.mesterId = _this.editMesterRequest.id;
                    _this.editLocationRequest.location = _this.editMesterRequest.location;
                    var promise = _this.core.dataService.editMesterLocation(_this.editLocationRequest, function (response, success) {
                        if (success) {
                            _this.logSuccess('The location coords are updated!');
                        }
                        else {
                            _this.logError('An error occurred in the process!');
                        }
                    });
                };
                this.markThePlace = function () {
                    var promise = _this.core.dataService.getMesterLocation(_this.getMesterRequest, function (response, success) {
                        if (success) {
                            _this.NgMap.getMap('mesterMap').then(function (map) {
                                var myLatLng = new google.maps.LatLng(response.latitude, response.longitude);
                                var marker = new google.maps.Marker({
                                    title: "Your location",
                                    map: map,
                                    position: myLatLng
                                });
                            });
                            _this.logSuccess('The location coords are updated!');
                        }
                        else {
                            _this.logError('An error occurred in the process!');
                        }
                    });
                };
                this.initGMaps = function () {
                    var markers = [];
                    var geocoder = new google.maps.Geocoder;
                    _this.NgMap.getMap('mesterMap').then(function (map) {
                        google.maps.event.addListener(map, 'click', function (e) {
                            if (markers.length > 0) {
                                markers[0].setMap(null);
                            }
                            var marker = new google.maps.Marker({
                                title: "Your location",
                                map: map,
                                position: e.latLng
                            });
                            markers.push(marker);
                            geocoder.geocode({ 'location': e.latLng }, function (results, status) {
                                if (status === google.maps.GeocoderStatus.OK) {
                                    if (results[0]) {
                                        map.setCenter(results[0].geometry.location);
                                        for (var i = 0; i < results[0].address_components.length; i++) {
                                            if (results[0].address_components[i].types[0] == "locality") {
                                                _this.editMesterRequest.location = results[0].address_components[i].long_name;
                                                _this.editLocationRequest.latitude = results[0].geometry.location.lat();
                                                _this.editLocationRequest.longitude = results[0].geometry.location.lng();
                                            }
                                        }
                                    }
                                    else {
                                        _this.logError('No results found');
                                    }
                                }
                                else {
                                    _this.logError('Geocoder failed due to: ' + status);
                                }
                                if (!_this.$scope.$$phase) {
                                    _this.$scope.$apply();
                                }
                            });
                        });
                    });
                };
                this.editMester = function () {
                    var finalList = new Array();
                    for (var index = 0; index < _this.specialityIds.length; index++) {
                        var itemId = _this.specialityIds[index];
                        var speciality = _this.specialityList.filter(function (item) { return item.id == itemId; })[0];
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
                            _this.editMesterLocation();
                        }
                        else {
                            _this.logError('Cannot edit the mester ! review the input data! ');
                        }
                    });
                    return promise;
                };
                this.$scope = $scope;
                this.common = common;
                this.core = core;
                this.ngDialog = ngDialog;
                this.NgMap = NgMap;
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
                this.editLocationRequest = new App.Services.EditLocationRequest();
                this.activate([this.getSpecialities(), this.getMester()]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            MesterCtrl.prototype.activate = function (promises) {
                var _this = this;
                this.common.activateController(promises, this.controllerId)
                    .then(function () { _this.initGMaps(); });
            };
            MesterCtrl.controllerId = 'mesterCtrl';
            return MesterCtrl;
        }());
        Controllers.MesterCtrl = MesterCtrl;
        // register controller with angular
        App.app.controller(MesterCtrl.controllerId, ['$scope', 'common', 'core', 'ngDialog', 'NgMap',
            function ($scope, common, core, ngDialog, NgMap) { return new App.Controllers.MesterCtrl($scope, common, core, ngDialog, NgMap); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=mesterCtrl.js.map