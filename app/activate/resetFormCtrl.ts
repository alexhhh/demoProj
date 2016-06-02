'use strict';
module App.Controllers {

    export class ResetFormCtrl {
        public static controllerId: string = 'resetFormCtrl';

        //#region Variables
        $scope: any;
        controllerId = DetailsCtrl.controllerId;
        common: App.Shared.ICommon;
        core: App.Services.ICore
        $routeParams: any;
        
        checkPassword: string;
        log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;
        tokenRequest : App.Services.GetUserTokenRequest;       


        constructor($scope: any, common, $routeParams, core: App.Services.ICore ) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.common = common;
            this.core = core;
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success'); 
            this.tokenRequest=  new App.Services.GetUserTokenRequest();            
            this.activate([this.getUserToken(this.$routeParams.tokenId)]);
        }

        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { 
                    
        });}
       
          getUserToken = (tokenId : string) => {  
            var   token= new App.Services.TokenRequest();
              token.tokenId = tokenId;       
            var promise = this.core.dataService.getUserToken( token, (response, success) => {
                this.tokenRequest= response;
            });
            return promise;
        }


        resetUserPassword = () => {                            
            var promise = this.core.dataService.resetUserPassword(this.tokenRequest, (response, success) => {  
                if(success){ 
                    this.$scope.passwordForm.$setPristine();
                    this.logSuccess("The password is updated!");
                }else {
                     this.logError("Cannot update the password!");
                }});
            return promise;
        }

    }
    app.controller(ResetFormCtrl.controllerId, ['$scope', 'common','$routeParams', 'core',
        ($scope, common, $routeParams, core) => new App.Controllers.ResetFormCtrl($scope, common, $routeParams, core)
    ]);


}