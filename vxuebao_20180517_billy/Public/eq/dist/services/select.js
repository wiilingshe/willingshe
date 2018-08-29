angular.module("services.select", []).factory("selectService", ["$rootScope", function(a) {
	var b = {},
		c = [];
	return b.addElement = function(b) {
		b += "", c.indexOf(b) >= 0 || (c.push(b), c.length > 1 && a.$broadcast("select.more"))
	}, b.deleteElement = function(b) {
		a.$broadcast("select.less.id", b);
		var d = c.indexOf(b + "");
		0 > d || (c.splice(d, 1), 0 === c.length && a.$broadcast("close.style.panel"), c.length <= 1 && a.$broadcast("select.less"))
	}, b.clearElements = function() {
		a.$broadcast("select.less", c), c = []
	}, b.getElements = function() {
		return c
	}, b
}]);