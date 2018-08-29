angular.module("app.directives.pieChart", []).directive("pieChart", ["$compile", function(a) {
	return {
		restrict: "EA",
		link: function(a, b, c) {
			var d, e;
			a.$watch(function() {
				return c.data
			}, function() {
				c.data && (e = JSON.parse(c.data)), d ? (d.destroy(), d = new Chart(b[0].getContext("2d")).Pie(e)) : d = new Chart(b[0].getContext("2d")).Pie(e)
			})
		}
	}
}]);