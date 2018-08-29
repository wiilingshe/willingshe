angular.module("app.directives.copyButton", []).directive("copyButton", ["$translate", function(a) {
	return {
		restrict: "EA",
		scope: {
			url: "@"
		},
		link: function(a, b, c) {
			if("function" == typeof define && define.amd){
				require(["ZeroClipboard"],function(ZeroClipboard){
					var d = new ZeroClipboard(b);
					d.on("copy", function(a) {
						var b = a.clipboardData;
						b.setData("text/plain", c.url.replace(PREFIX_HOST, PREFIX_HOST_ARRAY[parseInt(10 * Math.random(), 10) % 4]))
					}), d.on("ready", function(a) {
						d.on("aftercopy", function(a) {
							alert("复制成功")
						})
					})
				});
			} else {
				var d = new ZeroClipboard(b);
				d.on("copy", function(a) {
					var b = a.clipboardData;
					b.setData("text/plain", c.url.replace(PREFIX_HOST, PREFIX_HOST_ARRAY[parseInt(10 * Math.random(), 10) % 4]))
				}), d.on("ready", function(a) {
					d.on("aftercopy", function(a) {
						alert("复制成功")
					})
				})
			}
			
		}
	}
}]);