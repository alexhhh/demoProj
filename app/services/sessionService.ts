/// <reference path="../../scripts/typings/angularjs/angular.d.ts" /> 
module App.Services {

    export interface ISesionService {
        isLogged: boolean;
        userRole: string;
        userDetails: any;
        userToken: string;
        hasRole(role: Array<string>): boolean;
        clear(): void;
        resetDashboardPage() : void;
        rememberDashboardRequests  () ;
        searchMesterRequestMaintener: App.Services.SearchMesterRequest;  
    }

    export class SesionService implements ISesionService {
        public static serviceId: string = 'sesionService';
        private common: App.Shared.ICommon;
        //private $q: ng.IQService;
        //private $http: ng.IHttpService;
        //private Httpi: IHttpi;
        //private userToken;
        public userRole: string ;        
        public userDetails: any;
        public userToken: string;
        public log: Function;
        public logError: Function;
        public logWarning: Function;
        public logSuccess: Function;
        public dashboard : App.Controllers.DashboardCtrl;
        public searchMesterRequestMaintener: App.Services.SearchMesterRequest;


        constructor($http: ng.IHttpService, common) {
            this.common = common; 
            this.userRole='x';
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
           
        }
        
        public get isLogged(): boolean {
            var result = this.userToken != null;
            return result;
        }

        public hasRole = (roles: Array<string>): boolean => {
            if (!roles || !roles.length) {
                return true;
            }
            var exists = roles.indexOf(this.userRole) >= 0;
            return exists;
        }
        
        public clear = () => {
            this.userRole = 'x';
            this.userDetails=null;
            this.userToken='x';
        }
        
        public resetDashboardPage = () => {
            this.searchMesterRequestMaintener=null;
            
        }
        
        public rememberDashboardRequests = () => {
        //  this.searchMesterRequestMaintener= this.dashboard.searchMesterRequest; // save the request obj   
            }
        
        
    }

    app.factory(SesionService.serviceId, ['$http', 'common', ($http, common) => new SesionService($http, common)]);

}