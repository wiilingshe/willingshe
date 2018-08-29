angular.module("services.configSer", []).factory("configSerService", ["$http", function(a) {
		var b = function(b) {
				var c = PREFIX_S2_URL + "index.php?c=ad&a=friendlinks&pageCode=" + b;
				return a({
					withCredentials: !0,
					method: "GET",
					url: c
				})
			},
			c = function(b) {
				//if(!window.localStorage.mytplList){
				var mytplList = [];
				var getMyTplListUrl = PREFIX_URL + "index.php?c=statics&a=getMytpl";
                		$.get(getMyTplListUrl, function (data) {
				getMyTplListUrl = "";
                		for (i = 0; i < data.list.length; i++) {
                    			mytplList.push(data.list[i].name)
                		}
                    		window.localStorage.setItem("mytpl1",mytplList[0]);
				window.localStorage.setItem("mytpl2",mytplList[1]);
				window.localStorage.setItem("mytpl3",mytplList[2]);
				});
//}
				var c = PREFIX_S2_URL + "index.php?c=eqs&a=banners&pageCode=" + b,
					d = new Date;
				return c += "&time=" + d.getTime(), a({
					withCredentials: !0,
					method: "GET",
					url: c
				})
			};
		return {
			getFriendLinks: b,
			getActivityBanner: c
		}
	}])