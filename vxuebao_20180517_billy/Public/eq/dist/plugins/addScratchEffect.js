!function() {
	function b(b, e, f, g, h) {
		function i() {
			timeout = setTimeout(function() {
				nums >= 300 * f && (console.log(f), $(e).fadeOut(500, function() {
					setTimeout(function() {
						$(e).removeClass("lock").addClass("unlock")
					}, 500), $("#audio_btn").css("opacity", 1), 1 == g && playVideo(c)
				}), nums = 0)
			}, d)
		}
		var j = "ontouchstart" in window ? !0 : !1,
			k = j ? "touchstart" : "mousedown",
			l = j ? "touchmove" : "mousemove",
			m = j ? "touchend" : "mouseup";
		b.lineCap = "round", b.lineJoin = "round", b.lineWidth = 2 * a, b.globalCompositeOperation = "destination-out";
		new RegExp("assets");
		e.addEventListener(k, function(a) {
			function c(a) {
				i(), nums++, a.preventDefault(), x2 = j ? a.targetTouches[0].pageX : a.pageX - $("#can" + g).offset().left, y2 = j ? a.targetTouches[0].pageY : a.pageY - $("#can" + g).offset().top, b.moveTo(x1, y1), b.lineTo(x2, y2), b.stroke(), x1 = x2, y1 = y2
			}
			$("#tip" + g).remove(), a.preventDefault(), x1 = j ? a.targetTouches[0].pageX : a.pageX - $("#can" + g).offset().left, y1 = j ? a.targetTouches[0].pageY : a.pageY - $("#can" + g).offset().top, startX = x1, startY = y1, e.addEventListener(l, c), e.addEventListener(m, function() {
				e.removeEventListener(l, c)
			})
		})
	}
	var c, d = 200;
	window.addScratchEffect = function(d, e, f) {
		pageInfo = e, c = d, a = 20, nums = 0;
		var g, h = $(".m-img").width(),
			i = $(".m-img").height(),
			j = document.createElement("canvas");
		$(j).prependTo("#page" + f).attr("class", "cas scratch-cas page_effect lock").attr("id", "can" + f).attr("style", "z-index: 1000");
		var k = j.getContext("2d");
		j.width = h, j.height = i;
		var l = new Image;
		if (e[f - 1].properties.image) {
			if (num = f, e[f - 1].properties.tip) {
				var m = document.createElement("div");
				$(m).attr("id", "tip" + f).attr("class", "tip").prependTo("#page" + f), $(m).html(e[f - 1].properties.tip)
			}
			l.src = e[f - 1].properties.image.path, g = e[f - 1].properties.percentage.value
		} else if (e[f - 1].properties.scratch) {
			if (num = f, e[f - 1].properties.scratch.tip) {
				var m = document.createElement("div");
				$(m).attr("id", "tip" + f).attr("class", "tip").prependTo("#page" + f), $(m).html(e[f - 1].properties.scratch.tip)
			}
			l.src = e[f - 1].properties.scratch.image.path, g = e[f - 1].properties.scratch.percentage.value || e[f - 1].properties.scratch.percentage
		}!
		function(a, c, d, f, g) {
			a.onload = function() {
				e[f - 1].properties.image || !e[f - 1].properties.scratch.hasOwnProperty("opacity") ? c.globalAlpha = .8 : c.globalAlpha = 1 - parseFloat(e[f - 1].properties.scratch.opacity).toFixed(2), c.drawImage(this, 0, 0, d.width, d.height), renderPage(eqShow, f, pageInfo);
				for (var h = 0; h < pageInfo[f - 1].elements.length; h++) {
					var i = eqShow.selectElement(pageInfo[f - 1].elements[h].id);
					eqxCommon.bindTrigger(i, pageInfo[f - 1].elements[h])
				}
				b(c, d, g, f, a)
			}
		}(l, k, j, f, g)
	}
}();