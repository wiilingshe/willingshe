angular.module("scene.pageeffect.filter", []).filter("scratchNumber", function() {
	return function(a, b, c) {
		return (100 * a).toFixed(b) + c;
	}
});