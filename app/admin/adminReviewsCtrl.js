'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var AdminReviewsCtrl = (function () {
            function AdminReviewsCtrl(common, core) {
                var _this = this;
                //#region Variables
                this.controllerId = AdminReviewsCtrl.controllerId;
                this.lastRequestLength = 0;
                this.getAllReviews = function () {
                    if (_this.lastRequestLength != 0 && _this.lastRequestLength == _this.itemResults.length) {
                        return;
                    }
                    _this.lastRequestLength = _this.itemResults.length;
                    _this.getAllReviewsRequest.pageNumber = (_this.itemResults.length);
                    _this.getAllReviewsRequest.pageSize = 5;
                    var promise = _this.core.dataService.getAllReviews(_this.getAllReviewsRequest, function (response, success) {
                        _this.reviewMesterResultPage = response;
                        _this.itemResults = _this.itemResults.concat(response.contentPage);
                        _this.totalResults = response.totalResults;
                        //this.itemResults = this.itemResults.push.apply(response.contentPage);
                        // if (success) {
                        //     this.logSuccess('The search for reviews was succesful !');
                        // } else {
                        //     this.logError('The search for reviews failed !');
                        // }
                    });
                    return promise;
                };
                this.myPagingFunction = function () {
                    if (_this.totalResults <= _this.itemResults.length) {
                        return;
                    }
                    _this.getAllReviews();
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
                // this.itemResults = new Array<any>();
                // this.addMesterReviewRequest = new App.Services.AddMesterReviewRequest();
                this.getAllReviewsRequest = new App.Services.GetAllReviewsRequest();
                this.deleteReviewRequest = new App.Services.DeleteReviewRequest();
                this.activate([]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            AdminReviewsCtrl.prototype.activate = function (promises) {
                var _this = this;
                this.common.activateController(promises, this.controllerId)
                    .then(function () { _this.log('Activated Dashboard View'); });
            };
            AdminReviewsCtrl.controllerId = 'adminReviewsCtrl';
            return AdminReviewsCtrl;
        }());
        Controllers.AdminReviewsCtrl = AdminReviewsCtrl;
        // register controller with angular
        App.app.controller(AdminReviewsCtrl.controllerId, ['common', 'core',
            function (common, core) { return new App.Controllers.AdminReviewsCtrl(common, core); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=adminReviewsCtrl.js.map