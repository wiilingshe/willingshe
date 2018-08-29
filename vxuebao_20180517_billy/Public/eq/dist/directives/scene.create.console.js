angular.module("scene.create.console", ["scene.create.console","scene.create.console.setting"]); 
angular.module("scene.create.console").controller("ConsoleCtrl", ["$scope", function(a) {}]);
angular.module("scene.create.console").directive("autofocus", function() {
	return function(a, b, c) {
		setTimeout(function() {
			b.focus().select()
		}, 400)
	}
}).directive("checkCount", function() {
	return {
		restrict: "EA",
		require: "ngModel",
		link: function(a, b, c, d) {
			var e = parseInt(c.checkCount, 10);
			d.$viewChangeListeners.push(function() {
				if (countCharacters(d.$modelValue) > e) {
					var a = d.$modelValue.replace(/[^\x00-\xff]/g, "xx"),
						b = a.substring(0, e).replace(/xx/g, "中").length;
					d.$setViewValue(d.$modelValue.substring(0, b)), d.$render()
				}
			})
		}
	}
});