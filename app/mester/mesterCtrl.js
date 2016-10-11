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
                this.markers = [];
                this.getSpecialities = function () {
                    var requestData = new App.Services.GetSpecialityRequest();
                    var promise = _this.core.dataService.getSpecialities(requestData, function (response, success) {
                        _this.specialityList = response;
                    });
                    return promise;
                };
                this.changePassword = function () {
                    _this.ngDialog.open({ template: 'passwordTemplate', scope: _this.$scope });
                };
                this.submit = function () {
                    _this.editUserRequest.user.password = _this.userViewModel.password;
                    _this.editUser();
                };
                this.editUser = function () {
                    var promise = _this.core.dataService.editUser(_this.editUserRequest.user, function (response, success) {
                        if (success) {
                            _this.core.sesionService.userToken = null;
                            _this.getLogCredentialsRequest.userName = _this.userViewModel.userName;
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
                this.markThePlace = function () {
                    _this.NgMap.getMap('mesterMap').then(function (map) {
                        if (_this.markers.length > 0) {
                            _this.markers[0].setMap(null);
                        }
                        var myLatLng = new google.maps.LatLng(_this.editMesterRequest.location.latitude, _this.editMesterRequest.location.longitude);
                        var marker = new google.maps.Marker({
                            title: "Your original location",
                            map: map,
                            position: myLatLng
                        });
                        _this.markers.push(marker);
                        _this.initGMaps();
                    });
                    _this.logSuccess('The location coords are updated!');
                };
                this.initGMaps = function () {
                    var geocoder = new google.maps.Geocoder;
                    _this.NgMap.getMap('mesterMap').then(function (map) {
                        google.maps.event.addListener(map, 'click', function (e) {
                            for (var i = 0; i < _this.markers.length; i++) {
                                _this.markers[i].setMap(null);
                            }
                            var marker = new google.maps.Marker({
                                title: "Your location",
                                map: map,
                                position: e.latLng
                            });
                            _this.markers.push(marker);
                            geocoder.geocode({ 'location': e.latLng }, function (results, status) {
                                if (status === google.maps.GeocoderStatus.OK) {
                                    if (results[0]) {
                                        map.setCenter(results[0].geometry.location);
                                        for (var i = 0; i < results[0].address_components.length; i++) {
                                            if (results[0].address_components[i].types[0] == "locality") {
                                                _this.editMesterRequest.location.location = results[0].address_components[i].long_name;
                                                _this.editMesterRequest.location.latitude = results[0].geometry.location.lat();
                                                _this.editMesterRequest.location.longitude = results[0].geometry.location.lng();
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
                this.editUserMail = function () {
                    var promise = _this.core.dataService.editUserMail(_this.editUserRequest.user, function (response, success) {
                        if (success) {
                            _this.core.sesionService.userDetails.email = _this.editUserRequest.user.email;
                        }
                    });
                    return promise;
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
                            _this.core.sesionService.theMester = _this.editMesterRequest;
                            _this.editUserRequest.user.email = _this.editMesterRequest.contact.email;
                            _this.editUserMail();
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
                this.activate([this.getSpecialities()]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            MesterCtrl.prototype.activate = function (promises) {
                var _this = this;
                this.common.activateController(promises, this.controllerId)
                    .then(function () {
                    //this.fullMester=this.core.sesionService.theMester;
                    _this.getMesterRequest.idMester = _this.core.sesionService.theMester.id;
                    _this.userViewModel.id = _this.core.sesionService.userDetails.id;
                    _this.editUserRequest.user = _this.core.sesionService.userDetails;
                    _this.userViewModel.userName = _this.core.sesionService.userDetails.userName;
                    _this.editMesterRequest = _this.core.sesionService.theMester;
                    _this.editMesterRequest.contact.email = _this.core.sesionService.userDetails.email;
                    var ids = _this.core.sesionService.theMester.speciality.map(function (item) { return item.id; });
                    _this.specialityIds.length = 0;
                    _this.specialityIds.push.apply(_this.specialityIds, ids);
                    _this.markThePlace();
                });
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