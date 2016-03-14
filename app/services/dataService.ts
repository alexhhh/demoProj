/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />

module App.Services {

    export interface IDataService
    {
        getMesteri(requestData: GetMesteriRequest, callback: Function): ng.IHttpPromise<any>;
        addMester(requestData: AddMesterRequest, callback: Function): ng.IHttpPromise<any>;
        test(callback: Function): any;
    }

    export class DataService implements IDataService
    {
        public static serviceId:string = 'dataService';
        
        private $http: ng.IHttpService;
        private Httpi: IHttpi;
        
        private serviceRoot = 'http://localhost:8080/mesteriApplication/rest';
        
        constructor($http: ng.IHttpService, httpi: IHttpi){
            this.$http = $http;
            this.Httpi = httpi;
        }
        
        public getMesteri = (requestData: GetMesteriRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('GET', '/speciality/specialities', requestData, callback);
        }
        
        public addMester = (requestData: AddMesterRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('POST', '/speciality', requestData, callback);
        }
        
        public test = (callback: Function) : any => {
            return this.Request('POST', 'http://192.168.0.29/uploadDocument', { }, callback);
        }
        
        private Request = (method: string, url: string, requestData: any, callback:Function) : ng.IHttpPromise<any> => {
                       
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

            var request = this.Httpi.Request(hxr).
                success(function (data: any, status, headers, config) {
                    if (callback != null) {
                        callback(data);
                    }
                }).
                error(function (data, status, headers, config) {
                    if (callback != null) {
                        //callback(data.message);
                    }
                });

            return request;
        }
    }
    // Register with angular
    app.factory(DataService.serviceId, ['$http', 'Httpi', ($http, Httpi) => new DataService($http, Httpi)]);
}