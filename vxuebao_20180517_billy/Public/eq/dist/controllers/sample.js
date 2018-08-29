angular.module("sample", ["services.sample", /*"services.mine", "services.scene",*/ "services.staticRes", "app.directives.addelement", "app.directives.qrcode"]);
angular.module("sample").controller("SampleCtrl", ["$rootScope", "$http", "$scope", "$timeout", "security", "$window", "sampleService", /*"MineService", "sceneService", "$stateParams",*/ "staticResService", function(a, b, c, d, e, f, g, /*h, i,j,*/  k) {
	c.PREFIX_FILE_HOST = PREFIX_FILE_HOST;
	c.PREFIX_SERVER_HOST = PREFIX_URL;
	c.PREFIX_CLIENT_HOST = PREFIX_HOST;
	c.load = function() {
		t = $(".fixed").offset().top, mh = $(".mains").height(), fh = $(".fixed").height(), $("#eq_main").scroll(function() {
			s = $("#eq_main").scrollTop(), s > t - 10 ? ($(".fixed").css("position", "fixed"), s + fh > mh && $(".fixed").css("top", "0px")) : $(".fixed").css("position", "")
		})
	};
	c.$on("$destroy", function() {
		$("#eq_main").unbind("scroll")
	}); 
	c.pageNo = 1;
	c.pageSize = 9; 
	c.scene || (c.scene = {}); 
	c.typeindex = "all"; 
	c.getHomes = function(a, b, d, e) {
		c.pageNo = 1;
		c.typeindex = a;
		c.currentType = b;
		c.showMoreButton = !0;
		g.getSamples(b, d, e).then(function(a) {
			c.homes = a.data.list
		}, function(a) {});
	}; 
	c.sceneTypes = k.getSceneType(); 
	c.showMore = function() {
		c.pageNo++;
		g.getSamples(c.currentType, c.pageNo, c.pageSize).then(function(a) {
			a.data.list.length > 0 ? c.homes = c.homes.concat(a.data.list) : c.showMoreButton = !1
		}, function(a) {})
	}; 
	c.getHomes("all", null, 1, 9); c.getSamplesPV = function() {
		g.getSamplesPV().then(function(a) {
			c.SamplesPVs = a.data;
			c.dayTop = c.SamplesPVs.obj.dayTop;
			c.monthTop = c.SamplesPVs.obj.monthTop;
			c.weekTop = c.SamplesPVs.obj.weekTop;
			c.page = "month";
		}, function(a) {})
	}
}]);