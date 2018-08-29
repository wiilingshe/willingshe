angular.module("app.directives.limitInput", []).directive("limitInput", function() {
	return {
		require: "ngModel",
		link: function(a, b, c, d) {
			"transform" == c.cssItem && a.$on("updateTransform", function(b, c, e) {
				e == a.elemDef.id && (d.$setViewValue(parseInt(c, 10)), d.$render())
			}), "borderRadius" == c.cssItem && a.$on("updateMaxRadius", function(b, c) {
				a.maxRadius = parseInt(Math.min($(c).outerWidth(), $(c).outerHeight()) / 2 + 10, 10), a.maxRadius < a.model.borderRadius && (d.$setViewValue(a.maxRadius), d.$render()), a.$apply()
			}), a.$watch(function() {
				return $(b).val()
			}, function(a) {
				+a > c.max && (d.$setViewValue(c.max), d.$render()), +a < c.min && (d.$setViewValue(c.min), d.$render())
			})
		}
	}
});