/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
'use strict';
module App {
    export interface IAppRoute {
        url: string;
        config: ng.route.IRoute;
    }


    export class RouteConfigurator {
        constructor($routeProvider: ng.route.IRouteProvider, routes: any) {
            routes.forEach(r => {
                $routeProvider.when(r.url, r.config);
            });
            $routeProvider.otherwise({ redirectTo: '/' });
        }

    }

    // Define the routes - since this goes right to an app.constant, no use for a class
    // Could make it a static property of the RouteConfigurator class
    function getRoutes(): IAppRoute[] | any {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'                        
                    }
                }
            }, {
                url: '/admin',
                config: {
                    title: 'admin',
                    templateUrl: 'app/admin/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin',
                        roles: ['ROLE_ADMIN']
                    }
                }
            },{
                url: '/mester',
                config: {
                    title: 'mester',
                    templateUrl: 'app/mester/mester.html',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-arrows"></i> Mester',
                        roles: ['ROLE_ADMIN', 'ROLE_MESTER']
                    }
                }
            },{
                url: '/details/:clientId/:mesterId',
                config: {
                    title: 'details',
                    templateUrl: 'app/details/details.html' 
                }
            },
            {
                url: '/client',
                config: {
                    title: 'client',
                    templateUrl: 'app/client/client.html',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-arrows"></i> Client',
                        roles: ['ROLE_ADMIN', 'ROLE_CLIENT']
                    }
                }
            }, {
                url: '/signUp',
                config: {
                    title: 'signUp',
                    templateUrl: 'app/signUp/signUp.html'                            
                }
            }, {
                url: '/activateUser/:tokenId',
                config: {
                    title: 'activate',
                    templateUrl: 'app/activate/activate.html'                              
                }
            }
            // {
            //     url: '/details',
            //     config: {
            //         title: 'details',
            //         templateUrl: 'app/details/details.html',
            //         settings: {
            //             nav: 5,
            //             content: '<i class="fa fa-arrows"></i> details'
            //         }
            //     }
            // }
        ];
    }

    // Collect the routes
    app.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    app.config([
        '$routeProvider', 'routes',
        ($routeProvider, routes) =>
            new RouteConfigurator($routeProvider, routes)
    ]);

}