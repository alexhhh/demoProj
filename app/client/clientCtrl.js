'use strict';
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var ClientCtrl = (function () {
            //#endregion
            function ClientCtrl($scope, common, core, ngDialog) {
                var _this = this;
                //#region Variables
                this.controllerId = ClientCtrl.controllerId;
                this.checkPassword = "";
                this.getClient = function () {
                    _this.getClientRequest.id = _this.core.sesionService.userDetails.id;
                    _this.clientViewModel.userName = _this.core.sesionService.userDetails.userName;
                    _this.clientViewModel.email = _this.core.sesionService.userDetails.email;
                    var promise = _this.core.dataService.getClient(_this.getClientRequest, function (response, success) {
                        _this.clientViewModel.firstName = response.firstName;
                        _this.clientViewModel.lastName = response.lastName;
                    });
                    return promise;
                };
                // addClient = () => {
                //     var addClientRequest = new App.Services.AddClientRequest();
                //     addClientRequest.id = this.core.sesionService.userDetails.id;
                //     addClientRequest.clientUserId = this.core.sesionService.userDetails.id;
                //     addClientRequest.firstName = this.clientViewModel.firstName;
                //     addClientRequest.lastName = this.clientViewModel.lastName;
                //     var promise = this.core.dataService.addClient(addClientRequest, (response, success) => {
                //         if(success){
                //             this.logSuccess("The client profile was created!");
                //         }
                //         else {this.logError("Cannot create the client profile!");
                //     }});
                //     return promise;
                // }
                this.editClient = function () {
                    var addClientRequest = new App.Services.AddClientRequest();
                    addClientRequest.id = _this.core.sesionService.userDetails.id;
                    addClientRequest.firstName = _this.clientViewModel.firstName;
                    addClientRequest.lastName = _this.clientViewModel.lastName;
                    addClientRequest.clientUserId = _this.core.sesionService.userDetails.id;
                    var promise = _this.core.dataService.editClient(addClientRequest, function (response, success) {
                        if (success) {
                            _this.logSuccess("The client profile was modified !");
                        }
                        else {
                            _this.logError("Cannot edit the client profile!");
                        }
                    });
                    return promise;
                };
                // choose = () => {
                //     if (this.exist) {
                //         this.editClient();
                //     } else {
                //         this.addClient();
                //     }           
                // }        
                this.changePassword = function () {
                    _this.ngDialog.open({ template: 'passwordTemplate', scope: _this.$scope });
                };
                this.submit = function () {
                    _this.editUserRequest.password = _this.clientViewModel.password;
                    _this.editUser();
                };
                this.editUser = function () {
                    _this.editUserRequest.id = _this.core.sesionService.userDetails.id;
                    var promise = _this.core.dataService.editUser(_this.editUserRequest, function (response, success) {
                        if (success) {
                            _this.core.sesionService.userToken = null;
                            _this.getLogCredentialsRequest.userName = _this.clientViewModel.userName;
                            _this.getLogCredentialsRequest.password = _this.editUserRequest.password;
                            _this.logIn();
                        }
                    });
                    return promise;
                };
                this.logIn = function () {
                    var promise = _this.core.dataService.getLoggedUser(_this.getLogCredentialsRequest, function (response, success) {
                        if (success) {
                            _this.core.sesionService.userToken = response.token;
                            _this.core.sesionService.userDetails = response.user;
                        }
                        else {
                            _this.logError('An error occurred whit the log in process!');
                        }
                    });
                };
                this.$scope = $scope;
                this.common = common;
                this.core = core;
                this.ngDialog = ngDialog;
                this.log = common.logger.getLogFn();
                this.logError = common.logger.getLogFn('', 'error');
                this.logWarning = common.logger.getLogFn('', 'warn');
                this.logSuccess = common.logger.getLogFn('', 'success');
                this.clientViewModel = new App.Services.ClientProfileViewModel();
                this.getClientRequest = new App.Services.GetClientRequest();
                this.editUserRequest = new App.Services.EditUserRequest();
                this.getLogCredentialsRequest = new App.Services.GetLogCredentialsRequest();
                // Queue all promises and wait for them to finish before loading the view
                this.activate([this.getClient()]);
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
        // getLoggedUser = () => {
        //     this.loggedClient=this.core.sesionService.userDetails;
        // }
        // searchMester = () => {
        //     var promise = this.core.dataService.searchMester(this.searchMesterRequest, (response, success) => {
        //         this.mesterResultPage = response;
        //         if (success) {
        //             this.logSuccess('The search was succesful !');
        //         } else {
        //             this.logError('The search failed ! review the input data! ');
        //         } });
        //     return promise;
        // }
        // getClient = (idClient: string) => {
        //     var getMesterRequest = new App.Services.GetMesterRequest();
        //     getMesterRequest.idMester = idMester;
        //     this.theParam = idMester;
        //     var promise = this.core.dataService.getMester(getMesterRequest, (response, success) => {
        //         this.dbMester = response;
        //         if (success) {
        //             this.logSuccess('Mester details !');
        //         } else {
        //             this.logError('Mester details not found !');
        //         }
        //     });
        //     return promise;
        // }
        // searchReviewMester = () => {
        //     this.searchReviewMesterRequest.idMester = this.theParam;
        //     var promise = this.core.dataService.searchReviewMester(this.searchReviewMesterRequest, (response, success) => {
        //         this.reviewMesterResultPage = response;
        //         if (success) {
        //             this.logSuccess('The search for reviews was succesful !');
        //         } else {
        //             this.logError('The search for reviews failed !');}
        //     });
        //     return promise;
        // }
        //  addMesterReview = () => {            
        //      this.addMesterReviewRequest.idMester = this.theParam;
        //      this.addMesterReviewRequest.idClient='3448cfec-d77d-4023-9d2e-903889881510';
        //    var promise = this.core.dataService.addMesterReview( this.addMesterReviewRequest, (response, success) => {
        //         this.newReviewMester=response;
        //         if (success) {
        //             this.logSuccess('The review was created !');
        //         } else {
        //             this.logError('Cannot create the review! ');
        //         }
        //     });           
        //     return promise;      
        // }}
        // register controller with angular
        App.app.controller(ClientCtrl.controllerId, ['$scope', 'common', 'core', 'ngDialog', function ($scope, common, core, ngDialog) { return new App.Controllers.ClientCtrl($scope, common, core, ngDialog); }]);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=clientCtrl.js.map