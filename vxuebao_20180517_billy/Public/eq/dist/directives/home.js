angular.module("home",[]).directive("iframeImgSwitch", function() {
	return {
		compile: function(a, b) {
			(document.documentMode || navigator.userAgent.indexOf("Edge") > 0) && (a.find(".svg-animation").css("display", "none"), a.find(".noSvg").css("display", "block"))
		}
	}
})