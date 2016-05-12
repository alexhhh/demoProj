'use strict';
var App;
(function (App) {
    var confirmationFilter = (function ($sce) {
        var confirm = function (input) {
            if (!input) {
                return '';
            }
            else if (input == 0) {
                return "FALSE";
            }
            else if (input == 1) {
                return "TRUE";
            }
        };
        return confirm;
    });
    App.app.filter("confirmationFilter", ['$sce', function ($sce) { return confirmationFilter($sce); }]);
})(App || (App = {}));
//# sourceMappingURL=confirmationFilter.js.map