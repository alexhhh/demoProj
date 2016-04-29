module App.Services {
    
    export interface ICore {
        sesionService: App.Services.ISesionService; 
        dataService: App.Services.IDataService;
    }
  
    export class Core  implements ICore {
        public static serviceId: string = 'core';   
        public sesionService: App.Services.ISesionService;
        public dataService: App.Services.IDataService;
        
        constructor(sessionService: App.Services.ISesionService,  dataService: App.Services.IDataService) {
            this.sesionService = sessionService;
            this.dataService = dataService;            
        }
                
    }
     app.factory(Core.serviceId, ['sesionService', 'dataService', (sesionService, dataService) => new Core(sesionService, dataService)]);
    
}