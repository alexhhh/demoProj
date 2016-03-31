'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var DetailsCtrl = (function () {
            function DetailsCtrl($scope, common, datacontext, dataService) {
                var _this = this;
                this.controllerId = DetailsCtrl.controllerId;
                // set idMester(value: string) {
                //     this.idMester = '1ad544dc-eae0-4c6c-b5d6-6a68695afc40';
                // }
                this.getMester = function (idMester) {
                    var getMesterRequest = new App.Services.GetMesterRequest();
                    getMesterRequest.idMester = idMester;
                    _this.theParam = idMester;
                    var promise = _this.dataService.getMester(getMesterRequest, function (response, success) {
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
                this.searchReviewMester = function (idMester) {
                    var searchReviewMesterRequest = new App.Services.SearchReviewMesterRequest();
                    searchReviewMesterRequest.idMester = idMester;
                    var promise = _this.dataService.searchReviewMester(searchReviewMesterRequest, function (response, success) {
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
                this.getMesterRating = function (idMester) {
                    var getMesterAvgRatingRequest = new App.Services.GetMesterAvgRatingRequest();
                    getMesterAvgRatingRequest.idMester = idMester;
                    var promise = _this.dataService.getMesterRating(getMesterAvgRatingRequest, function (response, success) {
                        _this.mesterAvgRating = response;
                        if (success) {
                            _this.logSuccess('The search for rating was succesful !');
                        }
                        else {
                            _this.logError('The search for rating failed !');
                        }
                    });
                    return promise;
                };
                this.addMesterReview = function () {
                    var addMesterReviewRequest = new App.Services.AddMesterReviewRequest();
                    addMesterReviewRequest.idMester = '1ad544dc-eae0-4c6c-b5d6-6a68695afc40';
                    addMesterReviewRequest.idClinet = '3448cfec-d77d-4023-9d2e-903889881510';
                    var promise = _this.dataService.addMesterReview(addMesterReviewRequest, function (response, success) {
                        //this.newReviewMester=response;
                        if (success) {
                            _this.logSuccess('The review was created !');
                        }
                        else {
                            _this.logError('Cannot create the review! ');
                        }
                    });
                    return promise;
                };
                this.$scope = $scope;
                this.common = common;
                this.datacontext = datacontext;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.dataService = dataService;
                this.activate([this.getMester('1ad544dc-eae0-4c6c-b5d6-6a68695afc40'), this.searchReviewMester('1ad544dc-eae0-4c6c-b5d6-6a68695afc40'), this.getMesterRating('1ad544dc-eae0-4c6c-b5d6-6a68695afc40')]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            DetailsCtrl.prototype.activate = function (promises) {
                var _this = this;
                this.common.activateController(promises, this.controllerId)
                    .then(function () { _this.log('Activated Dashboard View'); });
            };
            DetailsCtrl.controllerId = 'detailsCtrl';
            return DetailsCtrl;
        }());
        Controllers.DetailsCtrl = DetailsCtrl;
        // register controller with angular
        App.app.controller(DetailsCtrl.controllerId, ['$scope', 'common', 'datacontext', 'dataService',
            function ($scope, c, dc, dataService) { return new App.Controllers.DetailsCtrl($scope, c, dc, dataService); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=detailsCtrl.js.map