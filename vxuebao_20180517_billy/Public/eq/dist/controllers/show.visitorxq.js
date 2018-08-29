angular.module("visitorXq", ["services.visitor"]),
	angular.module("visitorXq").controller("VisitorXqCtrl", ["$rootScope", "$http", "$scope", "$translate", "showService", "$location", "$stateParams", "visitorService", function(a, b, c, d, e, f, g, h) {
		c.childCat = "visitor", c.pageNo = 1, c.pageSize = 16, c.serverTag = [], c.cateTag = [], c.payTag = [], c.userId = g.id, c.qqAction = d.instant("show.visitorXq.QQ_LABEL"), c.getUserDetail = function() {
			h.getVisitorMsg(c.userId).then(function(a) {
				c.visitorMsg = a.data.obj, null === c.visitorMsg.tel && c.visitorMsg.phone ? c.visitorMsg.tel = c.visitorMsg.phone : c.visitorMsg.tel && c.visitorMsg.phone && (c.visitorMsg.tel = c.visitorMsg.phone);
				var b = a.data.obj.tagList;
				if (b)
					for (var e = 0; e < b.length; e++) "province" == b[e].type ? c.serverTag.push({
						tagId: b[e].tagId,
						name: b[e].name
					}) : "company_industry" == b[e].type ? c.cateTag.push({
						tagId: b[e].tagId,
						name: b[e].name
					}) : "payType" == b[e].type && c.payTag.push({
						tagId: b[e].tagId,
						name: b[e].name
					});
				c.visitorMsg.headImg && (0 === c.visitorMsg.headImg.indexOf("http://") ? c.visitorMsg.headImg = c.visitorMsg.headImg : c.visitorMsg.headImg = PREFIX_FILE_HOST + c.visitorMsg.headImg), null === c.visitorMsg.qq && (c.qqAction = "", $(".qq").addClass("hui"), c.visitorMsg.qq = d.instant("show.visitorXq.NO_QQ_HINT")), null === c.visitorMsg.tel && ($(".phone").addClass("hui"), c.visitorMsg.tel = d.instant("show.visitorXq.NO_TEL")), null === c.visitorMsg.wechat && ($(".weixin").addClass("hui"), c.visitorMsg.wechat = d.instant("show.visitorXq.NO_WECHAT"))
			})
		}, c.getUserDetail(), c.totalItems = 0, c.currentPage = 1, c.getUserWorks = function() {
			h.getVisitorMesList(c.userId, c.pageNo, c.pageSize).then(function(a) {
				c.visitorWorks = a.data.list, c.totalItems = a.data.map.count, c.toPage = a.data.map.pageNo;
				for (var b = 0; b < c.visitorWorks.length; b++) c.visitorWorks[b].headImg ? 0 === c.visitorWorks[b].headImg.indexOf("http://") ? c.visitorWorks[b].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.visitorWorks[b].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.visitorWorks[b].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png"
			})
		}, c.getUserWorks(), c.pageChanged = function(a) {
			return c.pageNo = a, 1 > a || a > c.totalItems / 16 + 1 ? void alert(d.instant("show.OVER_PAGE_NUMBER")) : void c.getUserWorks(c.userId, a, c.pageSize)
		}
	}]);