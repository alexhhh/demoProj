'use strict';
module App.Controllers {

    export class TopNavCtrl {
        public static controllerId: string = 'topNavCtrl';
        core: App.Services.ICore;

        //#region Variables
        $scope: any;
        $location: ng.ILocationService;
        navRoutes: Array<Object>;
        controllerId = TopNavCtrl.controllerId;
        common: App.Shared.ICommon;
        log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;
        ngDialog: any;
        userToken: string;
        userName: string;
        allThis: boolean = true;
        clientUserRequest : App.Services.GetClientUserRequest;
        getMesterUserIdRequest: App.Services.GetMesterUserIdRequest;
        getLogCredentialsRequest: App.Services.GetLogCredentialsRequest;

        //using shortcut syntax on private variables in the constructor
        constructor($scope: any, private $route, common, core: App.Services.ICore, ngDialog: any,$location: ng.ILocationService) {
            this.core = core;
            this.$scope = $scope;
            this.$location = $location ;
            this.common = common;
            this.ngDialog = ngDialog;
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
            this.getLogCredentialsRequest = new App.Services.GetLogCredentialsRequest();
            this.getMesterUserIdRequest = new App.Services.GetMesterUserIdRequest();
            this.clientUserRequest = new App.Services.GetClientUserRequest();
            this.allThis = this.core.sesionService.isLogged;
            this.activate([]);
        }

        // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { });
        }

        logIn = () => {
            this.ngDialog.open({ template: 'logInTemplate', scope: this.$scope });
        }

        getLoggedUser = () => {
            var promise = this.core.dataService.getLoggedUser(this.getLogCredentialsRequest, (response, success) => {
                if (success) {
                    this.logSuccess('You have successfully logged in!');
                    this.userToken = response.token;
                    this.core.sesionService.userToken=response.token;
                    this.core.sesionService.userRole = response.role;
                    this.core.sesionService.userDetails = response.user;
                    this.userName = this.getLogCredentialsRequest.userName;
                    this.allThis = true;
                    if ( this.core.sesionService.userRole == "ROLE_CLIENT") {
                        this.getClientByTheUser();
                    }
                     else if ( this.core.sesionService.userRole == "ROLE_MESTER"){
                        this.getMesterByTheUser();
                    }
                } else {
                    this.userToken = null;
                    this.allThis = false;
                    this.logError('An error occurred whit the log in process!');
                }
            });
        }


        getMesterByTheUser = () => {            
            this.getMesterUserIdRequest.userId = this.core.sesionService.userDetails.id;              
            var promise = this.core.dataService.getMesterByUserId(this.getMesterUserIdRequest, (response, success) => {
                this.core.sesionService.theMester =response;                
            });
            return promise;             
        }

        getClientByTheUser = () => {                    
            this.clientUserRequest.userId = this.core.sesionService.userDetails.id; 
            var promise = this.core.dataService.getClientByUserId(this.clientUserRequest, (response, success) => {
                this.core.sesionService.theClient =response;                
            });
            return promise;        
        }
        
        logOut = () => {
            if (!confirm('Are you sure about this ?')) {
                return;
            }
            var getLogCredentialsRequest = new App.Services.GetLogCredentialsRequest();
            var promise = this.core.dataService.getLogOut(getLogCredentialsRequest, (response, success) => {
                if (success) {
                    this.logSuccess('You have successfully logged out!');
                    this.$location.path('#/dashboard');
                } else {
                    this.logError('An error occurred !');
                }
                this.userToken = response;
                this.allThis = false;
                this.core.sesionService.clear();
            });
            return this.userToken;
        }
    }

    app.controller(TopNavCtrl.controllerId, ['$scope', '$route', 'common', 'core', 'ngDialog', '$location', 
        ($scope, $r, c, core, ngDialog, $location ) => new App.Controllers.TopNavCtrl($scope, $r, c, core, ngDialog, $location)]);
}