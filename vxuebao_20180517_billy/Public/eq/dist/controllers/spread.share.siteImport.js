angular.module("spread.share.siteImport", []), angular.module("spread.share.siteImport").controller("SiteImportCtrl", ["$rootScope", "$scope", "$stateParams", "sceneService", function(a, b, c, d) {
		function e() {
			b.contentTexts = [{
				textOne: "以<script>的方式嵌入",
				textTwo: "该嵌入方式可以自适应高度，推荐使用。",
				textThree: "点击“复制代码”后，将代码粘贴至网页HTML期望的位置即可",
				url: '<script type="text/javascript" src="' + b.selectedUrl + '">',
				title: "在网页中以script的方式嵌入微课"
			}, {
				textOne: "以iframe的方式嵌入",
				textTwo: "该嵌入方式不能自适应高度，请谨慎使用。",
				textThree: "点击“复制代码”后，将代码粘贴至网页HTML期望的位置即可",
				url: '<iframe width=322px frameborder=0 height=641px src="' + b.selectedUrl + '"></iframe>',
				title: "在网页中以iFrame的方式嵌入微课"
			}]
		}
		b.$watch("user", function(c) {
			if (c) {
				var f;
				f = a.user && a.user.domain ? "http://" + a.user.domain : a.PREFIX_CLIENT_HOST, d.getSceneDetail(b.sceneId).then(function(a) {
					b.url = b.selectedUrl = f + "/v-" + b.scene.code, e()
				})
			}
		}, !0)
	}]);