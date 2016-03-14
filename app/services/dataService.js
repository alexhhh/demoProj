/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
var App;
(function (App) {
    var Services;
    (function (Services) {
        var DataService = (function () {
            function DataService($http, httpi) {
                var _this = this;
                this.serviceRoot = 'http://localhost:8080/mesteriApplication/rest';
                this.getMesteri = function (requestData, callback) {
                    return _this.Request('GET', '/speciality/specialities', requestData, callback);
                };
                this.addMester = function (requestData, callback) {
                    return _this.Request('POST', '/speciality', requestData, callback);
                };
                this.test = function (callback) {
                    return _this.Request('POST', 'http://192.168.0.29/uploadDocument', {}, callback);
                };
                this.Request = function (method, url, requestData, callback) {
                    requestData = requestData || {};
                    var _callUrl = _this.serviceRoot;
                    _callUrl += url;
                    if (method == null) {
                        method = 'POST';
                    }
                    var hxr = {
                        headers: requestData.headers || {},
                        method: method,
                        url: _callUrl,
                        async: false
                    };
                    if (method == 'POST' ||
                        method == 'PUT' ||
                        method == 'MERGE') {
                        hxr.data = requestData;
                    }
                    else {
                        hxr.params = requestData;
                    }
                    var request = _this.Httpi.Request(hxr).
                        success(function (data, status, headers, config) {
                        if (callback != null) {
                            callback(data);
                        }
                    }).
                        error(function (data, status, headers, config) {
                        if (callback != null) {
                        }
                    });
                    return request;
                };
                this.$http = $http;
                this.Httpi = httpi;
            }
            DataService.serviceId = 'dataService';
            return DataService;
        }());
        Services.DataService = DataService;
        // Register with angular
        App.app.factory(DataService.serviceId, ['$http', 'Httpi', function ($http, Httpi) { return new DataService($http, Httpi); }]);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=dataService.js.map