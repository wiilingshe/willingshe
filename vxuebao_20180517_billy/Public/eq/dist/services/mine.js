angular.module("services.mine", []), angular.module("services.mine").factory("MineService", ["$http", "$rootScope","$location", function(a, b, $location) {
	var c = {};
	return c.getMyScenes = function(d, e, f, g, h, i) {
		var j;
		j = d ? "index.php?c=scene&a=my&type=" + d : "index.php?c=scene&a=my";
		if(g){ 
			j += "&branchid=" + g;
		}else if(b.user.type == 21){
			j += "&branchid=" + b.user.id;
		}else if((b.user.type == 2) && ($location.search() && $location.search().branchid)){
			j += "&branchid=" + $location.search().branchid;
		}

		(e == null) && (e = 1);

		var k = {
			showData: h,
			pageNo: e,
			pageSize: f,
			user: g,
			name: i
		};
		return j += (/\?/.test(j) ? "&" : "?") + "time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "POST",
			url: PREFIX_URL + j,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(k)
		}).then(function(a) {
			200 == a.data.code && (c.scenes = a.data, b.$broadcast("get.my.scene.list"))
		})
	}, c.getLongPage = function(searchType, searchName, pageNo, pageSize){
		var data, url, time = new Date;

		
		url = searchType ? 'index.php?c=scene&a=my&islongpage=1&type=' + searchType : 'index.php?c=scene&a=my&islongpage=1';

		if(b.user.type == 21){
			url += "&branchid=" + b.user.id;
		}else if((b.user.type == 2) && ($location.search() && $location.search().branchid)){
			url += "&branchid=" + $location.search().branchid;
		}

		data = {
			pageNo: pageNo,
			pageSize: pageSize,
			name: searchName
		}

		return url += '&time=' + time.getTime(), a({
			withCredentials: !0,
			method: "POST",
			url:PREFIX_URL + url,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(data)
		})
	}, c.getPPT = function(){
		var url, time = new Date;

		url = "index.php?c=Ppt&a=pptlist&pageNo=1&pageSize=11&time="+time.getTime(); //ppt

		return a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + url
		})
	}, c.deleteSceneById = function(b, c) {
		var d = "index.php?c=scene&a=delscene&id=" + b;
		return c && (d += "&backup=" + c), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + d
		})
	}, c.getMyHistoryScenes = function(b, c, d) {
		var e = "m/scene/recycle/list";
		return e += "?pageNo=" + (b ? b : 1), e += "&pageSize=" + (c ? c : 12), d && (e += "&user=" + d), e += (/\?/.test(e) ? "&" : "?") + "time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: PREFIX_URL + e
		})
	}, c.subAudit = function(sceneId, isAudit){
		var url = "/index.php?c=scene&a=subAudit";
		var data = {
			sceneid: sceneId,
			isAudit: isAudit
		}
		return a({
			method: "POST",
			url: PREFIX_URL + url,
			data: $.param(data),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			}
		});
		
	}, c.saveAudit = function(sceneId, isPass){
		var url = "/index.php?c=scene&a=saveAudit";
		var data = {
			sceneid: sceneId,
			isAudit: isPass
		}
		return a({
			method: "POST",
			url: PREFIX_URL + url,
			data: $.param(data),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			}
		});
	}, c
}]);