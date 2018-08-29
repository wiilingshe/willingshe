angular.module("services.localizedMessages", ["I18N.MESSAGES"]).factory("localizedMessages", ["$interpolate", "I18N.MESSAGES", function(a, b) {
	var c = function(a, b) {
			return a || "?" + b + "?"
		};
	return {
		get: function(d, e) {
			var f = b[d];
			return f ? a(f)(e) : c(f, d)
		}
	}
}]);