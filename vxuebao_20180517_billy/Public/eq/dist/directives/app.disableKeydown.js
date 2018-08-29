angular.module("app.directives.disableKeydown", []).directive("disableEdit", function() {
		function a(a, b, c) {
			var d = {
				37: "arrow-left",
				38: "arrow-up",
				39: "arrow-right",
				40: "arrow-down",
				9: "tab",
				27: "esc"
			};
			b.keydown(function(a) {
				d[a.which] || a.preventDefault()
			})
		}
		return {
			restrice: "EA",
			link: a
		}
	}); 