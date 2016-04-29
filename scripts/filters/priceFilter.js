'use strict';
var App;
(function (App) {
    var priceFilter = (function ($sce) {
        var xprice = function (input) {
            if (!input) {
                return '';
            }
            else if (input == 1) {
                return "LOW";
            }
            else if (input == 2) {
                return "MEDIUM";
            }
            else if (input == 3) {
                return "HIGH";
            }
        };
        return xprice;
    });
    App.app.filter("priceFilter", ['$sce', function ($sce) { return priceFilter($sce); }]);
})(App || (App = {}));
//# sourceMappingURL=priceFilter.js.map