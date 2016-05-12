'use strict';
var App;
(function (App) {
    var roleFilter = (function ($sce) {
        var xprice = function (input) {
            if (!input) {
                return '';
            }
            else if (input == 1) {
                return "ADMIN";
            }
            else if (input == 2) {
                return "MESTER";
            }
            else if (input == 3) {
                return "CLIENT";
            }
        };
        return xprice;
    });
    App.app.filter("roleFilter", ['$sce', function ($sce) { return roleFilter($sce); }]);
})(App || (App = {}));
//# sourceMappingURL=roleFilter.js.map