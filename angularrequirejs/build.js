({
    appDir: './', //打包前目录
    baseUrl: './', //应该是main.js的位置
    dir: './dist', //打包后目录
    modules: [
        {
            name: 'main'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    findNestedDependencies: true,
    mangle: false,
    removeCombined: true,
    paths: { 
            angular: 'js/angular.min',
            'angular-route': 'js/angular-route'
        },
        shim: {  
            angular: {
                exports: 'angular'
            },
            'angular-route': {
                deps: ['angular'],
                exports: 'ngRouteModule'
            }
        }
})