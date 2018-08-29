angular.module("services.visitor", []).factory("visitorService", ["$rootScope", "$http", function(a, b) {
	var c = {};
	return c.getRecommendVisitor = function() {
		var a = "showker/recommend";
		return b({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_S2_URL + a
		})
	}, c.getVisitorMsg = function(a) {
		var c = "showker/detail?userId=" + a;
		return b({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_S2_URL + c
		})
	}, c.getVisitorList = function(a, c, d, e, f) {
		var g = "showker/list";
		return a && (g += /\?/.test(g) ? "&" : "?", g += "addr=" + a), c && (g += /\?/.test(g) ? "&" : "?", g += "pay=" + c), d && (g += /\?/.test(g) ? "&" : "?", g += "good=" + d), e && (g += /\?/.test(g) ? "&" : "?", g += "pageNo=" + e), f && (g += /\?/.test(g) ? "&" : "?", g += "pageSize=" + f), b({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_S2_URL + g
		})
	}, c.getVisitorMesList = function(a, c, d) {
		var e = "showker/represent?userId=" + a;
		return c && (e += /\?/.test(e) ? "&" : "?", e += "pageNo=" + c), d && (e += /\?/.test(e) ? "&" : "?", e += "pageSize=" + d), b({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_S2_URL + e
		})
	}, c
}]);