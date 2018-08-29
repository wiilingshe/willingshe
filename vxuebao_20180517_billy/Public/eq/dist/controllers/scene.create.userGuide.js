angular.module("create.userGuide", []).controller("CreateUserGuideCtrl", ["$rootScope", "$scope", function(a, b) {
	if (window.localStorage) {
		var c = JSON.parse(localStorage.getItem("createUserGuide"));
		c && c[a.user.id] ? b.firstLogin = !1 : (b.firstLogin = !0, c = c || {}, c[a.user.id] = 1, localStorage.setItem("createUserGuide", JSON.stringify(c)))
	}
	b.myInterval = -1, b.userGuideSlides = [{
		image: CLIENT_CDN + "assets/images/scene/user-guide1.png"
	}, {
		image: CLIENT_CDN + "assets/images/scene/user-guide2.png"
	}, {
		image: CLIENT_CDN + "assets/images/scene/user-guide3.png"
	}, {
		image: CLIENT_CDN + "assets/images/scene/user-guide4.png"
	}, {
		image: CLIENT_CDN + "assets/images/scene/user-guide5.png"
	}, {
		image: CLIENT_CDN + "assets/images/scene/user-guide6.png"
	}], b.close = function() {
		b.firstLogin = !1
	}, b.currentIndex = 0;
	var d = b.$watch("userGuideSlides", function() {
		angular.forEach(b.userGuideSlides, function(a, c) {
			a.active && (b.currentIndex = c)
		})
	}, !0);
	b.$on("$destroy", d)
}]);