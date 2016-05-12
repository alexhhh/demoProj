'use strict';
module App.Controllers {

    export class DashboardCtrl {
        public static controllerId: string = 'dashboardCtrl';
        //#region Variables
        controllerId = DashboardCtrl.controllerId;

        $scope: any;
        $location: ng.ILocationService
        core: App.Services.ICore
        common: App.Shared.ICommon;

        specialityList: Array<any>;
        log: any;
        logSuccess: Function;
        logError: Function;
        logWarning: Function;

        mesterResultPage: any;
        ngDialog: any;
        paginationOptions: any;
        itemId: string;
        currentRole : string ;
        allElem: number = 10;
        userToken: any;
        allThis: boolean;
        searchMesterRequest: App.Services.SearchMesterRequest;
        getLogCredentialsRequest: App.Services.GetLogCredentialsRequest;

        //#endregion
        constructor($scope, $location: ng.ILocationService, common, core: App.Services.ICore, ngDialog: any) {
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
            this.allThis = this.core.sesionService.isLogged;
            // Queue all promises and wait for them to finish before loading the view
            this.activate([this.getSpecialities()]);
        }

        // TODO: is there a more elegant way of activating the controller - base class?
        private activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => {
                    if (this.core.sesionService.searchMesterRequestMaintener) {
                        this.searchMesterRequest = this.core.sesionService.searchMesterRequestMaintener;
                        this.searchMester();
                    }
                    this.log('Activated Dashboard View');
                });
        }

        //#region Public Methods

        getSpecialities = () => {
            var requestData = new App.Services.GetSpecialityRequest();
            var promise = this.core.dataService.getSpecialities(requestData, (response, success) => {
                this.specialityList = response;
            });
            return promise;
        }

        searchMester = () => {
            // save the request obj 
            this.core.sesionService.searchMesterRequestMaintener = this.searchMesterRequest;
            var promise = this.core.dataService.searchMester(this.searchMesterRequest, (response, success) => {
                this.mesterResultPage = response;
                this.allElem = this.mesterResultPage.totalResults;
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
            toggleFullRowSelection: () => { },
            isRowSelectable: () => { },
            onRegisterApi: (gridApi) => {
                this.$scope.gridApi = gridApi;
                gridApi.pagination.on.paginationChanged(this.$scope, (newPage, pageSize) => {
                    this.searchMesterRequest.pageNumber = newPage;
                    this.searchMesterRequest.pageSize = pageSize;
                    this.searchMester();
                });
                gridApi.selection.on.rowSelectionChanged(this.$scope, (item) => {
                    this.redirectToDetails(item.entity.id);
                });
                gridApi.selection.on.rowSelectionChangedBatch(this.$scope, (item) => {
                });
            }
        }
        //#endregion

        redirectToDetails = (iduAsta: string) => {
             var _url = 'details/'+ iduAsta ;
            if (this.core.sesionService.userRole=='ROLE_CLIENT'){
                _url=_url+'/'+ this.core.sesionService.userDetails.id
            } 
            this.$location.path(_url);
        }


        goBack = () => {
            this.core.sesionService.resetDashboardPage();
            this.$location.path('#/dashboard');
             
        }


    }

    // register controller with angular
    app.controller(DashboardCtrl.controllerId, ['$scope', '$location', 'common', 'core', 'ngDialog',
        ($scope, $location, common, core, ngDialog) => new App.Controllers.DashboardCtrl($scope, $location, common, core, ngDialog)
    ]);

    var mapPrice = (($sce: any): any => {

        var genderHash = {
            1: 'LOW',
            2: 'MEDIUM',
            3: 'HIGH'
        };

        var xprice: any = (input: number) => {
            if (!input) {
                return '';
            } else {
                return genderHash[input];
            }
        }
        return xprice;
    });

    app.filter("mapPrice", ['$sce', ($sce) => mapPrice($sce)]);

    var mapRating = (($sce: any): any => {

        var genderHash = {
            1: '*',
            2: '**',
            3: '***',
            4: '****',
            5: '*****'
        };

        var xrating: any = (input: number) => {
            if (!input) {
                return '';
            } else {
                return genderHash[input];
            }
        }
        return xrating;
    });

    app.filter("mapRating", ['$sce', ($sce) => mapRating($sce)]);

}