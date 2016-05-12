/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />

module App.Services {

    export interface IDataService {
        // isLogged: boolean;
        getUsers (requestData: GetUserRequest, callback: Function): ng.IHttpPromise<any> ;
        activateUser(requestData:ActivateUserRequest, callback: Function): ng.IHttpPromise<any>;
        getLoggedUser(requestData: GetLogCredentialsRequest, callback: Function): ng.IHttpPromise<any>; 
        getLogOut(requestData: GetLogCredentialsRequest, callback: Function): ng.IHttpPromise<any>;
        addUser(requestData: AddUserRequest, callback: Function): ng.IHttpPromise<any>;
        deleteUser(requestData: DeleteUserRequest, callback: Function): ng.IHttpPromise<any>;
        editUser(requestData: EditUserRequest, callback: Function): ng.IHttpPromise<any>;
        checkUser(requestData: AddUserRequest, callback: Function): ng.IHttpPromise<any>;
        getSpecialities(requestData: GetSpecialityRequest, callback: Function): ng.IHttpPromise<any>;
        addSpeciality(requestData: AddSpecialityRequest, callback: Function): ng.IHttpPromise<any>;
        deleteSpeciality(requestData: DeleteSpecialityRequest, callback: Function): ng.IHttpPromise<any>;
        getMester(requestData: GetMesterRequest, callback: Function): ng.IHttpPromise<any>;
        addMester(requestData: AddEditMesterRequest, callback: Function): ng.IHttpPromise<any>;
        editMester(requestData: AddEditMesterRequest, callback: Function): ng.IHttpPromise<any>;
        searchMester(requestData: SearchMesterRequest, callback: Function): ng.IHttpPromise<any>;
        searchReviewMester(requestData: SearchReviewMesterRequest, callback: Function): ng.IHttpPromise<any>;
        searchReviewFromClient(requestData: SearchReviewFromClientRequest, callback: Function): ng.IHttpPromise<any>
        getAllReviews (requestData: GetAllReviewsRequest, callback: Function): ng.IHttpPromise<any>
        addMesterReview(requestData: AddMesterReviewRequest, callback: Function): ng.IHttpPromise<any>;
        deleteMester(requestData: DeleteMesterRequest, callback: Function): ng.IHttpPromise<any>;
        deleteReview(requestData: DeleteReviewRequest, callback: Function): ng.IHttpPromise<any>;
        getClient (requestData: GetClientRequest, callback: Function): ng.IHttpPromise<any>;
        addClient (requestData: AddClientRequest, callback: Function): ng.IHttpPromise<any>;
        editClient (requestData: AddClientRequest, callback: Function): ng.IHttpPromise<any>;
    }

    export class DataService implements IDataService {
        private injector: any;
        
        public static serviceId: string = 'dataService';
        // public authenticated: boolean = false;
        public secondCheck: boolean = false;
        // public userToken;
        private $http: ng.IHttpService;
        private Httpi: IHttpi;
        public  common: App.Shared.ICommon;
        public  log: Function;
        public  logError: Function;
        public  logWarning: Function;
        public  logSuccess: Function;
        private serviceRoot = 'http://localhost:8080/mesteriApplication/rest';

        constructor(common, httpi: IHttpi, injector) {
            this.injector = injector;
            this.Httpi = httpi;
            this.common = common;
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
        }
        
        private _core: Core;
        private get core() {
            if(this._core){
                return this._core;
            }
            
            this._core = this.injector.get('core')
            return this._core;
        }

        // public get isLogged(): boolean {
        //     var result = this.userToken != null;
        //     return result;
        // }

        //  user query
       public  activateUser= (requestData: ActivateUserRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('GET', '/user/activate/query' , requestData, callback);
       }
       public getLoggedUser = (requestData: GetLogCredentialsRequest, callback: Function): ng.IHttpPromise<any> => { 
            return this.Request('POST', '/user/login', requestData, callback);
        }
       public getLogOut = (requestData: GetLogCredentialsRequest, callback: Function): ng.IHttpPromise<any> => { 
            return this.Request('POST', '/user/logout', requestData, callback);
        }
       public addUser = (requestData: AddUserRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('POST', '/user/signup', requestData, callback);
        }
       public editUser = (requestData: EditUserRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('PUT', '/user/edit', requestData, callback);
        }
       public checkUser = (requestData: AddUserRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('GET', '/user/query', requestData, callback);
        }
        public deleteUser = (requestData: DeleteUserRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('DELETE', '/user/query', requestData, callback);
        }
       public getUsers = (requestData: GetUserRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('GET', '/user/all', requestData, callback);
        }
           
