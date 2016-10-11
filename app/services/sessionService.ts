/// <reference path="../../scripts/typings/angularjs/angular.d.ts" /> 
module App.Services {

    export interface ISesionService {
        isLogged: boolean;
        userRole: string;
        userDetails: any;
        userToken: string;
        theMester: any;
        theClient: any;
        selectedUser : any;
        hasRole(role: Array<string>): boolean;
        clear(): void;
        resetDashboardPage() : void;
        
        searchMesterRequestMaintener: App.Services.SearchMesterRequest;  
    }

    export class SesionService implements ISesionService {
        public static serviceId: string = 'sesionService';
        private common: App.Shared.ICommon; 
        public userRole: string ;        
        public userDetails: any;
        public selectedUser : any;
        public theMester : any;
        public theClient : any;
        public userToken: string;
        public log: Function;
        public logError: Function;
        public logWarning: Function;
        public logSuccess: Function;
        public dashboard : App.Controllers.DashboardCtrl;
        public searchMesterRequestMaintener: App.Services.SearchMesterRequest;


        constructor($http: ng.IHttpService) {             
           // this.userRole='x';
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
            this.theMester=null;
            this.theClient=null;
        }
        
        public resetDashboardPage = () => {
            this.searchMesterRequestMaintener=null;            
        }
        
       
  
    }
    app.factory(SesionService.serviceId, ['$http',  ($http) => new SesionService($http )]);

}