angular.module("scene.create.console.sound").filter("maxLength", function() {
	return function(a, b) {
		return a ? a.length <= b ? a : a.substr(0, b) + "…" : void 0
	}
});