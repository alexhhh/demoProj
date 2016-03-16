/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />

module App.Services {

    export interface IDataService {
        getSpecialities(requestData: GetSpecialityRequest, callback: Function): ng.IHttpPromise<any>;
        addSpeciality(requestData: AddSpecialityRequest, callback: Function): ng.IHttpPromise<any>;
        deleteSpeciality(requestData: DeleteSpecialityRequest, callback: Function): ng.IHttpPromise<any>;
        getMester(requestData: GetMesterRequest, callback: Function): ng.IHttpPromise<any>;
        addMester(requestData: AddMesterRequest, callback: Function): ng.IHttpPromise<any>;
    }

    export class DataService implements IDataService {
        public static serviceId: string = 'dataService';

        private $http: ng.IHttpService;
        private Httpi: IHttpi;

        private serviceRoot = 'http://localhost:8080/mesteriApplication/rest';

        constructor($http: ng.IHttpService, httpi: IHttpi) {
            this.$http = $http;
            this.Httpi = httpi;
        }

        public getSpecialities = (requestData: GetSpecialityRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('GET', '/speciality/specialities', requestData, callback);
        }

        public addSpeciality = (requestData: AddSpecialityRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('POST', '/speciality', requestData, callback);
        }

        public deleteSpeciality = (requestData: DeleteSpecialityRequest, callback: Function): ng.IHttpPromise<any> => {
            var urlParam = '/speciality/' + requestData.idSpeciality;
            return this.Request('DELETE', urlParam, null, callback);
        }


         public getMester = (requestData: GetMesterRequest, callback: Function): ng.IHttpPromise<any> => {
              var urlParam = '/mesteri/' + requestData.idMester;
            return this.Request('GET', '/mesteri', urlParam, callback);
        }

        public addMester = (requestData: AddMesterRequest, callback: Function): ng.IHttpPromise<any> => {
            return this.Request('POST', '/mesteri', requestData, callback);
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

            var request = this.Httpi.Request(hxr).
                success(function(data: any, status, headers, config) {
                    if (callback != null) {
                        callback(data);
                    }
                }).
                error(function(data, status, headers, config) {
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