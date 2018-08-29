angular.module("show", ["services.show", "services.activity", "app.directives.addBanner"]),
angular.module("show").controller("ShowCtrl", ["$rootScope", "$http", "$scope", "showService", "activityService", "$location", "configSerService", "security", function(a, b, c, d, e, f, g, h) {
	c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.PREFIX_SERVER_HOST = PREFIX_URL, c.pageNo = 1, c.pageSize = 16, c.recommend = 1, c.childCat = "index", e.getActiveList(null, c.recommend, c.pageNo, 3), c.$on("activeList", function(a, b) {
		c.activeList = b.data.list
	}), c.join = function(a) {
		f.path("/show/active/" + a)
	}, d.getSceneList(null, c.recommend, null, c.pageNo, c.pageSize), c.$on("sceneList", function(a, b) {
		c.sceneList = b.list;
		for (var d = 0; d < c.sceneList.length; d++) 2 === c.sceneList[d].isTemplate && (c.sceneList[d].isTemplate = !0), c.sceneList[d].headImg ? 0 === c.sceneList[d].headImg.indexOf("http://") ? c.sceneList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.sceneList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.sceneList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png"
	}), c.userTpl = function(b) {
		h.closeLoginDialog(), f.path("/scene"), a.tplId = b
	}, c.pageCode = "index", g.getFriendLinks(c.pageCode).then(function(a) {
		c.friendLinks = a.data.list, c.friendLinks.length > 16 && (c.friendLinks.length = 16)
	})
}]);