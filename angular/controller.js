// var app = angular.module('app',[]);
// app.controller('ctrl',['$scope',function($scope){
// 	$scope.title = '点击展开';
//     $scope.text = '这里是内部的内容。';	
// 	$scope.info = [1,2,3,4,5,6];
// 	$scope.age = '23'
// 	$scope.changeAge = function(){
// 		$scope.age = '0';
// 	}
// }])
// app.directive('hello',function(){
// 	return{
// 		restrict:'EA',
// 		templateUrl:'tpls/hello.html',
// 		transclude:true
// 	}
// })
// app.directive('willing',function(){
// 	return{
// 		scope : {
//             title : "@myTitle",
//             age:'=',
//             changeAge:'&changeMyAge'
//         },
// 		restrict:'EA',
// 		templateUrl:'tpls/demo.html',
// 		controller:function($scope){
// 			console.log($scope.title)
// 		},
// 		link:function($scope){
// 			$scope.name = 'weilin'
// 		}
// 	}
// })
var app = angular.module('app',['app2']);
app.controller('myCtrl',['$scope','myService','myService2','myconstant','myvalue',function($scope,myService,myService2,myconstant,myvalue){
	$scope.name = 'willingshe'
	$scope.uesrs = {
		name:'james'
	};
	$scope.userBase = { 
		 name: 'hello', 
		 id: 1 
 	}; 
	console.log(myconstant.config1);
	console.log(myconstant.config2);
	$scope.number = '2';
	var b = myService2.jianfa(2);
	console.log(b)
	$scope.relust = myService.math(2);
	$scope.a = myService.cehngfa(3)
	console.log($scope.relust);
	console.log($scope.a);
	$scope.info='hello,world!'
}])