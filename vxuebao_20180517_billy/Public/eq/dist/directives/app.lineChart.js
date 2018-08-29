angular.module("app.directives.lineChart", []).directive("lineChart", ["$compile", function(a) {
	return {
		restrict: "EA",
		link: function(a, b, c) {
			var d, e;
			a.$watch(function() {
				return c.data
			}, function() {
				c.data && (d = JSON.parse(c.data)), e ? (e.destroy(), e = new Chart(b[0].getContext("2d")).Line(d, {
					scaleFontColor: "#fff"
				})) : e = new Chart(b[0].getContext("2d")).Line(d, {
					scaleFontColor: "#fff"
				})
			})
		}
	}
}]);