'use strict';
module App.Controllers
{

    export class ClientCtrl
    {
        public static controllerId: string = 'clientCtrl';
        
//#region Variables
        controllerId = ClientCtrl.controllerId;
        common: App.Shared.ICommon;
        datacontext: App.Services.IDatacontext;
        dataService: Services.IDataService;
        log: any;
       
        spec: Array<any>; 
        
       
        
        //#endregion
        constructor(common, datacontext, dataService: Services.IDataService)
        {
            this.common = common;
            this.datacontext = datacontext;
            this.log = common.logger.getLogFn();
            
            this.dataService = dataService;
            
           
            // Queue all promises and wait for them to finish before loading the view
             this.activate([]);
       
        }

        // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>)
        {
            this.common.activateController(promises, this.controllerId)
                .then(() => { this.log('Activated Dashboard View'); });
        }
        
     
         

    }

    // register controller with angular
    app.controller(ClientCtrl.controllerId, ['common', 'datacontext', 'dataService',
        (c, dc, dataService) => new App.Controllers.ClientCtrl(c, dc, dataService)
    ]);
}