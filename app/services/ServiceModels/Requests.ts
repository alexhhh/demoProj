module App.Services {
 
    export class GetSpecialityRequest {
    }
    
    export class AddSpecialityRequest {
        public specialityName: string;
    }   
    
    export class DeleteSpecialityRequest {
        public idSpeciality: string;
    } 
        
    export class GetMesterRequest {
        public idMester: string;
    }
    
    export class AddMesterRequest {
       
    }   
}