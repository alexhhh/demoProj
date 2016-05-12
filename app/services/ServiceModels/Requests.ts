module App.Services {

    export class GetSpecialityRequest {
    }
    
    export class GetUserRequest {
    }

    export class AddSpecialityRequest {
        public specialityName: string;
    }

    export class DeleteSpecialityRequest {
        public idSpeciality: string;
    }
    
   export class DeleteReviewRequest {
        public idReview: string;
    }
    
    export class DeleteUserRequest {
        public idUser: string;
        public roleId: number;
    }

    export class GetMesterRequest {
        public idMester: string;
    }

    export class AddEditMesterRequest {
        constructor() {
            this.speciality = new Array<any>();
            
        }        
        public id: string;
        public firstName: string;
        public lastName: string;
        public location: string;
        public description: string;
        public contact: any;
        public telNr: string;
        public email: string;
        public site: string;         
        public speciality: Array<any>;         
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
    
   export class SearchReviewFromClientRequest {
        public idClient: string;
        public pageSize: number;
        public pageNumber: number;
    }
    
    export class GetAllReviewsRequest { 
        public pageSize: number;
        public pageNumber: number;
    }

    export class DeleteMesterRequest {
        public idMester: string;
    }

    export class AddMesterReviewRequest {
        public idMester: string;
        public idClient: string;
        public title: string;
        public price: any;
        public rating: number;
        public feedback: string;
    }

    export class GetLogCredentialsRequest {

        public userName: string;
        public password: string;
    }

    export class AddUserRequest {
        
        public roleId: number;
        public confirm: boolean;
    }
    
    
    export class EditUserRequest {
        public id : string;
        public userName: string;
        public password: string;
        public email: string;
    }

    export class ActivateUserRequest {
        public tokenId: string;
    }

    export class GetClientRequest {
        public id: string;
    }

    export class AddClientRequest {
        public id: string;
        public firstName: string;
        public lastName: string;
        public clientUserId: string;

    }

    export class ClientProfileViewModel {
        public userName: string;
        public password: string;
        public firstName: string;
        public lastName: string;
        public email: string;
    }

   export class MesterProfileViewModel {
        public userName: string;
        public password: string;
        public firstName: string;
        public lastName: string;
        public location: string;
        public description: string;
        public email: string;
        public telNr: string;
        public site: string;
        public speciality: Array<any>;        
    }
    
     export class UserViewModel {
        public id : string ;
        public userName: string;
        public password: string;
     }
    export class UserProfileViewModel {
        public id : string;
        public userName: string;
        public roleId: number;
        public enable: boolean;
    }



}