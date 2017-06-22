/** 
 * main.js这个文件完成的事情简单来说就是：载入所有文件，然后在document上运行Angular并将ng-app属性设置为’app’。 
 * 这些文件因为是由RequireJS异步载入，因此我们需要来“手动启动”Angular应用。 
 * 
 * */  
  
require.config({  
    paths: {  
        //库文件  
        //"responsive": "lib/responsive-nav",  
        "angular": "lib/angular",  
        "bootstrap": "lib/bootstrap.min",  
        "angularRoute": "lib/angular-route",  
        // "angularResource": "lib/angular-resource",  
        //"ui-bootstrap": "lib/ui-bootstrap-tpls-0.11.0.min",  
        //"phprpc": "lib/phprpc_client",  
        "jquery": "lib/jquery-3.0.0.min"  
    },  
    shim: {  
        angular: {  
            exports: "angular"  
        },  
        angularRoute: {  
            deps: ["angular"]  
        }
        // ,  
        // angularResource: {  
        //     deps: ['angular']  
        // }  
    },  
    // urlArgs: "bust=" + (new Date()).getTime()  //防止读取缓存，调试用  
});  
  
  
  
//手动启动ng  
require(['angular', 'routes'], function(angular){
        angular.bootstrap(document, ['app']);
    });