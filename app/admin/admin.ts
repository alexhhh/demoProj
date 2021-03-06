﻿/// <reference path="../common/common.ts" />
'use strict';

module App.Controllers{
 
    export class AdminCtrl { 
        public static controllerId = 'adminCtrl';
        //#region variables
        controllerId: string;
        core: App.Services.ICore;
        common: App.Shared.ICommon;
        $scope : any;
        log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;
        existSpec : boolean =false;
        spec: Array<any>; 
        addSpecialityRequest: App.Services.AddSpecialityRequest ;
        requestData : App.Services.GetSpecialityRequest ; 
        deleteSpecialityRequest :App.Services.DeleteSpecialityRequest;
        //#endregion
        
        
        constructor($scope, common: App.Shared.ICommon, core: App.Services.ICore)
        {
            this.$scope= $scope;
            this.common = common;
            this.controllerId = AdminCtrl.controllerId;
            this.core =core;
            this.log = this.common.logger.getLogFn(AdminCtrl.controllerId);           
            this.logError = this.common.logger.getLogFn('', 'error');
            this.logWarning = this.common.logger.getLogFn('', 'warn');
            this.logSuccess = this.common.logger.getLogFn('', 'success');
            this.addSpecialityRequest = new App.Services.AddSpecialityRequest();
            this.requestData = new App.Services.GetSpecialityRequest(); 
            this.deleteSpecialityRequest =  new App.Services.DeleteSpecialityRequest();
            this.activate([this.getSpecialities()]);
        } 
        
       
       private activate(promises:Array<ng.IPromise<any>>):void
        {
            this.common.activateController([], AdminCtrl.controllerId)
                .then(() => {   });
        }
        
        getSpecialities = () => {               
            var promise = this.core.dataService.getSpecialities(this.requestData, (response, success) =>{
                this.spec = response;
            } );
            return promise;
        }
        
        checkSpeciality = () => {
            var i=0;
            while( (i < this.spec.length) && (this.existSpec == false)  ){
            if ( this.addSpecialityRequest.specialityName != this.spec[i].specialityName){
                this.existSpec=false;
            }else {
                this.existSpec=true;
                    }++i;                
            }
        }
        
        
        addSpeciality = () => {
            this.existSpec=false;
            this.checkSpeciality();
            if (this.existSpec) {
                this.logError('This speciality already exist!');
            } else {
                var promise = this.core.dataService.addSpeciality(this.addSpecialityRequest, (response, success) => {
                    if (success) {
                        this.addSpecialityRequest.specialityName="";
                        this.logSuccess('The speciality was created');
                    } else {
                        this.logError('This speciality cannot be created');
                    }
                    this.getSpecialities();
                });
                return promise;
            }
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
    app.controller(AdminCtrl.controllerId, ['$scope','common', 'core', ($scope ,common: any, core) => new AdminCtrl($scope, common, core)]);

}