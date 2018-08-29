!function() {
	var a = "ontouchstart" in window ? !0 : !1,
		b = a ? "touchstart" : "mousedown",
		c = a ? "touchmove" : "mousemove",
		d = a ? "touchend" : "mouseup";
	window.money = {
		doEffect: function(e, f, g, h) {
			function i() {
				A = 9, B = 0, C = 0, E.onload = function() {
					K = E.width, M = E.height, I.drawImage(E, H.width / 2 - K / 2, 250)
				}, E.width || (K = 200, M = 408), F.onload = function() {
					if (I.drawImage(F, 0, 0, H.width, H.height), !D) {
						h(eqShow, f, g);
						for (var a = 0; a < g[f - 1].elements.length; a++) {
							var b = eqShow.selectElement(g[f - 1].elements[a].id);
							eqxCommon.bindTrigger(b, g[f - 1].elements[a])
						}
					}
					p("开始"), q(0), l(), k(), j(g[f - 1].properties.effect.tip)
				}
			}
			function j(a) {
				I.font = "20px Arial", I.textAlign = "center", I.fillStyle = "#FDE528", I.fillText(a, H.width / 2, 50)
			}
			function k() {
				I.fillStyle = "rgba(0, 0, 0, 0.8)", I.fillRect(H.width / 2 - K / 2 + 5, H.height - 85, K - 10, 80), I.stroke(), I.font = "16px Arial", I.textAlign = "center", I.fillStyle = "#FDE528", I.fillText("点击屏幕，开始数钱", H.width / 2, H.height - 35)
			}
			function l() {
				H.addEventListener(b, function(b) {
					C++, 1 == C && m(), v && (clearInterval(v), u.y - L < -320 && (L = 0)), J = !0;
					var c = a ? b.targetTouches[0].pageX : b.pageX,
						d = a ? b.targetTouches[0].pageY : b.pageY;
					u = n(H, c, d), w = u.x, x = u.y
				}), H.addEventListener(c, function(b) {
					var c = a ? b.targetTouches[0].pageX : b.pageX,
						d = a ? b.targetTouches[0].pageY : b.pageY;
					u = n(H, c, d), y = u.x - w, z = u.y - x, J && (I.drawImage(G, H.width / 2 - K / 2, u.y), -20 > z ? (v = setInterval(o, 40), B += 100, J = !1) : (I.clearRect(0, 0, H.width, H.height), I.drawImage(F, 0, 0, H.width, H.height), I.drawImage(E, H.width / 2 - K / 2, 250), G.onload = function() {
						I.drawImage(G, H.width / 2 - K / 2, u.y), p(A), q(B)
					}))
				}), H.addEventListener(d, function(a) {
					w = 0, x = 0, J && (J = !1, v && (clearInterval(v), L = 0, fy = 0), -20 > z || (I.clearRect(0, 0, H.width, H.height), I.drawImage(F, 0, 0, H.width, H.height), I.drawImage(E, H.width / 2 - K / 2, 250), p(A), q(B)))
				})
			}
			function m() {
				var a = setInterval(function() {
					A--, p(A), 0 >= A && (clearInterval(a), $(H).unbind(b), t())
				}, 1e3)
			}
			function n(a, b, c) {
				var d = a.getBoundingClientRect();
				return {
					x: b - d.left,
					y: c - d.top
				}
			}
			function o() {
				I.clearRect(0, 0, H.width, H.height), I.drawImage(F, 0, 0, H.width, H.height), I.drawImage(E, H.width / 2 - K / 2, 250), I.drawImage(G, H.width / 2 - K / 2, u.y - L), p(A), q(B), L += 150
			}
			function p(a) {
				var b = I.createLinearGradient(H.width / 2 - 90, 50, H.width / 2 - 90, 120);
				b.addColorStop(0, "#F3AE28"), b.addColorStop(.5, "#FDE528"), b.addColorStop(1, "#F3AE28"), I.fillStyle = b, I.fillRect(H.width / 2 - 80, 90, 160, 40), I.stroke(), I.font = "30px Arial", I.textAlign = "center", I.fillStyle = "#ff0000", isNaN(a) ? I.fillText(a, H.width / 2, 120) : I.fillText(a + "秒", H.width / 2, 120)
			}
			function q(a) {
				I.fillStyle = "#FFF", I.roundRect(H.width / 2 - 120, 160, 240, 60, 10).stroke(), I.font = "30px Arial", I.textAlign = "center", I.fillStyle = "#FDE528", I.fillText("?? " + a, H.width / 2, 205)
			}
			function r() {
				$("#mask_" + f).remove(), $("#alert_" + f).remove(), D = !0, i()
			}
			function s() {
				$("#mask_" + f).remove(), $("#alert_" + f).remove(), $("#money_" + f).removeClass("lock").addClass("unlock").css("display", "none"), $("#page" + f).empty(), h(eqShow, f, g), $("#audio_btn").css("opacity", 1), 1 == f && playVideo(e);
				for (var a = 0; a < g[f - 1].elements.length; a++) {
					var b = eqShow.selectElement(g[f - 1].elements[a].id);
					eqxCommon.bindTrigger(b, g[f - 1].elements[a])
				}
			}
			function t() {
				$('<div class="money_mask"></div>').appendTo($("#page" + f)).attr("id", "mask_" + f), $('<div class="money_modal"></div>').appendTo($("#page" + f)).attr("id", "alert_" + f), $('<div class="money_img"></div>').appendTo($("#alert_" + f)).attr("id", "img_" + f), $('<div class="money_text">恭喜你！<br>2015年每天赚' + B + "元！</div>").appendTo($("#alert_" + f)).attr("id", "text_" + f), $('<a class="button tryOnce">再来一次</a>').appendTo($("#alert_" + f)).attr("id", "try_" + f), $('<a class="button enterScene">进入微课</a>').appendTo($("#alert_" + f)).attr("id", "enter_" + f);
				var a = "标准屌丝";
				B >= 5500 && 12e3 >= B ? a = "初级土豪" : B > 12e3 && (a = "高级土豪"), $('<div class="level_text">' + a + "</div>").appendTo("#alert_" + f), $('<div class="tip-text">仅供娱乐</div>').appendTo("#alert_" + f), $("#try_" + f).on("click", function() {
					r()
				}), $("#enter_" + f).on("click", function() {
					s()
				})
			}
			$('<canvas class="money page_effect lock"></canvas>').prependTo($("#page" + f)).attr("id", "money_" + f);
			var u, v, w, x, y, z, A, B, C, D, E, F, G, H = document.getElementById("money_" + f),
				I = H.getContext("2d"),
				J = !1,
				K = 0,
				L = 0,
				M = 0;
			return H.width = $(".z-current").width(), H.height = $(".z-current").height(), E = new Image, E.src = CLIENT_CDN + "assets/images/money/moremoney.png", F = new Image, F.src = CLIENT_CDN + "assets/images/money/moneybg.png", G = new Image, G.src = CLIENT_CDN + "assets/images/money/flymoney.png", i(), window.money
		}
	}, CanvasRenderingContext2D.prototype.roundRect = function(a, b, c, d, e) {
		return 2 * e > c && (e = c / 2), 2 * e > d && (e = d / 2), this.beginPath(), this.moveTo(a + e, b), this.strokeStyle = "#FDE528", this.arcTo(a + c, b, a + c, b + d, e), this.arcTo(a + c, b + d, a, b + d, e), this.arcTo(a, b + d, a, b, e), this.arcTo(a, b, a + c, b, e), this.closePath(), this.fillStyle = "#FDE528", this
	}
}();