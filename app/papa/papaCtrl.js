'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var PapaCtrl = (function () {
            //#endregion
            function PapaCtrl(common, datacontext, dataService) {
                var _this = this;
                //#region Variables
                this.controllerId = PapaCtrl.controllerId;
                this.getMesteri = function () {
                    var requestData = new App.Services.GetMesteriRequest();
                    var promise = _this.dataService.getMesteri(requestData, function (response) {
                        _this.spec = response;
                    });
                    return promise;
                };
                this.addMester = function () {
                    var promise = _this.dataService.addMester(_this.addMesterRequest, function (response) {
                        _this.getMesteri();
                    });
                    return promise;
                };
                // Do = function() {
                //     setTimeout(function(){
                //         
                // }
                //     }, 1000);
                this.Do2 = function () {
                    setTimeout(function () {
                    }, 1000);
                };
                this.DoSmth = function () {
                    _this.success;
                };
                this.common = common;
                this.datacontext = datacontext;
                this.log = common.logger.getLogFn();
                this.dataService = dataService;
                this.alex = 'asdf';
                // Queue all promises and wait for them to finish before loading the view
                this.activate([]);
                this.success = "Habar nu am cum!";
                this.idSpec = ["1", "2", "3", "4"];
                this.nameSpec = ["spec1", "spec2", "spec3", "spec4"];
                this.addMesterRequest = new App.Services.AddMesterRequest();
                //this.spec = new Array<any>();
                //this.spec.push({id: 1,name: 'spec1'})
                // Queue all promises and wait for them to finish before loading the view
                this.activate([this.getMesteri()]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            PapaCtrl.prototype.activate = function (promises) {
                var _this = this;
                this.common.activateController(promises, this.controllerId)
                    .then(function () { _this.log('Activated Dashboard View'); });
            };
            PapaCtrl.controllerId = 'papaCtrl';
            return PapaCtrl;
        }());
        Controllers.PapaCtrl = PapaCtrl;
        // register controller with angular
        App.app.controller(PapaCtrl.controllerId, ['common', 'datacontext', 'dataService',
            function (c, dc, dataService) { return new App.Controllers.PapaCtrl(c, dc, dataService); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=papaCtrl.js.map