'use strict';
module App.Controllers {

    export class AdminUsersCtrl {
        public static controllerId: string = 'adminUsersCtrl';

        //#region Variables
        controllerId = AdminUsersCtrl.controllerId;
        common: App.Shared.ICommon;
        core: App.Services.ICore;
        $location: ng.ILocationService;
        log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;
        users: Array<any>;
        clientDetails: any;
        getUserRequest: App.Services.GetUserRequest;
        userModel: App.Services.UserProfileViewModel;
        deleteUserRequest: App.Services.DeleteUserRequest;
        getClientRequest: App.Services.GetClientRequest;

        constructor(common, core: App.Services.ICore, $location: ng.ILocationService) {
            this.common = common;
            this.core = core;
            this.$location = $location;
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
            this.getUserRequest = new App.Services.GetUserRequest();
            this.userModel = new App.Services.UserProfileViewModel();
            this.deleteUserRequest = new App.Services.DeleteUserRequest();
            this.getClientRequest = new App.Services.GetClientRequest();
            this.activate([this.getAllUsers()]);
        }

        // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { this.log('Activated Dashboard View'); });
        }

        getAllUsers = () => {
            var promise = this.core.dataService.getUsers(this.getUserRequest, (response, success) => {
                this.users = response;
            });
            return promise;
        }


        deleteUser = (item: any) => {
            if (!confirm('Are you sure about this ?')) {
                return;
            }
            this.deleteUserRequest.idUser = item.id;
            this.deleteUserRequest.roleId = item.roleId;
            var promise = this.core.dataService.deleteUser(this.deleteUserRequest, (response, success) => {
                if (success) {
                    this.logSuccess('The user  was deleted');
                } else {
                    this.logError('This user cannot be deleted !');
                }
                this.getAllUsers();
            });
        }


        showDetails = (item: any) => {
            if (item.roleId == 2) {
                var _url = 'details/' + item.id;
                this.$location.path(_url);
            } else if (item.roleId == 3) {
                this.getClient(item.id);
                this.log("The client name is " + this.clientDetails.firstName + " " + this.clientDetails.lastName + " !");
            } else if (item.roleId == 1) {
                this.log("There are no details for this user!");
            }
        }

        getClient = (id: string) => {
            this.getClientRequest.id = id;
            var promise = this.core.dataService.getClient(this.getClientRequest, (response, success) => {
                this.clientDetails = response;
            });
            return promise;
        }


    }
    // register controller with angular
    app.controller(AdminUsersCtrl.controllerId, ['common', 'core', '$location',
        (common, core, $location) => new App.Controllers.AdminUsersCtrl(common, core, $location)
    ]);
}