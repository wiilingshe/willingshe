!function(a, b) {
	a.completeEffect = function(a) {
		return a.find(".lock").get(0) ? !1 : !0
	}
}(window, jQuery);
!function(a, b) {
	function c(a, c) {
		completeEffect(b(".z-current")) && (E = "started", D.length || (D = n.find(".main-page")), c || (B ? (a = event, q = {
			x: a.touches[0].pageX - n.offset().left,
			y: a.touches[0].pageY - n.offset().top
		}) : q = {
			x: a.pageX - n.offset().left,
			y: a.pageY - n.offset().top
		}))
	}
	function d(a, c) {
		if (E = "turning", W && W.obj.property.autoFlip && W.obj.property.autoFlipTime && m(), c || (B ? (a = event, r = {
			x: a.touches[0].pageX - n.offset().left,
			y: a.touches[0].pageY - n.offset().top
		}) : r = {
			x: a.pageX - n.offset().left,
			y: a.pageY - n.offset().top
		}), s = r.x - q.x, 0 > s) {
			if (x) {
				x = !1, B && p ? v = !0 : q.y >= n.height() / 2 ? t = !0 : q.y < n.height() / 2 && (u = !0), y = b(".z-current").get(0);
				var d = b(y).find(".m-img").attr("id").substring(4);
				if (o = b("#flip" + d), Z || (z = b(y).parent(".flip-mask").get(0).nextElementSibling && b(b(y).parent(".flip-mask").get(0).nextElementSibling).find(".main-page").get(0) ? b(b(y).parent(".flip-mask").get(0).nextElementSibling).find(".main-page").get(0) : A ? D.first().get(0) : !1), z) {
					b(z).find(".m-img").attr("id").substring(4);
					b(y).parent(".flip-mask").css({
						zIndex: 100,
						display: "block"
					}), b(z).addClass("z-active").parent(".flip-mask").css({
						zIndex: 99,
						display: "block"
					}), i(z), completeEffect(b(z)) || b("#audio_btn").css("opacity", 0), t ? (b(".z-current").css({
						top: o.height() - n.height() + "px",
						left: "0"
					}), o.css({
						top: "-" + (o.height() - n.height()) + "px"
					}), b(".turning").css({
						transformOrigin: "0% 100% 0px",
						left: n.width() + "px",
						top: n.height() + "px"
					})) : u ? b(".turning").css({
						top: "0",
						left: n.width() + "px",
						transformOrigin: "0% 0% 0px"
					}) : v && (b(".z-current").css({
						top: 0,
						left: b(this).width() - n.width() + "px"
					}), o.css({
						top: 0,
						left: -(o.width() - n.width()) + "px"
					}), b(".turning").css({
						transformOrigin: "0% 100% 0px",
						left: n.width() + "px",
						top: 0
					}))
				}
			}
		} else if (s > 0 && x) {
			x = !1, w = !0, y = b(".z-current").get(0);
			var d = b(y).find(".m-img").attr("id").substr(4);
			o = b("#flip" + d), Z || (z = b(y).parent(".flip-mask").get(0).previousElementSibling && b(b(y).parent(".flip-mask").get(0).previousElementSibling).find(".main-page").get(0) ? b(b(y).parent(".flip-mask").get(0).previousElementSibling).find(".main-page").get(0) : A ? D.last().get(0) : !1), z && (i(z), completeEffect(b(z)) || b("#audio_btn").css("opacity", 0), b(y).parent(".flip-mask").css({
				display: "block"
			}), b(z).addClass("z-active").parent(".flip-mask").css({
				zIndex: 99,
				display: "block"
			}), b(".turning").css({
				top: "0",
				left: "0",
				transformOrigin: "0% 0% 0px"
			}))
		}
		z && f(r)
	}
	function e(a, b) {
		if (!z) return E = "feeling", t = !1, u = !1, v = !1, w = !1, void(x = !0);
		E = "leaving";
		var c, d, e, g;
		b ? (c = a.x, d = a.y) : B ? (c = r.x - n.offset().left, d = r.y - n.offset().top) : (c = a.pageX - n.offset().left, d = a.pageY - n.offset().top), t ? (F = 16, e = -n.width(), g = n.height(), C = setInterval(function() {
			c = F >= c - e ? c : c - F, d = F >= g - d ? d : d + F, f({
				x: c,
				y: d
			}), F >= c - e && F >= g - d && (clearInterval(C), h())
		}, 10)) : u ? (F = 16, e = -n.width(), g = 0, C = setInterval(function() {
			c = F >= c - e ? c : c - F, d = F >= d - g ? d : d - F, f({
				x: c,
				y: d
			}), F >= c - e && F >= d - g && (clearInterval(C), h())
		}, 1)) : v ? (F = 5, e = -n.width(), C = setInterval(function() {
			c = F >= c - e ? c : c - F, f({
				x: c,
				y: d
			}), F >= c - e && (clearInterval(C), h())
		}, 1)) : w && (F = 3, e = n.width(), g = 0, C = setInterval(function() {
			c = F >= e - c ? c : c + F, f({
				x: c,
				y: d
			}), F >= e - c && (clearInterval(C), h())
		}, 1))
	}
	function f(a) {
		t || u ? (H = n.width() - a.x, t ? I = Math.abs(n.height() - a.y) : u && (I = a.y), J = I / H, K = I / Math.sqrt(H * H + I * I), L = Math.sqrt(1 - K * K), M = Math.sqrt(H * H + I * I) / 2, N = M * J, O = Math.sqrt(N * N + M * M), P = O / J, G = 180 * Math.atan(J) / Math.PI > 0 ? 180 * Math.atan(J) / Math.PI : 0, Q = (n.width() - O) * L, R = (n.width() - O) * K * L, S = (n.width() - O) * (1 - K * K), Q >= 1 && (t ? (G > 1 ? b(".turning").css({
			width: O + "px",
			height: P + "px",
			backgroundColor: "#ff0000",
			background: "-webkit-linear-gradient(" + (180 - G) + "deg, #fff 10%, #d1cfc7 40%, #f2eee2 50%, transparent 50%, transparent 100%)",
			transform: "translateX(-" + (O - 3) + "px) translateY(-" + (P - 3) + "px) rotate(" + 2 * G + "deg) scaleX(-1)"
		}) : g(a), T = "0% 100% 0px", U = "rotate(-" + (90 - G) + "deg) translateY(" + Q + "px)", V = "rotate(" + (90 - G) + "deg) translateY(-" + R + "px) translateX(-" + S + "px)") : u && (G > 1 ? b(".turning").css({
			width: O + "px",
			height: P + "px",
			backgroundColor: "#000",
			background: "-webkit-linear-gradient(-" + (180 - G) + "deg, #fff 10%, #d1cfc7 40%, #f2eee2 50%, transparent 50%, transparent 100%)",
			transform: "translateX(-" + (O - 2) + "px) rotate(-" + 2 * G + "deg) scaleX(-1)"
		}) : g(a), T = "0% 0% 0px", U = "rotate(" + (90 - G) + "deg) translateY(-" + Q + "px)", V = "rotate(-" + (90 - G) + "deg) translateY(" + R + "px) translateX(-" + S + "px)"), o.css({
			zIndex: 100,
			transformOrigin: T,
			transform: U
		}), b(z).parent(".flip-mask").css({
			zIndex: 99,
			display: "block"
		}), b(z).css({
			zIndex: 1e3
		}), b(y).css({
			transformOrigin: T,
			transform: V
		}))) : v ? (b(".turning").css({
			width: (n.width() - a.x) / 2 + "px",
			height: n.height() + "px",
			left: a.x + "px",
			background: "-webkit-linear-gradient(left, #fff 0% , #d1cfc7 15%, #f2eee2 85%, #fff 100%)"
		}), o.css({
			transformOrigin: "0% 50% 0px",
			left: 0,
			transform: "translateX(-" + (o.width() - a.x) + "px)"
		}), b(y).css({
			transformOrigin: "0% 50% 0px",
			transform: "translateX(" + (o.width() - a.x) + "px)"
		})) : w && (o.css({
			zIndex: 100,
			transformOrigin: "0% 50% 0px",
			transform: "translateX(" + a.x + "px)"
		}), b(y).css({
			transformOrigin: "0% 50% 0px",
			transform: "translateX(-" + a.x + "px)"
		}), b(".turning").css({
			width: n.width() - a.x + "px",
			height: n.height() + "px",
			left: -(n.width() - 2 * a.x) + "px",
			background: "-webkit-linear-gradient(left, #fff 0% , #d1cfc7 15%, #f2eee2 85%, #fff 100%)"
		}))
	}
	function g(a) {
		b(".turning").css({
			width: (n.width() - a.x + 6) / 2 + "px",
			height: n.height() + "px",
			top: 0,
			left: a.x + 2 + "px",
			background: "-webkit-linear-gradient(left, #fff 0% , #d1cfc7 10%, #f2eee2 90%, #fff 100%)",
			transform: "",
			border: 0
		})
	}
	function h() {
		var a = W.list;
		W.obj.property.autoFlip && W.obj.property.autoFlipTime && l(), utilSound.pause();
		var c = b("#report0");
		c.length && c.remove(), E = "feeling", t = !1, u = !1, v = !1, w = !1, x = !0, s = 0, b(".flip-mask").css({
			transform: "",
			top: 0,
			left: 0,
			zIndex: 0
		}), b(y).removeClass("z-current").css({
			transform: "",
			top: 0,
			left: 0
		}), b(z).removeClass("z-active").addClass("z-current").css({
			transform: ""
		}), b(".turning").css({
			width: 0,
			height: 0,
			top: 0,
			left: 0,
			transform: "",
			background: "none"
		}), y = z;
		var d = b(z).find(".m-img").attr("id").substring(4);
		b("#flip" + d).css({
			zIndex: 100
		}), b("#audio_btn").css("opacity", 1), z = null;
		var e = b(y).find(".m-img").attr("id").substring(4);
		a[e - 1].elements && a[e - 1].elements.length && b.each(a[e - 1].elements, function(a, c) {
			"d" == c.type && eqShow.getShowCount(W.obj.id).then(function(a) {
				var d = eqShow.fixedNum(a);
				b("#" + c.id).find(".counter-number").text(d)
			})
		}), $ || eqShow.showProgressBar(W, b("#nr").find(".main-page")), $ = !0
	}
	function i(a) {
		if (a) {
			var c = b(a).find(".m-img").attr("id").substring(4);
			b(a).find("li").each(function(a) {
				for (var d = 0; d < W.list[c - 1].elements.length; d++) W.list[c - 1].elements[d].id == parseInt(b(this).attr("id").substring(7), 10) && eqxCommon.animation(b(this), W.list[c - 1].elements[d], "view")
			})
		}
	}
	function j() {
		"turning" != E && "leaving" != E && (q = {
			x: 0,
			y: n.height()
		}, c(q, "mock"), E = "turning", b(".main-page").css({
			width: n.width() + "px",
			height: n.height() + "px"
		}), r = {
			x: 0,
			y: n.height()
		}, w = !0, C = setInterval(function() {
			r.x++, d(r, "mock"), r.x <= 250 && (clearInterval(C), e(r, "mock"))
		}, 1))
	}
	function k() {
		"turning" != E && "leaving" != E && (q = {
			x: n.width(),
			y: n.height()
		}, c(q, "mock"), E = "turning", b(".main-page").css({
			width: n.width() + "px",
			height: n.height() + "px"
		}), r = {
			x: n.width(),
			y: n.height()
		}, B && p ? v = !0 : t = !0, Y = setInterval(function() {
			r.x -= 5, r.y -= 5, d(r, "mock"), r.x <= 200 && (clearInterval(Y), e(r, "mock"), A || z || m())
		}, 1))
	}
	function l() {
		_ = setInterval(function() {
			return completeEffect(b(".z-current")) ? void k() : void m()
		}, 1e3 * X)
	}
	function m() {
		clearInterval(_)
	}
	var n = b(".nr"),
		o = null,
		p = isAndroid(),
		q = {},
		r = {},
		s = 0,
		t = !1,
		u = !1,
		v = !1,
		w = !1,
		x = !0,
		y = null,
		z = null,
		A = !1,
		B = mobilecheck(),
		C = null,
		D = [],
		E = "feeling",
		F = 0,
		G = 0,
		H = 0,
		I = 0,
		J = 0,
		K = 0,
		L = 0,
		M = 0,
		N = 0,
		O = 0,
		P = 0,
		Q = 0,
		R = 0,
		S = 0,
		T = 0,
		U = 0,
		V = 0,
		W = null,
		X = 0,
		Y = "",
		Z = !1;
	a.turnBook = function(a) {
		W = a, W.obj.property.autoFlip && W.obj.property.autoFlipTime && (X = W.obj.property.autoFlipTime, l()), A = W.obj.property.triggerLoop, b('<div class="turning"></div>').appendTo(".nr"), b(".main-page").css({
			width: b(".nr").width() + "px",
			height: b(".nr").height() + "px"
		}), n.on(B ? "touchstart" : "mousedown", function(a) {
			"feeling" == E && (c(a), b(".main-page").css({
				width: n.width() + "px",
				height: n.height() + "px"
			}))
		}).on(B ? "touchmove" : "mousemove", function(a) {
			("started" == E || "turning" == E) && d(a)
		}).on(B ? "touchend" : "mouseup mouseleave", function(a) {
			return Z = !1, b(".z-current").get(0) ? 0 == s ? (x = !0, void(E = "feeling")) : void("turning" == E && e(a)) : void 0
		})
	};
	var $ = !1;
	a.flipBookScroll = function(a) {
		Z = !0;
		for (var c, d = 0, e = W.list.length; e > d; d++) a == W.list[d].id && (c = W.list[d].num);
		c || (c = a), y = b(".z-current").get(0);
		var f = b(y).find(".m-img").attr("id").substring(4),
			g = b(y).parent(".flip-mask").siblings(".flip-mask").find(".main-page").find("#page" + c);
		g && (z = b(g).parent(".main-page").get(0), f > c ? j() : c > f && k())
	}, b(document).on("bookFlipPre", function(a) {
		j()
	}), b(document).on("bookFlipNext", function(a) {
		k()
	});
}(window, jQuery);