(function(angular) {
    'use strict';
    var app = angular.module('ng-mesteri-validator', []);

    app.directive('overwritePassword', function() {
        // var checkPassword;
        return {
            require: '?ngModel',
            link: function(scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.overwritePassword;
                elem.add(firstPassword).on('keyup', function() {
                    scope.$apply(function() {
                        var v = elem.val() === $(firstPassword).val();
                        ctrl.$setValidity('passmatch', v);
                    });
                });
            }
        }
    });

    app.directive('alexmail', function() {
        var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i;
        return {
            require: '?ngModel',
            link: function(scope, elm, attrs, ctrl) {
                // only apply the validator if ngModel is present and Angular has added the email validator
                if (ctrl && ctrl.$validators.email) {
                    // this will overwrite the default Angular email validator
                    ctrl.$validators.email = function(modelValue) {
                        return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
                    };
                }
            }
        };
    });

    app.directive('overwritePhoneNr', function() {
        var REGEX = /^[(]{0,1}[0-9]{4}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{3}$/;
        return {
            require: '?ngModel',
            link: function(scope, elm, attrs, ctrl) {
                // only apply the validator if ngModel is present and Angular has added the phone nr validator
                ctrl.$parsers.unshift(function(viewValue) {
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