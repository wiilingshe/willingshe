angular.module("app.directives.notification", []).directive("notificationFadeout", ["i18nNotifications", function(a) {
	return {
		restrict: "EA",
		link: function(b, c, d) {
			var e = $(c);
			e.fadeOut(4e3, function() {
				a.remove(b.notification)
			})
		}
	}
}]);