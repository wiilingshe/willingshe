angular.module("app.directives.loading", []).directive("loginLoading", function() {
	return {
		restrict: "EA",
		link: function(a, b, c) {
			a.$on("loginLoading", function(a, c) {
				var d = $('<div class="homeMask" style="position: absolute;width: 100%;top:0;bottom:0;background-color:#ccc;opacity:0.8;">正在跳转，请稍后...</div>');
				d.appendTo($(b))
			})
		}
	}
});