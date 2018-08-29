angular.module("scenePreview", ["services.scene", "services.mine", "services.data", "scene.create.console", "app.directives.addelement", "services.usercenter", "app.directives.qrcode", "services.i18nNotifications"]), 
angular.module("scenePreview").controller("MySceneCtrl", ["$location", "$rootScope", "$scope", "$stateParams", "$modal", "usercenterService", "ModalService", "sceneService", "security", "$sce", function(a, b, c, d, e, f, g, h, i, j) {
	c.loading = !1, c.sceneId = d.sceneId, c.iframeUrl = j.trustAsResourceUrl(PREFIX_URL + "index.php?c=view&id=" + c.sceneId + ".html?preview=myscene"), c.tpl = b.tplObj, c.userXd = 0, f.getUserXd().then(function(a) {
		c.userXd = a.data.obj || 0
	}), b.backurl ? c.backurl = b.backurl : c.backurl = "#/main", h.getSceneDetail(c.sceneId).then(function(a) {
		a.data.success && (a.data.obj.createUser == i.currentUser.id ? c.isTpl = !1 : c.isTpl = !0, c.scene = a.data.obj, b.user && b.user.domain ? (c.url = b.user.domain + "/v-" + c.scene.code, c.canvasUrl = "http://" + c.url) : (c.url = PREFIX_HOST + "/v-" + c.scene.code, c.canvasUrl = c.url))
	}), c.editScene = function() {
		a.path("scene/create/" + c.sceneId).search("pageId", 1)
	}, c.setSceneInfo = function() {
		a.path("scene/create/" + c.sceneId).search("pageId", 1).search("openSetting", "show")
	}, c.moreShareWay = function() {
		a.path("spread/share/" + c.sceneId + "/socialShare")
	}, c.userTpl = function() {
		a.path("/scene"), b.tplId = c.scene
	};
	var k, l;
	document.getElementById("sharescript") ? ($("#sharescript").remove(), k = document.getElementsByTagName("head")[0], l = document.createElement("script"), l.id = "sharescript", l.src = "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=" + ~ (-new Date / 36e5), k.appendChild(l)) : (k = document.getElementsByTagName("head")[0], l = document.createElement("script"), l.id = "sharescript", l.src = "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=" + ~ (-new Date / 36e5), k.appendChild(l)), window._bd_share_config = {
		common: {
			bdText: "aa",
			bdDesc: "aa",
			bdUrl: "aa",
			bdSign: "on",
			bdSnsKey: {}
		},
		share: [{
			bdSize: 32
		}],
		slide: [{
			bdImg: 0,
			bdPos: "right",
			bdTop: 100
		}]
	}, c.scrollPage = function(a) {
		b.$broadcast("scene.page.scroll", a)
	}
}]).directive("ctrlPageScroll", function() {
	function a(a, b, c) {
		a.$on("scene.page.scroll", function(a, b) {
			var c = $("iframe").get(0).contentWindow;
			b ? c.eqxiu.nextPage() : c.eqxiu.prePage()
		})
	}
	return {
		restrict: "EA",
		link: a
	}
});