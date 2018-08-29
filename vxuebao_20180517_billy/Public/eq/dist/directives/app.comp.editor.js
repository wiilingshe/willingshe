angular.module("app.directives.comp.editor", []).directive("mapEditor", function() {
	return {
		restrict: "AE",
		templateUrl: "directives/mapeditor.tpl.html",
		link: function(a, b, c) {
			var d = new BMap.Map("l-map");
			d.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
			var e = {
				onSearchComplete: function(a) {
					if (f.getStatus() == BMAP_STATUS_SUCCESS) {
						for (var b = [], c = 0; c < a.getCurrentNumPois(); c++) b.push(a.getPoi(c).title + ", " + a.getPoi(c).address);
						document.getElementById("r-result").innerHTML = b.join("<br/>")
					}
				}
			},
				f = new BMap.LocalSearch(d, e);
			a.searchAddress = function() {
				f.search(a.address)
			}
		}
	}
});