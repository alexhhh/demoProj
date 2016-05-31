/// <reference path="./../../scripts/typings/google.maps.d.ts" />
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
        NgMap : any;
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
        editLocationRequest : App.Services.EditLocationRequest;
        //#endregion

        constructor($scope: any, common: App.Shared.ICommon, core: App.Services.ICore, ngDialog:any, NgMap: any) {
            this.$scope = $scope;
            this.common = common;
            this.core = core;
            this.ngDialog = ngDialog;
            this.NgMap = NgMap; 
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
            this.editLocationRequest= new App.Services.EditLocationRequest();
            this.activate([this.getSpecialities(), this.getMester()]);
        }
        
        // TODO: is there a more elegant way of activating the controller - base class?
        private activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => { this.initGMaps(); });
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
            this.userViewModel.userName = this.core.sesionService.userDetails.userName;
            var promise = this.core.dataService.getMester(this.getMesterRequest, (response, success) => {
                if (success) {
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
                    this.markThePlace();
                    this.logSuccess('The mester was found !');
                } else {
                    this.logError('There was an error in search! ');
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
                    this.core.sesionService.userToken = response.token;
                    this.core.sesionService.userDetails = response.user;
                } else {
                    this.logError('An error occurred whit the log in process!');
                }
            });
        } 

        editMesterLocation = () => {
            this.editLocationRequest.mesterId = this.editMesterRequest.id;
            this.editLocationRequest.location = this.editMesterRequest.location;
            var promise = this.core.dataService.editMesterLocation(this.editLocationRequest, (response, success) => {
                if (success) {
                    this.logSuccess('The location coords are updated!');
                } else {
                    this.logError('An error occurred in the process!');
                }
            });
        }

        markThePlace = () => {            
           var promise = this.core.dataService.getMesterLocation( this.getMesterRequest, (response, success)=> {
                if (success) {
                    this.NgMap.getMap('mesterMap').then(map => {
                      var myLatLng = new google.maps.LatLng(response.latitude, response.longitude);
                      var marker = new google.maps.Marker({
                        title: "Your location",
                        map: map,
                        position: myLatLng
                    });  
                    });
                    this.logSuccess('The location coords are updated!');
                } else {
                    this.logError('An error occurred in the process!');
                }
            
           });
        }


        initGMaps = () => {
            var markers = [];
            var geocoder = new google.maps.Geocoder;
            this.NgMap.getMap('mesterMap').then(map => {
                google.maps.event.addListener(map, 'click', (e) => {
                    if (markers.length > 0) {
                        markers[0].setMap(null);
                    }
                    var marker = new google.maps.Marker({
                        title: "Your location",
                        map: map,
                        position: e.latLng
                    });
                    markers.push(marker);
                    geocoder.geocode({ 'location': e.latLng }, (results, status) => {
                        if (status === google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                map.setCenter(results[0].geometry.location);
                                for (var i = 0; i < results[0].address_components.length; i++) {
                                    if (results[0].address_components[i].types[0] == "locality") {
                                        this.editMesterRequest.location = results[0].address_components[i].long_name;
                                        this.editLocationRequest.latitude = results[0].geometry.location.lat();
                                        this.editLocationRequest.longitude = results[0].geometry.location.lng();
                                    }}
                            } else {
                                this.logError('No results found');
                            }
                        } else {
                            this.logError('Geocoder failed due to: ' + status);
                        }
                        if (!this.$scope.$$phase) {
                            this.$scope.$apply();
                        }
                    });
                });
            });
        }
        
         editMester = () => {
             var finalList = new Array<any>();
             for (var index = 0; index < this.specialityIds.length; index++) {
                 var itemId = this.specialityIds[index];
                 var speciality = this.specialityList.filter((item) => { return item.id == itemId; })[0];
                 if (!speciality) {
                     continue;
                 } finalList.push(speciality);
             }
             //this.editMesterRequest.speciality.map(item => this.specialityList.filter((item) => { return null;    } )   );
             this.editMesterRequest.speciality = finalList;
             var promise = this.core.dataService.editMester(this.editMesterRequest, (response, success) => {
                 if (success) {
                     this.logSuccess('The mester was edited !');
                     this.editMesterLocation();
                 } else {
                     this.logError('Cannot edit the mester ! review the input data! ');
                 }
             });
             return promise;
         } 
    }
    // register controller with angular
    app.controller(MesterCtrl.controllerId, ['$scope', 'common', 'core', 'ngDialog','NgMap',
        ($scope, common, core, ngDialog, NgMap) => new App.Controllers.MesterCtrl($scope, common, core, ngDialog, NgMap)
    ]);
}