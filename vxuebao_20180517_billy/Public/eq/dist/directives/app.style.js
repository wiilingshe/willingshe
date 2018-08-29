angular.module("app.directives.style", []).directive("panelDraggable", function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				a.$on("$destroy", function() {
					$(b).draggable(), $(b).draggable("destroy"), b = null
				}), b.on("$destroy", function() {
					$(b).draggable(), $(b).draggable("destroy"), b = null
				}), $(b).draggable(), $(window).bind("resize", function() {
					$(b).css({
						left: $(document).width() - 444,
						top: 50
					})
				})
			}
		}
	});