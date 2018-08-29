angular.module("app.directives.numChangeAnim", []).directive("numChangeAnim", ["$filter", function(a) {
		return {
			restrict: "A",
			scope: {
				content: "@"
			},
			link: function(b, c, d) {
				function e(a, b) {
					return Math.floor(a + Math.random() * (b - a))
				}
				function f(a, b) {
					a = a > 0 ? a : 1;
					for (var c = Math.floor(Math.log10(a)), d = Math.floor(a / Math.pow(10, c)), f = 0, g = 10, h = function(h) {
							setTimeout(function() {
								if (10 > g) f = h;
								else {
									var i = c > h ? h : c,
										j = Math.pow(10, i) * d;
									j = j.toString().length == a.toString().length ? a : j, f = e(f, j)
								}
								b(f, 9 == h)
							}, (h * h + h + 2) / 2 * 30)
						}, i = 0; g > i; i++) h(i)
				}
				function g(b, c) {
					$(b).children("span").text(a("number")(c))
				}
				b.$watch("content", function(a) {
					if (a) {
						var b = parseInt(a, 10);
						f(b, function(a, d) {
							g(c, a), d && (g(c, b), $(c).addClass("heartbeat").css({
								"animation-duration": "1s"
							}))
						})
					}
				})
			}
		}
	}]);