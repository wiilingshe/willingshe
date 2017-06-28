// var app = angular.module('myApp',[]);
// app.controller('myCtrl',['$scope','myService',function($scope,myService){
// 	$scope.info = 'car';
// 	$scope.num = myService.add(2)
// }])
var app = angular.module('myApp',['ngRoute']);
app.controller('myCtrl',['$scope','myService',function($scope,myService){
	$scope.info = 'car';
	$scope.num = myService.add(2);
	$scope.items = [{"code":"101"},{"code":"102"},{"code":"103"}];
	console.log($scope.num)
}])