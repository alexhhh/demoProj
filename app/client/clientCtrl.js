'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var ClientCtrl = (function () {
            //#endregion
            function ClientCtrl(common, core) {
                var _this = this;
                //#region Variables
                this.controllerId = ClientCtrl.controllerId;
                this.searchMester = function () {
                    var promise = _this.core.dataService.searchMester(_this.searchMesterRequest, function (response, success) {
                        _this.mesterResultPage = response;
                        if (success) {
                            _this.logSuccess('The search was succesful !');
                        }
                        else {
                            _this.logError('The search failed ! review the input data! ');
                        }
                    });
                    return promise;
                };
                this.getMester = function (idMester) {
                    var getMesterRequest = new App.Services.GetMesterRequest();
                    getMesterRequest.idMester = idMester;
                    _this.theParam = idMester;
                    var promise = _this.core.dataService.getMester(getMesterRequest, function (response, success) {
                        _this.dbMester = response;
                        if (success) {
                            _this.logSuccess('Mester details !');
                        }
                        else {
                            _this.logError('Mester details not found !');
                        }
                    });
                    return promise;
                };
                this.searchReviewMester = function () {
                    _this.searchReviewMesterRequest.idMester = _this.theParam;
                    var promise = _this.core.dataService.searchReviewMester(_this.searchReviewMesterRequest, function (response, success) {
                        _this.reviewMesterResultPage = response;
                        if (success) {
                            _this.logSuccess('The search for reviews was succesful !');
                        }
                        else {
                            _this.logError('The search for reviews failed !');
                        }
                    });
                    return promise;
                };
                this.addMesterReview = function () {
                    _this.addMesterReviewRequest.idMester = _this.theParam;
                    _this.addMesterReviewRequest.idClient = '3448cfec-d77d-4023-9d2e-903889881510';
                    var promise = _this.core.dataService.addMesterReview(_this.addMesterReviewRequest, function (response, success) {
                        _this.newReviewMester = response;
                        if (success) {
                            _this.logSuccess('The review was created !');
                        }
                        else {
                            _this.logError('Cannot create the review! ');
                        }
                    });
                    return promise;
                };
                this.common = common;
                this.core = core;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.unIdClient = '1ab7cf97-619e-4281-a11e-5bb0c7077149';
                this.searchCriteria = ['First Name', 'Last Name', 'Location', 'Speciality Name', 'Email', 'Phone Number', 'Rating', 'Price'];
                this.searchMesterRequest = new App.Services.SearchMesterRequest();
                this.searchReviewMesterRequest = new App.Services.SearchReviewMesterRequest();
                this.addMesterReviewRequest = new App.Services.AddMesterReviewRequest();
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
        App.app.controller(ClientCtrl.controllerId, ['common', 'core', function (common, core) { return new App.Controllers.ClientCtrl(common, core); }]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=clientCtrl.js.map