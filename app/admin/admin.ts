/// <reference path="../common/common.ts" />
'use strict';

module App.Controllers{

    // export interface IAdminCtrl {
    //     common:App.Shared.ICommon;
    //     controllerId: string;
    //     title:string;
    // }


    export class AdminCtrl { //implements IAdminCtrl {
        public static controllerId = 'adminCtrl';
        //#region variables
        controllerId: string;
        core: App.Services.ICore;
        common: App.Shared.ICommon;
        log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;
        spec: Array<any>; 
        addSpecialityRequest: App.Services.AddSpecialityRequest ;
        requestData : App.Services.GetSpecialityRequest ; 
        deleteSpecialityRequest :App.Services.DeleteSpecialityRequest;
        //#endregion
        
        
        constructor(common: App.Shared.ICommon, core: App.Services.ICore)
        {
            this.common = common;
            this.controllerId = AdminCtrl.controllerId;
            this.core =core;
           // this.log = this.common.logger.getLogFn(AdminCtrl.controllerId);
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
 
            this.addSpecialityRequest = new App.Services.AddSpecialityRequest();
            this.requestData = new App.Services.GetSpecialityRequest(); 
            this.deleteSpecialityRequest =  new App.Services.DeleteSpecialityRequest();
            this.activate([this.getSpecialities()]);
        } 
        
       
       private activate(promises:Array<ng.IPromise<any>>):void
        {
            this.common.activateController([], AdminCtrl.controllerId)
                .then(() => { this.log('Activated Admin View'); });
        }
        
        getSpecialities = () => {               
            var promise = this.core.dataService.getSpecialities(this.requestData, (response, success) =>{
                this.spec = response;
            } );
            return promise;
        }
        
        addSpeciality = () => {
             var promise = this.core.dataService.addSpeciality( this.addSpecialityRequest, (response, success) =>{
                 if(success){
                    this.logSuccess('The speciality was created');
                }else {
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
            this.deleteSpecialityRequest.idSpeciality = id;            
             var promise = this.core.dataService.deleteSpeciality(this.deleteSpecialityRequest, (response, success) =>{
                 if(success){
                    this.logSuccess('The speciality was deleted');
                } else {
                   this.logError('This speciality is used by workers and cannot be deleted !');
                }
                 this.getSpecialities(); 
             } );
             return promise;
        }}
    
    // Register with angular
    app.controller(AdminCtrl.controllerId, ['common', 'core', (common: any, core) => new AdminCtrl(common, core)]);

}