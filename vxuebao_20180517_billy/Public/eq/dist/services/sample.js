angular.module("services.sample", []).factory("sampleService", ["$rootScope", "$http", function(a, b) {
	var c = {};
	return c.getSamples = function(a, c, d) {
		var e = PREFIX_S2_URL + "index.php?c=scene&a=promotion&recommend=2";
		return a && (e += "&type=" + a), c && (e += /\?/.test(e) ? "&" : "?", e += "pageNo=" + c), d && (e += /\?/.test(e) ? "&" : "?", e += "pageSize=" + d), b({
			withCredentials: !0,
			method: "GET",
			url: e
		})
	}, c.getSamplesPV = function() {
		var a = PREFIX_S1_URL + "eqs/topThree?time=" + (new Date).getTime();
		return b({
			withCredentials: !0,
			method: "GET",
			url: a
		})
	}, c
}]);