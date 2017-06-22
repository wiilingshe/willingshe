/** 
 * routes.js 
 */  
  
define([  
    "app"  
], function (app) {  
  
    //app是Angular应用对象  
    app.config(['$routeProvider',  
        function ($routeProvider) {  
  
            $routeProvider  
                .when('/search', {  
                    templateUrl: 'template/search.html',  
                    controller: 'SearchCtrl',
                    files:["controllers/ctrl"]
                })  
                .otherwise({ redirectTo: '/LmpSumQut' });  
  
        }]);  
  
})  