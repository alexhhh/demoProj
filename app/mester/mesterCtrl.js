'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var MesterCtrl = (function () {
            //#endregion
            function MesterCtrl(common, datacontext, dataService) {
                var _this = this;
                //#region Variables
                this.controllerId = MesterCtrl.controllerId;
                this.getMester = function (id) {
                    var getMesterRequest = new App.Services.GetMesterRequest();
                    getMesterRequest.idMester = id;
                    var promise = _this.dataService.getMester(getMesterRequest, function (response) {
                        _this.spec = response;
                    });
                    return promise;
                };
                this.addMester = function () {
                    var promise = _this.dataService.addMester(_this.addMesterRequest, function (response) {
                    });
                    return promise;
                };
                this.common = common;
                this.datacontext = datacontext;
                this.log = common.logger.getLogFn();
                this.dataService = dataService;
                this.addMesterRequest = new App.Services.AddMesterRequest();
                // Queue all promises and wait for them to finish before loading the view
                this.activate([]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            //#region private methods
            MesterCtrl.prototype.activate = function (promises) {
                var _this = this;
                this.common.activateController(promises, this.controllerId)
                    .then(function () { _this.log('Activated Dashboard View'); });
            };
            MesterCtrl.controllerId = 'mesterCtrl';
            return MesterCtrl;
        }());
        Controllers.MesterCtrl = MesterCtrl;
        // register controller with angular
        App.app.controller(MesterCtrl.controllerId, ['common', 'datacontext', 'dataService',
            function (c, dc, dataService) { return new App.Controllers.MesterCtrl(c, dc, dataService); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=mesterCtrl.js.map