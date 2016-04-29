'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var DashboardCtrl = (function () {
            //#endregion
            function DashboardCtrl($scope, $location, common, core, ngDialog) {
                var _this = this;
                //#region Variables
                this.controllerId = DashboardCtrl.controllerId;
                this.allElem = 10;
                //#region Public Methods
                this.getSpecialities = function () {
                    var requestData = new App.Services.GetSpecialityRequest();
                    var promise = _this.core.dataService.getSpecialities(requestData, function (response, success) {
                        _this.specialityList = response;
                    });
                    return promise;
                };
                this.searchMester = function () {
                    // save the request obj 
                    _this.core.sesionService.searchMesterRequestMaintener = _this.searchMesterRequest;
                    var promise = _this.core.dataService.searchMester(_this.searchMesterRequest, function (response, success) {
                        _this.mesterResultPage = response;
                        _this.allElem = _this.mesterResultPage.totalResults;
                        _this.gridOptions.data = response.contentPage;
                        if (success) {
                            _this.logSuccess('The search was succesful !');
                        }
                        else {
                            _this.logError('The search failed ! review the input data! ');
                        }
                    });
                    return promise;
                };
                this.advanceSearch = function () {
                    _this.ngDialog.open({ template: 'templateId', scope: _this.$scope });
                    _this.searchMester();
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
                    totalItems: this.allElem,
                    data: [],
                    columnDefs: [
                        { name: 'id', visible: false },
                        { name: 'firstName' },
                        { name: 'lastName' },
                        { name: 'location' },
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
                //#endregion
                this.redirectToDetails = function (id) {
                    var _url = 'details/' + '2' + '/' + id;
                    _this.$location.path(_url);
                };
                this.goBack = function () {
                    _this.core.sesionService.resetDashboardPage();
                    _this.$location.path('#/dashboard');
                };
                this.$scope = $scope;
                this.$location = $location;
                this.core = core;
                this.common = common;
                this.ngDialog = ngDialog;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.allElem = 50;
                this.searchMesterRequest = new App.Services.SearchMesterRequest();
                this.getLogCredentialsRequest = new App.Services.GetLogCredentialsRequest();
                this.allThis = this.core.dataService.isLogged;
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
                    _this.log('Activated Dashboard View');
                });
            };
            DashboardCtrl.controllerId = 'dashboardCtrl';
            return DashboardCtrl;
        }());
        Controllers.DashboardCtrl = DashboardCtrl;
        // register controller with angular
        App.app.controller(DashboardCtrl.controllerId, ['$scope', '$location', 'common', 'core', 'ngDialog',
            function ($scope, $location, common, core, ngDialog) { return new App.Controllers.DashboardCtrl($scope, $location, common, core, ngDialog); }
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