'use strict';
module App.Controllers {

    export class ClientCtrl {
        public static controllerId: string = 'clientCtrl';

        //#region Variables
        controllerId = ClientCtrl.controllerId;
        $scope : any 
        common: App.Shared.ICommon;
        core: App.Services.ICore;        
        ngDialog : any;        
        log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;
        searchCriteria: Array<any>;
        dbMester: any;
        theParam: string;
        totalRezults: number;
        mesterResultPage: any;
        mesterAvgRating: number;
        reviewMesterResultPage: any;         
        loggedClient: any;        
        checkPassword : string ="";
        getClientRequest: App.Services.GetClientRequest;         
        editUserRequest: App.Services.EditUserRequest;
        clientViewModel: App.Services.ClientProfileViewModel;
        getLogCredentialsRequest: App.Services.GetLogCredentialsRequest;
        
        //#endregion
        constructor($scope: any, common, core: App.Services.ICore, ngDialog:any) {
            this.$scope=$scope;
            this.common = common;
            this.core = core;
            this.ngDialog=ngDialog;
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');  
            this.clientViewModel = new App.Services.ClientProfileViewModel();
            this.getClientRequest = new App.Services.GetClientRequest();
            this.editUserRequest = new App.Services.EditUserRequest();
            this.getLogCredentialsRequest = new App.Services.GetLogCredentialsRequest(); 
            this.activate([this.getClient()]);
        }

        // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => {   });
        }


        getClient = () => {
            this.getClientRequest.id = this.core.sesionService.userDetails.id;
            this.clientViewModel.userName = this.core.sesionService.userDetails.userName;
            this.clientViewModel.email = this.core.sesionService.userDetails.email;
            var promise = this.core.dataService.getClient(this.getClientRequest, (response, success) => {
                this.clientViewModel.firstName = response.firstName;
                this.clientViewModel.lastName = response.lastName;
            });
            return promise;
        }
 
        editClient = () => {
            var addClientRequest = new App.Services.AddClientRequest();
            addClientRequest.id = this.core.sesionService.userDetails.id;
            addClientRequest.firstName = this.clientViewModel.firstName;
            addClientRequest.lastName = this.clientViewModel.lastName;
            addClientRequest.clientUserId = this.core.sesionService.userDetails.id;
            var promise = this.core.dataService.editClient(addClientRequest, (response, success) => {
                 if(success){
                    this.logSuccess("The client profile was modified !");
                }
                else {this.logError("Cannot edit the client profile!");
              }});
            return promise;
        }
 
        changePassword = () => {
            this.ngDialog.open({ template: 'passwordTemplate', scope: this.$scope });
        }
        
        submit = () => { 
            this.editUserRequest.password = this.clientViewModel.password;
            this.editUser(); 
        }

        editUser = () => {
            this.editUserRequest.id =this.core.sesionService.userDetails.id; 
            var promise = this.core.dataService.editUser(this.editUserRequest, (response, success) => {  
             if (success){     
             this.core.sesionService.userToken=null;
             this.getLogCredentialsRequest.userName = this.clientViewModel.userName;  
             this.getLogCredentialsRequest.password = this.editUserRequest.password;  
             this.logIn();            
             } });
            return promise;
        }
        
        logIn = () => {
            var promise = this.core.dataService.getLoggedUser(this.getLogCredentialsRequest, (response, success) => {
                if (success) {
                    this.core.sesionService.userToken = response.token;
                    this.core.sesionService.userDetails = response.user;
                } else {
                    this.logError('An error occurred whit the log in process!');
                }
            });
        } 
        
    }    
  
    app.controller(ClientCtrl.controllerId, ['$scope','common', 'core', 'ngDialog',($scope,common, core,ngDialog) => new App.Controllers.ClientCtrl($scope,common, core,ngDialog)]);
}