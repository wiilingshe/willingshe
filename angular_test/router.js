app.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/demo',{
		template:'<div>111111</div>'
	})
	.otherwise({
		redireTo:'/'
	})
}])