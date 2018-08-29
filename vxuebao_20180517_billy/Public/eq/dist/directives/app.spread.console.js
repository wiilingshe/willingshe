angular.module("app.spread.console", []).controller("ApplyConsoleCtrl", ["$scope", "$rootScope", "applyObj", "sceneSettingCache", "SpreadService", "pageTplService", function(a, b, c, d, e, f) {
		a.apply || (a.apply = {}), a.applyObj = c, 2 == c.type ? (a.title = "申请加入微课", a.description = "申请加入微学宝官方微课平台，获取更多朋友的关注", d.sceneTagsPromise.then(function(b) {
			var c = b.data.list || [];
			a.$watch("applyObj.sceneType", function(b) {
				b && (a.sceneTags = [], angular.forEach(c, function(c) {
					b == c.bizType && a.sceneTags.push(c)
				}))
			})
		})) : 1 == c.type ? (a.title = "申请成为样例", a.description = "申请微学宝官方推荐，成为其他用户创建微课的原型样例，还可以赚取微币", 4 == b.user.type && d.sceneTplPricesPromise.then(function(b) {
			a.tplPrices = b.data.list || [], a.apply.tplObj = a.tplPrices[0]
		})) : 3 == c.type ? (a.title = "加入活动", a.description = "与其他高手过招，展示自我深厚的制作功力，有机会获得活动大奖", f.getPageTpls(c.value).then(function(b) {
			a.activityPageTpls = b.data.list || []
		})) : 4 == c.type && (a.title = "申请为企业样例");
		var g, h;
		a.apply = function() {
			if (2 == c.type) {
				if (!a.apply.showObj) return void(a.authError = "请先选择微课类型！");
				g = a.apply.showObj.id
			} else if (1 == c.type) g = 4 == b.user.type ? a.apply.tplObj.value : 0;
			else if (3 == c.type) {
				if (!i) return void(a.authError = "请先选择活动尾页！");
				g = c.id + "," + i
			}
			e.applyShareWay(c.sceneId, c.type, g)
		}, a.$on("apply.scene.share", function(b, c) {
			c.success ? a.$close({
				value: g,
				src: h
			}) : (alert(c.msg), a.$dismiss())
		});
		var i;
		a.selectActivePage = function(b) {
			$.each(a.activityPageTpls, function(a, b) {
				b.checked = !1
			}), b.checked = !0, i = b.id, b.properties && b.properties.thumbSrc && (h = b.properties.thumbSrc)
		}, a.cancel = function() {
			a.$dismiss()
		}
	}]);