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
                        content: '<i class="fa fa-dashboard"></i> Dashboard',
                    }
                }
            }, {
                url: '/admin-spec',
                config: {
                    title: 'admin',
                    templateUrl: 'app/admin/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Speciality',
                        roles: ['ROLE_ADMIN'],
                        isChild: true
                    }
                }
            },{
                url: '/admin-users',
                config: {
                    title: 'admin',
                    templateUrl: 'app/admin/adminusers.html',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-lock"></i> Users',
                        roles: ['ROLE_ADMIN'],
                        isChild: true
                    }
                }
            },{
                url: '/admin-reviews',
                config: {
                    title: 'admin',
                    templateUrl: 'app/admin/adminrev.html',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-lock"></i> Reviews',
                        roles: ['ROLE_ADMIN'],
                        isChild: true
                    }
                }
            },{
                url: '/mester',
                config: {
                    title: 'mester',
                    templateUrl: 'app/mester/mester.html',
                    settings: {
                        nav: 5,
                        content: '<i class="fa fa-arrows"></i> Profile',
                        roles: ['ROLE_MESTER'],
                         isChild: true
                    }
                }
            },{
                url: '/mester-reviews',
                config: {
                    title: 'mester',
                    templateUrl: 'app/mester/mesterrev.html',
                    settings: {
                        nav: 6,
                        content: '<i class="fa fa-arrows"></i> Reviews',
                        roles: ['ROLE_MESTER'],
                        isChild: true
                    }
                }
            },{
                url: '/details/:mesterId/:clientId',
                config: {
                    title: 'details',
                    templateUrl: 'app/details/details.html' 
                }
            },{
                url: '/details/:mesterId',
                config: {
                    title: 'details',
                    templateUrl: 'app/details/details.html' 
                }
            },{
                url: '/clientdetails/:clientId',
                config: {
                    title: 'details',
                    templateUrl: 'app/details/clientdetails.html' 
                }
            },{
                url: '/admin/:id',
                config: {
                    title: 'details',
                    templateUrl: 'app/admin/adminprofile.html' ,
                    roles: ['ROLE_ADMIN'],
                }
            },{
                url: '/client',
                config: {
                    title: 'client',
                    templateUrl: 'app/client/client.html',
                    settings: {
                        nav: 7,
                        content: '<i class="fa fa-arrows"></i> Profile',
                        roles: ['ROLE_CLIENT'],
                        isChild: true
                    }
                }
            },{
                url: '/client-reviews',
                config: {
                    title: 'client',
                    templateUrl: 'app/client/clientrev.html',
                    settings: {
                        nav: 8,
                        content: '<i class="fa fa-arrows"></i> Reviews',
                        roles: ['ROLE_CLIENT'],
                        isChild: true
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
            }, {
                url: '/resetPassword',
                config: {
                    title: 'activate',
                    templateUrl: 'app/activate/resetpassword.html'                              
                }
            }, {
                url: '/resetPassword/:tokenId',
                config: {
                    title: 'activate',
                    templateUrl: 'app/activate/resetform.html'                              
                }
            }  
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