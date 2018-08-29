angular.module("activeXq", ["services.show", "services.activity", "app.directives.addBanner"]),
	angular.module("activeXq").controller("ActiveXqCtrl", ["$rootScope", "$http", "$scope", "$translate", "showService", "activityService", "$location", "$stateParams", "configSerService", function(a, b, c, d, e, f, g, h, i) {
		c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.PREFIX_SERVER_HOST = PREFIX_URL, c.pageNo = 1, c.pageSize = 16, c.activeId = h.id, c.childCat = "active", c.totalItems = 0, c.join = function(a) {
			g.path("/show/active/" + a)
		}, c.attend = function() {
			a.user ? g.path("/main") : c.openLogin()
		};
		var j = function() {
			f.activitySceneList(c.activeId, 1, c.pageNo, 4).then(function(a) {
				if (c.recSceneList = a.data.list, a.data.list)
					for (var b = 0; b < c.recSceneList.length; b++) c.recSceneList[b].headImg ? 0 === c.recSceneList[b].headImg.indexOf("http://") ? c.recSceneList[b].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.recSceneList[b].headImg = PREFIX_FILE_HOST + CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.recSceneList[b].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png"
			})
		};
		j(c.activeId, 1, c.pageNo, 4);
		var k = function() {
			f.activitySceneList(c.activeId, null, c.pageNo, c.pageSize).then(function(a) {
				if (c.sceneList = a.data.list, c.totalItems = a.data.map.count, c.currentPage = a.data.map.pageNo, c.toPage = a.data.map.pageNo, a.data.list)
					for (var b = 0; b < c.sceneList.length; b++) c.sceneList[b].headImg ? 0 === c.sceneList[b].headImg.indexOf("http://") ? c.sceneList[b].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.sceneList[b].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.sceneList[b].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png"
			})
		};
		k(c.activeId, null, c.pageNo, c.pageSize), f.activityMes(c.activeId), c.$on("activeMes", function(a, b) {
			c.activeMes = b.data.obj
		}), c.pageChanged = function(a) {
			return c.pageNo = a, 1 > a || a > c.totalItems / 16 + 1 ? void alert(d.instant("show.OVER_PAGE_NUMBER")) : void k(c.activeId, null, a, c.pageSize)
		}, c.pageCode = "pro_" + c.activeId, i.getFriendLinks(c.pageCode).then(function(a) {
			c.friendLinks = a.data.list, c.friendLinks.length > 16 && (c.friendLinks.length = 16)
		})
	}]);