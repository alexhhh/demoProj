'use strict';
module App.Controllers {

    export class MesterCtrl {
        public static controllerId: string = 'mesterCtrl';

        //#region Variables
        controllerId = MesterCtrl.controllerId;
        $scope: any;
        common: App.Shared.ICommon;
        core: App.Services.ICore;
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

        constructor($scope: any, common: App.Shared.ICommon, core: App.Services.ICore) {
            this.$scope = $scope;
            this.common = common;
            this.core = core;
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success');
            this.addMesterRequest = new App.Services.AddEditMesterRequest();
            this.getMesterRequest = new App.Services.GetMesterRequest();
            this.deleteMesterRequest = new App.Services.DeleteMesterRequest();
            // Queue all promises and wait for them to finish before loading the view
            this.activate([this.getSpecialities()]);
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

        addMester = () => {
            var promise = this.core.dataService.addMester(this.addMesterRequest, (response, success) => {
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
            var promise = this.core.dataService.getMester(this.getMesterRequest, (response, success) => {
                this.fullMester = response;
                this.addMesterRequest.isEdit = true;
                this.addMesterRequest.firstName = response.firstName;
                this.addMesterRequest.lastName = response.lastName;
                this.addMesterRequest.location = response.location;
                this.addMesterRequest.description = response.description;
                this.addMesterRequest.contact = response.contact;
                this.addMesterRequest.speciality = response.speciality;
                //this.addMesterRequest.speciality = ['128df176-4b2d-4f6b-a60e-91c557e0c3cd'];
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
            this.clearForm();
            this.addMesterRequest.isEdit = false;
            var promise = this.core.dataService.editMester(this.addMesterRequest, (response, success) => {
                this.fullMester = response;
                if (success) {
                    this.logSuccess('The mester was edited !');
                } else {
                    this.logError('Cannot edit the mester ! review the input data! ');
                }
            });
            return promise;
        }

        deleteMester = () => {
            this.deleteMesterRequest = this.getMesterRequest;
            var promise = this.core.dataService.deleteMester(this.deleteMesterRequest, (response, success) => {
                if (success) {
                    this.logSuccess('The mester was deleted !');
                } else {
                    this.logError('Cannot delete the mester !');
                }
            });
            return promise;
        }


                //#region private methods
       private  clearForm = () => {
            this.addMesterRequest = new App.Services.AddEditMesterRequest();
            this.$scope.mesteriForm.$setPristine();
        }

    }
    // register controller with angular
    app.controller(MesterCtrl.controllerId, ['$scope', 'common', 'core',
        ($scope, common, core) => new App.Controllers.MesterCtrl($scope, common, core)
    ]);
}