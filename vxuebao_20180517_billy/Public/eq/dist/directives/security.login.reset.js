angular.module("security.login.reset").directive("equals", function() {
	return {
		restrict: "A",
		require: "?ngModel",
		link: function(a, b, c, d) {
			if (d) {
				a.$watch(c.ngModel, function() {
					e()
				}), c.$observe("equals", function(a) {
					e()
				});
				var e = function() {
						var a = d.$viewValue,
							b = c.equals;
						d.$setValidity("equals", a === b)
					}
			}
		}
	}
});