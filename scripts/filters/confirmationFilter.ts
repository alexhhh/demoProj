'use strict';
module App  {  
   
  var confirmationFilter = (($sce: any): any => {

        var confirm: any = (input: number) => {
           if (!input){
                return ''
           } else if (input == 0) {
                return "FALSE"; 
           } else if (input == 1) {
                return "TRUE"; 
           }  
        }; 
        return confirm;
    });
    app.filter("confirmationFilter", ['$sce', ($sce) => confirmationFilter($sce)]);
}