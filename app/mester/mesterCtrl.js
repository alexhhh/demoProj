'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var MesterCtrl = (function () {
            //#endregion
            function MesterCtrl(common, datacontext, dataService) {
                //#region Variables
                this.controllerId = MesterCtrl.controllerId;
                this.common = common;
                this.datacontext = datacontext;
                this.log = common.logger.getLogFn();
                this.dataService = dataService;
                // Queue all promises and wait for them to finish before loading the view
                // Queue all promises and wait for them to finish before loading the view
                this.activate([]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
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