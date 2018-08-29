angular.module("common.directives.dropDown", []).controller("SimpleSelectController", ["$scope", "$element", "$attrs", "$parse", "$timeout", function(a, b, c, d, e) {
	var f = this;
            a.list = [], a.current = null, f.addSelectChoice = function (b) {
	if (b.name && b.name === "用途" && !b.value) {
                b.name = window.localStorage.mytpl1
            }
            if (b.name && b.name === "功能" && !b.value) {
                b.name = window.localStorage.mytpl2
            }
            if (b.name && b.name === "风格" && !b.value) {
                b.name = window.localStorage.mytpl3
            }
	a.list.push(b)
	}, f.removeSelectChoice = function(b) {
		var c = a.list.indexOf(b); - 1 !== c && a.list.splice(c, 1)
	};
	var g;
	f.setObjectConfig = function(a) {
		g === undefined && (g = a)
	}, a.setDefaultSelectedValue = function() {
		angular.forEach(a.list, function(b) {
			b.value == a.model && (a.current = b)
		})
	};
	var h = a.$watchCollection("list", function() {
		a.setDefaultSelectedValue()
	}),
		i = a.$watch("current", function(b) {
			b && a.model != b.value && (a.model = b.value, e(function() {
				c.change && a.$parent.$eval(c.change)
			}, 100))
		}),
		j = a.$watch("model", function(b) {
			b && a.setDefaultSelectedValue()
		});
	a.$on("$destroy", function() {
		h(), i(), j()
	}), a.$watch("model", function(b, c) {
		b != c && angular.forEach(a.list, function(b) {
			b.value == a.model && (a.current = b)
		})
	})
}]);