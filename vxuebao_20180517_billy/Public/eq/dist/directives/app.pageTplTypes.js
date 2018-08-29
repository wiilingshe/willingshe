angular.module("app.directives.pageTplTypes", []).directive("pageTplTypes", ["pageTplService", function(a) {
	return {
		restrict: "EA",
		replace: !0,
		templateUrl: "directives/page-tpl-types.tpl.html",
		link: function(b, c, d) {
			a.getPageTplTypes().then(function(a) {
				a.data.list && a.data.list.length > 0 ? b.pageTplTypes = a.data.list : b.pageTplTypes = []
			})
		}
	}
}]);