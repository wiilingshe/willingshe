define(['angular', 'require', 'angular-route'], function (angular, require) {
    var app = angular.module('webapp', ['ngRoute']);
    app.config(['$routeProvider', '$controllerProvider',
        function($routeProvider, $controllerProvider) {
            $routeProvider.
                when('/module1', {
                    templateUrl: 'module1/tpl.html',
                    controller: 'module1Controller',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['module1/module1.js'], function (controller) {
                                $controllerProvider.register('module1Controller', controller);  
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                 when('/module2', {
                    templateUrl: 'module2/tpl.html',
                    controller: 'module2Controller',
                    resolve:{
                        keyName: function ($route, $q) {
                            var deferred = $q.defer();
                            require(['module2/module2.js'], function (controller) {
                                $controllerProvider.register('module2Controller', controller);
                                // $route.current.template = module2.tpl;
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                otherwise({
                    redirectTo: '/module1'     
                });
        }]);

    return app;
});
// var app = angular.module('app',[ngRoute]);
// app.config(function($routeProvider){
//     $routeProvider.when('/main',{
//         templateUrl:'',
//         controller:''
//     })
//     .otherwise({redirectTo:'index'})
// })