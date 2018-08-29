//TODO 去除了$translate依赖
angular.module("security.interceptor", ["security.retryQueue"]).factory("securityInterceptor", ["$injector", "$location", "securityRetryQueue", /*"$translate",*/ function(a, b, c) {
	return function(d) {
		return d.then(null, function(e) {
			return 401 === e.status && (d = c.pushRetryFn("unauthorized-server", function() {
				return a.get("$http")(e.config)
			})), 403 === e.status && (alert("对不起，您没有查看此内容的权限"), b.path("/home")), d
		})
	}
}]).config(["$httpProvider", function(a) {
	a.responseInterceptors.push("securityInterceptor");
	var b = [PREFIX_URL + "login", PREFIX_URL + "index.php?c=scene&a=createpage&id=", PREFIX_URL + "m/scene/pageList", PREFIX_URL + "index.php?c=upfile&a=upload", PREFIX_URL + "m/c/group/create", PREFIX_URL + "index.php?c=scene&a=my", PREFIX_URL + "index.php?c=scene&a=syslist", PREFIX_URL + "index.php?c=scene&a=saveSettings", PREFIX_URL + "m/scene/stat"];
	a.interceptors.push(["$q", function(a) {
		var c = 0;
		return {
			request: function(d) {
				var e = d.url;
				for (i = 0; i < b.length; i++) 0 === e.indexOf(b[i]) && ($("#loading").show(), c++);
				return d || a.when(d)
			},
			response: function(d) {
				var e = d.config.url;
				for (i = 0; i < b.length; i++) 0 === e.indexOf(b[i]) && (c--, c || $("#loading").hide());
				return d || a.when(d)
			}
		}
	}])
}]);