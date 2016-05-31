/// <reference path="../../scripts/typings/angularjs/angular.d.ts" /> 
var App;
(function (App) {
    var Services;
    (function (Services) {
        var SesionService = (function () {
            function SesionService($http) {
                var _this = this;
                this.hasRole = function (roles) {
                    if (!roles || !roles.length) {
                        return true;
                    }
                    var exists = roles.indexOf(_this.userRole) >= 0;
                    return exists;
                };
                this.clear = function () {
                    _this.userRole = 'x';
                    _this.userDetails = null;
                    _this.userToken = 'x';
                };
                this.resetDashboardPage = function () {
                    _this.searchMesterRequestMaintener = null;
                };
                // this.userRole='x';
            }
            Object.defineProperty(SesionService.prototype, "isLogged", {
                get: function () {
                    var result = this.userToken != null;
                    return result;
                },
                enumerable: true,
                configurable: true
            });
            SesionService.serviceId = 'sesionService';
            return SesionService;
        }());
        Services.SesionService = SesionService;
        App.app.factory(SesionService.serviceId, ['$http', function ($http) { return new SesionService($http); }]);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=sessionService.js.map