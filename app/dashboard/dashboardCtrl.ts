/// <reference path="./../../scripts/typings/google.maps.d.ts" />

'use strict';
module App.Controllers {

    export class DashboardCtrl {
        public static controllerId: string = 'dashboardCtrl';
        //#region Variables
        controllerId = DashboardCtrl.controllerId;
        $scope: any;
        $location: ng.ILocationService
        core: App.Services.ICore
        common: App.Shared.ICommon;
        specialityList: Array<any>;
        log: any;
        logSuccess: Function;
        logError: Function;
        logWarning: Function;
        ngDialog: any;
        NgMap: any; 
        mesteriList: Array<any>;
        paginationOptions: any;
        itemId: string;
        currentRole: string;
        nrMesteri: number = 10;
        userToken: any;
        markers : any =[] ;
        forms : any =[] ;
        input: any;
        phoneNr : string;
        locationList : Array<any>;
        allThis: boolean; 
        lastLatLong : any;
        distanceForSquare: number;
        searchMesterRequest: App.Services.SearchMesterRequest;
        getLogCredentialsRequest: App.Services.GetLogCredentialsRequest;
        locationListRequest : App.Services.LocationListRequest;
        areaBorders : App.Services.SearchMesterByAreaRequest;

        //#endregion
        constructor($scope, $location: ng.ILocationService, common, core: App.Services.ICore, ngDialog: any, NgMap: any) {
            this.$scope = $scope;
            this.$location = $location;
            this.core = core;
            this.common = common;
            this.ngDialog = ngDialog;
            this.NgMap = NgMap;
            
            this.log = common.logger.getLogFn();
            this.logError = common.logger.getLogFn('', 'error');
            this.logWarning = common.logger.getLogFn('', 'warn');
            this.logSuccess = common.logger.getLogFn('', 'success'); 

            this.searchMesterRequest = new App.Services.SearchMesterRequest();
            this.getLogCredentialsRequest = new App.Services.GetLogCredentialsRequest();
            this.locationListRequest= new App.Services.LocationListRequest();
            this.areaBorders = new App.Services.SearchMesterByAreaRequest();
            this.allThis = this.core.sesionService.isLogged;
            // Queue all promises and wait for them to finish before loading the view
            this.activate([this.getSpecialities()]);
        }

        // TODO: is there a more elegant way of activating the controller - base class?
        private activate(promises: Array<ng.IPromise<any>>) {
            this.common.activateController(promises, this.controllerId)
                .then(() => {
                    if (this.core.sesionService.searchMesterRequestMaintener) {
                        this.searchMesterRequest = this.core.sesionService.searchMesterRequestMaintener;
                      this.searchMester(); 
                    }
                    if (google.maps.event){ 
                     this.initGMaps();   
                    }
                });
        } 
        
        getSpecialities = () => {
            var requestData = new App.Services.GetSpecialityRequest();
            var promise = this.core.dataService.getSpecialities(requestData, (response, success) => {
                this.specialityList = response;
            });
            return promise;
        }

        advanceSearch = () => {
            this.ngDialog.open({ template: 'templateId', scope: this.$scope });            
        }
        
        searchMester = () => { 
            this.core.sesionService.searchMesterRequestMaintener = this.searchMesterRequest;
            var promise = this.core.dataService.searchMester(this.searchMesterRequest, (response, success) => {
                if (success) { 
                this.mesteriList=response.contentPage;
                this.nrMesteri = response.totalResults;
                this.gridOptions.data = response.contentPage;
                    this.doThat();
                    this.logSuccess('The search was succesful !');
                } else {
                    this.logError('The search failed ! review the input data! ');
                }
            });
            return promise;
        }

        searchMesterByArea = () => {
               var promise = this.core.dataService.searchMesterByArea(this.areaBorders, (response, success) => {                 
                if (success) {
                this.mesteriList=response;
                this.nrMesteri = response.length;
                this.gridOptions.data = response;
                    this.doThat();
                    this.logSuccess('The search was succesful !');
                } else {
                    this.logError('The search failed ! review the input data! ');
                }
            });
            return promise; 
        }

