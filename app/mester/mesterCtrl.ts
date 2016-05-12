'use strict';
module App.Controllers {

    export class MesterCtrl {
        public static controllerId: string = 'mesterCtrl';

        //#region Variables
        controllerId = MesterCtrl.controllerId;
        $scope: any;
        common: App.Shared.ICommon;
        core: App.Services.ICore;
        ngDialog:any
        log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;
        specialityList: Array<any>;
        dbMester: Array<any>;
        fullMester: any;
        specialityIds : Array<any>;
        checkPassword: string ="";        
        getMesterRequest: App.Services.GetMesterRequest;
        userViewModel: App.Services.UserViewModel;
        editUserRequest: App.Services.EditUserRequest;
        getLogCredentialsRequest: App.Services.GetLogCredentialsRequest;
        editMesterRequest: App.Services.AddEditMesterRequest; 
        //#endregion

        constructor($scope: any, common: App.Shared.ICommon, core: App.Services.ICore, ngDialog:any) {
            this.$scope = $scope;
            this.common = common;
            this.core = core;
            this.ngDialog = ngDialog;
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
            this.getMesterRequest = new App.Services.GetMesterRequest();
            this.userViewModel = new App.Services.UserViewModel();
            this.editUserRequest = new App.Services.EditUserRequest();
            this.getLogCredentialsRequest = new  App.Services.GetLogCredentialsRequest();
            this.editMesterRequest = new App.Services.AddEditMesterRequest(); 
            this.specialityIds= new Array<any>();   
            // Queue all promises and wait for them to finish before loading the view
            this.activate([this.getSpecialities(), this.getMester()]);
        }
        
        // TODO: is there a more elegant way of activating the controller - base class?
        private activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { this.log('Activated Dashboard View'); });
        }


        getSpecialities = () => {
            var requestData = new App.Services.GetSpecialityRequest();
            var promise = this.core.dataService.getSpecialities(requestData, (response, success) => {
                this.specialityList = response;
            });
            return promise;
        }

        getMester = () => {            
            this.getMesterRequest.idMester = this.core.sesionService.userDetails.id;
            this.userViewModel.userName=this.core.sesionService.userDetails.userName;           
            var promise = this.core.dataService.getMester(this.getMesterRequest, (response, success) => { 
                this.editMesterRequest.id = this.core.sesionService.userDetails.id;
                this.editMesterRequest.firstName = response.firstName;
                this.editMesterRequest.lastName = response.lastName;
                this.editMesterRequest.location = response.location;
                this.editMesterRequest.description = response.description;  
                this.editMesterRequest.contact = response.contact;              
                this.editMesterRequest.contact.telNr = response.contact.telNr;
                this.editMesterRequest.contact.site = response.contact.site;
                this.editMesterRequest.contact.email = response.contact.email;
               
                var ids = response.speciality.map(item => item.id);
        
                this.specialityIds.length = 0;
                this.specialityIds.push.apply(this.specialityIds, ids);
                
               // this.editMesterRequest.speciality = response.speciality;
               //  [ '128df176-4b2d-4f6b-a60e-91c557e0c3cd'];
                //this.addMesterRequest.speciality.length = 0;
                //this.addMesterRequest.speciality.push('128df176-4b2d-4f6b-a60e-91c557e0c3cd');
                //this.addMesterRequest.speciality.length = 0;
                //this.addMesterRequest.speciality.push('128df176-4b2d-4f6b-a60e-91c557e0c3cd');
                if (success) {
                    this.logSuccess('The mester was found !');
                } else {
                    this.logError('There was an error in search! ');
                }
            });
            return promise;
        }

        
        editMester = () => {           
          var finalList = new Array<any>();          
          for(var index= 0 ; index < this.specialityIds.length ; index++){
            var itemId = this.specialityIds[index];            
            var speciality = this.specialityList.filter((item) => { 
                    return item.id == itemId;    
                } )[0];                
                
                if(!speciality){
                    continue;
                }
                finalList.push(speciality);
          }
          
          
          //this.editMesterRequest.speciality.map(item => this.specialityList.filter((item) => { return null;    } )   );
          
          this.editMesterRequest.speciality =finalList;
            var promise = this.core.dataService.editMester(this.editMesterRequest, (response, success) => { 
                if (success) {
                    this.logSuccess('The mester was edited !');
                } else {
                    this.logError('Cannot edit the mester ! review the input data! ');
                }
            });
            return promise;
        }
 
      changePassword = () => {
            this.ngDialog.open({ template: 'passwordTemplate', scope: this.$scope });
        }
        
        submit = () => { 
            this.editUserRequest.password = this.userViewModel.password;
            this.editUser(); 
        }

        editUser = () => {
            this.editUserRequest.id =this.core.sesionService.userDetails.id; 
            var promise = this.core.dataService.editUser(this.editUserRequest, (response, success) => {  
             if (success){     
             this.core.sesionService.userToken=null;
             this.getLogCredentialsRequest.userName = this.userViewModel.userName;  
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


        //    private  clearForm = () => {
        //         this.addMesterRequest = new App.Services.AddEditMesterRequest();
        //         this.$scope.mesteriForm.$setPristine();
        //     }
    
        // addMester = () => {
        //     var promise = this.core.dataService.addMester(this.addMesterRequest, (response, success) => {
        //         this.fullMester = response;
        //         if (success) {
        //             this.logSuccess('The mester was created !');
        //         } else {
        //             this.logError('Cannot create the mester ! review the input data! ');
        //         }
        //     });
        //     return promise;
        // }

        // deleteMester = () => {
        //     this.deleteMesterRequest = this.getMesterRequest;
        //     var promise = this.core.dataService.deleteMester(this.deleteMesterRequest, (response, success) => {
        //         if (success) {
        //             this.logSuccess('The mester was deleted !');
        //         } else {
        //             this.logError('Cannot delete the mester !');
        //         }
        //     });
        //     return promise;
        // }
    }
    // register controller with angular
    app.controller(MesterCtrl.controllerId, ['$scope', 'common', 'core', 'ngDialog',
        ($scope, common, core, ngDialog) => new App.Controllers.MesterCtrl($scope, common, core, ngDialog)
    ]);
}