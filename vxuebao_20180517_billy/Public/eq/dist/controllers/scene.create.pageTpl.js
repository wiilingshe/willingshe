angular.module("scene.create.pageTpl", []), angular.module("scene.create.pageTpl").controller("PageTplController", ["$scope", "pageTplService", function(a, b) {
    a.$watch("tpl", function(b) {
		if (a.tplElements = [], b && b.obj && b.obj.elements) {
			var c = angular.copy(b.obj.elements);
			$.each(c, function(b, c) {
				"4" == c.type && (c.isEditable || (c.isEditable = 1), a.tplElements.push(c))
			})
		}
	}, !0), a.pageChildLabel = function() {
		var c, d = [];
		for (c = 0; c < a.pageLabelAll.length; c++) a.pageLabelAll[c].ischecked && d.push(a.pageLabelAll[c].id);
		a.tpl.obj.elements && $.each(a.tplElements, function(b, c) {
			$.each(a.tpl.obj.elements, function(a, b) {
				c.id == b.id && (-1 == c.isEditable ? b.isEditable = -1 : delete b.isEditable)
			})
		}), b.updataChildLabel(d, a.pageIdTag).then(function() {
			alert("分配成功！"), a.controlView.pageList = !1
		}, function() {})
	}
}]);