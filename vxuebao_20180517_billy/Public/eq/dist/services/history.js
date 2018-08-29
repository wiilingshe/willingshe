angular.module("services.history", []).factory("historyService", ["$rootScope", function(a) {
	var b = {},
		c = {},
		d = {};
	return b.addPage = function(d, e) {
		return c[d] || (c[d] = {
			currentPos: 0,
			inHistory: !1,
			pageHistory: []
		}, b.addPageHistory(d, e)), a.$broadcast("history.changed"), JSON.parse(c[d].pageHistory[c[d].currentPos])
	}, b.addPageHistory = function(b, e) {
		d = c[b], d.inHistory && (d.inHistory = !1, d.pageHistory.length = d.currentPos + 1);
		var f = JSON.stringify(e);
		f != d.pageHistory[d.pageHistory.length - 1] && d.pageHistory.push(f), d.currentPos = d.pageHistory.length - 1, a.$broadcast("history.changed")
	}, b.clearHistory = function() {
		c = {}
	}, b.canBack = function(a) {
		return d = c[a], d.currentPos > 0
	}, b.canForward = function(a) {
		return d = c[a], d.currentPos < d.pageHistory.length - 1
	}, b.back = function(b) {
		if (d = c[b], d.pageHistory.length) {
			d.inHistory = !0;
			var e = 0 === d.currentPos ? d.pageHistory[0] : d.pageHistory[--d.currentPos];
			return a.$broadcast("history.changed"), JSON.parse(e)
		}
	}, b.forward = function(b) {
		if (d = c[b], d.pageHistory.length) {
			d.inHistory = !0;
			var e = d.currentPos == d.pageHistory.length - 1 ? d.pageHistory[d.currentPos] : d.pageHistory[++d.currentPos];
			return a.$broadcast("history.changed"), JSON.parse(e)
		}
	}, b
}]);