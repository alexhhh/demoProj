module App.Services {

    export class GetSpecialityRequest {
    }
    
    export class ResetPasswordRequest {
         public userName: string;
         public email: string;
    }
    
   export class ResetPasswordForm {
         public tokenId: string;
         public password: string;
    }
     export class GetUserTokenRequest {
          public tokenId: string;
          public userName: string;
          public email: string;
          public expDate: any;
          public password: string;
          
    }
  export class TokenRequest {
          public tokenId: string;
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
   


    export class GetMesterUserIdRequest {
        public userId: string;
    }

    export class EditLocationRequest{
        public mesterId: string;
        public location: string;
        public latitude: number;
        public longitude: number;
    }

    export class AddEditMesterRequest {
        constructor() {
            this.speciality = new Array<any>();
            
        }        
        public id: string;
        public firstName:string;
        public lastName: string;
        public location: any; 
        public description: string;
        public contact: any;
        public avgPrice: number;
        public avgRating: number; 
        public userId: string;      
        public speciality: Array<any>;         
    }

    export class LocationListRequest {
         public ids: Array<any>; 
        
    }


   export class FullMester {
      public mester: any;
   }

    export class SearchMesterRequest {
        public firstName: string;
        public lastName: string;
        public location: string;
        public specialityName: string;
        public telNr: string;
        public email: string;
        public avgPrice: number;
        public avgRating: number;
        public pageSize: number;
        public pageNumber: number;
    }

    export class SearchReviewMesterRequest {
        public idMester: string;
        public pageSize: number;
        public pageNumber: number;
    }
    
    export class SearchMesterByAreaRequest {
        public minLat: number;
        public maxLat: number;
        public minLng: number;
        public maxLng: number;
        
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
        public mesterId: string;
        public clientId: string;
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
        public id : string;
        public userName: string;
        public password: string;
        public email: string;      
        public roleId: string;
        public confirm: boolean;
    }
    
    export class CheckUserRequest {        
        public userName: string;
    }
    
    export class EditUserRequest {
        public user : any; 
    }

    export class ActivateUserRequest {
        public tokenId: string;
    }

    export class GetClientRequest {
        public id: string;
    }
    
    export class GetClientUserRequest {
        public userId: string;
    }

    export class AddClientRequest {
        public id: string;
        public firstName: string;
        public lastName: string;
        public userId: string;

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