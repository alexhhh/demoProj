'use strict';
module App.Controllers {

export class SignUpCtrl
    {
        public static controllerId:string = 'signUpCtrl';
        
        //#region Variables
        controllerId = DetailsCtrl.controllerId;
        $scope: any;
        common: App.Shared.ICommon;
        core:App.Services.ICore
        ngDialog:any;
        log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;
        userToken: any;
        user : any;
        user2: any;
        checkUsername = false;
        checkPassword : string =""; 
        inputType = 'password';
        addUserRequest: App.Services.AddUserRequest;
        getLogCredentialsRequest: App.Services.GetLogCredentialsRequest ;
        checkUserRequest : App.Services.CheckUserRequest;
        //using shortcut syntax on private variables in the constructor
        constructor( $scope, $route, common, core:App.Services.ICore, ngDialog: any)
        {
            this.$scope= $scope;
            this.common = common;
            this.core = core;
            this.ngDialog = ngDialog;           
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
            this.addUserRequest= new App.Services.AddUserRequest();
            this.getLogCredentialsRequest = new App.Services.GetLogCredentialsRequest();
            this.checkUserRequest= new App.Services.CheckUserRequest();   
            this.activate([]);
        }
    

   // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => {   });                
        }
     
        addUser =() => {    
            if (this.checkUsername)  { 
                this.checkUsername=false;  
            var promise = this.core.dataService.addUser(this.addUserRequest, (response, success) => {
                if (success){
               this.user = response;              
               this.ngDialog.open({ template: 'registrationTemplate' }); 
               this.addUserRequest = new App.Services.AddUserRequest();
               this.$scope.reviewForm.$setPristine();
               this.checkPassword="";
            } else {
                  this.logError('Cannot create user!');
             }  });           
            return promise;   
            }
            else{ this.logError('Invalide username!');}    
        }
        
        checkUser = () => {
            this.checkUserRequest.userName = this.addUserRequest.userName;
            if (this.checkUserRequest.userName != null) {
                var promise = this.core.dataService.checkUser(this.checkUserRequest, (response, success) => {
                    this.user2 = response;
                    if (this.user2.userName != null) {
                        this.logError('The username is taken');
                        this.checkUsername = false;
                    } else {
                        this.checkUsername = true;
                        this.logSuccess('The username is free !');
                    }
                });
            } else { this.logError('Invalid username'); }
        }
 
        hideShowPassword = () => {
            if (this.inputType == 'password') {
                this.inputType = 'text';
            } else {
                this.inputType = 'password';
            }
        }
        
}       
  app.controller(SignUpCtrl.controllerId, ['$scope' ,'$route', 'common', 'core', 'ngDialog',
        ($scope, $route, common,  core, ngDialog) => new  App.Controllers.SignUpCtrl($scope, $route, common, core, ngDialog)]);

}