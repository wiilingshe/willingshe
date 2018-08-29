angular.module("search", ["services.show", "services.activity", "app.directives.addBanner"]),
	angular.module("search").controller("SearchCtrl", ["$rootScope", "$http", "$scope", "$translate", "showService", "activityService", "$location", "$stateParams", function(a, b, c, d, e, f, g, h) {
		var i = {
			name: "",
			pageNo: 1,
			pageSize: 16
		};
		c.name = h.name, c.pageNo = 1, c.pageSize = 16, c.val = c.name, i.name = c.name, c.EnterPress = function(a, b) {
			var d = a || window.event;
			13 == d.keyCode && c.submit(b)
		}, c.submit = function(a) {
			c.name = a, a ? g.path("show/search/" + c.name) : g.path("show")
		};
		var j = function(a) {
			e.search(a), c.$on("searchList", function(a, b) {
				c.searchList = b.list, c.totalItems = b.map.total, c.currentPage = b.map.pageNo, c.toPage = b.map.pageNo;
				for (var d = 0; d < c.searchList.length; d++) c.searchList[d].headImg ? 0 === c.searchList[d].headImg.indexOf("http://") ? c.searchList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.searchList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.searchList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png"
			})
		};
		j(i), c.pageChanged = function(a) {
			return 1 > a || a > c.totalItems / 16 + 1 ? void alert(d.instant("show.OVER_PAGE_NUMBER")) : (i.pageNo = a, void j(i))
		}
	}])