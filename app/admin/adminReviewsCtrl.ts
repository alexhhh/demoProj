'use strict';
module App.Controllers {

    export class AdminReviewsCtrl {
        public static controllerId: string = 'adminReviewsCtrl';

        //#region Variables
        controllerId = AdminReviewsCtrl.controllerId;
        common: App.Shared.ICommon;
        core: App.Services.ICore;
        theParam: string;
        itemResults: Array<any>;
        log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;
        totalResults: number;
        lastRequestLength: number = 0;
        reviewMesterResultPage: any;
        getAllReviewsRequest: App.Services.GetAllReviewsRequest;
        deleteReviewRequest: App.Services.DeleteReviewRequest;
        constructor(common, core: App.Services.ICore) {
            this.common = common;
            this.core = core;
            this.itemResults = new Array<any>();
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
            this.getAllReviewsRequest = new App.Services.GetAllReviewsRequest();
            this.deleteReviewRequest = new App.Services.DeleteReviewRequest();
            this.activate([]);
        }

        // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { });
        }

        getAllReviews = () => {
            if (this.lastRequestLength != 0 && this.lastRequestLength == this.itemResults.length) {
                return;
            }
            this.lastRequestLength = this.itemResults.length;
            this.getAllReviewsRequest.pageNumber = (this.itemResults.length)/5;
            this.getAllReviewsRequest.pageSize = 5;
            var promise = this.core.dataService.getAllFullReviews(this.getAllReviewsRequest, (response, success) => {
                if (success) {
                    this.reviewMesterResultPage = response;
                    this.itemResults = this.itemResults.concat(response.contentPage)
                    this.totalResults = response.totalResults;
                } else {
                    this.logError('The search for reviews failed !');
                }
            });
            return promise;
        }

        myPagingFunction = () => {
            if (this.totalResults <= this.itemResults.length) {  
               return;
            }
            this.getAllReviews();
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
                    }
                    this.logSuccess('The review was deleted');
                } else {
                    this.logError('This review cannot be deleted !');
                }
            });
        }

    }
    // register controller with angular
    app.controller(AdminReviewsCtrl.controllerId, ['common', 'core',
        (common, core) => new App.Controllers.AdminReviewsCtrl(common, core)
    ]);
}