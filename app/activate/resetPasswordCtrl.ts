'use strict';
module App.Controllers {

    export class ResetPasswordCtrl {
        public static controllerId: string = 'resetPasswordCtrl';

        //#region Variables
        $scope: any;
        controllerId = DetailsCtrl.controllerId;
        common: App.Shared.ICommon;
        core: App.Services.ICore
        $routeParams: any;
        ngDialog: any
        log: Function;
        verifyForm : any;
        verifyForm2: any;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;
        resetPassRequest : App.Services.ResetPasswordRequest;

        constructor($scope: any, common, $routeParams, core: App.Services.ICore, ngDialog: any) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.common = common;
            this.core = core;
            this.ngDialog =ngDialog;
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
            this.resetPassRequest = new App.Services.ResetPasswordRequest();
            this.activate([]);
        }

        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => {
                });
        }

        resetPass = () => {          
            var promise = this.core.dataService.resetPassword(this.resetPassRequest, (response, success) => {
                if (success) {
                    this.$scope.passwordForm.$setPristine();
                    this.ngDialog.open({ template: 'resetTemplate' });
                } else {
                    this.logError('Cannot reset the password!');
                }});
        }

    }
    app.controller(ResetPasswordCtrl.controllerId, ['$scope', 'common','$routeParams', 'core','ngDialog',
        ($scope, common, $routeParams, core, ngDialog) => new App.Controllers.ResetPasswordCtrl($scope, common, $routeParams, core, ngDialog)
    ]);


}