        gridOptions = {
            enableFullRowSelection: true,
            enableRowSelection: true,
            enableSorting: true,
            enableRowHeaderSelection: false,
            modifierKeysToMultiSelect: false,
            multiSelect: false,
            selectAllRows: false,
            noUnselect: true,
            enablePaginationControls: true,
            useExternalPagination: true,
            useExternalSorting: true,
            paginationPageSizes: [10, 25, 50, 75],
            paginationPageSize: 10,
            enableSelection: true,
            totalItems: this.nrMesteri,

            data: [],
            columnDefs: [
                { name: 'id', visible: false },
                { name: 'firstName' },
                { name: 'lastName' },
                { name: 'location.location' },
                { name: 'description' },
                { name: 'avgPrice', cellFilter: 'mapPrice' },
                { name: 'avgRating', cellFilter: 'mapRating' }
            ],
            toggleFullRowSelection: () => { },
            isRowSelectable: () => { },
            onRegisterApi: (gridApi) => {
                this.$scope.gridApi = gridApi;
                gridApi.pagination.on.paginationChanged(this.$scope, (newPage, pageSize) => {
                    this.searchMesterRequest.pageNumber = newPage;
                    this.searchMesterRequest.pageSize = pageSize;
                    this.searchMester();
                });
                gridApi.selection.on.rowSelectionChanged(this.$scope, (item) => {
                    this.redirectToDetails(item.entity.id);
                });
                gridApi.selection.on.rowSelectionChangedBatch(this.$scope, (item) => {
                });
            }
        }
       
        doThat = () => {           
            var ids = [];
            if (this.nrMesteri) {
                for (var i = 0; i < this.nrMesteri; i++) {
                    ids.push(this.mesteriList[i].id);
                } 
                this.NgMap.getMap('dashboardMap').then((map) => {
                    var promise = this.core.dataService.getLocationByIds(ids, (response, success) => {
                        if (success) {
                            for (var i = 0; i < this.markers.length; i++) {
                                this.markers[i].setMap(null);
                            }
                            this.locationList = response;
                            this.markers = []; 
                            var latlngbounds = new google.maps.LatLngBounds();
                            for (var i = 0; i < this.nrMesteri; i++) {
                                var myLatLng = new google.maps.LatLng(this.locationList[i].latitude, this.locationList[i].longitude);
                              //  this.getMester(this.mesteriList[i].id );
                                var marker = new google.maps.Marker({
                                    title: " Mester: " +  this.mesteriList[i].firstName + " " +  this.mesteriList[i].lastName + 
                                        ",\n Rating: " +  this.mesteriList[i].avgRating+ "/5,\n Phone nr: " +  this.mesteriList[i].contact.telNr +".",
                                    map: map,
                                    position: myLatLng
                                });
                                 latlngbounds.extend(myLatLng);
                                this.markers.push(marker); 
                            map.fitBounds(latlngbounds);
                            }
                        } else {
                            this.logError('The search failed ! review the input data! ');
                        }
                    });
                });
            }
        }

        initGMaps = () => {    
            var geocoder = new google.maps.Geocoder;
            var infowindow = new google.maps.InfoWindow;
            this.NgMap.getMap('dashboardMap').then((map) => {
                google.maps.event.addListener(map, 'click', (e) => {
                     for (var i = 0; i < this.markers.length; i++) {
                         this.markers[i].setMap(null);
                    }                    
                    this. markers = [];
                    var marker = new google.maps.Marker({                         
                        title: "Your searched location",
                        map: map,
                        position: e.latLng                        
                    });
                    this.lastLatLong=e.latLng;
                     this.markers.push(marker);
                    geocoder.geocode({  'location': e.latLng},  (results, status)=> {
                        if (status === google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                map.setCenter(results[0].geometry.location); 
                                  for (var i = 0; i < results[0].address_components.length; i++) {
                                    if (results[0].address_components[i].types[0] == "locality") { 
                                      this.searchMesterRequest.location =results[0].address_components[i].long_name;
                                  } }                         

                                infowindow.setContent("Your search location");
                                infowindow.open(map, marker);
                            } else {
                                window.alert('No results found');
                            }
                        } else {
                            window.alert('Geocoder failed due to: ' + status);
                        }
                         if(!this.$scope.$$phase) {
                            this.$scope.$apply();
                        }
                        this.searchMester();
                    });
                });
            });
        }
        
