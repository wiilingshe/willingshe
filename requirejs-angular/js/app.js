/** 
 * app.js 
 */  
  
define(  
    [  
        'angular',  
        // 'angularResource',  
        'angularRoute',  
        'controllers/index',  
        'services/index'  
    ], function (angular) {  
        return angular.module('app', ['ngRoute','controllers', 'services']);  
    }  
) 