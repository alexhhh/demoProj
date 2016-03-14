'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var DashboardCtrl = (function () {
            //#endregion
            function DashboardCtrl(common, datacontext) {
                var _this = this;
                //#region Variables
                this.controllerId = DashboardCtrl.controllerId;
                this.people = [];
                this.Do = function () {
                    _this.alex = "tralalalalala";
                    _this.alexarray[0] = 'teeeeeeeeeeeeeest';
                    _this.alexarray.push('val 4');
                    _this.alexarray.push('val 5');
                    _this.alexarray.push('val 6');
                };
                this.common = common;
                this.datacontext = datacontext;
                this.log = common.logger.getLogFn();
                this.news = this.getNews();
                this.alex = 'asdfasdf';
                this.alexarray = new Array();
                this.alexarray.push('val 1');
                this.alexarray.push('val 2');
                this.alexarray.push('val 3');
                // Queue all promises and wait for them to finish before loading the view
                this.activate([this.getMessageCount(), this.getPeople()]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            DashboardCtrl.prototype.activate = function (promises) {
                var _this = this;
                this.common.activateController(promises, this.controllerId)
                    .then(function () { _this.log('Activated Dashboard View'); });
            };
            //#region Public Methods
            DashboardCtrl.prototype.getNews = function () {
                return {
                    title: "Hot Towel Typescript",
                    description: 'Hot Towel Typescript is a SPA template using Angular, Breeze and Typescript. '
                        + 'This is a conversion of John Papas HotTowel.Angular.Breeze package'
                };
            };
            DashboardCtrl.prototype.getMessageCount = function () {
                var _this = this;
                return this.datacontext.getMessageCount().then(function (data) {
                    return _this.messageCount = data;
                });
            };
            DashboardCtrl.prototype.getPeople = function () {
                var _this = this;
                return this.datacontext.getPeople().then(function (data) {
                    return _this.people = data;
                });
            };
            DashboardCtrl.controllerId = 'dashboardCtrl';
            return DashboardCtrl;
        }());
        Controllers.DashboardCtrl = DashboardCtrl;
        // register controller with angular
        App.app.controller(DashboardCtrl.controllerId, ['common', 'datacontext',
            function (c, dc) { return new App.Controllers.DashboardCtrl(c, dc); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=dashboardCtrl.js.map