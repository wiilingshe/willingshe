angular.module("scene.preview").directive("sceneView", ["sceneService", "sceneViewService", "sceneDataParseService", function(a, b, c) {
	return {
		scope: {
			sceneId: "@",
			sceneName: "@",
			sceneCover: "@",
			sceneDescription: "@"
		},
		restrict: "A",
		templateUrl: BASE_URL + "templates/scene.preview.tpl.html",
		link: function(a, d, e, f) {
			function g(d, f) {
				b.getSceneData(e.sceneId).then(function(e) {
					e.data.success && (d && (d = parseInt(d, 10) - 1, e.data.list[d].elements = f.obj.elements, e.data.list[d].properties = f.obj.properties), a.$parent.scene.property.activityPageId ? b.getActivityPage(a.$parent.scene.property.activityPageId).then(function(a) {
						e.data.list.push(a.data.obj), c.parse(e.data)
					}) : c.parse(e.data))
				})
			}
			function h() {
				k(), d.find(".password-numbers>span").click(j), d.find(".password-operation>span").click(k), d.find(".verifyCode").show()
			}
			function i() {
				d.find(".password-numbers>span").unbind("click"), d.find(".password-operation>span").unbind("click"), d.find(".verifyCode").hide()
			}
			function j(b) {
				k($(b.target).text()), 4 == l.pass.length && (a.$parent.scene.accessCode == l.pass ? i() : k())
			}
			function k(a) {
				a && "object" != typeof a ? l.pass += a : l.pass = "", d.find(".password-indicator li").each(function(a, b) {
					a < l.pass.length ? $(b).addClass("active") : $(b).removeClass("active")
				})
			}
			var l = {
				play: !1
			};
			a.sceneId && (a.$parent.mginData == angular.toJson(a.$parent.tpl) ? g() : g(a.$parent.pageNum, $.extend(!0, {}, a.$parent.tpl))), a.$watch("sceneId", function(a, b) {
				a != b && g()
			}), d.on("$destroy", function() {
				utilSound.pause()
			}), a.$on("changeView", function(a, b, longpage) {
				b || longpage ? d.find(".wechat-share").show() : d.find(".wechat-share").hide(), d.find(".loading").hide(), i()
			}), a.$on("showLoading", function(a, b, c) {
				b ? (c ? d.find(".loadbg").css({
					background: "url(" + PREFIX_FILE_HOST + c + ")",
					"background-size": "70px 42px"
				}) : d.find(".loadbg").css("background", ""), d.find(".loading").show(), d.find(".wechat-share").hide()) : d.find(".loading").hide(), i()
			}), a.$on("processBar", function(a, b) {
				b ? d.find(".progress").show() : d.find(".progress").hide()
			}), a.$on("passPanelSwitch", function(a, b) {
				b ? h() : i()
			}), d.on("$destroy", function() {
				clearInterval(eqShow.progressInterval), c.app.pauseAutoFlip()
			})
		}
	}
}])