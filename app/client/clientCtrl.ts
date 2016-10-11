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
        thisClientId: string;     
        checkPassword : string ="";
        clientUserRequest: App.Services.GetClientUserRequest;         
        editUserRequest: App.Services.EditUserRequest;
        clientViewModel: App.Services.ClientProfileViewModel;
        addClientRequest : App.Services.AddClientRequest;
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
            this.clientUserRequest = new App.Services.GetClientUserRequest();
            this.editUserRequest = new App.Services.EditUserRequest();
            this.addClientRequest = new App.Services.AddClientRequest();
            this.getLogCredentialsRequest = new App.Services.GetLogCredentialsRequest(); 
            this.activate([ ]);
        }

        // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { 
            this.editUserRequest.user=this.core.sesionService.userDetails;
            this.clientViewModel.userName = this.core.sesionService.userDetails.userName;
            this.clientViewModel.email = this.core.sesionService.userDetails.email;  
            this.clientViewModel.firstName = this.core.sesionService.theClient.firstName;
            this.clientViewModel.lastName = this.core.sesionService.theClient.lastName;  
            this.addClientRequest.firstName = this.clientViewModel.firstName;
            this.addClientRequest.lastName = this.clientViewModel.lastName;
            });
        }


    
 
        editClient = () => {
            this.addClientRequest.id = this.core.sesionService.theClient.id;
            this.addClientRequest.userId = this.core.sesionService.userDetails.id;
            var promise = this.core.dataService.editClient(this.addClientRequest, (response, success) => {
                 if(success){
                    this.logSuccess("The client profile was modified !");
                }
                else {this.logError("Cannot edit the client profile!");
              }});
            return promise;
        }
 
        changePassword = () => {
            this.ngDialog.open({ template: 'passwordTemplate2', scope: this.$scope });
        }
        
        submit = () => {   
            this.editUserRequest.user.password = this.clientViewModel.password;
            this.editUser(); 
        }

        editUser = () => { 
            var promise = this.core.dataService.editUser(this.editUserRequest.user, (response, success) => {  
             if (success){     
             this.core.sesionService.userToken=null;
             this.getLogCredentialsRequest.userName = this.clientViewModel.userName;  
             this.getLogCredentialsRequest.password = this.editUserRequest.user.password;  
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