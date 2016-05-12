'use strict';
module App  {  
   
  var roleFilter = (($sce: any): any => {

        var xprice: any = (input: number) => {
           if (!input){
                return ''
           } else if (input == 1) {
                return "ADMIN"; 
           } else if (input == 2) {
                return "MESTER"; 
           } else if (input == 3) {
                return "CLIENT"; 
           }
        }; 
        return xprice;
    });
    app.filter("roleFilter", ['$sce', ($sce) => roleFilter($sce)]);
}