        // speciality query
       public getSpecialities = (requestData: GetSpecialityRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('GET', '/speciality/all', requestData, callback);
        }
        public addSpeciality = (requestData: AddSpecialityRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('POST', '/speciality', requestData, callback);
        }
        public deleteSpeciality = (requestData: DeleteSpecialityRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('DELETE', '/speciality/query', requestData, callback);
        }


        // mester query
        public getMester = (requestData: GetMesterRequest, callback: Function): ng.IHttpPromise<any> => { 
            return this.Request('GET', '/mester/query', requestData, callback);
        }
        public addMester = (requestData: AddEditMesterRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('POST', '/mester', requestData, callback);
        }
        public editMester = (requestData: AddEditMesterRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('PUT', '/mester', requestData, callback);
        }
        public deleteMester = (requestData: DeleteMesterRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('DELETE', '/mester', requestData, callback);
        }

        public searchMester = (requestData: SearchMesterRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('POST', '/mester/search', requestData, callback);
        }

        
        // review query
        public searchReviewMester = (requestData: SearchReviewMesterRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('GET', '/review/mester/query', requestData, callback);
        }
        public searchReviewFromClient = (requestData: SearchReviewFromClientRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('GET', '/review/client/query', requestData, callback);
        }
        public getAllReviews = (requestData: GetAllReviewsRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('GET', '/review/getAll/query', requestData, callback);
        }
        
        public addMesterReview = (requestData: AddMesterReviewRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('POST', '/review', requestData, callback);
        }    
         public deleteReview  = (requestData: DeleteReviewRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('DELETE', '/review/query', requestData, callback);
        }
        
        // client query
        public getClient = (requestData: GetClientRequest, callback: Function): ng.IHttpPromise<any> => { 
            return this.Request('GET', '/client/query', requestData, callback);
        }
        public addClient = (requestData: AddClientRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('POST', '/client', requestData, callback);
        }
        public editClient = (requestData: AddClientRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('PUT', '/client', requestData, callback);
        }

        private Request = (method: string, url: string, requestData: any, callback: Function): ng.IHttpPromise<any> => {
            requestData = requestData || {};
            var _callUrl = this.serviceRoot;
            _callUrl += url;

            if (method == null) {
                method = 'POST';
            }

            var hxr: any = {
                headers: requestData.headers || {},
                method: method,
                url: _callUrl,
                async: false
            }

            if (method == 'POST' ||
                method == 'PUT' || 
                method == 'MERGE') {
                hxr.data = requestData;
            }
            else {
                hxr.params = requestData;
            }
                    if (this.core.sesionService.isLogged) {
                        hxr.headers['Authorization'] = this.core.sesionService.userToken;
                    } else {
                        hxr.headers['Authorization'] = null;
                    }
                     
            var request = this.Httpi.Request(hxr).
                success((data: any, status, headers, config) => {
                    console.log("on success  " + status);
                    if (callback != null) {                        
                         callback(data, true);
                    }
                }).
                error((data, status, headers, config) => {
                    if (status == -1) {
                        this.logError(" Error! Request Method:" + method + ".   The response had HTTP status code 401!  Full authentication is required to access this resource !");
                    } else {
                    this.logError(" Error! Request Method:" + method + ".  The response had HTTP status code " + status + " !"); }
                    if (callback != null) {
                        if (!data) {
                            data = {};
                        }                        
                        var value = data.message;                       
                        callback(value, false);
                    }
                });

            return request;
        }
    }

    // Register with angular
    app.factory(DataService.serviceId, ['common', 'Httpi', '$injector', (common, Httpi, injector) => new DataService(common, Httpi, injector)]);
}