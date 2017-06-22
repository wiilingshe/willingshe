app.directive('myDirective',function(){
	return{
		restrict:'EAC',
		template:'<div>{{name}}<span ng-transclude></span></div>',
		transclude:true,
		link:function($scope,ele,attrs){
			$scope.name = 'jack'
		}
	}
})