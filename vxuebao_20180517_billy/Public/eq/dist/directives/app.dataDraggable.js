angular.module("app.directives.dataDraggable", []).directive("itemDraggable", function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				$(b).draggable({
					zIndex: 2700,
					scroll: !1,
					iframeFix: !1,
					revert: !1,
					helper: "clone"
				})
			}
		}
	}).directive("itemDroppable", function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				$(b).droppable({
					hoverClass: "active",
					out: function(a, b) {},
					drop: function(b, c) {
						delete a.$parent.associateData[c.draggable.parent().attr("item-id")], a.$parent.associateData[$(b.target).attr("item-id")] = c.draggable.attr("item-id");
						var d = $(b.target).find(".list_darggable");
						d.length > 0 && $(".item-remove-droppable").append(d), c.draggable.css({
							left: 0,
							top: 0
						}).prependTo(this)
					}
				})
			}
		}
	}).directive("itemRemoveDroppable", function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				$(b).droppable({
					hoverClass: "active",
					drop: function(b, c) {
						$(c.draggable).parents(".list-attribute").length > 0 && delete a.associateData[$(c.draggable).parents(".list-attribute").attr("item-id")], c.draggable.css({
							left: 0,
							top: 0
						}).appendTo(this)
					}
				})
			}
		}
	});