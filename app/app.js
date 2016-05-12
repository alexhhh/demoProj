'use strict';
var App;
(function (App) {
    App.app = angular.module('app', [
        // Angular modules 
        'ngAnimate',
        'ngRoute',
        'ngSanitize',
        // Custom modules 
        'common',
        'common.bootstrap',
        'checklist-model',
        // 3rd Party Modules
        'ng-mesteri-validator',
        'breeze.angular',
        //'breeze.directives', // contains the breeze validation directive (zValidate)
        'ui.bootstrap',
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'ngDialog',
        'infinite-scroll' //,  'uiGmapgoogle-maps'
    ]);
    // Handle routing errors and success events
    App.app.run(['$route', function ($route) {
            // Include $route to kick start the router.
        }]);
    App.app.config(['$httpProvider', function ($httpProvider) {
            // ...
            // delete header from client:
            // http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api
            // delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $httpProvider.defaults.useXDomain = true;
            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        }]);
})(App || (App = {}));
//# sourceMappingURL=app.js.map