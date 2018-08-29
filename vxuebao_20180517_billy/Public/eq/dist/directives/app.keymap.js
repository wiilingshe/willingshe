angular.module("app.directives.keymap", ["services.scene", "services.history", "services.select"]).directive("eqxKeymap", ["sceneService", "historyService", "selectService", function(a, b, c) {
	return {
		restrict: "A",
		link: function(b) {
			var c = $(document);
			b.$on("$destroy", function() {
				c.unbind("keydown")
			}), c.unbind("keydown").keydown(function(c) {
				if ((c.ctrlKey || c.metaKey) && 90 == c.keyCode && a.historyBack(), (c.ctrlKey || c.metaKey) && 89 == c.keyCode && a.historyForward(), (c.ctrlKey || c.metaKey) && 86 == c.keyCode) {
					if ($("#btn-toolbar").length || $(".modal-dialog").length) return;
					a.getCopy() && a.pasteElement()
				}
				if ((c.ctrlKey || c.metaKey) && 67 == c.keyCode) {
					if ($("#btn-toolbar").length || $(".modal-dialog").length) return;
					a.copyElement()
				}
				b.$apply()
			})
		}
	}
}]);