angular.module("app.directives.responsiveImage", []).directive("responsiveImage", ["$compile", function(a) {
	return {
		restrict: "EA",
		scope: {
			file: "="
		},
		link: function(a, b, c) {
			"0" != a.fileType && (b.find("img").length ? $element = b.find("img") : "IMG" == b.get(0).nodeName.toUpperCase() && ($element = b), $element.bind("load", function() {
				$(this).removeAttr("style");
				var b = $(this).parent("li").width(),
					c = $(this).parent("li").height();
				a.file && (a.file.shape = {
					width: $(this).width(),
					height: $(this).height()
				}), this.width <= b && this.height <= c ? (this.style.top = "50%", this.style.marginTop = "-" + this.height / 2 + "px", this.style.left = "50%", this.style.marginLeft = "-" + this.width / 2 + "px") : this.width > this.height ? (this.style.width = b + "px", this.height = this.height * b / this.width, this.style.top = "50%", this.style.marginTop = "-" + this.height / 2 + "px") : (this.style.height = c + "px", this.width = this.width * c / this.height, this.style.left = "50%", this.style.marginLeft = "-" + this.width / 2 + "px")
			}))
		}
	}
}]);