angular.module("services.activity", []).factory("activityService", ["$rootScope", "$http", function(a, b) {
	var c = {};
	return c.getActiveList = function(c, d, e, f) {
		var g = PREFIX_S2_URL + "index.php?c=eqs&a=activity_info";
		return c && (g += /\?/.test(g) ? "&" : "?", g += "joinNum=" + c), d && (g += /\?/.test(g) ? "&" : "?", g += "recommend=" + d), e && (g += /\?/.test(g) ? "&" : "?", g += "pageNo=" + e), f && (g += /\?/.test(g) ? "&" : "?", g += "pageSize=" + f), b({
			withCredentials: !0,
			method: "GET",
			url: g
		}).then(function(b) {
			if (b.data.success) {
				var c = b;
				a.$broadcast("activeList", c)
			}
		})
	}, c.activitySceneList = function(a, c, d, e) {
		var f = PREFIX_S2_URL + "/eqs/activity/scene?promId=" + a;
		return c && (f += /\?/.test(f) ? "&" : "?", f += "recommend=" + c), d && (f += /\?/.test(f) ? "&" : "?", f += "pageNo=" + d), e && (f += /\?/.test(f) ? "&" : "?", f += "pageSize=" + e), b({
			withCredentials: !0,
			method: "GET",
			url: f
		})
	}, c.activityMes = function(c) {
		var d = PREFIX_S2_URL + "/eqs/activity/info?id=" + c;
		return b({
			withCredentials: !0,
			method: "GET",
			url: d
		}).then(function(b) {
			if (b.data.success) {
				var c = b;
				a.$broadcast("activeMes", c)
			}
		})
	}, c
}]);