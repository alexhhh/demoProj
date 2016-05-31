'use strict';
module App.Controllers {

    export class ActivateCtrl {
        public static controllerId: string = 'activateCtrl';

        //#region Variables
        $scope: any;
        controllerId = DetailsCtrl.controllerId;
        common: App.Shared.ICommon;
        core: App.Services.ICore
        $routeParams: any;
        log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;


        constructor($scope: any, common, $routeParams, core: App.Services.ICore ) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.common = common;
            this.core = core;
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
            this.activate([this.activateUser(this.$routeParams.tokenId)]);
        }

        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { 
                    
        });}

        activateUser = (tokenId : String) => {
            var requestData = new App.Services.ActivateUserRequest();
                requestData.tokenId = this.$routeParams.tokenId;
            var promise = this.core.dataService.activateUser(requestData, (response, success) => {     
            });
            return promise;
        }

    }
    app.controller(ActivateCtrl.controllerId, ['$scope', 'common','$routeParams', 'core',
        ($scope, common, $routeParams, core) => new App.Controllers.ActivateCtrl($scope, common, $routeParams, core)
    ]);


}