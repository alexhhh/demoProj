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
            // Queue all promises and wait for them to finish before loading the view
            this.activate([this.getClient()]);
        }

        // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { this.log('Activated Dashboard View'); });
        }


        getClient = () => {
            this.getClientRequest.id = this.core.sesionService.userDetails.id;
            this.clientViewModel.userName=this.core.sesionService.userDetails.userName;           
            this.clientViewModel.email=this.core.sesionService.userDetails.email;             
            var promise = this.core.dataService.getClient(this.getClientRequest, (response, success) => {
           this.clientViewModel.firstName=response.firstName;
           this.clientViewModel.lastName=response.lastName;
             });
            return promise;
        }

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

        // choose = () => {
        //     if (this.exist) {
        //         this.editClient();
        //     } else {
        //         this.addClient();
        //     }           
        // }        

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
                    this.core.sesionService.userToken=response.token;                   
                    this.core.sesionService.userDetails = response.user;                     
                } else {                    
                    this.logError('An error occurred whit the log in process!');
                }
            });
        } 
        
    }    
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
    
    app.controller(ClientCtrl.controllerId, ['$scope','common', 'core', 'ngDialog',($scope,common, core,ngDialog) => new App.Controllers.ClientCtrl($scope,common, core,ngDialog)]);
}