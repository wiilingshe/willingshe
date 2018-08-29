angular.module("spread.share.socialShare", ["app.directives.disableKeydown"]), angular.module("spread.share.socialShare").controller("SocialShareCtrl", ["$rootScope", "$scope", "$stateParams", "$modal", "i18nNotifications", "sceneSettingCache", "SpreadService", "pageTplService", function(a, b, c, d, e, f, g, h) {
	b.obj = {}, b.qrcodeList = [{
		type: 1,
		name: "小（256px）",
		size: 256
	}, {
		type: 2,
		name: "中（512px）",
		size: 512
	}, {
		type: 3,
		name: "大（1024px）",
		size: 1024
	}], b.shareList = [{
		id: 1,
		type: "sina",
		icon: "eqf-weibo",
		title: "新浪微博",
		"class": "sina"
	}, {
		id: 2,
		type: "tencent",
		icon: "eqf-txweibo",
		title: "腾讯微博",
		"class": "tencent"
	}, {
		id: 3,
		type: "qqzone",
		icon: "eqf-QQzone",
		title: "qq空间",
		"class": "qqzone"
	}, {
		id: 4,
		type: "timeline",
		icon: "eqf-friend",
		title: "微信朋友圈",
		"class": "timeline"
	}, {
		id: 5,
		type: "yixin",
		icon: "eqf-yixin",
		title: "易信",
		"class": "yixin"
	}, {
		id: 6,
		type: "tieba",
		icon: "eqf-tieba",
		title: "百度贴吧",
		"class": "tieba"
	}, {
		id: 7,
		type: "laiwang",
		icon: "eqf-laiwang",
		title: "来往",
		"class": "laiwang"
	}], b.downloadQrcode = function(b) {
		a.$broadcast("download.canvas", b.size)
	};
	/*var i = function() {
			g.getShareWayList(b.sceneId)
		};
	i(), */b.$on("shareway.update", function(a, c) {
		$.each(b.shareList, function(a, b) {
			$.each(c, function(a, c) {
				c.type == b.id && 1 == c.status && (b.isLighted = !0)
			})
		})
	}), b.activeShareWay = function(a) {
		g.activeShareWay(b.sceneId, a)
	}, b.$on("active.shareway", function(a, c) {
		$.each(b.shareList, function(a, b) {
			c == b.id && (b.isLighted = !0)
		})
	}), b.$watch("scene", function(a, c) {
		a && (-1 == a.status ? b.tip = "审核被拒绝不能申请" : -2 == a.status && (b.tip = "审核中不能申请"), /*f.activitiesPromise.then(function(c) {
			if (b.activities = c.data.list || [], a.promIds) {
				$.each(b.activities, function(c, d) {
					a.promIds == d.id && (b.obj.selectedActivity = d)
				});
				var d = JSON.parse(a.property);
				h.getPageTpls(b.obj.selectedActivity.sceneId).then(function(a) {
					b.activityPageTpls = a.data.list || [], $.each(b.activityPageTpls, function(a, c) {
						d.activityPageId == c.id && c.properties && (b.appliedImgSrc = c.properties.thumbSrc)
					})
				})
			}
		}), */0 == a.applyTemplate ? b.obj.applySample = !1 : 1 == a.applyTemplate ? b.obj.applySample = !0 : 2 == a.applyTemplate || -1 == a.applyTemplate, b.obj.publishTime = a.publishTime, 0 == a.isShow ? b.obj.applyShow = !1 : 1 == a.isShow ? b.obj.applyShow = !0 : 2 == a.isShow || -1 == a.isShow, 3 == a.isTpl && (b.obj.applyCompTpl = !0), f.sceneTagsPromise.then(function(c) {
			var d = c.data.list || [];
			b.sceneTags = [], angular.forEach(d, function(c) {
				a.type == c.bizType && b.sceneTags.push(c)
			}), a.tagId && $.each(b.sceneTags, function(c, d) {
				a.tagId == d.id && (b.obj.sceneTag = d)
			})
		}), f.sceneTplPricesPromise.then(function(c) {
			b.tplPrices = c.data.list || [], $.each(b.tplPrices, function(c, d) {
				a.price == d.value && (b.obj.tplPrice = d)
			})
		}))
	}, !0), b.applyFunc = function(a, c, d, f) {
		if (a) {
			if (2 == c && (1 == b.scene.isShow || 2 == b.scene.isShow)) return e.pushForCurrentRoute("already.apply.discovery", "notify.success"), void $.each(b.sceneTags, function(a, c) {
				b.scene.type == c.id && (b.obj.sceneTag = c)
			});
			if (1 == c && (1 == b.scene.applyTemplate || 2 == b.scene.applyTemplate)) return e.pushForCurrentRoute("already.apply.sample", "notify.success"), void $.each(b.tplPrices, function(a, c) {
				b.scene.price == c.value && (b.obj.tplPrice = c)
			});
			if (3 == c) return -1 == b.scene.status ? void e.pushForCurrentRoute("scene.deny.apply", "notify.success") : -2 == b.scene.status ? void e.pushForCurrentRoute("scene.incheck.apply", "notify.success") : b.scene.accessCode ? void e.pushForCurrentRoute("scene.accessCode.apply", "notify.success") : b.scene.promIds ? (e.pushForCurrentRoute("already.apply.activity", "notify.success"), void $.each(b.activities, function(a, c) {
				b.scene.promIds == c.id && (b.obj.selectedActivity = c)
			})) : void(window.localStorage && localStorage.getItem("hideApplyActivityTip") ? j(a, c, d, f) : b.showApplyTip = !0);
			j(a, c, d, f)
		}
	}, b.switchApplyActivityTip = function(a, b, c, d, e) {
		e && window.localStorage && localStorage.setItem("hideApplyActivityTip", !0), j(a, b, c, d)
	}, b.$on("apply.scene.share", function(a, b) {
		b.success && e.pushForCurrentRoute("scene.apply.success", "notify.success")
	});
	var j = function(a, c, f, g) {
			a && d.open({
				windowClass: "console six-contain",
				templateUrl: "spread/console/apply.tpl.html",
				controller: "ApplyConsoleCtrl",
				resolve: {
					applyObj: function() {
						return {
							sceneId: b.sceneId,
							type: c,
							value: f,
							id: g,
							sceneType: b.scene.type
						}
					}
				}
			}).result.then(function(a) {
				var d = a.value;
				e.pushForCurrentRoute("scene.apply.success", "notify.success"), 2 == c ? ($.each(b.sceneTags, function(a, c) {
					d == c.id && (b.obj.sceneTag = c)
				}), b.scene.isShow = 1) : 1 == c ? ($.each(b.tplPrices, function(a, c) {
					d == c.value && (b.obj.tplPrice = c)
				}), b.scene.applyTemplate = 1) : 3 == c ? a.src && (b.appliedImgSrc = a.src) : 4 == c && (b.scene.isTpl = 3)
			}, function() {
				2 == c ? b.obj.applyShow = !1 : 1 == c ? b.obj.applySample = !1 : 3 == c ? b.obj.selectedActivity = null : 4 == c && (b.obj.applyCompTpl = !1)
			})
		};
	b.applyCompTpl = function(a, c) {
		a && g.applyShareWay(b.sceneId, c)
	}, b.closeActivityModal = function() {
		b.showApplyTip = !1, b.obj.selectedActivity = null
	}
}]);