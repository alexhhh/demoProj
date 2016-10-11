/// <reference path="./../../scripts/typings/google.maps.d.ts" />
'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var DashboardCtrl = (function () {
            //#endregion
            function DashboardCtrl($scope, $location, common, core, ngDialog, NgMap) {
                var _this = this;
                //#region Variables
                this.controllerId = DashboardCtrl.controllerId;
                this.nrMesteri = 10;
                this.markers = [];
                this.forms = [];
                this.getSpecialities = function () {
                    var requestData = new App.Services.GetSpecialityRequest();
                    var promise = _this.core.dataService.getSpecialities(requestData, function (response, success) {
                        _this.specialityList = response;
                    });
                    return promise;
                };
                this.advanceSearch = function () {
                    _this.ngDialog.open({ template: 'templateId', scope: _this.$scope });
                };
                this.searchMester = function () {
                    _this.core.sesionService.searchMesterRequestMaintener = _this.searchMesterRequest;
                    var promise = _this.core.dataService.searchMester(_this.searchMesterRequest, function (response, success) {
                        if (success) {
                            _this.mesteriList = response.contentPage;
                            _this.nrMesteri = response.totalResults;
                            _this.gridOptions.data = response.contentPage;
                            _this.doThat();
                            _this.logSuccess('The search was succesful !');
                        }
                        else {
                            _this.logError('The search failed ! review the input data! ');
                        }
                    });
                    return promise;
                };
                this.searchMesterByArea = function () {
                    var promise = _this.core.dataService.searchMesterByArea(_this.areaBorders, function (response, success) {
                        if (success) {
                            _this.mesteriList = response;
                            _this.nrMesteri = response.length;
                            _this.gridOptions.data = response;
                            _this.doThat();
                            _this.logSuccess('The search was succesful !');
                        }
                        else {
                            _this.logError('The search failed ! review the input data! ');
                        }
                    });
                    return promise;
                };
                this.gridOptions = {
                    enableFullRowSelection: true,
                    enableRowSelection: true,
                    enableSorting: true,
                    enableRowHeaderSelection: false,
                    modifierKeysToMultiSelect: false,
                    multiSelect: false,
                    selectAllRows: false,
                    noUnselect: true,
                    enablePaginationControls: true,
                    useExternalPagination: true,
                    useExternalSorting: true,
                    paginationPageSizes: [10, 25, 50, 75],
                    paginationPageSize: 10,
                    enableSelection: true,
                    totalItems: this.nrMesteri,
                    data: [],
                    columnDefs: [
                        { name: 'id', visible: false },
                        { name: 'firstName' },
                        { name: 'lastName' },
                        { name: 'location.location' },
                        { name: 'description' },
                        { name: 'avgPrice', cellFilter: 'mapPrice' },
                        { name: 'avgRating', cellFilter: 'mapRating' }
                    ],
                    toggleFullRowSelection: function () { },
                    isRowSelectable: function () { },
                    onRegisterApi: function (gridApi) {
                        _this.$scope.gridApi = gridApi;
                        gridApi.pagination.on.paginationChanged(_this.$scope, function (newPage, pageSize) {
                            _this.searchMesterRequest.pageNumber = newPage;
                            _this.searchMesterRequest.pageSize = pageSize;
                            _this.searchMester();
                        });
                        gridApi.selection.on.rowSelectionChanged(_this.$scope, function (item) {
                            _this.redirectToDetails(item.entity.id);
                        });
                        gridApi.selection.on.rowSelectionChangedBatch(_this.$scope, function (item) {
                        });
                    }
                };
                this.doThat = function () {
                    var ids = [];
                    if (_this.nrMesteri) {
                        for (var i = 0; i < _this.nrMesteri; i++) {
                            ids.push(_this.mesteriList[i].id);
                        }
                        _this.NgMap.getMap('dashboardMap').then(function (map) {
                            var promise = _this.core.dataService.getLocationByIds(ids, function (response, success) {
                                if (success) {
                                    for (var i = 0; i < _this.markers.length; i++) {
                                        _this.markers[i].setMap(null);
                                    }
                                    _this.locationList = response;
                                    _this.markers = [];
                                    var latlngbounds = new google.maps.LatLngBounds();
                                    for (var i = 0; i < _this.nrMesteri; i++) {
                                        var myLatLng = new google.maps.LatLng(_this.locationList[i].latitude, _this.locationList[i].longitude);
                                        //  this.getMester(this.mesteriList[i].id );
                                        var marker = new google.maps.Marker({
                                            title: " Mester: " + _this.mesteriList[i].firstName + " " + _this.mesteriList[i].lastName +
                                                ",\n Rating: " + _this.mesteriList[i].avgRating + "/5,\n Phone nr: " + _this.mesteriList[i].contact.telNr + ".",
                                            map: map,
                                            position: myLatLng
                                        });
                                        latlngbounds.extend(myLatLng);
                                        _this.markers.push(marker);
                                        map.fitBounds(latlngbounds);
                                    }
                                }
                                else {
                                    _this.logError('The search failed ! review the input data! ');
                                }
                            });
                        });
                    }
                };
                this.initGMaps = function () {
                    var geocoder = new google.maps.Geocoder;
                    var infowindow = new google.maps.InfoWindow;
                    _this.NgMap.getMap('dashboardMap').then(function (map) {
                        google.maps.event.addListener(map, 'click', function (e) {
                            for (var i = 0; i < _this.markers.length; i++) {
                                _this.markers[i].setMap(null);
                            }
                            _this.markers = [];
                            var marker = new google.maps.Marker({
                                title: "Your searched location",
                                map: map,
                                position: e.latLng
                            });
                            _this.lastLatLong = e.latLng;
                            _this.markers.push(marker);
                            geocoder.geocode({ 'location': e.latLng }, function (results, status) {
                                if (status === google.maps.GeocoderStatus.OK) {
                                    if (results[0]) {
                                        map.setCenter(results[0].geometry.location);
                                        for (var i = 0; i < results[0].address_components.length; i++) {
                                            if (results[0].address_components[i].types[0] == "locality") {
                                                _this.searchMesterRequest.location = results[0].address_components[i].long_name;
                                            }
                                        }
                                        infowindow.setContent("Your search location");
                                        infowindow.open(map, marker);
                                    }
                                    else {
                                        window.alert('No results found');
                                    }
                                }
                                else {
                                    window.alert('Geocoder failed due to: ' + status);
                                }
                                if (!_this.$scope.$$phase) {
                                    _this.$scope.$apply();
                                }
                                _this.searchMester();
                            });
                        });
                    });
                };
                this.redirectToDetails = function (iduAsta) {
                    var _url = 'details/' + iduAsta;
                    if (_this.core.sesionService.userRole == 'ROLE_CLIENT') {
                        _url = _url + '/' + _this.core.sesionService.theClient.id;
                    }
                    _this.$location.path(_url);
                };
                this.goBack = function () {
                    _this.core.sesionService.resetDashboardPage();
                    _this.searchMesterRequest = new App.Services.SearchMesterRequest();
                    _this.NgMap.getMap('dashboardMap').then(function (map) {
                        for (var i = 0; i < _this.markers.length; i++) {
                            _this.markers[i].setMap(null);
                        }
                        for (var i = 0; i < _this.forms.length; i++) {
                            _this.forms[i].setMap(null);
                        }
                        _this.gridOptions.data.length = 0;
                    });
                };
                this.drawSquare = function () {
                    for (var i = 0; i < _this.forms.length; i++) {
                        _this.forms[i].setMap(null);
                    }
                    _this.NgMap.getMap('dashboardMap').then(function (map) {
                        var ne = _this.calcCoord(_this.lastLatLong.lat(), _this.lastLatLong.lng(), _this.distanceForSquare, 45);
                        var sw = _this.calcCoord(_this.lastLatLong.lat(), _this.lastLatLong.lng(), _this.distanceForSquare, -135);
                        if (ne.lat() >= sw.lat()) {
                            _this.areaBorders.minLat = sw.lat();
                            _this.areaBorders.maxLat = ne.lat();
                        }
                        else {
                            _this.areaBorders.minLat = ne.lat();
                            _this.areaBorders.maxLat = sw.lat();
                        }
                        ;
                        if (ne.lng() >= sw.lng()) {
                            _this.areaBorders.minLng = sw.lng();
                            _this.areaBorders.maxLng = ne.lng();
                        }
                        else {
                            _this.areaBorders.minLng = ne.lng();
                            _this.areaBorders.maxLng = sw.lng();
                        }
                        ;
                        var rBounds = new google.maps.LatLngBounds(sw, ne);
                        var marker = new google.maps.Marker({
                            title: " NE",
                            map: map,
                            position: ne
                        });
                        _this.markers.push(marker);
                        var marker2 = new google.maps.Marker({
                            title: " SW",
                            map: map,
                            position: sw
                        });
                        _this.markers.push(marker2);
                        var rectangle = new google.maps.Rectangle({
                            strokeColor: '#FF0000',
                            strokeOpacity: 0.8,
                            map: map,
                            bounds: rBounds
                        });
                        _this.forms.push(rectangle);
                        // rectangle.setMap(map);
                    });
                    _this.searchMesterByArea();
                };
                this.calcCoord = function (lat, lng, d, brng) {
                    var toRad = Math.PI / 180;
                    var R = 6371;
                    var radDist = d / R;
                    lat = lat * toRad;
                    lng = ((lng + 540) % 360 - 180) * toRad;
                    var lat2 = Math.asin(Math.sin(lat) * Math.cos(radDist) + Math.cos(lat) * Math.sin(radDist) * Math.cos(brng * toRad));
                    var lgn2 = lng + Math.atan2(Math.sin(brng * toRad) * Math.sin(radDist) * Math.cos(lat), Math.cos(radDist) - Math.sin(lat) * Math.sin(lat2));
                    return new google.maps.LatLng(lat2 / toRad, lgn2 / toRad);
                };
                this.$scope = $scope;
                this.$location = $location;
                this.core = core;
                this.common = common;
                this.ngDialog = ngDialog;
                this.NgMap = NgMap;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.searchMesterRequest = new App.Services.SearchMesterRequest();
                this.getLogCredentialsRequest = new App.Services.GetLogCredentialsRequest();
                this.locationListRequest = new App.Services.LocationListRequest();
                this.areaBorders = new App.Services.SearchMesterByAreaRequest();
                this.allThis = this.core.sesionService.isLogged;
                // Queue all promises and wait for them to finish before loading the view
                this.activate([this.getSpecialities()]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            DashboardCtrl.prototype.activate = function (promises) {
                var _this = this;
                this.common.activateController(promises, this.controllerId)
                    .then(function () {
                    if (_this.core.sesionService.searchMesterRequestMaintener) {
                        _this.searchMesterRequest = _this.core.sesionService.searchMesterRequestMaintener;
                        _this.searchMester();
                    }
                    if (google.maps.event) {
                        _this.initGMaps();
                    }
                });
            };
            DashboardCtrl.controllerId = 'dashboardCtrl';
            return DashboardCtrl;
        }());
        Controllers.DashboardCtrl = DashboardCtrl;
        // register controller with angular
        App.app.controller(DashboardCtrl.controllerId, ['$scope', '$location', 'common', 'core', 'ngDialog', 'NgMap',
            function ($scope, $location, common, core, ngDialog, NgMap) { return new App.Controllers.DashboardCtrl($scope, $location, common, core, ngDialog, NgMap); }
        ]);
        var mapPrice = (function ($sce) {
            var genderHash = {
                1: 'LOW',
                2: 'MEDIUM',
                3: 'HIGH'
            };
            var xprice = function (input) {
                if (!input) {
                    return '';
                }
                else {
                    return genderHash[input];
                }
            };
            return xprice;
        });
        App.app.filter("mapPrice", ['$sce', function ($sce) { return mapPrice($sce); }]);
        var mapRating = (function ($sce) {
            var genderHash = {
                1: '*',
                2: '**',
                3: '***',
                4: '****',
                5: '*****'
            };
            var xrating = function (input) {
                if (!input) {
                    return '';
                }
                else {
                    return genderHash[input];
                }
            };
            return xrating;
        });
        App.app.filter("mapRating", ['$sce', function ($sce) { return mapRating($sce); }]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=dashboardCtrl.js.map