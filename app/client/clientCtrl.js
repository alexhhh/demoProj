'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var ClientCtrl = (function () {
            //#endregion
            function ClientCtrl(common, datacontext, dataService) {
                //#region Variables
                this.controllerId = ClientCtrl.controllerId;
                this.common = common;
                this.datacontext = datacontext;
                this.log = common.logger.getLogFn();
                this.dataService = dataService;
                // Queue all promises and wait for them to finish before loading the view
                this.activate([]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            ClientCtrl.prototype.activate = function (promises) {
                var _this = this;
                this.common.activateController(promises, this.controllerId)
                    .then(function () { _this.log('Activated Dashboard View'); });
            };
            ClientCtrl.controllerId = 'clientCtrl';
            return ClientCtrl;
        }());
        Controllers.ClientCtrl = ClientCtrl;
        // register controller with angular
        App.app.controller(ClientCtrl.controllerId, ['common', 'datacontext', 'dataService',
            function (c, dc, dataService) { return new App.Controllers.ClientCtrl(c, dc, dataService); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=clientCtrl.js.map