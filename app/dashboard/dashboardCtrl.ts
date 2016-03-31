'use strict';
module App.Controllers {

    export interface INews {
        title: string;
        description: string;
    }

    export class DashboardCtrl {
        public static controllerId: string = 'dashboardCtrl';
        //#region Variables
        controllerId = DashboardCtrl.controllerId;

        $scope: any;
        common: App.Shared.ICommon;
        datacontext: App.Services.IDatacontext;
        dataService: Services.IDataService;
        specialityList: Array<any>;
        log: any;
        logSuccess: Function;
        logError: Function;
        logWarning: Function;
        searchMesterRequest: App.Services.SearchMesterRequest;
        mesterResultPage: any;
        ngDialog: any;

        //#endregion
        constructor($scope, common, datacontext, dataService: Services.IDataService, ngDialog: any) {
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
        private activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { this.log('Activated Dashboard View'); });
        }


        //#region Public Methods

        getSpecialities = () => {
            var requestData = new App.Services.GetSpecialityRequest();
            var promise = this.dataService.getSpecialities(requestData, (response, success) => {
                this.specialityList = response;
            });
            return promise;
        }

        searchMester = () => {
            var promise = this.dataService.searchMester(this.searchMesterRequest, (response, success) => {
                this.mesterResultPage = response;
                this.gridOptions.data = response.contentPage;
                if (success) {
                    this.logSuccess('The search was succesful !');
                } else {
                    this.logError('The search failed ! review the input data! ');
                }
            });
            return promise;
        }

        advanceSearch = () => {
           
           this.ngDialog.open({ template: 'templateId', scope: this.$scope });
           
           this.searchMester();
        }



        gridOptions = {
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
            toggleFullRowSelection: () => { },

            onRegisterApi: (gridApi) => {

                // this.$scope.gridApi = gridApi;

                // // ceva nu ii ok aci !???
                // gridApi.selection.on.rowSelectionChanged(this.$scope, (item) => {
                //     alert('1');
                // });
                // gridApi.selection.on.rowSelectionChangedBatch(this.$scope, (item) => {
                //     alert("2");

                // });
            }
        }
        //#endregion


    }

    // register controller with angular
    app.controller(DashboardCtrl.controllerId, ['$scope', 'common', 'datacontext', 'dataService', 'ngDialog',
        ($scope, c, dc, dataService, ngDialog) => new App.Controllers.DashboardCtrl($scope, c, dc, dataService, ngDialog)
    ]);
}