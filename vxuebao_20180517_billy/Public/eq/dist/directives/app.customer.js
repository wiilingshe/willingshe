angular.module("app.directives.customer", []).directive("forbiddenListClose", function() {
	return {
		restrict: "A",
		link: function(a, b, c) {
			$(b).click(function(a) {
				return !1
			})
		}
	}
});