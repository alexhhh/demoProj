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

    export class AddEditMesterRequest {
        constructor(){
            this.speciality = new Array<any>();
            this.isEdit = false;   
        }
        
        public isEdit: boolean;      
        public idMester: string;
        public firstName: string;
        public lastName: string;
        public location: string;
        public description: string;
        public contact: any;
        public telNr: string;
        public email: string;
        public site: string;
        public socialPlatform: string;
        public speciality: Array<any>;
        public id:string;
    }

    export class SearchMesterRequest {
        public firstName: string;
        public lastName: string;
        public location: string;
        public specialityName: string;
        public telNr: string;
        public email: string;
        public price: any;
        public rating: number;
        public pageSize: number;
        public pageNumber: number;
    }
    
     export class SearchReviewMesterRequest { 
        public idMester: string;   
        public pageSize: number;
        public pageNumber: number;
    }
     
    export class GetMesterAvgRatingRequest {
        public idMester: string;
    }
    export class DeleteMesterRequest {
        public idMester: string;
    }
     
    export class AddMesterReviewRequest{
         public idMester: string;
         public idClinet: string;
         public price: any;
         public rating: number;
         public feedback: string;
    } 
    
}