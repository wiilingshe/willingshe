angular.module("scene.edit.bg", ["services.scene", "services.history"]), 
angular.module("scene.edit.bg").controller("editBgCtrl", ["$scope", "$rootScope", "sceneService", "historyService", function(a, b, c, d) {
	a.cropBg = function(e) {
		a.$broadcast("hide.editbg.panel");
		var f = {
			type: 3,
			properties: {
				src: e.properties.imgSrc
			}
		};
		c.openCropModal(f, function(c) {
			b.$broadcast("scene.bg.replace", {
				type: "imgSrc",
				src: c.src
			}, e), e.properties.imgSrc = c.src, d.addPageHistory(e.pageId, a.tpl.obj.elements)
		}, function() {})
	}, a.scaleUpBg = function(a) {
		a || (a = {}), a.effect = {
			type: "scaleUp",
			duration: 1,
			blurSize: 5
		}
	}, a.scaleDownBg = function(a) {
		a || (a = {}), a.effect = {
			type: "scaleDown",
			duration: 1,
			blurSize: 5
		}
	}, a.blurBg = function(a) {
		a || (a = {}), a.effect = {
			type: "blur",
			duration: 1,
			blurSize: 5
		}
	}, a.sharpBg = function(a) {
		a || (a = {}), a.effect = {
			type: "sharp",
			duration: 1,
			sharpSize: 5
		}
	}, a.removeBgEffect = function(b) {
		a.currentBgDef.effect = null
	}, a.$on("hideBgOption", function() {
		a.showBgOptionPanel = !1
	}), a.switchBgOption = function(b) {
		a.showBgOptionPanel = b
	}
}]);