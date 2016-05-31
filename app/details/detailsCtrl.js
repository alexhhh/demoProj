'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var DetailsCtrl = (function () {
            function DetailsCtrl($scope, $route, $routeParams, $location, common, core, ngDialog) {
                var _this = this;
                this.controllerId = DetailsCtrl.controllerId;
                this.getMester = function (idMester) {
                    var getMesterRequest = new App.Services.GetMesterRequest();
                    getMesterRequest.idMester = idMester;
                    _this.theParam = idMester;
                    var promise = _this.core.dataService.getMester(getMesterRequest, function (response, success) {
                        _this.dbMester = response;
                        _this.thePrice = _this.dbMester.avgPrice;
                        if (success) {
                            _this.logSuccess('Mester details !');
                        }
                        else {
                            _this.logError('Mester details not found !');
                        }
                    });
                    return promise;
                };
                this.lastRequestLength = 0;
                this.searchReviewMester = function (idMester) {
                    if (_this.lastRequestLength != 0 && _this.lastRequestLength == _this.itemResults.length) {
                        return;
                    }
                    _this.lastRequestLength = _this.itemResults.length;
                    _this.searchReviewMesterRequest.idMester = idMester;
                    _this.searchReviewMesterRequest.pageNumber = (_this.itemResults.length);
                    _this.searchReviewMesterRequest.pageSize = 10;
                    var promise = _this.core.dataService.searchReviewMester(_this.searchReviewMesterRequest, function (response, success) {
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
                this.addReview = function () {
                    _this.ngDialog.open({ template: 'templateId', scope: _this.$scope });
                };
                this.addMesterReview = function () {
                    _this.addMesterReviewRequest.idMester = _this.$routeParams.mesterId;
                    _this.addMesterReviewRequest.idClient = _this.$routeParams.clientId;
                    var promise = _this.core.dataService.addMesterReview(_this.addMesterReviewRequest, function (response, success) {
                        _this.newReviewMester = response;
                        if (success) {
                            _this.itemResults.push(_this.newReviewMester);
                            _this.totalResults = _this.itemResults.length;
                            _this.logSuccess('The review was created !');
                        }
                        else {
                            _this.logError('Cannot create the review! ');
                        }
                    });
                    _this.itemResults.length = 0;
                    _this.searchReviewMester(_this.$routeParams.mesterId);
                    return promise;
                };
                this.myPagingFunction = function () {
                    if (_this.totalResults <= _this.itemResults.length) {
                        return;
                    }
                    _this.searchReviewMester(_this.$routeParams.mesterId);
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
                                _this.totalResults = _this.itemResults.length;
                            }
                            _this.logSuccess('The review was deleted');
                        }
                        else {
                            _this.logError('This review cannot be deleted !');
                        }
                    });
                };
                this.goBack = function () {
                    if (_this.core.sesionService.userRole == 'ROLE_ADMIN') {
                        _this.$location.path('admin-users');
                    }
                    else {
                        _this.$location.path('');
                    }
                };
                this.reloadPage = function () {
                    _this.$route.reload();
                };
                this.$scope = $scope;
                this.$route = $route;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.common = common;
                this.core = core;
                this.ngDialog = ngDialog;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.currentRole = core.sesionService.userRole;
                this.itemResults = new Array();
                this.addMesterReviewRequest = new App.Services.AddMesterReviewRequest();
                this.deleteReviewRequest = new App.Services.DeleteReviewRequest();
                this.searchReviewMesterRequest = new App.Services.SearchReviewMesterRequest();
                if (core.sesionService.userDetails != null) {
                    this.currentClientId = core.sesionService.userDetails.id;
                }
                else {
                    this.currentClientId = null;
                }
                ;
                this.activate([
                    this.getMester(this.$routeParams.mesterId)
                ]);
            }
            // TODO: is there a more elegant way of activating the controller - base class?
            DetailsCtrl.prototype.activate = function (promises) {
                this.common.activateController(promises, this.controllerId)
                    .then(function () { });
            };
            DetailsCtrl.controllerId = 'detailsCtrl';
            return DetailsCtrl;
        }());
        Controllers.DetailsCtrl = DetailsCtrl;
        App.app.controller(DetailsCtrl.controllerId, ['$scope', '$route', '$routeParams', '$location', 'common', 'core', 'ngDialog',
            function ($scope, $route, $routeParams, $location, common, core, ngDialog) { return new App.Controllers.DetailsCtrl($scope, $route, $routeParams, $location, common, core, ngDialog); }
        ]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=detailsCtrl.js.map