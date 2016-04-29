/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
var App;
(function (App) {
    var Services;
    (function (Services) {
        var DataService = (function () {
            function DataService(common, httpi) {
                var _this = this;
                this.authenticated = false;
                this.secondCheck = false;
                this.serviceRoot = 'http://localhost:8080/mesteriApplication/rest';
                //  user query
                this.activateUser = function (requestData, callback) {
                    return _this.Request('GET', '/user/activate/query', requestData, callback);
                };
                this.getLoggedUser = function (requestData, callback) {
                    _this.authenticated = true;
                    return _this.Request('POST', '/user/login', requestData, callback);
                };
                this.getLogOut = function (requestData, callback) {
                    _this.authenticated = false;
                    return _this.Request('POST', '/user/logout', requestData, callback);
                };
                this.addUser = function (requestData, callback) {
                    return _this.Request('POST', '/user/signup', requestData, callback);
                };
                this.checkUser = function (requestData, callback) {
                    return _this.Request('GET', '/user/query', requestData, callback);
                };
                // speciality query
                this.getSpecialities = function (requestData, callback) {
                    return _this.Request('GET', '/speciality/all', requestData, callback);
                };
                this.addSpeciality = function (requestData, callback) {
                    return _this.Request('POST', '/speciality', requestData, callback);
                };
                this.deleteSpeciality = function (requestData, callback) {
                    ;
                    return _this.Request('DELETE', '/speciality', requestData, callback);
                };
                // mester query
                this.getMester = function (requestData, callback) {
                    return _this.Request('GET', '/mester/query', requestData, callback);
                };
                this.addMester = function (requestData, callback) {
                    return _this.Request('POST', '/mester', requestData, callback);
                };
                this.editMester = function (requestData, callback) {
                    return _this.Request('PUT', '/mester', requestData, callback);
                };
                this.deleteMester = function (requestData, callback) {
                    return _this.Request('DELETE', '/mester', requestData, callback);
                };
                this.searchMester = function (requestData, callback) {
                    return _this.Request('POST', '/mester/search', requestData, callback);
                };
                // review query
                this.searchReviewMester = function (requestData, callback) {
                    return _this.Request('GET', '/review/mester/query', requestData, callback);
                };
                this.addMesterReview = function (requestData, callback) {
                    return _this.Request('POST', '/review', requestData, callback);
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
                    if (_this.authenticated) {
                        hxr.headers['Authorization'] = _this.userToken;
                    }
                    else {
                        hxr.headers['Authorization'] = null;
                    }
                    var request = _this.Httpi.Request(hxr).
                        success(function (data, status, headers, config) {
                        console.log("on success  " + status);
                        if (callback != null) {
                            callback(data, true);
                        }
                    }).
                        error(function (data, status, headers, config) {
                        if (status == -1) {
                            _this.logError(" Error! Request Method:" + method + ".   The response had HTTP status code 401!  Full authentication is required to access this resource !");
                        }
                        else {
                            _this.logError(" Error! Request Method:" + method + ".  The response had HTTP status code " + status + " !");
                        }
                        if (callback != null) {
                            if (!data) {
                                data = {};
                            }
                            var value = data.message;
                            callback(value, false);
                        }
                    });
                    return request;
                };
                this.Httpi = httpi;
                this.common = common;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
            }
            Object.defineProperty(DataService.prototype, "isLogged", {
                get: function () {
                    var result = this.userToken != null;
                    return result;
                },
                enumerable: true,
                configurable: true
            });
            DataService.serviceId = 'dataService';
            return DataService;
        }());
        Services.DataService = DataService;
        // Register with angular
        App.app.factory(DataService.serviceId, ['common', 'Httpi', function (common, Httpi) { return new DataService(common, Httpi); }]);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=dataService.js.map