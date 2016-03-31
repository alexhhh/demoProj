(function(angular) {
  'use strict';
var app = angular.module('ng-mesteri-validator', []);

app.directive('overwritePhoneNr', function() {
  var REGEX = /^[(]{0,1}[0-9]{4}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{3}$/;

  return {
    require: '?ngModel',
    link: function(scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the phone nr validator
      
      ctrl.$parsers.unshift(function (viewValue) {

        if (REGEX.test(viewValue)) { 
          ctrl.$setValidity('phone', true);
          return viewValue;
        } else {
          ctrl.$setValidity('phone', false);
          // if invalid, return undefined
          // (no model update happens)
          return undefined;
        }

      });
    
      
      
      
    }
  };
});
})(window.angular);