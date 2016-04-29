'use strict';
module App.Controllers {

    export class DetailsCtrl {
        public static controllerId: string = 'detailsCtrl';

        //#region Variables
        $scope: any;
        $location: ng.ILocationService;
        controllerId = DetailsCtrl.controllerId;
        common: App.Shared.ICommon;
        core: App.Services.ICore;
        $route : any;
        $routeParams: any;
        theParam: string;
        dbMester: any;
        ngDialog: any;
        log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;
        mesterResultPage: any;
        newReviewMester: any;
        thePrice: string;
        totalResults: number;
        mesterAvgRating: number;
        reviewMesterResultPage: any;
        itemResults: Array<any>;
        addMesterReviewRequest: App.Services.AddMesterReviewRequest;
        searchReviewMesterRequest: App.Services.SearchReviewMesterRequest;

        constructor($scope: any, $route, $routeParams, $location: ng.ILocationService, common, core: App.Services.ICore, ngDialog: any) {
            this.$scope = $scope;
            this.$route = $route ;
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.common = common;
            this.core = core;
            this.ngDialog = ngDialog;
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
            this.itemResults = new Array<any>();
            this.addMesterReviewRequest = new App.Services.AddMesterReviewRequest();
            this.searchReviewMesterRequest = new App.Services.SearchReviewMesterRequest();
            this.activate([this.getMester(this.$routeParams.mesterId)]);
        }

        // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { this.log('Activated Dashboard View'); });

        }

        getMester = (idMester: string) => {
            var getMesterRequest = new App.Services.GetMesterRequest();
            getMesterRequest.idMester = idMester;
            this.theParam = idMester;
            var promise = this.core.dataService.getMester(getMesterRequest, (response, success) => {
                this.dbMester = response;
                this.thePrice = this.dbMester.avgPrice;
                if (success) {
                    this.logSuccess('Mester details !');
                } else {
                    this.logError('Mester details not found !');
                }
            });
            return promise;
        }

        lastRequestLength = 0;

        searchReviewMester = (idMester: string) => {
            if (this.lastRequestLength != 0 && this.lastRequestLength == this.itemResults.length) {
                return;
            }
            this.lastRequestLength = this.itemResults.length;
            this.searchReviewMesterRequest.idMester = idMester;
            this.searchReviewMesterRequest.pageNumber = (this.itemResults.length);
            this.searchReviewMesterRequest.pageSize = 10;

            var promise = this.core.dataService.searchReviewMester(this.searchReviewMesterRequest, (response, success) => {
                this.reviewMesterResultPage = response;
                this.itemResults = this.itemResults.concat(response.contentPage)
                this.totalResults = response.totalResults;
                //this.itemResults = this.itemResults.push.apply(response.contentPage);
                // if (success) {
                //     this.logSuccess('The search for reviews was succesful !');
                // } else {
                //     this.logError('The search for reviews failed !');
                // }
            });
            return promise;
        }

        addMesterReview = () => {
            this.addMesterReviewRequest.idMester = this.$routeParams.mesterId; //'1ad544dc-eae0-4c6c-b5d6-6a68695afc40';
            this.addMesterReviewRequest.idClient = this.$routeParams.clientId; //'3448cfec-d77d-4023-9d2e-903889881510';
            var promise = this.core.dataService.addMesterReview(this.addMesterReviewRequest, (response, success) => {
                this.newReviewMester = response;
                if (success) {
                    this.logSuccess('The review was created !');
                } else {
                    this.logError('Cannot create the review! ');
                }
            });
            return promise;
        }

        addReview = () => {
            this.ngDialog.open({ template: 'templateId', scope: this.$scope });
           // this.reloadPage();
        }

        myPagingFunction = () => {
            if (this.totalResults <= this.itemResults.length) { return; }
            this.searchReviewMester(this.$routeParams.mesterId);
        }

        goBack = () => {
            this.$location.path('#/dashboard');
        }

        reloadPage = () => {
             this.$route.reload();
        }

    }
    // register controller with angular
    app.controller(DetailsCtrl.controllerId, ['$scope', '$route', '$routeParams', '$location', 'common', 'core', 'ngDialog',
        ($scope, $route, $routeParams, $location, common, core, ngDialog) => new App.Controllers.DetailsCtrl($scope, $route, $routeParams, $location, common, core, ngDialog)
    ]);
}