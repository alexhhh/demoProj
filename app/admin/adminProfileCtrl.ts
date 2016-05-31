'use strict';
module App.Controllers {

    export class AdminProfileCtrl {
        public static controllerId: string = 'adminProfileCtrl';

        //#region Variables
        $scope: any;
        $location: ng.ILocationService;
        controllerId = DetailsCtrl.controllerId;
        common: App.Shared.ICommon;
        core: App.Services.ICore;
        $route: any;
        $routeParams: any;         
        log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;       
        currentRole: string;
        thisUser: any;
        

        constructor($scope: any, $route, $routeParams, $location: ng.ILocationService, common, core: App.Services.ICore ) {
            this.$scope = $scope;
            this.$route = $route;
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.common = common;
            this.core = core;           
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
            this.currentRole = core.sesionService.userRole; 
            this.thisUser= this.core.sesionService.selectedUser;          
            this.activate([]);
        }
 
        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => {     });
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
    // register controller with angular
    app.controller(AdminProfileCtrl.controllerId, ['$scope', '$route', '$routeParams', '$location', 'common', 'core', 
        ($scope, $route, $routeParams, $location, common, core) => new App.Controllers.AdminProfileCtrl($scope, $route, $routeParams, $location, common, core)
    ]);
}