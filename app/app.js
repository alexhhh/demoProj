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
        'ui.grid.pagination',
        'ngDialog'
    ]);
    // Handle routing errors and success events
    App.app.run(['$route', function ($route) {
            // Include $route to kick start the router.
        }]);
    App.app.config(['$httpProvider', function ($httpProvider) {
            // ...
            // delete header from client:
            // http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }]);
})(App || (App = {}));
//# sourceMappingURL=app.js.map