!function() {
	function a(a, b, c, d) {
		function e(c, e, f, g) {
			var h = $(document);
			c.$on("$destroy", function() {
				h.unbind("keydown")
			});
			var i, j = {
				deltaX: 0,
				deltaY: 0
			};
			h.unbind("keydown").keydown(function(e) {
				if (8 == e.keyCode || 46 == e.keyCode) {
					if ($(".modal-dialog").length || $("#pageList").find("input").is(":focus")) return;
					d.getElements().length && (e.preventDefault(), a.$broadcast("element.delete"))
				}
				if ((37 == e.keyCode || 38 == e.keyCode || 39 == e.keyCode || 40 == e.keyCode) && (d.getElements().length && e.preventDefault(), i || (i = !0, g.compDragStart(j)), 37 == e.keyCode && (j.deltaX -= 1, g.compDragMove(j)), 38 == e.keyCode && (j.deltaY -= 1, g.compDragMove(j)), 39 == e.keyCode && (j.deltaX += 1, g.compDragMove(j)), 40 == e.keyCode && (j.deltaY += 1, g.compDragMove(j))), (e.ctrlKey || e.metaKey) && 65 == e.keyCode) {
					if ($(".modal-dialog").length) return;
					if (e.preventDefault(), i) return;
					i = !0, a.$broadcast("element.selectall")
				}
				if ((e.ctrlKey || e.metaKey) && 90 == e.keyCode && b.historyBack(), (e.ctrlKey || e.metaKey) && 89 == e.keyCode && b.historyForward(), (e.ctrlKey || e.metaKey) && 67 == e.keyCode) {
					if ($(".modal-dialog").length) return;
					b.copyElement()
				}
				if ((e.ctrlKey || e.metaKey) && 86 == e.keyCode) {
					if ($(".modal-dialog").length) return;
					b.getCopy() && b.pasteElement()
				}
				c.$apply()
			}).unbind("keyup").keyup(function(a) {
				i = !1, (j.deltaX || j.deltaY) && g.compDragEnd(j), j.deltaX = 0, j.deltaY = 0, c.$apply()
			})
		}
		return {
			restrict: "A",
			link: e,
			require: "^multiCompDrag"
		}
	}
	angular.module("scene.edit.keymap", ["services.scene", "services.history", "services.select"]).directive("editKeymap", ["$rootScope", "sceneService", "historyService", "selectService", a])
}();