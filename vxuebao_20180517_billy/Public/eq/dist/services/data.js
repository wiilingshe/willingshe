angular.module("services.data", []), angular.module("services.data").factory("dataService", ["$http", "$rootScope", function(a, b) {
	var c = {};
	b.branchid;
	return c.getDatas = function(c) {
		var d = "index.php?c=scenedata&a=statSum";
		return c && (d += (/\?/.test(d) ? "&" : "?") + "user=" + c), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + d
		}).then(function(a) {
			if (a.data.success) {
				var c = a.data.obj;
				b.$broadcast("sceneDatas", c)
			}
		})
	}, c.getCustomDatas = function(c) {
		var d = "index.php?c=custom&a=statSum";
		return c && (d += (/\?/.test(d) ? "&" : "?") + "user=" + c), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + d
		}).then(function(a) {
			if (a.data.success) {
				var c = a.data.obj;
				b.$broadcast("customDatas", c)
			}
		})
	}, c.getDataBySceneId = function(b, c, d, e) {
		c = c || 1, d = d || 10;
		var f = "index.php?c=scenedata&a=getdata&id=" + b + "&pageNo=" + c + "&pageSize=" + d;
		e && (f += (/\?/.test(f) ? "&" : "?") + "user=" + e);
		var g = new Date;
		return f += "&time=" + g.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + f
		})
	}, c.deleteDataBySceneId = function(b, c) {
		var d = "index.php?c=scenedata&a=delete&sceneId=" + b + "&dataIds=" + c.ids;
		return a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + d,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			}
		})
	}, c.getDataDetail = function(b, c) {
		var d = "m/c/detail/" + b;
		c && (d += (/\?/.test(d) ? "&" : "?") + "user=" + c);
		var e = new Date;
		return d += (/\?/.test(d) ? "&" : "?") + "date=" + e.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + d
		})
	}, c.getDataMessage = function(b) {
		var c = "index.php?c=custom&a=newDataScene";
		b && (c += (/\?/.test(c) ? "&" : "&") + "user=" + b);
		var d = new Date;
		return c += (/\?/.test(c) ? "&" : "&") + "date=" + d.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}, c.getAllData = function(b, c, d, e) {
		var f = "index.php?c=custom&a=getAllData&pageSize=10&pageNo=" + b;
		c && (f += (/\?/.test(f) ? "&" : "?") + "user=" + c), e && (f += (/\?/.test(f) ? "&" : "?") + "origin=" + e), d && (f += (/\?/.test(f) ? "&" : "?") + "groupId=" + d);
		var g = new Date;
		return f += (/\?/.test(f) ? "&" : "?") + "time=" + g.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + f
		})
	}, c.getProspectDataAccount = function(b) {
		var c = "m/c/prospectCount?time=" + (new Date).getTime();
		return b && (c += (/\?/.test(c) ? "&" : "?") + "user=" + b), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}, c.deleteDataById = function(b) {
		var c = "index.php?c=custom&a=delete&id=" + b;
		return a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}, c.saveData = function(b, c) {
		var d = c ? "m/c/create" : "m/c/save";
		return a({
			withCredentials: !0,
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			url: PREFIX_URL + d,
			data: b
		})
	}, c.getSceneField = function(b) {
		var c = "index.php?c=custom&a=formField&id=" + b,
			d = new Date;
		return c += "?time=" + d.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}, c.getPremergeScenes = function(b) {
		var c = "index.php?c=custom&a=newDataScene";
		b && (c += (/\?/.test(c) ? "&" : "?") + "user=" + b);
		var d = new Date;
		return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}, c.mergeSceneData = function(b, c) {
		var d = "index.php?c=custom&a=imps&id=" + b;
		return a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_S3_URL + d,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(c)
		})
	}, c.getOrigin = function(b) {
		var c = "index.php?c=custom&a=origin";
		return b && (c += (/\?/.test(c) ? "&" : "?") + "user=" + b), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}, c.getGroups = function(b) {
		var c = "index.php?c=custom&a=grouplist";
		return b && (c += (/\?/.test(c) ? "&" : "?") + "user=" + b), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + c
		})
	}, c.assignGroup = function(b) {
		var c = "m/c/group/set?cIds=" + b.cIds + "&gIds=" + b.gIds;
		return a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + c,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			}
		})
	}, c.deleteAssociation = function(b) {
		var c = "m/c/group/unset?cId=" + b.cId + "&gId=" + b.gId;
		return a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + c,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			}
		})
	}, c.createGroup = function(b) {
		var c = "m/c/group/create";
		return a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + c,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(b)
		})
	}, c.deleteCustomer = function(b) {
		var c = "index.php?c=custom&a=delete&ids=" + b.ids;
		return a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + c,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			}
		})
	}, c.deleteGroup = function(b) {
		var c = {
			id: b
		},
			d = "m/c/group/delete";
		return a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + d,
			data: $.param(c),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			}
		})
	}, c
}]);