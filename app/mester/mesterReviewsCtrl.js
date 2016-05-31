'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var MesterReviewsCtrl = (function () {
            function MesterReviewsCtrl(common, core) {
                var _this = this;
                //#region Variables
                this.controllerId = MesterReviewsCtrl.controllerId;
                this.lastRequestLength = 0;
                this.searchReviewMester = function () {
                    if (_this.lastRequestLength != 0 && _this.lastRequestLength == _this.itemResults.length) {
                        return;
                    }
                    _this.lastRequestLength = _this.itemResults.length;
                    _this.searchReviewMesterRequest.idMester = _this.core.sesionService.userDetails.id;
                    _this.searchReviewMesterRequest.pageNumber = (_this.itemResults.length);
                    _this.searchReviewMesterRequest.pageSize = 5;
                    var promise = _this.core.dataService.searchReviewMester(_this.searchReviewMesterRequest, function (response, success) {
                        _this.reviewMesterResultPage = response;
                        _this.itemResults = _this.itemResults.concat(response.contentPage);
                        _this.totalResults = response.totalResults;
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
                this.deleteReviewRequest = new App.Services.DeleteReviewRequest();
                this.searchReviewMesterRequest = new App.Services.SearchReviewMesterRequest();
                this.activate([]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            MesterReviewsCtrl.prototype.activate = function (promises) {
                this.common.activateController(promises, this.controllerId)
                    .then(function () { });
            };
            MesterReviewsCtrl.controllerId = 'mesterReviewsCtrl';
            return MesterReviewsCtrl;
        }());
        Controllers.MesterReviewsCtrl = MesterReviewsCtrl;
        // register controller with angular
        App.app.controller(MesterReviewsCtrl.controllerId, ['common', 'core',
            function (common, core) { return new App.Controllers.MesterReviewsCtrl(common, core); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=mesterReviewsCtrl.js.map