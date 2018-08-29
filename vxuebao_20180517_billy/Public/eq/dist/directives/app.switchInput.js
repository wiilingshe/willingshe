 angular.module("app.directives.switchInput", []).directive("switchInput", function() {
		function a(a, b, c) {
			b.hover(function(c) {
				a.obj.showinput = !0;
				var d = b.find("input");
				setTimeout(function() {
					d.focus(), d.select()
				}, 0), a.$apply()
			}, function(b) {
				a.obj.showinput = !1, a.$apply()
			})
		}
		return {
			restrict: "EA",
			scope: {
				obj: "="
			},
			link: a
		}
	});