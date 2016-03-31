'use strict';
module App.Controllers {

    export class MesterCtrl {
        public static controllerId: string = 'mesterCtrl';

        //#region Variables
        controllerId = MesterCtrl.controllerId;
        
        $scope: any;
        common: App.Shared.ICommon;
        datacontext: App.Services.IDatacontext;
        dataService: Services.IDataService;
        log: Function;
        logError: Function;
        logWarning: Function;
        logSuccess: Function;
        specialityList: Array<any>;
        dbMester: Array<any>;
        addMesterRequest: App.Services.AddEditMesterRequest;     
        getMesterRequest: App.Services.GetMesterRequest;
        deleteMesterRequest: App.Services.DeleteMesterRequest;
        fullMester: any;
        //#endregion

        constructor($scope: any, common: App.Shared.ICommon, datacontext, dataService: Services.IDataService) {
            this.$scope = $scope;
            this.common = common;
            this.datacontext = datacontext;
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
           

            this.dataService = dataService;
            this.addMesterRequest = new App.Services.AddEditMesterRequest();
            this.getMesterRequest = new App.Services.GetMesterRequest();
            this.deleteMesterRequest = new App.Services.DeleteMesterRequest();
            // Queue all promises and wait for them to finish before loading the view
            this.activate([this.getSpecialities()]);
        }

        getSpecialities = () => {
            var requestData = new App.Services.GetSpecialityRequest();
            var promise = this.dataService.getSpecialities(requestData, (response, success) => {
                this.specialityList = response;
            });
            return promise;
        }

        addMester = () => {
            var promise = this.dataService.addMester(this.addMesterRequest, (response, success) => {
                this.fullMester = response;
                if (success) {
                    this.logSuccess('The mester was created !');
                } else {
                    this.logError('Cannot create the mester ! review the input data! ');
                }
            });           
            return promise;
               
        }
        
        
        getMester = () => {
           this.clearForm();
           
            var promise = this.dataService.getMester(this.getMesterRequest, (response, success) => {
                this.fullMester = response;
                //this.addMesterRequest = response;
                this.addMesterRequest.isEdit = true;
                this.addMesterRequest.firstName= response.firstName;
                this.addMesterRequest.lastName= response.lastName;
                this.addMesterRequest.location=response.location;
                this.addMesterRequest.description = response.description;
                this.addMesterRequest.contact = response.contact;
                this.addMesterRequest.speciality = response.speciality;
               // this.addMesterRequest.speciality = ['128df176-4b2d-4f6b-a60e-91c557e0c3cd'];
                
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

        clearForm = () => {
            this.addMesterRequest = new App.Services.AddEditMesterRequest();
            this.$scope.mesteriForm.$setPristine();
        }
        
        editMester = () => {  
            this.clearForm();
            this.addMesterRequest.isEdit=false;             
            var promise = this.dataService.editMester(this.addMesterRequest, (response, success) => {
                this.fullMester = response;
                if (success) {
                    this.logSuccess('The mester was edited !');
                } else {
                    this.logError('Cannot edit the mester ! review the input data! ');
                }
            });
            return promise;

        }

        deleteMester=() => {
            this.deleteMesterRequest=this.getMesterRequest;
            var promise = this.dataService.deleteMester(this.deleteMesterRequest, (response, success) => {            
                if (success) {
                    this.logSuccess('The mester was deleted !');
                } else {
                    this.logError('Cannot delete the mester !');
                }
            });
            return promise;

            
        }


        // TODO: is there a more elegant way of activating the controller - base class?
        //#region private methods
        private activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { this.log('Activated Dashboard View'); });
        }
    }

    // register controller with angular
    app.controller(MesterCtrl.controllerId, ['$scope','common', 'datacontext', 'dataService',
        ($scope, c, dc, dataService) => new App.Controllers.MesterCtrl($scope, c, dc, dataService)
    ]);
}