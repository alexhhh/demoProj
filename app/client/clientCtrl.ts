'use strict';
module App.Controllers {

    export class ClientCtrl {
        public static controllerId: string = 'clientCtrl';

        //#region Variables
        controllerId = ClientCtrl.controllerId;
        common: App.Shared.ICommon;
        datacontext: App.Services.IDatacontext;
        dataService: Services.IDataService;
        log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;
        searchCriteria: Array<any>;
        dbMester: any;
        theParam: string;
        totalRezults: number;
        mesterResultPage: any;
        mesterAvgRating: number;
        reviewMesterResultPage: any;
        newReviewMester: any;
        unIdClient : string ;
        searchMesterRequest: App.Services.SearchMesterRequest;
        getMesterRequest: App.Services.GetMesterRequest;
        searchReviewMesterRequest: App.Services.SearchReviewMesterRequest;
        getMesterAvgRatingRequest: App.Services.GetMesterAvgRatingRequest;
        addMesterReviewRequest : App.Services.AddMesterReviewRequest;
        
        //#endregion
        constructor(common, datacontext, dataService: Services.IDataService) {
            this.common = common;
            this.datacontext = datacontext;
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
            this.unIdClient='1ab7cf97-619e-4281-a11e-5bb0c7077149';
            this.dataService = dataService;
            this.searchCriteria = ['First Name', 'Last Name', 'Location', 'Speciality Name', 'Email', 'Phone Number', 'Rating', 'Price'];

            this.searchMesterRequest = new App.Services.SearchMesterRequest();
            this.searchReviewMesterRequest = new App.Services.SearchReviewMesterRequest();
            this.getMesterAvgRatingRequest = new App.Services.GetMesterAvgRatingRequest();
            this.addMesterReviewRequest = new App.Services.AddMesterReviewRequest();
            // Queue all promises and wait for them to finish before loading the view
            this.activate([]);

        }

        // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { this.log('Activated Dashboard View'); });
        }


        searchMester = () => {
            var promise = this.dataService.searchMester(this.searchMesterRequest, (response, success) => {
                this.mesterResultPage = response;
                if (success) {
                    this.logSuccess('The search was succesful !');
                } else {
                    this.logError('The search failed ! review the input data! ');
                }
            });
            return promise;
        }


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


        searchReviewMester = () => {
            this.searchReviewMesterRequest.idMester = this.theParam;

            var promise = this.dataService.searchReviewMester(this.searchReviewMesterRequest, (response, success) => {
                this.reviewMesterResultPage = response;
                if (success) {
                    this.logSuccess('The search for reviews was succesful !');
                } else {
                    this.logError('The search for reviews failed !');
                }
            });
            return promise;
        }


        getMesterRating = () => {
            this.getMesterAvgRatingRequest.idMester = this.theParam;

            var promise = this.dataService.getMesterRating(this.getMesterAvgRatingRequest, (response, success) => {
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
              this.addMesterReviewRequest.idMester = this.theParam;
             this.addMesterReviewRequest.idClinet='3448cfec-d77d-4023-9d2e-903889881510';
                         var promise = this.dataService.addMesterReview( this.addMesterReviewRequest, (response, success) => {
                this.newReviewMester=response;
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
    app.controller(ClientCtrl.controllerId, ['common', 'datacontext', 'dataService',
        (c, dc, dataService) => new App.Controllers.ClientCtrl(c, dc, dataService)
    ]);
}