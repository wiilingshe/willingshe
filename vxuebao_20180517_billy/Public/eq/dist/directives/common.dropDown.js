angular.module("common.directives.dropDown").directive("eqdSelect", ["$rootScope", function(a) {
	function b(b, c) {
		function d() {
			f.unbind("click", d), g.removeClass("visible")
		}
		function e(a) {
			index = a.index(), b.current = b.list[index], g.removeClass("visible")
		}
		var f = (tabletCheck(), $(document)),
			g = c.find(".eqc-drop-down-list"),
			h = g.find(".iScrollIndicator");
		c.on("$destroy", function() {
			f.unbind("click", d)
		}), b.showList = function(c) {
			return c.stopPropagation(), g.hasClass("visible") ? void d() : (a.$broadcast("iscroll.refresh." + b.scrollType), $(".eqc-drop-down-list").removeClass("visible"), g.addClass("visible"), f.click(d), void h.click(function(a) {
				a.stopPropagation()
			}))
		}, b.selectItem = function(a) {
			a.stopPropagation();
			var b = a.target,
				c = b.tagName.toLowerCase(),
				d = $(b);
			"li" == c ? e(d) : "div" == c && (d = d.closest("li"), e(d))
		}
	}
	return {
		restrict: "E",
		replace: !0,
		templateUrl: "/Public/eq/6.0/templates/select.tpl.html",
		scope: {
			list: "=",
			current: "=",
			scrollType: "@",
			fontFamily: "=",
			isBorder: "@",
			x: "@"
		},
		link: b
	}
}]).directive("eqxSelect", ["$compile", function(a) {
	var b = '<eqd-select list="list" class="select-contain" current="current"></eqd-select>';
	return {
		restrict: "E",
		scope: {
			model: "="
		},
		controller: "SimpleSelectController",
		compile: function(c, d) {
			var e = d["class"];
			return c.removeClass(e), function(c, d, f, g) {
				d.append(a(angular.element(b).addClass(e))(c))
			}
		}
	}
}]).directive("eqxSelectOption", ["$parse", "$interpolate", function(a, b) {
	return {
		restrict: "E",
		require: "^eqxSelect",
		compile: function(c, d) {
			var e, f;
			if(d.ngRepeat){
				e = a(d.value);
				f = b(c.html());
			}
			return function(a, b, c, d) {
				b.css("display", "none");
				var g;
				if (e) {
					var h = e(a);
					d.setObjectConfig(angular.isObject(h)), g = {
						name: f(a),
						value: h
					}
				} else g = {
					name: b.html(),
					value: a.$parent.$eval(c.value)
				};
				d.addSelectChoice(g), b.on("$destroy", function() {
					d.removeSelectChoice(g)
				})
			}
		}
	}
}]);