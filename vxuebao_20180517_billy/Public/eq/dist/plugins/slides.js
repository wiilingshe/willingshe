!function(a) {
	a.fn.slides = function(b) {
		return b = a.extend({}, a.fn.slides.option, b), this.each(function() {
			function c() {
				clearInterval(j.data("interval"))
			}
			function d() {
				b.pause ? (clearTimeout(j.data("pause")), clearInterval(j.data("interval")), pauseTimeout = setTimeout(function() {
					clearTimeout(j.data("pause")), playInterval = setInterval(function() {
						e("next", p)
					}, b.play), j.data("interval", playInterval)
				}, b.pause), j.data("pause", pauseTimeout)) : c()
			}
			function e(c, d, e) {
				if (!g && f) {
					switch (g = !0, c) {
					case "next":
						s = u, r = u + 1, r = l === r ? 0 : r, i = 2 * m, c = 2 * -m, u = r;
						break;
					case "prev":
						s = u, r = u - 1, r = -1 === r ? l - 1 : r, i = 0, c = 0, u = r;
						break;
					case "pagination":
						r = parseInt(e, 10), s = a("." + b.paginationClass + " li.current a", j).attr("rel"), r > s ? (i = 2 * m, c = 2 * -m) : (i = 0, c = 0), u = r
					}
					"fade" === d ? (b.animationStart(), b.crossfade ? k.children(":eq(" + r + ")", j).css({
						zIndex: 10
					}).fadeIn(b.fadeSpeed, function() {
						k.children(":eq(" + s + ")", j).css({
							display: "none",
							zIndex: 0
						}), a(this).css({
							zIndex: 0
						}), b.animationComplete(r + 1), g = !1
					}) : (b.animationStart(), k.children(":eq(" + s + ")", j).fadeOut(b.fadeSpeed, function() {
						b.autoHeight ? k.animate({
							height: k.children(":eq(" + r + ")", j).outerHeight()
						}, b.autoHeightSpeed, function() {
							k.children(":eq(" + r + ")", j).fadeIn(b.fadeSpeed)
						}) : k.children(":eq(" + r + ")", j).fadeIn(b.fadeSpeed, function() {
							a.browser.msie && a(this).get(0).style.removeAttribute("filter")
						}), b.animationComplete(r + 1), g = !1
					}))) : (k.children(":eq(" + r + ")").css({
						left: i,
						display: "block"
					}), b.autoHeight ? (b.animationStart(), k.animate({
						left: c,
						height: k.children(":eq(" + r + ")").outerHeight()
					}, b.slideSpeed, function() {
						k.css({
							left: -m
						}), k.children(":eq(" + r + ")").css({
							left: m,
							zIndex: 5
						}), k.children(":eq(" + s + ")").css({
							left: m,
							display: "none",
							zIndex: 0
						}), b.animationComplete(r + 1), g = !1
					})) : (b.animationStart(), k.animate({
						left: c
					}, b.slideSpeed, function() {
						k.css({
							left: -m
						}), k.children(":eq(" + r + ")").css({
							left: m,
							zIndex: 5
						}), k.children(":eq(" + s + ")").css({
							left: m,
							display: "none",
							zIndex: 0
						}), b.animationComplete(r + 1), g = !1
					}))), b.pagination && (a("." + b.paginationClass + " li.current", j).removeClass("current"), a("." + b.paginationClass + " li a:eq(" + r + ")", j).parent().addClass("current"))
				}
			}
			a("." + b.container, a(this)).children().wrapAll('<div class="slides_control"/>');
			var f, g, h, i, j = a(this),
				k = a(".slides_control", j),
				l = k.children().size(),
				m = k.children().outerWidth(),
				n = k.children().outerHeight(),
				o = b.start - 1,
				p = b.effect.indexOf(",") < 0 ? b.effect : b.effect.replace(" ", "").split(",")[0],
				q = b.effect.indexOf(",") < 0 ? p : b.effect.replace(" ", "").split(",")[1],
				r = 0,
				s = 0,
				t = 0,
				u = 0;
			if (!(2 > l)) {
				if (0 > o && (o = 0), o > l && (o = l - 1), b.start && (u = o), b.randomize && k.randomize(), a("." + b.container, j).css({
					overflow: "hidden",
					position: "relative"
				}), k.css({
					position: "relative",
					width: 3 * m,
					height: n,
					left: -m
				}), k.children().css({
					position: "absolute",
					top: 0,
					left: m,
					zIndex: 0,
					display: "none"
				}), b.autoHeight && k.animate({
					height: k.children(":eq(" + o + ")").outerHeight()
				}, b.autoHeightSpeed), b.preload && "IMG" == k.children()[0].tagName) {
					j.css({
						background: "url(" + b.preloadImage + ") no-repeat 50% 50%"
					});
					var v = a("img:eq(" + o + ")", j).attr("src") + "?" + (new Date).getTime();
					a("img:eq(" + o + ")", j).attr("src", v).load(function() {
						a(this).fadeIn(b.fadeSpeed, function() {
							a(this).css({
								zIndex: 5
							}), j.css({
								background: ""
							}), f = !0
						})
					})
				} else k.children(":eq(" + o + ")").fadeIn(b.fadeSpeed, function() {
					f = !0
				});
				b.bigTarget && (k.children().css({
					cursor: "pointer"
				}), k.children().click(function() {
					return e("next", p), !1
				})), b.hoverPause && b.play && (k.children().bind("mouseover", function() {
					c()
				}), k.children().bind("mouseleave", function() {
					d()
				})), b.generateNextPrev && (a("." + b.container, j).after('<a href="#" class="' + b.prev + '">Prev</a>'), a("." + b.prev, j).after('<a href="#" class="' + b.next + '">Next</a>')), a("." + b.next, j).click(function(a) {
					a.preventDefault(), b.play && d(), e("next", p)
				}), a("." + b.prev, j).click(function(a) {
					a.preventDefault(), b.play && d(), e("prev", p)
				}), b.generatePagination ? (j.append("<ul class=" + b.paginationClass + "></ul>"), k.children().each(function() {
					a("." + b.paginationClass, j).append("<li><a rel=" + t + ' href="#">' + (t + 1) + "</a></li>"), t++
				})) : a("." + b.paginationClass + " li a", j).each(function() {
					a(this).attr("rel", t), t++
				}), a("." + b.paginationClass + " li a:eq(" + o + ")", j).parent().addClass("current"), a("." + b.paginationClass + " li a", j).click(function() {
					return b.play && d(), h = a(this).attr("rel"), u != h && e("pagination", q, h), !1
				}), b.play && (playInterval = setInterval(function() {
					e("next", p)
				}, b.play), j.data("interval", playInterval))
			}
		})
	}, a.fn.slides.option = {
		preload: !1,
		preloadImage: "/img/loading.gif",
		container: "slides_container",
		generateNextPrev: !1,
		next: "next",
		prev: "prev",
		pagination: !0,
		generatePagination: !0,
		paginationClass: "pagination",
		fadeSpeed: 350,
		slideSpeed: 350,
		start: 1,
		effect: "slide",
		crossfade: !1,
		randomize: !1,
		play: 0,
		pause: 0,
		hoverPause: !1,
		autoHeight: !1,
		autoHeightSpeed: 350,
		bigTarget: !1,
		animationStart: function() {},
		animationComplete: function() {}
	}, a.fn.randomize = function(b) {
		function c() {
			return Math.round(Math.random()) - .5
		}
		return a(this).each(function() {
			var d = a(this),
				e = d.children(),
				f = e.length;
			if (f > 1) {
				e.hide();
				var g = [];
				for (i = 0; f > i; i++) g[g.length] = i;
				g = g.sort(c), a.each(g, function(a, c) {
					var f = e.eq(c),
						g = f.clone(!0);
					g.show().appendTo(d), b !== undefined && b(f, g), f.remove()
				})
			}
		})
	}
}(jQuery);