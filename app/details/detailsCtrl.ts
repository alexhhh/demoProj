'use strict';
module App.Controllers {

    export class DetailsCtrl {
        public static controllerId: string = 'detailsCtrl';

        //#region Variables
        $scope: any;
        controllerId = DetailsCtrl.controllerId;
        common: App.Shared.ICommon;
        datacontext: App.Services.IDatacontext;
        dataService: Services.IDataService;
        theParam: string;
        dbMester: any;

        log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;
        mesterResultPage: any;
        mesterAvgRating: number;
        reviewMesterResultPage: any;

        


        constructor($scope: any, common, datacontext, dataService: Services.IDataService) {
            this.$scope = $scope;
            this.common = common;
            this.datacontext = datacontext;
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
            this.dataService = dataService;
            this.activate([this.getMester('1ad544dc-eae0-4c6c-b5d6-6a68695afc40'), this.searchReviewMester('1ad544dc-eae0-4c6c-b5d6-6a68695afc40'), this.getMesterRating('1ad544dc-eae0-4c6c-b5d6-6a68695afc40')]);


        }

        // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { this.log('Activated Dashboard View'); });
        }


        // set idMester(value: string) {
        //     this.idMester = '1ad544dc-eae0-4c6c-b5d6-6a68695afc40';
        // }

        getMester = (idMester: string) => {
            
            var getMesterRequest = new App.Services.GetMesterRequest();
            getMesterRequest.idMester = idMester;
            this.theParam = idMester;
            var promise = this.dataService.getMester(getMesterRequest, (response, success) => {
                this.dbMester = response;
                if (success) {
                    this.logSuccess('Mester details !');
                } else {
                    this.logError('Mester details not found !');
                }
            });
            return promise;
        }

        searchReviewMester = (idMester: string) => {
            var searchReviewMesterRequest = new App.Services.SearchReviewMesterRequest();
            searchReviewMesterRequest.idMester = idMester;
            var promise = this.dataService.searchReviewMester(searchReviewMesterRequest, (response, success) => {
                this.reviewMesterResultPage = response;
                if (success) {
                    this.logSuccess('The search for reviews was succesful !');
                } else {
                    this.logError('The search for reviews failed !');
                }
            });
            return promise;
        }


        getMesterRating = (idMester: string) => {
            var getMesterAvgRatingRequest = new App.Services.GetMesterAvgRatingRequest();
            getMesterAvgRatingRequest.idMester = idMester;
            var promise = this.dataService.getMesterRating(getMesterAvgRatingRequest, (response, success) => {
                this.mesterAvgRating = response;
                if (success) {
                    this.logSuccess('The search for rating was succesful !');
                } else {
                    this.logError('The search for rating failed !');
                }
            });
            return promise;
        }

        addMesterReview = () => {
            var addMesterReviewRequest = new App.Services.AddMesterReviewRequest();
            addMesterReviewRequest.idMester = '1ad544dc-eae0-4c6c-b5d6-6a68695afc40';
             addMesterReviewRequest.idClinet='3448cfec-d77d-4023-9d2e-903889881510';
            var promise = this.dataService.addMesterReview( addMesterReviewRequest, (response, success) => {
                //this.newReviewMester=response;
                if (success) {
                    this.logSuccess('The review was created !');
                } else {
                    this.logError('Cannot create the review! ');
                }
            });           
            return promise;
               
        }


    }
    // register controller with angular


    app.controller(DetailsCtrl.controllerId, ['$scope', 'common', 'datacontext', 'dataService',
        ($scope, c, dc, dataService) => new App.Controllers.DetailsCtrl($scope, c, dc, dataService)
    ]);
}