angular.module("active1", ["services.show", "services.activity", "app.directives.addBanner"]),
	angular.module("active1").controller("Active1Ctrl", ["$rootScope", "$http", "$scope", "$translate", "showService", "activityService", "$location", "configSerService", function(a, b, c, d, e, f, g, h) {
		c.pageNo = 1, c.pageSize = 10, c.childCat = "active", c.join = function(a) {
			g.path("/show/active/" + a)
		}, c.attend = function() {
			a.user ? g.path("/main") : c.openLogin()
		};
		var i = function(a) {
				f.getActiveList(1, null, a, c.pageSize), c.$on("activeList", function(a, b) {
					c.activeList = b.data.list;
					for (var d = Date.parse(new Date), e = 0; e < c.activeList.length; e++) c.activeList[e].endDate > d ? c.activeList[e].join = !0 : c.activeList[e].join = !1;
					c.totalItems = b.data.map.count, c.currentPage = b.data.map.pageNo, c.allPageCount = b.data.map.count, c.toPage = b.data.map.pageNo
				})
			};
		i(c.pageNo), c.pageChanged = function(a) {
			return 1 > a || a > c.totalItems / 10 + 1 ? void alert(d.instant("show.OVER_PAGE_NUMBER")) : void i(a)
		}, c.pageCode = "active", h.getFriendLinks(c.pageCode).then(function(a) {
			c.friendLinks = a.data.list, c.friendLinks.length > 16 && (c.friendLinks.length = 16)
		})
	}])