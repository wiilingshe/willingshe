angular.module("scene.create.hoverElement", []).directive("hoverElement", ["$translate", function(a) {
	function b(a, b, d) {
		var e;
		$blinkElement = $('<div class="blink-element"></div>');
		var f = $("#inside_" + a.id);
		"4" == f.attr("ctype") ? $("#tip_" + a.id).html("图片") : "2" == f.attr("ctype") ? $("#tip_" + a.id).html("文字") : "3" == f.attr("ctype") ? $("#tip_" + a.id).html("随机图片") : "h" == f.attr("ctype") ? $("#tip_" + a.id).html("形状") : "x" == f.attr("ctype") && $("#tip_" + a.id).html("多字体"), b.hover(function(b) {
			c = $("#inside_" + a.id), c.find(".blink-element").length || $blinkElement.appendTo(c), e = setInterval(function() {
				$blinkElement.toggleClass("red-border")
			}, 1e3)
		}, function(a) {
			$blinkElement.remove(), clearInterval(e)
		})
	}
	var c;
	return {
		restrict: "EA",
		scope: {
			id: "="
		},
		link: b
	}
}]);