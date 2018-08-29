angular.module("scene.create.console.radio.checkbox", []), angular.module("scene.create.console.radio.checkbox").directive("stopPropagation", function() {
	return function(a, b) {
		b.bind("keydown", function(a) {
			a.stopPropagation()
		})
	}
});