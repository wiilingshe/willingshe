// app.directive('isolatedDirective',function(){
// 	return { 
// 		scope: { 
// 		 	name: "@" 
// 		}, 
// 		template: 'Say：{{name}} <br>改变隔离scope的name：<input type="buttom" value="" ng-model="name">' 
// 	}
// });
app.directive('myDirective',function(){
	return{
		restrict:'EAC',
		scope:{},
		template:'<div>{{name}}</div>',
		link:function(scope, element,attrs){
			scope.name = 'jack';
			console.log(element);
			console.log(attrs)
		}
	}
})
// link和compile不兼容，不可以同时出现；
// 执行顺序：controller>compile || controller>link