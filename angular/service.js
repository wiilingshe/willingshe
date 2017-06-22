// var app = angular.module('app',['app2']);
// app.controller('myCtrl',['$scope','myService','myService2','myName',function($scope,myService,myService2,myName){
// 	$scope.info = 'willing';
// 	$scope.number = myService.math(2);
// 	$scope.number2 = myService2.add(6);
// 	console.log(myName)
// }]);

// app.service('myService',function(){
// 	this.math = function(a){
// 		console.log(a*a);
// 		return a*a;
// 	}
// })
app.constant('myconstant',{
	config1:true,
	config2:'its config2'
});
app.value('myvalue',{
	config1:true,
	config2:'its config2'
})
app.factory('myService3',function(){
	var factory = {};
	factory.jiafa = function(a){
		return a+1;
	}
	return factory;
})
app.service('myService',function(myService3){
	console.log(myService3.jiafa(11))
	this.math = function(a){
		console.log(a+a);
		return a+a;
	}
	this.cehngfa = function(a){
		return a*a;
	}
})
angular.module('app2',[]).service('myService2',function(){
	this.jianfa = function(b){
		return b-1;
	}
})