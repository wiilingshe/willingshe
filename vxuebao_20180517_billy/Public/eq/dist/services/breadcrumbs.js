angular.module("services.breadcrumbs", []),
	angular.module("services.breadcrumbs").factory("breadcrumbs", ["$rootScope", "$location", function(a, b) {
		var c = [],
			d = {};
		return a.$on("$stateChangeSuccess", function(a, d) {
			var e, f = b.path().split("/"),
				g = [],
				h = function(a) {
					return "/" + f.slice(0, a + 1).join("/")
				};
			for(f.shift(), e = 0; e < f.length; e++) g.push({
				name: f[e],
				path: h(e)
			});
			c = g
		}), d.getAll = function() {
			return c
		}, d.getFirst = function() {
			return c[0] || {}
		}, d
	}]);