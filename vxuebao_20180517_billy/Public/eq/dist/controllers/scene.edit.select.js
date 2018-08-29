angular.module("scene.edit.select", ["services.history", "services.scene"]).controller("selectCtrl", ["$scope", function(a) {
	a.pasteOpacity = .3, a.$on("select.more", function() {
		a.safeApply(function() {
			a.showSelectPanel = !0
		})
	}), a.$on("select.less", function() {
		a.safeApply(function() {
			a.showSelectPanel = !1
		})
	}), a.$on("copyState.update", function(b, c) {
		a.safeApply(function() {
			a.pasteOpacity = c ? 1 : .3
		})
	})
}]).directive("eqxAlignLeft", ["selectService", "sceneService", "historyService", "editAreaBorderCollisionDetector", "multiCompResize", function(a, b, c, d, e) {
	return {
		link: function(a, f) {
			f.click(function() {
				a.$apply(function() {
					e.initCollisionDetectorWithElements();
					var a = d.bigDetectionBoxPointA.x;
					angular.forEach(d.editArea.detectionBoxs, function(c) {
						var d = a - c.startPointA.x;
						d = d == Math.abs(d) ? Math.floor(d) : Math.ceil(d);
						var e = {
							top: c.startPosition.top,
							left: c.startPosition.left + d
						};
						c.element.css("left", e.left), b.updateCompPosition(c.element.attr("id"), e, !0)
					});
					var f = b.getSceneObj();
					c.addPageHistory(f.obj.id, f.obj.elements)
				})
			})
		}
	}
}]).directive("eqxAlignHorizontalCenter", ["selectService", "sceneService", "historyService", "editAreaBorderCollisionDetector", "multiCompResize", function(a, b, c, d, e) {
	return {
		link: function(a, f) {
			f.click(function() {
				a.$apply(function() {
					e.initCollisionDetectorWithElements();
					var a = d.bigDetectionBoxPointO.x;
					angular.forEach(d.editArea.detectionBoxs, function(c) {
						var d = a - c.startPointO.x;
						d = d == Math.abs(d) ? Math.floor(d) : Math.ceil(d);
						var e = {
							top: c.startPosition.top,
							left: c.startPosition.left + d
						};
						c.element.css("left", e.left), b.updateCompPosition(c.element.attr("id"), e, !0)
					});
					var f = b.getSceneObj();
					c.addPageHistory(f.obj.id, f.obj.elements)
				})
			})
		}
	}
}]).directive("eqxAlignRight", ["selectService", "sceneService", "historyService", "editAreaBorderCollisionDetector", "multiCompResize", function(a, b, c, d, e) {
	return {
		link: function(a, f) {
			f.click(function() {
				a.$apply(function() {
					e.initCollisionDetectorWithElements();
					var a = d.bigDetectionBoxPointB.x;
					angular.forEach(d.editArea.detectionBoxs, function(c) {
						var d = a - c.startPointB.x;
						d = d == Math.abs(d) ? Math.floor(d) : Math.ceil(d);
						var e = {
							top: c.startPosition.top,
							left: c.startPosition.left + d
						};
						c.element.css("left", e.left), b.updateCompPosition(c.element.attr("id"), e, !0)
					});
					var f = b.getSceneObj();
					c.addPageHistory(f.obj.id, f.obj.elements)
				})
			})
		}
	}
}]).directive("eqxAlignTop", ["selectService", "sceneService", "historyService", "editAreaBorderCollisionDetector", "multiCompResize", function(a, b, c, d, e) {
	return {
		link: function(a, f) {
			f.click(function() {
				a.$apply(function() {
					e.initCollisionDetectorWithElements();
					var a = d.bigDetectionBoxPointA.y;
					angular.forEach(d.editArea.detectionBoxs, function(c) {
						var d = a - c.startPointA.y;
						d = d == Math.abs(d) ? Math.floor(d) : Math.ceil(d);
						var e = {
							top: c.startPosition.top + d,
							left: c.startPosition.left
						};
						c.element.css("top", e.top), b.updateCompPosition(c.element.attr("id"), e, !0)
					});
					var f = b.getSceneObj();
					c.addPageHistory(f.obj.id, f.obj.elements)
				})
			})
		}
	}
}]).directive("eqxAlignVerticalCenter", ["selectService", "sceneService", "historyService", "editAreaBorderCollisionDetector", "multiCompResize", function(a, b, c, d, e) {
	return {
		link: function(a, f) {
			f.click(function() {
				a.$apply(function() {
					e.initCollisionDetectorWithElements();
					var a = d.bigDetectionBoxPointO.y;
					angular.forEach(d.editArea.detectionBoxs, function(c) {
						var d = a - c.startPointO.y;
						d = d == Math.abs(d) ? Math.floor(d) : Math.ceil(d);
						var e = {
							top: c.startPosition.top + d,
							left: c.startPosition.left
						};
						c.element.css("top", e.top), b.updateCompPosition(c.element.attr("id"), e, !0)
					});
					var f = b.getSceneObj();
					c.addPageHistory(f.obj.id, f.obj.elements)
				})
			})
		}
	}
}]).directive("eqxAlignBottom", ["selectService", "sceneService", "historyService", "editAreaBorderCollisionDetector", "multiCompResize", function(a, b, c, d, e) {
	return {
		link: function(a, f) {
			f.click(function() {
				a.$apply(function() {
					e.initCollisionDetectorWithElements();
					var a = d.bigDetectionBoxPointB.y;
					angular.forEach(d.editArea.detectionBoxs, function(c) {
						var d = a - c.startPointB.y;
						d = d == Math.abs(d) ? Math.floor(d) : Math.ceil(d);
						var e = {
							top: c.startPosition.top + d,
							left: c.startPosition.left
						};
						c.element.css("top", e.top), b.updateCompPosition(c.element.attr("id"), e, !0)
					});
					var f = b.getSceneObj();
					c.addPageHistory(f.obj.id, f.obj.elements)
				})
			})
		}
	}
}]).directive("eqxVerticalAverage", ["selectService", "sceneService", "historyService", "editAreaBorderCollisionDetector", "multiCompResize", function(a, b, c, d, e) {
	return function(f, g) {
		g.click(function() {
			var g = a.getElements(),
				h = g.length;
			2 > h || f.$apply(function() {
				e.initCollisionDetectorWithElements();
				var a = d.editArea.detectionBoxs;
				a.sort(function(a, b) {
					return a.startPointO.y > b.startPointO.y
				});
				var f = a[0].startPointO.y,
					g = a[h - 1].startPointO.y,
					i = (g - f) / (h - 1);
				angular.forEach(a, function(a, c) {
					if (0 !== c && c != h) {
						var d = f + c * i - a.startPointO.y;
						d = d == Math.abs(d) ? Math.floor(d) : Math.ceil(d);
						var e = {
							top: a.startPosition.top + d,
							left: a.startPosition.left
						};
						a.element.css("top", e.top), b.updateCompPosition(a.element.attr("id"), e, !0)
					}
				});
				var j = b.getSceneObj();
				c.addPageHistory(j.obj.id, j.obj.elements)
			})
		})
	}
}]).directive("eqxHorizontalAverage", ["selectService", "sceneService", "historyService", "editAreaBorderCollisionDetector", "multiCompResize", function(a, b, c, d, e) {
	return function(f, g) {
		g.click(function() {
			var g = a.getElements(),
				h = g.length;
			2 > h || f.$apply(function() {
				e.initCollisionDetectorWithElements();
				var a = d.editArea.detectionBoxs;
				a.sort(function(a, b) {
					return a.startPointO.x > b.startPointO.x
				});
				var f = a[0].startPointO.x,
					g = a[h - 1].startPointO.x,
					i = (g - f) / (h - 1);
				angular.forEach(a, function(a, c) {
					if (0 !== c && c != h) {
						var d = f + c * i - a.startPointO.x;
						d = d == Math.abs(d) ? Math.floor(d) : Math.ceil(d);
						var e = {
							top: a.startPosition.top,
							left: a.startPosition.left + d
						};
						a.element.css("left", e.left), b.updateCompPosition(a.element.attr("id"), e, !0)
					}
				});
				var j = b.getSceneObj();
				c.addPageHistory(j.obj.id, j.obj.elements)
			})
		})
	}
}]).directive("eqxCopy", ["selectService", "sceneService", function(a, b) {
	return {
		link: function(a, c) {
			var d = $(c);
			d.click(function() {
				b.copyElement()
			})
		}
	}
}]).directive("eqxPaste", ["sceneService", "historyService", function(a, b) {
	return {
		link: function(c, d) {
			var e = $(d);
			e.click(function() {
				if (a.getCopy()) {
					a.pasteElement();
					var d = a.getSceneObj();
					b.addPageHistory(d.obj.id, d.obj.elements), c.$apply()
				}
			})
		}
	}
}]).directive("eqxDeleteMore", ["$rootScope", function(a) {
	return {
		link: function(b, c) {
			var d = $(c);
			d.click(function() {
				a.$broadcast("element.delete")
			})
		}
	}
}])