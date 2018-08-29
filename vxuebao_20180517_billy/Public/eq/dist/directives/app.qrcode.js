angular.module("app.directives.qrcode", []).directive("qrCode", function() {
	return {
		restrict: "A",
		scope: {
			qrUrl: "@"
		},
		link: function(a, b, c) {
			a.$watch("qrUrl", function(a, c) {
				$("canvas", b).length > 0 && $("canvas", b).remove(), a && (a = a.replace(PREFIX_HOST, PREFIX_HOST_ARRAY[parseInt(10 * Math.random(), 10) % 4]), $(b).qrcode({
					render: "canvas",
					width: 180,
					height: 180,
					text: a + (/\?/.test(a) ? "&" : "?") + "eqrcode=1"
				}))
			})
		}
	}
}).directive("qrCodeSize", function() {
	return {
		restrict: "A",
		scope: {
			qrUrl: "@"
		},
		link: function(a, b, c) {
			var d = parseInt(c.qrCodeSize, 10);
			a.$watch("qrUrl", function(a, c) {
				$("canvas", b).length > 0 && $("canvas", b).remove(), a && (a = a.replace(PREFIX_HOST, PREFIX_HOST_ARRAY[parseInt(10 * Math.random(), 10) % 4]), $(b).qrcode({
					render: "canvas",
					width: d,
					height: d,
					text: a + (/\?/.test(a) ? "&" : "?") + "eqrcode=1"
				}))
			})
		}
	}
}).directive("downloadCanvas", function() {
	return {
		restrict: "EA",
		link: function(a, b, c) {
			a.$on("download.canvas", function(c, d) {
				var e;
				$.each($(b).find(".qr-size"), function(a, b) {
					$(b).attr("qr-code-size") == d && (e = $(b).find("canvas").get(0))
				}), d == $(b).find(".qr-size").attr("qrCodeSize") && console.log(d);
				var f = document.createElement("a"),
					g = document.createEvent("MouseEvents"),
					h = e.toDataURL("image/png");
				g.initEvent("click", !0, !0), f.download = a.scene.code + ".png", f.href = h, f.dispatchEvent(g)
			})
		}
	}
});