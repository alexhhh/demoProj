/// <reference path="../common/common.ts" />
'use strict';

module App.Controllers{

    export interface IAdminCtrl {
        common:App.Shared.ICommon;
        controllerId: string;
        title:string;
    }


    export class AdminCtrl implements IAdminCtrl {
        public static controllerId = 'adminCtrl';
        //#region variables
        common: App.Shared.ICommon;
        controllerId: string;
        title: string;
        private log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;
        
        datacontext: App.Services.IDatacontext;
        dataService: Services.IDataService; 
        spec: Array<any>; 
        addSpecialityRequest: App.Services.AddSpecialityRequest ;
        //#endregion
        
        
        constructor(common: App.Shared.ICommon, datacontext, dataService: Services.IDataService)
        {
            this.common = common;
            this.controllerId = AdminCtrl.controllerId;
            this.title = "Admin";
            this.log = this.common.logger.getLogFn(AdminCtrl.controllerId);
             this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
            
            this.dataService = dataService; 
            this.addSpecialityRequest = new App.Services.AddSpecialityRequest();
            this.activate([this.getSpecialities()]);
        } 
 
        
        getSpecialities = () => {
          var requestData = new App.Services.GetSpecialityRequest();
          
            var promise = this.dataService.getSpecialities(requestData, (response, success) =>{
                this.spec = response;
            } );
            return promise;
        }
        
        addSpeciality = () => {
             var promise = this.dataService.addSpeciality( this.addSpecialityRequest, (response, success) =>{
                 if(success){
                    this.logSuccess('The speciality was created');}else {
                    this.logError('This speciality cannot be created');
                }
                 this.getSpecialities();
             } );
             return promise;
        }
 
         deleteSpeciality = (id: string) => {
             
            if(!confirm('Are you sure about this ?')){
                return;            
            }          
            var deleteSpecialityRequest =  new App.Services.DeleteSpecialityRequest();
            deleteSpecialityRequest.idSpeciality = id;
            
             var promise = this.dataService.deleteSpeciality(deleteSpecialityRequest, (response, success) =>{
                 if(success){
                    this.logSuccess('The speciality was deleted');
                } else {
                   this.logError('This speciality is used by workers and cannot be deleted !');
                }
                 this.getSpecialities(); 
             } );
             return promise;
        }
        
        //#region private methods
        private activate(promises:Array<ng.IPromise<any>>):void
        {
            this.common.activateController([], AdminCtrl.controllerId)
                .then(() => { this.log('Activated Admin View'); });
        }
        //#endregion
    }

    // Register with angular
    app.controller(AdminCtrl.controllerId, ['common', 'datacontext', 'dataService', 
    (common: any, datacontext, dataService) => new AdminCtrl(common, datacontext, dataService)
    ]);
    

}