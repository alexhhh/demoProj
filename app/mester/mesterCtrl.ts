'use strict';
module App.Controllers {

    export class MesterCtrl {
        public static controllerId: string = 'mesterCtrl';

        //#region Variables
        controllerId = MesterCtrl.controllerId;
        common: App.Shared.ICommon;
        datacontext: App.Services.IDatacontext;
        dataService: Services.IDataService;
        log: any;
        spec: Array<any>;
        addMesterRequest: App.Services.AddMesterRequest;
        //#endregion

        constructor(common, datacontext, dataService: Services.IDataService) {
            this.common = common;
            this.datacontext = datacontext;
            this.log = common.logger.getLogFn();

            this.dataService = dataService;

            this.addMesterRequest = new App.Services.AddMesterRequest();
            // Queue all promises and wait for them to finish before loading the view
            this.activate([ ]);
        }


        getMester = (id: string) => {
            var getMesterRequest = new App.Services.GetMesterRequest();
            getMesterRequest.idMester=id;
            var promise = this.dataService.getMester(getMesterRequest, (response) => {
                this.spec = response;
            });
            return promise;
        }

        addMester = () => {
            var promise = this.dataService.addMester(this.addMesterRequest, (response) => {
                
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
    app.controller(MesterCtrl.controllerId, ['common', 'datacontext', 'dataService',
        (c, dc, dataService) => new App.Controllers.MesterCtrl(c, dc, dataService)
    ]);
}