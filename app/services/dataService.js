/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
var App;
(function (App) {
    var Services;
    (function (Services) {
        var DataService = (function () {
            function DataService(common, httpi, injector) {
                var _this = this;
                // public authenticated: boolean = false;
                this.secondCheck = false;
                this.serviceRoot = 'http://localhost:8080/rest';
                // public get isLogged(): boolean {
                //     var result = this.userToken != null;
                //     return result;
                // }
                //  user query
                this.activateUser = function (requestData, callback) {
                    return _this.Request('GET', '/user/activate/query', requestData, callback);
                };
                this.getLoggedUser = function (requestData, callback) {
                    return _this.Request('POST', '/user/login', requestData, callback);
                };
                this.getLogOut = function (requestData, callback) {
                    return _this.Request('POST', '/user/logout', requestData, callback);
                };
                this.addUser = function (requestData, callback) {
                    return _this.Request('POST', '/user/signup', requestData, callback);
                };
                this.editUser = function (requestData, callback) {
                    return _this.Request('PUT', '/user/edit', requestData, callback);
                };
                this.editUserMail = function (requestData, callback) {
                    return _this.Request('PUT', '/user/editmail', requestData, callback);
                };
                this.checkUser = function (requestData, callback) {
                    return _this.Request('GET', '/user/query', requestData, callback);
                };
                this.deleteUser = function (requestData, callback) {
                    return _this.Request('DELETE', '/user/query', requestData, callback);
                };
                this.getUsers = function (requestData, callback) {
                    return _this.Request('GET', '/user/all', requestData, callback);
                };
                this.resetPassword = function (requestData, callback) {
                    return _this.Request('GET', '/user/reset/query', requestData, callback);
                };
                this.resetUserPassword = function (requestData, callback) {
                    return _this.Request('PUT', '/user/reset', requestData, callback);
                };
                this.getUserToken = function (requestData, callback) {
                    return _this.Request('GET', '/user/token/query', requestData, callback);
                };
                // speciality query
                this.getSpecialities = function (requestData, callback) {
                    return _this.Request('GET', '/speciality/all', requestData, callback);
                };
                this.addSpeciality = function (requestData, callback) {
                    return _this.Request('POST', '/speciality', requestData, callback);
                };
                this.deleteSpeciality = function (requestData, callback) {
                    return _this.Request('DELETE', '/speciality/query', requestData, callback);
                };
                // mester query
                this.getMester = function (requestData, callback) {
                    return _this.Request('GET', '/mester/query', requestData, callback);
                };
                this.getMesterByUserId = function (requestData, callback) {
                    return _this.Request('GET', '/mester/user/query', requestData, callback);
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
                this.searchMesterByArea = function (requestData, callback) {
                    return _this.Request('POST', '/mester/area', requestData, callback);
                };
                // location
                this.getMesterLocation = function (requestData, callback) {
                    return _this.Request('GET', '/location/mester/query', requestData, callback);
                };
                this.editMesterLocation = function (requestData, callback) {
                    return _this.Request('PUT', '/location/mester', requestData, callback);
                };
                this.getLocationByIds = function (requestData, callback) {
                    return _this.Request('POST', '/location/all_by_ids', requestData, callback);
                };
                // review query
                this.searchReviewMester = function (requestData, callback) {
                    return _this.Request('GET', '/review/mester/query', requestData, callback);
                };
                this.searchReviewFromClient = function (requestData, callback) {
                    return _this.Request('GET', '/review/client/query', requestData, callback);
                };
                this.getAllReviews = function (requestData, callback) {
                    return _this.Request('GET', '/review/getAll/query', requestData, callback);
                };
                this.searchFullReviewFromClient = function (requestData, callback) {
                    return _this.Request('GET', '/review/full/client/query', requestData, callback);
                };
                this.getAllFullReviews = function (requestData, callback) {
                    return _this.Request('GET', '/review/full/getAll/query', requestData, callback);
                };
                this.addMesterReview = function (requestData, callback) {
                    return _this.Request('POST', '/review', requestData, callback);
                };
                this.deleteReview = function (requestData, callback) {
                    return _this.Request('DELETE', '/review/query', requestData, callback);
                };
                // client query
                this.getClient = function (requestData, callback) {
                    return _this.Request('GET', '/client/query', requestData, callback);
                };
                this.getClientByUserId = function (requestData, callback) {
                    return _this.Request('GET', '/client/user/query', requestData, callback);
                };
                this.addClient = function (requestData, callback) {
                    return _this.Request('POST', '/client', requestData, callback);
                };
                this.editClient = function (requestData, callback) {
                    return _this.Request('PUT', '/client', requestData, callback);
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
                    if (_this.core.sesionService.isLogged) {
                        hxr.headers['Authorization'] = _this.core.sesionService.userToken;
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
                        }
                        else {
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
                this.injector = injector;
                this.Httpi = httpi;
                this.common = common;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
            }
            Object.defineProperty(DataService.prototype, "core", {
                get: function () {
                    if (this._core) {
                        return this._core;
                    }
                    this._core = this.injector.get('core');
                    return this._core;
                },
                enumerable: true,
                configurable: true
            });
            DataService.serviceId = 'dataService';
            return DataService;
        }());
        Services.DataService = DataService;
        // Register with angular
        App.app.factory(DataService.serviceId, ['common', 'Httpi', '$injector', function (common, Httpi, injector) { return new DataService(common, Httpi, injector); }]);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=dataService.js.map