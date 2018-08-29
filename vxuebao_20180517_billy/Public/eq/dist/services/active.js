angular.module("services.active", []).factory("activeService", ["$rootScope", "$http", function(a, b) {
	var c = {};
	return c.getActiveList = function(a, c, d) {
		var e = PREFIX_S1_URL + "eqs/activity/scene";
		return a && (e += /\?/.test(e) ? "&" : "?", e += "promId=" + a), c && (e += /\?/.test(e) ? "&" : "?", e += "pageNo=" + c), d && (e += /\?/.test(e) ? "&" : "?", e += "pageSize=" + d), b({
			withCredentials: !0,
			method: "GET",
			url: e
		})
	}, c
}]);