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
        $route: any;
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
        currentRole: string;
        currentClientId: string;
        reviewMesterResultPage: any;
        itemResults: Array<any>;
        addMesterReviewRequest: App.Services.AddMesterReviewRequest;
        deleteReviewRequest: App.Services.DeleteReviewRequest;
        searchReviewMesterRequest: App.Services.SearchReviewMesterRequest;

        constructor($scope: any, $route, $routeParams, $location: ng.ILocationService, common, core: App.Services.ICore, ngDialog: any) {
            this.$scope = $scope;
            this.$route = $route;
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.common = common;
            this.core = core;
            this.ngDialog = ngDialog;
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
            this.currentRole = core.sesionService.userRole;           
            this.itemResults = new Array<any>();
            this.addMesterReviewRequest = new App.Services.AddMesterReviewRequest();
            this.deleteReviewRequest = new App.Services.DeleteReviewRequest();
            this.searchReviewMesterRequest = new App.Services.SearchReviewMesterRequest();     
            if( core.sesionService.userDetails != null) {
                this.currentClientId = core.sesionService.userDetails.id;
            }  else {this.currentClientId =null;} ;
            this.activate([
                this.getMester(this.$routeParams.mesterId)                
                ]);}

        // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => {  });
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
                if (success) {
                    this.reviewMesterResultPage = response;
                    this.itemResults = this.itemResults.concat(response.contentPage)
                    this.totalResults = response.totalResults;                   
                } else {
                    this.logError('The search for reviews failed !');
                }});            
            return promise;
        }

        addReview = () => {
            this.ngDialog.open({ template: 'templateId', scope: this.$scope });
        }

        addMesterReview = () => {
            this.addMesterReviewRequest.idMester = this.$routeParams.mesterId;  
            this.addMesterReviewRequest.idClient = this.$routeParams.clientId;  
            var promise = this.core.dataService.addMesterReview(this.addMesterReviewRequest, (response, success) => {
                this.newReviewMester = response;
                if (success) {
                    this.itemResults.push(this.newReviewMester);
                    this.totalResults = this.itemResults.length;
                    this.logSuccess('The review was created !');
                } else {
                    this.logError('Cannot create the review! ');
                }
            }); 
             this.itemResults.length=0;
             this.searchReviewMester(this.$routeParams.mesterId);
            return promise;
        }

        myPagingFunction = () => {
            if (this.totalResults <= this.itemResults.length) { return; }
            this.searchReviewMester(this.$routeParams.mesterId);
        }


        deleteReview = (item: any) => {
            if (!confirm('Are you sure about this ?')) {
                return;
            }
            this.deleteReviewRequest.idReview = item.id;
            var promise = this.core.dataService.deleteReview(this.deleteReviewRequest, (response, success) => {
                if (success) {
                    var indexItem = this.itemResults.indexOf(item);
                    if (indexItem >= 0) {
                        this.itemResults.splice(indexItem, 1);
                        this.totalResults = this.itemResults.length;
                    }
                    this.logSuccess('The review was deleted');
                } else {
                    this.logError('This review cannot be deleted !');
                }}); 
        }
 
        goBack = () => {
            if (this.core.sesionService.userRole == 'ROLE_ADMIN') {
                this.$location.path('admin-users');
            } else {
                this.$location.path('');
            }
        }

        reloadPage = () => {
            this.$route.reload();
        }

    }
 
    app.controller(DetailsCtrl.controllerId, ['$scope', '$route', '$routeParams', '$location', 'common', 'core', 'ngDialog',
        ($scope, $route, $routeParams, $location, common, core, ngDialog) => new App.Controllers.DetailsCtrl($scope, $route, $routeParams, $location, common, core, ngDialog)
    ]);
}