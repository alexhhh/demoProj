'use strict';
module App.Controllers
{

    export class PapaCtrl
    {
        public static controllerId: string = 'papaCtrl';
        
//#region Variables
        controllerId = PapaCtrl.controllerId;
        common: App.Shared.ICommon;
        datacontext: App.Services.IDatacontext;
        dataService: Services.IDataService;
        log: any;
        alex: string;
        success: string;
        idSpec: Array<String>;
        nameSpec: Array<String>;
        spec: Array<any>; 
        
        addMesterRequest: App.Services.AddMesterRequest;
        
        //#endregion
        constructor(common, datacontext, dataService: Services.IDataService)
        {
            this.common = common;
            this.datacontext = datacontext;
            this.log = common.logger.getLogFn();
            
            this.dataService = dataService;
            
            this.alex='asdf';
            // Queue all promises and wait for them to finish before loading the view
            this.activate([]);
            this.success="Habar nu am cum!";
            
            this.idSpec=["1","2","3","4"];
            this.nameSpec=["spec1","spec2","spec3","spec4"];
            
            this.addMesterRequest = new App.Services.AddMesterRequest();
            
            //this.spec = new Array<any>();
            //this.spec.push({id: 1,name: 'spec1'})
           
            
            // Queue all promises and wait for them to finish before loading the view
            this.activate([this.getMesteri()]);
        }

        // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>)
        {
            this.common.activateController(promises, this.controllerId)
                .then(() => { this.log('Activated Dashboard View'); });
        }
        
        getMesteri = () => {
          var requestData = new App.Services.GetMesteriRequest();
          
            var promise = this.dataService.getMesteri(requestData, (response) =>{
                this.spec = response;
            } );
            return promise;
        }
        
        addMester = () => {
             var promise = this.dataService.addMester(this.addMesterRequest, (response) =>{
                 this.getMesteri();
             } );
             return promise;
        }
        
        
        // Do = function() {
        //     setTimeout(function(){
                
        //         
        // }
                
        //     }, 1000);
        
        Do2 = () =>{
            setTimeout( () => {
                        
            }, 1000);
        }
        
        DoSmth = () =>{
           this.success;   
        }
         

    }

    // register controller with angular
    app.controller(PapaCtrl.controllerId, ['common', 'datacontext', 'dataService',
        (c, dc, dataService) => new App.Controllers.PapaCtrl(c, dc, dataService)
    ]);
}