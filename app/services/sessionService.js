/// <reference path="../../scripts/typings/angularjs/angular.d.ts" /> 
var App;
(function (App) {
    var Services;
    (function (Services) {
        var SesionService = (function () {
            function SesionService($http, common) {
                var _this = this;
                this.hasRole = function (roles) {
                    if (!roles || !roles.length) {
                        return true;
                    }
                    var exists = roles.indexOf(_this.userRole) >= 0;
                    return exists;
                };
                this.clear = function () {
                    _this.userRole = null;
                };
                this.resetDashboardPage = function () {
                    _this.searchMesterRequestMaintener = null;
                };
                this.rememberDashboardRequests = function () {
                    //  this.searchMesterRequestMaintener= this.dashboard.searchMesterRequest; // save the request obj   
                };
                this.common = common;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
            }
            SesionService.serviceId = 'sesionService';
            return SesionService;
        }());
        Services.SesionService = SesionService;
        App.app.factory(SesionService.serviceId, ['$http', 'common', function ($http, common) { return new SesionService($http, common); }]);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=sessionService.js.map