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
        getUserRequest: App.Services.GetUserRequest;
        userModel: App.Services.UserProfileViewModel;
        deleteUserRequest: App.Services.DeleteUserRequest;
       

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
            this.activate([this.getAllUsers()]);
        }

        // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { });
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
            this.core.sesionService.selectedUser=item;  
            var _url ;           
            if (item.roleId == 2) {
              _url = 'details/' + item.id;               
            } else if (item.roleId == 3) {
               _url = 'clientdetails/' + item.id;                
            } else if (item.roleId == 1) {
               _url = 'admin/' + item.id;
            }
            this.$location.path(_url); 
        }
 
    }
    // register controller with angular
    app.controller(AdminUsersCtrl.controllerId, ['common', 'core', '$location',
        (common, core, $location) => new App.Controllers.AdminUsersCtrl(common, core, $location)
    ]);
}