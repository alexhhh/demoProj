'use strict';
module App{

    export var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',        // animations
        'ngRoute',          // routing
        'ngSanitize',       // sanitizes html bindings (ex: sidebarCtrl.js)

        // Custom modules 
        'common',           // common functions, logger, spinner
        'common.bootstrap', // bootstrap dialog wrapper functions
        'checklist-model',
        
        // 3rd Party Modules
        'ng-mesteri-validator',
        'breeze.angular',    // configures breeze for an angular app
        //'breeze.directives', // contains the breeze validation directive (zValidate)
        'ui.bootstrap',       // ui-bootstrap (ex: carousel, pagination, dialog)
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'ngDialog',
        'infinite-scroll'
    ]);
    
    // Handle routing errors and success events
    app.run(['$route',  function ($route) {
            // Include $route to kick start the router.
        }]);
        
    app.config(['$httpProvider', function ($httpProvider) {
        // ...
        

        // delete header from client:
        // http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api
       // delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }]);        
}


