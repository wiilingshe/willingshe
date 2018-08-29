angular.module("scene.support", []), angular.module("scene.support").controller("SupportCtrl", ["$location", "$scope", "$translate", "continueUrl", function(a, b, c, d) {
	b["continue"] = function() {
		window.sessionStorage && sessionStorage.setItem("checkSuport", !1), a.path(d.getUrl())
	}, b.setLinkUrl = function() {
		navigator.language ? navigator.language.toLowerCase() : navigator.systemLanguage.toLowerCase();
		b.download_Chorme = "https://www.baidu.com/s?wd=Chrome", b.download_IE = "https://www.baidu.com/s?wd=ie11", b.download_360fast = "http://chrome.360.cn/", b.download_360 = "http://se.360.cn/"
	}, b.setLinkUrl()
}]).factory("continueUrl", function() {
	function a(a) {
		c = a
	}
	function b() {
		return c
	}
	var c = "";
	return {
		setUrl: a,
		getUrl: b
	}
});