        redirectToDetails = (iduAsta: string) => {
            var _url = 'details/' + iduAsta;
            if (this.core.sesionService.userRole == 'ROLE_CLIENT') {
                _url = _url + '/' + this.core.sesionService.theClient.id
            }
            this.$location.path(_url);
        }

        goBack = () => {
            this.core.sesionService.resetDashboardPage();
            this.searchMesterRequest = new App.Services.SearchMesterRequest();
            this.NgMap.getMap('dashboardMap').then((map) => {
                for (var i = 0; i < this.markers.length; i++) {
                    this.markers[i].setMap(null);
                }
                for (var i = 0; i < this.forms.length; i++) {
                    this.forms[i].setMap(null);
                }
                this.gridOptions.data.length = 0;
            });
        }

        drawSquare = () => { 
             for (var i = 0; i < this.forms.length; i++) {
                    this.forms[i].setMap(null);
                }
            this.NgMap.getMap('dashboardMap').then((map) => {     
                var ne = this.calcCoord(this.lastLatLong.lat(), this.lastLatLong.lng(), this.distanceForSquare, 45);
                var sw = this.calcCoord(this.lastLatLong.lat(), this.lastLatLong.lng(), this.distanceForSquare, -135);  
                 if (ne.lat() >= sw.lat() ){
                    this.areaBorders.minLat=sw.lat();
                    this.areaBorders.maxLat=ne.lat();                    
                } else  {
                    this.areaBorders.minLat=ne.lat();
                    this.areaBorders.maxLat=sw.lat();  
                };
                if (ne.lng() >= sw.lng() ){
                    this.areaBorders.minLng=sw.lng();
                    this.areaBorders.maxLng=ne.lng();                    
                } else  {
                    this.areaBorders.minLng=ne.lng();
                    this.areaBorders.maxLng=sw.lng();  
                };              
                var rBounds = new google.maps.LatLngBounds(sw, ne);
                var marker = new google.maps.Marker({                         
                        title: " NE",
                        map: map,
                        position: ne                        
                    });                   
                 this.markers.push(marker);
                  var marker2 = new google.maps.Marker({                         
                        title: " SW",
                        map: map,
                        position: sw                        
                    });                   
                 this.markers.push(marker2);
                
                var rectangle = new google.maps.Rectangle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,                
                    map: map,
                    bounds: rBounds
                });
                 this.forms.push(rectangle);
               // rectangle.setMap(map);
            });
            this.searchMesterByArea();
        }
 
        calcCoord  = (lat :number, lng:number, d:number, brng:number) => {
            var toRad = Math.PI / 180;
            var R = 6371  ;
            var radDist= d/R;
            lat = lat*toRad;
            lng = ((lng+540)%360-180)*toRad;            
            var lat2 = Math.asin( Math.sin(lat) * Math.cos(radDist) +  Math.cos(lat) * Math.sin(radDist) * Math.cos(brng*toRad));            
            var lgn2 =lng + Math.atan2( Math.sin(brng*toRad) * Math.sin(radDist) * Math.cos(lat) ,  Math.cos(radDist) - Math.sin(lat) * Math.sin(lat2) ) ;                       
            return new google.maps.LatLng(lat2/toRad, lgn2/toRad);
        }
 
 
    }
    // register controller with angular
    app.controller(DashboardCtrl.controllerId, ['$scope', '$location', 'common', 'core', 'ngDialog', 'NgMap',
        ($scope, $location, common, core, ngDialog, NgMap) => new App.Controllers.DashboardCtrl($scope, $location, common, core, ngDialog, NgMap)
    ]);

    var mapPrice = (($sce: any): any => {

        var genderHash = {
            1: 'LOW',
            2: 'MEDIUM',
            3: 'HIGH'
        };

        var xprice: any = (input: number) => {
            if (!input) {
                return '';
            } else {
                return genderHash[input];
            }
        }
        return xprice;
    });

    app.filter("mapPrice", ['$sce', ($sce) => mapPrice($sce)]);

    var mapRating = (($sce: any): any => {

        var genderHash = {
            1: '*',
            2: '**',
            3: '***',
            4: '****',
            5: '*****'
        };

        var xrating: any = (input: number) => {
            if (!input) {
                return '';
            } else {
                return genderHash[input];
            }
        }
        return xrating;
    });

    app.filter("mapRating", ['$sce', ($sce) => mapRating($sce)]);

}