angular.module("services.show", []).factory("showService", ["$rootScope", "$http", function(a, b) {
	var c = {};
	return c.getPageTagLabel = function(a) {
		var c = "index.php?c=upfile&a=systag&type=2";
		null != a && (c += (/\?/.test(c) ? "&" : "?") + "bizType=" + a);
		var d = new Date;
		return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), b({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_S2_URL + c
		})
	}, c.getSceneList = function(c, d, e, f, g) {
		var h = PREFIX_S2_URL + "index.php?c=eqs&a=promotion";
		return c && (h += /\?/.test(h) ? "&" : "?", h += "template=" + c), d && (h += /\?/.test(h) ? "&" : "?", h += "recommend=" + d), e && (h += /\?/.test(h) ? "&" : "?", h += "tagId=" + e), f && (h += /\?/.test(h) ? "&" : "?", h += "pageNo=" + f), g && (h += /\?/.test(h) ? "&" : "?", h += "pageSize=" + g), b({
			withCredentials: !0,
			method: "GET",
			url: h
		}).then(function(b) {
			if (b.data.success) {
				var c = b.data;
				a.$broadcast("sceneList", c)
			}
		})
	}, c.search = function(c) {
		var d = "index.php?c=eqs&a=search";
		return b({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_S2_URL + d,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(c)
		}).then(function(b) {
			if (b.data.success) {
				var c = b.data;
				a.$broadcast("searchList", c)
			}
		})
	}, c
}]);