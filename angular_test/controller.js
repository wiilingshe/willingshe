// var app = angular.module('myApp',[]);
// app.controller('myCtrl',['$scope','myService',function($scope,myService){
// 	$scope.info = 'car';
// 	$scope.num = myService.add(2)
// }])
var app = angular.module('myApp',['ngRoute']);
app.controller('myCtrl',['$scope','myService',function($scope,myService){
	$scope.info = 'car';
	$scope.num = myService.add(2)
	console.log($scope.num)
}])