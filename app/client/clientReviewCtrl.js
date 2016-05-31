'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var ClientReviewCtrl = (function () {
            function ClientReviewCtrl(common, core) {
                var _this = this;
                //#region Variables
                this.controllerId = ClientReviewCtrl.controllerId;
                this.lastRequestLength = 0;
                this.searchReviewMester = function () {
                    if (_this.lastRequestLength != 0 && _this.lastRequestLength == _this.itemResults.length) {
                        return;
                    }
                    _this.lastRequestLength = _this.itemResults.length;
                    _this.searchReviewformClientRequest.idClient = _this.core.sesionService.userDetails.id;
                    _this.searchReviewformClientRequest.pageNumber = (_this.itemResults.length);
                    _this.searchReviewformClientRequest.pageSize = 5;
                    var promise = _this.core.dataService.searchFullReviewFromClient(_this.searchReviewformClientRequest, function (response, success) {
                        if (success) {
                            _this.reviewMesterResultPage = response;
                            _this.itemResults = _this.itemResults.concat(response.contentPage);
                            _this.totalResults = response.totalResults;
                        }
                        else {
                            _this.logError('The search for reviews failed !');
                        }
                    });
                    return promise;
                };
                this.myPagingFunction = function () {
                    if (_this.totalResults <= _this.itemResults.length) {
                        return;
                    }
                    _this.searchReviewMester();
                };
                this.deleteReview = function (item) {
                    if (!confirm('Are you sure about this ?')) {
                        return;
                    }
                    _this.deleteReviewRequest.idReview = item.id;
                    var promise = _this.core.dataService.deleteReview(_this.deleteReviewRequest, function (response, success) {
                        if (success) {
                            var indexItem = _this.itemResults.indexOf(item);
                            if (indexItem >= 0) {
                                _this.itemResults.splice(indexItem, 1);
                            }
                            _this.logSuccess('The review was deleted');
                        }
                        else {
                            _this.logError('This review cannot be deleted !');
                        }
                    });
                };
                this.common = common;
                this.core = core;
                this.itemResults = new Array();
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.searchReviewformClientRequest = new App.Services.SearchReviewFromClientRequest();
                this.deleteReviewRequest = new App.Services.DeleteReviewRequest();
                this.activate([]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            ClientReviewCtrl.prototype.activate = function (promises) {
                this.common.activateController(promises, this.controllerId)
                    .then(function () { });
            };
            ClientReviewCtrl.controllerId = 'clientReviewCtrl';
            return ClientReviewCtrl;
        }());
        Controllers.ClientReviewCtrl = ClientReviewCtrl;
        // register controller with angular
        App.app.controller(ClientReviewCtrl.controllerId, ['common', 'core',
            function (common, core) { return new App.Controllers.ClientReviewCtrl(common, core); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=clientReviewCtrl.js.map