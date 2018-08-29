angular.module("services.spread", ["services.scene"]), angular.module("services.spread").factory("SpreadService", ["$http", "sceneService", "$rootScope", function(a, b, c) {
		var d = {},
			e = function(a) {
				var b = new Date;
				return b.setDate(b.getDate() + a), b.setHours(0), b.setMinutes(0), b.setSeconds(0), b.setMilliseconds(0), b.getTime()
			};
		d.getDataBySceneId = function(b, c, d, e, f, g, h) {
			var i = "index.php?c=Stat&id=" + b;
			g && (i += (/\?/.test(i) ? "&" : "?") + "user=" + g), h && (i += (/\?/.test(i) ? "&" : "?") + "extId=" + h), c && (i += "&startDate=" + c), d && (i += "&endDate=" + d), e && (i += "&pageSize=" + e), f && (i += "&pageNo=" + f);
			var j = new Date;
			return i += "&time=" + j.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + i
			})
		}, /*d.getDevice = function(b, c, d) {
			var e = "m/scene/pv/device?id=" + b;
			c && (e += "&startDate=" + c), d && (e += "&endDate=" + d);
			var f = new Date;
			return e += "&time=" + f.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + e
			})
		}, d.getDevicePv = function(a, b, f) {
			var g = e(b),
				h = e(f);
			d.getDevice(a, g, h).then(function(b) {
				c.$broadcast("scene.device", b.data.obj, a, g, h)
			}, function() {})
		}, */d.getActivities = function() {
			var b = new Date;
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + "m/u/promotion/list?type=pc&time=" + b.getTime()
			})
		}, d.getActivityDetail = function(b) {
			var c = new Date;
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + "m/u/promotion?code=" + b + "&time=" + c.getTime()
			})
		}, d.updateName = function(b) {
			var c = PREFIX_URL + "m/scene/expand/save";
			return a({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(b)
			})
		};
		c.branchid;
		return d.getSceneDetail = function(a, d) {
			b.getSceneDetail(a, d).then(function(a) {
				c.$broadcast("scene.detail", a.data.obj, d)
			}, function() {})
		}, d.getSceneData = function(a, b, f, g, h) {
			var i = e(b),
				j = e(f),
				k = f - b;
			d.getDataBySceneId(a, i, j, k, 0, g, h).then(function(b) {
				c.$broadcast("scene.data", b.data.list, a, i, j, g)
			}, function() {})
		}, d.expandWebs = [], d.getWebList = function(b, e, f) {//有问题
			var g = "m/scene/expand/list";
			b && (g += (/\?/.test(g) ? "&" : "?") + "id=" + b), f && (g += (/\?/.test(g) ? "&" : "?") + "user=" + f), g += (/\?/.test(g) ? "&" : "?") + "showPv=" + e, g += (/\?/.test(g) ? "&" : "?") + "time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + g
			}).then(function(a) {
				a.data.success && (d.expandWebs = a.data.list, c.$broadcast("webs.update"))
			}, function(a) {})
		}, d.deleteWeb = function(b) {
			var e = PREFIX_URL + "m/scene/expand/delete";
			a({
				withCredentials: !0,
				method: "POST",
				url: e,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(b)
			}).then(function(a) {
				a.data.success && (d.expandWebs.splice(b.index, 1), c.$broadcast("webs.update"))
			}, function(a) {})
		}, d.queryRegion = function(b, d) {//有问题
			var e = PREFIX_URL + "m/scene/pv/region?id=" + b + "&startDate=" + d,
				f = {
					id: b,
					startDate: d
				};
			a({
				withCredentials: !0,
				method: "GET",
				url: e,
				data: $.param(f)
			}).then(function(a) {
				a.data.success && c.$broadcast("region.update", a.data.obj)
			})
		}, d.getShareWayList = function(b) {
			var d = PREFIX_URL + "m/scene/social/share/status?id=" + b;
			a({
				withCredentials: !0,
				method: "GET",
				url: d
			}).then(function(a) {
				a.data.success && c.$broadcast("shareway.update", a.data.list)
			})
		}, d.activeShareWay = function(b, d) {
			var e = PREFIX_URL + "m/scene/share?sceneId=" + b + "&type=" + d;
			a({
				withCredentials: !0,
				method: "POST",
				url: e,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			}).then(function(a) {
				a.data.success && c.$broadcast("active.shareway", d)
			})
		}, d.applyShareWay = function(b, d, e) {
			var f = PREFIX_URL + "m/scene/share/setting/save";
			b && (f += (/\?/.test(f) ? "&" : "?") + "id=" + b), d && (f += (/\?/.test(f) ? "&" : "?") + "type=" + d), e && (f += (/\?/.test(f) ? "&" : "?") + "value=" + e), a({
				withCredentials: !0,
				method: "POST",
				url: f,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			}).then(function(a) {
				a.data.success && c.$broadcast("apply.scene.share", a.data)
			})
		}, d
	}]);