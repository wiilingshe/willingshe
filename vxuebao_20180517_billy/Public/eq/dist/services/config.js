angular.module("services.config", []).factory("configService", ["$http", function(a) {
	var b = function() {
		var b = PREFIX_S2_URL + "index.php?c=ad&a=logo";
		return a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	},
	c = function() {
		var b = PREFIX_S2_URL + "index.php?c=ad&a=banner";
		return a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	},
	d = function() {
		var b = PREFIX_S2_URL + "index.php?c=ad&a=friendlinks";
		return a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	},
	e = function(b) {
		var c = PREFIX_S2_URL + "eqs/banners?pageCode=" + b;
		return a({
			withCredentials: !0,
			method: "GET",
			url: c
		})
	},
    f = function() {
        var b = PREFIX_S2_URL + "index.php?c=ad&a=product";
        return a({
            withCredentials: !0,
            method: "GET",
            url: b
        })
    };
	var getBanner70= function() {
		var url = JSON_URL + "?c=ad&a=getBanner70" ;
		return a({
			withCredentials: !0,
			method: "GET",
			url: url
		})
	},getMenu70= function() {
		var url = JSON_URL + "?c=ad&a=getMenu70" ;
		return a({
			withCredentials: !0,
			method: "GET",
				url: url
			})
		};
		
	return {
		getBanner70: getBanner70,getMenu70: getMenu70,
		getLogo: b,
		getBanners: c,
		getFriendLinks: d,
		getActivityBanner: e,
        getProduct: f
	}
}]);