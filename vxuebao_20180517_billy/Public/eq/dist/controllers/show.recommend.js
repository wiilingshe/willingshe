angular.module("recommend", ["services.show"]),
	angular.module("recommend").controller("RecommendCtrl", ["$rootScope", "$http", "$scope", "$translate", "showService", "security", "$location", function(a, b, c, d, e, f, g) {
		c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.PREFIX_SERVER_HOST = PREFIX_URL, c.pageNo = 1, c.pageSize = 16, c.childCat = "recommend", c.order = null;
		var h = function(a) {
				e.getSceneList(c.order, 1, null, a, c.pageSize), c.$on("sceneList", function(a, b) {
					console.log(b);
					c.recommendList = b.list, c.totalItems = b.map.total, c.currentPage = b.map.pageNo, c.allPageCount = b.map.total, c.toPage = b.map.pageNo;
					for (var d = 0; d < c.recommendList.length; d++) 2 == c.recommendList[d].isTemplate && (c.recommendList[d].isTemplate = !0), c.recommendList[d].headImg ? 0 === c.recommendList[d].headImg.indexOf("http://") ? c.recommendList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.recommendList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.recommendList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png"
				})
			};
		h(c.pageNo), c.tplNew = function(a) {
			c.order = a, h(a, 1, null, c.pageNo, c.pageSize)
		}, c.userTpl = function(b) {
			f.closeLoginDialog(), g.path("/scene"), a.tplId = b
		}, c.pageChanged = function(a) {
			return 1 > a || a > c.totalItems / 16 + 1 ? void alert(d.instant("show.OVER_PAGE_NUMBER")) : void h(a)
		}
	}])