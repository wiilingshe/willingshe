angular.module("scene.userGuide", []).controller("SceneUserGuideCtrl", ["$rootScope", "$scope", function(a, b) {
	if (window.localStorage) {
		var c = JSON.parse(localStorage.getItem("sceneUserGuide"));
		c && c[a.user.id] ? b.firstLogin = !1 : (b.firstLogin = !0, c = c || {}, c[a.user.id] = 1, localStorage.setItem("sceneUserGuide", JSON.stringify(c)))
	}
	b.currentGuideIndex = 0, b.guideLength = 5, b.showNextGuide = function() {
		b.currentGuideIndex += 1, b.guideLength == b.currentGuideIndex && (b.firstLogin = !1)
	}
}])