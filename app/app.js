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
        // 3rd Party Modules
        'breeze.angular',
        'breeze.directives',
        'ui.bootstrap' // ui-bootstrap (ex: carousel, pagination, dialog)
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