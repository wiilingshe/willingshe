app.factory('myFactory',function(){
	var factory = {};
	factory.add = function(a){
		return a+a;
	}
	return factory;
})
app.service('myService',function(myFactory){
	console.log(myFactory.add(3))
	this.math = function(a){
		return a*a
	}
	this.add = function(a){
		return myFactory.add(a)
	}
})