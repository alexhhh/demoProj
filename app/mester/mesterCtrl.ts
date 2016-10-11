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
        specialityIds : Array<any>;
        checkPassword: string =""; 
        thisLocation : string;
        fullMester : App.Services.FullMester;
        getMesterRequest: App.Services.GetMesterRequest;
        userViewModel: App.Services.UserViewModel;
        editUserRequest: App.Services.EditUserRequest;
        getLogCredentialsRequest: App.Services.GetLogCredentialsRequest;
        editMesterRequest: App.Services.AddEditMesterRequest; 
        editLocationRequest : App.Services.EditLocationRequest;
        markers = [];  
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
            this.activate([this.getSpecialities()]);
        }
        
        // TODO: is there a more elegant way of activating the controller - base class?
        private activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => {
                    //this.fullMester=this.core.sesionService.theMester;
                    this.getMesterRequest.idMester = this.core.sesionService.theMester.id;    
                    this.userViewModel.id = this.core.sesionService.userDetails.id;
                    this.editUserRequest.user=this.core.sesionService.userDetails;                     
                    this.userViewModel.userName = this.core.sesionService.userDetails.userName;                    
                    this.editMesterRequest= this.core.sesionService.theMester ;
                    this.editMesterRequest.contact.email=this.core.sesionService.userDetails.email;
                    var ids = this.core.sesionService.theMester.speciality.map(item => item.id);
                    this.specialityIds.length = 0;
                    this.specialityIds.push.apply(this.specialityIds, ids);                    
                    this.markThePlace();
                 });
        }


        getSpecialities = () => {
            var requestData = new App.Services.GetSpecialityRequest();
            var promise = this.core.dataService.getSpecialities(requestData, (response, success) => {
                this.specialityList = response;
            });
            return promise;
        }

 
        changePassword = () => {
            this.ngDialog.open({ template: 'passwordTemplate', scope: this.$scope });
        }
        
      submit = () => {
          this.editUserRequest.user.password = this.userViewModel.password;
          this.editUser();
      }

        editUser = () => {
            var promise = this.core.dataService.editUser(this.editUserRequest.user, (response, success) => {  
             if (success){     
             this.core.sesionService.userToken=null;
             this.getLogCredentialsRequest.userName = this.userViewModel.userName;  
             this.getLogCredentialsRequest.password = this.editUserRequest.user.password;  
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
 

        markThePlace = () => {   
                  
            this.NgMap.getMap('mesterMap').then(map => {
                if (this.markers.length > 0) {
               this.markers[0].setMap(null);
            }
                var myLatLng = new google.maps.LatLng( this.editMesterRequest.location.latitude,  this.editMesterRequest.location.longitude);
                var marker = new google.maps.Marker({
                title: "Your original location",
                map: map,
                position: myLatLng
            });
              this.markers.push(marker); 
               this.initGMaps(); 
            });
            this.logSuccess('The location coords are updated!');
 
        }


        initGMaps = () => {
            var geocoder = new google.maps.Geocoder;
            this.NgMap.getMap('mesterMap').then(map => {  
                google.maps.event.addListener(map, 'click', (e) => {                   
                     for (var i = 0; i < this.markers.length; i++) {
                     this.markers[i].setMap(null);
                    }
                    var marker = new google.maps.Marker({
                        title: "Your location",
                        map: map,
                        position: e.latLng
                    });
                    this.markers.push(marker);
                    geocoder.geocode({ 'location': e.latLng }, (results, status) => {
                        if (status === google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                map.setCenter(results[0].geometry.location);
                                for (var i = 0; i < results[0].address_components.length; i++) {
                                    if (results[0].address_components[i].types[0] == "locality") {
                                       this.editMesterRequest.location.location = results[0].address_components[i].long_name;                                       
                                       this.editMesterRequest.location.latitude = results[0].geometry.location.lat();
                                       this.editMesterRequest.location.longitude = results[0].geometry.location.lng();
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
 
        editUserMail = () => {   
            var promise = this.core.dataService.editUserMail(this.editUserRequest.user, (response, success) => {  
             if (success){    
                 this.core.sesionService.userDetails.email= this.editUserRequest.user.email  ;           
              }});
               return promise;
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
             var promise = this.core.dataService.editMester( this.editMesterRequest, (response, success) => {
                 if (success) {
                     this.logSuccess('The mester was edited !');
                        this.core.sesionService.theMester = this.editMesterRequest;   
                        this.editUserRequest.user.email = this.editMesterRequest.contact.email;                     
                        this.editUserMail();        

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