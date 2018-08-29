angular.module("home").controller("HomeCtrl", ["$rootScope", "$http", "$scope", "$timeout", "security", "$window", "sampleService", "$stateParams", "$state", "$location", "configService", /*"thirdpartyService",*/ "staticResService", function(a, b, c, d, e, f, g, i, j, k, l, /*m,*/ n) {
		c.web_muban_status = web_muban_status;
		
		c.home70fun= function(){
			 
		  $('.header-fixed').addClass('header-opacity');  //
		  $('.header-shadow').hide(); 
		   
		 $('.slide').slider({autoRollingTime:10000,bgSpeed:500,motion:{'a1-1':{left:-384,opacity:0,speed:1000,delay:500},'a1-2':{left:931,opacity:0,speed:1000,delay:1000},'a1-3':{left:1116,opacity:0,speed:1000,delay:1200},'a1-4':{left:731,opacity:0,speed:1000,delay:1400},'a2-1':{top:679,opacity:0,speed:1000,delay:500},'a2-2':{top:679,opacity:0,speed:1000,delay:800},'a2-3':{left:-1169,opacity:0,speed:1000,delay:800},'a2-4':{opacity:0,speed:1000,delay:1200},'a2-5':{opacity:0,speed:1000,delay:1500},'a2-6':{opacity:0,speed:1000,delay:1700},'a2-7':{top:559,opacity:0,speed:1000,delay:1800},'a2-8':{top:559,opacity:0,speed:1000,delay:2000},'a2-9':{top:559,opacity:0,speed:1000,delay:2200},'a2-10':{opacity:0,speed:1000,delay:2400},'a2-11':{opacity:0,speed:1000,delay:2600},'a2-12':{top:-60,opacity:0,speed:1000,delay:2800},'a3-1':{top:679,opacity:0,speed:1000,delay:200},'a3-2':{left:-200,opacity:0,speed:1000,delay:1000},'a3-3':{left:824,opacity:0,speed:1000,delay:1000},'a3-4':{left:-94,opacity:0,speed:500,delay:1500},'a3-5':{opacity:0,speed:500,delay:1600},'a3-6':{opacity:0,speed:500,delay:1700},'a3-7':{opacity:0,speed:500,delay:1800},'a3-8':{opacity:0,speed:500,delay:1900},'a3-9':{opacity:0,speed:500,delay:2000},'a3-10':{opacity:0,speed:500,delay:2100},'a3-11':{opacity:0,speed:500,delay:2200},'a3-14':{opacity:0,speed:1000,delay:2300},'a3-15':{opacity:0,speed:1000,delay:2400},'a3-23':{opacity:0,speed:500,delay:2500},'a3-22':{opacity:0,speed:500,delay:2600},'a3-21':{opacity:0,speed:500,delay:2700},'a3-20':{opacity:0,speed:500,delay:2800},'a3-19':{opacity:0,speed:500,delay:2900},'a3-18':{opacity:0,speed:500,delay:3000},'a3-17':{opacity:0,speed:500,delay:3100},'a3-16':{opacity:0,speed:500,delay:3200},'a3-12':{opacity:0,speed:500,delay:3300},'a3-13':{opacity:0,speed:500,delay:3400},'a4-1':{top:679,opacity:0,speed:1000,delay:200},'a4-2':{left:-200,opacity:0,speed:1000,delay:1000},'a4-3':{left:824,opacity:0,speed:1000,delay:1000},'a4-4':{left:-94,opacity:0,speed:500,delay:1500},'a4-5':{left:-60,opacity:0,speed:500,delay:1500},'a5-1':{top:679,opacity:0,speed:1000,delay:500},'a5-2':{top:679,opacity:0,speed:1000,delay:800},'a5-3':{left:-1169,opacity:0,speed:1000,delay:800},'a5-4':{opacity:0,speed:1000,delay:1200},'a6-1':{top:679,opacity:0,speed:1000,delay:200},'a6-2':{left:-200,opacity:0,speed:1000,delay:1000},'a6-3':{left:824,opacity:0,speed:1000,delay:1000},'a6-4':{left:-94,opacity:0,speed:500,delay:1500},end:null}});
		}
		c.showCode = !1, c.isAuthenticated = e.isAuthenticated, c.registerMsg = {}, c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.PREFIX_SERVER_HOST = PREFIX_URL, c.scene || (c.scene = {}), c.typeindex = "all", c.pageSize = 12, c.pageNo = 1, c.getHomes = function(a, b, d, e) {
			c.typeindex = a, g.getSamples(b, d, e).then(function(a) {
				c.homes = a.data.list
			}, function(a) {})
		}, c.sceneTypes = n.getSceneType(), c.getHomes("all", null, 1, 12);
		c.getSamplesPV = function() {
			g.getSamplesPV().then(function(a) {
				c.SamplesPVs = a.data, c.dayTop = c.SamplesPVs.obj.dayTop, c.monthTop = c.SamplesPVs.obj.monthTop, c.weekTop = c.SamplesPVs.obj.weekTop, c.page = "month"
			}, function(a) {})
		},l.getBanner70().then(function(re) {  //
			//c.banners = re.data.list; 
			$("#slides_bgcc").html(re.data.banner_bg); 
			$("#slide_switchcc").html(re.data.slide_switchcc);
			$("#banner_body").html(re.data.banner_body);
			var stop = setInterval(function () { $("#scenecount").html(parseInt($("#scenecount").html()) + 150); }, 10);
			setTimeout(function () { window.clearInterval(stop); $("#scenecount").html(re.data.scenecount); }, 5000);
			c.home70fun();
		}),
		  l.getMenu70().then(function(re) {
			c.menus = re.data.list; 
		}),
		l.getFriendLinks().then(function(a) {
			c.friendLinks = a.data.list, c.friendLinks.length > 15 && (c.friendLinks.length = 15)
		}),l.getProduct().then(function(a) {
            c.product = a.data.list, c.product.length > 15 && (c.product.length = 15)
        })
}])