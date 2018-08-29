window.eqxiu = function() {
	function a(a) {
		if ("10" != m._scrollMode) {
			B = !0;
			for (var d, e = 0, f = m._pageData.length; f > e; e++) a == m._pageData[e].id && (d = m._pageData[e].num);
			d || (d = a);
			var g = $(m.$currentPage).find(".m-img").attr("id").substring(4),
				h = $(m.$currentPage).siblings(".main-page").find("#page" + d);
			if (!h) return;
			m.$activePage = $(h).parent(".main-page").get(0), g > d ? b() : d > g && c()
		} else flipBookScroll(a)
	}
	function b(a) {
		if (!(v && 2 == a || w && 1 == a)) if ("10" != m._scrollMode) {
			var b = 0;
			n();
			var c = setInterval(function() {
				b += 2, "0" == m._scrollMode || "1" == m._scrollMode || "2" == m._scrollMode || "6" == m._scrollMode || "7" == m._scrollMode || "8" == m._scrollMode || "11" == m._scrollMode || "12" == m._scrollMode ? H = b : ("3" == m._scrollMode || "4" == m._scrollMode || "5" == m._scrollMode || "9" == m._scrollMode) && (G = b), o(), b >= 21 && (clearInterval(c), p())
			}, 1)
		} else $(document).trigger("bookFlipPre")
	}
	function c(a) {
		if (!(v && 2 == a || w && 1 == a)) if ("10" != m._scrollMode) {
			t = !1;
			var b = 0;
			n();
			var c = setInterval(function() {
				b -= 2, "0" == m._scrollMode || "1" == m._scrollMode || "2" == m._scrollMode || "6" == m._scrollMode || "7" == m._scrollMode || "8" == m._scrollMode || "11" == m._scrollMode || "12" == m._scrollMode ? H = b : ("3" == m._scrollMode || "4" == m._scrollMode || "5" == m._scrollMode || "9" == m._scrollMode) && (G = b), o(), -21 >= b && (clearInterval(c), p(), A || m.$activePage || clearInterval(y))
			}, 1)
		} else $(document).trigger("bookFlipNext")
	}
	function d() {
		y = setInterval(function() {
			"10" != m._scrollMode && c()
		}, u)
	}
	function e() {
		clearInterval(y)
	}
	function f() {
		m.$activePage = m._$pages.last().get(0), m._$pages.parent().find(".z-current").removeClass("z-current"), m._$pages.last().addClass("z-current")
	}
	function g(a) {
		a ? m._$pages.last().prev().remove() : m._$pages.last().remove()
	}
	function h(a) {
		m._scrollMode = a, q = a, _scrollMode = a
	}
	function i(a) {
		u = 1e3 * a, e(), d()
	}
	function j() {
		m._$pages = m._$app.find(".main-page")
	}
	function f(a) {
		m._$pages.parent().find(".z-current").removeClass("z-current"), a ? (m.$activePage = m._$pages.last().prev().get(0), m._$pages.last().prev().addClass("z-current")) : (m.$activePage = m._$pages.last().get(0), m._$pages.last().addClass("z-current"))
	}
	function k(a) {
		m._pageData = a
	}
	function l(a) {
		A = a
	}
	var m, n, o, p, q, r, s, t, u, v, w, x, y, z = $(window),
		A = !1,
		B = !1,
		C = mobilecheck(),
		D = tabletCheck(),
		E = 0,
		F = 0,
		G = 0,
		H = 0,
		I = !1,
		J = !1,
		K = !0,
		L = 500,
		M = .4,
		N = function(a, b, c, e) {
			function f(a, b, c) {
				for (var d = ["", "webkit", "moz"], e = 0, f = d.length; f > e; e++) {
					0 != e || mobilecheck() || (b = b.substring(0, 1).toLowerCase() + b.substring(1, b.length));
					var g = c instanceof Array ? c[e] : c,
						h = d[e] + b;
					a[h] = g
				}
			}
			function g(a, b, c) {
				for (var d = ["", "-webkit-", "-moz-"], e = 0; e < d.length; e++) a.css(d[e] + b, c)
			}
			function h(a) {
				var b;
				return b = $("#inside_" + a, ".phone-view").length ? $("#inside_" + a, ".phone-view") : $("#inside_" + a)
			}
			function i() {
				m._isDisableFlipPage = !0;
				var a;
				"0" == b || "1" == b || "2" == b || "6" == b || "9" == b || "11" == b || "12" == b ? (a = H > 0 ? -s : s, g($(m.$activePage), "transform", "translateY(" + a + "px)"), g($(m.$currentPage), "transform", "translateY(0) scale(1)")) : ("3" == b || "5" == b) && (a = G > 0 ? -r : r, g($(m.$activePage), "transform", "translateX(" + a + "px)"), g($(m.$currentPage), "transform", "translateX(0) scale(1)")), setTimeout(function() {
					$(m.$currentPage).attr("style", ""), $(m.$activePage).attr("style", ""), $(m.$activePage).removeClass("z-active z-move"), m._isDisableFlipPage = !1
				}, 500)
			}
			function j() {
				if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) if (H > 0) {
					if (m._isDisableFlipPrevPage) return;
					J || K ? (J = !1, K = !1, Z(!0), _(!0, "bottom center", "translateY", s)) : aa(!0, "translateY", s, H, m._scrollMode)
				} else if (0 > H) {
					if (m._isDisableFlipNextPage) return;
					!J || K ? (J = !0, K = !1, Z(!1), _(!1, "top center", "translateY", s)) : aa(!1, "translateY", s, H, m._scrollMode)
				}
			}
			function k() {
				Math.abs(H) > Math.abs(G) && Math.abs(H) > 20 ? (ba("translateY", H, s, m._scrollMode), $(document).trigger("flipend")) : (m._isDisableFlipPage = !1, i())
			}
			function l() {
				if (Math.abs(G) > Math.abs(H) && completeEffect($(m.$currentPage))) if (G > 0) {
					if (m._isDisableFlipPrevPage) return;
					J || K ? (J = !1, K = !1, Z(!0), _(!0, "center right", "translateX", r)) : aa(!0, "translateX", r, G, m._scrollMode)
				} else if (0 > G) {
					if (m._isDisableFlipNextPage) return;
					!J || K ? (J = !0, K = !1, Z(!1), _(!1, "center left", "translateX", r)) : aa(!1, "translateX", r, G, m._scrollMode)
				}
			}
			function q() {
				Math.abs(G) > Math.abs(H) && Math.abs(G) > 20 ? (ba("translateX", G, r, m._scrollMode), $(document).trigger("flipend")) : (m._isDisableFlipPage = !1, i())
			}
			function t() {
				if (Math.abs(G) > Math.abs(H) && completeEffect($(m.$currentPage))) if (G > 0) {
					if (m._isDisableFlipPrevPage) return;
					J || K ? (J = !1, K = !1, Z(!0), r = C ? window.innerWidth : $(".nr").width(), _(!0, "", "translateX", r)) : aa(!0, "translateX", r, G, m._scrollMode)
				} else if (0 > G) {
					if (m._isDisableFlipNextPage) return;
					!J || K ? (J = !0, K = !1, Z(!1), r = C ? window.innerWidth : $(".nr").width(), _(!1, "", "translateX", r)) : aa(!1, "translateX", r, G, m._scrollMode)
				}
			}
			function y() {
				Math.abs(G) > Math.abs(H) && Math.abs(G) > 20 ? (ba("translateX", G, r, m._scrollMode), $(document).trigger("flipend")) : (m._isDisableFlipPage = !1, i())
			}
			function N() {
				if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) if (H > 0) {
					if (m._isDisableFlipPrevPage) return;
					J || K ? (J = !1, K = !1, Z(!0), s = C ? window.innerHeight : $(".nr").height(), _(!0, "", "translateY", s)) : aa(!0, "translateY", s, H, m._scrollMode)
				} else if (0 > H) {
					if (m._isDisableFlipNextPage) return;
					!J || K ? (J = !0, K = !1, Z(!1), s = C ? window.innerHeight : $(".nr").height(), _(!1, "", "translateY", s)) : aa(!1, "translateY", s, H, m._scrollMode)
				}
			}
			function O() {
				Math.abs(H) > Math.abs(G) && Math.abs(H) > 20 ? (ba("translateY", H, s, m._scrollMode), $(document).trigger("flipend")) : (m._isDisableFlipPage = !1, i())
			}
			function P() {
				if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) if (H > 0) {
					if (m._isDisableFlipNextPage) return;
					(!J || K) && (J = !0, K = !1, m.$activePage && $(m.$activePage).removeClass("z-move z-active"), Z(!0), f(m.$activePage.style, "Transform", "rotateX(90deg) translateY(-" + s / 2 + "px) translateZ(" + s / 2 + "px)"), f(ca.get(0).style, "Perspective", "700px"), f(ca.get(0).style, "TransformStyle", "preserve-3d")), m.$activePage && m.$activePage.classList.contains("main-page") && ($(m.$activePage).addClass("z-active z-move").trigger("active").css("zIndex", 1), f(m.$currentPage.style, "Transform", "rotateX(-" + H / s * 90 + "deg) translateY(" + H / 2 + "px) translateZ(" + H / 2 + "px)"), f(m.$activePage.style, "Transform", "rotateX(" + (90 - H / s * 90) + "deg) translateY(" + (-(s / 2) + H / 2) + "px) translateZ(" + (s / 2 - H / 2) + "px)"))
				} else if (0 > H) {
					if (m._isDisableFlipNextPage) return;
					(!J || K) && (J = !0, K = !1, m.$activePage && $(m.$activePage).removeClass("z-move z-active"), Z(!1), f(m.$activePage.style, "Transform", "rotateX(-90deg) translateY(-" + s / 2 + "px) translateZ(-" + s / 2 + "px)"), f(ca.get(0).style, "Perspective", "700px"), f(ca.get(0).style, "TransformStyle", "preserve-3d")), m.$activePage && m.$activePage.classList.contains("main-page") ? ($(m.$activePage).addClass("z-active z-move").trigger("active").css("zIndex", 0), f(m.$currentPage.style, "Transform", "rotateX(" + -H / s * 90 + "deg) translateY(" + H / 2 + "px) translateZ(" + -H / 2 + "px)"), f(m.$activePage.style, "Transform", "rotateX(" + (-90 - H / s * 90) + "deg) translateY(" + (s / 2 + H / 2) + "px) translateZ(" + (s / 2 + H / 2) + "px)")) : (f(m.$currentPage.style, "Transform", "translateX(0px) scale(1)"), m.$activePage = null)
				}
			}
			function Q() {
				Math.abs(H) > Math.abs(G) && Math.abs(H) > 20 ? (H > 0 ? f(m.$currentPage.style, "Transform", "rotateX(-90deg) translateY(" + s / 2 + "px) translateZ(" + s / 2 + "px)") : f(m.$currentPage.style, "Transform", "rotateX(90deg) translateY(-" + s / 2 + "px) translateZ(" + s / 2 + "px)"), f(m.$currentPage.style, "zIndex", "0"), f(m.$activePage.style, "Transform", "rotateX(0deg) translateY(0px) translateZ(0px)"), f(m.$activePage.style, "zIndex", "2"), $(document).trigger("flipend")) : (f(m.$currentPage.style, "Transition", "none"), f(m.$activePage.style, "Transition", "none"), m._isDisableFlipPage = !1, i())
			}
			function R() {
				if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) if (H > 0) {
					if (m._isDisableFlipNextPage) return;
					(!J || K) && (J = !0, K = !1, m.$activePage && $(m.$activePage).removeClass("z-move z-active"), Z(!0), g(ca, "perspective", "700px"), g(ca, "transform-style", "preserve-3d"), f(m.$activePage.style, "TransformOrigin", "top"), f(m.$activePage.style, "Transform", "rotateX(90deg)")), m.$activePage && m.$activePage.classList.contains("main-page") && ($(m.$activePage).addClass("z-active z-move").trigger("active"), f(m.$activePage.style, "Transform", "rotateX(" + (90 - H / s * 90) + "deg) "))
				} else if (0 > H) {
					if (m._isDisableFlipNextPage) return;
					(!J || K) && (J = !0, K = !1, m.$activePage && $(m.$activePage).removeClass("z-move z-active"), Z(!1), f(m.$activePage.style, "TransformOrigin", "bottom"), f(m.$activePage.style, "Transform", "rotateX(-90deg)"), g(ca, "perspective", "700px"), g(ca, "transform-style", "preserve-3d")), m.$activePage && m.$activePage.classList.contains("main-page") ? ($(m.$activePage).addClass("z-active z-move").trigger("active"), f(m.$activePage.style, "Transform", "rotateX(" + (-90 - H / s * 90) + "deg) ")) : (f(m.$currentPage.style, "Transform", "translateX(0px) scale(1)"), m.$activePage = null)
				}
			}
			function S() {
				Math.abs(H) > Math.abs(G) && Math.abs(H) > 20 ? (H > 0 ? f(m.$activePage.style, "Transform", "rotateX(0deg)") : f(m.$activePage.style, "Transform", "rotateX(0deg)"), $(document).trigger("flipend")) : (f(m.$currentPage.style, "Transition", "none"), f(m.$activePage.style, "Transition", "none"), m._isDisableFlipPage = !1, i())
			}
			function T() {
				if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) {
					if (H > 0) {
						if (m._isDisableFlipPrevPage) return;
						(J || K) && (J = !1, K = !1, m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move")), Z(!0), m.$activePage.style.zIndex = 2, m.$activePage && m.$activePage.classList.contains("main-page") && (m.$activePage.classList.add("z-active"), m.$activePage.classList.add("z-move")), m.$activePage.style.opacity = 0)
					} else if (0 > H) {
						if (m._isDisableFlipNextPage) return;
						(!J || K) && (J = !0, K = !1, m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move")), Z(!1), m.$activePage.style.zIndex = 2, m.$activePage && m.$activePage.classList.contains("main-page") && (m.$activePage.classList.add("z-active"), m.$activePage.classList.add("z-move")), m.$activePage.style.opacity = 0)
					}
					var a = Math.abs(H) / s * 1.3;
					m.$activePage.style.opacity = a.toFixed(1), a.toFixed(3) <= 1 && g($(m.$activePage), "transform", "scale(" + a.toFixed(3) + ")")
				}
			}
			function U() {
				Math.abs(H) > Math.abs(G) && Math.abs(H) > 20 ? (g($(m.$activePage), "transform", "scale(1)"), m.$activePage.style.opacity = 1, $(document).trigger("flipend")) : (f(m.$currentPage.style, "Transition", "none"), f(m.$activePage.style, "Transition", "none"), m._isDisableFlipPage = !1, i())
			}
			function V() {
				if (Math.abs(G) > Math.abs(H) && completeEffect($(m.$currentPage))) if (G > 0) {
					if (m._isDisableFlipPrevPage) return;
					J || K ? (J = !1, K = !1, m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move")), Z(!0), m.$activePage && m.$activePage.classList.contains("main-page") && (m.$activePage.classList.add("z-active"), m.$activePage.classList.add("z-move"), g($(m.$activePage), "Transform", "scale(0.3) translateX(0) translateZ(-" + s + "px) rotateY(45deg)"), m.$activePage.style.zIndex = "0"), g(ca, "perspective", "1000px"), m.$currentPage.style.zIndex = "100") : m.$activePage && (r / 4 >= G ? g($(m.$currentPage), "Transform", "translateX(" + G + "px)") : g($(m.$currentPage), "Transform", "translateX(" + 1.5 * G + "px) scale(" + ((5 * r / 4 - G) / r).toFixed(3) + ") rotateY(" + G / r * 45 + "deg) translateZ(-" + (G - r / 4) + "px)"))
				} else if (0 > G) {
					if (m._isDisableFlipNextPage) return;
					!J || K ? (J = !0, K = !1, m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move")), Z(!1), m.$activePage && m.$activePage.classList.contains("main-page") && (m.$activePage.classList.add("z-active"), m.$activePage.classList.add("z-move"), g($(m.$activePage), "Transform", "scale(0.3) translateX(" + (r + 300) + "px) translateZ(-" + s + "px) rotateY(-45deg)"), m.$activePage.style.zIndex = "0"), g(ca, "perspective", "1000px"), m.$currentPage.style.zIndex = "100") : m.$activePage && (G >= -r / 4 ? g($(m.$currentPage), "Transform", "translateX(" + G + "px)") : g($(m.$currentPage), "Transform", "translateX(" + 1.5 * G + "px) scale(" + ((5 * r / 4 + G) / r).toFixed(3) + ") rotateY(" + G / r * 45 + "deg) translateZ(" + (G + r / 4) + "px)"), g($(m.$activePage), "Transform", "scale(" + (.3 - (G + r / 4) / r).toFixed(3) + ") translateX(" + (-G - r / 4 + 200) + "px) translateZ(" + (-G - 3 * r / 4) + "px) rotateY(-" + (45 + (G + r / 4) / r * 45) + "deg)"))
				}
			}
			function W() {
				Math.abs(G) > Math.abs(H) && Math.abs(G) > 20 ? (G > 0 ? (m.$currentPage.style.webkitTransformOrigin = "left", m.$currentPage.style.webkitTransform = "translateX(0) translateZ(-" + s + "px) rotateY(0) scale(0.2)", m.$activePage.style.webkitTransform = "translateX(0) translateZ(0) rotateY(0) scale(1)", m.$currentPage.style.zIndex = "0", m.$activePage.style.zIndex = "1") : (m.$currentPage.style.webkitTransformOrigin = "right", m.$currentPage.style.webkitTransform = "translateX(" + r + "px) translateZ(-" + s + "px) rotateY(0) scale(0.2)", m.$activePage.style.webkitTransform = "translateX(0) translateZ(0) rotateY(0) scale(1)", m.$activePage.style.zIndex = "1", m.$currentPage.style.zIndex = "0"), $(document).trigger("flipend")) : (f(m.$currentPage.style, "Transition", "none"), f(m.$activePage.style, "Transition", "none"), m._isDisableFlipPage = !1, i())
			}
			function X() {
				if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) {
					if (H > 0) {
						if (m._isDisableFlipPrevPage) return;
						(J || K) && (J = !1, K = !1, m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move")), Z(!0), m.$activePage && m.$activePage.classList.contains("main-page") && ($(m.$activePage).addClass("z-active z-move"), $(m.$activePage).css({
							zIndex: 0,
							opacity: 1
						})), $(m.$currentPage).css({
							opacity: 1
						}), $(m.$activePage).css({
							zIndex: 0,
							opacity: 1
						}), g($(m.$activePage), "transform", "translateY(0)"), g($(m.$currentPage), "transform-origin", "0% 0% 0px"))
					} else if (0 > H) {
						if (m._isDisableFlipNextPage) return;
						(!J || K) && (J = !0, K = !1, m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move")), Z(!1), m.$activePage && m.$activePage.classList.contains("main-page") && (m.$activePage.classList.add("z-active"), m.$activePage.classList.add("z-move"), $(m.$activePage).css({
							zIndex: 0,
							opacity: 1
						})), $(m.$currentPage).css({
							opacity: 1
						}), $(m.$activePage).css({
							zIndex: 0,
							opacity: 1
						}), g($(m.$activePage), "transform", "translateY(0)"), g($(m.$currentPage), "transform-origin", "0% 0% 0px"))
					}
					m.$activePage && (g($(m.$currentPage), "transform-origin", "0% 0% 0px"), g($(m.$currentPage), "transform", "rotate(" + Math.abs(H) / s * 90 + "deg)"), m.$currentPage.style.opacity = ((s - Math.abs(H)) / s).toFixed(1))
				}
			}
			function Y() {
				Math.abs(H) > Math.abs(G) && Math.abs(H) > 20 ? (g($(m.$currentPage), "transform", "translateY(" + s + "px) rotate(" + Math.abs(H) / s * 90 + "deg)"), $(m.$currentPage).css({
					opacity: .5
				}), $(document).trigger("flipend")) : (f(m.$currentPage.style, "Transition", "none"), f(m.$activePage.style, "Transition", "none"), m._isDisableFlipPage = !1, i())
			}
			function Z(a) {
				B || (a ? m.$currentPage.previousElementSibling && m.$currentPage.previousElementSibling.classList.contains("main-page") ? m.$activePage = m.$currentPage.previousElementSibling : A ? m.$activePage = m._$pages.last().get(0) : m.$activePage = !1 : m.$currentPage.nextElementSibling && m.$currentPage.nextElementSibling.classList.contains("main-page") ? m.$activePage = m.$currentPage.nextElementSibling : A ? m.$activePage = m._$pages.first().get(0) : m.$activePage = !1)
			}
			function _(a, b, c, d) {
				if (m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move")), m.$activePage && m.$activePage.classList.contains("main-page")) {
					m.$activePage.classList.add("z-active"), m.$activePage.classList.add("z-move");
					var e = a ? "-" : "";
					m.$activePage.style.webkitTransition = "none", m.$activePage.style.webkitTransform = c + "(" + e + d + "px)", m.$activePage.style.mozTransition = "none", m.$activePage.style.mozTransform = c + "(" + e + d + "px)", m.$activePage.style.transition = "none", m.$activePage.style.transform = c + "(" + e + d + "px)", $(m.$activePage).trigger("active"), b && g($(m.$currentPage), "transform-origin", b)
				} else f(m.$currentPage.style, "Transform", c + "(0px) scale(1)")
			}
			function aa(a, b, c, d, e) {
				if (m.$activePage) {
					var f = a ? "-" : "";
					g($(m.$activePage), "transform", b + "(" + f + (c - Math.abs(d)) + "px)"), "1" == e || "3" == e ? g($(m.$currentPage), "transform", "scale(" + ((c - Math.abs(d)) / s).toFixed(3) + ")") : ("5" == e || "11" == e) && g($(m.$currentPage), "transform", b + "(" + d + "px)")
				}
			}
			function ba(a, b, c, d) {
				if ("1" == d || "3" == d) g($(m.$currentPage), "transform", "scale(0.2)");
				else if ("5" == d || "11" == d) {
					var e = b > 0 ? "" : "-";
					g($(m.$currentPage), "transform", a + "(" + e + c + "px)")
				} else g($(m.$currentPage), "transform", "scale(1)");
				g($(m.$activePage), "transform", a + "(0px)")
			}
			this._$app = a, this._$pages = this._$app.find(".main-page"), this.$currentPage = this._$pages.eq(0), this.$activePage = null, this._isInitComplete = !1, this._isDisableFlipPage = !1, this._isDisableFlipPrevPage = !1, this._isDisableFlipNextPage = !1, this._scrollMode = b, this._pageData = c, this.pageData = e, b = b, m = this, r = C || D ? window.innerWidth : a.width(), s = C || D ? window.innerHeight : a.height();
			var ca = $("#con"),
				da = !1;
			if (("8" == b || "9" == b) && (M = .7, L = 800), 0 == b || 1 == b || 2 == b || 6 == b || 7 == b || 8 == b || 11 == b || 12 == b ? w = !0 : (3 == b || 4 == b || 5 == b || 10 == b) && (v = !0), w ? (x = $(".ctrl_panel_dir .ctrl-down"), $nextCtrl = $(".ctrl_panel_dir .ctrl-up")) : v && (x = $(".ctrl_panel_dir .ctrl-right"), $nextCtrl = $(".ctrl_panel_dir .ctrl-left")), e.obj.property.hasOwnProperty("triggerLoop") || (e.obj.property.triggerLoop = !0), A = e.obj.property.triggerLoop, e.obj.property.autoFlip && (u = 1e3 * e.obj.property.autoFlipTime, d()), c[0].elements && c[0].elements.length) for (var ea = 0; ea < c[0].elements.length; ea++) {
				eqShow.shakeTrigger(c, m.$currentPage);
				var fa = h(c[0].elements[ea].id);
				eqxCommon.bindTrigger(fa, c[0].elements[ea])
			}!
			function() {
				z.on("scroll.elasticity", function(a) {
					a.preventDefault()
				}).on("touchmove.elasticity", function(a) {
					a.preventDefault()
				}), z.delegate("img", "mousemove", function(a) {
					a.preventDefault()
				})
			}(), "10" != b ? m._$app.on("mousedown touchstart", function(a) {
				n(a)
			}).on("mousemove touchmove", function(a) {
				o(a)
			}).on("mouseup touchend mouseleave", function(a) {
				p(a)
			}) : turnBook(e), n = function(a) {
				da = !1, C && a && (a = event), m._isDisableFlipPage || (m.$currentPage = m._$pages.filter(".z-current").get(0), B || (m.$activePage = null), m.$currentPage && completeEffect($(m.$currentPage)) && (I = !0, J = !1, K = !0, G = 0, H = 0, a && "mousedown" == a.type ? (E = a.pageX, F = a.pageY) : a && "touchstart" == a.type && (E = a.touches ? a.touches[0].pageX : a.originalEvent.touches[0].pageX, F = a.touches ? a.touches[0].pageY : a.originalEvent.touches[0].pageY), m.$currentPage.classList.add("z-move"), f(m.$currentPage.style, "Transition", "none"), "12" == m._scrollMode && (m.$currentPage.style.zIndex = 3)))
			}, o = function(a) {
				if (C && a && (a = event), I && m._$pages.length > 1) {
					if (a && "mousemove" == a.type ? (G = a.pageX - E, H = a.pageY - F) : a && "touchmove" == a.type && (G = (a.touches ? a.touches[0].pageX : a.originalEvent.touches[0].pageX) - E, H = (a.touches ? a.touches[0].pageY : a.originalEvent.touches[0].pageY) - F), !da && (Math.abs(G) > 20 || Math.abs(H) > 20)) {
						if (m.$activePage) {
							var b = $(m.$activePage).find(".m-img").attr("id").substring(4);
							$(m.$activePage).find("li").each(function(a) {
								for (var c = 0; c < m._pageData[b - 1].elements.length; c++) if (m._pageData[b - 1].elements[c].id == parseInt($(this).attr("id").substring(7), 10)) {
									eqxCommon.animation($(this), m._pageData[b - 1].elements[c], "view");
									var d = h(m._pageData[b - 1].elements[c].id);
									eqxCommon.bindTrigger(d, m._pageData[b - 1].elements[c])
								}
							})
						}
						da = !0
					}
					"0" == m._scrollMode || "2" == m._scrollMode || "1" == m._scrollMode ? j() : "4" == m._scrollMode || "3" == m._scrollMode ? l() : "5" == m._scrollMode ? t() : "6" == m._scrollMode ? P() : "7" == m._scrollMode ? R() : "8" == m._scrollMode ? T() : "9" == m._scrollMode ? V() : "11" == m._scrollMode ? N() : "12" == m._scrollMode && X()
				}
			}, p = function(a) {
				if (I && completeEffect($(m.$currentPage))) if (I = !1, m.$activePage) {
					m._isDisableFlipPage = !0;
					var b;
					b = "6" == m._scrollMode || "7" == m._scrollMode ? "cubic-bezier(0,0,0.99,1)" : "12" == m._scrollMode ? "cubic-bezier(.17,.67,.87,.13)" : "linear", m.$currentPage.style.webkitTransition = "-webkit-transform " + M + "s " + b, m.$activePage.style.webkitTransition = "-webkit-transform " + M + "s " + b, m.$currentPage.style.mozTransition = "-moz-transform " + M + "s " + b, m.$activePage.style.mozTransition = "-moz-transform " + M + "s " + b, m.$currentPage.style.transition = "transform " + M + "s " + b, m.$activePage.style.transition = "transform " + M + "s " + b, "0" == m._scrollMode || "2" == m._scrollMode || "1" == m._scrollMode ? k() : "4" == m._scrollMode || "3" == m._scrollMode ? q() : "5" == m._scrollMode ? y() : "6" == m._scrollMode ? Q() : "7" == m._scrollMode ? S() : "8" == m._scrollMode ? U() : "9" == m._scrollMode ? W() : "11" == m._scrollMode ? O() : "12" == m._scrollMode && Y()
				} else m.$currentPage.classList.remove("z-move");
				B = !1
			}, $(document).on("flipend", function(a) {
				completeEffect($(m.$activePage)) || $("#audio_btn").css("opacity", 0);
				var d = $("#report0"),
					g = $(m.$activePage).find(".m-img").attr("id").substring(4);
				c = m._pageData, c[g - 1].elements && c[g - 1].elements.length && $.each(c[g - 1].elements, function(a, b) {
					"d" == b.type && eqShow.getShowCount(e.obj.id).then(function(a) {
						var c = eqShow.fixedNum(a);
						$("#" + b.id).find(".counter-number").text(c)
					})
				}), setTimeout(function() {
					f(m.$currentPage.style, "Transition", "none"), $(m.$activePage).removeClass("z-active z-move").addClass("z-current"), $(m.$currentPage).removeClass("z-current z-move"), m._isDisableFlipPage = !1, m.$currentPage = $(m.$activePage).trigger("current"), $(m.$currentPage).trigger("hide"), utilSound.pause(), d.length && d.remove(), ("8" == b || "9" == b || "12" == b) && ($(m.$currentPage).css("z-index", "1"), $(".main-page").attr("style", "")), eqShow.shakeTrigger(c, m.$currentPage), A || (1 == g ? x.removeClass("enabled") : g == m._pageData.length ? $nextCtrl.removeClass("enabled") : (x.addClass("enabled"), $nextCtrl.addClass("enabled")))
				}, L)
			}), $(document).on("startAutoFlip", function(a) {
				e.obj.property.autoFlip && d()
			}), eqShow.showProgressBar(e, m._$pages, a)
		};
	return {
		pageScroll: a,
		nextPage: c,
		prePage: b,
		lastPage: f,
		app: N,
		pauseAutoFlip: e,
		removeLastPage: g,
		changeScrollMode: h,
		startAutoFlip: i,
		changeAppPage: j,
		setTriggerLoop: l,
		setPageData: k
	}
}();