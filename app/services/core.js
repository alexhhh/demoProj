var App;
(function (App) {
    var Services;
    (function (Services) {
        var Core = (function () {
            function Core(sessionService, dataService) {
                this.sesionService = sessionService;
                this.dataService = dataService;
            }
            Core.serviceId = 'core';
            return Core;
        }());
        Services.Core = Core;
        App.app.factory(Core.serviceId, ['sesionService', 'dataService', function (sesionService, dataService) { return new Core(sesionService, dataService); }]);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=core.js.map