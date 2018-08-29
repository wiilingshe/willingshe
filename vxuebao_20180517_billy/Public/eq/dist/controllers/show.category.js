angular.module("category", ["services.show", "services.activity", "app.directives.addBanner"]),
	angular.module("category").controller("CategoryCtrl", ["$rootScope", "$http", "$scope", "$translate", "showService", "activityService", "$location", "$stateParams", "security", function(a, b, c, d, e, f, g, h, i) {
		c.recommend = 1, c.pageSize = 16, f.getActiveList(null, c.recommend, c.pageNo, 3), c.$on("activeList", function(a, b) {
			c.activeList = b.data.list
		}), c.join = function(a) {
			g.path("/show/active/" + a)
		};
		var j = h.id;
		c.bizType = j;
		var k = {};
		c.getCategoryTpl = function(a) {
			c.childCat = a, k[a] ? (c.childCatrgoryList = k[a], c.childCatrgoryList.length && (l.tagId = c.categoryId = c.childCatrgoryList[0].id, c.getPageTpls(null, c.childCatrgoryList[0].id))) : e.getPageTagLabel(a).then(function(b) {
				c.childCatrgoryList = k[a] = b.data.list, c.childCatrgoryList.length && (l.tagId = c.categoryId = c.childCatrgoryList[0].id, c.getPageTpls(null, c.childCatrgoryList[0].id))
			})
		}, c.getCategoryTpl(j);
		var l = {
			sceneType: "",
			tagId: "",
			orderBy: null,
			bizType: "",
			template: "",
			pageNo: "1",
			targetPage: ""
		};
		c.tplNew = function(a) {
			c.order = a, l.orderBy = a, c.getPageTpls(a, null, l.tagId, l.pageNo, c.pageSize)
		}, c.getPageTpls = function(a, b) {
			b && (l.tagId = b), c.categoryId = l.tagId, e.getSceneList(l.orderBy, null, l.tagId, l.pageNo, c.pageSize), c.$on("sceneList", function(a, b) {
				c.tpls = b.list, c.totalItems = b.map.total, c.currentPage = b.map.pageNo, c.allPageCount = b.map.count, c.toPage = b.map.pageNo;
				for (var d = 0; d < c.tpls.length; d++) 2 == c.tpls[d].isTemplate && (c.tpls[d].isTemplate = !0), c.tpls[d].headImg ? 0 === c.tpls[d].headImg.indexOf("http://") ? c.tpls[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.tpls[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.tpls[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png"
			})
		}, c.userTpl = function(b) {
			i.closeLoginDialog(), g.path("/scene"), a.tplId = b
		}, c.pageChanged = function(a) {
			return 1 > a || a > c.totalItems / 16 + 1 ? void alert(d.instant("show.OVER_PAGE_NUMBER")) : (l.pageNo = a, void c.getPageTpls(l.orderBy, null, l.tagId, a, c.pageSize))
		}
	}]);