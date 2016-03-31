'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var DashboardCtrl = (function () {
            //#endregion
            function DashboardCtrl($scope, common, datacontext, dataService, ngDialog) {
                var _this = this;
                //#region Variables
                this.controllerId = DashboardCtrl.controllerId;
                //#region Public Methods
                this.getSpecialities = function () {
                    var requestData = new App.Services.GetSpecialityRequest();
                    var promise = _this.dataService.getSpecialities(requestData, function (response, success) {
                        _this.specialityList = response;
                    });
                    return promise;
                };
                this.searchMester = function () {
                    var promise = _this.dataService.searchMester(_this.searchMesterRequest, function (response, success) {
                        _this.mesterResultPage = response;
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
                    multiSelect: false,
                    modifierKeysToMultiSelect: false,
                    enableRowSelection: true,
                    enableFullRowSelection: true,
                    selectAllRows: true,
                    noUnselect: true,
                    enablePaginationControls: true,
                    paginationPageSizes: [10, 25, 50, 75],
                    paginationPageSize: 10,
                    data: [],
                    columnDefs: [
                        { name: 'firstName' },
                        { name: 'lastName' },
                        { name: 'location' },
                        { name: 'description' }
                    ],
                    toggleFullRowSelection: function () { },
                    onRegisterApi: function (gridApi) {
                        // this.$scope.gridApi = gridApi;
                        // // ceva nu ii ok aci !???
                        // gridApi.selection.on.rowSelectionChanged(this.$scope, (item) => {
                        //     alert('1');
                        // });
                        // gridApi.selection.on.rowSelectionChangedBatch(this.$scope, (item) => {
                        //     alert("2");
                        // });
                    }
                };
                this.$scope = $scope;
                this.ngDialog = ngDialog;
                this.common = common;
                this.datacontext = datacontext;
                this.dataService = dataService;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.searchMesterRequest = new App.Services.SearchMesterRequest();
                // Queue all promises and wait for them to finish before loading the view
                this.activate([this.getSpecialities()]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            DashboardCtrl.prototype.activate = function (promises) {
                var _this = this;
                this.common.activateController(promises, this.controllerId)
                    .then(function () { _this.log('Activated Dashboard View'); });
            };
            DashboardCtrl.controllerId = 'dashboardCtrl';
            return DashboardCtrl;
        }());
        Controllers.DashboardCtrl = DashboardCtrl;
        // register controller with angular
        App.app.controller(DashboardCtrl.controllerId, ['$scope', 'common', 'datacontext', 'dataService', 'ngDialog',
            function ($scope, c, dc, dataService, ngDialog) { return new App.Controllers.DashboardCtrl($scope, c, dc, dataService, ngDialog); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=dashboardCtrl.js.map