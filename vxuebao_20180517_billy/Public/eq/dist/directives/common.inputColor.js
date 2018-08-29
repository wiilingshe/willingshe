 angular.module("common.directives.inputColor", []).controller("inputColorCtrl", ["$scope", "$attrs", function(a, b) {
	a.x = b.x || 151, a.y = b.y || -2, a.colorMode = b.colorMode || "rgba"
}]).directive("eqdInputColor", function() {
	return {
		restrict: "E",
		templateUrl: BASE_URL + "templates/directives.inputColor.tpl.html",
		replace: !0,
		controller: "inputColorCtrl",
		scope: {
			selectColor: "=",
			defaultColor: "="
		}
	}
});