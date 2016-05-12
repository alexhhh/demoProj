'use strict';
module App.Controllers {

    export class ClientReviewCtrl {
        public static controllerId: string = 'clientReviewCtrl';

        //#region Variables
        controllerId = ClientReviewCtrl.controllerId;        
        common: App.Shared.ICommon;
        core: App.Services.ICore;       
        theParam: string;
        itemResults : Array<any>;
        log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;
        totalResults: number;
        lastRequestLength : number = 0;
        reviewMesterResultPage: any;
        searchReviewformClientRequest : App.Services.SearchReviewFromClientRequest;
        deleteReviewRequest : App.Services.DeleteReviewRequest;
        
          constructor(  common, core: App.Services.ICore ) {          
            this.common = common;
            this.core = core;
            this.itemResults = new Array<any>();
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
            this.searchReviewformClientRequest = new App.Services.SearchReviewFromClientRequest();
            this.deleteReviewRequest = new App.Services.DeleteReviewRequest();
            this.activate([  ]);
        }

        // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { this.log('Activated Dashboard View'); });

        }
        

         searchReviewMester = () => {
            if (this.lastRequestLength != 0 && this.lastRequestLength == this.itemResults.length) {
                return;
            }
            this.lastRequestLength = this.itemResults.length;
            this.searchReviewformClientRequest.idClient = this.core.sesionService.userDetails.id;
            this.searchReviewformClientRequest.pageNumber = (this.itemResults.length);
            this.searchReviewformClientRequest.pageSize = 5;

            var promise = this.core.dataService.searchReviewFromClient(this.searchReviewformClientRequest, (response, success) => {
                this.reviewMesterResultPage = response;
                this.itemResults = this.itemResults.concat(response.contentPage)
                this.totalResults = response.totalResults;
            });
            return promise;
        }
        
          myPagingFunction = () => {
            if (this.totalResults <= this.itemResults.length) { return; }
            this.searchReviewMester( );
        }
        
       deleteReview = (item: any) => {
            if (!confirm('Are you sure about this ?')) {
                return;
            }
            this.deleteReviewRequest.idReview = item.id;
            var promise = this.core.dataService.deleteReview(this.deleteReviewRequest, (response, success) => {
                if (success) {
                    var indexItem = this.itemResults.indexOf(item);
                    if(indexItem >=0 ){
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
    app.controller(ClientReviewCtrl.controllerId, [ 'common', 'core',  
        (  common, core ) => new App.Controllers.ClientReviewCtrl(  common, core )
    ]);
}