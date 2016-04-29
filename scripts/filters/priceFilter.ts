'use strict';
module App  {  
   
  var priceFilter = (($sce: any): any => {

        var xprice: any = (input: number) => {
           if (!input){
                return ''
           } else if (input == 1) {
                return "LOW"; 
           } else if (input == 2) {
                return "MEDIUM"; 
           } else if (input == 3) {
                return "HIGH"; 
           }
        }; 
        return xprice;
    });
    app.filter("priceFilter", ['$sce', ($sce) => priceFilter($sce)]);
}