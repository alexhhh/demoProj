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
        checkPassword : string ="";
        //allThis: boolean = true;
        inputType = 'password';
        addUserRequest: App.Services.AddUserRequest;
        getLogCredentialsRequest: App.Services.GetLogCredentialsRequest ;
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
           // this.allThis = this.core.dataService.isLogged;
            this.activate([]);
        }
    

   // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { this.log('Activated Dashboard View'); });                
        }
     
        addUser =() => {          
            var promise = this.core.dataService.addUser(this.addUserRequest, (response, success) => {
               this.user = response;
               this.ngDialog.open({ template: 'registrationTemplate' }); 
            });           
            return promise;       
        }
        
        checkUser = () => {
             var promise = this.core.dataService.checkUser(this.addUserRequest , (response, success) => {
                this.user2 = response;
                if ( this.user2.userName  != null) {
                    this.logError('The username is taken');
                } else { 
                    this.logSuccess('The username is free !');
        }});}

        hideShowPassword = () =>{ 
            if (this.inputType == 'password'){
                this.inputType = 'text';
            } else{
                this.inputType = 'password';
       }}
        
}       
  app.controller(SignUpCtrl.controllerId, ['$scope' ,'$route', 'common', 'core', 'ngDialog',
        ($scope, $route, common,  core, ngDialog) => new  App.Controllers.SignUpCtrl($scope, $route, common, core, ngDialog)]);

}