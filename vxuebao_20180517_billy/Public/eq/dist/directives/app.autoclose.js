angular.module("app.directives.autoclose", []).directive("autoClose", ["$compile", function(a) {
	return {
		restrict: "EA",
		link: function(a, b, c) {
			$(document).click(function(b) {
				b.target.className;
				return $(event.target).closest(".drop-area").length ? !1 : (a.showObj = {
					showGroup: !1
				}, void a.$apply())
			})
		}
	}
}]);