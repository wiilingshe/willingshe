/**
 * eqShow - v5.4.2 - 2015-11-21
 *
 *
 * Copyright (c) 2015
 * Licensed MIT <>
 */
  
    window.searchVal = ""
    window.searchUrl = ""
    window.oldSearchPage = "pageNo=1"
    window.categoryUrl = ""
    window.music = null;
    window.mytplList = [];
!function(window, angular, undefined) {
	function fallingObject(a, b) {
		function c(a) {
			a.clearRect(0, 0, k, l);
			for (var b = 0; b < o.length; b++) a.save(), a.translate(o[b].x, o[b].y), a.scale(o[b].scale, o[b].scale), a.rotate(o[b].rotate), a.fillRect(0, 0, p, p), a.restore()
		}
		function d() {
			Math.random() < .02 * h.density && f(), e()
		}
		function e() {
			for (var a = 0; a < o.length; a++) o[a].x += o[a].vx, o[a].y += o[a].vy, o[a].vy += o[a].g;
			for (var b = 0, a = 0; a < o.length; a++) o[a].y < l - p && o[a].x > -p && o[a].x < k && (o[b++] = o[a]);
			for (; o.length > b;) o.pop();
			o.length > q && (o.length = q)
		}
		function f() {
			var a = .5 * Math.random() + .3,
				b = {
					x: Math.ceil(Math.random() * k),
					y: -p,
					g: .02 * a * h.src.vy,
					vx: .05 * Math.pow(-1, Math.ceil(1e3 * Math.random())),
					vy: .01 * a * h.src.vy,
					color: "yellow",
					scale: a,
					rotate: Math.pow(-1, Math.ceil(1e3 * Math.random())) * Math.random() * (h.src.rotate || 0) * Math.PI / 180
				};
			o.push(b)
		}
		var g = a[b - 1];
		if (g.properties) {
			var h = g.properties.fallingObject || {};
			renderPage(eqShow, b, a);
			for (var i = 0; i < a[b - 1].elements.length; i++) {
				var j = eqShow.selectElement(a[b - 1].elements[i].id);
				eqxCommon.bindTrigger(j, a[b - 1].elements[i])
			}
			var k = $(".m-img").width(),
				l = $(".m-img").height(),
				m = document.createElement("canvas");
			m.width = k, m.height = l, $(m).prependTo("#page" + b + " .edit_wrapper").attr("class", "cas page_effect").attr("id", "can" + b).attr("style", "z-index: 0");
			var n = m.getContext("2d"),
				o = [],
				p = 60,
				q = 20,
				r = new Image;
			r.src = h.src.path, r.onload = function() {
				n.beginPath(), pattern = n.createPattern(r, "repeat"), n.fillStyle = pattern, n.closePath(), eqShow.stopFallingObject = setInterval(function() {
					c(n), d()
				}, 20)
			}
		}
	}
	function QR8bitByte(a) {
		this.mode = QRMode.MODE_8BIT_BYTE, this.data = a
	}
	function QRCode(a, b) {
		this.typeNumber = a, this.errorCorrectLevel = b, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = new Array
	}
	function QRPolynomial(a, b) {
		if (a.length == undefined) throw new Error(a.length + "/" + b);
		for (var c = 0; c < a.length && 0 == a[c];) c++;
		this.num = new Array(a.length - c + b);
		for (var d = 0; d < a.length - c; d++) this.num[d] = a[d + c]
	}
	function QRRSBlock(a, b) {
		this.totalCount = a, this.dataCount = b
	}
	function QRBitBuffer() {
		this.buffer = new Array, this.length = 0
	}
	function RainyDay(a, b) {
		if (this === window) return new RainyDay(a, b);
		this.img = a.image;
		var c = {
			opacity: 1,
			blur: 10,
			crop: [0, 0, this.img.naturalWidth, this.img.naturalHeight],
			enableSizeChange: !0,
			parentElement: document.getElementsByTagName("body")[0],
			fps: 30,
			fillStyle: "#8ED6FF",
			enableCollisions: !0,
			gravityThreshold: 3,
			gravityAngle: Math.PI / 2,
			gravityAngleVariance: 0,
			reflectionScaledownFactor: 5,
			reflectionDropMappingWidth: 200,
			reflectionDropMappingHeight: 200,
			width: this.img.clientWidth,
			height: this.img.clientHeight,
			position: "absolute",
			top: 0,
			left: 0
		};
		for (var d in c)"undefined" == typeof a[d] && (a[d] = c[d]);
		this.options = a, this.drops = [], this.canvas = b || this.prepareCanvas(), this.prepareBackground(), this.prepareGlass(), this.reflection = this.REFLECTION_MINIATURE, this.trail = this.TRAIL_DROPS, this.gravity = this.GRAVITY_NON_LINEAR, this.collision = this.COLLISION_SIMPLE, this.setRequestAnimFrame()
	}
	function Drop(a, b, c, d, e) {
		this.x = Math.floor(b), this.y = Math.floor(c), this.r = Math.random() * e + d, this.rainyday = a, this.context = a.context, this.reflection = a.reflected
	}
	function BlurStack() {
		this.r = 0, this.g = 0, this.b = 0, this.next = null
	}
	function CollisionMatrix(a, b, c) {
		this.resolution = c, this.xc = a, this.yc = b, this.matrix = new Array(a);
		for (var d = 0; a + 5 >= d; d++) {
			this.matrix[d] = new Array(b);
			for (var e = 0; b + 5 >= e; ++e) this.matrix[d][e] = new DropItem(null)
		}
	}
	function DropItem(a) {
		this.drop = a, this.next = null
	}
	function randomRange(a, b) {
		return Math.random() * (b - a) + a
	}
	function mobilecheck() {
		var a = !1;
		return function(b) {
			(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))) && (a = !0)
		}(navigator.userAgent || navigator.vendor || window.opera), a
	}
	function isWeixin() {
		var a = navigator.userAgent.toLowerCase();
		return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1
	}
	function isAndroid() {
		var a = navigator.userAgent,
			b = (navigator.appVersion, a.indexOf("Android") > -1 || a.indexOf("Linux") > -1);
		return b
	}
	function tabletCheck() {
		var a = /ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase());
		return a
	}
	function countCharacters(a) {
		var b = 0;
		if (!a) return 0;
		for (var c = 0; c < a.length; c++) {
			var d = a.charCodeAt(c);
			d >= 1 && 126 >= d || d >= 65376 && 65439 >= d ? b++ : b += 2
		}
		return b
	}
	function playVideo(a) {
		if (a && a.bgAudio) {
			var b = $("#media"),
				c = $("#audio_btn"),
				d = ($("#yinfu"), "");
			a.bgAudio.url ? d = 0 == a.bgAudio.url.indexOf("http://") ? a.bgAudio.url : PREFIX_FILE_HOST + a.bgAudio.url : !a.bgAudio.url && a.bgAudio.src && (d = 0 == a.bgAudio.src.indexOf("http://") ? a.bgAudio.src : PREFIX_FILE_HOST + a.bgAudio.src), b.attr("src", d), c.addClass("video_exist"), b.bind("canplay", function() {
				b.get(0).play()
			}).bind("play", function() {
				c.addClass("rotate")
			}).bind("pause", function() {
				c.removeClass("rotate")
			});
			var e = mobilecheck() ? "touchend" : "click";
			$("#audio_btn").show().on(e, function(a) {
				a.stopPropagation(), $(this).hasClass("rotate") ? b.get(0).pause() : (b.get(0).play(), utilSound.pause())
			})
		}
	}
	function renderPage(a, b, c) {
		a.templateParser("jsonParser").parse({
			def: c[b - 1],
			appendTo: "#page" + b,
			mode: "view"
		});
		var d, e, f = 1,
			g = $(".z-current").width(),
			h = $(".z-current").height();
		imageWidth = $(".m-img").width(), imageHeight = $(".m-img").height(), g / h >= 320 / 486 ? (f = h / 486, d = (g / f - 320) / 2) : (f = g / 320, e = (h / f - 486) / 2), window != window.top && $(".phoneBox .nr").css({
			width: "100%",
			height: "100%",
			overflow: "hidden",
			"transform-origin": "top left",
			transform: "scale(" + f + ")"
		}), e && $(".edit_area").css({
			marginTop: e
		}), d && $(".edit_area").css({
			marginLeft: d
		}), tplCount == c.length && $("#eqMobileViewport").attr("content", "width=320, initial-scale=" + f + ", maximum-scale=" + f + ", user-scalable=no")
	}!
	function(a) {
		function b(b) {
			return b.classList ? b.classList : a(b).attr("class").match(/\S+/gi)
		}
		a.fn.ShareLink = function(c) {
			function d(a) {
				var b = g[a];
				return b = b.replace("{url}", encodeURIComponent(c.url)), b = b.replace("{title}", encodeURIComponent(c.title)), b = b.replace("{text}", encodeURIComponent(c.text)), b = b.replace("{image}", encodeURIComponent(c.image))
			}
			var e = {
				title: "",
				text: "",
				image: "",
				url: window.location.href,
				class_prefix: "s_"
			},
				c = a.extend({}, e, c),
				f = c.class_prefix.length,
				g = {};
			this.each(function(e, h) {
				for (var i = b(h), e = 0; e < i.length; e++) {
					var j = i[e];
					if (j.substr(0, f) == c.class_prefix && g[j.substr(f)]) {
						var k = d(j.substr(f));
						a(h).attr("href", k).click(function() {
							var b = screen.width,
								d = screen.height,
								e = c.width ? c.width : b - .2 * b,
								f = c.height ? c.height : d - .2 * d,
								g = b / 2 - e / 2,
								h = d / 2 - f / 2,
								i = "toolbar=0,status=0,width=" + e + ",height=" + f + ",top=" + h + ",left=" + g;
							return window.open(a(this).attr("href"), "", i) && !1
						})
					}
				}
			})
		}
	}(jQuery), function(a, b) {
		a.completeEffect = function(a) {
			return a.find(".lock").get(0) ? !1 : !0
		}
	}(window, jQuery), function() {
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
	}(), function() {
		window.eqx = {}, window.eqx.money = {
			config: {
				mode: 3,
				effectCallback: "editMoney",
				imageCallback: "countMoney",
				resources: [{
					url: CLIENT_CDN + "view/js/countMoney.js",
					type: "js"
				}, {
					url: CLIENT_CDN + "assets/images/money/moneybg.png",
					type: "image"
				}, {
					url: CLIENT_CDN + "assets/images/money/moremoney.png",
					type: "image"
				}, {
					url: CLIENT_CDN + "assets/images/money/flymoney.png",
					type: "image"
				}, {
					url: CLIENT_CDN + "assets/images/money/float.png",
					type: "image"
				}, {
					url: CLIENT_CDN + "assets/images/money/float2.png",
					type: "image"
				}, {
					url: CLIENT_CDN + "assets/images/money/float3.png",
					type: "image"
				}]
			}
		}, window.eqx.snowFly = {
			config: {
				mode: 4,
				effectCallback: "flyAction",
				resources: [{
					url: CLIENT_CDN + "view/js/effect/snoweffect.js",
					type: "js"
				}, {
					url: CLIENT_CDN + "view/js/effect/threecanvas.js",
					type: "js"
				}]
			}
		}, window.eqx.rainyDay = {
			config: {
				mode: 4,
				effectCallback: "rainyEffect",
				resources: [{
					url: CLIENT_CDN + "view/js/effect/rainyday.js",
					type: "js"
				}, {
					url: CLIENT_CDN + "view/js/effect/rainyeffect.js",
					type: "js"
				}]
			}
		}, window.eqx.fireWorks = {
			config: {
				mode: 4,
				effectCallback: "fireWorks",
				resources: [{
					url: CLIENT_CDN + "view/js/effect/fireworks.js",
					type: "js"
				}]
			}
		}
	}(), function() {
		function a(a) {
			resources.loaded = !0, a instanceof Array ? a.forEach(function(a) {
				b(a)
			}) : b(a)
		}
		function b(a) {
			if ("loading" != f[a.url]) {
				if (f[a.url]) return f[a.url];
				if (f[a.url] = !1, "image" == a.type) {
					var b = new Image;
					f[a.url] = "loading", b.onload = function() {
						f[a.url] = b, d() && g.forEach(function(a) {
							a()
						})
					}, b.src = a.url
				} else "js" == a.type && (f[a.url] = "loading", $.getScript(a.url, function(b, c, e) {
					f[a.url] = !0, d() && g.forEach(function(a) {
						a()
					})
				}))
			}
		}
		function c(a) {
			return f[a]
		}
		function d() {
			var a = !0;
			for (var b in f) if (f.hasOwnProperty(b) && (!f[b] || "loading" == f[b])) return !1;
			return a
		}
		function e(a) {
			g.push(a)
		}
		var f = {},
			g = [];
		window.resources = {
			load: a,
			get: c,
			onReady: e,
			isReady: d
		}
	}(), function(a, b) {
		function c(a) {
			function b(a, b, c) {
				return a[b] || (a[b] = c())
			}
			var c = b(a, "eqShow", Object);
			return b(c, "templateParser", function() {
				var a = {};
				return function(c, d) {
					if ("hasOwnProperty" === c) throw new Error("hasOwnProperty is not a valid name");
					return d && a.hasOwnProperty(c) && (a[c] = null), b(a, c, d)
				}
			})
		}
		function d(b) {
			templateParser = c(a)
		}
		var e = a.eqShow || (a.eqShow = {});
		d(e)
	}(window, document), function() {
		window.requestAnimFrame = function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
			function(a) {
				window.setTimeout(a, 5e3)
			}
		}();
		var a;
		eqShow.stopFireworkEffect = function() {
			a = !0
		}, window.fireWorks = {
			doEffect: function(b, c, d, e) {
				function f() {
					if (!a) {
						requestAnimFrame(f), t = g(0, 1e3), m.globalCompositeOperation = "destination-out", m.fillStyle = "rgba(0, 0, 0, 0.5)", m.fillRect(0, 0, p, q), m.globalCompositeOperation = "lighter";
						for (var b = r.length; b--;) r[b].draw(), r[b].update(b);
						for (var b = s.length; b--;) s[b].draw(), s[b].update(b);
						x >= w ? y || (r.push(new i(p / 2, q, g(0, p), g(0, q / 2))), x = 0) : x++, v >= u ? y && (r.push(new i(p / 2, q, n, o)), v = 0) : v++
					}
				}
				function g(a, b) {
					return Math.random() * (b - a) + a
				}
				function h(a, b, c, d) {
					var e = a - c,
						f = b - d;
					return Math.sqrt(Math.pow(e, 2) + Math.pow(f, 2))
				}
				function i(a, b, c, d) {
					for (this.x = a, this.y = b, this.sx = a, this.sy = b, this.tx = c, this.ty = d, this.distanceToTarget = h(a, b, c, d), this.distanceTraveled = 0, this.coordinates = [], this.coordinateCount = 3; this.coordinateCount--;) this.coordinates.push([this.x, this.y]);
					this.angle = Math.atan2(d - b, c - a), this.speed = 10, this.acceleration = 1.05, this.brightness = g(50, 120)
				}
				function j(a, b) {
					for (this.x = a, this.y = b, this.coordinates = [], this.coordinateCount = 5; this.coordinateCount--;) this.coordinates.push([this.x, this.y]);
					this.angle = g(0, 2 * Math.PI), this.speed = g(1, 10), this.friction = .95, this.gravity = 1, this.hue = g(t - 100, t + 100), this.brightness = g(20, 80), this.alpha = 1, this.decay = g(.01, .015)
				}
				function k(a, b) {
					for (var c = 100; c--;) s.push(new j(a, b))
				}
				var l, m, n, o, p = window.innerWidth,
					q = window.innerHeight,
					r = [],
					s = [],
					t = 200,
					u = 7,
					v = 0,
					w = 20,
					x = 0,
					y = !1;
				a = !1, e(eqShow, c, d);
				for (var z = 0; z < d[c - 1].elements.length; z++) {
					var A = eqShow.selectElement(d[c - 1].elements[z].id);
					eqxCommon.bindTrigger(A, d[c - 1].elements[z])
				}
				1 == c && playVideo(b), $('<canvas id="fireworks' + c + '"></canvas>').prependTo("#page" + c).css({
					position: "absolute",
					zIndex: 1
				}), l = document.getElementById("fireworks" + c), m = l.getContext("2d"), l.width = p, l.height = q, f(), i.prototype.update = function(a) {
					this.coordinates.pop(), this.coordinates.unshift([this.x, this.y]), this.speed *= this.acceleration;
					var b = Math.cos(this.angle) * this.speed,
						c = Math.sin(this.angle) * this.speed;
					this.distanceTraveled = h(this.sx, this.sy, this.x + b, this.y + c), this.distanceTraveled >= this.distanceToTarget ? (k(this.tx, this.ty), r.splice(a, 1)) : (this.x += b, this.y += c)
				}, i.prototype.draw = function() {
					m.beginPath(), m.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]), m.lineTo(this.x, this.y), m.strokeStyle = "hsl(" + t + ", 100%, " + this.brightness + "%)", m.stroke(), m.beginPath(), m.arc(this.tx, this.ty, 0, 0, 2 * Math.PI), m.stroke()
				}, j.prototype.update = function(a) {
					this.coordinates.pop(), this.coordinates.unshift([this.x, this.y]), this.speed *= this.friction, this.x += Math.cos(this.angle) * this.speed, this.y += Math.sin(this.angle) * this.speed + this.gravity, this.alpha -= this.decay, this.alpha <= this.decay && s.splice(a, 1)
				}, j.prototype.draw = function() {
					m.beginPath(), m.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]), m.lineTo(this.x, this.y), m.strokeStyle = "hsla(" + this.hue + ", 100%, " + this.brightness + "%, " + this.alpha + ")", m.stroke()
				}
			}
		}
	}(), window.flux = {
		version: "1.4.4"
	}, function(a) {
		flux.slider = function(b, c) {
			flux.browser.init(), flux.browser.supportsTransitions || window.console && window.console.error && console.error("Flux Slider requires a browser that supports CSS3 transitions");
			var d = this;
			this.element = a(b), this.transitions = [];
			for (var e in flux.transitions) this.transitions.push(e);
			this.options = a.extend({
				autoplay: !0,
				transitions: this.transitions,
				delay: 4e3,
				pagination: !0,
				controls: !1,
				captions: !1,
				width: null,
				height: null,
				onTransitionEnd: null,
				onStartEnd: null,
				bgColor: ""
			}, c), this.height = this.options.height ? this.options.height : null, this.width = this.options.width ? this.options.width : null;
			var f = [];
			a(this.options.transitions).each(function(a, b) {
				var c = new flux.transitions[b](this),
					d = !0;
				c.options.requires3d && !flux.browser.supports3d && (d = !1), c.options.compatibilityCheck && (d = c.options.compatibilityCheck()), d && f.push(b)
			}), this.options.transitions = f, this.images = new Array, this.imageLoadedCount = 0, this.currentImageIndex = 0, this.nextImageIndex = 1, this.playing = !1, this.container = a('<div class="fluxslider"></div>').appendTo(this.element), this.surface = a('<div class="surface" style="position: relative"></div>').appendTo(this.container), this.container.bind("click", function(b) {
				a(b.target).hasClass("hasLink") && (window.location = a(b.target).data("href"))
			}), this.imageContainer = a('<div class="images loading1"></div>').css({
				position: "relative",
				overflow: "hidden"
			}).appendTo(this.surface), this.width && this.height && this.imageContainer.css({
				width: this.width + "px",
				height: this.height + "px"
			}), this.image1 = a('<div class="image1" style="height: 100%; width: 100%"></div>').appendTo(this.imageContainer), this.image2 = a('<div class="image2" style="height: 100%; width: 100%"></div>').appendTo(this.imageContainer), a(this.image1).add(this.image2).css({
				position: "absolute",
				top: "0px",
				left: "0px"
			}), this.element.find("img, a img").each(function(b, c) {
				var e = c.cloneNode(!1),
					f = a(c).parent();
				f.is("a") && a(e).data("href", f.attr("href")), d.images.push(e), a(c).remove()
			});
			for (var g = 0; g < this.images.length; g++) {
				var h = new Image;
				h.onload = function() {
					d.imageLoadedCount++, d.width = d.width ? d.width : this.width, d.height = d.height ? d.height : this.height, d.imageLoadedCount >= d.images.length && (d.finishedLoading(), d.setupImages())
				}, h.src = this.images[g].src
			}
			this.element.bind("fluxTransitionEnd", function(a, b) {
				d.options.onTransitionEnd && (a.preventDefault(), d.options.onTransitionEnd(b))
			}), this.options.autoplay && this.start();
			var i = {},
				j = {},
				k = 20;
			this.element.bind("mousedown touchstart", function(a) {
				"touchstart" == a.type ? i.left = a.originalEvent.touches[0].pageX : "mousedown" == a.type && (i.left = a.pageX)
			}).bind("mouseup touchend", function(a) {
				"touchend" == a.type ? j.left = a.originalEvent.changedTouches[0].pageX : "mouseup" == a.type && (j.left = a.pageX), j.left - i.left > k ? d.prev(null, {
					direction: "right"
				}) : i.left - j.left > k && d.next(null, {
					direction: "left"
				}), d.options.autoplay && (d.stop(), d.start())
			}), setTimeout(function() {
				a(window).focus(function() {
					d.isPlaying() && d.next()
				})
			}, 100)
		}, flux.slider.prototype = {
			constructor: flux.slider,
			playing: !1,
			start: function() {
				var a = this;
				this.playing = !0, this.interval = setInterval(function() {
					a.transition()
				}, this.options.delay), "function" == typeof this.options.onStartEnd && this.options.onStartEnd(this.interval)
			},
			stop: function() {
				this.playing = !1, clearInterval(this.interval), this.interval = null
			},
			isPlaying: function() {
				return this.playing
			},
			next: function(a, b) {
				b = b || {}, b.direction = "left", this.showImage(this.currentImageIndex + 1, a, b)
			},
			prev: function(a, b) {
				b = b || {}, b.direction = "right", this.showImage(this.currentImageIndex - 1, a, b)
			},
			showImage: function(a, b, c) {
				this.setNextIndex(a), this.setupImages(), this.transition(b, c)
			},
			finishedLoading: function() {
				var b = this;
				if (this.container.css({
					width: this.width + "px",
					height: this.height + "px"
				}), this.imageContainer.removeClass("loading1"), this.options.pagination && (this.pagination = a('<ul class="pagination"></ul>').css({
					margin: "0px",
					padding: "0px",
					"text-align": "center"
				}), this.pagination.bind("click", function(c) {
					c.preventDefault(), b.showImage(a(c.target).data("index"))
				}), a(this.images).each(function(c, d) {
					var e = a('<li data-index="' + c + '">' + (c + 1) + "</li>").css({
						display: "inline-block",
						"margin-left": "0.5em",
						cursor: "pointer"
					}).appendTo(b.pagination);
					0 == c && e.css("margin-left", 0).addClass("current")
				}), this.container.append(this.pagination)), a(this.imageContainer).css({
					width: this.width + "px",
					height: this.height + "px"
				}), a(this.image1).css({
					width: this.width + "px",
					height: this.height + "px"
				}), a(this.image2).css({
					width: this.width + "px",
					height: this.height + "px"
				}), this.container.css({
					width: this.width + "px",
					height: this.height + (this.options.pagination ? this.pagination.height() : 0) + "px"
				}), this.options.controls) {
					var c = {
						padding: "4px 10px 10px",
						"font-size": "60px",
						"font-family": "arial, sans-serif",
						"line-height": "1em",
						"font-weight": "bold",
						color: "#FFF",
						"text-decoration": "none",
						background: "rgba(0,0,0,0.5)",
						position: "absolute",
						"z-index": 2e3
					};
					this.nextButton = a('<a href="#">??</a>').css(c).css3({
						"border-radius": "4px"
					}).appendTo(this.surface).bind("click", function(a) {
						a.preventDefault(), b.next()
					}), this.prevButton = a('<a href="#">??</a>').css(c).css3({
						"border-radius": "4px"
					}).appendTo(this.surface).bind("click", function(a) {
						a.preventDefault(), b.prev()
					});
					var d = (this.height - this.nextButton.height()) / 2;
					this.nextButton.css({
						top: d + "px",
						right: "10px"
					}), this.prevButton.css({
						top: d + "px",
						left: "10px"
					})
				}
				this.options.captions && (this.captionBar = a('<div class="caption"></div>').css({
					background: "rgba(0,0,0,0.6)",
					color: "#FFF",
					"font-size": "16px",
					"font-family": "helvetica, arial, sans-serif",
					"text-decoration": "none",
					"font-weight": "bold",
					padding: "1.5em 1em",
					opacity: 0,
					position: "absolute",
					"z-index": 110,
					width: "100%",
					bottom: 0
				}).css3({
					"transition-property": "opacity",
					"transition-duration": "800ms",
					"box-sizing": "border-box"
				}).prependTo(this.surface)), this.updateCaption()
			},
			setupImages: function() {
				var b = this.getImage(this.currentImageIndex),
					c = {
						background: 'url("' + b.src + '") 50% 50% / contain no-repeat ' + this.options.bgColor,
						zIndex: 101,
						cursor: "auto"
					};
				a(b).data("href") ? (c.cursor = "pointer", this.image1.addClass("hasLink"), this.image1.data("href", a(b).data("href"))) : (this.image1.removeClass("hasLink"), this.image1.data("href", null)), this.image1.css(c).children().remove(), this.image2.css({
					background: 'url("' + this.getImage(this.nextImageIndex).src + '") 50% 50% / contain no-repeat ' + this.options.bgColor,
					zIndex: 100
				}), this.options.pagination && this.pagination && (this.pagination.find("li.current").removeClass("current"), a(this.pagination.find("li")[this.currentImageIndex]).addClass("current"))
			},
			transition: function(b, c) {
				if (b == undefined || !flux.transitions[b]) {
					var d = Math.floor(Math.random() * this.options.transitions.length);
					b = this.options.transitions[d]
				}
				var e = null;
				try {
					e = new flux.transitions[b](this, a.extend(this.options[b] ? this.options[b] : {}, c))
				} catch (f) {
					e = new flux.transition(this, {
						fallback: !0
					})
				}
				e.run(), this.currentImageIndex = this.nextImageIndex, this.setNextIndex(this.currentImageIndex + 1), this.updateCaption()
			},
			updateCaption: function() {
				var b = a(this.getImage(this.currentImageIndex)).attr("title");
				this.options.captions && this.captionBar && ("" !== b && this.captionBar.html(b), this.captionBar.css("opacity", "" === b ? 0 : 1))
			},
			getImage: function(a) {
				return a %= this.images.length, this.images[a]
			},
			setNextIndex: function(a) {
				a == undefined && (a = this.currentImageIndex + 1), this.nextImageIndex = a, this.nextImageIndex > this.images.length - 1 && (this.nextImageIndex = 0), this.nextImageIndex < 0 && (this.nextImageIndex = this.images.length - 1)
			},
			increment: function() {
				this.currentImageIndex++, this.currentImageIndex > this.images.length - 1 && (this.currentImageIndex = 0)
			}
		}
	}(window.jQuery || window.Zepto), function(a) {
		flux.browser = {
			init: function() {
				if (flux.browser.supportsTransitions === undefined) {
					var b = (document.createElement("div"), ["-webkit", "-moz", "-o", "-ms"]);
					if (window.Modernizr && Modernizr.csstransitions !== undefined ? flux.browser.supportsTransitions = Modernizr.csstransitions : flux.browser.supportsTransitions = this.supportsCSSProperty("Transition"), window.Modernizr && Modernizr.csstransforms3d !== undefined) flux.browser.supports3d = Modernizr.csstransforms3d;
					else if (flux.browser.supports3d = this.supportsCSSProperty("Perspective"), flux.browser.supports3d && "webkitPerspective" in a("body").get(0).style) {
						var c = a('<div id="csstransform3d"></div>'),
							d = a('<style media="(transform-3d), (' + b.join("-transform-3d),(") + '-transform-3d)">div#csstransform3d { position: absolute; left: 9px }</style>');
						a("body").append(c), a("head").append(d), flux.browser.supports3d = 9 == c.get(0).offsetLeft, c.remove(), d.remove()
					}
				}
			},
			supportsCSSProperty: function(a) {
				for (var b = document.createElement("div"), c = ["Webkit", "Moz", "O", "Ms"], d = !1, e = 0; e < c.length; e++) c[e] + a in b.style && (d = d || !0);
				return d
			},
			translate: function(a, b, c) {
				return a = a != undefined ? a : 0, b = b != undefined ? b : 0, c = c != undefined ? c : 0, "translate" + (flux.browser.supports3d ? "3d(" : "(") + a + "px," + b + (flux.browser.supports3d ? "px," + c + "px)" : "px)")
			},
			rotateX: function(a) {
				return flux.browser.rotate("x", a)
			},
			rotateY: function(a) {
				return flux.browser.rotate("y", a)
			},
			rotateZ: function(a) {
				return flux.browser.rotate("z", a)
			},
			rotate: function(a, b) {
				return !a in {
					x: "",
					y: "",
					z: ""
				} && (a = "z"), b = b != undefined ? b : 0, flux.browser.supports3d ? "rotate3d(" + ("x" == a ? "1" : "0") + ", " + ("y" == a ? "1" : "0") + ", " + ("z" == a ? "1" : "0") + ", " + b + "deg)" : "z" == a ? "rotate(" + b + "deg)" : ""
			}
		}, a(function() {
			flux.browser.init()
		})
	}(window.jQuery || window.Zepto), function(a) {
		a.fn.css3 = function(a) {
			var b = {},
				c = ["webkit", "moz", "ms", "o"];
			for (var d in a) {
				for (var e = 0; e < c.length; e++) b["-" + c[e] + "-" + d] = a[d];
				b[d] = a[d]
			}
			return this.css(b), this
		}, a.fn.transitionEnd = function(b) {
			for (var c = ["webkitTransitionEnd", "transitionend", "oTransitionEnd"], d = 0; d < c.length; d++) this.bind(c[d], function(d) {
				for (var e = 0; e < c.length; e++) a(this).unbind(c[e]);
				b && b.call(this, d)
			});
			return this
		}, flux.transition = function(b, c) {
			if (this.options = a.extend({
				requires3d: !1,
				after: function() {}
			}, c), this.slider = b, this.options.requires3d && !flux.browser.supports3d || !flux.browser.supportsTransitions || this.options.fallback === !0) {
				var d = this;
				this.options.after = undefined, this.options.setup = function() {
					d.fallbackSetup()
				}, this.options.execute = function() {
					d.fallbackExecute()
				}
			}
		}, flux.transition.prototype = {
			constructor: flux.transition,
			hasFinished: !1,
			run: function() {
				var a = this;
				this.options.setup !== undefined && this.options.setup.call(this), this.slider.image1.css({
					"background-image": "none"
				}), this.slider.imageContainer.css("overflow", this.options.requires3d ? "visible" : "hidden"), setTimeout(function() {
					a.options.execute !== undefined && a.slider.image1.css("background-color", ""), a.options.execute.call(a)
				}, 5)
			},
			finished: function() {
				this.hasFinished || (this.hasFinished = !0, this.options.after && this.options.after.call(this), this.slider.imageContainer.css("overflow", "hidden"), this.slider.setupImages(), this.slider.element.trigger("fluxTransitionEnd", {
					currentImage: this.slider.getImage(this.slider.currentImageIndex)
				}))
			},
			fallbackSetup: function() {},
			fallbackExecute: function() {
				this.finished()
			}
		}, flux.transitions = {}, flux.transition_grid = function(b, c) {
			return new flux.transition(b, a.extend({
				columns: 6,
				rows: 6,
				forceSquare: !1,
				setup: function() {
					var b = this.slider.image1.width(),
						c = this.slider.image1.height(),
						d = Math.floor(b / this.options.columns),
						e = Math.floor(c / this.options.rows);
					this.options.forceSquare && (e = d, this.options.rows = Math.floor(c / e));
					for (var f = b - this.options.columns * d, g = Math.ceil(f / this.options.columns), h = c - this.options.rows * e, i = Math.ceil(h / this.options.rows), j = (this.slider.image1.height(), 0), k = 0, l = document.createDocumentFragment(), m = 0; m < this.options.columns; m++) {
						var n = d,
							k = 0;
						if (f > 0) {
							var o = f >= g ? g : f;
							n += o, f -= o
						}
						for (var p = 0; p < this.options.rows; p++) {
							var q = e,
								r = h;
							if (r > 0) {
								var o = r >= i ? i : r;
								q += o, r -= o
							}
							var s = a('<div class="tile tile-' + m + "-" + p + '"></div>').css({
								width: n + "px",
								height: q + "px",
								position: "absolute",
								top: k + "px",
								left: j + "px"
							});
							this.options.renderTile.call(this, s, m, p, n, q, j, k), l.appendChild(s.get(0)), k += q
						}
						j += n
					}
					this.slider.image1.get(0).appendChild(l)
				},
				execute: function() {
					var a = this,
						b = this.slider.image1.height(),
						c = this.slider.image1.find("div.barcontainer");
					this.slider.image2.hide(), c.last().transitionEnd(function(b) {
						a.slider.image2.show(), a.finished()
					}), c.css3({
						transform: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, b / 2, b / 2)
					})
				},
				renderTile: function(a, b, c, d, e, f, g) {}
			}, c))
		}
	}(window.jQuery || window.Zepto), function(a) {
		flux.transitions.bars = function(b, c) {
			return new flux.transition_grid(b, a.extend({
				columns: 10,
				rows: 1,
				delayBetweenBars: 40,
				renderTile: function(b, c, d, e, f, g, h) {
					a(b).css({
						background: this.slider.image1.css("background"),
						"background-size": this.slider.width + "px " + this.slider.height + "px",
						"background-position": "-" + g + "px 0px"
					}).css3({
						"transition-duration": "400ms",
						"transition-timing-function": "ease-in",
						"transition-property": "all",
						"transition-delay": c * this.options.delayBetweenBars + "ms"
					})
				},
				execute: function() {
					var b = this,
						c = this.slider.image1.height(),
						d = this.slider.image1.find("div.tile");
					a(d[d.length - 1]).transitionEnd(function() {
						b.finished()
					}), setTimeout(function() {
						d.css({
							opacity: "0.5"
						}).css3({
							transform: flux.browser.translate(0, c)
						})
					}, 50)
				}
			}, c))
		}
	}(window.jQuery || window.Zepto), function(a) {
		flux.transitions.bars3d = function(b, c) {
			return new flux.transition_grid(b, a.extend({
				requires3d: !0,
				columns: 7,
				rows: 1,
				delayBetweenBars: 150,
				perspective: 1e3,
				renderTile: function(b, c, d, e, f, g, h) {
					var i = a('<div class="bar-' + c + '"></div>').css({
						width: e + "px",
						height: "100%",
						position: "absolute",
						top: "0px",
						left: "0px",
						"z-index": 200,
						background: this.slider.image1.css("background"),
						"background-size": this.slider.width + "px " + this.slider.height + "px",
						"background-position": "-" + g + "px 0px",
						"background-repeat": "no-repeat"
					}).css3({
						"backface-visibility": "hidden"
					}),
						j = a(i.get(0).cloneNode(!1)).css({
							"background-image": this.slider.image2.css("background-image")
						}).css3({
							transform: flux.browser.rotateX(90) + " " + flux.browser.translate(0, -f / 2, f / 2)
						}),
						k = a('<div class="side bar-' + c + '"></div>').css({
							width: f + "px",
							height: f + "px",
							position: "absolute",
							top: "0px",
							left: "0px",
							background: "#222",
							"z-index": 190
						}).css3({
							transform: flux.browser.rotateY(90) + " " + flux.browser.translate(f / 2, 0, -f / 2) + " " + flux.browser.rotateY(180),
							"backface-visibility": "hidden"
						}),
						l = a(k.get(0).cloneNode(!1)).css3({
							transform: flux.browser.rotateY(90) + " " + flux.browser.translate(f / 2, 0, e - f / 2)
						});
					a(b).css({
						width: e + "px",
						height: "100%",
						position: "absolute",
						top: "0px",
						left: g + "px",
						"z-index": c > this.options.columns / 2 ? 1e3 - c : 1e3
					}).css3({
						"transition-duration": "800ms",
						"transition-timing-function": "linear",
						"transition-property": "all",
						"transition-delay": c * this.options.delayBetweenBars + "ms",
						"transform-style": "preserve-3d"
					}).append(i).append(j).append(k).append(l)
				},
				execute: function() {
					this.slider.image1.css3({
						perspective: this.options.perspective,
						"perspective-origin": "50% 50%"
					}).css({
						"-moz-transform": "perspective(" + this.options.perspective + "px)",
						"-moz-perspective": "none",
						"-moz-transform-style": "preserve-3d"
					});
					var a = this,
						b = this.slider.image1.height(),
						c = this.slider.image1.find("div.tile");
					this.slider.image2.hide(), c.last().transitionEnd(function(b) {
						a.slider.image1.css3({
							"transform-style": "flat"
						}), a.slider.image2.show(), a.finished()
					}), setTimeout(function() {
						c.css3({
							transform: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, b / 2, b / 2)
						})
					}, 50)
				}
			}, c))
		}
	}(window.jQuery || window.Zepto), function(a) {
		flux.transitions.blinds = function(b, c) {
			return new flux.transitions.bars(b, a.extend({
				execute: function() {
					var b = this,
						c = (this.slider.image1.height(), this.slider.image1.find("div.tile"));
					a(c[c.length - 1]).transitionEnd(function() {
						b.finished()
					}), setTimeout(function() {
						c.css({
							opacity: "0.5"
						}).css3({
							transform: "scalex(0.0001)"
						})
					}, 50)
				}
			}, c))
		}
	}(window.jQuery || window.Zepto), function(a) {
		flux.transitions.zip = function(b, c) {
			return new flux.transitions.bars(b, a.extend({
				execute: function() {
					var b = this,
						c = this.slider.image1.height(),
						d = this.slider.image1.find("div.tile");
					a(d[d.length - 1]).transitionEnd(function() {
						b.finished()
					}), setTimeout(function() {
						d.each(function(b, d) {
							a(d).css({
								opacity: "0.3"
							}).css3({
								transform: flux.browser.translate(0, b % 2 ? "-" + 2 * c : c)
							})
						})
					}, 20)
				}
			}, c))
		}
	}(window.jQuery || window.Zepto), function(a) {
		flux.transitions.blocks = function(b, c) {
			return new flux.transition_grid(b, a.extend({
				forceSquare: !0,
				delayBetweenBars: 100,
				renderTile: function(b, c, d, e, f, g, h) {
					var i = Math.floor(10 * Math.random() * this.options.delayBetweenBars);
					a(b).css({
						background: this.slider.image1.css("background"),
						"background-size": this.slider.width + "px " + this.slider.height + "px",
						"background-position": "-" + g + "px -" + h + "px"
					}).css3({
						"transition-duration": "350ms",
						"transition-timing-function": "ease-in",
						"transition-property": "all",
						"transition-delay": i + "ms"
					}), this.maxDelay === undefined && (this.maxDelay = 0), i > this.maxDelay && (this.maxDelay = i, this.maxDelayTile = b)
				},
				execute: function() {
					var b = this,
						c = this.slider.image1.find("div.tile");
					this.maxDelayTile.transitionEnd(function() {
						b.finished()
					}), setTimeout(function() {
						c.each(function(b, c) {
							a(c).css({
								opacity: "0"
							}).css3({
								transform: "scale(0.8)"
							})
						})
					}, 50)
				}
			}, c))
		}
	}(window.jQuery || window.Zepto), function(a) {
		flux.transitions.blocks2 = function(b, c) {
			return new flux.transition_grid(b, a.extend({
				cols: 12,
				forceSquare: !0,
				delayBetweenDiagnols: 150,
				renderTile: function(b, c, d, e, f, g, h) {
					Math.floor(10 * Math.random() * this.options.delayBetweenBars);
					a(b).css({
						background: this.slider.image1.css("background"),
						"background-size": this.slider.width + "px " + this.slider.height + "px",
						"background-position": "-" + g + "px -" + h + "px"
					}).css3({
						"transition-duration": "350ms",
						"transition-timing-function": "ease-in",
						"transition-property": "all",
						"transition-delay": (c + d) * this.options.delayBetweenDiagnols + "ms",
						"backface-visibility": "hidden"
					})
				},
				execute: function() {
					var b = this,
						c = this.slider.image1.find("div.tile");
					c.last().transitionEnd(function() {
						b.finished()
					}), setTimeout(function() {
						c.each(function(b, c) {
							a(c).css({
								opacity: "0"
							}).css3({
								transform: "scale(0.8)"
							})
						})
					}, 50)
				}
			}, c))
		}
	}(window.jQuery || window.Zepto), function(a) {
		flux.transitions.cube = function(b, c) {
			return new flux.transition(b, a.extend({
				requires3d: !0,
				barWidth: 100,
				direction: "left",
				perspective: 1e3,
				setup: function() {
					var b = this.slider.image1.width(),
						c = this.slider.image1.height();
					this.slider.image1.css3({
						perspective: this.options.perspective,
						"perspective-origin": "50% 50%"
					}), this.cubeContainer = a('<div class="cube"></div>').css({
						width: b + "px",
						height: c + "px",
						position: "relative"
					}).css3({
						"transition-duration": "800ms",
						"transition-timing-function": "linear",
						"transition-property": "all",
						"transform-style": "preserve-3d"
					});
					var d = {
						height: "100%",
						width: "100%",
						position: "absolute",
						top: "0px",
						left: "0px"
					},
						e = a('<div class="face current"></div>').css(a.extend(d, {
							background: this.slider.image1.css("background"),
							"background-size": this.slider.width + "px " + this.slider.height + "px"
						})).css3({
							"backface-visibility": "hidden"
						});
					this.cubeContainer.append(e);
					var f = a('<div class="face next"></div>').css(a.extend(d, {
						background: this.slider.image2.css("background-image")
					})).css3({
						transform: this.options.transitionStrings.call(this, this.options.direction, "nextFace"),
						"backface-visibility": "hidden"
					});
					this.cubeContainer.append(f), this.slider.image1.append(this.cubeContainer)
				},
				execute: function() {
					var a = this;
					this.slider.image1.width(), this.slider.image1.height();
					this.slider.image2.hide(), this.cubeContainer.transitionEnd(function() {
						a.slider.image2.show(), a.finished()
					}), setTimeout(function() {
						a.cubeContainer.css3({
							transform: a.options.transitionStrings.call(a, a.options.direction, "container")
						})
					}, 50)
				},
				transitionStrings: function(a, b) {
					var c = this.slider.image1.width(),
						d = this.slider.image1.height(),
						e = {
							up: {
								nextFace: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, d / 2, d / 2),
								container: flux.browser.rotateX(90) + " " + flux.browser.translate(0, -d / 2, d / 2)
							},
							down: {
								nextFace: flux.browser.rotateX(90) + " " + flux.browser.translate(0, -d / 2, d / 2),
								container: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, d / 2, d / 2)
							},
							left: {
								nextFace: flux.browser.rotateY(90) + " " + flux.browser.translate(c / 2, 0, c / 2),
								container: flux.browser.rotateY(-90) + " " + flux.browser.translate(-c / 2, 0, c / 2)
							},
							right: {
								nextFace: flux.browser.rotateY(-90) + " " + flux.browser.translate(-c / 2, 0, c / 2),
								container: flux.browser.rotateY(90) + " " + flux.browser.translate(c / 2, 0, c / 2)
							}
						};
					return e[a] && e[a][b] ? e[a][b] : !1
				}
			}, c))
		}
	}(window.jQuery || window.Zepto), function(a) {
		flux.transitions.tiles3d = function(b, c) {
			return new flux.transition_grid(b, a.extend({
				requires3d: !0,
				forceSquare: !0,
				columns: 5,
				perspective: 600,
				delayBetweenBarsX: 200,
				delayBetweenBarsY: 150,
				renderTile: function(b, c, d, e, f, g, h) {
					var i = a("<div></div>").css({
						width: e + "px",
						height: f + "px",
						position: "absolute",
						top: "0px",
						left: "0px",
						background: this.slider.image1.css("background"),
						"background-size": this.slider.width + "px " + this.slider.height + "px",
						"background-position": "-" + g + "px -" + h + "px",
						"background-repeat": "no-repeat",
						"-moz-transform": "translateZ(1px)"
					}).css3({
						"backface-visibility": "hidden"
					}),
						j = a(i.get(0).cloneNode(!1)).css({
							"background-image": this.slider.image2.css("background-image")
						}).css3({
							transform: flux.browser.rotateY(180),
							"backface-visibility": "hidden"
						});
					a(b).css({
						"z-index": (c > this.options.columns / 2 ? 500 - c : 500) + (d > this.options.rows / 2 ? 500 - d : 500)
					}).css3({
						"transition-duration": "800ms",
						"transition-timing-function": "ease-out",
						"transition-property": "all",
						"transition-delay": c * this.options.delayBetweenBarsX + d * this.options.delayBetweenBarsY + "ms",
						"transform-style": "preserve-3d"
					}).append(i).append(j)
				},
				execute: function() {
					this.slider.image1.css3({
						perspective: this.options.perspective,
						"perspective-origin": "50% 50%"
					});
					var a = this,
						b = this.slider.image1.find("div.tile");
					this.slider.image2.hide(), b.last().transitionEnd(function(b) {
						a.slider.image2.show(), a.finished()
					}), setTimeout(function() {
						b.css3({
							transform: flux.browser.rotateY(180)
						})
					}, 50)
				}
			}, c))
		}
	}(window.jQuery || window.Zepto), function(a) {
		flux.transitions.turn = function(b, c) {
			return new flux.transition(b, a.extend({
				requires3d: !0,
				perspective: 1300,
				direction: "left",
				setup: function() {
					var b = a('<div class="tab"></div>').css({
						width: "50%",
						height: "100%",
						position: "absolute",
						top: "0px",
						left: "left" == this.options.direction ? "50%" : "0%",
						"z-index": 101
					}).css3({
						"transform-style": "preserve-3d",
						"transition-duration": "1000ms",
						"transition-timing-function": "ease-out",
						"transition-property": "all",
						"transform-origin": "left" == this.options.direction ? "left center" : "right center"
					}),
						c = (a("<div></div>").appendTo(b).css({
							background: this.slider.image1.css("background"),
							"background-size": this.slider.width + "px " + this.slider.height + "px",
							"background-position": ("left" == this.options.direction ? "-" + this.slider.image1.width() / 2 : 0) + "px 0",
							width: "100%",
							height: "100%",
							position: "absolute",
							top: "0",
							left: "0",
							"-moz-transform": "translateZ(1px)"
						}).css3({
							"backface-visibility": "hidden"
						}), a("<div></div>").appendTo(b).css({
							background: this.slider.image2.css("background"),
							"background-size": this.slider.width + "px " + this.slider.height + "px",
							"background-position": ("left" == this.options.direction ? 0 : "-" + this.slider.image1.width() / 2) + "px 0",
							width: "100%",
							height: "100%",
							position: "absolute",
							top: "0",
							left: "0"
						}).css3({
							transform: flux.browser.rotateY(180),
							"backface-visibility": "hidden"
						}), a("<div></div>").css({
							position: "absolute",
							top: "0",
							left: "left" == this.options.direction ? "0" : "50%",
							width: "50%",
							height: "100%",
							background: this.slider.image1.css("background"),
							"background-size": this.slider.width + "px " + this.slider.height + "px",
							"background-position": ("left" == this.options.direction ? 0 : "-" + this.slider.image1.width() / 2) + "px 0",
							"z-index": 100
						})),
						d = a('<div class="overlay"></div>').css({
							position: "absolute",
							top: "0",
							left: "left" == this.options.direction ? "50%" : "0",
							width: "50%",
							height: "100%",
							background: "#000",
							opacity: 1
						}).css3({
							"transition-duration": "800ms",
							"transition-timing-function": "linear",
							"transition-property": "opacity"
						}),
						e = a("<div></div>").css3({
							width: "100%",
							height: "100%"
						}).css3({
							perspective: this.options.perspective,
							"perspective-origin": "50% 50%"
						}).append(b).append(c).append(d);
					this.slider.image1.append(e)
				},
				execute: function() {
					var a = this;
					this.slider.image1.find("div.tab").first().transitionEnd(function() {
						a.finished()
					}), setTimeout(function() {
						a.slider.image1.find("div.tab").css3({
							transform: flux.browser.rotateY("left" == a.options.direction ? -179 : 179)
						}), a.slider.image1.find("div.overlay").css({
							opacity: 0
						})
					}, 50)
				}
			}, c))
		}
	}(window.jQuery || window.Zepto), function(a) {
		flux.transitions.slide = function(b, c) {
			return new flux.transition(b, a.extend({
				direction: "left",
				setup: function() {
					var b = this.slider.image1.width(),
						c = this.slider.image1.height(),
						d = a('<div class="current"></div>').css({
							height: c + "px",
							width: b + "px",
							position: "absolute",
							top: "0px",
							left: "0px",
							background: this.slider["left" == this.options.direction ? "image1" : "image2"].css("background")
						}).css3({
							"backface-visibility": "hidden"
						}),
						e = a('<div class="next"></div>').css({
							height: c + "px",
							width: b + "px",
							position: "absolute",
							top: "0px",
							left: b + "px",
							background: this.slider["left" == this.options.direction ? "image2" : "image1"].css("background")
						}).css3({
							"backface-visibility": "hidden"
						});
					this.slideContainer = a('<div class="slide"></div>').css({
						width: 2 * b + "px",
						height: c + "px",
						position: "relative",
						left: "left" == this.options.direction ? "0px" : -b + "px",
						"z-index": 101
					}).css3({
						"transition-duration": "600ms",
						"transition-timing-function": "ease-in",
						"transition-property": "all"
					}), this.slideContainer.append(d).append(e), this.slider.image1.append(this.slideContainer)
				},
				execute: function() {
					var a = this,
						b = this.slider.image1.width();
					"left" == this.options.direction && (b = -b), this.slideContainer.transitionEnd(function() {
						a.finished()
					}), setTimeout(function() {
						a.slideContainer.css3({
							transform: flux.browser.translate(b)
						})
					}, 50)
				}
			}, c))
		}
	}(window.jQuery || window.Zepto), function(a) {
		flux.transitions.explode = function(b, c) {
			return new flux.transition_grid(b, a.extend({
				columns: 6,
				forceSquare: !0,
				delayBetweenBars: 30,
				perspective: 800,
				requires3d: !0,
				renderTile: function(b, c, d, e, f, g, h) {
					var i = Math.floor(10 * Math.random() * this.options.delayBetweenBars);
					a(b).css({
						background: this.slider.image1.css("background"),
						"background-size": this.slider.width + "px " + this.slider.height + "px",
						"background-position": "-" + g + "px -" + h + "px"
					}).css3({
						"transition-duration": "500ms",
						"transition-timing-function": "ease-in",
						"transition-property": "all",
						"transition-delay": i + "ms"
					}), this.maxDelay === undefined && (this.maxDelay = 0), i > this.maxDelay && (this.maxDelay = i, this.maxDelayTile = b)
				},
				execute: function() {
					this.slider.image1.css3({
						perspective: this.options.perspective,
						"perspective-origin": "50% 50%"
					}).css({
						"-moz-transform": "perspective(" + this.options.perspective + "px)",
						"-moz-perspective": "none",
						"-moz-transform-style": "preserve-3d"
					});
					var b = this,
						c = this.slider.image1.find("div.tile");
					this.maxDelayTile.transitionEnd(function() {
						b.slider.image1.css3({
							"transform-style": "flat"
						}), b.finished()
					}), setTimeout(function() {
						c.each(function(b, c) {
							a(c).css({
								opacity: "0"
							}).css3({
								transform: flux.browser.translate(0, 0, 700) + " rotate3d(" + (Math.round(2 * Math.random()) - 1) + ", " + (Math.round(2 * Math.random()) - 1) + ", " + (Math.round(2 * Math.random()) - 1) + ", 90deg) "
							})
						})
					}, 50)
				}
			}, c))
		}
	}(window.jQuery || window.Zepto), function(a) {
		a.fn.qrcode = function(b) {
			"string" == typeof b && (b = {
				text: b
			}), b = a.extend({}, {
				render: "canvas",
				width: 256,
				height: 256,
				typeNumber: -1,
				correctLevel: QRErrorCorrectLevel.H,
				background: "#ffffff",
				foreground: "#000000"
			}, b);
			var c = function() {
					var a = new QRCode(b.typeNumber, b.correctLevel);
					a.addData(b.text), a.make();
					var c = document.createElement("canvas");
					c.width = b.width, c.height = b.height;
					for (var d = c.getContext("2d"), e = b.width / a.getModuleCount(), f = b.height / a.getModuleCount(), g = 0; g < a.getModuleCount(); g++) for (var h = 0; h < a.getModuleCount(); h++) {
						d.fillStyle = a.isDark(g, h) ? b.foreground : b.background;
						var i = Math.ceil((h + 1) * e) - Math.floor(h * e),
							j = Math.ceil((g + 1) * e) - Math.floor(g * e);
						d.fillRect(Math.round(h * e), Math.round(g * f), i, j)
					}
					return c
				},
				d = function() {
					var c = new QRCode(b.typeNumber, b.correctLevel);
					c.addData(b.text), c.make();
					for (var d = a("<table></table>").css("width", b.width + "px").css("height", b.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", b.background), e = b.width / c.getModuleCount(), f = b.height / c.getModuleCount(), g = 0; g < c.getModuleCount(); g++) for (var h = a("<tr></tr>").css("height", f + "px").appendTo(d), i = 0; i < c.getModuleCount(); i++) a("<td></td>").css("width", e + "px").css("background-color", c.isDark(g, i) ? b.foreground : b.background).appendTo(h);
					return d
				};
			return this.each(function() {
				var e = "canvas" == b.render ? c() : d();
				a(e).appendTo(this)
			})
		}
	}(jQuery), function() {
		function a(a) {
			$("#finger_div" + a).on(d, function() {
				$("#page" + a).find(".u-arrow-bottom").attr("style", "display: none;"), $("#page" + a).find(".edit_wrapper").attr("style", "display: none;"), $("#finger_line" + a).show(), $("#finger_info" + a).html("扫描中..."), $("#finger_line" + a).stop(!0, !1).animate({
					top: "50%",
					marginTop: "-87px"
				}, 1e3, function() {
					$("#finger_div" + a).unbind(), $("#finger_info" + a).hide().html("扫描成功").fadeIn(300, function() {
						$("#finger_line" + a).fadeOut(), $("#finger_zw" + a).fadeOut(), $("#finger_div" + a).fadeOut(), $("#finger_info" + a).fadeOut(200, function() {
							setTimeout(function() {
								$("#finger_background" + a).removeClass("lock").addClass("unlock")
							}, 500), $("#finger_background" + a).addClass("noFinger").fadeOut(500, function() {
								$("#page" + a).empty(), renderPage(eqShow, a, b);
								for (var c = 0; c < b[a - 1].elements.length; c++) {
									var d = eqShow.selectElement(b[a - 1].elements[c].id);
									eqxCommon.bindTrigger(d, b[a - 1].elements[c])
								}
							}), $("#audio_btn").css("opacity", 1), 1 == a && playVideo(audioObj)
						})
					})
				})
			})
		}
		var b;
		window.lockEffect = function(c, d, e, f, g) {
			audioObj = c, b = d;
			for (var h = 0; h < e.length; h++) {
				var i = e[h].num;
				$(".finger_background", "#page" + i).length && $(".finger_background", "#page" + i).remove(), $('<div class = "finger_background page_effect lock"></div>').prependTo($("#page" + i)).attr("id", "finger_background" + i).attr("style", "background-image: url(" + e[h].finger.bgImage.path + ");width:100%; height: 100%;"), $('<div class = "finger_div"></div>').prependTo($("#finger_background" + i)).attr("id", "finger_div" + i), $('<img class = "finger_zw"/>').appendTo($("#finger_background" + i)).attr("id", "finger_zw" + i).attr("src", e[h].finger.zwImage.path), $('<img class = "finger_line" src = "' + CLIENT_CDN + 'view/images/finger_line.png">').appendTo($("#finger_background" + e[h].num)).attr("id", "finger_line" + e[h].num), $('<p class = "finger_info"></p>').appendTo($("#finger_background" + i)).attr("id", "finger_info" + i), renderPage(eqShow, i, d), a(i)
			}
		};
		var c = "ontouchstart" in window ? !0 : !1,
			d = c ? "touchstart" : "mousedown"
	}();
	var eqxiu = function() {
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
	!
	function(a, b) {
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
		var _
	}(window, jQuery), QR8bitByte.prototype = {
		getLength: function(a) {
			return this.data.length
		},
		write: function(a) {
			for (var b = 0; b < this.data.length; b++) a.put(this.data.charCodeAt(b), 8)
		}
	}, QRCode.prototype = {
		addData: function(a) {
			var b = new QR8bitByte(a);
			this.dataList.push(b), this.dataCache = null
		},
		isDark: function(a, b) {
			if (0 > a || this.moduleCount <= a || 0 > b || this.moduleCount <= b) throw new Error(a + "," + b);
			return this.modules[a][b]
		},
		getModuleCount: function() {
			return this.moduleCount
		},
		make: function() {
			if (this.typeNumber < 1) {
				var a = 1;
				for (a = 1; 40 > a; a++) {
					for (var b = QRRSBlock.getRSBlocks(a, this.errorCorrectLevel), c = new QRBitBuffer, d = 0, e = 0; e < b.length; e++) d += b[e].dataCount;
					for (var e = 0; e < this.dataList.length; e++) {
						var f = this.dataList[e];
						c.put(f.mode, 4), c.put(f.getLength(), QRUtil.getLengthInBits(f.mode, a)), f.write(c)
					}
					if (c.getLengthInBits() <= 8 * d) break
				}
				this.typeNumber = a
			}
			this.makeImpl(!1, this.getBestMaskPattern())
		},
		makeImpl: function(a, b) {
			this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
			for (var c = 0; c < this.moduleCount; c++) {
				this.modules[c] = new Array(this.moduleCount);
				for (var d = 0; d < this.moduleCount; d++) this.modules[c][d] = null
			}
			this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(a, b), this.typeNumber >= 7 && this.setupTypeNumber(a), null == this.dataCache && (this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, b)
		},
		setupPositionProbePattern: function(a, b) {
			for (var c = -1; 7 >= c; c++) if (!(-1 >= a + c || this.moduleCount <= a + c)) for (var d = -1; 7 >= d; d++) - 1 >= b + d || this.moduleCount <= b + d || (c >= 0 && 6 >= c && (0 == d || 6 == d) || d >= 0 && 6 >= d && (0 == c || 6 == c) || c >= 2 && 4 >= c && d >= 2 && 4 >= d ? this.modules[a + c][b + d] = !0 : this.modules[a + c][b + d] = !1)
		},
		getBestMaskPattern: function() {
			for (var a = 0, b = 0, c = 0; 8 > c; c++) {
				this.makeImpl(!0, c);
				var d = QRUtil.getLostPoint(this);
				(0 == c || a > d) && (a = d, b = c)
			}
			return b
		},
		createMovieClip: function(a, b, c) {
			var d = a.createEmptyMovieClip(b, c),
				e = 1;
			this.make();
			for (var f = 0; f < this.modules.length; f++) for (var g = f * e, h = 0; h < this.modules[f].length; h++) {
				var i = h * e,
					j = this.modules[f][h];
				j && (d.beginFill(0, 100), d.moveTo(i, g), d.lineTo(i + e, g), d.lineTo(i + e, g + e), d.lineTo(i, g + e), d.endFill())
			}
			return d
		},
		setupTimingPattern: function() {
			for (var a = 8; a < this.moduleCount - 8; a++) null == this.modules[a][6] && (this.modules[a][6] = a % 2 == 0);
			for (var b = 8; b < this.moduleCount - 8; b++) null == this.modules[6][b] && (this.modules[6][b] = b % 2 == 0)
		},
		setupPositionAdjustPattern: function() {
			for (var a = QRUtil.getPatternPosition(this.typeNumber), b = 0; b < a.length; b++) for (var c = 0; c < a.length; c++) {
				var d = a[b],
					e = a[c];
				if (null == this.modules[d][e]) for (var f = -2; 2 >= f; f++) for (var g = -2; 2 >= g; g++) - 2 == f || 2 == f || -2 == g || 2 == g || 0 == f && 0 == g ? this.modules[d + f][e + g] = !0 : this.modules[d + f][e + g] = !1
			}
		},
		setupTypeNumber: function(a) {
			for (var b = QRUtil.getBCHTypeNumber(this.typeNumber), c = 0; 18 > c; c++) {
				var d = !a && 1 == (b >> c & 1);
				this.modules[Math.floor(c / 3)][c % 3 + this.moduleCount - 8 - 3] = d
			}
			for (var c = 0; 18 > c; c++) {
				var d = !a && 1 == (b >> c & 1);
				this.modules[c % 3 + this.moduleCount - 8 - 3][Math.floor(c / 3)] = d
			}
		},
		setupTypeInfo: function(a, b) {
			for (var c = this.errorCorrectLevel << 3 | b, d = QRUtil.getBCHTypeInfo(c), e = 0; 15 > e; e++) {
				var f = !a && 1 == (d >> e & 1);
				6 > e ? this.modules[e][8] = f : 8 > e ? this.modules[e + 1][8] = f : this.modules[this.moduleCount - 15 + e][8] = f
			}
			for (var e = 0; 15 > e; e++) {
				var f = !a && 1 == (d >> e & 1);
				8 > e ? this.modules[8][this.moduleCount - e - 1] = f : 9 > e ? this.modules[8][15 - e - 1 + 1] = f : this.modules[8][15 - e - 1] = f
			}
			this.modules[this.moduleCount - 8][8] = !a
		},
		mapData: function(a, b) {
			for (var c = -1, d = this.moduleCount - 1, e = 7, f = 0, g = this.moduleCount - 1; g > 0; g -= 2) for (6 == g && g--;;) {
				for (var h = 0; 2 > h; h++) if (null == this.modules[d][g - h]) {
					var i = !1;
					f < a.length && (i = 1 == (a[f] >>> e & 1));
					var j = QRUtil.getMask(b, d, g - h);
					j && (i = !i), this.modules[d][g - h] = i, e--, -1 == e && (f++, e = 7)
				}
				if (d += c, 0 > d || this.moduleCount <= d) {
					d -= c, c = -c;
					break
				}
			}
		}
	}, QRCode.PAD0 = 236, QRCode.PAD1 = 17, QRCode.createData = function(a, b, c) {
		for (var d = QRRSBlock.getRSBlocks(a, b), e = new QRBitBuffer, f = 0; f < c.length; f++) {
			var g = c[f];
			e.put(g.mode, 4), e.put(g.getLength(), QRUtil.getLengthInBits(g.mode, a)), g.write(e)
		}
		for (var h = 0, f = 0; f < d.length; f++) h += d[f].dataCount;
		if (e.getLengthInBits() > 8 * h) throw new Error("code length overflow. (" + e.getLengthInBits() + ">" + 8 * h + ")");
		for (e.getLengthInBits() + 4 <= 8 * h && e.put(0, 4); e.getLengthInBits() % 8 != 0;) e.putBit(!1);
		for (;;) {
			if (e.getLengthInBits() >= 8 * h) break;
			if (e.put(QRCode.PAD0, 8), e.getLengthInBits() >= 8 * h) break;
			e.put(QRCode.PAD1, 8)
		}
		return QRCode.createBytes(e, d)
	}, QRCode.createBytes = function(a, b) {
		for (var c = 0, d = 0, e = 0, f = new Array(b.length), g = new Array(b.length), h = 0; h < b.length; h++) {
			var i = b[h].dataCount,
				j = b[h].totalCount - i;
			d = Math.max(d, i), e = Math.max(e, j), f[h] = new Array(i);
			for (var k = 0; k < f[h].length; k++) f[h][k] = 255 & a.buffer[k + c];
			c += i;
			var l = QRUtil.getErrorCorrectPolynomial(j),
				m = new QRPolynomial(f[h], l.getLength() - 1),
				n = m.mod(l);
			g[h] = new Array(l.getLength() - 1);
			for (var k = 0; k < g[h].length; k++) {
				var o = k + n.getLength() - g[h].length;
				g[h][k] = o >= 0 ? n.get(o) : 0
			}
		}
		for (var p = 0, k = 0; k < b.length; k++) p += b[k].totalCount;
		for (var q = new Array(p), r = 0, k = 0; d > k; k++) for (var h = 0; h < b.length; h++) k < f[h].length && (q[r++] = f[h][k]);
		for (var k = 0; e > k; k++) for (var h = 0; h < b.length; h++) k < g[h].length && (q[r++] = g[h][k]);
		return q
	};
	for (var QRMode = {
		MODE_NUMBER: 1,
		MODE_ALPHA_NUM: 2,
		MODE_8BIT_BYTE: 4,
		MODE_KANJI: 8
	}, QRErrorCorrectLevel = {
		L: 1,
		M: 0,
		Q: 3,
		H: 2
	}, QRMaskPattern = {
		PATTERN000: 0,
		PATTERN001: 1,
		PATTERN010: 2,
		PATTERN011: 3,
		PATTERN100: 4,
		PATTERN101: 5,
		PATTERN110: 6,
		PATTERN111: 7
	}, QRUtil = {
		PATTERN_POSITION_TABLE: [
			[],
			[6, 18],
			[6, 22],
			[6, 26],
			[6, 30],
			[6, 34],
			[6, 22, 38],
			[6, 24, 42],
			[6, 26, 46],
			[6, 28, 50],
			[6, 30, 54],
			[6, 32, 58],
			[6, 34, 62],
			[6, 26, 46, 66],
			[6, 26, 48, 70],
			[6, 26, 50, 74],
			[6, 30, 54, 78],
			[6, 30, 56, 82],
			[6, 30, 58, 86],
			[6, 34, 62, 90],
			[6, 28, 50, 72, 94],
			[6, 26, 50, 74, 98],
			[6, 30, 54, 78, 102],
			[6, 28, 54, 80, 106],
			[6, 32, 58, 84, 110],
			[6, 30, 58, 86, 114],
			[6, 34, 62, 90, 118],
			[6, 26, 50, 74, 98, 122],
			[6, 30, 54, 78, 102, 126],
			[6, 26, 52, 78, 104, 130],
			[6, 30, 56, 82, 108, 134],
			[6, 34, 60, 86, 112, 138],
			[6, 30, 58, 86, 114, 142],
			[6, 34, 62, 90, 118, 146],
			[6, 30, 54, 78, 102, 126, 150],
			[6, 24, 50, 76, 102, 128, 154],
			[6, 28, 54, 80, 106, 132, 158],
			[6, 32, 58, 84, 110, 136, 162],
			[6, 26, 54, 82, 110, 138, 166],
			[6, 30, 58, 86, 114, 142, 170]
		],
		G15: 1335,
		G18: 7973,
		G15_MASK: 21522,
		getBCHTypeInfo: function(a) {
			for (var b = a << 10; QRUtil.getBCHDigit(b) - QRUtil.getBCHDigit(QRUtil.G15) >= 0;) b ^= QRUtil.G15 << QRUtil.getBCHDigit(b) - QRUtil.getBCHDigit(QRUtil.G15);
			return (a << 10 | b) ^ QRUtil.G15_MASK
		},
		getBCHTypeNumber: function(a) {
			for (var b = a << 12; QRUtil.getBCHDigit(b) - QRUtil.getBCHDigit(QRUtil.G18) >= 0;) b ^= QRUtil.G18 << QRUtil.getBCHDigit(b) - QRUtil.getBCHDigit(QRUtil.G18);
			return a << 12 | b
		},
		getBCHDigit: function(a) {
			for (var b = 0; 0 != a;) b++, a >>>= 1;
			return b
		},
		getPatternPosition: function(a) {
			return QRUtil.PATTERN_POSITION_TABLE[a - 1]
		},
		getMask: function(a, b, c) {
			switch (a) {
			case QRMaskPattern.PATTERN000:
				return (b + c) % 2 == 0;
			case QRMaskPattern.PATTERN001:
				return b % 2 == 0;
			case QRMaskPattern.PATTERN010:
				return c % 3 == 0;
			case QRMaskPattern.PATTERN011:
				return (b + c) % 3 == 0;
			case QRMaskPattern.PATTERN100:
				return (Math.floor(b / 2) + Math.floor(c / 3)) % 2 == 0;
			case QRMaskPattern.PATTERN101:
				return b * c % 2 + b * c % 3 == 0;
			case QRMaskPattern.PATTERN110:
				return (b * c % 2 + b * c % 3) % 2 == 0;
			case QRMaskPattern.PATTERN111:
				return (b * c % 3 + (b + c) % 2) % 2 == 0;
			default:
				throw new Error("bad maskPattern:" + a)
			}
		},
		getErrorCorrectPolynomial: function(a) {
			for (var b = new QRPolynomial([1], 0), c = 0; a > c; c++) b = b.multiply(new QRPolynomial([1, QRMath.gexp(c)], 0));
			return b
		},
		getLengthInBits: function(a, b) {
			if (b >= 1 && 10 > b) switch (a) {
			case QRMode.MODE_NUMBER:
				return 10;
			case QRMode.MODE_ALPHA_NUM:
				return 9;
			case QRMode.MODE_8BIT_BYTE:
				return 8;
			case QRMode.MODE_KANJI:
				return 8;
			default:
				throw new Error("mode:" + a)
			} else if (27 > b) switch (a) {
			case QRMode.MODE_NUMBER:
				return 12;
			case QRMode.MODE_ALPHA_NUM:
				return 11;
			case QRMode.MODE_8BIT_BYTE:
				return 16;
			case QRMode.MODE_KANJI:
				return 10;
			default:
				throw new Error("mode:" + a)
			} else {
				if (!(41 > b)) throw new Error("type:" + b);
				switch (a) {
				case QRMode.MODE_NUMBER:
					return 14;
				case QRMode.MODE_ALPHA_NUM:
					return 13;
				case QRMode.MODE_8BIT_BYTE:
					return 16;
				case QRMode.MODE_KANJI:
					return 12;
				default:
					throw new Error("mode:" + a)
				}
			}
		},
		getLostPoint: function(a) {
			for (var b = a.getModuleCount(), c = 0, d = 0; b > d; d++) for (var e = 0; b > e; e++) {
				for (var f = 0, g = a.isDark(d, e), h = -1; 1 >= h; h++) if (!(0 > d + h || d + h >= b)) for (var i = -1; 1 >= i; i++) 0 > e + i || e + i >= b || (0 != h || 0 != i) && g == a.isDark(d + h, e + i) && f++;
				f > 5 && (c += 3 + f - 5)
			}
			for (var d = 0; b - 1 > d; d++) for (var e = 0; b - 1 > e; e++) {
				var j = 0;
				a.isDark(d, e) && j++, a.isDark(d + 1, e) && j++, a.isDark(d, e + 1) && j++, a.isDark(d + 1, e + 1) && j++, (0 == j || 4 == j) && (c += 3)
			}
			for (var d = 0; b > d; d++) for (var e = 0; b - 6 > e; e++) a.isDark(d, e) && !a.isDark(d, e + 1) && a.isDark(d, e + 2) && a.isDark(d, e + 3) && a.isDark(d, e + 4) && !a.isDark(d, e + 5) && a.isDark(d, e + 6) && (c += 40);
			for (var e = 0; b > e; e++) for (var d = 0; b - 6 > d; d++) a.isDark(d, e) && !a.isDark(d + 1, e) && a.isDark(d + 2, e) && a.isDark(d + 3, e) && a.isDark(d + 4, e) && !a.isDark(d + 5, e) && a.isDark(d + 6, e) && (c += 40);
			for (var k = 0, e = 0; b > e; e++) for (var d = 0; b > d; d++) a.isDark(d, e) && k++;
			var l = Math.abs(100 * k / b / b - 50) / 5;
			return c += 10 * l
		}
	}, QRMath = {
		glog: function(a) {
			if (1 > a) throw new Error("glog(" + a + ")");
			return QRMath.LOG_TABLE[a]
		},
		gexp: function(a) {
			for (; 0 > a;) a += 255;
			for (; a >= 256;) a -= 255;
			return QRMath.EXP_TABLE[a]
		},
		EXP_TABLE: new Array(256),
		LOG_TABLE: new Array(256)
	}, i = 0; 8 > i; i++) QRMath.EXP_TABLE[i] = 1 << i;
	for (var i = 8; 256 > i; i++) QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
	for (var i = 0; 255 > i; i++) QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
	QRPolynomial.prototype = {
		get: function(a) {
			return this.num[a]
		},
		getLength: function() {
			return this.num.length
		},
		multiply: function(a) {
			for (var b = new Array(this.getLength() + a.getLength() - 1), c = 0; c < this.getLength(); c++) for (var d = 0; d < a.getLength(); d++) b[c + d] ^= QRMath.gexp(QRMath.glog(this.get(c)) + QRMath.glog(a.get(d)));
			return new QRPolynomial(b, 0)
		},
		mod: function(a) {
			if (this.getLength() - a.getLength() < 0) return this;
			for (var b = QRMath.glog(this.get(0)) - QRMath.glog(a.get(0)), c = new Array(this.getLength()), d = 0; d < this.getLength(); d++) c[d] = this.get(d);
			for (var d = 0; d < a.getLength(); d++) c[d] ^= QRMath.gexp(QRMath.glog(a.get(d)) + b);
			return new QRPolynomial(c, 0).mod(a)
		}
	}, QRRSBlock.RS_BLOCK_TABLE = [
		[1, 26, 19],
		[1, 26, 16],
		[1, 26, 13],
		[1, 26, 9],
		[1, 44, 34],
		[1, 44, 28],
		[1, 44, 22],
		[1, 44, 16],
		[1, 70, 55],
		[1, 70, 44],
		[2, 35, 17],
		[2, 35, 13],
		[1, 100, 80],
		[2, 50, 32],
		[2, 50, 24],
		[4, 25, 9],
		[1, 134, 108],
		[2, 67, 43],
		[2, 33, 15, 2, 34, 16],
		[2, 33, 11, 2, 34, 12],
		[2, 86, 68],
		[4, 43, 27],
		[4, 43, 19],
		[4, 43, 15],
		[2, 98, 78],
		[4, 49, 31],
		[2, 32, 14, 4, 33, 15],
		[4, 39, 13, 1, 40, 14],
		[2, 121, 97],
		[2, 60, 38, 2, 61, 39],
		[4, 40, 18, 2, 41, 19],
		[4, 40, 14, 2, 41, 15],
		[2, 146, 116],
		[3, 58, 36, 2, 59, 37],
		[4, 36, 16, 4, 37, 17],
		[4, 36, 12, 4, 37, 13],
		[2, 86, 68, 2, 87, 69],
		[4, 69, 43, 1, 70, 44],
		[6, 43, 19, 2, 44, 20],
		[6, 43, 15, 2, 44, 16],
		[4, 101, 81],
		[1, 80, 50, 4, 81, 51],
		[4, 50, 22, 4, 51, 23],
		[3, 36, 12, 8, 37, 13],
		[2, 116, 92, 2, 117, 93],
		[6, 58, 36, 2, 59, 37],
		[4, 46, 20, 6, 47, 21],
		[7, 42, 14, 4, 43, 15],
		[4, 133, 107],
		[8, 59, 37, 1, 60, 38],
		[8, 44, 20, 4, 45, 21],
		[12, 33, 11, 4, 34, 12],
		[3, 145, 115, 1, 146, 116],
		[4, 64, 40, 5, 65, 41],
		[11, 36, 16, 5, 37, 17],
		[11, 36, 12, 5, 37, 13],
		[5, 109, 87, 1, 110, 88],
		[5, 65, 41, 5, 66, 42],
		[5, 54, 24, 7, 55, 25],
		[11, 36, 12],
		[5, 122, 98, 1, 123, 99],
		[7, 73, 45, 3, 74, 46],
		[15, 43, 19, 2, 44, 20],
		[3, 45, 15, 13, 46, 16],
		[1, 135, 107, 5, 136, 108],
		[10, 74, 46, 1, 75, 47],
		[1, 50, 22, 15, 51, 23],
		[2, 42, 14, 17, 43, 15],
		[5, 150, 120, 1, 151, 121],
		[9, 69, 43, 4, 70, 44],
		[17, 50, 22, 1, 51, 23],
		[2, 42, 14, 19, 43, 15],
		[3, 141, 113, 4, 142, 114],
		[3, 70, 44, 11, 71, 45],
		[17, 47, 21, 4, 48, 22],
		[9, 39, 13, 16, 40, 14],
		[3, 135, 107, 5, 136, 108],
		[3, 67, 41, 13, 68, 42],
		[15, 54, 24, 5, 55, 25],
		[15, 43, 15, 10, 44, 16],
		[4, 144, 116, 4, 145, 117],
		[17, 68, 42],
		[17, 50, 22, 6, 51, 23],
		[19, 46, 16, 6, 47, 17],
		[2, 139, 111, 7, 140, 112],
		[17, 74, 46],
		[7, 54, 24, 16, 55, 25],
		[34, 37, 13],
		[4, 151, 121, 5, 152, 122],
		[4, 75, 47, 14, 76, 48],
		[11, 54, 24, 14, 55, 25],
		[16, 45, 15, 14, 46, 16],
		[6, 147, 117, 4, 148, 118],
		[6, 73, 45, 14, 74, 46],
		[11, 54, 24, 16, 55, 25],
		[30, 46, 16, 2, 47, 17],
		[8, 132, 106, 4, 133, 107],
		[8, 75, 47, 13, 76, 48],
		[7, 54, 24, 22, 55, 25],
		[22, 45, 15, 13, 46, 16],
		[10, 142, 114, 2, 143, 115],
		[19, 74, 46, 4, 75, 47],
		[28, 50, 22, 6, 51, 23],
		[33, 46, 16, 4, 47, 17],
		[8, 152, 122, 4, 153, 123],
		[22, 73, 45, 3, 74, 46],
		[8, 53, 23, 26, 54, 24],
		[12, 45, 15, 28, 46, 16],
		[3, 147, 117, 10, 148, 118],
		[3, 73, 45, 23, 74, 46],
		[4, 54, 24, 31, 55, 25],
		[11, 45, 15, 31, 46, 16],
		[7, 146, 116, 7, 147, 117],
		[21, 73, 45, 7, 74, 46],
		[1, 53, 23, 37, 54, 24],
		[19, 45, 15, 26, 46, 16],
		[5, 145, 115, 10, 146, 116],
		[19, 75, 47, 10, 76, 48],
		[15, 54, 24, 25, 55, 25],
		[23, 45, 15, 25, 46, 16],
		[13, 145, 115, 3, 146, 116],
		[2, 74, 46, 29, 75, 47],
		[42, 54, 24, 1, 55, 25],
		[23, 45, 15, 28, 46, 16],
		[17, 145, 115],
		[10, 74, 46, 23, 75, 47],
		[10, 54, 24, 35, 55, 25],
		[19, 45, 15, 35, 46, 16],
		[17, 145, 115, 1, 146, 116],
		[14, 74, 46, 21, 75, 47],
		[29, 54, 24, 19, 55, 25],
		[11, 45, 15, 46, 46, 16],
		[13, 145, 115, 6, 146, 116],
		[14, 74, 46, 23, 75, 47],
		[44, 54, 24, 7, 55, 25],
		[59, 46, 16, 1, 47, 17],
		[12, 151, 121, 7, 152, 122],
		[12, 75, 47, 26, 76, 48],
		[39, 54, 24, 14, 55, 25],
		[22, 45, 15, 41, 46, 16],
		[6, 151, 121, 14, 152, 122],
		[6, 75, 47, 34, 76, 48],
		[46, 54, 24, 10, 55, 25],
		[2, 45, 15, 64, 46, 16],
		[17, 152, 122, 4, 153, 123],
		[29, 74, 46, 14, 75, 47],
		[49, 54, 24, 10, 55, 25],
		[24, 45, 15, 46, 46, 16],
		[4, 152, 122, 18, 153, 123],
		[13, 74, 46, 32, 75, 47],
		[48, 54, 24, 14, 55, 25],
		[42, 45, 15, 32, 46, 16],
		[20, 147, 117, 4, 148, 118],
		[40, 75, 47, 7, 76, 48],
		[43, 54, 24, 22, 55, 25],
		[10, 45, 15, 67, 46, 16],
		[19, 148, 118, 6, 149, 119],
		[18, 75, 47, 31, 76, 48],
		[34, 54, 24, 34, 55, 25],
		[20, 45, 15, 61, 46, 16]
	], QRRSBlock.getRSBlocks = function(a, b) {
		var c = QRRSBlock.getRsBlockTable(a, b);
		if (c == undefined) throw new Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + b);
		for (var d = c.length / 3, e = new Array, f = 0; d > f; f++) for (var g = c[3 * f + 0], h = c[3 * f + 1], i = c[3 * f + 2], j = 0; g > j; j++) e.push(new QRRSBlock(h, i));
		return e
	}, QRRSBlock.getRsBlockTable = function(a, b) {
		switch (b) {
		case QRErrorCorrectLevel.L:
			return QRRSBlock.RS_BLOCK_TABLE[4 * (a - 1) + 0];
		case QRErrorCorrectLevel.M:
			return QRRSBlock.RS_BLOCK_TABLE[4 * (a - 1) + 1];
		case QRErrorCorrectLevel.Q:
			return QRRSBlock.RS_BLOCK_TABLE[4 * (a - 1) + 2];
		case QRErrorCorrectLevel.H:
			return QRRSBlock.RS_BLOCK_TABLE[4 * (a - 1) + 3];
		default:
			return undefined
		}
	}, QRBitBuffer.prototype = {
		get: function(a) {
			var b = Math.floor(a / 8);
			return 1 == (this.buffer[b] >>> 7 - a % 8 & 1)
		},
		put: function(a, b) {
			for (var c = 0; b > c; c++) this.putBit(1 == (a >>> b - c - 1 & 1))
		},
		getLengthInBits: function() {
			return this.length
		},
		putBit: function(a) {
			var b = Math.floor(this.length / 8);
			this.buffer.length <= b && this.buffer.push(0), a && (this.buffer[b] |= 128 >>> this.length % 8), this.length++
		}
	}, RainyDay.prototype.prepareCanvas = function() {
		var a = document.createElement("canvas");
		return a.style.position = this.options.position, a.style.top = this.options.top, a.style.left = this.options.left, a.width = this.options.width, a.height = this.options.height, this.options.parentElement.appendChild(a), this.options.enableSizeChange && this.setResizeHandler(), a
	}, RainyDay.prototype.setResizeHandler = function() {
		null !== window.onresize ? window.setInterval(this.checkSize.bind(this), 100) : (window.onresize = this.checkSize.bind(this), window.onorientationchange = this.checkSize.bind(this))
	}, RainyDay.prototype.checkSize = function() {
		var a = this.img.clientWidth,
			b = this.img.clientHeight,
			c = this.img.offsetLeft,
			d = this.img.offsetTop,
			e = this.canvas.width,
			f = this.canvas.height,
			g = this.canvas.offsetLeft,
			h = this.canvas.offsetTop;
		(e !== a || f !== b) && (this.canvas.width = a, this.canvas.height = b, this.prepareBackground(), this.glass.width = this.canvas.width, this.glass.height = this.canvas.height, this.prepareReflections()), (g !== c || h !== d) && (this.canvas.offsetLeft = c, this.canvas.offsetTop = d)
	}, RainyDay.prototype.animateDrops = function() {
		this.addDropCallback && this.addDropCallback();
		for (var a = this.drops.slice(), b = [], c = 0; c < a.length; ++c) a[c].animate() && b.push(a[c]);
		this.drops = b, window.requestAnimFrame(this.animateDrops.bind(this))
	}, RainyDay.prototype.setRequestAnimFrame = function() {
		var a = this.options.fps;
		window.requestAnimFrame = function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
			function(b) {
				window.setTimeout(b, 1e3 / a)
			}
		}()
	}, RainyDay.prototype.prepareReflections = function() {
		this.reflected = document.createElement("canvas"), this.reflected.width = this.canvas.width / this.options.reflectionScaledownFactor, this.reflected.height = this.canvas.height / this.options.reflectionScaledownFactor;
		var a = this.reflected.getContext("2d");
		a.drawImage(this.img, this.options.crop[0], this.options.crop[1], this.options.crop[2], this.options.crop[3], 0, 0, this.reflected.width, this.reflected.height)
	}, RainyDay.prototype.prepareGlass = function() {
		this.glass = document.createElement("canvas"), this.glass.width = this.canvas.width, this.glass.height = this.canvas.height, this.context = this.glass.getContext("2d")
	}, RainyDay.prototype.rain = function(a, b) {
		if (this.reflection !== this.REFLECTION_NONE && this.prepareReflections(), this.animateDrops(), this.presets = a, this.PRIVATE_GRAVITY_FORCE_FACTOR_Y = .001 * this.options.fps / 25, this.PRIVATE_GRAVITY_FORCE_FACTOR_X = (Math.PI / 2 - this.options.gravityAngle) * (.001 * this.options.fps) / 50, this.options.enableCollisions) {
			for (var c = 0, d = 0; d < a.length; d++) a[d][0] + a[d][1] > c && (c = Math.floor(a[d][0] + a[d][1]));
			if (c > 0) {
				var e = Math.ceil(this.canvas.width / c),
					f = Math.ceil(this.canvas.height / c);
				this.matrix = new CollisionMatrix(e, f, c)
			} else this.options.enableCollisions = !1
		}
		for (var d = 0; d < a.length; d++) a[d][3] || (a[d][3] = -1);
		var g = 0;
		this.addDropCallback = function() {
			var c = (new Date).getTime();
			if (!(b > c - g)) {
				g = c;
				var d = this.canvas.getContext("2d");
				d.clearRect(0, 0, this.canvas.width, this.canvas.height), d.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
				for (var e, f = 0; f < a.length; f++) if (a[f][2] > 1 || -1 === a[f][3]) {
					if (0 !== a[f][3]) {
						a[f][3]--;
						for (var h = 0; h < a[f][2]; ++h) this.putDrop(new Drop(this, Math.random() * this.canvas.width, Math.random() * this.canvas.height, a[f][0], a[f][1]))
					}
				} else if (Math.random() < a[f][2]) {
					e = a[f];
					break
				}
				e && this.putDrop(new Drop(this, Math.random() * this.canvas.width, Math.random() * this.canvas.height, e[0], e[1])), d.save(), d.globalAlpha = this.options.opacity, d.drawImage(this.glass, 0, 0, this.canvas.width, this.canvas.height), d.restore()
			}
		}.bind(this)
	}, RainyDay.prototype.putDrop = function(a) {
		a.draw(), this.gravity && a.r > this.options.gravityThreshold && (this.options.enableCollisions && this.matrix.update(a), this.drops.push(a))
	}, RainyDay.prototype.clearDrop = function(a, b) {
		var c = a.clear(b);
		if (c) {
			var d = this.drops.indexOf(a);
			d >= 0 && this.drops.splice(d, 1)
		}
		return c
	}, Drop.prototype.draw = function() {
		this.context.save(), this.context.beginPath();
		var a = this.r;
		if (this.r = .95 * this.r, this.r < 3) this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, !0), this.context.closePath();
		else if (this.colliding || this.yspeed > 2) {
			if (this.colliding) {
				var b = this.colliding;
				this.r = 1.001 * (this.r > b.r ? this.r : b.r), this.x += b.x - this.x, this.colliding = null
			}
			var c = 1 + .1 * this.yspeed;
			this.context.moveTo(this.x - this.r / c, this.y), this.context.bezierCurveTo(this.x - this.r, this.y - 2 * this.r, this.x + this.r, this.y - 2 * this.r, this.x + this.r / c, this.y), this.context.bezierCurveTo(this.x + this.r, this.y + c * this.r, this.x - this.r, this.y + c * this.r, this.x - this.r / c, this.y)
		} else this.context.arc(this.x, this.y, .9 * this.r, 0, 2 * Math.PI, !0), this.context.closePath();
		this.context.clip(), this.r = a, this.rainyday.reflection && this.rainyday.reflection(this), this.context.restore()
	}, Drop.prototype.clear = function(a) {
		return this.context.clearRect(this.x - this.r - 1, this.y - this.r - 2, 2 * this.r + 2, 2 * this.r + 2), a ? (this.terminate = !0, !0) : this.y - this.r > this.rainyday.canvas.height || this.x - this.r > this.rainyday.canvas.width || this.x + this.r < 0 ? !0 : !1
	}, Drop.prototype.animate = function() {
		if (this.terminate) return !1;
		var a = this.rainyday.gravity(this);
		if (!a && this.rainyday.trail && this.rainyday.trail(this), this.rainyday.options.enableCollisions) {
			var b = this.rainyday.matrix.update(this, a);
			b && this.rainyday.collision(this, b)
		}
		return !a || this.terminate
	}, RainyDay.prototype.TRAIL_NONE = function() {}, RainyDay.prototype.TRAIL_DROPS = function(a) {
		(!a.trailY || a.y - a.trailY >= 100 * Math.random() * a.r) && (a.trailY = a.y, this.putDrop(new Drop(this, a.x + (2 * Math.random() - 1) * Math.random(), a.y - a.r - 5, Math.ceil(a.r / 5), 0)))
	}, RainyDay.prototype.TRAIL_SMUDGE = function(a) {
		var b = a.y - a.r - 3,
			c = a.x - a.r / 2 + 2 * Math.random();
		0 > b || 0 > c || this.context.drawImage(this.clearbackground, c, b, a.r, 2, c, b, a.r, 2)
	}, RainyDay.prototype.GRAVITY_NONE = function() {
		return !0
	}, RainyDay.prototype.GRAVITY_LINEAR = function(a) {
		return this.clearDrop(a) ? !0 : (a.yspeed ? (a.yspeed += this.PRIVATE_GRAVITY_FORCE_FACTOR_Y * Math.floor(a.r), a.xspeed += this.PRIVATE_GRAVITY_FORCE_FACTOR_X * Math.floor(a.r)) : (a.yspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_Y, a.xspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_X), a.y += a.yspeed, a.draw(), !1)
	}, RainyDay.prototype.GRAVITY_NON_LINEAR = function(a) {
		return this.clearDrop(a) ? !0 : (a.collided ? (a.collided = !1, a.seed = Math.floor(a.r * Math.random() * this.options.fps), a.skipping = !1, a.slowing = !1) : (!a.seed || a.seed < 0) && (a.seed = Math.floor(a.r * Math.random() * this.options.fps), a.skipping = a.skipping === !1 ? !0 : !1, a.slowing = !0), a.seed--, a.yspeed ? a.slowing ? (a.yspeed /= 1.1, a.xspeed /= 1.1, a.yspeed < this.PRIVATE_GRAVITY_FORCE_FACTOR_Y && (a.slowing = !1)) : a.skipping ? (a.yspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_Y, a.xspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_X) : (a.yspeed += 1 * this.PRIVATE_GRAVITY_FORCE_FACTOR_Y * Math.floor(a.r), a.xspeed += 1 * this.PRIVATE_GRAVITY_FORCE_FACTOR_X * Math.floor(a.r)) : (a.yspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_Y, a.xspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_X), 0 !== this.options.gravityAngleVariance && (a.xspeed += (2 * Math.random() - 1) * a.yspeed * this.options.gravityAngleVariance), a.y += a.yspeed, a.x += a.xspeed, a.draw(), !1)
	}, RainyDay.prototype.positiveMin = function(a, b) {
		var c = 0;
		return c = b > a ? 0 >= a ? b : a : 0 >= b ? a : b, 0 >= c ? 1 : c
	}, RainyDay.prototype.REFLECTION_NONE = function() {
		this.context.fillStyle = this.options.fillStyle, this.context.fill()
	}, RainyDay.prototype.REFLECTION_MINIATURE = function(a) {
		var b = Math.max((a.x - this.options.reflectionDropMappingWidth) / this.options.reflectionScaledownFactor, 0),
			c = Math.max((a.y - this.options.reflectionDropMappingHeight) / this.options.reflectionScaledownFactor, 0),
			d = this.positiveMin(2 * this.options.reflectionDropMappingWidth / this.options.reflectionScaledownFactor, this.reflected.width - b),
			e = this.positiveMin(2 * this.options.reflectionDropMappingHeight / this.options.reflectionScaledownFactor, this.reflected.height - c),
			f = Math.max(a.x - 1.1 * a.r, 0),
			g = Math.max(a.y - 1.1 * a.r, 0);
		this.context.drawImage(this.reflected, b, c, d, e, f, g, 2 * a.r, 2 * a.r)
	}, RainyDay.prototype.COLLISION_SIMPLE = function(a, b) {
		for (var c, d = b; null != d;) {
			var e = d.drop;
			if (Math.sqrt(Math.pow(a.x - e.x, 2) + Math.pow(a.y - e.y, 2)) < a.r + e.r) {
				c = e;
				break
			}
			d = d.next
		}
		if (c) {
			var f, g;
			a.y > c.y ? (f = a, g = c) : (f = c, g = a), this.clearDrop(g), this.clearDrop(f, !0), this.matrix.remove(f), g.draw(), g.colliding = f, g.collided = !0
		}
	}, RainyDay.prototype.prepareBackground = function() {
		this.background = document.createElement("canvas"), this.background.width = this.canvas.width, this.background.height = this.canvas.height, this.clearbackground = document.createElement("canvas"), this.clearbackground.width = this.canvas.width, this.clearbackground.height = this.canvas.height;
		var a = this.background.getContext("2d");
		a.clearRect(0, 0, this.canvas.width, this.canvas.height), a.drawImage(this.img, this.options.crop[0], this.options.crop[1], this.options.crop[2], this.options.crop[3], 0, 0, this.canvas.width, this.canvas.height), a = this.clearbackground.getContext("2d"), a.clearRect(0, 0, this.canvas.width, this.canvas.height), a.drawImage(this.img, this.options.crop[0], this.options.crop[1], this.options.crop[2], this.options.crop[3], 0, 0, this.canvas.width, this.canvas.height), !isNaN(this.options.blur) && this.options.blur >= 1 && this.stackBlurCanvasRGB(this.canvas.width, this.canvas.height, this.options.blur)
	}, RainyDay.prototype.stackBlurCanvasRGB = function(a, b, c) {
		var d = [
			[0, 9],
			[1, 11],
			[2, 12],
			[3, 13],
			[5, 14],
			[7, 15],
			[11, 16],
			[15, 17],
			[22, 18],
			[31, 19],
			[45, 20],
			[63, 21],
			[90, 22],
			[127, 23],
			[181, 24]
		],
			e = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
		c |= 0;
		var f = this.background.getContext("2d");
		console.log(a);
		var g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A = f.getImageData(0, 0, a, b),
			B = A.data,
			C = c + 1,
			D = C * (C + 1) / 2,
			E = new BlurStack,
			F = new BlurStack,
			G = E;
		for (i = 1; 2 * c + 1 > i; i++) G = G.next = new BlurStack, i === C && (F = G);
		G.next = E;
		var H = null,
			I = null;
		m = l = 0;
		for (var J, K = e[c], L = 0; L < d.length; ++L) if (c <= d[L][0]) {
			J = d[L - 1][1];
			break
		}
		for (h = 0; b > h; h++) {
			for (t = u = v = n = o = p = 0, q = C * (w = B[l]), r = C * (x = B[l + 1]), s = C * (y = B[l + 2]), n += D * w, o += D * x, p += D * y, G = E, i = 0; C > i; i++) G.r = w, G.g = x, G.b = y, G = G.next;
			for (i = 1; C > i; i++) j = l + ((i > a - 1 ? a - 1 : i) << 2), n += (G.r = w = B[j]) * (z = C - i), o += (G.g = x = B[j + 1]) * z, p += (G.b = y = B[j + 2]) * z, t += w, u += x, v += y, G = G.next;
			for (H = E, I = F, g = 0; a > g; g++) B[l] = n * K >> J, B[l + 1] = o * K >> J, B[l + 2] = p * K >> J, n -= q, o -= r, p -= s, q -= H.r, r -= H.g, s -= H.b, j = m + ((j = g + c + 1) < a - 1 ? j : a - 1) << 2, t += H.r = B[j], u += H.g = B[j + 1], v += H.b = B[j + 2], n += t, o += u, p += v, H = H.next, q += w = I.r, r += x = I.g, s += y = I.b, t -= w, u -= x, v -= y, I = I.next, l += 4;
			m += a
		}
		for (g = 0; a > g; g++) {
			for (u = v = t = o = p = n = 0, l = g << 2, q = C * (w = B[l]), r = C * (x = B[l + 1]), s = C * (y = B[l + 2]), n += D * w, o += D * x, p += D * y, G = E, i = 0; C > i; i++) G.r = w, G.g = x, G.b = y, G = G.next;
			for (k = a, i = 1; C > i; i++) l = k + g << 2, n += (G.r = w = B[l]) * (z = C - i), o += (G.g = x = B[l + 1]) * z, p += (G.b = y = B[l + 2]) * z, t += w, u += x, v += y, G = G.next, b - 1 > i && (k += a);
			for (l = g, H = E, I = F, h = 0; b > h; h++) j = l << 2, B[j] = n * K >> J, B[j + 1] = o * K >> J, B[j + 2] = p * K >> J, n -= q, o -= r, p -= s, q -= H.r, r -= H.g, s -= H.b, j = g + ((j = h + C) < b - 1 ? j : b - 1) * a << 2, n += t += H.r = B[j], o += u += H.g = B[j + 1], p += v += H.b = B[j + 2], H = H.next, q += w = I.r, r += x = I.g, s += y = I.b, t -= w, u -= x, v -= y, I = I.next, l += a
		}
		f.putImageData(A, 0, 0)
	}, CollisionMatrix.prototype.update = function(a, b) {
		if (a.gid) {
			if (!this.matrix[a.gmx] || !this.matrix[a.gmx][a.gmy]) return null;
			if (this.matrix[a.gmx][a.gmy].remove(a), b) return null;
			if (a.gmx = Math.floor(a.x / this.resolution), a.gmy = Math.floor(a.y / this.resolution), !this.matrix[a.gmx] || !this.matrix[a.gmx][a.gmy]) return null;
			this.matrix[a.gmx][a.gmy].add(a);
			var c = this.collisions(a);
			if (c && null != c.next) return c.next
		} else {
			if (a.gid = Math.random().toString(36).substr(2, 9), a.gmx = Math.floor(a.x / this.resolution), a.gmy = Math.floor(a.y / this.resolution), !this.matrix[a.gmx] || !this.matrix[a.gmx][a.gmy]) return null;
			this.matrix[a.gmx][a.gmy].add(a)
		}
		return null
	}, CollisionMatrix.prototype.collisions = function(a) {
		var b = new DropItem(null),
			c = b;
		return b = this.addAll(b, a.gmx - 1, a.gmy + 1), b = this.addAll(b, a.gmx, a.gmy + 1), b = this.addAll(b, a.gmx + 1, a.gmy + 1), c
	}, CollisionMatrix.prototype.addAll = function(a, b, c) {
		if (b > 0 && c > 0 && b < this.xc && c < this.yc) for (var d = this.matrix[b][c]; null != d.next;) d = d.next, a.next = new DropItem(d.drop), a = a.next;
		return a
	}, CollisionMatrix.prototype.remove = function(a) {
		this.matrix[a.gmx][a.gmy].remove(a)
	}, DropItem.prototype.add = function(a) {
		for (var b = this; null != b.next;) b = b.next;
		b.next = new DropItem(a)
	}, DropItem.prototype.remove = function(a) {
		for (var b = this, c = null; null != b.next;) c = b, b = b.next, b.drop.gid === a.gid && (c.next = b.next)
	}, function(a) {
		window.rainyDay = {
			doEffect: function(a, b, c, d) {
				console.log(123), d(eqShow, b, c);
				var e = document.getElementById("2755513881");
				e.onload = function() {
					var a = new RainyDay({
						image: this,
						parentElement: document.getElementById("page1")
					});
					a.rain([
						[1, 2, 8e3]
					]), a.rain([
						[3, 3, .88],
						[5, 5, .9],
						[6, 2, 1]
					], 100)
				}, e.src = src
			}
		}
	}(jQuery), function() {
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
	}(), function(a) {
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
	}(jQuery), function($) {
		window.snowFly = {
			doEffect: function(audioObj, pageNum, pages, callback) {
				callback(eqShow, pageNum, pages);
				for (var i = 0; i < pages[pageNum - 1].elements.length; i++) {
					var $elem = eqShow.selectElement(pages[pageNum - 1].elements[i].id);
					eqxCommon.bindTrigger($elem, pages[pageNum - 1].elements[i])
				}
				1 == pageNum && playVideo(audioObj);
				var container, particle, camera, scene, renderer, SCREEN_WIDTH = window.innerWidth,
					SCREEN_HEIGHT = window.innerHeight,
					mouseX = 0,
					mouseY = 0,
					particles = (window.innerWidth / 2, window.innerHeight / 2, []),
					particleImage = new Image;
				particleImage.src = CLIENT_CDN + "view/images/ParticleSmoke.png";
				var $parent = $("#page" + pageNum).parent(".main-page");
				container = $parent.get(0), camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1e4), camera.position.z = 1e3, scene = new THREE.Scene, scene.add(camera), renderer = new THREE.CanvasRenderer, renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT), renderer.num = pageNum;
				for (var material = new THREE.ParticleBasicMaterial({
					map: new THREE.Texture(particleImage)
				}), i = 0; 500 > i; i++) particle = new Particle3D(material), particle.position.x = 2e3 * Math.random() - 1e3, particle.position.y = 2e3 * Math.random() - 1e3, particle.position.z = 2e3 * Math.random() - 1e3, particle.scale.x = particle.scale.y = 1, scene.add(particle), particles.push(particle);
				var canvas = renderer.domElement;
				$(canvas).attr("id", "snowcas" + pageNum).appendTo($parent), $("#snowcas" + pageNum).css({
					position: "absolute",
					top: 0,
					width: "100%",
					height: "100%"
				}), eqShow.stopSnowFly = setInterval(function() {
					for (var i = 0; i < particles.length; i++) {
						var particle = particles[i];
						with(particle.updatePhysics(), particle.position) y < -1e3 && (y += 2e3), x > 1e3 ? x -= 2e3 : x < -1e3 && (x += 2e3), z > 1e3 ? z -= 2e3 : z < -1e3 && (z += 2e3)
					}
					camera.position.x += .05 * (mouseX - camera.position.x), camera.position.y += .05 * (-mouseY - camera.position.y), camera.lookAt(scene.position), renderer.render(scene, camera)
				}, 1e3 / 60)
			}
		}
	}(jQuery), function() {
		window.eqxiuSvg = {
			NAMESPACE: "http://www.w3.org/2000/svg",
			SYMBOLS: {},
			boundingBox: function(a) {
				var b, c = a.parentNode,
					d = document.createElementNS(eqxiuSvg.NAMESPACE, "svg");
				return d.setAttribute("width", "0"), d.setAttribute("height", "0"), d.setAttribute("style", "visibility: hidden; position: absolute; left: 0; top: 0;"), d.appendChild(a), document.body.appendChild(d), b = a.getBBox(), c ? c.appendChild(a) : d.removeChild(a), document.body.removeChild(d), b
			},
			pointsToPolygon: function(a) {
				for (var b = []; a.length >= 2;) b.push(a.shift() + "," + a.shift());
				return b.join(" ")
			},
			symbol: function(a, b, c) {
				var d = c ? c : "#555",
					e = eqxiuSvg.SYMBOLS[a],
					f = '<g fill="' + d + '" id="path_' + b + '">' + e + "</g>";
				return f
			},
			ShapeFromType: function(a, b, c, d, e) {
				return b || (b = 64), c || (c = 64), /symbols\-/.test(a) ? eqxiuSvg.symbol(a.replace(/^symbols\-/, ""), d, e) : "rect" == a ? eqxiuSvg.rect(b, c) : "circle" == a ? eqxiuSvg.ellipse(b, c) : "diamond" == a ? eqxiuSvg.polygon(b, c, 4) : "octagon" == a ? eqxiuSvg.polygon(b, c, 8) : "triangle-up" == a ? eqxiuSvg.triangleUp(b, c) : "triangle-down" == a ? eqxiuSvg.triangleDown(b, c) : "triangle-left" == a ? eqxiuSvg.triangleLeft(b, c) : "triangle-right" == a ? eqxiuSvg.triangleRight(b, c) : "arrow-up" == a ? eqxiuSvg.arrowUp(b, c) : "arrow-down" == a ? eqxiuSvg.arrowDown(b, c) : "arrow-left" == a ? eqxiuSvg.arrowLeft(b, c) : "arrow-right" == a ? eqxiuSvg.arrowRight(b, c) : void 0
			},
			rect: function(a, b) {
				var c = document.createElementNS(eqxiuSvg.NAMESPACE, "rect");
				return c.setAttribute("width", a), c.setAttribute("height", b), c
			},
			ellipse: function(a, b) {
				var c = document.createElementNS(eqxiuSvg.NAMESPACE, "ellipse");
				return c.setAttribute("rx", a / 2), c.setAttribute("ry", b / 2), c.setAttribute("cx", a / 2), c.setAttribute("cy", b / 2), c
			},
			triangleUp: function(a, b) {
				var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
				return c.setAttribute("points", eqxiuSvg.pointsToPolygon([a / 2, 0, a, b, 0, b])), c
			},
			triangleDown: function(a, b) {
				var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
				return c.setAttribute("points", eqxiuSvg.pointsToPolygon([0, 0, a, 0, a / 2, b])), c
			},
			triangleLeft: function(a, b) {
				var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
				return c.setAttribute("points", eqxiuSvg.pointsToPolygon([0, b / 2, a, 0, a, b])), c
			},
			triangleRight: function(a, b) {
				var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
				return c.setAttribute("points", eqxiuSvg.pointsToPolygon([a, b / 2, 0, b, 0, 0])), c
			},
			arrowUp: function(a, b) {
				var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
				return c.setAttribute("points", eqxiuSvg.pointsToPolygon([.5 * a, 0, a, .5 * b, .7 * a, .5 * b, .7 * a, b, .3 * a, b, .3 * a, .5 * b, 0, .5 * b, .5 * a, 0])), c
			},
			arrowDown: function(a, b) {
				var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
				return c.setAttribute("points", eqxiuSvg.pointsToPolygon([.5 * a, b, a, .5 * b, .7 * a, .5 * b, .7 * a, 0, .3 * a, 0, .3 * a, .5 * b, 0, .5 * b, .5 * a, b])), c
			},
			arrowLeft: function(a, b) {
				var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
				return c.setAttribute("points", eqxiuSvg.pointsToPolygon([a, .3 * b, .5 * a, .3 * b, .5 * a, 0, 0, .5 * b, .5 * a, b, .5 * a, .7 * b, a, .7 * b, a, .3 * b])), c
			},
			arrowRight: function(a, b) {
				var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
				return c.setAttribute("points", eqxiuSvg.pointsToPolygon([0, .3 * b, .5 * a, .3 * b, .5 * a, 0, a, .5 * b, .5 * a, b, .5 * a, .7 * b, 0, .7 * b])), c
			},
			polygon: function(a, b, c) {
				var d = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon"),
					e = [];
				if (3 === c) e = [a / 2, 0, a, b, 0, b];
				else if (c > 3) for (var f = a / 2, g = b / 2, h = 0; c > h; h++) {
					var i = f + f * Math.cos(2 * Math.PI * h / c),
						j = g + g * Math.sin(2 * Math.PI * h / c);
					i = Math.round(10 * i) / 10, j = Math.round(10 * j) / 10, e.push(i), e.push(j)
				}
				return d.setAttribute("points", eqxiuSvg.pointsToPolygon(e)), d
			}
		}
	}(), function() {
		window.eqxiuSvg.SYMBOLS = {
			bolt: '<path d="M32 0l-24 16 6 4-14 12 24-12-6-4z"></path>',
			camera: '<path d="M16 20c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4-2.209 0-4-1.791-4-4zM28 8l-3.289-6.643c-0.27-0.789-1.016-1.357-1.899-1.357h-5.492c-0.893 0-1.646 0.582-1.904 1.385l-3.412 6.615h-8.004c-2.209 0-4 1.791-4 4v20h32v-20c0-2.209-1.789-4-4-4zM6 16c-1.105 0-2-0.895-2-2s0.895-2 2-2 2 0.895 2 2-0.895 2-2 2zM20 28c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>',
			"checkmark-circle": '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM13.52 23.383l-7.362-7.363 2.828-2.828 4.533 4.535 9.617-9.617 2.828 2.828-12.444 12.445z"></path>',
			clock: '<path d="M16 4c6.617 0 12 5.383 12 12s-5.383 12-12 12-12-5.383-12-12 5.383-12 12-12zM16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16v0zM21.422 18.578l-3.422-3.426v-7.152h-4.023v7.992c0 0.602 0.277 1.121 0.695 1.492l3.922 3.922 2.828-2.828z"></path>',
			cloud: '<path d="M24 10c-0.379 0-0.738 0.061-1.102 0.111-1.394-2.465-3.972-4.111-6.898-4.111-2.988 0-5.566 1.666-6.941 4.1-0.352-0.047-0.704-0.1-1.059-0.1-4.41 0-8 3.588-8 8 0 4.414 3.59 8 8 8h16c4.41 0 8-3.586 8-8 0-4.412-3.59-8-8-8zM24 22h-16c-2.207 0-4-1.797-4-4 0-2.193 1.941-3.885 4.004-3.945 0.008 0.943 0.172 1.869 0.5 2.744l3.746-1.402c-0.168-0.444-0.25-0.915-0.25-1.397 0-2.205 1.793-4 4-4 1.293 0 2.465 0.641 3.199 1.639-1.929 1.461-3.199 3.756-3.199 6.361h4c0-2.205 1.793-4 4-4s4 1.795 4 4c0 2.203-1.793 4-4 4z"></path>',
			cog: '<path d="M32 17.969v-4l-4.781-1.992c-0.133-0.375-0.273-0.738-0.445-1.094l1.93-4.805-2.829-2.828-4.762 1.961c-0.363-0.176-0.734-0.324-1.117-0.461l-2.027-4.75h-4l-1.977 4.734c-0.398 0.141-0.781 0.289-1.16 0.469l-4.754-1.91-2.828 2.828 1.938 4.711c-0.188 0.387-0.34 0.781-0.485 1.188l-4.703 2.011v4l4.707 1.961c0.145 0.406 0.301 0.801 0.488 1.188l-1.902 4.742 2.828 2.828 4.723-1.945c0.379 0.18 0.766 0.324 1.164 0.461l2.023 4.734h4l1.98-4.758c0.379-0.141 0.754-0.289 1.113-0.461l4.797 1.922 2.828-2.828-1.969-4.773c0.168-0.359 0.305-0.723 0.438-1.094l4.782-2.039zM15.969 22c-3.312 0-6-2.688-6-6s2.688-6 6-6 6 2.688 6 6-2.688 6-6 6z"></path>',
			denied: '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM16 4c2.59 0 4.973 0.844 6.934 2.242l-16.696 16.688c-1.398-1.961-2.238-4.344-2.238-6.93 0-6.617 5.383-12 12-12zM16 28c-2.59 0-4.973-0.844-6.934-2.242l16.696-16.688c1.398 1.961 2.238 4.344 2.238 6.93 0 6.617-5.383 12-12 12z"></path>',
			earth: '<path d="M27.314 4.686c3.022 3.022 4.686 7.040 4.686 11.314s-1.664 8.292-4.686 11.314c-3.022 3.022-7.040 4.686-11.314 4.686s-8.292-1.664-11.314-4.686c-3.022-3.022-4.686-7.040-4.686-11.314s1.664-8.292 4.686-11.314c3.022-3.022 7.040-4.686 11.314-4.686s8.292 1.664 11.314 4.686zM25.899 25.9c1.971-1.971 3.281-4.425 3.821-7.096-0.421 0.62-0.824 0.85-1.073-0.538-0.257-2.262-2.335-0.817-3.641-1.621-1.375 0.927-4.466-1.802-3.941 1.276 0.81 1.388 4.375-1.858 2.598 1.079-1.134 2.050-4.145 6.592-3.753 8.946 0.049 3.43-3.504 0.715-4.729-0.422-0.824-2.279-0.281-6.262-2.434-7.378-2.338-0.102-4.344-0.314-5.25-2.927-0.545-1.87 0.58-4.653 2.584-5.083 2.933-1.843 3.98 2.158 6.731 2.232 0.854-0.894 3.182-1.178 3.375-2.18-1.805-0.318 2.29-1.517-0.173-2.199-1.358 0.16-2.234 1.409-1.512 2.467-2.632 0.614-2.717-3.809-5.247-2.414-0.064 2.206-4.132 0.715-1.407 0.268 0.936-0.409-1.527-1.594-0.196-1.379 0.654-0.036 2.854-0.807 2.259-1.325 1.225-0.761 2.255 1.822 3.454-0.059 0.866-1.446-0.363-1.713-1.448-0.98-0.612-0.685 1.080-2.165 2.573-2.804 0.497-0.213 0.973-0.329 1.336-0.296 0.752 0.868 2.142 1.019 2.215-0.104-1.862-0.892-3.915-1.363-6.040-1.363-3.051 0-5.952 0.969-8.353 2.762 0.645 0.296 1.012 0.664 0.39 1.134-0.483 1.439-2.443 3.371-4.163 3.098-0.893 1.54-1.482 3.238-1.733 5.017 1.441 0.477 1.773 1.42 1.464 1.736-0.734 0.64-1.185 1.548-1.418 2.541 0.469 2.87 1.818 5.515 3.915 7.612 2.644 2.644 6.16 4.1 9.899 4.1s7.255-1.456 9.899-4.1z"></path>',
			eye: '<path d="M16 4c-8.836 0-16 11.844-16 11.844s7.164 12.156 16 12.156 16-12.156 16-12.156-7.164-11.844-16-11.844zM16 24c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zM12 16c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4-2.209 0-4-1.791-4-4z"></path>',
			facebook: '<path d="M17.996 32h-5.996v-16h-4v-5.514l4-0.002-0.007-3.248c0-4.498 1.22-7.236 6.519-7.236h4.412v5.515h-2.757c-2.064 0-2.163 0.771-2.163 2.209l-0.008 2.76h4.959l-0.584 5.514-4.37 0.002-0.004 16z"></path>',
			fork: '<path d="M20 0v3.875c0 1.602-0.625 3.109-1.754 4.238l-11.316 11.254c-1.789 1.785-2.774 4.129-2.883 6.633h-4.047l6 6 6-6h-3.957c0.105-1.438 0.684-2.773 1.711-3.805l11.316-11.25c1.891-1.89 2.93-4.398 2.93-7.070v-3.875h-4zM23.953 26c-0.109-2.504-1.098-4.848-2.887-6.641l-2.23-2.215-2.836 2.821 2.242 2.23c1.031 1.027 1.609 2.367 1.715 3.805h-3.957l6 6 6-6h-4.047z"></path>',
			globe: '<path d="M15 2c-8.284 0-15 6.716-15 15s6.716 15 15 15c8.284 0 15-6.716 15-15s-6.716-15-15-15zM23.487 22c0.268-1.264 0.437-2.606 0.492-4h3.983c-0.104 1.381-0.426 2.722-0.959 4h-3.516zM6.513 12c-0.268 1.264-0.437 2.606-0.492 4h-3.983c0.104-1.381 0.426-2.722 0.959-4h3.516zM21.439 12c0.3 1.28 0.481 2.62 0.54 4h-5.979v-4h5.439zM16 10v-5.854c0.456 0.133 0.908 0.355 1.351 0.668 0.831 0.586 1.625 1.488 2.298 2.609 0.465 0.775 0.867 1.638 1.203 2.578h-4.852zM10.351 7.422c0.673-1.121 1.467-2.023 2.298-2.609 0.443-0.313 0.895-0.535 1.351-0.668v5.854h-4.852c0.336-0.94 0.738-1.803 1.203-2.578zM14 12v4h-5.979c0.059-1.38 0.24-2.72 0.54-4h5.439zM2.997 22c-0.533-1.278-0.854-2.619-0.959-4h3.983c0.055 1.394 0.224 2.736 0.492 4h-3.516zM8.021 18h5.979v4h-5.439c-0.3-1.28-0.481-2.62-0.54-4zM14 24v5.854c-0.456-0.133-0.908-0.355-1.351-0.668-0.831-0.586-1.625-1.488-2.298-2.609-0.465-0.775-0.867-1.638-1.203-2.578h4.852zM19.649 26.578c-0.673 1.121-1.467 2.023-2.298 2.609-0.443 0.312-0.895 0.535-1.351 0.668v-5.854h4.852c-0.336 0.94-0.738 1.802-1.203 2.578zM16 22v-4h5.979c-0.059 1.38-0.24 2.72-0.54 4h-5.439zM23.98 16c-0.055-1.394-0.224-2.736-0.492-4h3.516c0.533 1.278 0.855 2.619 0.959 4h-3.983zM25.958 10h-2.997c-0.582-1.836-1.387-3.447-2.354-4.732 1.329 0.636 2.533 1.488 3.585 2.54 0.671 0.671 1.261 1.404 1.766 2.192zM5.808 7.808c1.052-1.052 2.256-1.904 3.585-2.54-0.967 1.285-1.771 2.896-2.354 4.732h-2.997c0.504-0.788 1.094-1.521 1.766-2.192zM4.042 24h2.997c0.583 1.836 1.387 3.447 2.354 4.732-1.329-0.636-2.533-1.488-3.585-2.54-0.671-0.671-1.261-1.404-1.766-2.192zM24.192 26.192c-1.052 1.052-2.256 1.904-3.585 2.54 0.967-1.285 1.771-2.896 2.354-4.732h2.997c-0.504 0.788-1.094 1.521-1.766 2.192z"></path>',
			happy: '<path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM16 18.711c3.623 0 7.070-0.963 10-2.654-0.455 5.576-4.785 9.942-10 9.942-5.215 0-9.544-4.371-10-9.947 2.93 1.691 6.377 2.658 10 2.658zM8 11c0-1.657 0.895-3 2-3s2 1.343 2 3c0 1.657-0.895 3-2 3-1.105 0-2-1.343-2-3zM20 11c0-1.657 0.895-3 2-3s2 1.343 2 3c0 1.657-0.895 3-2 3-1.105 0-2-1.343-2-3z"></path>',
			"heart-fill": '<path d="M16 5.844c-1.613-2.266-4.129-3.844-7.113-3.844-4.903 0-8.887 3.992-8.887 8.891v0.734l16.008 18.375 15.992-18.375v-0.734c0-4.899-3.984-8.891-8.887-8.891-2.984 0-5.5 1.578-7.113 3.844z"></path>',
			"heart-stroke": '<path d="M23.113 6c2.457 0 4.492 1.82 4.836 4.188l-11.945 13.718-11.953-13.718c0.344-2.368 2.379-4.188 4.836-4.188 2.016 0 3.855 2.164 3.855 2.164l3.258 3.461 3.258-3.461c0 0 1.84-2.164 3.855-2.164zM23.113 2c-2.984 0-5.5 1.578-7.113 3.844-1.613-2.266-4.129-3.844-7.113-3.844-4.903 0-8.887 3.992-8.887 8.891v0.734l16.008 18.375 15.992-18.375v-0.734c0-4.899-3.984-8.891-8.887-8.891v0z"></path>',
			home: '<path d="M16 0l-16 16h4v16h24v-16h4l-16-16zM24 28h-6v-6h-4v6h-6v-14.344l8-5.656 8 5.656v14.344z"></path>',
			iphone: '<path d="M16 0h-8c-4.418 0-8 3.582-8 8v16c0 4.418 3.582 8 8 8h8c4.418 0 8-3.582 8-8v-16c0-4.418-3.582-8-8-8zM12 30.062c-1.139 0-2.062-0.922-2.062-2.062s0.924-2.062 2.062-2.062 2.062 0.922 2.062 2.062-0.923 2.062-2.062 2.062zM20 24h-16v-16c0-2.203 1.795-4 4-4h8c2.203 0 4 1.797 4 4v16z"></path>',
			lock: '<path d="M14 0c-5.508 0-9.996 4.484-9.996 10v2h-4.004v14c0 3.309 2.691 6 6 6h12c3.309 0 6-2.691 6-6v-16c0-5.516-4.488-10-10-10zM11.996 24c-1.101 0-1.996-0.895-1.996-2s0.895-2 1.996-2c1.105 0 2 0.895 2 2s-0.894 2-2 2zM20 12h-11.996v-2c0-3.309 2.691-6 5.996-6 3.309 0 6 2.691 6 6v2z"></path>',
			mail: '<path d="M15.996 15.457l16.004-7.539v-3.918h-32v3.906zM16.004 19.879l-16.004-7.559v15.68h32v-15.656z"></path>',
			"minus-circle": '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM24 18h-16v-4h16v4z"></path>',
			moon: '<path d="M24.633 22.184c-8.188 0-14.82-6.637-14.82-14.82 0-2.695 0.773-5.188 2.031-7.363-6.824 1.968-11.844 8.187-11.844 15.644 0 9.031 7.32 16.355 16.352 16.355 7.457 0 13.68-5.023 15.648-11.844-2.18 1.254-4.672 2.028-7.367 2.028z"></path>',
			paperclip: '<path d="M17.293 15.292l-2.829-2.829-4 4c-1.953 1.953-1.953 5.119 0 7.071 1.953 1.953 5.118 1.953 7.071 0l10.122-9.879c3.123-3.124 3.123-8.188 0-11.313-3.125-3.124-8.19-3.124-11.313 0l-11.121 10.88c-4.296 4.295-4.296 11.26 0 15.557 4.296 4.296 11.261 4.296 15.556 0l6-6-2.829-2.829-5.999 6c-2.733 2.732-7.166 2.732-9.9 0-2.733-2.732-2.733-7.166 0-9.899l11.121-10.881c1.562-1.562 4.095-1.562 5.656 0 1.563 1.563 1.563 4.097 0 5.657l-10.121 9.879c-0.391 0.391-1.023 0.391-1.414 0s-0.391-1.023 0-1.414l4-4z"></path>',
			pin: '<path d="M17.070 2.93c-3.906-3.906-10.234-3.906-14.141 0-3.906 3.904-3.906 10.238 0 14.14 0.001 0 7.071 6.93 7.071 14.93 0-8 7.070-14.93 7.070-14.93 3.907-3.902 3.907-10.236 0-14.14zM10 14c-2.211 0-4-1.789-4-4s1.789-4 4-4 4 1.789 4 4-1.789 4-4 4z"></path>',
			"plus-circle": '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM24 18h-6v6h-4v-6h-6v-4h6v-6h4v6h6v4z"></path>',
			rain: '<path d="M23.998 6c-0.375 0-0.733 0.061-1.103 0.111-1.389-2.465-3.969-4.111-6.895-4.111-2.987 0-5.565 1.666-6.94 4.1-0.353-0.047-0.705-0.1-1.060-0.1-4.41 0-8 3.588-8 8s3.59 8 8 8h15.998c4.414 0 8-3.588 8-8s-3.586-8-8-8zM23.998 18h-15.998c-2.207 0-4-1.795-4-4 0-2.193 1.941-3.885 4.004-3.945 0.009 0.943 0.172 1.869 0.5 2.744l3.746-1.402c-0.168-0.444-0.25-0.915-0.25-1.397 0-2.205 1.793-4 4-4 1.293 0 2.465 0.641 3.199 1.639-1.928 1.461-3.199 3.756-3.199 6.361h4c0-2.205 1.795-4 3.998-4 2.211 0 4 1.795 4 4s-1.789 4-4 4zM3.281 29.438c-0.75 0.75-1.969 0.75-2.719 0s-0.75-1.969 0-2.719 5.438-2.719 5.438-2.719-1.969 4.688-2.719 5.438zM11.285 29.438c-0.75 0.75-1.965 0.75-2.719 0-0.75-0.75-0.75-1.969 0-2.719 0.754-0.75 5.438-2.719 5.438-2.719s-1.965 4.688-2.719 5.438zM19.28 29.438c-0.75 0.75-1.969 0.75-2.719 0s-0.75-1.969 0-2.719 5.437-2.719 5.437-2.719-1.968 4.688-2.718 5.438z"></path>',
			ribbon: '<path d="M8 20c-1.41 0-2.742-0.289-4-0.736v12.736l4-4 4 4v-12.736c-1.258 0.447-2.59 0.736-4 0.736zM0 8c0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8-4.418 0-8-3.582-8-8z"></path>',
			sad: '<path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM8 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM20 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM9.997 24.398l-2.573-1.544c1.749-2.908 4.935-4.855 8.576-4.855 3.641 0 6.827 1.946 8.576 4.855l-2.573 1.544c-1.224-2.036-3.454-3.398-6.003-3.398-2.549 0-4.779 1.362-6.003 3.398z"></path>',
			smiley: '<path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM8 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM20 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM22.003 19.602l2.573 1.544c-1.749 2.908-4.935 4.855-8.576 4.855s-6.827-1.946-8.576-4.855l2.573-1.544c1.224 2.036 3.454 3.398 6.003 3.398s4.779-1.362 6.003-3.398z"></path>',
			star: '<path d="M22.137 19.625l9.863-7.625h-12l-4-12-4 12h-12l9.875 7.594-3.875 12.406 10.016-7.68 9.992 7.68z"></path>',
			sun: '<path d="M16.001 8c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 7.999-3.582 7.999-8s-3.581-8-7.999-8v0zM14 2c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM4 6c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM2 14c1.105 0 2 0.895 2 2 0 1.107-0.895 2-2 2s-2-0.893-2-2c0-1.105 0.895-2 2-2zM4 26c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM14 30c0-1.109 0.895-2 2-2 1.108 0 2 0.891 2 2 0 1.102-0.892 2-2 2-1.105 0-2-0.898-2-2zM24 26c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM30 18c-1.104 0-2-0.896-2-2 0-1.107 0.896-2 2-2s2 0.893 2 2c0 1.104-0.896 2-2 2zM24 6c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2z"></path>',
			"thin-arrow-down": '<path d="M4.586 19.414l10 10c0.781 0.781 2.047 0.781 2.828 0l10-10c0.781-0.781 0.781-2.047 0-2.828s-2.047-0.781-2.828 0l-6.586 6.586v-19.172c0-1.105-0.895-2-2-2s-2 0.895-2 2v19.172l-6.586-6.586c-0.391-0.39-0.902-0.586-1.414-0.586s-1.024 0.195-1.414 0.586c-0.781 0.781-0.781 2.047 0 2.828z"></path>',
			"thin-arrow-down-left": '<path d="M18 28c1.105 0 2-0.895 2-2s-0.895-2-2-2h-7.172l16.586-16.586c0.781-0.781 0.781-2.047 0-2.828-0.391-0.391-0.902-0.586-1.414-0.586s-1.024 0.195-1.414 0.586l-16.586 16.586v-7.172c0-1.105-0.895-2-2-2s-2 0.895-2 2v14h14z"></path>',
			"thin-arrow-down-right": '<path d="M28 14c0-1.105-0.895-2-2-2s-2 0.895-2 2v7.172l-16.586-16.586c-0.781-0.781-2.047-0.781-2.828 0-0.391 0.391-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414l16.586 16.586h-7.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h14v-14z"></path>',
			"thin-arrow-left": '<path d="M12.586 4.586l-10 10c-0.781 0.781-0.781 2.047 0 2.828l10 10c0.781 0.781 2.047 0.781 2.828 0s0.781-2.047 0-2.828l-6.586-6.586h19.172c1.105 0 2-0.895 2-2s-0.895-2-2-2h-19.172l6.586-6.586c0.39-0.391 0.586-0.902 0.586-1.414s-0.195-1.024-0.586-1.414c-0.781-0.781-2.047-0.781-2.828 0z"></path>',
			"thin-arrow-right": '<path d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"></path>',
			"thin-arrow-up": '<path d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z"></path>',
			"thin-arrow-up-left": '<path d="M4 18c0 1.105 0.895 2 2 2s2-0.895 2-2v-7.172l16.586 16.586c0.781 0.781 2.047 0.781 2.828 0 0.391-0.391 0.586-0.902 0.586-1.414s-0.195-1.024-0.586-1.414l-16.586-16.586h7.172c1.105 0 2-0.895 2-2s-0.895-2-2-2h-14v14z"></path>',
			"thin-arrow-up-right": '<path d="M26.001 4c-0 0-0.001 0-0.001 0h-11.999c-1.105 0-2 0.895-2 2s0.895 2 2 2h7.172l-16.586 16.586c-0.781 0.781-0.781 2.047 0 2.828 0.391 0.391 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586l16.586-16.586v7.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-14h-1.999z"></path>',
			twitter: '<path d="M32 6.076c-1.177 0.522-2.443 0.875-3.771 1.034 1.355-0.813 2.396-2.099 2.887-3.632-1.269 0.752-2.674 1.299-4.169 1.593-1.198-1.276-2.904-2.073-4.792-2.073-3.626 0-6.565 2.939-6.565 6.565 0 0.515 0.058 1.016 0.17 1.496-5.456-0.274-10.294-2.888-13.532-6.86-0.565 0.97-0.889 2.097-0.889 3.301 0 2.278 1.159 4.287 2.921 5.465-1.076-0.034-2.088-0.329-2.974-0.821-0.001 0.027-0.001 0.055-0.001 0.083 0 3.181 2.263 5.834 5.266 6.437-0.551 0.15-1.131 0.23-1.73 0.23-0.423 0-0.834-0.041-1.235-0.118 0.835 2.608 3.26 4.506 6.133 4.559-2.247 1.761-5.078 2.81-8.154 2.81-0.53 0-1.052-0.031-1.566-0.092 2.905 1.863 6.356 2.95 10.064 2.95 12.076 0 18.679-10.004 18.679-18.68 0-0.285-0.006-0.568-0.019-0.849 1.283-0.926 2.396-2.082 3.276-3.398z"></path>',
			umbrella: '<path d="M16 0c-8.82 0-16 7.178-16 16h4c0-0.826 0.676-1.5 1.5-1.5 0.828 0 1.5 0.674 1.5 1.5h4c0-0.826 0.676-1.5 1.5-1.5 0.828 0 1.5 0.674 1.5 1.5v10c0 1.102-0.895 2-2 2-1.102 0-2-0.898-2-2h-4c0 3.309 2.695 6 6 6 3.312 0 6-2.691 6-6v-10c0-0.826 0.676-1.5 1.5-1.5 0.828 0 1.498 0.674 1.498 1.5h4c0-0.826 0.68-1.5 1.5-1.5 0.828 0 1.5 0.674 1.5 1.5h4c0-8.822-7.172-16-15.998-16z"></path>',
			unlock: '<path d="M14.004 0c-5.516 0-9.996 4.484-9.996 10h3.996c0-3.309 2.688-6 6-6 3.305 0 5.996 2.691 5.996 6v2h-20v14c0 3.309 2.695 6 6 6h12c3.305 0 6-2.691 6-6v-16c0-5.516-4.488-10-9.996-10zM12 24c-1.102 0-2-0.895-2-2s0.898-2 2-2c1.109 0 2 0.895 2 2s-0.891 2-2 2z"></path>',
			user: '<path d="M12 16c-6.625 0-12 5.375-12 12 0 2.211 1.789 4 4 4h16c2.211 0 4-1.789 4-4 0-6.625-5.375-12-12-12zM6 6c0-3.314 2.686-6 6-6s6 2.686 6 6c0 3.314-2.686 6-6 6-3.314 0-6-2.686-6-6z"></path>',
			wondering: '<path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM23.304 18.801l0.703 2.399-13.656 4-0.703-2.399zM8 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM20 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2z"></path>',
			"x-circle": '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM23.914 21.086l-2.828 2.828-5.086-5.086-5.086 5.086-2.828-2.828 5.086-5.086-5.086-5.086 2.828-2.828 5.086 5.086 5.086-5.086 2.828 2.828-5.086 5.086 5.086 5.086z"></path>',
			android: '<path d="M50.143,45.057h-0.241c-2.13,0-3.857-1.735-3.857-3.875V24.713 c0-2.14,1.727-3.875,3.857-3.875h0.241c2.13,0,3.857,1.735,3.857,3.875v16.469C54,43.323,52.273,45.057,50.143,45.057z M39.777,51.112h-2.169v8.961c0,2.14-1.727,3.875-3.857,3.875h-0.241c-2.13,0-3.857-1.735-3.857-3.875v-8.961h-5.304v8.961 c0,2.14-1.727,3.875-3.857,3.875H20.25c-2.13,0-3.857-1.735-3.857-3.875v-8.961h-2.17c-2.663,0-4.821-2.169-4.821-4.844V21.565 h35.196v24.704C44.598,48.944,42.44,51.112,39.777,51.112z M18.451,5.498l-2.777-4.832c-0.1-0.174-0.041-0.396,0.132-0.496 l0.209-0.121c0.173-0.1,0.394-0.041,0.494,0.133l2.802,4.877c2.297-1.091,4.863-1.705,7.573-1.705c2.856,0,5.552,0.681,7.941,1.885 l2.906-5.056c0.1-0.174,0.321-0.233,0.494-0.133l0.209,0.121c0.173,0.1,0.232,0.322,0.132,0.496l-2.889,5.028 c4.989,2.866,8.459,8.094,8.901,14.169H9.191C9.643,13.645,13.271,8.316,18.451,5.498z M35.076,13.572 c0.865,0,1.567-0.705,1.567-1.574c0-0.87-0.702-1.574-1.567-1.574c-0.865,0-1.567,0.705-1.567,1.574 C33.509,12.867,34.21,13.572,35.076,13.572z M18.924,13.572c0.865,0,1.567-0.705,1.567-1.574c0-0.87-0.702-1.574-1.567-1.574 c-0.865,0-1.567,0.705-1.567,1.574C17.357,12.867,18.059,13.572,18.924,13.572z M4.098,45.057H3.857C1.727,45.057,0,43.323,0,41.182 V24.713c0-2.14,1.727-3.875,3.857-3.875h0.241c2.13,0,3.857,1.735,3.857,3.875v16.469C7.955,43.323,6.228,45.057,4.098,45.057z"/>',
			apple: '<path d="M43.061,34.522c0,8.67,8.393,12.374,8.393,12.374 c-2.057,8.63-9.252,15.172-9.252,15.172c-1.613,1.607-4.567,1.852-4.567,1.852c-2.377,0-5.309-1.34-5.309-1.34 c-2.259-1.299-5.426-1.301-5.426-1.301c-2.792,0-5.309,1.261-5.309,1.261C19.334,63.835,16.399,64,16.399,64 c-2.568,0-3.982-1.498-3.982-1.498C-0.546,50.658,0.003,35.271,0.003,35.271c0-19.645,15.576-19.586,15.576-19.586 c3.626,0,4.919,0.827,4.919,0.827c3.866,1.882,5.777,1.892,5.777,1.892c1.5,0,5.816-1.931,5.816-1.931 c2.223-1.052,5.778-1.064,5.778-1.064c8.325,0,11.984,6.424,11.984,6.424C42.702,26.182,43.061,34.522,43.061,34.522z M25.729,14.818C25.729,1.075,38.377,0,38.377,0C38.377,14.797,25.729,14.818,25.729,14.818z"/>',
			baidu: '<path d="M57.549,28.923c-0.219,7.717-6.714,8.677-6.714,8.677 c-8.176-0.648-7.673-8.677-7.673-8.677c-0.795-8.379,5.755-9.641,5.755-9.641C58,19.412,57.549,28.923,57.549,28.923z M37.407,20.246c-5.931,0-5.755-8.677-5.755-8.677c1.708-7.93,7.673-9.641,7.673-9.641c5.472,0.78,6.714,8.677,6.714,8.677 C44.174,21.255,37.407,20.246,37.407,20.246z M37.407,32.779c2.75,3.707,7.673,8.677,7.673,8.677 c7.267,4.21,7.673,10.605,7.673,10.605c0,13.939-14.387,10.605-14.387,10.605c-1.873-0.813-7.673-1.928-7.673-1.928h-4.796 c-2.325,0.456-10.551,1.928-10.551,1.928c-10.734,0-11.51-10.605-11.51-10.605c0-6.349,4.796-9.641,4.796-9.641 c6.151-4.696,9.592-9.641,9.592-9.641c5.137-7.284,9.591-6.749,9.591-6.749C33.569,25.744,37.407,32.779,37.407,32.779z M25.897,35.672H23.02v5.785h-6.714c-5.859,0.902-5.755,8.677-5.755,8.677c-0.551,5.375,5.755,7.713,5.755,7.713h9.591V35.672z M32.611,53.025V41.456h-4.796v12.533c-0.017,2.653,3.837,3.856,3.837,3.856h10.551v-16.39h-4.796v12.533h-2.877 C33.473,53.886,32.611,53.025,32.611,53.025z M17.265,46.277h5.755v7.713h-4.796c0,0-2.647-0.459-2.877-3.856 C15.346,50.133,15.452,46.899,17.265,46.277z M21.101,20.246c-6.799,0-6.714-10.605-6.714-10.605c0-9.31,6.714-9.641,6.714-9.641 c5.997,0,6.714,9.641,6.714,9.641C27.815,19.489,21.101,20.246,21.101,20.246z M6.714,33.743C0.544,33.743,0,24.102,0,24.102 c0-8.281,6.714-9.641,6.714-9.641c6.751,0,7.673,9.641,7.673,9.641C14.387,32.77,6.714,33.743,6.714,33.743z"/>',
			douban: '<path d="M0,64v-5.818h20.945c0,0-4.899-9.901-8.145-11.636l8.145-3.491 c0,0,5.56,12.555,5.818,15.127h13.964c0,0,5.825-11.048,5.818-15.127l6.982,3.491c0,0-3.36,10.254-5.295,11.512 c-0.447,0.029-0.656,0.069-0.523,0.124c0.157,0.065,0.336-0.002,0.523-0.124C51.09,57.875,64,58.182,64,58.182V64H0z M5.818,40.727 v-25.6h52.364v25.6H5.818z M48.873,20.945H15.127v13.964h33.745V20.945z M3.491,0H64v5.818H3.491V0z"/>',
			googleplay: '<path d="M55.532,34.556c-0.828,0.473-5.547,3.122-11.786,6.618 l-8.591-8.715l9.908-9.829c5.385,3.012,9.44,5.281,10.469,5.858C58,29.871,57.958,33.17,55.532,34.556z M3.177,0.02 c0.741-0.078,1.548,0.064,2.355,0.511c1.54,0.853,23.514,13.139,37.89,21.18l-9.536,9.46L3.177,0.02z M1.36,0.75l31.244,31.694 L2.074,62.731C0.89,62.224,0,61.115,0,59.574C0,56.662,0,5.559,0,3.55C0,2.412,0.532,1.401,1.36,0.75z M42.112,42.089 C27.972,50.01,7.556,61.427,5.419,62.575c-0.32,0.172-0.655,0.291-0.993,0.367l29.446-29.212L42.112,42.089z"/>',
			kaixinwang: '<path d="M60.549,30.164c0,0-3.494,8.614-16.984,12.25c0,0-0.502,11.237,0,15.076c0,0,1.59,4.938-4.718,3.769c0,0-6.539-0.588-13.21-9.423c0,0-2.071-1.431-2.831,0c0,0-5.588,5.249-9.436,7.538c0,0-7.049,0.734-7.549-3.769c0,0-2.985-13.205,0.944-21.672c0,0-0.269-2.116-0.944-2.827c0,0-8.864-10.313-4.718-22.615c0,0,1.108-1.884,5.661-0.942c0,0,7.295,4.273,8.492,4.711c0,0,3.262,0.609,3.774-0.942c0,0,7.578-9.802,14.153-11.307c0,0,7.228-0.583,7.549,6.596c0,0,2.168,10.163,1.887,13.192c0,0,1.659,4.159,4.718,3.769c0,0,9.924-0.088,12.266,1.885C59.605,25.453,61.958,26.999,60.549,30.164z M13.371,27.337c0.013-2.519-1.887-2.827-1.887-2.827c-3.341,0-2.831,1.884-2.831,1.884c-0.146,2.405,2.831,2.827,2.831,2.827C13.764,28.831,13.371,27.337,13.371,27.337zM14.314,32.991c-1.477,8.602,6.605,11.307,6.605,11.307c6.04,0.515,11.323-4.711,11.323-4.711c-7.647,2.452-11.323,0.942-11.323,0.942C14.869,38.902,14.314,32.991,14.314,32.991z M36.016,18.857c0,0-3.136-1.152-5.661,0.942c0,0-0.944,0.585-0.944-0.942c0,0-3.121-5.667-7.549-1.885c0,0-6.72,5.505-2.831,13.192c0,0,1.414,3.005,6.605,0.942c0,0,0.403,2.079,1.887,3.769c0,0,4.505,3.149,7.549-3.769C35.073,31.107,38.588,24.505,36.016,18.857z M41.678,33.933c0,0-3.622-0.382-3.774,2.827c0,0-0.038,2.695,2.831,2.827c0,0,2.968-0.587,2.831-2.827C43.565,36.76,43.968,33.933,41.678,33.933zM33.186,28.28c-2.024-0.756-1.887-3.769-1.887-3.769c0.251-1.965,2.831-2.827,2.831-2.827c2.763,0.114,0.944,3.769,0.944,3.769C34.54,29.362,33.186,28.28,33.186,28.28z M23.75,25.453c-2.17-0.976,0-4.711,0-4.711c1.118-2.725,2.831-1.885,2.831-1.885c2.222,0.41,0.944,3.769,0.944,3.769C27.212,24.78,23.75,25.453,23.75,25.453z"/>',
			laiwang: '<path d="M58.659,31.066V36.4h-5.618v-3.138h2.809v-4.707c3.787-6.594,2.185-13.179,2.185-13.179c-4.56-14.795-19.35-10.669-19.35-10.669c-0.413-0.661-4.057-2.51-4.057-2.51C38.404,0.023,43.679,0,43.679,0C59.986,1.348,61.78,14.748,61.78,14.748C64,25.266,58.659,31.066,58.659,31.066z M52.56,29.556c0,6.135-2.082,11.777-5.565,16.263v6.759h-7.79C35.388,54.753,30.98,56,26.28,56C11.766,56,0,44.16,0,29.556C0,14.951,11.766,3.111,26.28,3.111C40.794,3.111,52.56,14.951,52.56,29.556z M26.28,8.4c-11.611,0-21.024,9.472-21.024,21.156c0,11.684,9.413,21.156,21.024,21.156c3.336,0,6.489-0.786,9.291-2.178h7.405v-6.135c2.711-3.562,4.328-8.01,4.328-12.843C47.304,17.872,37.891,8.4,26.28,8.4z M37.411,32.667c-1.708,0-3.092-1.393-3.092-3.111c0-1.718,1.384-3.111,3.092-3.111c1.708,0,3.092,1.393,3.092,3.111C40.502,31.274,39.118,32.667,37.411,32.667z M26.28,32.667c-1.708,0-3.092-1.393-3.092-3.111c0-1.718,1.384-3.111,3.092-3.111c1.708,0,3.092,1.393,3.092,3.111C29.372,31.274,27.988,32.667,26.28,32.667z M15.15,32.667c-1.708,0-3.092-1.393-3.092-3.111c0-1.718,1.384-3.111,3.092-3.111c1.707,0,3.092,1.393,3.092,3.111C18.242,31.274,16.857,32.667,15.15,32.667z"/>',
			computer: '<path d="M61,44H38.676l6.199,8.769c0,0,1.125,1.64,0,3.231h-9.289h-6.697h-9.733c-1.156-1.591,0-3.231,0-3.231L25.527,44H3c-1.657,0-3-1.343-3-3V3c0-1.657,1.343-3,3-3h58c1.657,0,3,1.343,3,3v38C64,42.657,62.657,44,61,44z M32,42c1.105,0,2-0.895,2-2s-0.895-2-2-2c-1.105,0-2,0.895-2,2S30.895,42,32,42z M60,5H4v31h56V5z"/>',
			dengpao: '<path d="M40,44.969V52c0,3.314-2.686,6-6,6h-1v3.5c0,1.381-1.119,2.5-2.5,2.5h-11c-1.381,0-2.5-1.119-2.5-2.5V58h-1c-3.314,0-6-2.686-6-6v-7.041C3.936,40.403,0,33.171,0,25C0,11.193,11.193,0,25,0s25,11.193,25,25C50,33.173,46.068,40.413,40,44.969z M25,7C15.059,7,7,15.059,7,25c0,0.585,0.033,1.162,0.088,1.733c0.02,0.206,0.056,0.407,0.082,0.611c0.047,0.357,0.095,0.714,0.162,1.064c0.048,0.251,0.11,0.496,0.168,0.743c0.069,0.29,0.139,0.58,0.222,0.864c0.079,0.273,0.168,0.542,0.26,0.809c0.083,0.242,0.17,0.482,0.263,0.719c0.113,0.29,0.232,0.575,0.359,0.858c0.089,0.195,0.183,0.386,0.278,0.577c0.152,0.307,0.307,0.611,0.475,0.907c0.078,0.137,0.163,0.268,0.244,0.402c0.202,0.334,0.406,0.667,0.629,0.987c0.006,0.009,0.014,0.018,0.02,0.027c1.674,2.393,3.914,4.354,6.527,5.699C16.3,41.532,16,42.228,16,43v6c0,1.657,1.343,3,3,3h12c1.657,0,3-1.343,3-3v-6c0-0.772-0.3-1.468-0.778-2c2.998-1.544,5.497-3.904,7.222-6.788c0.062-0.103,0.127-0.203,0.186-0.306c0.177-0.31,0.34-0.629,0.499-0.951c0.09-0.181,0.179-0.361,0.262-0.545c0.13-0.286,0.251-0.577,0.366-0.871c0.093-0.236,0.179-0.474,0.261-0.715c0.091-0.267,0.18-0.535,0.259-0.808c0.084-0.287,0.154-0.578,0.224-0.871c0.058-0.245,0.119-0.487,0.167-0.736c0.068-0.353,0.117-0.712,0.164-1.072c0.026-0.202,0.062-0.401,0.081-0.605C42.967,26.163,43,25.586,43,25C43,15.059,34.941,7,25,7z M28.5,48h-7c-1.381,0-2.5-1.119-2.5-2.5v-1c0-1.381,1.119-2.5,2.5-2.5h7c1.381,0,2.5,1.119,2.5,2.5v1C31,46.881,29.881,48,28.5,48z"/>',
			normaluser: '<path d="M31.5,64C59.433,56.326,63,32.541,63,24.694C63,16.846,60.61,8.58,54.309,0C49.566,1.885,39.207,2.721,31.5,0C23.794,2.721,13.434,1.885,8.692,0C2.39,8.58,0,16.846,0,24.694C0,32.541,3.568,56.326,31.5,64z"/>',
			pad: '<path d="M49,64H3c-1.657,0-3-1.343-3-3V3c0-1.657,1.343-3,3-3h46c1.657,0,3,1.343,3,3v58C52,62.657,50.657,64,49,64z M26,62c1.657,0,3-1.343,3-3s-1.343-3-3-3s-3,1.343-3,3S24.343,62,26,62z M45,6H7v48h38V6z"/>',
			pengyou: '<path d="M52.671,41.29c0,0,3.271,9.101-5.532,11.011c0,0-7.661,1.98-11.065-11.011c0,0-3.688-10.606-3.688-12.846c0,0,11.041-2.228,18.442-1.835c0,0,11.116,0.842,11.065,9.175C61.892,35.785,62.397,43.503,52.671,41.29z M52.671,22.939c-5.253,0.729-21.208,3.67-21.208,3.67V7.34C31.264,1.286,39.762,0,39.762,0c7.386,0.19,6.455,7.34,6.455,7.34c10.325-4.012,11.065,7.34,11.065,7.34C57.501,18.724,52.671,22.939,52.671,22.939z M7.488,28.444c0,0-8.17-0.479-7.377-8.258c0,0-1.714-6.644,8.299-6.423c0,0-3.114-11.531,11.065-11.011c0,0,6.523-0.627,8.299,7.34c0,0,3.449,12.205,2.766,16.516C30.541,26.609,18.663,27.596,7.488,28.444z M31.463,28.444c-0.872,4.484,1.844,12.846,1.844,12.846c3.235,6.336,0.922,11.011,0.922,11.011c-2.931,8.699-11.987,7.34-11.987,7.34c-6.323-1.717-6.455-8.258-6.455-8.258c-5.134-0.13-7.377-1.835-7.377-1.835c-5.279-1.891-2.766-11.011-2.766-11.011C14.528,26.962,31.463,28.444,31.463,28.444z"/>',
			qq: '<path d="M173.94,152.517c0,0-7.239,0.531-15.89-15.949c0,0-7.897,20.246-13.904,24.921c0,0,15.89,5.883,15.89,17.943c0,0-2.979,19.937-36.746,19.937c0,0-22.406,0.632-30.787-13.956h-2.979v-0.309l-2.979,0.309C78.162,200,55.756,199.368,55.756,199.368c-33.767,0-36.746-19.937-36.746-19.937c0-12.06,15.89-17.943,15.89-17.943c-6.007-4.675-13.904-24.921-13.904-24.921c-8.651,16.48-15.89,15.949-15.89,15.949c-17.583-29.635,15.89-60.807,15.89-60.807c-5.712-18.322,5.959-26.915,5.959-26.915C29.54,0.66,89.523,0,89.523,0s59.983,0.66,62.568,64.795c0,0,11.671,8.593,5.959,26.915C158.05,91.709,191.523,122.882,173.94,152.517z"/>',
			qqliulanqi: '<path d="M64,55.332c0,4.57-3.122,8.311-7.081,8.642V64H31.793c-0.02,0-0.039-0.007-0.059-0.007C14.184,63.849,0,49.584,0,32C0,14.327,14.327,0,32,0s32,14.327,32,32c0,5.69-1.492,11.029-4.096,15.66C62.338,49.11,64,51.999,64,55.332z M32,14.222c-9.818,0-17.778,7.959-17.778,17.778c0,7.131,4.208,13.262,10.268,16.092c1.219-2.013,3.562-3.394,6.287-3.394c0.893,0,1.743,0.156,2.533,0.424c1.731-5.002,6.017-8.551,11.047-8.551c1.599,0,3.12,0.368,4.512,1.017c0.583-1.759,0.91-3.634,0.91-5.588C49.778,22.182,41.818,14.222,32,14.222z"/>',
			qqweibo: '<path d="M60.847,26.088c-8.08-2.418-13.422-13.494-13.422-13.494c-2.424,0-2.684-2.699-2.684-2.699c0-3.708,2.684-3.598,2.684-3.598c3.337,0,3.579,3.598,3.579,3.598c0.013,1.683-1.79,2.699-1.79,2.699c2.627,8.909,12.527,11.695,12.527,11.695C64,25.295,60.847,26.088,60.847,26.088z M54.583,16.192c0,0-1.339,0.621-0.895-0.9c0,0,1.906-1.828,1.79-5.398c0,0-0.266-8.096-8.053-8.096c0,0-7.158,0.059-7.158,8.096c0,0,0.001,8.096,7.158,8.096c0,0,1.785,1.974,0,1.799c0,0-8.948-0.952-8.948-9.895c0,0,0.135-9.895,9.843-9.895c0,0,8.948,1.557,8.948,9.895C57.267,9.895,56.836,14.713,54.583,16.192z M17.001,38.682h-3.579c0,0-2.586-0.992-0.895-2.699c0,0,17.896,2.971,17.896-14.393c0,0-0.252-13.494-13.422-13.494c0,0-14.317,1.116-14.317,14.393c0,0,0.037,4.655,1.79,6.297c0,0,0.568,3.071-1.79,0.9c0,0-2.521-3.105-2.684-7.197c0,0,1.061-17.092,17.001-17.092c0,0,16.107,0.699,16.107,16.193C33.108,21.59,32.527,38.682,17.001,38.682z M12.527,24.289c0,0-1.74-4.156,1.79-7.197c0,0,5.442-2.025,8.053,2.699c0,0,1.083,4.133-1.79,6.297c0,0-3.242,1.586-6.264,0c0,0-9.393,9.066-8.948,17.992c0.029,0.574,0,10.795,0,10.795S4.337,58,1.79,55.774V44.08C1.79,44.08,4.022,30.876,12.527,24.289z"/>',
			qqzone: '<path d="M49.096,31.429L51.726,55L32.438,43.651L13.151,55l1.753-22.698L0,19.206h21.918L32.438,0l11.397,19.206H64L49.096,31.429z M47.342,21.825H21.041l15.781,2.619L17.534,41.032h29.808L29.808,37.54L47.342,21.825z"/>',
			renren: '<path d="M26.667,0h12c0,0-5.9,40.406,25.333,51.726L58,63c0,0-20.229-14.581-24-29.179c0,0-12.018,22.795-27.333,28.516L0,54.379C0,54.379,31.489,46.61,26.667,0z"/>',
			sendcompany: '<path d="M56,37L32,13L8,37H0v-6L31,0h2l31,31v6H56z M53,38v26H39V43H25v21H11V38l21-21L53,38z"/>',
			scenegift: '<path d="M34.133,63.954V25.581H64v38.372H34.133z M0,12.791h14.821C8.033,11.603,8,4.996,8,4.996C8.056,0.071,13,0,13,0c9.28-0.03,15.986,11.202,16.888,12.791h4.237C35.125,11.201,42.504-0.046,51,0c0,0,5.046,0.083,5,4.996c0,0,0.061,6.606-6.823,7.794H64v8.527H0V12.791z M53,5.996c0.062-1.888-2-1.999-2-1.999c-8.038-0.049-13,8.993-13,8.993C50.389,13.03,53,5.996,53,5.996z M13,3.997c0,0-1.983,0.024-2,1.999s2.81,6.995,15,6.995C26,12.991,20.979,3.981,13,3.997z M29.867,63.954H0V25.581h29.867V63.954z"/>',
			scenesend: '<path d="M0,24.889L64,0L46.222,64L24.889,46.222l24.889-32l-32,24.889L0,24.889z M10.667,39.111l14.222,10.667L14.222,60.444L10.667,39.111z"/>',
			taobao: '<path d="M48.988,48.946c-4.903,0-7.901-1.579-7.901-1.579l0.79-3.947l7.111,0.789c6.122,0,6.321-5.526,6.321-5.526V14.21c0-7.378-7.901-7.895-7.901-7.895c-6.463,0-15.012,3.158-15.012,3.158l3.16,1.579c0.142,1.015-3.16,4.737-3.16,4.737h20.543v3.947H41.086v3.947h11.852v3.947H41.086v9.473l4.741-2.368l-0.79-3.947l4.741-1.579l3.951,10.263l-5.531,2.368l-1.58-3.947c-5.47,3.996-14.222,4.737-14.222,4.737h-7.111c-4.661,0-5.531-5.526-5.531-5.526v-7.105h7.111v3.158c-0.14,5.157,7.111,4.737,7.111,4.737V27.631H21.333v-3.947h12.642v-3.947h-5.531c-0.316,2.196-3.951,3.158-3.951,3.158s-2.819-0.519-3.16-1.579c2.749-1.888,6.321-9.473,6.321-9.473c-4.473,0.22-8.691,6.316-8.691,6.316l-4.741-3.947C19.296,12.449,22.914,0,22.914,0l7.111,1.579c0.106,1.229-1.58,4.737-1.58,4.737c11.708-3.875,23.704-3.158,23.704-3.158C63.475,4.407,64,15,64,15v21.315C64,49,48.988,48.946,48.988,48.946z M11.062,10.263c-5.479,0-5.531-4.737-5.531-4.737c0-5.404,5.531-4.737,5.531-4.737c5.138,0,5.531,4.737,5.531,4.737C16.593,10.074,11.062,10.263,11.062,10.263z M2.37,18.157l3.951-5.526c11.83,10.053,11.062,12.631,11.062,12.631c-0.264,5.059-9.482,22.105-9.482,22.105L0,41.841L11.852,29.21c1.392-1.303,0-3.947,0-3.947C11.562,22.982,2.37,18.157,2.37,18.157z"/>',
			tieba: '<path d="M64,28.804v33.072H36.267c0,0-0.933,0.052-1.067-2.134V32.005c0,0-1.165-3.201,5.333-3.201V1.067h6.4v4.267H64v6.401H46.933v17.069H64z M42.667,36.272v19.203h13.867V36.272H42.667z M14.933,55.475c0,0-4.911,5.24-12.8,6.401l-1.067-4.267c0,0,8.079-3.243,9.6-7.468V13.869c0,0,0.682-2.067,4.267-2.134c0,0,3.289,0.126,3.2,2.134V46.94c0,0,0.469,6.066,11.733,10.668L28.8,62.943C28.8,62.943,22.857,64,14.933,55.475z M23.467,9.601c0,0,0.113-3.437-8.533-3.201c0,0-8.533,0.099-8.533,3.201V46.94H0V0h29.867v46.94h-6.4V9.601z"/>',
			time: '<path d="M57.094,17.342L39.191,4.248c3.421-4.74,10.201-5.651,15.145-2.035C59.28,5.829,60.514,12.602,57.094,17.342z M56.896,34.986c0.016,15.224-12.23,27.578-27.352,27.594C14.421,62.597,2.149,50.268,2.133,35.044C2.117,19.821,14.363,7.466,29.485,7.45C44.608,7.434,56.88,19.762,56.896,34.986z M29.492,14.27c-10.206,0.011-18.663,7.491-20.294,17.297H8.966v6.895h0.231c1.633,9.824,10.118,17.308,20.339,17.297C39.742,55.75,48.2,48.269,49.83,38.463h0.232v-6.895h-0.23C48.199,21.743,39.713,14.26,29.492,14.27z M14.103,38.463v-6.895H26.09V16.915h6.849v14.653v6.895H26.09H14.103z M4.692,2.213c4.944-3.616,11.724-2.705,15.145,2.035L1.935,17.342C-1.486,12.602-0.251,5.829,4.692,2.213z"/>',
			uc: '<path d="M53.093,32.265c-7.527-5.77-19.034-7.054-19.034-7.054c5.833-1.908,12.021-7.054,12.021-7.054c-0.333-6.053,2.003-8.061,2.003-8.061c1.492,1.376,3.005,6.046,3.005,6.046C64,21.39,61.107,32.265,61.107,32.265H53.093z M26.046,26.219c0,0-16.028,6.346-16.028,20.153c0,0,0.893,11.278,8.172,13.661C12.446,58.893,0,55.07,0,43.35c0-15.233,13.134-18.434,14.025-27.207c0,0-1.021-8.061-7.012-8.061c0,0-4.643,0.683-6.01,2.015c0,0,5.962-10.617,18.032-10.077c0,0,12.937,0.063,14.025,11.084C33.058,11.104,34.791,19.555,26.046,26.219z M18.189,60.034c1.721,0.342,2.848,0.446,2.848,0.446C19.991,60.48,19.048,60.315,18.189,60.034z M16.028,48.388c0,0,0.948-8.061,8.014-8.061c0,0,9.016,0.132,9.016,8.061c0,0-0.119,9.069-8.014,9.069C25.044,57.457,16.028,58.129,16.028,48.388z M20.035,48.388c0,4.649,4.007,5.038,4.007,5.038c4.47,0,5.009-4.031,5.009-4.031c0-4.625-5.009-5.038-5.009-5.038C19.821,44.233,20.035,48.388,20.035,48.388z M37.065,48.388c0,0-0.189-12.092-11.019-12.092c0,0-4.6-1.381-11.019,3.023c0,0,3.518-7.19,12.021-7.054c0,0,15.761,0.647,16.028,17.13c0,0-0.817,6.053-3.005,7.054c0,0,7.737-1.618,10.018,4.031H28.049C28.049,60.48,36.582,59.201,37.065,48.388z M46.081,41.334c0,0-4.805-11.215-21.037-12.092c0,0,8.813-2.856,17.03,1.008l8.014,5.038c0,0,1.677,0.997,5.009,1.008c0,0,6.234,0.472,7.012,4.031c0,0-5.923-1.36-8.014,0C54.095,40.327,50.536,44.644,46.081,41.334z"/>',
			voice: '<path d="M38.246,32.653c0,9.68-7.396,17.645-16.902,18.686v8.482h8.451V64H8.667v-4.18h8.451v-8.482C7.612,50.298,0.216,42.333,0.216,32.653c0-1.815-0.485-2.548,0-4.209h4.111c-0.629,1.624,0.114,2.365,0.114,4.209c0,8.079,6.621,14.629,14.79,14.629S34.02,40.732,34.02,32.653c0-1.843,0.743-2.584,0.114-4.209h4.111C38.731,30.105,38.246,30.838,38.246,32.653z M19.231,42.667h-1.028c-5.393,0-9.764-4.321-9.764-9.651V9.651C8.438,4.321,12.81,0,18.203,0h1.028c5.393,0,9.764,4.321,9.764,9.651v23.365C28.995,38.346,24.623,42.667,19.231,42.667z"/>',
			wechat: '<path d="M171.484,138.214l6.938,21.872l-26.761-14.913c-72.415-0.249-66.407-49.709-66.407-49.709c0-28.146,34.69-40.761,34.69-40.761c75.009-16.33,78.301,42.749,78.301,42.749C198.245,125.746,171.484,138.214,171.484,138.214z M122.245,78.086c-4.418,0-8,3.582-8,8c0,4.418,3.582,8,8,8c4.418,0,8-3.582,8-8C130.245,81.667,126.663,78.086,122.245,78.086z M165.245,78.086c-4.418,0-8,3.582-8,8c0,4.418,3.582,8,8,8c4.418,0,8-3.582,8-8C173.245,81.667,169.663,78.086,165.245,78.086z M90.209,69.616c-17.464,24.322-4.956,47.72-4.956,47.72c-2.767,2.24-7.929,1.988-7.929,1.988H61.466l-36.673,16.901l8.92-25.849C-1.755,92.678,0.015,60.668,0.015,60.668v-2.982C6.983-1.914,70.386,0.024,70.386,0.024c30.227-0.665,46.584,12.924,46.584,12.924c19.951,11.217,24.779,32.808,24.779,32.808C107.066,46.955,90.209,69.616,90.209,69.616z M41.245,30.086c-6.075,0-11,4.925-11,11s4.925,11,11,11s11-4.925,11-11S47.32,30.086,41.245,30.086z M108.245,41.086c0-6.075-4.925-11-11-11c-6.075,0-11,4.925-11,11s4.925,11,11,11C103.32,52.086,108.245,47.161,108.245,41.086z"/>',
			weibo: '<path d="M199.389,65.394c0,0-0.493,9.988-10.011,9.988c0,0-10.252-1.807-7.007-11.985c0,0,11.965-41.924-36.038-47.942c0,0-17.018,5.194-17.018-6.991c0,0,1.506-7.99,8.008-7.99C137.322,0.473,204.096-9.8,199.389,65.394z M143.329,40.425c0,0-8.008,1.063-8.008-6.992c0,0,2.411-5.993,7.007-5.993c0,0,34.003-5.033,30.032,32.96c0,0-1.923,5.993-6.006,5.993c0,0-8.008,0.682-8.008-7.99C158.345,58.403,162.869,40.425,143.329,40.425z M133.318,45.419c0,0,17.018,0.911,17.018,16.979c0,0,0.245,9.102-4.004,12.984c0,0,29.031,6.811,29.031,28.965c0,0-0.251,56.931-91.097,56.931c0,0-84.09,0.922-84.09-52.936c0,0-4.081-25.111,27.029-54.933c31.109-29.822,48.801-30.962,57.061-30.962c0,0,16.017-0.976,16.017,15.98c0,0-0.412,11.219-3.003,14.982C97.28,53.409,116.344,45.419,133.318,45.419z M78.259,71.387c0,0-49.884,3.469-58.062,42.948c0,0-0.603,30.22,52.055,34.958c0,0,54.006,2.183,66.07-36.955C138.324,112.337,151.405,74.021,78.259,71.387z M73.12,142.2c-26.866-0.565-28.931-22.871-28.931-22.871c-1.094-30.22,32.921-32.815,32.921-32.815c31.985-0.314,30.926,25.854,30.926,25.854C106.16,142.199,73.12,142.2,73.12,142.2z M67.135,110.379c0,0-11.971,1.423-11.971,9.944c0,0-1.051,8.95,9.976,8.95c0,0,10.974-1.898,10.974-9.944C76.113,119.328,77.207,110.379,67.135,110.379z M83.097,106.401c0,0-3.99-0.664-3.99,2.983c0,0-0.929,2.983,2.993,2.983c0,0,3.99-0.785,3.99-3.978C86.089,108.39,85.751,106.401,83.097,106.401z"/>',
			windows: '<path d="M28.984,59.594V33.416H63V64L28.984,59.594z M28.984,4.406L63,0v30.584H28.984V4.406z M0,33.416h26.149v25.487L0,55.231V33.416z M0,8.769l26.149-3.672v25.487H0V8.769z"/>',
			yixin: '<path d="M45.364,58.38c4.124,2.52,10.259,2.797,10.259,2.797C44.551,65,36.341,63.943,30.867,61.901C13.807,61.829,0,48.002,0,30.952C0,13.858,13.879,0,31,0s31,13.858,31,30.952C62,42.869,55.251,53.207,45.364,58.38z M31,14.977c-8.837,0-16,7.153-16,15.975c0,5.364,2.656,10.098,6.718,12.996c-3.185,4.404-11.86,5.579-11.86,5.579c19.676,4.767,29.433-4.088,31.788-6.672C44.924,39.93,47,35.688,47,30.952C47,22.129,39.837,14.977,31,14.977z"/>',
			zhifubao: '<path d="M63.021,50L36.949,36.957c-10.737,11.987-22.813,10.87-22.813,10.87c-15.115,0-14.122-11.957-14.122-11.957C-0.088,22.841,15.222,25,15.222,25c8.559,0.109,18.468,3.261,18.468,3.261c3.55-4.164,4.345-9.783,4.345-9.783H10.877v-2.174h13.036V10.87H7.618V8.696h16.295V0h8.691v8.696h16.295v2.174H32.604v5.435h14.122c0.153,3.882-5.432,15.217-5.432,15.217l21.727,6.522V50z M14.136,28.261c0,0-11.95-2.295-11.95,7.609c0,0-1.54,7.609,10.863,7.609c0,0,11.464,0.271,17.381-9.783C30.431,33.696,23.002,28.261,14.136,28.261z"/>'
		}
	}(), function(a) {
		"use strict";
		a.fn.swipeSlide = function(b, c) {
			function d(a, b) {
				a.css({
					"-webkit-transition": "all " + b + "s " + C.transitionType,
					transition: "all " + b + "s " + C.transitionType
				})
			}
			function e(a, b) {
				C.axisX ? a.css({
					"-webkit-transform": "translate3d(" + b + "px,0,0)",
					transform: "translate3d(" + b + "px,0,0)"
				}) : a.css({
					"-webkit-transform": "translate3d(0," + b + "px,0)",
					transform: "translate3d(0," + b + "px,0)"
				})
			}
			function f(a) {
				if (C.lazyLoad) {
					var b = C.ul.find("[data-src]");
					if (b.length > 0) {
						var c = b.eq(a);
						c.data("src") && (c.is("img") ? c.attr("src", c.data("src")).data("src", "") : c.css({
							"background-image": "url(" + c.data("src") + ")"
						}).data("src", ""))
					}
				}
			}
			function g(a) {
				a.touches || (a.touches = a.originalEvent.touches)
			}
			function h(a) {
				r = a.touches[0].pageX, s = a.touches[0].pageY
			}
			function i(a) {
				if (a.preventDefault(), C.autoSwipe && p && clearInterval(p), w = a.touches[0].pageX, x = a.touches[0].pageY, t = w - r, u = x - s, d(C.ul, 0), C.axisX) {
					if (!C.continuousScroll) {
						if (0 == q && t > 0) return t = 0, o();
						if (q + 1 >= F && 0 > t) return t = 0, o()
					}
					e(C.ul, -(D * parseInt(q) - t))
				} else {
					if (!C.continuousScroll) {
						if (0 == q && u > 0) return u = 0, o();
						if (q + 1 >= F && 0 > u) return u = 0, o()
					}
					e(C.ul, -(E * parseInt(q) - u))
				}
			}
			function j() {
				v = C.axisX ? t : u, Math.abs(v) <= y ? k(.3) : v > y ? n() : -y > v && m(), o(), t = 0, u = 0
			}
			function k(a) {
				d(C.ul, a), C.axisX ? e(C.ul, -q * D) : e(C.ul, -q * E)
			}
			function l() {
				C.continuousScroll ? q >= F ? (k(.3), q = 0, setTimeout(function() {
					k(0)
				}, 300)) : 0 > q ? (k(.3), q = F - 1, setTimeout(function() {
					k(0)
				}, 300)) : k(.3) : (q >= F ? q = 0 : 0 > q && (q = F - 1), k(.3)), c(q)
			}
			function m() {
				q++, l(), C.lazyLoad && f(C.continuousScroll ? q + 2 : q + 1)
			}
			function n() {
				if (q--, l(), A && C.lazyLoad) {
					var a = F - 1;
					for (a; F + 1 >= a; a++) f(a);
					return void(A = !1)
				}!A && C.lazyLoad && f(q)
			}
			function o() {
				C.autoSwipe && (p = setInterval(function() {
					m()
				}, C.speed))
			}
			var p, q = 0,
				r = 0,
				s = 0,
				t = 0,
				u = 0,
				v = 0,
				w = 0,
				x = 0,
				y = 50,
				z = 0,
				A = !0,
				B = a(this),
				C = a.extend({}, {
					ul: B.children("ul"),
					li: B.children().children("li"),
					continuousScroll: !1,
					autoSwipe: !0,
					speed: 4e3,
					axisX: !0,
					transitionType: "ease",
					lazyLoad: !1,
					clone: !0,
					width: 0,
					length: 0
				}, b || {}),
				D = C.width || C.li.width(),
				E = C.li.height(),
				F = C.length || C.li.length;
			c = c ||
			function() {}, function() {
				if (C.continuousScroll && (C.clone && C.ul.prepend(C.li.last().clone()).append(C.li.first().clone()), C.axisX ? (e(C.ul.children().first(), -1 * D), e(C.ul.children().last(), D * F)) : (e(C.ul.children().first(), -1 * E), e(C.ul.children().last(), E * F))), C.lazyLoad) {
					var b = 0;
					for (z = C.continuousScroll ? 3 : 2, b; z > b; b++) f(b)
				}
				C.axisX ? C.li.each(function(b) {
					e(a(this), D * b)
				}) : C.li.each(function(b) {
					e(a(this), E * b)
				}), o(), c(q, p), B.on("touchstart", function(a) {
					a.stopPropagation(), g(a), h(a)
				}), B.on("touchmove", function(a) {
					a.stopPropagation(), g(a), i(a)
				}), B.on("touchend", function(a) {
					a.stopPropagation(), j()
				})
			}()
		}
	}(window.Zepto || window.jQuery);
	var THREE = THREE || {};
	self.Int32Array || (self.Int32Array = Array, self.Float32Array = Array), THREE.Color = function(a) {
		return void 0 !== a && this.setHex(a), this
	}, THREE.Color.prototype = {
		constructor: THREE.Color,
		r: 1,
		g: 1,
		b: 1,
		copy: function(a) {
			return this.r = a.r, this.g = a.g, this.b = a.b, this
		},
		copyGammaToLinear: function(a) {
			return this.r = a.r * a.r, this.g = a.g * a.g, this.b = a.b * a.b, this
		},
		copyLinearToGamma: function(a) {
			return this.r = Math.sqrt(a.r), this.g = Math.sqrt(a.g), this.b = Math.sqrt(a.b), this
		},
		setRGB: function(a, b, c) {
			return this.r = a, this.g = b, this.b = c, this
		},
		setHSV: function(a, b, c) {
			var d, e, f;
			if (0 === c) this.r = this.g = this.b = 0;
			else switch (d = Math.floor(6 * a), e = 6 * a - d, a = c * (1 - b), f = c * (1 - b * e), b = c * (1 - b * (1 - e)), d) {
			case 1:
				this.r = f, this.g = c, this.b = a;
				break;
			case 2:
				this.r = a, this.g = c, this.b = b;
				break;
			case 3:
				this.r = a, this.g = f, this.b = c;
				break;
			case 4:
				this.r = b, this.g = a, this.b = c;
				break;
			case 5:
				this.r = c, this.g = a, this.b = f;
				break;
			case 6:
			case 0:
				this.r = c, this.g = b, this.b = a
			}
			return this
		},
		setHex: function(a) {
			return a = Math.floor(a), this.r = (a >> 16 & 255) / 255, this.g = (a >> 8 & 255) / 255, this.b = (255 & a) / 255, this
		},
		getHex: function() {
			return ~~ (255 * this.r) << 16 ^ ~~ (255 * this.g) << 8 ^ ~~ (255 * this.b)
		},
		getContextStyle: function() {
			return "rgb(" + Math.floor(255 * this.r) + "," + Math.floor(255 * this.g) + "," + Math.floor(255 * this.b) + ")"
		},
		clone: function() {
			return (new THREE.Color).setRGB(this.r, this.g, this.b)
		}
	}, THREE.Vector2 = function(a, b) {
		this.x = a || 0, this.y = b || 0
	}, THREE.Vector2.prototype = {
		constructor: THREE.Vector2,
		set: function(a, b) {
			return this.x = a, this.y = b, this
		},
		copy: function(a) {
			return this.x = a.x, this.y = a.y, this
		},
		clone: function() {
			return new THREE.Vector2(this.x, this.y)
		},
		add: function(a, b) {
			return this.x = a.x + b.x, this.y = a.y + b.y, this
		},
		addSelf: function(a) {
			return this.x += a.x, this.y += a.y, this
		},
		sub: function(a, b) {
			return this.x = a.x - b.x, this.y = a.y - b.y, this
		},
		subSelf: function(a) {
			return this.x -= a.x, this.y -= a.y, this
		},
		multiplyScalar: function(a) {
			return this.x *= a, this.y *= a, this
		},
		divideScalar: function(a) {
			return a ? (this.x /= a, this.y /= a) : this.set(0, 0), this
		},
		negate: function() {
			return this.multiplyScalar(-1)
		},
		dot: function(a) {
			return this.x * a.x + this.y * a.y
		},
		lengthSq: function() {
			return this.x * this.x + this.y * this.y
		},
		length: function() {
			return Math.sqrt(this.lengthSq())
		},
		normalize: function() {
			return this.divideScalar(this.length())
		},
		distanceTo: function(a) {
			return Math.sqrt(this.distanceToSquared(a))
		},
		distanceToSquared: function(a) {
			var b = this.x - a.x,
				a = this.y - a.y;
			return b * b + a * a
		},
		setLength: function(a) {
			return this.normalize().multiplyScalar(a)
		},
		equals: function(a) {
			return a.x === this.x && a.y === this.y
		}
	}, THREE.Vector3 = function(a, b, c) {
		this.x = a || 0, this.y = b || 0, this.z = c || 0
	}, THREE.Vector3.prototype = {
		constructor: THREE.Vector3,
		set: function(a, b, c) {
			return this.x = a, this.y = b, this.z = c, this
		},
		setX: function(a) {
			return this.x = a, this
		},
		setY: function(a) {
			return this.y = a, this
		},
		setZ: function(a) {
			return this.z = a, this
		},
		copy: function(a) {
			return this.x = a.x, this.y = a.y, this.z = a.z, this
		},
		clone: function() {
			return new THREE.Vector3(this.x, this.y, this.z)
		},
		add: function(a, b) {
			return this.x = a.x + b.x, this.y = a.y + b.y, this.z = a.z + b.z, this
		},
		addSelf: function(a) {
			return this.x += a.x, this.y += a.y, this.z += a.z, this
		},
		addScalar: function(a) {
			return this.x += a, this.y += a, this.z += a, this
		},
		sub: function(a, b) {
			return this.x = a.x - b.x, this.y = a.y - b.y, this.z = a.z - b.z, this
		},
		subSelf: function(a) {
			return this.x -= a.x, this.y -= a.y, this.z -= a.z, this
		},
		multiply: function(a, b) {
			return this.x = a.x * b.x, this.y = a.y * b.y, this.z = a.z * b.z, this
		},
		multiplySelf: function(a) {
			return this.x *= a.x, this.y *= a.y, this.z *= a.z, this
		},
		multiplyScalar: function(a) {
			return this.x *= a, this.y *= a, this.z *= a, this
		},
		divideSelf: function(a) {
			return this.x /= a.x, this.y /= a.y, this.z /= a.z, this
		},
		divideScalar: function(a) {
			return a ? (this.x /= a, this.y /= a, this.z /= a) : this.z = this.y = this.x = 0, this
		},
		negate: function() {
			return this.multiplyScalar(-1)
		},
		dot: function(a) {
			return this.x * a.x + this.y * a.y + this.z * a.z
		},
		lengthSq: function() {
			return this.x * this.x + this.y * this.y + this.z * this.z
		},
		length: function() {
			return Math.sqrt(this.lengthSq())
		},
		lengthManhattan: function() {
			return this.x + this.y + this.z
		},
		normalize: function() {
			return this.divideScalar(this.length())
		},
		setLength: function(a) {
			return this.normalize().multiplyScalar(a)
		},
		cross: function(a, b) {
			return this.x = a.y * b.z - a.z * b.y, this.y = a.z * b.x - a.x * b.z, this.z = a.x * b.y - a.y * b.x, this
		},
		crossSelf: function(a) {
			var b = this.x,
				c = this.y,
				d = this.z;
			return this.x = c * a.z - d * a.y, this.y = d * a.x - b * a.z, this.z = b * a.y - c * a.x, this
		},
		distanceTo: function(a) {
			return Math.sqrt(this.distanceToSquared(a))
		},
		distanceToSquared: function(a) {
			return (new THREE.Vector3).sub(this, a).lengthSq()
		},
		setPositionFromMatrix: function(a) {
			this.x = a.n14, this.y = a.n24, this.z = a.n34
		},
		setRotationFromMatrix: function(a) {
			var b = Math.cos(this.y);
			this.y = Math.asin(a.n13), Math.abs(b) > 1e-5 ? (this.x = Math.atan2(-a.n23 / b, a.n33 / b), this.z = Math.atan2(-a.n12 / b, a.n11 / b)) : (this.x = 0, this.z = Math.atan2(a.n21, a.n22))
		},
		isZero: function() {
			return this.lengthSq() < 1e-4
		}
	}, THREE.Vector4 = function(a, b, c, d) {
		this.x = a || 0, this.y = b || 0, this.z = c || 0, this.w = void 0 !== d ? d : 1
	}, THREE.Vector4.prototype = {
		constructor: THREE.Vector4,
		set: function(a, b, c, d) {
			return this.x = a, this.y = b, this.z = c, this.w = d, this
		},
		copy: function(a) {
			this.x = a.x, this.y = a.y, this.z = a.z, this.w = void 0 !== a.w ? a.w : 1
		},
		clone: function() {
			return new THREE.Vector4(this.x, this.y, this.z, this.w)
		},
		add: function(a, b) {
			return this.x = a.x + b.x, this.y = a.y + b.y, this.z = a.z + b.z, this.w = a.w + b.w, this
		},
		addSelf: function(a) {
			return this.x += a.x, this.y += a.y, this.z += a.z, this.w += a.w, this
		},
		sub: function(a, b) {
			return this.x = a.x - b.x, this.y = a.y - b.y, this.z = a.z - b.z, this.w = a.w - b.w, this
		},
		subSelf: function(a) {
			return this.x -= a.x, this.y -= a.y, this.z -= a.z, this.w -= a.w, this
		},
		multiplyScalar: function(a) {
			return this.x *= a, this.y *= a, this.z *= a, this.w *= a, this
		},
		divideScalar: function(a) {
			return a ? (this.x /= a, this.y /= a, this.z /= a, this.w /= a) : (this.z = this.y = this.x = 0, this.w = 1), this
		},
		negate: function() {
			return this.multiplyScalar(-1)
		},
		dot: function(a) {
			return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
		},
		lengthSq: function() {
			return this.dot(this)
		},
		length: function() {
			return Math.sqrt(this.lengthSq())
		},
		normalize: function() {
			return this.divideScalar(this.length())
		},
		setLength: function(a) {
			return this.normalize().multiplyScalar(a)
		},
		lerpSelf: function(a, b) {
			return this.x += (a.x - this.x) * b, this.y += (a.y - this.y) * b, this.z += (a.z - this.z) * b, this.w += (a.w - this.w) * b, this
		}
	}, THREE.Ray = function(a, b) {
		function c(a, b, c) {
			return w.sub(c, a), l = w.dot(b), 0 >= l ? null : (m = x.add(a, y.copy(b).multiplyScalar(l)), n = c.distanceTo(m))
		}
		function d(a, b, c, d) {
			return w.sub(d, b), x.sub(c, b), y.sub(a, b), o = w.dot(w), p = w.dot(x), q = w.dot(y), r = x.dot(x), s = x.dot(y), t = 1 / (o * r - p * p), u = (r * q - p * s) * t, v = (o * s - p * q) * t, u >= 0 && v >= 0 && 1 > u + v
		}
		this.origin = a || new THREE.Vector3, this.direction = b || new THREE.Vector3, this.intersectScene = function(a) {
			return this.intersectObjects(a.children)
		}, this.intersectObjects = function(a) {
			var b, c, d = [];
			for (b = 0, c = a.length; c > b; b++) Array.prototype.push.apply(d, this.intersectObject(a[b]));
			return d.sort(function(a, b) {
				return a.distance - b.distance
			}), d
		};
		var e = new THREE.Vector3,
			f = new THREE.Vector3,
			g = new THREE.Vector3,
			h = new THREE.Vector3,
			a = new THREE.Vector3,
			b = new THREE.Vector3,
			i = new THREE.Vector3,
			j = new THREE.Vector3,
			k = new THREE.Vector3;
		this.intersectObject = function(l) {
			for (var m, n = [], o = 0, p = l.children.length; p > o; o++) Array.prototype.push.apply(n, this.intersectObject(l.children[o]));
			if (l instanceof THREE.Particle) {
				if (o = c(this.origin, this.direction, l.matrixWorld.getPosition()), null === o || o > l.scale.x) return [];
				m = {
					distance: o,
					point: l.position,
					face: null,
					object: l
				}, n.push(m)
			} else if (l instanceof THREE.Mesh) {
				if (o = c(this.origin, this.direction, l.matrixWorld.getPosition()), null === o || o > l.geometry.boundingSphere.radius * Math.max(l.scale.x, Math.max(l.scale.y, l.scale.z))) return n;
				var q, r, s = l.geometry,
					t = s.vertices;
				for (l.matrixRotationWorld.extractRotation(l.matrixWorld), o = 0, p = s.faces.length; p > o; o++) m = s.faces[o], a.copy(this.origin), b.copy(this.direction), r = l.matrixWorld, i = r.multiplyVector3(i.copy(m.centroid)).subSelf(a), q = i.dot(b), 0 >= q || (e = r.multiplyVector3(e.copy(t[m.a].position)), f = r.multiplyVector3(f.copy(t[m.b].position)), g = r.multiplyVector3(g.copy(t[m.c].position)), m instanceof THREE.Face4 && (h = r.multiplyVector3(h.copy(t[m.d].position))), j = l.matrixRotationWorld.multiplyVector3(j.copy(m.normal)), q = b.dot(j), !l.doubleSided && !(l.flipSided ? q > 0 : 0 > q)) || (q = j.dot(i.sub(e, a)) / q, k.add(a, b.multiplyScalar(q)), m instanceof THREE.Face3 ? d(k, e, f, g) && (m = {
					distance: a.distanceTo(k),
					point: k.clone(),
					face: m,
					object: l
				}, n.push(m)) : m instanceof THREE.Face4 && (d(k, e, f, h) || d(k, f, g, h)) && (m = {
					distance: a.distanceTo(k),
					point: k.clone(),
					face: m,
					object: l
				}, n.push(m)))
			}
			return n
		};
		var l, m, n, o, p, q, r, s, t, u, v, w = new THREE.Vector3,
			x = new THREE.Vector3,
			y = new THREE.Vector3
	}, THREE.Rectangle = function() {
		function a() {
			f = d - b, g = e - c
		}
		var b, c, d, e, f, g, h = !0;
		this.getX = function() {
			return b
		}, this.getY = function() {
			return c
		}, this.getWidth = function() {
			return f
		}, this.getHeight = function() {
			return g
		}, this.getLeft = function() {
			return b
		}, this.getTop = function() {
			return c
		}, this.getRight = function() {
			return d
		}, this.getBottom = function() {
			return e
		}, this.set = function(f, g, i, j) {
			h = !1, b = f, c = g, d = i, e = j, a()
		}, this.addPoint = function(f, g) {
			h ? (h = !1, b = f, c = g, d = f, e = g) : (b = f > b ? b : f, c = g > c ? c : g, d = d > f ? d : f, e = e > g ? e : g), a()
		}, this.add3Points = function(f, g, i, j, k, l) {
			h ? (h = !1, b = i > f ? k > f ? f : k : k > i ? i : k, c = j > g ? l > g ? g : l : l > j ? j : l, d = f > i ? f > k ? f : k : i > k ? i : k, e = g > j ? g > l ? g : l : j > l ? j : l) : (b = i > f ? k > f ? b > f ? f : b : b > k ? k : b : k > i ? b > i ? i : b : b > k ? k : b, c = j > g ? l > g ? c > g ? g : c : c > l ? l : c : l > j ? c > j ? j : c : c > l ? l : c, d = f > i ? f > k ? f > d ? f : d : k > d ? k : d : i > k ? i > d ? i : d : k > d ? k : d, e = g > j ? g > l ? g > e ? g : e : l > e ? l : e : j > l ? j > e ? j : e : l > e ? l : e), a()
		}, this.addRectangle = function(f) {
			h ? (h = !1, b = f.getLeft(), c = f.getTop(), d = f.getRight(), e = f.getBottom()) : (b = b < f.getLeft() ? b : f.getLeft(), c = c < f.getTop() ? c : f.getTop(), d = d > f.getRight() ? d : f.getRight(), e = e > f.getBottom() ? e : f.getBottom()), a()
		}, this.inflate = function(f) {
			b -= f, c -= f, d += f, e += f, a()
		}, this.minSelf = function(f) {
			b = b > f.getLeft() ? b : f.getLeft(), c = c > f.getTop() ? c : f.getTop(), d = d < f.getRight() ? d : f.getRight(), e = e < f.getBottom() ? e : f.getBottom(), a()
		}, this.intersects = function(a) {
			return Math.min(d, a.getRight()) - Math.max(b, a.getLeft()) >= 0 && Math.min(e, a.getBottom()) - Math.max(c, a.getTop()) >= 0
		}, this.empty = function() {
			h = !0, e = d = c = b = 0, a()
		}, this.isEmpty = function() {
			return h
		}
	}, THREE.Math = {
		clamp: function(a, b, c) {
			return b > a ? b : a > c ? c : a
		},
		clampBottom: function(a, b) {
			return b > a ? b : a
		},
		mapLinear: function(a, b, c, d, e) {
			return d + (a - b) * (e - d) / (c - b)
		},
		random16: function() {
			return (65280 * Math.random() + 255 * Math.random()) / 65535
		}
	}, THREE.Matrix3 = function() {
		this.m = []
	}, THREE.Matrix3.prototype = {
		constructor: THREE.Matrix3,
		transpose: function() {
			var a, b = this.m;
			return a = b[1], b[1] = b[3], b[3] = a, a = b[2], b[2] = b[6], b[6] = a, a = b[5], b[5] = b[7], b[7] = a, this
		},
		transposeIntoArray: function(a) {
			var b = this.m;
			return a[0] = b[0], a[1] = b[3], a[2] = b[6], a[3] = b[1], a[4] = b[4], a[5] = b[7], a[6] = b[2], a[7] = b[5], a[8] = b[8], this
		}
	}, THREE.Matrix4 = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
		this.set(void 0 !== a ? a : 1, b || 0, c || 0, d || 0, e || 0, void 0 !== f ? f : 1, g || 0, h || 0, i || 0, j || 0, void 0 !== k ? k : 1, l || 0, m || 0, n || 0, o || 0, void 0 !== p ? p : 1), this.flat = Array(16), this.m33 = new THREE.Matrix3
	}, THREE.Matrix4.prototype = {
		constructor: THREE.Matrix4,
		set: function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
			return this.n11 = a, this.n12 = b, this.n13 = c, this.n14 = d, this.n21 = e, this.n22 = f, this.n23 = g, this.n24 = h, this.n31 = i, this.n32 = j, this.n33 = k, this.n34 = l, this.n41 = m, this.n42 = n, this.n43 = o, this.n44 = p, this
		},
		identity: function() {
			return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
		},
		copy: function(a) {
			return this.set(a.n11, a.n12, a.n13, a.n14, a.n21, a.n22, a.n23, a.n24, a.n31, a.n32, a.n33, a.n34, a.n41, a.n42, a.n43, a.n44), this
		},
		lookAt: function(a, b, c) {
			var d = THREE.Matrix4.__v1,
				e = THREE.Matrix4.__v2,
				f = THREE.Matrix4.__v3;
			return f.sub(a, b).normalize(), 0 === f.length() && (f.z = 1), d.cross(c, f).normalize(), 0 === d.length() && (f.x += 1e-4, d.cross(c, f).normalize()), e.cross(f, d).normalize(), this.n11 = d.x, this.n12 = e.x, this.n13 = f.x, this.n21 = d.y, this.n22 = e.y, this.n23 = f.y, this.n31 = d.z, this.n32 = e.z, this.n33 = f.z, this
		},
		multiply: function(a, b) {
			var c = a.n11,
				d = a.n12,
				e = a.n13,
				f = a.n14,
				g = a.n21,
				h = a.n22,
				i = a.n23,
				j = a.n24,
				k = a.n31,
				l = a.n32,
				m = a.n33,
				n = a.n34,
				o = a.n41,
				p = a.n42,
				q = a.n43,
				r = a.n44,
				s = b.n11,
				t = b.n12,
				u = b.n13,
				v = b.n14,
				w = b.n21,
				x = b.n22,
				y = b.n23,
				z = b.n24,
				A = b.n31,
				B = b.n32,
				C = b.n33,
				D = b.n34,
				E = b.n41,
				F = b.n42,
				G = b.n43,
				H = b.n44;
			return this.n11 = c * s + d * w + e * A + f * E, this.n12 = c * t + d * x + e * B + f * F, this.n13 = c * u + d * y + e * C + f * G, this.n14 = c * v + d * z + e * D + f * H, this.n21 = g * s + h * w + i * A + j * E, this.n22 = g * t + h * x + i * B + j * F, this.n23 = g * u + h * y + i * C + j * G, this.n24 = g * v + h * z + i * D + j * H, this.n31 = k * s + l * w + m * A + n * E, this.n32 = k * t + l * x + m * B + n * F, this.n33 = k * u + l * y + m * C + n * G, this.n34 = k * v + l * z + m * D + n * H, this.n41 = o * s + p * w + q * A + r * E, this.n42 = o * t + p * x + q * B + r * F, this.n43 = o * u + p * y + q * C + r * G, this.n44 = o * v + p * z + q * D + r * H, this
		},
		multiplySelf: function(a) {
			return this.multiply(this, a)
		},
		multiplyToArray: function(a, b, c) {
			return this.multiply(a, b), c[0] = this.n11, c[1] = this.n21, c[2] = this.n31, c[3] = this.n41, c[4] = this.n12, c[5] = this.n22, c[6] = this.n32, c[7] = this.n42, c[8] = this.n13, c[9] = this.n23, c[10] = this.n33, c[11] = this.n43, c[12] = this.n14, c[13] = this.n24, c[14] = this.n34, c[15] = this.n44, this
		},
		multiplyScalar: function(a) {
			return this.n11 *= a, this.n12 *= a, this.n13 *= a, this.n14 *= a, this.n21 *= a, this.n22 *= a, this.n23 *= a, this.n24 *= a, this.n31 *= a, this.n32 *= a, this.n33 *= a, this.n34 *= a, this.n41 *= a, this.n42 *= a, this.n43 *= a, this.n44 *= a, this
		},
		multiplyVector3: function(a) {
			var b = a.x,
				c = a.y,
				d = a.z,
				e = 1 / (this.n41 * b + this.n42 * c + this.n43 * d + this.n44);
			return a.x = (this.n11 * b + this.n12 * c + this.n13 * d + this.n14) * e, a.y = (this.n21 * b + this.n22 * c + this.n23 * d + this.n24) * e, a.z = (this.n31 * b + this.n32 * c + this.n33 * d + this.n34) * e, a
		},
		multiplyVector4: function(a) {
			var b = a.x,
				c = a.y,
				d = a.z,
				e = a.w;
			return a.x = this.n11 * b + this.n12 * c + this.n13 * d + this.n14 * e, a.y = this.n21 * b + this.n22 * c + this.n23 * d + this.n24 * e, a.z = this.n31 * b + this.n32 * c + this.n33 * d + this.n34 * e, a.w = this.n41 * b + this.n42 * c + this.n43 * d + this.n44 * e, a
		},
		rotateAxis: function(a) {
			var b = a.x,
				c = a.y,
				d = a.z;
			return a.x = b * this.n11 + c * this.n12 + d * this.n13, a.y = b * this.n21 + c * this.n22 + d * this.n23, a.z = b * this.n31 + c * this.n32 + d * this.n33, a.normalize(), a
		},
		crossVector: function(a) {
			var b = new THREE.Vector4;
			return b.x = this.n11 * a.x + this.n12 * a.y + this.n13 * a.z + this.n14 * a.w, b.y = this.n21 * a.x + this.n22 * a.y + this.n23 * a.z + this.n24 * a.w, b.z = this.n31 * a.x + this.n32 * a.y + this.n33 * a.z + this.n34 * a.w, b.w = a.w ? this.n41 * a.x + this.n42 * a.y + this.n43 * a.z + this.n44 * a.w : 1, b
		},
		determinant: function() {
			var a = this.n11,
				b = this.n12,
				c = this.n13,
				d = this.n14,
				e = this.n21,
				f = this.n22,
				g = this.n23,
				h = this.n24,
				i = this.n31,
				j = this.n32,
				k = this.n33,
				l = this.n34,
				m = this.n41,
				n = this.n42,
				o = this.n43,
				p = this.n44;
			return d * g * j * m - c * h * j * m - d * f * k * m + b * h * k * m + c * f * l * m - b * g * l * m - d * g * i * n + c * h * i * n + d * e * k * n - a * h * k * n - c * e * l * n + a * g * l * n + d * f * i * o - b * h * i * o - d * e * j * o + a * h * j * o + b * e * l * o - a * f * l * o - c * f * i * p + b * g * i * p + c * e * j * p - a * g * j * p - b * e * k * p + a * f * k * p
		},
		transpose: function() {
			var a;
			return a = this.n21, this.n21 = this.n12, this.n12 = a, a = this.n31, this.n31 = this.n13, this.n13 = a, a = this.n32, this.n32 = this.n23, this.n23 = a, a = this.n41, this.n41 = this.n14, this.n14 = a, a = this.n42, this.n42 = this.n24, this.n24 = a, a = this.n43, this.n43 = this.n34, this.n43 = a, this
		},
		clone: function() {
			var a = new THREE.Matrix4;
			return a.n11 = this.n11, a.n12 = this.n12, a.n13 = this.n13, a.n14 = this.n14, a.n21 = this.n21, a.n22 = this.n22, a.n23 = this.n23, a.n24 = this.n24, a.n31 = this.n31, a.n32 = this.n32, a.n33 = this.n33, a.n34 = this.n34, a.n41 = this.n41, a.n42 = this.n42, a.n43 = this.n43, a.n44 = this.n44, a
		},
		flatten: function() {
			return this.flat[0] = this.n11, this.flat[1] = this.n21, this.flat[2] = this.n31, this.flat[3] = this.n41, this.flat[4] = this.n12, this.flat[5] = this.n22, this.flat[6] = this.n32, this.flat[7] = this.n42, this.flat[8] = this.n13, this.flat[9] = this.n23, this.flat[10] = this.n33, this.flat[11] = this.n43, this.flat[12] = this.n14, this.flat[13] = this.n24, this.flat[14] = this.n34, this.flat[15] = this.n44, this.flat
		},
		flattenToArray: function(a) {
			return a[0] = this.n11, a[1] = this.n21, a[2] = this.n31, a[3] = this.n41, a[4] = this.n12, a[5] = this.n22, a[6] = this.n32, a[7] = this.n42, a[8] = this.n13, a[9] = this.n23, a[10] = this.n33, a[11] = this.n43, a[12] = this.n14, a[13] = this.n24, a[14] = this.n34, a[15] = this.n44, a
		},
		flattenToArrayOffset: function(a, b) {
			return a[b] = this.n11, a[b + 1] = this.n21, a[b + 2] = this.n31, a[b + 3] = this.n41, a[b + 4] = this.n12, a[b + 5] = this.n22, a[b + 6] = this.n32, a[b + 7] = this.n42, a[b + 8] = this.n13, a[b + 9] = this.n23, a[b + 10] = this.n33, a[b + 11] = this.n43, a[b + 12] = this.n14, a[b + 13] = this.n24, a[b + 14] = this.n34, a[b + 15] = this.n44, a
		},
		setTranslation: function(a, b, c) {
			return this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1), this
		},
		setScale: function(a, b, c) {
			return this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1), this
		},
		setRotationX: function(a) {
			var b = Math.cos(a),
				a = Math.sin(a);
			return this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1), this
		},
		setRotationY: function(a) {
			var b = Math.cos(a),
				a = Math.sin(a);
			return this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1), this
		},
		setRotationZ: function(a) {
			var b = Math.cos(a),
				a = Math.sin(a);
			return this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
		},
		setRotationAxis: function(a, b) {
			var c = Math.cos(b),
				d = Math.sin(b),
				e = 1 - c,
				f = a.x,
				g = a.y,
				h = a.z,
				i = e * f,
				j = e * g;
			return this.set(i * f + c, i * g - d * h, i * h + d * g, 0, i * g + d * h, j * g + c, j * h - d * f, 0, i * h - d * g, j * h + d * f, e * h * h + c, 0, 0, 0, 0, 1), this
		},
		setPosition: function(a) {
			return this.n14 = a.x, this.n24 = a.y, this.n34 = a.z, this
		},
		getPosition: function() {
			return THREE.Matrix4.__v1.set(this.n14, this.n24, this.n34)
		},
		getColumnX: function() {
			return THREE.Matrix4.__v1.set(this.n11, this.n21, this.n31)
		},
		getColumnY: function() {
			return THREE.Matrix4.__v1.set(this.n12, this.n22, this.n32)
		},
		getColumnZ: function() {
			return THREE.Matrix4.__v1.set(this.n13, this.n23, this.n33);
		},
		getInverse: function(a) {
			var b = a.n11,
				c = a.n12,
				d = a.n13,
				e = a.n14,
				f = a.n21,
				g = a.n22,
				h = a.n23,
				i = a.n24,
				j = a.n31,
				k = a.n32,
				l = a.n33,
				m = a.n34,
				n = a.n41,
				o = a.n42,
				p = a.n43,
				q = a.n44;
			return this.n11 = h * m * o - i * l * o + i * k * p - g * m * p - h * k * q + g * l * q, this.n12 = e * l * o - d * m * o - e * k * p + c * m * p + d * k * q - c * l * q, this.n13 = d * i * o - e * h * o + e * g * p - c * i * p - d * g * q + c * h * q, this.n14 = e * h * k - d * i * k - e * g * l + c * i * l + d * g * m - c * h * m, this.n21 = i * l * n - h * m * n - i * j * p + f * m * p + h * j * q - f * l * q, this.n22 = d * m * n - e * l * n + e * j * p - b * m * p - d * j * q + b * l * q, this.n23 = e * h * n - d * i * n - e * f * p + b * i * p + d * f * q - b * h * q, this.n24 = d * i * j - e * h * j + e * f * l - b * i * l - d * f * m + b * h * m, this.n31 = g * m * n - i * k * n + i * j * o - f * m * o - g * j * q + f * k * q, this.n32 = e * k * n - c * m * n - e * j * o + b * m * o + c * j * q - b * k * q, this.n33 = d * i * n - e * g * n + e * f * o - b * i * o - c * f * q + b * g * q, this.n34 = e * g * j - c * i * j - e * f * k + b * i * k + c * f * m - b * g * m, this.n41 = h * k * n - g * l * n - h * j * o + f * l * o + g * j * p - f * k * p, this.n42 = c * l * n - d * k * n + d * j * o - b * l * o - c * j * p + b * k * p, this.n43 = d * g * n - c * h * n - d * f * o + b * h * o + c * f * p - b * g * p, this.n44 = c * h * j - d * g * j + d * f * k - b * h * k - c * f * l + b * g * l, this.multiplyScalar(1 / a.determinant()), this
		},
		setRotationFromEuler: function(a, b) {
			var c = a.x,
				d = a.y,
				e = a.z,
				f = Math.cos(c),
				c = Math.sin(c),
				g = Math.cos(d),
				d = Math.sin(d),
				h = Math.cos(e),
				e = Math.sin(e);
			switch (b) {
			case "YXZ":
				var i = g * h,
					j = g * e,
					k = d * h,
					l = d * e;
				this.n11 = i + l * c, this.n12 = k * c - j, this.n13 = f * d, this.n21 = f * e, this.n22 = f * h, this.n23 = -c, this.n31 = j * c - k, this.n32 = l + i * c, this.n33 = f * g;
				break;
			case "ZXY":
				i = g * h, j = g * e, k = d * h, l = d * e, this.n11 = i - l * c, this.n12 = -f * e, this.n13 = k + j * c, this.n21 = j + k * c, this.n22 = f * h, this.n23 = l - i * c, this.n31 = -f * d, this.n32 = c, this.n33 = f * g;
				break;
			case "ZYX":
				i = f * h, j = f * e, k = c * h, l = c * e, this.n11 = g * h, this.n12 = k * d - j, this.n13 = i * d + l, this.n21 = g * e, this.n22 = l * d + i, this.n23 = j * d - k, this.n31 = -d, this.n32 = c * g, this.n33 = f * g;
				break;
			case "YZX":
				i = f * g, j = f * d, k = c * g, l = c * d, this.n11 = g * h, this.n12 = l - i * e, this.n13 = k * e + j, this.n21 = e, this.n22 = f * h, this.n23 = -c * h, this.n31 = -d * h, this.n32 = j * e + k, this.n33 = i - l * e;
				break;
			case "XZY":
				i = f * g, j = f * d, k = c * g, l = c * d, this.n11 = g * h, this.n12 = -e, this.n13 = d * h, this.n21 = i * e + l, this.n22 = f * h, this.n23 = j * e - k, this.n31 = k * e - j, this.n32 = c * h, this.n33 = l * e + i;
				break;
			default:
				i = f * h, j = f * e, k = c * h, l = c * e, this.n11 = g * h, this.n12 = -g * e, this.n13 = d, this.n21 = j + k * d, this.n22 = i - l * d, this.n23 = -c * g, this.n31 = l - i * d, this.n32 = k + j * d, this.n33 = f * g
			}
			return this
		},
		setRotationFromQuaternion: function(a) {
			var b = a.x,
				c = a.y,
				d = a.z,
				e = a.w,
				f = b + b,
				g = c + c,
				h = d + d,
				a = b * f,
				i = b * g;
			b *= h;
			var j = c * g;
			return c *= h, d *= h, f *= e, g *= e, e *= h, this.n11 = 1 - (j + d), this.n12 = i - e, this.n13 = b + g, this.n21 = i + e, this.n22 = 1 - (a + d), this.n23 = c - f, this.n31 = b - g, this.n32 = c + f, this.n33 = 1 - (a + j), this
		},
		scale: function(a) {
			var b = a.x,
				c = a.y,
				a = a.z;
			return this.n11 *= b, this.n12 *= c, this.n13 *= a, this.n21 *= b, this.n22 *= c, this.n23 *= a, this.n31 *= b, this.n32 *= c, this.n33 *= a, this.n41 *= b, this.n42 *= c, this.n43 *= a, this
		},
		compose: function(a, b, c) {
			var d = THREE.Matrix4.__m1,
				e = THREE.Matrix4.__m2;
			return d.identity(), d.setRotationFromQuaternion(b), e.setScale(c.x, c.y, c.z), this.multiply(d, e), this.n14 = a.x, this.n24 = a.y, this.n34 = a.z, this
		},
		decompose: function(a, b, c) {
			var d = THREE.Matrix4.__v1,
				e = THREE.Matrix4.__v2,
				f = THREE.Matrix4.__v3;
			return d.set(this.n11, this.n21, this.n31), e.set(this.n12, this.n22, this.n32), f.set(this.n13, this.n23, this.n33), a = a instanceof THREE.Vector3 ? a : new THREE.Vector3, b = b instanceof THREE.Quaternion ? b : new THREE.Quaternion, c = c instanceof THREE.Vector3 ? c : new THREE.Vector3, c.x = d.length(), c.y = e.length(), c.z = f.length(), a.x = this.n14, a.y = this.n24, a.z = this.n34, d = THREE.Matrix4.__m1, d.copy(this), d.n11 /= c.x, d.n21 /= c.x, d.n31 /= c.x, d.n12 /= c.y, d.n22 /= c.y, d.n32 /= c.y, d.n13 /= c.z, d.n23 /= c.z, d.n33 /= c.z, b.setFromRotationMatrix(d), [a, b, c]
		},
		extractPosition: function(a) {
			return this.n14 = a.n14, this.n24 = a.n24, this.n34 = a.n34, this
		},
		extractRotation: function(a) {
			var b = THREE.Matrix4.__v1,
				c = 1 / b.set(a.n11, a.n21, a.n31).length(),
				d = 1 / b.set(a.n12, a.n22, a.n32).length(),
				b = 1 / b.set(a.n13, a.n23, a.n33).length();
			return this.n11 = a.n11 * c, this.n21 = a.n21 * c, this.n31 = a.n31 * c, this.n12 = a.n12 * d, this.n22 = a.n22 * d, this.n32 = a.n32 * d, this.n13 = a.n13 * b, this.n23 = a.n23 * b, this.n33 = a.n33 * b, this
		}
	}, THREE.Matrix4.makeInvert3x3 = function(a) {
		var b = a.m33,
			c = b.m,
			d = a.n33 * a.n22 - a.n32 * a.n23,
			e = -a.n33 * a.n21 + a.n31 * a.n23,
			f = a.n32 * a.n21 - a.n31 * a.n22,
			g = -a.n33 * a.n12 + a.n32 * a.n13,
			h = a.n33 * a.n11 - a.n31 * a.n13,
			i = -a.n32 * a.n11 + a.n31 * a.n12,
			j = a.n23 * a.n12 - a.n22 * a.n13,
			k = -a.n23 * a.n11 + a.n21 * a.n13,
			l = a.n22 * a.n11 - a.n21 * a.n12,
			a = a.n11 * d + a.n21 * g + a.n31 * j;
		return 0 === a && console.error("THREE.Matrix4.makeInvert3x3: Matrix not invertible."), a = 1 / a, c[0] = a * d, c[1] = a * e, c[2] = a * f, c[3] = a * g, c[4] = a * h, c[5] = a * i, c[6] = a * j, c[7] = a * k, c[8] = a * l, b
	}, THREE.Matrix4.makeFrustum = function(a, b, c, d, e, f) {
		var g;
		return g = new THREE.Matrix4, g.n11 = 2 * e / (b - a), g.n12 = 0, g.n13 = (b + a) / (b - a), g.n14 = 0, g.n21 = 0, g.n22 = 2 * e / (d - c), g.n23 = (d + c) / (d - c), g.n24 = 0, g.n31 = 0, g.n32 = 0, g.n33 = -(f + e) / (f - e), g.n34 = -2 * f * e / (f - e), g.n41 = 0, g.n42 = 0, g.n43 = -1, g.n44 = 0, g
	}, THREE.Matrix4.makePerspective = function(a, b, c, d) {
		var e, a = c * Math.tan(a * Math.PI / 360);
		return e = -a, THREE.Matrix4.makeFrustum(e * b, a * b, e, a, c, d)
	}, THREE.Matrix4.makeOrtho = function(a, b, c, d, e, f) {
		var g, h, i, j;
		return g = new THREE.Matrix4, h = b - a, i = c - d, j = f - e, g.n11 = 2 / h, g.n12 = 0, g.n13 = 0, g.n14 = -((b + a) / h), g.n21 = 0, g.n22 = 2 / i, g.n23 = 0, g.n24 = -((c + d) / i), g.n31 = 0, g.n32 = 0, g.n33 = -2 / j, g.n34 = -((f + e) / j), g.n41 = 0, g.n42 = 0, g.n43 = 0, g.n44 = 1, g
	}, THREE.Matrix4.__v1 = new THREE.Vector3, THREE.Matrix4.__v2 = new THREE.Vector3, THREE.Matrix4.__v3 = new THREE.Vector3, THREE.Matrix4.__m1 = new THREE.Matrix4, THREE.Matrix4.__m2 = new THREE.Matrix4, THREE.Object3D = function() {
		this.name = "", this.id = THREE.Object3DCount++, this.parent = void 0, this.children = [], this.up = new THREE.Vector3(0, 1, 0), this.position = new THREE.Vector3, this.rotation = new THREE.Vector3, this.eulerOrder = "XYZ", this.scale = new THREE.Vector3(1, 1, 1), this.flipSided = this.doubleSided = this.dynamic = !1, this.renderDepth = null, this.rotationAutoUpdate = !0, this.matrix = new THREE.Matrix4, this.matrixWorld = new THREE.Matrix4, this.matrixRotationWorld = new THREE.Matrix4, this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0, this.quaternion = new THREE.Quaternion, this.useQuaternion = !1, this.boundRadius = 0, this.boundRadiusScale = 1, this.visible = !0, this.receiveShadow = this.castShadow = !1, this.frustumCulled = !0, this._vector = new THREE.Vector3
	}, THREE.Object3D.prototype = {
		constructor: THREE.Object3D,
		translate: function(a, b) {
			this.matrix.rotateAxis(b), this.position.addSelf(b.multiplyScalar(a))
		},
		translateX: function(a) {
			this.translate(a, this._vector.set(1, 0, 0))
		},
		translateY: function(a) {
			this.translate(a, this._vector.set(0, 1, 0))
		},
		translateZ: function(a) {
			this.translate(a, this._vector.set(0, 0, 1))
		},
		lookAt: function(a) {
			this.matrix.lookAt(a, this.position, this.up), this.rotationAutoUpdate && this.rotation.setRotationFromMatrix(this.matrix)
		},
		add: function(a) {
			if (-1 === this.children.indexOf(a)) {
				void 0 !== a.parent && a.parent.remove(a), a.parent = this, this.children.push(a);
				for (var b = this; void 0 !== b.parent;) b = b.parent;
				void 0 !== b && b instanceof THREE.Scene && b.addObject(a)
			}
		},
		remove: function(a) {
			var b = this.children.indexOf(a);
			if (-1 !== b) {
				for (a.parent = void 0, this.children.splice(b, 1), b = this; void 0 !== b.parent;) b = b.parent;
				void 0 !== b && b instanceof THREE.Scene && b.removeObject(a)
			}
		},
		getChildByName: function(a, b) {
			var c, d, e;
			for (c = 0, d = this.children.length; d > c; c++) {
				if (e = this.children[c], e.name === a) return e;
				if (b && (e = e.getChildByName(a, b), void 0 !== e)) return e
			}
		},
		updateMatrix: function() {
			this.matrix.setPosition(this.position), this.useQuaternion ? this.matrix.setRotationFromQuaternion(this.quaternion) : this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder), (1 !== this.scale.x || 1 !== this.scale.y || 1 !== this.scale.z) && (this.matrix.scale(this.scale), this.boundRadiusScale = Math.max(this.scale.x, Math.max(this.scale.y, this.scale.z))), this.matrixWorldNeedsUpdate = !0
		},
		updateMatrixWorld: function(a) {
			this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || a) && (this.parent ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, a = !0);
			for (var b = 0, c = this.children.length; c > b; b++) this.children[b].updateMatrixWorld(a)
		}
	}, THREE.Object3DCount = 0, THREE.Projector = function() {
		function a() {
			var a = p[f] = p[f] || new THREE.RenderableObject;
			return f++, a
		}
		function b() {
			var a = q[h] = q[h] || new THREE.RenderableVertex;
			return h++, a
		}
		function c(a, b) {
			return b.z - a.z
		}
		function d(a, b) {
			var c = 0,
				d = 1,
				e = a.z + a.w,
				f = b.z + b.w,
				g = -a.z + a.w,
				h = -b.z + b.w;
			return e >= 0 && f >= 0 && g >= 0 && h >= 0 ? !0 : 0 > e && 0 > f || 0 > g && 0 > h ? !1 : (0 > e ? c = Math.max(c, e / (e - f)) : 0 > f && (d = Math.min(d, e / (e - f))), 0 > g ? c = Math.max(c, g / (g - h)) : 0 > h && (d = Math.min(d, g / (g - h))), c > d ? !1 : (a.lerpSelf(b, c), b.lerpSelf(a, 1 - d), !0))
		}
		var e, f, g, h, i, j, k, l, m, n, o, p = [],
			q = [],
			r = [],
			s = [],
			t = [],
			u = [],
			v = {
				objects: [],
				sprites: [],
				lights: [],
				elements: []
			},
			w = new THREE.Vector3,
			x = new THREE.Vector4,
			y = new THREE.Matrix4,
			z = new THREE.Matrix4,
			A = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4],
			B = new THREE.Vector4,
			C = new THREE.Vector4;
		this.computeFrustum = function(a) {
			for (A[0].set(a.n41 - a.n11, a.n42 - a.n12, a.n43 - a.n13, a.n44 - a.n14), A[1].set(a.n41 + a.n11, a.n42 + a.n12, a.n43 + a.n13, a.n44 + a.n14), A[2].set(a.n41 + a.n21, a.n42 + a.n22, a.n43 + a.n23, a.n44 + a.n24), A[3].set(a.n41 - a.n21, a.n42 - a.n22, a.n43 - a.n23, a.n44 - a.n24), A[4].set(a.n41 - a.n31, a.n42 - a.n32, a.n43 - a.n33, a.n44 - a.n34), A[5].set(a.n41 + a.n31, a.n42 + a.n32, a.n43 + a.n33, a.n44 + a.n34), a = 0; 6 > a; a++) {
				var b = A[a];
				b.divideScalar(Math.sqrt(b.x * b.x + b.y * b.y + b.z * b.z))
			}
		}, this.projectVector = function(a, b) {
			return b.matrixWorldInverse.getInverse(b.matrixWorld), y.multiply(b.projectionMatrix, b.matrixWorldInverse), y.multiplyVector3(a), a
		}, this.unprojectVector = function(a, b) {
			return b.projectionMatrixInverse.getInverse(b.projectionMatrix), y.multiply(b.matrixWorld, b.projectionMatrixInverse), y.multiplyVector3(a), a
		}, this.pickingRay = function(a, b) {
			var c;
			return a.z = -1, c = new THREE.Vector3(a.x, a.y, 1), this.unprojectVector(a, b), this.unprojectVector(c, b), c.subSelf(a).normalize(), new THREE.Ray(a, c)
		}, this.projectGraph = function(b, d) {
			f = 0, v.objects.length = 0, v.sprites.length = 0, v.lights.length = 0;
			var g = function(b) {
					if (b.visible !== !1) {
						var c;
						if ((c = b instanceof THREE.Mesh || b instanceof THREE.Line) && !(c = b.frustumCulled === !1)) a: {
							for (var d = b.matrixWorld, f = -b.geometry.boundingSphere.radius * Math.max(b.scale.x, Math.max(b.scale.y, b.scale.z)), h = 0; 6 > h; h++) if (c = A[h].x * d.n14 + A[h].y * d.n24 + A[h].z * d.n34 + A[h].w, f >= c) {
								c = !1;
								break a
							}
							c = !0
						}
						for (c ? (y.multiplyVector3(w.copy(b.position)), e = a(), e.object = b, e.z = w.z, v.objects.push(e)) : b instanceof THREE.Sprite || b instanceof THREE.Particle ? (y.multiplyVector3(w.copy(b.position)), e = a(), e.object = b, e.z = w.z, v.sprites.push(e)) : b instanceof THREE.Light && v.lights.push(b), c = 0, d = b.children.length; d > c; c++) g(b.children[c])
					}
				};
			return g(b), d && v.objects.sort(c), v
		}, this.projectScene = function(a, e, f) {
			var p, w, A, D, E, F, G, H, I, J, K, L, M, N, O, P, Q = e.near,
				R = e.far;
			for (o = m = k = j = 0, v.elements.length = 0, void 0 === e.parent && (console.warn("DEPRECATED: Camera hasn't been added to a Scene. Adding it..."), a.add(e)), a.updateMatrixWorld(), e.matrixWorldInverse.getInverse(e.matrixWorld), y.multiply(e.projectionMatrix, e.matrixWorldInverse), this.computeFrustum(y), v = this.projectGraph(a, !1), a = 0, p = v.objects.length; p > a; a++) if (I = v.objects[a].object, J = I.matrixWorld, L = I.material, h = 0, I instanceof THREE.Mesh) {
				for (K = I.geometry, M = I.geometry.materials, D = K.vertices, N = K.faces, O = K.faceVertexUvs, K = I.matrixRotationWorld.extractRotation(J), w = 0, A = D.length; A > w; w++) g = b(), g.positionWorld.copy(D[w].position), J.multiplyVector3(g.positionWorld), g.positionScreen.copy(g.positionWorld), y.multiplyVector4(g.positionScreen), g.positionScreen.x /= g.positionScreen.w, g.positionScreen.y /= g.positionScreen.w, g.visible = g.positionScreen.z > Q && g.positionScreen.z < R;
				for (D = 0, w = N.length; w > D; D++) {
					if (A = N[D], A instanceof THREE.Face3) {
						if (E = q[A.a], F = q[A.b], G = q[A.c], !(E.visible && F.visible && G.visible) || !I.doubleSided && I.flipSided == (G.positionScreen.x - E.positionScreen.x) * (F.positionScreen.y - E.positionScreen.y) - (G.positionScreen.y - E.positionScreen.y) * (F.positionScreen.x - E.positionScreen.x) < 0) continue;
						H = r[j] = r[j] || new THREE.RenderableFace3, j++, i = H, i.v1.copy(E), i.v2.copy(F), i.v3.copy(G)
					} else if (A instanceof THREE.Face4) {
						if (E = q[A.a], F = q[A.b], G = q[A.c], H = q[A.d], !(E.visible && F.visible && G.visible && H.visible) || !I.doubleSided && I.flipSided == ((H.positionScreen.x - E.positionScreen.x) * (F.positionScreen.y - E.positionScreen.y) - (H.positionScreen.y - E.positionScreen.y) * (F.positionScreen.x - E.positionScreen.x) < 0 || (F.positionScreen.x - G.positionScreen.x) * (H.positionScreen.y - G.positionScreen.y) - (F.positionScreen.y - G.positionScreen.y) * (H.positionScreen.x - G.positionScreen.x) < 0)) continue;
						P = s[k] = s[k] || new THREE.RenderableFace4, k++, i = P, i.v1.copy(E), i.v2.copy(F), i.v3.copy(G), i.v4.copy(H)
					}
					for (i.normalWorld.copy(A.normal), K.multiplyVector3(i.normalWorld), i.centroidWorld.copy(A.centroid), J.multiplyVector3(i.centroidWorld), i.centroidScreen.copy(i.centroidWorld), y.multiplyVector3(i.centroidScreen), G = A.vertexNormals, E = 0, F = G.length; F > E; E++) H = i.vertexNormalsWorld[E], H.copy(G[E]), K.multiplyVector3(H);
					for (E = 0, F = O.length; F > E; E++) if (P = O[E][D]) for (G = 0, H = P.length; H > G; G++) i.uvs[E][G] = P[G];
					i.material = L, i.faceMaterial = null !== A.materialIndex ? M[A.materialIndex] : null, i.z = i.centroidScreen.z, v.elements.push(i)
				}
			} else if (I instanceof THREE.Line) for (z.multiply(y, J), D = I.geometry.vertices, E = b(), E.positionScreen.copy(D[0].position), z.multiplyVector4(E.positionScreen), w = 1, A = D.length; A > w; w++) E = b(), E.positionScreen.copy(D[w].position), z.multiplyVector4(E.positionScreen), F = q[h - 2], B.copy(E.positionScreen), C.copy(F.positionScreen), d(B, C) && (B.multiplyScalar(1 / B.w), C.multiplyScalar(1 / C.w), I = t[m] = t[m] || new THREE.RenderableLine, m++, l = I, l.v1.positionScreen.copy(B), l.v2.positionScreen.copy(C), l.z = Math.max(B.z, C.z), l.material = L, v.elements.push(l));
			for (a = 0, p = v.sprites.length; p > a; a++) I = v.sprites[a].object, J = I.matrixWorld, I instanceof THREE.Particle && (x.set(J.n14, J.n24, J.n34, 1), y.multiplyVector4(x), x.z /= x.w, x.z > 0 && x.z < 1) && (Q = u[o] = u[o] || new THREE.RenderableParticle, o++, n = Q, n.x = x.x / x.w, n.y = x.y / x.w, n.z = x.z, n.rotation = I.rotation.z, n.scale.x = I.scale.x * Math.abs(n.x - (x.x + e.projectionMatrix.n11) / (x.w + e.projectionMatrix.n14)), n.scale.y = I.scale.y * Math.abs(n.y - (x.y + e.projectionMatrix.n22) / (x.w + e.projectionMatrix.n24)), n.material = I.material, v.elements.push(n));
			return f && v.elements.sort(c), v
		}
	}, THREE.Quaternion = function(a, b, c, d) {
		this.set(a || 0, b || 0, c || 0, void 0 !== d ? d : 1)
	}, THREE.Quaternion.prototype = {
		constructor: THREE.Quaternion,
		set: function(a, b, c, d) {
			return this.x = a, this.y = b, this.z = c, this.w = d, this
		},
		copy: function(a) {
			return this.x = a.x, this.y = a.y, this.z = a.z, this.w = a.w, this
		},
		setFromEuler: function(a) {
			var b = Math.PI / 360,
				c = a.x * b,
				d = a.y * b,
				e = a.z * b,
				a = Math.cos(d),
				d = Math.sin(d),
				b = Math.cos(-e),
				e = Math.sin(-e),
				f = Math.cos(c),
				c = Math.sin(c),
				g = a * b,
				h = d * e;
			return this.w = g * f - h * c, this.x = g * c + h * f, this.y = d * b * f + a * e * c, this.z = a * e * f - d * b * c, this
		},
		setFromAxisAngle: function(a, b) {
			var c = b / 2,
				d = Math.sin(c);
			return this.x = a.x * d, this.y = a.y * d, this.z = a.z * d, this.w = Math.cos(c), this
		},
		setFromRotationMatrix: function(a) {
			var b = Math.pow(a.determinant(), 1 / 3);
			return this.w = Math.sqrt(Math.max(0, b + a.n11 + a.n22 + a.n33)) / 2, this.x = Math.sqrt(Math.max(0, b + a.n11 - a.n22 - a.n33)) / 2, this.y = Math.sqrt(Math.max(0, b - a.n11 + a.n22 - a.n33)) / 2, this.z = Math.sqrt(Math.max(0, b - a.n11 - a.n22 + a.n33)) / 2, this.x = a.n32 - a.n23 < 0 ? -Math.abs(this.x) : Math.abs(this.x), this.y = a.n13 - a.n31 < 0 ? -Math.abs(this.y) : Math.abs(this.y), this.z = a.n21 - a.n12 < 0 ? -Math.abs(this.z) : Math.abs(this.z), this.normalize(), this
		},
		calculateW: function() {
			return this.w = -Math.sqrt(Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z)), this
		},
		inverse: function() {
			return this.x *= -1, this.y *= -1, this.z *= -1, this
		},
		length: function() {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
		},
		normalize: function() {
			var a = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
			return 0 === a ? this.w = this.z = this.y = this.x = 0 : (a = 1 / a, this.x *= a, this.y *= a, this.z *= a, this.w *= a), this
		},
		multiplySelf: function(a) {
			var b = this.x,
				c = this.y,
				d = this.z,
				e = this.w,
				f = a.x,
				g = a.y,
				h = a.z,
				a = a.w;
			return this.x = b * a + e * f + c * h - d * g, this.y = c * a + e * g + d * f - b * h, this.z = d * a + e * h + b * g - c * f, this.w = e * a - b * f - c * g - d * h, this
		},
		multiply: function(a, b) {
			return this.x = a.x * b.w + a.y * b.z - a.z * b.y + a.w * b.x, this.y = -a.x * b.z + a.y * b.w + a.z * b.x + a.w * b.y, this.z = a.x * b.y - a.y * b.x + a.z * b.w + a.w * b.z, this.w = -a.x * b.x - a.y * b.y - a.z * b.z + a.w * b.w, this
		},
		multiplyVector3: function(a, b) {
			b || (b = a);
			var c = a.x,
				d = a.y,
				e = a.z,
				f = this.x,
				g = this.y,
				h = this.z,
				i = this.w,
				j = i * c + g * e - h * d,
				k = i * d + h * c - f * e,
				l = i * e + f * d - g * c,
				c = -f * c - g * d - h * e;
			return b.x = j * i + c * -f + k * -h - l * -g, b.y = k * i + c * -g + l * -f - j * -h, b.z = l * i + c * -h + j * -g - k * -f, b
		}
	}, THREE.Quaternion.slerp = function(a, b, c, d) {
		var e = a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;
		if (0 > e ? (c.w = -b.w, c.x = -b.x, c.y = -b.y, c.z = -b.z, e = -e) : c.copy(b), Math.abs(e) >= 1) return c.w = a.w, c.x = a.x, c.y = a.y, c.z = a.z, c;
		var f = Math.acos(e),
			e = Math.sqrt(1 - e * e);
		return Math.abs(e) < .001 ? (c.w = .5 * (a.w + b.w), c.x = .5 * (a.x + b.x), c.y = .5 * (a.y + b.y), c.z = .5 * (a.z + b.z), c) : (b = Math.sin((1 - d) * f) / e, d = Math.sin(d * f) / e, c.w = a.w * b + c.w * d, c.x = a.x * b + c.x * d, c.y = a.y * b + c.y * d, c.z = a.z * b + c.z * d, c)
	}, THREE.Vertex = function(a) {
		this.position = a || new THREE.Vector3
	}, THREE.Face3 = function(a, b, c, d, e, f) {
		this.a = a, this.b = b, this.c = c, this.normal = d instanceof THREE.Vector3 ? d : new THREE.Vector3, this.vertexNormals = d instanceof Array ? d : [], this.color = e instanceof THREE.Color ? e : new THREE.Color, this.vertexColors = e instanceof Array ? e : [], this.vertexTangents = [], this.materialIndex = f, this.centroid = new THREE.Vector3
	}, THREE.Face4 = function(a, b, c, d, e, f, g) {
		this.a = a, this.b = b, this.c = c, this.d = d, this.normal = e instanceof THREE.Vector3 ? e : new THREE.Vector3, this.vertexNormals = e instanceof Array ? e : [], this.color = f instanceof THREE.Color ? f : new THREE.Color, this.vertexColors = f instanceof Array ? f : [], this.vertexTangents = [], this.materialIndex = g, this.centroid = new THREE.Vector3
	}, THREE.UV = function(a, b) {
		this.u = a || 0, this.v = b || 0
	}, THREE.UV.prototype = {
		constructor: THREE.UV,
		set: function(a, b) {
			return this.u = a, this.v = b, this
		},
		copy: function(a) {
			return this.u = a.u, this.v = a.v, this
		},
		clone: function() {
			return new THREE.UV(this.u, this.v)
		}
	}, THREE.Geometry = function() {
		this.id = THREE.GeometryCount++, this.vertices = [], this.colors = [], this.materials = [], this.faces = [], this.faceUvs = [
			[]
		], this.faceVertexUvs = [
			[]
		], this.morphTargets = [], this.morphColors = [], this.skinWeights = [], this.skinIndices = [], this.boundingSphere = this.boundingBox = null, this.dynamic = this.hasTangents = !1
	}, THREE.Geometry.prototype = {
		constructor: THREE.Geometry,
		applyMatrix: function(a) {
			var b = new THREE.Matrix4;
			b.extractRotation(a, new THREE.Vector3(1, 1, 1));
			for (var c = 0, d = this.vertices.length; d > c; c++) a.multiplyVector3(this.vertices[c].position);
			for (c = 0, d = this.faces.length; d > c; c++) {
				var e = this.faces[c];
				b.multiplyVector3(e.normal);
				for (var f = 0, g = e.vertexNormals.length; g > f; f++) b.multiplyVector3(e.vertexNormals[f]);
				a.multiplyVector3(e.centroid)
			}
		},
		computeCentroids: function() {
			var a, b, c;
			for (a = 0, b = this.faces.length; b > a; a++) c = this.faces[a], c.centroid.set(0, 0, 0), c instanceof THREE.Face3 ? (c.centroid.addSelf(this.vertices[c.a].position), c.centroid.addSelf(this.vertices[c.b].position), c.centroid.addSelf(this.vertices[c.c].position), c.centroid.divideScalar(3)) : c instanceof THREE.Face4 && (c.centroid.addSelf(this.vertices[c.a].position), c.centroid.addSelf(this.vertices[c.b].position), c.centroid.addSelf(this.vertices[c.c].position), c.centroid.addSelf(this.vertices[c.d].position), c.centroid.divideScalar(4))
		},
		computeFaceNormals: function() {
			var a, b, c, d, e, f, g = new THREE.Vector3,
				h = new THREE.Vector3;
			for (a = 0, b = this.faces.length; b > a; a++) c = this.faces[a], d = this.vertices[c.a], e = this.vertices[c.b], f = this.vertices[c.c], g.sub(f.position, e.position), h.sub(d.position, e.position), g.crossSelf(h), g.isZero() || g.normalize(), c.normal.copy(g)
		},
		computeVertexNormals: function() {
			var a, b, c, d;
			if (void 0 === this.__tmpVertices) {
				for (d = this.__tmpVertices = Array(this.vertices.length), a = 0, b = this.vertices.length; b > a; a++) d[a] = new THREE.Vector3;
				for (a = 0, b = this.faces.length; b > a; a++) c = this.faces[a], c instanceof THREE.Face3 ? c.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3] : c instanceof THREE.Face4 && (c.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3])
			} else for (d = this.__tmpVertices, a = 0, b = this.vertices.length; b > a; a++) d[a].set(0, 0, 0);
			for (a = 0, b = this.faces.length; b > a; a++) c = this.faces[a], c instanceof THREE.Face3 ? (d[c.a].addSelf(c.normal), d[c.b].addSelf(c.normal), d[c.c].addSelf(c.normal)) : c instanceof THREE.Face4 && (d[c.a].addSelf(c.normal), d[c.b].addSelf(c.normal), d[c.c].addSelf(c.normal), d[c.d].addSelf(c.normal));
			for (a = 0, b = this.vertices.length; b > a; a++) d[a].normalize();
			for (a = 0, b = this.faces.length; b > a; a++) c = this.faces[a], c instanceof THREE.Face3 ? (c.vertexNormals[0].copy(d[c.a]), c.vertexNormals[1].copy(d[c.b]), c.vertexNormals[2].copy(d[c.c])) : c instanceof THREE.Face4 && (c.vertexNormals[0].copy(d[c.a]), c.vertexNormals[1].copy(d[c.b]), c.vertexNormals[2].copy(d[c.c]), c.vertexNormals[3].copy(d[c.d]))
		},
		computeTangents: function() {
			function a(a, b, c, d, e, f, y) {
				h = a.vertices[b].position, i = a.vertices[c].position, j = a.vertices[d].position, k = g[e], l = g[f], m = g[y], n = i.x - h.x, o = j.x - h.x, p = i.y - h.y, q = j.y - h.y, r = i.z - h.z, s = j.z - h.z, t = l.u - k.u, u = m.u - k.u, v = l.v - k.v, w = m.v - k.v, x = 1 / (t * w - u * v), B.set((w * n - v * o) * x, (w * p - v * q) * x, (w * r - v * s) * x), C.set((t * o - u * n) * x, (t * q - u * p) * x, (t * s - u * r) * x), z[b].addSelf(B), z[c].addSelf(B), z[d].addSelf(B), A[b].addSelf(C), A[c].addSelf(C), A[d].addSelf(C)
			}
			var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z = [],
				A = [],
				B = new THREE.Vector3,
				C = new THREE.Vector3,
				D = new THREE.Vector3,
				E = new THREE.Vector3,
				F = new THREE.Vector3;
			for (b = 0, c = this.vertices.length; c > b; b++) z[b] = new THREE.Vector3, A[b] = new THREE.Vector3;
			for (b = 0, c = this.faces.length; c > b; b++) f = this.faces[b], g = this.faceVertexUvs[0][b], f instanceof THREE.Face3 ? a(this, f.a, f.b, f.c, 0, 1, 2) : f instanceof THREE.Face4 && (a(this, f.a, f.b, f.c, 0, 1, 2), a(this, f.a, f.b, f.d, 0, 1, 3));
			var G = ["a", "b", "c", "d"];
			for (b = 0, c = this.faces.length; c > b; b++) for (f = this.faces[b], d = 0; d < f.vertexNormals.length; d++) F.copy(f.vertexNormals[d]), e = f[G[d]], y = z[e], D.copy(y), D.subSelf(F.multiplyScalar(F.dot(y))).normalize(), E.cross(f.vertexNormals[d], y), e = E.dot(A[e]), e = 0 > e ? -1 : 1, f.vertexTangents[d] = new THREE.Vector4(D.x, D.y, D.z, e);
			this.hasTangents = !0
		},
		computeBoundingBox: function() {
			var a;
			if (this.vertices.length > 0) {
				this.boundingBox = {
					x: [this.vertices[0].position.x, this.vertices[0].position.x],
					y: [this.vertices[0].position.y, this.vertices[0].position.y],
					z: [this.vertices[0].position.z, this.vertices[0].position.z]
				};
				for (var b = 1, c = this.vertices.length; c > b; b++) a = this.vertices[b], a.position.x < this.boundingBox.x[0] ? this.boundingBox.x[0] = a.position.x : a.position.x > this.boundingBox.x[1] && (this.boundingBox.x[1] = a.position.x), a.position.y < this.boundingBox.y[0] ? this.boundingBox.y[0] = a.position.y : a.position.y > this.boundingBox.y[1] && (this.boundingBox.y[1] = a.position.y), a.position.z < this.boundingBox.z[0] ? this.boundingBox.z[0] = a.position.z : a.position.z > this.boundingBox.z[1] && (this.boundingBox.z[1] = a.position.z)
			}
		},
		computeBoundingSphere: function() {
			for (var a = 0, b = 0, c = this.vertices.length; c > b; b++) a = Math.max(a, this.vertices[b].position.length());
			this.boundingSphere = {
				radius: a
			}
		},
		mergeVertices: function() {
			var a, b, c, d = {},
				e = [],
				f = [],
				g = Math.pow(10, 4);
			for (b = 0, c = this.vertices.length; c > b; b++) a = this.vertices[b].position, a = [Math.round(a.x * g), Math.round(a.y * g), Math.round(a.z * g)].join("_"), void 0 === d[a] ? (d[a] = b, e.push(this.vertices[b]), f[b] = e.length - 1) : f[b] = f[d[a]];
			for (b = 0, c = this.faces.length; c > b; b++) d = this.faces[b], d instanceof THREE.Face3 ? (d.a = f[d.a], d.b = f[d.b], d.c = f[d.c]) : d instanceof THREE.Face4 && (d.a = f[d.a], d.b = f[d.b], d.c = f[d.c], d.d = f[d.d]);
			this.vertices = e
		}
	}, THREE.GeometryCount = 0, THREE.Camera = function() {
		return arguments.length ? (console.warn("DEPRECATED: Camera() is now PerspectiveCamera() or OrthographicCamera()."), new THREE.PerspectiveCamera(arguments[0], arguments[1], arguments[2], arguments[3])) : (THREE.Object3D.call(this), this.matrixWorldInverse = new THREE.Matrix4, this.projectionMatrix = new THREE.Matrix4, void(this.projectionMatrixInverse = new THREE.Matrix4))
	}, THREE.Camera.prototype = new THREE.Object3D, THREE.Camera.prototype.constructor = THREE.Camera, THREE.Camera.prototype.lookAt = function(a) {
		this.matrix.lookAt(this.position, a, this.up), this.rotationAutoUpdate && this.rotation.setRotationFromMatrix(this.matrix)
	}, THREE.OrthographicCamera = function(a, b, c, d, e, f) {
		THREE.Camera.call(this), this.left = a, this.right = b, this.top = c, this.bottom = d, this.near = void 0 !== e ? e : .1, this.far = void 0 !== f ? f : 2e3, this.updateProjectionMatrix()
	}, THREE.OrthographicCamera.prototype = new THREE.Camera, THREE.OrthographicCamera.prototype.constructor = THREE.OrthographicCamera, THREE.OrthographicCamera.prototype.updateProjectionMatrix = function() {
		this.projectionMatrix = THREE.Matrix4.makeOrtho(this.left, this.right, this.top, this.bottom, this.near, this.far)
	}, THREE.PerspectiveCamera = function(a, b, c, d) {
		THREE.Camera.call(this), this.fov = void 0 !== a ? a : 50, this.aspect = void 0 !== b ? b : 1, this.near = void 0 !== c ? c : .1, this.far = void 0 !== d ? d : 2e3, this.updateProjectionMatrix()
	}, THREE.PerspectiveCamera.prototype = new THREE.Camera, THREE.PerspectiveCamera.prototype.constructor = THREE.PerspectiveCamera, THREE.PerspectiveCamera.prototype.setLens = function(a, b) {
		this.fov = 2 * Math.atan((void 0 !== b ? b : 43.25) / (2 * a)), this.fov *= 180 / Math.PI, this.updateProjectionMatrix()
	}, THREE.PerspectiveCamera.prototype.setViewOffset = function(a, b, c, d, e, f) {
		this.fullWidth = a, this.fullHeight = b, this.x = c, this.y = d, this.width = e, this.height = f, this.updateProjectionMatrix()
	}, THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function() {
		if (this.fullWidth) {
			var a = this.fullWidth / this.fullHeight,
				b = Math.tan(this.fov * Math.PI / 360) * this.near,
				c = -b,
				d = a * c,
				a = Math.abs(a * b - d),
				c = Math.abs(b - c);
			this.projectionMatrix = THREE.Matrix4.makeFrustum(d + this.x * a / this.fullWidth, d + (this.x + this.width) * a / this.fullWidth, b - (this.y + this.height) * c / this.fullHeight, b - this.y * c / this.fullHeight, this.near, this.far)
		} else this.projectionMatrix = THREE.Matrix4.makePerspective(this.fov, this.aspect, this.near, this.far)
	}, THREE.Light = function(a) {
		THREE.Object3D.call(this), this.color = new THREE.Color(a)
	}, THREE.Light.prototype = new THREE.Object3D, THREE.Light.prototype.constructor = THREE.Light, THREE.Light.prototype.supr = THREE.Object3D.prototype, THREE.AmbientLight = function(a) {
		THREE.Light.call(this, a)
	}, THREE.AmbientLight.prototype = new THREE.Light, THREE.AmbientLight.prototype.constructor = THREE.AmbientLight, THREE.DirectionalLight = function(a, b, c) {
		THREE.Light.call(this, a), this.position = new THREE.Vector3(0, 1, 0), this.intensity = void 0 !== b ? b : 1, this.distance = void 0 !== c ? c : 0
	}, THREE.DirectionalLight.prototype = new THREE.Light, THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight, THREE.PointLight = function(a, b, c) {
		THREE.Light.call(this, a), this.position = new THREE.Vector3(0, 0, 0), this.intensity = void 0 !== b ? b : 1, this.distance = void 0 !== c ? c : 0
	}, THREE.PointLight.prototype = new THREE.Light, THREE.PointLight.prototype.constructor = THREE.PointLight, THREE.Material = function(a) {
		this.name = "", this.id = THREE.MaterialCount++, a = a || {}, this.opacity = void 0 !== a.opacity ? a.opacity : 1, this.transparent = void 0 !== a.transparent ? a.transparent : !1, this.blending = void 0 !== a.blending ? a.blending : THREE.NormalBlending, this.depthTest = void 0 !== a.depthTest ? a.depthTest : !0, this.depthWrite = void 0 !== a.depthWrite ? a.depthWrite : !0, this.polygonOffset = void 0 !== a.polygonOffset ? a.polygonOffset : !1, this.polygonOffsetFactor = void 0 !== a.polygonOffsetFactor ? a.polygonOffsetFactor : 0, this.polygonOffsetUnits = void 0 !== a.polygonOffsetUnits ? a.polygonOffsetUnits : 0, this.alphaTest = void 0 !== a.alphaTest ? a.alphaTest : 0, this.overdraw = void 0 !== a.overdraw ? a.overdraw : !1
	}, THREE.MaterialCount = 0, THREE.NoShading = 0, THREE.FlatShading = 1, THREE.SmoothShading = 2, THREE.NoColors = 0, THREE.FaceColors = 1, THREE.VertexColors = 2, THREE.NormalBlending = 0, THREE.AdditiveBlending = 1, THREE.SubtractiveBlending = 2, THREE.MultiplyBlending = 3, THREE.AdditiveAlphaBlending = 4, THREE.LineBasicMaterial = function(a) {
		THREE.Material.call(this, a), a = a || {}, this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215), this.linewidth = void 0 !== a.linewidth ? a.linewidth : 1, this.linecap = void 0 !== a.linecap ? a.linecap : "round", this.linejoin = void 0 !== a.linejoin ? a.linejoin : "round", this.vertexColors = a.vertexColors ? a.vertexColors : !1, this.fog = void 0 !== a.fog ? a.fog : !0
	}, THREE.LineBasicMaterial.prototype = new THREE.Material, THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial, THREE.MeshBasicMaterial = function(a) {
		THREE.Material.call(this, a), a = a || {}, this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215), this.map = void 0 !== a.map ? a.map : null, this.lightMap = void 0 !== a.lightMap ? a.lightMap : null, this.envMap = void 0 !== a.envMap ? a.envMap : null, this.combine = void 0 !== a.combine ? a.combine : THREE.MultiplyOperation, this.reflectivity = void 0 !== a.reflectivity ? a.reflectivity : 1, this.refractionRatio = void 0 !== a.refractionRatio ? a.refractionRatio : .98, this.fog = void 0 !== a.fog ? a.fog : !0, this.shading = void 0 !== a.shading ? a.shading : THREE.SmoothShading, this.wireframe = void 0 !== a.wireframe ? a.wireframe : !1, this.wireframeLinewidth = void 0 !== a.wireframeLinewidth ? a.wireframeLinewidth : 1, this.wireframeLinecap = void 0 !== a.wireframeLinecap ? a.wireframeLinecap : "round", this.wireframeLinejoin = void 0 !== a.wireframeLinejoin ? a.wireframeLinejoin : "round", this.vertexColors = void 0 !== a.vertexColors ? a.vertexColors : !1, this.skinning = void 0 !== a.skinning ? a.skinning : !1, this.morphTargets = void 0 !== a.morphTargets ? a.morphTargets : !1
	}, THREE.MeshBasicMaterial.prototype = new THREE.Material, THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial, THREE.MeshLambertMaterial = function(a) {
		THREE.Material.call(this, a), a = a || {}, this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215), this.ambient = void 0 !== a.ambient ? new THREE.Color(a.ambient) : new THREE.Color(328965), this.map = void 0 !== a.map ? a.map : null, this.lightMap = void 0 !== a.lightMap ? a.lightMap : null, this.envMap = void 0 !== a.envMap ? a.envMap : null, this.combine = void 0 !== a.combine ? a.combine : THREE.MultiplyOperation, this.reflectivity = void 0 !== a.reflectivity ? a.reflectivity : 1, this.refractionRatio = void 0 !== a.refractionRatio ? a.refractionRatio : .98, this.fog = void 0 !== a.fog ? a.fog : !0, this.shading = void 0 !== a.shading ? a.shading : THREE.SmoothShading, this.wireframe = void 0 !== a.wireframe ? a.wireframe : !1, this.wireframeLinewidth = void 0 !== a.wireframeLinewidth ? a.wireframeLinewidth : 1, this.wireframeLinecap = void 0 !== a.wireframeLinecap ? a.wireframeLinecap : "round", this.wireframeLinejoin = void 0 !== a.wireframeLinejoin ? a.wireframeLinejoin : "round", this.vertexColors = void 0 !== a.vertexColors ? a.vertexColors : !1, this.skinning = void 0 !== a.skinning ? a.skinning : !1, this.morphTargets = void 0 !== a.morphTargets ? a.morphTargets : !1
	}, THREE.MeshLambertMaterial.prototype = new THREE.Material, THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial, THREE.MeshPhongMaterial = function(a) {
		THREE.Material.call(this, a), a = a || {}, this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215), this.ambient = void 0 !== a.ambient ? new THREE.Color(a.ambient) : new THREE.Color(328965), this.specular = void 0 !== a.specular ? new THREE.Color(a.specular) : new THREE.Color(1118481), this.shininess = void 0 !== a.shininess ? a.shininess : 30, this.metal = void 0 !== a.metal ? a.metal : !1, this.perPixel = void 0 !== a.perPixel ? a.perPixel : !1, this.map = void 0 !== a.map ? a.map : null, this.lightMap = void 0 !== a.lightMap ? a.lightMap : null, this.envMap = void 0 !== a.envMap ? a.envMap : null, this.combine = void 0 !== a.combine ? a.combine : THREE.MultiplyOperation, this.reflectivity = void 0 !== a.reflectivity ? a.reflectivity : 1, this.refractionRatio = void 0 !== a.refractionRatio ? a.refractionRatio : .98, this.fog = void 0 !== a.fog ? a.fog : !0, this.shading = void 0 !== a.shading ? a.shading : THREE.SmoothShading, this.wireframe = void 0 !== a.wireframe ? a.wireframe : !1, this.wireframeLinewidth = void 0 !== a.wireframeLinewidth ? a.wireframeLinewidth : 1, this.wireframeLinecap = void 0 !== a.wireframeLinecap ? a.wireframeLinecap : "round", this.wireframeLinejoin = void 0 !== a.wireframeLinejoin ? a.wireframeLinejoin : "round", this.vertexColors = void 0 !== a.vertexColors ? a.vertexColors : !1, this.skinning = void 0 !== a.skinning ? a.skinning : !1, this.morphTargets = void 0 !== a.morphTargets ? a.morphTargets : !1
	}, THREE.MeshPhongMaterial.prototype = new THREE.Material, THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial, THREE.MeshDepthMaterial = function(a) {
		THREE.Material.call(this, a), a = a || {}, this.shading = void 0 !== a.shading ? a.shading : THREE.SmoothShading, this.wireframe = void 0 !== a.wireframe ? a.wireframe : !1, this.wireframeLinewidth = void 0 !== a.wireframeLinewidth ? a.wireframeLinewidth : 1
	}, THREE.MeshDepthMaterial.prototype = new THREE.Material, THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial, THREE.MeshNormalMaterial = function(a) {
		THREE.Material.call(this, a), a = a || {}, this.shading = a.shading ? a.shading : THREE.FlatShading, this.wireframe = a.wireframe ? a.wireframe : !1, this.wireframeLinewidth = a.wireframeLinewidth ? a.wireframeLinewidth : 1
	}, THREE.MeshNormalMaterial.prototype = new THREE.Material, THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial, THREE.MeshFaceMaterial = function() {}, THREE.ParticleBasicMaterial = function(a) {
		THREE.Material.call(this, a), a = a || {}, this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215), this.map = void 0 !== a.map ? a.map : null, this.size = void 0 !== a.size ? a.size : 1, this.sizeAttenuation = void 0 !== a.sizeAttenuation ? a.sizeAttenuation : !0, this.vertexColors = void 0 !== a.vertexColors ? a.vertexColors : !1, this.fog = void 0 !== a.fog ? a.fog : !0
	}, THREE.ParticleBasicMaterial.prototype = new THREE.Material, THREE.ParticleBasicMaterial.prototype.constructor = THREE.ParticleBasicMaterial, THREE.ParticleCanvasMaterial = function(a) {
		THREE.Material.call(this, a), a = a || {}, this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215), this.program = void 0 !== a.program ? a.program : function() {}
	}, THREE.ParticleCanvasMaterial.prototype = new THREE.Material, THREE.ParticleCanvasMaterial.prototype.constructor = THREE.ParticleCanvasMaterial, THREE.Texture = function(a, b, c, d, e, f) {
		this.id = THREE.TextureCount++, this.image = a, this.mapping = void 0 !== b ? b : new THREE.UVMapping, this.wrapS = void 0 !== c ? c : THREE.ClampToEdgeWrapping, this.wrapT = void 0 !== d ? d : THREE.ClampToEdgeWrapping, this.magFilter = void 0 !== e ? e : THREE.LinearFilter, this.minFilter = void 0 !== f ? f : THREE.LinearMipMapLinearFilter, this.offset = new THREE.Vector2(0, 0), this.repeat = new THREE.Vector2(1, 1), this.needsUpdate = !1, this.onUpdate = null
	}, THREE.Texture.prototype = {
		constructor: THREE.Texture,
		clone: function() {
			var a = new THREE.Texture(this.image, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter);
			return a.offset.copy(this.offset), a.repeat.copy(this.repeat), a
		}
	}, THREE.TextureCount = 0, THREE.MultiplyOperation = 0, THREE.MixOperation = 1, THREE.CubeReflectionMapping = function() {}, THREE.CubeRefractionMapping = function() {}, THREE.LatitudeReflectionMapping = function() {}, THREE.LatitudeRefractionMapping = function() {}, THREE.SphericalReflectionMapping = function() {}, THREE.SphericalRefractionMapping = function() {}, THREE.UVMapping = function() {}, THREE.RepeatWrapping = 0, THREE.ClampToEdgeWrapping = 1, THREE.MirroredRepeatWrapping = 2, THREE.NearestFilter = 3, THREE.NearestMipMapNearestFilter = 4, THREE.NearestMipMapLinearFilter = 5, THREE.LinearFilter = 6, THREE.LinearMipMapNearestFilter = 7, THREE.LinearMipMapLinearFilter = 8, THREE.ByteType = 9, THREE.UnsignedByteType = 10, THREE.ShortType = 11, THREE.UnsignedShortType = 12, THREE.IntType = 13, THREE.UnsignedIntType = 14, THREE.FloatType = 15, THREE.AlphaFormat = 16, THREE.RGBFormat = 17, THREE.RGBAFormat = 18, THREE.LuminanceFormat = 19, THREE.LuminanceAlphaFormat = 20, THREE.Particle = function(a) {
		THREE.Object3D.call(this), this.material = a
	}, THREE.Particle.prototype = new THREE.Object3D, THREE.Particle.prototype.constructor = THREE.Particle, THREE.Line = function(a, b, c) {
		THREE.Object3D.call(this), this.geometry = a, this.material = b, this.type = void 0 !== c ? c : THREE.LineStrip, this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere())
	}, THREE.LineStrip = 0, THREE.LinePieces = 1, THREE.Line.prototype = new THREE.Object3D, THREE.Line.prototype.constructor = THREE.Line, THREE.Mesh = function(a, b) {
		if (THREE.Object3D.call(this), this.geometry = a, this.material = b, b instanceof Array && (console.warn("DEPRECATED: Mesh material can no longer be an Array. Using material at index 0..."), this.material = b[0]), this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere(), this.boundRadius = a.boundingSphere.radius, this.geometry.morphTargets.length)) {
			this.morphTargetBase = -1, this.morphTargetForcedOrder = [], this.morphTargetInfluences = [], this.morphTargetDictionary = {};
			for (var c = 0; c < this.geometry.morphTargets.length; c++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[c].name] = c
		}
	}, THREE.Mesh.prototype = new THREE.Object3D, THREE.Mesh.prototype.constructor = THREE.Mesh, THREE.Mesh.prototype.supr = THREE.Object3D.prototype, THREE.Mesh.prototype.getMorphTargetIndexByName = function(a) {
		return void 0 !== this.morphTargetDictionary[a] ? this.morphTargetDictionary[a] : (console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0."), 0)
	}, THREE.Bone = function(a) {
		THREE.Object3D.call(this), this.skin = a, this.skinMatrix = new THREE.Matrix4
	}, THREE.Bone.prototype = new THREE.Object3D, THREE.Bone.prototype.constructor = THREE.Bone, THREE.Bone.prototype.supr = THREE.Object3D.prototype, THREE.Bone.prototype.update = function(a, b) {
		this.matrixAutoUpdate && (b |= this.updateMatrix()), (b || this.matrixWorldNeedsUpdate) && (a ? this.skinMatrix.multiply(a, this.matrix) : this.skinMatrix.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, b = !0);
		var c, d = this.children.length;
		for (c = 0; d > c; c++) this.children[c].update(this.skinMatrix, b)
	}, THREE.Sprite = function(a) {
		THREE.Object3D.call(this), this.color = void 0 !== a.color ? new THREE.Color(a.color) : new THREE.Color(16777215), this.map = a.map instanceof THREE.Texture ? a.map : THREE.ImageUtils.loadTexture(a.map), this.blending = void 0 !== a.blending ? a.blending : THREE.NormalBlending, this.useScreenCoordinates = void 0 !== a.useScreenCoordinates ? a.useScreenCoordinates : !0, this.mergeWith3D = void 0 !== a.mergeWith3D ? a.mergeWith3D : !this.useScreenCoordinates, this.affectedByDistance = void 0 !== a.affectedByDistance ? a.affectedByDistance : !this.useScreenCoordinates, this.scaleByViewport = void 0 !== a.scaleByViewport ? a.scaleByViewport : !this.affectedByDistance, this.alignment = a.alignment instanceof THREE.Vector2 ? a.alignment : THREE.SpriteAlignment.center, this.rotation3d = this.rotation, this.rotation = 0, this.opacity = 1, this.uvOffset = new THREE.Vector2(0, 0), this.uvScale = new THREE.Vector2(1, 1)
	}, THREE.Sprite.prototype = new THREE.Object3D, THREE.Sprite.prototype.constructor = THREE.Sprite, THREE.Sprite.prototype.updateMatrix = function() {
		this.matrix.setPosition(this.position), this.rotation3d.set(0, 0, this.rotation), this.matrix.setRotationFromEuler(this.rotation3d), (1 !== this.scale.x || 1 !== this.scale.y) && (this.matrix.scale(this.scale), this.boundRadiusScale = Math.max(this.scale.x, this.scale.y)), this.matrixWorldNeedsUpdate = !0
	}, THREE.SpriteAlignment = {}, THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1), THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1), THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1), THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0), THREE.SpriteAlignment.center = new THREE.Vector2(0, 0), THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0), THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1), THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1), THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1), THREE.Scene = function() {
		THREE.Object3D.call(this), this.overrideMaterial = this.fog = null, this.matrixAutoUpdate = !1, this.objects = [], this.lights = [], this.__objectsAdded = [], this.__objectsRemoved = []
	}, THREE.Scene.prototype = new THREE.Object3D, THREE.Scene.prototype.constructor = THREE.Scene, THREE.Scene.prototype.addObject = function(a) {
		if (a instanceof THREE.Light) - 1 === this.lights.indexOf(a) && this.lights.push(a);
		else if (!(a instanceof THREE.Camera || a instanceof THREE.Bone) && -1 === this.objects.indexOf(a)) {
			this.objects.push(a), this.__objectsAdded.push(a);
			var b = this.__objectsRemoved.indexOf(a); - 1 !== b && this.__objectsRemoved.splice(b, 1)
		}
		for (b = 0; b < a.children.length; b++) this.addObject(a.children[b])
	}, THREE.Scene.prototype.removeObject = function(a) {
		if (a instanceof THREE.Light) {
			var b = this.lights.indexOf(a); - 1 !== b && this.lights.splice(b, 1)
		} else a instanceof THREE.Camera || (b = this.objects.indexOf(a), -1 !== b && (this.objects.splice(b, 1), this.__objectsRemoved.push(a), b = this.__objectsAdded.indexOf(a), -1 !== b && this.__objectsAdded.splice(b, 1)));
		for (b = 0; b < a.children.length; b++) this.removeObject(a.children[b])
	}, THREE.CanvasRenderer = function(a) {
		function b(a) {
			Y != a && (V.globalAlpha = Y = a)
		}
		function c(a) {
			if (Z != a) {
				switch (a) {
				case THREE.NormalBlending:
					V.globalCompositeOperation = "source-over";
					break;
				case THREE.AdditiveBlending:
					V.globalCompositeOperation = "lighter";
					break;
				case THREE.SubtractiveBlending:
					V.globalCompositeOperation = "darker"
				}
				Z = a
			}
		}
		function d(a) {
			$ != a && (V.strokeStyle = $ = a)
		}
		function e(a) {
			_ != a && (V.fillStyle = _ = a)
		}
		var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S = this,
			T = new THREE.Projector,
			a = a || {},
			U = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"),
			V = U.getContext("2d"),
			W = new THREE.Color(0),
			X = 0,
			Y = 1,
			Z = 0,
			$ = null,
			_ = null,
			aa = null,
			ba = null,
			ca = null,
			da = new THREE.RenderableVertex,
			ea = new THREE.RenderableVertex,
			fa = new THREE.Color,
			ga = new THREE.Color,
			ha = new THREE.Color,
			ia = new THREE.Color,
			ja = new THREE.Color,
			ka = [],
			la = [],
			ma = new THREE.Rectangle,
			na = new THREE.Rectangle,
			oa = new THREE.Rectangle,
			pa = !1,
			qa = new THREE.Color,
			ra = new THREE.Color,
			sa = new THREE.Color,
			ta = new THREE.Vector3,
			a = 16;
		M = document.createElement("canvas"), M.width = M.height = 2, N = M.getContext("2d"), N.fillStyle = "rgba(0,0,0,1)", N.fillRect(0, 0, 2, 2), O = N.getImageData(0, 0, 2, 2), P = O.data, Q = document.createElement("canvas"), Q.width = Q.height = a, R = Q.getContext("2d"), R.translate(-a / 2, -a / 2), R.scale(a, a), a--, this.domElement = U, this.sortElements = this.sortObjects = this.autoClear = !0, this.info = {
			render: {
				vertices: 0,
				faces: 0
			}
		}, this.setSize = function(a, b) {
			i = a, j = b, k = Math.floor(i / 2), l = Math.floor(j / 2), U.width = i, U.height = j, ma.set(-k, -l, k, l), na.set(-k, -l, k, l), Y = 1, Z = 0, ca = ba = aa = _ = $ = null
		}, this.setClearColor = function(a, b) {
			W.copy(a), X = b, na.set(-k, -l, k, l)
		}, this.setClearColorHex = function(a, b) {
			W.setHex(a), X = b, na.set(-k, -l, k, l)
		}, this.clear = function() {
			V.setTransform(1, 0, 0, -1, k, l), na.isEmpty() || (na.minSelf(ma), na.inflate(2), 1 > X && V.clearRect(Math.floor(na.getX()), Math.floor(na.getY()), Math.floor(na.getWidth()), Math.floor(na.getHeight())), X > 0 && (c(THREE.NormalBlending), b(1), e("rgba(" + Math.floor(255 * W.r) + "," + Math.floor(255 * W.g) + "," + Math.floor(255 * W.b) + "," + X + ")"), V.fillRect(Math.floor(na.getX()), Math.floor(na.getY()), Math.floor(na.getWidth()), Math.floor(na.getHeight()))), na.empty())
		}, this.render = function(a, i) {
			function j(a) {
				var b, c, d, e;
				for (qa.setRGB(0, 0, 0), ra.setRGB(0, 0, 0), sa.setRGB(0, 0, 0), b = 0, c = a.length; c > b; b++) d = a[b], e = d.color, d instanceof THREE.AmbientLight ? (qa.r += e.r, qa.g += e.g, qa.b += e.b) : d instanceof THREE.DirectionalLight ? (ra.r += e.r, ra.g += e.g, ra.b += e.b) : d instanceof THREE.PointLight && (sa.r += e.r, sa.g += e.g, sa.b += e.b)
			}
			function U(a, b, c, d) {
				var e, f, g, h, i, j;
				for (e = 0, f = a.length; f > e; e++) g = a[e], h = g.color, g instanceof THREE.DirectionalLight ? (i = g.matrixWorld.getPosition(), j = c.dot(i), 0 >= j || (j *= g.intensity, d.r += h.r * j, d.g += h.g * j, d.b += h.b * j)) : g instanceof THREE.PointLight && (i = g.matrixWorld.getPosition(), j = c.dot(ta.sub(i, b).normalize()), 0 >= j || (j *= 0 == g.distance ? 1 : 1 - Math.min(b.distanceTo(i) / g.distance, 1), 0 != j && (j *= g.intensity, d.r += h.r * j, d.g += h.g * j, d.b += h.b * j)))
			}
			function W(a, f, g) {
				b(g.opacity), c(g.blending);
				var h, i, j, m, n, o;
				g instanceof THREE.ParticleBasicMaterial ? g.map && (m = g.map.image, n = m.width >> 1, o = m.height >> 1, g = f.scale.x * k, j = f.scale.y * l, h = g * n, i = j * o, oa.set(a.x - h, a.y - i, a.x + h, a.y + i), ma.intersects(oa) && (V.save(), V.translate(a.x, a.y), V.rotate(-f.rotation), V.scale(g, -j), V.translate(-n, -o), V.drawImage(m, 0, 0), V.restore())) : g instanceof THREE.ParticleCanvasMaterial && (h = f.scale.x * k, i = f.scale.y * l, oa.set(a.x - h, a.y - i, a.x + h, a.y + i), ma.intersects(oa) && (d(g.color.getContextStyle()), e(g.color.getContextStyle()), V.save(), V.translate(a.x, a.y), V.rotate(-f.rotation), V.scale(h, i), g.program(V), V.restore()))
			}
			function X(a, e, f, g) {
				b(g.opacity), c(g.blending), V.beginPath(), V.moveTo(a.positionScreen.x, a.positionScreen.y), V.lineTo(e.positionScreen.x, e.positionScreen.y), V.closePath(), g instanceof THREE.LineBasicMaterial && (a = g.linewidth, aa != a && (V.lineWidth = aa = a), a = g.linecap, ba != a && (V.lineCap = ba = a), a = g.linejoin, ca != a && (V.lineJoin = ca = a), d(g.color.getContextStyle()), V.stroke(), oa.inflate(2 * g.linewidth))
			}
			function Y(a, d, e, f, g, j, k, l) {
				S.info.render.vertices += 3, S.info.render.faces++, b(l.opacity), c(l.blending), q = a.positionScreen.x, r = a.positionScreen.y, s = d.positionScreen.x, t = d.positionScreen.y, u = e.positionScreen.x, v = e.positionScreen.y, $(q, r, s, t, u, v), l instanceof THREE.MeshBasicMaterial ? l.map ? l.map.mapping instanceof THREE.UVMapping && (F = k.uvs[0], wa(q, r, s, t, u, v, F[f].u, F[f].v, F[g].u, F[g].v, F[j].u, F[j].v, l.map)) : l.envMap ? l.envMap.mapping instanceof THREE.SphericalReflectionMapping && (a = i.matrixWorldInverse, ta.copy(k.vertexNormalsWorld[f]), G = .5 * (ta.x * a.n11 + ta.y * a.n12 + ta.z * a.n13) + .5, H = .5 * -(ta.x * a.n21 + ta.y * a.n22 + ta.z * a.n23) + .5, ta.copy(k.vertexNormalsWorld[g]), I = .5 * (ta.x * a.n11 + ta.y * a.n12 + ta.z * a.n13) + .5, J = .5 * -(ta.x * a.n21 + ta.y * a.n22 + ta.z * a.n23) + .5, ta.copy(k.vertexNormalsWorld[j]), K = .5 * (ta.x * a.n11 + ta.y * a.n12 + ta.z * a.n13) + .5, L = .5 * -(ta.x * a.n21 + ta.y * a.n22 + ta.z * a.n23) + .5, wa(q, r, s, t, u, v, G, H, I, J, K, L, l.envMap)) : l.wireframe ? ua(l.color, l.wireframeLinewidth, l.wireframeLinecap, l.wireframeLinejoin) : va(l.color) : l instanceof THREE.MeshLambertMaterial ? (l.map && !l.wireframe && (l.map.mapping instanceof THREE.UVMapping && (F = k.uvs[0], wa(q, r, s, t, u, v, F[f].u, F[f].v, F[g].u, F[g].v, F[j].u, F[j].v, l.map)), c(THREE.SubtractiveBlending)), pa ? l.wireframe || l.shading != THREE.SmoothShading || 3 != k.vertexNormalsWorld.length ? (fa.r = qa.r, fa.g = qa.g, fa.b = qa.b, U(h, k.centroidWorld, k.normalWorld, fa), fa.r = Math.max(0, Math.min(l.color.r * fa.r, 1)), fa.g = Math.max(0, Math.min(l.color.g * fa.g, 1)), fa.b = Math.max(0, Math.min(l.color.b * fa.b, 1)), l.wireframe ? ua(fa, l.wireframeLinewidth, l.wireframeLinecap, l.wireframeLinejoin) : va(fa)) : (ga.r = ha.r = ia.r = qa.r, ga.g = ha.g = ia.g = qa.g, ga.b = ha.b = ia.b = qa.b, U(h, k.v1.positionWorld, k.vertexNormalsWorld[0], ga), U(h, k.v2.positionWorld, k.vertexNormalsWorld[1], ha), U(h, k.v3.positionWorld, k.vertexNormalsWorld[2], ia), ga.r = Math.max(0, Math.min(l.color.r * ga.r, 1)), ga.g = Math.max(0, Math.min(l.color.g * ga.g, 1)), ga.b = Math.max(0, Math.min(l.color.b * ga.b, 1)), ha.r = Math.max(0, Math.min(l.color.r * ha.r, 1)), ha.g = Math.max(0, Math.min(l.color.g * ha.g, 1)), ha.b = Math.max(0, Math.min(l.color.b * ha.b, 1)), ia.r = Math.max(0, Math.min(l.color.r * ia.r, 1)), ia.g = Math.max(0, Math.min(l.color.g * ia.g, 1)), ia.b = Math.max(0, Math.min(l.color.b * ia.b, 1)), ja.r = .5 * (ha.r + ia.r), ja.g = .5 * (ha.g + ia.g), ja.b = .5 * (ha.b + ia.b), E = ya(ga, ha, ia, ja), xa(q, r, s, t, u, v, 0, 0, 1, 0, 0, 1, E)) : l.wireframe ? ua(l.color, l.wireframeLinewidth, l.wireframeLinecap, l.wireframeLinejoin) : va(l.color)) : l instanceof THREE.MeshDepthMaterial ? (C = i.near, D = i.far, ga.r = ga.g = ga.b = 1 - za(a.positionScreen.z, C, D), ha.r = ha.g = ha.b = 1 - za(d.positionScreen.z, C, D), ia.r = ia.g = ia.b = 1 - za(e.positionScreen.z, C, D), ja.r = .5 * (ha.r + ia.r), ja.g = .5 * (ha.g + ia.g), ja.b = .5 * (ha.b + ia.b), E = ya(ga, ha, ia, ja), xa(q, r, s, t, u, v, 0, 0, 1, 0, 0, 1, E)) : l instanceof THREE.MeshNormalMaterial && (fa.r = Aa(k.normalWorld.x), fa.g = Aa(k.normalWorld.y), fa.b = Aa(k.normalWorld.z), l.wireframe ? ua(fa, l.wireframeLinewidth, l.wireframeLinecap, l.wireframeLinejoin) : va(fa))
			}
			function Z(a, d, e, f, g, j, k, l, m) {
				S.info.render.vertices += 4, S.info.render.faces++, b(l.opacity), c(l.blending), l.map || l.envMap ? (Y(a, d, f, 0, 1, 3, k, l, m), Y(g, e, j, 1, 2, 3, k, l, m)) : (q = a.positionScreen.x, r = a.positionScreen.y, s = d.positionScreen.x, t = d.positionScreen.y, u = e.positionScreen.x, v = e.positionScreen.y, w = f.positionScreen.x, x = f.positionScreen.y, y = g.positionScreen.x, z = g.positionScreen.y, A = j.positionScreen.x, B = j.positionScreen.y, l instanceof THREE.MeshBasicMaterial ? (_(q, r, s, t, u, v, w, x), l.wireframe ? ua(l.color, l.wireframeLinewidth, l.wireframeLinecap, l.wireframeLinejoin) : va(l.color)) : l instanceof THREE.MeshLambertMaterial ? pa ? l.wireframe || l.shading != THREE.SmoothShading || 4 != k.vertexNormalsWorld.length ? (fa.r = qa.r, fa.g = qa.g, fa.b = qa.b, U(h, k.centroidWorld, k.normalWorld, fa), fa.r = Math.max(0, Math.min(l.color.r * fa.r, 1)), fa.g = Math.max(0, Math.min(l.color.g * fa.g, 1)), fa.b = Math.max(0, Math.min(l.color.b * fa.b, 1)), _(q, r, s, t, u, v, w, x), l.wireframe ? ua(fa, l.wireframeLinewidth, l.wireframeLinecap, l.wireframeLinejoin) : va(fa)) : (ga.r = ha.r = ia.r = ja.r = qa.r, ga.g = ha.g = ia.g = ja.g = qa.g, ga.b = ha.b = ia.b = ja.b = qa.b, U(h, k.v1.positionWorld, k.vertexNormalsWorld[0], ga), U(h, k.v2.positionWorld, k.vertexNormalsWorld[1], ha), U(h, k.v4.positionWorld, k.vertexNormalsWorld[3], ia), U(h, k.v3.positionWorld, k.vertexNormalsWorld[2], ja), ga.r = Math.max(0, Math.min(l.color.r * ga.r, 1)), ga.g = Math.max(0, Math.min(l.color.g * ga.g, 1)), ga.b = Math.max(0, Math.min(l.color.b * ga.b, 1)), ha.r = Math.max(0, Math.min(l.color.r * ha.r, 1)), ha.g = Math.max(0, Math.min(l.color.g * ha.g, 1)), ha.b = Math.max(0, Math.min(l.color.b * ha.b, 1)), ia.r = Math.max(0, Math.min(l.color.r * ia.r, 1)), ia.g = Math.max(0, Math.min(l.color.g * ia.g, 1)), ia.b = Math.max(0, Math.min(l.color.b * ia.b, 1)), ja.r = Math.max(0, Math.min(l.color.r * ja.r, 1)), ja.g = Math.max(0, Math.min(l.color.g * ja.g, 1)), ja.b = Math.max(0, Math.min(l.color.b * ja.b, 1)), E = ya(ga, ha, ia, ja), $(q, r, s, t, w, x), xa(q, r, s, t, w, x, 0, 0, 1, 0, 0, 1, E), $(y, z, u, v, A, B), xa(y, z, u, v, A, B, 1, 0, 1, 1, 0, 1, E)) : (_(q, r, s, t, u, v, w, x), l.wireframe ? ua(l.color, l.wireframeLinewidth, l.wireframeLinecap, l.wireframeLinejoin) : va(l.color)) : l instanceof THREE.MeshNormalMaterial ? (fa.r = Aa(k.normalWorld.x), fa.g = Aa(k.normalWorld.y), fa.b = Aa(k.normalWorld.z), _(q, r, s, t, u, v, w, x), l.wireframe ? ua(fa, l.wireframeLinewidth, l.wireframeLinecap, l.wireframeLinejoin) : va(fa)) : l instanceof THREE.MeshDepthMaterial && (C = i.near, D = i.far, ga.r = ga.g = ga.b = 1 - za(a.positionScreen.z, C, D), ha.r = ha.g = ha.b = 1 - za(d.positionScreen.z, C, D), ia.r = ia.g = ia.b = 1 - za(f.positionScreen.z, C, D), ja.r = ja.g = ja.b = 1 - za(e.positionScreen.z, C, D), E = ya(ga, ha, ia, ja), $(q, r, s, t, w, x), xa(q, r, s, t, w, x, 0, 0, 1, 0, 0, 1, E), $(y, z, u, v, A, B), xa(y, z, u, v, A, B, 1, 0, 1, 1, 0, 1, E)))
			}
			function $(a, b, c, d, e, f) {
				V.beginPath(), V.moveTo(a, b), V.lineTo(c, d), V.lineTo(e, f), V.lineTo(a, b), V.closePath()
			}
			function _(a, b, c, d, e, f, g, h) {
				V.beginPath(), V.moveTo(a, b), V.lineTo(c, d), V.lineTo(e, f), V.lineTo(g, h), V.lineTo(a, b), V.closePath()
			}
			function ua(a, b, c, e) {
				aa != b && (V.lineWidth = aa = b), ba != c && (V.lineCap = ba = c), ca != e && (V.lineJoin = ca = e), d(a.getContextStyle()), V.stroke(), oa.inflate(2 * b)
			}
			function va(a) {
				e(a.getContextStyle()), V.fill()
			}
			function wa(a, b, c, d, f, g, h, i, j, k, l, m, n) {
				if (0 != n.image.width) {
					if (1 == n.needsUpdate || void 0 == ka[n.id]) {
						var o = n.wrapS == THREE.RepeatWrapping,
							p = n.wrapT == THREE.RepeatWrapping;
						ka[n.id] = V.createPattern(n.image, o && p ? "repeat" : o && !p ? "repeat-x" : !o && p ? "repeat-y" : "no-repeat"), n.needsUpdate = !1
					}
					e(ka[n.id]);
					var o = n.offset.x / n.repeat.x,
						p = n.offset.y / n.repeat.y,
						q = n.image.width * n.repeat.x,
						r = n.image.height * n.repeat.y,
						h = (h + o) * q,
						i = (i + p) * r,
						j = (j + o) * q,
						k = (k + p) * r,
						l = (l + o) * q,
						m = (m + p) * r;
					c -= a, d -= b, f -= a, g -= b, j -= h, k -= i, l -= h, m -= i, o = j * m - l * k, 0 == o ? (void 0 == la[n.id] && (b = document.createElement("canvas"), b.width = n.image.width, b.height = n.image.height, a = b.getContext("2d"), a.drawImage(n.image, 0, 0), la[n.id] = a.getImageData(0, 0, n.image.width, n.image.height).data, delete b), b = la[n.id], h = 4 * (Math.floor(h) + Math.floor(i) * n.image.width), fa.setRGB(b[h] / 255, b[h + 1] / 255, b[h + 2] / 255), va(fa)) : (o = 1 / o, n = (m * c - k * f) * o, k = (m * d - k * g) * o, c = (j * f - l * c) * o, d = (j * g - l * d) * o, a = a - n * h - c * i, h = b - k * h - d * i, V.save(), V.transform(n, k, c, d, a, h), V.fill(), V.restore())
				}
			}
			function xa(a, b, c, d, e, f, g, h, i, j, k, l, m) {
				var n, o;
				n = m.width - 1, o = m.height - 1, g *= n, h *= o, i *= n, j *= o, k *= n, l *= o, c -= a, d -= b, e -= a, f -= b, i -= g, j -= h, k -= g, l -= h, o = 1 / (i * l - k * j), n = (l * c - j * e) * o, j = (l * d - j * f) * o, c = (i * e - k * c) * o, d = (i * f - k * d) * o, a = a - n * g - c * h, b = b - j * g - d * h, V.save(), V.transform(n, j, c, d, a, b), V.clip(), V.drawImage(m, 0, 0), V.restore()
			}
			function ya(a, b, c, d) {
				var e = ~~ (255 * a.r),
					f = ~~ (255 * a.g),
					a = ~~ (255 * a.b),
					g = ~~ (255 * b.r),
					h = ~~ (255 * b.g),
					b = ~~ (255 * b.b),
					i = ~~ (255 * c.r),
					j = ~~ (255 * c.g),
					c = ~~ (255 * c.b),
					k = ~~ (255 * d.r),
					l = ~~ (255 * d.g),
					d = ~~ (255 * d.b);
				return P[0] = 0 > e ? 0 : e > 255 ? 255 : e, P[1] = 0 > f ? 0 : f > 255 ? 255 : f, P[2] = 0 > a ? 0 : a > 255 ? 255 : a, P[4] = 0 > g ? 0 : g > 255 ? 255 : g, P[5] = 0 > h ? 0 : h > 255 ? 255 : h, P[6] = 0 > b ? 0 : b > 255 ? 255 : b, P[8] = 0 > i ? 0 : i > 255 ? 255 : i, P[9] = 0 > j ? 0 : j > 255 ? 255 : j, P[10] = 0 > c ? 0 : c > 255 ? 255 : c, P[12] = 0 > k ? 0 : k > 255 ? 255 : k, P[13] = 0 > l ? 0 : l > 255 ? 255 : l, P[14] = 0 > d ? 0 : d > 255 ? 255 : d, N.putImageData(O, 0, 0), R.drawImage(M, 0, 0), Q
			}
			function za(a, b, c) {
				return a = (a - b) / (c - b), a * a * (3 - 2 * a)
			}
			function Aa(a) {
				return a = .5 * (a + 1), 0 > a ? 0 : a > 1 ? 1 : a
			}
			function Ba(a, b) {
				var c = b.x - a.x,
					d = b.y - a.y,
					e = c * c + d * d;
				0 != e && (e = 1 / Math.sqrt(e), c *= e, d *= e, b.x += c, b.y += d, a.x -= c, a.y -= d)
			}
			var Ca, Da, Ea, Fa;
			for (this.autoClear ? this.clear() : V.setTransform(1, 0, 0, -1, k, l), S.info.render.vertices = 0, S.info.render.faces = 0, f = T.projectScene(a, i, this.sortElements), g = f.elements, h = f.lights, (pa = h.length > 0) && j(h), Ca = 0, Da = g.length; Da > Ca; Ca++) Ea = g[Ca], Fa = Ea.material, Fa = Fa instanceof THREE.MeshFaceMaterial ? Ea.faceMaterial : Fa, null == Fa || 0 == Fa.opacity || (oa.empty(), Ea instanceof THREE.RenderableParticle ? (m = Ea, m.x *= k, m.y *= l, W(m, Ea, Fa, a)) : Ea instanceof THREE.RenderableLine ? (m = Ea.v1, n = Ea.v2, m.positionScreen.x *= k, m.positionScreen.y *= l, n.positionScreen.x *= k, n.positionScreen.y *= l, oa.addPoint(m.positionScreen.x, m.positionScreen.y), oa.addPoint(n.positionScreen.x, n.positionScreen.y), ma.intersects(oa) && X(m, n, Ea, Fa, a)) : Ea instanceof THREE.RenderableFace3 ? (m = Ea.v1, n = Ea.v2, o = Ea.v3, m.positionScreen.x *= k, m.positionScreen.y *= l, n.positionScreen.x *= k, n.positionScreen.y *= l, o.positionScreen.x *= k, o.positionScreen.y *= l, Fa.overdraw && (Ba(m.positionScreen, n.positionScreen), Ba(n.positionScreen, o.positionScreen), Ba(o.positionScreen, m.positionScreen)), oa.add3Points(m.positionScreen.x, m.positionScreen.y, n.positionScreen.x, n.positionScreen.y, o.positionScreen.x, o.positionScreen.y), ma.intersects(oa) && Y(m, n, o, 0, 1, 2, Ea, Fa, a)) : Ea instanceof THREE.RenderableFace4 && (m = Ea.v1, n = Ea.v2, o = Ea.v3, p = Ea.v4, m.positionScreen.x *= k, m.positionScreen.y *= l, n.positionScreen.x *= k, n.positionScreen.y *= l, o.positionScreen.x *= k, o.positionScreen.y *= l, p.positionScreen.x *= k, p.positionScreen.y *= l, da.positionScreen.copy(n.positionScreen), ea.positionScreen.copy(p.positionScreen), Fa.overdraw && (Ba(m.positionScreen, n.positionScreen), Ba(n.positionScreen, p.positionScreen), Ba(p.positionScreen, m.positionScreen), Ba(o.positionScreen, da.positionScreen), Ba(o.positionScreen, ea.positionScreen)), oa.addPoint(m.positionScreen.x, m.positionScreen.y), oa.addPoint(n.positionScreen.x, n.positionScreen.y), oa.addPoint(o.positionScreen.x, o.positionScreen.y), oa.addPoint(p.positionScreen.x, p.positionScreen.y), ma.intersects(oa) && Z(m, n, o, p, da, ea, Ea, Fa, a)), na.addRectangle(oa));
			V.setTransform(1, 0, 0, 1, 0, 0)
		}
	}, THREE.RenderableVertex = function() {
		this.positionWorld = new THREE.Vector3, this.positionScreen = new THREE.Vector4, this.visible = !0
	}, THREE.RenderableVertex.prototype.copy = function(a) {
		this.positionWorld.copy(a.positionWorld), this.positionScreen.copy(a.positionScreen)
	}, THREE.RenderableFace3 = function() {
		this.v1 = new THREE.RenderableVertex, this.v2 = new THREE.RenderableVertex, this.v3 = new THREE.RenderableVertex, this.centroidWorld = new THREE.Vector3, this.centroidScreen = new THREE.Vector3, this.normalWorld = new THREE.Vector3, this.vertexNormalsWorld = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3], this.faceMaterial = this.material = null, this.uvs = [
			[]
		], this.z = null
	}, THREE.RenderableFace4 = function() {
		this.v1 = new THREE.RenderableVertex, this.v2 = new THREE.RenderableVertex, this.v3 = new THREE.RenderableVertex, this.v4 = new THREE.RenderableVertex, this.centroidWorld = new THREE.Vector3, this.centroidScreen = new THREE.Vector3, this.normalWorld = new THREE.Vector3, this.vertexNormalsWorld = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3], this.faceMaterial = this.material = null, this.uvs = [
			[]
		], this.z = null
	}, THREE.RenderableObject = function() {
		this.z = this.object = null
	}, THREE.RenderableParticle = function() {
		this.rotation = this.z = this.y = this.x = null, this.scale = new THREE.Vector2, this.material = null
	}, THREE.RenderableLine = function() {
		this.z = null, this.v1 = new THREE.RenderableVertex, this.v2 = new THREE.RenderableVertex, this.material = null
	}, Particle3D = function(a) {
		THREE.Particle.call(this, a), this.velocity = new THREE.Vector3(0, -8, 0), this.velocity.rotateX(randomRange(-45, 45)), this.velocity.rotateY(randomRange(0, 360)), this.gravity = new THREE.Vector3(0, 0, 0), this.drag = 1
	}, Particle3D.prototype = new THREE.Particle, Particle3D.prototype.constructor = Particle3D, Particle3D.prototype.updatePhysics = function() {
		this.velocity.multiplyScalar(this.drag), this.velocity.addSelf(this.gravity), this.position.addSelf(this.velocity)
	};
	var TO_RADIANS = Math.PI / 180;
	THREE.Vector3.prototype.rotateY = function(a) {
		cosRY = Math.cos(a * TO_RADIANS), sinRY = Math.sin(a * TO_RADIANS);
		var b = this.z,
			c = this.x;
		this.x = c * cosRY + b * sinRY, this.z = c * -sinRY + b * cosRY
	}, THREE.Vector3.prototype.rotateX = function(a) {
		cosRY = Math.cos(a * TO_RADIANS), sinRY = Math.sin(a * TO_RADIANS);
		var b = this.z,
			c = this.y;
		this.y = c * cosRY + b * sinRY, this.z = c * -sinRY + b * cosRY
	}, THREE.Vector3.prototype.rotateZ = function(a) {
		cosRY = Math.cos(a * TO_RADIANS), sinRY = Math.sin(a * TO_RADIANS);
		var b = this.x,
			c = this.y;
		this.y = c * cosRY + b * sinRY, this.x = c * -sinRY + b * cosRY
	}, function(a) {
		function b(a, b, c, d) {
			var e = {},
				f = a / b,
				g = c / d;
			return f > g ? (e.width = c, e.height = c / f) : (e.height = d, e.width = d * f), e
		}
		function c(a, b) {
			"view" == i.mode && b.properties.url && $(a).click(function(a) {
				var c = b.properties.url;
				isNaN(c) ? window.open(c) : eqxiu.pageScroll(c)
			})
		}
		function d(a) {
			$(a).bind("touchstart mousedown", function(a) {
				a.stopPropagation()
			})
		}
		function e(a) {
			a.focus(function(a) {
				eqxiu.pauseAutoFlip()
			}).blur(function(a) {
				$(document).trigger("startAutoFlip")
			})
		}
		function f(a) {
			for (var b = $(a).find("a[data]"), c = 0; c < b.length; c++) if (b[c] && "view" == i.mode) {
				$(b[c]).css("cursor", "pointer");
				var d = $(b[c]).attr("data");
				!
				function(a) {
					b[c].removeAttribute("href"), $(b[c]).click(function(b) {
						eqxiu.pageScroll(a)
					})
				}(d)
			}
		}
		function g(a, b) {
			if (b.trigger) {
				var c = $(a);
				j && clearTimeout(j), b.trigger.sends && b.trigger.sends.length && $.each(b.trigger.sends, function(a, b) {
					c.bind(utilTrigger.getSendType(b.type).name, function() {
						j = setTimeout(function() {
							$.each(b.handles, function(a, b) {
								var c = utilTrigger.getHandleType(b.type).name;
								$.each(b.ids, function(a, b) {
									var d;
									d = $("#inside_" + b, ".phone-view").length ? $("#inside_" + b, ".phone-view") : $("#inside_" + b), d.trigger(c)
								})
							})
						}, 1e3 * b.delay)
					})
				})
			}
		}
		function h(a, b) {
			if (b.sound) {
				var c = $(a),
					d = $("#media").get(0);
				0 == b.sound.src.indexOf("http://") ? b.sound.src = b.sound.src : b.sound.src = PREFIX_FILE_HOST + b.sound.src, utilSound.addAudio(a, b.sound.src), c.click(function() {
					utilSound.play(a, function() {
						d && d.play()
					}, function() {
						d && d.pause()
					})
				})
			}
		}
		var i = a.templateParser("jsonParser", function() {

			function a(a) {
				return function(b, c) {
					a[b] = c
				}
			}
			function b(a, b) {
				try {
					var c = l[("" + a.type).charAt(0)](a)
				} catch (d) {
					return
				}
				if (c) {
					//拼接零件容器li,c代表要生成的零件,a表示c的样式数据，b表示edit
					var e = $('<li comp-drag comp-rotate class="comp-resize comp-rotate inside" id="inside_' + a.id + '" num="' + a.num + '" ctype="' + a.type + '"></li>');
					if (3 != ("" + a.type).charAt(0) && 1 != ("" + a.type).charAt(0) && e.attr("comp-resize", ""), "p" == ("" + a.type).charAt(0) && e.removeAttr("comp-rotate"), 1 == ("" + a.type).charAt(0) && e.removeAttr("comp-drag"), 2 == ("" + a.type).charAt(0) && e.addClass("wsite-text"), "x" == ("" + a.type).charAt(0) && e.addClass("show-text"), 4 == ("" + a.type).charAt(0) && (a.properties.imgStyle && $(c).css(a.properties.imgStyle), e.addClass("wsite-image")), "n" == ("" + a.type).charAt(0) && e.addClass("wsite-image"), "h" == ("" + a.type).charAt(0) && e.addClass("wsite-shape"), 5 == ("" + a.type).charAt(0) && e.addClass("wsite-input"), 6 == ("" + a.type).charAt(0) && e.addClass("wsite-button"), 8 == ("" + a.type).charAt(0) && e.addClass("wsite-button"), "v" == ("" + a.type).charAt(0) && e.addClass("wsite-video"),
						e.mouseenter(function() {
						$(this).addClass("inside-hover")
					}), e.mouseleave(function() {
						$(this).removeClass("inside-hover")
					}), "edit" == i.mode || "x" != ("" + a.type).charAt(0)) {
						var f = $('<div class="element-box">').append($('<div class="element-box-contents">').append(c));
						e.append(f), 5 != ("" + a.type).charAt(0) && 6 != ("" + a.type).charAt(0) && "r" != a.type && "c" != a.type && "a" != a.type && "8" != a.type && "l" != a.type && "s" != a.type && "i" != a.type && "h" != a.type || "edit" != b || $(c).before($('<div class="element" style="position: absolute; height: 100%; width: 100%;z-index: 1;">'))
					}
					if (a.css) {
						var g = 320 - parseInt(a.css.left);
						if (e.css({
							width: g
						}), e.css({
							width: a.css.width,
							height: a.css.height,
							left: a.css.left,
							top: a.css.top,
							zIndex: a.css.zIndex,
							bottom: a.css.bottom,
							transform: a.css.transform
						}), (0 === a.css.boxShadowSize || "0" == a.css.boxShadowSize) && (a.css.boxShadow = "rgba(0,0,0,0) 0 0 0"), "edit" != i.mode && "x" == ("" + a.type).charAt(0)) return e.append(c), e.find(".element-box").css({
							borderStyle: a.css.borderStyle,
							borderWidth: a.css.borderWidth,
							borderColor: a.css.borderColor,
							borderTopLeftRadius: a.css.borderTopLeftRadius,
							borderTopRightRadius: a.css.borderTopRightRadius,
							borderBottomRightRadius: a.css.borderBottomRightRadius,
							borderBottomLeftRadius: a.css.borderBottomLeftRadius,
							boxShadow: a.css.boxShadow,
							backgroundColor: a.css.backgroundColor,
							opacity: a.css.opacity,
							width: "100%",
							height: "100%",
							overflow: "hidden"
						}), e.find("img").css({
							width: "100%"
						}), e;
						isAndroid() && isWeixin() && 4 == a.type && "0px" != a.css.borderRadius && 0 == a.css.borderWidth && a.properties.anim && (a.css.borderWidth = 1, a.css.borderColor = "rgba(0,0,0,0)"), f.css(a.css).css({
							width: "100%",
							height: "100%",
							transform: "none"
						}), f.children(".element-box-contents").css({
							width: "100%",
							height: "100%"
						}), 4 != ("" + a.type).charAt(0) && "n" != ("" + a.type).charAt(0) && "p" != ("" + a.type).charAt(0) && "h" != ("" + a.type).charAt(0) && $(c).css({
							width: a.css.width,
							height: a.css.height
						}), "h" == ("" + a.type).charAt(0) && ($(c).find("g").length ? $(c).find("g").attr("fill", a.css.color) : $(c).children().attr("fill", a.css.color), f.children(".element-box-contents").css("position", "relative"))
					}
					return e
				}
			}
			function c(a) {
				for (var b = 0; b < a.length - 1; b++) for (var c = b + 1; c < a.length; c++) if (parseInt(a[b].css.zIndex, 10) > parseInt(a[c].css.zIndex, 10)) {
					var d = a[b];
					a[b] = a[c], a[c] = d
				}
				for (var e = 0; e < a.length; e++) a[e].css.zIndex = e + 1 + "";
				return a
			}
			function d(a, d, e) {
				d = d.find(".edit_area");
				var f, i = a.elements;
				if (i) for (i = c(i), f = 0; f < i.length; f++) if (i[f].sceneId = a.sceneId, 3 == i[f].type) {
					var j = l[("" + i[f].type).charAt(0)](i[f], d);
					"edit" == e && m[("" + i[f].type).charAt(0)] && m[("" + i[f].type).charAt(0)](j, i[f])
				} else {
					var k = b(i[f], e);
					if (!k) continue;
					d.append(k);
					for (var p = 0; p < o.length; p++) o[p](k, i[f], e);
					n[("" + i[f].type).charAt(0)] && (n[("" + i[f].type).charAt(0)](k, i[f]), "edit" != e && (g(k, i[f]), h(k, i[f]))), "edit" == e && m[("" + i[f].type).charAt(0)] && m[("" + i[f].type).charAt(0)](k, i[f])
				}
			}
			function e() {
				return m
			}
			function f() {
				return l
			}
			function j(a) {
				o.push(a)
			}
			function k() {
				return o
			}
			var l = {},
				m = {},
				n = {},
				o = [],
				p = containerWidth = 320,
				q = containerHeight = 486,
				r = 1,
				s = 1,
				t = {
					getComponents: f,
					getEventHandlers: e,
					addComponent: a(l),
					bindEditEvent: a(m),
					bindAfterRenderEvent: a(n),
					addInterceptor: j,
					getInterceptors: k,
					wrapComp: b,
					mode: "view",
					parse: function(a) {
						//拼接手机编辑界面以及ul容器
						var b = $('<div class="edit_wrapper" data-scene-id="' + a.def.sceneId + '"><ul eqx-edit-destroy id="edit_area' + a.def.id + '" comp-droppable paste-element class="edit_area weebly-content-area weebly-area-active"></div>'),
							c = this.mode = a.mode;
						this.def = a.def, "view" == c && tplCount++;
						var e = $(a.appendTo);
						return containerWidth = e.width(), containerHeight = e.height(), r = p / containerWidth, s = q / containerHeight, d(a.def, b.appendTo($(a.appendTo)), c)
					}
				};
			return t
		});
		i.addInterceptor(function(a, b, c) {
			eqxCommon.animation(a, b, c)
		}), i.addComponent("1", function(a) {
			var b = document.createElement("div");
			if (b.id = a.id, b.setAttribute("class", "element comp_title"), a.content && (b.textContent = a.content), a.css) {
				var c, d = a.css;
				for (c in d) b.style[c] = d[c]
			}
			if (a.properties.labels) for (var e = a.properties.labels, f = 0; f < e.length; f++) $('<a class = "label_content" style = "display: inline-block;">').appendTo($(b)).html(e[f].title).css(e[f].color).css("width", 100 / e.length + "%");
			return b
		}), i.addComponent("2", function(a) {
			var b = document.createElement("div");
			return b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_paragraph editable-text"), a.content && (b.innerHTML = a.content), b.style.cursor = "default", b
		}), i.addComponent("x", function(a) {
			var b;
			if (!mobilecheck() && window.top == window && $(".create_left").get(0) && (i.mode = "edit"), "edit" == i.mode) b = document.createElement("div"), b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_paragraph editable-text"), a.content && (b.innerHTML = a.content), b.style.cursor = "default";
			else var b = '<div class="element-box"><img src="' + a.properties.dataUrl + '"></div>';
			return b
		}), i.addComponent("j", function(a) { //图表
			var b;
			if (!mobilecheck() && window.top == window && $(".create_left").get(0) && (i.mode = "edit"), "edit" == i.mode) b = document.createElement("div"), b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_paragraph editable-text"), a.content && (b.innerHTML = a.content), b.style.cursor = "default";
			else var b = '<div class="element-box"><img src="' + a.properties.dataUrl + '"></div>';
			return b
		}), i.addComponent("3", function(a, b) {
			var c, d = document.createElement("div");
			"edit" == i.mode ? (c = b ? b.parent(".edit_wrapper") : $("#nr .edit_wrapper"), d.setAttribute("class", "wrapper-background"), d.setAttribute("id", a.id)) : "view" == i.mode && (c = b ? b.parent(".edit_wrapper") : $("#edit_area" + i.def.id).parent(".edit_wrapper"), d.setAttribute("id", "wrapper-background" + i.def.id)), $(d).prependTo(c).css({
				width: "100%",
				height: "100%",
				// transform:"rotate(90deg)"
			});
			var e, f = new Image;
			return a.properties.imgSrc ? (e = a.properties.imgSrc, /^http.*!/.test(e) ? (f.src = e, d.style.backgroundImage = "url(" + e + ")") : (f.src = PREFIX_FILE_HOST + "/" + e, d.style.backgroundImage = "url(" + PREFIX_FILE_HOST + "/" + e + ")"), d.style.backgroundOrigin = "element content-box", d.style.backgroundSize = "cover", d.style.backgroundPosition = "50% 50%", a.effect && ("scaleUp" == a.effect.type ? $(d).css({
				animation: "scaleUp 7s ease 1s",
				"animation-fill-mode": "both"
			}) : "scaleDown" == a.effect.type && $(d).css({
				animation: "scaleDown 7s ease 1s",
				"animation-fill-mode": "both"
			}))) : a.properties.bgColor && (d.style.backgroundColor = a.properties.bgColor), d
		}), i.addComponent("4", function(a) {
			//添加图片到canvas
			var b = document.createElement("img");
			return b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_image editable-image"), /^http.*/.test(a.properties.src) ? b.src = a.properties.src : b.src = PREFIX_FILE_HOST + a.properties.src, b
		}),i.addComponent("m", function(a) {
			//百度地图
			a.properties.src = a.properties.type;
			var b = document.createElement("img");
			return b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_image editable-image"), b.src = a.properties.src, b
		}), i.addComponent("h", function(a) {
			var b, c;
			if (a.properties.type.indexOf("symbol") < 0) {
				var b = document.createElementNS(eqxiuSvg.NAMESPACE, "svg");
				return b.id = a.id, b.setAttribute("class", "element svg-element"), b.setAttribute("xmlns", eqxiuSvg.NAMESPACE), b.setAttribute("version", "1.1"), b.setAttribute("width", "100%"), b.setAttribute("height", "100%"), b.setAttribute("preserveAspectRatio", "none"), c = eqxiuSvg.ShapeFromType(a.properties.type), c.setAttribute("fill", "#555"), b.appendChild(c), s = eqxiuSvg.boundingBox(c), viewBox = [Math.round(s.x) || 0, Math.round(s.y) || 0, Math.round(s.width) || 32, Math.round(s.height) || 32].join(" "), b.setAttribute("viewBox", viewBox), b
			}
			return b = document.createElement("div"), c = eqxiuSvg.ShapeFromType(a.properties.type, 100, 100, a.id, a.css.color), b = '<svg id="' + a.id + '" class="element svg-element" ctype="' + a.type + '" xmlns="' + eqxiuSvg.NAMESPACE + '" version="1.1" width="100%" height="100%" preserveAspectRatio="xMidYMid" viewBox="' + a.properties.viewBox + '">' + c + "</svg>"
		}), i.addComponent("v", function(a) {
			var b = document.createElement("a");
			console.log(66);
			return b.setAttribute("class", "element video_area"), b.id = a.id, b.setAttribute("ctype", a.type), a.properties.src && b.setAttribute("videourl", a.properties.src), b
		}), i.addComponent("5", function(a) {
			var b = document.createElement("textarea");
			return b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_input editable-text"), b.setAttribute("maxlength", "300"), a.properties.required && b.setAttribute("required", a.properties.required), a.properties.placeholder && b.setAttribute("placeholder", a.properties.placeholder), b.setAttribute("name", "eq[f_" + a.id + "]"), b.style.width = "100%", b
		}), i.addComponent("r", function(a) {
			var b = $('<div class="element comp_radio editable-text" id="' + a.id + '"></div>');
			b.attr("ctype", a.type), b.attr("required", a.properties.required), b.attr("title", a.title), b.attr("name", "eq[f_" + a.id + "]");
			var c = $('<div class="radio-title">' + a.title + "</div>");
			a.properties.titleStyle && c.css(a.properties.titleStyle), b.append(c);
			var d = $('<div class="options"></div>'),
				e = JSON.parse(a.choices);
			return $.each(e.options, function(b, c) {
				var f = $('<div class="option-group"><label class="option-label" for="' + (a.id + "" + (b + 1)) + '"><input class="option" id="' + (a.id + "" + (b + 1)) + '" type="radio" name="eq[f_' + a.id + ']" value="' + c.id + '">' + c.label + "</label></div>");
				a.properties.optionStyle && b < e.options.length - 1 && f.css(a.properties.optionStyle), d.append(f)
			}), b.append(d), b.width("100%"), b.get(0)
		}), i.addComponent("c", function(a) {
			var b = $('<div class="element comp_radio editable-text" id="' + a.id + '"></div>');
			b.attr("ctype", a.type), b.attr("required", a.properties.required), b.attr("title", a.title), b.attr("name", "eq[f_" + a.id + "]");
			var c = $('<div class="radio-title">' + a.title + "(可多选)</div>");
			a.properties.titleStyle && c.css(a.properties.titleStyle), b.append(c);
			var d = $('<div class="options"></div>'),
				e = JSON.parse(a.choices);
			return $.each(e.options, function(b, c) {
				var f = $('<div class="option-group"><label class="option-label" for="' + (a.id + "" + (b + 1)) + '"><input class="option" id="' + (a.id + "" + (b + 1)) + '" type="checkbox" name="eq[f_' + a.id + ']" value="' + c.id + '">' + c.label + "</label></div>");
				a.properties.optionStyle && b < e.options.length - 1 && f.css(a.properties.optionStyle), d.append(f)
			}), b.append(d), b.width("100%"), b.get(0)
		}), i.addComponent("a", function(a) {
			var b = $('<div class="element comp_rating editable-text" id="' + a.id + '"></div>');
			b.attr("ctype", a.type), b.attr("required", a.properties.required), b.attr("title", a.title), b.attr("name", "eq[f_" + a.id + "]"), b.append($('<div class="rating-title">' + a.title + "</div>"));
			for (var c = $('<div class="rating-icons"></div>'), d = 0; 5 > d; d++) c.append($('<i class="' + a.properties.icon + "-line " + a.properties.size + '">').css("color", a.properties.color));
			return b.append(c), b.append($('<input type="hidden" name="eq[f_' + a.id + ']" value="">')), b.width("100%"), b.get(0)
		}), i.addComponent("p", function(a) {
			if (a.properties && a.properties.children) {
				var c = a.css.width,
					d = a.css.height,
					e = $('<div id="' + a.id + '" class="slider element" ctype="' + a.type + '"></div>');
				return a.properties.bgColor && e.css("backgroundColor", a.properties.bgColor), $.each(a.properties.children, function(a, f) {
					var g = b(f.width, f.height, c, d),
						h = $('<img src="' + PREFIX_FILE_HOST + f.src + '">');
					h.css({
						margin: (d - g.height) / 2 + "px " + (c - g.width) / 2 + "px",
						width: g.width,
						height: g.height
					}), e.append(h)
				}), utilPictures.deleteInterval(a.id), e.get(0)
			}
		}), i.addComponent("n", function(a) {
			if (a.properties && a.properties.pics.length) {
				var b = (a.css.width, a.css.height, $('<div id="' + a.id + '" class="random-event element comp_image editable-image" ctype="' + a.type + '"></div>'));
				return $.each(a.properties.pics, function(a, c) {
					var d = $('<img src="' + PREFIX_FILE_HOST + c.src + '">');
					d.css({
						width: "100%",
						height: "100%",
						display: "none"
					}), 0 === a && (d.css({
						display: "block"
					}), b.css({
						width: "100%",
						height: "100%"
					})), b.append(d)
				}), b.get(0)
			}
		}), i.addComponent("6", function(a) {
			var b = document.createElement("button");
			if (b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_button editable-text"), a.properties.title) {
				var c = a.properties.title.replace(/ /g, "&nbsp;");
				b.innerHTML = c
			}
			return b.style.width = "100%", b
		}), i.addComponent("8", function(a) {
			var b = document.createElement("a");
			b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_anchor editable-text");
			var c = null;
			return a.properties.imgSrc ? (c = $('<img style="width: 100%; height: 100%;" src="' + (PREFIX_FILE_HOST + a.properties.imgSrc) + '"></img>'), $(b).html(c), "view" == i.mode && $(b).attr("href", "tel:" + a.properties.number)) : a.properties.title && (c = a.properties.title.replace(/ /g, "&nbsp;"), $(b).html(c), "view" == i.mode && $(b).attr("href", "tel:" + a.properties.number)), b.style.cursor = "default", b.style.width = "100%", b
		}), i.addComponent("l", function(a) {
			var b = document.createElement("a");
			b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_anchor editable-text");
			var c = null;
			return a.properties.imgSrc ? (c = $('<img style="width: 100%; height: 100%;" src="' + (PREFIX_FILE_HOST + a.properties.imgSrc) + '"></img>'), $(b).html(c)) : a.properties.title && (c = a.properties.title.replace(/ /g, "&nbsp;"), $(b).html(c)), b.style.cursor = "default", b.style.width = "100%", b
		}), i.addComponent("s", function(a) {
			var b = document.createElement("a");
			b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_anchor editable-text");
			var c = null;
			return a.properties.imgSrc ? (c = $('<img style="width: 100%; height: 100%;" src="' + (PREFIX_FILE_HOST + a.properties.imgSrc) + '"></img>'), $(b).html(c)) : a.properties.title && (c = a.properties.title.replace(/ /g, "&nbsp;"), $(b).html(c)), b.style.cursor = "default", b.style.width = "100%", b
		}), i.addComponent("i", function(b) {
			var c = $('<div class="element comp_counter not-voted editable-text" id="' + b.id + '"></div>');
			c.attr("ctype", b.type), c.attr("name", "eq[f_" + b.id + "]"), c.addClass(b.properties.layout).addClass(b.properties.size);
			var d = $('<div class="counter-container"></div>');
			b.properties.imgSrc ? d.append($('<img class="counter-elem counter-icon" style="width: 115px; height: 115px; margin: 0 auto;" src="' + (PREFIX_FILE_HOST + b.properties.imgSrc) + '"></img>')) : d.append($('<i class="counter-elem counter-icon ' + b.properties.icon + '">').css("color", b.properties.color));
			var e = $('<span class="counter-elem counter-number">0</span>').css("color", b.properties.color);
			if (d.append(e), "view" == i.mode ? a.counterValues && a.counterValues.then(function(c) {
				var d = c.map[b.id] || 0;
				e.attr("data-counter-number", d);
				var f = a.fixedNum(d);
				e.text(f)
			}) : c.removeClass("not-voted"), c.width("100%"), "counter-tb" === b.properties.layout) {
				var f = 0;
				f = b.properties.imgSrc ? "counter-l" == b.properties.size ? 77 : "counter-m" == b.properties.size ? 71 : 66 : "counter-l" == b.properties.size ? 40 : "counter-m" == b.properties.size ? 30 : 20, d.css("margin-top", -f)
			}
			return "edit" != i.mode && setTimeout(function() {
				var a = {
					width: "auto",
					"min-width": b.css.width
				};
				c.css(a), c.parents("li.comp-resize").css(a)
			}, 100), c.append(d), b.css.lineHeight && c.css("line-height", b.css.lineHeight), c.get(0)
		}), i.addComponent("d", function(b) {
			var c = $('<div class="element comp_counter editable-text" id="' + b.id + '"></div>');
			c.attr("ctype", b.type), c.addClass(b.properties.layout).addClass(b.properties.size);
			var d = $('<div class="counter-container"></div>');
			d.append($('<i class="counter-elem counter-icon ' + b.properties.icon + '">').css("color", b.properties.color));
			var e = $('<span class="counter-elem counter-number">0</span>').css("color", b.properties.color);
			if (d.append(e), "view" == i.mode && a.showCount && a.showCount.then(function(b) {
				var c = a.fixedNum(b),
					d = c || 0;
				e.text(d)
			}), c.width("100%"), "counter-tb" === b.properties.layout) {
				var f = 0;
				f = "counter-l" == b.properties.size ? 40 : "counter-m" == b.properties.size ? 30 : 20, d.css("margin-top", -f)
			}
			return c.append(d), b.css.lineHeight && c.css("line-height", b.css.lineHeight), c.get(0)
		}), i.addComponent("7", function(a) {
			var b = document.createElement("div");
			if (b.id = "map_" + a.id, b.setAttribute("class", "element comp_map_wrapper"), a.content && (b.textContent = a.content), a.css) {
				var c, d = a.css;
				for (c in d) b.style[c] = d[c]
			}
			return b.style.height = "250px", b
		}), i.bindAfterRenderEvent("1", function(a, b) {
			if (a = $("div", a)[0], "view" == i.mode && 1 == b.type) {
				var c = b.properties.labels;
				for (key in c)!
				function(b) {
					$($(a).find(".label_content")[b]).on("click", function() {
						pageScroll(c[b])
					})
				}(key)
			}
		}), i.bindAfterRenderEvent("8", function(a, b) {
			a = $("a", a)[0];
			var c = {
				id: b.sceneId,
				num: b.properties.number
			};
			if ("view" == i.mode) {
				var d = function() {
						$.ajax({
							cache: !0,
							type: "POST",
							url: PREFIX_S1_URL + "eqs/dial",
							data: $.param(c),
							async: !1,
							error: function(a) {
								layer.alert("Connection error")
							},
							success: function(a) {}
						})
					};
				a.addEventListener("click", d)
			}
		}), i.bindAfterRenderEvent("l", function(a, b) {
			if (a = $("a", a)[0], "view" == i.mode) {
				var c = b.properties.url;
				$(a).click(function(a) {
					isNaN(c) ? window.open(c) : eqxiu.pageScroll(c)
				})
			}
		}), i.bindAfterRenderEvent("s", function(a, b) {
			a = $("a", a)[0], "view" == i.mode && $(a).click(function(a) {})
		}), i.bindAfterRenderEvent("i", function(b, c) {
			if ("view" == i.mode) {
				var d = $(b).find(".counter-icon");
				d.click(function(e) {
					var f = {
						sceneId: c.sceneId,
						fieldId: c.id
					},
						g = $(b);
					$.ajax({
						cache: !0,
						type: "POST",
						url: PREFIX_S1_URL + "index.php?c=scene&a=counter",
						data: $.param(f),
						async: !1,
						error: function(a) {
							layer.alert("Connection error")
						},
						success: function(b) {
							d.unbind("click"), g.find(".comp_counter").removeClass("not-voted");
							var c = $(".counter-number", g),
								e = (parseInt(c.attr("data-counter-number"), 10) || 0) + 1;
							c.attr("data-counter-number", e);
							var f = a.fixedNum(e);
							$(".counter-number", g).text(f)
						}
					})
				})
			}
		}), i.bindAfterRenderEvent("4", function(a, b) {
			c(a, b)
		}),i.bindAfterRenderEvent("m", function(a, b) {//暂不知道何用百度地图
			c(a, b)
		}), i.bindAfterRenderEvent("x", function(a, b) {
			c(a, b)
		}), i.bindAfterRenderEvent("n", function(a, b) {}), i.bindAfterRenderEvent("h", function(a, b) {
			"view" == i.mode && b.properties.url && $(a).click(function(a) {
				var c = b.properties.url;
				isNaN(c) ? window.open(c) : eqxiu.pageScroll(c)
			})
		}), i.bindAfterRenderEvent("5", function(a, b) {
			var c = mobilecheck();
			d($(a).find("textarea")), e($(a).find("textarea")), "view" == i.mode && c && parseFloat(b.css.top) >= 200 && ($(a).find("textarea").focus(function(b) {
				$(a).closest(".edit_area").css({
					top: "-150px"
				})
			}), $(a).find("textarea").blur(function(b) {
				$(a).closest(".edit_area").css({
					top: 0
				})
			}))
		}), i.bindAfterRenderEvent("r", function(a, b) {
			"view" == i.mode && d($(a).find("label"))
		}), i.bindAfterRenderEvent("c", function(a, b) {
			"view" == i.mode && d($(a).find("label"))
		}), i.bindAfterRenderEvent("v", function(a, b) {
			"view" == i.mode && $(a).click(function() {
				$(a).hide(), $("#audio_btn").hasClass("video_exist") && ($("#audio_btn").hide(), $("#media")[0].pause()), utilSound.pause(), $('<div class="video_mask page_effect lock" id="mask_' + b.id + '"></div>').appendTo($(a).closest(".m-img")), $('<a class = "close_mask" id="close_' + b.id + '"></a>').appendTo($(a).closest(".m-img")), $(b.properties.src).appendTo($("#mask_" + b.id)).attr("style", "position: absolute;top:0; min-height: 45%; max-height: 100%; top: 20%;").attr("width", "100%").removeAttr("height"), $("#close_" + b.id).bind("click", function() {
					$(a).show(), $("#mask_" + b.id).remove(), $("#close_" + b.id).remove(), $("#audio_btn").hasClass("video_exist") && $("#audio_btn").show(function() {
						$("#media")[0].play()
					})
				})
			})
		}), i.bindAfterRenderEvent("2", function(a, b) {
			f(a)
		}), i.bindAfterRenderEvent("6", function(a, b) {
			if (a = $("button", a)[0], "view" == i.mode) {
				var c = {
					REQUIRED: "为必填项！",
					WRONG_PHONE_NUMBER_FORMAT: "手机号码格式错误！",
					WRONG_EMAIL_FORMAT: "邮箱格式错误！",
					FILL_OUT_THE_FORM: "请填写表单！",
					DUPLICATED_SUBMISSION: "请不要重复提交！",
					THANKS_FOR_PARTICIPATION: "您提交的信息已经咻咻地跑到我们的数据库啦！灰常感谢您的参与呐~！"
				},
					d = function(a, b, d) {
						var e = !0,
							f = {};
						if ($("textarea", d).each(function() {
							if (e) {
								if ("required" == $(this).attr("required") && "" == $(this).val().trim()) return layer.alert($(this).attr("placeholder") + c.REQUIRED), void(e = !1);
								if ("502" == $(this).attr("ctype") && "" !== $(this).val().trim()) {
									var a = new RegExp(/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/g);
									if (!a.test($(this).val())) return layer.alert("手机号码格式错误！"), void(e = !1)
								}
								if ("503" == $(this).attr("ctype") && "" !== $(this).val().trim()) {
									var b = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g);
									if (!b.test($(this).val())) return layer.alert("邮箱格式错误！"), void(e = !1)
								}
								f[$(this).attr("name")] = $(this).val()
							}
						}), $("input:checked", d).each(function() {
							var a = $(this);
							f[a.attr("name")] ? f[a.attr("name")] += "," + a.val() : f[a.attr("name")] = a.val()
						}), $('.comp_radio[required="required"]', d).each(function() {
							var a = $(this);
							f[a.attr("name")] || (alert(a.attr("title") + c.REQUIRED), e = !1)
						}), $('input[type="hidden"]', d).each(function() {
							f[$(this).attr("name")] = $(this).val()
						}), $('.comp_rating[required="required"]', d).each(function() {
							var a = $(this);
							f[a.attr("name")] && "0" != f[a.attr("name")] || (alert(a.attr("title") + "为必填项！"), e = !1)
						}), e) {
							var g = !1;
							if ($.isEmptyObject(f)) return void(g = !0);
							for (var h in f) if ("" !== f[h]) {
								g = !0;
								break
							}
							return g ? void $.ajax({
								cache: !0,
								type: "POST",
								url: PREFIX_S1_URL + "eqs/r/" + b,
								data: $.param(f),
								async: !1,
								error: function(a) {
									layer.alert("Connection error")
								},
								success: function(b) {
									$(a).unbind("click").click(function() {
										layer.alert("请不要重复提交！")
									}), layer.alert("您提交的信息已经咻咻地跑到我们的数据库啦！灰常感谢您的参与呐~！")
								}
							}) : void layer.alert("请填写表单！")
						}
					};
				i.def.sceneId;
				$(a).bind("click", function() {
					var b, c = $(a).parents(".edit_wrapper").attr("data-scene-id");
					b = c ? $(a).parents(".nr").find('.edit_wrapper[data-scene-id="' + c + '"]') : $(a).parents(".nr"), d(this, c, b)
				})
			}
		}), i.bindAfterRenderEvent("7", function(a, b) {
			var c = new BMap.Map("map_" + b.id, {
				enableMapClick: !1
			}),
				d = new BMap.Point(b.properties.x, b.properties.y),
				e = new BMap.Marker(d);
			c.addOverlay(e);
			var f = new BMap.Label(b.properties.markTitle, {
				offset: new BMap.Size(20, -10)
			});
			e.setLabel(f), c.disableDoubleClickZoom(), c.centerAndZoom(d, 15)
		}), i.bindAfterRenderEvent("p", function(a, b) {
			if (!$(a).closest(".page_tpl_container ").length) {
				$(a).children(".element-box").css("overflow", "visible"), utilPictures.deleteInterval(b.id);
				var c = $(a).find("#" + b.id);
				new flux.slider(c, {
					autoplay: b.properties.autoPlay,
					delay: b.properties.interval,
					pagination: !1,
					transitions: [utilPictures.getPicStyle(b.properties.picStyle).name],
					width: b.css.width,
					height: b.css.height,
					bgColor: b.properties.bgColor,
					onStartEnd: function(a) {
						utilPictures.addInterval(b.id, a)
					}
				})
			}
		}), i.bindAfterRenderEvent("a", function(a, b) {
			function c(a) {
				f.each(function(b, c) {
					$(c).removeClass(h).addClass(h + "-line"), a >= b && $(c).removeClass(h + "-line").addClass(h)
				})
			}
			var e = $(a);
			if ("view" == i.mode) {
				var f = e.find("i"),
					g = e.find("input"),
					h = b.properties.icon;
				f.each(function(a, b) {
					$(b).bind("click", function() {
						c(a), g.val(a + 1)
					}), $(b).bind("mouseenter", function() {
						c(a)
					})
				}), e.find(".rating-icons").bind("mouseleave", function() {
					c(parseInt(g.val(), 10) - 1)
				}), d(e.find(".rating-icons"))
			}
		});
		var j
	}(window.eqShow), function() {
		eqShow.shakeTrigger = function(a, b) {
			function c(a) {
				var b = a.accelerationIncludingGravity,
					e = (new Date).getTime();
				if (e - j > 100) {
					var n = parseInt(e - j);
					j = e, f = b.x, g = b.y, h = b.z;
					var o = Math.abs(f + g + h - k - l - m) / n * 1e4;
					o > i && (window.removeEventListener("devicemotion", c, !0), d.sends && d.sends.length && $.each(d.sends, function(a, b) {
						time = setTimeout(function() {
							$.each(b.handles, function(a, b) {
								var c = utilTrigger.getHandleType(b.type).name;
								$.each(b.ids, function(a, b) {
									var d = $("#inside_" + b);
									d.trigger(c)
								})
							})
						}, 1e3 * b.delay)
					})), k = f, l = g, m = h
				}
			}
			var d, e = $(b).find(".m-img").attr("id").substring(4);
			if (a[e - 1].properties && (d = a[e - 1].properties.trigger), d && d.sends) {
				var f, g, h, i = 3e3,
					j = 0,
					k = 0,
					l = 0,
					m = 0;
				window.DeviceMotionEvent && b && window.addEventListener("devicemotion", c, !1)
			}
		}
	}(), function(a) {
		function b() {
			var a = {
				"Allura-Regular": {
					value: 1,
					familyName: "Allura-Regular",
					src: "assets/images/fonts/Allura-Regular.png",
					blueSrc: "assets/images/fonts/Allura-Regular_blue.png"
				},
				"Amaranth-Regular": {
					value: 2,
					familyName: "Amaranth-Regular",
					src: "assets/images/fonts/Amaranth-Regular.png",
					blueSrc: "assets/images/fonts/Amaranth-Regular_blue.png"
				},
				"Anton-Regular": {
					value: 3,
					familyName: "Anton-Regular",
					src: "assets/images/fonts/Anton-Regular.png",
					blueSrc: "assets/images/fonts/Anton-Regular_blue.png"
				},
				"Arial-Regular": {
					value: 4,
					familyName: "Arial-Regular",
					src: "assets/images/fonts/Arial-Regular.png",
					blueSrc: "assets/images/fonts/Arial-Regular_blue.png"
				},
				"Arialnarrow-Regular": {
					value: 5,
					familyName: "Arialnarrow-Regular",
					src: "assets/images/fonts/Arialnarrow-Regular.png",
					blueSrc: "assets/images/fonts/Arialnarrow-Regular_blue.png"
				},
				"Arialroundedmtbold-Regular": {
					value: 6,
					familyName: "Arialroundedmtbold-Regular",
					src: "assets/images/fonts/Arialroundedmtbold-Regular.png",
					blueSrc: "assets/images/fonts/Arialroundedmtbold-Regular_blue.png"
				},
				"Banglasangammn-Regular": {
					value: 7,
					familyName: "Banglasangammn-Regular",
					src: "assets/images/fonts/Banglasangammn-Regular.png",
					blueSrc: "assets/images/fonts/Banglasangammn-Regular_blue.png"
				},
				"Blackopsone-Regular": {
					value: 8,
					familyName: "Blackopsone-Regular",
					src: "assets/images/fonts/Blackopsone-Regular.png",
					blueSrc: "assets/images/fonts/Blackopsone-Regular_blue.png"
				},
				"Bradleyhand-Bold": {
					value: 9,
					familyName: "Bradleyhand-Bold",
					src: "assets/images/fonts/Bradleyhand-Bold.png",
					blueSrc: "assets/images/fonts/Bradleyhand-Bold_blue.png"
				},
				"Cabinsketch-Bold": {
					value: 10,
					familyName: "Cabinsketch-Bold",
					src: "assets/images/fonts/Cabinsketch-Bold.png",
					blueSrc: "assets/images/fonts/Cabinsketch-Bold_blue.png"
				},
				songti: {
					value: 11,
					familyName: "宋体",
					src: "assets/images/fonts/songti.png",
					blueSrc: "assets/images/fonts/songti_blue.png"
				},
				songti: {
					value: 12,
					familyName: "宋体",
					src: "assets/images/fonts/songti.png",
					blueSrc: "assets/images/fonts/songti_blue.png"
				},
				weiruanyahei: {
					value: 12,
					familyName: "微软雅黑",
					src: "assets/images/fonts/weiruanyahei.png",
					blueSrc: "assets/images/fonts/weiruanyahei_blue.png"
				},
				mnjbwks: {
					value: 13,
					familyName: "迷你简笔魏楷书",
					src: "assets/images/fonts/mnjbwks.png",
					blueSrc: "assets/images/fonts/mnjbwks_blue.png"
				},
				hzgb: {
					value: 17,
					familyName: "汉真广标",
					src: "assets/images/fonts/hzgb.png",
					blueSrc: "assets/images/fonts/hzgb_blue.png"
				},
				changyi: {
					value: 18,
					familyName: "迷你简长艺",
					src: "assets/images/fonts/changyi.png",
					blueSrc: "assets/images/fonts/changyi_blue.png"
				}
			};
			this.getFontName = function(b) {
				if (b === undefined) return a;
				for (var c in a) if (b === c) return a[c];
				return null
			}
		}
		a.utilFont = new b
	}(window), function(a) {
		function b() {
			var a = {};
			this.addInterval = function(b, c) {
				a[b] = c
			}, this.deleteInterval = function(b) {
				a[b] && (clearInterval(a[b]), delete a[b])
			}, this.clearInterval = function() {
				for (var b in a) this.deleteInterval(b)
			};
			var b = [{
				value: 1,
				desc: "轮播",
				name: "slide"
			}, {
				value: 2,
				desc: "下落",
				name: "bars"
			}, {
				value: 3,
				desc: "百页窗",
				name: "blinds"
			}, {
				value: 4,
				desc: "消隐",
				name: "blocks"
			}, {
				value: 5,
				desc: "渐变",
				name: "blocks2"
			}, {
				value: 9,
				desc: "梳理",
				name: "zip"
			}, {
				value: 11,
				desc: "翻转",
				name: "bars3d"
			}, {
				value: 13,
				desc: "立方体",
				name: "cube"
			}, {
				value: 14,
				desc: "棋盘",
				name: "tiles3d"
			}, {
				value: 16,
				desc: "飞出",
				name: "explode"
			}];
			this.getPicStyle = function(a) {
				if (a === undefined) return b;
				for (var c = 0; c < b.length; c++) if (a === b[c].value) return b[c]
			}
		}
		a.utilPictures = new b
	}(window), function(a, b) {
		function c() {
			var a, c, d, e = [];
			b("#media");
			this.addAudio = function(a, f) {
				var g = new Audio;
				g.src = f, e.push({
					elem: a,
					audio: g
				}), b(g).bind("ended", function() {
					c = !1, d()
				})
			}, this.play = function(b, f, g) {
				var h;
				d = f;
				for (var i = 0; i < e.length; i++) e[i].elem == b && (h = e[i].audio);
				a == h && c ? (h.pause(), c = !1, f()) : a != h || c ? (a && a.pause(), h.currentTime = 0, h.play(), g(), c = !0, a = h) : (h.play(), c = !0, g())
			}, this.pause = function() {
				a && (a.pause(), c = !1)
			}
		}
		a.utilSound = new c
	}(window, $), function(a) {
		function b() {
			var a = {
				CLICK: {
					name: "click",
					value: 1,
					title: "点击"
				},
				SHAKE: {
					name: "shake",
					value: 2,
					title: "摇一摇"
				}
			},
				b = {
					SHOW: {
						name: "show",
						value: 1
					},
					HIDE: {
						name: "hide",
						value: 2
					},
					RANDOMEVENT: {
						name: "randomEvent",
						value: 3
					}
				};
			this.getSendType = function(b) {
				if (b === undefined) return a;
				for (var c in a) if (b === a[c].value) return a[c];
				return null
			}, this.getHandleType = function(a) {
				if (a === undefined) return b;
				for (var c in b) if (a === b[c].value) return b[c];
				return null
			}
		}
		a.utilTrigger = new b
	}(window);
	var tplCount = 0,
		eqxCommon = function() {
			var a = function(a) {
					var b, c, d = a.type;
					return 0 === d && (b = "fadeIn"), 1 === d && (c = a.direction, 0 === c && (b = "fadeInLeft"), 1 === c && (b = "fadeInDown"), 2 === c && (b = "fadeInRight"), 3 === c && (b = "fadeInUp")), 6 === d && (b = "wobble"), 5 === d && (b = "rubberBand"), 7 === d && (b = "rotateIn"), 8 === d && (b = "flip"), 9 === d && (b = "swing"), 2 === d && (c = a.direction, 0 === c && (b = "bounceInLeft"), 1 === c && (b = "bounceInDown"), 2 === c && (b = "bounceInRight"), 3 === c && (b = "bounceInUp")), 3 === d && (b = "bounce"), 4 === d && (b = "zoomIn"), 10 === d && (b = "fadeOut"), 11 === d && (b = "flipOutY"), 12 === d && (b = "rollIn"), 13 === d && (b = "lightSpeedIn"), 14 === d && (b = "bounceOut"), 15 === d && (b = "rollOut"), 16 === d && (b = "lightSpeedOut"), 17 === d && (c = a.direction, 0 === c && (b = "fadeOutRight"), 1 === c && (b = "fadeOutDown"), 2 === c && (b = "fadeOutLeft"), 3 === c && (b = "fadeOutUp")), 18 === d && (b = "zoomOut"), 19 === d && (c = a.direction, 0 === c && (b = "bounceOutRight"), 1 === c && (b = "bounceOutDown"), 2 === c && (b = "bounceOutLeft"), 3 === c && (b = "bounceOutUp")), 20 === d && (b = "flipInY"), 21 === d && (b = "tada"), 22 === d && (b = "jello"), 23 === d && (b = "flash"), 24 === d && (b = "flipInX"), 25 === d && (b = "flipOutX"), b
				},
				b = function(a, b, c) {
					function d(a, b, f) {
						if (f.length && e < f.length) {
							a.css("animation", "");
							a.get(0);
							a.css("animation", b[e] + " " + f[e].duration + "s ease " + f[e].delay + "s " + (f[e].countNum ? f[e].countNum : "")), "view" == c ? (f[e].count && e == f.length - 1 && a.css("animation-iteration-count", "infinite"), a.css("animation-fill-mode", "both")) : (a.css("animation-iteration-count", "1"), a.css("animation-fill-mode", "backwards")), f[e].linear && a.css("animation-timing-function", "linear"), a.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
								e++, d(a, b, f)
							})
						}
					}
					var e = 0;
					if (b.properties && b.properties.anim) {
						var f = [];
						b.properties.anim.length ? f = b.properties.anim : f.push(b.properties.anim);
						var g = $(".element-box", a);
						g.attr("element-anim", "");
						for (var h, i = [], j = [], k = 0, l = f.length; l > k; k++) null != f[k].type && -1 != f[k].type && (h = eqxCommon.convertType(f[k]), i.push(h), j.push(f[k]));
						b.properties.anim.trigger ? a.click(function() {
							d(g, h, b.properties.anim)
						}) : d(g, i, j)
					}
				},
				c = function(a, b) {
					var c = $(a);
					if (b.trigger && b.trigger.receives && b.trigger.receives.length) {
						$.each(b.trigger.receives, function(a, d) {
							if (d.ids.length) {
								var e = utilTrigger.getHandleType(d.type).name;
								("show" == e || "randomEvent" == e) && c.hide(), "hide" == e && c.show(), c.bind(e, function() {
									if ("show" == e) $(this).show();
									else if ("hide" == e) $(this).hide();
									else if ("randomEvent" == e) {
										$(this).show();
										var a = Math.floor(Math.random() * b.properties.pics.length);
										$(this).find("img").css({
											display: "none"
										}), $(this).find("img").eq(a).css({
											display: "block"
										})
									}
								})
							}
						})
					}
				},
				d = function() {
					var a, b, c = window.navigator,
						d = ["language", "browserLanguage", "systemLanguage", "userLanguage"];
					if ($.isArray(c.languages)) for (a = 0; a < c.languages.length; a++) if (b = c.languages[a], b && b.length) return b;
					for (a = 0; a < d.length; a++) if (b = c[d[a]], b && b.length) return b;
					return null
				};
			return {
				convertType: a,
				animation: b,
				bindTrigger: c,
				getFirstBrowserLanguage: d
			}
		}();
	eqShow.getShowCount = function(a) {
		return this.showCount = $.ajax({
			type: "GET",
			url: PREFIX_S1_URL + "index.php?c=scene&a=view&id=" + a,
			xhrFields: {
				withCredentials: !0
			},
			error: function(a) {
				layer.alert("Connection error")
			},
			crossDomain: !0
		}), this.showCount
	}, eqShow.fixedNum = function(a) {
		var b;
		return 1e4 > a ? b = a : a >= 1e4 && 1e8 > a ? b = (a / 1e4).toFixed(2) + "万" : a >= 1e8 && (b = (a / 1e8).toFixed(2) + "亿"), b
	}, eqShow.showProgressBar = function(a, b, c) {
		if (a.obj.property.slideNumber) {
			var d = $('<div class="progress"></div>'),
				e = $("<span></span>"),
				f = $('<em class="page-tip"></em>');
			d.append(e).append(f), c && a.obj.property.slideDisplay ? c.append(d.css("display", a.obj.property.slideDisplay)) : $("#nr").append(d.css("display", "block"))
		}
		var g = function() {
				a.obj.property.slideNumber && e && setTimeout(function() {
					var a = $(".z-active").get(0) ? $(".z-active").get(0) : $(".z-current").get(0);
					if (a) {
						var c = $(a).find(".m-img").attr("id").substring(4),
							g = b.length,
							h = c / g,
							i = 100;
						f.text(c + "/" + g), e.css("width", parseFloat(d.width()) * h), $(a).find(".lock").length && (i = 0), d.css("z-index", i)
					}
				}, 100)
			};
		g(), b.eq(0).find(".u-arrow-bottom").css("bottom", "30px"), eqShow.progressInterval = setInterval(function() {
			g()
		}, 300)
	}, eqShow.selectElement = function(a) {
		var b;
		return b = $("#inside_" + a, ".phone-view").length ? $("#inside_" + a, ".phone-view") : $("#inside_" + a)
	}, angular.module("active", ["services.active"]), angular.module("active").controller("ActiveCtrl", ["$rootScope", "$http", "$scope", "$timeout", "security", "$window", "activeService", "MineService", "$routeParams", function(a, b, c, d, e, f, g, h, i) {
		c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_SERVER_HOST = PREFIX_URL, c.PREFIX_CLIENT_HOST = PREFIX_HOST
	}]), angular.module("app", ["ngRoute", "home", "sample", "active", "show", "main", "spread", "reg", "scenePreview", "scene", "data.edit", "error", "usercenter", "message", "invitation", "ui.bootstrap", "ui.grid", "ui.grid.selection", "ngSanitize", "ui.select", "services.i18nNotifications", "services.httpRequestTracker", "services.sample", "services.active", "services.config", "services.configSer", "services.dataCache", "security", "app.upload", "templates-app", "templates-common", "ui.sortable", "I18N.MESSAGES", "app.directives.keymap", "app.directives.notification", "active1", "activeXq", "search", "category", "nav", "recommend", "visitor", "visitorXq", "pascalprecht.translate", "common.directives.dropDown"]), angular.module("app").config(["$routeProvider", "$locationProvider", "securityAuthorizationProvider", "uiSelectConfig", "$translateProvider", "$provide", "$httpProvider", function(a, b, c, d, e, f, g) {
		d.theme = "bootstrap", a.when("/home", {
			feedBackUrl: "http://e.wesambo.com/v-vk2Ucz15",
			templateUrl: "home/home.tpl.html",
			controller: "HomeCtrl"
		}).when("/home/:id", {
			feedBackUrl: "http://e.wesambo.com/v-vk2Ucz15",
			templateUrl: "home/home.tpl.html",
			controller: "HomeCtrl"
		}).when("/reg", {
			templateUrl: "reg/reg.tpl.html",
			controller: "RegCtrl"
		}).when("/otherRegister", {
			templateUrl: "common/security/register/otherRegister.tpl.html"
		}).when("/agreement", {
			templateUrl: "reg/agreement.tpl.html"
		}).when("/about", {
			templateUrl: "about.tpl.html"
		}).when("/error/:codeid", {
			templateUrl: "error/error.tpl.html",
			controller: "ErrorCtrl"
		}).when("/sample", {
			templateUrl: "sample/sample.tpl.html",
			controller: "SampleCtrl"
		}).when("/active", {
			templateUrl: "active/active.tpl.html",
			controller: "ActiveCtrl"
		}).when("/main", {
			feedBackUrl: "http://e.wesambo.com/v-2qFiYzrc",
			templateUrl: "main/main.tpl.html",
			controller: "MainCtrl",
			resolve: {
				authenticatedUser: c.requireAuthenticatedUser
			}
		}).when("/spread/:tab/:sceneId", {
			feedBackUrl: "http://e.wesambo.com/v-euMcJX7J",
			templateUrl: "spread/spread.tpl.html",
			controller: "SpreadCtrl",
			reloadOnSearch: !0,
			resolve: {
				authenticatedUser: c.requireAuthenticatedUser
			}
		}).when("/spread/:tab/:sceneId/:subtab", {
			templateUrl: "spread/spread.tpl.html",
			controller: "SpreadCtrl",
			reloadOnSearch: !0,
			resolve: {
				authenticatedUser: c.requireAuthenticatedUser
			}
		}).when("/main/customer", {
			feedBackUrl: "http://e.wesambo.com/v-zJuTC6jT",
			templateUrl: "main/customer.tpl.html",
			controller: "CustomerCtrl",
			resolve: {
				authenticatedUser: c.requireAuthenticatedUser
			}
		}).when("/main/customer/:sceneId", {
			templateUrl: "data/editData.tpl.html",
			controller: "EditDataCtrl",
			resolve: {
				authenticatedUser: c.requireAuthenticatedUser
			}
		}).when("/scene", {
			templateUrl: "scene/scene.tpl.html",
			controller: "SceneCtrl",
			resolve: {
				authenticatedUser: c.requireAuthenticatedUser
			}
		}).when("/scene/create/:sceneId", {
			templateUrl: "scene/create.tpl.html",
			controller: "CreateSceneCtrl",
			reloadOnSearch: !1,
			resolve: {
				authenticatedUser: c.requireAuthenticatedUser
			}
		}).when("/scene/support/", {
			templateUrl: "scene/support/support.tpl.html",
			controller: "SupportCtrl",
			reloadOnSearch: !1
		}).when("/scene/preview/:sceneId", {
			feedBackUrl: "http://e.wesambo.com/v-QblumX2x",
			templateUrl: "my/myscene.tpl.html",
			controller: "MySceneCtrl",
			reloadOnSearch: !1
		}).when("/usercenter/:id", {
			feedBackUrl: "http://e.wesambo.com/v-eWdpV5XU",
			templateUrl: "usercenter/usercenter.tpl.html",
			controller: "UserCenterCtrl",
			resolve: {
				authenticatedUser: c.requireAuthenticatedUser
			}
		}).when("/message", {
			templateUrl: "usercenter/message.tpl.html",
			controller: "MessageCtrl",
			resolve: {
				authenticatedUser: c.requireAuthenticatedUser
			}
		}).when("/invitation", {
			templateUrl: "usercenter/console/invitation.tpl.html",
			controller: "InvitationCtrl",
			resolve: {
				authenticatedUser: c.requireAuthenticatedUser
			}
		}).when("/show", {
			templateUrl: "show/index.tpl.html",
			controller: "ShowCtrl"
		}).when("/show/active", {
			templateUrl: "show/active/active.tpl.html",
			controller: "Active1Ctrl"
		}).when("/show/active/:id", {
			templateUrl: "show/active/active-xq.tpl.html",
			controller: "ActiveXqCtrl"
		}).when("/show/search/:name", {
			templateUrl: "show/search/search.tpl.html",
			controller: "SearchCtrl"
		}).when("/show/category/:id", {
			templateUrl: "show/category/category.tpl.html",
			controller: "CategoryCtrl"
		}).when("/show/recommend", {
			templateUrl: "show/recommend/recommend.tpl.html",
			controller: "RecommendCtrl"
		}).when("/show/visitor", {
			templateUrl: "show/visitor/visitor.tpl.html",
			controller: "VisitorCtrl"
		}).when("/show/visitor/:id", {
			templateUrl: "show/visitor/visitor-xq.tpl.html",
			controller: "VisitorXqCtrl"
		}).when("/privilege", {
			templateUrl: "usercenter/tab/privilege.tpl.html",
			controller: "PrivilegeCtrl"
		}).otherwise({
			redirectTo: "/home"
		}), e.useStaticFilesLoader({
			prefix: CLIENT_CDN + "assets/languages/",
			suffix: ".json"
		});
		var h = "zh-CN";
		"en-US" == h && $(document.body).addClass("en"), e.preferredLanguage(h), g.interceptors.push(["$translate", "$rootScope", function(a, b) {
			var c = h.replace("-", "_");
			return b.$on("$translateChangeSuccess", function() {
				c = a.use(), c && (c = c.replace("-", "_"))
			}), {
				request: function(a) {
					return c && (a.headers["Accept-Language"] = c), a || $q.when(a)
				},
				response: function(a) {
					return a || $q.when(a)
				}
			}
		}])
	}]), angular.module("app").run(["security", "$rootScope", "configService", "$anchorScroll", "$location", "usercenterService", function(a, b, c, d, e, f) {
		b.CLIENT_CDN = CLIENT_CDN, b.PREFIX_FILE_HOST = PREFIX_FILE_HOST, b.PREFIX_SERVER_HOST = PREFIX_URL, b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.PREFIX_S3_URL = PREFIX_S3_URL, a.requestCurrentUser(), c.getLogo().then(function(a) {
			try {
				b.logoSrc = a.data
			} catch (c) {
				b.logoSrc = CLIENT_CDN + "assets/images/logo.png"
			}
		}, function() {
			b.logoSrc = CLIENT_CDN + "assets/images/logo.png"
		}), b.load2 = function() {
			$("#eq_main").scroll(function() {
				s = $("#eq_main").scrollTop(), s > 100 ? $(".scroll").css("display", "block") : $(".scroll").css("display", "none")
			})
		}, b.appIconDown = !0, b.downApp = function() {
			b.appIconDown = !1
		}, b.closeDown = function() {
			b.appIconDown = !0
		}, b.appIconDown = !0, b.downApp = function() {
			b.appIconDown = !1
		}, b.closeDown = function() {
			b.appIconDown = !0
		}, b.appIconDown = !0, b.downApp = function() {
			b.appIconDown = !1
		}, b.closeDown = function() {
			b.appIconDown = !0
		}, b.goTop = function() {
			$("#eq_main").scrollTop(0)
		}, b.$on("$routeChangeSuccess", function(a, c) {
			c.$$route && (b.feedBackUrl = c.$$route.feedBackUrl)
		})
	}]), angular.module("app").run(["$route", "$rootScope", "$location", function(a, b, c) {
		b.$on("$locationChangeStart", function() {
			b.branchid && c.search("branchid", b.branchid), $(".modal").remove(), $(".modal-backdrop").remove()
		});
		var d = c.path;
		c.path = function(e, f) {
			if (f === !1) var g = a.current,
				h = b.$on("$locationChangeSuccess", function() {
					a.current = g, h()
				});
			return d.apply(c, [e])
		}
	}]), angular.module("app").controller("AppCtrl", ["$translate", "SpreadService", "$window", "$scope", "$rootScope", "$location", "$route", "$modal", "security", "sceneService", "$routeParams", "$timeout", "i18nNotifications", "usercenterService", "thirdpartyService", "$modalStack", function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
		function q() {
			return sessionStorage.getItem("sysMsgHasRead")
		}
		function r(a, b, c, d) {
			n.getNewMessage(a, b, c, d).then(function(a) {
				d ? (e.sysMsgs = a.data.list, e.sysNewCount = a.data.map.count) : (e.newMsgs = a.data.list, e.newMsgCount = a.data.map.count > 9 ? "9+" : a.data.map.count)
			})
		}
		d.openSysMsg = !1, d.openSysMsgDialog = !q(), d.closeSysMsgDialog = function() {
			d.openSysMsgDialog = !d.openSysMsgDialog, sessionStorage.setItem("sysMsgHasRead", "true")
		}, d.notifications = m, d.removeNotification = function(a) {
			m.remove(a)
		}, c.setValue = function(a) {
			d.thirdpartyLoginParam = a, d.$apply()
		}, d.$watch("thirdpartyLoginParam", function(a, b) {
			a && (a.state && /WECHAT_STATE/.test(a.state) ? o.weiChatLogin(a.code).then(function(a) {
				200 == a.data.code && (f.path("main"), i.setLoginSuccess(!0))
			}) : o.qqLogin(a.access_token, a.expires_in))
		}), d.$on("$locationChangeStart", function(a) {
			if ("/home/login" != f.path() || i.currentUser ? 0 !== f.path().indexOf("/home/register") || i.currentUser || i.showRegister(s) : i.showLogin(), i.isAuthenticated() && ("/home" == f.path() || "/home/login" == f.path()) && f.path("main"), f.search().resetToken) {
				var b = f.search().resetToken;
				i.requestResetPassword(b)
			}
			var c = p.getTop();
			c && p.dismiss(c.key)
		}), d.openLogin = function() {
			f.path("/home/login", !1)
		};
		var s;
		d.openRegister = function(a) {
			s = a, f.path("/home/register", !1)
		}, d.isAuthenticated = i.isAuthenticated, f.search().branchid && (e.branchid = f.search().branchid), e.sysMsgs = [], d.$watch(function() {
			return i.currentUser
		}, function(a) {
			a && (d.user = a, e.user = a, d.userProperty = a, d.isEditor = i.isEditor(), e.isEditor = i.isEditor(), d.isAdvancedUser = i.isAdvancedUser(), e.isAdvancedUser = i.isAdvancedUser(), d.isVendorUser = i.isVendorUser(), e.isVendorUser = i.isVendorUser(), d.$broadcast("currentUser", a), i.isAuthenticated() && (("/home" == f.path() || "/home/login" == f.path()) && f.path("main"), r(1, 4, !0, !0), r(1, 4, !0)))
		}, !0), d.$on("addBranch", function(a, b) {
			for (var c = 0; c < d.userbranches.length; c++) if (b.id == d.userbranches[c].id) return;
			d.userbranches.unshift(b)
		}), d.showBoardsDropdown = function() {
			d.isProjectsDropdownVisible = !0
		}, d.hideBoardsDropdown = function() {
			d.isProjectsDropdownVisible = !1
		};
		var t = $(document);
		t.scroll(function() {
			var a = t.scrollTop();
			a > 180 ? $(".header-contain", t).addClass("head-shadow") : $(".header-contain", t).removeClass("head-shadow")
		}), d.$watch("branchid", function() {
			d.hideOpea = !! e.branchid
		}), d.openReg = function() {
			h.open({
				windowClass: "request_contain",
				templateUrl: "usercenter/request_reg.tpl.html",
				controller: "UsercenterrequestCtrl",
				resolve: {}
			}).result.then(function() {}, function() {})
		}, d.login = function() {
			i.showLogin()
		}, d.register = function() {
			i.showRegister()
		}, d.showToolBar = function() {
			return f.$$path.indexOf("/scene/create") < 0
		}, d.showPanel = function() {
			$("#helpPanel").stop().animate({
				right: "0"
			}, 500)
		}, d.hidePanel = function() {
			$("#helpPanel").stop().animate({
				right: "-120"
			}, 500)
		}, d.suggestionUrl = "http://bbs.e.wesambo.com/forum.php?mod=forumdisplay&fid=45", d.feedbackUrl = "http://bbs.e.wesambo.com/forum.php?mod=forumdisplay&fid=46", d.qqChatUrl = "http://shang.qq.com/wpa/qunwpa?idkey=4a2d63670009360b878aa9a1e1437ef4caec132f74a0e2c4df4a686168cc73dc", d.helpUrl = "http://bbs.e.wesambo.com/forum.php", d.createSkillUrl = "http://bbs.e.wesambo.com/forum.php?gid=37", d.safeApply = function(a) {
			var b = this.$root.$$phase;
			"$apply" == b || "$digest" == b ? a && "function" == typeof a && a() : this.$apply(a)
		}, d.changeLanguage = function(b) {
			a.use(b), window.localStorage.setItem("preferredLanguage", b), g.reload(), "en-US" === b ? $(document.body).addClass("en") : $(document.body).removeClass("en")
		}
	}]).filter("fixnum", ["$translate", function(a) {
		return function(b) {
			var c = b;
			return b >= 1e4 && 1e8 > b ? c = (b / 1e4).toFixed(1) + a.instant("UNIT1") : b >= 1e8 && (c = (b / 1e8).toFixed(1) + a.instant("UNIT2")), c
		}
	}]), angular.module("app").run(["$templateCache", function(a) {
		a.put("template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n    <ol class="carousel-indicators" ng-show="slides.length > 1">\n        <li ng-repeat="slide in slides track by $index" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="prev eqf-chevron-small-left" ng-click="prev()" ng-show="slides.length > 1"></a>\n    <a class="next eqf-chevron-small-right" ng-click="next()" ng-show="slides.length > 1"></a>\n</div>\n')
	}]), angular.module("data.edit", ["services.usercenter", "services.i18nNotifications"]), angular.module("data.edit").controller("EditDataCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location", "dataService", "i18nNotifications", "$translate", function(a, b, c, d, e, f, g, h, i, j, k, l) {
		b.sceneId = d.sceneId, b.sexOptions = [{
			id: 1,
			name: "男"
		}, {
			id: 2,
			name: "女"
		}], b.sex = b.sexOptions[0], b.isAllowedToAccessGrouping = f.isAllowToAccess(f.accessDef.GROUP_CUSTOMER);
		var m = a.branchid,
			n = {};
		b.getDataDetail = function(a) {
			j.getDataDetail(b.sceneId, m).then(function(a) {
				b.dataDetail = a.data.obj, n = a.data.obj, b.groupNames = b.dataDetail.group;
				var c = b.dataDetail.email,
					d = b.dataDetail.sex,
					e = b.dataDetail.mobile,
					f = b.dataDetail.tel;
				c ? b.formEmails = c.split(",") : b.formEmails = [""], e ? b.formMobiles = e.split(",") : b.formMobiles = [""], f ? b.formTels = f.split(",") : b.formTels = [""], d && ("男" == d ? b.sex = b.sexOptions[0] : b.sex = b.sexOptions[1])
			})
		}, "create" != b.sceneId && b.getDataDetail(b.sceneId), b.dataDetail || (b.dataDetail = {}, b.sex = null, b.formEmails = [""], b.formMobiles = [""], b.formTels = [""]), b.updateData = function(a, c, d) {
			var e = a.name,
				f = {};
			if ("email" == e || "mobile" == e || "tel" == e) {
				f[e] = "";
				var g, h = [];
				for (g = 0; g < c.length; g++) c[g] && h.push(c[g]);
				for (g = 0; g < h.length - 1; g++) f[e] += h[g] + ",";
				f[e] += h[g]
			} else f[e] = b.dataDetail[e];
			n[e] = f[e]
		}, b.updateSex = function(a) {
			var c = {};
			c.id = b.sceneId, 0 !== a.id ? c.sex = a.name : c.sex = "", n.sex = c.sex
		}, b.formEmails = [""], b.formMobiles = [""], b.formTels = [""], b.removeInputs = function(a, c, d) {
			if (d.length > 1) {
				if (!d[a]) return void d.splice(a, 1);
				d.splice(a, 1), b.updateData({
					name: c
				}, d)
			} else 1 === d.length && "" !== d[0] && (d[a] = "", b.updateData({
				name: c
			}, d))
		}, b.addInputs = function(a) {
			a.push("")
		}, b.saveData = function() {
			if (countCharacters(n.name) > 50) return void k.pushForCurrentRoute("customer.name.overflow", "notify.success");
			delete n.group, n && $.each(n, function(a, b) {
				"undefined" == b && (n[a] = null)
			});
			var a = "create" == b.sceneId ? !0 : !1;
			"create" == b.sceneId && delete n.id, j.saveData($.param(n), a).then(function(a) {
				a.data.success && (alert(l.instant("main.customer.SAVE_SUCCESS")), i.path("/main/customer"))
			})
		}, b.cancel = function() {
			i.path("/main/customer")
		}, b.groups = [], b.getGroups = function() {
			b.groups.length > 0 || j.getGroups().then(function(a) {
				b.groups = a.data.list
			}, function(a) {
				alert(l.instant("main.customer.SERVER_ERROR"))
			})
		}, b.getGroups(), b.deleteAssociation = function(a, c, d) {
			var e = {
				cId: a,
				gId: c
			};
			h.openConfirmDialog({
				msg: l.instant("main.customer.ENSURE_RELIEVE")
			}, function() {
				j.deleteAssociation(e).then(function(a) {
					if (a.data.success) for (var d = 0; d < b.groupNames.length; d++) b.groupNames[d].id == c && b.groupNames.splice(d, 1)
				}, function(a) {
					alert(l.instant("main.customer.SERVER_ERROR"))
				})
			})
		}, b.addGroup = function() {
			g.open({
				windowClass: "group-console",
				templateUrl: "main/console/group.tpl.html",
				controller: "AddGroupCtrl"
			}).result.then(function(a) {
				b.groups.push(a)
			}, function() {})
		};
		var o = [];
		b.assignGroup = function() {
			for (var a = [], c = 0, d = b.groups.length; d > c; c++) if (b.groups[c].selected) {
				o.push(b.groups[c].id);
				var e = {
					id: b.groups[c].id,
					name: b.groups[c].name
				};
				a.push(e)
			}
			if (!o.length) return void alert(l.instant("main.customer.SELECT_GROUP"));
			var f = {
				cIds: b.dataDetail.id,
				gIds: o
			};
			j.assignGroup(f).then(function(c) {
				if (c.data.success) {
					p();
					for (var d = 0; d < a.length; d++) if (b.groupNames.length > 0) for (var e = 0; e < b.groupNames.length && b.groupNames[e].id != a[d].id; e++) e == b.groupNames.length - 1 && b.groupNames.push(a[d]);
					else b.groupNames.push(a[d]);
					k.pushForCurrentRoute("data.assign.success", "notify.success")
				}
			}, function() {})
		}, b.deleteGroup = function(a, c) {
			h.openConfirmDialog({
				msg: l.instant("main.customer.ENSURE_DEL")
			}, function() {
				j.deleteGroup(a.id).then(function(d) {
					if (d.data.success) {
						p(), b.groups.splice(c, 1);
						for (var e = 0; e < b.groupNames.length; e++) b.groupNames[e].id == a.id && b.groupNames.splice(e, 1)
					}
				}, function(a) {
					alert(l.instant("main.customer.SERVER_ERROR"))
				})
			})
		};
		var p = function() {
				for (var a = 0, c = b.groups.length; c > a; a++) b.groups[a].selected = !1
			}
	}]), angular.module("bindemail-dialog", []).controller("BindEmailDialogCtrl", ["$scope", function(a) {}]), angular.module("confirm-dialog", []).controller("ConfirmDialogCtrl", ["$scope", "confirmObj", function(a, b) {
		a.confirmObj = b, a.ok = function() {
			a.$close()
		}, a.cancel = function() {
			a.$dismiss()
		}
	}]), angular.module("message-dialog", []).controller("MessageDialogCtrl", ["$scope", "msgObj", function(a, b) {
		a.msgObj = b, a.close = function() {
			a.$close()
		}, a.cancel = function() {
			a.$dismiss()
		}
	}]), angular.module("error", ["services.sample"]), angular.module("error").controller("ErrorCtrl", ["$rootScope", "$http", "$scope", "$timeout", "security", "$window", "sampleService", function(a, b, c, d, e, f, g) {
		c.PREFIX_CLIENT_HOST = PREFIX_HOST
	}]), angular.module("home", ["services.sample", "app.directives.addelement", "services.staticRes", "services.scene", "app.directives.qrcode", "app.directives.loading", "security.thirdparty"]), angular.module("home").controller("HomeCtrl", ["$rootScope", "$http", "$scope", "$timeout", "security", "$window", "sampleService", "sceneService", "$routeParams", "$route", "$location", "configService", "thirdpartyService", "staticResService", function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
		c.home70fun= function(){
			 
		  $('.header-fixed').addClass('header-opacity');  //
		  $('.header-shadow').hide(); 
		   
		 $('.slide').slider({autoRollingTime:10000,bgSpeed:500,motion:{'a1-1':{left:-384,opacity:0,speed:1000,delay:500},'a1-2':{left:931,opacity:0,speed:1000,delay:1000},'a1-3':{left:1116,opacity:0,speed:1000,delay:1200},'a1-4':{left:731,opacity:0,speed:1000,delay:1400},'a2-1':{top:679,opacity:0,speed:1000,delay:500},'a2-2':{top:679,opacity:0,speed:1000,delay:800},'a2-3':{left:-1169,opacity:0,speed:1000,delay:800},'a2-4':{opacity:0,speed:1000,delay:1200},'a2-5':{opacity:0,speed:1000,delay:1500},'a2-6':{opacity:0,speed:1000,delay:1700},'a2-7':{top:559,opacity:0,speed:1000,delay:1800},'a2-8':{top:559,opacity:0,speed:1000,delay:2000},'a2-9':{top:559,opacity:0,speed:1000,delay:2200},'a2-10':{opacity:0,speed:1000,delay:2400},'a2-11':{opacity:0,speed:1000,delay:2600},'a2-12':{top:-60,opacity:0,speed:1000,delay:2800},'a3-1':{top:679,opacity:0,speed:1000,delay:200},'a3-2':{left:-200,opacity:0,speed:1000,delay:1000},'a3-3':{left:824,opacity:0,speed:1000,delay:1000},'a3-4':{left:-94,opacity:0,speed:500,delay:1500},'a3-5':{opacity:0,speed:500,delay:1600},'a3-6':{opacity:0,speed:500,delay:1700},'a3-7':{opacity:0,speed:500,delay:1800},'a3-8':{opacity:0,speed:500,delay:1900},'a3-9':{opacity:0,speed:500,delay:2000},'a3-10':{opacity:0,speed:500,delay:2100},'a3-11':{opacity:0,speed:500,delay:2200},'a3-14':{opacity:0,speed:1000,delay:2300},'a3-15':{opacity:0,speed:1000,delay:2400},'a3-23':{opacity:0,speed:500,delay:2500},'a3-22':{opacity:0,speed:500,delay:2600},'a3-21':{opacity:0,speed:500,delay:2700},'a3-20':{opacity:0,speed:500,delay:2800},'a3-19':{opacity:0,speed:500,delay:2900},'a3-18':{opacity:0,speed:500,delay:3000},'a3-17':{opacity:0,speed:500,delay:3100},'a3-16':{opacity:0,speed:500,delay:3200},'a3-12':{opacity:0,speed:500,delay:3300},'a3-13':{opacity:0,speed:500,delay:3400},'a4-1':{top:679,opacity:0,speed:1000,delay:200},'a4-2':{left:-200,opacity:0,speed:1000,delay:1000},'a4-3':{left:824,opacity:0,speed:1000,delay:1000},'a4-4':{left:-94,opacity:0,speed:500,delay:1500},'a4-5':{left:-60,opacity:0,speed:500,delay:1500},'a5-1':{top:679,opacity:0,speed:1000,delay:500},'a5-2':{top:679,opacity:0,speed:1000,delay:800},'a5-3':{left:-1169,opacity:0,speed:1000,delay:800},'a5-4':{opacity:0,speed:1000,delay:1200},'a6-1':{top:679,opacity:0,speed:1000,delay:200},'a6-2':{left:-200,opacity:0,speed:1000,delay:1000},'a6-3':{left:824,opacity:0,speed:1000,delay:1000},'a6-4':{left:-94,opacity:0,speed:500,delay:1500},end:null}});
		}
		c.showCode = !1, c.isAuthenticated = e.isAuthenticated, c.registerMsg = {}, c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.PREFIX_SERVER_HOST = PREFIX_URL, c.scene || (c.scene = {}), c.typeindex = "all", c.pageSize = 12, c.pageNo = 1, c.getHomes = function(a, b, d, e) {
			c.typeindex = a, g.getSamples(b, d, e).then(function(a) {
				c.homes = a.data.list
			}, function(a) {})
		}, c.sceneTypes = n.getSceneType(), c.getHomes("all", null, 1, 12);
		c.getSamplesPV = function() {
			g.getSamplesPV().then(function(a) {
				c.SamplesPVs = a.data, c.dayTop = c.SamplesPVs.obj.dayTop, c.monthTop = c.SamplesPVs.obj.monthTop, c.weekTop = c.SamplesPVs.obj.weekTop, c.page = "month"
			}, function(a) {})
		},l.getBanner70().then(function(re) {  //
			//c.banners = re.data.list; 
			console.log('re',re);
			$("#slides_bgcc").html(re.data.banner_bg); 
			$("#slide_switchcc").html(re.data.slide_switchcc);
			$("#banner_body").html(re.data.banner_body);
			var stop = setInterval(function () { $("#scenecount").html(parseInt($("#scenecount").html()) + 150); }, 10);
			setTimeout(function () { window.clearInterval(stop); $("#scenecount").html(re.data.scenecount); }, 5000);
			c.home70fun();
		}),
		  l.getMenu70().then(function(re) {
			c.menus = re.data.list; 
		}),
		l.getFriendLinks().then(function(a) {
			c.friendLinks = a.data.list, c.friendLinks.length > 15 && (c.friendLinks.length = 15)
		}),l.getProduct().then(function(a) {
            c.product = a.data.list, c.product.length > 15 && (c.product.length = 15)
        })
	}]).directive("iframeImgSwitch", function() {
		return {
			compile: function(a, b) {
				(document.documentMode || navigator.userAgent.indexOf("Edge") > 0) && (a.find(".svg-animation").css("display", "none"), a.find(".noSvg").css("display", "block"))
			}
		}
	}), angular.module("customer.group", ["services.data", "services.i18nNotifications"]), angular.module("customer.group").controller("AddGroupCtrl", ["$rootScope", "$scope", "dataService", "i18nNotifications", "$translate", function(a, b, c, d, e) {
		b.group = {}, b.authError = "", b.confirm = function() {
			if (!b.group.name) return void(b.authError = e.instant("main.customer.GROUP_NAME_ERROR1"));
			var a = countCharacters(b.group.name);
			if (a > 12) return void(b.authError = e.instant("main.customer.GROUP_NAME_ERROR2"));
			var f = {
				name: b.group.name
			};
			c.createGroup(f).then(function(a) {
				a.data.success && (d.pushForCurrentRoute("group.create.success", "notify.success"), b.$close({
					id: a.data.obj,
					name: b.group.name
				}))
			}, function() {})
		}, b.cancel = function() {
			b.$dismiss()
		}
	}]), angular.module("main.transferScene", ["services.usercenter"]), angular.module("main.transferScene").controller("TransferSceneCtrl", ["$scope", "$rootScope", "sceneService", "sceneId", "$translate", function(a, b, c, d, e) {
		a.model = {
			toUser: ""
		}, a.transferScene = !0, a.confirm = function() {
			return a.model.toUser ? a.model.toUser == b.user.loginName ? void(a.actionerror = e.instant("main.TRANSFER_SELF")) : void c.transferScene(d.sceneId, a.model.toUser).then(function(b) {
				200 == b.data.code ? a.transferScene = !1 : a.actionerror = b.data.msg
			}) : void(a.actionerror = e.instant("main.EMPTY_ACCOUTN"))
		}, a.cancel = function() {
			a.$close()
		}
	}]), angular.module("main.data", ["app.directives.dataDraggable", "customer.group", "services.i18nNotifications", "app.directives.customer"]), angular.module("main.data").controller("CustomerCtrl", ["$translate", "$rootScope", "$scope", "$route", "$location", "$timeout", "dataService", "$modal", "ModalService", "i18nNotifications", "security", function(a, b, c, d, e, f, g, h, i, j, k) {
		c.PREFIX_URL = PREFIX_URL, c.isActive = "customer", c.select = 0, c.showBranchSelect = !0;
		var l = b.branchid;
		c.toPage = 1, c.model = {}, c.dataShow = "message", g.getCustomDatas(l), c.$on("customDatas", function(a, b) {
			c.customCount = b
		}), c.customer = {
			group: null,
			origin: null
		}, c.branchEdit = !0, c.branchDelete = !0, c.branchExport = !0, f(function() {
			21 == c.user.type && (c.user.extPermi ? (/^([\d,]+,)?1(,[\d,]*)?$/.test(c.user.extPermi) ? c.branchEdit = !0 : c.branchEdit = !1, /^([\d,]+,)?2(,[\d,]*)?$/.test(c.user.extPermi) ? c.branchDelete = !0 : c.branchDelete = !1, /^([\d,]+,)?3(,[\d,]*)?$/.test(c.user.extPermi) ? c.branchExport = !0 : c.branchExport = !1) : (c.branchEdit = !1, c.branchDelete = !1, c.branchExport = !1))
		}, 100), c.downLoad = function(a, b) {
			var c;
			c = PREFIX_S3_URL + "index.php?c=custom&a=exp" + (l ? "?user=" + l : ""), b && (c += (/\?/.test(c) ? "&" : "?") + "origin=" + b), a && (c += (/\?/.test(c) ? "&" : "?") + "groupId=" + a), location.href = c
		}, c.staticFileds = [], a(["main.customer.CUSTOMER_NAME", "main.customer.CUSTOMER_MOBILE", "main.customer.CUSTOMER_EMAIL", "main.customer.CUSTOMER_SEX", "main.customer.CUSTOMER_COMPANY", "main.customer.CUSTOMER_JOB", "main.customer.CUSTOMER_ADDRESS", "main.customer.CUSTOMER_TELEPHONE", "main.customer.CUSTOMER_WEBSITE", "main.customer.CUSTOMER_QQ", "main.customer.CUSTOMER_WECHAT", "main.customer.CUSTOMER_REMARK"]).then(function(a) {
			c.staticFileds = [{
				id: "name",
				name: a["main.customer.CUSTOMER_NAME"]
			}, {
				id: "mobile",
				name: a["main.customer.CUSTOMER_MOBILE"]
			}, {
				id: "email",
				name: a["main.customer.CUSTOMER_EMAIL"]
			}, {
				id: "sex",
				name: a["main.customer.CUSTOMER_SEX"]
			}, {
				id: "company",
				name: a["main.customer.CUSTOMER_COMPANY"]
			}, {
				id: "job",
				name: a["main.customer.CUSTOMER_JOB"]
			}, {
				id: "address",
				name: a["main.customer.CUSTOMER_ADDRESS"]
			}, {
				id: "tel",
				name: a["main.customer.CUSTOMER_TELEPHONE"]
			}, {
				id: "website",
				name: a["main.customer.CUSTOMER_WEBSITE"]
			}, {
				id: "qq",
				name: a["main.customer.CUSTOMER_QQ"]
			}, {
				id: "weixin",
				name: a["main.customer.CUSTOMER_WECHAT"]
			}, {
				id: "remark",
				name: a["main.customer.CUSTOMER_REMARK"]
			}]
		}), c.selectScene = function(b, d) {
			c.selectedSceneId = b, g.getSceneField(b).then(function(b) {
				c.fields = b.data.list, c.select = d, $(".list_attribute").html(a.instant("main.customer.DRAG_HERE"))
			})
		}, c.clickScene = function() {
			e.path("main")
		}, c.clickSpread = function() {
			e.path("main/spread")
		}, c.clickCustomer = function() {
			e.path("main/customer")
		}, c.editCustomer = function(a) {
			c.getDataDetail(a.id), c.editData = !0
		}, c.removeCustomer = function(b) {
			i.openConfirmDialog({
				msg: a.instant("main.customer.CONFIRM_TO_DELETE_DATA")
			}, function() {
				g.deleteDataById(b.id).then(function(a) {
					200 == a.data.code && j.pushForCurrentRoute("custom.data.delete", "notify.success"), 1 === c.customerDatas.length && c.model.currentPage > 1 ? c.getDataBySceneId(c.model.currentPage - 1, l, c.groupId, c.origin) : c.getDataBySceneId(c.model.currentPage, l, c.groupId, c.origin), g.getCustomDatas(l)
				})
			})
		}, c.addColor = function(a) {
			c.trIndex = a
		}, c.removeColor = function() {
			c.trIndex = -1
		}, c.totalItems = 0, c.model.currentPage = 0, c.toPage = "", c.pageChanged = function(b, d, e, f) {
			return 1 > b || b > c.totalItems / 10 + 1 ? void alert(a.instant("main.customer.PAGE_OVERFLOW")) : (c.model.currentPage = b, void c.getDataBySceneId(b, d, e, f))
		}, c.getDataBySceneId = function(a, b, d, e) {
			a || (a = 1), d && (c.groupId = d), e && (c.origin = e), g.getAllData(a, b, d, e).then(function(a) {
				c.customerDatas = a.data.list, c.totalItems = a.data.map.count, c.model.currentPage = a.data.map.pageNo, c.toPage = "", c.totalNum = Math.ceil(c.totalItems / a.data.map.pageSize)
			})
		}, c.getDataBySceneId(1, l, null, null), c.editCustom = function(a, b) {
			e.path("/main/customer/" + a.id)
		};
		var m = function() {
				g.getDataMessage(l).then(function(a) {
					c.dataMessage = a.data.list
				})
			};
		m(), c.sceneLoad = function(a) {
			var b = PREFIX_S3_URL + "index.php?c=scenedata&a=excel&flag=noheader&id=" + a + (l ? "&user=" + l : "");
			location.href = b
		}, c.importDatas = function() {
			g.getPremergeScenes(l).then(function(a) {
				c.importDatas = a.data.list, a.data.list.length > 0 && c.selectScene(a.data.list[0].ID, 0)
			})
		}, c.associateData = {};
		var n = !0;
		if (c.confirm = function() {
			n ? jQuery.isEmptyObject(c.associateData, {}) ? (alert(a.instant("main.customer.PLEASE_IMPORT_DATA")), n = !0) : (g.mergeSceneData(c.selectedSceneId, c.associateData).then(function() {
				alert(a.instant("main.customer.IMPORT_CUSTOMER_SUCCESS")), d.reload()
			}, function() {}), n = !1) : alert(a.instant("main.customer.DUPLICATE_CONFIRM"))
		}, c.importDatas(), c.isAllowedToAccessGrouping = k.isAllowToAccess(k.accessDef.GROUP_CUSTOMER), c.isAllowedToAccessGrouping) {
			c.allImages = {
				selected: !1
			}, c.selectAll = function() {
				for (var a = 0, b = c.customerDatas.length; b > a; a++) c.customerDatas[a].selected = c.allImages.selected
			}, c.selectCustomer = function(a) {
				a.selected || (c.allImages.selected = !1)
			}, c.groups = [], c.getGroups = function() {
				c.groups.length > 0 || g.getGroups(l).then(function(a, b) {
					c.groups = a.data.list
				}, function(a) {})
			}, c.getGroups(), c.getOrigins = function() {
				g.getOrigin(l).then(function(a) {
					c.origins = a.data.list
				}, function(b) {
					alert(a.instant("main.customer.SERVER_ERROR"))
				})
			}, c.getOrigins(), c.addGroup = function() {
				h.open({
					windowClass: "group-console console",
					templateUrl: "main/console/group.tpl.html",
					controller: "AddGroupCtrl"
				}).result.then(function(a) {
					c.groups.push(a), r(), j.pushForCurrentRoute("group.create.success", "notify.success")
				}, function() {})
			};
			var o = [],
				p = [];
			c.assignGroup = function() {
				o = [], p = [];
				for (var b = 0, d = c.customerDatas.length; d > b; b++) c.customerDatas[b].selected && o.push(c.customerDatas[b].id);
				for (b = 0, d = c.groups.length; d > b; b++) c.groups[b].selected && p.push(c.groups[b].id);
				if (!o.length) return void alert(a.instant("main.customer.NO_CUSTOMER_SELECTED"));
				if (!p.length) return void alert(a.instant("main.customer.NO_GROUP_SELECTED"));
				var e = {
					cIds: o,
					gIds: p
				};
				g.assignGroup(e).then(function(a) {
					a.data.success && (r(), c.allImages.selected = !1, q(), j.pushForCurrentRoute("data.assign.success", "notify.success"))
				}, function() {})
			}, c.deleteCustomer = function(b) {
				o = [];
				var d, e;
				if (b) d = {
					ids: b.id
				}, e = a.instant("main.customer.CONFIRM_TO_DELETE_DATA");
				else {
					for (var f = 0, h = c.customerDatas.length; h > f; f++) c.customerDatas[f].selected && o.push(c.customerDatas[f].id);
					if (!o.length) return void alert(a.instant("main.customer.NO_CUSTOMER_SELECTED"));
					d = {
						ids: o
					}, e = a.instant("main.customer.CONFIRM_TO_DELETE_DATA")
				}
				i.openConfirmDialog({
					msg: e
				}, function() {
					g.deleteCustomer(d).then(function(a) {
						a.data.success && (c.allImages.selected = !1, q(), r(), j.pushForCurrentRoute("data.delete.success", "notify.success"))
					}, function(b) {
						alert(a.instant("main.customer.SERVER_ERROR"))
					})
				})
			}, c.deleteGroup = function(b, d) {
				i.openConfirmDialog({
					msg: a.instant("main.customer.CONFIRM_TO_DELETE_GROUP")
				}, function() {
					g.deleteGroup(b.id).then(function(a) {
						a.data.success && (c.groups.splice(d, 1), r(), j.pushForCurrentRoute("group.delete.success", "notify.success"))
					}, function(b) {
						alert(a.instant("main.customer.SERVER_ERROR"))
					})
				})
			};
			var q = function() {
					1 === c.customerDatas.length && c.model.currentPage > 1 ? c.getDataBySceneId(c.model.currentPage - 1) : c.getDataBySceneId(c.model.currentPage)
				},
				r = function() {
					for (var a = 0, b = c.groups.length; b > a; a++) c.groups[a].selected = !1
				}
		}
		c.createData = function() {
			e.path("main/customer/create")
		}, c.sceneData = function() {
			c.dataShow = "dataIn"
		}, c.$watch("model.currentPage", function(a, b) {
			a && a != b && (c.model.toPage = a)
		}, !0)
	}]), //修改 
	angular.module("main", ["services.mine", "services.data", "app.directives.pageTplTypes", "services.staticRes", "app.directives.addelement", "main.data", "main.transferScene", "services.usercenter", "main.userGuide", "services.i18nNotifications", "common.directives.scroll"]), angular.module("main").controller("MainCtrl", ["$rootScope", "$scope", "$location", "$translate", "security", "MineService", "dataService", "sceneService", "ModalService", "$modal", "usercenterService", "i18nNotifications", "configSerService", "SpreadService", "$filter", "staticResService", "$timeout", function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
		b.PREFIX_URL = PREFIX_URL, b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.client_cdn = CLIENT_CDN, b.scene = {
			type: null}, b.pageSize = 11,b.editInfo = {isEditable: !1};
			// console.log(b.PREFIX_URL);
			// debugger;
		var r = 1;
		b.lists=[{title:'我的微课'},{title:'模板中心'}];
		b.listType=0;
		b.navChange =function(index){
			var id = index;
			console.log(id);
			if(id == 0){
				console.log(0);
				document.getElementById("weike").style.display="block";
				document.getElementById("muban").style.display="none";
				document.getElementById("searchweike").style.display="block";
				document.getElementById("searchmuban").style.display="none";
				document.getElementById("mubannav").style.display="none";
				document.getElementById("weikefl").style.display="block";
				}else if(id == 1){
				console.log(1);
				document.getElementById("weike").style.display="none";
				document.getElementById("muban").style.display="block";
				document.getElementById("searchweike").style.display="none";
				document.getElementById("searchmuban").style.display="block";
				document.getElementById("mubannav").style.display="block";
				document.getElementById("weikefl").style.display="none";
			}else{
				alert("出错；请刷新页面")
			}
			b.listType=index; //1 || 0
			};
			b.isAllowedHistory = e.isAllowToAccess(e.accessDef.USERCENTER_HISTORY), b.showCloseStatus = [], b.showOpenStatus = [], b.isActive = "main", b.loginSuccess = e.isLoginSuccess, b.myScene = !0, b.showBranchSelect = !0;
		var s = a.branchid;
		b.XdpageSize = 100, b.getBranches = function(a) {
			k.getBranches(b.XdpageSize, a).then(function(a) {
				a.data.success && (b.branches = a.data.list);
				
			}, function() {})
		}, b.getBranches(1), b.selectBranch = function(d) {
			d ? (b.branchCurrent = d, a.branchid = d.id, c.search({
				branchid: d.id
			})) : (a.branchid = "", c.search("branchid", null))
		};
		var t = c.search().branchid;
		q(function() {
			if (t) for (var a = 0; a < b.branches.length; a++) b.branches[a].id == t && (b.branchCurrent = b.branches[a])
		}, 300), b.showSceneList = function() {
			b.initShowGuide = !1, a.$broadcast("eqmain.overflow.visible");

		}, 
		b.getUserInfo = function() {
			k.getUserInfo().then(function(a){
			b.userinfo = a.data.obj;
			})
		},b.getUserInfo(),b.getUserXd = function() {
			k.getUserXd().then(function(a) {
				a.data.success && (b.xdCounts = a.data.obj)
			})
		}, b.getUserXd(),b.showSceneList = function() {
			b.initShowGuide = !1, a.$broadcast("eqmain.overflow.visible")
		}, 
		b.userXd = 0, k.getUserXd().then(function(a) {
			b.userXd = a.data.obj || 0
		}), b.customerUpload = function() {
			j.open({
				windowClass: "img_console console",
				templateUrl: "scene/console/bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1
						}
					}
				}
			}).result.then(function(c) {
				if (c.width / c.height === 1) {
					b.userinfo.headImg = c.data;
					var d = {
						headImg: c.data,
						id: b.userinfo.id
					};
					return void k.saveUserInfo(d).then(function(d) {
						d.data.success && (b.editInfo.isEditable = !1, a.$broadcast("headImg.change", c.data))
					})
				}
				j.open({
					windowClass: "console seven-contain",
					templateUrl: "scene/console/imageCrop.tpl.html",
					controller: "imageCropCtrl",
					backdrop: "static",
					resolve: {
						obj: function() {
							return {
								type: "square",
								properties: {
									src: c.data
								}
							}
						}
					}
				}).result.then(function(c) {
					b.userinfo.headImg = c.src;
					var d = {
						headImg: c.src,
						id: b.userinfo.id
					};
					k.saveUserInfo(d).then(function(c) {
						c.data.success && (b.editInfo.isEditable = !1, a.$broadcast("headImg.change", c.data.obj.headImg))
					})
				}, function(a) {})
			}, function(a) {})
		},
		b.createScene = function(a) {
			if (a && a.price) {
				var c = parseFloat(a.price) || 0;
				c && c > b.userXd ? i.openMsgDialog({
					msg: '当前选择需要消耗微币<font color="#ff6e6e">' + c + '</font>个<br/>微币余额不足(<font color="#ff6e6e">' + (b.userXd || 0) + '</font>个)<span class="get-xd"><a href="http://bbs.e.wesambo.com/forum.php?mod=viewthread&tid=297&extra=page%3D1" target = "_blank">获取微币</a></span>'
				}) : i.openConfirmDialog({
					msg: '当前选择需要消耗微币<font color="#ff6e6e">' + c + '</font>个<br/>微币余额为<font color="#ff6e6e">' + (b.userXd || 0) + "</font>个"
				}, function() {
					j.open({
						windowClass: "login-container six-contain",
						templateUrl: "scene/createNew.tpl.html",
						controller: "SceneNewCtrl",
						resolve: {
							items: function() {
								return a
							}
						}
					})
				})
			} else j.open({
				windowClass: "login-container six-contain",
				templateUrl: "scene/createNew.tpl.html",
				controller: "SceneNewCtrl",
				resolve: {
					items: function() {
						return a
					}
				}
			})
		},
		b.buyXd = function() {
			j.open({
				windowClass: "console",
				templateUrl: "?c=pay",
				controller: "BuyXdController",
				resolve: {
					getUserXd: function() {
						return function() {
							b.getUserXd(), b.getXdlog(b.XdtoPage)
						}
					}
				}
			}).result.then(function() {}, function() {})
		},//修改 
		 b.transferXd = function() {
		 	j.open({
		 		windowClass: "six-contain",
		 		templateUrl: "usercenter/transfer.tpl.html",
		 		controller: "UsercentertransferCtrl",
		 		resolve: {
		 			username: function() {
		 				return b.userinfo.loginName
		 			}
		 		}
		 	}).result.then(function() {
		 		b.getUserXd(), b.getXdlog(), b.getXdStatNum()
		 	}, function() {})},//修改结束
		b.$watch("user.loginName", function(a, c) {
			if (a) {
				var d = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				b.loginSuccess && "eqs" == a.substr(0, 3) && !d.test(a) && l.pushForCurrentRoute("rel.tip", "notify.tip")
			}
		}), b.editScene = function(a, b) {
			a && a.stopPropagation(), c.path("scene/create/" + b).search("pageId", 1)
		}, b.visitSceneAction = function() {
			i.openMsgDialog({
				msg: "分别可在设置微课-分享设置中、微课详情页中设置微课状态为不允许访问",
				btn: "知道了"
			}, function() {})
		}, b.showPreview = function(a, c) {
			if (c.publishTime) if (c.publishTime && c.updateTime > c.publishTime) i.openConfirmDialog({
				msg: "微课有更新需要再次发布才能预览最新内容，坚持预览会看到修改之前的微课",
				confirmName: "发布",
				cancelName: "坚持预览"
			}, function() {
				b.publishScene(a, c)
			}, function() {
				a && a.stopPropagation();
				var d = b.canvasUrl + ("/v-" + c.code);
				window.open(d)
			});
			else {
				a && a.stopPropagation();
				var d = b.canvasUrl + ("/v-" + c.code);
				window.open(d)
			} else i.openConfirmDialog({
				msg: "尚未发布微课无法预览，请先发布",
				confirmName: "发布",
				cancelName: "取消"
			}, function() {
				b.publishScene(a, c)
			})
		}, window.localStorage && "false" == localStorage.getItem("myScenesListType") ? b.listType = !1 : b.listType = !0, b.listToggle = function() {
			b.listType = !b.listType, window.localStorage && localStorage.setItem("myScenesListType", b.listType)
		}, b.addColor = function(a) {
			b.trIndex = a
		}, b.removeColor = function() {
			b.trIndex = -1
		}, b.sceneSettings = function(a, b) {
			a && a.stopPropagation(), c.path("scene/create/" + b).search({
				pageId: 1,
				openSetting: "show"
			})
		}, b.clickScene = function() {
			c.path("main")
		}, b.clickSpread = function() {
			c.path("main/spread")
		}, b.creatCompanyTpl = function(a, c, d) {
			a && a.stopPropagation(), h.createCompanyTpls(c).then(function(a) {
				a.data.success && (b.myScenes[d].isTpl = 3, l.pushForCurrentRoute("scene.save.success.companyTpl", "notify.success"));
			})
		}, b.clearCompanyTpl = function(a, c, d) {
			a && a.stopPropagation(), h.clearCompanyTpls(c).then(function(a) {
				a.data.success && (b.myScenes[d].isTpl = 0, l.pushForCurrentRoute("scene.clear.success.companyTpl", "notify.success"))
			})
		}, b.clickCustomer = function() {
			c.path("main/customer")
		}, b.register = e.getRegisterInfo(), b.logout = function() {
			e.logout()
		}, b.copyScene = function(a, b) {
			a && a.stopPropagation(), i.openConfirmDialog({
				msg: "确定复制此微课?"
			}, function() {
				h.copySceneById(b).then(function(a) {
					c.path("scene/create/" + a.data.obj).search("pageId", 1)
				})
			})
		}, b.isAllowedToAccessTransfer = e.isAllowToAccess(e.accessDef.TRANSFER_SCENE), b.isAllowedToAccessTransfer && (b.transferScene = function(c, d) {
			c && c.stopPropagation(), "eqs" == a.user.loginName.substr(0, 3) && null == a.user.email ? i.openBindEmailDialog() : j.open({
				windowClass: "six-contain",
				templateUrl: "main/console/transferscene.tpl.html",
				controller: "TransferSceneCtrl",
				resolve: {
					sceneId: function() {
						return {
							sceneId: d
						}
					}
				}
			}).result.then(function() {
				b.getMyScenes();
			}, function() {})
		}), 
		b.color_arry=['#eac8c1','#c1ead4','#d1bce2','#b8dee8','#e8e1af','#a7addb'],
		b.getStyle = function(a,i) {
			i = i || 0;
			i = i % 6;
			var c = b.color_arry[i];
			return {
				"background-image": "url(" + PREFIX_FILE_HOST + a + ")",
				"background-size": "cover",
				"background-color": c
			};
		}, b.getImageStyle =function(a,i){
			i = i || 0;
			i = i % 6;
			var c = b.color_arry[i];
			return {
				"background-image": "url(" + PREFIX_FILE_HOST + a + ")",
				"background-size": "cover",
				"background-color": c
			};
		},b.totalItems = 0, b.page = {
			currentPage: 1
		}, b.toPage = "", b.name = null, b.EnterPress = function(a, c) {
			var d = a || window.event;
			13 == d.keyCode && b.submit(c);
		},b.EnterPressTwo = function(a, c) {
			var d = a || window.event;
			13 == d.keyCode && b.submitTwo(c);
		}, b.searchButton = !0;
		var u = {};
		b.submit = function(a) {
			b.name = a, f.getMyScenes(b.scene.type ? b.scene.type.value : null, r, b.pageSize, s, null, a), a && (b.searchButton = !1), u.refresh = !0 //我的微课的搜索
		},b.submitTwo = function(a) {
			//模板中心的搜索
			b.name = a, h.getPageTpls(1, null, null, 0, 12, l.orderby, null, a), a && (b.searchButton = !1), u.refresh = !0
		}, b.changeName = function(a) {
			b.searchButton = !0, "" == a && u.refresh && f.getMyScenes(b.scene.type ? b.scene.type.value : null, r, b.pageSize, s, null, a)
		}, b.clearSearch = function() {
			b.searchButton = !0, b.name = "", f.getMyScenes(b.scene.type ? b.scene.type.value : null, r, b.pageSize, s)
		},b.clearSearchTwo = function() {
			b.searchButton = !0, b.name = "", h.getPageTpls(1, null, null, 1, 12)
		}, b.getMyScenes = function(a) {
			//获取个人数据
				f.getMyScenes(b.scene.type ? b.scene.type.value : null, a, b.pageSize, s);
		}, b.getMyScenes(), b.$on("get.my.scene.list", function(c) {
			var d = f.scenes;
			//获取我的微课的数据；
			d.list && d.list.length > 0 ? (b.myScenes = d.list, b.totalItems = d.map.count, b.page.currentPage = d.map.pageNo, b.allPageCount = d.map.count, b.toPage = d.map.pageNo, a.user && a.user.domain ? (b.url = a.user.domain, b.canvasUrl = "http://" + b.url) : (b.url = b.PREFIX_CLIENT_HOST, b.canvasUrl = b.url)) : (b.totalItems = 0, b.currentPage > 1 ? b.getMyScenes(--b.currentPage) : (b.myScenes = [], b.allPageCount = 0));
		}),b.deleteScene = function(a, c) {
			a && a.stopPropagation();
			var d = b.isAllowedHistory ? "确定删除此微课?删除后，该微课将在回收站保留3天" : "确定删除此微课?";
			i.openConfirmDialog({
				msg: d
			}, function() {
				f.deleteSceneById(c).then(function() {
					1 == b.myScenes.length && b.currentPage > 1 && b.currentPage--, b.getMyScenes(b.currentPage)
				})
			})
		}, b.pageChanged = function(a) {
			if(a == 1){
				b.pageSize = 11;
			}else{
				b.pageSize = 12;
			}
			return 1 > a || a > b.totalItems / 10 + 1 ? void alert("此页超出范围") : (b.page.currentPage = a, void b.getMyScenes(a,b.pageSize));
			
			 
		}, b.getTdStyle = function(a) {
			var b = $(".header_table td:eq(" + a + ")").outerWidth();
			return {
				width: b + "px",
				maxWidth: b + "px"
			}
		}, b.scene.types = p.getSceneType(), b.dataDetail = {}, g.getDatas(s), g.getCustomDatas(s), b.$on("sceneDatas", function(a, c) {
			b.datasCount = c
		}), b.$on("customDatas", function(a, c) {
			b.customCount = c
		}), b.showDetail = function(a) {
			c.path("spread/share/" + a + "/socialShare")
		}, b.$on("$destroy", function() {
			e.setLoginSuccess(!1)
		}), b.publishScene = function(a, c) {
			if (a && a.stopPropagation(), !c.name) return void i.openMsgDialog({
				msg: "尚未设置标题，请设置后再执行此操作",
				btn: "去设置"
			}, function() {
				b.sceneSettings(a, c.id)
			});
			var d = window.open();
			h.publishScene(c.id).then(function(a) {
				if (a.data.success) {
					c.publishTime = (new Date).getTime(), l.pushForCurrentRoute("scene.publish.success", "notify.success");
					var e = b.canvasUrl + ("/v-" + c.code);
					d.location = e
				}
			})
		}, b.getRejectDetail = function(a) {
			a.stopPropagation(), c.path("/usercenter/message")
		}, b.viewDetail = function(d) {
			a.showSpreadTable = !1, b.$parent.showBranchSelect = !1, c.path("/main/spread/statistics/" + d), n.getSceneDetail(d, s), n.getSceneData(d, -6, 1, s), n.getWebList(d, !0, s);
			var e = new Date;
			e = new Date(e.getTime() - 864e5)
		}
	}]).directive("sysMsgAdjust", function() {
		return {
			restrict: "EA",
			link: function(a, b, c) {
				a.isSysMsgVeryShort = !1;
				var d = a.$watch(function() {
					return $(".messages", b).css("height")
				}, function(b) {
					"44px" === b && (a.isSysMsgVeryShort = !0)
				});
				b.bind("$destroy", function() {
					d()
				})
			}
		}
	}).directive("selectPicker", function() {
		return {
			restrict: "EA",
			link: function(a, b, c) {
				b.selectpicker()
			}
		}
	}), function() {
		angular.module("main.userGuide", ["usercenter.relAccount"]).controller("userGuideCtrl", ["$rootScope", "$scope", "dateFilter", function(a, b, c) {
			var d;
			if (window.localStorage) {
				var e = JSON.parse(localStorage.getItem("loginInfo"));
				e && e[a.user.id] ? !e.isShow || b.user.checkEmail ? b.firstLogin = !1 : sessionStorage.getItem("emailGuide") ? b.firstLogin = !1 : (e.isShow = !0, d = !0, b.firstLogin = !0) : (b.firstLogin = !0, e = e || {}, e[a.user.id] = 1, e.isShow = !0, localStorage.setItem("loginInfo", JSON.stringify(e)))
			}
			b.currentGuide = "bindEmailGuide", b.showNextGuide = function() {
				sessionStorage.setItem("emailGuide", "true"), d ? b.firstLogin = !1 : (b.currentGuide = "createGuide", b.firstLogin = !0)
			};
			var f = 0;
			b.closeDiv = function(){
				document.getElementById('divClose').style.display='none';
			},
			b.showGuide = function() {
				"createGuide" == b.currentGuide && (b.firstLogin = 1 === ++f)
			}, b.isShow = function() {
				if (window.localStorage) {
					var a = JSON.parse(localStorage.getItem("loginInfo"));
					a.isShow = !a.isShow, localStorage.setItem("loginInfo", JSON.stringify(a))
				}
			}
		}])
	}(), angular.module("scenePreview", ["services.scene", "services.mine", "services.data", "scene.create.console", "app.directives.addelement", "services.usercenter", "app.directives.qrcode", "services.i18nNotifications"]), angular.module("scenePreview").controller("MySceneCtrl", ["$location", "$rootScope", "$scope", "$routeParams", "$modal", "usercenterService", "ModalService", "sceneService", "security", "$sce", function(a, b, c, d, e, f, g, h, i, j) {
		c.loading = !1, c.sceneId = d.sceneId, c.iframeUrl = j.trustAsResourceUrl(PREFIX_URL + "index.php?c=view&id=" + c.sceneId + ".html?preview=myscene"), c.tpl = b.tplObj, c.userXd = 0, f.getUserXd().then(function(a) {
			c.userXd = a.data.obj || 0
		}), b.backurl ? c.backurl = b.backurl : c.backurl = "#/main", h.getSceneDetail(c.sceneId).then(function(a) {
			a.data.success && (a.data.obj.createUser == i.currentUser.id ? c.isTpl = !1 : c.isTpl = !0, c.scene = a.data.obj, b.user && b.user.domain ? (c.url = b.user.domain + "/v-" + c.scene.code, c.canvasUrl = "http://" + c.url) : (c.url = PREFIX_HOST + "/v-" + c.scene.code, c.canvasUrl = c.url))
		}), c.editScene = function() {
			a.path("scene/create/" + c.sceneId).search("pageId", 1)
		}, c.setSceneInfo = function() {
			a.path("scene/create/" + c.sceneId).search("pageId", 1).search("openSetting", "show")
		}, c.moreShareWay = function() {
			a.path("spread/share/" + c.sceneId + "/socialShare")
		}, c.userTpl = function() {
			a.path("/scene"), b.tplId = c.scene
		};
		var k, l;
		document.getElementById("sharescript") ? ($("#sharescript").remove(), k = document.getElementsByTagName("head")[0], l = document.createElement("script"), l.id = "sharescript", l.src = "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=" + ~ (-new Date / 36e5), k.appendChild(l)) : (k = document.getElementsByTagName("head")[0], l = document.createElement("script"), l.id = "sharescript", l.src = "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=" + ~ (-new Date / 36e5), k.appendChild(l)), window._bd_share_config = {
			common: {
				bdText: "aa",
				bdDesc: "aa",
				bdUrl: "aa",
				bdSign: "on",
				bdSnsKey: {}
			},
			share: [{
				bdSize: 32
			}],
			slide: [{
				bdImg: 0,
				bdPos: "right",
				bdTop: 100
			}]
		}, c.scrollPage = function(a) {
			b.$broadcast("scene.page.scroll", a)
		}
	}]).directive("ctrlPageScroll", function() {
		function a(a, b, c) {
			a.$on("scene.page.scroll", function(a, b) {
				var c = $("iframe").get(0).contentWindow;
				b ? c.eqxiu.nextPage() : c.eqxiu.prePage()
			})
		}
		return {
			restrict: "EA",
			link: a
		}
	}), angular.module("scene.my.upload", ["angularFileUpload"]), angular.module("scene.my.upload").controller("UploadCtrl", ["$scope", "FileUploader", "fileService", "category", "$timeout", "$interval", function(a, b, c, d, e, f) {
		a.category = d;
		var g;
		g = a.category.scratch || a.category.headerImage || a.category.companyImg ? a.uploader = new b({
			url: PREFIX_URL + "index.php?c=upfile&a=upload&bizType=" + d.categoryId + "&fileType=" + d.fileType,
			withCredentials: !0,
			queueLimit: 1,
			onSuccessItem: function(b, c, d, e) {
				function g() {
					f.cancel(h), alert("上传完毕"), a.$close(c.obj.path)
				}
				a.progressNum = 0;
				var h = f(function() {
					a.progressNum < 100 ? a.progressNum += 15 : g()
				}, 100)
			}
		}) : a.uploader = new b({
			url: PREFIX_URL + "index.php?c=upfile&a=upload&bizType=" + d.categoryId + "&fileType=" + d.fileType,
			withCredentials: !0,
			queueLimit: 5,
			onCompleteAll: function() {
				function b() {
					f.cancel(c), alert("上传完毕"), a.$close()
				}
				a.progressNum = 0;
				var c = f(function() {
					a.progressNum < 100 ? a.progressNum += 15 : b()
				}, 100)
			}
		}), d.limitSize = d.limitSize || 3145728;
		var h, i = d.limitSize;
		"0" == d.fileType || "1" == d.fileType ? h = "|jpg|png|jpeg|bmp|gif|svg+xml|" : ("2" == d.fileType || "4" == d.fileType) && (h = "|mp3|mpeg|"), g.filters.push({
			name: "imageFilter",
			fn: function(a, b) {
				var c = "|" + a.type.slice(a.type.lastIndexOf("/") + 1) + "|";
				return -1 !== h.indexOf(c)
			}
		}), g.filters.push({
			name: "imageSizeFilter",
			fn: function(a, b) {
				var c = a.size;
				return c >= i && alert("上传文件大小限制在" + i / 1024 / 1024 + "M以内"), i > c
			}
		}), g.filters.push({
			name: "fileNameFilter",
			fn: function(a, b) {
				return a.name.length > 50 && alert("文件名应限制在50字符以内"), a.name.length <= 50
			}
		}), a.removeQueue = function() {}
	}]), angular.module("reg", []), angular.module("reg").controller("TestLoginCtrl", ["$rootScope", "$scope", function(a, b) {
		b.weiChatUrl = "https://open.weixin.qq.com/connect/qrconnect?appid=wxc5f1bbae4bb93ced&redirect_uri=http://www.hjtmt.com/testlogin.html&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect"
	}]), angular.module("sample", ["services.sample", "services.mine", "services.scene", "services.staticRes", "app.directives.addelement", "app.directives.qrcode"]), angular.module("sample").controller("SampleCtrl", ["$rootScope", "$http", "$scope", "$timeout", "security", "$window", "sampleService", "MineService", "sceneService", "$routeParams", "staticResService", function(a, b, c, d, e, f, g, h, i, j, k) {
		c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_SERVER_HOST = PREFIX_URL, c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.load = function() {
			t = $(".fixed").offset().top, mh = $(".mains").height(), fh = $(".fixed").height(), $("#eq_main").scroll(function() {
				s = $("#eq_main").scrollTop(), s > t - 10 ? ($(".fixed").css("position", "fixed"), s + fh > mh && $(".fixed").css("top", "0px")) : $(".fixed").css("position", "")
			})
		}, c.$on("$destroy", function() {
			$("#eq_main").unbind("scroll")
		}), c.pageNo = 1, c.pageSize = 9, c.scene || (c.scene = {}), c.typeindex = "all", c.getHomes = function(a, b, d, e) {
			c.pageNo = 1, c.typeindex = a, c.currentType = b, c.showMoreButton = !0, g.getSamples(b, d, e).then(function(a) {
				c.homes = a.data.list
			}, function(a) {})
		}, c.sceneTypes = k.getSceneType(), c.showMore = function() {
			c.pageNo++, g.getSamples(c.currentType, c.pageNo, c.pageSize).then(function(a) {
				a.data.list.length > 0 ? c.homes = c.homes.concat(a.data.list) : c.showMoreButton = !1
			}, function(a) {})
		}, c.getHomes("all", null, 1, 9), c.getSamplesPV = function() {
			g.getSamplesPV().then(function(a) {
				c.SamplesPVs = a.data, c.dayTop = c.SamplesPVs.obj.dayTop, c.monthTop = c.SamplesPVs.obj.monthTop, c.weekTop = c.SamplesPVs.obj.weekTop, c.page = "month"
			}, function(a) {})
		}
	}]), angular.module("scene.create.console", ["scene.create.console.bg","scene.create.console.ppt","scene.create.console.psd", "scene.create.console.map", "scene.create.console.input", "scene.create.console.radio.checkbox", "scene.create.console.rating", "scene.create.console.counter", "scene.create.console.linkComponent", "scene.create.console.button", "scene.create.console.setting", "scene.create.console.audio", "scene.create.console.tel", "scene.create.console.adr", "scene.create.console.fake", "scene.create.console.pictures1", "scene.create.console.sound", "scene.create.console.soundComponent", "scene.create.console.micro", "scene.create.console.link", "scene.create.console.video", "scene.create.console.category", "scene.create.console.imageCrop", "scene.create.console.cropImage", "scene.pageeffect.console", "scene.create.console.scene-setting-component", "scene.create.console.shape", "scene.create.console.randomevent", "scene.create.console.statistics"]), angular.module("scene.create.console").controller("ConsoleCtrl", ["$scope", function(a) {}]), angular.module("scene.create.console").directive("autofocus", function() {
		return function(a, b, c) {
			setTimeout(function() {
				b.focus().select()
			}, 400)
		}
	}).directive("checkCount", function() {
		return {
			restrict: "EA",
			require: "ngModel",
			link: function(a, b, c, d) {
				var e = parseInt(c.checkCount, 10);
				d.$viewChangeListeners.push(function() {
					if (countCharacters(d.$modelValue) > e) {
						var a = d.$modelValue.replace(/[^\x00-\xff]/g, "xx"),
							b = a.substring(0, e).replace(/xx/g, "中").length;
						d.$setViewValue(d.$modelValue.substring(0, b)), d.$render()
					}
				})
			}
		}
	}), angular.module("scene.create.console.setting.anim", ["app.directives.uislider", "app.directives.limitInput"]), angular.module("scene.create.console.setting.anim").controller("AnimConsoleCtrl", ["$scope", "$rootScope", "sceneService", "security", function(a, b, c, d) {
		function e(c, d) {
			var e = {
				anim: c,
				animClasses: j,
				count: d,
				elemId: a.elemDef.id
			};
			b.$broadcast("previewCurrentChange", e)
		}
		function f(c, d) {
			var e = {
				animations: c,
				animClasses: d,
				count: i,
				elemId: a.elemDef.id
			};
			b.$broadcast("previewAllChanges", e)
		}
		var g = a.elemDef = c.currentElemDef;
		a.animations = [], a.types = [], a.directions = [];
		var h, i, j = [];
		a.animTypeEnum = [{
			id: -1,
			name: "无"
		}, {
			id: 0,
			name: "淡入",
			cat: "进入"
		}, {
			id: 1,
			name: "移入",
			cat: "进入"
		}, {
			id: 2,
			name: "弹入",
			cat: "进入"
		}, {
			id: 20,
			name: "翻转进入",
			cat: "进入"
		}, {
			id: 3,
			name: "中心弹入",
			cat: "进入"
		}, {
			id: 4,
			name: "中心放大",
			cat: "进入"
		}, {
			id: 12,
			name: "翻滚进入",
			cat: "进入"
		}, {
			id: 24,
			name: "翻开进入",
			cat: "进入"
		}, {
			id: 13,
			name: "光速进入",
			cat: "进入"
		}, {
			id: 6,
			name: "摇摆",
			cat: "强调"
		}, {
			id: 5,
			name: "抖动",
			cat: "强调"
		}, {
			id: 7,
			name: "旋转",
			cat: "强调"
		}, {
			id: 8,
			name: "翻转",
			cat: "强调"
		}, {
			id: 9,
			name: "悬摆",
			cat: "强调"
		}, {
			id: 23,
			name: "闪烁",
			cat: "强调"
		}, {
			id: 21,
			name: "放大抖动",
			cat: "强调"
		}, {
			id: 22,
			name: "倾斜摆动",
			cat: "强调"
		}, {
			id: 10,
			name: "淡出",
			cat: "退出"
		}, {
			id: 17,
			name: "移出",
			cat: "退出"
		}, {
			id: 19,
			name: "弹出",
			cat: "退出"
		}, {
			id: 11,
			name: "翻转消失",
			cat: "退出"
		}, {
			id: 14,
			name: "中心消失",
			cat: "退出"
		}, {
			id: 18,
			name: "中心缩小",
			cat: "退出"
		}, {
			id: 15,
			name: "翻滚退出",
			cat: "退出"
		}, {
			id: 25,
			name: "翻开消失",
			cat: "退出"
		}, {
			id: 16,
			name: "光速退出",
			cat: "退出"
		}];
		var k, l, m = [26, 27, 28];
		if (!d.isAllowToAccess(d.accessDef.COMP_ANIMATION)) for (k = 0; k < a.animTypeEnum.length; k++) for (l = 0; l < m.length; l++) a.animTypeEnum[k].id == m[l] && (a.animTypeEnum.splice(k, 1), k--);
		if (a.animDirectionEnum = [{
			id: 0,
			name: "从左向右"
		}, {
			id: 1,
			name: "从上到下"
		}, {
			id: 2,
			name: "从右向左"
		}, {
			id: 3,
			name: "从下到上"
		}], g.properties.anim) if (g.properties.anim instanceof Array) {
			if (g.properties.anim.length) for (k = 0; k < g.properties.anim.length; k++) if (null != g.properties.anim[k].type && -1 != g.properties.anim[k].type) {
				for (a.animations.push(g.properties.anim[k]), l = 0, tlen = a.animTypeEnum.length; l < tlen; l++) a.animations[k].type == a.animTypeEnum[l].id && (a.types[k] = a.animTypeEnum[l]);
				for (l = 0, tlen = a.animDirectionEnum.length; l < tlen; l++) a.animations[k].direction == a.animDirectionEnum[l].id && (a.directions[k] = a.animDirectionEnum[l])
			} else g.properties.anim.splice(k, 1), k--
		} else {
			for (k = 0; k < a.animTypeEnum.length; k++) a.animTypeEnum[k].id == g.properties.anim.type && (a.types[0] = a.animTypeEnum[k]);
			null != g.properties.anim.direction ? a.directions[0] = a.animDirectionEnum[g.properties.anim.direction] : a.directions[0] = a.animDirectionEnum[0], g.properties.anim.duration = parseFloat(g.properties.anim.duration), g.properties.anim.delay = parseFloat(g.properties.anim.delay), g.properties.anim.countNum = parseInt(g.properties.anim.countNum, 10) || 1, a.animations.push(g.properties.anim)
		}
		g.properties || (g.properties = {});
		var n = {
			type: null,
			direction: null,
			duration: 2,
			delay: 0,
			countNum: 1,
			count: null
		};
		a.addAnim = function(b) {
			if (!b.originalEvent._constructed) {
				var c = angular.copy(n);
				c.type = a.animTypeEnum[0].id, c.direction = a.animDirectionEnum[0].id, a.animations.push(c);
				var d = a.animations.length;
				a.types[d - 1] = a.animTypeEnum[0], a.directions[d - 1] = a.animDirectionEnum[0]
			}
		}, a.removeAnim = function(b, c) {
			c.stopPropagation(), a.animations.splice(b, 1), a.types.splice(b, 1), a.directions.splice(b, 1)
		}, a.clear = function() {
			a.animations = []
		}, a.$watch("animations", function(b, c) {
			b != c && (g.properties.anim = a.animations)
		}, !0), a.$watch("types", function(b, c) {
			if (b && b != c) for (var d = 0; d < b.length; d++) c[d] && b[d].id != c[d].id && e(a.animations[d], d)
		}, !0), a.$watch("directions", function(b, c) {
			if (b && b != c) for (var d = 0; d < b.length; d++) c[d] && b[d].id != c[d].id && e(a.animations[d], d)
		}, !0), a.previewAnim = function(b) {
			if (!b.originalEvent._constructed) {
				for (var c = angular.copy(a.animations), d = [], e = [], g = 0; g < c.length; g++) null != c[g].type && -1 != c[g].type ? (d.push(c[g]), e[g] = eqxCommon.convertType(c[g])) : (c.splice(g, 1), g--);
				i = 0, f(d, e)
			}
		}, a.changeAnimation = function(a, b) {
			h = eqxCommon.convertType(a), j[b] = h
		}
	}]), angular.module("scene.create.console.audio", []), angular.module("scene.create.console.audio").controller("AudioConsoleCtrl", ["$scope", "$rootScope", "$sce", "$timeout", "$modal", "fileService", "obj", function(a, b, c, d, e, f, g) {
		function h(a) {
			f.getFileByCategory(a, 10, "2", "1").success(function(a) {
				a.success ? b.$broadcast("sounds.update", a) : alert(a.msg)
			}).error(function() {
				alert("网络连接超时，请稍后重试")
			})
		}
		function i(a) {
			f.getFileByCategory(a, 10, "2", "0").success(function(a) {
				a.success ? b.$broadcast("sounds.update", a) : alert(a.msg)
			}).error(function() {
				alert("网络连接超时，请稍后重试")
			})
		}
		a.PREFIX_FILE_HOST = PREFIX_FILE_HOST;
		var j = a.sounds = [];
		a.pagination = {}, a.getSounds = function(b) {
			a.isMySound ? i(b) : h(b)
		}, a.selectTab = function(b) {
			a.isMySound = b, a.getSounds()
		}, a.$on("sounds.update", function(b, c) {
			j.length = 0, $.each(c.list, function(a, b) {
				j.push({
					id: b.id,
					name: b.name,
					src: b.path,
					isPlaying: !1
				})
			});
			var d = c.map;
			a.pagination = {
				totalItems: d.count,
				pageSize: d.pageSize,
				currentPage: d.pageNo,
				numPages: Math.ceil(d.count / d.pageSize)
			}
		}), a.model = {
			bgAudio: {
				url: g.url ? g.url : "",
				type: g.type ? g.type : "3"
			},
			compType: "bgAudio"
		}, d(function() {
			"1" == g.type && g.url && (a.model.type1 = g.url), "2" == g.type && g.url && (a.model.type2 = c.trustAsResourceUrl(PREFIX_FILE_HOST + g.url)), "3" == g.type && g.url && (a.model.type3 = c.trustAsResourceUrl(PREFIX_FILE_HOST + g.url))
		}), a.goUpload = function() {
			e.open({
				windowClass: "upload-console",
				templateUrl: "my/upload.tpl.html",
				controller: "UploadCtrl",
				resolve: {
					category: function() {
						return {
							categoryId: 0,
							fileType: 2
						}
					}
				}
			}).result.then(function(a) {
				i()
			})
		}, a.playAudio = function(a) {
			$("#audition" + a)[0].play()
		}, a.pauseAudio = function(a) {
			$("#audition" + a)[0].pause()
		}, a.authError = "", a.confirm = function() {
			if ("1" == a.model.bgAudio.type) {
				if (!a.model.type1) return $('input[type="text"]').focus(), void(a.authError = "链接地址不能为空");
				a.model.bgAudio.url = a.model.type1
			}
			if ("2" == a.model.bgAudio.type) {
				if (!a.model.selectedMyAudio) return $("select").focus(), void(a.authError = "您没有选择音乐");
				a.model.bgAudio.url = a.model.selectedMyAudio.path
			}
			if ("3" == a.model.bgAudio.type) {
				if (!a.model.selectedAudio) return $("select").focus(), void(a.authError = "您没有选择音乐");
				a.model.bgAudio.url = a.model.selectedAudio.path
			}
			a.$close(a.model)
		}, a.cancel = function() {
			a.$dismiss()
		}
	}]), angular.module("scene.create.console.bg", ["services.file", "scene.my.upload", "app.directives.responsiveImage", "app.directives.rightclick", "services.file.upload", "services.i18nNotifications", "app.directives.autoclose"]), angular.module("scene.create.console.bg").controller("BgConsoleCtrl", ["$scope", "$timeout", "$rootScope", "$interval", "$modal", "ModalService", "sceneService", "fileService", "localizedMessages", "obj", "uploaderService", "i18nNotifications", "security", "dataCacheService", function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
		function o() {
			a.$watch("imgList", function(b) {
				for (var c = 0; c < b.length; c++) {
					if (b[c].selected) return void(a.mangeObj.manageAll = !0);
					a.mangeObj.manageAll = !1
				}
			}, !0)
		}
		function p() {
			a.systemImages = !1, a.userTagId = "", a.sysCatId = "", h.getUserFiles1(1, r, q, null, a.userTagId)
		}
		var q = a.fileType = j.fileType;
		a.type = j.type;
		var r, s = 1;
		a.currentPage = 1, a.systemImages = !0, a.isAllowedHistory = m.isAllowToAccess(m.accessDef.USERCENTER_HISTORY), a.toPage = 1, a.mangeObj = {
			manageAll: !1
		}, a.showObj = {
			showGroup: !1
		}, r = a.pageSize = 18, ("p" == a.type || "n" == a.type) && (a.mangeObj.manageAll = !0), a.switchToSystemImages = function(b) {
			a.systemImages = "true" === b
		};
		var t = function(a) {
				h.getSysCategory(a)
			},
			u = function(a, b, c, d, e) {
				h.getSystemFiles1(a, b, c, d, e)
			};
		if (a.getSystemFiles = function() {
			"0" != a.sysCatId && (a.mangeObj.manageAll = !1, window.localStorage && ("1" == a.fileType ? localStorage.setItem("photoTag", "") : localStorage.setItem("backgroundTag", "")), a.userTagId = "", a.sysCatId = "0", a.sysTagList = [], a.sysTagId = "", y = [], u(s, r, q))
		}, a.getHistory = function() {
			a.userTagId = "history", h.getFilesHistory(1).then(function(b) {
				b.data.success && (a.imgList = b.data.list)
			})
		}, a.$on("sysCategory.update", function(b) {
			$.get(categoryUrl, function (data) {
                    		a.sysCategoryList = data
                	});
                	//a.sysCategoryList = h.sysCategoryList
		}), a.getSysCatAndList = function(b) {
			searchVal = ""
			y = [], a.sysCatId = b, "0" != b && "pure" != b ? h.getSysTagByCatId(b) : (a.sysTagList = [], a.sysTagId = "", angular.forEach(a.imgList, function(a, b) {
				a.selected = !1
			})), u(s, r, q, b)
		}, a.$on("sysTag.update", function(b) {
			a.sysTagList = h.sysTagList
		}), a.getSysImgByTag = function(b) {
			y = [], a.sysTagId = b, u(s, r, q, a.sysCatId, b)
		}, a.$watch("currentPage", function(b, c) {
			b != c && (a.toPage = b, y = [], a.systemImages ? u(b, r, q, a.sysCatId, a.sysTagId) : h.getUserFiles1(b, r, q, null, a.userTagId))
		}), a.getImgByPage = function() {
			a.currentPage = a.toPage
		}, a.getUserFiles = function(b, c) {
			b !== a.userTagId && (a.mangeObj.manageAll = !1, window.localStorage && ("1" == a.fileType ? localStorage.setItem("photoTag", b) : localStorage.setItem("backgroundTag", b)), a.thumbnailList = [], y = [], a.userTagId = b, a.sysCatId = "", h.getUserFiles1(c, r, q, null, b))
		}, a.$on("imgList.update", function(b) {
			a.imgList = h.imgList, a.totalItems = h.totalItems, a.currentPage = h.pageNo
		}), window.localStorage) {
			var v = "1" == a.fileType ? localStorage.getItem("photoTag") : localStorage.getItem("backgroundTag");
			v ? (a.getUserFiles(parseInt(v, 10)), a.switchToSystemImages(!1), a.sysCatId = "") : (u(s, r, q), a.sysCatId = "0")
		} else u(s, r, q);
		t(q);
		var w = null;
		a.createTag = function() {
			return a.tagList.length >= 8 ? void(a.authError = "最多能创建8个自定义分组！") : void(w = e.open({
				windowClass: "console",
				templateUrl: "scene/console/category.tpl.html",
				controller: "CategoryConsoleCtrl"
			}))
		};
		var x = function() {
				h.getTagList()
			};
		x(), a.deleteTag = function(a, b) {
			f.openConfirmDialog({
				msg: "确定删除此分组?"
			}, function() {
				h.deleteTag(a, b)
			})
		}, a.$on("tagList.update", function(b) {
			a.tagList = h.tagList
		}), a.$on("tagList.delete", function(a) {
			p()
		});
		var y = [];
		a.switchSelect = function(b, c, d, e) {
			if (a.mangeObj.manageAll || !e) if (d.stopPropagation(), b.selected = !b.selected, a.systemImages && "p" != j.type && "n" != j.type) if (angular.forEach(a.imgList, function(a, c) {
				!a.selected || a.id == b.id && a.color == b.color || (a.selected = !1)
			}), b.selected) {
				var f;
				y = [], b.path ? f = {
					id: b.id,
					src: b.path,
					shape: b.shape
				} : b.color && (f = {
					color: b.color
				}), y.push(f)
			} else y = [];
			else if (b.selected) a.mangeObj.manageAll = !0, y.push({
				id: b.id,
				src: b.path || b.tmbPath,
				shape: b.shape
			});
			else {
				o();
				for (var g in y) y[g].id == b.id && y.splice(g, 1)
			}
		}, a.cancelSelect = function() {
			for (var b in a.imgList) a.imgList[b].selected && (a.imgList[b].selected = !1);
			y = []
		}, a.assignTag = function(b) {
			var c = [];
			a.showObj.showGroup = !1;
			for (var d = 0; d < y.length; d++) c.push(y[d].id);
			if (!c.length) return void(a.authError = "请先点击管理选择一张图片再进行分组");
			angular.forEach(a.imgList, function(a, b) {
				a.selected = !1
			});
			var e = c.join(",");
			n.clear("fileService"), h.assignTag(b, e), y = []
		}, a.$on("tag.assign", function() {
			l.pushForCurrentRoute("data.assign.success", "notify.success")
		}), a.unbindTag = function(b) {
			for (var c = [], d = 0; d < y.length; d++) c.push(y[d].id);
			if (!c.length) return void(a.authError = "请先选择一张图片再解除分组");
			var e = c.join(",");
			n.clear("fileService"), h.unbindTag(b, e)
		}, a.$on("tag.unbind", function() {
			l.pushForCurrentRoute("group.delete.data", "notify.success"), h.getUserFiles1(a.currentPage, r, q, null, a.userTagId)
		}), a.deleteFile = function(b) {
			var c = [];
			if (!b && 0 === y.length) return void(a.authError = "请您选中图片后再进行删除操作！");
			for (var d = 0; d < y.length; d++) c.push(y[d].id);
			var e = "";
			e = a.isAllowedHistory ? b ? "确定删除此图片？删除后，该图片将在回收站保留3天" : "确定删除所选图片？删除后，该图片将在回收站中保留3天" : b ? "确定删除此图片？" : "确定删除所选图片？";
			var g = b ? b : c.join(",");
			f.openConfirmDialog({
				msg: e
			}, function() {
				h.deleteFile(g), n.clear("fileService")
			})
		}, a.$on("files.delete", function(b) {
			a.sysCatId = "", y = [], h.getUserFiles1(a.currentPage, r, q, null, a.userTagId)
		}), a.replaceImage = function() {
			if (!y.length) return void(a.authError = "请您先选择图片！");
			var b;
			if ("p" != j.type && "n" != j.type) {
				if (y.length > 1) return void(a.authError = "只能选择一张图片进行替换！");
				b = y[0]
			} else {
				var c = j.count + y.length,
					d = "p" == j.type ? 6 : 10;
				if (c > d) return a.authError = "最多可选择" + (d - j.count) + "张图片", !1;
				a.picObj = [];
				for (var e = 0; e < y.length; e++) a.picObj.push({
					width: y[e].shape.width,
					height: y[e].shape.height,
					src: y[e].src
				})
			}
			var f = {};
			b && b.src && (f = {
				type: "imgSrc",
				data: b.src,
				width: b.shape.width,
				height: b.shape.height,
				id: b.id
			}), "0" == q ? b.src ? a.$close(f) : a.$close({
				type: "backgroundColor",
				color: b.color
			}) : (("p" == j.type || "n" == j.type) && (f.selectedImages = a.picObj), a.$close(f))
		}, a.replaceByClick = function(b, c, d) {
			if (!a.mangeObj.manageAll) {
				if ("p" == j.type || "n" == j.type) return void a.switchSelect(b, c, d, !0);
				y = [], (!y.length && !a.mangeObj.manageAll || a.systemImages) && (b.path || b.tmbPath ? y.push({
					id: b.id,
					src: b.path || b.tmbPath,
					shape: b.shape
				}) : b.color && y.push({
					color: b.color
				}), a.replaceImage())
			}
		};
		a.uploader = k.uploader(q);
		a.$on("uploadfiles.add", function(b) {
			a.systemImages && p(), n.clear("fileService"), a.imgList.length == r && a.imgList.splice(a.imgList.length - a.uploader.queue.length - 1, a.uploader.queue.length)
		});
		var z;
		a.$on("thumbnailList.update", function(b, c) {
			for (var d = 0; d < a.uploader.queue.length; d++) 100 == a.uploader.queue[d].progress && (a.uploader.queue.splice(d, 1), z = c, a.imgList.unshift(z));
			n.clear("fileService")
		}), a.$on("upload.bg.complete", function(b, c) {
			h.deleteFile(z.id), g.openCropModal(c, function(b) {
				z.tmbPath = b.src, z.id = b.id, a.imgList.unshift(z)
			}, function(a) {})
		}), a.cancel = function() {
			a.$dismiss()
		}, a.search = function() {
			searchVal = document.getElementById('search-value').value //获取搜索的关键字
            		searchUrl = '/index.php?c=upfile&a=syslist&pageNo=1&pageSize=18&fileType=' + q + '&bizType=0&key=' + searchVal 
            		window.m(0, 1, 18, 0, "0", 0) //执行请求函数
		}, window.enterSearchPic = function() {
			var e = event || window.event || arguments.callee.caller.arguments[0];
			if (e && e.keyCode==13){
			searchVal = document.getElementById('search-value').value //获取搜索的关键字
            		searchUrl = '/index.php?c=upfile&a=syslist&pageNo=1&pageSize=18&fileType=' + q + '&bizType=0&key=' + searchVal 
            		window.m(0, 1, 18, 0, "0", 0) //执行请求函数
			}
		}, a.$watch("userTagId", function(b, c) {
			var d = PREFIX_URL + "index.php?c=upfile&a=upload&bizType=0&fileType=" + q;
			b && (d += "&tagId=" + b), a.uploader.url = d
		})
	}]), angular.module("scene.create.console.button", []), angular.module("scene.create.console.button").controller("ButtonConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "obj", function(a, b, c, d) {
		a.model = {
			title: d.properties.title
		}, a.authError = "", a.buttons = [{
			id: 1,
			text: "点击提交",
			btnStyle: {
				backgroundColor: "#08a1ef",
				height: "30px",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 2,
			text: "立即提交",
			btnStyle: {
				backgroundColor: "rgb(255, 255, 255)",
				height: "30px",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(0, 0, 0)"
			}
		}, {
			id: 3,
			text: "提交信息",
			btnStyle: {
				backgroundColor: "#f6b223",
				height: "30px",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 4,
			text: "立即参加",
			btnStyle: {
				height: "30px",
				backgroundColor: "#333333",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 5,
			text: "提交表单",
			btnStyle: {
				height: "30px",
				backgroundColor: "#a0d86b",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 6,
			text: "马上订购",
			btnStyle: {
				height: "30px",
				backgroundColor: "#ff6666",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}], angular.forEach(a.buttons, function(b, c) {
			"" !== a.model.title && d.css.backgroundColor && d.css.backgroundColor == b.btnStyle.backgroundColor && (a.btnIndex = c)
		}), a.confirm = function() {
			return a.model.title && 0 !== a.model.title.length ? void a.$close(a.model) : (a.authError = "按钮名称不能为空", void $('.bg_console input[type="text"]').focus())
		}, a.cancel = function() {
			a.$dismiss()
		}, a.chooseTabButton = function(b, c) {
			a.model.title = b.text, a.model.btnStyle = b.btnStyle, a.btnIndex = c
		}
	}]), angular.module("scene.create.console.category", ["services.file"]), angular.module("scene.create.console.category").controller("CategoryConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "fileService", function(a, b, c, d) {
		a.category = {}, a.authError = "", a.confirm = function() {
			return a.category.name && a.category.name.trim() ? countCharacters(a.category.name) > 16 ? void(a.authError = "分类名称不能超过16个字符") : (d.createTag(a.category.name), void a.$close()) : void(a.authError = "请输入分类名称！")
		}, a.cancel = function() {
			a.$dismiss()
		}
	}]), angular.module("scene.create.console.counter", []), angular.module("scene.create.console.counter").controller("CounterConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "obj", "$modal", function(a, b, c, d, e) {
		a.model = {
			title: d.title,
			properties: {
				layout: d.properties.layout,
				size: d.properties.size,
				color: d.properties.color,
				icon: d.properties.icon,
				imgSrc: d.properties.imgSrc
			}
		}, a.authError = "", a.openImageModal = function() {
			e.open({
				windowClass: "img_console console",
				templateUrl: "scene/console/bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1
						}
					}
				}
			}).result.then(function(b) {
				a.model.properties.icon = "", a.model.properties.imgSrc = d.properties.imgSrc = b.data
			}, function(a) {})
		}, a.confirm = function() {
			angular.extend(d, a.model);
			var b = parseInt(d.css.height, 10) || 0;
			a.model.properties.imgSrc && 115 > b && (a.model.btnStyle = {
				width: "320px",
				height: "115px",
				lineHeight: "115px",
				backgroundColor: "transparent"
			}), "counter-tb" === a.model.properties.layout && (!a.model.properties.imgSrc && 80 > b && (a.model.btnStyle = {
				height: "80px",
				lineHeight: "80px"
			}), a.model.properties.imgSrc && 155 > b && (a.model.btnStyle = a.model.btnStyle || {}, a.model.btnStyle.height = a.model.btnStyle.lineHeight = "155px")), a.$close(a.model)
		}, a.cancel = function() {
			a.$dismiss()
		}, a.chooseEqfont = function(b) {
			a.model.properties.icon = b, a.model.properties.imgSrc = null
		}
	}]), angular.module("scene.create.console.cropImage", ["services.file"]).directive("cropImage", ["sceneService", "fileService", "$compile", function(a, b, c) {
		return {
			restrict: "EAC",
			scope: {},
			replace: !0,
			templateUrl: "scene/console/cropimage.tpl.html",
			link: function(c, d, e) {
				function f() {
					o.css.width / o.css.height > m / n ? (k = parseInt(o.css.width * m / o.css.width, 10), l = parseInt(o.css.height * m / o.css.width, 10)) : (k = parseInt(o.css.width * n / o.css.height, 10), l = parseInt(o.css.height * n / o.css.height, 10));
					var a = (m - k) / 2,
						b = (n - l) / 2,
						c = (m - k) / 2 + k,
						d = (n - l) / 2 + l;
					j = [0, 0, m, n], r = o.css.width / o.css.height, i = [a, b, c, d]
				}
				function g(a) {
					$(".cropWidth").html(parseInt(a.w, 10)), $(".cropHeight").html(parseInt(a.h, 10))
				}
				c.PREFIX_FILE_HOST = PREFIX_FILE_HOST;
				var h, i, j, k, l, m, n, o = a.currentElemDef,
					p = a.currentElemDef.properties.src,
					q = $("#target"),
					r = o.css.width / o.css.height;
				c.fit = !0, c.lockRatio = !1, c.$on("changeElemDef", function(a, b) {
					o = b, c.fit = !0, c.lockRatio = !1, o.properties.src != p ? (p = o.properties.src, h.setImage(PREFIX_FILE_HOST + p), q.unbind("load").attr("src", PREFIX_FILE_HOST + p).load(function() {
						m = this.width, n = this.height, c.preSelectImage(p), c.$apply()
					})) : (c.preSelectImage(p), c.$apply())
				}), c.preSelectImage = function(a) {
					h ? (f(), h.setOptions({
						aspectRatio: r,
						setSelect: i
					})) : q.attr("src", PREFIX_FILE_HOST + a).load(function() {
						m = this.width, n = this.height, q.Jcrop({
							onChange: g,
							keySupport: !1,
							setSelect: [0, 0, 100, 100],
							boxHeight: 320,
							boxWidth: 680
						}, function() {
							h = this
						}), a && (f(), h.setOptions({
							aspectRatio: r,
							setSelect: i
						}))
					})
				}, c.preSelectImage(p), c.$watch("lockRatio", function(a, b) {
					if (h) {
						var c = h.tellSelect();
						c.w = parseInt(c.w, 10), c.h = parseInt(c.h, 10), a ? h.setOptions({
							aspectRatio: c.w / c.h
						}) : h.setOptions({
							aspectRatio: null
						})
					}
				}), c.$watch("fit", function(a, b) {
					if (h) if (a) {
						var c = h.tellSelect();
						c.x = parseInt(c.x, 10), c.y = parseInt(c.y, 10), c.x2 = parseInt(c.x2, 10), c.y2 = parseInt(c.y2, 10), j = [c.x, c.y, c.x2, c.y2], h.setOptions({
							aspectRatio: r,
							setSelect: i
						})
					} else h.setOptions({
						aspectRatio: null,
						setSelect: j
					})
				}), c.crop = function() {
					var c = a.currentElemDef,
						e = h.tellSelect();
					return 0 === e.w || 0 === e.h ? void $(d).hide() : (e.x = parseInt(e.x, 10), e.y = parseInt(e.y, 10), e.w = parseInt(e.w, 10), e.h = parseInt(e.h, 10), e.x2 = parseInt(e.x2, 10), e.y2 = parseInt(e.y2, 10), e.src = $("#target").attr("src").split(PREFIX_FILE_HOST)[1], void b.cropImage(e).then(function(a) {
						var b = {
							type: "imgSrc",
							data: a.data.obj,
							width: e.w,
							height: e.h
						};
						c.properties.src = b.data;
						var f = b.width / b.height,
							g = $("#" + c.id),
							h = $("#inside_" + c.id).width(),
							i = $("#inside_" + c.id).height(),
							j = h / i;
						f >= j ? (i = h / f, $("#inside_" + c.id).height(i), c.css.height = i, c.properties.height = i, g.outerHeight(i), g.outerWidth(h), g.css("marginLeft", 0), g.css("marginTop", 0)) : (h = i * f, $("#inside_" + c.id).width(h), c.css.width = h, c.properties.width = h, g.outerWidth(h), g.outerHeight(i), g.css("marginTop", 0), g.css("marginLeft", 0)), g.attr("src", PREFIX_FILE_HOST + b.data), c.properties.imgStyle = {}, c.properties.imgStyle.width = g.outerWidth(), c.properties.imgStyle.height = g.outerHeight(), c.properties.imgStyle.marginTop = g.css("marginTop"), c.properties.imgStyle.marginLeft = g.css("marginLeft"), $(d).hide()
					}, function(b) {
						c.properties.src || a.deleteElement(c.id)
					}))
				}, c.cancel = function() {
					$(d).hide()
				}
			}
		}
	}]), angular.module("scene.create.console.fake", []), angular.module("scene.create.console.fake").controller("FakeConsoleCtrl", ["$scope", "type", function(a, b) {
		a.type = b
	}]), angular.module("scene.create.console.imageCrop", ["services.file"]).controller("imageCropCtrl", ["$translate", "$rootScope", "$scope", "imageCropService", "obj", "dataCacheService", function(a, b, c, d, e, f) {
		var g;
		"square" == e.type ? g = c.cropOption = {
			type: e.type,
			title: "图片裁切",
			desc: "图片将按照要求的比例进行裁切",
			showItems: !1,
			imgSrc: e.properties.src,
			cropItems: [{
				ratio: 1,
				desc: "正方形比例"
			}]
		} : 3 == e.type ? g = c.cropOption = {
			type: e.type,
			title: "背景裁切",
			desc: "背景图将按照要求的比例进行裁切",
			showItems: !1,
			imgSrc: e.properties.src,
			cropItems: [{
				ratio: 640 / 1008,
				desc: "背景图比例"
			}]
		} : 4 == e.type && (g = c.cropOption = {
			type: e.type,
			title: "图片裁切",
			desc: "请根据你的需求，点击右侧常用比例进行裁切",
			showItems: !0,
			imgSrc: e.properties.src,
			cropItems: [{
				value: 1,
				ratio: 0,
				desc: "原图比例"
			}, {
				value: 2,
				ratio: 1,
				desc: "1:1"
			}, {
				value: 3,
				ratio: 4 / 3,
				desc: "4:3"
			}, {
				value: 4,
				ratio: .75,
				desc: "3:4"
			}, {
				value: 5,
				ratio: 320 / 486,
				desc: "标准屏比例"
			}, {
				value: 6,
				ratio: 320 / 243,
				desc: "1/2屏比例"
			}, {
				value: 7,
				ratio: 320 / 162,
				desc: "1/3屏比例"
			}, {
				value: 8,
				ratio: -1,
				desc: "自定义",
				lock: !1
			}]
		}), g.currentItem = g.cropItems[0], c.cropItemChange = function(a) {
			null == a.lock && (g.cropItems[7].lock = !1), g.currentItem = a, b.$broadcast("cropItem.change", a)
		}, c.ok = function() {
			b.$broadcast("cropImage.ok", e)
		}, c.cancel = function() {
			c.$dismiss(e.properties.src)
		}
	}]).factory("imageCropService", ["$rootScope", "fileService", function(a, b) {
		var c = {};
		return c.cropImage = function(c) {
			b.cropImage(c).success(function(b) {
				if (b.success) {
					var d = {
						width: c.w,
						height: c.h,
						src: b.map.path,
						id: b.map.id
					};
					a.$broadcast("crop.success", d)
				} else alert(b.msg), a.$broadcast("crop.fail")
			}).error(function() {
				alert("网络连接超时，请稍后重试"), a.$broadcast("crop.fail")
			})
		}, c
	}]).directive("eqxCropPreview", ["imageCropService", "dataCacheService", function(a, b) {
		function c(a, c) {
			d(a, c), a.$on("$destroy", function() {
				m = !1
			}), a.$on("cropItem.change", function(a, b) {
				f(b)
			}), a.$on("cropImage.ok", function(d, e) {
				m || (l = e, b.clear("fileService"), g(a, c))
			}), a.$on("crop.success", function(b, c) {
				4 == l.type && h(c), a.$close(c)
			})
		}
		function d(a, b) {
			b.hide().load(function() {
				b.show();
				var c = $(".image_crop"),
					d = {
						width: c.width(),
						height: c.height()
					},
					f = d.width / d.height;
				j = {
					width: this.width,
					height: this.height
				};
				var g, h = j.width / j.height;
				j.width > d.width || j.height > d.height ? h > f ? (b.css({
					width: d.width,
					height: d.width / h
				}), g = {
					position: "absolute",
					top: "50%",
					marginTop: -d.width / h / 2
				}) : (b.css({
					width: d.height * h,
					height: d.height
				}), g = {
					margin: "auto"
				}) : g = {
					position: "absolute",
					left: "50%",
					top: "50%",
					marginLeft: -j.width / 2,
					marginTop: -j.height / 2
				}, k = {
					width: b.width(),
					height: b.height()
				}, e(a, b, g)
			})
		}
		function e(a, b, c) {
			var d = b.parent().attr("ctype"),
				e = k.width,
				f = k.height;
			if (3 == d || "square" == d) {
				var g = a.$parent.cropOption.currentItem;
				e > f ? e = f * g.ratio : f = e / g.ratio, b.Jcrop({
					keySupport: !1,
					aspectRatio: g.ratio,
					allowSelect: !1,
					setSelect: [0, 0, e, f],
					onRelease: function() {
						this.setOptions({
							setSelect: [0, 0, e, f]
						})
					}
				}, function() {
					i = this
				})
			} else b.Jcrop({
				keySupport: !1,
				aspectRatio: e / f,
				allowSelect: !1,
				setSelect: [0, 0, e, f],
				onRelease: function() {
					this.setOptions({
						setSelect: [0, 0, e, f]
					})
				}
			}, function() {
				i = this
			});
			$(".jcrop-holder").css(c)
		}
		function f(a) {
			var b, c = k.width,
				d = k.height;
			if (-1 === a.ratio) {
				var e = i.tellSelect();
				b = a.lock ? {
					aspectRatio: e.w / e.h,
					setSelect: [0, 0, e.w, e.h]
				} : {
					aspectRatio: 0,
					setSelect: [0, 0, e.w, e.h]
				}
			} else 0 === a.ratio ? b = {
				aspectRatio: c / d,
				setSelect: [0, 0, c, d]
			} : (c > d ? c = d * a.ratio : d = c / a.ratio, b = {
				aspectRatio: c / d,
				setSelect: [0, 0, c, d]
			});
			i.setOptions(b)
		}
		function g(b, c) {
			var d = i.tellSelect();
			if (d.w === k.width && d.h === k.height || 0 === d.w && 0 === d.h) {
				if (!l) return;
				return void b.$dismiss(l.properties.src)
			}
			m = !0;
			var e = j.width / k.width;
			d.w = parseInt(d.w * e, 10), d.h = parseInt(d.h * e, 10), d.x = parseInt(d.x * e, 10), d.y = parseInt(d.y * e, 10), d.src = c.attr("src").split(PREFIX_FILE_HOST)[1], d.x + d.w > j.width && (d.w = j.width - d.x), d.y + d.h > j.height && (d.h = j.height - d.y), 3 == l.type ? d.fileType = 0 : d.fileType = 1, delete d.x2, delete d.y2, l.cw && (d.cw = l.cw), a.cropImage(d)
		}
		function h(a) {
			var b = l;
			b.properties.src = a.src;
			var c = a.width / a.height,
				d = $("#" + b.id),
				e = $("#inside_" + b.id),
				f = e.width(),
				g = e.height(),
				h = f / g;
			c >= h ? (g = f / c, e.height(g), b.css.height = g, b.properties.height = g, d.outerHeight(g), d.outerWidth(f), d.css("marginLeft", 0), d.css("marginTop", 0)) : (f = g * c, e.width(f), b.css.width = f, b.properties.width = f, d.outerWidth(f), d.outerHeight(g), d.css("marginTop", 0), d.css("marginLeft", 0)), d.attr("src", PREFIX_FILE_HOST + a.src), b.properties.imgStyle = {}, b.properties.imgStyle.width = d.outerWidth(), b.properties.imgStyle.height = d.outerHeight(), b.properties.imgStyle.marginTop = d.css("marginTop"), b.properties.imgStyle.marginLeft = d.css("marginLeft")
		}
		var i, j, k, l, m = !1;
		return {
			link: c
		}
	}]), angular.module("scene.create.console.input", []), angular.module("scene.create.console.input").controller("InputConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "obj", function(a, b, c, d) {
		a.model = {
			title: d.title,
			type: d.type,
			required: d.properties.required
		}, a.authError = "";
		var e = "输入框";
		a.buttons = [{
			id: 1,
			text: e,
			btnStyle: {
				height: "40px",
				backgroundColor: "#fff",
				"text-align": "center",
				borderWidth: "1",
				borderStyle: "solid",
				borderColor: "#08a1ef",
				color: "rgb(0, 0, 0)"
			}
		}, {
			id: 2,
			text: e,
			btnStyle: {
				height: "40px",
				backgroundColor: "#fff",
				"text-align": "center",
				borderWidth: "1",
				borderStyle: "solid",
				borderColor: "#fff",
				color: "rgb(0, 0, 0)"
			}
		}, {
			id: 3,
			text: e,
			btnStyle: {
				height: "40px",
				backgroundColor: "#fff",
				"text-align": "center",
				borderWidth: "1",
				borderStyle: "solid",
				borderColor: "#f6b223",
				color: "rgb(0, 0, 0)"
			}
		}, {
			id: 4,
			text: e,
			btnStyle: {
				height: "40px",
				backgroundColor: "#fff",
				"text-align": "center",
				borderWidth: "1",
				borderStyle: "solid",
				borderColor: "#333",
				color: "rgb(0, 0, 0)"
			}
		}, {
			id: 5,
			text: e,
			btnStyle: {
				height: "40px",
				backgroundColor: "#fff",
				"text-align": "center",
				borderWidth: "1",
				borderStyle: "solid",
				borderColor: "#a0d86b",
				color: "rgb(0, 0, 0)"
			}
		}, {
			id: 6,
			text: e,
			btnStyle: {
				height: "40px",
				backgroundColor: "#fff",
				"text-align": "center",
				borderWidth: "1",
				borderStyle: "solid",
				borderColor: "#f66",
				color: "rgb(0, 0, 0)"
			}
		}], angular.forEach(a.buttons, function(b, c) {
			"" !== a.model.title && d.css.borderColor && d.css.borderColor == b.btnStyle.borderColor && (a.btnIndex = c)
		}), a.confirm = function() {
			return a.model.title && 0 !== a.model.title.length ? void a.$close(a.model) : (a.authError = "输入框名称不能为空", void $('input[type="text"]').focus())
		}, a.cancel = function() {
			a.$dismiss()
		}, a.chooseTabButton = function(b, c) {
			a.model.btnStyle = b.btnStyle, a.btnIndex = c
		}
	}]), angular.module("scene.create.console.linkComponent", []), angular.module("scene.create.console.linkComponent").controller("LinkComponentConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "obj", "$modal", "sceneService", function(a, b, c, d, e, f) {
		a.model = {
			title: d.properties.title,
			imgSrc: d.properties.imgSrc,
			url: {
				link: "external",
				externalLink: "http://"
			}
		}, d.properties.url && (angular.isNumber(d.properties.url) ? (a.model.url.link = "internal", a.model.url.internalLink = d.properties.url) : (a.model.url.link = "external", a.model.url.externalLink = decodeURIComponent(d.properties.url.split("=")[2]))), a.authError = "", a.buttons = [{
			id: 1,
			text: "点我购买",
			btnStyle: {
				width: "100px",
				backgroundColor: "rgb(244, 113, 31)",
				height: "30px",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 2,
			text: "点开链接",
			btnStyle: {
				width: "100px",
				backgroundColor: "rgb(253, 175, 7)",
				height: "30px",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 3,
			text: "马上购买",
			btnStyle: {
				width: "100px",
				backgroundColor: "rgb(121, 196, 80)",
				height: "30px",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 4,
			text: "关注我们",
			btnStyle: {
				width: "100px",
				height: "30px",
				backgroundColor: "#fff",
				"text-align": "center",
				border: "1px solid #3FB816",
				"line-height": "30px",
				color: "rgb(0, 0, 0)"
			}
		}], a.openImageModal = function() {
			e.open({
				windowClass: "img_console console",
				templateUrl: "scene/console/bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1
						}
					}
				}
			}).result.then(function(b) {
				a.model.title = "", a.btnIndex = -1, a.model.btnStyle = {
					width: "115px",
					height: "115px",
					"line-height": "1",
					backgroundColor: "transparent"
				}, a.model.imgSrc = d.properties.imgSrc = b.data
			}, function(a) {})
		}, angular.forEach(a.buttons, function(b, c) {
			"" !== a.model.title && d.css.backgroundColor && d.css.backgroundColor == b.btnStyle.backgroundColor && (a.btnIndex = c)
		}), a.confirm = function() {
			return null != a.model.imgSrc || a.model.title && 0 !== a.model.title.length ? a.model.url.internalLink || a.model.url.externalLink ? (d.properties.url = "internal" === a.model.url.link ? a.model.url.internalLink : a.model.url.externalLink, d.properties.title = a.model.title, void a.$close(a.model)) : void(a.authError = "链接不能为空") : (a.authError = "按钮名称不能为空", void $("#buttonName").focus())
		}, a.cancel = function() {
			a.$dismiss()
		}, a.chooseTabButton = function(b, c) {
			a.model.title = b.text, a.model.btnStyle = b.btnStyle, a.btnIndex = c, a.model.imgSrc = d.properties.imgSrc = null
		}, a.removeLink = function(b) {
			"external" == b ? a.model.url.externalLink = null : "internal" == b && (a.model.url.internalLink = 0), a.model.url.link = ""
		}, a.changed = function() {
			"external" == a.model.url.link ? a.model.url.internalLink = 0 : a.model.url.externalLink = "http://"
		}, a.selectRadio = function(b) {
			"external" == b ? a.model.url.link = "external" : "internal" == b && (a.model.url.link = "internal"), a.changed()
		}, a.getPageNames = function() {
			var b = d.sceneId;
			f.getPageNames(b).then(function(b) {
				a.pageList = b.data.list, a.pageList.unshift({
					id: 0,
					name: "无"
				}), angular.forEach(a.pageList, function(a, b) {
					a.name || (a.name = "第" + a.num + "页")
				}), d.properties.url && angular.isNumber(d.properties.url) && (a.model.url.link = "internal", a.model.url.internalLink = d.properties.url)
			})
		}, a.getPageNames()
	}]), angular.module("scene.create.console.link", ["services.scene"]), angular.module("scene.create.console.link").directive("limitLinkLength", ["ModalService", function(a) {
		var b = 40;
		return {
			restrict: "A",
			require: "?ngModel",
			link: function(c, d, e, f) {
				d.blur(function() {
					var c = d.val() || "";
					c.length > b && a.openMsgDialog({
						msg: '<div align="left">提示：链接过长有可能会导致链接组件打不开，建议生成短链接后再使用。生成短链接地址<a href="http://dwz.cn" target="_blank"><font color="#08A1EF">http://dwz.cn</font></a></div>'
					}, function() {})
				})
			}
		}
	}]), angular.module("scene.create.console.link").controller("LinkConsoleCtrl", ["$scope", "$timeout", "obj", "sceneService", function(a, b, c, d) {
		a.url = {}, a.url.externalLink = "http://";
		var e;
		a.confirm = function() {
			"external" == a.url.link ? e = a.url.externalLink : "internal" == a.url.link && (e = a.url.internalLink.id), a.$close(e)
		}, a.cancel = function() {
			a.$dismiss()
		}, a.removeLink = function(b) {
			"external" == b ? a.url.externalLink = "http://" : "internal" == b && (a.url.internalLink = a.pageList[0]), a.url.link = ""
		}, a.changed = function() {
			"external" == a.url.link ? a.url.internalLink = a.pageList[0] : a.url.externalLink = "http://"
		}, a.selectRadio = function(b) {
			a.url.link || ("external" == b ? a.url.link = "external" : "internal" == b && (a.url.link = "internal"))
		}, a.getPageNames = function() {
			var b = c.sceneId;
			d.getPageNames(b).then(function(b) {
				a.pageList = b.data.list, a.pageList.unshift({
					id: 0,
					name: "无"
				}), a.url.internalLink = a.pageList[0], angular.forEach(a.pageList, function(b, d) {
					b.name || (b.name = "第" + b.num + "页"), c.properties.url && c.properties.url == b.id && (a.url.link = "internal", a.url.internalLink = b)
				}), c.properties.url && isNaN(c.properties.url) && (a.url.link = "external", a.url.externalLink = decodeURIComponent(c.properties.url.split("=")[2]))
			})
		}, a.getPageNames()
	}]), angular.module("scene.create.console.map", ["app.directives.comp.editor"]), angular.module("scene.create.console.map").controller("MapConsoleCtrl", ["$scope", "sceneService", "$timeout", function(a, b, c) {
		var d = null,
			e = null;
		a.address = {
			address: "",
			lat: "",
			lng: ""
		}, a.search = {
			address: ""
		}, a.searchResult = [], c(function() {
			d = new BMap.Map("l-map"), d.addControl(new BMap.NavigationControl), d.centerAndZoom(new BMap.Point(116.404, 39.915), 12);
			var b = {
				onSearchComplete: function(b) {
					e.getStatus() == BMAP_STATUS_SUCCESS && (a.searchResult = b.Fn, a.$apply())
				}
			};
			e = new BMap.LocalSearch(d, b)
		}), a.searchAddress = function() {
			e.search(a.search.address)
		}, a.setPoint = function(b, c, e) {
			a.address.address = e, a.address.lat = b, a.address.lng = c, d.clearOverlays();
			var f = new BMap.Point(c, b),
				g = new BMap.Marker(f);
			d.addOverlay(g);
			var h = new BMap.Label(e, {
				offset: new BMap.Size(20, -10)
			});
			g.setLabel(h), d.centerAndZoom(f, 12)
		}, a.resetAddress = function() {
			a.$close(a.address)
		}, a.cancel = function() {
			a.$dismiss()
		}
	}]), angular.module("scene.create.console.micro", ["app.directives.addelement", "services.scene"]), angular.module("scene.create.console.micro").controller("MicroConsoleCtrl", ["$scope", "$timeout", "localizedMessages", "obj", "sceneService", function(a, b, c, d, e) {
		a.model || (a.model = {});
		var f = [];
		a.isSelected = [], a.backgroundColors = [{
			backgroundColor: "#D34141"
		}, {
			backgroundColor: "#000"
		}, {
			backgroundColor: "#23A3D3"
		}, {
			backgroundColor: "#79C450"
		}, {
			backgroundColor: "#fafafa"
		}], a.labelNames = [{
			id: 1,
			title: "栏目一",
			color: {
				backgroundColor: ""
			}
		}, {
			id: 2,
			title: "栏目二",
			color: {
				backgroundColor: ""
			}
		}, {
			id: 3,
			title: "栏目三",
			color: {
				backgroundColor: ""
			}
		}, {
			id: 4,
			title: "栏目四",
			color: {
				backgroundColor: ""
			}
		}], a.model.color = d.properties.labels[0].color.backgroundColor, a.selectColor = function(b) {
			a.model.color = b.backgroundColor, angular.forEach(a.labelNames, function(a, c) {
				a.color.backgroundColor && (a.color.backgroundColor = b.backgroundColor)
			})
		}, angular.forEach(d.properties.labels, function(b, c) {
			angular.forEach(a.labelNames, function(a, c) {
				b.id == a.id && (a.title = b.title, a.color.backgroundColor = b.color.backgroundColor, a.link = b.link, a.selected = !0, b.mousedown = !1)
			})
		}), a.confirm = function() {
			f = [];
			var b = 0,
				c = 0;
			angular.forEach(a.labelNames, function(a, d) {
				a.selected && (a.link ? f.push(a) : c++, b++)
			}), 2 > b ? alert("导航标签不能少于两个！") : c > 0 ? alert("每个导航必须有链接页面！") : a.$close(f)
		}, a.cancel = function() {
			a.$dismiss()
		}, a.switchLabel = function(b, c) {
			a.label = b, b.selected ? a.labelIndex == c ? (b.color.backgroundColor = "", b.selected = !1, b.mousedown = !1) : (a.labelIndex = c, b.mousedown = !0) : (b.color.backgroundColor = a.model.color, a.labelIndex = c, b.selected = !0, b.mousedown = !0), b.mousedown ? (a.model.title = b.title, b.link ? a.model.link = a.pageList[b.link] : a.model.link = a.pageList[0]) : (a.model.title = "", a.model.link = a.pageList[0])
		}, a.selectLink = function(b) {
			a.label.mousedown && (a.label.link = b.num, console.log(a.labelNames))
		}, a.changeLabelName = function() {
			a.label.mousedown && (a.label.title = a.model.title)
		}, a.getPageNames = function() {
			var b = d.sceneId;
			e.getPageNames(b).then(function(b) {
				a.pageList = b.data.list, a.pageList.unshift({
					id: 0,
					name: "无"
				}), angular.forEach(a.pageList, function(a, b) {
					a.name || (a.name = "第" + a.num + "页")
				}), a.model.link = a.pageList[0]
			})
		}, a.getPageNames()
	}]), angular.module("scene.create.console.pictures", ["services.file"]).controller("picturesCtrl", ["$scope", "$timeout", "$rootScope", "$modal", "picturesService", "obj", function(a, b, c, d, e, f) {
		var g = 530,
			h = 265,
			i = a.picStyles = utilPictures.getPicStyle();
		a.currentImageIndex = -1;
		var j = angular.copy(f),
			k = a.position = j.css;
		if (null != k.width && null != k.height) {
			var l = k.width / k.height,
				m = g / h;
			l > m ? (k.width = g, k.height = g / l) : (k.height = h, k.width = h * l)
		}
		var n = a.properties = j.properties;
		n.autoPlay = null == n.autoPlay ? !0 : n.autoPlay, n.interval = null == n.interval ? 2e3 : n.interval, n.picStyle = null == n.picStyle ? i[0] : utilPictures.getPicStyle(n.picStyle), n.bgColor = null == n.bgColor ? "rgba(255,255,255,1)" : n.bgColor, n.children = null == n.children ? [] : n.children, e.setImages(n.children), a.authError = "", a.choosePic = function() {
			return n.children.length >= 6 ? void(a.authError = "最多可选择6张图片") : void d.open({
				windowClass: "console img_console",
				templateUrl: "scene/console/bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1,
							type: "p",
							count: n.children.length,
							elemDef: f
						}
					}
				}
			}).result.then(function(a) {
				$.each(a.selectedImages, function(a, b) {
					e.addImages({
						src: b.src,
						desc: "",
						height: b.height,
						width: b.width
					})
				})
			}, function() {})
		}, a.ok = function() {
			console.log(n);
			return 0 === n.children.length ? void(a.authError = "请选择图片") : (n.picStyle = n.picStyle.value, f.properties = n, void a.$close(n))
		}, a.cancel = function() {
			a.$dismiss()
		}, a.$on("currentImage.update", function(b, c) {
			a.currentImageIndex = c
		}), a.$on("images.add", function(a, b) {
			n.children = b
		}), a.$on("images.update", function(a, b) {
			n.children = b
		})
	}]).factory("picturesService", ["$rootScope", "fileService", function(a, b) {
		var c, d, e = {},
			f = [];
		return e.setJcrop = function(b) {
			a.$broadcast("jcrop.update", b)
		}, e.setImageSize = function(b) {
			a.$broadcast("image.update", b)
		}, e.setCurrentImage = function(b) {
			d = b, a.$broadcast("currentImage.update", b)
		}, e.getCurrentImage = function() {
			return d
		}, e.addImages = function(b) {
			f.push(b), a.$broadcast("images.add", f)
		}, e.updateImages = function(b, c) {
			f.splice(b, 1, c), a.$broadcast("images.update", f)
		}, e.deleteImages = function(b) {
			f.splice(b, 1), a.$broadcast("images.update", f)
		}, e.setImages = function(a) {
			return f = a
		}, e.getImages = function() {
			return f
		}, e.setProperties = function(a) {
			c = a
		}, e.getProperties = function() {
			return c
		}, e.cropImage = function(c) {
			b.cropImage(c).success(function(b) {
				if (b.success) {
					var d = {
						width: c.w,
						height: c.h,
						desc: "",
						src: b.obj
					};
					a.$broadcast("crop.success", d)
				} else alert(b.msg)
			}).error(function() {
				alert("网络连接超时，请稍后重试")
			})
		}, e
	}]).directive("eqxPicturesImageCrop", ["$compile", "picturesService", function(a, b) {
		return {
			link: function(c, d) {
				var e = $(d),
					f = $(".pic-preview"),
					g = {
						width: f.width(),
						height: f.height()
					};
				c.showOperation = !0;
				var h, i = '<div class="operation" ng-show="!showOperation"><a class="quxiao" ng-click="cropCancel()">取消</a><a class="finish" ng-click="cropOk()">完成</a></div>';
				c.$on("image.update", function(a, b) {
					h = {
						width: b.width,
						height: b.height
					}
				}), c.$on("jcrop.update", function(d, j) {
					f.append(a(i)(c)), c.showOperation = !0, c.$apply();
					var k = f.children("img"),
						l = {
							width: k.width(),
							height: k.height()
						};
					e.removeClass("hover").unbind("click").click(function() {
						var a = b.getImages();
						0 !== a.length && (c.showOperation = $(this).hasClass("hover"), c.showOperation ? ($(this).removeClass("hover"), j.release(), j.disable()) : ($(this).addClass("hover"), j.setSelect([0, 0, l.width, l.height]), j.enable()))
					}), c.cropOk = function() {
						var a = j.tellSelect();
						if (!(a.w === g.width && a.h === g.height || 0 === a.w && 0 === a.h)) {
							var c = h.width / l.width;
							a.w = parseInt(a.w * c, 10), a.h = parseInt(a.h * c, 10), a.x = parseInt(a.x * c, 10), a.y = parseInt(a.y * c, 10), a.x2 = parseInt((a.w + a.x) * c, 10), a.y2 = parseInt((a.h + a.y) * c, 10), a.src = k.attr("src").split(PREFIX_FILE_HOST)[1], b.cropImage(a)
						}
					}, c.cropCancel = function() {
						c.showOperation = !0, e.removeClass("hover"), j.release(), j.disable()
					}
				})
			}
		}
	}]).directive("eqxPicturesImagePreview", ["picturesService", function(a) {
		return {
			link: function(b, c) {
				var d, e, f = $(c),
					g = $(".pic-preview"),
					h = {
						width: g.width(),
						height: g.height()
					},
					i = h.width / h.height;
				f.hide(), f.load(function() {
					f.show(), e = {
						width: this.width,
						height: this.height
					}, a.setImageSize(e);
					var b, c = e.width / e.height;
					c > i ? ($(this).css({
						width: h.width,
						height: h.width / c
					}), b = {
						position: "absolute",
						top: "50%",
						marginTop: -h.width / c / 2
					}) : ($(this).css({
						width: h.height * c,
						height: h.height
					}), b = {
						margin: "auto"
					}), f.Jcrop({
						keySupport: !1,
						aspectRatio: i
					}, function() {
						d = this
					}), $(".jcrop-holder").css(b), a.setJcrop(d), d.disable()
				})
			}
		}
	}]).directive("eqxPicturesImageClick", ["$compile", "picturesService", function(a, b) {
		function c(b, c) {
			$(".pic-preview").html(a('<img eqx-pictures-image-preview ng-src="' + c + '" />')(b))
		}
		return {
			link: function(a, d) {
				var e = $(d);
				e.click(function() {
					if (!e.hasClass("hover")) {
						var d = e.index();
						b.setCurrentImage(d), c(a, $(this).find(".pic-img").attr("src"))
					}
				}), e.children(".delete-img").click(function(c) {
					c.stopPropagation(), e.hasClass("hover") && $(".pic-preview").empty();
					var d = e.index();
					b.deleteImages(d);
					var f = b.getCurrentImage();
					f > d ? b.setCurrentImage(--f) : d === f && b.setCurrentImage(-1), a.$apply()
				}), a.$on("crop.success", function(d, f) {
					if (e.hasClass("hover")) {
						var g = PREFIX_FILE_HOST + f.src;
						c(a, g);
						var h = e.index();
						b.updateImages(h, f)
					}
				})
			}
		}
	}]), angular.module("scene.create.console.pictures1", ["services.file"]).controller("pictures1Ctrl", ["$translate", "$rootScope", "$scope", "$modal", "picturesCropService", "obj", function(a, b, c, d, e, f) {
		function g(a) {
			i.currentImage = {
				index: a,
				src: m.children[a].src + "?t=" + Date.now()
			}
		}
		function h(a, b) {
			$("<img>").attr("src", PREFIX_FILE_HOST + b).load(function() {
				$.extend(o.items[a], {
					coordinate: {
						x: 0,
						y: 0,
						x2: this.width,
						y2: this.height,
						w: this.width,
						h: this.height,
						src: b,
						fileType: 1,
						index: a
					},
					realSize: {
						width: this.width,
						height: this.height
					}
				})
			})
		}
		var i = c.imageOption = {
			title: "图集组件",
			desc: "通过图片裁切可制作超酷图集",
			showCrop: !1,
			showLoading: !1,
			currentImage: {
				index: -1,
				src: ""
			}
		},
			j = c.cropOption = {
				showItems: !0,
				imgSrc: f.properties.src,
				cropItems: [{
					value: 2,
					ratio: 1,
					desc: "1:1"
				}, {
					value: 3,
					ratio: 4 / 3,
					desc: "4:3"
				}, {
					value: 4,
					ratio: .75,
					desc: "3:4"
				}, {
					value: 5,
					ratio: 320 / 486,
					desc: "标准屏比例"
				}, {
					value: 6,
					ratio: 320 / 243,
					desc: "1/2屏比例"
				}, {
					value: 7,
					ratio: 320 / 162,
					desc: "1/3屏比例"
				}, {
					value: 8,
					ratio: -1,
					desc: "自定义",
					lock: !1
				}]
			};
		j.currentItem = j.cropItems[0];
		var k = c.picStyles = utilPictures.getPicStyle(),
			l = angular.copy(f),
			m = c.properties = l.properties;
		m.autoPlay = null == m.autoPlay ? !0 : m.autoPlay, m.interval = null == m.interval ? 2e3 : m.interval, m.picStyle = null == m.picStyle ? k[0] : utilPictures.getPicStyle(m.picStyle), m.bgColor = null == m.bgColor ? "rgba(255,255,255,0)" : m.bgColor, m.children = null == m.children ? [] : m.children, m.children.length > 0 && (i.showCrop = !0, g(0));
		for (var n = 0; 6 > n; n++) m.children[n] ? h(n, m.children[n].src) : m.children.push({});
		var o = e.getCoordinateObj();
		c.cropItemChange = function(a) {
			null == a.lock && (j.cropItems[6].lock = !1), j.currentItem = a, b.$broadcast("cropItem.change", a)
		}, c.addPictures = function(a, b, c) {
			a.stopPropagation();
			var e = 0;
			c ? $.each(m.children, function(a, b) {
				b.src && e++
			}) : e = 5, d.open({
				windowClass: "console img_console",
				templateUrl: "scene/console/bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1,
							type: "p",
							count: e,
							elemDef: f
						}
					}
				}
			}).result.then(function(a) {
				i.showCrop = !0;
				var d = b,
					e = 0,
					f = m.children.length;
				if (c) for (; f > d;) {
					if (!m.children[d++].src) {
						var j = a.selectedImages[e++];
						m.children[d - 1] = {
							src: j.src,
							desc: "",
							height: j.height,
							width: j.width
						}, h(d - 1, j.src), g(b)
					}
					if (e === a.selectedImages.length) break;
					d === f && (d = 0)
				} else {
					var k = a.selectedImages[0];
					m.children[b] = {
						src: k.src,
						desc: "",
						height: k.height,
						width: k.width
					}, h(b, k.src), g(b)
				}
			})
		}, c.setPicturesSize = function(a) {
			var b, c, d, e = a.children[0],
				g = e.width / e.height;
			l.css.width || l.css.height ? (b = l.css.width / l.css.height, g > b ? (c = l.css.width, d = c / g) : (d = l.css.height, c = d * g)) : (b = 2, g > b ? (c = 320, d = c / g) : (d = 160, c = d * g)), f.css.width = c, f.css.height = d
		}, c.delPicture = function(a) {
			m.children[a] = {}, o.items[a] = {}, a === i.currentImage.index && (i.currentImage.index = -1, b.$broadcast("image.delete", a))
		}, c.changePicture = function(a) {
			i.currentImage.index !== a && g(a)
		}, c.ok = function() {
			return 0 === m.children.length ? void(i.desc = "请选择图片，最多添加6张") : void(e.getCropping() || (i.showLoading = !0, b.$broadcast("cropImage.ok", m)))
		}, c.cancel = function() {
			c.$dismiss()
		}, c.$on("crop.complete.all", function(a, b) {
			m.picStyle = m.picStyle.value, $.each(b, function(a, b) {
				m.children[b.index] = b
			});
			for (var d = angular.copy(m), e = d.children, f = 5; f >= 0; f--) e[f].src || e.splice(f, 1);
			c.setPicturesSize(d), c.$close(d)
		}), c.$on("crop.fail", function() {
			e.setCropping(!1), i.showLoading = !1
		})
	}]).factory("picturesCropService", ["$rootScope", "fileService", function(a, b) {
		var c, d = {},
			e = [],
			f = !1,
			g = 0,
			h = 0;
		return d.getCoordinateObj = function() {
			return c
		}, d.initCoordinateObj = function() {
			c = {
				ratio: null,
				items: []
			};
			for (var a = 0; 6 > a; a++) c.items.push({})
		}, d.setCropCount = function(a) {
			a ? g = a : g++
		}, d.getCropCount = function() {
			return g
		}, d.setCropping = function(a) {
			f = a
		}, d.getCropping = function() {
			return f
		}, d.cropImage = function(c) {
			b.cropImage(c).success(function(b) {
				if (b.success) {
					var d = {
						width: c.w,
						height: c.h,
						src: b.map.path,
						desc: "",
						index: b.map.index
					};
					e.push(d), h++, g === h && (g = h = 0, a.$broadcast("crop.complete.all", angular.copy(e)), e.length = 0)
				} else alert(b.msg), a.$broadcast("crop.fail")
			}).error(function() {
				alert("网络连接超时，请稍后重试"), a.$broadcast("crop.fail")
			})
		}, d.initCoordinateObj(), d
	}]).directive("eqxPicturesCropPreview", ["picturesCropService", function(a) {
		function b(b, d) {
			var e = a.getCoordinateObj();
			c(d, e), b.$on("$destroy", function() {
				i = j = k = null, a.initCoordinateObj(), a.setCropping(!1)
			}), b.$on("cropItem.change", function(a, b) {
				g(b)
			}), b.$on("image.delete", function() {
				$(".image_crop").children("div").remove()
			}), b.$on("cropImage.ok", function(a, c) {
				h(b, c, e)
			})
		}
		function c(a, b) {
			var c = $(".image_crop"),
				e = {
					width: c.width(),
					height: c.height()
				},
				f = e.width / e.height;
			a.hide().load(function() {
				var c = {
					width: this.width,
					height: this.height
				};
				a.removeAttr("style").show();
				var g, h = c.width / c.height;
				c.width > e.width || c.height > e.height ? h > f ? (a.css({
					width: e.width,
					height: e.width / h
				}), g = {
					position: "absolute",
					top: "50%",
					marginTop: -e.width / h / 2
				}) : (a.css({
					width: e.height * h,
					height: e.height
				}), g = {
					margin: "auto"
				}) : g = {
					position: "absolute",
					left: "50%",
					top: "50%",
					marginLeft: -c.width / 2,
					marginTop: -c.height / 2
				}, j = {
					width: a.width(),
					height: a.height()
				};
				var i = a.attr("index");
				a.attr("src");
				$.extend(b.items[i], {
					displaySize: j
				}), d(a, b, g, i)
			})
		}
		function d(a, b, c, d) {
			i && (i.destroy(), i = null);
			var f = j.width,
				g = j.height,
				h = b.items[d].coordinate;
			h && (h.w > f && (h.w = f, h.h = f / b.ratio), h.h > g && (h.h = g, h.w = g * b.ratio), h.x2 = h.x + h.w, h.y2 = h.y + h.h);
			var l;
			l = k && -1 === k.ratio ? 0 : b.ratio || f / g, a.Jcrop({
				keySupport: !1,
				aspectRatio: l,
				allowSelect: !1,
				setSelect: h ? [h.x, h.y, h.x2, h.y2] : [0, 0, f, g],
				onRelease: function() {
					this.setOptions({
						setSelect: [0, 0, f, g]
					})
				},
				onSelect: function() {
					i && e(d, b)
				}
			}, function() {
				i = this, e(d, b)
			}), $(".jcrop-holder").css(c)
		}
		function e(a, b) {
			var c = i.tellSelect();
			b.ratio = c.w / c.h, $.extend(b.items[a].coordinate, c), $.each(b.items, function(a, c) {
				var d = c.coordinate;
				d && f(d, b)
			})
		}
		function f(a, b) {
			var c = a.w / a.h;
			c > b.ratio ? (a.w = a.h * b.ratio, a.x2 = a.x + a.w) : (a.h = a.w / b.ratio, a.y2 = a.y + a.h)
		}
		function g(a) {
			k = a;
			var b, c = j.width,
				d = j.height;
			if (-1 === a.ratio) {
				var e = i.tellSelect();
				b = a.lock ? {
					aspectRatio: e.w / e.h,
					setSelect: [0, 0, e.w, e.h]
				} : {
					aspectRatio: 0,
					setSelect: [0, 0, e.w, e.h]
				}
			} else c > d ? c = d * a.ratio : d = c / a.ratio, b = {
				aspectRatio: c / d,
				setSelect: [0, 0, c, d]
			};
			i.setOptions(b)
		}
		function h(b, c, d) {
			var e = [];
			$.each(d.items, function(b, c) {
				var g = c.coordinate,
					h = c.realSize;
				if (g && h) if (f(g, d), Math.ceil(h.width / h.height * 100) !== Math.ceil(g.w / g.h * 100)) {
					if (c.displaySize) {
						var i = h.width / c.displaySize.width;
						g.w = Math.ceil(g.w * i), g.h = Math.ceil(g.h * i), g.x = Math.ceil(g.x * i), g.y = Math.ceil(g.y * i)
					} else {
						var j = g.w / g.h,
							k = h.width / h.height;
						k > j ? (g.w = Math.ceil(h.height * j), g.h = h.height) : (g.w = h.width, g.h = Math.ceil(h.width / j))
					}
					g.x + g.w > c.realSize.width && (g.w = h.width - g.x), g.y + g.h > c.realSize.height && (g.h = h.height - g.y), g.w === h.width && g.h === h.height || 0 === g.w || 0 === g.h ? e.push({
						src: g.src,
						desc: "",
						height: g.h,
						width: g.w
					}) : (delete g.x2, delete g.y2, a.setCropping(!0), a.cropImage(g), a.setCropCount())
				} else e.push({
					src: g.src,
					desc: "",
					height: g.h,
					width: g.w
				})
			}), 0 === a.getCropCount() && (c.picStyle = c.picStyle.value, c.children = e, b.setPicturesSize(c), b.$close(c))
		}
		var i, j, k;
		return {
			link: b
		}
	}]), angular.module("scene.create.console.radio.checkbox", []), angular.module("scene.create.console.radio.checkbox").directive("stopPropagation", function() {
		return function(a, b) {
			b.bind("keydown", function(a) {
				a.stopPropagation()
			})
		}
	}), angular.module("scene.create.console.radio.checkbox").controller("RadioCheckboxConsoleCtrl", ["$translate", "$scope", "$timeout", "localizedMessages", "obj", "ModalService", function(a, b, c, d, e, f) {
		function g(a) {
			var b = $("#optionGroupContainer"),
				c = b.find(".option-group").eq(a),
				d = 72,
				e = c.position().top;
			e > d && b.scrollTop(b.scrollTop() + (e - d))
		}
		var h = JSON.parse(e.choices);
		b.model = {
			title: e.title,
			type: e.type,
			options: h.options,
			required: e.properties.required
		}, b.buttons = [{
			id: 1,
			btnStyle: {
				backgroundColor: "#08a1ef",
				height: "30px",
				"line-height": "30px",
				borderWidth: "1px",
				borderStyle: "solid",
				borderColor: "#08a1ef",
				color: "rgb(255, 255, 255)"
			},
			properties: {
				titleStyle: {
					backgroundColor: "#08a1ef",
					color: "#ffffff"
				},
				optionStyle: {
					borderBottomWidth: "1px",
					borderBottomStyle: "solid",
					borderBottomColor: "#08a1ef"
				}
			}
		}, {
			id: 2,
			btnStyle: {
				backgroundColor: "#fff",
				height: "30px",
				"line-height": "30px",
				borderWidth: "1px",
				borderStyle: "solid",
				borderColor: "#fff",
				color: "rgb(0, 0, 0)"
			},
			properties: {
				titleStyle: {
					backgroundColor: "#fff",
					color: "#000"
				},
				optionStyle: {
					borderBottomWidth: "1px",
					borderBottomStyle: "solid",
					borderBottomColor: "#fff"
				}
			}
		}, {
			id: 3,
			btnStyle: {
				backgroundColor: "#f6b223",
				height: "30px",
				"line-height": "30px",
				borderWidth: "1px",
				borderStyle: "solid",
				borderColor: "#f6b223",
				color: "rgb(255, 255, 255)"
			},
			properties: {
				titleStyle: {
					backgroundColor: "#f6b223",
					color: "#ffffff"
				},
				optionStyle: {
					borderBottomWidth: "1px",
					borderBottomStyle: "solid",
					borderBottomColor: "#f6b223"
				}
			}
		}, {
			id: 4,
			btnStyle: {
				backgroundColor: "#333",
				height: "30px",
				"line-height": "30px",
				borderWidth: "1px",
				borderStyle: "solid",
				borderColor: "#333",
				color: "rgb(255, 255, 255)"
			},
			properties: {
				titleStyle: {
					backgroundColor: "#333",
					color: "#ffffff"
				},
				optionStyle: {
					borderBottomWidth: "1px",
					borderBottomStyle: "solid",
					borderBottomColor: "#333"
				}
			}
		}, {
			id: 5,
			btnStyle: {
				backgroundColor: "#a0d86b",
				height: "30px",
				"line-height": "30px",
				borderWidth: "1px",
				borderStyle: "solid",
				borderColor: "#a0d86b",
				color: "rgb(255, 255, 255)"
			},
			properties: {
				titleStyle: {
					backgroundColor: "#a0d86b",
					color: "#ffffff"
				},
				optionStyle: {
					borderBottomWidth: "1px",
					borderBottomStyle: "solid",
					borderBottomColor: "#a0d86b"
				}
			}
		}, {
			id: 6,
			btnStyle: {
				backgroundColor: "#ff6666",
				height: "30px",
				"line-height": "30px",
				borderWidth: "1px",
				borderStyle: "solid",
				borderColor: "#ff6666",
				color: "rgb(255, 255, 255)"
			},
			properties: {
				titleStyle: {
					backgroundColor: "#ff6666",
					color: "#ffffff"
				},
				optionStyle: {
					borderBottomWidth: "1px",
					borderBottomStyle: "solid",
					borderBottomColor: "#ff6666"
				}
			}
		}], angular.forEach(b.buttons, function(a, c) {
			e.properties.titleStyle && e.properties.titleStyle.backgroundColor == a.properties.titleStyle.backgroundColor && (b.btnIndex = c)
		}), b.chooseTabButton = function(a, c) {
			b.model.btnStyle = a.btnStyle, b.btnIndex = c, $.extend(e.css, {
				borderStyle: a.btnStyle.borderStyle,
				borderColor: a.btnStyle.borderColor
			})
		}, b.authError = "", b.addNewOption = function(a) {
			b.model.options.length < 8 ? (++h.seq, b.model.options.splice(a + 1, 0, {
				id: h.seq,
				label: "选项" + h.seq
			}), setTimeout(function() {
				g(a)
			})) : f.openMsgDialog({
				msg: "（您可以添加八个选项，每个选项最多请不要超过41字）"
			})
		}, b.deleteTheOption = function(a) {
			b.model.options.length > 1 && f.openConfirmDialog({
				msg: "您确定要删除内容为“" + b.model.options[a].label + "”的选项？<br/>删除选项后，将导致该选项已收集的数据无法正确地显示。"
			}, function() {
				b.model.options.splice(a, 1)
			})
		}, b.confirm = function() {
			return b.model.title && 0 !== b.model.title.length ? (angular.forEach(b.model.options, function(a) {
				delete a.$$hashKey
			}), e.choices = JSON.stringify(h), e.properties.required = b.model.required, (b.btnIndex || 0 === b.btnIndex) && $.extend(e.properties, b.buttons[b.btnIndex].properties), void b.$close(b.model)) : (b.authError = "输入框名称不能为空", void $("#radioTitle").focus())
		}, b.cancel = function() {
			b.$dismiss()
		}
	}]), angular.module("scene.create.console.randomevent", ["app.directives.responsiveImage"]), angular.module("scene.create.console.randomevent").controller("RandomEventCtrl", ["$translate", "$scope", "$rootScope", "randomEventService", "$modal", "obj", function(a, b, c, d, e, f) {
		f.properties.pics.length ? b.picList = f.properties.pics : b.picList = [], b.delImage = function(a) {
			b.picList.splice(a, 1)
		}, b.replaceImage = function(a) {
			console.log(a);
			e.open({
				windowClass: "console img_console",
				templateUrl: "scene/console/bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1,
							type: "n",
							count: 9,
							elemDef: f
						}
					}
				}
			}).result.then(function(c) {
				b.picList[a] = c.selectedImages[0]
			}, function() {})
		}, b.choosePic = function() {
			return b.picList.length >= 10 ? void(b.authError = "最多可选择10张图片") : void e.open({
				windowClass: "console img_console",
				templateUrl: "scene/console/bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1,
							type: "n",
							count: b.picList.length,
							elemDef: f
						}
					}
				}
			}).result.then(function(a) {
				$.each(a.selectedImages, function(a, c) {
					b.picList.unshift(c)
				})
			}, function() {})
		}, b.confirm = function() {
			b.$close(b.picList)
		}, b.cancel = function() {
			b.$dismiss()
		}
	}]).factory("randomEventService", ["$rootScope", function(a) {
		var b = {};
		return b
	}]), angular.module("scene.create.console.rating", ["common.directives.inputColor"]), angular.module("scene.create.console.rating").controller("RatingConsoleCtrl", ["$translate", "$scope", "$timeout", "localizedMessages", "obj", function(a, b, c, d, e) {
		b.model = {
			title: e.title,
			properties: {
				icon: e.properties.icon,
				size: e.properties.size,
				color: e.properties.color,
				required: e.properties.required
			}
		}, b.authError = "", b.confirm = function() {
			return b.model.title && 0 !== b.model.title.length ? ($.extend(!0, e, b.model), void b.$close(b.model)) : (b.authError = "标题名称不能为空", void $("#ratingTitle").focus())
		}, b.chooseEqfont = function(a) {
			b.model.properties.icon = a
		}, b.cancel = function() {
			b.$dismiss()
		}
	}]), angular.module("scene.create.console.scene-setting-component", ["scene.preview"]).controller("SceneSettingComponentController", ["$q", "$routeParams", "$rootScope", "$scope", "$element", "sceneService", "MineService", "dataService", "$sce", "$modal", "usercenterService", "security", "pageTplService", "i18nNotifications", "ModalService", "sceneSettingCache", "memberHandler", "eqADTypeChoice", "staticResService", "sceneDataParseService", "dataCacheService", "fileService", "storageService", function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w) {
		function x(a, b) {
			switch (a) {
			case r.HIDE:
				d.eqShowType = C.EQHIDE, d.scene.property.eqAdType = r.HIDE, d.scene.property.hideEqAd = !0;
				break;
			case r.DEFAULT_BOTTOM:
				d.eqShowType = C.EQLINK, d.scene.property.eqAdType = r.DEFAULT_BOTTOM, d.scene.property.hideEqAd = !1;
				break;
			case r.CUSTOM_BOTTOM:
				d.eqShowType = C.EQLINK, d.scene.property.eqAdType = r.CUSTOM_BOTTOM, d.scene.property.hideEqAd = !1;
				break;
			default:
			case r.FREEPAGE:
				d.eqShowType = C.EQFREE, d.scene.property && (d.scene.property.eqAdType = r.FREEPAGE, d.scene.property.hideEqAd = !1)
			}
			b && (d.$broadcast("changeView", !1), t.changeBottomType(d.eqShowType, d.scene.property.lastPageId, d.scene.property.bottomLabel, d.scene.property.eqAdType))
		}
		function y(a) {
			d.isFormerScene && d.adSpend == q.getPriceByADType(d.scene.property.eqAdType) && delete d.scene.property.eqAdType, angular.isObject(d.scene.property) && (d.scene.property = angular.toJson(d.scene.property)), angular.isString(d.scene.type) && (d.scene.type = parseInt(d.scene.type, 10)), d.$parent.scene.bgAudio && (d.scene.bgAudio = angular.isObject(d.$parent.scene.bgAudio) ? JSON.stringify(d.$parent.scene.bgAudio) : d.$parent.scene.bgAudio), d.scene.loadingLogo === !1 && delete d.scene.loadingLogo, f.saveSceneSettings(d.scene).then(function(a) {
				200 == a.data.code ? (n.pushForCurrentRoute("scene.setting.success", "notify.success"),console.log(b), d.$parent.sceneSetting.showFlag = !1, d.$parent.sceneSetting.oldBgAudio != d.scene.bgAudio && v.saveFilesHistory(JSON.parse(d.scene.bgAudio).id, 2).then(function() {
					u.clear("fileService1")
				}), d.$parent.sceneSetting.oldBgAudio = d.scene.bgAudio, a.data.obj ? angular.copy(a.data.obj, f.getCurrentScene()) : angular.copy(d.scene, f.getCurrentScene()), z.resolve(a)) : (o.openMsgDialog({
					msg: a.data.msg
				}, function() {}), angular.isString(d.scene.property) && (d.scene.property = JSON.parse(d.scene.property)), d.scene.type = "" + d.scene.type, z.reject(a))
			}, function(a) {
				d.invalidText = a, z.reject(a)
			})
		}
		d.isVipUser = q.isVipUser, d.oriSceneState = !1, d.sceneState = !1;
		var z = a.defer();
		d.setPhoneCtrl = function() {
			var a = d.scene.pageMode;
			0 === a || 1 == a || 2 == a || 6 == a || 7 == a || 8 == a || 11 == a || 12 == a ? d.phonePageMode = "NS" : d.phonePageMode = "EW"
		};
		var A = ["101", "102", "103", "104", "105", "106"];
		d.scene ? (d.scene.accessCode ? d.sceneStatue = 3 : d.sceneStatue = d.scene.status, d.appendActive = !! d.scene.promIds, d.loadingLogo = !! d.scene.loadingLogo, -1 == A.indexOf(d.scene.type + "") && (d.scene.type = "101"), d.setPhoneCtrl()) : d.$watch("sceneId", function(a, b) {
			a != b && (d.scene.accessCode ? d.sceneStatue = 3 : d.sceneStatue = d.scene.status, d.loadingLogo = !! d.scene.loadingLogo, d.appendActive = !! d.scene.promIds, -1 == A.indexOf(d.scene.type + "") && (d.scene.type = "101"), d.setPhoneCtrl())
		}), d.$watch("scene", function(a, b) {
			a != b && (d.oldScene = JSON.stringify(d.scene))
		}), d.closeSetting = function() {
			JSON.stringify(d.scene) != d.oldScene ? o.openConfirmDialog({
				msg: "设置内容有变化，是否确认修改"
			}, function() {
				d.saveSceneSettings(d.scene)
			}, function() {
				d.sceneSetting.showFlag = !1
			}) : d.sceneSetting.showFlag = !1, eqShow.stopSnowFly && clearInterval(eqShow.stopSnowFly), eqShow.stopFallingObject && clearInterval(eqShow.stopFallingObject), eqShow.stopFireworkEffect && eqShow.stopFireworkEffect()
		}, d.sceneSetting.saveSceneSetting = function() {
			return z = a.defer(), d.saveSceneSettings(d.scene), z.promise
		}, d.isAllowToAccessLastPageSetting = l.isAllowToAccess(l.accessDef.SCENE_HIDE_LASTPAGE_SETTING), d.isAllowedToAccessNewPageFlip = l.isAllowToAccess(l.accessDef.ACCESS_NEW_PAGEFLIP), (2 === l.currentUser.type || 21 === l.currentUser.type) && q.initUserMemberDetail();
		var B = {
			SHARE_SCENE: "shareScene",
			LOADING_LOGO: "loadingLogo",
			EQSHOW: "eqShow"
		};
		d.eqSceneSettingTabs = B, d.eqSceneSettingCurrent = B.SHARE_SCENE;
		var C = {
			EQFREE: "eqFree",
			EQLINK: "eqLink",
			EQHIDE: "eqHide"
		};
		d.eqShowType = C.EQFREE, d.eqADTypeChoice = r, d.switchToAdState = x, d.adSpend = 0, d.isFormerScene = !1, d.nextPage = function() {
			t.app.nextPage(), c.$broadcast("changeView", !1)
		}, d.prePage = function() {
			t.app.prePage(), c.$broadcast("changeView", !1)
		}, d.showPhoneTitle = !0, d.changeSceneName = function() {
			t.changeSceneName(d.scene.name)
		}, d.$on("changeView", function(a, b) {
			d.showPhoneTitle = !b
		}), d.PREFIX_FILE_HOST = PREFIX_FILE_HOST, d.alwaysOpen = !0;
		d.changeView = function() {
			c.$broadcast("changeView", !0)
		}, d.changeTagId = function() {
			d.$parent.scene.tagId && (d.scene.tagId = d.$parent.scene.tagId, n.pushForCurrentRoute("already.apply.discovery", "notify.success"))
		}, d.changeAppendActive = function(a) {
			if (d.oldSceneApplyState.promIds && (d.scene.promIds !== d.oldSceneApplyState.promIds || !d.appendActive)) return d.appendActive = !0, void o.openMsgDialog({
				msg: "该微课已经参与活动，不可参与其他活动；请复制该微课展示后，再次选择参与活动。"
			});
			var b;
			return a || !d.appendActive || (b = w.get("appendActive"), b && -1 != b.split(",").indexOf(c.user.id)) ? (a || d.appendActive || !d.scene.promIds || t.removeActivePage(), a && (d.appendActive = !0, d.showActiveTip = !1, d.hideActiveTip && (b = w.get("appendActive"), b ? b += "," + c.user.id : b = c.user.id, w.push("appendActive", b))), void(d.appendActive || (d.scene.promIds = null, d.activityPageTpls = []))) : (d.appendActive = !1, void(d.showActiveTip = !0))
		}, d.changeLoop = function() {
			c.$broadcast("changeView", !1), t.app.setTriggerLoop(d.scene.property.triggerLoop)
		}, d.changePageMode = function() {
			c.$broadcast("changeView", !1), d.setPhoneCtrl(), t.changeScrollMode(d.scene.pageMode)
		}, d.changeProgess = function() {
			c.$broadcast("changeView", !1), c.$broadcast("processBar", d.scene.property.slideNumber)
		}, d.changeCode = function() {
			c.$broadcast("changeView", !1), c.$broadcast("passPanelSwitch", d.scene.isAccessCode)
		}, d.changeLogo = function() {
			d.loadingLogo = !d.loadingLogo, d.loadingLogo || delete d.scene.loadingLogo, c.$broadcast("showLoading", d.loadingLogo, d.scene.loadingLogo)
		}, d.changeBottomLabel = function() {
			t.changeBottomType(d.eqShowType, d.scene.property.lastPageId, d.scene.property.bottomLabel, d.scene.property.eqAdType)
		}, d.changeAutoFlip = function() {
			c.$broadcast("changeView", !1), d.scene.property.autoFlip ? t.app.startAutoFlip(d.scene.property.autoFlipTime) : t.app.pauseAutoFlip()
		}, d.changeEqshowType = function() {
			"eqHide" == d.eqShowType && t.removeLastPage()
		}, d.changeSceneState = function() {
			return d.oldSceneApplyState.promIds ? (1 != d.sceneStatue && o.openMsgDialog({
				msg: "该微课已经参与活动，不可以关闭或加密!"
			}), void(d.sceneStatue = 1)) : (3 == d.sceneStatue ? (d.scene.status = 1, d.scene.isAccessCode = !0, c.$broadcast("changeView", !1), c.$broadcast("passPanelSwitch", !0)) : (d.scene.status = d.sceneStatue, delete d.scene.isAccessCode, delete d.scene.accessCode, c.$broadcast("changeView", !1), c.$broadcast("passPanelSwitch", !1)), void(1 != d.sceneStatue && (d.scene.isShow = 0, d.scene.applyTemplate = 0, d.appendActive = !1, d.scene.isTpl = 0, d.scene.promIds = null)))
		}, d.$watch("scene.bgAudio", function(a, b) {
			angular.isObject(a) && angular.isObject(b) ? a.url != b.url && t.playVideo(a) : a != b && t.playVideo(a), c.$broadcast("changeView", !1)
		}), d.openScene = function(a, b) {
			b ? f.openScene(a.id).then(function(b) {
				b.data.success && (a.status = 1)
			}) : f.closeScene(a.id).then(function(b) {
				b.data.success && (a.status = 2)
			})
		}, d.openImageModal = function() {
			c.$broadcast("changeView", !0), j.open({
				windowClass: "img_console console",
				templateUrl: "scene/console/bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1
						}
					}
				}
			}).result.then(function(a) {
				return a.width / a.height === 1 ? (d.newCoverImage = a, d.newCoverImage.tmbPath = a.data, d.newCoverImage.path = a.data, d.scene.cover = d.newCoverImage.path, void t.changeSceneCover(d.scene.cover)) : void j.open({
					windowClass: "console seven-contain",
					templateUrl: "scene/console/imageCrop.tpl.html",
					controller: "imageCropCtrl",
					backdrop: "static",
					resolve: {
						obj: function() {
							return {
								type: "square",
								properties: {
									src: a.data
								},
								cw: 250
							}
						}
					}
				}).result.then(function(a) {
					var b = {
						width: a.width,
						height: a.height,
						data: a.src,
						type: "imgSrc"
					};
					d.newCoverImage = b, d.newCoverImage.tmbPath = b.data, d.newCoverImage.path = b.data, d.scene.cover = d.newCoverImage.path, t.changeSceneCover(d.scene.cover)
				}, function(a) {})
			}, function(a) {})
		};
		var D = null;
		d.countCharacters = countCharacters, d.saveSceneSettings = function(a) {
			if (d.maxLength30(), !d.scene.name || !d.scene.name.trim()) return d.invalidText = "noneName", void o.openMsgDialog({
				msg: "微课标题不能为空！"
			}, function() {});
			  if(!d.scene.description) d.scene.description = "微学宝，人人都是微课大师！";
			if (d.scene.property.autoFlip && !d.scene.property.autoFlipTime) return void(d.invalidText = "请选择翻页频率");
			var b = countCharacters(d.scene.name.trim());
			if (!(b > 48)) {
				if ("1" === d.scene.isShow && !d.scene.tagId) return void o.openMsgDialog({
					msg: "请选择申请微课的微课类型"
				}, function() {
					$("#tag").focus()
				});
				if (d.scene.property && d.scene.property.eqAdType == r.CUSTOM_BOTTOM && (!d.scene.property.bottomLabel || !d.scene.property.bottomLabel.id)) return void o.openMsgDialog({
					msg: "请选择您要使用的自定义底标！"
				}, function() {});
				if (d.scene.property && d.scene.property.bottomLabel && d.scene.property.bottomLabel.name && countCharacters(d.scene.property.bottomLabel.name) > 16) return void o.openMsgDialog({
					msg: "自定义名称不能超过16个字符"
				}, function() {});
				if (d.scene.property && d.scene.property.bottomLabel && !d.scene.property.bottomLabel.name && d.scene.property.bottomLabel.url && "http://" != d.scene.property.bottomLabel.url) return void o.openMsgDialog({
					msg: "请输入自定义底标名称"
				}, function() {});
				if (d.scene.accessCode && ("0" != d.scene.applyPromotion || "0" != d.scene.applyTemplate)) return void o.openMsgDialog({
					msg: "申请样例、推荐的微课不能同时设置密码，请修改。"
				});
				if (3 == d.sceneStatue && (!d.scene.accessCode || 4 != d.scene.accessCode.length)) return void o.openMsgDialog({
					msg: "请输入有效的微课密码！"
				});
				if (d.scene.promIds && d.activityPageTpls.length && !d.scene.property.activityPageId) return void o.openMsgDialog({
					msg: "请选择活动尾页！"
				});
				if (d.oldSceneApplyState.promIds && d.scene.property.eqAdType != r.FREEPAGE) return void o.openMsgDialog({
					msg: "该微课已选择参加活动，不可以清除微学宝尾页，请重新选择！"
				});
				if (d.scene.promIds && (d.scene.property.eqAdType != r.FREEPAGE || d.scene.property.adSpend)) return void o.openMsgDialog({
					msg: "该微课已选择清除微学宝尾页，不可以参加活动；请复制该微课展示后，再次选择参与活动。"
				});
				if (d.appendActive && !d.scene.promIds) return void o.openMsgDialog({
					msg: "请选择活动尾页！"
				});
				if (d.scene.property && d.scene.property.autoFlipTime > 60) return void o.openMsgDialog({
					msg: "自动翻页时间不能超过60秒。"
				});
				d.scene.property.eqAdType = parseInt(d.scene.property.eqAdType, 10);
				var c = 0; //q.getCurrentSelectionPrice(d.scene, d.adSpend, d.isFormerScene, D);
				0 === c ? y(a) : c && c > d.userXd ? o.openMsgDialog({
					msg: '当前选择需要消耗微币<font color="#ff6e6e">' + c + '</font>个<br/>微币余额不足(<font color="#ff6e6e">' + (d.userXd || 0) + '</font>个)<span class="get-xd"><a href="http://bbs.e.wesambo.com/forum.php?mod=viewthread&tid=297&extra=page%3D1" target = "_blank">获取微币</a></span>'
				}) : c ? o.openConfirmDialog({
					msg: '当前选择需要消耗微币<font color="#ff6e6e">' + c + '</font>个<br/>微币余额为<font color="#ff6e6e">' + (d.userXd || 0) + "</font>个"
				}, function() {
					y(a)
				}) : y(a)
			}
		}, d.oldSceneApplyState = {
			applyPromotion: "",
			applyTemplate: "",
			promIds: ""
		}, d.getSceneDetail = function() {
			f.getCurrentScenePromise().then(function() {
				d.scene = angular.copy(f.getCurrentScene()), d.scene.price = "" + (d.scene.price || "0"), d.oldSceneApplyState.applyPromotion = d.scene.applyPromotion = "" + d.scene.applyPromotion, d.oldSceneApplyState.applyTemplate = d.scene.applyTemplate = "" + d.scene.applyTemplate, d.scene.isTpl = "" + d.scene.isTpl, d.scene.isShow = d.scene.isShow ? "" + d.scene.isShow : "0", d.oldSceneApplyState.promIds = d.scene.promIds = d.scene.promIds ? parseFloat(d.scene.promIds) : null, 2 == d.scene.pageMode && (d.scene.pageMode = 0), d.scene.property ? angular.isString(d.scene.property) && (d.scene.property = JSON.parse(d.scene.property)) : d.scene.property = {}, D = d.scene.loadingLogo || d.scene.property.loadingLogo, d.scene.property.hasOwnProperty("triggerLoop") || (d.scene.property.triggerLoop = !0), d.scene.property.hasOwnProperty("slideNumber") || (d.scene.property.slideNumber = !0), d.scene.property.autoFlipTime || (d.scene.property.autoFlipTime = 3), d.adSpend = d.scene.property.adSpend || 0, d.isFormerScene = !1, d.scene.property.hideEqAd ? (d.adSpend = q.getPriceByADType(r.HIDE), d.scene.property.eqAdType = r.HIDE, d.eqShowType = C.EQHIDE) : d.scene.property.eqAdType ? x(d.scene.property.eqAdType) : d.scene.createTime < 14165028e5 ? (d.isFormerScene = !0, d.adSpend = q.getPriceByADType(r.HIDE), x(r.HIDE)) : d.scene.property.isAdvancedUser ? d.scene.property.bottomLabel && d.scene.property.bottomLabel.id ? (d.isFormerScene = !0, d.adSpend = q.getPriceByADType(r.CUSTOM_BOTTOM), x(r.CUSTOM_BOTTOM)) : (d.isFormerScene = !0, d.adSpend = q.getPriceByADType(r.DEFAULT_BOTTOM), x(r.DEFAULT_BOTTOM)) : (d.adSpend = q.getPriceByADType(r.FREEPAGE), x(r.FREEPAGE)), d.scene.startDate && d.scene.endDate && (d.startDate = new Date(d.scene.startDate), d.endDate = new Date(d.scene.endDate), d.alwaysOpen = !1), d.scene.type = "" + d.scene.type, p.activitiesPromise.then(function(a) {
					d.activities = a.data.list || [], d.getActivityPageTpl()
				}), d.scene.bgAudio && (d.scene.bgAudio = angular.isString(d.scene.bgAudio) ? JSON.parse(d.scene.bgAudio) : d.scene.bgAudio);
				var a = d.$watch("$parent.scene.bgAudio", function(a) {
					d.scene.bgAudio = angular.isString(a) ? JSON.parse(a) : a
				});
				d.$on("$destroy", function() {
					a()
				})
			})
		}, d.types = s.getSceneType(), d.tplPrices = [];
		var E = p.sceneTplPricesPromise.then(function(a) {
			for (var b = 0; b < a.data.list.length; b++)"免费" != a.data.list[b].name && -1 == a.data.list[b].name.indexOf("微币") && (a.data.list[b].name += "微币");
			d.tplPrices = a.data.list || []
		}),
			F = [];
		d.sceneTags = [];
		var G = p.sceneTagsPromise.then(function(a) {
			d.sceneTags = F = a.data.list || []
		});
		a.all([E, G]).then(function() {
			d.getSceneDetail()
		});
		var H = d.$watch("scene.type", function(a) {
			a && (d.sceneTags = [], angular.forEach(F, function(b) {
				a == b.bizType && d.sceneTags.push(b)
			}))
		});
		d.$on("$destroy", function() {
			H()
		}), d.pagemodes = [{
			id: 0,
			name: "上下翻页"
		}, {
			id: 4,
			name: "左右翻页"
		}, {
			id: 1,
			name: "上下惯性翻页"
		}, {
			id: 3,
			name: "左右惯性翻页"
		}, {
			id: 11,
			name: "上下连续翻页"
		}, {
			id: 5,
			name: "左右连续翻页"
		}, {
			id: 6,
			name: "立体翻页"
		}, {
			id: 7,
			name: "卡片翻页"
		}, {
			id: 8,
			name: "放大翻页"
		}, {
			id: 9,
			name: "交换翻页"
		}, {
			id: 10,
			name: "翻书翻页"
		}, {
			id: 12,
			name: "掉落翻页"
		}];
		var I = [11, 12];
		if (!d.isAllowedToAccessNewPageFlip) for (var J = 0; J < d.pagemodes.length; J++) for (var K = 0; K < I.length; K++) d.pagemodes[J].id == I[K] && (d.pagemodes.splice(J, 1), J--);
		d.userXd = 0, d.getUserXd = function() {
			k.getUserXd().then(function(a) {
				d.userXd = a.data.obj || 0
			})
		}, d.getUserXd(), p.pageTplsPromise.then(function(a) {
			a.data.list && a.data.list.length > 0 ? d.pageTpls = a.data.list : d.pageTpls = []
		}), p.bottomPageTplsPromise.then(function(a) {
			a.data.list && a.data.list.length > 0 ? d.bottomPageTpls = a.data.list : d.bottomPageTpls = []
		}), d.chooseLastPage = function(a) {
			d.scene.property.lastPageId = a, x(r.FREEPAGE, !0)
		}, d.chooseCustomBottomLabel = function(a) {
			d.scene.property.bottomLabel || (d.scene.property.bottomLabel = {}), d.scene.property.bottomLabel.id = a, x(r.CUSTOM_BOTTOM, !0)
		}, d.maxLength30 = function() {
			if (d.scene.description && (d.scene.description = d.scene.description.replace(/\n|\r/g, " ")), d.scene.description && d.scene.description.length > 30) {
				var a = d.scene.description.replace(/[^\x00-\xff]/g, "xx");
				if (a.length > 60) {
					var b = a.substring(0, 60).replace(/xx/g, "中").length;
					d.scene.description = d.scene.description.substring(0, b)
				}
			}
		}, d.maxLength24 = function() {
			if (d.scene.name && (d.scene.name = d.scene.name.replace(/\n|\r/g, " ")), d.scene.name && d.scene.name.length > 24) {
				var a = d.scene.name.replace(/[^\x00-\xff]/g, "xx");
				if (a.length > 48) {
					var b = a.substring(0, 48).replace(/xx/g, "中").length;
					d.scene.name = d.scene.name.substring(0, b)
				}
			}
		}, d.uploadLoadingLogo = function() {
			j.open({
				windowClass: "img_console console",
				templateUrl: "scene/console/bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1
						}
					}
				}
			}).result.then(function(a) {
				d.scene.loadingLogo = a.data, c.$broadcast("showLoading", d.scene.loadingLogo, a.data)
			}, function(a) {})
		}, d.moreActivities = function() {}, d.isLoadingLogoAccessible = l.isAllowToAccess(l.accessDef.LOADING_LOGO), d.isTemplatePaymentAccessible = l.isAllowToAccess(l.accessDef.TEMPLATE_PAYMENT), d.cancelSceneSetting = function() {
			d.$parent.sceneSetting.showFlag = !1
		}, d.fourNumberPassword = function() {
			d.scene.accessCode && (d.scene.accessCode = d.scene.accessCode.replace(/\D/g, ""), d.scene.accessCode.length > 4 && (d.scene.accessCode = d.scene.accessCode.substr(0, 4)))
		}, d.isScenePasswordAccessible = l.isAllowToAccess(l.accessDef.SCENE_PASSWORD), d.activityPageTpls = [], d.selectedActivity = null, d.getActivityPageTpl = function(a) {
			if (d.oldSceneApplyState.promIds && d.scene.promIds !== d.oldSceneApplyState.promIds) return o.openMsgDialog({
				msg: "该微课已经参与活动，不可参与其他活动；请复制该微课展示后，再次选择参与活动。"
			}), void(d.scene.promIds = d.oldSceneApplyState.promIds);
			if (d.scene.promIds) {
				var b = null;
				angular.forEach(d.activities, function(a) {
					a.id === d.scene.promIds && (b = a.sceneId, d.selectedActivity = a)
				}), b && m.getPageTpls(b).then(function(b) {
					b.data.list && b.data.list.length > 0 ? (d.activityPageTpls = b.data.list, (!d.scene.property.activityPageId || a) && (d.activityPageTpls.length ? (d.scene.property.activityPageId = d.activityPageTpls[0].id, d.chooseActivityPageTpl(d.scene.property.activityPageId)) : d.scene.property.activityPageId = null)) : d.activityPageTpls = []
				})
			} else d.activityPageTpls = [], d.scene.property.activityPageId = null
		}, d.chooseActivityPageTpl = function(a) {
			d.scene.property.activityPageId = a, t.replaceActivePage(a)
		}
	}]).value("eqADTypeChoice", {
		HIDE: 0,
		FREEPAGE: 1,
		DEFAULT_BOTTOM: 2,
		CUSTOM_BOTTOM: 3
	}).service("memberHandler", ["usercenterService", "security", "eqADTypeChoice", function(a, b, c) {
		function d(a, b) {
			return /^\d+$/.test(b) ? 0 : a * parseFloat(b)
		}
		var e = {},
			f = null;
		return e.isVipUser = "1" != b.currentUser.type, e.initUserMemberDetail = function() {
			a.getUserMemberDetail(b.currentUser.id).then(function(a) {
				f = a.data.obj
			})
		}, e.getCurrentSelectionPrice = function(a, b, d, f) {
			var g = e.getPriceByADType(a.property.eqAdType);
			g = e.isVipUser && a.property.eqAdType != c.HIDE ? 0 : e.getPriceWithMemberPrivilege(g);
			var h = g - b;
			return d && 0 !== h ? h = g : 0 > h && (h = 0), !f && a.loadingLogo && (h += e.getPriceWithMemberPrivilege(loadingLogo_qi_xd, !0)), h
		}, e.getPriceWithMemberPrivilege = function(a, c) {
			return 2 === b.currentUser.type && b.currentUser.memberType && (new Date).getTime() < b.currentUser.expiryTime || 21 === b.currentUser.type ? c ? d(a, f.loadingLogo || "1.0") : d(a, f.tailPage || "1.0") : a
		}, e.getPriceByADType = function(a) {
			switch (a) {
			case c.HIDE:
				return QI_AD_XDS;
			case c.FREEPAGE:
				return 0;
			case c.DEFAULT_BOTTOM:
				return 15;
			case c.CUSTOM_BOTTOM:
				return 30
			}
		}, e
	}]).service("sceneSettingCache", ["sceneService", "pageTplService", function(a, b) {
		return {
			sceneTplPricesPromise: a.getSceneTemplatePrices(),
			sceneTagsPromise: b.getTagSysListWithType(),
			pageTplsPromise: b.getPageTpls(1301),
			bottomPageTplsPromise: b.getPageTpls(1311),
			activitiesPromise: a.getActivities()
		}
	}]).directive("sceneSettingComponent", [function() {
		return {
			scope: !0,
			controller: "SceneSettingComponentController",
			templateUrl: "scene/console/scene-setting-component.tpl.html",
			link: function(a, b, c) {
				setTimeout(function() {
					b.find(".scene-setting-info.fade").addClass("in")
				})
			}
		}
	}]), angular.module("scene.create.console.setting", ["scene.create.console.setting.style", "scene.create.console.setting.anim", "scene.create.console.setting.trigger"]), angular.module("scene.create.console.setting").directive("styleModal", ["sceneService", "$compile", function(a, b) {
		return {
			restrict: "AE",
			replace: !0,
			scope: {},
			templateUrl: "scene/console/setting.tpl.html",
			link: function(a, b, c) {
				b.bind("keydown", function(a) {
					a.stopPropagation()
				});
				var d = "style";
				a.$on("showStylePanel", function(b, c) {
					d = a.activeTab, a.activeTab = "", a.$apply(), c && c.activeTab ? a.activeTab = c.activeTab : a.activeTab = d, a.$apply()
				}), a.activeTab = c.activeTab, a.cancel = function() {
					$(b).hide()
				}, a.$on("close.style.panel", function(a) {
					b.hide(), $(".edit_area").find(".boom, .boom1").remove()
				}), a.$on("$locationChangeStart", function() {
					a.cancel()
				})
			},
			controller: ["$scope", function(a) {}]
		}
	}]), angular.module("scene.create.console.shape", []).controller("ShapeConsoleCtrl", ["$rootScope", "$scope", "ModalService", "obj", "shapeService", function(a, b, c, d, e) {
		function f(a, b) {
			e.getShapeByPage(a, b)
		}
		var g = e.svgList;
		b.currentPage = 1, b.totalItems = g.length;
		var h = b.pageSize = 18;
		b.$watch("currentPage", function(a) {
			b.toPage = a, f(a, h)
		}), b.confirm = function() {
			b.$close({
				type: "rect"
			})
		}, b.pageChanged = function(a) {
			return 1 > a || a > b.totalItems / 18 + 1 ? void alert("此页超出范围") : void(b.currentPage = a)
		}, b.cancel = function() {
			b.$dismiss()
		}, b.selectSvg = function(a) {
			//a代表形狀的id号码
			var c = e.shapeList[a].type,
				d = e.shapeList[a].viewBox;
			b.$close({
				type: c,
				viewBox: d
			})
		}
	}]).factory("shapeService", ["$rootScope", function(a) {
		var b = {},
			c = b.svgList = [{
				type: "rect"
			}, {
				type: "circle"
			}, {
				type: "diamond"
			}, {
				type: "octagon"
			}, {
				type: "triangle-up"
			}, {
				type: "triangle-down"
			}, {
				type: "triangle-left"
			}, {
				type: "triangle-right"
			}, {
				type: "arrow-up"
			}, {
				type: "arrow-down"
			}, {
				type: "arrow-left"
			}, {
				type: "arrow-right"
			}];
		for (var d in eqxiuSvg.SYMBOLS) b.svgList.push({
			type: "symbols-" + d
		});
		return b.shapeList = [], b.getShapeByPage = function(d, e) {
			d * e <= c.length ? b.shapeList = c.slice((d - 1) * e, e * d) : b.shapeList = c.slice((d - 1) * e, c.length), a.$broadcast("render.shape.page", b.shapeList)
		}, b
	}]).directive("renderShapeElement", ["shapeService", "$compile", function(a, b) {
		function c(c, d, e) {
			function f(d) {
				var e, f, i;
				$(".svg-panel ul").empty();
				for (var j = 0; j < d.length; j++) {
					var k = $('<li class="svg-element" style="width:100px;height:100px;display:inline-block;position:relative;" ng-click="selectSvg(' + j + ')"></li>');
					if (b(k)(c), k.appendTo(".svg-panel ul"), d[j].type.indexOf("symbol") < 0) f = document.createElementNS(eqxiuSvg.NAMESPACE, "svg"), f.setAttribute("style", "position:absolute;left: 50%;margin-left:-32px;top:50%;margin-top:-32px;"), f.setAttribute("xmlns", eqxiuSvg.NAMESPACE), f.setAttribute("version", "1.1"), f.setAttribute("width", g), f.setAttribute("height", h), f.setAttribute("preserveAspectRatio", "xMidYMid"), i = eqxiuSvg.ShapeFromType(d[j].type), i.setAttribute("fill", "#555"), f.appendChild(i), k.append(f), s = eqxiuSvg.boundingBox(i), e = [Math.round(s.x) || 0, Math.round(s.y) || 0, Math.round(s.width) || 32, Math.round(s.height) || 32].join(" "), f.setAttribute("viewBox", e);
					else {
						i = eqxiuSvg.ShapeFromType(d[j].type, null, null, j), f = '<svg class="svgElement" xmlns="' + eqxiuSvg.NAMESPACE + '" version="1.1" width="' + g + '" height="' + h + '" preserveAspectRatio="none">' + i + "</svg>", k.get(0).innerHTML = f, s = eqxiuSvg.boundingBox($("#path_" + j).get(0)), e = [Math.round(s.x) || 0, Math.round(s.y) || 0, Math.round(s.width) || 32, Math.round(s.height) || 32].join(" ");
						var l = k.find(".svgElement");
						l.get(0).setAttribute("viewBox", e), l.attr({
							style: "position:absolute;left: 50%;margin-left:-32px;top:50%;margin-top:-32px;"
						})
					}
					a.shapeList[j].viewBox = e
				}
			}
			var g = (a.svgList, 64),
				h = 64;
			c.$on("render.shape.page", function(a, b) {
				f(b)
			})
		}
		return {
			restrict: "EA",
			link: c
		}
	}]), angular.module("scene.create.console.soundComponent", ["app.directives.addelement"]), angular.module("scene.create.console.soundComponent").controller("SoundComponentConsoleCtrl", ["$scope", "$timeout", "$translate", "localizedMessages", "obj", "$modal", function(a, b, c, d, e, f) {
		a.model = {
			title: e.properties.title,
			imgSrc: e.properties.imgSrc,
			sound: e.sound
		}, a.authError = "", a.buttons = [{
			id: 1,
			text: "有惊喜",
			btnStyle: {
				width: "100px",
				backgroundColor: "rgb(244, 113, 31)",
				height: "30px",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 2,
			text: "听一听",
			btnStyle: {
				width: "100px",
				backgroundColor: "rgb(253, 175, 7)",
				height: "30px",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 3,
			text: "点我听歌",
			btnStyle: {
				width: "100px",
				backgroundColor: "rgb(121, 196, 80)",
				height: "30px",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 4,
			text: "点播歌曲",
			btnStyle: {
				width: "100px",
				height: "30px",
				backgroundColor: "#fff",
				"text-align": "center",
				border: "1px solid #3FB816",
				"line-height": "30px",
				color: "rgb(0, 0, 0)"
			}
		}], a.openImageModal = function() {
			f.open({
				windowClass: "img_console console",
				templateUrl: "scene/console/bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1
						}
					}
				}
			}).result.then(function(b) {
				a.model.title = "", a.btnIndex = -1, a.model.btnStyle = {
					width: "115px",
					height: "115px",
					"line-height": "1",
					backgroundColor: "transparent"
				}, a.model.imgSrc = e.properties.imgSrc = b.data
			}, function(a) {})
		}, angular.forEach(a.buttons, function(b, c) {
			"" !== a.model.title && e.css.backgroundColor && e.css.backgroundColor == b.btnStyle.backgroundColor && (a.btnIndex = c)
		}), a.confirm = function() {
			return null != a.model.imgSrc || a.model.title && 0 !== a.model.title.length ? !a.model.sound || $.isEmptyObject(a.model.sound) ? void(a.authError = "您还没有选择音效") : (e.sound = a.model.sound, e.properties.title = a.model.title, void a.$close(a.model)) : (a.authError = "按钮名称不能为空", void $('.form-list input[type="text"].btn-name').focus())
		}, a.openSoundModal = function() {
			f.open({
				windowClass: "console img_console",
				templateUrl: "scene/console/sound.tpl.html",
				controller: "soundCtrl",
				resolve: {
					obj: function() {
						return {
							elemDef: e,
							type: 4
						}
					}
				}
			}).result.then(function(b) {
				a.model.sound = b
			}, function() {})
		},a.openSoundModal = function() {
			f.open({
				windowClass: "console img_console",
				templateUrl: "scene/console/sound2.tpl.html",
				controller: "soundCtrl",
				resolve: {
					obj: function() {
						return {
							elemDef: e,
							type: 4
						}
					}
				}
			}).result.then(function(b) {
				a.model.sound = b
			}, function() {})
		}, a.cancel = function() {
			a.$dismiss()
		}, a.chooseTabButton = function(b, c) {
			a.model.title = b.text, a.model.btnStyle = b.btnStyle, a.btnIndex = c, a.model.imgSrc = e.properties.imgSrc = null
		}
	}]), angular.module("scene.create.console.sound", ["services.file", "soundLink"]).controller("soundCtrl", ["$rootScope", "$scope", "$translate", "soundService", "ModalService", "obj", "uploaderService", "$modal", "fileService", "dataCacheService", function(a, b, c, d, e, f, g, h, i, j) {
		var k = b.sounds = [],
			l = b.type = f.type;
		b.selectSoundError = "";
		b.uploader = g.uploader(f.type, 4194304);
		var m = b.pageSize = 10,
			n = 1;
		b.actionContent = !1, b.pagination = {}, b.sound = {}, b.soundLink = {
			src: ""
		};
		var o = !1;
		window.localStorage ? (o = 2 == l ? localStorage.getItem("musicTag") : localStorage.getItem("soundTag"), "true" == o ? b.isMySound = !0 : "false" != o && o ? b.isMySound = "history" : b.isMySound = !1) : b.isMySound = !1, b.alertAction = !0, b.soundAction = !1, b.popSoundAction = function() {
			b.soundAction = !0
		}, b.closeAction = function() {
			b.soundAction = !1, p.indexOf(a.user.id) > -1 && (b.alertAction = !1)
		}, b.actionShow = !1;
		var p = [];
		if (window.localStorage) {
			var q = localStorage.getItem("setSoundAction");
			q && (p = q.split(","), p.indexOf(a.user.id) > -1 && (b.alertAction = !1))
		}
		if (b.isCheckbox = function(b) {
			b && (p.push(a.user.id), localStorage.setItem("setSoundAction", p.join(",")))
		}, 4 == l && f.elemDef.sound && f.elemDef.sound.src && (b.sound = f.elemDef.sound), 2 == l && f.elemDef.bgAudio) if ("string" == typeof f.elemDef.bgAudio) {
			var r = JSON.parse(f.elemDef.bgAudio);
			b.sound = r, r && r.src && (b.sound.url = r.src)
		} else b.sound = f.elemDef.bgAudio, f.elemDef.bgAudio.src && (b.sound.url = f.elemDef.bgAudio.src);
		b.$on("uploadfiles.add", function(a) {
			2 == b.type ? j.clear("mySounds") : j.clear("fileService1"), b.selectTab(!0)
		}), b.$on("thumbnailList.update", function(a, c) {
			for (var d, e = 0; e < b.uploader.queue.length; e++) if (100 == b.uploader.queue[e].progress) {
				b.uploader.queue.splice(e, 1), d = c, k.unshift(d);
				for (var f = 0; 10 > f; f++) 0 === k[e].size ? k[e].size = null : k[e].size > 0 && k[e].size < 1024 ? k[e].size = k[e].size + " KB" : k[e].size >= 1024 && (k[e].size = (k[e].size / 1024).toPrecision(2) + " MB")
			}
			k.length > 0 && (b.actionContent = !1), 2 == b.type ? j.clear("mySounds") : j.clear("fileService1")
		});
		var s = function() {
				b.isMySound = !0, b.selectTab(!0)
			};
		b.getSounds = function(a) {
			//searchVal = document.getElementById('search-value').value //获取搜索的关键字 willingshe修改
			b.toPage = a, 4 == l ? b.isMySound ? d.getMySounds(a) : b.getSysMusicList(b.sysCatId, a) : 2 == l && (b.isMySound ? d.getMyAudios(a) : b.getSysMusicList(b.sysCatId, a))
		}, window.enterSearchSound = function(a) {
			var e = event || window.event || arguments.callee.caller.arguments[0];
			if (e && e.keyCode==13){
				searchVal = document.getElementById('search-value').value //获取搜索的关键字
			b.toPage = a, 4 == l ? b.isMySound ? d.getMySounds(a) : b.getSysMusicList(b.sysCatId, a) : 2 == l && (b.isMySound ? d.getMyAudios(a) : b.getSysMusicList(b.sysCatId, a))
			}
			//searchVal = document.getElementById('search-value').value //获取搜索的关键字
			//b.toPage = a, 4 == l ? b.isMySound ? d.getMySounds(a) : b.getSysMusicList(b.sysCatId, a) : 2 == l && (b.isMySound ? d.getMyAudios(a) : b.getSysMusicList(b.sysCatId, a))
		}, b.sysCate = !b.isMySound, b.selectTab = function(a) {
			window.localStorage && (2 == b.type ? localStorage.setItem("musicTag", a) : localStorage.setItem("soundTag", a)), a ? b.sysCate = !1 : b.sysCate = !0, b.isMySound = a, "history" == a ? b.getHistory() : b.getSounds(1)
		}, b.setPageMusic = function() {
			//设置当前页面的背景音乐
			if(music && pageNo){
				var url = PREFIX_URL + "index.php?c=scene&a=bg_music";
				music.num = parseInt(pageNo);
				music.sceneId = parseInt(sceneId);
				$.ajax(url,{
				type: 'post',
                		data: JSON.stringify(music),
                		headers: {"Content-Type": "text/plain; charset=UTF-8"},
				success: function (data){
					alert("设置成功");
					b.$dismiss();
				}});
			} else {
				alert("当前未选择任何音乐");
			}
		}, b.getHistory = function() {
			i.getFilesHistory(2).then(function(c) {
				c.data.success && a.$broadcast("sounds.update", c.data, l, b.type)
			})
		}, b.openConvert = function() {
			b.track = '女';
			b.trackId = 0;
			$("#convert").modal({show:true});
			$("body *:last").hide();
			if(!$("#convertMusic").attr("src") && $("#convertMusic").attr("src") != ""){
				new_obj = $("<audio id='convertMusic' src='' autoplay>");
				$(".container").append(new_obj);
			}
		};
		//willing
		setTimeout(b.openConvert,0), b.playConvertSound = function() {
			var val = $("#convertVal").val();
			var url = PREFIX_URL + "index.php?c=Text2audio&a=getaudio&text="+val+"&per=" + b.trackId;
			$("#convertMusic").attr("src",url);
		}, b.setConvertSound = function() {
			var val = $("#convertVal").val();
			var pageNo = window.location.href.split("=")[1];
			var str = window.location.href.split("?")[0]
			var sceneId = str.substring(str.length-7);
			var music = {};
			if(val != "" && pageNo){
				var musicUrl = "";
				var getMusicUrl = PREFIX_URL + "index.php?c=Text2audio&a=bacurl&text="+val+"&per=" + b.trackId;
				$.ajax(getMusicUrl,{
				type: 'get',
				success: function (data){
					music.num = parseInt(pageNo);
					music.url = JSON.parse(data).url;
					music.sceneId = parseInt(sceneId);
					var url = PREFIX_URL + "index.php?c=scene&a=bg_music";
					$.ajax(url,{
					type: 'post',
                			data: JSON.stringify(music),
                			headers: {"Content-Type": "text/plain; charset=UTF-8"},
					success: function (data){
					alert("设置成功");
					b.$dismiss();
					}});
				}});
			} else {
				alert("没有内容可以转换");
			}
		}, b.changeTrack = function() {
			(b.track=="女") ?  b.track='男' : b.track='女';
			(b.trackId==0) ? b.trackId=1 : b.trackId=0;
		}, b.clearCurrentMusic = function() {
			var pageNo = window.location.href.split("=")[1];
			var str = window.location.href.split("?")[0]
			var sceneId = str.substring(str.length-7);
			var music = {};
			var url = PREFIX_URL + "index.php?c=scene&a=bg_music";
			music.num = parseInt(pageNo);
			music.sceneId = parseInt(sceneId);
			music.url = "";
			$.ajax(url,{
			type: 'post',
                	data: JSON.stringify(music),
                	headers: {"Content-Type": "text/plain; charset=UTF-8"},
			success: function (data){
				alert("清除成功");
			}});
		}, b.urlLink = function() {
			h.open({
				windowClass: "console six-contain",
				templateUrl: "scene/console/soundLink.tpl.html",
				controller: "SoundLinkCtrl",
				resolve: {
					obj: function() {
						return f.type
					}
				}
			}).result.then(function() {
				s()
			}, function() {})
		}, b.isSoundSelected = function(a, b, c) {
			return 2 === a ? b.id ? b.id == c.id : b.url == c.url : 4 === a ? b.id ? b.id == c.id : b.src == c.src : void 0
		}, b.selectSound = function(a, c, d) {
			music = a;
			pageNo = window.location.href.split("=")[1];
			var str = window.location.href.split("?")[0]
			sceneId = str.substring(str.length-7);
			if(a.url && a.url.substr(0, 1) == "/"){ a.url = a.url.substr(1,a.url.length) }
			d ? b.sound = {} : b.sound = a
		}, b.clearSearchVal = function() {
			searchVal = ""
			document.getElementById('search-value').value = ""
		}, b.playSound = function(b, c) {
			b.stopPropagation(), a.$broadcast("sound.play", k[c])
		}, b.deleteMySound = function(a, c) {
			a.stopPropagation(), e.openConfirmDialog({
				msg: "确定删除此音乐吗？"
			}, function() {
				2 == b.type ? j.clear("mySounds") : j.clear("fileService1"), d.deleteMySound(k[c].id)
			})
		}, b.clear = function() {
			music = null
			b.sound = {}
		}, b.ok = function() {
			if(b.sound.url && b.sound.url.substr(0, 1) == "/"){ b.sound.url = b.sound.url.substr(1,b.sound.url.length) }
			var a, c = b.sound;
			4 == l && (a = c.src ? {
				name: c.name,
				src: c.src,
				id: c.id
			} : {}, b.$close(a)), 2 == l && (r = c.url ? {
				url: c.url,
				name: c.name,
				id: c.id
			} : {}, b.$close(r))
		}, b.cancel = function() {
			b.$dismiss()
		}, b.$on("sounds.update", function(a, c, d) {
			if (k.length = 0, c.list.length > 0) {
				b.actionContent = !1, $.each(c.list, function(a, b) {
					0 === b.path.indexOf("http://") && (b.isValue = !0), b.size < 1024 && b.size > 0 ? b.size = b.size + " KB" : b.size >= 1024 ? b.size = (b.size / 1024).toPrecision(2) + " MB" : 0 === b.size && (b.size = null), 4 == d ? k.push({
						id: b.id,
						name: b.name,
						src: b.path,
						isPlaying: !1,
						size: b.size,
						isValue: b.isValue
					}) : 2 == d && k.push({
						id: b.id,
						name: b.name,
						url: b.path,
						isPlaying: !1,
						size: b.size,
						isValue: b.isValue
					})
				});
				var e = c.map;
				e && (b.pagination = {
					totalItems: e.count,
					pageSize: e.pageSize,
					currentPage: e.pageNo,
					numPages: Math.ceil(e.count / e.pageSize)
				})
			} else b.pagination.totalItems = 0, b.actionContent = !0
		}), b.$on("mySounds.delete", function(a, c) {
			c === b.sound.id && (b.sound = {}), 2 == l ? d.getMyAudios(b.pagination.currentPage) : 4 == l && d.getMySounds(b.pagination.currentPage)
		});
		var t = function(a) {
				i.getSysMusicCategory(a)
			};
		b.$on("sysMusic.update", function(a) {
			b.sysMusicList = i.sysMusicList
		}), t(l), b.getSysMusicList = function(a, c) {
			b.sysCatId = a, d.getSysMusicList(c, m, l, a)
		}, "history" == b.isMySound ? b.getHistory() : b.isMySound ? 4 == l ? d.getMySounds(n) : d.getMyAudios(n) : b.getSysMusicList(0, n)
	}]).factory("soundService", ["$rootScope", "$modal", "fileService", "dataCacheService", function(a, b, c, d) {
		var e = {};
		return e.getSysMusicList = function(b, e, f, g) {
			c.getSystemFiles(b, e, f, g).then(function(b) {
				b.data.success ? (d.getAsyncUrl() && (d.push("fileService1", d.getAsyncUrl(), b), d.setAsyncUrl()), a.$broadcast("sounds.update", b.data, f)) : alert(b.data.msg)
			}, function() {
				alert(networkOut)
			})
		}, e.getMyAudios = function(b) {
			c.getFileByCategory(b, 10, "0", "2").then(function(b) {
				b.data.success ? (d.getAsyncUrl() && (d.push("mySounds", d.getAsyncUrl(), b), d.setAsyncUrl()), a.$broadcast("sounds.update", b.data, 2)) : alert(b.data.msg)
			}, function() {
				alert(networkOut)
			})
		}, e.getMySounds = function(b) {
			c.getUserFiles(b, 10, 4, 0).then(function(b) {
				b.data.success ? (d.getAsyncUrl() && (d.push("fileService1", d.getAsyncUrl(), b), d.setAsyncUrl()), a.$broadcast("sounds.update", b.data, 4)) : alert(b.data.msg)
			}, function() {
				alert(networkOut)
			})
		}, e.deleteMySound = function(b) {
			c.deleteFile1(b).success(function(c) {
				c.success ? a.$broadcast("mySounds.delete", b) : alert(c.msg)
			}).error(function() {
				alert(networkOut)
			})
		}, e
	}]).directive("eqxAudio", function() {
		function a(a, c) {
			var d = {};
			c.bind("pause", function() {
				c.attr("src") && a.$apply(function() {
					d.isPlaying = !1
				})
			}).bind("play", function() {
				c.attr("src") && a.$apply(function() {
					d.isPlaying = !0
				})
			});
			var e = c.get(0);
			a.$on("sound.play", function(a, c) {
				b(d, c, e), d = c
			})
		}
		function b(a, b, c) {
			var d, e = {};
			e.src = b.src || b.url, d = 0 === e.src.indexOf("http://") ? e.src : PREFIX_FILE_HOST + e.src;
			var f = d.substr(d.lastIndexOf("/") + 1),
				g = c.src.substr(d.lastIndexOf("/") + 1);
			null == a.id ? f == g && b.isPlaying ? c.pause() : f != g || b.isPlaying ? (c.src = d, c.play(), a.isPlaying = !1, b.isPlaying = !0) : c.play() : a.id == b.id && b.isPlaying ? c.pause() : a.id != b.id || b.isPlaying ? (c.src = d, c.play(), a.isPlaying = !1, b.isPlaying = !0) : c.play()
		}
		return {
			link: a
		}
	}).filter("maxLength", function() {
		return function(a, b) {
			return a ? a.length <= b ? a : a.substr(0, b) + "…" : void 0
		}
	}), angular.module("soundLink", ["soundLink"]), angular.module("soundLink").controller("SoundLinkCtrl", ["$rootScope", "$scope", "$translate", "sceneService", "obj", function(a, b, c, d, e) {
		b.authError = "", b.soundLink = {
			src: ""
		}, b.selectLink = function() {
			b.sound = {}
		}, b.confirm = function() {
			var a = b.soundLink.src;
			if (a.length && a.lastIndexOf(".mp3") !== a.length - 4) return void(b.authError = "请输入mp3格式的音乐链接");
			if (0 === a.length) return b.authError = "链接地址不能为空", void $(".link").focus();
			var c;
			b.sound;
			a && (c = {
				name: "外链音乐",
				src: a
			}), d.soundLink(a, e).then(function(a) {
				200 == a.data.code ? b.$close(c) : (b.authError = a.data.msg, $(".link").focus())
			})
		}, b.cancel = function() {
			b.$dismiss()
		}
	}]), angular.module("scene.create.console.statistics", []), angular.module("scene.create.console.statistics").controller("StatisticsConsoleCtrl", ["$scope", "obj", function(a, b) {
		a.model = {
			title: b.title,
			properties: {
				layout: b.properties.layout,
				size: b.properties.size,
				color: b.properties.color,
				icon: b.properties.icon,
				imgSrc: b.properties.imgSrc
			}
		}, a.authError = "", a.confirm = function() {
			angular.extend(b, a.model);
			var c = parseInt(b.css.height, 10) || 0;
			a.model.properties.imgSrc && 115 > c && (a.model.btnStyle = {
				width: "320px",
				height: "115px",
				lineHeight: "115px",
				backgroundColor: "transparent"
			}), "counter-tb" === a.model.properties.layout && (!a.model.properties.imgSrc && 80 > c && (a.model.btnStyle = {
				height: "80px",
				lineHeight: "80px"
			}), a.model.properties.imgSrc && 155 > c && (a.model.btnStyle = a.model.btnStyle || {}, a.model.btnStyle.height = a.model.btnStyle.lineHeight = "155px")), a.$close(a.model)
		}, a.cancel = function() {
			a.$dismiss()
		}, a.chooseEqfont = function(b) {
			a.model.properties.icon = b, a.model.properties.imgSrc = null
		}
	}]), angular.module("scene.create.console.setting.style", ["colorpicker.module", "app.directives.style", "app.directives.uislider", "app.directives.limitInput", "services.history"]), angular.module("scene.create.console.setting.style").controller("StyleConsoleCtrl", ["$scope", "sceneService", "historyService", "$rootScope", function(a, b, c, d) {
		var e = a.elemDef = b.currentElemDef;
		delete e.css.borderTopLeftRadius, delete e.css.borderTopRightRadius, delete e.css.borderBottomLeftRadius, delete e.css.borderBottomRightRadius, delete e.css.border;
		var f = e.css,
			g = $("#inside_" + a.elemDef.id + " > .element-box");
		if (a.model = {
			backgroundColor: f.backgroundColor || "",
			opacity: 100 - 100 * f.opacity || 0,
			color: f.color || "#676767",
			borderWidth: parseInt(f.borderWidth, 10) || 0,
			borderStyle: f.borderStyle || "solid",
			borderColor: f.borderColor || "rgba(0,0,0,1)",
			paddingBottom: parseInt(f.paddingBottom, 10) || 0,
			paddingTop: parseInt(f.paddingTop, 10) || 0,
			lineHeight: +f.lineHeight || 1,
			borderRadius: parseInt(f.borderRadius, 10) || 0,
			transform: f.transform && parseInt(f.transform.replace("rotateZ(", "").replace("deg)", ""), 10) || 0
		}, a.maxRadius = Math.min(g.outerWidth(), g.outerHeight()) / 2 + 10, f.borderRadiusPerc ? a.model.borderRadiusPerc = parseInt(f.borderRadiusPerc, 10) : f.borderRadius ? "999px" == f.borderRadius ? a.model.borderRadiusPerc = 100 : (a.model.borderRadiusPerc = parseInt(100 * parseInt(f.borderRadius, 10) * 2 / Math.min(g.outerWidth(), g.outerHeight()), 10), a.model.borderRadiusPerc > 100 && (a.model.borderRadiusPerc = 100)) : a.model.borderRadiusPerc = 0, a.tmpModel = {
			boxShadowDirection: 0,
			boxShadowX: 0,
			boxShadowY: 0,
			boxShadowBlur: 0,
			boxShadowSize: 0,
			boxShadowColor: "rgba(0,0,0,0.5)"
		}, f.boxShadow) {
			var h = f.boxShadow.split(" ");
			a.tmpModel.boxShadowX = parseInt(h[0], 10), a.tmpModel.boxShadowY = parseInt(h[1], 10), a.tmpModel.boxShadowDirection = parseInt(f.boxShadowDirection, 10) || 0, a.tmpModel.boxShadowBlur = parseInt(h[2], 10), a.tmpModel.boxShadowColor = h[3], a.tmpModel.boxShadowSize = parseInt(f.boxShadowSize, 10) || 0
		}
		a.clear = function() {
			a.model = {
				backgroundColor: "",
				opacity: 0,
				color: "#676767",
				borderWidth: 0,
				borderStyle: "solid",
				borderColor: "rgba(0,0,0,1)",
				paddingBottom: 0,
				paddingTop: 0,
				lineHeight: 1,
				borderRadius: 0,
				transform: 0
			}, a.tmpModel = {
				boxShadowDirection: 0,
				boxShadowX: 0,
				boxShadowY: 0,
				boxShadowBlur: 0,
				boxShadowSize: 0,
				boxShadowColor: (f.boxShadowSize, "rgba(0,0,0,0.5)")
			}
		}, a.$watch("tmpModel", function(b, c) {
			var d = {};
			$.extend(!0, d, a.model), d.borderRadius += "px", d.borderTopLeftRadius = d.borderTopRightRadius = d.borderBottomLeftRadius = d.borderBottomRightRadius = d.borderRadius, d.opacity = (100 - a.model.opacity) / 100, d.boxShadow = Math.round(a.tmpModel.boxShadowX) + "px " + Math.round(a.tmpModel.boxShadowY) + "px " + a.tmpModel.boxShadowBlur + "px " + a.tmpModel.boxShadowColor, d.boxShadowDirection = a.tmpModel.boxShadowDirection, d.boxShadowSize = a.tmpModel.boxShadowSize, d.transform = "rotateZ(" + a.model.transform + "deg)", $.extend(!0, e.css, d)
		}, !0), a.$watch("model", function(b, c) {
			if(a.elemDef.properties instanceof Array){ 
				a.elemDef.properties ={}
			}
			var d = {};
			elemId = a.elemDef.id;
			if(document.getElementById(""+elemId + "").children[0] && document.getElementById(""+elemId + "").children[0].style.color != ""){
				var oldVal = a.elemDef.content.split('color:')[1].split(";")[0];
				a.model.color = oldVal;
				document.getElementById(""+elemId + "").children[0].style.color = "";
			}
			$.extend(!0, d, a.model), d.borderRadius += "px", d.borderTopLeftRadius = d.borderTopRightRadius = d.borderBottomLeftRadius = d.borderBottomRightRadius = d.borderRadius, d.opacity = (100 - a.model.opacity) / 100, d.boxShadow = Math.round(a.tmpModel.boxShadowX) + "px " + Math.round(a.tmpModel.boxShadowY) + "px " + a.tmpModel.boxShadowBlur + "px " + a.tmpModel.boxShadowColor, d.boxShadowDirection = a.tmpModel.boxShadowDirection, d.boxShadowSize = a.tmpModel.boxShadowSize, d.transform = "rotateZ(" + a.model.transform + "deg)", $.extend(!0, e.css, d)
		}, !0)
	}]).directive("styleInput", ["multiCompResize", "$rootScope", function(a, b) {
		return {
			restrict: "AE",
			link: function(a, c, d) {
				var e = $("#inside_" + a.elemDef.id + " > .element-box");
				$("#inside_" + a.elemDef.id, "#nr");
				a.$watch(function() {
					return $(c).val()
				}, function(f, g) {
					if (f != g) {
						if ("borderWidth" == d.cssItem) {
							e.css({
								borderStyle: a.model.borderStyle,
								borderWidth: $(c).val()
							});
							var h = {
								width: e.width(),
								height: e.height()
							};
							if (4 == a.elemDef.type) {
								var i = e.find("img"),
									j = i.width() / i.height(),
									k = h.width / h.height;
								j >= k ? (i.outerHeight(h.height), i.outerWidth(h.height * j), i.css("marginLeft", -(i.outerWidth() - h.width) / 2), i.css("marginTop", 0)) : (i.outerWidth(h.width), i.outerHeight(h.width / j), i.css("marginTop", -(i.outerHeight() - h.height) / 2), i.css("marginLeft", 0)), a.elemDef.properties.imgStyle.marginTop = i.css("marginTop"), a.elemDef.properties.imgStyle.marginLeft = i.css("marginLeft"), a.elemDef.properties.imgStyle.width = i.outerWidth(), a.elemDef.properties.imgStyle.height = i.outerHeight()
							}
						}
						if ("borderRadius" == d.cssItem && e.css({
							borderRadius: a.model.borderRadius
						}), "opacity" == d.cssItem && e.css({
							opacity: (100 - $(c).val()) / 100
						}), "backgroundColor" == d.cssItem && e.css({
							backgroundColor: $(c).val()
						}), "color" == d.cssItem && (e.css({
							color: $(c).val()
						}), "h" == a.elemDef.type)) {
							var l = e.find("svg");
							l.find("g").length ? l.find("g").attr("fill", $(c).val()) : l.children().attr("fill", $(c).val())
						}
						"borderStyle" == d.cssItem && (e.css({
							borderStyle: a.model.borderStyle
						}), b.$broadcast("hisChange")), "borderColor" == d.cssItem && e.css({
							borderColor: a.model.borderColor
						}), "padding" == d.cssItem && e.css({
							paddingTop: a.model.paddingTop,
							marginTop: -a.model.paddingBottom
						}), "lineHeight" == d.cssItem && e.css({
							lineHeight: a.model.lineHeight
						}), "transform" == d.cssItem && (e.parents("li").css({
							transform: "rotateZ(" + a.model.transform + "deg)"
						}), b.$broadcast("boxOuter")), "boxShadow" == d.cssItem && (a.tmpModel.boxShadowX = -Math.sin(a.tmpModel.boxShadowDirection * Math.PI / 180) * a.tmpModel.boxShadowSize, a.tmpModel.boxShadowY = Math.cos(a.tmpModel.boxShadowDirection * Math.PI / 180) * a.tmpModel.boxShadowSize, e.css({
							boxShadow: Math.round(a.tmpModel.boxShadowX) + "px " + Math.round(a.tmpModel.boxShadowY) + "px " + a.tmpModel.boxShadowBlur + "px " + a.tmpModel.boxShadowColor
						}))
					}
				})
			}
		}
	}]).directive("angleKnob", function() {
		return {
			restrict: "AE",
			templateUrl: "scene/console/angle-knob.tpl.html",
			link: function(a, b, c) {
				function d(a, b) {
					var c = Math.sqrt((a - 28) * (a - 28) + (b - 28) * (b - 28)) / 28,
						d = 28 + (a - 28) / c,
						e = 28 + (b - 28) / c;
					g.css({
						top: Math.round(e),
						left: Math.round(d)
					})
				}
				function e(a, b) {
					var c = a - 28,
						d = 28 - b,
						e = 180 * Math.atan(c / d) / Math.PI;
					return b > 28 && (e += 180), 28 >= b && 28 > a && (e += 360), Math.round(e)
				}
				var f = $(b).find(".sliderContainer"),
					g = $(b).find(".sliderKnob");
				a.$watch(function() {
					return a.tmpModel.boxShadowDirection
				}, function(a) {
					g.css({
						top: 28 - 28 * Math.cos(a * Math.PI / 180),
						left: 28 + 28 * Math.sin(a * Math.PI / 180)
					})
				}), 0 !== a.tmpModel.boxShadowDirection && g.css({
					top: 28 - 28 * Math.cos(a.tmpModel.boxShadowDirection * Math.PI / 180),
					left: 28 + 28 * Math.sin(a.tmpModel.boxShadowDirection * Math.PI / 180)
				}), f.bind("mousedown", function(b) {
					b.stopPropagation();
					var c = f.offset().left,
						g = f.offset().top;
					d(b.pageX - c, b.pageY - g);
					var h = e(b.pageX - c, b.pageY - g);
					a.tmpModel.boxShadowDirection = h, a.$apply(), $(this).bind("mousemove", function(b) {
						b.stopPropagation(), d(b.pageX - c, b.pageY - g);
						var f = e(b.pageX - c, b.pageY - g);
						a.tmpModel.boxShadowDirection = f, a.$apply()
					}), $(this).bind("mouseup mouseleave", function(a) {
						$(this).unbind("mousemove"), $(this).unbind("mouseup mouseleave")
					})
				})
			}
		}
	}), angular.module("scene.create.console.tel", ["app.directives.addelement"]), angular.module("scene.create.console.tel").controller("TelConsoleCtrl", ["$scope", "$timeout", "$translate", "localizedMessages", "obj", "$modal", function(a, b, c, d, e, f) {
		a.model = {
			title: e.properties.title,
			number: e.properties.number,
			imgSrc: e.properties.imgSrc
		}, a.authError = "", a.buttons = [{
			id: 1,
			text: "一键拨号",
			btnStyle: {
				width: "100px",
				backgroundColor: "rgb(244, 113, 31)",
				height: "30px",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 2,
			text: "热线电话",
			btnStyle: {
				width: "100px",
				backgroundColor: "rgb(253, 175, 7)",
				height: "30px",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 3,
			text: "拨打电话",
			btnStyle: {
				width: "100px",
				backgroundColor: "rgb(121, 196, 80)",
				height: "30px",
				"text-align": "center",
				"line-height": "30px",
				color: "rgb(255, 255, 255)"
			}
		}, {
			id: 4,
			text: "一键拨号",
			btnStyle: {
				width: "100px",
				height: "30px",
				backgroundColor: "#fff",
				"text-align": "center",
				border: "1px solid #3FB816",
				"line-height": "30px",
				color: "rgb(0, 0, 0)"
			}
		}], a.openImageModal = function() {
			f.open({
				windowClass: "img_console console",
				templateUrl: "scene/console/bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1
						}
					}
				}
			}).result.then(function(b) {
				a.model.title = "", a.btnIndex = -1, a.model.btnStyle = {
					width: "115px",
					height: "115px",
					"line-height": "1",
					backgroundColor: "transparent"
				}, a.model.imgSrc = e.properties.imgSrc = b.data
			}, function(a) {})
		}, angular.forEach(a.buttons, function(b, c) {
			"" !== a.model.title && e.css.backgroundColor && e.css.backgroundColor == b.btnStyle.backgroundColor && (a.btnIndex = c)
		}), a.confirm = function() {
			return null != a.model.imgSrc || a.model.title && 0 !== a.model.title.length ? a.model.number && 0 !== a.model.title.number ? void a.$close(a.model) : (a.authError = "电话号码不能为空", void $('.form-list input[type="text"].tel-button').focus()) : (a.authError = "按钮名称不能为空", void $('.form-list input[type="text"].btn-name').focus())
		}, a.cancel = function() {
			a.$dismiss()
		}, a.chooseTabButton = function(b, c) {
			a.model.title = b.text, a.model.btnStyle = b.btnStyle, a.btnIndex = c, a.model.imgSrc = e.properties.imgSrc = null
		}
	}]),angular.module("scene.create.console.adr", []), angular.module("scene.create.console.adr").controller("AdrConsoleCtrl", ["$scope",function(a) {

		a.replaceImage = function(j) {
			a.position = $("#position").val();
			console.log(a.position);
			// var aaa = a.position.indexOf(markers);
   //      console.log(aaa);
			if(!a.position) return void(a.authError = "请输入地址");
			var f = {
				type: a.position,
				src: a.position
			}
			if($("#position").focus()) a.authError =null;
			a.$close(f);
		}
		,a.cancel = function() {
			a.$dismiss();
		}

	}]), angular.module("scene.create.console.setting.trigger", ["colorpicker.module", "app.directives.style", "app.directives.uislider", "app.directives.limitInput", "scene.edit.trigger"]), angular.module("scene.create.console.setting.trigger").controller("TriggerConsoleCtrl", ["$scope", "$rootScope", "$translate", "sceneService", "triggerService", "$modal", "ModalService", "i18nNotifications", "security", function(a, b, c, d, e, f, g, h, j) {
		function k() {
			var b = e.getTrigger(o.id);
			if (b && b.sends.length) for (m(b.sends), i = 0; i < b.sends.length && a.triggerEvents[i]; i++) i > 0 ? b.sends[i].delay = b.sends[i - 1].delay + a.triggerEvents[i].delay : b.sends[i].delay = a.triggerEvents[i].delay;
			var c;
			$.each(p, function(a, b) {
				e.clearTrigger(a), c = e.getTrigger(a), c && c.sends.length && m(c.sends), c ? b.trigger = c : delete b.trigger
			}), 2 == a.sendType.value && (c = e.getTrigger(a.elemDef.id), c && c.sends.length && m(c.sends), a.elemDef.properties || (a.elemDef.properties = {}), a.elemDef.properties.trigger = c)
		}
		function l() {
			if (!o) return void(a.triggerEvents = []);
			var b = e.getTrigger(o.id);
			if (b && b.sends.length) {
				m(b.sends), a.triggerEvents = [];
				var c = angular.copy(b.sends);
				angular.forEach(c, function(b, d) {
					if (a.triggerEvents.push({}), angular.forEach(b.handles, function(b, c) {
						1 != b.type && 2 != b.type || !b.ids.length ? 3 == b.type && b.ids.length && (a.triggerEvents[d] = angular.copy(a.eventTypes[1]), a.triggerEvents[d].type = 2) : (a.triggerEvents[d] = angular.copy(a.eventTypes[0]), a.triggerEvents[d].type = 1)
					}), d > 0) for (i = 0; d > i; i++) b.delay -= c[i].delay;
					a.triggerEvents[d].handles = b.handles, b.delay ? a.triggerEvents[d].delay = b.delay : a.triggerEvents[d].delay = 0
				})
			}
			a.triggerEvents.length && $.each(a.triggerEvents, function(a, b) {
				b.triggerElements = [], b.handles && b.handles.length && $.each(b.handles, function(a, c) {
					c.ids.length && $.each(c.ids, function(a, d) {
						b.triggerElements.push({
							id: d,
							handleType: c
						})
					})
				})
			})
		}
		function m(a) {
			for (var b = 0; b < a.length; b++)"undefined" == typeof a[b].sendIndex && a[b].hasOwnProperty("sendIndex") && (a.splice(b, 1), b--)
		}
		var n = utilTrigger.getSendType();
		j.isAllowToAccess(j.accessDef.SHAKE_TRIGGER) || delete n.SHAKE, a.sendTypes = n, a.sendType = a.sendTypes.CLICK;
		var o = a.elemDef = d.currentElemDef,
			p = d.getElementsMap(),
			q = (utilTrigger.getHandleType(), d.getSceneObj().obj);
		if (q && q.elements.length) {
			a.triggerSources = [];
			var r = angular.copy(q.elements);
			$.each(r, function(b, c) {
				("2" == c.type || "4" == c.type || "h" == c.type || "x" == c.type) && ("2" == c.type ? c.name = "文字" : "4" == c.type ? c.name = "图片" : "h" == c.type ? c.name = "形状" : "x" == c.type && (c.name = "多字体"), a.triggerSources.push(c))
			}), $.each(a.triggerSources, function(a, b) {
				b.name += a + 1
			})
		}
		a.$watch("elemDef", function(b, c) {
			b && (o = b, $.each(a.triggerSources, function(c, d) {
				d.id == b.id && (a.sourceElem = d)
			}))
		}, !0), a.$watch("sendType", function(b) {
			a.triggerEvents = [], 1 == b.value ? o = a.elemDef = d.currentElemDef : 2 == b.value && (o = a.elemDef = q), l()
		}, !0), a.eventTypes = [{
			name: "existElement",
			value: 1,
			title: "选择界面已有元素",
			children: [{
				type: "SHOW",
				title: "显示"
			}, {
				type: "HIDE",
				title: "隐藏"
			}]
		}, {
			name: "randomEvent",
			value: 2,
			title: "随机图片"
		}], o && 1 == a.sendType.value && (4 == o.type ? a.triggerOriginal = "图片1" : "2" == o.type ? a.triggerOriginal = "文字1" : "h" == o.type ? a.triggerOriginal = "形状1" : "x" == o.type && (a.triggerOriginal = "多字体1")), a.selectTriggerOriginal = function() {
			b.$broadcast("select.trigger.original")
		}, a.triggerEvents = [], a.addTriggerEvent = function(b, c) {
			if (!a.sourceElem && 1 == a.sendType.value) return void h.pushForCurrentRoute("select.trigger.source", "notify.success");
			a.triggerEvents.push({
				title: b.title,
				value: b.value,
				delay: 0
			});
			a.triggerEvents.length;
			1 == b.value ? a.addTriggerItem(a.triggerEvents[c], c) : 2 == b.value && a.addRandomImg(a.triggerEvents[c], c)
		}, a.addTriggerItem = function(c, d, e) {
			a.currentTriggerEvent = c, a.currentIndex = d, b.$broadcast("element.triggered.add", c, d)
		}, a.addRandomImg = function(b, c) {
			a.currentTriggerEvent = b, a.currentIndex = c, d.createComp("n")
		}, 
        // a.uploadImages = function(){
        //     $('.bs-example-modal-lg').modal('toggle'); 
        //     console.log('aaaaaaaaa');
     // }, 
        a.$on("create.randomevent.trigger", function(c, d) {
			b.$broadcast("show.random.trigger", o, d, a.currentIndex)
		}), a.$on("receive.element.update", function(b, c, d, f, g) {
			a.triggeredElements = [];
			a.currentTriggerEvent ? a.currentTriggerEvent.handles = [] : a.triggerEvents && (a.triggerEvents[g].handles = []);
			var h = e.getTrigger(o.id).sends;
			h.length && m(h), angular.forEach(h, function(b, c) {
				a.triggerEvents[g].handles = b.handles
			}), k(), l()
		}), a.switchShow = function(a, c) {
			if (a.triggerType) if (1 == a.triggerType) var d = a.triggerType = 2,
				e = !1;
			else var d = a.triggerType = 1,
				e = !0;
			else if (1 == a.handleType.type) var d = a.handleType.type = 2,
				e = !1;
			else var d = a.handleType.type = 1,
				e = !0;
			b.$broadcast("switch.triggered.state", e, d, a.id, c)
		}, a.removeTrigger = function(b, c) {
			var d = o.id,
				f = e.getTrigger(d);
			if (f && f.sends) {
				if (m(f.sends), !f.sends[b]) return void a.triggerEvents.splice(b, 1);
				e.deleteTriggerBySendIndex(b, d), $.each(f.sends, function(a, b) {
					b.sendIndex = a
				})
			}
			a.triggerEvents.splice(b, 1)
		}, a.getTriggerSources = function(b) {
			a.triggerEvents = [], b && ($("#nr").find("#inside_" + b.id).trigger("mousedown"), o = a.elemDef = p[b.id], l())
		}, l(), a.confirm = function() {
			k(), b.$broadcast("close.style.panel")
		}, a.cancelTriggerElem = function(a, c) {
			var d = o.id;
			b.$broadcast("cancel.element.trigger", a, d, c), l()
		}, a.editRandomElem = function() {}, a.clear = function() {
			e.resetTrigger(o.id), a.triggerEvents = []
		}
	}]).directive("eqxTrigger", ["$compile", "$translate", "sceneService", "triggerService", function(a, b, c, d) {
		function e(a, b, e) {
			var o = c.currentElemDef;
			a.$watch("sendType", function(b) {
				1 == b.value ? o = a.elemDef = c.currentElemDef : 2 == b.value && (o = a.elemDef = c.getSceneObj().obj)
			}, !0);
			var p, q = $("#nr");
			q.find(".edit_area").find("li");
			a.$on("element.triggered.add", function(b, c, d) {
				$(".switch-original").remove(), p = $("#inside_" + a.elemDef.id);
				var e = $('<div class="switch-original">');
				p.append(e).children(".bar").hide(), f(a, a.elemDef, c, d)
			}), a.$on("create.trigger.menu", function(b, c, d) {
				if (!c.find(".switch-original").length) {
					var e = g(a, c);
					l(e, "triggerMenu", d)
				}
			}), a.$on("switch.triggered.state", function(b, c, d, e, f) {
				var g = $("#inside_" + e);
				d.type;
				c ? h(g, a.sendType, m, o.id, e, f) : i(g, a.sendType, m, o.id, e, f)
			}), a.$on("show.random.trigger", function(b, c, e, f) {
				d.getSendIds(m.RANDOMEVENT.value, c.id);
				var g = utilTrigger.getHandleType().RANDOMEVENT.value;
				k(a.sendType, g, c.id, e.id, f);
				d.getTrigger(c.id)
			}), a.$on("cancel.element.trigger", function(b, d, e, f) {
				if (p = $("#inside_" + d), j(p, a.sendType, m, e, d, f), "n" == n[d].type && ($("#nr").find("#inside_" + d).remove(), c.deleteElement(d)), a.triggerEvents.length) for (var g = 0; g < a.triggerEvents.length; g++) {
					var h = !0;
					if (a.triggerEvents[g].handles) for (var i = 0; i < a.triggerEvents[g].handles.length; i++) a.triggerEvents[g].handles[i].ids.length && (h = !1);
					h && (a.triggerEvents.splice(g, 1), g--)
				}
			}), a.$on("select.trigger.original", function(b) {
				var d = q.find(".edit_area").children("li");
				$('<div class="mask-trigger">').insertAfter(".edit_area").click(function() {
					$(this).remove(), d.each(function() {
						var a = $(this),
							b = a.attr("ctype"),
							c = parseInt(a.attr("id").replace("inside_", ""), 10);
						(2 == b || 4 == b || "h" == b || "x" == b) && a.css({
							"background-color": "",
							"z-index": n[c].css.zIndex
						})
					});
					var b = parseInt($(".switch-original").parent().attr("id").replace("inside_", ""), 10);
					o = a.elemDef = c.currentElemDef = n[b], "4" == o.type ? $scope.triggerOriginal = "图片1" : "2" == o.type ? $scope.triggerOriginal = "文字1" : "h" == o.type ? $scope.triggerOriginal = "形状1" : "x" == o.type && ($scope.triggerOriginal = "多字体1"), a.$apply()
				}), d.each(function() {
					var a = $(this),
						b = a.attr("ctype");
					(2 == b || 4 == b || "h" == b || "x" == b) && a.css({
						"background-color": "rgba(255,255,255,0.9)",
						"z-index": 10001
					})
				})
			})
		}
		function f(b, c, e, f) {
			var g = $("#nr"),
				h = g.find(".edit_area").children("li");
			g.find(".mask-trigger").remove(), a('<div class="trigger-elem-list" trigger-elem-list panel-draggable></div>')(b).appendTo(".content"), $('<div class="mask-trigger">').insertAfter("#nr .edit_area");
			var i;
			if (d.getTrigger(c.id) && (i = d.getTrigger(c.id).sends), h.each(function() {
				var a = $(this),
					b = a.attr("ctype");
				(2 == b || 4 == b || "h" == b || "x" == b) && (a.css({
					"background-color": "rgba(255,255,255,0.9)",
					"z-index": 10001
				}), i && i.length && $.each(i, function(b, c) {
					b != f && $.each(c.handles, function(b, c) {
						c.ids.length && $.each(c.ids, function(b, c) {
							a.attr("id") == "inside_" + c && a.css({
								"background-color": "",
								"z-index": ""
							})
						})
					})
				}))
			}), c) {
				var j = [];
				$.each(m, function(a, b) {
					if (2 != b.value) {
						var e = d.getSendIds(b.value, c.id);
						$.each(e, function(a, b) {
							j.push(b)
						})
					}
				}), $.each(j, function(a, b) {
					var c = g.find("#inside_" + b);
					c.css({
						"background-color": "",
						"z-index": ""
					})
				}), $("#comp_setting").css({
					zIndex: ""
				})
			}
		}
		function g(a, b) {
			var c = a.currentIndex,
				d = $('<ul id="triggerMenu" class="dropdown-menu" style="min-width: 100px; display: block;" role="menu" aria-labelledby="dropdownMenu1"><li class="trigger-show" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-dengpao1"></div>显示</a></li><li class="trigger-hide" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-dengpao1" style="color: #5F5F5F;"></div>隐藏</a></li><li class="trigger-none" role="presentation"><a role="menuitem" tabindex="-1"><div style="width: 21px;"></div>取消</a></li></ul>').css({
					position: "absolute",
					"user-select": "none"
				}),
				e = $(".edit_area").find(".switch-original"),
				f = parseInt(e.parent().attr("id").replace("inside_", ""), 10),
				g = parseInt(b.attr("id").replace("inside_", ""), 10);
			return d.children(".trigger-show").click(function() {
				h(b, a.sendType, m, f, g, c), d.hide(), a.$apply()
			}), d.children(".trigger-hide").click(function() {
				i(b, a.sendType, m, f, g, c), d.hide(), a.$apply()
			}), d.children(".trigger-none").click(function() {
				j(b, a.sendType, m, f, g, c), d.hide(), $.each(a.triggerElements, function(a, b) {
					g == b.id && (b.checked = !1, b.triggerType = "")
				}), a.$apply()
			}), d
		}
		function h(a, b, c, e, f, g) {
			a.children(".boom").length || (a.children(".boom1").remove(), $('<div class="boom">').appendTo(a), d.deleteTrigger(b.value, c.HIDE.value, e, f, g), d.addTrigger(b.value, c.SHOW.value, e, f, g))
		}
		function i(a, b, c, e, f, g) {
			a.children(".boom1").length || (a.children(".boom").remove(), $('<div class="boom1">').appendTo(a), d.deleteTrigger(b.value, c.SHOW.value, e, f, g), d.addTrigger(b.value, c.HIDE.value, e, f, g))
		}
		function j(a, b, c, e, f, g) {
			a.children(".boom, .boom1").remove(), d.deleteTrigger(b.value, c.SHOW.value, e, f, g), d.deleteTrigger(b.value, c.HIDE.value, e, f, g), d.deleteTrigger(b.value, c.RANDOMEVENT.value, e, f, g)
		}
		function k(a, b, c, e, f) {
			d.deleteTrigger(a.value, b, c, e, f), d.addTrigger(a.value, b, c, e, f)
		}
		function l(a, b, c) {
			var d = $("#eq_main");
			$("#" + b).remove(), a.css({
				left: c.pageX + d.scrollLeft() + 15,
				top: c.pageY + d.scrollTop(),
				zIndex: 10001
			}).appendTo(d), d.mousemove(function(c) {
				a = $("#" + b), (c.pageX < a.offset().left - 20 || c.pageX > a.offset().left + a.width() + 20 || c.pageY < a.offset().top - 20 || c.pageY > a.offset().top + a.height() + 20) && (a.hide(), $(this).unbind("mousemove"))
			})
		}
		var m = (utilTrigger.getSendType(), utilTrigger.getHandleType()),
			n = c.getElementsMap();
		return {
			restrict: "EA",
			link: e
		}
	}]).directive("leavePanel", function() {
		function a(a, b, c) {
			b.hover(function() {}, function() {
				a.obj = {
					showTriggerPanel: !1
				}, a.$apply()
			})
		}
		return {
			restrict: "EA",
			link: a
		}
	}).directive("triggerElemList", ["$translate", "sceneService", "triggerService", function(a, b, c) {
		function d(a, d, f) {
			var g = angular.copy(b.getSceneObj().obj.elements),
				h = b.getElementsMap(),
				i = {};
			a.triggerElements = [];
			var j;
			1 == a.sendType.value ? j = a.elemDef.trigger : 2 == a.sendType.value && (a.elemDef.properties || (a.elemDef.properties = {}), j = a.elemDef.properties.trigger);
			var k = $("#nr").find(".edit_area").children("li");
			$.each(g, function(a, b) {
				("2" == b.type || "4" == b.type || "h" == b.type || "x" == b.type) && (i[b.type] || (i[b.type] = []), i[b.type].push(b))
			}), $.each(i, function(b, c) {
				$.each(c, function(b, c) {
					"4" == c.type ? c.name = "图片" : "2" == c.type ? c.name = "文字" : "h" == c.type ? c.name = "形状" : "x" == c.type && (c.name = "多字体"), c.name += b + 1, c.id != a.elemDef.id && a.triggerElements.push(c)
				})
			}), j && j.sends && $.each(j.sends, function(b, c) {
				b != a.currentIndex && $.each(c.handles, function(b, c) {
					c.ids.length && $.each(c.ids, function(b, c) {
						for (var d = 0; d < a.triggerElements.length; d++) a.triggerElements[d].id == c && (a.triggerElements.splice(d, 1), d--)
					})
				})
			}), a.changed = function(b) {
				b.checked ? (c.deleteTrigger(a.sendType.value, e.HIDE.value, a.elemDef.id, b.id, a.currentIndex), c.addTrigger(a.sendType.value, e.SHOW.value, a.elemDef.id, b.id, a.currentIndex)) : (c.deleteTrigger(a.sendType.value, e.SHOW.value, a.elemDef.id, b.id, a.currentIndex), c.deleteTrigger(a.sendType.value, e.HIDE.value, a.elemDef.id, b.id, a.currentIndex))
			}, a.confirmList = function() {
				$(".mask-trigger").remove(), $(".trigger-list").remove(), a.elemDef && ($(".switch-original").remove(), $("#triggerMenu").hide(), $(".edit_area").find(".boom, .boom1").remove()), k.each(function() {
					var a = $(this),
						b = a.attr("ctype"),
						c = parseInt(a.attr("id").replace("inside_", ""), 10);
					(2 == b || 4 == b || "h" == b || "x" == b) && a.css({
						"background-color": "",
						"z-index": h[c].css.zIndex
					})
				});
				var b, c = !1;
				1 == a.sendType.value ? b = a.elemDef.trigger : 2 == a.sendType.value && (a.elemDef.properties || (a.elemDef.properties = {}), b = a.elemDef.properties.trigger), b && b.sends && b.sends[a.currentIndex] ? ($.each(b.sends[a.currentIndex].handles, function(a, b) {
					b.ids.length && (c = !0)
				}), c || a.triggerEvents.splice(a.currentIndex, 1)) : a.triggerEvents.splice(a.currentIndex, 1)
			}, a.$watch("elemDef", function(b) {
				var c;
				1 == a.sendType.value ? c = b.trigger : 2 == a.sendType.value && (b.properties || (b.properties = {}), c = b.properties.trigger), c && c.sends && $.each(c.sends, function(b, c) {
					$.each(c.handles, function(b, c) {
						$.each(c.ids, function(b, d) {
							$.each(a.triggerElements, function(a, b) {
								b.id == d && (b.checked = !0, b.triggerType = c.type)
							})
						})
					})
				})
			}, !0)
		}
		var e = (utilTrigger.getSendType(), utilTrigger.getHandleType());
		return {
			restrict: "EA",
			templateUrl: "scene/console/triggerelemlist.tpl.html",
			replace: !1,
			link: d
		}
	}]).directive("highlightElement", function() {
		function a(a, b, c) {
			var d, e = $("#nr").find("li");
			setTimeout(function() {
				b.find(".trigger-elem").hover(function(b) {
					d = $(this).attr("id").substring(8), $.each(e, function(b, c) {
						"inside_" + a.elemDef.id != $(c).attr("id") && $(c).css({
							zIndex: "",
							"background-color": ""
						})
					}), $("#inside_" + d).css({
						"z-index": 10001,
						"background-color": "rgba(255,255,255,0.9)"
					})
				}, function() {
					$.each(a.triggerElements, function(a, b) {
						$("#inside_" + b.id).css({
							"z-index": 10001,
							"background-color": "rgba(255,255,255,0.9)"
						})
					})
				})
			}, 0)
		}
		return {
			restrict: "EA",
			link: a
		}
	}), angular.module("scene.create.console.video", []), angular.module("scene.create.console.video").controller("VideoCtrl", ["$scope", "$timeout", "$translate", "obj", function(a, b, c, d) {
		function e(a) {
			var b = a.substring(a.indexOf("src=") + 4),
				c = b.substring(b.indexOf("://") + 3),
				d = c.substring(0, c.indexOf("/"));
			return d.indexOf("v.qq") >= 0 || d.indexOf("tudou") >= 0 || d.indexOf("youku") >= 0 ? !0 : !1
		}
		a.model || (a.model = {}), a.authError = "", a.model.src = d.properties.src, a.confirm = function() {
			if (!a.model.src) return $("textarea").focus(), void(a.authError = "请输入视频地址");
			var b = e(a.model.src);
			return b ? void a.$close(a.model.src) : ($("textarea").addClass("error"), $("textarea").change(function() {
				$(this).removeClass("error")
			}), void(a.authError = "暂不支持添加此视频！"))
		}, a.cancel = function() {
			a.$dismiss()
		}
	}]), angular.module("scene.create.console.ppt", ['angularFileUpload']), angular.module("scene.create.console.ppt").controller("PptCtrl", ["$scope", "$routeParams","$http","FileUploader","i18nNotifications","$route","$location", function($scope,$routeParams,$http,FileUploader,i18nNotifications,$route,$location) {
        var vm = $scope.vm = {};
        vm.values=[{value:'竖屏导入',way:'0'},{value:'横屏导入',way:'1'}];
        vm.selection=vm.values[0];
        var way=0;
        vm.change=function(index){
            way=index;
        };
         var c = "index.php?c=upfile&a=upload&bizType=0&fileType=0";
         var uploader = $scope.uploader = new FileUploader({
                url: PREFIX_URL + c
                // queueLimit: 1,
                // removeAfterUpload: true 
            });
         uploader.filters.push({
                name: 'imageFilter',
                fn: function(item /*{File|FileLikeObject}*/ , options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });
         // $scope.clearItems = function(){    //重新选择文件时，清空队列，达到覆盖文件的效果
            //   uploader.clearQueue();
            // };
            uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function(fileItem) {
                console.info('onAfterAddingFile', fileItem);
            };
            uploader.onAfterAddingAll = function(addedFileItems) {
                console.info('onAfterAddingAll', addedFileItems);
            };
            uploader.onBeforeUploadItem = function(item) {
                console.info('onBeforeUploadItem', item);
            };
            uploader.onProgressItem = function(fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
            };
            uploader.onProgressAll = function(progress) {
                console.info('onProgressAll', progress);
            };
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem, response, status, headers);
                console.log(response);
            };
            uploader.onErrorItem = function(fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
            };
            uploader.onCancelItem = function(fileItem, response, status, headers) {
                console.info('onCancelItem', fileItem, response, status, headers);
            };
            uploader.onCompleteItem = function(fileItem, response, status, headers) {
                console.info('onCompleteItem', fileItem, response, status, headers);
            };
            uploader.onCompleteAll = function() {
                console.info('onCompleteAll');
            };
           $scope.submitImages = function(){
           	var urls=[];
            var obj=[];
            for(var i=0;i<uploader.queue.length;i++){
            	obj[i] =JSON.parse(uploader.queue[i]._xhr.response);
            	urls.push({url:obj[i].obj.path});
            };
            var req ={seceneId:$routeParams.sceneId,way:way,obj:urls};
            var c = PREFIX_URL + "index.php?c=scene&a=pptsave";
			return $http({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: req
			})
			.then(function(b) {
				if (b.data.code==200) {
	            i18nNotifications.pushForCurrentRoute("scene.create.console.ppt.success", "notify.success");
					uploader.queue.length = 0;
					$scope.$dismiss();
					$route.reload();
				}
				if(b.data.code==400){
					i18nNotifications.pushForCurrentRoute("scene.create.console.ppt.error", "notify.warning");
				}
			});
            };
         $scope.cancel = function() {
         	$('console ppt_console').on('hide.bs.modal',function(e){
                 console.log('123245');
         	});
            $scope.$dismiss();
         };

    }]),angular.module("scene.create.console.psd", []), angular.module("scene.create.console.psd").controller("PsdCtrl", ["$scope", "$routeParams","$http","FileUploader","i18nNotifications","$route","$location","$timeout", function($scope,$routeParams,$http,FileUploader,i18nNotifications,$route,$location,$timeout) {
    	$scope.infoChange = function(){
		var xinxi = document.getElementById("xinxi");
		var fileName = document.getElementById("file-7").files[0].name;
		console.log(fileName)
		xinxi.innerHTML = fileName;
	     }
    	$scope.cancel = function() {
         	$('console ppt_console').on('hide.bs.modal',function(e){
            });
            $scope.$dismiss();
         };
            $scope.submitImages = function(){
   	
   	var fileObj = document.getElementById("file-7").files[0]; // 获取文件对象
   	
           var FileController = "index.php?c=scene&a=psd";                    // 接收上传文件的后台地址 
            // FormData 对象
            var form = new FormData();
            form.append("sceneid", $routeParams.sceneId);
            form.append("pageid", sessionStorage.getItem("pageid"));                        // 可以增加表单数据
            form.append("file", fileObj);                           // 文件对象
            
            //clear
            sessionStorage.setItem("pageid","");


            // XMLHttpRequest 对象
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", uploadProgress, false);
        	xhr.addEventListener("load", uploadComplete, false);
        	xhr.addEventListener("error", uploadFailed, false);
        	xhr.addEventListener("abort", uploadCanceled, false);
            xhr.open("post", FileController, true);
			// xhr.onreadystatechange = function shangchuan(evt){
			// 	var psdInfo = $.parseJSON(evt.target.responseText)
			// 	if (xhr.readyState==4 && xhr.status ==200) {//readyState表示文档加载进度,4表示完毕
					
			// 		 alert(psdInfo.msg);//responseText属性用来取得返回的文本xhr.responseText
					 
			// 		 $scope.$dismiss();
			// 		 // f.getPageTagLabel
			// 		$route.reload();
			// 	}
			// };
			function uploadProgress(evt) {
        if (evt.lengthComputable) {
          var percentComplete = Math.round(evt.loaded * 100 / evt.total);
          document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
          var progress = document.getElementById('progressNumber').innerHTML; 
          if(progress == '100%'){
          	document.getElementById('jiema').style.display='block';
          }
        }
        else {
          document.getElementById('progressNumber').innerHTML = 'unable to compute';
        }
      }

      function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        var psdInfo = $.parseJSON(evt.target.responseText)
        alert(psdInfo.msg);
        $scope.$dismiss();
        $route.reload();
      }

      function uploadFailed(evt) {
      	var psdInfo = $.parseJSON(evt.target.responseText)
        alert(psdInfo.msg);
      }

      function uploadCanceled(evt) {
      	var psdInfo = $.parseJSON(evt.target.responseText)
        alert(psdInfo.msg);
      }
            xhr.send(form);


   }
   
   

   
         

    }]), angular.module("scene.create", ["app.directives.editor", "services.scene", "confirm-dialog", "services.modal", "app.directives.component", "services.pagetpl", "save.template", "scene.create.console", "app.directives.comp.editor", "app.directives.addelement", "scene.my.upload", "services.i18nNotifications", "services.history", "security.service", "scene.edit.select", "scene.edit.common", "scene.edit.keymap", "scene.edit.bg", "scene.userGuide", "services.staticRes", "scene.create.pageTpl", "scene.create.hoverElement", "scene.preview", "services.file"]), angular.module("scene.create").controller("CreateSceneCtrl", ["$timeout", "$compile", "$rootScope", "$scope", "$routeParams", "$route", "$location", "sceneService", "pageTplService", "$modal", "ModalService", "security", "$window", "i18nNotifications", "historyService", "panStateTracker", "selectService", "continueUrl", "triggerService", "staticResService", "dataCacheService", "fileService", "storageService", function(a, b, c, d, e, f, g, h, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x) {
		function y() {
			var a = !1;
			return angular.forEach(d.tpl.obj.elements, function(b) {
				6 == ("" + b.type).charAt(0) && (a = !0)
			}), a
		}
		function z(a, b, e, f) {

			sessionStorage.setItem("pageid",d.pages[a-1].id);

			d.loading = !0, d.pageId = d.pages[a - 1].id, h.getSceneByPage(d.pageId, b, e).then(function(f) {
				d.loading = !1, d.tpl = f.data, I = d.tpl.obj.properties, I && I.trigger && t.setTrigger(d.tpl.obj.id, I.trigger), delete d.tpl.obj.scene, d.sceneId = d.tpl.obj.sceneId, d.controlView.showBgTag = !1, angular.forEach(d.tpl.obj.elements, function(a, b) {
					3 == a.type && (d.controlView.showBgTag = !0, d.currentBgDef = a)
				}), I && (I.image || I.scratch) && (d.effectName = "涂抹"), I && I.finger && (d.effectName = "指纹"), I && I.effect && ("money" == I.effect.name ? d.effectName = "数钱" : "snowFly" == I.effect.name ? d.effectName = "飘雪" : "fireWorks" == I.effect.name ? d.effectName = "烟花" : "none" == I.effect.name && (d.effectName = "无")), I && I.fallingObject && (d.effectName = "环境"), (b || e) && (g.$$search = {}, g.search("pageId", ++a), d.getPageNames()), d.pageNum = a, $("#nr").empty();
				var i = angular.copy(d.tpl.obj);
				i.elements = p.addPage(i.id, i.elements), h.templateEditor.parse({
					def: d.tpl.obj,
					appendTo: "#nr",
					mode: "edit"
				}), d.originData = JSON.stringify(d.tpl), c.$broadcast("dom.changed")
			}, function() {
				d.loading = !1
			})
		}
		function A() {
			o.pushForCurrentRoute("scene.save.success.nopublish", "notify.success")
		}
		
		d.loading = !1, d.PREFIX_FILE_HOST = PREFIX_FILE_HOST, d.tpl = {}, d.originData = "";
		var B, C = "",
			D = 21,
			E = 1,
			F = 0,
			G = !1;
		if (d.templateType = 1, d.controlView = {}, d.showSearch = !0, d.completeHtml2Canvas = null, d.lastPageTypes = [{
			name: "微学宝尾页",
			value: "eqFree"
		}, {
			name: "微学宝底标",
			value: "eqLink"
		}, {
			name: "去掉微学宝展示",
			value: "eqHide"
		}], d.pageTpl = {}, d.isAppEditor = !1, d.tabid = "template", d.$watch("user", function(a) {
			if (a) for (var b = 0; b < a.roleIdList.length; b++) 13 == a.roleIdList[b] && (d.isAppEditor = !0), (4 == a.roleIdList[b] || 12 == a.roleIdList[b] || 13 == a.roleIdList[b]) && (d.isTplEditor = !0)
		}, !0), d.refreshTpl = function() {
			F > E && !G && (G = !0, d.getPageTpls(++E))
		}, d.showPhone = "false" == x.get("create.phoneView") ? !1 : !0, d.showPhoneTip = "false" == x.get("create.showPhoneTip") ? !1 : !0, d.switchPhone = function() {
			d.showPhone = !d.showPhone, c.$broadcast("switchBox", d.showPhone), x.push("create.phoneView", d.showPhone), x.get("create.showPhoneTip") || (x.push("create.showPhoneTip", !1), d.showPhoneTip = !1)
		}, d.createComp = function(a, b) {
			return d.sceneSetting.showFlag = !1, "6" == a && y() ? void l.openMsgDialog({
				msg: "当前页面的提交按钮已经存在，请不要重复添加。"
			}) : void h.createComp(a, null, b)
		},d.$on("hisChange", function() {
			p.addPageHistory(d.tpl.obj.id, d.tpl.obj.elements)
		}), j.getPageTagLabel(11001).then(function(a) {
			d.tplFormatList = a.data.list
		}), j.getPageTagLabel(11003).then(function(a) {
			d.tplInteractionList = a.data.list
		}), j.getPageTagLabel(11002).then(function(a) {
			d.tplStyleList = a.data.list
		}), d.getPageTplTypestemp = function(a, b, c, e) {
			j.getPageTplTypestemp(a, b, c, e).then(function(a) {
				if (G = !1, a.data.list && a.data.list.length > 0) {
					E > 1 ? d.pageTpls = d.pageTpls.concat(a.data.list) : d.pageTpls = a.data.list, F = Math.ceil(a.data.map.count / D);
					var b = a.config.url.split("&time")[0];
					v.contains(b) || (v.push("pageTpl", v.getAsyncUrl(), a), v.setAsyncUrl())
				} else d.pageTpls = [], F = 0
			})
		}, d.enterPress = function(a) {
			var b = a || window.event;
			13 == b.keyCode && d.getPageTpls()
		}, d.getPageTpls = function(a) {
			var b = "";
			a || (a = E = 1);
			for (var c in d.pageTpl)"name" != c && d.pageTpl[c] && (b += d.pageTpl[c] + ",");
			"" !== b && (b = b.substr(0, b.length - 1)), d.pageTpl.name && "" !== d.pageTpl.name && (d.showSearch = !1), d.getPageTplTypestemp(b, d.pageTpl.name, D, a)
		}, d.getPageTpls(), d.resetTplFilter = function() {
			d.pageTpl.name = null, d.showSearch = !0, d.getPageTpls()
		}, d.support = function() {
			return window.sessionStorage && "false" === sessionStorage.getItem("checkSuport") ? !1 : navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv:11/) || navigator.userAgent.match(/Chrome/) ? !1 : navigator.userAgent.match(/iPad/) && navigator.userAgent.match(/CriOS/) ? !1 : (s.setUrl(g.path()), g.path("scene/support"), !0)
		}, !d.support()) {
			d.createCompGroup = function(a, b) {
				d.sceneSetting.showFlag = !1, "g101" == a && y() && (l.openMsgDialog({
					msg: "当前页面的提交按钮已经存在，本操作将会删除已添加的按钮。"
				}), angular.forEach(d.tpl.obj.elements, function(a) {
					6 == ("" + a.type).charAt(0) && ($("#nr").find("#inside_" + a.id).remove(), r.deleteElement(a.id), h.deleteElement(a.id))
				})), h.createCompGroup(a, null, b)
			}, d.isRadioCheckboxRatingAccessable = m.isAllowToAccess(m.accessDef.RADIO_CHECKBOX_RATING), d.isInteractionAccessable = m.isAllowToAccess(m.accessDef.INTERACTION), d.isInteractionCounterAccessable = m.isAllowToAccess(m.accessDef.INTERACTION_COUNTER), d.updateCompPosition = h.updateCompPosition, d.updateCompAngle = h.updateCompAngle, d.updateCompSize = h.updateCompSize, d.openAudioModal = h.openAudioModal, d.openTriggerMode = h.openTriggerMode, d.$on("dom.changed", function(a) {
				b($("#nr"))(d), c.$broadcast("boxOuter")
			});
			var H = null;
			d.$on("showCropPanel", function(a, e) {
				var f = $(".content").eq(0);
				H ? (c.$broadcast("changeElemDef", e), H.show()) : H = b("<div crop-image></div>")(d), f.append(H)
			}), d.openPageEffectModal = function(a) {
				var b = angular.copy(a);
				k.open({
					windowClass: "console six-contain effect-console",
					templateUrl: "scene/pageeffect/pageeffect.tpl.html",
					controller: "pageEffectCtrl",
					resolve: {
						properties: function() {
							return b
						}
					}
				}).result.then(function(a) {
					d.tpl.obj.properties || (d.tpl.obj.properties = {}), d.tpl.obj.properties.scratch = null, d.tpl.obj.properties.finger = null, d.tpl.obj.properties.fallingObject = null, d.tpl.obj.properties.effect = null, "无" != a.name && (d.tpl.obj.properties[a.value] = a.properties[a.value]), d.effectName = a.name
				}, function() {
					c.$broadcast("clear.scratch.interval")
				})
			};
			var I, J = null;
			d.$on("showStylePanel", function(a, c) {
				var e = $(".content").eq(0);
				J ? J.show() : "style" == c.activeTab ? J = b('<div style-modal active-tab="style"></div>')(d) : "anim" == c.activeTab ? J = b('<div style-modal active-tab="anim"></div>')(d) : "trigger" == c.activeTab && (J = b('<div style-modal active-tab="trigger"></div>')(d)), e.append(J)
			}), d.$on("hideStylePanel", function(a) {
				J && J.hide()
			}), d.refreshPage = function(a, b) {
				if (d.completeHtml2Canvas) return void d.completeHtml2Canvas.then(function() {
					d.refreshPage(a, b)
				});
				parseInt(b, 10);
				$("#nr").empty(), h.templateEditor.parse({
					def: d.tpl.obj,
					appendTo: "#nr",
					mode: "edit"
				}), c.$broadcast("dom.changed")
			}, d.navTo = function(a, b) {
				sessionStorage.setItem("pageid",a.id);
				d.controlView.pageList = !0, d.isTplEditor && (d.pageLabelAll.length = 0, d.pageIdTag = a.id, d.getPageTagLabel()), a.id != d.tpl.obj.id && (d.setEditableStatus(), d.controlView.showBgTag = !1, d.saveUsedFiles(function() {
					d.saveScene(null, function() {
						z(b + 1), g.$$search = {}, g.search("pageId", a.num);
					})
				}), q.clear())
			};
			d.saveUsedFiles = function(a) {
				var b = [];
				$.extend(b, d.tpl.obj.elements);
				for (var c = JSON.parse(d.originData).obj.elements, e = 0; e < b.length; e++) {
					var f = b[e];
					if (f.sound || f.type + "" == "3" || f.type + "" == "4") for (var g = 0; g < c.length; g++) {
						var h = c[g];
						if (f.id == h.id) {
							f.type + "" != "3" && f.type + "" != "4" ? !f.sound || h.sound && h.sound.id == f.sound.id || v.pushUsedFile(2, f.sound.id) : f.properties.id != h.properties.id && v.pushUsedFile(1, f.properties.id);
							break
						}
						g == c.length - 1 && (f.type + "" != "3" && f.type + "" != "4" ? v.pushUsedFile(2, f.sound.id) : v.pushUsedFile(1, f.properties.id))
					}
				}
				var i = v.getUsedFiles();
				v.clearUsedFiles(), i ? w.saveFilesHistory(i.file, i.type).then(function() {
					a && a()
				}) : a && a()
			}, d.stopCopy = function() {
				copied = !1
			}, d.getOriginPageName = function(a) {
				C = a.name
			}, d.getPageNames = function() {
				var a = e.sceneId;
				h.getPageNames(a).then(function(a) {
					d.pages =a.data.list, angular.forEach(d.pages, function(a, b) {
						a.name || (a.name = "第" + (b + 1) + "页")
					}), z(g.search().pageId ? g.search().pageId : d.pages[0].num)
				})
			}, d.scene = null, h.getSceneDetail(e.sceneId, c.branchid).then(function(a) {
				d.scene = h.getCurrentScene(), d.sceneSetting.oldBgAudio = d.scene.bgAudio, d.getPageNames()
			}), d.editableStatus = [], d.setEditableStatus = function(a, b, c) {
				if (a !== undefined) d.editableStatus[a] = b;
				else for (var e = 0; e < d.editableStatus.length; e++) d.editableStatus[e] = !1
			}, d.savePageNames = function(a, b) {
				a.name || (a.name = "第" + (b + 1) + "页"), d.tpl.obj.name = a.name, C != a.name && h.savePageNames(d.tpl.obj).then(function(a) {
					o.pushForCurrentRoute("page.change.success", "notify.success")
				})
			}, d.removeScratch = function(a) {
				a.stopPropagation(), d.tpl.obj.properties.scratch = null, d.tpl.obj.properties.finger = null, d.tpl.obj.properties.fallingObject = null, d.tpl.obj.properties.effect = null
			}, d.$on("text.click", function(c, e) {
				$("#btn-toolbar").remove(), $("body").append(b("<toolbar></toolbar>")(d));
				var f = $(e).offset().top;
				a(function() {
					$("#btn-toolbar").css("top", f - 50), $("#btn-toolbar").show(), $("#btn-toolbar").bind("click mousedown", function(a) {
						a.stopPropagation()
					}), $(e).wysiwyg_destroy(), $(e).wysiwyg(), $(e).trigger("dblclick").focus(), setTimeout(function() {
						if (window.getSelection) {
							var a = window.getSelection();
							a.modify("move", "left", "documentboundary"), a.modify("extend", "right", "documentboundary")
						}
					})
				})
			}), d.updatePosition = function(a) {
				var b, c, e = d.tpl.obj.elements,
					f = [];
				for (c = 0; c < e.length; c++) if ("3" == e[c].type) {
					e[c].num = 0, f.push(e[c]), e.splice(c, 1);
					break
				}
				for (b = 0; b < a.length; b++) for (c = 0; c < e.length; c++) if (e[c].num == a[b]) {
					e[c].num = b + 1, f.push(e[c]), e.splice(c, 1);
					break
				}
				d.tpl.obj.elements = f
			}, d.updateEditor = function() {
				$("#nr").empty(), h.templateEditor.parse({
					def: d.tpl.obj,
					appendTo: "#nr",
					mode: "edit"
				}), b($("#nr"))(d)
			};
			var K = !1;
			d.saveScene = function(a, b) {
				if (!d.scene.name && a && !d.sceneSetting.showFlag) return void l.openMsgDialog({
					msg: "尚未设置标题，请设置后再执行此操作",
					btn: "去设置"
				}, function() {
					d.sceneSetting.showFlag = !0   //弹出设置页面
				});
				if (!K) {
					if (d.sceneSetting.showFlag) return void d.sceneSetting.saveSceneSetting().then(function() {
						
						d.saveScene(a, b)
					});
					if (d.sceneSetting.oldBgAudio != d.scene.bgAudio) return void h.saveSceneSettings(d.scene).then(function() {
						w.saveFilesHistory(d.scene.bgAudio ? d.scene.bgAudio.id : 0, 2).then(function() {
							v.clear("fileService1")
						}), d.sceneSetting.oldBgAudio = d.scene.bgAudio, d.saveScene(a, b)
					});
					if (d.completeHtml2Canvas) return void d.completeHtml2Canvas.then(function() {
						d.saveScene(a, b)
					});
						//保存
					if (K = !0, d.originData == JSON.stringify(d.tpl)) return b && b(), a && (!d.scene.publishTime || d.scene.updateTime > d.scene.publishTime ? A() : o.pushForCurrentRoute("scene.save.success.published", "notify.success")), void(K = !1);
					delete d.tpl.obj.scene, h.resetCss(), h.saveScene(d.tpl.obj).then(function(c) {
						return a && d.saveUsedFiles(), K = !1, c.data.success ? (d.scene.updateTime = (new Date).getTime(), d.originData = angular.toJson(d.tpl), B && (h.recordTplUsage(B), B = null), b && b(), void(a && A())) : void alert("保存失败，服务器忙碌请稍后再试。")
					}, function() {
						K = !1, alert("保存失败，服务器忙碌请稍后再试。")
					})
				}
			}, d.publishScene = function() {
				return d.scene.name || d.sceneSetting.showFlag ? 2 != d.scene.status || d.allowPublish ? d.sceneSetting.showFlag ? void d.sceneSetting.saveSceneSetting().then(function() {
					d.publishScene()
				}) : d.sceneSetting.oldBgAudio != d.scene.bgAudio ? void h.saveSceneSettings(d.scene).then(function() {
					d.scene.bgAudio ? w.saveFilesHistory(d.scene.bgAudio.id, 2).then(function() {
						v.clear("fileService1"), d.sceneSetting.oldBgAudio = d.scene.bgAudio, d.publishScene()
					}) : (d.sceneSetting.oldBgAudio = d.scene.bgAudio, d.publishScene())
				}) : d.completeHtml2Canvas ? void d.completeHtml2Canvas.then(function() {
					d.publishScene()
				}) : !d.allowPublish && d.scene.publishTime && d.scene.updateTime <= d.scene.publishTime && d.originData == angular.toJson(d.tpl) ? void g.path("spread/share/" + d.sceneId + "/socialShare") : void d.saveUsedFiles(function() {
					d.saveScene(null, function() {
						h.publishScene(d.tpl.obj.sceneId).then(function(a) {
							a.data.success && (o.pushForNextRoute("scene.publish.success", "notify.success"), g.path("spread/share/" + d.sceneId + "/socialShare"))
						})
					})
				}) : void l.openConfirmDialog({
					msg: "当前微课为不允许访问状态，发布微课将重新对外开放访问 ",
					confirmName: "坚持发布",
					cancelName: "保存退出"
				}, function() {
					d.allowPublish = !0, d.publishScene()
				}, function() {
					d.saveScene(null, function() {
						g.path("spread/share/" + d.sceneId + "/socialShare")
					})
				}) : void l.openMsgDialog({
					msg: "尚未设置标题，请设置后再执行此操作",
					btn: "去设置"
				}, function() {
					d.sceneSetting.showFlag = !0
				})
			}, d.exitScene = function() {
				JSON.parse(d.originData);
				g.$$search = {}, d.originData == angular.toJson(d.tpl) ? g.path("main") : l.openConfirmDialog({
					msg: "是否保存更改内容？",
					confirmName: "保存",
					cancelName: "不保存"
				}, function() {
					d.saveScene(), g.path("main")
				}, function() {
					g.path("main")
				})
			}, d.duplicatePage = function() {
				d.saveScene(null, function() {
					z(d.pageNum, !1, !0)
				})
			}, d.insertPage = function() {
				d.saveUsedFiles(function() {
					d.saveScene(null, function() {
						z(d.pageNum, !0, !1);
					})
				}), $("#pageList").height() >= 360 && a(function() {
					var a = document.getElementById("pageList");
					a.scrollTop = a.scrollHeight
				}, 200)
			}, d.deletePage = function(a) {
				if (a.stopPropagation(), 1 != d.pages.length && !d.loading) {
					for (d.loading = !0, d.action = !1, i = 0; i < d.tpl.obj.elements.length; i++) {
						var b = d.tpl.obj.elements;
						5 == b[i].type.toString()[0] && (d.action = !0)
					}
					console.log(d.pages)
					d.action === !0 ? l.openConfirmDialog({
						msg: "确定删除此页，将同时删除该微课已收集的数据?"
					}, function() {
						L()
					}) : L()
				}
			};
			var L = function() {
					h.deletePage(d.tpl.obj.id).then(function() {
						d.loading = !1, g.$$search = {}, d.pages.length == d.pageNum ? (d.pages.pop(), g.search("pageId", --d.pageNum), z(d.pageNum, !1, !1)) : (d.pages.splice(d.pageNum - 1, 1), g.search("pageId", d.pageNum), z(d.pageNum, !1, !1))
					}, function() {
						d.loading = !1
					})
				};
			d.removeBG = function(a) {
				var b, e = d.tpl.obj.elements;
				for (b = 0; b < e.length; b++) if (3 == e[b].type) {
					e.splice(b, 1);
					var f;
					for (f = b; f < e.length; f++) e[f].num--;
					break
				}
				c.$broadcast("remove.scene.bg")
			}, d.removeBGAudio = function(a) {
				a.stopPropagation(), d.scene.bgAudio = null
			}, $(".scene_title").on("paste", function(a) {
				a.preventDefault();
				var b = (a.originalEvent || a).clipboardData.getData("text/plain") || prompt("Paste something..");
				document.execCommand("insertText", !1, b)
			}), d.myName = [{
				name: "我的"
			}], d.myCompany = [{
				name: "企业"
			}], d.creatCompanyTemplate = function() {
				var a = $.extend(!0, {}, d.tpl.obj);
				if (delete a.scene, c.user) {
					var b = parseInt(c.user.companyTplId, 10);
					// var b =50;
					b ? a.sceneId = b : c.companySceneId ? a.sceneId = c.companySceneId : a.sceneId = null, h.saveCompanyTpl(a).then(function(a) {
						a.data.success && (o.pushForCurrentRoute("companytpl.setting.success", "notify.success"), c.companySceneId = a.data.obj, d.getPageTplsByCompanyType())
					})
				} else d.myCompanyTpls = []
			}, c.$on("saveCompanyTemplate", function() {
				d.creatCompanyTemplate()
			});
			var M = null;
			d.getPageTplsByCompanyType = function() {
				if (d.myCompanyTpls = [], d.myCompany[0].active = !0, !M) if (c.companySceneId) M = c.companySceneId;
				else {
					var a = parseInt(c.user.companyTplId, 10);
					a && (M = c.companySceneId = a)
				}
				M ? h.previewScene(M).then(function(a) {
					d.myCompanyTpls = a.data.list, d.tabid = "company"
				}) : d.tabid = "company"
			}, d.getRecentlyUsedTpls = function() {
				d.tabid = "recentlyUsed", h.recentlyUsedTpls().then(function(a) {
					d.myRecentlyTpls = a.data.list
				})
			}, d.setTplTab = function() {
				d.tabid = "template"
			}, d.creatMyTemplate = function() {
				var a = $.extend(!0, {}, d.tpl.obj);
				if (delete a.scene, c.user) {
					console.log("创建我的模板");
					console.log(c);
					console.log(c.user);
					var b = JSON.parse(c.user.property);
					b && b.myTplId ? a.sceneId = b.myTplId : c.mySceneId ? a.sceneId = c.mySceneId : a.sceneId = null, h.saveMyTpl(a).then(function(a) {
						o.pushForCurrentRoute("mytpl.setting.success", "notify.success");
						console.log(a.scene);
					    console.log(a.data);
						c.mySceneId = a.data.obj, d.getPageTplsByMyType()
					})
				} else d.myPageTpls = []
			}, d.$on("saveMyTemplate", function() {
				d.creatMyTemplate()
			});
			var N = null;
			d.getPageTplsByMyType = function() {
				console.log(c);
				console.log(c.user);
				if (d.myPageTpls = [], d.myName[0].active = !0, !N) if (c.mySceneId) N = c.mySceneId;
				else {
					var a = JSON.parse(c.user.property);
					a && a.myTplId && (N = c.mySceneId = a.myTplId)
				}
				N ? h.previewScene(N).then(function(a) {
					d.myPageTpls = a.data.list, d.tabid = "myCollection"
				}) : d.tabid = "myCollection"
			}, d.$on("myPageList.update", function(a, b, c, e) {
				if ("my-tpl" == b) for (i = 0; i < d.myPageTpls.length; i++) d.myPageTpls[i].id == e && d.myPageTpls.splice(i, 1);
				if ("company-tpl" == b) for (i = 0; i < d.myCompanyTpls.length; i++) d.myCompanyTpls[i].id == e && d.myCompanyTpls.splice(i, 1)
			}), d.$on("myPageList.delete", function(a, b, d) {
				"company-tpl" == b && 21 == c.user.type && (d.context.firstElementChild.outerHTML = "")
			});
			var O = {};
			d.getPageTplsByType = function(a) {
				O[a] ? (d.childCatrgoryList = O[a], d.getPageTplTypestemp(d.childCatrgoryList[0].id), childTagCut()) : (d.childCatrgoryList = O[a] = u.getPageTpls(a), d.getPageTplTypestemp(d.childCatrgoryList[0].id), childTagCut())
			};
			var P = {};
			d.getPageTagLabel = function(a) {
				P[a] ? (d.pageLabel = P[a], R()) : d.scene && d.isAppEditor ? j.getPageTagLabel(1601).then(function(a) {
					d.pageLabel = P[1601] = a.data.list, R()
				}) : (d.pageLabel = P[a] = u.getPageTpls(a), R())
			}, d.pageLabelAll = [];
			var Q, R = function(a) {
					j.getPageTagLabelCheck(d.pageIdTag).then(function(a) {
						Q = a.data.list;
						for (var b = 0; b < d.pageLabel.length; b++) {
							for (var c = {
								id: d.pageLabel[b].id,
								name: d.pageLabel[b].name
							}, e = 0; e < Q.length; e++) {
								if (Q[e].id === d.pageLabel[b].id) {
									c.ischecked = !0;
									break
								}
								c.ischecked = !1
							}
							d.pageLabelAll.push(c)
						}
					})
				};
			d.exitPageTplPreview = function() {
				$("#nr").empty(), h.templateEditor.parse({
					def: d.tpl.obj,
					appendTo: "#nr",
					mode: "edit"
				}), c.$broadcast("dom.changed")
			}, d.insertPageTpl = function(a) {
				d.loading = !0;
				var b = function(a) {
						h.getSceneTpl(a).then(function(a) {
							d.controlView.showBgTag = !1, d.loading = !1, B = a.data.obj.id, d.tpl.obj.elements = h.getElements(), $("#nr").empty(), p.addPageHistory(d.tpl.obj.id, d.tpl.obj.elements), h.templateEditor.parse({
								def: d.tpl.obj,
								appendTo: "#nr",
								mode: "edit"
							}), angular.forEach(d.tpl.obj.elements, function(a, b) {
								3 == a.type && (d.controlView.showBgTag = !0, d.currentBgDef = a)
							}), c.$broadcast("dom.changed")
						}, function() {
							d.loading = !1
						})
					};
				d.tpl.obj.elements && d.tpl.obj.elements.length > 0 ? l.openConfirmDialog({
					msg: "页面模板会覆盖编辑区域已有组件，是否继续？",
					confirmName: "是",
					cancelName: "取消"
				}, function() {
					b(a)
				}) : b(a)
			}, d.chooseThumb = function() {
				k.open({
					windowClass: "console img_console",
					templateUrl: "scene/console/bg.tpl.html",
					controller: "BgConsoleCtrl",
					resolve: {
						obj: function() {
							return {
								fileType: "0"
							}
						}
					}
				}).result.then(function(a) {
					d.tpl.obj.properties || (d.tpl.obj.properties = {}), d.tpl.obj.properties.thumbSrc = a.data
				}, function() {
					d.tpl.obj.properties.thumbSrc = null
				})
			}, $(window).bind("beforeunload", function() {
				return "请确认您的微课已保存"
			}), d.$on("$destroy", function() {
				$(window).unbind("beforeunload"), p.clearHistory(), h.setCopy(!1), utilPictures.clearInterval()
			}), d.sortableOptions = {
				placeholder: "ui-state-highlight ui-sort-position",
				containment: "#containment",
				update: function(a, b) {
					var c = b.item.sortable.dropindex + 1,
						e = d.pages[b.item.sortable.index].id;
					d.saveScene(null, function() {
						h.changePageSort(c, e).then(function(a) {
							z(c, !1, !1, !0), g.$$search = {}, g.search("pageId", c), d.pageNum = c
						})
					})
				}
			}, d.$on("history.changed", function() {
				d.canBack = p.canBack(d.tpl.obj.id), d.canForward = p.canForward(d.tpl.obj.id)
			}), d.back = function() {
				return d.completeHtml2Canvas ? void d.completeHtml2Canvas.then(function() {
					d.back()
				}) : (d.controlView.showBgTag = !1, void h.historyBack())
			}, d.forward = function() {
				return d.completeHtml2Canvas ? void d.completeHtml2Canvas.then(function() {
					d.forward()
				}) : void h.historyForward()
			}, d.openEffects = function() {
				d.tpl.obj.properties && (d.tpl.obj.properties.scratch || d.tpl.obj.properties.finger || d.tpl.obj.properties.fallingObject || d.tpl.obj.properties.effect) || d.openPageEffectModal(d.tpl.obj.properties)
			}, d.openBgPanel = function() {
				d.controlView.showBgTag || d.createComp("3")
			}, d.openAudioPanel = function() {
				d.scene.bgAudio || d.openAudioModal()
			}, d.closeOtherPanel = function(a) {
				var b = !d.$eval(a);
				d.showBackgroundPanel = !1, d.showMusicPanel = !1, d.showEffectsPanel = !1, d.gridGuideSetting.showFlag = !1, d.$broadcast("hideBgOption"), d.showBgOptionPanel = !1, d.$eval(a + "=" + b)
			}, d.removeAudio = function(a) {
				d.scene.bgAudio = null
			}, d.sceneSetting = {
				showFlag: !1,
				oldBgAudio: null
			}, d.settingScene = function() {
				d.sceneSetting.showFlag = !0
			}, "show" == g.search().openSetting && a(function() {
				d.sceneSetting.showFlag = !0
			}, 100), d.$on("show.edit.bg", function(a, b) {
				d.controlView.showBgTag = !0, d.currBgSrc = b
			}), d.gridGuideSetting = {
				showFlag: !1
			}, d.replaceBg = function(a) {
				h.openBgModal(a), $("#nr").find(".wrapper-background").css({
					animation: "",
					"animation-fill-mode": ""
				})
			};
			var S = [];
			d.showFirstTimeTip = function(a) {
				if (d.sceneSetting.showFlag = !1, "x" == a && (d.showXiuFontTip = !0, window.localStorage)) {
					var b = localStorage.getItem("setXiuFontAction");
					b && (S = b.split(","), S.indexOf(c.user.id) > -1 && (d.showXiuFontTip = !1, h.createComp("x")))
				}
			}, d.switchShowFontTip = function(a) {
				a && (S.push(c.user.id), localStorage.setItem("setXiuFontAction", S.join(",")))
			}
		}
	}]).directive("changeColor", function() {
		return {
			link: function(a, b, c) {
				b.bind("click", function() {
					$(b).addClass("current")
				})
			}
		}
	}).directive("thumbTpl", ["sceneService", "ModalService", function(a, b) {
		return {
			scope: {
				myTpl: "="
			},
			replace: !1,
			template: '<div class="delete-element hint--bottom hint--rounded" ng-click="deleteMyTpl($event)" data-hint="删除此模板"><span class="eqf-scene-delete"></span></div>',
			link: function(c, d, e) {
				c.$emit("myPageList.delete", e.id, d), e.noDel && d.empty(), c.deleteMyTpl = function(f) {
					f.stopPropagation(), b.openConfirmDialog({
						msg: "确定删除此模板?"
					}, function() {
						a.deletePage(c.myTpl.id).then(function() {
							c.$emit("myPageList.update", e.id, d, c.myTpl.id)
						}, function(a) {
							alert("服务器异常!")
						})
					})
				}, $('<div class = "tmp-bg"></div>').appendTo(d), a.templateEditor.parse({
					def: c.myTpl,
					appendTo: d,
					mode: "view"
				}), $(".edit_area", d).css("transform", "scale(0.25) translateX(-480px) translateY(-729px)")
			}
		}
	}]).directive("gridGuideSetting", ["gridGuide", function(a) {
		return {
			scope: !0,
			template: '<div class="grid-guide-setting"><div class="setting-group"><span>网格开关</span><div class="setting-choice"><switch-btn ng-model="config.gridState"></switch-btn></div></div><div class="setting-group" style="height:60px;"><span style="height:24px;">网格颜色</span><div class="color-contain"><input class="color-picker-input" ng-model="grid.color" type="text" /><a class="color-picker" ng-style="{backgroundColor: grid.color}" ng-model="grid.color" colorpicker="rgba" disable="{{gridGuideSetting.showFlag}}"></a></div></div><div class="setting-group"><span>智能参考</span><div class="setting-choice"><switch-btn ng-model="config.guideState"></switch-btn></div></div><div class="setting-group"><span>吸附效果</span><div class="setting-choice"><switch-btn ng-model="config.snapState"></switch-btn></div></div></div>',
			link: function(a, b) {
				function c() {
					a.$apply(function() {
						a.gridGuideSetting.showFlag = !1
					})
				}
				var d = $(document);
				b.on("$destroy", function() {
					d.unbind("click", c)
				}), d.click(c)
			},
			controller: ["$scope", function(b) {
				b.grid = a.grid, b.guide = a.guide, b.config = {
					gridState: b.grid.getVisable() || "enable",
					guideState: "false" == b.grid.getGuideState() ? "disable" : "enable",
					snapState: "false" == b.grid.getSnapState() ? "disable" : "enable"
				}, b.$watch("config.gridState", function(a) {
					"enable" === a ? (b.$parent.gridGuideSetting.isGridEnabled = !0, b.grid.show()) : "disable" === a && (b.$parent.gridGuideSetting.isGridEnabled = !1, b.grid.hide()), b.grid.setVisable(a)
				}), b.$watch("grid.color", function(a) {
					a && (b.grid.paint(), b.grid.setColor(a))
				}), b.$watch("config.guideState", function(a) {
					"enable" === a ? (b.guide.options.enabled = !0, b.grid.setGuideState(!0)) : "disable" === a && (b.guide.options.enabled = !1, b.grid.setGuideState(!1))
				}), b.$watch("config.snapState", function(a) {
					"enable" === a ? (b.guide.options.snap = !0, b.grid.setSnapState(!0)) : "disable" === a && (b.guide.options.snap = !1, b.grid.setSnapState(!1))
				})
			}]
		}
	}]).directive("converToImage", ["selectService", function(a) {
		function b(a, b, c) {
			b.mousedown(function(a) {
				$(".content").trigger("mousedown")
			})
		}
		return {
			restrict: "EA",
			link: b
		}
	}]).directive("switchBtn", [function() {
		return {
			require: "ngModel",
			restrict: "AE",
			template: '<div class="switch" ng-click="switch()"><div class="circle-con"><i class="circle"></i></div></div>',
			link: function(a, b, c, d) {
				var e = b.find(".switch");
				d.$render = function() {
					e.toggleClass("switch-open", angular.equals(d.$modelValue, "enable")), e.toggleClass("switch-close", angular.equals(d.$modelValue, "disable"))
				}, e.bind("click", function() {
					var b = e.hasClass("switch-open");
					a.$apply(function() {
						d.$setViewValue(b ? "disable" : "enable"), d.$render()
					})
				})
			}
		}
	}]).directive("pageTplColor", [function() {
		return {
			require: "ngModel",
			restrict: "AE",
			template: '<em value="1" style="background-color:#ff5448"></em><em value="2" style="background-color:#f2a653"></em><em value="3" style="background-color:#f9ce49"></em><em value=4"" style="background-color:#44cb83"></em><em value="5" style="background-color:#56c6ff"></em><em value="6" style="background-color:#08a1ef"></em><em value="7" style="background-color:#7171ef"></em><em value="8" style="background-color:#cc62c7"></em><em value="9" style="background-color:#7c4611"></em><em value="10" style="background-color:#000000"></em><em value="124" style="border:1px solid #ccd5db;color:#000000;"></em><em style="position:relative;"><em style="background-color:#ff5448;top:0;left:0;"></em><em style="background-color:#f2a653;top:0;left:9px;"></em><em style="background-color:#08a1ef;top:9px;left:0;"></em><em style="background-color:#44cb83;top:9px;left:9px;"></em></em>',
			link: function(a, b, c, d) {
				function e() {
					f.unbind("click", e), a.$apply(function() {
						a.pageTpl.showColorPanel = !1
					})
				}
				for (var f = $(document), g = b.find("> em"), h = 0; h < g.length; h++) a.pageTpl.color == $(g[h]).attr("value") && $(g[h]).addClass("eqf-yes2");
				b.on("$destroy", function() {
					f.unbind("click", e), g.unbind("click")
				}), f.click(e), g.bind("click", function() {
					e(), d.$setViewValue($(this).attr("value")), "124" == $(this).attr("value") ? $(".select-color .tpl-color").css("border", "1px solid #ccd5db") : $(".select-color .tpl-color").css("border", "none"), $(".select-color .tpl-color").css("background-color", $(this).css("background-color"))
				})
			}
		}
	}]).directive("loadErr", [function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				b.bind("error", function() {
					c.$set("src", "assets/images/create/pic.svg"), b.addClass("load-err")
				})
			}
		}
	}]).directive("closePanel", [function() {
		return {
			scope: {
				pause: "@",
				model: "@"
			},
			restrict: "A",
			templateUrl: "",
			link: function(a, b, c, d) {
				function e(b) {
					"false" == a.pause && b.stopPropagation()
				}
				function f(b) {
					a.$apply(function() {
						a.$eval("$parent." + a.model + "=false")
					})
				}
				var g = $(document);
				b.click(e), g.click(f), b.on("$destroy", function() {
					g.unbind("click", f), b.unbind("click")
				})
			}
		}
	}]), angular.module("scene.create.new", ["services.scene", "services.staticRes"]), angular.module("scene.create.new").controller("SceneNewCtrl", ["$scope", "$location", "$translate", "sceneService", "items", "ModalService", "staticResService", function(a, b, c, d, e, f, g) {
		if (a.scene = {
			name: ""
		}, a.scene.types = g.getSceneType(), e) {
			var h = !0;
			angular.forEach(a.scene.types, function(b, c) {
				if (h) {
					var d = "" + e.type;
					b.value === d ? (a.scene.type = b, h = !1) : a.scene.type = a.scene.types[0]
				}
			})
		} else a.scene.type = a.scene.types[0];
		a.create = function() {
			if (e) {
				var c = {
					id: e.id,
					type: a.scene.type.value,
					pageMode: a.scene.pageMode.id,
					price: e.price
				};
				d.createByTpl(c).then(function(a) {
					200 == a.data.code ? (b.path("scene/create/" + a.data.obj), b.search("pageId", 1)) : f.openMsgDialog({
						msg: a.data.msg
					})
				}, function(a) {})
			} else d.createBlankScene(null, a.scene.type.value, a.scene.pageMode.id).then(function(a) {
				b.path("scene/create/" + a.data.obj), b.search("pageId", 1)
			});
			a.$close()
		}, a.cancel = function() {
			a.$dismiss()
		}, a.pagemodes = [{
			id: 2,
			name: "上下翻页"
		}, {
			id: 1,
			name: "左右翻页"
		}], a.scene.pageMode = a.pagemodes[0]
	}]), function() {
		angular.module("create.userGuide", []).controller("CreateUserGuideCtrl", ["$rootScope", "$scope", function(a, b) {
			if (window.localStorage) {
				var c = JSON.parse(localStorage.getItem("createUserGuide"));
				c && c[a.user.id] ? b.firstLogin = !1 : (b.firstLogin = !0, c = c || {}, c[a.user.id] = 1, localStorage.setItem("createUserGuide", JSON.stringify(c)))
			}
			b.myInterval = -1, b.userGuideSlides = [{
				image: CLIENT_CDN + "assets/images/scene/user-guide1.png"
			}, {
				image: CLIENT_CDN + "assets/images/scene/user-guide2.png"
			}, {
				image: CLIENT_CDN + "assets/images/scene/user-guide3.png"
			}, {
				image: CLIENT_CDN + "assets/images/scene/user-guide4.png"
			}, {
				image: CLIENT_CDN + "assets/images/scene/user-guide5.png"
			}, {
				image: CLIENT_CDN + "assets/images/scene/user-guide6.png"
			}], b.close = function() {
				b.firstLogin = !1
			}, b.currentIndex = 0;
			var d = b.$watch("userGuideSlides", function() {
				angular.forEach(b.userGuideSlides, function(a, c) {
					a.active && (b.currentIndex = c)
				})
			}, !0);
			b.$on("$destroy", d)
		}])
	}(), angular.module("scene.edit.bg", ["services.scene", "services.history"]), angular.module("scene.edit.bg").controller("editBgCtrl", ["$scope", "$rootScope", "sceneService", "historyService", function(a, b, c, d) {
		a.cropBg = function(e) {
			a.$broadcast("hide.editbg.panel");
			var f = {
				type: 3,
				properties: {
					src: e.properties.imgSrc
				}
			};
			c.openCropModal(f, function(c) {
				b.$broadcast("scene.bg.replace", {
					type: "imgSrc",
					src: c.src
				}, e), e.properties.imgSrc = c.src, d.addPageHistory(e.pageId, a.tpl.obj.elements)
			}, function() {})
		}, a.scaleUpBg = function(a) {
			a || (a = {}), a.effect = {
				type: "scaleUp",
				duration: 1,
				blurSize: 5
			}
		}, a.scaleDownBg = function(a) {
			a || (a = {}), a.effect = {
				type: "scaleDown",
				duration: 1,
				blurSize: 5
			}
		}, a.blurBg = function(a) {
			a || (a = {}), a.effect = {
				type: "blur",
				duration: 1,
				blurSize: 5
			}
		}, a.sharpBg = function(a) {
			a || (a = {}), a.effect = {
				type: "sharp",
				duration: 1,
				sharpSize: 5
			}
		}, a.removeBgEffect = function(b) {
			a.currentBgDef.effect = null
		}, a.$on("hideBgOption", function() {
			a.showBgOptionPanel = !1
		}), a.switchBgOption = function(b) {
			a.showBgOptionPanel = b
		}
	}]), function() {
		function a(a, b, c, d, e, f, g, h, i) {
			function j(a, c) {
				function d() {
					l(n)
				}
				a.$on("element.delete", function() {
					n = f.getElements();
					for (var a = 0, b = n.length; b > a; a++) {
						var c = $("#nr").find("#inside_" + n[a]).attr("ctype");
						if ("5" == c.charAt(0) || "a" == c || "r" == c || "c" == c) return void h.openConfirmDialog({
							msg: "将删除已收集的数据",
							confirmName: "确定",
							cancelName: "取消"
						}, d)
					}
					l(n)
				}), a.$on("element.selectall", function() {
					m()
				}), a.$on("scene.bg.replace", function(c, d, e) {
					var f = $("#nr .edit_area").parent();
					a.currentBgDef = e;
					var g = $(".wrapper-background").get(0);
					if (g || (g = document.createElement("div"), $(g).prependTo(f).addClass("wrapper-background").css({
						position: "absolute",
						width: "100%",
						height: "100%",
						backgroundSize: "cover",
						backgroundPosition: "50% 50%"
					}).attr("id", e.id)), "imgSrc" == d.type) {
						var h = d.src;
						g.style.backgroundImage = "url(" + PREFIX_FILE_HOST + h + ")", e.properties.bgColor = null, e.properties.imgSrc = h, e.properties.id = d.id, b.$broadcast("show.edit.bg", h)
					} else "backgroundColor" == d.type && (g.style.backgroundImage = "none", g.style.backgroundColor = d.color, e.properties.imgSrc = null, e.properties.bgColor = d.color, b.$broadcast("show.edit.bg"))
				}), a.$on("remove.scene.bg", function(b) {
					$(".wrapper-background").css({
						backgroundColor: "transparent",
						backgroundImage: "none"
					}).removeAttr("id"), a.controlView.showBgTag = !1
				}), a.$on("delete.random.elem", function(a, b) {
					"n" == o[b].type && ($("#nr").find("#inside_" + b).remove(), e.deleteElement(b))
				}), a.$on("convert.html.canvas", function(a, b, c) {}), a.$on("select.less.id", function(b, c) {
					o[c] && k(a, o[c], $("#nr #" + c).get(0))
				}), a.$on("select.less", function(b, c) {
					c && c.length && $.each(c, function(b, c) {
						o[c] && k(a, o[c], $("#nr #" + c).get(0))
					})
				})
			}
			function k(b, c, d) {
				if ("x" == c.type) {
					var e = a.defer();
					b.completeHtml2Canvas = e.promise;
					var f = $(d).closest("li").clone();
					f.appendTo("#nr .edit_area").css({
						position: "absolute",
						zIndex: 2,
						opacity: 0,
						transform: ""
					}), setTimeout(function() {
						var a = f.find(".element-box").get(0),
							d = f.width(),
							g = f.height();
						$(a).attr("style", "").css({
							color: c.css.color,
							width: d + "px",
							height: g + "px"
						}), f.css({
							transform: ""
						}), html2canvas(a, {
							width: d,
							height: g,
							onrendered: function(a) {
								f.remove();
								var d = a.toDataURL();
								c.properties.dataUrl = d, e.resolve(), b.completeHtml2Canvas = null
							}
						})
					}, 0)
				}
			}
			function l(a) {
				var c = e.getSceneObj(),
					d = e.getElementsMap();
				utilTrigger.getHandleType();
				g.addPageHistory(c.obj.id, c.obj.elements), $.each(a, function(a, b) {
					i.resetTrigger(parseInt(b, 10)), $("#nr").find("#inside_" + b).remove(), e.deleteElement(b)
				}), $.each(d, function(a, b) {
					i.clearTrigger(a);
					var c = i.getTrigger(a);
					c ? b.trigger = c : delete b.trigger
				}), g.addPageHistory(c.obj.id, c.obj.elements), f.clearElements(), b.$broadcast("hideStylePanel"), $("#popMenu").hide()
			}
			function m() {
				f.clearElements();
				var a = $("#nr").find("ul").find("li");
				a.children(".bar").show(), a.each(function(a, b) {
					f.addElement($(b).attr("id").split("_")[1])
				})
			}
			var n, o = e.getElementsMap();
			return {
				restrict: "EA",
				link: j
			}
		}
		angular.module("scene.edit.common", ["services.scene", "services.select", "services.history"]).directive("editCommon", ["$q", "$rootScope", "$location", "$translate", "sceneService", "selectService", "historyService", "ModalService", "triggerService", a])
	}(), function() {
		function a(a, b, c, d) {
			function e(c, e, f, g) {
				var h = $(document);
				c.$on("$destroy", function() {
					h.unbind("keydown")
				});
				var i, j = {
					deltaX: 0,
					deltaY: 0
				};
				h.unbind("keydown").keydown(function(e) {
					if (8 == e.keyCode || 46 == e.keyCode) {
						if ($(".modal-dialog").length || $("#pageList").find("input").is(":focus")) return;
						d.getElements().length && (e.preventDefault(), a.$broadcast("element.delete"))
					}
					if ((37 == e.keyCode || 38 == e.keyCode || 39 == e.keyCode || 40 == e.keyCode) && (d.getElements().length && e.preventDefault(), i || (i = !0, g.compDragStart(j)), 37 == e.keyCode && (j.deltaX -= 1, g.compDragMove(j)), 38 == e.keyCode && (j.deltaY -= 1, g.compDragMove(j)), 39 == e.keyCode && (j.deltaX += 1, g.compDragMove(j)), 40 == e.keyCode && (j.deltaY += 1, g.compDragMove(j))), (e.ctrlKey || e.metaKey) && 65 == e.keyCode) {
						if ($(".modal-dialog").length) return;
						if (e.preventDefault(), i) return;
						i = !0, a.$broadcast("element.selectall")
					}
					if ((e.ctrlKey || e.metaKey) && 90 == e.keyCode && b.historyBack(), (e.ctrlKey || e.metaKey) && 89 == e.keyCode && b.historyForward(), (e.ctrlKey || e.metaKey) && 67 == e.keyCode) {
						if ($(".modal-dialog").length) return;
						b.copyElement()
					}
					if ((e.ctrlKey || e.metaKey) && 86 == e.keyCode) {
						if ($(".modal-dialog").length) return;
						b.getCopy() && b.pasteElement()
					}
					c.$apply()
				}).unbind("keyup").keyup(function(a) {
					i = !1, (j.deltaX || j.deltaY) && g.compDragEnd(j), j.deltaX = 0, j.deltaY = 0, c.$apply()
				})
			}
			return {
				restrict: "A",
				link: e,
				require: "^multiCompDrag"
			}
		}
		angular.module("scene.edit.keymap", ["services.scene", "services.history", "services.select"]).directive("editKeymap", ["$rootScope", "sceneService", "historyService", "selectService", a])
	}(), angular.module("scene.edit.select", ["services.history", "services.scene"]).controller("selectCtrl", ["$scope", function(a) {
		a.pasteOpacity = .3, a.$on("select.more", function() {
			a.safeApply(function() {
				a.showSelectPanel = !0
			})
		}), a.$on("select.less", function() {
			a.safeApply(function() {
				a.showSelectPanel = !1
			})
		}), a.$on("copyState.update", function(b, c) {
			a.safeApply(function() {
				a.pasteOpacity = c ? 1 : .3
			})
		})
	}]).directive("eqxAlignLeft", ["selectService", "sceneService", "historyService", "editAreaBorderCollisionDetector", "multiCompResize", function(a, b, c, d, e) {
		return {
			link: function(a, f) {
				f.click(function() {
					a.$apply(function() {
						e.initCollisionDetectorWithElements();
						var a = d.bigDetectionBoxPointA.x;
						angular.forEach(d.editArea.detectionBoxs, function(c) {
							var d = a - c.startPointA.x;
							d = d == Math.abs(d) ? Math.floor(d) : Math.ceil(d);
							var e = {
								top: c.startPosition.top,
								left: c.startPosition.left + d
							};
							c.element.css("left", e.left), b.updateCompPosition(c.element.attr("id"), e, !0)
						});
						var f = b.getSceneObj();
						c.addPageHistory(f.obj.id, f.obj.elements)
					})
				})
			}
		}
	}]).directive("eqxAlignHorizontalCenter", ["selectService", "sceneService", "historyService", "editAreaBorderCollisionDetector", "multiCompResize", function(a, b, c, d, e) {
		return {
			link: function(a, f) {
				f.click(function() {
					a.$apply(function() {
						e.initCollisionDetectorWithElements();
						var a = d.bigDetectionBoxPointO.x;
						angular.forEach(d.editArea.detectionBoxs, function(c) {
							var d = a - c.startPointO.x;
							d = d == Math.abs(d) ? Math.floor(d) : Math.ceil(d);
							var e = {
								top: c.startPosition.top,
								left: c.startPosition.left + d
							};
							c.element.css("left", e.left), b.updateCompPosition(c.element.attr("id"), e, !0)
						});
						var f = b.getSceneObj();
						c.addPageHistory(f.obj.id, f.obj.elements)
					})
				})
			}
		}
	}]).directive("eqxAlignRight", ["selectService", "sceneService", "historyService", "editAreaBorderCollisionDetector", "multiCompResize", function(a, b, c, d, e) {
		return {
			link: function(a, f) {
				f.click(function() {
					a.$apply(function() {
						e.initCollisionDetectorWithElements();
						var a = d.bigDetectionBoxPointB.x;
						angular.forEach(d.editArea.detectionBoxs, function(c) {
							var d = a - c.startPointB.x;
							d = d == Math.abs(d) ? Math.floor(d) : Math.ceil(d);
							var e = {
								top: c.startPosition.top,
								left: c.startPosition.left + d
							};
							c.element.css("left", e.left), b.updateCompPosition(c.element.attr("id"), e, !0)
						});
						var f = b.getSceneObj();
						c.addPageHistory(f.obj.id, f.obj.elements)
					})
				})
			}
		}
	}]).directive("eqxAlignTop", ["selectService", "sceneService", "historyService", "editAreaBorderCollisionDetector", "multiCompResize", function(a, b, c, d, e) {
		return {
			link: function(a, f) {
				f.click(function() {
					a.$apply(function() {
						e.initCollisionDetectorWithElements();
						var a = d.bigDetectionBoxPointA.y;
						angular.forEach(d.editArea.detectionBoxs, function(c) {
							var d = a - c.startPointA.y;
							d = d == Math.abs(d) ? Math.floor(d) : Math.ceil(d);
							var e = {
								top: c.startPosition.top + d,
								left: c.startPosition.left
							};
							c.element.css("top", e.top), b.updateCompPosition(c.element.attr("id"), e, !0)
						});
						var f = b.getSceneObj();
						c.addPageHistory(f.obj.id, f.obj.elements)
					})
				})
			}
		}
	}]).directive("eqxAlignVerticalCenter", ["selectService", "sceneService", "historyService", "editAreaBorderCollisionDetector", "multiCompResize", function(a, b, c, d, e) {
		return {
			link: function(a, f) {
				f.click(function() {
					a.$apply(function() {
						e.initCollisionDetectorWithElements();
						var a = d.bigDetectionBoxPointO.y;
						angular.forEach(d.editArea.detectionBoxs, function(c) {
							var d = a - c.startPointO.y;
							d = d == Math.abs(d) ? Math.floor(d) : Math.ceil(d);
							var e = {
								top: c.startPosition.top + d,
								left: c.startPosition.left
							};
							c.element.css("top", e.top), b.updateCompPosition(c.element.attr("id"), e, !0)
						});
						var f = b.getSceneObj();
						c.addPageHistory(f.obj.id, f.obj.elements)
					})
				})
			}
		}
	}]).directive("eqxAlignBottom", ["selectService", "sceneService", "historyService", "editAreaBorderCollisionDetector", "multiCompResize", function(a, b, c, d, e) {
		return {
			link: function(a, f) {
				f.click(function() {
					a.$apply(function() {
						e.initCollisionDetectorWithElements();
						var a = d.bigDetectionBoxPointB.y;
						angular.forEach(d.editArea.detectionBoxs, function(c) {
							var d = a - c.startPointB.y;
							d = d == Math.abs(d) ? Math.floor(d) : Math.ceil(d);
							var e = {
								top: c.startPosition.top + d,
								left: c.startPosition.left
							};
							c.element.css("top", e.top), b.updateCompPosition(c.element.attr("id"), e, !0)
						});
						var f = b.getSceneObj();
						c.addPageHistory(f.obj.id, f.obj.elements)
					})
				})
			}
		}
	}]).directive("eqxVerticalAverage", ["selectService", "sceneService", "historyService", "editAreaBorderCollisionDetector", "multiCompResize", function(a, b, c, d, e) {
		return function(f, g) {
			g.click(function() {
				var g = a.getElements(),
					h = g.length;
				2 > h || f.$apply(function() {
					e.initCollisionDetectorWithElements();
					var a = d.editArea.detectionBoxs;
					a.sort(function(a, b) {
						return a.startPointO.y > b.startPointO.y
					});
					var f = a[0].startPointO.y,
						g = a[h - 1].startPointO.y,
						i = (g - f) / (h - 1);
					angular.forEach(a, function(a, c) {
						if (0 !== c && c != h) {
							var d = f + c * i - a.startPointO.y;
							d = d == Math.abs(d) ? Math.floor(d) : Math.ceil(d);
							var e = {
								top: a.startPosition.top + d,
								left: a.startPosition.left
							};
							a.element.css("top", e.top), b.updateCompPosition(a.element.attr("id"), e, !0)
						}
					});
					var j = b.getSceneObj();
					c.addPageHistory(j.obj.id, j.obj.elements)
				})
			})
		}
	}]).directive("eqxHorizontalAverage", ["selectService", "sceneService", "historyService", "editAreaBorderCollisionDetector", "multiCompResize", function(a, b, c, d, e) {
		return function(f, g) {
			g.click(function() {
				var g = a.getElements(),
					h = g.length;
				2 > h || f.$apply(function() {
					e.initCollisionDetectorWithElements();
					var a = d.editArea.detectionBoxs;
					a.sort(function(a, b) {
						return a.startPointO.x > b.startPointO.x
					});
					var f = a[0].startPointO.x,
						g = a[h - 1].startPointO.x,
						i = (g - f) / (h - 1);
					angular.forEach(a, function(a, c) {
						if (0 !== c && c != h) {
							var d = f + c * i - a.startPointO.x;
							d = d == Math.abs(d) ? Math.floor(d) : Math.ceil(d);
							var e = {
								top: a.startPosition.top,
								left: a.startPosition.left + d
							};
							a.element.css("left", e.left), b.updateCompPosition(a.element.attr("id"), e, !0)
						}
					});
					var j = b.getSceneObj();
					c.addPageHistory(j.obj.id, j.obj.elements)
				})
			})
		}
	}]).directive("eqxCopy", ["selectService", "sceneService", function(a, b) {
		return {
			link: function(a, c) {
				var d = $(c);
				d.click(function() {
					b.copyElement()
				})
			}
		}
	}]).directive("eqxPaste", ["sceneService", "historyService", function(a, b) {
		return {
			link: function(c, d) {
				var e = $(d);
				e.click(function() {
					if (a.getCopy()) {
						a.pasteElement();
						var d = a.getSceneObj();
						b.addPageHistory(d.obj.id, d.obj.elements), c.$apply()
					}
				})
			}
		}
	}]).directive("eqxDeleteMore", ["$rootScope", function(a) {
		return {
			link: function(b, c) {
				var d = $(c);
				d.click(function() {
					a.$broadcast("element.delete")
				})
			}
		}
	}]), angular.module("scene.edit.trigger", []).factory("triggerService", ["$rootScope", function(a) {
		function b(a, b, c, d, e) {
			var g = f(a, b, c, e).ids,
				h = g.indexOf(d);
			h >= 0 || g.push(d)
		}
		function c(a, b, c, d, e) {
			var g = m[c];
			if (g && g.sends.length) {
				var h = f(a, b, c, e).ids,
					i = h.indexOf(d);
				0 > i || h.splice(i, 1)
			}
		}
		function d(b, c, d, e) {
			var f = i(b, d, e).ids,
				g = f.indexOf(c);
			g >= 0 || (f.push(c), a.$broadcast("receive.element.update", b, c, d, e))
		}
		function e(b, c, d, e) {
			var f = i(b, d, e).ids,
				g = f.indexOf(c);
			0 > g || (f.splice(g, 1), a.$broadcast("receive.element.update", b, c, d, e))
		}
		function f(a, b, c, d) {
			var e = g(a, c, d).handles,
				f = j(e, b);
			if (f) return f;
			var h = {
				type: b,
				ids: []
			};
			return e.push(h), h
		}
		function g(a, b, c) {
			var d = h(b),
				e = d.sends,
				f = k(e, c);
			if (f) return f;
			var g = {
				sendIndex: c,
				delay: 0,
				type: a,
				handles: []
			};
			return e.push(g), g
		}
		function h(a) {
			return m[a] || (m[a] = {
				sends: [],
				receives: []
			}), m[a]
		}
		function i(a, b, c) {
			var d = h(b),
				e = d.receives,
				f = j(e, a);
			if (f) return f;
			var g = {
				type: a,
				ids: []
			};
			return e.push(g), g
		}
		function j(a, b) {
			for (var c = 0; c < a.length; c++) if (b == a[c].type) return a[c];
			return null
		}
		function k(a, b) {
			for (var c = 0; c < a.length; c++) if (b == a[c].sendIndex) return a[c];
			return null
		}
		var l = {},
			m = {};
		return l.getTrigger = function(a) {
			return m[a]
		}, l.getReceiveIds = function(a, b, c) {
			if ("number" != typeof a || "number" != typeof b || "number" != typeof c) return [];
			var d = f(a, b, c).ids;
			return angular.copy(d)
		}, l.getSendIds = function(a, b) {
			if ("number" != typeof a || "number" != typeof b) return [];
			var c = i(a, b).ids;
			return angular.copy(c)
		}, l.setTrigger = function(a, b) {
			"number" == typeof a && "object" == typeof b && (m[a] = b)
		}, l.addTrigger = function(a, c, e, f, h) {
			"number" == typeof a && "number" == typeof c && "number" == typeof e && "number" == typeof f && (m[e] && m[e].sends[h] || g(a, e, h), b(a, c, e, f, m[e].sends[h].sendIndex), d(c, e, f, h))
		}, l.deleteTrigger = function(a, b, d, f, g) {
			"number" == typeof a && "number" == typeof b && "number" == typeof d && "number" == typeof f && m[d] && m[d].sends[g] && (c(a, b, d, f, m[d].sends[g].sendIndex), e(b, d, f, g))
		}, l.clearTrigger = function(a) {
			var b = m[a];
			if (b) {
				for (var c = !1, d = !1, e = 0; e < b.sends.length; e++) {
					if ("number" == typeof b.sends[e].sendIndex) for (var f = 0; f < b.sends[e].handles.length; f++) if (b.sends[e].handles[f].ids.length) {
						c = !0;
						break
					}
					if (c) break
				}
				for (var g = 0; g < b.receives.length; g++) if (b.receives[g].ids.length) {
					d = !0;
					break
				}
				c || d || delete m[a]
			}
		}, l.resetTrigger = function(a) {
			if ("number" == typeof a) {
				var b = utilTrigger.getSendType(),
					c = utilTrigger.getHandleType();
				for (var d in b) for (var e in c) {
					var f = b[d].value,
						g = c[e].value,
						h = i(g, a).ids;
					h.length && $.each(h, function(b, c) {
						for (var d = l.getTrigger(c).sends, e = 0; e < d.length; e++)"undefined" == typeof d[e].sendIndex && d[e].hasOwnProperty("sendIndex") && (d.splice(e, 1), e--);
						var h = c;
						$.each(d, function(b, c) {
							var d = b;
							$.each(c.handles, function(b, c) {
								c.value;
								if (c.ids.length) {
									var i = c.ids;
									for (e = 0; e < i.length; e++) i[e] == a && l.deleteTrigger(f, g, h, a, d)
								}
							})
						})
					});
					var j = l.getTrigger(a);
					if (j && j.sends.length) for (var k = 0; k < j.sends.length; k++)"undefined" == typeof j.sends[k].sendIndex && triggerSends[k].hasOwnProperty("sendIndex") ? (j.sends.splice(k, 1), k--) : l.deleteTriggerBySendIndex(k, a)
				}
			}
		}, l.deleteTriggerBySendIndex = function(b, c) {
			var d = m[c];
			if (d && d.sends.length) {
				for (var e = 0; e < d.sends.length; e++)"undefined" == typeof d.sends[e].sendIndex && triggerSends[e].hasOwnProperty("sendIndex") && (d.sends.splice(e, 1), e--);
				var f = d.sends[b].type;
				$.each(d.sends[b].handles, function(d, e) {
					var g = e.type;
					if (e.ids.length) for (var h = 0; h < e.ids.length; h++) a.$broadcast("delete.random.elem", e.ids[h]), l.deleteTrigger(f, g, c, e.ids[h], b), h--
				}), d.sends.splice(b, 1)
			}
		}, l.getSend = g, l
	}]), angular.module("scene.create.pageTpl", []), angular.module("scene.create.pageTpl").controller("PageTplController", ["$scope", "pageTplService", function(a, b) {
        a.$watch("tpl", function(b) {
			if (a.tplElements = [], b && b.obj && b.obj.elements) {
				var c = angular.copy(b.obj.elements);
				$.each(c, function(b, c) {
					"4" == c.type && (c.isEditable || (c.isEditable = 1), a.tplElements.push(c))
				})
			}
		}, !0), a.pageChildLabel = function() {
			var c, d = [];
			for (c = 0; c < a.pageLabelAll.length; c++) a.pageLabelAll[c].ischecked && d.push(a.pageLabelAll[c].id);
			a.tpl.obj.elements && $.each(a.tplElements, function(b, c) {
				$.each(a.tpl.obj.elements, function(a, b) {
					c.id == b.id && (-1 == c.isEditable ? b.isEditable = -1 : delete b.isEditable)
				})
			}), b.updataChildLabel(d, a.pageIdTag).then(function() {
				alert("分配成功！"), a.controlView.pageList = !1
			}, function() {})
		}
	}]), angular.module("scene.pageeffect.fall", []), angular.module("scene.pageeffect.fall").controller("fallEffectCtrl", ["$scope", "$translate", function(a, b) {
		var c = a.properties;
		a.fallings = [{
			name: "福字",
			path: CLIENT_CDN + "assets/images/create/fallings/fuzi1.png",
			rotate: 180,
			vy: 3
		}, {
			name: "红包",
			path: CLIENT_CDN + "assets/images/create/fallings/hongbao2.png",
			rotate: 180,
			vy: 3
		}, {
			name: "绿枫叶",
			path: CLIENT_CDN + "assets/images/create/fallings/lvfengye.png",
			rotate: 180,
			vy: 3
		}, {
			name: "星星",
			path: CLIENT_CDN + "assets/images/create/fallings/xing.png",
			rotate: 180,
			vy: 3
		}, {
			name: "雪花",
			path: CLIENT_CDN + "assets/images/create/fallings/snow.png",
			rotate: 0,
			vy: 1
		}], c && c.fallingObject ? (a.controlView.effectType = "fallingObject", a.falling = c.fallingObject, angular.forEach(a.fallings, function(b, c) {
			b.path == a.falling.src.path && (a.falling.src = b)
		})) : a.falling = {
			src: a.fallings[0],
			density: 2
		}, a.$on("save.falling.effect", function() {
			c = {}, c.fallingObject = a.falling, a.$close({
				properties: c,
				name: "落物",
				value: "fallingObject"
			})
		})
	}]), angular.module("scene.pageeffect.finger", []), angular.module("scene.pageeffect.finger").controller("fingerEffectCtrl", ["$scope", "$translate", function(a, b) {
		var c, d = a.properties;
		a.fingerZws = [{
			name: "粉色指纹",
			path: CLIENT_CDN + "assets/images/create/fingers/zhiwen1.png"
		}, {
			name: "白色指纹",
			path: CLIENT_CDN + "assets/images/create/fingers/zhiwen2.png"
		}, {
			name: "蓝色指纹",
			path: CLIENT_CDN + "assets/images/create/fingers/zhiwen3.png"
		}], a.fingerBackgrounds = [{
			name: "粉红回忆",
			path: CLIENT_CDN + "assets/images/create/fingers/bg1.jpg"
		}, {
			name: "深蓝花纹",
			path: CLIENT_CDN + "assets/images/create/fingers/bg2.jpg"
		}, {
			name: "淡绿清新",
			path: CLIENT_CDN + "assets/images/create/fingers/bg3.jpg"
		}, {
			name: "深紫典雅",
			path: CLIENT_CDN + "assets/images/create/fingers/bg4.jpg"
		}, {
			name: "淡紫水滴",
			path: CLIENT_CDN + "assets/images/create/fingers/bg5.jpg"
		}, {
			name: "蓝白晶格",
			path: CLIENT_CDN + "assets/images/create/fingers/bg6.jpg"
		}, {
			name: "蓝色水滴",
			path: CLIENT_CDN + "assets/images/create/fingers/bg7.jpg"
		}, {
			name: "朦胧绿光",
			path: CLIENT_CDN + "assets/images/create/fingers/bg8.jpg"
		}, {
			name: "灰色金属",
			path: CLIENT_CDN + "assets/images/create/fingers/bg9.jpg"
		}], d && d.finger ? (a.controlView.effectType = "finger", a.finger = d.finger, angular.forEach(a.fingerZws, function(b, c) {
			b.path == a.finger.zwImage.path && (a.finger.zwImage = b)
		}), angular.forEach(a.fingerBackgrounds, function(b, c) {
			b.path == a.finger.bgImage.path && (a.finger.bgImage = b)
		})) : a.finger = {
			zwImage: a.fingerZws[0],
			bgImage: a.fingerBackgrounds[0]
		}, c = angular.copy(a.finger.bgImage), a.replaceImg = function(b) {
			return b.bgImage ? void(c = angular.copy(a.finger.bgImage)) : void a.$emit("select.effect.image", "finger")
		}, a.$on("replace.effect.image", function(b, d, e) {
			"finger" == e && (a.finger.bgImage || (a.finger.bgImage = {}), a.finger.bgImage.path = PREFIX_FILE_HOST + d.data, a.fingerBackgrounds[0].name || a.fingerBackgrounds.shift(), a.fingerBackgrounds.unshift(a.finger.bgImage), c = angular.copy(a.finger.bgImage))
		}), a.$on("cancel.effect.replace", function(b, d) {
			"finger" == d && angular.forEach(a.fingerBackgrounds, function(b, d) {
				c.name ? c.name == b.name && (a.finger.bgImage = b) : b.name || (a.finger.bgImage = b)
			})
		}), a.$on("save.finger.effect", function() {
			d = {}, d.finger = a.finger, a.$close({
				properties: d,
				name: "指纹",
				value: "finger"
			})
		})
	}]).directive("fingerMove", function() {
		function a(a, b, c) {
			b.css({
				animation: "move 2s ease 0",
				"animation-iteration-count": "infinite"
			})
		}
		return {
			restrict: "EA",
			link: a
		}
	}),angular.module("scene.pageeffect.fireworks", []), angular.module("scene.pageeffect.fireworks").controller("fireWorksCtrl", ["$scope", "$translate", function(a, b) {
		var c = a.properties;
		c && c.effect && "fireWorks" == c.effect.name && (a.controlView.effectType = "fireWorks", a.controlView.effectIndex = 5), a.$on("save.fireworks.effect", function() {
			c = {}, c.effect = {
				name: "fireWorks"
			}, a.$close({
				properties: c,
				name: "烟花",
				value: "effect"
			})
		})
	}]), angular.module("common.directives.inputNumber", []).directive("eqdInputNumber", function() {
		function a(a, j, k, l) {
			j.on("$destroy", function() {
				j.unbind("mousedown")
			});
			var m = "string" == typeof k.min ? k.min : -Number.MAX_VALUE,
				n = "string" == typeof k.max ? k.max : Number.MAX_VALUE,
				o = "string" == typeof k.unit ? k.unit : "px",
				p = "string" == typeof k.step ? k.step : "1",
				q = 0;
			p.indexOf(".") > -1 && (q = p.split(".")[1].length), "px" == o ? (l.$parsers.push(b), l.$formatters.push(c)) : "deg" == o ? (o = "", l.$parsers.push(d), l.$formatters.push(e)) : "%" == o ? (l.$parsers.push(f), l.$formatters.push(g)) : l.$parsers.push(h), j.mousedown(function(b) {
				var c, d = parseFloat(j.val()) || 0,
					e = b.pageX;
				i.mousemove(function(b) {
					b.preventDefault(), c = b.pageX - e;
					var f = +(d + c * p).toFixed(q);
					f >= m && n >= f ? f += o : m > f ? f = m + o : f > n && (f = n + o), l.$viewValue != f && (l.$setViewValue(f), l.$render(), a.$apply())
				}), i.mouseup(function() {
					i.unbind("mousemove mouseup")
				})
			}).keydown(function(a) {
				var b = a.keyCode;
				return !!(b >= 48 && 57 >= b || b >= 96 && 105 >= b || 36 == b || 35 == b || 37 == b || 39 == b || 8 == b || 46 == b)
			})
		}
		function b(a) {
			return a = /-?\d+/.exec(a), a ? parseFloat(a) + "px" : "0"
		}
		function c(a) {
			return /-?\d+/.exec(a) + "px"
		}
		function d(a) {
			return a = /\d+/.exec(a), a ? "rotateZ(" + parseFloat(a) + "deg)" : "rotateZ(0)"
		}
		function e(a) {
			return /\d+/.exec(a)
		}
		function f(a) {
			return a = /\d+/.exec(a), a ? a / 100 + "" : "0"
		}
		function g(a) {
			return 100 * a + "%"
		}
		function h(a) {
			return "" === a && (a = "0"), parseFloat(a) + ""
		}
		var i = $(document);
		return {
			restrict: "E",
			require: "ngModel",
			template: '<input class="eqc-input-number"/>',
			replace: !0,
			link: a
		}
	}), angular.module("scene.pageeffect.money", []), angular.module("scene.pageeffect.money").controller("moneyEffectCtrl", ["$scope", "$translate", function(a, b) {
		var c = a.properties;
		c && c.effect && "money" == c.effect.name ? (a.controlView.effectType = "money", a.money = {
			tip: c.effect.tip
		}) : a.money = {
			tip: "握紧钱币，数到手抽筋吧"
		}, a.$on("save.money.effect", function() {
			c = {}, c.effect = {
				name: "money",
				tip: a.money.tip
			}, a.$close({
				properties: c,
				name: "数钱",
				value: "effect"
			})
		})
	}]), angular.module("scene.pageeffect.none", []), angular.module("scene.pageeffect.none").controller("noneEffectCtrl", ["$scope", "$translate", function(a, b) {
		var c = a.properties;
		c && c.effect && "none" == c.effect.name && (a.controlView.effectType = "none"), a.$on("save.none.effect", function() {
			c = {}, c.effect = {
				name: "none"
			}, a.$close({
				name: "无"
			})
		})
	}]), angular.module("scene.pageeffect.console", ["scene.pageeffect.scratch", "scene.pageeffect.finger", "scene.pageeffect.money", "scene.pageeffect.fall", "scene.pageeffect.snow", "scene.pageeffect.fireworks", "scene.pageeffect.none"]), angular.module("scene.pageeffect.console").controller("pageEffectCtrl", ["$scope", "$rootScope", "$modal", "$translate", "properties", "sceneService", function(a, b, c, d, e, f) {
		a.properties = e, a.controlView = {}, a.effectList = [{
			type: "scratch",
			name: "涂抹",
			src: CLIENT_CDN + "assets/images/create/waterdrop.jpg"
		}, {
			type: "finger",
			name: "指纹",
			src: CLIENT_CDN + "assets/images/create/fingers/zhiwen1.png"
		}, {
			type: "money",
			name: "数钱",
			src: CLIENT_CDN + "assets/images/create/money_thumb1.jpg"
		}, {
			type: "fallingObject",
			name: "环境",
			src: CLIENT_CDN + "assets/images/create/falling.png"
		}, {
			type: "snowFly",
			name: "飘雪",
			src: CLIENT_CDN + "assets/images/create/snowfly.png"
		}, {
			type: "fireWorks",
			name: "烟花",
			src: CLIENT_CDN + "assets/images/create/fireworks.jpg"
		}, {
			type: "none",
			name: "无",
			src: ""
		}], e && (!e || e.scratch || e.finger || e.fallingObject || e.effect) || (e = {}, a.controlView.effectType = "scratch", a.controlView.effectIndex = 0), a.selectEffect = function(b, c) {
			a.controlView.effectType = b.type, a.controlView.effectIndex = c
		}, a.confirm = function() {
			"scratch" == a.controlView.effectType ? a.$broadcast("save.scratch.effect") : "finger" == a.controlView.effectType ? a.$broadcast("save.finger.effect") : "money" == a.controlView.effectType ? a.$broadcast("save.money.effect") : "fallingObject" == a.controlView.effectType ? a.$broadcast("save.falling.effect") : "snowFly" == a.controlView.effectType ? a.$broadcast("save.snow.effect") : "fireWorks" == a.controlView.effectType ? a.$broadcast("save.fireworks.effect") : "none" == a.controlView.effectType && a.$broadcast("save.none.effect")
		}, a.$on("select.effect.image", function(a, d) {
			c.open({
				windowClass: "console img_console",
				templateUrl: "scene/console/bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 0
						}
					}
				}
			}).result.then(function(a) {
				var c = {
					type: 3,
					properties: {
						src: a.data
					}
				};
				a.height / a.width >= 1008 / 642 && a.height / a.width <= 1.578125 ? b.$broadcast("replace.effect.image", a, d) : f.openCropModal(c, function(a) {
					var c = {
						data: a.src
					};
					b.$broadcast("replace.effect.image", c, d)
				}, function() {
					b.$broadcast("cancel.effect.replace", d)
				})
			}, function(a) {
				b.$broadcast("cancel.effect.replace", d)
			})
		}), a.cancel = function() {
			b.$broadcast("clear.scratch.interval"), a.$dismiss()
		}
	}]), angular.module("scene.pageeffect.scratch", ["common.directives.inputNumber"]), angular.module("scene.pageeffect.scratch").controller("scratchEffectCtrl", ["$scope", "$rootScope", "$translate", "i18nNotifications", function(a, b, c, d) {
		var e, f = a.properties;
		a.scratches = [{
			name: "水滴",
			path: CLIENT_CDN + "assets/images/create/waterdrop.jpg"
		}, {
			name: "细沙",
			path: CLIENT_CDN + "assets/images/create/sand.jpg"
		}, {
			name: "花瓣",
			path: CLIENT_CDN + "assets/images/create/flowers.jpg"
		}, {
			name: "金沙",
			path: CLIENT_CDN + "assets/images/create/goldsand.jpg"
		}, {
			name: "白雪",
			path: CLIENT_CDN + "assets/images/create/snowground.jpg"
		}, {
			name: "模糊",
			path: CLIENT_CDN + "assets/images/create/mohu.jpg"
		}, {
			name: "落叶",
			path: CLIENT_CDN + "assets/images/create/leaves.jpg"
		}, {
			name: "薄雾",
			path: CLIENT_CDN + "assets/images/create/smoke.png"
		}], f && (f.image || f.scratch) ? (a.controlView.effectType = "scratch", (f.image || f.scratch) && (f.scratch ? (a.scratch = f.scratch, f.scratch.percentage.value && (a.scratch.percentage = f.scratch.percentage.value), f.scratch.opacity || (a.scratch.opacity = .2)) : f.image && (a.scratch = {
			image: f.image,
			percentage: f.percentage.value
		}, f.tip && (a.scratch.tip = f.tip), a.scratch.opacity = .2), angular.forEach(a.scratches, function(b, c) {
			a.scratch.image.name == b.name && (a.scratch.image = b)
		}), a.scratch.image.name || a.scratches.unshift(a.scratch.image))) : a.scratch = {
			image: a.scratches[0],
			percentage: .15,
			opacity: .2
		};
		var g = a.$watch("scratch.opacity", function(c, d) {
			b.$broadcast("show.scratch.draw", a.scratch)
		}, !0);
		setTimeout(function() {
			e = angular.copy(a.scratch.image), b.$broadcast("show.scratch.draw", a.scratch, !1)
		}, 0), a.$on("$destroy", function() {
			g()
		}), a.replaceImage = function(c) {
			return c.image ? (e = angular.copy(a.scratch.image), void b.$broadcast("show.scratch.draw", c, !1)) : void a.$emit("select.effect.image", "scratch")
		}, a.$on("replace.effect.image", function(c, d, f) {
			"scratch" == f && (a.scratch.image || (a.scratch.image = {}), a.scratch.image.path = PREFIX_FILE_HOST + d.data, a.scratches[0].name || a.scratches.shift(), a.scratches.unshift(a.scratch.image), e = angular.copy(a.scratch.image), b.$broadcast("show.scratch.draw", a.scratch, !1))
		}), a.$on("cancel.effect.replace", function(b, c) {
			"scratch" == c && angular.forEach(a.scratches, function(b, c) {
				e.name ? e.name == b.name && (a.scratch.image = b) : b.name || (a.scratch.image = b)
			})
		}), a.$on("save.scratch.effect", function() {
			return f = {}, f.scratch = a.scratch, f.scratch.percentage > 1 ? void d.pushForCurrentRoute("scratch.percentage.overflow", "notify.success") : (b.$broadcast("clear.scratch.interval"), void a.$close({
				properties: f,
				name: "涂抹",
				value: "scratch"
			}))
		})
	}]).directive("scratchEffect", function() {
		function a(a, d, e) {
			var f = new Image;
			a.$on("show.scratch.draw", function(a, c, d) {
				f.onload = function() {
					b(this, c)
				}, f.src = c.image.path
			}), a.$on("change.scratch.opacity", function(a, b) {
				$(".scratch-img").css({
					opacity: 1 - parseFloat(b).toFixed(2)
				})
			}), a.$on("clear.scratch.interval", function(a) {
				clearInterval(c)
			})
		}
		function b(a, f) {
			c && clearInterval(c);
			var g = '<canvas class="scratchCanvas" style="position:absolute; top: 0; left: 0;" width="196" height="308"></canvas>',
				h = $(".scratch-img");
			h.empty(), h.append(g), d = h.find("canvas").get(0), e = d.getContext("2d"), e.lineCap = "round", e.lineJoin = "round", e.lineWidth = 20, e.globalAlpha = 1 - parseFloat(f.opacity).toFixed(2), e.drawImage(a, 0, 0, d.width, d.height), e.globalCompositeOperation = "destination-out";
			var i = 130,
				j = 80;
			c = setInterval(function() {
				e.moveTo(i, j), i >= 70 && 140 >= j ? (e.lineTo(i - 2, j + 2), e.stroke(), i -= 2, j += 2) : 120 >= i && 165 >= j ? (e.lineTo(i + 2, j + 1), e.stroke(), i += 2, j += 1) : i >= 70 && 215 >= j ? (e.lineTo(i - 2, j + 2), e.stroke(), i -= 2, j += 2) : (clearInterval(c), b(a, f))
			}, 50)
		}
		var c, d, e;
		return {
			restrict: "EA",
			link: a
		}
	}), angular.module("scene.pageeffect.snow", []), angular.module("scene.pageeffect.snow").controller("snowEffectCtrl", ["$scope", "$translate", function(a, b) {
		var c = a.properties;
		c && c.effect && "snowFly" == c.effect.name && (a.controlView.effectType = "snowFly"), a.$on("save.snow.effect", function() {
			c = {}, c.effect = {
				name: "snowFly"
			}, a.$close({
				properties: c,
				name: "飘雪",
				value: "effect"
			})
		})
	}]), angular.module("save.template", []), angular.module("save.template").controller("saveTemplateCtrl", ["$scope", "$rootScope", "security", function(a, b, c) {
		a.btnGroup = {
			selectItem: 1,
			caretSwitch: !1
		};
		var d;
		window.localStorage && (d = JSON.parse(localStorage.getItem("templateInfo")), d && d[c.currentUser.id] ? a.btnGroup.selectItem = d[c.currentUser.id] : (d = d || {}, d[c.currentUser.id] = 1, localStorage.setItem("templateInfo", JSON.stringify(d)))), a.btnGroup = {
			selectItem: d[c.currentUser.id],
			caretSwitch: !1
		}, a.selectedTemplate = function(b) {
			"myTemplate" == b ? a.btnGroup.selectItem = 2 : "companyTemplate" == b && (a.btnGroup.selectItem = 1), window.localStorage && (d[c.currentUser.id] = a.btnGroup.selectItem, localStorage.setItem("templateInfo", JSON.stringify(d)))
		}, a.openMenu = function() {
			a.btnGroup.caretSwitch = !a.btnGroup.caretSwitch
		}
	}]), angular.module("scene", ["scene.create", "scene.support", "services.scene", "services.staticRes", "scene.create.new", "app.directives.addelement", "create.userGuide"]), angular.module("scene").controller("SceneCtrl", ["$window", "$scope", "$rootScope", "$location", "$translate", "sceneService", "$modal", "ModalService", "usercenterService", "staticResService", function(a, b, c, d, e, f, g, h, i, j) {
		b.PREFIX_FILE_HOST = PREFIX_FILE_HOST, b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.isActive = "scene", b.scene = {
			type: null
		}, b.totalItems = 0, b.currentPage = 1, b.toPage = "", b.tabindex = 0, b.childcat = 0, b.order = "new", b.pageSizeList = 11;
		var k = 0;
		b.pageNoNum = 1, b.blankSample = !0, b.pageTplTypesList = [{
			type: "101",
			name: "行业"
		}, {
			type: "102",
			name: "个人"
		}, {
			type: "103",
			name: "企业"
		}, {
			type: "104",
			name: "节假"
		}, {
			// type: "105",
			// name: "风格"
		}, {
			// type: "106",
			// name: "品牌"
		}], b.getCompanyTpl = function(a, c) {
			b.childcat = 1;
			var d = 11;
			b.childCatrgoryList = [], f.getCompanyTpls(b.pageNoNum, d).then(function(a) {
				a.data.list && a.data.list.length > 0 ? (b.tpls = a.data.list, b.totalItems = a.data.map.count + 1, b.currentPage = a.data.map.pageNo, b.allPageCount = a.data.map.count, b.toPage = "") : b.tpls = []
			})
		}, b.pageChanged = function(a) {
			return l.targetPage = a, b.pageNoNum = a, b.toPage = a, b.pageNoNum > 1 ? (b.blankSample = !1, b.pageSizeList = 12) : (b.blankSample = !0, b.pageSizeList = 11), 1 > a || a > b.totalItems / 11 + 1 ? void alert("此页超出范围") : void(1 == b.childcat ? b.getCompanyTpl(a, b.pageSizeList) : b.getPageTpls(1, l.sceneType, l.tagId, a, b.pageSizeList, l.order))
		}, b.preview = function(a) {
			var b = PREFIX_HOST + "/view.html?sceneId=" + a;
			window.open(b, "_blank")
		}, b.getStyle = function(a) {
			return {
				"background-image": "url(" + PREFIX_FILE_HOST + a + ")",
				"background-size": "cover"
			}
		}, b.userXd = 0, i.getUserXd().then(function(a) {
			b.userXd = a.data.obj || 0
		}), b.previewScene = function(a) {
			c.tplObj = a, d.path("/v-" + a.code)
		}, b.createScene = function(a) {
			if (a && a.price) {
				var c = parseFloat(a.price) || 0;
				c && c > b.userXd ? h.openMsgDialog({
					msg: '当前选择需要消耗微币<font color="#ff6e6e">' + c + '</font>个<br/>微币余额不足(<font color="#ff6e6e">' + (b.userXd || 0) + '</font>个)<span class="get-xd"><a href="http://bbs.e.wesambo.com/forum.php?mod=viewthread&tid=297&extra=page%3D1" target = "_blank">获取微币</a></span>'
				}) : h.openConfirmDialog({
					msg: '当前选择需要消耗微币<font color="#ff6e6e">' + c + '</font>个<br/>微币余额为<font color="#ff6e6e">' + (b.userXd || 0) + "</font>个"
				}, function() {
					g.open({
						windowClass: "login-container six-contain",
						templateUrl: "scene/createNew.tpl.html",
						controller: "SceneNewCtrl",
						resolve: {
							items: function() {
								return a
							}
						}
					})
				})
			} else g.open({
				windowClass: "login-container six-contain",
				templateUrl: "scene/createNew.tpl.html",
				controller: "SceneNewCtrl",
				resolve: {
					items: function() {
						return a
					}
				}
			})
		}, c.tplId && i.getUserXd().then(function(a) {
			b.userXd = a.data.obj || 0
		}).then(function() {
			b.createScene(c.tplId)
		}).then(function() {
			c.tplId = null
		}), b.getStyle = function(a) {
			return {
				"background-image": "url(" + PREFIX_FILE_HOST + a + ")"
			}
		}, b.show = function(a) {
			console.log(a.target), $(a.target).children(".cc").css("display", "block")
		}, b.pageTplTypes = j.getSceneType(), b.filterTpl = function(a, c) {
			b.selete = !0, a ? l.order = 1 : l.order = 2, b.getPageTpls(null, l.sceneType, l.tagId, k, b.pageSizeList, l.order)
		};
		var l = {
			sceneType: null,
			tagId: "",
			order: "",
			pageNo: "0",
			targetPage: ""
		},
			m = {},
			n = [];
		b.getPageTplsByType = function(a) {
			l.sceneType = a, b.childcat = a, b.categoryId = 0, m[a] ? (n = m[a], n.length && (o(), b.getPageTpls(1, l.sceneType, n[0].id, k, 11, l.order))) : f.getPageTplTypesTwo(a, a).then(function(c) {
				n = m[a] = c.data.list, n.length && (o(), b.getPageTpls(1, l.sceneType, n[0].id, k, 11, l.order))
			})
		};
		var o = function() {
				var a, c = null,
					d = [];
				for (var e in n) n[e].groupId !== c && (a = [], c = n[e].groupId, d.push(a)), a.push(n[e]);
				d.splice(4, 1), d.length ? b.newArrayGroupCat = d : b.newArrayGroupCat = []
			};
		b.allpage = function(a) {
			l.sceneType = a, b.childcat = 0, b.getPageTpls(1, null, null, 1, 12, l.order), b.newArrayGroupCat = [], b.blankSample = !0 //willingshe改成12
		}, b.freeTplChoice = "", b.freeTpl = function(a) {
			b.freeTplChoice = a, b.tplnew(b.order)
		}, b.getPageTpls = function(a, c, d, e, g, h) {
			b.categoryId = d, l.tagId = d;
			var i = b.freeTplChoice ? b.freeTplChoice + "=1" : "";
			f.getPageTpls(a, c, d, e, g, h, i)
		}, b.getPageTpls(1, null, null, 1, 12), b.$on("getSampleList", function(a) { //willingshe 改成12
			var c = f.scenes;
			if (c.list && c.list.length > 0) {
				b.tpls = c.list, b.totalItems = c.map.count, b.currentPage = c.map.pageNo, b.allPageCount = c.map.count, b.toPage = c.map.pageNo;
				for (var d = 0; d < b.tpls.length; d++) b.tpls[d].avatar && (0 === b.tpls[d].avatar.indexOf("http://") ? b.tpls[d].avatar = b.tpls[d].avatar : b.tpls[d].avatar = PREFIX_FILE_HOST + b.tpls[d].avatar)
			} else b.tpls = [], b.totalItems = 0, b.blankSample = !1
		}), b.name = null, b.EnterPress = function(a, c) {
			var d = a || window.event;
			13 == d.keyCode && b.submit(c)
		}, b.searchButton = !0;
		var p = {};
		b.submit = function(a) {
			b.name = a, f.getPageTpls(1, null, null, k, b.pageSizeList, l.orderby, null, a), b.searchButton = !1, p.refresh = !0
		}, b.changeName = function(a) {
			b.searchButton = !0, "" === a && p.refresh && f.getPageTpls(1, null, null, k, b.pageSizeList, l.orderby, null, a)
		}, b.clearSearch = function() {
			b.searchButton = !0, b.name = "", f.getPageTpls(1, null, null, k, b.pageSizeList, l.orderby, null)
		}, b.userScene = function(a) {
			f.getPageTpls(1, null, null, k, b.pageSizeList, l.orderby, null, null, a)
		}
	}]), angular.module("scene.preview", ["services.scene"]), angular.module("scene.preview").directive("sceneView", ["sceneService", "sceneViewService", "sceneDataParseService", function(a, b, c) {
		return {
			scope: {
				sceneId: "@",
				sceneName: "@",
				sceneCover: "@",
				sceneDescription: "@"
			},
			restrict: "A",
			templateUrl: "scene/preview.tpl.html",
			link: function(a, d, e, f) {
				function g(d, f) {
					b.getSceneData(e.sceneId).then(function(e) {
						e.data.success && (d && (d = parseInt(d, 10) - 1, e.data.list[d].elements = f.obj.elements, e.data.list[d].properties = f.obj.properties), a.$parent.scene.property.activityPageId ? b.getActivityPage(a.$parent.scene.property.activityPageId).then(function(a) {
							e.data.list.push(a.data.obj), c.parse(e.data)
						}) : c.parse(e.data))
					})
				}
				function h() {
					k(), d.find(".password-numbers>span").click(j), d.find(".password-operation>span").click(k), d.find(".verifyCode").show()
				}
				function i() {
					d.find(".password-numbers>span").unbind("click"), d.find(".password-operation>span").unbind("click"), d.find(".verifyCode").hide()
				}
				function j(b) {
					k($(b.target).text()), 4 == l.pass.length && (a.$parent.scene.accessCode == l.pass ? i() : k())
				}
				function k(a) {
					a && "object" != typeof a ? l.pass += a : l.pass = "", d.find(".password-indicator li").each(function(a, b) {
						a < l.pass.length ? $(b).addClass("active") : $(b).removeClass("active")
					})
				}
				var l = {
					play: !1
				};
				a.sceneId && (a.$parent.mginData == angular.toJson(a.$parent.tpl) ? g() : g(a.$parent.pageNum, $.extend(!0, {}, a.$parent.tpl))), a.$watch("sceneId", function(a, b) {
					a != b && g()
				}), d.on("$destroy", function() {
					utilSound.pause()
				}), a.$on("changeView", function(a, b) {
					b ? d.find(".wechat-share").show() : d.find(".wechat-share").hide(), d.find(".loading").hide(), i()
				}), a.$on("showLoading", function(a, b, c) {
					b ? (c ? d.find(".loadbg").css({
						background: "url(" + PREFIX_FILE_HOST + c + ")",
						"background-size": "70px 42px"
					}) : d.find(".loadbg").css("background", ""), d.find(".loading").show(), d.find(".wechat-share").hide()) : d.find(".loading").hide(), i()
				}), a.$on("processBar", function(a, b) {
					b ? d.find(".progress").show() : d.find(".progress").hide()
				}), a.$on("passPanelSwitch", function(a, b) {
					b ? h() : i()
				}), d.on("$destroy", function() {
					clearInterval(eqShow.progressInterval), c.app.pauseAutoFlip()
				})
			}
		}
	}]).factory("sceneViewService", ["$http", function(a) {
		var b = {};
		return b.getSceneData = function(b) {
			var c = "index.php?c=scene&a=view&id=" + b + "&time=" + (new Date).getTime();
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, b.getSelfLastPage = function(b) {
			var c = "index.php?c=scene&a=getlastpagebg&id=" + b;
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_S1_URL + c
			})
		}, b.getActivityPage = function(b) {
			var c = "eqs/trailer/" + b;
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_S2_URL + c
			})
		}, b
	}]).factory("sceneDataParseService", ["sceneViewService", "sceneService", function(a, b) {
		function c(b, c) {
			b.obj.property.lastPageId ? a.getSelfLastPage(b.obj.property.lastPageId).then(function(a) {
				a.data.obj ? (e(b.obj, a.data), b.list.push(a.data.obj), o.lastPage = c[c.length - 1], i(c, b)) : (d(b.obj), o.lastPage = c[c.length - 1], i(c, b))
			}) : (d(b.obj, c), o.lastPage = c[c.length - 1], i(c, b))
		}
		function d(a, b) {
			var c = "http://e.wesambo.com",
				d = '{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"borderRadius":"10px","borderStyle":"solid","zIndex":"9","borderColor":"rgba(0,0,0,1)","paddingTop":"0px","height":"141","backgroundColor":"","color":"","boxShadow":"0px 0px 0px #333333","borderWidth":"0px","width":"142.13709677419354","left":"92px","paddingBottom":"0px","top":"177px"},"properties":{"height":"100px","imgStyle":{"width":142,"height":142,"marginTop":"-0.5px","marginLeft":"0px"},"width":"100px","src":"group1/M00/BA/DA/yq0KA1Rq8COAAYRjAAKU4OVYum0889.jpg"}}',
				e = '{"id":"","sceneId":"","num":2,"name":null,"properties":null,"elements":[{"id":439880,"pageId":129810,"sceneId":16060,"num":0,"type":"3","isInput":0,"title":null,"content":null,"status":1,"css":{},"properties":{"bgColor":"#E6E9EE"}},{"id":439881,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;\\"><span style=\\"line-height: 1; background-color: initial;\\"><font size=\\"4\\" color=\\"#888888\\"><b>微课名称</b></font></span></div>","status":1,"css":{"height":"65","zIndex":"10","width":"320","left":"0px","top":"77px"},"properties":{}},{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div class=\\"bottom-logo\\" style=\\"text-align: center;cursor:pointer;height:142px;width:142px;border-radius:10px;\\"><em style=\\"color:white;line-height:142px;font-size:30px;\\" class=\\"eqf-love\\"></em></div>","status":1,"css":{"height":"157","width":"172","left":"77px","top":"170px"},"properties":{}},{"id":439883,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"width:280px;height:1px;background-color:rgba(60,60,60,0.4);cursor:pointer;position:absolute;left:0;-webkit-filter:drop-shadow(0px 1px 0px rgba(60,60,60,0.4));top:12px;\\"></div>","status":1,"css":{"height":"24","width":"280","left":"21px","top":"122px"},"properties":{}},{"id":439885,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;padding-top: 0;\\" id=\\"scenead\\"><span style=\\"font-size: small; line-height: 1; background-color: initial;\\"><a href=\\"' + PREFIX_S1_URL + "index.php?c=scene&a=link&id=16060&amp;url=" + encodeURIComponent(c) + '\\" target=\\"_blank\\"><font color=\\"#888888\\">免费创建一个微课？→</font><font color=\\"#23a3d3\\">'+lastpagetext+'</font></a></span></div>","status":1,"css":{"borderRadius":"0px","borderStyle":"solid","height":"30","paddingTop":"0px","borderColor":"rgba(222,220,227,1)","zIndex":"12","boxShadow":"0px 0px 0px rgba(200,200,200,0.6)","color":"","backgroundColor":"rgba(255,255,255,0)","borderWidth":"0px","width":"320","left":"1px","paddingBottom":"20px","top":"420px"},"properties":{"anim":{"type":1,"direction":3,"duration":"1","delay":"0.6"}}}]}';
			e = e.replace(/id=16060/, "id=" + a.id);
			var f = JSON.parse(e);
			f.num = b.length + 1, a.cover && "group1/M00/61/8A/yq0KA1T2vYSAEgo7AACovQVgHxk048.jpg" != a.cover && (f.elements[2] = JSON.parse(d), f.elements[2].properties.src = a.cover), f.elements[1].content = f.elements[1].content.replace(/微课名称/, a.name ? a.name : ""), b.push(f)
		}
		function e(a, b) {
			var c = '{"id":81395,"pageId":"","sceneId":"","num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"borderRadius":"%","borderStyle":"solid","height":"158","zIndex":"1000","paddingTop":"0px","borderColor":"rgba(0,0,0,1)","boxShadow":"0 0px 0px #333333","color":"#000000","backgroundColor":"white","borderWidth":"0px","width":"158","left":"84px","paddingTop":"11px","paddingLeft":"10px","top":"170px"},"properties":{"height":"100px","imgStyle":{"width":139,"height":136,"marginTop":"0px","marginLeft":"0px"},"width":"100px","src":"group1/M00/01/30/yq0JCFQpOR-AOULFAAFBPO1yzBQ984.jpg"}}',
				d = '{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div class=\\"bottom-logo\\" style=\\"text-align: center;cursor:pointer;height:136px;width:139px;\\"><em style=\\"color:white;line-height:136px;font-size:120px;\\" class=\\"eqf-eqxiu\\"></em></div>","status":1,"css":{"height":"158","width":"158","left":"84px","top":"170px","backgroundColor":"white"},"properties":{}}',
				e = '{"id":81465,"pageId":"","sceneId":"","num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;\\"><font color=\\"#ffffff\\" size=\\"3\\">击此处进行编辑</font></div>","status":1,"css":{"zIndex":"102","height":"65","width":"320","left":"0px","top":"70px"},"properties":{}}',
				f = '{"id":2557867,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div class=\\"logo-shadow1\\" style=\\"text-align: center;cursor:pointer;height:127px;width:220px;transform:rotate(-45deg);-webkit-transform:rotate(-45deg);position:absolute;left:20px;top:56px;\\"></div>","status":1,"css":{"height":"257","width":"257","left":"78px","top":"175px"},"properties":{}}',
				g = '{"id":439883,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"width:280px;height:1px;background-color:rgba(60,60,60,0.4);cursor:pointer;position:absolute;left:0;-webkit-filter:drop-shadow(0px 1px 0px rgba(60,60,60,0.4));top:12px;\\"></div>","status":1,"css":{"height":"24","width":"280","left":"21px","top":"122px"},"properties":{}}';
			b.obj.sceneId = a.id;
			for (var h, i = 0; i < b.obj.elements.length; i++)"4" != b.obj.elements[i].type || "group1/M00/A5/5E/yq0KA1QmePmAKr7yAAEByp5jyLc752.jpg" != b.obj.elements[i].properties.src && "group1/M00/C5/9D/yq0KA1SH1zuAFgkLAAAFgBR8hJs456.png" != b.obj.elements[i].properties.src && "group1/M00/C5/3F/yq0KA1SHp-2AQZZZAAB-7rIaK6I743.png" != b.obj.elements[i].properties.src && "group1/M00/C5/9D/yq0KA1SH1zuAeQuFAAAFfUkeXDc110.png" != b.obj.elements[i].properties.src || (b.obj.elements.splice(i, 1), i--), "2" == b.obj.elements[i].type && (b.obj.elements.splice(i, 1), i--);
			"group1/M00/61/8A/yq0KA1T2vYSAEgo7AACovQVgHxk048.jpg" != a.cover ? (h = JSON.parse(c), h.properties.src = a.cover) : h = JSON.parse(d), b.obj.elements.push(h), b.obj.elements.push(JSON.parse(f)), b.obj.elements.push(JSON.parse(g));
			var j = JSON.parse(e);
			j.content = j.content.replace(/击此处进行编辑/, a.name), b.obj.elements.push(j);
			for (var k = 0; k < b.obj.elements.length; k++)"2" == b.obj.elements[k].type && /http:\/\/service.e.wesambo.com\/eqs\/link/.test(b.obj.elements[k].content) && (b.obj.elements[k].content = b.obj.elements[k].content.replace(/;url=.*com"/, ";url=" + encodeURIComponent(redirectUrl) + '"'))
		}
		function f(b, c) {
			a.getSelfLastPage(b.obj.property.bottomLabel.id).then(function(a) {
				if (a.data.success) {
					var d = c[c.length - 1];
					d.elements || (d.elements = []), d.elements = d.elements.concat(a.data.obj.elements), i(c, b)
				}
			})
		}
		function g(a, b) {
			h(a, b), i(b, a)
		}
		function h(a, b) {
			var c, d = "http://e.wesambo.com",
				e = "微学宝技术支持",
				f = '{"id":480292,"pageId":136042,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;transform: none;-webkit-animation: fadeIn 2s ease 1s both;-webkit-animation-play-state: initial;\\"><a href=\\"' + PREFIX_S1_URL + "eqs/link?id=16060&amp;url=" + encodeURIComponent(d) + '\\" target=\\"_blank\\" style=\\"font-size: x-small;display:block;line-height: 10px;\\"><font color=\\"#ffffff\\">' + e + '</font></a></div>","status":1,"css":{"zIndex":"1000","height":"20","width":"129","left":"97px","top":"418px","backgroundColor":"rgba(0,0,0,0.6)","borderRadius":"20px"},"properties":{"anim":{"type":0,"direction":0,"duration":2,"delay":"0"}}}';
			f = f.replace(/id=16060/, "id=" + a.id), c = b[b.length - 1].elements, b[b.length - 1].elements || (c = b[b.length - 1].elements = []), c.push(JSON.parse(f))
		}
		function i(a, b) {
			var c = b.obj.pageMode;
			b.obj.property.slideNumber ? b.obj.property.slideDisplay = "block" : b.obj.property.slideDisplay = "none", b.obj.property.slideNumber = !0;
			for (var d = {
				bgAudio: b.obj.bgAudio
			}, e = 1; e <= a.length; e++) {
				$('<section class="main-page"><div class="m-img" id="page' + e + '"></div></section>').appendTo(".phone-view"), a.length > 1 && ($('<section class="u-arrow-bottom"><div class="pre-wrap"><div class="pre-box1"><div class="pre1"></div></div><div class="pre-box2"><div class="pre2"></div></div></div></section>').appendTo("#page" + e), $('<section class="u-arrow-right"><div class="pre-wrap-right"><div class="pre-box3"><div class="pre3"></div></div><div class="pre-box4"><div class="pre4"></div></div></div></section>').appendTo("#page" + e)), 1 == e && $(".phone-view .main-page").eq(0).addClass("z-current");
				var f = e;
				if (a[f - 1].properties && !$.isEmptyObject(a[f - 1].properties) ? a[f - 1].properties.image || a[f - 1].properties.scratch ? addScratchEffect(d, a, f) : a[f - 1].properties.finger ? (p = [], p.push({
					num: f,
					finger: a[f - 1].properties.finger
				}), lockEffect(d, a, p, $(".m-img").width(), $(".m-img").height())) : a[f - 1].properties.fallingObject ? fallingObject(a, f) : a[f - 1].properties.effect ? !
				function(b) {
					window[a[b - 1].properties.effect.name].doEffect(d, b, a, renderPage)
				}(f) : renderPage(eqShow, f, a) : (renderPage(eqShow, f, a), 1 == f && playVideo(d)), e == a.length) {
					eqxiu.app($(".phone-view"), b.obj.pageMode, a, b)
				}
			}
			0 === c || 1 == c || 2 == c || 6 == c || 7 == c || 8 == c || 11 == c || 12 == c ? $(".phone-view .u-arrow-right").hide() : (3 == c || 4 == c || 5 == c || 9 == c || 10 == c) && $(".phone-view .u-arrow-bottom").hide()
		}
		function j(b) {
			var c = [];
			$.extend(!0, c, n._pages), o.activePage && c.push(o.activePage);
			var f = c.length + 1;
			if (!b) {
				d({
					name: o.sceneName
				}, c), o.lastPage = c[c.length - 1];
				var g = c[c.length - 1];
				return o.haseLastPage ? k(o.lastPageNum, g) : ($(".phone-view .main-page").last().after('<section class="main-page"><div class="m-img" id="page' + f + '"></div></section>'), o.lastPageNum = f, renderPage(eqShow, o.lastPageNum, c), o.haseLastPage = !0), n.app.changeAppPage(), void n.app.setPageData(c)
			}
			a.getSelfLastPage(b).then(function(a) {
				if (a.data.success) {
					if (o.lastPage = a.data.obj, o.haseLastPage) {
						var b = {
							id: "1",
							name: o.sceneName,
							cover: o.sceneCover
						};
						e(b, a.data), k(o.lastPageNum, a.data.obj), c.push(a.data.obj)
					} else $(".phone-view .main-page").last().after('<section class="main-page"><div class="m-img" id="page' + f + '"></div></section>'), o.lastPageNum = f, renderPage(eqShow, o.lastPageNum, c.push([a.data.obj])), o.haseLastPage = !0;
					n.app.changeAppPage(), n.app.setPageData(c)
				}
			})
		}
		function k(a, c) {
			$("#page" + a).empty(), b.templateEditor.parse({
				def: c,
				appendTo: "#page" + a,
				mode: "view"
			})
		}
		function l(a, b, c, d) {
			var e = 0;
			for (a.length; e < a.length; e++) {
				var f = a[e];
				if (f.pageId = b.id, c.name && c.url && "http://" != c.url) 2 == f.type && f.content.indexOf("e.wesambo.com科技公司") > 0 && (f.content = f.content.replace(/e.wesambo.com科技公司/, '<a href="' + PREFIX_S1_URL + "eqs/link?id=" + d + "&amp;url=" + encodeURIComponent(c.url) + '" target=_blank>' + c.name + "</a>"));
				else if (c.name) 2 == f.type && f.content.indexOf("e.wesambo.com科技公司") > 0 && (f.content = f.content.replace(/e.wesambo.com科技公司/, c.name));
				else if (/微学宝技术支持/.test(f.content)) {
					f.content = '<div style="text-align: center;">' + f.content + "</div>";
					var g = {
						zIndex: "1000",
						height: "33",
						width: "129",
						left: "97px"
					};
					$.extend(f.css, g)
				} else 2 == f.type && f.content && (f.content = "");
				f.css.zIndex = 200
			}
		}
		function m() {
			n.app.removeLastPage(), n.app.changeAppPage(), o.haseLastPage = !1
		}
		var n = {};
		n.app = eqxiu;
		var o = {
			haseLastPage: !1,
			sceneName: "",
			sceneCover: "",
			lastPage: null,
			activePage: null,
			activePageNum: null,
			lastPageNum: null
		};
		n._pages = [], n.parse = function(a) {
			o.activePage = null, a.obj.property && (a.obj.property = JSON.parse(a.obj.property) || {}), a.obj.name && (o.sceneName = a.obj.name), a.obj.cover && (o.sceneCover = a.obj.cover), a.obj.bgAudio && "string" == typeof a.obj.bgAudio ? a.obj.bgAudio = JSON.parse(a.obj.bgAudio) : $("#audio_btn").hide();
			var b = (a.obj.pageMode, a.list);
			if ($.extend(!0, n._pages, a.list), a.obj.property.hideEqAd) i(b, a);
			else switch (a.obj.property.eqAdType) {
			case 1:
				o.haseLastPage = !0, c(a, b), o.lastPageNum = b.length + 1;
				break;
			case 2:
				g(a, b);
				break;
			case 3:
				f(a, b);
				break;
			default:
				o.haseLastPage = !0, c(a, b)
			}
		};
		var p = [];
		return n.changeBottomType = function(b, c, d, e) {
			if ("eqFree" == b) {
				j(c), n.app.lastPage();
				var f = n._pages.length;
				k(f, n._pages[n._pages.length - 1])
			} else if ("eqLink" == b) {
				if (o.lastPageNum = null, o.haseLastPage && (m(), o.lastPage = null), n.app.lastPage( !! o.activePage), 2 == e) {
					var g = [];
					$.extend(!0, g, n._pages);
					var i = g[g.length - 1];
					return i.elements || (i.elements = []), h(i, g), void k(n._pages.length, i)
				}
				if (!d || !d.id) return;
				a.getSelfLastPage(d.id).then(function(a) {
					if (a.data.success) {
						var b = {};
						$.extend(!0, b, n._pages[n._pages.length - 1]), b.elements || (b.elements = []), l(a.data.obj.elements, b, d, n._pages[0].sceneId), b.elements = b.elements.concat(a.data.obj.elements), k(n._pages.length, b)
					}
				})
			} else o.lastPageNum = null, o.haseLastPage ? (m(), o.lastPage = null) : k(n._pages.length, n._pages[n._pages.length - 1]), n.app.lastPage()
		}, n.removeActivePage = function() {
			n.app.removeLastPage(o.haseLastPage), n.app.changeAppPage(), n.app.lastPage(), o.activePageNum = null
		}, n.playVideo = function(a) {
			var b = {
				bgAudio: a
			};
			a || (b.bgAudio = {
				url: ""
			}), playVideo(b), a || $("#audio_btn").hide()
		}, n.changeScrollMode = function(a) {
			n.app.changeScrollMode(a), 0 === a || 1 == a || 2 == a || 6 == a || 7 == a || 8 == a || 11 == a || 12 == a ? ($(".phone-view .u-arrow-right").hide(), $(".phone-view .u-arrow-bottom").show()) : (3 == a || 4 == a || 5 == a || 9 == a || 10 == a) && ($(".phone-view .u-arrow-bottom").hide(), $(".phone-view .u-arrow-right").show())
		}, n.changeSceneName = function(a) {
			o.sceneName = a
		}, n.changeSceneCover = function(a) {
			o.sceneCover = a
		}, n.replaceActivePage = function(b) {
			a.getActivityPage(b).then(function(a) {
				var b, c = [];
				o.haseLastPage ? ($.extend(!0, c, n._pages), o.lastPage && c.push(o.lastPage), c.push(a.data.obj), b = c.length, o.activePage ? k(o.activePageNum, a.data.obj) : ($(".phone-view .main-page").last().prev().after('<section class="main-page"><div class="m-img" id="page' + b + '"></div></section>'), o.activePageNum = b, renderPage(eqShow, o.activePageNum, c)), n.app.setPageData(c), n.app.changeAppPage()) : ($.extend(!0, c, n._pages), c.push(a.data.obj), b = c.length, o.activePage ? k(o.activePageNum, a.data.obj) : ($(".phone-view .main-page").last().after('<section class="main-page"><div class="m-img" id="page' + b + '"></div></section>'), o.activePageNum = b, renderPage(eqShow, o.activePageNum, c)), n.app.changeAppPage(), n.app.setPageData(c)), o.activePage = a.data.obj
			})
		}, n
	}]), angular.module("scene.support", []), angular.module("scene.support").controller("SupportCtrl", ["$location", "$scope", "$translate", "continueUrl", function(a, b, c, d) {
		b["continue"] = function() {
			window.sessionStorage && sessionStorage.setItem("checkSuport", !1), a.path(d.getUrl())
		}, b.setLinkUrl = function() {
			navigator.language ? navigator.language.toLowerCase() : navigator.systemLanguage.toLowerCase();
			b.download_Chorme = "https://www.baidu.com/s?wd=Chrome", b.download_IE = "https://www.baidu.com/s?wd=ie11", b.download_360fast = "http://chrome.360.cn/", b.download_360 = "http://se.360.cn/"
		}, b.setLinkUrl()
	}]).factory("continueUrl", function() {
		function a(a) {
			c = a
		}
		function b() {
			return c
		}
		var c = "";
		return {
			setUrl: a,
			getUrl: b
		}
	}), function() {
		angular.module("scene.userGuide", []).controller("SceneUserGuideCtrl", ["$rootScope", "$scope", function(a, b) {
			if (window.localStorage) {
				var c = JSON.parse(localStorage.getItem("sceneUserGuide"));
				c && c[a.user.id] ? b.firstLogin = !1 : (b.firstLogin = !0, c = c || {}, c[a.user.id] = 1, localStorage.setItem("sceneUserGuide", JSON.stringify(c)))
			}
			b.currentGuideIndex = 0, b.guideLength = 5, b.showNextGuide = function() {
				b.currentGuideIndex += 1, b.guideLength == b.currentGuideIndex && (b.firstLogin = !1)
			}
		}])
	}(), angular.module("active1", ["services.show", "services.activity", "app.directives.addBanner"]), angular.module("active1").controller("Active1Ctrl", ["$rootScope", "$http", "$scope", "$translate", "showService", "activityService", "$location", "configSerService", function(a, b, c, d, e, f, g, h) {
		c.pageNo = 1, c.pageSize = 10, c.childCat = "active", c.join = function(a) {
			g.path("/show/active/" + a)
		}, c.attend = function() {
			a.user ? g.path("/main") : c.openLogin()
		};
		var i = function(a) {
				f.getActiveList(1, null, a, c.pageSize), c.$on("activeList", function(a, b) {
					c.activeList = b.data.list;
					for (var d = Date.parse(new Date), e = 0; e < c.activeList.length; e++) c.activeList[e].endDate > d ? c.activeList[e].join = !0 : c.activeList[e].join = !1;
					c.totalItems = b.data.map.count, c.currentPage = b.data.map.pageNo, c.allPageCount = b.data.map.count, c.toPage = b.data.map.pageNo
				})
			};
		i(c.pageNo), c.pageChanged = function(a) {
			return 1 > a || a > c.totalItems / 10 + 1 ? void alert(d.instant("show.OVER_PAGE_NUMBER")) : void i(a)
		}, c.pageCode = "active", h.getFriendLinks(c.pageCode).then(function(a) {
			c.friendLinks = a.data.list, c.friendLinks.length > 16 && (c.friendLinks.length = 16)
		})
	}]), angular.module("activeXq", ["services.show", "services.activity", "app.directives.addBanner"]), angular.module("activeXq").controller("ActiveXqCtrl", ["$rootScope", "$http", "$scope", "$translate", "showService", "activityService", "$location", "$routeParams", "configSerService", function(a, b, c, d, e, f, g, h, i) {
		c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.PREFIX_SERVER_HOST = PREFIX_URL, c.pageNo = 1, c.pageSize = 16, c.activeId = h.id, c.childCat = "active", c.totalItems = 0, c.join = function(a) {
			g.path("/show/active/" + a)
		}, c.attend = function() {
			a.user ? g.path("/main") : c.openLogin()
		};
		var j = function() {
				f.activitySceneList(c.activeId, 1, c.pageNo, 4).then(function(a) {
					if (c.recSceneList = a.data.list, a.data.list) for (var b = 0; b < c.recSceneList.length; b++) c.recSceneList[b].headImg ? 0 === c.recSceneList[b].headImg.indexOf("http://") ? c.recSceneList[b].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.recSceneList[b].headImg = PREFIX_FILE_HOST + CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.recSceneList[b].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png"
				})
			};
		j(c.activeId, 1, c.pageNo, 4);
		var k = function() {
				f.activitySceneList(c.activeId, null, c.pageNo, c.pageSize).then(function(a) {
					if (c.sceneList = a.data.list, c.totalItems = a.data.map.count, c.currentPage = a.data.map.pageNo, c.toPage = a.data.map.pageNo, a.data.list) for (var b = 0; b < c.sceneList.length; b++) c.sceneList[b].headImg ? 0 === c.sceneList[b].headImg.indexOf("http://") ? c.sceneList[b].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.sceneList[b].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.sceneList[b].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png"
				})
			};
		k(c.activeId, null, c.pageNo, c.pageSize), f.activityMes(c.activeId), c.$on("activeMes", function(a, b) {
			c.activeMes = b.data.obj
		}), c.pageChanged = function(a) {
			return c.pageNo = a, 1 > a || a > c.totalItems / 16 + 1 ? void alert(d.instant("show.OVER_PAGE_NUMBER")) : void k(c.activeId, null, a, c.pageSize)
		}, c.pageCode = "pro_" + c.activeId, i.getFriendLinks(c.pageCode).then(function(a) {
			c.friendLinks = a.data.list, c.friendLinks.length > 16 && (c.friendLinks.length = 16)
		})
	}]), angular.module("category", ["services.show", "services.activity", "app.directives.addBanner"]), angular.module("category").controller("CategoryCtrl", ["$rootScope", "$http", "$scope", "$translate", "showService", "activityService", "$location", "$routeParams", "security", function(a, b, c, d, e, f, g, h, i) {
		c.recommend = 1, c.pageSize = 16, f.getActiveList(null, c.recommend, c.pageNo, 3), c.$on("activeList", function(a, b) {
			c.activeList = b.data.list
		}), c.join = function(a) {
			g.path("/show/active/" + a)
		};
		var j = h.id;
		c.bizType = j;
		var k = {};
		c.getCategoryTpl = function(a) {
			c.childCat = a, k[a] ? (c.childCatrgoryList = k[a], c.childCatrgoryList.length && (l.tagId = c.categoryId = c.childCatrgoryList[0].id, c.getPageTpls(null, c.childCatrgoryList[0].id))) : e.getPageTagLabel(a).then(function(b) {
				c.childCatrgoryList = k[a] = b.data.list, c.childCatrgoryList.length && (l.tagId = c.categoryId = c.childCatrgoryList[0].id, c.getPageTpls(null, c.childCatrgoryList[0].id))
			})
		}, c.getCategoryTpl(j);
		var l = {
			sceneType: "",
			tagId: "",
			orderBy: null,
			bizType: "",
			template: "",
			pageNo: "1",
			targetPage: ""
		};
		c.tplNew = function(a) {
			c.order = a, l.orderBy = a, c.getPageTpls(a, null, l.tagId, l.pageNo, c.pageSize)
		}, c.getPageTpls = function(a, b) {
			b && (l.tagId = b), c.categoryId = l.tagId, e.getSceneList(l.orderBy, null, l.tagId, l.pageNo, c.pageSize), c.$on("sceneList", function(a, b) {
				c.tpls = b.list, c.totalItems = b.map.total, c.currentPage = b.map.pageNo, c.allPageCount = b.map.count, c.toPage = b.map.pageNo;
				for (var d = 0; d < c.tpls.length; d++) 2 == c.tpls[d].isTemplate && (c.tpls[d].isTemplate = !0), c.tpls[d].headImg ? 0 === c.tpls[d].headImg.indexOf("http://") ? c.tpls[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.tpls[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.tpls[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png"
			})
		}, c.userTpl = function(b) {
			i.closeLoginDialog(), g.path("/scene"), a.tplId = b
		}, c.pageChanged = function(a) {
			return 1 > a || a > c.totalItems / 16 + 1 ? void alert(d.instant("show.OVER_PAGE_NUMBER")) : (l.pageNo = a, void c.getPageTpls(l.orderBy, null, l.tagId, a, c.pageSize))
		}
	}]), angular.module("nav", ["services.show", "services.staticRes"]), angular.module("nav").controller("NavCtrl", ["$rootScope", "$http", "$scope", "showService", "$location", "$routeParams", "staticResService", function(a, b, c, d, e, f, g) {
		c.sceneType = g.getSceneType(), angular.forEach(c.sceneType, function(a) {
			a.value === f.id && (c.$parent.catName = a.name)
		}), c.getCategoryPage = function(a, b) {
			e.path("show/category/" + a)
		};
		var h = null;
		c.search = function(a) {
			h = a
		}, c.submit = function() {
			h ? e.path("show/search/" + h) : e.path("show")
		}, c.EnterPress = function(a, b) {
			var d = a || window.event;
			13 == d.keyCode && c.submit(b)
		}
	}]), angular.module("app.directives.addBanner", []).directive("slides2", ["configSerService", function(a) {
		return {
			restrict: "EA",
			link: function(b, c, d) {
				var e = $(c).find(".slides_container");
				a.getActivityBanner(d.id).then(function(a) {
					for (var b = a.data.list, f = 0; f < b.length; f++) {
						var g = $('<a href="' + b[f].url + '" style="display:block;" target="' + b[f].target + '" ></a>');
						g.append('<img src="' + b[f].path + '" width="' + d.width + '" height="' + d.height + '" alt="' + b[f].title + '" title="' + b[f].title + '" > '), e.append(g)
					}
					$(c).slides({
						preload: !0,
						play: 5e3,
						pause: 2500,
						hoverPause: !0
					})
				})
			}
		}
	}]), angular.module("show", ["services.show", "services.activity", "app.directives.addBanner"]), angular.module("show").controller("ShowCtrl", ["$rootScope", "$http", "$scope", "showService", "activityService", "$location", "configSerService", "security", function(a, b, c, d, e, f, g, h) {
		c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.PREFIX_SERVER_HOST = PREFIX_URL, c.pageNo = 1, c.pageSize = 16, c.recommend = 1, c.childCat = "index", e.getActiveList(null, c.recommend, c.pageNo, 3), c.$on("activeList", function(a, b) {
			c.activeList = b.data.list
		}), c.join = function(a) {
			f.path("/show/active/" + a)
		}, d.getSceneList(null, c.recommend, null, c.pageNo, c.pageSize), c.$on("sceneList", function(a, b) {
			c.sceneList = b.list;
			for (var d = 0; d < c.sceneList.length; d++) 2 === c.sceneList[d].isTemplate && (c.sceneList[d].isTemplate = !0), c.sceneList[d].headImg ? 0 === c.sceneList[d].headImg.indexOf("http://") ? c.sceneList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.sceneList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.sceneList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png"
		}), c.userTpl = function(b) {
			h.closeLoginDialog(), f.path("/scene"), a.tplId = b
		}, c.pageCode = "index", g.getFriendLinks(c.pageCode).then(function(a) {
			c.friendLinks = a.data.list, c.friendLinks.length > 16 && (c.friendLinks.length = 16)
		})
	}]), angular.module("recommend", ["services.show"]), angular.module("recommend").controller("RecommendCtrl", ["$rootScope", "$http", "$scope", "$translate", "showService", "security", "$location", function(a, b, c, d, e, f, g) {
		c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.PREFIX_SERVER_HOST = PREFIX_URL, c.pageNo = 1, c.pageSize = 16, c.childCat = "recommend", c.order = null;
		var h = function(a) {
				e.getSceneList(c.order, 1, null, a, c.pageSize), c.$on("sceneList", function(a, b) {
					c.recommendList = b.list, c.totalItems = b.map.total, c.currentPage = b.map.pageNo, c.allPageCount = b.map.total, c.toPage = b.map.pageNo;
					for (var d = 0; d < c.recommendList.length; d++) 2 == c.recommendList[d].isTemplate && (c.recommendList[d].isTemplate = !0), c.recommendList[d].headImg ? 0 === c.recommendList[d].headImg.indexOf("http://") ? c.recommendList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.recommendList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.recommendList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png"
				})
			};
		h(c.pageNo), c.tplNew = function(a) {
			c.order = a, h(a, 1, null, c.pageNo, c.pageSize)
		}, c.userTpl = function(b) {
			f.closeLoginDialog(), g.path("/scene"), a.tplId = b
		}, c.pageChanged = function(a) {
			return 1 > a || a > c.totalItems / 16 + 1 ? void alert(d.instant("show.OVER_PAGE_NUMBER")) : void h(a)
		}
	}]), angular.module("search", ["services.show", "services.activity", "app.directives.addBanner"]), angular.module("search").controller("SearchCtrl", ["$rootScope", "$http", "$scope", "$translate", "showService", "activityService", "$location", "$routeParams", function(a, b, c, d, e, f, g, h) {
		var i = {
			name: "",
			pageNo: 1,
			pageSize: 16
		};
		c.name = h.name, c.pageNo = 1, c.pageSize = 16, c.val = c.name, i.name = c.name, c.EnterPress = function(a, b) {
			var d = a || window.event;
			13 == d.keyCode && c.submit(b)
		}, c.submit = function(a) {
			c.name = a, a ? g.path("show/search/" + c.name) : g.path("show")
		};
		var j = function(a) {
				e.search(a), c.$on("searchList", function(a, b) {
					c.searchList = b.list, c.totalItems = b.map.total, c.currentPage = b.map.pageNo, c.toPage = b.map.pageNo;
					for (var d = 0; d < c.searchList.length; d++) c.searchList[d].headImg ? 0 === c.searchList[d].headImg.indexOf("http://") ? c.searchList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.searchList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.searchList[d].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png"
				})
			};
		j(i), c.pageChanged = function(a) {
			return 1 > a || a > c.totalItems / 16 + 1 ? void alert(d.instant("show.OVER_PAGE_NUMBER")) : (i.pageNo = a, void j(i))
		}
	}]), angular.module("services.activity", []).factory("activityService", ["$rootScope", "$http", function(a, b) {
		var c = {};
		return c.getActiveList = function(c, d, e, f) {
			var g = PREFIX_S2_URL + "index.php?c=eqs&a=activity_info";
			return c && (g += /\?/.test(g) ? "&" : "?", g += "joinNum=" + c), d && (g += /\?/.test(g) ? "&" : "?", g += "recommend=" + d), e && (g += /\?/.test(g) ? "&" : "?", g += "pageNo=" + e), f && (g += /\?/.test(g) ? "&" : "?", g += "pageSize=" + f), b({
				withCredentials: !0,
				method: "GET",
				url: g
			}).then(function(b) {
				if (b.data.success) {
					var c = b;
					a.$broadcast("activeList", c)
				}
			})
		}, c.activitySceneList = function(a, c, d, e) {
			var f = PREFIX_S2_URL + "/eqs/activity/scene?promId=" + a;
			return c && (f += /\?/.test(f) ? "&" : "?", f += "recommend=" + c), d && (f += /\?/.test(f) ? "&" : "?", f += "pageNo=" + d), e && (f += /\?/.test(f) ? "&" : "?", f += "pageSize=" + e), b({
				withCredentials: !0,
				method: "GET",
				url: f
			})
		}, c.activityMes = function(c) {
			var d = PREFIX_S2_URL + "/eqs/activity/info?id=" + c;
			return b({
				withCredentials: !0,
				method: "GET",
				url: d
			}).then(function(b) {
				if (b.data.success) {
					var c = b;
					a.$broadcast("activeMes", c)
				}
			})
		}, c
	}]), angular.module("services.configSer", []).factory("configSerService", ["$http", function(a) {
		var b = function(b) {
				var c = PREFIX_S2_URL + "index.php?c=ad&a=friendlinks&pageCode=" + b;
				return a({
					withCredentials: !0,
					method: "GET",
					url: c
				})
			},
			c = function(b) {
				//if(!window.localStorage.mytplList){
				var mytplList = [];
				var getMyTplListUrl = PREFIX_URL + "index.php?c=statics&a=getMytpl";
                		$.get(getMyTplListUrl, function (data) {
				getMyTplListUrl = "";
                		for (i = 0; i < data.list.length; i++) {
                    			mytplList.push(data.list[i].name)
                		}
                    		window.localStorage.setItem("mytpl1",mytplList[0]);
				window.localStorage.setItem("mytpl2",mytplList[1]);
				window.localStorage.setItem("mytpl3",mytplList[2]);
				});
//}
				var c = PREFIX_S2_URL + "index.php?c=eqs&a=banners&pageCode=" + b,
					d = new Date;
				return c += "&time=" + d.getTime(), a({
					withCredentials: !0,
					method: "GET",
					url: c
				})
			};
		return {
			getFriendLinks: b,
			getActivityBanner: c
		}
	}]), angular.module("services.show", []).factory("showService", ["$rootScope", "$http", function(a, b) {
		var c = {};
		return c.getPageTagLabel = function(a) {
			var c = "index.php?c=upfile&a=systag&type=2";
			null != a && (c += (/\?/.test(c) ? "&" : "?") + "bizType=" + a);
			var d = new Date;
			return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), b({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_S2_URL + c
			})
		}, c.getSceneList = function(c, d, e, f, g) {
			var h = PREFIX_S2_URL + "index.php?c=eqs&a=promotion";
			return c && (h += /\?/.test(h) ? "&" : "?", h += "template=" + c), d && (h += /\?/.test(h) ? "&" : "?", h += "recommend=" + d), e && (h += /\?/.test(h) ? "&" : "?", h += "tagId=" + e), f && (h += /\?/.test(h) ? "&" : "?", h += "pageNo=" + f), g && (h += /\?/.test(h) ? "&" : "?", h += "pageSize=" + g), b({
				withCredentials: !0,
				method: "GET",
				url: h
			}).then(function(b) {
				if (b.data.success) {
					var c = b.data;
					a.$broadcast("sceneList", c)
				}
			})
		}, c.search = function(c) {
			var d = "index.php?c=eqs&a=search";
			return b({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_S2_URL + d,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(c)
			}).then(function(b) {
				if (b.data.success) {
					var c = b.data;
					a.$broadcast("searchList", c)
				}
			})
		}, c
	}]), angular.module("services.visitor", []).factory("visitorService", ["$rootScope", "$http", function(a, b) {
		var c = {};
		return c.getRecommendVisitor = function() {
			var a = "showker/recommend";
			return b({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_S2_URL + a
			})
		}, c.getVisitorMsg = function(a) {
			var c = "showker/detail?userId=" + a;
			return b({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_S2_URL + c
			})
		}, c.getVisitorList = function(a, c, d, e, f) {
			var g = "showker/list";
			return a && (g += /\?/.test(g) ? "&" : "?", g += "addr=" + a), c && (g += /\?/.test(g) ? "&" : "?", g += "pay=" + c), d && (g += /\?/.test(g) ? "&" : "?", g += "good=" + d), e && (g += /\?/.test(g) ? "&" : "?", g += "pageNo=" + e), f && (g += /\?/.test(g) ? "&" : "?", g += "pageSize=" + f), b({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_S2_URL + g
			})
		}, c.getVisitorMesList = function(a, c, d) {
			var e = "showker/represent?userId=" + a;
			return c && (e += /\?/.test(e) ? "&" : "?", e += "pageNo=" + c), d && (e += /\?/.test(e) ? "&" : "?", e += "pageSize=" + d), b({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_S2_URL + e
			})
		}, c
	}]), angular.module("visitorXq", ["services.visitor"]), angular.module("visitorXq").controller("VisitorXqCtrl", ["$rootScope", "$http", "$scope", "$translate", "showService", "$location", "$routeParams", "visitorService", function(a, b, c, d, e, f, g, h) {
		c.childCat = "visitor", c.pageNo = 1, c.pageSize = 16, c.serverTag = [], c.cateTag = [], c.payTag = [], c.userId = g.id, c.qqAction = d.instant("show.visitorXq.QQ_LABEL"), c.getUserDetail = function() {
			h.getVisitorMsg(c.userId).then(function(a) {
				c.visitorMsg = a.data.obj, null === c.visitorMsg.tel && c.visitorMsg.phone ? c.visitorMsg.tel = c.visitorMsg.phone : c.visitorMsg.tel && c.visitorMsg.phone && (c.visitorMsg.tel = c.visitorMsg.phone);
				var b = a.data.obj.tagList;
				if (b) for (var e = 0; e < b.length; e++)"province" == b[e].type ? c.serverTag.push({
					tagId: b[e].tagId,
					name: b[e].name
				}) : "company_industry" == b[e].type ? c.cateTag.push({
					tagId: b[e].tagId,
					name: b[e].name
				}) : "payType" == b[e].type && c.payTag.push({
					tagId: b[e].tagId,
					name: b[e].name
				});
				c.visitorMsg.headImg && (0 === c.visitorMsg.headImg.indexOf("http://") ? c.visitorMsg.headImg = c.visitorMsg.headImg : c.visitorMsg.headImg = PREFIX_FILE_HOST + c.visitorMsg.headImg), null === c.visitorMsg.qq && (c.qqAction = "", $(".qq").addClass("hui"), c.visitorMsg.qq = d.instant("show.visitorXq.NO_QQ_HINT")), null === c.visitorMsg.tel && ($(".phone").addClass("hui"), c.visitorMsg.tel = d.instant("show.visitorXq.NO_TEL")), null === c.visitorMsg.wechat && ($(".weixin").addClass("hui"), c.visitorMsg.wechat = d.instant("show.visitorXq.NO_WECHAT"))
			})
		}, c.getUserDetail(), c.totalItems = 0, c.currentPage = 1, c.getUserWorks = function() {
			h.getVisitorMesList(c.userId, c.pageNo, c.pageSize).then(function(a) {
				c.visitorWorks = a.data.list, c.totalItems = a.data.map.count, c.toPage = a.data.map.pageNo;
				for (var b = 0; b < c.visitorWorks.length; b++) c.visitorWorks[b].headImg ? 0 === c.visitorWorks[b].headImg.indexOf("http://") ? c.visitorWorks[b].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.visitorWorks[b].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png" : c.visitorWorks[b].headImg = CLIENT_CDN + "assets/images/xiaotouxiang.png"
			})
		}, c.getUserWorks(), c.pageChanged = function(a) {
			return c.pageNo = a, 1 > a || a > c.totalItems / 16 + 1 ? void alert(d.instant("show.OVER_PAGE_NUMBER")) : void c.getUserWorks(c.userId, a, c.pageSize)
		}
	}]), angular.module("visitor", ["services.visitor"]), angular.module("visitor").controller("VisitorCtrl", ["$rootScope", "$http", "$scope", "$translate", "showService", "$location", "usercenterService", "visitorService", function(a, b, c, d, e, f, g, h) {
		c.childCat = "visitor", c.visitorId = "12", c.pageNo = 1, c.pageSize = 12, c.visitorXq = function(a) {
			f.path("/show/visitor/" + a)
		};
		var i = function(a) {
				g.getAPPlyMessage(a).then(function(b) {
					"province" === a ? c.serverLabel = b.data.list : "company_industry" === a ? c.cateLabel = b.data.list : "payType" === a && (c.payLabel = b.data.list)
				})
			};
		i("province"), i("company_industry"), i("payType"), c.getLimitedServeRegion = function(a) {
			return c.serverLabel.indexOf(a) < 8
		}, c.getOtherServeRegion = function(a) {
			return c.serverLabel.indexOf(a) >= 8 && (c.moreArea = !0), c.serverLabel.indexOf(a) >= 8
		}, c.getLimitedCateRegion = function(a) {
			return c.cateLabel.indexOf(a) < 11
		}, c.getOtherCateRegion = function(a) {
			return c.cateLabel.indexOf(a) >= 11 && (c.moreLabel = !0), c.cateLabel.indexOf(a) >= 11
		};
		h.getRecommendVisitor().then(function(a) {
			if (c.recommendVisitor = a.data.obj, c.recommendVisitor.represent1) {
				var b = c.recommendVisitor.represent1,
					d = b.substring(0, b.indexOf("_")),
					e = b.substring(b.indexOf("_") + 1, b.length);
				c.work1Code = d, c.work1Name = e
			}
			if (c.recommendVisitor.represent2) {
				var f = c.recommendVisitor.represent2,
					g = f.substring(0, f.indexOf("_")),
					h = f.substring(f.indexOf("_") + 1, f.length);
				c.work2Code = g, c.work2Name = h
			}
			if (c.recommendVisitor.represent3) {
				var i = c.recommendVisitor.represent3,
					j = i.substring(0, i.indexOf("_")),
					k = i.substring(i.indexOf("_") + 1, i.length);
				c.work3Code = j, c.work3Name = k
			}
			c.recommendVisitor.headImg && (0 === c.recommendVisitor.headImg.indexOf("http://") ? c.recommendVisitor.headImg = c.recommendVisitor.headImg : c.recommendVisitor.headImg = PREFIX_FILE_HOST + c.recommendVisitor.headImg)
		});
		var j = {
			pay: null,
			addr: null,
			good: null
		};
		c.serverAll = "all", c.cateAll = "all", c.payAll = "all", c.serverWu = function(a, b) {
			c[b] = "all", "province" == a ? (j.addr = null, c.currentServer = null) : "company_industry" == a ? (j.good = null, c.currentCate = null) : "payType" == a && (j.pay = null, c.currentPay = null), k(j.addr, j.pay, j.good, c.pageNo, c.pageSize)
		}, c.subServer = function(a) {
			c.currentServer = a, c.serverAll = null, j.addr = a.id, k(j.addr, j.pay, j.good, c.pageNo, c.pageSize)
		}, c.subLabel = function(a) {
			c.currentCate = a, c.cateAll = null, j.good = a.id, k(j.addr, j.pay, j.good, c.pageNo, c.pageSize)
		}, c.subPay = function(a) {
			c.currentPay = a, c.payAll = null, j.pay = a.id, k(j.addr, j.pay, j.good, c.pageNo, c.pageSize)
		}, c.totalItems = 0;
		var k = function() {
				h.getVisitorList(j.addr, j.pay, j.good, c.pageNo, c.pageSize).then(function(a) {
					c.visitorList = a.data.list, c.totalItems = a.data.map.count, c.currentPage = a.data.map.pageNo, c.toPage = a.data.map.pageNo;
					for (var b = 0; b < c.visitorList.length; b++) {
						if (c.visitorList[b].represent1) {
							var d = c.visitorList[b].represent1,
								e = d.substring(0, d.indexOf("_")),
								f = d.substring(d.indexOf("_") + 1, d.length);
							c.visitorList[b].represent1Code = e, c.visitorList[b].represent1Name = f
						}
						if (c.visitorList[b].represent2) {
							var g = c.visitorList[b].represent2,
								h = g.substring(0, g.indexOf("_")),
								i = g.substring(g.indexOf("_") + 1, g.length);
							c.visitorList[b].represent2Code = h, c.visitorList[b].represent2Name = i
						}
						if (c.visitorList[b].represent3) {
							var j = c.visitorList[b].represent3,
								k = j.substring(0, j.indexOf("_")),
								l = j.substring(j.indexOf("_") + 1, j.length);
							c.visitorList[b].represent3Code = k, c.visitorList[b].represent3Name = l
						}
						c.visitorList[b].headImg && (0 === c.visitorList[b].headImg.indexOf("http://") ? c.visitorList[b].headImg = c.visitorList[b].headImg : c.visitorList[b].headImg = PREFIX_FILE_HOST + c.visitorList[b].headImg)
					}
				})
			};
		k(), c.pageChanged = function(a) {
			return c.pageNo = a, 1 > a || a > c.totalItems / 12 + 1 ? void alert(d.instant("show.OVER_PAGE_NUMBER")) : void k(j, a, c.pageSize)
		}
	}]), angular.module("app.spread.console", []).controller("ApplyConsoleCtrl", ["$scope", "$rootScope", "applyObj", "sceneSettingCache", "SpreadService", "pageTplService", function(a, b, c, d, e, f) {
		a.apply || (a.apply = {}), a.applyObj = c, 2 == c.type ? (a.title = "申请加入微课", a.description = "申请加入微学宝官方微课平台，获取更多朋友的关注", d.sceneTagsPromise.then(function(b) {
			var c = b.data.list || [];
			a.$watch("applyObj.sceneType", function(b) {
				b && (a.sceneTags = [], angular.forEach(c, function(c) {
					b == c.bizType && a.sceneTags.push(c)
				}))
			})
		})) : 1 == c.type ? (a.title = "申请成为样例", a.description = "申请微学宝官方推荐，成为其他用户创建微课的原型样例，还可以赚取微币", 4 == b.user.type && d.sceneTplPricesPromise.then(function(b) {
			a.tplPrices = b.data.list || [], a.apply.tplObj = a.tplPrices[0]
		})) : 3 == c.type ? (a.title = "加入活动", a.description = "与其他高手过招，展示自我深厚的制作功力，有机会获得活动大奖", f.getPageTpls(c.value).then(function(b) {
			a.activityPageTpls = b.data.list || []
		})) : 4 == c.type && (a.title = "申请为企业样例");
		var g, h;
		a.apply = function() {
			if (2 == c.type) {
				if (!a.apply.showObj) return void(a.authError = "请先选择微课类型！");
				g = a.apply.showObj.id
			} else if (1 == c.type) g = 4 == b.user.type ? a.apply.tplObj.value : 0;
			else if (3 == c.type) {
				if (!i) return void(a.authError = "请先选择活动尾页！");
				g = c.id + "," + i
			}
			e.applyShareWay(c.sceneId, c.type, g)
		}, a.$on("apply.scene.share", function(b, c) {
			c.success ? a.$close({
				value: g,
				src: h
			}) : (alert(c.msg), a.$dismiss())
		});
		var i;
		a.selectActivePage = function(b) {
			$.each(a.activityPageTpls, function(a, b) {
				b.checked = !1
			}), b.checked = !0, i = b.id, b.properties && b.properties.thumbSrc && (h = b.properties.thumbSrc)
		}, a.cancel = function() {
			a.$dismiss()
		}
	}]), angular.module("spread", ["app.directives.pieChart", "app.directives.numChangeAnim", "spread.tab", "app.directives.qrcode", "app.directives.switchInput", "app.directives.copyButton", "app.spread.console"]), angular.module("spread").controller("SpreadCtrl", ["$scope", "$rootScope", "$location", "$routeParams", "MineService", "sceneService", "dataService", "security", function(a, b, c, d, e, f, g, h) {
		a.viewControl = {}, a.viewControl.tab = d.tab, a.sceneId = d.sceneId;
		var i, j = b.branchid;
		a.$watch("user", function(a) {
			a && (i = b.user && b.user.domain ? "http://" + b.user.domain : b.PREFIX_CLIENT_HOST, k())
		}, !0), a.getMyScene = k, a.sceneSettings = function(b) {
			b && b.stopPropagation(), c.path("scene/create/" + a.sceneId).search({
				pageId: 1,
				openSetting: "show"
			})
		};
		var k = function() {
				a.sceneDetailPromise = f.getSceneDetail(a.sceneId, j), a.sceneDetailPromise.then(function(b) {
					a.scene = b.data.obj, a.url = a.selectedUrl = i + "/v-" + a.scene.code, a.scene.accessCode ? a.sceneStadus = "加密访问" : 1 == a.scene.status ? a.sceneStadus = "开放访问" : a.sceneStadus = "关闭访问"
				})
			};
		a.showShare = function(b) {
			a.viewControl.tab = b, a.viewControl.subtab || (a.viewControl.subtab = "socialShare"), c.path("spread/share/" + d.sceneId + "/socialShare", !1)
		}, a.showStatistics = function(b) {
			a.viewControl.tab = b, c.path("spread/statistics/" + d.sceneId, !1)
		}, a.dataCollect = function(b) {
			a.viewControl.tab = b, c.path("spread/dataCollect/" + d.sceneId, !1)
		}, a.openScene = function(b, c) {
			c ? f.openScene(a.scene.id).then(function(b) {
				b.data.success && (a.scene.status = 1)
			}) : f.closeScene(a.scene.id).then(function(b) {
				b.data.success && (a.scene.status = 2)
			})
		}
	}]), angular.module("spread.dataCollect", []), angular.module("spread.dataCollect").controller("DataCollectCtrl", ["$rootScope", "$scope", "$timeout", "dataService", "ModalService", "i18nNotifications", function(a, b, c, d, e, f) {
		function g(a, c, e) {
			d.getDataBySceneId(a, c, e, l).then(function(a) {
				a.data.list.length > 0 && (k = a.data.list.shift().slice(1));
				for (var c = 0; c < a.data.list.length; c++) a.data.list[c].$$id = a.data.list[c][0], a.data.list[c].splice(0, 1);
				if (j.length < 1) for (c = 0; c < k.length; c++) j.push({
					title: k[c],
					selected: !1,
					id: c
				});
				if (b.dataShow.length > 0) for (b.dataShowList.length = 0, c = 0; c < b.dataShow.length; c++) for (var d = 0; d < b.dataHeaders.length; d++) b.dataShow[c].id == b.dataHeaders[d].id && (b.dataHeaders[d].selected = !0);
				else if (j.length > 0 && j.length < 8) for (c = 0; c < j.length; c++) j[c].selected = !0, isTimeColumnSelected = !0;
				else if (j.length > 7) for (var e = 0; 8 > e; e++) j[e].selected = !0;
				b.dataList = a.data.list, b.totalItems = a.data.map.count, b.page.currentPage = a.data.map.pageNo, b.toPage = a.data.map.pageNo, h(), b.totalItems < 1e3 ? b.showUp = !1 : (b.showUp = !0, o())
			})
		}
		function h() {
			b.dataShow.length = 0;
			for (var a = 0; a < j.length; a++) j[a].selected && (b.dataShow.push({
				title: j[a].title,
				selected: !0,
				id: j[a].id
			}), b.dataContain = !0);
			if (b.dataShow.length < 1) b.dataShowList.length = 0;
			else for (var c = 0; c < b.dataList.length; c++) {
				var d = b.dataShowList[c] = [];
				for (d.push(b.dataList[c].$$id), d.$$id = d[0], d.splice(0, 1), a = 0; a < b.dataShow.length; a++) {
					var e = b.dataShow[a].id;
					d.push(b.dataList[c][e])
				}
			}
			0 === b.dataShow.length ? b.dataContain = !1 : 1 == b.dataShow.length ? b.tdW = "100%" : 2 == b.dataShow.length ? b.tdW = "50%" : 3 == b.dataShow.length ? b.tdW = "33.3%" : 4 == b.dataShow.length ? b.tdW = "25%" : 5 == b.dataShow.length ? b.tdW = "20%" : 6 == b.dataShow.length ? b.tdW = "16.5%" : 7 == b.dataShow.length && (b.tdW = "14.5%")
		}
		b.totalItems = 0, b.page = {
			currentPage: 1
		}, b.toPage = "", b.dataList = [];
		var j = b.dataHeaders = [],
			k = [];
		b.dataShow = [], b.dataShowList = [];
		var l = a.branchid;
		b.branchEdit = !0, b.branchDelete = !0, b.branchExport = !0, c(function() {
			21 == b.user.type && (b.user.extPermi ? (/^([\d,]+,)?1(,[\d,]*)?$/.test(b.user.extPermi) ? b.branchEdit = !0 : b.branchEdit = !1, /^([\d,]+,)?2(,[\d,]*)?$/.test(b.user.extPermi) ? b.branchDelete = !0 : b.branchDelete = !1, /^([\d,]+,)?3(,[\d,]*)?$/.test(b.user.extPermi) ? b.branchExport = !0 : b.branchExport = !1) : (b.branchEdit = !1, b.branchDelete = !1, b.branchExport = !1))
		}, 100), b.selectHeader = function(a, b, c) {
			h()
		};
		var m = PREFIX_S3_URL + "index.php?c=scenedata&a=excel&flag=noheader&id=" + b.sceneId + (l ? "&user=" + l : ""),
			n = PREFIX_S3_URL + "index.php?c=scenedata&a=excel&id=" + b.sceneId + (l ? "&user=" + l : "");
		b.dataOutNoHeader = function() {
			location.href = m
		}, b.dataOutNoHeaderPage = function(a, c) {
			var d;
			d = m + (/\?/.test(m) ? "&" : "?") + "start=" + a + "&end=" + c, location.href = d, b.dataPageList = !1
		}, b.dataOutDirect = function() {
			location.href = n
		}, b.dataOutPage = function(a, c) {
			var d;
			d = n + (/\?/.test(n) ? "&" : "?") + "start=" + a + "&end=" + c, location.href = d, b.dataPageList = !1
		};
		var o = function(a, c) {
				b.dataPageNums = [], b.dataPageobg = {};
				for (var d = Math.ceil(b.totalItems / 10, 16), e = Math.ceil(d / 100, 16), f = 1; e + 1 > f; f++) b.start = 100 * (f - 1) + 1, b.end = 100 * f, f == e && (b.end = d), b.dataPageobg = {
					start: b.start,
					end: b.end
				}, b.dataPageNums.push(b.dataPageobg)
			};
		b.dataDelete = function(a, c) {
			var h, j;
			for (selectIds = [], i = 0; i < b.dataShowList.length; i++) b.dataShowList[i].selected && selectIds.push(b.dataShowList[i].$$id);
			return selectIds.length ? (h = {
				ids: selectIds
			}, j = "确认删除选中数据？", void e.openConfirmDialog({
				msg: j
			}, function() {
				d.deleteDataBySceneId(b.sceneId, h).then(function(a) {
					200 == a.data.code && (f.pushForCurrentRoute("data.delete.success", "notify.success"), b.allSelect.selected = !1, g(b.sceneId, b.page.currentPage, 10))
				})
			})) : void alert("您还没有选择数据")
		}, b.allSelect = {
			selected: !1
		}, b.selectAll = function() {
			for (var a = 0, c = b.dataShowList.length; c > a; a++) b.dataShowList[a].selected = b.allSelect.selected
		}, b.selectData = function(a) {
			a.selected || (b.allSelect.selected = !1)
		}, b.pageChanged = function(a) {
			return 1 > a || a > b.totalItems / 10 + 1 ? void alert("此页超出范围") : (b.allSelect.selected = !1, b.page.currentPage = a, void g(b.sceneId, a, 10))
		}, g(b.sceneId, b.page.currentPage, 10), b.clickDown = function() {
			$(".origin-ul").css({
				height: "auto"
			})
		}
	}]), angular.module("spread.share", ["spread.share.subtab"]), angular.module("spread.share").controller("ShareCtrl", ["$rootScope", "$scope", "$routeParams", "$location", "security", function(a, b, c, d, e) {
		c.subtab && (b.viewControl.subtab = c.subtab), b.isDomainAccessable = e.isAllowToAccess(e.accessDef.ACCESS_DOMAIN_BIND), b.showSelectSubTab = function(a) {
			b.viewControl.subtab = a, d.path("spread/share/" + b.sceneId + "/" + a, !1)
		}
	}]), angular.module("spread.statistics", ["services.spread", "app.directives.lineChart", "app.directives.pieChart", "app.directives.numChangeAnim"]), angular.module("spread.statistics").controller("StatisticsCtrl", ["$translate", "$scope", "$location", "$routeParams", "sceneService", "SpreadService", "$rootScope", "MineService", "security", "$filter", function(a, b, c, d, e, f, g, h, i, j) {
		b.PREFIX_FILE_HOST = PREFIX_FILE_HOST, b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.PREFIX_SERVER_HOST = PREFIX_URL, b.spreadViewGridOptions = {}, b.spreadMobileGridOptions = {}, b.spreadClickGridOptions = {}, b.sceneDeviceData = [], b.expandWebs = [], b.totalItems = 0, b.page = {
			currentPage: 1
		}, b.startDay = 1, b.toPage = "", b.dataPieChart = [], b.pageChanged = function(a) {
			return 1 > a || a > b.totalItems / 10 + 1 ? void alert("此页超出范围") : (b.pageData = b.mapOption.data.slice(10 * (a - 1), 10 * a - 1), void(b.currentPage = a))
		};
		var k = g.branchid;
		b.isAllowedToAccessExpandWebsite = i.isAllowToAccess(i.accessDef.EXPAND_WEBSITE), b.viewStyle = "line", b.dataLineChartDataOption = {
			data: [
				[],
				[]
			],
			xAxis: []
		}, b.dataMobileChartOption = {
			data: [
				[],
				[],
				[],
				[]
			],
			xAxis: []
		}, b.contentDataOption = {
			data: [
				[],
				[]
			],
			xAxis: []
		}, b.showLine = function() {
			b.viewStyle = "line"
		}, b.showPie = function() {
			b.viewStyle = "pie"
		}, b.$on("scene.detail", function(c, d, e) {
			b.scene = d, b.scene && (101 == b.scene.type ? b.sceneType = a.instant("main.spread.expand.SCENE_TYPE1") : 102 == b.scene.type ? b.sceneType = a.instant("main.spread.expand.SCENE_TYPE2") : 103 == b.scene.type ? b.sceneType = a.instant("main.spread.expand.SCENE_TYPE3") : 104 == b.scene.type ? b.sceneType = a.instant("main.spread.expand.SCENE_TYPE4") : 105 == b.scene.type && (b.sceneType = a.instant("main.spread.expand.SCENE_TYPE5")))
		}), b.devicePie = !1, b.$on("scene.device", function(a, c, d, e, f) {
			0 === c.total ? b.sceneDeviceData = [] : b.sceneDeviceData = c.data
		}), b.getDeviceDate = function(a, b, c) {
			f.getDevicePv(a, b, c)
		}, b.$on("scene.data", function(a, c, d, e, f, g) {
			b.stats = c, l(d, e, f, g)
		});
		var l = function(a, c, d, e) {
				b.pageView = 0, b.spreadClickGridOptions.data = b.stats, b.xAxisData = [], b.viewLineChartData = [], b.dataLineChartData = [], b.dataLineChartFriendGroup = [], b.dataLineChartFriends = [], b.dataLineChartFriend = [], b.dataLineChartOther = [], b.viewLineTel = [], b.viewLineTab = [], b.dataPieChart = [];
				for (var f = 0, g = 0, h = 0, i = 0, j = 0, k = 0; k < b.stats.length; k++) b.xAxisData.push(b.stats[k].STAT_DATE), b.viewLineChartData.push(b.stats[k].SHOW), b.dataLineChartData.push(b.stats[k].DATA), b.dataLineChartFriendGroup.push(b.stats[k].S_WX_TIMELINE), b.dataLineChartFriends.push(b.stats[k].S_WX_GROUP), b.dataLineChartFriend.push(b.stats[k].S_WX_SINGLE), b.viewLineTel.push(b.stats[k].TEL), b.viewLineTab.push(b.stats[k].LINK), b.dataOthers = b.stats[k].S_MOBILE - b.stats[k].S_WX_TIMELINE - b.stats[k].S_WX_SINGLE - b.stats[k].S_WX_GROUP, b.dataLineChartOther.push(b.dataOthers), b.pageView += b.stats[k].SHOW, f += b.stats[k].S_MOBILE, g += b.stats[k].S_WX_TIMELINE, h += b.stats[k].S_WX_SINGLE, i += b.stats[k].S_WX_GROUP;
				b.spreadMobile = !0, f = 1, f > 0 ? (j = f - g - h - i, b.dataPieChart = [{
					value: g,
					name: "微信朋友圈"
				}, {
					value: i,
					name: "微信群"
				}, {
					value: h,
					name: "微信朋友"
				}, {
					value: j,
					name: "其他访问"
				}]) : b.spreadMobile = !1, b.dataLineChartDataOption = {
					data: [b.viewLineChartData, b.dataLineChartData],
					xAxis: b.xAxisData
				}, b.dataMobileChartOption = {
					data: [b.dataLineChartFriendGroup, b.dataLineChartFriends, b.dataLineChartFriend, b.dataLineChartOther],
					xAxis: b.xAxisData
				}, b.contentDataOption = {
					data: [b.viewLineTel, b.viewLineTab],
					xAxis: b.xAxisData
				}, $(".myGrid1").height(50 * (b.stats.length + 1) + 1), $(".myGrid1 .ui-grid-viewport").height(50 * b.stats.length + 1)
			};
		if (b.getAllStats = function(a, c, d) {
			b.model = {
				startTime: c,
				endTime: d
			}, f.getSceneData(a, c, d, k, b.expandId)
		}, b.$on("webs.update", function(a) {
			b.expandWebs = f.expandWebs
		}), b.viewExpandDetail = function(a, c) {
			b.selectIndex = c, b.expandId = a, b.model ? b.getAllStats(b.scene.id, b.model.startTime, b.model.endTime) : b.getAllStats(b.scene.id, -6, 1)
		}, d.sceneId) {
			f.getWebList(d.sceneId, !0, k);
			var m = new Date;
			m = new Date(m.getTime() - 864e5), f.queryRegion(d.sceneId, j("date")(m))
		}
		b.$on("region.update", function(a, c) {
			for (var d = 0; d < c.data.length; d++)(c.data[d].name.indexOf("省") > -1 || c.data[d].name.indexOf("市") > -1) && (c.data[d].name = c.data[d].name.substr(0, c.data[d].name.length - 1)), "内蒙古自治区" == c.data[d].name && (c.data[d].name = "内蒙古"), "广西壮族自治区" == c.data[d].name && (c.data[d].name = "广西"), "西藏自治区" == c.data[d].name && (c.data[d].name = "西藏"), "新疆维吾尔自治区" == c.data[d].name && (c.data[d].name = "新疆"), "香港特别行政区" == c.data[d].name && (c.data[d].name = "香港"), "宁夏回族自治区" == c.data[d].name && (c.data[d].name = "宁夏"), "澳门特别行政区" == c.data[d].name && (c.data[d].name = "澳门");
			if (c.max > 0) {
				var e = c.max.toString();
				c.max = (parseInt(e[0], 10) + 1) * Math.pow(10, e.length - 1)
			}
			b.mapOption = {
				data: c.data,
				maxValue: c.max
			}, b.totalItems = c.data.length, b.totalItems > 10 ? b.pageData = b.mapOption.data.slice(0, 9) : b.pageData = c.data
		}), b.changeMap = function(a) {
			if (a != b.startDay) {
				b.startDay = a;
				var c = new Date;
				c = new Date(c.getTime() - 864e5 * a), f.queryRegion("11858950", j("date")(c))
			}
		}
	}]).directive("eqdMap", ["$parse", function(a) {
		return {
			restrict: "E",
			scope: {
				option: "@"
			},
			template: '<div class="echartView"></div>',
			link: function(a, b, c) {
				a.echart = echarts.init(b.find("div")[0], "gray");
				var d = {
					title: {
						text: "",
						subtext: "",
						x: "center"
					},
					tooltip: {
						trigger: "item"
					},
					legend: {
						orient: "vertical",
						x: "right",
						data: ["pv"]
					},
					dataRange: {
						min: 0,
						max: 2500,
						text: ["高", "低"],
						calculable: !0,
						precision: 0
					},
					series: [{
						name: "pv",
						type: "map",
						mapType: "china",
						itemStyle: {
							normal: {
								label: {
									show: !0
								}
							},
							emphasis: {
								color: "#59c3f9",
								label: {
									show: !0
								}
							}
						},
						data: a.data
					}]
				};
				a.$watch("option", function(b, c) {
					if (b != c) {
						var e = JSON.parse(b);
						d.series[0].data = e.data, d.dataRange.max = e.maxValue, a.echart.clear(), a.echart.setOption(d)
					}
				})
			}
		}
	}]).directive("eqdLineChart", [function() {
		return {
			restrict: "E",
			scope: {
				option: "@",
				legend: "@"
			},
			template: '<div class="lineChartView"></div>',
			link: function(a, b, c) {
				a.echart = echarts.init(b.find("div")[0], "macarons");
				var d = JSON.parse(c.legend),
					e = {
						title: {
							text: "访问次数",
							x: "center"
						},
						legend: {
							data: d,
							x: "left"
						},
						calculable: !0,
						tooltip: {
							trigger: "axis"
						},
						xAxis: [{
							type: "category",
							boundaryGap: !1,
							data: []
						}],
						yAxis: [{
							type: "value"
						}],
						series: [{
							name: "",
							type: "line",
							smooth: !0,
							itemStyle: {
								normal: {
									areaStyle: {
										type: "default"
									}
								}
							},
							data: []
						}]
					},
					f = JSON.parse(c.option);
				e.xAxis[0].data = f.xAxis;
				for (var g = 1; g < f.data.length; g++) e.series[g] = angular.copy(e.series[0]);
				for (var h = 0; h < f.data.length; h++) e.series[h].name = d[h], e.series[h].data = f.data[h];
				a.echart.setOption(e), a.$watch("option", function(b, c) {
					if (b != c) {
						var d = JSON.parse(b);
						e.xAxis[0].data = d.xAxis;
						for (var f = 0; f < d.data.length; f++) e.series[f].data = d.data[f];
						a.echart.showLoading(), a.echart.hideLoading(), a.echart.setOption(e, !0)
					}
				})
			}
		}
	}]).directive("eqdPieChart", [function() {
		return {
			restrict: "E",
			scope: {
				data: "@",
				name: "@"
			},
			template: '<div class="pieChartView"></div>',
			link: function(a, b, c) {
				a.echart = echarts.init(b.find("div")[0], "macarons");
				for (var d = JSON.parse(c.data), e = [], f = 0; f < d.length; f++) e.push(d[f].name);
				var g = {
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: "vertical",
						x: "left",
						data: e
					},
					calculable: !0,
					series: [{
						name: c.name,
						type: "pie",
						radius: "55%",
						center: ["50%", "60%"],
						data: d
					}]
				};
				a.echart.setOption(g), a.$watch("data", function(b, c) {
					if (b != c) {
						var d = JSON.parse(b);
						g.series[0].data = d;
						for (var e = [], f = 0; f < d.length; f++) e.push(d[f].name);
						g.legend.data = e, a.echart.showLoading(), a.echart.hideLoading(), a.echart.setOption(g)
					}
				})
			}
		}
	}]), angular.module("spread.share.domainBind", ["services.usercenter", "services.i18nNotifications"]), angular.module("spread.share.domainBind").controller("DomainBindCtrl", ["$scope", "$rootScope", "usercenterService", "$translate", "i18nNotifications", function(a, b, c, d, e) {
		a.showController = {}, a.goStep = function(b) {
			a.showController.step = b
		}, a.bindDomain = function() {
			a.showController.agreeBind = !0
		}, a.reApply = function() {
			a.isShowBindPanel = !0, a.showController.agreeBind = !1
		};
		var f = function() {
				c.getDomain().then(function(b) {
					if (b.data.success) if (a.domainInfo = b.data.obj, a.model.day = b.data.obj.typeList[0], a.typeIndex = 0, b.data.obj.id) {
						a.isShowBindPanel = !1, a.domainInfo.ipAddress = "202.173.11.90";
						var c = a.status = b.data.obj.status;
						1 === c ? (a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS1"), a.unbind = !1, a.domainInfo.restTime = Math.floor((a.domainInfo.endDate - a.domainInfo.startDate) / 864e5)) : 2 === c ? (a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS2"), a.unbind = !1) : 3 === c ? (a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS3"), a.unbind = !0) : 4 === c ? a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS4") : (new Date).getTime() > b.data.obj.endDate && (a.status = 5, a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS5"), a.unbind = !0)
					} else a.isShowBindPanel = !0
				})
			};
		f(), a.getUserXd = function() {
			c.getUserXd().then(function(b) {
				b.data.success && (a.xdCounts = b.data.obj)
			})
		}, a.getUserXd(), a.model || (a.model = {});
		var g = a.model;
		a.checkDomainFormat = function(b) {
			return b.url ? (a.domainFormatErr = "", !0) : (a.domainFormatErr = d.instant("usercenter.server.WRITE_DNS"), !1)
		}, a.checkDayFormat = function(b) {
			return b.day ? (a.dayFormatErr = "", !0) : (a.dayFormatErr = d.instant("usercenter.server.WRITE_DATE"), !1)
		}, a.checkAppIdAndSecret = function(b) {
			return b.appId && !b.secretId ? (a.appIdFormatErr = d.instant("usercenter.serverWRITE_APPSECRET"), !1) : !b.appId && b.secretId ? (a.appSecretErr = d.instant("usercenter.server.WRITE_APPID"), !1) : (a.appIdFormatErr = "", a.appSecretErr = "", !0)
		}, a.submit = function() {
			if (a.checkDomainFormat(g) && a.checkDayFormat(g) && a.checkAppIdAndSecret(g)) if (a.cost = g.day.label, a.xdCounts >= parseInt(a.cost, 10)) {
				var b = {
					url: g.url,
					buyTime: g.day.value,
					appId: g.appId,
					secretId: g.secretId
				};
				c.bindDomain(b).then(function(b) {
					b.data.success ? (alert(d.instant("usercenter.server.DNS_COMMIT")), a.status = 2, a.isShowBindPanel = !1, a.domainInfo.ipAddress = "202.173.11.90", a.domainInfo.url = g.url) : a.actionerror = b.data.msg
				}, function() {
					alert(d.instant("usercenter.server.SERVER_ERROR"))
				})
			} else e.pushForCurrentRoute("xd.insufficient", "notify.success")
		}, a.switchDomainType = function(b) {
			a.typeIndex = b
		}
	}]), angular.module("spread.share.expandWeb", []), angular.module("spread.share.expandWeb").controller("ExpandWebCtrl", ["$rootScope", "$scope", "$routeParams", "SpreadService", "ModalService", function(a, b, c, d, e) {
		var f = a.branchid,
			g = function() {
				d.getWebList(b.sceneId, !0, f)
			};
		g(), b.$on("webs.update", function(a) {
			b.expandWebs = d.expandWebs || []
		}), b.addExpandWeb = function(c) {
			c.unshift({
				name: b.scene.name + "_扩展" + (c.length + 1),
				url: b.selectedUrl,
				showCount: 0
			}), a.$broadcast("make.input.focus")
		}, b.deleteWeb = function(a, c) {
			e.openConfirmDialog({
				msg: "删除后微课原地址无法访问，相应数据无法查看。"
			}, function() {
				var e = {
					id: c.id,
					index: a
				};
				c.id ? d.deleteWeb(e) : b.expandWebs.splice(a, 1)
			})
		};
		var h;
		b.recordName = function(a) {
			h = a
		}, b.updateName = function(a) {
			var c = {
				sceneId: b.sceneId,
				name: a.name
			};
			if (a.id) {
				if (h == a.name) return;
				c.id = a.id
			}
			d.updateName(c).then(function(c) {
				c.data.success && (a.id || (a.id = c.data.obj.id, a.url = b.selectedUrl + "?qrc=" + a.id))
			}, function(a) {
				alert("服务器异常！")
			})
		}, b.qrcodeList = [{
			type: 1,
			name: "小（256px）",
			size: 256
		}, {
			type: 2,
			name: "中（512px）",
			size: 512
		}, {
			type: 3,
			name: "大（1024px）",
			size: 1024
		}], b.downloadQrcode = function(b) {
			a.$broadcast("download.canvas", b.size)
		}
	}]), angular.module("spread.share.siteImport", []), angular.module("spread.share.siteImport").controller("SiteImportCtrl", ["$rootScope", "$scope", "$routeParams", "sceneService", function(a, b, c, d) {
		function e() {
			b.contentTexts = [{
				textOne: "以<script>的方式嵌入",
				textTwo: "该嵌入方式可以自适应高度，推荐使用。",
				textThree: "点击“复制代码”后，将代码粘贴至网页HTML期望的位置即可",
				url: '<script type="text/javascript" src="' + b.selectedUrl + '">',
				title: "在网页中以script的方式嵌入微课"
			}, {
				textOne: "以iframe的方式嵌入",
				textTwo: "该嵌入方式不能自适应高度，请谨慎使用。",
				textThree: "点击“复制代码”后，将代码粘贴至网页HTML期望的位置即可",
				url: '<iframe width=322px frameborder=0 height=641px src="' + b.selectedUrl + '"></iframe>',
				title: "在网页中以iFrame的方式嵌入微课"
			}]
		}
		b.$watch("user", function(c) {
			if (c) {
				var f;
				f = a.user && a.user.domain ? "http://" + a.user.domain : a.PREFIX_CLIENT_HOST, d.getSceneDetail(b.sceneId).then(function(a) {
					b.url = b.selectedUrl = f + "/v-" + b.scene.code, e()
				})
			}
		}, !0)
	}]), angular.module("spread.share.socialShare", ["app.directives.disableKeydown"]), angular.module("spread.share.socialShare").controller("SocialShareCtrl", ["$rootScope", "$scope", "$routeParams", "$modal", "i18nNotifications", "sceneSettingCache", "SpreadService", "pageTplService", function(a, b, c, d, e, f, g, h) {
		b.obj = {}, b.qrcodeList = [{
			type: 1,
			name: "小（256px）",
			size: 256
		}, {
			type: 2,
			name: "中（512px）",
			size: 512
		}, {
			type: 3,
			name: "大（1024px）",
			size: 1024
		}], b.shareList = [{
			id: 1,
			type: "sina",
			icon: "eqf-weibo",
			title: "新浪微博",
			"class": "sina"
		}, {
			id: 2,
			type: "tencent",
			icon: "eqf-txweibo",
			title: "腾讯微博",
			"class": "tencent"
		}, {
			id: 3,
			type: "qqzone",
			icon: "eqf-QQzone",
			title: "qq空间",
			"class": "qqzone"
		}, {
			id: 4,
			type: "timeline",
			icon: "eqf-friend",
			title: "微信朋友圈",
			"class": "timeline"
		}, {
			id: 5,
			type: "yixin",
			icon: "eqf-yixin",
			title: "易信",
			"class": "yixin"
		}, {
			id: 6,
			type: "tieba",
			icon: "eqf-tieba",
			title: "百度贴吧",
			"class": "tieba"
		}, {
			id: 7,
			type: "laiwang",
			icon: "eqf-laiwang",
			title: "来往",
			"class": "laiwang"
		}], b.downloadQrcode = function(b) {
			a.$broadcast("download.canvas", b.size)
		};
		var i = function() {
				g.getShareWayList(b.sceneId)
			};
		i(), b.$on("shareway.update", function(a, c) {
			$.each(b.shareList, function(a, b) {
				$.each(c, function(a, c) {
					c.type == b.id && 1 == c.status && (b.isLighted = !0)
				})
			})
		}), b.activeShareWay = function(a) {
			g.activeShareWay(b.sceneId, a)
		}, b.$on("active.shareway", function(a, c) {
			$.each(b.shareList, function(a, b) {
				c == b.id && (b.isLighted = !0)
			})
		}), b.$watch("scene", function(a, c) {
			a && (-1 == a.status ? b.tip = "审核被拒绝不能申请" : -2 == a.status && (b.tip = "审核中不能申请"), f.activitiesPromise.then(function(c) {
				if (b.activities = c.data.list || [], a.promIds) {
					$.each(b.activities, function(c, d) {
						a.promIds == d.id && (b.obj.selectedActivity = d)
					});
					var d = JSON.parse(a.property);
					h.getPageTpls(b.obj.selectedActivity.sceneId).then(function(a) {
						b.activityPageTpls = a.data.list || [], $.each(b.activityPageTpls, function(a, c) {
							d.activityPageId == c.id && c.properties && (b.appliedImgSrc = c.properties.thumbSrc)
						})
					})
				}
			}), 0 == a.applyTemplate ? b.obj.applySample = !1 : 1 == a.applyTemplate ? b.obj.applySample = !0 : 2 == a.applyTemplate || -1 == a.applyTemplate, b.obj.publishTime = a.publishTime, 0 == a.isShow ? b.obj.applyShow = !1 : 1 == a.isShow ? b.obj.applyShow = !0 : 2 == a.isShow || -1 == a.isShow, 3 == a.isTpl && (b.obj.applyCompTpl = !0), f.sceneTagsPromise.then(function(c) {
				var d = c.data.list || [];
				b.sceneTags = [], angular.forEach(d, function(c) {
					a.type == c.bizType && b.sceneTags.push(c)
				}), a.tagId && $.each(b.sceneTags, function(c, d) {
					a.tagId == d.id && (b.obj.sceneTag = d)
				})
			}), f.sceneTplPricesPromise.then(function(c) {
				b.tplPrices = c.data.list || [], $.each(b.tplPrices, function(c, d) {
					a.price == d.value && (b.obj.tplPrice = d)
				})
			}))
		}, !0), b.applyFunc = function(a, c, d, f) {
			if (a) {
				if (2 == c && (1 == b.scene.isShow || 2 == b.scene.isShow)) return e.pushForCurrentRoute("already.apply.discovery", "notify.success"), void $.each(b.sceneTags, function(a, c) {
					b.scene.type == c.id && (b.obj.sceneTag = c)
				});
				if (1 == c && (1 == b.scene.applyTemplate || 2 == b.scene.applyTemplate)) return e.pushForCurrentRoute("already.apply.sample", "notify.success"), void $.each(b.tplPrices, function(a, c) {
					b.scene.price == c.value && (b.obj.tplPrice = c)
				});
				if (3 == c) return -1 == b.scene.status ? void e.pushForCurrentRoute("scene.deny.apply", "notify.success") : -2 == b.scene.status ? void e.pushForCurrentRoute("scene.incheck.apply", "notify.success") : b.scene.accessCode ? void e.pushForCurrentRoute("scene.accessCode.apply", "notify.success") : b.scene.promIds ? (e.pushForCurrentRoute("already.apply.activity", "notify.success"), void $.each(b.activities, function(a, c) {
					b.scene.promIds == c.id && (b.obj.selectedActivity = c)
				})) : void(window.localStorage && localStorage.getItem("hideApplyActivityTip") ? j(a, c, d, f) : b.showApplyTip = !0);
				j(a, c, d, f)
			}
		}, b.switchApplyActivityTip = function(a, b, c, d, e) {
			e && window.localStorage && localStorage.setItem("hideApplyActivityTip", !0), j(a, b, c, d)
		}, b.$on("apply.scene.share", function(a, b) {
			b.success && e.pushForCurrentRoute("scene.apply.success", "notify.success")
		});
		var j = function(a, c, f, g) {
				a && d.open({
					windowClass: "console six-contain",
					templateUrl: "spread/console/apply.tpl.html",
					controller: "ApplyConsoleCtrl",
					resolve: {
						applyObj: function() {
							return {
								sceneId: b.sceneId,
								type: c,
								value: f,
								id: g,
								sceneType: b.scene.type
							}
						}
					}
				}).result.then(function(a) {
					var d = a.value;
					e.pushForCurrentRoute("scene.apply.success", "notify.success"), 2 == c ? ($.each(b.sceneTags, function(a, c) {
						d == c.id && (b.obj.sceneTag = c)
					}), b.scene.isShow = 1) : 1 == c ? ($.each(b.tplPrices, function(a, c) {
						d == c.value && (b.obj.tplPrice = c)
					}), b.scene.applyTemplate = 1) : 3 == c ? a.src && (b.appliedImgSrc = a.src) : 4 == c && (b.scene.isTpl = 3)
				}, function() {
					2 == c ? b.obj.applyShow = !1 : 1 == c ? b.obj.applySample = !1 : 3 == c ? b.obj.selectedActivity = null : 4 == c && (b.obj.applyCompTpl = !1)
				})
			};
		b.applyCompTpl = function(a, c) {
			a && g.applyShareWay(b.sceneId, c)
		}, b.closeActivityModal = function() {
			b.showApplyTip = !1, b.obj.selectedActivity = null
		}
	}]), angular.module("spread.share.subtab", ["spread.share.socialShare", "spread.share.expandWeb", "spread.share.domainBind", "spread.share.siteImport"]), angular.module("spread.tab", ["spread.share", "spread.statistics", "spread.dataCollect"]), angular.module("usercenter.branch", ["services.usercenter", "services.i18nNotifications"]), angular.module("usercenter.branch").controller("BranchCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location", "branch", "i18nNotifications", "$translate", function(a, b, c, d, e, f, g, h, i, j, k, l) {
		b.originData = b.branch = angular.copy(j), b.dept = {}, b.depts = [], b.resetDefalt = !1, j ? b.resetDefalt = !0 : (b.resetDefalt = !1, setTimeout(function() {
			$("button").css("background-color", "#ccc")
		}, 0), b.branch = {}), b.openResetModal = function(a) {
			g.open({
				windowClass: "console six-contain",
				templateUrl: "usercenter/console/resetbranchpass.tpl.html",
				controller: "ResetBranchPassCtrl",
				resolve: {
					branch: function() {
						return a
					}
				}
			}).result.then(function() {
				k.pushForCurrentRoute("branch.reset.success", "notify.success")
			}, function() {})
		}, b.getDepts = function() {
			e.getDepts(b.branch.id).then(function(a) {
				b.branchPermi.edit = a.data.company_ext[0]
				b.branchPermi.delete = a.data.company_ext[1]
				b.branchPermi.export = a.data.company_ext[2]
				console.log(b.branchPermi)
				if (b.depts = a.data.list, b.branch.deptName || b.branch.deptId) for (var c = 0; c < b.depts.length; c++) if (b.depts[c].id == b.branch.deptId) return void(b.branch.dept = b.depts[c])
			}, function() {
				//alert(l.instant("usercenter.account.SERVER_ERROR"))
			})
		}, b.getDepts(), b.authError = "", b.checkDeptFormat = function(a) {
			return a.name ? countCharacters(a.name) > 30 ? ($(".dept-name").addClass("error"), $(".dept-name").change(function() {
				$(this).removeClass("error")
			}), b.deptFormatError = l.instant("usercenter.account.DEPT_ERR2"), !1) : (b.deptFormatError = "", !0) : (b.deptFormatError = l.instant("usercenter.account.DEPT_ERR1"), $(".dept-name").focus(), deptF = {}, !1)
		}, b.addDept = function() {
			b.checkDeptFormat(b.dept) && e.addDept(b.dept).then(function(a) {
				a.data.success && (b.showAddSec = !1, b.depts.unshift({
					id: a.data.obj,
					name: b.dept.name
				}), k.pushForCurrentRoute("dept.create.success", "notify.success"), b.dept = {})
			}, function() {
				b.authError = l.instant("usercenter.account.SERVER_ERROR")
			})
		}, b.branchPermi = {
			edit: !0,
			"delete": !0,
			"export": !0
		}, b.branch.extPermi && (/^([\d,]+,)?1(,[\d,]*)?$/.test(b.branch.extPermi) && (b.branchPermi.edit = !0), /^([\d,]+,)?2(,[\d,]*)?$/.test(b.branch.extPermi) && (b.branchPermi["delete"] = !0), /^([\d,]+,)?3(,[\d,]*)?$/.test(b.branch.extPermi) && (b.branchPermi["export"] = !0)), b.checkEmailFormat = function(a) {
			return b.branch.loginName ? /^[-_a-z0-9\.@]{6,40}$/g.test(b.branch.loginName) ? (b.emailFormatError = "", !0) : (b.emailFormatError = l.instant("usercenter.account.BRANCH_ERR2"), !1) : (b.emailFormatError = l.instant("usercenter.account.BRANCH_ERR1"), !1)
		}, b.checkNameFormat = function(a) {
			return a.name ? countCharacters(a.name) > 30 ? (b.nameFormatErr = l.instant("usercenter.account.LOGIN_NAME_ERR2"), !1) : (b.nameFormatErr = "", !0) : ($(".branch-name").focus(), b.nameFormatErr = l.instant("usercenter.account.LOGIN_NAME_ERR1"), !1)
		}, b.confirm = function() {
			if (b.checkEmailFormat(b.branch) && b.checkNameFormat(b.branch)) {
				var a = {};
				b.branch.dept && (b.branch.deptName = b.branch.dept.name, b.branch.dept.id && (a.deptId = b.branch.deptId = b.branch.dept.id));
				var c = [];
				$.each(b.branchPermi, function(a, b) {
					"edit" == a && b ? c.push("1") : "export" == a && b ? c.push("3") : "delete" == a && b && c.push("2")
				}), b.branch.extPermi = c.join(","), j ? ($.extend(a, {
					id: b.branch.id,
					name: b.branch.name,
					extPermi: b.branch.extPermi
				}), e.updateBranch(a).then(function(a) {
					a.data.success && (b.$close(b.branch), k.pushForCurrentRoute("branch.update.success", "notify.success"))
				}, function(a) {
					b.serverError = l.instant("usercenter.account.SERVER_ERROR")
				})) : ($.extend(a, {
					loginName: b.branch.loginName,
					name: b.branch.name,
					extPermi: b.branch.extPermi
				}), e.createBranch(a).then(function(a) {
					a.data.success ? (b.branch.id = a.data.obj.id, k.pushForCurrentRoute("branch.create.success", "notify.success"), b.$close(b.branch)) : b.serverError = a.data.msg
				}, function(a) {
					b.serverError = l.instant("usercenter.account.SERVER_ERROR")
				}))
			}
		}, b.cancel = function() {
			b.$dismiss()
		}
	}]), angular.module("usercenter.checkMobil", ["services.usercenter", "services.i18nNotifications"]), angular.module("usercenter.checkMobil").controller("CheckMobileCtrl", ["$rootScope", "$scope", "$window", "usercenterService", "$modal", "ModalService", "$location", "$timeout", "userinfo", "i18nNotifications", "$translate", function(a, b, c, d, e, f, g, h, i, j, k) {
		function l() {
			0 === m ? (b.isCodeAccessiable = !1, b.codeTip = k.instant("usercenter.account.CODE_TIP1"), m = 60) : (b.isCodeAccessiable = !0, b.codeTip = k.instant("usercenter.account.CODE_TIP2") + "(" + m + ")", h(function() {
				m--, l()
			}, 1e3))
		}
		switch (b.title = i.title, b.userinfo = i, b.userinfo.code = "", b.title) {
		case k.instant("usercenter.account.REL_MOBILE"):
			b.dec = k.instant("usercenter.account.REL_MOBILE_DEC");
			break;
		case k.instant("usercenter.account.VALIDATE_MOBILE"):
			b.dec = k.instant("usercenter.account.VALIDATE_MOBILE_DEC");
			break;
		case k.instant("usercenter.account.CHANGE_MOBILE"):
			b.dec = k.instant("usercenter.account.CHANGE_MOBILE_DEC")
		}
		b.checkMobile = function() {
			return /^1\d{10}$/.test(b.userinfo.phone) ? (b.mobileError = "", !0) : ($(".mobile").focus(), b.mobileError = k.instant("usercenter.account.MOBILE_ERROR1"), !1)
		}, b.checkCode = function() {
			return b.userinfo.code ? (b.codeError = "", !0) : ($(".code").focus(), b.codeError = k.instant("usercenter.account.CODE_ERROR"), !1)
		}, b.getCode = function() {
			b.userinfo.phone ? (b.mobileError = "", d.relMobileCode(b.userinfo.phone).then(function(a) {
				a.data.success ? l() : b.relErr = a.data.msg
			})) : (b.mobileError = k.instant("usercenter.account.MOBILE_ERROR2"), $(".mobile").focus())
		};
		var m = 60;
		b.relAccount = function() {
			b.checkMobile() && b.checkCode() && (b.mobileError = "", b.codeError = "", d.relMobile(b.userinfo.phone, b.userinfo.password, b.userinfo.code).then(function(a) {
				a.data.success ? f.openMsgDialog({
					msg: a.data.msg
				}, function() {
					b.$close(b.userinfo.phone)
				}) : b.relErr = a.data.msg
			}))
		}, b.cancel = function() {
			b.$dismiss()
		}
	}]), angular.module("usercenter.companyinfo", ["services.usercenter", "services.i18nNotifications"]), angular.module("usercenter.companyinfo").controller("companyInfoCtrl", ["$scope", "$modal", "userinfo", "usercenterService", "i18nNotifications", function(a, b, c, d, e) {
		a.companyUserInfo = {},a.designerUserInfo = {}, a.companyUserInfo.nick = c.nick, a.type = c.type,a.pid={};
		//获取设计师信息
        var g = function(){
            d.getDesignerUserInfo().then(function(b) {
                    a.designerUserInfo = b.data.obj;
                    
                });
            d.getProvince().then(function(b){
                a.provinces = b.data.obj;
            })
        };
		var f = function() {
				d.getCompanyInfo().then(function(b) {
					a.companyUserInfo = b.data.obj
				})
			};
        a.getProvinceInfo = function(id,name){
            a.pid = id;
            a.name = name;
            a.cities=[];
            console.log('a.pid '+a.pid+'11111');
            if(a.pid==undefined){
                a.cities =[];
                a.designerUserInfo.proid ='';
                a.designerUserInfo.proname = '';
            }
            else{
                a.designerUserInfo.proid = a.pid;
                a.designerUserInfo.proname = a.name;
                var url = PREFIX_URL + "index.php?c=Designer&a=getcity&pid="+a.pid;
                $.get(url,function(data){
                data = JSON.parse(data);
                a.cities = data;
                a.$apply();
                console.log(a.cities);
                });
            }
        },
        a.getCityInfo =function(id,name){
                a.designerUserInfo.cityid= id;
                a.designerUserInfo.cityname= name;
                console.log('a.cid '+id);
                console.log('a.name '+name);
        },
        a.clearProvinceInfo =function(){
            a.$apply(
                function(){
                    a.designerUserInfo.proid= '';
                    a.designerUserInfo.proname= '';
                 });
        },
        a.clearCityInfo =function(){
            a.$apply(
                function(){
                    a.designerUserInfo.cityid= '';
                    a.designerUserInfo.cityname= '';
                 });
        },
        a.checkEmail = function(b) {
			var c = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			return b.email && !c.test(b.email) ? (a.authError = "请正确填写邮箱", !1) : (a.authError = "", !0)
		}, 2 == a.type && (f(), a.title = "企业会员基本信息"), 1 == a.type || 12 == a.type && (a.title = "个人用户基本信息"), 3 == a.type && (a.title = "高级用户基本信息"), 22 == a.type && (g(),a.title = "设计师基本信息"),a.saveUserInfo = function(b) {
			b.id = c.id, d.saveUserInfo(b).then(function(c) {
				c.data.success && (a.$close(b), e.pushForCurrentRoute("save.success", "notify.success"))
			})
		}, a.saveCompanyInfo = function(b) {
			return a.checkEmail(b) ? (b.nick = a.companyUserInfo.nick, void d.saveCompanyInfo(b).then(function(c) {
				c.data.success ? (e.pushForCurrentRoute("account.success", "notify.success"), a.$close(b)) : a.codeError = c.data.msg
			})) : !1
		}, a.saveDesignerInfo = function(b) {
			return a.checkEmail(b) ? (b.nick = a.designerUserInfo.nick, void d.saveDesignerInfo(b).then(function(c) {
				c.data.success ? (e.pushForCurrentRoute("account.success", "notify.success"), a.$close(b)) : a.codeError = c.data.msg
			})) : !1;
		}, a.cancel = function() {
			a.$close()
		}, a.invoice = function() {
			b.open({
				windowClass: "six-contain",
				templateUrl: "usercenter/console/invoice.tpl.html",
				controller: "InvoiceCtrl",
				scope: a,
				resolve: {
					userinfo: function() {
						return {}
					}
				}
			}).result.then(function(a) {}, function() {})
		}
	}]), angular.module("invitation", ["app.directives.copyButton"]), angular.module("invitation").controller("InvitationCtrl", ["security", "$scope", "usercenterService", "$translate", "$timeout", "ModalService", "i18nNotifications", function(a, b, c, d, e, f, g) {
		b.tabid = "email", b.showUrl = PREFIX_HOST + "/#/home/register?u=" + a.currentUser.id, b.url = "我做的企业秀，用的是微学宝，免费好用，你试试吧：\r\n" + PREFIX_HOST + "/#/home/register?u=" + a.currentUser.id, b.sendEmail = function(a) {
			!b.emailFormatErr && a && c.sendEmail({
				email: a
			}).then(function(a) {
				a.data.success ? g.pushForCurrentRoute("invitation.sendemail.success", "notify.success") : g.pushForCurrentRoute("invitation.sendemail.error", "notify.warning")
			})
		}, b.checkEmailFormat = function(a) {
			var c = /^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			c.test(a) ? b.emailFormatErr = "" : b.emailFormatErr = "邮件格式不正确"
		}
	}]), angular.module("usercenter.invoicelist", []).controller("GetInvoiceListCtrl", ["$scope", "usercenterService", "$modal", "ModalService", function(a, b, c, d) {
		a.pageNo = 1, a.pageSize = 5, a.obj = {};
		var e = [],
			f = function(a, c) {
				b.getInvoiceList(a, c)
			};
		f(1, 5), a.$on("get.invoice.list", function(b, c) {
			a.invoiceList = c.list || [];
			for (var d = 0; d < c.list.length; d++) a.invoiceList[d].totalFee = a.invoiceList[d].totalFee / 100, 0 == c.list[d].payType ? a.invoiceList[d].payType = "微信支付" : 1 == c.list[d].payType && (a.invoiceList[d].payType = "支付宝支付");
			a.totalItems = c.map.count, a.currentPage = a.obj.toPage = c.map.pageNo
		}), a.pageChanged = function(c) {
			b.getInvoiceList(c, a.pageSize)
		}, a.cancel = function() {
			a.$dismiss()
		}, a.view = !0, a.ok = function() {
			var b = angular.copy(e);
			e = [], b.length > 0 ? c.open({
				windowClass: "six-contain",
				templateUrl: "usercenter/console/invoice.tpl.html",
				controller: "InvoiceCtrl",
				scope: a,
				resolve: {
					userinfo: function() {
						return {
							view: a.view,
							orderIds: b
						}
					}
				}
			}).result.then(function(b) {
				f(1, 5), a.switchSelectAll()
			}, function() {}) : d.openMsgDialog({
				msg: "请选择需要开发票的订单列表",
				btn: "去选择"
			}, function() {})
		}, a.switchSelectAll = function(b) {
			e = [], b ? $.each(a.invoiceList, function(a, b) {
				e.push(b.id), b.selected = !0
			}) : $.each(a.invoiceList, function(a, b) {
				b.selected = !1
			})
		}, a.switchSelect = function(a) {
			a.selected ? e.push(a.id) : $.each(e, function(b, c) {
				c == a.id && e.splice(b, 1)
			})
		}
	}]), angular.module("usercenter.invoice", ["services.usercenter", "services.i18nNotifications"]), angular.module("usercenter.invoice").controller("InvoiceCtrl", ["$scope", "usercenterService", "$modal", "i18nNotifications", "userinfo", function(a, b, c, d, e) {
		a.invoiceStatus = "", a.changeType = function(b) {
			a.invoiceStatus = b
		}, a.editInfo = {
			isEditable: !0
		}, e.view && (a.view = e.view, a.editInfo.isEditable = !1, e.orderIds = e.orderIds.join(","));
		var f = [];
		a.authError = "", a.picture = {}, a.invoice = {
			receiver: "",
			phone: "",
			address: ""
		}, a.reset = function() {
			a.editInfo.isEditable = !0
		}, a.invoiceListPu = {
			invoiceType: 1
		}, a.invoiceListzhuan = {
			invoiceType: 2
		};
		var g = function() {
				b.getUserInvoice().then(function(b) {
					if (200 == b.data.code) {
						b.data.obj && (a.invoice = b.data.obj), b.data.map.invoiceType ? a.invoiceStatus = b.data.map.invoiceType : a.invoiceStatus = 1;
						for (var c = b.data.list, d = 0; d < c.length; d++) 1 == c[d].invoiceType && (a.invoiceListPu = c[0]), 2 == c[d].invoiceType && (a.invoiceListzhuan = c[1], f = c[1].licenseImgsJson.split(","), a.picture = {
							tax: f[0],
							bank: f[1],
							people: f[2],
							mes: f[3]
						})
					}
				})
			};
		g(), a.addPictures = function(b) {
			c.open({
				windowClass: "console img_console",
				templateUrl: "scene/console/bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1,
							count: 1
						}
					}
				}
			}).result.then(function(c) {
				"tax" == b ? a.picture.tax = c.data : "bank" == b ? a.picture.bank = c.data : "people" == b ? a.picture.people = c.data : "mes" == b && (a.picture.mes = c.data), d.pushForCurrentRoute("upload.success", "notify.success")
			})
		};
		var h = function() {
				return a.picture.tax ? a.picture.bank ? a.picture.people ? a.picture.mes ? !0 : (a.authError = "请上传开票信息加盖公章", !1) : (a.authError = "请上传一般纳税人资质证明", !1) : (a.authError = "请上传银行许可证", !1) : (a.authError = "请上传税务登记证", !1)
			};
		a.submit = function(c) {
			if (!a.invoice.receiver) return void(a.authError = "请填写收件人");
			if (!a.invoice.phone) return void(a.authError = "请填写联系电话");
			if (!a.invoice.address) return void(a.authError = "请填写收货地址");
			var c = {
				orderIds: e.orderIds,
				receiver: a.invoice.receiver,
				address: a.invoice.address,
				phone: a.invoice.phone
			};
			if (1 == a.invoiceStatus && (c.invoiceType = 1, c.title = a.invoiceListPu.title), 2 == a.invoiceStatus) {
				if (!h()) return !1;
				c.invoiceType = 2, c.title = a.invoiceListzhuan.title, c.licenseImgsJson = a.picture.tax + "," + a.picture.bank + "," + a.picture.people + "," + a.picture.mes
			}
			3 == a.invoiceStatus && (c.invoiceType = 3), b.saveOrderInvoice(c).then(function(b) {
				b.data.success && (a.$close(c), d.pushForCurrentRoute("save.success", "notify.success"))
			})
		}, a.saveUserInvoice = function(c) {
			if (!a.invoice.receiver) return void(a.authError = "请填写收件人");
			if (!a.invoice.phone) return void(a.authError = "请填写联系电话");
			if (!a.invoice.address) return void(a.authError = "请填写收货地址");
			var c = {};
			if (c.invoiceDeliver = {
				receiver: a.invoice.receiver,
				address: a.invoice.address,
				phone: a.invoice.phone
			}, c.invoiceList = [], a.invoiceListPu.title && c.invoiceList.push({
				invoiceType: a.invoiceListPu.invoiceType,
				title: a.invoiceListPu.title
			}), a.invoiceListzhuan.title) {
				if (!a.picture.tax) return void(a.authError = "请上传税务登记证");
				if (!a.picture.bank) return void(a.authError = "请上传银行许可证");
				if (!a.picture.people) return void(a.authError = "请上传一般纳税人资质证明");
				if (!a.picture.mes) return void(a.authError = "请上传开票信息加盖公章");
				var f = {
					invoiceType: a.invoiceListzhuan.invoiceType,
					title: a.invoiceListzhuan.title,
					licenseImgsJson: a.picture.tax + "," + a.picture.bank + "," + a.picture.people + "," + a.picture.mes
				};
				c.invoiceList.push(f)
			}
			b.saveUserInvoice(c).then(function(b) {
				b.data.success && (e.view ? a.editInfo.isEditable = !1 : a.$close(c), d.pushForCurrentRoute("save.success", "notify.success"))
			})
		}, a.cancel = function() {
			a.$close()
		}
	}]), angular.module("usercenter.relAccount", ["services.usercenter", "services.i18nNotifications"]), angular.module("usercenter.relAccount").controller("RelAccountCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location", "userinfo", "i18nNotifications", "$translate", function(a, b, c, d, e, f, g, h, i, j, k, l) {
		b.user = j, b.bindAccount = function() {
			return b.user.email ? b.user.password ? void e.relAccount(j.id, b.user.email, b.user.password).then(function(a) {
				if (200 == a.data.code) {
					k.pushForCurrentRoute("email.save.success", "notify.success"), /qq/gi.test(b.user.loginName) && (b.relType = "qq"), /weixin/gi.test(b.user.loginName) && (b.relType = "weixin"), /weibo/gi.test(b.user.loginName) && (b.relType = "weibo");
					var c = {
						type: b.relType,
						email: angular.copy(b.user.email)
					};
					b.$close(c)
				} else b.relErr = a.data.msg
			}, function(a) {
				b.$dismiss()
			}) : (b.relErr = l.instant("usercenter.account.PASSWORD_ERROR"), void $(".third-pwd").focus()) : (b.relErr = l.instant("usercenter.account.ACCOUNT_ERROR"), void $(".third-name").focus())
		}, b.checkUpperCase = function() {
			/[A-Z]/g.test(b.user.email) && (b.user.email = b.user.email.toLowerCase(), b.relErr = l.instant("usercenter.account.EMAIL_TIP"))
		}, b.cancel = function() {
			b.$dismiss()
		}
	}]), angular.module("usercenter.relEmail", ["services.usercenter", "services.i18nNotifications"]), angular.module("usercenter.relEmail").controller("RelEmailCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location", "userinfo", "i18nNotifications", "$translate", function(a, b, c, d, e, f, g, h, i, j, k, l) {
		switch (b.title = j.title, b.userinfo = j, b.title) {
		case l.instant("usercenter.account.REL_EMAIL"):
			b.dec = l.instant("usercenter.account.REL_EMAIL_DESC");
			break;
		case l.instant("usercenter.account.VALIDATE_EMAIL"):
			b.dec = l.instant("usercenter.account.VALIDATE_EMAIL_DESC");
			break;
		case l.instant("usercenter.account.CHANGE_EMAIL"):
			b.dec = l.instant("usercenter.account.CHANGE_EMAIL")
		}
		b.checkEmailFormat = function(a) {
			var c = /^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			return c.test(b.userinfo.email) ? (b.emailFormatErr = "", !0) : (b.emailFormatErr = l.instant("usercenter.account.REL_EMAIL_TIP"), !1)
		}, b.checkPassFormat = function(a) {
			return a.password ? (b.passFormatErr = "", !0) : (b.passFormatErr = l.instant("usercenter.account.PASSWORD_ERROR"), $(".email-pwd").focus(), !1)
		}, b.relEmail = function(a) {
			b.checkEmailFormat(a) && b.checkPassFormat(a) && (null == b.userinfo.checkEmail ? b.firstRel = !1 : b.firstRel = !0, e.relEmail(b.userinfo.email, b.userinfo.password, b.firstRel).then(function(a) {
				200 == a.data.code ? (b.relErr = "", h.openMsgDialog({
					msg: "申请绑定成功,已向您的邮箱发送验证邮件,请注意查收。"
				}, function() {
					b.$dismiss()
				})) : (b.firstRel = !0, b.relErr = a.data.msg)
			}, function(a) {}))
		}, b.checkUpperCase = function() {
			/[A-Z]/g.test(b.userinfo.email) && (b.userinfo.email = b.userinfo.email.toLowerCase(), b.relErr = l.instant("usercenter.account.EMAIL_TIP"))
		}, b.cancel = function() {
			b.$dismiss()
		}
	}]), angular.module("usercenter.relRegisterAccount", ["services.usercenter", "services.i18nNotifications"]), angular.module("usercenter.relRegisterAccount").controller("RelRegisterAccountCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location", "userinfo", "i18nNotifications", "localizedMessages", "$translate", function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
		b.user = j, b.user.agreement = !0;
		var n = !1;
		b.cancel = function() {
			b.$dismiss("cancel")
		}, b.registerAccount = function() {
			if (b.userNotExist && b.checkUsername() && b.checkPassword() && b.checkRepeatPassword()) if (b.user.password === b.user.repeatPassword && b.user.agreement) {
				if (n) return;
				n = !0, e.relAccount(j.id, b.user.email, b.user.password, !0).then(function(a) {
					if (n = !1, 200 == a.data.code) {
						k.pushForCurrentRoute("email.save.success", "notify.success"), /qq/gi.test(b.user.loginName) && (b.relType = "qq"), /weixin/gi.test(b.user.loginName) && (b.relType = "weixin"), /weibo/gi.test(b.user.loginName) && (b.relType = "weibo");
						var c = {
							type: b.relType,
							email: angular.copy(b.user.email)
						};
						b.$close(c)
					} else b.relErr = a.data.msg
				}, function(a) {
					n = !1, b.regErr = l.get("register.error.serverError", {
						exception: x
					}), b.$dismiss()
				})
			} else b.user.password != b.user.repeatPassword ? b.regErr = l.get("register.error.match") : b.regErr = l.get("register.error.agreement")
		}, b.checkUsername = function() {
			if (b.user.email) {
				if (/^[-_a-z0-9\.@]{6,40}$/g.test(b.user.email)) return b.checkUniqueness(b.user.email), !0;
				b.usernameError = m.instant("usercenter.account.REG_ACCOUNT_ERR2")
			} else b.usernameError = m.instant("usercenter.account.REG_ACCOUNT_ERR1");
			return !1
		}, b.checkUniqueness = function(a) {
			f.checkUniqueness(a).success(function(a) {
				b.userNotExist = a.success, b.userNotExist ? b.usernameError = null : b.usernameError = m.instant("usercenter.account.REG_ACCOUNT_ERR3")
			})
		}, b.checkPassword = function() {
			if (b.user.password) {
				if (/^[a-zA-Z0-9]{6,16}$/g.test(b.user.password)) return b.passError = null, !0;
				b.passError = m.instant("usercenter.account.REG_PWD_ERR2")
			} else b.passError = m.instant("usercenter.account.REG_PWD_ERR1");
			return !1
		}, b.checkRepeatPassword = function() {
			if (b.user.repeatPassword) {
				if (b.user.repeatPassword == b.user.password) return b.rPassError = "", !0;
				b.rPassError = m.instant("usercenter.account.REG_PWD_ERR4")
			} else b.rPassError = m.instant("usercenter.account.REG_PWD_ERR3");
			return !1
		}
	}]), angular.module("usercenter.branch.reset", ["services.usercenter", "services.i18nNotifications"]), angular.module("usercenter.branch.reset").controller("ResetBranchPassCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location", "branch", "i18nNotifications", function(a, b, c, d, e, f, g, h, i, j, k) {
		b.branch = j, b.reset = function() {
			e.resetBranchPass(j.id)
		}, b.cancel = function() {
			b.$dismiss()
		}, b.$on("reset.branch.success", function() {
			b.$close()
		})
	}]), angular.module("usercenter.apply", ["services.usercenter", "services.i18nNotifications"]), angular.module("usercenter.apply").controller("ApplyCtrl", ["$rootScope", "$scope", "usercenterService", "$modal", "ModalService", "i18nNotifications", "MineService", "userinfo", "$translate", "$timeout", function(a, b, c, d, e, f, g, h, j, l) {
		function m() {
			0 === B ? (b.isCodeAccessiable = !1, b.codeTip = "获取验证码", B = 60) : (b.isCodeAccessiable = !0, b.codeTip = "重新发送(" + B + ")", l(function() {
				B--, m()
			}, 1e3))
		}
		b.applyInfo = {}, b.applyInfo.nick = h.nick, b.invoiceStat = h.invoice, b.actionerror = "";
		b.serverLabel = [], b.cateLabel = [], b.payLabel = [];
		var n;
		b.applyXiuke = !0, b.title = h.title, 0 === h.status || 3 === h.status ? (n = 0, b.applyXiuke = !0) : (n = 1, b.applyXiuke = !1);
		var o = function(a) {
				c.getAPPlyMessage(a).then(function(c) {
					"province" === a ? (b.serverLabel = c.data.list, c.data.list.length > 0 && (b.moreArea = !0)) : "company_industry" === a ? (b.cateLabel = c.data.list, c.data.list.length > 0 && (b.moreLabel = !0)) : "payType" === a && (b.payLabel = c.data.list)
				})
			};
		o("province"), o("company_industry"), o("payType"), b.cancel = function() {
			b.$dismiss()
		}, b.cate_cancel = function(a) {
			for (var c = 0; c < b.cateLabel.length; c++) if (b.cateLabel[c].ischecked = !1, b.cateSelected.length > 0) for (var d = 0; d < b.cateSelected.length; d++) b.cateLabel[c].id === b.cateSelected[d].id && (b.cateLabel[c].ischecked = !0);
			b.cateError = "", setTimeout(function() {
				$(a.target).parents(".dropdown.open").trigger("click")
			})
		}, b.server_cancel = function(a) {
			for (i = 0; i < b.serverLabel.length; i++) if (b.serverLabel[i].ischecked = !1, b.serverSelected.length > 0) for (k = 0; k < b.serverSelected.length; k++) b.serverLabel[i].id === b.serverSelected[k].id && (b.serverLabel[i].ischecked = !0);
			setTimeout(function() {
				$(a.target).parents(".dropdown.open").trigger("click")
			}), b.serverError = ""
		}, b.scene_cancel = function(a) {
			for (i = 0; i < b.myShowScene.length; i++) if (b.myShowScene[i].ischecked = !1, b.sceneSelected.length > 0) for (k = 0; k < b.sceneSelected.length; k++) b.myShowScene[i].id === b.sceneSelected[k].id && (b.myShowScene[i].ischecked = !0);
			setTimeout(function() {
				$(a.target).parents(".dropdown.open").trigger("click")
			}), b.sceneError = ""
		}, b.checkIntroFormat = function(a) {
			return a.shortIntroduction ? countCharacters(a.shortIntroduction) > 30 ? (b.introError = "简短介绍不能超过30个字符", !1) : (b.introError = "", !0) : (b.introError = "请填写简短介绍", !1)
		}, b.checkIntroFormat1 = function(a) {
			return a.introduction ? countCharacters(a.introduction) > 400 ? (b.introError1 = "秀客介绍不能超过400个字符", !1) : (b.introError1 = "", !0) : (b.introError1 = "请填写秀客介绍", !1)
		}, c.getUserScene().then(function(a) {
			a.data.list.length > 0 ? b.myShowScene = a.data.list : b.myShowScene = null
		});
		var p = [];
		b.sceneSelected = [], b.sceneSelect = function(a, c, d) {
			return p = [], angular.forEach(b.myShowScene, function(a) {
				a.ischecked && p.push({
					code: a.code,
					name: a.name
				})
			}), 3 !== p.length ? (b.sceneError = "请选择三个代表作品", !1) : (b.sceneSelected = p, b.sceneNull = "", void(d && (setTimeout(function() {
				$(c.target).parents(".dropdown.open").trigger("click")
			}), b.sceneError = "")))
		};
		var q = function() {
				return 3 !== b.sceneSelected.length ? (b.sceneNull = "请选择三个代表作品", !1) : (b.sceneNull = "", !0)
			},
			r = [],
			s = [];
		b.serverSelected = [], b.serverSubmit = function(a, c, d) {
			return r = [], angular.forEach(b.serverLabel, function(a) {
				a.ischecked && r.push({
					name: a.name,
					id: a.id
				})
			}), r.length <= 0 ? void(b.serverError = "请选择服务地域") : r.length > 3 ? void(b.serverError = "服务地域不能超过3个") : (b.serverSelected = r, void(d && (setTimeout(function() {
				$(c.target).parents(".dropdown.open").trigger("click")
			}), b.serverError = "", b.serverNull = "")))
		};
		var t = function() {
				return b.serverSelected.length <= 0 || b.serverSelected.length > 3 ? (b.serverNull = "请选择1-3个服务地域", !1) : (b.serverNull = "", !0)
			},
			u = [],
			v = [];
		b.cateSelected = [], b.queren = function(a, c, d) {
			return u = [], angular.forEach(b.cateLabel, function(a) {
				a.ischecked && u.push({
					name: a.name,
					id: a.id
				})
			}), u.length <= 0 ? void(b.cateError = "请选择擅长领域") : u.length > 3 ? void(b.cateError = "擅长领域不能超过3个") : (b.cateSelected = u, b.cateNull = "", void(d && (setTimeout(function() {
				$(c.target).parents(".dropdown.open").trigger("click")
			}), b.cateError = "")))
		};
		var w = function() {
				return b.cateSelected.length <= 0 || b.cateSelected.length > 3 ? (b.cateNull = "请选择1-3个擅长领域", !1) : (b.cateNull = "", !0)
			},
			x = [],
			y = function() {
				x = [];
				var a = !1;
				return angular.forEach(b.payLabel, function(b) {
					b.ischecked && (x.push(b.id), a = !0)
				}), x = x.join(","), a ? (b.payError = "", !0) : (b.payError = "请选择支付方式", !1)
			},
			z = /^[0-9]*$/;
		b.checkQQFormat = function(a) {
			return a.qq && !z.test(a.qq) ? (b.qqError = "qq填写格式错误", !1) : a.qq ? (b.qqError = "", !0) : (b.qqError = "请填写QQ号码", !1)
		};
		var A = function(a) {
				return a.wechat ? (b.wechatError = "", !0) : (b.wechatError = "请填写微信号", !1)
			};
		b.checkEmailFormat = function(a) {
			var c = /^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			return a.email && !c.test(a.email) ? (b.emailError = "邮箱格式不正确", !1) : a.email ? (b.emailError = "", !0) : (b.emailError = "邮箱不能为空", !1)
		}, b.checkCode = function(a) {
			return a.code ? (b.codeError = "", !0) : (b.codeError = "请输入手机验证码", !1)
		}, b.getCode = function(a, d) {
			return a.phone ? (b.telError = "", void c.relMobileCode(a.phone, d).then(function(a) {
				a.data.success ? m() : b.telError = a.data.msg
			})) : (b.telError = "请填写手机号码", !1)
		};
		var B = 60;
		b.checkFormFormat = function(a) {
			return b.checkIntroFormat(a) && b.checkIntroFormat1(a) && q() && t() && w() && y() && b.checkQQFormat(a) && A(a) && b.checkEmailFormat(a) ? !0 : !1
		}, b.submit = function(a) {
			if (b.checkFormFormat(a)) {
				for (C && !C.checkPhone && 1 !== C.checkPhone && b.checkCode(a), s = [], v = [], k = 0; k < b.cateSelected.length; k++) v.push(b.cateSelected[k].id);
				for (_cateSelected2 = v.join(","), i = 0; i < b.serverSelected.length; i++) s.push(b.serverSelected[i].id);
				_serverSelected2 = s.join(",");
				var d = {
					shortIntroduction: a.shortIntroduction,
					introduction: a.introduction,
					represent1: b.sceneSelected[0].code + "_" + b.sceneSelected[0].name,
					represent2: b.sceneSelected[1].code + "_" + b.sceneSelected[1].name,
					represent3: b.sceneSelected[2].code + "_" + b.sceneSelected[2].name,
					qq: a.qq,
					wechat: a.wechat,
					phone: a.phone,
					email: a.email,
					addr: _serverSelected2 || "",
					pay: x || "",
					good: _cateSelected2 || "",
					code: a.code,
					type: n
				};
				c.saveApplyInfo(d).then(function(a) {
					a.data.success ? (b.applyInfo = a.data.map.status, f.pushForCurrentRoute("visitor.apply", "notify.success"), b.$close(b.applyInfo)) : b.authError = a.data.msg
				})
			}
		}, b.checkFormFormat2 = function(a) {
			return b.checkIntroFormat(a) && b.checkIntroFormat1(a) && q() && t() && w() && y() && b.checkQQFormat(a) && A(a) && b.checkEmailFormat(a) ? !0 : !1
		}, b.reset = function(a) {
			if (b.sceneSelect(), b.serverSubmit(), b.queren(), b.checkFormFormat2(a)) {
				for (v = [], k = 0; k < b.cateSelected.length; k++) v.push(b.cateSelected[k].id);
				for (_cateSelected2 = v.join(","), s = [], i = 0; i < b.serverSelected.length; i++) s.push(b.serverSelected[i].id);
				_serverSelected2 = s.join(",");
				var d = {
					nick: b.applyInfo.nick,
					shortIntroduction: a.shortIntroduction,
					introduction: a.introduction,
					represent1: b.sceneSelected[0].code + "_" + b.sceneSelected[0].name,
					represent2: b.sceneSelected[1].code + "_" + b.sceneSelected[1].name,
					represent3: b.sceneSelected[2].code + "_" + b.sceneSelected[2].name,
					qq: a.qq,
					wechat: a.wechat,
					email: a.email,
					addr: _serverSelected2 || "",
					pay: x || "",
					good: _cateSelected2 || "",
					type: n,
					phone: a.phone,
					code: a.code
				};
				c.resetApplyInfo(d).then(function(a) {
					a.data.success ? (f.pushForCurrentRoute("visitor.apply", "notify.success"), b.$close({
						applyInfoNew: d,
						status: a.data.map.status
					})) : b.authError = a.data.msg
				})
			}
		}, b.showPhone = !0;
		var C;
		0 !== h.status && l(function() {
			c.getVisitorMsg().then(function(a) {
				if (a.data.obj) {
					C = b.applyInfo = a.data.obj;
					var c = angular.copy(b.applyInfo.phone);
					C.checkPhone && 1 == C.checkPhone && (b.showPhone = !1, b.$watch("applyInfo.phone", function(a, d) {
						a && a !== c ? b.showPhone = !0 : b.showPhone = !1
					}));
					for (var d = C.represent1, e = d.substr(0, d.indexOf("_")), f = C.represent2, g = f.substr(0, f.indexOf("_")), h = C.represent3, i = h.substr(0, h.indexOf("_")), j = 0; j < b.myShowScene.length; j++)(b.myShowScene[j].code === e || b.myShowScene[j].code === g || b.myShowScene[j].code === i) && (b.myShowScene[j].ischecked = !0, b.sceneSelected.push(b.myShowScene[j]));
					var k = C.tagList;
					for (j = 0; j < k.length; j++) {
						for (var l = 0; l < b.serverLabel.length; l++) k[j].tagId === b.serverLabel[l].id && (b.serverLabel[l].ischecked = !0, b.serverSelected.push({
							name: k[j].name,
							id: k[j].tagId
						}));
						for (var m = 0; m < b.payLabel.length; m++) k[j].tagId === b.payLabel[m].id && (b.payLabel[m].ischecked = !0);
						for (var n = 0; n < b.cateLabel.length; n++) k[j].tagId === b.cateLabel[n].id && (b.cateLabel[n].ischecked = !0, b.cateSelected.push({
							name: k[j].name,
							id: k[j].tagId
						}))
					}
				}
			})
		}, 1e3), b.invoice = function() {
			d.open({
				windowClass: "six-contain",
				templateUrl: "usercenter/console/invoice.tpl.html",
				controller: "InvoiceCtrl",
				scope: b,
				resolve: {
					userinfo: function() {
						return {}
					}
				}
			}).result.then(function(a) {}, function() {})
		}
	}]), angular.module("usercenter.upgrade", ["services.usercenter", "services.i18nNotifications"]), angular.module("usercenter.upgrade").controller("UsercenterupgradeCtrl", ["$rootScope", "$scope", "$window", "$translate", "usercenterService", "security", "$modal", "ModalService", "i18nNotifications", "$timeout", "user", function(a, b, c, d, e, f, g, h, i, j, k) {
		function l() {
			0 === m ? (b.isCodeAccessiable = !1, b.codeTip = d.instant("usercenter.account.CODE_TIP1"), m = 60) : (b.isCodeAccessiable = !0, b.codeTip = d.instant("usercenter.account.CODE_TIP2") + "(" + m + ")", j(function() {
				m--, l()
			}, 1e3))
		}
		b.companyInfo = {
			id: k.id
		}, b.checkName = function(a) {
			return a.name ? countCharacters(a.name) > 40 ? (b.nameError = "企业名称不能超过40个字符", !1) : (b.nameError = "", !0) : (b.nameError = "请填写企业名称", !1)
		}, b.checkEmail = function(a) {
			var c = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			return a.email && !c.test(a.email) ? (b.emailError = "请正确填写邮箱", !1) : a.email ? (b.emailError = "", !0) : (b.emailError = "请填写企业邮箱", !1)
		}, b.checkcontacts = function(a) {
			return a.contacts ? countCharacters(a.contacts) > 30 ? (b.contactsError = "联系人不能超过30个字符", !1) : (b.contactsError = "", !0) : (b.contactsError = "请填写联系人", !1)
		}, b.checkCode = function(a) {
			return a.code ? (b.codeError = "", !0) : (b.codeError = "请输入手机验证码", !1)
		}, b.getCode = function(a) {
			return a.mobile ? (b.telError = "", void e.companyMobile(a.mobile).then(function(a) {
				a.data.success ? l() : b.telError = a.data.msg
			})) : (b.telError = "请填写手机号码", !1)
		};
		var m = 60;
		b.checkFormFormat = function(a) {
			return b.checkName(a) && b.checkEmail(a) && b.checkcontacts(a) && b.checkCode(a) ? !0 : !1
		}, b.upgradeCompanyMessage = function(c) {
			b.checkFormFormat(c) && e.saveCompanyInfo(c).then(function(d) {
				d.data.success ? (i.pushForCurrentRoute("account.success", "notify.success"), a.$broadcast("companyState"), b.$close(c.mobile)) : b.codeError = d.data.msg
			})
		}, b.quXiao = function() {
			b.$dismiss()
		}
	}]), angular.module("message", []), angular.module("message").controller("MessageCtrl", ["$scope", "$rootScope", "usercenterService", function(a, b, c) {
		a.pageSize = 10, a.currentPage = {
			msgCurrentPage: 1,
			branchCurrentPage: 1
		}, a.getUserMsg = function(b) {
			var d = b;
			c.getNewMessage(d, a.pageSize).then(function(b) {
				angular.forEach(b.data.list, function(a, b) {
					1 == a.bizType ? a.type = "系统通知" : 2 == a.bizType ? a.type = "审核通知" : 3 == a.bizType && (a.type = "活动通知")
				}), a.Msgs = b.data.list, a.msgCount = b.data.map.count, a.msgNumPages = Math.ceil(a.msgCount / a.pageSize)
			})
		}, a.getUserMsg(a.pageNo), a.$watch("currentPage.msgCurrentPage", function(b, c) {
			b != c && (a.getUserMsg(b), a.toPage = b)
		}), a.pageChanged = function(b, c) {
			a.currentPage[c] = b
		}, a.setRead = function(d) {
			var e = [];
			angular.forEach(d, function(a, b) {
				1 == a.status && this.push(a.id)
			}, e);
			var f = e.join();
			c.setRead(f).then(function(c) {
				200 == c.data.code && (b.$broadcast("minusCount", e.length), a.newMsgCount = 0, angular.forEach(d, function(a, b) {
					a.status = 2
				}))
			})
		}
	}]), angular.module("usercenter.request", ["services.usercenter", "app.directives.qrcode"]), angular.module("usercenter.request").controller("UsercenterrequestCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location", function(a, b, c, d, e, f, g, h, i) {
		b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.currentUser = f.currentUser, b.cancel = function() {
			b.$dismiss()
		}
	}]), angular.module("usercenter.account", ["usercenter.relEmail"]), angular.module("usercenter.account").controller("UsercenterAccountCtrl", ["$location", "$rootScope", "$scope", "$window", "usercenterService", "$modal", "ModalService", "i18nNotifications", "security", "thirdpartyService", "$translate", "$timeout", function(a, b, c, d, e, f, g, h, i, j, k, l) {
		function m() {
			c.progress = "0", 1 == c.userinfo.checkEmail && 1 == c.userinfo.checkPhone && (c.redColor = !1, l(function() {
				c.progress = "90"
			}, 100)), 1 != c.userinfo.checkEmail && 1 != c.userinfo.checkPhone && (l(function() {
				c.progress = "20"
			}, 100), c.redColor = !0), (1 != c.userinfo.checkEmail && 1 == c.userinfo.checkPhone || 1 == c.userinfo.checkEmail && 1 != c.userinfo.checkPhone) && (c.redColor = !1, l(function() {
				c.progress = "60"
			}, 100))
		}
		function n(a) {
			a && (a.state && /WECHAT_STATE/.test(a.state) ? (s = {
				code: a.code,
				type: "weixin"
			}, j.bindAccountCommon(s)) : j.qqBindAccount(a))
		}
		c.PREFIX_CLIENT_HOST = PREFIX_HOST, c.XdpageSize = 10, c.page = {}, c.pageChanged = function(a) {
			return 1 > a || a > c.branchesCount / 10 + 1 ? void alert("此页超出范围") : (c.currentPage = a, void c.getBranches(a))
		}, c.getBranches = function(a) {
			e.getBranches(c.XdpageSize, a).then(function(a) {
				a.data.success && (c.branches = a.data.list, c.branchesCount = a.data.map.count, c.page.currentPage = a.data.map.pageNo, c.toPage = a.data.map.pageNo, c.branchesNumPages = Math.ceil(c.branchesCount / c.XdpageSize), o())
			}, function() {})
		}, c.getBranches(c.pageNo), c.branchName = {};
		var o = function() {
				var d = a.search().branchid;
				if (d) for (var e = 0; e < c.branches.length; e++) c.branches[e].id == d && (c.branchName.name = c.branches[e].loginName);
				else b.branchid = "", a.search("branchid", null)
			};
		c.$watch("branchid", function(a, b) {
			a != b && o()
		}), c.changeCurrent = function() {
			b.branchid = "", a.search("branchid", null)
		}, c.selectBranch = function(c) {
			b.branchid = c.id, a.path("main"), a.search({
				branchid: b.branchid
			})
		}, c.$watch("userinfo", function(a) {
			a && m()
		});
		var p = /^EQS.*qq$/,
			q = /^EQS.*weixin$/;
		c.qqShow = !0, c.weixinShow = !0, p.test(i.currentUser.loginName) && (c.qqShow = !1), q.test(i.currentUser.loginName) && (c.weixinShow = !1);
		var r = null;
		c.goReset = function() {
			r = f.open({
				windowClass: "six-contain",
				templateUrl: "usercenter/tab/reset.tpl.html",
				controller: "UsercenterAccountCtrl",
				scope: c
			}).result.then(function() {
				r = null
			}, function() {
				r = null
			})
		}, c.checkOldPassword = function() {
			return c.password.old ? (c.oldPassError = "", !0) : (c.oldPassError = "原始密码不能为空", !1)
		}, c.checkPassword = function() {
			if (c.password.newPw) {
				if (/^[a-zA-Z0-9]{6,16}$/g.test(c.password.newPw)) return c.passError = "", !0;
				c.passError = "密码为6~16个字符(英文字母或数字，区分大小写)"
			} else c.passError = "新密码不能为空";
			return !1
		}, c.checkRepeatPassword = function() {
			if (c.password.confirm) {
				if (c.password.confirm == c.password.newPw) return c.rPassError = "", !0;
				c.rPassError = "两次密码输入不一致，请重新输入"
			} else c.rPassError = "确认密码不能为空";
			return !1
		}, c.reset = function() {
			if (c.checkOldPassword() && c.checkPassword() && c.checkRepeatPassword()) {
				if (angular.equals(c.master, c.password)) return void(c.authError = "请不要重复提交！");
				c.oldPassError = "", c.passError = "", c.rPassError = "", i.resetPassword(c.password.old, c.password.newPw).then(function(a) {
					a.data.success ? (h.pushForCurrentRoute("reset.psw.success", "notify.success"), c.master = angular.copy(c.password), c.$close(c.master)) : c.oldPassError = a.data.msg
				})
			}
		}, c.quXiao = function() {
			c.$dismiss()
		}, c.manageBranch = function(a) {
			var b = a;
			if (!a) if (3 == i.currentUser.memberType) {
				if (c.branchesCount >= 100) return void g.openMsgDialog({
					msg: "子账号数量已达到限制!"
				})
			} else if (2 == i.currentUser.memberType) {
				if (c.branchesCount >= 50) return void g.openMsgDialog({
					msg: "子账号数量已达到限制!"
				})
			} else if (c.branchesCount >= 30) return void g.openMsgDialog({
				msg: "子账号数量已达到限制!"
			});
			f.open({
				windowClass: "console six-contain branch-contain",
				templateUrl: "usercenter/console/branch.tpl.html",
				controller: "BranchCtrl",
				resolve: {
					branch: function() {
						return a
					}
				}
			}).result.then(function(d) {
				a || (a = {}), d.dept && (a.deptId = d.dept.id, a.deptName = d.dept.name), a.name = d.name, a.id = d.id, a.extPermi = d.extPermi, b ? c.branchesCount++ : (a.loginName = d.loginName, a.status = 1, a.regTime = (new Date).getTime(), c.branches.unshift(a), c.branches.length > 10 && c.branches.splice(c.branches.length - 1, 1)), c.$emit("addBranch", a)
			}, function() {})
		}, c.openBranch = function(a, b) {
			e.openBranch(a.id, b).then(function(c) {
				c.data.success && (b ? (a.status = 1, h.pushForCurrentRoute("branch.open.success", "notify.success")) : (a.status = 2, h.pushForCurrentRoute("branch.close.success", "notify.success")))
			}, function() {
				alert("服务器异常")
			})
		}, c.$on("rel.success", function(a, b) {
			h.pushForCurrentRoute("mail.rel.success", "notify.success"), "weixin" == b ? c.wxRel = !0 : "qq" == b && (c.qqRel = !0)
		}), c.$watch("currentPage.branchCurrentPage", function(a, b) {
			a != b && (c.getBranches(a), c.branchToPage = a)
		}), c.checkMobile = function(a) {
			f.open({
				windowClass: "six-contain mobile-contain",
				templateUrl: "usercenter/console/checkMobile.tpl.html",
				controller: "CheckMobileCtrl",
				scope: c,
				resolve: {
					userinfo: function() {
						return {
							title: a,
							phone: c.userinfo.phone
						}
					}
				}
			}).result.then(function(a) {
				c.userinfo.phone = a, c.userinfo.checkPhone = 1
			}, function() {})
		}, c.createAccount = function() {
			c.emailAccount = !1, f.open({
				windowClass: "six-contain",
				templateUrl: "usercenter/console/register.tpl.html",
				controller: "RelRegisterAccountCtrl",
				scope: c,
				resolve: {
					userinfo: function() {
						return {
							id: c.userinfo.id
						}
					}
				}
			}).result.then(function(b) {
				c.userinfo.noRel = null, c.userinfo.loginName = b.email, /qq/gi.test(b.type) && (c.qqRel = !0), /weixin/gi.test(b.type) && (c.wxRel = !0), /weibo/gi.test(b.type) && (c.wbRel = !0), a.search("bindemail", null)
			}, function() {
				a.search("bindemail", null)
			})
		}, c.relAccount = function(b) {
			c.emailAccount = !1, f.open({
				windowClass: "six-contain",
				templateUrl: "usercenter/console/relAccount.tpl.html",
				controller: "RelAccountCtrl",
				scope: c,
				resolve: {
					userinfo: function() {
						return {
							id: c.userinfo.id
						}
					}
				}
			}).result.then(function(b) {
				c.userinfo.noRel = null, c.userinfo.loginName = b.email, /qq/gi.test(b.type) && (c.qqRel = !0), /weixin/gi.test(b.type) && (c.wxRel = !0), /weibo/gi.test(b.type) && (c.wbRel = !0), a.search("bindemail", null)
			}, function() {
				a.search("bindemail", null)
			})
		}, c.relEmail = function(a) {
			return c.userinfo.noRel ? (alert("请先绑定账号"), void c.createAccount()) : void f.open({
				windowClass: "six-contain",
				templateUrl: "usercenter/console/relEmail.tpl.html",
				controller: "RelEmailCtrl",
				scope: c,
				resolve: {
					userinfo: function() {
						return {
							id: c.userinfo.id,
							email: c.userinfo.email,
							checkEmail: c.userinfo.checkEmail,
							title: a
						}
					}
				}
			}).result.then(function() {}, function() {})
		}, c.verifyEmail = function() {
			e.verifyEmail().then(function(a) {
				200 == a.data.code && g.openMsgDialog({
					msg: "申请绑定成功,已向您的邮箱发送验证邮件,请注意查收。"
				}, function() {})
			}, function(a) {})
		};
		c.bindThirdAccount = function(a) {
			return c.userinfo.noRel ? (alert("请先绑定账号"), void c.createAccount()) : void j.openThirtyPartyWindow(a)
		}, c.unbindRelation = function(a) {
			j.unbindRelation(a)
		}, c.$on("mail.unbind.success", function(a, b) {
			h.pushForCurrentRoute("mail.unbind.success", "notify.success"), "weixin" == b ? c.wxRel = !1 : "qq" == b && (c.qqRel = !1)
		});
		var s;
		d.setValue = function(a) {
			c.bindParam = a, n(c.bindParam), c.$apply()
		}, c.emailAccount = !1, c.upgradeCompany = function() {
			"eqs" == c.userinfo.loginName.substr(0, 3) && null == c.userinfo.email ? c.emailAccount = !0 : f.open({
				windowClass: "seven-contain",
				templateUrl: "usercenter/console/upgrade_company.tpl.html",
				controller: "UsercenterupgradeCtrl",
				resolve: {
					user: function() {
						return {
							id: c.userinfo.id
						}
					}
				}
			}).result.then(function(a) {
				c.userinfo.phone = a, c.userinfo.checkPhone = 1, i.currentUser.type = 2
			}, function() {})
		}, c.companyMes = !0, c.$on("companyState", function() {
			c.companyInfo || (c.companyInfo = {}), c.companyMes = !1, c.userinfo.type = 2
		})
	}]), angular.module("usercenter.member", []), angular.module("usercenter.member").controller("MemberCtrl", ["$scope", "$modal", "usercenterService", "ModalService", function(a, b, c, d) {
		a.pageNo = 1, a.pageSize = 10, a.setUserInfo = function() {
			if (1 == a.currentUser.type || 12 == a.currentUser.type) a.userType = "个人用户";
			else if (2 == a.currentUser.type ? a.upgradeInfo = "已升级" : a.upgradeInfo = "免费升级", 3 == a.currentUser.type) a.userType = "高级用户";
			else if (21 == a.currentUser.type) a.userType = "企业子用户";
			else if (4 == a.currentUser.type) a.userType = "服务商用户";
			else if (a.userType = "企业用户", a.currentUser.memberType) {
				if (a.currentUser.expiryTime) {
					var b = (new Date).getTime();
					a.currentUser.expiryTime <= b && (a.currentUser.memberType = null)
				}
				1 == a.currentUser.memberType ? a.userPay = "(体验版)" : 2 == a.currentUser.memberType ? a.userPay = "(高级版)" : 3 == a.currentUser.memberType ? a.userPay = "(专业版)" : 4 == a.currentUser.memberType && (a.userPay = "(畅享版)")
			} else a.userPay = ""
		}, a.setUserInfo(), a.memberPrivileges = ["拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传", "拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传", "拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传", "拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传", "拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传", "拥有编辑器组件，适用于个人企业用户，提供全面便捷的推广渠道助力企业自我营销和宣传"], a.getXdLog = function(b, d) {
			a.xdType = b, a.currentPage = d, c.getXdlog(b, d, a.pageSize).then(function(b) {
				if (b.data.success) {
					a.xdLogs = b.data.list;
					for (var c = 0; c < a.xdLogs.length; c++) 2 == a.xdLogs[c].type ? a.xdLogs[c].xd = "-" + a.xdLogs[c].xd : a.xdLogs[c].xd = "+" + a.xdLogs[c].xd;
					a.totalItems = b.data.map.count, a.currentPage = b.data.map.pageNo, a.toPage = b.data.map.pageNo, a.numPages = Math.ceil(a.totalItems / a.pageSize)
				}
			})
		}, a.getXdLog(null, 1), a.pageChanged = function(b, c) {
			return 1 > c || c > a.numPages && 1 != c ? void alert("此页超出范围") : (a.currentPage = c, a.toPage = c, void a.getXdLog(b, c))
		}, a.getXdStatNum = function() {
			c.getXdStat().then(function(b) {
				a.getXdStat = b.data.map
			})
		}, a.getXdStatNum(), a.transferXd = function() {
			b.open({
				windowClass: "six-contain",
				templateUrl: "usercenter/transfer.tpl.html",
				controller: "UsercentertransferCtrl",
				resolve: {
					username: function() {
						return a.userinfo.loginName
					}
				}
			}).result.then(function() {
				a.getUserXd(), a.getXdlog(), a.getXdStatNum()
			}, function() {})
		}, a.openInvoice = function() {
			a.openInvoiceListModal()
		}, a.openInvoiceListModal = function() {
			b.open({
				windowClass: "console seven-contain",
				templateUrl: "usercenter/console/invoice-list.tpl.html",
				controller: "GetInvoiceListCtrl"
			}).result.then(function() {}, function() {})
		}
	}]).controller("PayMentCtrl", ["$modal", "$scope", "qrCodeUrl", "type", "money", "usercenterService", "method", function(a, b, c, d, e, f, g) {
		b.qrCodeUrl = c, b.money = e, b.type = d, b.paymented = function() {
			b.$close()
		}, b.cancel = function() {
			b.$dismiss()
		}, b.getWeChatUrl = function() {
			b.wechatUrl || ("member" == g ? f.getCompanyQrCode(d, 0).then(function(a) {
				a.data.success && (b.wechatUrl = a.data.obj)
			}) : f.getPayXdQrCode(d, 0).then(function(a) {
				a.data.success && (b.wechatUrl = a.data.obj)
			}))
		}
	}]), angular.module("usercenter.privilege", []), angular.module("usercenter.privilege").controller("PrivilegeCtrl", ["$location", "usercenterService", "$scope", "$modal", "security", "ModalService", function(a, b, c, d, e, f) {
		c.tabid = "corporateMember", c.$watch(function() {
			return e.currentUser
		}, function(a) {
			a && (c.currentUser = a, c.changeMemberType())
		}, !0), c.changeMemberType = function() {
			if (c.currentUser && c.currentUser.expiryTime) {
				var a = (new Date).getTime();
				c.currentUser.expiryTime <= a && (c.currentUser.memberType = null)
			}
		}, c.changeMemberType(), c.upgradeAccount = function(a, b) {
			return 1 != c.currentUser.type || c.companyInfo && 0 === c.companyInfo.status ? 1 == c.currentUser.type && c.companyInfo ? void f.openMsgDialog({
				msg: "您不是企业会员,请先申请企业会员后再进行升级！"
			}) : 2 != c.currentUser.type ? void f.openMsgDialog({
				msg: "尊敬的用户，您当前账号类型无法升级为企业用户！"
			}) : void d.open({
				windowClass: "console",
				templateUrl: "usercenter/upgrade.tpl.html",
				controller: "UpgradeCtrl",
				resolve: {
					type: function() {
						return a
					},
					isRenew: function() {
						return b
					}
				}
			}).result.then(function() {}, function() {}) : void("eqs" == c.currentUser.loginName.substr(0, 3) && null == c.currentUser.email ? f.openMsgDialog({
				msg: "第三方账号请先关联账号"
			}) : f.openMsgDialog({
				msg: "尊敬的用户，请您先申请免费企业用户，通过审核后再次升级",
				btn: "我知道了"
			}, function() {
				d.open({
					windowClass: "seven-contain",
					templateUrl: "usercenter/console/upgrade_company.tpl.html",
					controller: "UsercenterupgradeCtrl",
					resolve: {
						user: function() {
							return {
								id: c.user.id
							}
						}
					}
				}).result.then(function() {}, function() {})
			}, function() {}))
		}, c.cancel = function() {
			c.$close()
		}, c.upgradeCompany = function() {
			d.open({
				windowClass: "seven-contain",
				templateUrl: "usercenter/console/upgrade_company.tpl.html",
				controller: "UsercenterupgradeCtrl",
				resolve: {
					user: function() {
						return {
							id: c.user.id
						}
					}
				}
			}).result.then(function() {}, function() {})
		}
	}]).controller("UpgradeCtrl", ["$modal", "$scope", "type", "usercenterService", "ModalService", "security", "$location", "isRenew", function(a, b, c, d, e, f, g, h) {
		b.confirm = function() {
			d.getCompanyQrCode(c, 1).then(function(g) {
				b.$close();
				var i, j;
				if (1 == c ? (i = h ? ["99元", "450元"] : ["99元", "499元"], j = [{
					name: "30天",
					value: 1
				}, {
					name: "180天",
					value: 6
				}]) : 2 == c ? h ? (i = ["450元", "800元"], j = [{
					name: "180天",
					value: 1
				}, {
					name: "365天",
					value: 2
				}]) : (i = ["499元", "900元"], j = [{
					name: "180天",
					value: 1
				}, {
					name: "365天",
					value: 2
				}]) : 3 == c ? h ? (i = ["1.6万", "3万"], j = [{
					name: "1年",
					value: 1
				}, {
					name: "2年",
					value: 2
				}]) : (i = ["1.9万", "3.2万"], j = [{
					name: "1年",
					value: 1
				}, {
					name: "2年",
					value: 2
				}]) : h ? (i = ["1800元", "3200元"], j = [{
					name: "1年",
					value: 1
				}, {
					name: "2年",
					value: 2
				}]) : (i = ["1999元", "3600元"], j = [{
					name: "1年",
					value: 1
				}, {
					name: "2年",
					value: 2
				}]), g.data.success) {
					var k = g.data.obj;
					a.open({
						windowClass: "console",
						templateUrl: "usercenter/payment.tpl.html",
						controller: "PayMentCtrl",
						resolve: {
							qrCodeUrl: function() {
								return k
							},
							type: function() {
								return c
							},
							money: function() {
								return i
							},
							method: function() {
								return "member"
							},
							counts: function() {
								return j
							}
						},
						size: "lg"
					}).result.then(function() {
						d.getUserInfo().then(function(a) {
							a.data.success && (f.currentUser = a.data.obj)
						}), e.openMsgDialog({
							msg: "因网络原因，部分用户开通会有延迟",
							btn: "确定"
						}, function() {
							b.openInvoice()
						})
					}, function() {})
				} else e.openMsgDialog({
					msg: g.data.msg
				})
			})
		}, b.openInvoice = function() {
			e.openConfirmDialog({
				msg: "是否开具发票？",
				confirmName: "是",
				cancelName: "否"
			}, function() {
				b.openInvoiceListModal()
			}, function() {
				g.path("/privilege")
			})
		}, b.openInvoiceListModal = function() {
			a.open({
				windowClass: "console seven-contain",
				templateUrl: "usercenter/console/invoice-list.tpl.html",
				controller: "GetInvoiceListCtrl"
			}).result.then(function() {}, function() {})
		}, b.cancel = function() {
			b.$close()
		}
	}]).controller("PayMentCtrl", ["$modal", "$scope", "qrCodeUrl", "type", "money", "usercenterService", "method", "counts", function(a, b, c, d, e, f, g, h) {
		b.qrCodeUrl = c, b.money = e[0], b.type = d, b.counts = h, b.payWay = "alipay", h && h.length > 0 && (b.curentCount = h[0].value);
		var i = {};
		i["alipay1" + b.curentCount] = c, b.paymented = function() {
			b.$close()
		}, b.cancel = function() {
			b.$dismiss()
		}, b.getWeChatUrl = function(a) {
			b.payWay = a;
			var c = 1;
			return "wechat" == b.payWay && (c = 0), i[b.payWay + "" + c + b.curentCount] ? void(b.qrCodeUrl = i[b.payWay + "" + c + b.curentCount]) : void("member" == g ? f.getCompanyQrCode(d, c, b.curentCount).then(function(a) {
				a.data.success && (i[b.payWay + "" + c + b.curentCount] = a.data.obj, b.qrCodeUrl = a.data.obj)
			}) : f.getPayXdQrCode(d, c).then(function(a) {
				a.data.success && (i[b.payWay + "" + c + b.curentCount] = a.data.obj, b.qrCodeUrl = a.data.obj)
			}))
		}, b.setCount = function(a, c) {
			b.curentCount = a, b.money = e[c];
			var g = 1;
			if ("wechat" == b.payWay && (g = 0), i[b.payWay + "" + g + b.curentCount]) return void(b.qrCodeUrl = i[b.payWay + "" + g + b.curentCount]);
			var h = d,
				j = a;
			1 == d && 6 == a && (h = 2, j = 1), f.getCompanyQrCode(h, g, j).then(function(a) {
				a.data.success && (i[b.payWay + "" + g + b.curentCount] = a.data.obj, b.qrCodeUrl = a.data.obj)
			})
		}
	}]), angular.module("usercenter.tab.server", ["services.usercenter", "services.i18nNotifications"]), angular.module("usercenter.tab.server").controller("ServerTabCtrl", ["$scope", "$rootScope", "usercenterService", "$translate", function(a, b, c, d) {
		a.showController = {}, a.goStep = function(b) {
			a.step = b
		}, a.bindDomain = function() {
			a.showController.agreeBind = !0
		}, a.reApply = function() {
			a.isShowBindPanel = !0, a.showController.agreeBind = !1
		};
		var e = function() {
				c.getDomain().then(function(b) {
					if (b.data.success) if (a.domainInfo = b.data.obj, a.model.day = b.data.obj.typeList[0], b.data.obj.id) {
						a.isShowBindPanel = !1, a.domainInfo.ipAddress = "202.173.11.90";
						var c = a.status = b.data.obj.status;
						1 === c ? (a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS1"), a.unbind = !1, a.domainInfo.restTime = Math.floor((a.domainInfo.endDate - a.domainInfo.startDate) / 864e5)) : 2 === c ? (a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS2"), a.unbind = !1) : 3 === c ? (a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS3"), a.unbind = !0) : 4 === c ? a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS4") : (new Date).getTime() > b.data.obj.endDate && (a.status = 5, a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS5"), a.unbind = !0)
					} else a.isShowBindPanel = !0
				})
			};
		e(), a.model || (a.model = {});
		var f = a.model;
		a.checkDomainFormat = function(b) {
			return b.url ? (a.domainFormatErr = "", !0) : (a.domainFormatErr = d.instant("usercenter.server.WRITE_DNS"), !1)
		}, a.checkDayFormat = function(b) {
			return b.day ? (a.dayFormatErr = "", !0) : (a.dayFormatErr = d.instant("usercenter.server.WRITE_DATE"), !1)
		}, a.checkAppIdAndSecret = function(b) {
			return b.appId && !b.secretId ? (a.appIdFormatErr = d.instant("usercenter.serverWRITE_APPSECRET"), !1) : !b.appId && b.secretId ? (a.appSecretErr = d.instant("usercenter.server.WRITE_APPID"), !1) : (a.appIdFormatErr = "", a.appSecretErr = "", !0)
		}, a.submit = function() {
			if (a.checkDomainFormat(f) && a.checkDayFormat(f) && a.checkAppIdAndSecret(f)) if (a.cost = f.day.label, a.xdCounts >= parseInt(a.cost, 10)) {
				var b = {
					url: f.url,
					buyTime: f.day.value,
					appId: f.appId,
					secretId: f.secretId
				};
				c.bindDomain(b).then(function(b) {
					b.data.success ? (alert(d.instant("usercenter.server.DNS_COMMIT")), a.status = 2, a.isShowBindPanel = !1, a.domainInfo.ipAddress = "202.173.11.90", a.domainInfo.url = f.url) : a.actionerror = b.data.msg
				}, function() {
					alert(d.instant("usercenter.server.SERVER_ERROR"))
				})
			} else a.xiudian = !0
		}
	}]), angular.module("app.usercenter.tab", ["usercenter.account", "usercenter.member", "usercenter.trash", "usercenter.apply", "usercenter.companyinfo", "usercenter.invoice", "usercenter.invoicelist"]), angular.module("usercenter.trash", []), angular.module("usercenter.trash").controller("TrashCtrl", ["$location", "$rootScope", "$scope", "usercenterService", "ModalService", "$translate", "fileService", "MineService", "sceneService", "dataCacheService", function(a, b, c, d, e, f, g, h, i, j) {
		c.PREFIX_CLIENT_HOST = PREFIX_HOST;
		var k = b.branchid;
		c.scene = {
			type: null
		}, c.pageSize = 12, c.sceneCurrent = {
			page: "",
			total: ""
		}, c.imageCurrent = {
			page: "",
			total: ""
		}, c.historyTab = {
			page: {}
		};
		var l = function(a) {
				c.sceneHistory = a, "scene" == a ? c.historyTab = {
					pages: {
						currentPage: c.sceneCurrent.page,
						totalItems: c.sceneCurrent.total,
						pageSize: 12
					}
				} : c.historyTab = {
					pages: {
						currentPage: c.imageCurrent.page,
						totalItems: c.imageCurrent.total,
						pageSize: 21
					}
				}
			};
		c.getMyScenes = function(a, b) {
			c.sceneHistory = b, h.getMyHistoryScenes(a, c.pageSize, k).then(function(a) {
				if (a.data.list && a.data.list.length > 0) {
					c.myScenes = a.data.list;
					for (var d = 0; d < c.myScenes.length; d++) c.myScenes[d].time = new Date(c.myScenes[d].delTime).getTime() + 2592e5, c.myScenes[d].history = Math.round((c.myScenes[d].time - (new Date).getTime()) / 1e3 / 60 / 60 / 24);
					c.sceneCurrent.total = a.data.map.count, c.sceneCurrent.page = a.data.map.pageNo
				} else c.sceneTotalItems = 0, c.sceneCurrent.total = 0, c.sceneCurrent.page > 1 ? c.getMyScenes(--c.sceneCurrent.page, "scene") : c.myScenes = [];
				l(b)
			})
		}, c.getMyScenes(1, "scene"), c.deleteScene = function(a, b) {
			e.openConfirmDialog({
				msg: "确定彻底删除此微课?"
			}, function() {
				i.deleteSceneById(a, b).then(function() {
					c.getMyScenes(c.historyTab.pages.currentPage, "scene")
				})
			})
		}, c.revoke = function(a) {
			i.revoke(a).then(function() {
				c.getMyScenes(c.historyTab.pages.currentPage, "scene")
			})
		}, c.$on("images.update", function(a, b, d) {
			c.images = b.list;
			for (var e = 0; e < c.images.length; e++) c.images[e].time = new Date(c.images[e].delTime).getTime() + 2592e5, c.images[e].history = Math.round((c.images[e].time - (new Date).getTime()) / 1e3 / 60 / 60 / 24);
			c.imageCurrent.total = b.map.count, c.imageCurrent.page = b.map.pageNo, l(d)
		}), c.getImages = function(a, d) {
			c.sceneHistory = d, g.userRecycle(a, 21).success(function(a) {
				a.success ? b.$broadcast("images.update", a, d) : alert(a.msg)
			}).error(function() {
				alert("网络连接超时，请稍后重试")
			})
		}, c.$on("file.delete", function(a) {
			c.getImages(c.historyTab.pages.currentPage, "image")
		}), c.deleteImg = function(a, b) {
			e.openConfirmDialog({
				msg: "确定彻底删除此图片?"
			}, function() {
				c.deleteFile(a, b)
			})
		}, c.deleteFile = function(a, c) {
			g.deleteFile1(a, c).success(function(a) {
				a.success ? b.$broadcast("file.delete") : alert(a.msg)
			}).error(function() {
				alert("网络连接超时，请稍后重试")
			})
		}, c.imageRevoke = function(a) {
			g.fileRevoke(a).success(function(a) {
				a.success ? (c.getImages(c.historyTab.pages.currentPage, "image"), j.clear("fileService")) : alert(a.msg)
			}).error(function() {
				alert("网络连接超时，请稍后重试")
			})
		}, c.pageChanged = function(a) {
			return 1 > a || a > c.historyTab.pages.totalItems / 10 + 1 ? void alert(f.instant("main.customer.PAGE_OVERFLOW")) : void("scene" == c.sceneHistory ? c.getMyScenes(a, "scene") : c.getImages(a, "image"))
		}
	}]), angular.module("usercenter.transfer", ["services.usercenter"]), angular.module("usercenter.transfer").controller("UsercentertransferCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location", "username", "$translate", function(a, b, c, d, e, f, g, h, i, j, k) {
		b.transfer = !0, b.userXd = {
			toUser: "",
			xdCount: ""
		}, b.submit = !1, b.getUserXd = function() {
			e.getUserXd().then(function(a) {
				a.data.success && (b.xdCount = a.data.obj)
			})
		}, b.getUserXd(), b.confirm = function() {
			b.submit = !0, b.getgiveXd()
		}, b.checkEmailFormat = function(a) {
			return a.toUser ? a.toUser == j ? (b.mailFormatErr = k.instant("usercenter.userinfo.ACCOUNT_ERROR2"), $(".username").addClass("error"), !1) : (b.mailFormatErr = "", !0) : (b.mailFormatErr = k.instant("usercenter.userinfo.ACCOUNT_ERROR1"), $(".username").focus(), !1)
		}, b.checkXdFormat = function(a) {
			return /^\+?[1-9][0-9]*$/.test(a.xdCount) ? b.userXd.xdCount > b.xdCount ? (b.xdFormatErr = k.instant("usercenter.userinfo.XD_ERROR2"), !1) : (b.xdFormatErr = "", !0) : (b.xdFormatErr = k.instant("usercenter.userinfo.XD_ERROR1"), !1)
		}, b.getgiveXd = function() {
			b.checkEmailFormat(b.userXd) && b.checkXdFormat(b.userXd) && e.getgiveXd(b.userXd).then(function(a) {
				200 == a.data.code ? b.$close() : 1003 == a.data.code ? b.mailFormatErr = a.data.msg : 1010 == a.data.code && (b.xdFormatErr = a.data.msg)
			})
		}, b.cancel = function() {
			b.$close()
		}
	}]), function() {
		angular.module("userCenter.userGuide", []).controller("userCenterGuideCtrl", ["$rootScope", "$scope", "security", "$routeParams", "$location", function(a, b, c, d, e) {
			function f(a, c) {
				var d = sessionStorage.getItem(j.id);
				a && a[j.id] ? a[j.id + "_isShow_" + j.type] ? b.isFirstLogin = !1 : (d || (b.isCompanyVip = c, b.isFirstLogin = !0, sessionStorage.setItem(j.id, !0)), c && setTimeout(function() {
					b.isShow()
				}, 100)) : (b.isFirstLogin = !0, b.isCompanyVip = c, i = i || {}, i[j.id] = j.type, i[j.id + "_isShow_" + j.type] = "2" == j.type, h(k, i), sessionStorage.setItem(j.id, !0))
			}
			function g(a) {
				return window.localStorage ? (i = JSON.parse(localStorage.getItem(a)), i ? i : !1) : null
			}
			function h(a, b) {
				return window.localStorage ? void localStorage.setItem(k, JSON.stringify(b)) : null
			}
			var i, j = c.currentUser,
				k = "userCenterGuide",
				l = null,
				m = e.path();
			if ("1" == j.type && m.indexOf("/account") >= 0 && (l = g(k), f(l, !1), $("#companyVip").css("background", "rgba(0,0,0,0.8")), "2" == j.type && m.indexOf("/main") >= 0) {
				l = g(k), f(l, !0);
				var n = JSON.parse(localStorage.getItem("loginInfo")),
					o = JSON.parse(sessionStorage.getItem("emailGuide"));
				(!n.isShow || o) && $("#companyVip").css("background", "rgba(0,0,0,0.8")
			}
			b.showNextGuide = function() {
				b.isFirstLogin = !1, $("#companyVip").css("background", "rgba(0,0,0,0")
			}, b.isShow = function() {
				i = g(k), i[j.id + "_isShow_" + j.type] = !i[j.id + "_isShow_" + j.type], localStorage.setItem(k, JSON.stringify(i))
			}
		}])
	}(), function() {
        angular.module("userCenter.userGuideNext", []).controller("userCenterGuideCtrlNext", ["$rootScope", "$scope", "security", "$routeParams", "$location", function(a, b, c, d, e) {
            function f(a, c) {
                var d = sessionStorage.getItem(j.id);
                a && a[j.id] ? a[j.id + "_isShow_" + j.type] ? b.isSecondLogin = !1 : (d || (b.isCompanyVip = c, b.isSecondLogin = !0, sessionStorage.setItem(j.id, !0)), c && setTimeout(function() {
                    b.isShow()
                }, 100)) : (b.isSecondLogin = !0, b.isCompanyVip = c, i = i || {}, i[j.id] = j.type, i[j.id + "_isShow_" + j.type] = "2" == j.type, h(k, i), sessionStorage.setItem(j.id, !0))
            }
            function g(a) {
                return window.localStorage ? (i = JSON.parse(localStorage.getItem(a)), i ? i : !1) : null
            }
            function h(a, b) {
                return window.localStorage ? void localStorage.setItem(k, JSON.stringify(b)) : null
            }
            var i, j = c.currentUser,
                k = "userCenterGuideNext",
                l = null,
                m = e.path();
            if ("1" == j.type && m.indexOf("/account") >= 0 && (l = g(k), f(l, !1), $("#companyVip").css("background", "rgba(0,0,0,0.8")), "2" == j.type && m.indexOf("/main") >= 0) {
                l = g(k), f(l, !0);
                var n = JSON.parse(localStorage.getItem("loginInfo")),
                    o = JSON.parse(sessionStorage.getItem("emailGuide"));
                (!n.isShow || o) && $("#companyVip").css("background", "rgba(0,0,0,0.8")
            }
            b.showNextGuide = function() {
                b.isSecondLogin = !1, $("#companyVip").css("background", "rgba(0,0,0,0")
            }, b.isShow = function() {
                i = g(k), i[j.id + "_isShow_" + j.type] = !i[j.id + "_isShow_" + j.type], localStorage.setItem(k, JSON.stringify(i))
            }
        }])
    }(), function() {
        angular.module("userCenter.userGuideNextNext", []).controller("userCenterGuideCtrlNextNext", ["$rootScope", "$scope", "security", "$routeParams", "$location", function(a, b, c, d, e) {
            function f(a, c) {
                var d = sessionStorage.getItem(j.id);
                a && a[j.id] ? a[j.id + "_isShow_" + j.type] ? b.isSecondLoginNext = !1 : (d || (b.isCompanyVip = c, b.isSecondLoginNext = !0, sessionStorage.setItem(j.id, !0)), c && setTimeout(function() {
                    b.isShow()
                }, 100)) : (b.isSecondLoginNext = !0, b.isCompanyVip = c, i = i || {}, i[j.id] = j.type, i[j.id + "_isShow_" + j.type] = "1" == j.type, h(k, i), sessionStorage.setItem(j.id, !0))
            }
            function g(a) {
                return window.localStorage ? (i = JSON.parse(localStorage.getItem(a)), i ? i : !1) : null
            }
            function h(a, b) {
                return window.localStorage ? void localStorage.setItem(k, JSON.stringify(b)) : null
            }
            var i, j = c.currentUser,
                k = "userCenterGuideNextNext",
                l = null,
                m = e.path();
            if ("2" == j.type && m.indexOf("/account") >= 0 && (l = g(k), f(l, !1), $("#companyVip").css("background", "rgba(0,0,0,0.8")), "1" == j.type && m.indexOf("/main") >= 0) {
                l = g(k), f(l, !0);
                var n = JSON.parse(localStorage.getItem("loginInfo")),
                    o = JSON.parse(sessionStorage.getItem("emailGuide"));
                (!n.isShow || o) && $("#companyVip").css("background", "rgba(0,0,0,0.8")
            }
            b.showNextGuide = function() {
                b.isSecondLoginNext = !1, $("#companyVip").css("background", "rgba(0,0,0,0")
            }, b.isShow = function() {
                i = g(k), i[j.id + "_isShow_" + j.type] = !i[j.id + "_isShow_" + j.type], localStorage.setItem(k, JSON.stringify(i))
            }
        }])
    }(), angular.module("usercenter", ["usercenter.transfer", "usercenter.upgrade", "usercenter.request", "services.usercenter", "services.localizedMessages", "security.service", "app.directives.addelement", "services.modal", "usercenter.relAccount", "usercenter.branch", "services.i18nNotifications", "security.thirdparty", "usercenter.branch.reset", "usercenter.checkMobil", "usercenter.relRegisterAccount", "userCenter.userGuide","userCenter.userGuideNext","userCenter.userGuideNextNext", "app.usercenter.tab", "usercenter.privilege"]), angular.module("usercenter").controller("UserCenterCtrl", ["$rootScope", "$scope", "$window", "$routeParams", "usercenterService", "security", "$modal", "ModalService", "$location", "$filter", "fixnumFilter", "i18nNotifications", "thirdpartyService", "$translate", "$timeout", function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
		b.PREFIX_FILE_HOST = PREFIX_FILE_HOST, b.PREFIX_SERVER_HOST = PREFIX_URL, b.PREFIX_CLIENT_HOST = PREFIX_HOST, b.isActive = "usercenter", b.isVendorUser = f.isVendorUser(), b.editInfo = {
			isEditable: !1
		}, b.isDomainAccessable = f.isAllowToAccess(f.accessDef.ACCESS_DOMAIN_BIND), b.isAllowedHistory = f.isAllowToAccess(f.accessDef.USERCENTER_HISTORY), b.isAllowedApply = f.isAllowToAccess(f.accessDef.APPLY_XIUKE), b.password = {}, b.pageSize = 5, b.XdpageNo = 1, b.XdtoPage = "", b.pageNo = 1, b.toPage = b.XdcurrentPage = 1, b.branchToPage = 1, b.viewControl = {
			tab: d.id
		};
		b.showTab = function(a) {
			i.path("/usercenter/" + a, !1), b.viewControl.tab = a
		}, b.currentUser = f.currentUser, b.getUserXd = function() {
			e.getUserXd().then(function(a) {
				a.data.success && (b.xdCounts = a.data.obj)
			})
		}, b.getUserXd(), b.getUserInfo = function() {
			e.getUserInfo().then(function(a) {
				b.userinfo = a.data.obj, b.master = angular.copy(b.userinfo), b.url = "我做的企业秀，用的是微学宝，免费好用，你试试吧：\r\n" + PREFIX_HOST + "/#/home/register?u=" + b.userinfo.id;
				var c = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				"eqs" != b.userinfo.loginName.substr(0, 3) || c.test(b.userinfo.loginName) || (b.userinfo.noRel = "未绑定", /(_qq)$/.test(b.userinfo.loginName) && (b.qqRel = !0), /(_weixin)$/.test(b.userinfo.loginName) && (b.wxRel = !0), /(_weibo)$/.test(b.userinfo.loginName) && (b.wbRel = !0)), /qq/gi.test(b.userinfo.relType) && (b.qqRel = !0), /weixin/gi.test(b.userinfo.relType) && (b.wxRel = !0), /weibo/gi.test(b.userinfo.relType) && (b.wbRel = !0), i.search().bindemail && b.relAccount(), 4 == b.userinfo.type
			})
		}, b.getUserInfo(), b.editMessage = function() {
			var a, c, d;
			// b.userinfo.type = 22
			4 == b.userinfo.type ? (a = "usercenter/console/serverinfo.tpl.html", c = "ApplyCtrl", d = "服务会员基本信息") : (a = "usercenter/console/companyinfo.tpl.html", c = "companyInfoCtrl"), g.open({
				windowClass: "six-contain",
				templateUrl: a,
				controller: c,
				scope: b,
				resolve: {
					userinfo: function() {
						return {
							nick: b.userinfo.nick,
							type: b.userinfo.type,
							id: b.userinfo.id,
							title: d
						}
					}
				}
			}).result.then(function(a) {
				4 == b.userinfo.type ? (b.applyInfo = a.status, b.userinfo.nick = a.applyInfoNew.nick) : b.userinfo.nick = a.nick
			}, function() {})
		}, b.copyCode = function() {
			var a, b;
			a = $(".invitation-contain span"), b = a.html(), clipboard.setData("text/plain", b)
		}, b.tabid = d.id, b.customerUpload = function() {
			g.open({
				windowClass: "img_console console",
				templateUrl: "scene/console/bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1
						}
					}
				}
			}).result.then(function(c) {
				if (c.width / c.height === 1) {
					b.userinfo.headImg = c.data;
					var d = {
						headImg: c.data,
						id: b.userinfo.id
					};
					return void e.saveUserInfo(d).then(function(d) {
						d.data.success && (b.editInfo.isEditable = !1, a.$broadcast("headImg.change", c.data))
					})
				}
				g.open({
					windowClass: "console seven-contain",
					templateUrl: "scene/console/imageCrop.tpl.html",
					controller: "imageCropCtrl",
					backdrop: "static",
					resolve: {
						obj: function() {
							return {
								type: "square",
								properties: {
									src: c.data
								}
							}
						}
					}
				}).result.then(function(c) {
					b.userinfo.headImg = c.src;
					var d = {
						headImg: c.src,
						id: b.userinfo.id
					};
					e.saveUserInfo(d).then(function(c) {
						c.data.success && (b.editInfo.isEditable = !1, a.$broadcast("headImg.change", c.data.obj.headImg))
					})
				}, function(a) {})
			}, function(a) {})
		}, b.domain = function() {
			g.open({
				windowClass: "six-contain",
				templateUrl: "usercenter/tab/domain.tpl.html",
				controller: "UserCenterCtrl",
				resolve: {
					param: function() {
						return {
							value: b.domainMess
						}
					}
				}
			}).result.then(function() {
				getDomainMess()
			}, function() {})
		}, b.applyShow = function() {
			g.open({
				windowClass: "six-contain",
				templateUrl: "usercenter/console/serverinfo.tpl.html",
				controller: "ApplyCtrl",
				backdrop: "static",
				invoice: !0,
				resolve: {
					userinfo: function() {
						return {
							status: b.applyInfo,
							id: b.userinfo.id,
							title: "申请成为秀客获取服务商账号",
							invoice: !0
						}
					}
				}
			}).result.then(function(a) {
				b.applyInfo = a
			}, function() {})
		}, o(function() {
			("4" == b.userinfo.type || "1" == b.userinfo.type) && e.getUserStatus().then(function(a) {
				b.applyInfo = a.data.map.status
			})
		}, 300), b.know = function() {
			b.xiudian = !1
		}, b.buyXd = function() {
			g.open({
				windowClass: "console",
				templateUrl: "?c=pay",
				controller: "BuyXdController",
				resolve: {
					getUserXd: function() {
						return function() {
							b.getUserXd(), b.getXdlog(b.XdtoPage)
						}
					}
				}
			}).result.then(function() {}, function() {})
		}
	}]).controller("BuyXdController", ["$scope", "$modal", "usercenterService", "ModalService", "getUserXd", function(a, b, c, d, e) {
		a.confirm = function() {
			c.getPayXdQrCode(10, 1).then(function(c) {
				if (a.$close(), c.data.success) {
					var f = c.data.obj;
					b.open({
						windowClass: "console",
						templateUrl: "usercenter/payment.tpl.html",
						controller: "PayMentCtrl",
						resolve: {
							qrCodeUrl: function() {
								return f
							},
							type: function() {
								return 10
							},
							money: function() {
								return ["500元"]
							},
							method: function() {
								return "buyXd"
							},
							counts: function() {}
						}
					}).result.then(function() {
						e()
					}, function() {})
				} else d.openMsgDialog({
					msg: c.data.msg
				})
			})
		}, a.cancel = function() {
			a.$close()
		}
	}]), angular.module("app.directives.addelement", []).directive("addElement", ["$compile", function(a) {
		return {
			restrict: "EA",
			link: function(b, c, d) {
				var e = $("#emailAddress"),
					f = $("#emailAddress").size() + 1;
				c.bind("click", function() {
					var c = angular.element('<div><input type="text" id="p_scnt" style="width:100%; height: 30px; margin-top: 15px;" ng-model="attrs.addElement" name="p_scnt_' + f + '" placeholder="Input Value" /></div>');
					e.append(c);
					var d = c.find("input");
					a(d)(b), f++
				})
			}
		}
	}]).directive("showIcon", ["$compile", "$timeout", "$translate", function(a, b, c) {
		return {
			restrict: "EA",
			require: "ngModel",
			scope: {
				check: "&callbackFn"
			},
			link: function(b, d, e, f) {
				var g, h, i = a('<a><span class = "glyphicon glyphicon-ok-circle" ng-show="enabled" style = "margin-top: 8px; color: #9ad64b; font-size: 15px;"></span></a>')(b);
				b.update = function() {
					d[0].blur(), b.check({
						arg1: {
							name: f.$name
						}
					})
				}, d.bind("focus", function() {
					g = f.$viewValue, d.parent().after(i), b.enabled = !0, ("email" === e.name || "mobile" === e.name || "tel" === e.name) && (b.enabled = !1), b.$apply()
				}).bind("blur", function() {
					b.enabled = !1, h = f.$viewValue;
					var a = new RegExp(/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/g);
					if ("mobile" === e.name && h && !a.test(d.val())) return alert(c.instant("common.PHONE_ERROR")), $('input[name="mobile"]').addClass("error"), void $('input[name="mobile"]').change(function() {
						$(this).removeClass("error")
					});
					if ("email" === e.name && h) {
						var i = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g);
						if (!i.test(d.val())) return alert("邮箱格式错误！"), $('input[name="email"]').addClass("error"), void $('input[name="email"]').change(function() {
							$(this).removeClass("error")
						})
					}(h || g) && g !== h && b.update(), b.$apply()
				})
			}
		}
	}]).directive("ngHover", function() {
		return {
			restrict: "EA",
			scope: {
				resource: "="
			},
			link: function(a, b, c) {
				b.hover(function() {
					a.$apply(function() {
						a.resource.show = !0
					})
				}, function() {
					a.$apply(function() {
						a.resource.show = !1
					})
				})
			}
		}
	}).directive("imgClick", function() {
		return {
			restrict: "EA",
			link: function(a, b, c) {
				$(b).bind("click", function() {
					$(b).find("img").css("border", "4px solid #F60"), $(b).siblings().find("img").css("border", 0)
				})
			}
		}
	}).directive("customFocus", function() {
		return {
			restrict: "EA",
			link: function(a, b, c) {
				$(b).siblings().bind("click", function() {
					b[0].focus()
				})
			}
		}
	}).directive("blurChildren", function() {
		return {
			restrict: "EA",
			link: function(a, b, c) {
				$(b).on("click", function(a) {
					(a.target == b[0] || $(a.target).hasClass("badge")) && $(".blurClass").find("input:visible").blur()
				})
			}
		}
	}).directive("forbiddenClose", function() {
		return {
			restrict: "EAC",
			link: function(a, b, c) {
				$(b).on("click", function(a) {
					a.stopPropagation()
				})
			}
		}
	}).directive("customeImage", function() {
		return {
			restrict: "EA",
			link: function(a, b, c) {
				$(b).hover(function() {
					$("<div><a></a></div>")
				}, function() {})
			}
		}
	}).directive("slides", ["configService", function(a) {
		return {
			restrict: "EA",
			link: function(b, c, d) {
				var e = $(c).find(".slides_container");
				a.getBanners().then(function(a) {
					for (var b = a.data.split(","), d = 0; d < b.length; d++) {
						var f = [];
						f.push(b[d].split("|"));
						for (var g = 0; g < f.length; g++) e.append('<img src="' + f[g][0] + '" usemap="#active' + d + '" width="1000px" height="720px" alt="Slide 1">'), f[g][1] && e.after('<map name="active' + d + '" id="active' + d + '"><area shape="rect" coords="0,0,1000,720" target="_blank" href ="' + f[g][1] + '" /></map>')
					}
					$(c).slides({
						preload: !0,
						play: 5e3,
						pause: 2500,
						hoverPause: !0
					})
				}, function() {
					e.append('<img src="' + CLIENT_CDN + 'assets/images/3.jpg" width="1000px" height="720px" alt="Slide 1">'), e.append('<img src="' + CLIENT_CDN + 'assets/images/2.jpg" width="1000px" height="720px" alt="Slide 1">'), e.append('<img src="' + CLIENT_CDN + 'assets/images/1a.jpg" width="1000px" height="720px" alt="Slide 1">'), $(c).slides({
						preload: !0,
						play: 5e3,
						pause: 2500,
						hoverPause: !0
					})
				})
			}
		}
	}]).directive("slides3", ["configSerService", function(a) {
		return {
			restrict: "EA",
			link: function(b, c, d) {
				var e = $(c).find(".slides_container");
				a.getActivityBanner(d.id).then(function(a) {
					for (var b = a.data.list, f = 0; f < b.length; f++) {
						var g = $('<a href="' + b[f].url + '" style="display:block;" target="' + b[f].target + '" ></a>');
						g.append('<img src="' + b[f].path + '" width="' + d.width + '" height="' + d.height + '" alt="' + b[f].title + '" title="' + b[f].title + '" > '), e.append(g)
					}
					$(c).slides({
						preload: !0,
						play: 5e3,
						pause: 2500,
						hoverPause: !0
					})
				})
			}
		}
	}]).directive("addClass", function() {
		return {
			restrict: "EA",
			link: function(a, b, c) {
				$(b).closest(".textbox-wrap").find("[autofocus]").focus(), $(b).on("blur", function() {
					$(b).closest(".textbox-wrap").removeClass("focused")
				}).on("focus", function() {
					$(b).closest(".textbox-wrap").addClass("focused")
				})
			}
		}
	}).directive("loadScript", ["$http", "$timeout", "$rootScope", function(a, b, c) {
		return {
			link: function(b, c, d) {
				var e = function() {
						b.captchaLoaded = !0
					};
				b.$watch(function() {
					return c[0].getAttribute("src")
				}, function(b, d) {
					b && a.jsonp(c[0].getAttribute("src")).success(e).error(e)
				}), b.$on("$destroy", function() {
					angular.element(".gt_widget").remove()
				})
			}
		}
	}]), angular.module("app.directives.autoclose", []).directive("autoClose", ["$compile", function(a) {
		return {
			restrict: "EA",
			link: function(a, b, c) {
				$(document).click(function(b) {
					b.target.className;
					return $(event.target).closest(".drop-area").length ? !1 : (a.showObj = {
						showGroup: !1
					}, void a.$apply())
				})
			}
		}
	}]), angular.module("colorpicker.module", []).factory("Helper", function() {
		return {
			closestSlider: function(a) {
				var b = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector;
				return b.bind(a)("I") ? a.parentNode : a
			},
			getOffset: function(a, b) {
				for (var c = 0, d = 0, e = 0, f = 0; a && !isNaN(a.offsetLeft) && !isNaN(a.offsetTop);) c += a.offsetLeft, d += a.offsetTop, b || "BODY" !== a.tagName ? (e += a.scrollLeft, f += a.scrollTop) : (e += document.documentElement.scrollLeft || a.scrollLeft, f += document.documentElement.scrollTop || a.scrollTop), a = a.offsetParent;
				return {
					top: d,
					left: c,
					scrollX: e,
					scrollY: f
				}
			},
			stringParsers: [{
				re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
				parse: function(a) {
					return [a[1], a[2], a[3], a[4]]
				}
			}, {
				re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
				parse: function(a) {
					return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
				}
			}, {
				re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
				parse: function(a) {
					return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
				}
			}, {
				re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
				parse: function(a) {
					return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
				}
			}]
		}
	}).factory("Color", ["Helper", function(a) {
		return {
			value: {
				h: 1,
				s: 1,
				b: 1,
				a: 1
			},
			rgb: function() {
				var a = this.toRGB();
				return "rgb(" + a.r + "," + a.g + "," + a.b + ")"
			},
			rgba: function() {
				var a = this.toRGB();
				return "rgba(" + a.r + "," + a.g + "," + a.b + "," + a.a + ")"
			},
			hex: function() {
				return this.toHex()
			},
			RGBtoHSB: function(a, b, c, d) {
				a /= 255, b /= 255, c /= 255;
				var e, f, g, h;
				return g = Math.max(a, b, c), h = g - Math.min(a, b, c), e = 0 === h ? null : g === a ? (b - c) / h : g === b ? (c - a) / h + 2 : (a - b) / h + 4, e = (e + 360) % 6 * 60 / 360, f = 0 === h ? 0 : h / g, {
					h: e || 1,
					s: f,
					b: g,
					a: d || 1
				}
			},
			setColor: function(b) {
				b = b.toLowerCase();
				for (var c in a.stringParsers) if (a.stringParsers.hasOwnProperty(c)) {
					var d = a.stringParsers[c],
						e = d.re.exec(b),
						f = e && d.parse(e);
					if (f) return this.value = this.RGBtoHSB.apply(null, f), !1
				}
			},
			setHue: function(a) {
				this.value.h = 1 - a
			},
			setSaturation: function(a) {
				this.value.s = a
			},
			setLightness: function(a) {
				this.value.b = 1 - a
			},
			setAlpha: function(a) {
				this.value.a = parseInt(100 * (1 - a), 10) / 100
			},
			toRGB: function(a, b, c, d) {
				a || (a = this.value.h, b = this.value.s, c = this.value.b), a *= 360;
				var e, f, g, h, i;
				return a = a % 360 / 60, i = c * b, h = i * (1 - Math.abs(a % 2 - 1)), e = f = g = c - i, a = ~~a, e += [i, h, 0, 0, h, i][a], f += [h, i, i, h, 0, 0][a], g += [0, 0, h, i, i, h][a], {
					r: Math.round(255 * e),
					g: Math.round(255 * f),
					b: Math.round(255 * g),
					a: d || this.value.a
				}
			},
			toHex: function(a, b, c, d) {
				var e = this.toRGB(a, b, c, d);
				return "#" + (1 << 24 | parseInt(e.r, 10) << 16 | parseInt(e.g, 10) << 8 | parseInt(e.b, 10)).toString(16).substr(1)
			}
		}
	}]).factory("Slider", ["Helper", function(a) {
		var b = {
			maxLeft: 0,
			maxTop: 0,
			callLeft: null,
			callTop: null,
			knob: {
				top: 0,
				left: 0
			}
		},
			c = {};
		return {
			getSlider: function() {
				return b
			},
			getLeftPosition: function(a) {
				return Math.max(0, Math.min(b.maxLeft, b.left + ((a.pageX || c.left) - c.left)))
			},
			getTopPosition: function(a) {
				return Math.max(0, Math.min(b.maxTop, b.top + ((a.pageY || c.top) - c.top)))
			},
			setSlider: function(d, e) {
				var f = a.closestSlider(d.target),
					g = a.getOffset(f, e);
				b.knob = f.children[0].style, b.left = d.pageX - g.left - window.pageXOffset + g.scrollX, b.top = d.pageY - g.top - window.pageYOffset + g.scrollY, c = {
					left: d.pageX,
					top: d.pageY
				}
			},
			setSaturation: function(a, c) {
				b = {
					maxLeft: 100,
					maxTop: 100,
					callLeft: "setSaturation",
					callTop: "setLightness"
				}, this.setSlider(a, c)
			},
			setHue: function(a, c) {
				b = {
					maxLeft: 0,
					maxTop: 100,
					callLeft: !1,
					callTop: "setHue"
				}, this.setSlider(a, c)
			},
			setAlpha: function(a, c) {
				b = {
					maxLeft: 0,
					maxTop: 100,
					callLeft: !1,
					callTop: "setAlpha"
				}, this.setSlider(a, c)
			},
			setKnob: function(a, c) {
				b.knob.top = a + "px", b.knob.left = c + "px"
			}
		}
	}]).directive("colorpicker", ["$document", "$compile", "Color", "Slider", "Helper", function(a, b, c, d, e) {
		return {
			scope: {
				disable: "@"
			},
			require: "?ngModel",
			restrict: "A",
			link: function(f, g, h, i) {
				var j, k = {
					x: parseInt(h.x, 10) || 0,
					y: parseInt(h.y, 10) || 0
				},
					l = h.colorpicker ? h.colorpicker : "hex",
					m = angular.isDefined(h.colorpickerPosition) ? h.colorpickerPosition : "bottom",
					n = angular.isDefined(h.colorpickerInline) ? h.colorpickerInline : !1,
					o = angular.isDefined(h.colorpickerFixedPosition) ? h.colorpickerFixedPosition : !1,
					p = angular.isDefined(h.colorpickerParent) ? g.parent() : angular.element(document.body),
					q = angular.isDefined(h.colorpickerWithInput) ? h.colorpickerWithInput : !1,
					r = q ? '<input type="text" name="colorpicker-input">' : "",
					s = n ? "" : '<button type="button" class="close close-colorpicker">&times;</button>',
					t = '<div class="colorpicker dropdown" ng-click="$event.stopPropagation();"><div class="dropdown-menu"><colorpicker-saturation><i></i></colorpicker-saturation><colorpicker-hue><i></i></colorpicker-hue><colorpicker-alpha><i></i></colorpicker-alpha><colorpicker-preview></colorpicker-preview>' + r + s + "</div></div>",
					u = angular.element(t),
					v = c,
					w = u.find("colorpicker-hue"),
					x = u.find("colorpicker-saturation"),
					y = u.find("colorpicker-preview"),
					z = u.find("i");
				if (b(u)(f), f.disable && f.$watch("disable", function(a, b) {
					a != b && "false" == a && J()
				}), q) {
					var A = u.find("input");
					A.on("mousedown", function(a) {
						a.stopPropagation()
					}).on("keyup", function(a) {
						var b = this.value;
						g.val(b), i && f.$apply(i.$setViewValue(b)), a.stopPropagation(), a.preventDefault()
					}), g.on("keyup", function() {
						A.val(g.val())
					})
				}
				var B = function() {
						a.on("mousemove", D), a.on("mouseup", E)
					};
				"rgba" === l && (u.addClass("alpha"), j = u.find("colorpicker-alpha"), j.on("click", function(a) {
					d.setAlpha(a, o), D(a)
				}).on("mousedown", function(a) {
					d.setAlpha(a, o), B()
				})), w.on("click", function(a) {
					d.setHue(a, o), D(a)
				}).on("mousedown", function(a) {
					d.setHue(a, o), B()
				}), x.on("click", function(a) {
					d.setSaturation(a, o), D(a)
				}).on("mousedown", function(a) {
					d.setSaturation(a, o), B()
				}), o && u.addClass("colorpicker-fixed-position"), u.addClass("colorpicker-position-" + m), "true" === n && u.addClass("colorpicker-inline"), p.append(u), i && (i.$render = function() {
					g.val(i.$viewValue)
				}, f.$watch(h.ngModel, function() {
					F()
				})), g.on("$destroy", function() {
					u.remove()
				});
				var C = function() {
						try {
							y.css("backgroundColor", v[l]())
						} catch (a) {
							y.css("backgroundColor", v.toHex())
						}
						x.css("backgroundColor", v.toHex(v.value.h, 1, 1, 1)), "rgba" === l && (j.css.backgroundColor = v.toHex())
					},
					D = function(a) {
						var b = d.getLeftPosition(a),
							c = d.getTopPosition(a),
							e = d.getSlider();
						d.setKnob(c, b), e.callLeft && v[e.callLeft].call(v, b / 100), e.callTop && v[e.callTop].call(v, c / 100), C();
						var h = v[l]();
						return g.val(h), i && f.$apply(i.$setViewValue(h)), q && A.val(h), !1
					},
					E = function() {
						a.off("mousemove", D), a.off("mouseup", E)
					},
					F = function() {
						v.setColor(g.val()), z.eq(0).css({
							left: 100 * v.value.s + "px",
							top: 100 - 100 * v.value.b + "px"
						}), z.eq(1).css("top", 100 * (1 - v.value.h) + "px"), z.eq(2).css("top", 100 * (1 - v.value.a) + "px"), C()
					},
					G = function() {
						var a, b = e.getOffset(g[0]);
						return angular.isDefined(h.colorpickerParent) && (b.left = 0, b.top = 0), "top" === m ? a = {
							top: b.top - 147 + k.y,
							left: b.left + k.x
						} : "right" === m ? a = {
							top: b.top + k.y,
							left: b.left + 126 + k.x
						} : "bottom" === m ? a = {
							top: b.top + g[0].offsetHeight + 2 + k.y,
							left: b.left + k.x
						} : "left" === m ? a = {
							top: b.top + k.y,
							left: b.left - 150 + k.x
						} : "sceneToobar" === m && (a = {
							top: b.top + k.y - 110,
							left: b.left - 150 + k.x + 40
						}), {
							top: a.top + "px",
							left: a.left + "px"
						}
					},
					H = function() {
						J()
					};
				n === !1 ? g.on("click", function() {
					F(), u.addClass("colorpicker-visible").css(G()), a.on("mousedown", H)
				}) : (F(), u.addClass("colorpicker-visible").css(G())), u.on("mousedown", function(a) {
					a.stopPropagation(), a.preventDefault()
				});
				var I = function(a) {
						i && f.$emit(a, {
							name: h.ngModel,
							value: i.$modelValue
						})
					},
					J = function() {
						u.hasClass("colorpicker-visible") && (u.removeClass("colorpicker-visible"), I("colorpicker-closed"), a.off("mousedown", H))
					};
				u.find("button").on("click", function() {
					J()
				})
			}
		}
	}]), angular.module("app.directives.rightclick", []).directive("rightClick", ["$compile", function(a) {
		return {
			restrict: "EA",
			link: function(b, c, d) {
				var e;
				$(c).on("contextmenu", function(d) {
					if (d.preventDefault(), e && e[0] && e.remove(), "0" == b.categoryId) {
						e = $('<ul class="right-menu dropdown-menu"></ul>'), e.appendTo($(c)), e.css({
							left: d.pageX - $(c).offset().left,
							top: d.pageY - $(c).offset().top
						}).show();
						for (var f in b.myTags) {
							var g = '<li class="tag_list" ng-class="{selected: dropTagIndex == ' + f + '}" ng-click="selectTag(' + b.myTags[f].id + "," + f + ')">' + b.myTags[f].name + "</li>",
								h = a(g)(b);
							e.append(h)
						}
						var i = a('<li class="tag_list add_cate clearfix" style="border-top:1px solid #ccc;margin-bottom:0px;" ng-click="createCategory()"><em>+</em><span>创建分类</span></li>')(b);
						e.append(i);
						var j = a('<li class="btn-main" style="width:100%; padding:0px; border: 0;margin:0px;height:25px; line-height:25px;"><a style="height:25px;line-height:25px;text-indent:0;color:#FFF;padding:0px;text-align:center;" ng-click="setCategory(' + b.dropTagIndex + "," + b.img.id + ')">确定</a></li>')(b);
						e.append(j), $(j).on("click", function() {
							e.hide()
						}), $(document).mousemove(function(a) {
							(a.pageX < e.offset().left - 20 || a.pageX > e.offset().left + e.width() + 20 || a.pageY < e.offset().top - 20 || a.pageY > e.offset().top + e.height() + 20) && (e.hide(), $(this).unbind("mousemove"))
						})
					}
				})
			}
		}
	}]), angular.module("app.directives.copyButton", []).directive("copyButton", ["$translate", function(a) {
		return {
			restrict: "EA",
			scope: {
				url: "@"
			},
			link: function(a, b, c) {
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
	}]), angular.module("app.directives.customer", []).directive("forbiddenListClose", function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				$(b).click(function(a) {
					return !1
				})
			}
		}
	}), angular.module("app.directives.dataDraggable", []).directive("itemDraggable", function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				$(b).draggable({
					zIndex: 2700,
					scroll: !1,
					iframeFix: !1,
					revert: !1,
					helper: "clone"
				})
			}
		}
	}).directive("itemDroppable", function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				$(b).droppable({
					hoverClass: "active",
					out: function(a, b) {},
					drop: function(b, c) {
						delete a.$parent.associateData[c.draggable.parent().attr("item-id")], a.$parent.associateData[$(b.target).attr("item-id")] = c.draggable.attr("item-id");
						var d = $(b.target).find(".list_darggable");
						d.length > 0 && $(".item-remove-droppable").append(d), c.draggable.css({
							left: 0,
							top: 0
						}).prependTo(this)
					}
				})
			}
		}
	}).directive("itemRemoveDroppable", function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				$(b).droppable({
					hoverClass: "active",
					drop: function(b, c) {
						$(c.draggable).parents(".list-attribute").length > 0 && delete a.associateData[$(c.draggable).parents(".list-attribute").attr("item-id")], c.draggable.css({
							left: 0,
							top: 0
						}).appendTo(this)
					}
				})
			}
		}
	}), angular.module("app.directives.disableKeydown", []).directive("disableEdit", function() {
		function a(a, b, c) {
			var d = {
				37: "arrow-left",
				38: "arrow-up",
				39: "arrow-right",
				40: "arrow-down",
				9: "tab",
				27: "esc"
			};
			b.keydown(function(a) {
				d[a.which] || a.preventDefault()
			})
		}
		return {
			restrice: "EA",
			link: a
		}
	}), angular.module("scene.create.hoverElement", []).directive("hoverElement", ["$translate", function(a) {
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
	}]), angular.module("common.directives.inputColor", []).controller("inputColorCtrl", ["$scope", "$attrs", function(a, b) {
		a.x = b.x || 151, a.y = b.y || -2, a.colorMode = b.colorMode || "rgba"
	}]).directive("eqdInputColor", function() {
		return {
			restrict: "E",
			templateUrl: "directives/inputColor.tpl.html",
			replace: !0,
			controller: "inputColorCtrl",
			scope: {
				selectColor: "=",
				defaultColor: "="
			}
		}
	}), angular.module("app.directives.keymap", ["services.scene", "services.history", "services.select"]).directive("eqxKeymap", ["sceneService", "historyService", "selectService", function(a, b, c) {
		return {
			restrict: "A",
			link: function(b) {
				var c = $(document);
				b.$on("$destroy", function() {
					c.unbind("keydown")
				}), c.unbind("keydown").keydown(function(c) {
					if ((c.ctrlKey || c.metaKey) && 90 == c.keyCode && a.historyBack(), (c.ctrlKey || c.metaKey) && 89 == c.keyCode && a.historyForward(), (c.ctrlKey || c.metaKey) && 86 == c.keyCode) {
						if ($("#btn-toolbar").length || $(".modal-dialog").length) return;
						a.getCopy() && a.pasteElement()
					}
					if ((c.ctrlKey || c.metaKey) && 67 == c.keyCode) {
						if ($("#btn-toolbar").length || $(".modal-dialog").length) return;
						a.copyElement()
					}
					b.$apply()
				})
			}
		}
	}]), angular.module("app.directives.limitInput", []).directive("limitInput", function() {
		return {
			require: "ngModel",
			link: function(a, b, c, d) {
				"transform" == c.cssItem && a.$on("updateTransform", function(b, c, e) {
					e == a.elemDef.id && (d.$setViewValue(parseInt(c, 10)), d.$render())
				}), "borderRadius" == c.cssItem && a.$on("updateMaxRadius", function(b, c) {
					a.maxRadius = parseInt(Math.min($(c).outerWidth(), $(c).outerHeight()) / 2 + 10, 10), a.maxRadius < a.model.borderRadius && (d.$setViewValue(a.maxRadius), d.$render()), a.$apply()
				}), a.$watch(function() {
					return $(b).val()
				}, function(a) {
					+a > c.max && (d.$setViewValue(c.max), d.$render()), +a < c.min && (d.$setViewValue(c.min), d.$render())
				})
			}
		}
	}), angular.module("app.directives.lineChart", []).directive("lineChart", ["$compile", function(a) {
		return {
			restrict: "EA",
			link: function(a, b, c) {
				var d, e;
				a.$watch(function() {
					return c.data
				}, function() {
					c.data && (d = JSON.parse(c.data)), e ? (e.destroy(), e = new Chart(b[0].getContext("2d")).Line(d, {
						scaleFontColor: "#fff"
					})) : e = new Chart(b[0].getContext("2d")).Line(d, {
						scaleFontColor: "#fff"
					})
				})
			}
		}
	}]), angular.module("app.directives.loading", []).directive("loginLoading", function() {
		return {
			restrict: "EA",
			link: function(a, b, c) {
				a.$on("loginLoading", function(a, c) {
					var d = $('<div class="homeMask" style="position: absolute;width: 100%;top:0;bottom:0;background-color:#ccc;opacity:0.8;">正在跳转，请稍后...</div>');
					d.appendTo($(b))
				})
			}
		}
	}), angular.module("app.directives.comp.editor", []).directive("mapEditor", function() {
		return {
			restrict: "AE",
			templateUrl: "directives/mapeditor.tpl.html",
			link: function(a, b, c) {
				var d = new BMap.Map("l-map");
				d.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
				var e = {
					onSearchComplete: function(a) {
						if (f.getStatus() == BMAP_STATUS_SUCCESS) {
							for (var b = [], c = 0; c < a.getCurrentNumPois(); c++) b.push(a.getPoi(c).title + ", " + a.getPoi(c).address);
							document.getElementById("r-result").innerHTML = b.join("<br/>")
						}
					}
				},
					f = new BMap.LocalSearch(d, e);
				a.searchAddress = function() {
					f.search(a.address)
				}
			}
		}
	}), angular.module("app.directives.notification", []).directive("notificationFadeout", ["i18nNotifications", function(a) {
		return {
			restrict: "EA",
			link: function(b, c, d) {
				var e = $(c);
				e.fadeOut(4e3, function() {
					a.remove(b.notification)
				})
			}
		}
	}]), angular.module("app.directives.pageTplTypes", []).directive("pageTplTypes", ["pageTplService", function(a) {
		return {
			restrict: "EA",
			replace: !0,
			templateUrl: "directives/page-tpl-types.tpl.html",
			link: function(b, c, d) {
				a.getPageTplTypes().then(function(a) {
					a.data.list && a.data.list.length > 0 ? b.pageTplTypes = a.data.list : b.pageTplTypes = []
				})
			}
		}
	}]), angular.module("app.directives.pieChart", []).directive("pieChart", ["$compile", function(a) {
		return {
			restrict: "EA",
			link: function(a, b, c) {
				var d, e;
				a.$watch(function() {
					return c.data
				}, function() {
					c.data && (e = JSON.parse(c.data)), d ? (d.destroy(), d = new Chart(b[0].getContext("2d")).Pie(e)) : d = new Chart(b[0].getContext("2d")).Pie(e)
				})
			}
		}
	}]), angular.module("app.directives.qrcode", []).directive("qrCode", function() {
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
	}), angular.module("app.directives.register", []).directive("qqButton", ["$translate", function(a) {
		return {
			restrict: "EA",
			scope: {
				someCtrlFn: "&callbackFn",
				openid: "=",
				accesstoken: "="
			},
			link: function(b, c, d) {
				QC.Login({
					btnId: d.id,
					scope: "all"
				}, function(a, c) {
					var d = a;
					QC.Login.check() && QC.Login.getMe(function(a, c) {
						b.openid = a, b.accesstoken = c, b.someCtrlFn({
							arg1: {
								openId: a,
								accessToken: c,
								type: "qq",
								userInfo: d
							}
						})
					})
				}, function(b) {
					alert(a.instant("common.register.QQ_SUCCESS"))
				}), $("#qqLoginBtn a").removeAttr("onclick").click(function() {
					alert(a.instant("common.register.OTHER_SUCCESS"))
				})
			}
		}
	}]).directive("wbButton", ["$translate", function(a) {
		return {
			restrict: "EA",
			link: function(b, c, d) {
				WB2.anyWhere(function(a) {
					a.widget.connectButton({
						id: "wb_connect_btn",
						type: "3,2",
						callback: {
							login: function(a) {},
							logout: function() {}
						}
					})
				}), $("#wb_connect_btn").removeAttr("onclick").click(function(b) {
					return b.stopPropagation(), b.preventDefault(), alert(a.instant("common.register.WEIBO_SUCCESS")), !1
				})
			}
		}
	}]), angular.module("app.directives.responsiveImage", []).directive("responsiveImage", ["$compile", function(a) {
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
	}]), angular.module("common.directives.scroll", []).directive("eqdScroll", function() {
		var a = {
			mouseWheel: !0,
			scrollbars: !0,
			interactiveScrollbars: !0,
			click: !0,
			bounce: !1
		};
		return function(b, c, d) {
			c.css({
				position: "relative",
				overflow: "hidden"
			}), delete a.disableMouse, delete a.preventDefaultException, d.preventException && (a.preventDefaultException = {
				tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|DIV|SPAN|EM|A|LI|B)$/
			}), "true" == d.disableMouse && (a.disableMouse = !0);
			var e, f = new IScroll(c.get(0), a),
				g = b.$watch(function() {
					clearTimeout(e), e = setTimeout(function() {
						f.refresh()
					}, 100)
				});
			d.refresh && (f.on("scrollStart", function() {
				c.children().on("mousewheel", function(a) {
					f.y <= f.maxScrollY + 200 && b.$eval(d.refresh)
				})
			}), f.on("scrollEnd", function() {
				c.children().unbind("mousewheel")
			})), c.on("$destroy", function() {
				f.destroy(), f = null, g(), clearTimeout(e)
			}), b.$on("scroll.refresh." + d.scroll, function() {
				e = setTimeout(function() {
					f.refresh()
				}, 100)
			}), b.$on("scroll.scrollTo", function(a, b, c) {
				f.scrollTo(b, c)
			})
		}
	}), angular.module("common.directives.dropDown", []).directive("eqdSelect", ["$rootScope", function(a) {
		function b(b, c) {
			function d() {
				f.unbind("click", d), g.removeClass("visible")
			}
			function e(a) {
				index = a.index(), b.current = b.list[index], g.removeClass("visible")
			}
			var f = (tabletCheck(), $(document)),
				g = c.find(".eqc-drop-down-list"),
				h = g.find(".iScrollIndicator");
			c.on("$destroy", function() {
				f.unbind("click", d)
			}), b.showList = function(c) {
				return c.stopPropagation(), g.hasClass("visible") ? void d() : (a.$broadcast("iscroll.refresh." + b.scrollType), $(".eqc-drop-down-list").removeClass("visible"), g.addClass("visible"), f.click(d), void h.click(function(a) {
					a.stopPropagation()
				}))
			}, b.selectItem = function(a) {
				a.stopPropagation();
				var b = a.target,
					c = b.tagName.toLowerCase(),
					d = $(b);
				"li" == c ? e(d) : "div" == c && (d = d.closest("li"), e(d))
			}
		}
		return {
			restrict: "E",
			replace: !0,
			templateUrl: "directives/select.tpl.html",
			scope: {
				list: "=",
				current: "=",
				scrollType: "@",
				fontFamily: "=",
				isBorder: "@",
				x: "@"
			},
			link: b
		}
	}]).controller("SimpleSelectController", ["$scope", "$element", "$attrs", "$parse", "$timeout", function(a, b, c, d, e) {
		var f = this;
                a.list = [], a.current = null, f.addSelectChoice = function (b) {
		if (b.name && b.name === "用途" && !b.value) {
                    b.name = window.localStorage.mytpl1
                }
                if (b.name && b.name === "功能" && !b.value) {
                    b.name = window.localStorage.mytpl2
                }
                if (b.name && b.name === "风格" && !b.value) {
                    b.name = window.localStorage.mytpl3
                }
		a.list.push(b)
		}, f.removeSelectChoice = function(b) {
			var c = a.list.indexOf(b); - 1 !== c && a.list.splice(c, 1)
		};
		var g;
		f.setObjectConfig = function(a) {
			g === undefined && (g = a)
		}, a.setDefaultSelectedValue = function() {
			angular.forEach(a.list, function(b) {
				b.value == a.model && (a.current = b)
			})
		};
		var h = a.$watchCollection("list", function() {
			a.setDefaultSelectedValue()
		}),
			i = a.$watch("current", function(b) {
				b && a.model != b.value && (a.model = b.value, e(function() {
					c.change && a.$parent.$eval(c.change)
				}, 100))
			}),
			j = a.$watch("model", function(b) {
				b && a.setDefaultSelectedValue()
			});
		a.$on("$destroy", function() {
			h(), i(), j()
		}), a.$watch("model", function(b, c) {
			b != c && angular.forEach(a.list, function(b) {
				b.value == a.model && (a.current = b)
			})
		})
	}]).directive("eqxSelect", ["$compile", function(a) {
		var b = '<eqd-select list="list" class="select-contain" current="current"></eqd-select>';
		return {
			restrict: "E",
			scope: {
				model: "="
			},
			controller: "SimpleSelectController",
			compile: function(c, d) {
				var e = d["class"];
				return c.removeClass(e), function(c, d, f, g) {
					d.append(a(angular.element(b).addClass(e))(c))
				}
			}
		}
	}]).directive("eqxSelectOption", ["$parse", "$interpolate", function(a, b) {
		return {
			restrict: "E",
			require: "^eqxSelect",
			compile: function(c, d) {
				var e, f;
				return d.ngRepeat && (e = a(d.value), f = b(c.html())), function(a, b, c, d) {
					b.css("display", "none");
					var g;
					if (e) {
						var h = e(a);
						d.setObjectConfig(angular.isObject(h)), g = {
							name: f(a),
							value: h
						}
					} else g = {
						name: b.html(),
						value: a.$parent.$eval(c.value)
					};
					d.addSelectChoice(g), b.on("$destroy", function() {
						d.removeSelectChoice(g)
					})
				}
			}
		}
	}]), angular.module("app.directives.numChangeAnim", []).directive("numChangeAnim", ["$filter", function(a) {
		return {
			restrict: "A",
			scope: {
				content: "@"
			},
			link: function(b, c, d) {
				function e(a, b) {
					return Math.floor(a + Math.random() * (b - a))
				}
				function f(a, b) {
					a = a > 0 ? a : 1;
					for (var c = Math.floor(Math.log10(a)), d = Math.floor(a / Math.pow(10, c)), f = 0, g = 10, h = function(h) {
							setTimeout(function() {
								if (10 > g) f = h;
								else {
									var i = c > h ? h : c,
										j = Math.pow(10, i) * d;
									j = j.toString().length == a.toString().length ? a : j, f = e(f, j)
								}
								b(f, 9 == h)
							}, (h * h + h + 2) / 2 * 30)
						}, i = 0; g > i; i++) h(i)
				}
				function g(b, c) {
					$(b).children("span").text(a("number")(c))
				}
				b.$watch("content", function(a) {
					if (a) {
						var b = parseInt(a, 10);
						f(b, function(a, d) {
							g(c, a), d && (g(c, b), $(c).addClass("heartbeat").css({
								"animation-duration": "1s"
							}))
						})
					}
				})
			}
		}
	}]), angular.module("app.directives.style", []).directive("panelDraggable", function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				a.$on("$destroy", function() {
					$(b).draggable(), $(b).draggable("destroy"), b = null
				}), b.on("$destroy", function() {
					$(b).draggable(), $(b).draggable("destroy"), b = null
				}), $(b).draggable(), $(window).bind("resize", function() {
					$(b).css({
						left: $(document).width() - 444,
						top: 50
					})
				})
			}
		}
	}), angular.module("app.directives.switchInput", []).directive("switchInput", function() {
		function a(a, b, c) {
			b.hover(function(c) {
				a.obj.showinput = !0;
				var d = b.find("input");
				setTimeout(function() {
					d.focus(), d.select()
				}, 0), a.$apply()
			}, function(b) {
				a.obj.showinput = !1, a.$apply()
			})
		}
		return {
			restrict: "EA",
			scope: {
				obj: "="
			},
			link: a
		}
	}), angular.module("app.directives.component", ["services.scene", "services.select", "scene.create.console.pictures", "scene.edit.trigger"]).directive("compDraggable", function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				a.$on("$destroy", function() {
					$(b).draggable(), $(b).draggable("destroy"), b = null
				}), b.on("$destroy", function() {
					$(b).draggable(), $(b).draggable("destroy"), b = null
				}), $(b).draggable({
					revert: !1,
					stack: ".comp-draggable",
					helper: "panel" == c.compDraggable || "page" == c.compDraggable ? "clone" : "",
					appendTo: "parent",
					containment: "panel" == c.compDraggable || "page" == c.compDraggable ? "" : "parent",
					zIndex: 1049,
					opacity: .35,
					stop: function(a, b) {
						$(a.toElement).one("click", function(a) {
							a.stopImmediatePropagation()
						})
					}
				})
			}
		}
	}).directive("compDroppable", function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				a.$on("$destroy", function() {
					$(b).droppable(), $(b).droppable("destroy"), b = null
				}), b.on("$destroy", function() {
					$(b).droppable(), $(b).droppable("destroy"), b = null
				}), $(b).droppable({
					accept: ".comp-draggable",
					hoverClass: "drop-hover",
					drop: function(b, c) {
						if (3 != c.draggable.attr("ctype")) {
							var d = {
								left: c.offset.left - $(this).offset().left + "px",
								top: c.offset.top - $(this).offset().top + "px"
							};
							"panel" == c.draggable.attr("comp-draggable") ? a.createComp(c.draggable.attr("ctype"), d) : a.updateCompPosition(c.draggable.attr("id"), d)
						} else a.createComp(3)
					}
				})
			}
		}
	}).directive("compSortable", function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				$(b).sortable({
					axis: "y",
					update: function(a, b) {}
				})
			}
		}
	}).directive("compResizable", function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				$(b).resizable({
					autoHide: !1,
					containment: "parent",
					stop: function(b, c) {
						if ("4" == $(c.element).attr("ctype").charAt(0) || "n" == $(c.element).attr("ctype").charAt(0)) {
							var d = {
								width: c.size.width,
								height: c.size.height,
								imgStyle: {
									width: c.element.find("img").width(),
									height: c.element.find("img").height(),
									marginTop: c.element.find("img").css("marginTop"),
									marginLeft: c.element.find("img").css("marginLeft")
								}
							};
							a.updateCompSize(c.element.attr("id"), d)
						} else a.updateCompSize(c.element.attr("id"), c.size);
						$(b.toElement).one("click", function(a) {
							a.stopImmediatePropagation()
						})
					},
					resize: function(a, c) {
						var d = $(b).find("img").width() / $(b).find("img").height();
						if ("4" == $(c.element).attr("ctype").charAt(0) || "n" == $(c.element).attr("ctype").charAt(0)) {
							var e = c.size.width / c.size.height,
								f = c.element.find("img");
							d >= e ? (f.outerHeight(c.size.height), f.outerWidth(c.size.height * d), f.css("marginLeft", -(f.outerWidth() - c.size.width) / 2), f.css("marginTop", 0)) : (f.outerWidth(c.size.width), f.outerHeight(c.size.width / d), f.css("marginTop", -(f.outerHeight() - c.size.height) / 2), f.css("marginLeft", 0))
						} else c.element.find(".element").outerWidth(c.size.width), c.element.find(".element").outerHeight(c.size.height)
					}
				})
			}
		}
	}).directive("photoDraggable", function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				a.$on("$destroy", function() {
					$(b).draggable(), $(b).draggable("destroy"), b = null
				}), b.on("$destroy", function() {
					$(b).draggable(), $(b).draggable("destroy"), b = null
				}), $(b).draggable({
					revert: !1,
					helper: "clone",
					appendTo: ".img_list",
					zIndex: 1049,
					opacity: .35,
					stop: function(a, b) {
						$(a.toElement).one("click", function(a) {
							a.stopImmediatePropagation()
						})
					}
				})
			}
		}
	}).directive("cropDroppable", function() {
		return {
			restrict: "A",
			link: function(a, b, c) {
				a.$on("$destroy", function() {
					$(b).droppable(), $(b).droppable("destroy"), b = null
				}), b.on("$destroy", function() {
					$(b).droppable(), $(b).droppable("destroy"), b = null
				}), $(b).droppable({
					accept: "li",
					hoverClass: "drop-hover",
					drop: function(b, c) {
						a.preSelectImage(c.draggable.attr("photo-draggable"))
					}
				})
			}
		}
	}).service("Point", function() {
		function a(a, b) {
			this.x = a, this.y = b
		}
		return a.prototype.add = function(b, c) {
			return new a(this.x + b, this.y + c)
		}, a.prototype.middle = function(b) {
			return new a((this.x + b.x) / 2, (this.y + b.y) / 2)
		}, a.prototype.detectionPointA = function(a) {
			this.x = a.x < this.x ? a.x : this.x, this.y = a.y < this.y ? a.y : this.y
		}, a.prototype.detectionPointB = function(a) {
			this.x = a.x > this.x ? a.x : this.x, this.y = a.y > this.y ? a.y : this.y
		}, a
	}).factory("DetectionBox", ["Point", function(a) {
		function b(a) {
			this.element = a, this.init()
		}
		return b.prototype.init = function() {
			var b = this.element.position();
			this.startPointA = new a(b.left, b.top);
			var c = this.element.get(0);
			this.startPosition = {
				top: parseInt(c.style.top, 10) || 0,
				left: parseInt(c.style.left, 10) || 0
			};
			var d = /[0-9]*[.]*[0-9]*deg/.exec(c.style.transform || c.style.webkitTransform || c.style.mozTransform || c.style.msTransform || c.style.oTransform || ""),
				e = d && d.length ? d[0] : "0";
			this.angle = parseInt(e, 10), this.radian = 2 * this.angle * Math.PI / 360;
			var f = this.element.width(),
				g = this.element.height();
			this.elementWidth = f, this.elementHeight = g, this.left = this.startPosition.left, this.top = this.startPosition.top, this.ratio = f / g, this.width = Math.abs(f * Math.cos(this.radian)) + Math.abs(g * Math.sin(this.radian)), this.height = Math.abs(f * Math.sin(this.radian)) + Math.abs(g * Math.cos(this.radian)), this.startPointB = this.startPointA.add(this.width, this.height), this.startPointO = this.startPointA.middle(this.startPointB)
		}, b.prototype.getID = function() {
			return this.element.attr("id")
		}, b.prototype.measure = function() {
			return {
				x: this.startPointA.x,
				y: this.startPointA.y,
				width: this.width,
				height: this.height
			}
		}, b
	}]).service("panStateTracker", function() {
		var a = {},
			b = {};
		return a.clear = function() {
			b = {}
		}, a.register = function(a) {
			b[a.attr("id")] = a
		}, a.isElementHasBeenRegisted = function(a) {
			return !!b[a.attr("id")];
		}, a.remove = function(a) {
			delete b[a.attr("id")]
		}, a.forEach = function(a) {
			angular.forEach(b, a)
		}, a
	}).controller("MouseCompSelectController", ["$scope", "$element", "Point", "DetectionBox", "panStateTracker", "selectService", function(a, b, c, d, e, f) {
		function g(a, d, e, f, g) {
			b.get(0).style.position = "relative", this.startPositionX = a, this.startPositionY = d, this.width = e, this.height = f, this.selectAreaPointA = new c(a, d), this.selectAreaPointB = new c(a + e, d + f), this.startFlag = g, this.selectAreaTemplate = b.find(".edit-area-select-container"), this.selectAreaTemplate.length || (this.selectAreaTemplate = $('<div class="edit-area-select-container"></div>'), b.append(this.selectAreaTemplate));
			var h = b.offset(),
				i = $("#nr").offset();
			this.offset = h, this.containerOffset = i, $(window).resize(function() {
				angular.extend(h, b.offset()), angular.extend(i, $("#nr").offset())
			})
		}
		b.css("user-select", "none");
		var h = this;
		h.allComponents = [], h.selectedComponents = [], g.prototype.selectStart = function(a, c) {
			angular.extend(this.offset, b.offset()), angular.extend(this.containerOffset, $("#nr").offset()), h.allComponents = [], e.forEach(function(a) {
				h.allComponents.push(a)
			}), this.startPositionX = a, this.startPositionY = c, this.startFlag = !0, this.updateSelectedElements()
		}, g.prototype.isSelectStarted = function() {
			return this.startFlag
		}, g.prototype.selectMove = function(a) {
			this.width = a.clientX - this.startPositionX, this.height = a.clientY - this.startPositionY, this.updateCurrentPosition(), this.width > 4 && this.height > 4 && (this.updateSelectArea(), this.updateSelectedElements())
		}, g.prototype.selectEnd = function() {
			this.startPositionX = this.startPositionY = this.width = this.height = 0, this.startFlag = !1, this.updateCurrentPosition(), this.updateSelectArea()
		}, g.prototype.getLocalPoint = function(a) {
			return new c(a.x - this.offset.left, a.y - this.offset.top)
		}, g.prototype.updateSelectArea = function() {
			var a = this.getLocalPoint(this.selectAreaPointA);
			this.selectAreaTemplate.css("left", a.x), this.selectAreaTemplate.css("top", a.y), this.selectAreaTemplate.height(this.height), this.selectAreaTemplate.width(this.width)
		}, g.prototype.updateCurrentPosition = function() {
			this.selectAreaPointA.x = this.width > 0 ? this.startPositionX : this.width + this.startPositionX, this.selectAreaPointA.y = this.height > 0 ? this.startPositionY : this.height + this.startPositionY, this.width = Math.abs(this.width), this.height = Math.abs(this.height), this.selectAreaPointB.x = this.selectAreaPointA.x + this.width, this.selectAreaPointB.y = this.selectAreaPointA.y + this.height
		}, g.prototype.updateSelectedElements = function() {
			h.selectedComponents = [];
			var a = this,
				b = f.getElements();
			angular.forEach(h.allComponents, function(c) {
				var d = c.attr("id").split("_")[1];
				return a.contains(c) ? (c.children(".bar").show(), void(-1 === b.indexOf(d) && f.addElement(d))) : (-1 !== b.indexOf(d) && f.deleteElement(d), void c.children(".bar").hide())
			})
		}, g.prototype.contains = function(a) {
			var b = new d(a),
				e = new c(this.containerOffset.left + b.startPointO.x, this.containerOffset.top + b.startPointO.y);
			return e.x >= this.selectAreaPointA.x && e.x <= this.selectAreaPointB.x && e.y >= this.selectAreaPointA.y && e.y <= this.selectAreaPointB.y
		};
		var i = new g(0, 0, 0, 0, !1);
		b.bind("mousedown", function(a) {
			var b = $(a.target);
			$("#nr").find(".mask-trigger").length || b.hasClass("comp-resize") || b.parents("li.comp-resize").length || b.hasClass("ui-draggable") || b.parents(".ui-draggable").length || b.parents("#containment").length || b.parents(".create_left").length || ($("body").css({
				"user-select": "none",
				cursor: "default"
			}), i.selectStart(a.clientX, a.clientY))
		}), b.bind("mousemove", function(a) {
			i.isSelectStarted() && i.selectMove(a)
		}), b.bind("mouseup", function() {
			i.isSelectStarted() && ($("body").css({
				"user-select": "initial",
				cursor: "default"
			}), i.selectEnd())
		})
	}]).directive("mouseCompSelect", [function() {
		return {
			restrict: "A",
			controller: "MouseCompSelectController"
		}
	}]).factory("editAreaBorderCollisionDetector", ["DetectionBox", "Point", function(a, b) {
		function c() {
			this.editAreaWidth = 320, this.editAreaHeight = 486, this.detectionBoxs = []
		}
		function d() {
			this.editArea = new c
		}
		return c.prototype.initDetectBoxWithElements = function(b) {
			this.detectionBoxs = [];
			var c = this;
			angular.forEach(b, function(b) {
				c.detectionBoxs.push(new a(b))
			})
		}, d.prototype.initWithElements = function(a) {
			this.editArea.initDetectBoxWithElements(a), this.initBigDetectionBoxPoints()
		}, d.prototype.initBigDetectionBoxPoints = function() {
			this.bigDetectionBoxPointA = new b(this.editArea.editAreaWidth, this.editArea.editAreaHeight), this.bigDetectionBoxPointB = new b(0, 0), this.minimumWidth = this.editArea.editAreaWidth, this.minimumHeight = this.editArea.editAreaHeight;
			var a = this;
			angular.forEach(this.editArea.detectionBoxs, function(b) {
				a.bigDetectionBoxPointA.detectionPointA(b.startPointA), a.bigDetectionBoxPointB.detectionPointB(b.startPointB), a.minimumWidth > b.elementWidth && (a.minimumWidth = b.elementWidth), a.minimumHeight > b.elementHeight && (a.minimumHeight = b.elementHeight)
			});
			var c = (this.bigDetectionBoxPointA.x + this.bigDetectionBoxPointB.x) / 2,
				d = (this.bigDetectionBoxPointA.y + this.bigDetectionBoxPointB.y) / 2;
			this.bigDetectionBoxPointO = new b(c, d)
		}, d.prototype.refreshBoxInfo = function() {
			angular.forEach(this.editArea.detectionBoxs, function(a) {
				a.init()
			}), this.initBigDetectionBoxPoints()
		}, d.prototype.translateIntoProperMoveDelta = function(a) {
			var b = {
				x: a.deltaX,
				y: a.deltaY
			};
			return b
		}, d.prototype.compDragMoveDelta = function(a) {
			return this.translateIntoProperMoveDelta(a)
		}, new d
	}]).controller("MultiCompDragController", ["selectService", "$scope", "$element", "editAreaBorderCollisionDetector", "panStateTracker", "gridGuide", "$rootScope", function(a, b, c, d, e, f, g) {
		e.clear();
		var h = this;
		h.selectedComponents = [], h.initCollisionDetectorWithElements = function() {
			h.selectedComponents = [];
			var b = $("#nr");
			angular.forEach(a.getElements(), function(a) {
				h.selectedComponents.push(b.find("#inside_" + a))
			}), d.initWithElements(h.selectedComponents)
		}, h.isKeyboard = !1, h.compDragStart = function(b) {
			a.getElements().length && (h.initCollisionDetectorWithElements(), f.guide.start({
				action: "move"
			}), h.isKeyboard = !! b, h.isKeyboard || angular.forEach(h.selectedComponents, function(a) {
				a.css("opacity", .35)
			}))
		}, h.compDragMove = function(b) {
			if (a.getElements().length) {
				var c = d.compDragMoveDelta({
					deltaX: b.deltaX,
					deltaY: b.deltaY
				});
				!h.isKeyboard && f.guide.options.snap && f.guide.enforceGuides(c), angular.forEach(d.editArea.detectionBoxs, function(a) {
					var b = "translate3d(" + c.x + "px, " + c.y + "px, 0) rotateZ(" + a.angle + "deg)";
					a.element.css("transform", b)
				}), f.guide.sync(c), g.$broadcast("boxOuter")
			}
		}, h.compDragEnd = function(c) {
			if (a.getElements().length) {
				angular.forEach(h.selectedComponents, function(a) {
					a.css("opacity", 1)
				});
				var e = d.compDragMoveDelta({
					deltaX: c.deltaX,
					deltaY: c.deltaY
				});
				!h.isKeyboard && f.guide.options.snap && f.guide.enforceGuides(e);
				var i = d.editArea.detectionBoxs.length;
				angular.forEach(d.editArea.detectionBoxs, function(a, c) {
					var d = "translate3d(0, 0, 0) rotateZ(" + a.angle + "deg)";
					a.element.css("transform", d);
					var f = {
						top: a.startPosition.top + e.y,
						left: a.startPosition.left + e.x
					};
					a.element.css("top", f.top), a.element.css("left", f.left), b.updateCompPosition(a.element.attr("id"), f, i - 1 > c)
				}), f.guide.stop(), g.$broadcast("boxOuter")
			}
		}, f.grid.init(c), f.guide.init(c)
	}]).directive("multiCompDrag", function() {
		return {
			restrict: "A",
			controller: "MultiCompDragController"
		}
	}).directive("compDrag", ["panStateTracker", "$rootScope", function(a, b) {
		return {
			require: "^multiCompDrag",
			restrict: "A",
			link: function(b, c, d, e) {
				if (!a.isElementHasBeenRegisted(c)) {
					if (a.register(c), c.on("$destroy", function() {
						a.remove(c)
					}), c.find("img").length) {
						var f = $('<div class="dragTemplate" style="position: absolute;left: 0;top: 0;right: 0;bottom: 0;background-color: #fff;opacity: 0;"></div>');
						f.bind("dblclick", function() {
							f.siblings(".element").trigger("dblclick")
						}), c.find(".element-box-contents").append(f)
					}
					var g = new Hammer(c.find(".element-box-contents").get(0));
					g.get("pan").set({
						threshold: 0
					}), g.on("panstart", function(a) {
						return $(".edit_area").find(".switch").length ? !1 : c.hasClass("inside-active") ? !1 : (a.preventDefault(), a.srcEvent.preventDefault(), $("body").css({
							"user-select": "none",
							cursor: "default"
						}), void e.compDragStart())
					}), g.on("panmove", function(a) {
						return a.preventDefault(), $(".edit_area").find(".switch").length ? !1 : c.hasClass("inside-active") ? !1 : void e.compDragMove(a)
					}), g.on("panend", function(a) {
						return $(".edit_area").find(".switch").length ? !1 : c.hasClass("inside-active") ? !1 : (e.compDragEnd(a), $("body").css({
							"user-select": "initial",
							cursor: "default"
						}), void $(a.srcEvent.target).one("click", function(a) {
							return a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault(), !1
						}))
					})
				}
			}
		}
	}]).directive("compRotate", ["$rootScope", function(a) {
		return {
			restrict: "A",
			link: function(b, c, d) {
				//添加旋转功能
				var e = $(c),
					f = $('<div class="bar bar-rotate bar-radius">');
				e.append(f).append('<div class="bar bar-line">');
				var g, h = {},
					i = new Hammer(f.get(0));
				i.get("pan").set({
					threshold: 0
				}), i.on("panstart", function(a) {
					$("body").css({
						"user-select": "none",
						cursor: 'url("/assets/images/mouserotate.ico"), default'
					});
					var b = e.parent();
					h = {
						x: parseFloat(e.css("left")) + b.offset().left + e.width() / 2,
						y: parseFloat(e.css("top")) + b.offset().top + e.height() / 2
					}
				}), i.on("panmove", function(b) {
					var c = b.center,
						d = c.x - h.x,
						f = c.y - h.y,
						i = Math.abs(d / f);
					g = Math.atan(i) / (2 * Math.PI) * 360, d > 0 && 0 > f ? g = 360 + g : d > 0 && f > 0 ? g = 180 - g : 0 > d && f > 0 ? g = 180 + g : 0 > d && 0 > f && (g = 360 - g), g > 360 && (g -= 360), e.css({
						transform: "rotateZ(" + g + "deg)"
					}), a.$broadcast("boxOuter")
				}), i.on("panend", function(c) {
					$("body").css({
						"user-select": "initial",
						cursor: "default"
					}), b.updateCompAngle(e.attr("id"), g), b.$broadcast("updateTransform", g, e.attr("id").split("_")[1]), a.$broadcast("boxOuter")
				})
			}
		}
	}]).directive("compResize", ["selectService", "picturesService", "triggerService", "panStateTracker", "multiCompResize", "Cursor", "gridGuide", "$rootScope", function(a, b, c, d, e, f, g, h) {
		function i(a, b, c, d) {
			c.css("cursor", d);
			var f = new Hammer(c.get(0));
			f.get("pan").set({
				threshold: 0,
				direction: Hammer.DIRECTION_ALL
			}), f.on("panstart", function() {
				$("body").css({
					"user-select": "none",
					cursor: "default"
				}), e.resizeStart(b), g.guide.start({
					action: "resize"
				})
			}), f.on("panmove", function(a) {
				var c = e.resizeMove(b, d, a);
				g.guide.sync(c), h.$broadcast("boxOuter")
			}), f.on("panend", function() {
				$("body").css({
					"user-select": "initial",
					cursor: "default"
				}), e.resizeEnd(a, b), g.guide.stop(), h.$broadcast("boxOuter")
			})
		}
		return {
			restrict: "A",
			link: function(b, c) {
				//拼接文件边缘四个边框和圆点
				var d = $('<div class="bar bar-n"><div class="bar-radius"></div></div>'),
					e = $('<div class="bar bar-s"><div class="bar-radius"></div></div>'),
					g = $('<div class="bar bar-e"><div class="bar-radius"></div></div>'),
					h = $('<div class="bar bar-w"><div class="bar-radius"></div></div>'),
					j = $('<div class="bar bar-ne bar-radius">'),
					k = $('<div class="bar bar-nw bar-radius">'),
					l = $('<div class="bar bar-se bar-radius">'),
					m = $('<div class="bar bar-sw bar-radius">');
				c.append(d).append(e).append(g).append(h).append(k).append(l).append(m).append(j).unbind("mousedown").mousedown(function(c) {
					var d = !! $("#nr").find(".mask-trigger").length;
					if (!d) {
						var e = $(this).attr("id").split("_")[1];
						if (c.ctrlKey || c.shiftKey)"none" != $(this).children(".bar").first().css("display") ? ($(this).children(".bar").hide(), a.deleteElement(e)) : ($(this).children(".bar").show(), a.addElement(e));
						else {
							if ("none" != $(this).children(".bar").first().css("display")) return;
							$(this).children(".bar").show().end().siblings().children(".bar").hide(), a.clearElements(), a.addElement(e)
						}
						b.safeApply(function() {})
					}
				}), c.find(".element-box").unbind("click").bind("click", function(a) {
					(a.ctrlKey || a.shiftKey) && a.stopPropagation()
				}), c.parent().unbind("mousedown").mousedown(function(c) {
					$(c.target).closest("li").length || ($(this).children("li").children(".bar").hide(), b.$emit("hideStylePanel"), a.clearElements(), b.safeApply(function() {}))
				}), i(b, c, g, f.RESIZE_E), i(b, c, h, f.RESIZE_W), i(b, c, d, f.RESIZE_N), i(b, c, e, f.RESIZE_S), i(b, c, j, f.RESIZE_NE), i(b, c, k, f.RESIZE_NW), i(b, c, l, f.RESIZE_SE), i(b, c, m, f.RESIZE_SW)
			}
		}
	}]).service("Cursor", function() {
		var a = {
			RESIZE_W: "w-resize",
			RESIZE_E: "e-resize",
			RESIZE_N: "n-resize",
			RESIZE_S: "s-resize",
			RESIZE_SE: "se-resize",
			RESIZE_SW: "sw-resize",
			RESIZE_NE: "ne-resize",
			RESIZE_NW: "nw-resize"
		};
		return a
	}).factory("multiCompResize", ["selectService", "picturesService", "Cursor", "editAreaBorderCollisionDetector", "sceneService", function(a, b, c, d, e) {
		var f, g, h = 1,
			i = 1,
			j = (d.editArea.editAreaWidth, d.editArea.editAreaHeight, null),
			k = null,
			l = {};
		return l.selectedComponents = [], l.initCollisionDetectorWithElements = function() {
			l.selectedComponents = [];
			var b = $("#nr");
			angular.forEach(a.getElements(), function(a) {
				l.selectedComponents.push(b.find("#inside_" + a))
			}), d.initWithElements(l.selectedComponents)
		}, l.resizeStart = function() {
			l.initCollisionDetectorWithElements(), j = d.bigDetectionBoxPointA, k = d.bigDetectionBoxPointB, f = d.minimumWidth, g = d.minimumHeight
		}, l.checkTopBorder = function(a, b) {
			return this
		}, l.checkRightBorder = function(a, b) {
			return this
		}, l.checkLeftBorder = function(a, b) {
			return this
		}, l.checkBottomBorder = function(a, b) {
			return this
		}, l.checkMinHeight = function(a, b, c, d) {
			var e = Math.floor(c - d);
			return a.deltaY * b > e && (a.deltaY = e * b), this
		}, l.checkMinWidth = function(a, b, c, d) {
			var e = Math.floor(c - d);
			return a.deltaX * b > e && (a.deltaX = e * b), this
		}, l.compResizeWithRatio = function(a, b) {
			switch (b) {
			case c.RESIZE_SE:
				angular.forEach(d.editArea.detectionBoxs, function(b) {
					var c = parseInt(a.deltaY * b.ratio, 10),
						d = a.deltaY,
						e = {
							deltaX: c,
							deltaY: d
						};
					l.checkRightBorder(e, b.startPointB).checkBottomBorder(e, b.startPointB).checkMinHeight(e, -1, b.elementHeight, i).checkMinWidth(e, -1, b.elementWidth, h), c !== e.deltaX && (d = e.deltaX / b.ratio, e.deltaY = Math.abs(d) < Math.abs(e.deltaY) ? d : e.deltaY), a.deltaY = e.deltaY, a.deltaX = e.deltaX
				});
				break;
			case c.RESIZE_SW:
				angular.forEach(d.editArea.detectionBoxs, function(b) {
					var c = parseInt(-a.deltaY * b.ratio, 10),
						d = a.deltaY,
						e = {
							deltaX: c,
							deltaY: d
						};
					l.checkLeftBorder(e, b.startPointA).checkBottomBorder(e, b.startPointB).checkMinHeight(e, -1, b.elementHeight, i).checkMinWidth(e, 1, b.elementWidth, h), c !== e.deltaX && (d = -e.deltaX / b.ratio, e.deltaY = Math.abs(d) < Math.abs(e.deltaY) ? d : e.deltaY), a.deltaY = e.deltaY, a.deltaX = e.deltaX
				});
				break;
			case c.RESIZE_NE:
				angular.forEach(d.editArea.detectionBoxs, function(b) {
					var c = parseInt(-a.deltaY * b.ratio, 10),
						d = a.deltaY,
						e = {
							deltaX: c,
							deltaY: d
						};
					l.checkTopBorder(e, b.startPointA).checkRightBorder(e, b.startPointB).checkMinHeight(e, 1, b.elementHeight, i).checkMinWidth(e, -1, b.elementWidth, h), c !== e.deltaX && (d = -e.deltaX / b.ratio, e.deltaY = Math.abs(d) < Math.abs(e.deltaY) ? d : e.deltaY), a.deltaY = e.deltaY, a.deltaX = e.deltaX
				});
				break;
			case c.RESIZE_NW:
				angular.forEach(d.editArea.detectionBoxs, function(b) {
					var c = parseInt(a.deltaY * b.ratio, 10),
						d = a.deltaY,
						e = {
							deltaX: c,
							deltaY: d
						};
					l.checkLeftBorder(e, b.startPointA).checkTopBorder(e, b.startPointA).checkMinHeight(e, 1, b.elementHeight, i).checkMinWidth(e, 1, b.elementWidth, h), c !== e.deltaX && (d = e.deltaX / b.ratio, e.deltaY = Math.abs(d) < Math.abs(e.deltaY) ? d : e.deltaY), a.deltaY = e.deltaY, a.deltaX = e.deltaX
				})
			}
			return this
		}, l.resizeMove = function(a, b, e) {
			var k = {
				deltaX: e.deltaX,
				deltaY: e.deltaY
			},
				m = null;
			switch (b) {
			case c.RESIZE_W:
				l.checkLeftBorder(k, j).checkMinWidth(k, 1, f, h), m = {
					x: k.deltaX,
					y: 0,
					width: -k.deltaX,
					height: 0
				}, angular.forEach(d.editArea.detectionBoxs, function(a) {
					a.element.css({
						left: a.left + k.deltaX,
						width: a.elementWidth - k.deltaX
					})
				});
				break;
			case c.RESIZE_E:
				m = {
					x: 0,
					y: 0,
					width: k.deltaX,
					height: 0
				}, angular.forEach(d.editArea.detectionBoxs, function(a) {
					a.element.css("width", a.elementWidth + k.deltaX)
				});
				break;
			case c.RESIZE_N:
				l.checkTopBorder(k, j).checkMinHeight(k, 1, g, i), m = {
					x: 0,
					y: k.deltaY,
					width: 0,
					height: -k.deltaY
				}, angular.forEach(d.editArea.detectionBoxs, function(a) {
					a.element.css({
						top: a.top + k.deltaY,
						height: a.elementHeight - k.deltaY
					})
				});
				break;
			case c.RESIZE_S:
				m = {
					x: 0,
					y: 0,
					width: 0,
					height: k.deltaY
				}, angular.forEach(d.editArea.detectionBoxs, function(a) {
					a.element.css("height", a.elementHeight + k.deltaY)
				});
				break;
			case c.RESIZE_SE:
				m = {
					x: 0,
					y: 0,
					width: k.deltaX,
					height: k.deltaY
				}, angular.forEach(d.editArea.detectionBoxs, function(a) {
					var b = a.elementHeight + k.deltaY,
						c = b * a.ratio;
					a.element.css({
						height: b,
						width: c
					})
				});
				break;
			case c.RESIZE_SW:
				m = {
					x: k.deltaX,
					y: 0,
					width: -k.deltaX,
					height: k.deltaY
				}, angular.forEach(d.editArea.detectionBoxs, function(a) {
					var b = a.elementHeight + k.deltaY,
						c = b * a.ratio;
					a.element.css({
						left: a.left - (c - a.elementWidth),
						height: b,
						width: c
					})
				});
				break;
			case c.RESIZE_NE:
				m = {
					x: 0,
					y: k.deltaY,
					width: k.deltaX,
					height: -k.deltaY
				}, angular.forEach(d.editArea.detectionBoxs, function(a) {
					var b = a.elementHeight - k.deltaY,
						c = b * a.ratio;
					a.element.css({
						top: a.top + k.deltaY,
						height: b,
						width: c
					})
				});
				break;
			case c.RESIZE_NW:
				m = {
					x: k.deltaX,
					y: k.deltaY,
					width: -k.deltaX,
					height: -k.deltaY
				}, angular.forEach(d.editArea.detectionBoxs, function(a) {
					var b = a.elementHeight - k.deltaY,
						c = b * a.ratio;
					a.element.css({
						top: a.top + k.deltaY,
						left: a.left - (c - a.elementWidth),
						height: b,
						width: c
					})
				})
			}
			return angular.forEach(l.selectedComponents, function(a) {
				l.setChildrenSizeMove(a)
			}), m
		}, l.setChildrenSizeMove = function(a) {
			var b = a.children(".element-box"),
				c = {
					width: b.width(),
					height: b.height()
				};
			if ("4" == a.attr("ctype").charAt(0) || "n" == a.attr("ctype").charAt(0)) {
				var d = a.find("img"),
					e = d.width() / d.height(),
					f = c.width / c.height;
				e >= f ? (d.outerHeight(c.height), d.outerWidth(c.height * e), d.css("marginLeft", -(d.outerWidth() - c.width) / 2), d.css("marginTop", 0)) : (d.outerWidth(c.width), d.outerHeight(c.width / e), d.css("marginTop", -(d.outerHeight() - c.height) / 2), d.css("marginLeft", 0))
			} else "p" == a.attr("ctype").charAt(0) ? a.find(".fluxslider, .images, .image1, .image2").css({
				width: c.width,
				height: c.height
			}) : (a.find(".element").css({
				width: c.width,
				height: c.height
			}), ("i" == a.attr("ctype") || "d" == a.attr("ctype")) && a.find(".comp_counter").css({
				"line-height": c.height + "px"
			}))
		}, l.resizeEnd = function(a) {
			angular.forEach(l.selectedComponents, function(b, c) {
				l.setChildrenSizeEnd(a, b, c < l.selectedComponents.length - 1), a.$broadcast("updateMaxRadius", b)
			})
		}, l.setChildrenSizeEnd = function(a, c, d) {
			var f = c.position(),
				g = {
					width: c.width(),
					height: c.height(),
					left: f.left,
					top: f.top
				};
			if (("i" == c.attr("ctype") || "d" == c.attr("ctype")) && (g.lineHeight = g.height + "px"), "4" == c.attr("ctype").charAt(0) || "n" == c.attr("ctype").charAt(0)) {
				var h = c.find("img"),
					i = {
						width: g.width,
						height: g.height,
						left: g.left,
						top: g.top,
						imgStyle: {
							width: h.width(),
							height: h.height(),
							marginTop: h.css("marginTop"),
							marginLeft: h.css("marginLeft")
						}
					};
				e.updateCompSize(c.attr("id"), i, d)
			} else if ("p" == c.attr("ctype").charAt(0)) {
				var j = b.getProperties();
				if (!j || !j.children) return;
				var k = c.find(".slider"),
					l = k.attr("id");
				k.empty();
				for (var m = 0; m < j.children.length; m++) k.append('<img src="' + PREFIX_FILE_HOST + j.children[m].src + '">');
				utilPictures.deleteInterval(l), new flux.slider("#nr #" + l, {
					autoplay: j.autoPlay,
					delay: j.interval,
					pagination: !1,
					transitions: [utilPictures.getPicStyle(j.picStyle).name],
					width: g.width,
					height: g.height,
					bgColor: j.bgColor,
					onStartEnd: function(a) {
						utilPictures.addInterval(l, a)
					}
				}), e.updateCompSize(c.attr("id"), g, d)
			} else e.updateCompSize(c.attr("id"), g, d)
		}, l
	}]).factory("gridGuide", ["panStateTracker", "DetectionBox", "selectService", "editAreaBorderCollisionDetector", function(a, b, c, d) {
		var e = {
			init: function(a) {
				this.color = this.getColor() ? this.getColor() : "rgba(150, 150, 150, 0.2)", this.$container = a, this.render(), setTimeout(function() {
					"disable" != e.getVisable() && e.show()
				}, 1)
			},
			render: function() {
				this.domElement = $('<div class="eq-block-grid">'), this.canvasElement = $('<canvas class="eq-block-grid-inner">').appendTo(this.domElement)
			},
			show: function() {
				this.domElement.appendTo(this.$container), this.paint(), this.enabled = !0
			},
			hide: function() {
				this.domElement.remove(), this.enabled = !1
			},
			setVisable: function(a) {
				window.localStorage && localStorage.setItem("sceneGridVisable", a)
			},
			getVisable: function() {
				return window.localStorage ? localStorage.getItem("sceneGridVisable") : void 0
			},
			setColor: function(a) {
				window.localStorage && localStorage.setItem("sceneGridColor", a)
			},
			getColor: function() {
				return window.localStorage ? localStorage.getItem("sceneGridColor") : void 0
			},
			getGuideState: function() {
				return window.localStorage ? localStorage.getItem("sceneGridState") : void 0
			},
			setGuideState: function(a) {
				window.localStorage && localStorage.setItem("sceneGridState", a)
			},
			getSnapState: function() {
				return window.localStorage ? localStorage.getItem("sceneSnapState") : void 0
			},
			setSnapState: function(a) {
				window.localStorage && localStorage.setItem("sceneSnapState", a)
			},
			paint: function() {
				var a = 320,
					b = 486,
					c = this.getRows(),
					d = this.getCols(),
					e = Math.round(a / d),
					f = Math.round(b / c),
					g = (b - f * c) / 2;
				this.canvasElement.css({
					left: 0,
					top: 0
				}), this.canvasElement.attr({
					width: a,
					height: b
				});
				var h = this.canvasElement.get(0).getContext("2d");
				h.clearRect(0, 0, a, b);
				for (var i = 1; d > i; i++) h.fillStyle = this.color, h.fillRect(Math.floor(i * e), 0, 1, b);
				for (var j = 1; c > j; j++) h.fillStyle = this.color, h.fillRect(0, Math.floor(j * f) + g, a, 1)
			},
			getRows: function() {
				return 16
			},
			getCols: function() {
				return 10
			}
		},
			f = {
				snap: e.getSnapState() ? e.getSnapState() : !0,
				action: "move",
				threshold: 1,
				enabled: e.getGuideState() ? e.getSnapState() : !0
			},
			g = {
				init: function(a) {
					this.guides = {
						h: [],
						v: []
					}, this.slideBounds = {
						width: 320,
						height: 486,
						x: 0,
						y: 0
					}, this.render(), a.append(this.domElement), this.options = f
				},
				render: function() {
					this.domElement = $('<div class="eq-block-guides">')
				},
				start: function(d) {
					if (this.options.enabled) {
						this.allBlocks = [], a.forEach(function(a, c) {
							g.allBlocks.push(new b(a))
						}), this.targetBlocks = [], angular.forEach(c.getElements(), function(a) {
							g.allBlocks.forEach(function(b) {
								b.element.attr("id") == "inside_" + a && g.targetBlocks.push(b)
							})
						}), this.gridLines = [];
						var h = e.getCols(),
							i = e.getRows(),
							j = Math.round(this.slideBounds.width / h),
							k = Math.round(this.slideBounds.height / i),
							l = (this.slideBounds.height - k * i) / 2;
						if (e.enabled) {
							for (var m = 1; h > m; m++) this.gridLines.push(this.getCenterEdge({
								x: m * j,
								y: 0,
								width: 0,
								height: this.slideBounds.height
							}, "grid-col-" + m, "horizontal"));
							for (var n = 1; i > n; n++) this.gridLines.push(this.getCenterEdge({
								x: 0,
								y: n * k + l,
								width: this.slideBounds.width,
								height: 0
							}, "grid-row-" + n, "vertical"))
						}
						this.gridLines.push(this.getCenterEdge({
							x: this.slideBounds.width / 2,
							y: 0,
							width: 0,
							height: this.slideBounds.height
						}, "grid-col-center", "horizontal")), this.gridLines.push(this.getCenterEdge({
							x: 0,
							y: this.slideBounds.height / 2,
							width: this.slideBounds.width,
							height: 0
						}, "grid-row-center", "vertical")), this.options = $.extend(f, d)
					}
				},
				stop: function() {
					this.clearGuideElements()
				},
				sync: function(a) {
					this.options.enabled && (this.findGuides(a), this.renderGuides())
				},
				findGuides: function(a) {
					a = angular.extend({
						x: 0,
						y: 0,
						width: 0,
						height: 0
					}, a), this.guides.h.length = 0, this.guides.v.length = 0;
					var b = {
						x: d.bigDetectionBoxPointA.x + a.x,
						y: d.bigDetectionBoxPointA.y + a.y,
						width: d.bigDetectionBoxPointB.x - d.bigDetectionBoxPointA.x + a.width,
						height: d.bigDetectionBoxPointB.y - d.bigDetectionBoxPointA.y + a.height
					},
						c = this.getEdges(b, "target-bounds", "resize" === this.options.action);
					this.combinedBounds = b, this.allBlocks.forEach(function(a) {
						-1 === g.targetBlocks.indexOf(a) && g.compageEdges(c, g.getEdges(a.measure(), a.getID()), g.options.threshold)
					}), this.gridLines.forEach(function(a) {
						g.compageEdges(c, a, g.options.threshold)
					}), this.guides.h.sort(function(a, b) {
						return a.distance - b.distance
					}), this.guides.v.sort(function(a, b) {
						return a.distance - b.distance
					})
				},
				enforceGuides: function(a) {
					if (this.options.enabled) {
						var b = this.options.threshold;
						this.options.threshold = 3, this.findGuides(a), this.options.threshold = b;
						var c, d = 0,
							e = 0;
						this.guides.h.length && (c = this.guides.h[0], d = c.compareEdge.x - c.targetEdge.x), this.guides.v.length && (c = this.guides.v[0], e = c.compareEdge.y - c.targetEdge.y), a.x += d, a.y += e
					}
				},
				compageEdges: function(a, b, c) {
					var d;
					a.h.forEach(function(a) {
						b.h.forEach(function(b) {
							d = Math.abs(a.x - b.x), c > d && g.guides.h.push({
								distance: d,
								targetEdge: a,
								compareEdge: b
							})
						})
					}), a.v.forEach(function(a) {
						b.v.forEach(function(b) {
							d = Math.abs(a.y - b.y), c > d && g.guides.v.push({
								distance: d,
								targetEdge: a,
								compareEdge: b
							})
						})
					})
				},
				renderGuides: function() {
					var a = [];
					this.guides.h.forEach(function(b) {
						a.push(g.renderGuide(b))
					}), this.guides.v.forEach(function(b) {
						a.push(g.renderGuide(b))
					}), this.clearGuideElements(a)
				},
				renderGuide: function(a) {
					var b = a.targetEdge,
						c = a.compareEdge,
						d = $('[data-guide-id="' + c.id + '"]');
					0 === d.length && (d = $('<div data-guide-id="' + c.id + '">').appendTo(this.domElement), setTimeout(function() {
						d.addClass("show")
					}, 1));
					var e = {
						top: Math.min(c.bounds.y, this.combinedBounds.y),
						right: Math.max(c.bounds.x + c.bounds.width, this.combinedBounds.x + this.combinedBounds.width),
						bottom: Math.max(c.bounds.y + c.bounds.height, this.combinedBounds.y + this.combinedBounds.height),
						left: Math.min(c.bounds.x, this.combinedBounds.x)
					};
					if ("number" == typeof c.y) {
						var f = "s" === b.direction ? -1 : 0;
						d.addClass("guide-h"), d.css({
							top: Math.floor(c.y + f),
							left: e.left,
							width: e.right - e.left
						})
					} else {
						var g = "e" === b.direction ? -1 : 0;
						d.addClass("guide-v"), d.css({
							left: Math.floor(c.x + g),
							top: e.top,
							height: e.bottom - e.top
						})
					}
					return c.id
				},
				getEdges: function(a, b, c) {
					var d = {
						h: [{
							id: b + "-h1",
							bounds: a,
							x: a.x,
							offset: 0,
							direction: "w"
						}, {
							id: b + "-h2",
							bounds: a,
							x: a.x + a.width / 2,
							offset: -a.width / 2,
							direction: "hc"
						}, {
							id: b + "-h3",
							bounds: a,
							x: a.x + a.width,
							offset: -a.width,
							direction: "e"
						}],
						v: [{
							id: b + "-v1",
							bounds: a,
							y: a.y,
							offset: 0,
							direction: "n"
						}, {
							id: b + "-v2",
							bounds: a,
							y: a.y + a.height / 2,
							offset: -a.height / 2,
							direction: "vc"
						}, {
							id: b + "-v3",
							bounds: a,
							y: a.y + a.height,
							offset: -a.height,
							direction: "s"
						}]
					};
					return c && (d.h.splice(1, 1), d.v.splice(1, 1)), d
				},
				getCenterEdge: function(a, b, c) {
					var d = {
						h: [],
						v: []
					};
					return "vertical" === c ? d.v.push({
						id: b + "-v2",
						bounds: a,
						y: a.y + a.height / 2,
						offset: -a.height / 2,
						direction: b
					}) : d.h.push({
						id: b + "-h2",
						bounds: a,
						x: a.x + a.width / 2,
						offset: -a.width / 2,
						direction: b
					}), d
				},
				clearGuideElements: function(a) {
					var b = this.domElement.find(".guide-v, .guide-h");
					a && a.length && (b = b.filter(function(b, c) {
						return -1 === a.indexOf(c.getAttribute("data-guide-id"))
					})), b.remove()
				}
			};
		return {
			grid: e,
			guide: g
		}
	}]).directive("pasteElement", ["sceneService", function(a) {
		function b() {
			var b = $('<ul id="pasteMenu" class="dropdown-menu" style="min-width: 100px; display: block;" role="menu" aria-labelledby="dropdownMenu1"><li class="paste" style="text-align:center;" role="presentation"><a role="menuitem" tabindex="-1"><div class="fa fa-paste"></div>&nbsp;&nbsp;粘贴</a></li></ul>').css({
				position: "absolute",
				"user-select": "none"
			});
			return b.find(".paste").on("click", function() {
				a.pasteElement(), b.hide()
			}), b
		}
		return {
			restrict: "EA",
			link: function(c, d, e) {
				var f = $(d);
				f.on("contextmenu", function(c) {
					if (a.getCopy()) {
						var d = b(),
							e = $("#eq_main"),
							f = $("#pasteMenu");
						f.length > 0 && f.remove(), e.append(d), d.css({
							left: c.pageX + e.scrollLeft() + 15,
							top: c.pageY + e.scrollTop()
						}).show(), e.mousemove(function(a) {
							var b = $("#pasteMenu");
							(a.pageX < b.offset().left - 20 || a.pageX > b.offset().left + b.width() + 20 || a.pageY < b.offset().top - 20 || a.pageY > b.offset().top + b.height() + 20) && (b.hide(), $(this).unbind("mousemove"))
						})
					}
					return !1
				})
			}
		}
	}]).directive("eqxEditDestroy", ["selectService", function(a) {
		return {
			link: function(b, c) {
				c.on("$destroy", function() {
					a.clearElements(), utilPictures.clearInterval()
				})
			}
		}
	}]).directive("elementAnim", ["selectService", function(a) {
		function b(a, c, d, e) {
			if (c.length && e < c.length) {
				var f = a.get(0);
				a.css("animation", ""), f.offsetWidth = f.offsetWidth, a.css("animation", d[e] + " " + c[e].duration + "s ease 0s").css("animation-fill-mode", "backwards"), a.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
					e++, b(a, c, d, e)
				})
			}
		}
		return {
			restrict: "EA",
			link: function(a, c) {
				var d;
				a.$on("previewCurrentChange", function(a, b) {
					d = d = $("#inside_" + b.elemId + " .element-box");
					var c = d.get(0);
					c.offsetWidth = c.offsetWidth, d.css("animation", b.animClasses[b.count] + " " + b.anim.duration + "s ease 0s").css("animation-fill-mode", "backwards")
				}), a.$on("previewAllChanges", function(a, c) {
					d = d = $("#inside_" + c.elemId + " .element-box"), b(d, c.animations, c.animClasses, c.count)
				})
			}
		}
	}]).directive("outerBox", ["DetectionBox", "i18nNotifications", "storageService", function(a, b, c) {
		return {
			restrict: "AE",
			link: function(d, e, f, g) {
				function h(a) {
					"red" == a ? (i.show(), i.css("background-color", "#ff5548"), e.find(".internal-box").toggleClass("out-warning", !1), isOuter = !0) : "yellow" == a ? (i.show(), isOuter = !1, i.css("background-color", "#F2A653"), k && e.find(".internal-box").toggleClass("out-warning", !0)) : (isOuter = !1, e.find(".internal-box").toggleClass("out-warning", !1), i.hide()), k && e.toggleClass("on", isOuter)
				}
				var i = $("#warn"),
					j = "";
				i.click(function() {
					"red" == j ? (b.removeAll(), b.pushForCurrentRoute("outbox.warning", "notify.warning")) : "yellow" == j && (b.removeAll(), b.pushForCurrentRoute("outbox.tip", "notify.warning"))
				});
				var k = "false" == c.get("create.phoneView") ? !0 : !1;
				k || (e.css("border-color", "transparent"), e.find(".internal-box").css("border-color", "transparent")), d.$on("switchBox", function(a, b) {
					k = !b, b ? (e.css("border-color", "transparent"), e.find(".internal-box").css("border-color", "transparent")) : (e.css("border-color", ""), e.find(".internal-box").css("border-color", ""), h(j))
				}), d.$on("boxOuter", function(c) {
					for (var e = "", f = d.tpl.obj.elements, g = 0; g < f.length; g++) if (3 != f[g].type) {
						var i = f[g].id,
							l = $("#inside_" + i);
						if (0 != l.length) {
							var m = l.position(),
								n = new a(l);
							if (k && (m.left < -29 || m.top < -19 || n.startPointB.y > 501 || n.startPointB.x > 345)) {
								e = "red";
								break
							}(m.left < -1 || m.top < -1 || n.startPointB.y > 486 || n.startPointB.x > 320) && (e = "yellow")
						}
					}
					j != e && ("red" == e ? (b.removeAll(), b.pushForCurrentRoute("outbox.warning", "notify.warning")) : "yellow" == e ? (b.removeAll(), b.pushForCurrentRoute("outbox.tip", "notify.warning")) : b.removeAll()), j = e, h(e)
				})
			}
		}
	}]), angular.module("app.directives.editor", []).directive("toolbar", ["$compile", "sceneService", function(a, b) {
		function c(c, e, f) {
			var g = b.currentElemDef;
			"x" == g.type ? (c.showCustomFamilyFont = !0, c.showLinkOption = !1, d(c)) : (c.showCustomFamilyFont = !1, c.showLinkOption = !0), e.bind("keydown", function(a) {
				a.stopPropagation()
			}), c.internalLinks = angular.copy(c.pages), c.internalLink || c.externalLink || (c.internalLink = c.internalLinks[0], c.externalLink = "http://");
			try {
				c.fontColor = $(g.content).css("color"), c.backgroundColor = $(g.content).css("background-color")
			} catch (h) {}
			var i = ["#000000", "#7e2412", "#ff5400", "#225801", "#0c529e", "#333333", "#b61b52", "#f4711f", "#3bbc1e", "#23a3d3", "#888888", "#d34141", "#f7951e", "#29b16a", "#97daf3", "#cccccc", "#ec7c7c", "#fdea02", "#79c450", "#563679", "#ffffff", "#ffcccc", "#d9ef7f", "#c3f649"],
				j = $(".color-menu"),
				k = $(".bgcolor-menu");
			$.each(i, function(a, b) {
				j.append($('<li><a dropdown-toggle class="btn" data-edit="foreColor ' + b + '" style="background-color: ' + b + '"></a></li>'))
			}), a(j.append($('<li style="position: relative;"><a ng-model="fontColor" ng-click="setSelection()" colorpicker-Position="sceneToobar" class="btn glyphicon glyphicon-remove" colorpicker="rgba" style="background-color: transparent"></a><em style="background-color:#ff5448;position:absolute;height:10px;width:10px;top:0;left:0;z-index:-1"></em><em style="background-color:#f2a653;position:absolute;height:10px;width:10px;top:0;left:10px;z-index:-1"></em><em style="background-color:#08a1ef;position:absolute;height:10px;width:10px;top:10px;left:0;z-index:-1"></em><em style="background-color:#44cb83;position:absolute;height:10px;width:10px;top:10px;left:10px;z-index:-1"></em></li>')))(c), c.$watch("fontColor", function(a, b) {
				a && a != b && document.execCommand("foreColor", 0, a)
			});
			var l = function(a) {
					var b = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
					a = a.replace(b, function(a, b, c, d) {
						return b + b + c + c + d + d
					});
					var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
					return c ? {
						r: parseInt(c[1], 16),
						g: parseInt(c[2], 16),
						b: parseInt(c[3], 16)
					} : null
				};
			$.each(i, function(a, b) {
				var c = l(b);
				k.append($('<li><a dropdown-toggle class="btn" data-edit="backColor rgba(' + c.r + "," + c.g + "," + c.b + ', 0.3)" style="background-color: rgba(' + c.r + "," + c.g + "," + c.b + ', 0.3)"></a></li>'))
			}), a(k.append($('<li style="position: relative;"><a ng-model="backgroundColor" ng-click="setSelection()" colorpicker="rgba" colorpicker-Position="sceneToobar" class="btn glyphicon glyphicon-remove" style="background-color: transparent"></a><em style="background-color:#ff5448;position:absolute;height:10px;width:10px;top:0;left:0;z-index:-1"></em><em style="background-color:#f2a653;position:absolute;height:10px;width:10px;top:0;left:10px;z-index:-1"></em><em style="background-color:#08a1ef;position:absolute;height:10px;width:10px;top:10px;left:0;z-index:-1"></em><em style="background-color:#44cb83;position:absolute;height:10px;width:10px;top:10px;left:10px;z-index:-1"></em></li>')))(c), c.$watch("backgroundColor", function(a) {
				a && document.execCommand("backColor", 0, a)
			}), c.setSelection = function() {
				var a = window.getSelection();
				a.getRangeAt && a.rangeCount && a.getRangeAt(0), a.modify("move", "left", "documentboundary"), a.modify("extend", "right", "documentboundary")
			}, g.css.lineHeight = (parseFloat(g.css.lineHeight) || 1).toFixed(1), c.increaseLineHeight = function() {
				var a = window.getSelection(),
					b = a.focusNode,
					c = $(b).parents(".element-box");
				g.css.lineHeight = (parseFloat(g.css.lineHeight) + .1).toFixed(1), c.css("line-height", g.css.lineHeight), $(b.parentNode).focus()
			}, c.decreaseLineHeight = function() {
				var a = window.getSelection(),
					b = a.focusNode,
					c = $(b).parents(".element-box");
				g.css.lineHeight > .1 && (g.css.lineHeight = (parseFloat(g.css.lineHeight) - .1).toFixed(1), c.css("line-height", g.css.lineHeight)), $(b.parentNode).focus()
			}
		}
		function d(a) {
			var b = utilFont.getFontName(),
				c = $(".fontname-menu");
			$.each(b, function(a, b) {
				c.append($('<li class="' + a + '"><a dropdown-toggle class="btn" data-edit="fontName ' + a + '"><img src="' + CLIENT_CDN + b.blueSrc + '"/></a></li>')), $("." + a).hover(function() {
					$(this).find("img").attr("src", CLIENT_CDN + b.src)
				}, function() {
					$(this).hasClass("selected-font") || $(this).find("img").attr("src", CLIENT_CDN + b.blueSrc)
				})
			})
		}
		return {
			restrict: "EA",
			replace: !0,
			templateUrl: "directives/toolbar.tpl.html",
			link: c
		}
	}]), angular.module("app.directives.uislider", []).value("uiSliderConfig", {}).directive("uiSlider", ["uiSliderConfig", "$timeout", function(a, b) {
		return a = a || {}, {
			require: "ngModel",
			compile: function() {
				return function(c, d, e, f) {
					function g(a, b) {
						return b ? parseFloat(a) : parseInt(a, 10)
					}
					function h() {
						d.slider("destroy")
					}
					var i = angular.extend(c.$eval(e.uiSlider) || {}, a),
						j = {
							min: null,
							max: null
						},
						k = ["min", "max", "step"],
						l = angular.isUndefined(e.useDecimals) ? !1 : !0,
						m = function() {
							angular.isArray(f.$viewValue) && i.range !== !0 && (console.warn("Change your range option of ui-slider. When assigning ngModel an array of values then the range option should be set to true."), i.range = !0), angular.forEach(k, function(a) {
								angular.isDefined(e[a]) && (i[a] = g(e[a], l))
							}), d.slider(i), m = angular.noop
						};
					angular.forEach(k, function(a) {
						e.$observe(a, function(b) {
							b && (m(), i[a] = g(b, l), d.slider("option", a, g(b, l)), f.$render())
						})
					}), e.$observe("disabled", function(a) {
						m(), d.slider("option", "disabled", !! a)
					}), c.$watch(e.uiSlider, function(a) {
						m(), a !== undefined && d.slider("option", a)
					}, !0), b(m, 0, !0), d.bind("slide", function(a, b) {
						f.$setViewValue(b.values || b.value), c.$apply()
					}), f.$render = function() {
						m();
						var a = i.range === !0 ? "values" : "value";
						i.range || !isNaN(f.$viewValue) || f.$viewValue instanceof Array ? i.range && !angular.isDefined(f.$viewValue) && (f.$viewValue = [0, 0]) : f.$viewValue = 0, i.range === !0 && (angular.isDefined(i.min) && i.min > f.$viewValue[0] && (f.$viewValue[0] = i.min), angular.isDefined(i.max) && i.max < f.$viewValue[1] && (f.$viewValue[1] = i.max), f.$viewValue[0] > f.$viewValue[1] && (j.min >= f.$viewValue[1] && (f.$viewValue[0] = j.min), j.max <= f.$viewValue[0] && (f.$viewValue[1] = j.max)), j.min = f.$viewValue[0], j.max = f.$viewValue[1]), d.slider(a, f.$viewValue)
					}, c.$watch(e.ngModel, function() {
						i.range === !0 && f.$render()
					}, !0), d.bind("$destroy", h);
					var n = $('<div class="ui-slider-progress-bar"></div>');
					d.append(n);
					var o = c.$watch(e.ngModel, function() {
						setTimeout(function() {
							n.css("width", $(".ui-slider-handle", d).css("left"))
						})
					}, !0);
					d.bind("$destroy", function() {
						o()
					})
				}
			}
		}
	}]).directive("uiSliderT", ["$rootScope", function(a) {
		var b = $(document);
		return {
			require: "ngModel",
			template: '<div class="slider-con"></div>',
			link: function(c, d, e, f) {
				d.on("$destroy", function() {
					d.unbind("mousedown")
				});
				var g = "string" == typeof e.min ? e.min : -Number.MAX_VALUE,
					h = "string" == typeof e.max ? e.max : Number.MAX_VALUE,
					i = "string" == typeof e.step ? e.step : 1,
					j = h / 100,
					k = "string" == typeof e.max ? e.fixed : 0;
				f.$render = function() {
					d.find(".slider-con").css("width", 100 * f.$modelValue / h + "%")
				}, d.mousedown(function(d) {
					d.stopPropagation();
					var l, m = d.offsetX,
						n = d.pageX,
						o = function(a) {
							a.stopPropagation(), l = a.pageX - n;
							var b = +((m + l) * j / i).toFixed(k) * i;
							b > h ? b = +h : g > b && (b = +g), f.$viewValue != b && (f.$setViewValue(b), f.$render(), c.$apply())
						},
						p = function() {
							b.unbind("mouseup", p), b.unbind("mousemove", o), e.hisRecords && a.$broadcast("hisChange")
						};
					b.mousemove(o), b.mouseup(p)
				}), d.click(function(b) {
					b.stopPropagation(), f.$setViewValue(+(b.offsetX * h / 100 / i).toFixed(k) * i), f.$render(), c.$apply(), e.hisRecords && a.$broadcast("hisChange")
				})
			}
		}
	}]), angular.module("security.authority", []).factory("authority", ["$translate", function(a) {
		var b = {
			GROUP_CUSTOMER: 1,
			SCENE_HIDE_LASTPAGE_SETTING: 2,
			TRANSFER_SCENE: 4,
			SCENE_EDIT_TRIGGER: 8,
			EXPAND_WEBSITE: 16,
			SCENE_EDIT_SOUND: 32,
			ACCESS_NEW_PAGEFLIP: 64,
			COMP_ANIMATION: 128,
			RADIO_CHECKBOX_RATING: 256,
			INTERACTION: 512,
			ACCESS_DOMAIN_BIND: 1024,
			LOADING_LOGO: 2048,
			TEMPLATE_PAYMENT: 4096,
			INTERACTION_COUNTER: 8192,
			SCENE_PASSWORD: 16384,
			USERCENTER_HISTORY: 32768,
			APPLY_XIUKE: 65536,
			SHAKE_TRIGGER: 131072
		},
			c = {
				1: {
					code: 74045,
					name: a.instant("common.security.CUSTOM_USER")
				},
				2: {
					code: 61439,
					name: a.instant("common.security.COMPANY_USER")
				},
				21: {
					code: 59903,
					name: a.instant("common.security.COMPANY_USER2")
				},
				3: {
					code: 193535,
					name: a.instant("common.security.SENIOR_USER")
				},
				4: {
					code: 128511,
					name: a.instant("common.security.SERVICE_USER")
				},
				12: {
					code: 127999,
					name: a.instant("common.security.VIP_USER")
				}
			};
		return {
			accessDef: b,
			userRoleDef: c
		}
	}]), angular.module("security.authorization", ["security.service"]).provider("securityAuthorization", {
		requireAdminUser: ["securityAuthorization", function(a) {
			return a.requireAdminUser()
		}],
		requireAuthenticatedUser: ["securityAuthorization", function(a) {
			return a.requireAuthenticatedUser()
		}],
		$get: ["security", "securityRetryQueue", function(a, b) {
			var c = {
				requireAuthenticatedUser: function() {
					var d = a.requestCurrentUser().then(function(d) {
						return a.isAuthenticated() ? void 0 : b.pushRetryFn("unauthenticated-client", c.requireAuthenticatedUser)
					});
					return d
				},
				requireAdminUser: function() {
					var d = a.requestCurrentUser().then(function(d) {
						return a.isAdmin() ? void 0 : b.pushRetryFn("unauthorized-client", c.requireAdminUser)
					});
					return d
				}
			};
			return c
		}]
	}), angular.module("security", ["security.service", "security.interceptor", "security.login", "security.authorization"]), angular.module("security.interceptor", ["security.retryQueue"]).factory("securityInterceptor", ["$injector", "$location", "securityRetryQueue", "$translate", function(a, b, c) {
		return function(d) {
			return d.then(null, function(e) {
				return 401 === e.status && (d = c.pushRetryFn("unauthorized-server", function() {
					return a.get("$http")(e.config)
				})), 403 === e.status && (alert("对不起，您没有查看此内容的权限"), b.path("/home")), d
			})
		}
	}]).config(["$httpProvider", function(a) {
		a.responseInterceptors.push("securityInterceptor");
		var b = [PREFIX_URL + "login", PREFIX_URL + "index.php?c=scene&a=createpage&id=", PREFIX_URL + "m/scene/pageList", PREFIX_URL + "index.php?c=upfile&a=upload", PREFIX_URL + "m/c/group/create", PREFIX_URL + "index.php?c=scene&a=my", PREFIX_URL + "index.php?c=scene&a=syslist", PREFIX_URL + "index.php?c=scene&a=saveSettings", PREFIX_URL + "m/scene/stat"];
		a.interceptors.push(["$q", function(a) {
			var c = 0;
			return {
				request: function(d) {
					var e = d.url;
					for (i = 0; i < b.length; i++) 0 === e.indexOf(b[i]) && ($("#loading").show(), c++);
					return d || a.when(d)
				},
				response: function(d) {
					var e = d.config.url;
					for (i = 0; i < b.length; i++) 0 === e.indexOf(b[i]) && (c--, c || $("#loading").hide());
					return d || a.when(d)
				}
			}
		}])
	}]), angular.module("security.login.form", ["services.localizedMessages", "app.directives.addelement", "security.thirdparty"]).controller("LoginFormController", ["$scope", "$timeout", "$window", "$translate", "security", "localizedMessages", "$location", "$sce", "thirdpartyService", "dataCacheService", function(a, b, c, d, e, f, g, h, i, j) {
		if (a.user = {}, a.retrieve = {}, a.showLogin = !0, a.sendPassword = !1, a.unExist = !1, a.authError = null, a.isValidateCodeLogin = e.isValidateCodeLogin, a.validateCodeSrc = PREFIX_URL + "servlet/validateCodeServlet", a.authReason = null, e.getLoginReason() && (a.authReason = e.isAuthenticated() ? f.get("login.reason.notAuthorized") : "您的账号已在其它地方登录，如非本人操作，请立即修改密码确保账号安全！"), window.localStorage) {
			var k = localStorage.getItem("userEmail");
			k && (a.user.email = k)
		}
		a.rotate = function(c) {
			$(".modal-content").addClass("flip"), $(".login-form-section").fadeOut(600), b(function() {
				a.showLogin = !c, $(".login-form-section").fadeIn(0), $(".modal-content").removeClass("flip")
			}, 600)
		}, a.login = function() {
			a.user.rememberAcc && a.user.email ? localStorage.setItem("userEmail", a.user.email) : localStorage.removeItem("userEmail"), a.authError = null;
			var b = {
				username: a.user.email,
				password: a.user.password,
				rememberMe: a.user.rememberMe
			};
			return !a.isValidateCodeLogin || (b.geetest_challenge = challenge, b.geetest_validate = validate, b.geetest_seccode = seccode, challenge && validate && seccode) ? a.user.email ? a.user.password ? void e.login($.param(b)).then(function(b) {
				challenge = null, validate = null, seccode = null, j.clear(), b ? (selectorA && selectorA(".gt_refresh_button").click(), 1005 === b.code, b.map && (a.isValidateCodeLogin = b.map.isValidateCodeLogin), a.authReason = "", a.authError = b.msg) : (a.authError = f.get("login.error.invalidCredentials"), submit = !1)
			}, function(b) {
				a.authError = f.get("login.error.serverError", {
					exception: b
				})
			}) : (a.authReason = "", void(a.authError = "密码不能为空")) : (a.authReason = "", void(a.authError = "邮箱不能为空")) : (a.authReason = "", void(a.authError = "验证码不能为空"))
		}, a.openRegister = function() {
			g.path("/home/register", !1)
		}, a.clearForm = function() {
			a.user = {}
		}, a.cancelLogin = function() {
			e.cancelLogin()
		}, a.reset = function() {
			a.user = {}, a.retrieve = {}
		};
		var l = "http://api.geetest.com/get.php?gt=1ebc844c9e3a8c23e2ea4b567a8afd2d&time=" + (new Date).getTime();
		a.validateCodeUrl = h.trustAsResourceUrl(l), b(function() {
			$('input[name="userEmail"]').focus()
		}, 300), a.retrievePassword = function() {
			return a.retrieve.email ? submit ? challenge && validate && seccode ? void e.retrievePassword(a.retrieve.email, challenge, validate, seccode).then(function(b) {
				challenge = "", validate = "", seccode = "", 200 == b.data.code ? (a.sendPassword = !0, submit = !1) : (selectorA && selectorA(".gt_refresh_button").click(), 1003 == b.data.code ? a.retrieveError = "账号不存在" : 1005 == b.data.code && (a.retrieveError = "验证码错误"))
			}) : void(a.retrieveError = "验证码不能为空") : void(a.retrieveError = "验证码匹配错误") : void(a.retrieveError = "邮箱不能为空")
		}, a.openThirdPatyWindow = function(a) {
			e.cancelLogin(), i.openThirtyPartyWindow(a)
		}
	}]), angular.module("security.login.reset", ["services.localizedMessages"]).controller("ResetFormController", ["$scope", "security", "localizedMessages", "$location", "resetKey", function(a, b, c, d, e) {
		a.password = {}, a.checkPassword = function() {
			if (a.password.newPw) {
				if (/^[a-zA-Z0-9]{6,16}$/g.test(a.password.newPw)) return a.passError = null, !0;
				a.passError = "密码为6~16个字符(英文字母或数字，区分大小写)"
			} else a.passError = "新密码不能为空";
			return !1
		}, a.checkRepeatPassword = function() {
			if (a.password.confirm) {
				if (a.password.confirm == a.password.newPw) return a.rPassError = "", !0;
				a.rPassError = "两次密码输入不一致，请重新输入"
			} else a.rPassError = "确认密码不能为空";
			return !1
		}, a.reset = function() {
			a.checkPassword() && a.checkRepeatPassword() && b.resetPassByKey(a.password.newPw, e).then(function(b) {
				200 == b.data.code ? (alert("修改成功"), a.$close(), d.path("/main").search({})) : 1011 == b.data.code && (a.authError = b.data.msg)
			})
		}, a.cancel = function() {
			a.$dismiss()
		}
	}]).directive("equals", function() {
		return {
			restrict: "A",
			require: "?ngModel",
			link: function(a, b, c, d) {
				if (d) {
					a.$watch(c.ngModel, function() {
						e()
					}), c.$observe("equals", function(a) {
						e()
					});
					var e = function() {
							var a = d.$viewValue,
								b = c.equals;
							d.$setValidity("equals", a === b)
						}
				}
			}
		}
	}), angular.module("security.login", ["security.login.form", "security.login.reset", "security.login.toolbar"]), angular.module("security.login.toolbar", ["services.usercenter"]).directive("loginToolbar", ["security", "$rootScope", "usercenterService", "$location", function(a, b, c, d) {
		var e = {
			templateUrl: "security/login/toolbar.tpl.html",
			restrict: "E",
			replace: !0,
			scope: !0,
			link: function(c, e, f, g) {
				c.PREFIX_FILE_HOST = PREFIX_FILE_HOST, c.isAuthenticated = a.isAuthenticated, c.login = a.showLogin, c.logout = a.logout, c.requestResetPassword = a.requestResetPassword, c.isAdvancedUser = b.isAdvancedUser, c.isEditor = b.isEditor, c.isVendorUser = b.isVendorUser, c.$watch(function() {
					return a.currentUser
				}, function(a) {
					c.currentUser = a, c.currentUser.headImg ? /^http.*/.test(a.headImg) && (c.headImg = a.headImg) : c.headImg = CLIENT_CDN + "assets/images/defaultuser.jpg"
				}), c.$on("headImg.change", function(a, b) {
					c.currentUser.headImg = b
				}), c.$on("minusCount", function(a, b) {
					c.count -= b, c.newMsgCount = c.count > 9 ? "9+" : c.count
				}), c.changeCurrent = function() {
					b.branchid = "", d.search("branchid", null), d.path("/usercenter/children")
				}, c.openMsgPanel = function() {
					!$(".mes_con").hasClass("open")
				}
			}
		};
		return e
	}]), angular.module("security.otherregister.form", ["services.localizedMessages", "app.directives.register"]), angular.module("security.otherregister.form").controller("OtherRegisterFormController", ["$scope", "$timeout", "security", "localizedMessages", "$location", "$http", "$window", "otherRegisterInfo", function(a, b, c, d, e, f, g, h) {
		a.user = {}, a.user.agreement = !0, a.getUserDetail = function() {
			var b = {
				type: "qq",
				openId: h.openId,
				accessToken: h.accessToken
			};
			c.getUserDetail(b.type, b.openId, b.accessToken).then(function(b) {
				a.otherUserInfo = b.data.obj
			})
		}, a.getUserDetail()
	}]), angular.module("security.register.form", ["services.localizedMessages", "app.directives.register", "security.thirdparty"]), angular.module("security.register.form").controller("RegisterFormController", ["$scope", "$timeout", "$translate", "security", "localizedMessages", "$location", "$http", "$window", "thirdpartyService", "regMsg", function(a, b, c, d, e, f, g, h, i, j) {
		j ? a.user = j : a.user = {}, a.user.agreement = !0, a.regErr = "注册一个有效的账号，更好体验功能";
		var k = !1;
		a.openWeibo = function() {
			alert("新浪微博注册功能即将开放")
		}, a.register = function() {
			var b = {
				loginName: a.user.email,
				password: a.user.password
			};
			a.userNotExist && a.checkUsername() && a.checkPassword() && a.checkRepeatPassword() && l && l.then(function() {
				if (a.user.password === a.user.repeatPassword && a.user.agreement) {
					if (k) return;
					k = !0;
					var c = "";
					location.hash.indexOf("?") >= 0 && (c = location.hash.replace("#/home/register", "")), d.register($.param(b), c).then(function(b) {
						k = !1, b && (a.regErr = b.msg)
					}, function(b) {
						k = !1, a.regErr = e.get("register.error.serverError", {
							exception: b
						})
					})
				} else a.user.password != a.user.repeatPassword ? a.regErr = e.get("register.error.match") : a.regErr = e.get("register.error.agreement")
			})
		};
		var l = null;
		a.checkUniqueness = function(b) {
			l = d.checkUniqueness(b).success(function(b) {
				a.userNotExist = b.success, a.userNotExist ? a.usernameError = null : a.usernameError = "账号已存在，请重新填写"
			})
		}, a.checkIconUser = "", a.checkIconPass = "", a.checkIconRePass = "", a.checkUsername = function() {
			if (a.user.email) {
				if (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(a.user.email)) return a.checkUniqueness(a.user.email), !0;
				a.usernameError = "账号为6-40个字符(英文字母或数字，只支持小写)以及-_@.的组合"
			} else a.usernameError = "账号不能为空";
			return !1
		}, a.checkPassword = function() {
			if (a.user.password) {
				if (/^[a-zA-Z0-9]{6,16}$/g.test(a.user.password)) return a.passError = null, !0;
				a.passError = "密码为6~16个字符(英文字母或数字，区分大小写)"
			} else a.passError = "密码不能为空";
			return !1
		}, a.checkRepeatPassword = function() {
			if (a.user.repeatPassword) {
				if (a.user.repeatPassword == a.user.password) return a.rPassError = "", !0;
				a.rPassError = "两次密码输入不一致，请重新输入"
			} else a.rPassError = "确认密码不能为空";
			return !1
		}, a.openLogin = function() {
			f.path("/home/login", !1)
		}, a.reset = function() {
			a.user = {}
		}, a.openThirdPatyWindow = function(a) {
			d.cancelRegister(), i.openThirtyPartyWindow(a)
		}
	}]).controller("BindingController", ["$rootScope", "$scope", "$timeout", "security", "localizedMessages", "$location", "$http", "$window", function(a, b, c, d, e, f, g, h) {
		b.qq_url = "https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id="+client_id+"&redirect_uri=" + redirect_uri + "&display=pc", b.weibo_url = "https://api.weibo.com/oauth2/authorize?client_id=3508809852&response_type=token&redirect_uri=" + PREFIX_HOST
	}]), angular.module("security.register", ["security.register.form", "security.otherregister.form"]), angular.module("security.retryQueue", []).factory("securityRetryQueue", ["$q", "$log", function(a, b) {
		var c = [],
			d = {
				onItemAddedCallbacks: [],
				hasMore: function() {
					return c.length > 0
				},
				push: function(a) {
					c.push(a), angular.forEach(d.onItemAddedCallbacks, function(c) {
						try {
							c(a)
						} catch (d) {
							b.error("securityRetryQueue.push(retryItem): callback threw an error" + d)
						}
					})
				},
				pushRetryFn: function(b, c) {
					1 === arguments.length && (c = b, b = undefined);
					var e = a.defer(),
						f = {
							reason: b,
							retry: function() {
								a.when(c()).then(function(a) {
									e.resolve(a)
								}, function(a) {
									e.reject(a)
								})
							},
							cancel: function() {
								e.reject()
							}
						};
					return d.push(f), e.promise
				},
				retryReason: function() {
					return d.hasMore() && c[0].reason
				},
				cancelAll: function() {
					for (; d.hasMore();) c.shift().cancel()
				},
				retryAll: function() {
					for (; d.hasMore();) c.shift().retry()
				}
			};
		return d
	}]), angular.module("security.service", ["security.retryQueue", "security.login", "security.register", "security.authority", "ui.bootstrap.modal"]).factory("security", ["$rootScope", "$http", "$q", "$location", "securityRetryQueue", "$modal", "ModalService", "authority", function(a, b, c, d, e, f, g, h) {
		function i(a) {
			a = a || "/", window.location.href = a
		}
		function j() {
			if (u && (k(u, !1), u = null), s) throw new Error("Trying to open a dialog that is already open!");
			s = f.open({
				windowClass: "login-container",
				keyboard: !1,
				templateUrl: "security/login/form.tpl.html",
				controller: "LoginFormController"
			}), s.result.then(l, l)
		}
		function k(a, b) {
			a.close(b)
		}
		function l(a) {
			s = null, a ? ("/home/login" == d.path() && d.path("/home", !1), e.retryAll()) : (e.cancelAll(), i())
		}
		function m(a) {
			if (t) throw new Error("Trying to open a dialog that is already open!");
			t = f.open({
				windowClass: "login-container",
				keyboard: !1,
				templateUrl: "security/login/reset.tpl.html",
				controller: "ResetFormController",
				resolve: {
					resetKey: function() {
						return a
					}
				}
			}), t.result.then(function() {
				t = null
			}, function() {
				x.currentUser || d.path("/home", !1).search({}), t = null
			})
		}
		function n(a) {
			if (s && (k(s, !0), s = null), u) throw new Error("Trying to open a dialog that is already open!");
			u = f.open({
				windowClass: "login-container",
				keyboard: !1,
				templateUrl: "security/register/register.tpl.html",
				controller: "RegisterFormController",
				resolve: {
					regMsg: function() {
						return a
					}
				}
			}), u.result.then(function() {
				u = null
			}, function() {
				"/home/register" == d.path() && d.path("/home", !1), u = null
			})
		}
		function o(a) {
			if (v) throw new Error("Trying to open a dialog that is already open!");
			v = f.open({
				windowClass: "login-container",
				keyboard: !1,
				templateUrl: "security/register/otherregister.tpl.html",
				controller: "OtherRegisterFormController",
				resolve: {
					otherRegisterInfo: function() {
						return a
					}
				}
			})
		}
		function p(a) {
			w = a
		}
		function q() {
			return w
		}
		function r() {
			s = null
		}
		var s = null,
			t = null,
			u = null,
			v = null;
		e.onItemAddedCallbacks.push(function(a) {
			e.hasMore() && x.showLogin()
		});
		var w = {},
			x = {
				getLoginReason: function() {
					return e.retryReason()
				},
				showLogin: function() {
					j()
				},
				showRegister: function(a) {
					n(a)
				},
				showOtherRegister: function() {
					o()
				},
				getUserDetail: function(a, c, d) {
					var e = PREFIX_URL + "base/relUserInfo?type=" + a + "&openId=" + c + "&accessToken=" + d,
						f = new Date;
					return e += "&date=" + f.getTime(), b({
						method: "GET",
						url: e,
						withCredentials: !0
					})
				},
				checkUniqueness: function(a) {
					var c = PREFIX_S1_URL + "index.php?c=user&a=checkN&username=" + a,
						d = new Date;
					return c += "&date=" + d.getTime(), b({
						method: "GET",
						url: c,
						withCredentials: !0
					})
				},
				addRegisterInfo: p,
				getRegisterInfo: q,
				login: function(a) {
					var c = this,
						e = b.post(PREFIX_URL + "index.php?c=user&a=login", a, {
							withCredentials: !0,
							headers: {
								"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
							}
						});
					return e.then(function(a) {
						return 200 === a.status ? (c.isValidateCodeLogin = !1, a.data.success === !0 ? (k(s, !0), x.requestCurrentUser().then(function() {
							("/home" == d.path() || "/home/login" == d.path()) && d.path("main")
						}), a.data) : a.data) : void x.isAuthenticated()
					}, function(a) {
						x.isAuthenticated()
					})
				},
				closeLoginDialog: r,
				register: function(a, c) {
					var e = b.post(PREFIX_URL + "index.php?c=user&a=register" + c, a, {
						withCredentials: !0,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
						}
					});
					return e.then(function(a) {                                            
						if (200 === a.status) {
                                                    alert(a.data.msg);d.path("home/login");return;
							if (a.data.success !== !0) return a.data;
							("/home" == d.path() || "/home/register" == d.path()) && d.path("main"), x.requestCurrentUser(), k(u, !0)
						} else x.isAuthenticated()
					}, function(a) {
						x.isAuthenticated()
					})
				},
				qqLogin: function(a, b) {
					x.getThirdPartyInfo(a).then(function(c) {
						var d = c.openid,
							e = (c.client_id, {
								email: "",
								password: "",
								openId: d,
								accessToken: a,
								type: "qq",
								expires: b
							});
						x.thirdPartLogin(e)
					})
				},
				thirdPartLogin: function(a) {
					var c = b.post(PREFIX_URL + "index.php?c=otherlogin", $.param(qqRegisterInfo), {
						withCredentials: !0,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
						}
					});
					return c.then(function(a) {
						if (200 === a.status) {
							if (a.data.success !== !0) return a.data;
							("/home" == d.path() || "/home/login" == d.path()) && d.path("main"), x.setLoginSuccess(!0), x.requestCurrentUser(), k(v, !0)
						} else x.isAuthenticated()
					}, function(a) {
						x.isAuthenticated()
					})
				},
				getThirdPartyInfo: function(a) {
					var b = "https://graph.qq.com/oauth2.0/me?access_token=" + a;
					return $.ajax({
						type: "get",
						url: b,
						dataType: "jsonp",
						jsonp: "jsoncallback",
						jsonpCallback: "callback",
						xhrFields: {
							withCredentials: !0
						}
					})
				},
				weiChatLogin: function(a) {
					return b.post(PREFIX_URL + "index.php?c=otherlogin&code=" + a + "&type=weixin&time=" + (new Date).getTime(), {}, {
						withCredentials: !0,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
						}
					})
				},
				cancelRegister: function() {
					u = null, d.path("/home", !1)
				},
				hasRel: function(a) {
					u && k(u, !1);
					var c = new Date,
						e = PREFIX_URL + "base/user/hasRel?type=" + a.type + "&openId=" + a.openId + "&time=" + c.getTime(),
						f = b.get(e, {
							withCredentials: !0
						});
					f.then(function(b) {
						200 === b.status ? b.data.success === !0 ? (("/home" == d.path() || "/home/login" == d.path()) && d.path("main"), x.requestCurrentUser()) : "未关联账号" == b.data.msg && o(a) : x.isAuthenticated()
					}, function(a) {
						x.isAuthenticated()
					})
				},
				cancelLogin: function() {
					s = null, d.path("/home", !1)
				},
				logout: function(a) {
					b({
						withCredentials: !0,
						method: "GET",
						url: PREFIX_URL + "?c=user&a=logout"
					}).then(function(b) {
						x.currentUser = null, i(a)
					}, function() {
						x.currentUser = null, i(a)
					})
				},
				userPromise: null,
				requestCurrentUser: function() {
					if (x.isAuthenticated()) return c.when(x.currentUser);
					var a = new Date;
					return x.userPromise ? x.userPromise : (x.userPromise = b.get(PREFIX_URL + "index.php?c=user&a=check&time=" + a.getTime(), {
						withCredentials: !0
					}).then(function(a) {
						return x.userPromise = null, a.data.success && (x.currentUser = a.data.obj, (!x.currentUser.roleIdList || x.currentUser.roleIdList.length <= 0) && (x.currentUser.roleIdList = [2])), x.currentUser
					}, function() {
						x.userPromise = null
					}), x.userPromise)
				},
				resetPassByKey: function(a, c) {
					var d = {
						key: c,
						newPwd: a
					};
					return b.post(PREFIX_URL + "index.php?c=user&a=reset_password", $.param(d), {
						withCredentials: !0,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
						}
					})
				},
				currentUser: null,
				isAuthenticated: function() {
					return !!x.currentUser
				},
				isLoginSuccess: !1,
				setLoginSuccess: function(a) {
					x.isLoginSuccess = a
				},
				thirdPartyUrl: {
					weiChatUrl: "https://open.weixin.qq.com/connect/qrconnect?appid=wxc5f1bbae4bb93ced&redirect_uri=http%3A%2F%2Fe.wesambo.com&response_type=code&scope=snsapi_login&state=WECHAT_STATE#wechat_redirect",
					qqUrl: "https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id="+client_id+"&redirect_uri="+redirect_uri+"&scope=get_user_info",
					weiboUrl: "https://api.weibo.com/oauth2/authorize?client_id=3508809852&response_type=token&redirect_uri=http://e.wesambo.com"
				},
				isAllowToAccess: function(a) {
					if (!x.currentUser) return !1;
					var b = h.userRoleDef[x.currentUser.type];
					return b && (b.code & a) > 0 ? !0 : !1
				},
				accessDef: h.accessDef,
				isEditor: function() {
					if (!x.currentUser) return !1;
					var a = x.currentUser.roleIdList;
					if (!a) return !1;
					for (var b = 0; b < a.length; b++) if ("4" == a[b]) return !0;
					return !1
				},
				isAdvancedUser: function() {
					return x.currentUser && "3" == x.currentUser.type ? !0 : !1
				},
				isVendorUser: function() {
					return x.currentUser && "4" == x.currentUser.type ? !0 : !1
				},
				requestResetPassword: function(a) {
					m(a)
				},
				validateToken: function(a) {
					var c = "changepw?token=" + a;
					return b.get(PREFIX_URL + c, {
						withCredentials: !0
					})
				},
				resetPassword: function(a, c) {
					var d = PREFIX_URL + "index.php?c=Usercenter&a=changePwd",
						e = {
							oldPwd: a,
							newPwd: c
						};
					return b.post(d, $.param(e), {
						withCredentials: !0,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
						}
					})
				},
				retrievePassword: function(a, c, d, e) {
					var f = PREFIX_URL + "index.php?c=user&a=forget_password",
						g = {
							email: a,
							geetest_challenge: c,
							geetest_validate: d,
							geetest_seccode: e
						};
					return b.post(f, $.param(g), {
						withCredentials: !0,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
						}
					})
				}
			};
		return x
	}]), angular.module("security.thirdparty", ["security.service"]).factory("thirdpartyService", ["$rootScope", "$http", "$location", "$window", "security", "$translate", "i18nNotifications", function(a, b, c, d, e, f, g) {
		function h(a) {
			var b = "https://graph.qq.com/oauth2.0/authorize?",
				c = client_id,
				d = ["client_id=" + c, "redirect_uri=" + a, "scope=get_user_info", "response_type=token"],
				e = d.join("&");
			return j = b + e
		}
		function i(a) {
			var b = "https://open.weixin.qq.com/connect/qrconnect?",
				c = "wx5a3ca7ea184c3a3b",
				d = ["appid=" + c, "redirect_uri=" + a, "scope=snsapi_login", "response_type=code", "state=WECHAT_STATE#wechat_redirect"],
				e = d.join("&");
			return k = b + e
		}
		var j, k, l = {
			qqUrl: h,
			wxUrl: i,
			qqLogin: function(a, b) {
				l.getThirdPartyInfo(a).then(function(c) {
					var d = c.openid,
						e = (c.client_id, {
							email: "",
							password: "",
							openId: d,
							accessToken: a,
							type: "qq",
							expires: b
						});
					l.thirdPartLogin(e)
				})
			},
			thirdPartLogin: function(a) {
				var d = b.post(PREFIX_URL + "index.php?c=otherlogin", $.param(a), {
					withCredentials: !0,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
					}
				});
				return d.then(function(a) {
					if (200 === a.status) {
						if (a.data.success !== !0) return a.data;
						("/home" == c.path() || "/home/login" == c.path()) && c.path("main"), e.setLoginSuccess(!0), e.requestCurrentUser()
					} else e.isAuthenticated()
				}, function(a) {
					e.isAuthenticated()
				})
			},
			getThirdPartyInfo: function(a) {
				var b = "https://graph.qq.com/oauth2.0/me?access_token=" + a;
				return $.ajax({
					type: "get",
					url: b,
					dataType: "jsonp",
					jsonp: "jsoncallback",
					jsonpCallback: "callback",
					xhrFields: {
						withCredentials: !0
					}
				})
			},
			weiChatLogin: function(a) {
				return b.post(PREFIX_URL + "index.php?c=otherlogin&code=" + a + "&type=weixin&time=" + (new Date).getTime(), {}, {
					withCredentials: !0,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
					}
				})
			},
			unbindRelation: function(c) {
				var d = {
					type: c
				},
					e = "m/u/unRelation";
				b({
					withCredentials: !0,
					method: "POST",
					url: PREFIX_URL + e,
					data: $.param(d),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
					}
				}).then(function(b) {
					b.data.success && a.$broadcast("mail.unbind.success", c)
				})
			},
			wxBindAccount: function(a) {
				l.bindAccountCommon(a)
			},
			qqBindAccount: function(a) {
				l.getThirdPartyInfo(a.access_token).then(function(b) {
					var c = b.openid,
						d = (b.client_id, {
							openId: c,
							accessToken: a.access_token,
							expires: a.expires_in,
							type: "qq"
						});
					l.bindAccountCommon(d)
				}, function(a) {})
			},
			bindAccountCommon: function(c) {
				var d = "m/u/bind/third";
				b({
					withCredentials: !0,
					method: "POST",
					url: PREFIX_URL + d,
					data: $.param(c),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
					}
				}).then(function(b) {
					b.data.success ? a.$broadcast("rel.success", c.type) : g.pushForCurrentRoute("already.bind.error", "notify.success", {
						msg: b.data.msg
					})
				}, function(a) {
					alert(f.instant("common.security.SERVER_ERROR"))
				})
			},
			openThirtyPartyWindow: function(a) {
				var b, c = redirect_uri;
				"qq" == a ? b = l.qqUrl(c) : "weixin" == a && (b = l.wxUrl(c)), d.open(b, "_blank", "width=600,height=600,menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes")
			}
		};
		return l
	}]), angular.module("services.active", []).factory("activeService", ["$rootScope", "$http", function(a, b) {
		var c = {};
		return c.getActiveList = function(a, c, d) {
			var e = PREFIX_S1_URL + "eqs/activity/scene";
			return a && (e += /\?/.test(e) ? "&" : "?", e += "promId=" + a), c && (e += /\?/.test(e) ? "&" : "?", e += "pageNo=" + c), d && (e += /\?/.test(e) ? "&" : "?", e += "pageSize=" + d), b({
				withCredentials: !0,
				method: "GET",
				url: e
			})
		}, c
	}]), angular.module("services.breadcrumbs", []), angular.module("services.breadcrumbs").factory("breadcrumbs", ["$rootScope", "$location", function(a, b) {
		var c = [],
			d = {};
		return a.$on("$routeChangeSuccess", function(a, d) {
			var e, f = b.path().split("/"),
				g = [],
				h = function(a) {
					return "/" + f.slice(0, a + 1).join("/")
				};
			for (f.shift(), e = 0; e < f.length; e++) g.push({
				name: f[e],
				path: h(e)
			});
			c = g
		}), d.getAll = function() {
			return c
		}, d.getFirst = function() {
			return c[0] || {}
		}, d
	}]), angular.module("services.config", []).factory("configService", ["$http", function(a) {
		var b = function() {
				var b = PREFIX_S2_URL + "index.php?c=ad&a=logo";
				return a({
					withCredentials: !0,
					method: "GET",
					url: b
				})
			},
			c = function() {
				var b = PREFIX_S2_URL + "index.php?c=ad&a=banner";
				return a({
					withCredentials: !0,
					method: "GET",
					url: b
				})
			},
			d = function() {
				var b = PREFIX_S2_URL + "index.php?c=ad&a=friendlinks";
				return a({
					withCredentials: !0,
					method: "GET",
					url: b
				})
			},
			e = function(b) {
				var c = PREFIX_S2_URL + "eqs/banners?pageCode=" + b;
				return a({
					withCredentials: !0,
					method: "GET",
					url: c
				})
			},
            f = function() {
                var b = PREFIX_S2_URL + "index.php?c=ad&a=product";
                return a({
                    withCredentials: !0,
                    method: "GET",
                    url: b
                })
            };
			var getBanner70= function() {
				var url = JSON_URL + "?c=ad&a=getBanner70" ;
				return a({
					withCredentials: !0,
					method: "GET",
					url: url
				})
			},getMenu70= function() {
				var url = JSON_URL + "?c=ad&a=getMenu70" ;
				return a({
					withCredentials: !0,
					method: "GET",
					url: url
				})
			};
			
		return {
			getBanner70: getBanner70,getMenu70: getMenu70,
			getLogo: b,
			getBanners: c,
			getFriendLinks: d,
			getActivityBanner: e,
            getProduct: f
		}
	}]), angular.module("services.crud", ["services.crudRouteProvider"]), angular.module("services.crud").factory("crudEditMethods", function() {
		return function(a, b, c, d, e) {
			var f = {};
			return f[a] = b, f[a + "Copy"] = angular.copy(b), f.save = function() {
				this[a].$saveOrUpdate(d, d, e, e)
			}, f.canSave = function() {
				return this[c].$valid && !angular.equals(this[a], this[a + "Copy"])
			}, f.revertChanges = function() {
				this[a] = angular.copy(this[a + "Copy"])
			}, f.canRevert = function() {
				return !angular.equals(this[a], this[a + "Copy"])
			}, f.remove = function() {
				this[a].$id() ? this[a].$remove(d, e) : d()
			}, f.canRemove = function() {
				return b.$id()
			}, f.getCssClasses = function(a) {
				var b = this[c][a];
				return {
					error: b.$invalid && b.$dirty,
					success: b.$valid && b.$dirty
				}
			}, f.showError = function(a, b) {
				return this[c][a].$error[b]
			}, f
		}
	}), angular.module("services.crud").factory("crudListMethods", ["$location", function(a) {
		return function(b) {
			var c = {};
			return c["new"] = function() {
				a.path(b + "/new")
			}, c.edit = function(c) {
				a.path(b + "/" + c)
			}, c
		}
	}]), function() {
		function a(a) {
			this.$get = angular.noop, this.routesFor = function(b, c, d) {
				var e = b.toLowerCase(),
					f = "/" + b.toLowerCase();
				d = d || c, angular.isString(c) && "" !== c && (e = c + "/" + e), null !== d && d !== undefined && "" !== d && (f = "/" + d + f);
				var g = function(a) {
						return e + "/" + b.toLowerCase() + "-" + a.toLowerCase() + ".tpl.html"
					},
					h = function(a) {
						return b + a + "Ctrl"
					},
					i = {
						whenList: function(a) {
							return i.when(f, {
								templateUrl: g("List"),
								controller: h("List"),
								resolve: a
							}), i
						},
						whenNew: function(a) {
							return i.when(f + "/new", {
								templateUrl: g("Edit"),
								controller: h("Edit"),
								resolve: a
							}), i
						},
						whenEdit: function(a) {
							return i.when(f + "/:itemId", {
								templateUrl: g("Edit"),
								controller: h("Edit"),
								resolve: a
							}), i
						},
						when: function(b, c) {
							return a.when(b, c), i
						},
						otherwise: function(b) {
							return a.otherwise(b), i
						},
						$routeProvider: a
					};
				return i
			}
		}
		a.$inject = ["$routeProvider"], angular.module("services.crudRouteProvider", ["ngRoute"]).provider("crudRoute", a)
	}(), angular.module("services.dataCache", []), angular.module("services.dataCache").factory("dataCacheService", ["$timeout", function(a) {
		var b = {};
		this.asyncUrl = "", b.clear = function(a) {
			window.sessionStorage && (a || sessionStorage.clear(), delete sessionStorage[a])
		}, b.push = function(a, b, c) {
			if (window.sessionStorage) {
				var d = sessionStorage.getItem(a);
				d = d ? JSON.parse(d) : {}, d[b] = c, sessionStorage.setItem(a, JSON.stringify(d))
			}
		}, b.get = function(a, b) {
			if (!window.sessionStorage) return null;
			var c = sessionStorage.getItem(a);
			return c ? (c = JSON.parse(c), c[b]) : null
		}, b.asyncGet = function(b, c) {
			var d = sessionStorage.getItem(b);
			d = JSON.parse(d);
			var e = a(function() {
				return d[c]
			});
			return e
		}, b.contains = function(a, b) {
			if (!window.sessionStorage) return !1;
			var c = sessionStorage[a];
			return c ? (c = JSON.parse(c), c[b] ? !0 : !1) : !1
		}, b.setAsyncUrl = function(a) {
			this.asyncUrl = a
		}, b.getAsyncUrl = function() {
			return this.asyncUrl
		};
		var c = {
			photo: [],
			audio: []
		};
		return b.pushUsedFile = function(a, b) {
			var d;
			switch (a) {
			case 1:
				d = c.photo;
				break;
			case 2:
				d = c.audio
			}
			d.indexOf(b) > -1 || d.push(b)
		}, b.removeUsedFile = function(a, b) {
			var d;
			switch (a) {
			case 1:
				d = c.photo;
				break;
			case 2:
				d = c.audio
			}
			var e = d.indexOf(b); - 1 != e && d.splice(e, 1)
		}, b.getUsedFiles = function() {
			for (var a = [], b = [], d = 0; d < c.photo.length; d++) c.photo[d] && (a.push(c.photo[d]), b.push(1));
			for (var e = 0; e < c.audio.length; e++) {
				if (!c.audio[e]) return;
				a.push(c.audio[e]), b.push(2)
			}
			return 0 !== a.length ? {
				file: a.join(","),
				type: b.join(",")
			} : void 0
		}, b.clearUsedFiles = function() {
			c = {
				photo: [],
				audio: []
			}
		}, b
	}]), angular.module("services.data", []), angular.module("services.data").factory("dataService", ["$http", "$rootScope", function(a, b) {
		var c = {};
		b.branchid;
		return c.getDatas = function(c) {
			var d = "index.php?c=scenedata&a=statSum";
			return c && (d += (/\?/.test(d) ? "&" : "?") + "user=" + c), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + d
			}).then(function(a) {
				if (a.data.success) {
					var c = a.data.obj;
					b.$broadcast("sceneDatas", c)
				}
			})
		}, c.getCustomDatas = function(c) {
			var d = "index.php?c=custom&a=statSum";
			return c && (d += (/\?/.test(d) ? "&" : "?") + "user=" + c), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + d
			}).then(function(a) {
				if (a.data.success) {
					var c = a.data.obj;
					b.$broadcast("customDatas", c)
				}
			})
		}, c.getDataBySceneId = function(b, c, d, e) {
			c = c || 1, d = d || 10;
			var f = "index.php?c=scenedata&a=getdata&id=" + b + "&pageNo=" + c + "&pageSize=" + d;
			e && (f += (/\?/.test(f) ? "&" : "?") + "user=" + e);
			var g = new Date;
			return f += "&time=" + g.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + f
			})
		}, c.deleteDataBySceneId = function(b, c) {
			var d = "index.php?c=scenedata&a=delete&sceneId=" + b + "&dataIds=" + c.ids;
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + d,
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				}
			})
		}, c.getDataDetail = function(b, c) {
			var d = "m/c/detail/" + b;
			c && (d += (/\?/.test(d) ? "&" : "?") + "user=" + c);
			var e = new Date;
			return d += (/\?/.test(d) ? "&" : "?") + "date=" + e.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + d
			})
		}, c.getDataMessage = function(b) {
			var c = "index.php?c=custom&a=newDataScene";
			b && (c += (/\?/.test(c) ? "&" : "&") + "user=" + b);
			var d = new Date;
			return c += (/\?/.test(c) ? "&" : "&") + "date=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, c.getAllData = function(b, c, d, e) {
			var f = "index.php?c=custom&a=getAllData&pageSize=10&pageNo=" + b;
			c && (f += (/\?/.test(f) ? "&" : "?") + "user=" + c), e && (f += (/\?/.test(f) ? "&" : "?") + "origin=" + e), d && (f += (/\?/.test(f) ? "&" : "?") + "groupId=" + d);
			var g = new Date;
			return f += (/\?/.test(f) ? "&" : "?") + "time=" + g.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + f
			})
		}, c.getProspectDataAccount = function(b) {
			var c = "m/c/prospectCount?time=" + (new Date).getTime();
			return b && (c += (/\?/.test(c) ? "&" : "?") + "user=" + b), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, c.deleteDataById = function(b) {
			var c = "index.php?c=custom&a=delete&id=" + b;
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, c.saveData = function(b, c) {
			var d = c ? "m/c/create" : "m/c/save";
			return a({
				withCredentials: !0,
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				url: PREFIX_URL + d,
				data: b
			})
		}, c.getSceneField = function(b) {
			var c = "index.php?c=custom&a=formField&id=" + b,
				d = new Date;
			return c += "?time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, c.getPremergeScenes = function(b) {
			var c = "index.php?c=custom&a=newDataScene";
			b && (c += (/\?/.test(c) ? "&" : "?") + "user=" + b);
			var d = new Date;
			return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, c.mergeSceneData = function(b, c) {
			var d = "index.php?c=custom&a=imps&id=" + b;
			return a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_S3_URL + d,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(c)
			})
		}, c.getOrigin = function(b) {
			var c = "index.php?c=custom&a=origin";
			return b && (c += (/\?/.test(c) ? "&" : "?") + "user=" + b), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, c.getGroups = function(b) {
			var c = "index.php?c=custom&a=grouplist";
			return b && (c += (/\?/.test(c) ? "&" : "?") + "user=" + b), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, c.assignGroup = function(b) {
			var c = "m/c/group/set?cIds=" + b.cIds + "&gIds=" + b.gIds;
			return a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + c,
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				}
			})
		}, c.deleteAssociation = function(b) {
			var c = "m/c/group/unset?cId=" + b.cId + "&gId=" + b.gId;
			return a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + c,
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				}
			})
		}, c.createGroup = function(b) {
			var c = "m/c/group/create";
			return a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(b)
			})
		}, c.deleteCustomer = function(b) {
			var c = "index.php?c=custom&a=delete&ids=" + b.ids;
			return a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + c,
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				}
			})
		}, c.deleteGroup = function(b) {
			var c = {
				id: b
			},
				d = "m/c/group/delete";
			return a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + d,
				data: $.param(c),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			})
		}, c
	}]), angular.module("services.exceptionHandler", ["services.i18nNotifications"]), angular.module("services.exceptionHandler").factory("exceptionHandlerFactory", ["$injector", function(a) {
		return function(b) {
			return function(c, d) {
				var e = a.get("i18nNotifications");
				b(c, d), e.pushForCurrentRoute("error.fatal", "error", {}, {
					exception: c,
					cause: d
				})
			}
		}
	}]), angular.module("services.exceptionHandler").config(["$provide", function(a) {
		a.decorator("$exceptionHandler", ["$delegate", "exceptionHandlerFactory", function(a, b) {
			return b(a)
		}])
	}]), angular.module("services.file", ["services.i18nNotifications", "services.staticRes"]), angular.module("services.file").factory("fileService", ["$rootScope", "$http", "i18nNotifications", "staticResService", "dataCacheService", function(a, b, c, d, e) {
		function f(a) {
			var c = "m/base/file/recently/used?fileType=" + a;
			return c += (/\?/.test(c) ? "&" : "?") + "time=" + (new Date).getTime(), b({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}
		function g(a, c) {
			var d = "index.php?c=statics&a=history_save&fileIds=" + a + "&fileTypes=" + c;
			return d += (/\?/.test(d) ? "&" : "?") + "time=" + (new Date).getTime(), b({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + d
			})
		}
		function h() {
			var a = [{
				color: "#6366C3"
			}, {
				color: "#29A1D6"
			}, {
				color: "#332E42"
			}, {
				color: "#DBF3FF"
			}, {
				color: "#434A54"
			}, {
				color: "#000000"
			}, {
				color: "#F1F03E"
			}, {
				color: "#FCF08E"
			}, {
				color: "#972D53"
			}, {
				color: "#724192"
			}, {
				color: "#967BDC"
			}, {
				color: "#EC87C1"
			}, {
				color: "#D870AF"
			}, {
				color: "#F6F7FB"
			}, {
				color: "#666C78"
			}, {
				color: "#ABB1BD"
			}, {
				color: "#CCD0D9"
			}, {
				color: "#E6E9EE"
			}, {
				color: "#48CFAE"
			}, {
				color: "#36BC9B"
			}, {
				color: "#3BAEDA"
			}, {
				color: "#50C1E9"
			}, {
				color: "#AC92ED"
			}, {
				color: "#4B89DC"
			}, {
				color: "#4B89DC"
			}, {
				color: "#5D9CEC"
			}, {
				color: "#8DC153"
			}, {
				color: "#ED5564"
			}, {
				color: "#DB4453"
			}, {
				color: "#FB6E52"
			}, {
				color: "#FFCE55"
			}, {
				color: "#F6BB43"
			}, {
				color: "#E9573E"
			}, {
				color: "#9FF592"
			}, {
				color: "#A0D468"
			}];
			return a
		}
		function i(b) {
			C.sysCategoryList = "1" == b ? d.getTpTypes() : d.getBgTypes(), a.$broadcast("sysCategory.update")
		}
		function j(b) {
			C.sysMusicList = "2" == b ? d.getAudioTypes() : d.getSoundTypes(), a.$broadcast("sysMusic.update")
		}
		function k(c) {
			var d = "index.php?c=upfile&a=systag&type=11";
			c && (d += "&bizType=" + c);
			var f = d,
				g = e.get("sysTag", d);
			return g ? (C.sysTagList = g.list, void a.$broadcast("sysTag.update")) : (d += (/\?/.test(d) ? "&" : "?") + "time=" + (new Date).getTime(), void b({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + d
			}).then(function(b) {
				b.data.success && (C.sysTagList = b.data.list, e.push("sysTag", f, b.data), a.$broadcast("sysTag.update"))
			}))
		}
		function l(a, c, d, f, g, h, i) {
			return a += "pageNo=" + (c ? c : 1), a += "&pageSize=" + (d ? d : 10), a += "&fileType=" + f, (g || 0 === g) && (a += "&bizType=" + g), h && (a += "&tagId=" + h), i && (a += "&delete=1"), (searchVal != "") && (a += "&key=" + searchVal), e.contains("fileService1", a) ? e.asyncGet("fileService1", a) : (e.setAsyncUrl(a), a += "&time=" + Date.now(), b({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + a
			}))
		}
		window.m = function (c, d, f, g, h, i) {
			if (g === "0") {
                		categoryUrl = PREFIX_URL + "index.php?c=upfile&a=getfiletype&filetype=bgType";
            		} else if (g === "1") {
                		categoryUrl = PREFIX_URL + "index.php?c=upfile&a=getfiletype&filetype=tpType";
            		}
            		if ("pure" != h) {
                		"1" == g && (f = 18), c += "pageNo=" + (d ? d : 1), c += "&pageSize=" + (f ? f : 10), c += "&fileType=" + g, (h || 0 === h) && (c += "&bizType=" + h), i && (c += "&tagId=" + i);
                		if (searchVal != "") {
                    		var currentPageNo = "pageNo=" + d;
		    		if(oldSearchPage != currentPageNo){ 
				searchUrl = searchUrl.replace(oldSearchPage, currentPageNo)
				oldSearchPage = currentPageNo
				}
                    		c = searchUrl
                	}
                	var j = e.get("fileService", c);
                	if (j) return C.imgList = j.list, C.totalItems = j.map.count, C.pageNo = j.map.pageNo, void a.$broadcast("imgList.update");
                	var k = c;
                	c += "&time=" + Date.now(), b({
                    	withCredentials: !0,
                    	method: "GET",
                    	url: PREFIX_URL + c
                	}).then(function (b) {
                    	b.data.success && (C.imgList = b.data.list, C.totalItems = b.data.map.count, C.pageNo = b.data.map.pageNo, e.push("fileService", k, b.data), a.$broadcast("imgList.update"))
                	})
            		} else d * f <= D.length ? C.imgList = D.slice((d - 1) * f, d * f) : C.imgList = D.slice((d - 1) * f, D.length), C.totalItems = D.length, C.pageNo = d, a.$broadcast("imgList.update")
        	}
		function n(a, b, c, d, e) {
			var f = "index.php?c=upfile&a=syslist&";
			return l(f, a, b, c, d, e)
		}
		function o(a, b, c, d, e) {
			var f = "index.php?c=upfile&a=syslist&";
			m(f, a, b, c, d, e)
		}
		function p(a, b, c, d, e, f) {
			var g = "index.php?c=upfile&a=userList&";
			return l(g, a, b, c, d, e, f)
		}
		function q(a, b, c, d, e) {
			var f = "index.php?c=upfile&a=userList&";
			m(f, a, b, c, d, e)
		}
		function r(c) {
			var d = "index.php?c=upfile&a=delete",
				e = {
					id: c
				};
			b({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + d,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(e)
			}).then(function(b) {
				b.data.success && a.$broadcast("files.delete")
			})
		}
		function s(a, c) {
			var d, e = "index.php?c=upfile&a=delete";
			return d = c ? {
				id: a,
				backup: c
			} : {
				id: a
			}, b({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + e,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(d)
			})
		}
		function t(a, c) {
			var d = "m/base/file/recycle/list?pageNo=" + a + "&pageSize=" + c;
			return b({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + d
			})
		}
		function u(a) {
			var c = "m/base/file/revoke?id=" + a;
			return b({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}
		function v(c) {
			var d = "index.php?c=tag&a=create",
				e = {
					tagName: c
				};
			b({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + d,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(e)
			}).then(function(b) {
				C.tagList.push({
					id: b.data.obj,
					name: c
				}), a.$broadcast("tagList.update")
			}, function(a) {
				$scope.authError = "创建失败"
			})
		}
		function w() {
			var c = "index.php?c=tag&a=my&time" + (new Date).getTime();
			b({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			}).then(function(b) {
				b.data.success && (C.tagList = b.data.list, a.$broadcast("tagList.update"))
			})
		}
		function x(c, d) {
			var e = "index.php?c=tag&a=delete",
				f = {
					id: c
				};
			b({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + e,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(f)
			}).then(function(b) {
				b.data.success && (C.tagList.splice(d, 1), a.$broadcast("tagList.delete"))
			})
		}
		function y(c, d) {
			var e = "index.php?c=tag&a=set",
				f = {
					tagId: c,
					fileIds: d
				};
			b({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + e,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(f)
			}).then(function(b) {
				b.data.success && a.$broadcast("tag.assign")
			})
		}
		function z(c, d) {
			var e = "m/base/file/tag/unset",
				f = {
					tagId: c,
					fileIds: d
				};
			b({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + e,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(f)
			}).then(function(b) {
				b.data.success && a.$broadcast("tag.unbind")
			})
		}
		function A(a, c, d, f) {
			var g = "index.php?c=upfile&a=syslist";
			if ("0" === d && "2" === f && (g = "index.php?c=upfile&a=userList&"), g += "&pageNo=" + (a ? a : 1), g += "&pageSize=" + (c ? c : 12), d && "all" != d && (g += "&bizType=" + (d ? d : -1)), g += "&fileType=" + (f ? f : -1), e.contains("mySounds", g)) return e.asyncGet("mySounds", g);
			e.setAsyncUrl(g);
			var h = new Date;
			return g += "&time=" + h.getTime(), b({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + g
			})
		}
		function B(a) {
			var c = "index.php?c=page&a=crop";
			return b({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(a)
			})
		}
		var C = {
			pageNo: 1,
			totalItems: 0,
			sysCategoryList: [],
			getSysCategory: i,
			sysTagList: [],
			getSysMusicCategory: j,
			userRecycle: t,
			fileRevoke: u,
			sysMusicList: [],
			getSysTagByCatId: k,
			imgList: [],
			getSystemFiles: n,
			getUserFiles: p,
			getSystemFiles1: o,
			getUserFiles1: q,
			tagList: [],
			createTag: v,
			getTagList: w,
			deleteTag: x,
			assignTag: y,
			unbindTag: z,
			deleteFile: r,
			deleteFile1: s,
			getFileByCategory: A,
			getBgColorList: h,
			cropImage: B,
			getFilesHistory: f,
			saveFilesHistory: g
		},
			D = h();
		return C
	}]), angular.module("services.history", []).factory("historyService", ["$rootScope", function(a) {
		var b = {},
			c = {},
			d = {};
		return b.addPage = function(d, e) {
			return c[d] || (c[d] = {
				currentPos: 0,
				inHistory: !1,
				pageHistory: []
			}, b.addPageHistory(d, e)), a.$broadcast("history.changed"), JSON.parse(c[d].pageHistory[c[d].currentPos])
		}, b.addPageHistory = function(b, e) {
			d = c[b], d.inHistory && (d.inHistory = !1, d.pageHistory.length = d.currentPos + 1);
			var f = JSON.stringify(e);
			f != d.pageHistory[d.pageHistory.length - 1] && d.pageHistory.push(f), d.currentPos = d.pageHistory.length - 1, a.$broadcast("history.changed")
		}, b.clearHistory = function() {
			c = {}
		}, b.canBack = function(a) {
			return d = c[a], d.currentPos > 0
		}, b.canForward = function(a) {
			return d = c[a], d.currentPos < d.pageHistory.length - 1
		}, b.back = function(b) {
			if (d = c[b], d.pageHistory.length) {
				d.inHistory = !0;
				var e = 0 === d.currentPos ? d.pageHistory[0] : d.pageHistory[--d.currentPos];
				return a.$broadcast("history.changed"), JSON.parse(e)
			}
		}, b.forward = function(b) {
			if (d = c[b], d.pageHistory.length) {
				d.inHistory = !0;
				var e = d.currentPos == d.pageHistory.length - 1 ? d.pageHistory[d.currentPos] : d.pageHistory[++d.currentPos];
				return a.$broadcast("history.changed"), JSON.parse(e)
			}
		}, b
	}]), angular.module("services.httpRequestTracker", []), angular.module("services.httpRequestTracker").factory("httpRequestTracker", ["$http", function(a) {
		var b = {};
		return b.hasPendingRequests = function() {
			return a.pendingRequests.length > 0
		}, b
	}]), angular.module("services.i18nNotifications", ["services.notifications", "services.localizedMessages"]), angular.module("services.i18nNotifications").factory("i18nNotifications", ["localizedMessages", "notifications", function(a, b) {
		var c = function(b, c, d, e) {
				return angular.extend({
					message: a.get(b, d),
					type: a.get(c, d)
				}, e)
			},
			d = {
				pushSticky: function(a, d, e, f) {
					return b.pushSticky(c(a, d, e, f))
				},
				pushForCurrentRoute: function(a, d, e, f) {
					return b.pushForCurrentRoute(c(a, d, e, f))
				},
				pushForNextRoute: function(a, d, e, f) {
					return b.pushForNextRoute(c(a, d, e, f))
				},
				getCurrent: function() {
					return b.getCurrent()
				},
				remove: function(a) {
					return b.remove(a)
				},
				removeAll: function() {
					return b.removeAll()
				}
			};
		return d
	}]), angular.module("services.localizedMessages", []).factory("localizedMessages", ["$interpolate", "I18N.MESSAGES", function(a, b) {
		var c = function(a, b) {
				return a || "?" + b + "?"
			};
		return {
			get: function(d, e) {
				var f = b[d];
				return f ? a(f)(e) : c(f, d)
			}
		}
	}]), angular.module("services.mine", []), angular.module("services.mine").factory("MineService", ["$http", "$rootScope", function(a, b) {
		var c = {};
		return c.getMyScenes = function(d, e, f, g, h, i) {
			var j;
			j = d ? "index.php?c=scene&a=my&type=" + d : "index.php?c=scene&a=my";
			if(g){ j += "&branchid=" + g }
			if(e==null)
				e=1;
			var k = {
				showData: h,
				pageNo: e,
				pageSize: f,
				user: g,
				name: i
			};
			return j += (/\?/.test(j) ? "&" : "?") + "time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + j,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(k)
			}).then(function(a) {
				200 == a.data.code && (c.scenes = a.data, b.$broadcast("get.my.scene.list"))
			})
		}, c.deleteSceneById = function(b, c) {
			var d = "index.php?c=scene&a=delscene&id=" + b;
			return c && (d += "&backup=" + c), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + d
			})
		}, c.getMyHistoryScenes = function(b, c, d) {
			var e = "m/scene/recycle/list";
			return e += "?pageNo=" + (b ? b : 1), e += "&pageSize=" + (c ? c : 12), d && (e += "&user=" + d), e += (/\?/.test(e) ? "&" : "?") + "time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + e
			})
		}, c
	}]), angular.module("services.modal", ["confirm-dialog", "message-dialog", "bindemail-dialog"]).factory("ModalService", ["$modal", function(a) {
		var b = {};
		return b.openBindEmailDialog = function() {
			a.open({
				keyboard: !1,
				backdropClick: !0,
				windowClass: "confirm-dialog",
				templateUrl: "dialog/bindemail.tpl.html",
				controller: "BindEmailDialogCtrl"
			})
		}, b.openConfirmDialog = function(b, c, d) {
			a.open({
				backdrop: "static",
				keyboard: !1,
				backdropClick: !1,
				windowClass: "confirm-dialog",
				templateUrl: "dialog/confirm.tpl.html",
				controller: "ConfirmDialogCtrl",
				resolve: {
					confirmObj: function() {
						return b
					}
				}
			}).result.then(c, d)
		}, b.openMsgDialog = function(b, c, d) {
			a.open({
				backdrop: "static",
				keyboard: !1,
				backdropClick: !1,
				windowClass: "message-dialog",
				templateUrl: "dialog/message.tpl.html",
				controller: "MessageDialogCtrl",
				resolve: {
					msgObj: function() {
						return b
					}
				}
			}).result.then(c, d)
		}, b
	}]), angular.module("I18N.MESSAGES", []).service("I18N.MESSAGES", ["$translate", "$rootScope", function(a, b) {
		function c() {
			angular.copy({
				"notify.success": "success",
				"notify.info": "info",
				"notify.danger": "danger",
				"notify.warning": "warning",
				"notify.tip": "tip",
				"errors.route.changeError": "Route change error",
				"crud.user.save.success": "A user with id '{{id}}' was saved successfully.",
				"crud.user.remove.success": "A user with id '{{id}}' was removed successfully.",
				"crud.user.remove.error": "Something went wrong when removing user with id '{{id}}'.",
				"crud.user.save.error": "Something went wrong when saving a user...",
				"crud.project.save.success": "A project with id '{{id}}' was saved successfully.",
				"crud.project.remove.success": "A project with id '{{id}}' was removed successfully.",
				"crud.project.save.error": "Something went wrong when saving a project...",
				"login.reason.notAuthorized": "离开久了，麻烦再登录一次吧！",
				"login.reason.notAuthenticated": "您的账号已在其它地方登录，如非本人操作，请立即修改密码确保账号安全！",
				"login.error.invalidCredentials": "登录失败，请检查邮箱和密码是否正确。",
				"login.error.serverError": "There was a problem with authenticating: {{exception}}.",
				"register.error.serverError": "There was a problem with authenticating: {{exception}}.",
				"login.reset.notmatch": "新密码和重复密码不匹配",
				"register.error.match": "两次输入密码不一致",
				"register.error.agreement": "请先同意注册协议再完成注册",
				"file.bg.pageSize": "12",
				"scene.create.console.ppt.error":"还未上传PPT图片,请重新上传！",
				"scene.create.console.ppt.success":"PPT图片上传成功！",
				"scene.create.console.psd.error":"还未上传psd图片,请重新上传！",
				"scene.create.console.psd.success":"psd图片上传成功！",
				"scene.save.success.published": "微课已保存成功！",
				"scene.save.success.nopublish": "保存成功，还需要发布哦！",
				"scene.save.success.companyTpl": "成功生成企业样例",
				"scene.clear.success.companyTpl": "成功取消企业样例",
				"companytpl.setting.success": "成功生成企业模板",
				"mytpl.setting.success": "成功生成我的模板",
				"scene.publish.success": "微课发布成功",
				"account.success": "提交成功！",
				"branch.open.success": "账号打开成功！",
				"branch.close.success": "账号关闭成功！",
				"dept.create.success": "部门创建成功！",
				"dept.update.success": "修改成功！",
				"branch.create.success": "账号创建成功！",
				"branch.update.success": "账号修改成功！",
				"scene.setting.success": "微课设置成功！",
				"data.assign.success": "分组成功！",
				"data.delete.success": "数据删除成功！",
				"custom.data.delete": "此条客户数据删除成功！",
				"group.delete.success": "分组删除成功！",
				"group.create.success": "分组创建成功！",
				"group.delete.data": "成功从分组内移除",
				"rel.tip": "您的账号还没有绑定邮箱，去用户中心->账号管理，马上绑定",
				"page.change.success": "页面名称修改成功！",
				"email.save.success": "邮箱绑定成功！",
				"reset.psw.success": "密码修改成功！",
				"save.success": "保存成功！",
				"upload.success": "上传成功！",
				"mail.rel.success": "关联成功！",
				"mail.unbind.success": "解除关联成功！",
				"file.assign.success": "分组成功！",
				"already.rel": "此账号已经关联过邮箱",
				"branch.reset.success": "子账号密码重置成功！",
				"already.bind.error": "{{msg}}",
				"reject.crop.image": "不支持裁剪GIF格式图片！",
				"visitor.apply": "信息已经提交审核，审核通过后会更新秀客信息，请耐心等待。",
				"select.trigger.source": "请选择触发源",
				"scratch.percentage.overflow": "涂抹比例不能大于100%",
				"invitation.sendemail.success": "邮件发送成功!",
				"invitation.sendemail.error": "邮件发送失败!",
				"outbox.warning": "红色警告：超出虚线外边框的内容，将无法在手机中被看到",
				"outbox.tip": "橙色警告：超出虚线内边框的内容，在部分老机型手机中将无法看到",
				"already.apply.discovery": "您已申请加入微课，暂时不能再申请！",
				"already.apply.sample": "您已申请过成为样例，暂时不能再申请！",
				"already.apply.activity": "您已申请过成为活动，暂时不能再申请！",
				"scene.apply.success": "申请成功",
				"xd.insufficient": "微币余额不足，去用户中心－>会员服务进行充值",
				"customer.name.overflow": "姓名不能超过50个字符",
				"scene.deny.apply": "审核未通过的微课不能申请活动",
				"scene.incheck.apply": "审核中的微课不能申请活动",
				"scene.accessCode.apply": "加密设置的微课不能加入活动"
			}, d)
		}
		var d = {};
		return a("notificationmsg.NOT_AUTHORIZED").then(function() {
			c()
		}), b.$on("$translateChangeSuccess", function() {
			a("notificationmsg.NOT_AUTHORIZED").then(function() {
				c()
			})
		}), d
	}]), angular.module("services.notifications", []).factory("notifications", ["$rootScope", function(a) {
		var b = {
			STICKY: [],
			ROUTE_CURRENT: [],
			ROUTE_NEXT: []
		},
			c = {},
			d = function(a, b) {
				if (!angular.isObject(b)) throw new Error("Only object can be added to the notification service");
				return a.push(b), b
			};
		return a.$on("$routeChangeSuccess", function() {
			b.ROUTE_CURRENT.length = 0, b.ROUTE_CURRENT = angular.copy(b.ROUTE_NEXT), b.ROUTE_NEXT.length = 0
		}), c.getCurrent = function() {
			return [].concat(b.STICKY, b.ROUTE_CURRENT)
		}, c.pushSticky = function(a) {
			return d(b.STICKY, a)
		}, c.pushForCurrentRoute = function(a) {
			return d(b.ROUTE_CURRENT, a)
		}, c.pushForNextRoute = function(a) {
			return d(b.ROUTE_NEXT, a)
		}, c.remove = function(a) {
			angular.forEach(b, function(b) {
				var c = b.indexOf(a);
				c > -1 && b.splice(c, 1)
			})
		}, c.removeAll = function() {
			angular.forEach(b, function(a) {
				a.length = 0
			})
		}, c
	}]), angular.module("services.pagetpl", []), angular.module("services.pagetpl").factory("pageTplService", ["$http", "$rootScope", "$modal", "$q", "dataCacheService", function(a, b, c, d, e) {
		var f = {};
		return f.getPageTpls = function(b) {
			var c = "index.php?c=scene&a=getpagetpl&type=" + b,
				d = new Date;
			return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, f.getMyTplList = function(b) {
			var c = "/index.php?c=scene&a=pagelist&id=" + b,
				d = new Date;
			return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, f.getPageTplTypes = function() {
			var b = "index.php?c=statics&a=getPageTplType",
				c = new Date;
			return b += (/\?/.test(b) ? "&" : "?") + "time=" + c.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + b
			})
		}, f.getPageTagLabel = function(b) {
			var c = "index.php?c=statics&a=tagList&type=1";
			null != b && (c += (/\?/.test(c) ? "&" : "?") + "bizType=" + b);
			var d = new Date;
			return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, f.getTagSysListWithType = function(b) {
			var c = "index.php?c=upfile&a=systag&type=2";
			null != b && (c += (/\?/.test(c) ? "&" : "?") + "bizType=" + b);
			var d = new Date;
			return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, f.getPageTagLabelCheck = function(b) {
			var c = "/m/scene/tag/page/list?id=" + b,
				d = new Date;
			return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, f.getPageTplTypestemp = function(b, c, d, f) {
			var g = "index.php?c=scene&a=syspagetpl",
				h = g,
				i = (new Date, {});
			return null != b && (h += (/\?/.test(g) ? "&" : "?") + "tagId=" + b, i.tagId = b), c && (h += (/\?/.test(g) ? "&" : "?") + "name=" + c, i.name = c), d && (h += (/\?/.test(g) ? "&" : "?") + "pageSize=" + d, i.pageSize = d), f && (h += (/\?/.test(g) ? "&" : "?") + "pageNo=" + f, i.pageNo = f), false ? e.asyncGet("pageTpl", h) : (e.setAsyncUrl(h), a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + g,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(i)
			}))
		}, f.updataChildLabel = function(b, c) {
			var d = "m/scene/tag/page/set/?ids=" + b;
			null != c && (d += (/\?/.test(d) ? "&" : "?") + "pageId=" + c);
			var e = new Date;
			return d += (/\?/.test(d) ? "&" : "?") + "time=" + e.getTime(), a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + d
			})
		}, f
	}]), angular.module("services.sample", []).factory("sampleService", ["$rootScope", "$http", function(a, b) {
		var c = {};
		return c.getSamples = function(a, c, d) {
			var e = PREFIX_S2_URL + "index.php?c=scene&a=promotion&recommend=2";
			return a && (e += "&type=" + a), c && (e += /\?/.test(e) ? "&" : "?", e += "pageNo=" + c), d && (e += /\?/.test(e) ? "&" : "?", e += "pageSize=" + d), b({
				withCredentials: !0,
				method: "GET",
				url: e
			})
		}, c.getSamplesPV = function() {
			var a = PREFIX_S1_URL + "eqs/topThree?time=" + (new Date).getTime();
			return b({
				withCredentials: !0,
				method: "GET",
				url: a
			})
		}, c
	}]), angular.module("services.scene", ["scene.create.console", "services.history", "services.select", "scene.create.console.pictures", "scene.edit.trigger", "services.dataCache"]), angular.module("services.scene").factory("sceneService", ["$http", "$rootScope", "$modal", "$q", "security", "$cacheFactory", "historyService", "selectService", "picturesService", "ModalService", "triggerService", "$translate", "i18nNotifications", "dataCacheService", function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
		function o(a) {
			fa.splice(fa.indexOf(ga[a]), 1), delete ga[a]
		}
		function p(a) {
			ea.obj.elements = a, $("#nr").empty(), da.parse({
				def: ea.obj,
				appendTo: "#nr",
				mode: "edit"
			});
			for (var c in a) if (3 == a[c].type) {
				var d = "";
				a[c].properties.imgSrc && (d = a[c].properties.imgSrc), b.$broadcast("show.edit.bg", d);
				break
			}
			b.$broadcast("dom.changed")
		}
		function q(a) {
			angular.copy({}, ga), $.each(a, function(a, b) {
				ga[b.id] = b
			})
		}
		function r(a, b) {
			var c = {},
				d = $("#nr .edit_area"),
				e = d.children().last(),
				f = d.children(".maxIndex"),
				g = 0;
			if (g = f.length > 0 ? parseInt(f.css("z-index"), 10) + 1 : e.length > 0 ? parseInt(e.css("z-index"), 10) + 1 : 101, b) return b.zIndex = g, parseInt(b.top, 10) > $("#nr .edit_area").outerHeight() - 20 && (b.top = $("#nr .edit_area").outerHeight() - 20 + "px"), b;
			var h = $("#nr .edit_area").outerWidth(),
				i = h;
			return "v" == a && (i = 50), "4" == a && (i = 80), (5 == ("" + a).charAt(0) || "6" == a || "r" == a || "c" == a || "a" == a || "ad" == a) && (i = 200), c = {
				top: "100px"
				// ,
				// left: (h - i) / 2 + "px"
			}, c.zIndex = g, c
		}
		function s(a, b, c, d) {
			var e = parseInt(a.css.top, 10) + 10 * ha,
				f = parseInt(a.css.left, 10);
			e + 34 > $("#nr .edit_area").outerHeight() ? (b.css.top = e + "px", b.css.left = f + 10 + "px") : (b.css.top = e + 34 + "px", b.css.left = a.css.left, c == d && ha++)
		}
		function t() {
			return Math.ceil(1e10 * Math.random())
		}
		function u(a, b, c) {
			var d, e = t(),
				f = {};
			if (3 == ("" + a).charAt(0)) {
				var g, h = [];
				for (g = 0; g < fa.length; g++) 3 == fa[g].type && h.push(fa[g]);
				if (h.length > 0) return h[0];
				f = {
					content: null,
					css: {},
					id: e,
					num: 0,
					pageId: ea.obj.id,
					properties: {
						bgColor: null,
						imgSrc: null
					},
					sceneId: ea.obj.sceneId,
					title: null,
					type: 3
				}
			}
			return 1 == ("" + a).charAt(0) && (f = {
				id: e,
				properties: {
					title: l.instant("common.scene.COMMIT")
				},
				type: 1,
				pageId: ea.obj.id,
				sceneId: ea.obj.sceneId
			}), 8 == ("" + a).charAt(0) && (d = r(a, b), $.extend(!0, d, {
				color: "rgb(255, 255, 255)",
				width: "100px",
				height: "40px",
				lineHeight: "40px",
				borderWidth: "0",
				borderStyle: "solid",
				borderColor: "#ccc",
				borderRadius: "0",
				backgroundColor: "rgb(244, 113, 31)"
			}), f = {
				content: "",
				css: d,
				id: e,
				num: 1,
				pageId: ea.obj.id,
				properties: {
					title: l.instant("common.scene.DIALING"),
					number: ""
				},
				sceneId: ea.obj.sceneId,
				title: null,
				type: 8
			}), "l" == a && (d = r(a, b), $.extend(!0, d, {
				color: "rgb(255, 255, 255)",
				width: "100px",
				height: "40px",
				lineHeight: "40px",
				borderWidth: "0",
				borderStyle: "solid",
				borderColor: "#ccc",
				borderRadius: "0",
				backgroundColor: "rgb(244, 113, 31)"
			}), f = {
				content: "",
				css: d,
				id: e,
				num: 1,
				pageId: ea.obj.id,
				properties: {
					title: l.instant("common.scene.BUY")
				},
				sceneId: ea.obj.sceneId,
				title: null,
				type: "l"
			}), "s" == a && (d = r(a, b), $.extend(!0, d, {
				color: "rgb(255, 255, 255)",
				width: "100px",
				height: "40px",
				lineHeight: "40px",
				borderWidth: "0",
				borderStyle: "solid",
				borderColor: "#ccc",
				borderRadius: "0",
				backgroundColor: "rgb(244, 113, 31)"
			}), f = {
				content: "",
				css: d,
				id: e,
				num: 1,
				pageId: ea.obj.id,
				properties: {
					title: l.instant("common.scene.SURPRISE")
				},
				sceneId: ea.obj.sceneId,
				title: null,
				type: "s"
			}), (2 == ("" + a).charAt(0) || "x" == ("" + a).charAt(0)) && (d = r(a, b), $.extend(!0, d, {
				width: 320,
				height: 38
			}), f = {
				content: l.instant("common.scene.EDIT_TIP"),
				css: d,
				id: e,
				num: 1,
				pageId: ea.obj.id,
				properties: {},
				sceneId: ea.obj.sceneId,
				title: null,
				type: ("" + a).charAt(0)
			}), "x" == ("" + a).charAt(0) && (f.properties = {
				dataUrl: ""
			}), 4 == ("" + a).charAt(0) && (d = r(a, b), d.width = "100px", d.height = "100px", f = {
				content: "",
				css: d,
				id: e,
				num: 1,
				pageId: ea.obj.id,
				properties: {
					width: "100px",
					height: "100px",
					src: ""
				},
				sceneId: ea.obj.sceneId,
				title: null,
				type: 4
			}),"h" == a && (d = r(a, b), $.extend(!0, d, {
				color: "#555",
				width: "100px",
				height: "100px"
			}), f = {
				content: "",
				css: d,
				id: e,
				pageId: ea.obj.id,
				properties: {
					type: "rect"
				},
				sceneId: ea.obj.sceneId,
				title: null,
				type: "h"
			}),"m" == ("" + a).charAt(0) && (d = r(a, b), d.width = "320px", d.height = "240px", f = {
				//添加到页面-百度地图
				content: "",
				css: d,
				id: e,
				num: 1,
				pageId: ea.obj.id,
				properties: {
					width: "400px",
					height: "300px",
					src: ""
				},
				sceneId: ea.obj.sceneId,
				title: null,
				type: "m"
			}), 5 == ("" + a).charAt(0) && (d = r(a, b), d.width = "200px", $.extend(!0, d, {
				color: "#676767",
				borderWidth: "1",
				borderStyle: "solid",
				borderColor: "#08a1ef",
				borderRadius: "0",
				backgroundColor: "#ffffff"
			}), f = {
				content: "",
				css: d,
				id: e,
				num: 1,
				pageId: ea.obj.id,
				properties: {
					placeholder: l.instant("common.scene.NAMED")
				},
				isInput: 1,
				sceneId: ea.obj.sceneId,
				title: l.instant("common.scene.NAMED"),
				type: 5
			}), "r" == a && (d = r(a, b), d.width = "200px", delete d.height, $.extend(!0, d, {
				color: "#676767",
				borderWidth: "1",
				borderStyle: "solid",
				borderColor: "#08a1ef",
				borderRadius: "0",
				backgroundColor: "#ffffff"
			}), f = {
				content: "",
				css: d,
				id: e,
				num: 1,
				pageId: ea.obj.id,
				properties: {
					titleStyle: {
						backgroundColor: "#08a1ef",
						color: "#ffffff"
					},
					optionStyle: {
						borderBottomWidth: "1",
						borderBottomStyle: "solid",
						borderBottomColor: "#08a1ef"
					}
				},
				choices: '{"seq":3,"options":[{"id":1,"label":"选项1"},{"id":2,"label":"选项2"},{"id":3,"label":"选项3"}]}',
				isInput: 1,
				sceneId: ea.obj.sceneId,
				title: "",
				type: "r"
			}), "c" == a && (d = r(a, b), d.width = "200px", delete d.height, $.extend(!0, d, {
				color: "#676767",
				borderWidth: "1",
				borderStyle: "solid",
				borderColor: "#08a1ef",
				borderRadius: "0",
				backgroundColor: "#ffffff"
			}), f = {
				content: "",
				css: d,
				id: e,
				num: 1,
				pageId: ea.obj.id,
				properties: {
					titleStyle: {
						backgroundColor: "#08a1ef",
						color: "#ffffff"
					},
					optionStyle: {
						borderBottomWidth: "1",
						borderBottomStyle: "solid",
						borderBottomColor: "#08a1ef"
					}
				},
				choices: '{"seq":3,"options":[{"id":1,"label":"选项1"},{"id":2,"label":"选项2"},{"id":3,"label":"选项3"}]}',
				isInput: 1,
				sceneId: ea.obj.sceneId,
				title: "",
				type: "c"
			}), "a" == a && (d = r(a, b), d.width = "200px", delete d.height, $.extend(!0, d, {
				color: "#676767",
				borderWidth: "0",
				borderStyle: "solid",
				borderColor: "#ccc",
				borderRadius: "0",
				backgroundColor: "#f9f9f9"
			}), f = {
				content: "",
				css: d,
				id: e,
				num: 1,
				pageId: ea.obj.id,
				properties: {
					icon: "eqf-star",
					size: "rating-m",
					color: "#ff9307"
				},
				isInput: 1,
				sceneId: ea.obj.sceneId,
				title: "",
				type: "a"
			}), "i" == a && (d = r(a, b), $.extend(!0, d, {
				width: "200px",
				height: "55px",
				lineHeight: "55px",
				color: "#676767",
				borderWidth: "0",
				borderStyle: "solid",
				borderColor: "#ccc",
				borderRadius: "0",
				backgroundColor: "#f9f9f9"
			}), f = {
				content: "",
				css: d,
				id: e,
				num: 1,
				pageId: ea.obj.id,
				properties: {
					layout: "counter-lr",
					size: "counter-m",
					color: "#08a1ef",
					icon: "eqf-love"
				},
				sceneId: ea.obj.sceneId,
				title: "",
				type: "i"
			}), "d" == ("" + a).charAt(0) && (d = r(a, b), $.extend(!0, d, {
				width: "200px",
				height: "55px",
				lineHeight: "55px",
				color: "#676767",
				borderWidth: "0",
				borderStyle: "solid",
				borderColor: "#ccc",
				borderRadius: "0",
				backgroundColor: "#f9f9f9"
			}), f = {
				content: "",
				css: d,
				id: e,
				num: 1,
				pageId: ea.obj.id,
				properties: {
					layout: "counter-lr",
					size: "counter-m",
					color: "#08a1ef",
					icon: "eqf-eye3"
				},
				sceneId: ea.obj.sceneId,
				title: "",
				type: "d"
			}), 6 == ("" + a).charAt(0) && (d = r(a, b), d.width = "200px", $.extend(!0, d, {
				color: "#fff",
				borderRadius: "0",
				backgroundColor: "#08a1ef"
			}), f = {
				content: "",
				css: d,
				id: e,
				num: 1,
				pageId: ea.obj.id,
				properties: {
					title: l.instant("common.scene.COMMIT")
				},
				sceneId: ea.obj.sceneId,
				title: null,
				type: 6
			}), "p" == a && (d = r(a, b), f = {
				content: "",
				css: d,
				id: e,
				num: 1,
				pageId: ea.obj.id,
				properties: {
					title: l.instant("common.scene.ATLAS")
				},
				sceneId: ea.obj.sceneId,
				title: null,
				type: "p"
			}), "v" == a && (d = r(a, b), d.width = "48px", d.height = "48px", f = {
				content: "",
				css: d,
				id: e,
				num: 1,
				pageId: ea.obj.id,
				properties: {
					src: ""
				},
				sceneId: ea.obj.sceneId,
				title: null,
				type: "v"
			}), "n" == a && (d = r(a, b), f = {
				content: "",
				css: d,
				id: e,
				pageId: ea.obj.id,
				properties: {
					pics: []
				},
				sceneId: ea.obj.sceneId,
				title: null,
				type: "n"
			}), c && $.extend(!0, f, c), fa.push(f), ga[f.id] = f, f
		}
		function v(a, c, d) {
			var e = da.wrapComp(c, "edit");
			$("#nr .edit_area").append(e);
			for (var f = da.getInterceptors(), h = 0; h < f.length; h++) f[h](e, c);
			return da.getEventHandlers()[("" + a).charAt(0)](e, c), d || (g.addPageHistory(ea.obj.id, ea.obj.elements), b.$broadcast("dom.changed"), e.trigger("mousedown")), e
		}
		// function vv(a, c, d) {
		// 	var e = da.wrapComp(c, "edit");
		// 	$("#nr .edit_area").append(e);
		// 	for (var f = da.getInterceptors(), h = 0; h < f.length; h++) f[h](e, c);
		// 	return da.getEventHandlers()[("" + a).charAt(0)](e, c), d || (g.addPageHistory(ea.obj.id, ea.obj.elements), b.$broadcast("dom.changed"), e.trigger("mousedown")), e
		// }
		function w(a, b) {
			var c = [];
			return "g101" == a && (c.push(ka("501")), c.push(ka("502")), c.push(ka("503")), c.push(ka("601"))), c
		}
		function x(a, c) {
			ca.currentElemDef = c;
			var d = c.css.height || 0;
			$(a).css({
				"min-height": d,
				cursor: "text"
			}), $(a).parents("li").hasClass("inside-active") || ($(a).bind("click", function(a) {
				a.stopPropagation()
			}), $(document).bind("mousedown", function(e) {
				b.$broadcast("convert.html.canvas", c, a), $(a).css({
					"min-height": "inherit",
					cursor: "default"
				}), $("#btn-toolbar").find("input[type=text][data-edit]").blur(), $("#btn-toolbar") && $("#btn-toolbar").remove(), $(a).unbind("click");
				var f = c.content;
				c.content = $(a).html(), f != c.content && b.$broadcast("hisChange");
				var g = parseInt($(a).parent().height(), 10);
				g > d && (c.css.height = g, $(a).parents("li").height(g)), $(a).parents("li").removeClass("inside-active").css("user-select", "none"), $(a).removeAttr("contenteditable"), window.getSelection && window.getSelection().modify("move", "right", "line"), $(document).unbind("mousedown")
			}), $(a).parents("li").addClass("inside-active").css("user-select", "text"), b.$broadcast("text.click", a))
		}
		function y(a) {
			Q(a, function(b) {
				a.properties.src = b.data, a.properties.id = b.id;
				var c = b.width / b.height,
					d = $("#" + a.id);
				if (d.length > 0) {
					var e = $("#inside_" + a.id).width(),
						f = $("#inside_" + a.id).height(),
						g = e / f;
					c >= g ? (d.outerHeight(f), d.outerWidth(f * c), d.css("marginLeft", -(d.outerWidth() - e) / 2), d.css("marginTop", 0)) : (d.outerWidth(e), d.outerHeight(e / c), d.css("marginTop", -(d.outerHeight() - f) / 2), d.css("marginLeft", 0)), d.attr("src", PREFIX_FILE_HOST + b.data), a.properties.imgStyle = {}, a.properties.imgStyle.width = d.outerWidth(), a.properties.imgStyle.height = d.outerHeight(), a.properties.imgStyle.marginTop = d.css("marginTop"), a.properties.imgStyle.marginLeft = d.css("marginLeft")
				} else b.width > $("#nr .edit_area").width() && (b.width = $("#nr .edit_area").width(), b.height = b.width / c), b.height > $("#nr .edit_area").height() && (b.height = $("#nr .edit_area").height(), b.width = b.height * c), a.css.width = b.width, a.css.height = b.height, a.properties.imgStyle = {}, a.properties.imgStyle.width = b.width, a.properties.imgStyle.height = b.height, a.properties.imgStyle.marginTop = "0", a.properties.imgStyle.marginLeft = "0", v(a.type, a)
			}, function() {
				a.properties.src || o(a.id)
			})
		}
		function z(a) {
			la || c.open({
				windowClass: "console six-contain shape-console",
				templateUrl: "scene/console/shape.tpl.html",
				controller: "ShapeConsoleCtrl",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(b) {
				var c = $("#" + a.id);
				if (a.properties.type = b.type, a.properties.viewBox = b.viewBox, c.length) {
					var d = $("#nr").find("#inside_" + a.id);
					d.remove(), v(a.type, a)
				} else v(a.type, a)
			}, function() {
				$("#" + a.id).length || o(a.id)
			})
		}
		function Ma(a) {
			la || c.open({
				windowClass: "modal-dialog",
				templateUrl: "scene/console/adr.tpl.html",
				controller: "AdrConsoleCtrl",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(b) {
				var c = $("#" + a.id);
				if (a.properties.type = b.type, a.properties.viewBox = b.viewBox, c.length) {
					var d = $("#nr").find("#inside_" + a.id);
					d.remove(), v(a.type, a)
				} else v(a.type, a)
			}, function() {
				$("#" + a.id).length || o(a.id)
			})
		}
		function A(a) {
			c.open({
				windowClass: "console seven-contain",
				templateUrl: "scene/console/button.tpl.html",
				controller: "ButtonConsoleCtrl",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(b) {
				a.properties.title = b.title, a.properties.number = b.number, $.extend(!0, a.css, b.btnStyle);
				var c = $("#" + a.id, $("#nr"));
				c.length > 0 && c.parents("li").remove(), v(a.type, a)
			}, function() {
				$("#" + a.id).length || o(a.id)
			})
		}
		function B(a) {
			la || (la = c.open({
				windowClass: "console six-contain",
				templateUrl: "scene/console/tel.tpl.html",
				controller: "TelConsoleCtrl",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(b) {
				la = null, a.properties.title = b.title, a.properties.number = b.number;
				b.title.replace(/ /g, "&nbsp;");
				$.extend(!0, a.css, b.btnStyle), $("#" + a.id).length > 0 && $("#" + a.id).parents("li").remove(), v(a.type, a)
			}, function() {
				la = null, $("#" + a.id).length || o(a.id)
			}))
		}
		function C(a) {
			la || (la = c.open({
				windowClass: "console seven-contain",
				templateUrl: "scene/console/input.tpl.html",
				controller: "InputConsoleCtrl",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(b) {
				la = null, b.type && (a.type = b.type), a.properties.placeholder = b.title, a.properties.required = b.required, a.title = b.title, $.extend(!0, a.css, b.btnStyle);
				var c = $("#" + a.id);
				c.length > 0 && c.parents("li").remove(), v(a.type, a)
			}, function() {
				la = null, $("#" + a.id).length || o(a.id)
			}))
		}
		function D(a) {
			la || (la = c.open({
				windowClass: "console seven-contain",
				templateUrl: "scene/console/radio-checkbox.tpl.html",
				controller: "RadioCheckboxConsoleCtrl",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(b) {
				la = null, a.title = b.title, a.type = b.type;
				var c = $("#nr").find("#inside_" + a.id);
				c.length && c.remove(), v(a.type, a)
			}, function() {
				la = null, $("#" + a.id).length || o(a.id)
			}))
		}
		function E(a) {
			la || (la = c.open({
				windowClass: "console seven-contain",
				templateUrl: "scene/console/rating.tpl.html",
				controller: "RatingConsoleCtrl",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(b) {
				la = null;
				var c = $("#nr").find("#inside_" + a.id);
				c.length && c.remove(), v(a.type, a)
			}, function() {
				la = null, $("#" + a.id).length || o(a.id)
			}))
		}
		function F(a) {
			la || (la = c.open({
				windowClass: "console six-contain",
				templateUrl: "scene/console/counter.tpl.html",
				controller: "CounterConsoleCtrl",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(b) {
				la = null, $.extend(!0, a.css, b.btnStyle), $("#" + a.id).length > 0 && $("#" + a.id).parents("li").remove(), v(a.type, a)
			}, function() {
				la = null, $("#" + a.id).length || o(a.id)
			}))
		}
		function G(a) {
			la || (la = c.open({
				windowClass: "console six-contain",
				templateUrl: "scene/console/statistics-component.tpl.html",
				controller: "StatisticsConsoleCtrl",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(b) {
				la = null, $.extend(!0, a.css, b.btnStyle), $("#" + a.id).length > 0 && $("#" + a.id).parents("li").remove(), v(a.type, a)
			}, function() {
				la = null, $("#" + a.id).length || o(a.id)
			}))
		}
		function H(a) {
			la || (la = c.open({
				windowClass: "console six-contain",
				templateUrl: "scene/console/link-component.tpl.html",
				controller: "LinkComponentConsoleCtrl",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(b) {
				la = null, isNaN(a.properties.url) && (a.properties.url = PREFIX_S1_URL + "eqs/link?id=" + a.sceneId + "&url=" + encodeURIComponent(a.properties.url)), $.extend(!0, a.css, b.btnStyle), $("#" + a.id).length > 0 && $("#" + a.id).parents("li").remove(), v(a.type, a)
			}, function() {
				la = null, $("#" + a.id).length || o(a.id)
			}))
		}
		function I(a) {
			la || (la = c.open({
				windowClass: "console six-contain",
				templateUrl: "scene/console/sound-component.tpl.html",
				controller: "SoundComponentConsoleCtrl",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(b) {
				la = null;
				b.title.replace(/ /g, "&nbsp;");
				$.extend(!0, a.css, b.btnStyle), $("#" + a.id).length > 0 && $("#" + a.id).parents("li").remove(), v(a.type, a)
			}, function() {
				la = null, $("#" + a.id).length || o(a.id)
			}))
		}
		function J(a) {
			la || (la = c.open({
				windowClass: "console seven-contain pictures1",
				backdrop: "static",
				templateUrl: "scene/console/pictures1.tpl.html",
				controller: "pictures1Ctrl",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(b) {
				la = null, a.properties = b;
				var c = $("#inside_" + a.id);
				c.length && c.remove(), v(a.type, a)
			}, function() {
				la = null, $("#" + a.id).length || o(a.id)
			}))
		}
       	function K(a, b) {
			var c = Y;
			M(c, 2, function(a) {
				c.bgAudio && n.pushUsedFile(2, a.id), a.url || a.src ? (n.removeUsedFile(2, a.id), c.bgAudio = a) : c.bgAudio = null
			}, function() {
				la = null
			})
		}
		function KK(a, b) {
			var c = Y;
			MM(c, 2, function(a) {
				c.bgAudio && n.pushUsedFile(2, a.id), a.url || a.src ? (n.removeUsedFile(2, a.id), c.bgAudio = a) : c.bgAudio = null
			}, function() {
				la = null
			})
		}
		function L(a, b) {
			M(a, 4, function(b) {
				var c = $("#inside_" + a.id);
				b.src ? (a.sound = b, c.children(".sound").length || $('<div class="sound eqf-music">').click(function() {
					L(a)
				}).appendTo(c)) : (delete a.sound, c.children(".sound").remove())
			}, function() {
				la = null
			})
		}
		function M(a, b, d, e) {
			la || (la = c.open({
				windowClass: "console img_console",
				templateUrl: "scene/console/sound.tpl.html",
				controller: "soundCtrl",
				resolve: {
					obj: function() {
						return {
							elemDef: a,
							type: b
						}
					}
				}
			}).result.then(function(a) {
				la = null, d(a)
			}, function() {
				la = null
			}))
		}
		function MM(a, b, d, e) {
			la || (la = c.open({
				windowClass: "console img_console",
				templateUrl: "scene/console/sound2.tpl.html",
				controller: "soundCtrl",
				resolve: {
					obj: function() {
						return {
							elemDef: a,
							type: b
						}
					}
				}
			}).result.then(function(a) {
				la = null, d(a)
			}, function() {
				la = null
			}))
		}
		function N(a) {
			la || (la = c.open({
				windowClass: "console six-contain",
				templateUrl: "scene/console/video.tpl.html",
				controller: "VideoCtrl",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(b) {
				la = null, a.properties.src = b, $("#" + a.id).length || v(a.type, a)
			}, function() {
				la = null, $("#" + a.id).length || o(a.id)
			}))
		}
		function O(a) {
			Q(a, function(c) {
				if ("imgSrc" == c.type) {
					var d = {
						type: 3,
						properties: {
							src: c.data,
							id: c.id
						}
					};
					c.height / c.width >= 1008 / 642 && c.height / c.width <= 1.578125 ? (b.$broadcast("scene.bg.replace", {
						type: "imgSrc",
						src: c.data,
						id: c.id
					}, a), g.addPageHistory(ea.obj.id, ea.obj.elements)) : U(d, function(c) {
						b.$broadcast("scene.bg.replace", {
							type: "imgSrc",
							src: c.src,
							id: c.id
						}, a), g.addPageHistory(ea.obj.id, ea.obj.elements)
					}, function() {
						$("#" + a.id).length || o(a.id)
					})
				}
				"backgroundColor" == c.type && (b.$broadcast("scene.bg.replace", c, a), g.addPageHistory(ea.obj.id, ea.obj.elements))
			}, function() {
				$("#" + a.id).length || o(a.id)
			})
		}
		function P(a) {
			la || (la = c.open({
				windowClass: "console six-contain randomevent-console",
				templateUrl: "scene/console/randomevent.tpl.html",
				controller: "RandomEventCtrl",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(c) {
				la = null, c && 0 !== c.length && (a.properties.pics = c, $("#" + a.id).length || v(a.type, a), b.$broadcast("create.randomevent.trigger", a))
			}, function() {
				la = null, $("#" + a.id).length || o(a.id)
			}))
		}
        function PP(a){
            la || (la = c.open({
                windowClass: "console ppt_console",
                templateUrl: "scene/console/ppt.tpl.html",
                controller: "PptCtrl",
                resolve: {
                    obj: function() {
                        return a
                    }
                }
            }).result.then(function(b) {
                la = null, a.properties.src = b, $("#" + a.id).length || v(a.type, a)
            }, function() {
                la = null, $("#" + a.id).length || o(a.id)
            }))
        }
        function PS(a){
            la || (la = c.open({
                windowClass: "console ppt_console",
                templateUrl: "scene/console/psd.tpl.html",
                controller: "PsdCtrl",
                resolve: {
                    obj: function() {
                        return a
                    }
                }
            }).result.then(function(b) {
                la = null, a.properties.src = b, $("#" + a.id).length || v(a.type, a)
            }, function() {
                la = null, $("#" + a.id).length || o(a.id)
            }))
        }
		function Q(a, b, d) {
			if (!la) {
				var e = "0";
				3 == a.type && (e = "0"), 4 == a.type && (e = "1"), la = c.open({
					windowClass: "console img_console",
					templateUrl: "scene/console/bg.tpl.html",
					controller: "BgConsoleCtrl",
					resolve: {
						obj: function() {
							return {
								fileType: e,
								elemDef: a
							}
						}
					}
				}).result.then(function(a) {
					la = null, b(a)
				}, function(a) {
					la = null, d(a)
				})
			}
		}
		function R(a, c, d) {
			ca.currentElemDef = a, b.$broadcast("showStylePanel", {
				activeTab: "style"
			})
		}
		function S(a, c, d) {
			ca.currentElemDef = a, b.$broadcast("showStylePanel", {
				activeTab: "anim"
			})
		}
		function T(a, c, d) {
			ca.currentElemDef = a, b.$broadcast("showStylePanel", {
				activeTab: "trigger"
			})
		}
		function U(a, b, d) {
			la = c.open({
				windowClass: "console seven-contain pictures1",
				templateUrl: "scene/console/imageCrop.tpl.html",
				controller: "imageCropCtrl",
				backdrop: "static",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(a) {
				la = null, "function" == typeof b && b(a)
			}, function(a) {
				la = null, "function" == typeof d && d(a)
			})
		}
		function V() {
			$(".content").trigger("mousedown"), ca.currentElemDef = null, b.$broadcast("showStylePanel", {
				activeTab: "trigger"
			})
		}
		function W(a) {
			a.sceneId = ea.obj.sceneId, c.open({
				windowClass: "console six-contain",
				templateUrl: "scene/console/link.tpl.html",
				controller: "LinkConsoleCtrl",
				resolve: {
					obj: function() {
						return a
					}
				}
			}).result.then(function(b) {
				b && "http://" != b ? (isNaN(b) ? a.properties.url = PREFIX_S1_URL + "eqs/link?id=" + a.sceneId + "&url=" + encodeURIComponent(b) : a.properties.url = b, $("#inside_" + a.id).find(".fa-link").removeClass("fa-link").addClass("fa-anchor")) : (delete a.properties.url, $("#inside_" + a.id).find(".fa-anchor").removeClass("fa-anchor").addClass("fa-link"))
			})
		}
		function X(a, b) {
			var c = $(".element", a)[0];
			$(c).mousedown(function(a) {
				$(this).parents("li").hasClass("inside-active") && a.stopPropagation()
			}), $(c).bind("contextmenu", function(a) {
				$(this).parents("li").hasClass("inside-active") ? a.stopPropagation() : $(this).blur()
			}), $(c).bind("dblclick", function(a) {
				return $("#nr").find(".mask-trigger").length ? !1 : (x(c, b), $("#popMenu").hide(), void a.stopPropagation())
			}), $(c).bind("keydown", function(a) {
				a.stopPropagation()
			})
		}
		var Y, Z, _, aa, ba, ca = {},
			da = eqShow.templateParser("jsonParser"),
			ea = null,
			fa = null,
			ga = {},
			ha = ($("#nr .edit_area"), 0),
			ia = !1;
		ca.historyBack = function() {
			g.canBack(ea.obj.id) && (fa = g.back(ea.obj.id), q(fa), p(fa), b.$broadcast("close.style.panel"))
		}, ca.historyForward = function() {
			g.canForward(ea.obj.id) && (fa = g.forward(ea.obj.id), q(fa), p(fa), b.$broadcast("close.style.panel"))
		};
		var ja = ca.createCompGroup = function(a, c) {
				for (var d = w(a), e = 0; e < d.length; e++) {
					var f = u(d[e].type, c, d[e]);
					c = c ? {
						left: c.left,
						top: parseInt(c.top, 10) + 50 + "px"
					} : {
						left: "60px",
						top: "150px"
					}, v(d[e].type, f, !0)
				}
				g.addPageHistory(ea.obj.id, ea.obj.elements), b.$broadcast("dom.changed")
			},
			ka = function(a, b) {
				var c;
				return "501" == a && (c = {
					properties: {
						placeholder: l.instant("common.scene.NAME")
					},
					title: l.instant("common.scene.NAME"),
					type: 501
				}), "502" == a && (c = {
					properties: {
						placeholder: l.instant("common.scene.MOBILE")
					},
					title: l.instant("common.scene.MOBILE"),
					type: 502
				}), "503" == a && (c = {
					properties: {
						placeholder: l.instant("common.scene.EMAIL")
					},
					title: l.instant("common.scene.EMAIL"),
					type: 503
				}), "601" == a && (c = {
					properties: {
						title: l.instant("common.scene.COMMIT")
					},
					type: 601
				}), c
			};
		ca.createComp = function(a, b, c) {
			var d;
			searchVal = "";
			if ("g" == ("" + a).charAt(0)) return void ja(a, b);
			if ("9" == ("" + a).charAt(0)) return void K(d, 2);
			if ("q" == ("" + a).charAt(0)) return void KK(d, 2);
			if (d = u(a, b), 4 == a) return void y(d);
			if ("h" == a) return void z(d);
			if ("m" == a) return void Ma(d);
			// if ("k" == a) return void Ch(d);
			if (5 == a) return void C(d);
			if (6 == a) return void A(d);
            if (8 == a) return void B(d);
			if (22 == a) return void PP(d);
			if ("z" == a) return void PS(d);
			if ("p" == a) return void J(d);
			if ("v" == a) return void N(d);
			if (3 == a) return void O(d);
			if ("r" == a || "c" == a) return void D(d);
			if ("a" == a) return void E(d);
			if ("i" == a) return c && (d.properties.icon = c), void F(d);
			if ("d" == a) return c && (d.properties.icon = c), void G(d);
			if ("l" == a) return void H(d);
			if ("s" == a) return void I(d);
			if ("n" == a) return void P(d);
			if (2 == a || "x" == a || "j" == a) { //图表
				var e = v(a, d);
				$(".element", e).trigger("dblclick").focus(), setTimeout(function() {
					if (window.getSelection) {
						var a = window.getSelection();
						a.modify("move", "left", "line"), a.modify("extend", "right", "line")
					}
				})
			} else v(a, d)
		}, ca.updateCompPosition = function(a, c, d) {
			for (var e = 0; e < fa.length; e++)"inside_" + fa[e].id == a && (fa[e].css ? (fa[e].css.left = c.left, fa[e].css.top = c.top, d || g.addPageHistory(ea.obj.id, fa)) : (fa[e].css = c, d || g.addPageHistory(ea.obj.id, fa)));
			b.$$phase || b.$apply()
		}, ca.updateCompAngle = function(a, c) {
			for (var d = 0; d < fa.length; d++)"inside_" + fa[d].id == a && (fa[d].css ? fa[d].css.transform = "rotateZ(" + c + "deg)" : fa[d].css = {}, g.addPageHistory(ea.obj.id, fa));
			b.$apply()
		}, ca.setCopy = function(a) {
			ia = a, b.$broadcast("copyState.update", a)
		}, ca.getCopy = function() {
			return ia
		}, ca.getPageNames = function(b) {
			var c = "index.php?c=scene&a=pagelist&id=" + b + "&date=" + (new Date).getTime();
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, ca.changePageSort = function(b, c) {
			var d = "index.php?c=page&a=pageSort&id=" + c + "&pos=" + b + "&date=" + (new Date).getTime();
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + d
			})
		}, ca.updateCompSize = function(a, c, d) {
			for (var e = 0; e < fa.length; e++)"inside_" + fa[e].id == a && (fa[e].css || (fa[e].css = {}), fa[e].css.width = c.width, fa[e].css.height = c.height, c.lineHeight && (fa[e].css.lineHeight = c.lineHeight), fa[e].css.top = c.top, fa[e].css.left = c.left, fa[e].properties.width = c.width, fa[e].properties.height = c.height, c.imgStyle && (fa[e].properties.imgStyle = c.imgStyle), d || g.addPageHistory(ea.obj.id, fa));
			b.$$phase || b.$apply()
		}, ca.savePageNames = function(b) {
			var c = "index.php?c=page&a=savePageName",
				d = {
					id: b.id,
					sceneId: b.sceneId,
					name: b.name
				};
			return a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(d)
			})
		}, ca.resetCss = function() {
			$("#nr .edit_area li").each(function(a, b) {
				var c = ga[b.id.replace(/inside_/g, "")];
				c && (c.css || (c.css = {}), c.css.zIndex = a)
			})
		}, ca.copyElement = function() {
			ha = 0, ba = ea.obj.id;
			var a = h.getElements(),
				b = [];
			$.each(a, function(a, c) {
				b.push(ga[c])
			}), _ = angular.copy(b), aa = angular.copy(b), ca.setCopy(!0)
		}, ca.isCurrentPageSubmitButtonAlreadyExist = function() {
			var a = !1;
			return angular.forEach(ea.obj.elements, function(b) {
				6 == ("" + b.type).charAt(0) && (a = !0)
			}), a
		}, ca.pasteElement = function() {
			for (var a = 0, c = [], d = ca.isCurrentPageSubmitButtonAlreadyExist(), e = 0; e < _.length; e++) if (6 !== _[e].type && 601 !== _[e].type || !d) {
				_[e].pageId = ea.obj.id, _[e].id = t(), ba == _[e].pageId ? (a++, s(aa[e], _[e], a, _.length)) : (ha = 0, _[e].css = angular.copy(aa[e].css));
				var f = angular.copy(_[e]);
				fa.push(f), ga[f.id] = f, c.push(v(f.type, f, !0))
			}
			ba = ea.obj.id, g.addPageHistory(ea.obj.id, ea.obj.elements), b.$broadcast("dom.changed"), angular.forEach(h.getElements(), function(a) {
				$("#inside_" + a).children(".bar").hide()
			}), h.clearElements(), $.each(c, function(a, b) {
				b.children(".bar").show(), h.addElement(b.attr("id").split("_")[1])
			})
		}, ca.openCropModal = function(a, b, c) {
			U(a, b, c)
		}, ca.replaceBgImage = function(a, c, d) {
			var e = a;
			c.style.backgroundImage = "url(" + PREFIX_FILE_HOST + e + ")", d.properties.bgColor = null, d.properties.imgSrc = e, b.$broadcast("show.edit.bg")
		};
		// ca.savePPT =function(b){
		// 	console.log('savePPT');
		// 	console.log(b);
		// };
		var la = null;
		utilTrigger.getSendType(), utilTrigger.getHandleType();
		return ca.openTriggerMode = V, da.addInterceptor(function(a, c, d) {
			function f() {
				var d = $('<ul id="popMenu" class="dropdown-menu" style="min-width: 150px; display: block;" role="menu" aria-labelledby="dropdownMenu1"><li class="edit" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-write"></div>编辑</a></li><li class="style" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-type"></div>样式</a></li><li class="animation" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-move"></div>动画</a></li><li class="sound" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-music"></div>音效</a></li><li class="trigger" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-chufa"></div>触发</a></li><li class="link" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-link"></div>链接</a></li><li class="copy" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-scene-copy"></div>复制</a></li><li class="cut" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-cut"></div>裁切</a></li><li role="presentation" class="bottom_bar"><a title="置顶"><div class="eqf-top up-all"></div></a><a title="上移一层"><div class="eqf-up up"></div></a><a title="下移一层"><div class="eqf-down down"></div></a><a title="置底"><div class="eqf-under down-all"></div></a><a title="删除"><div class="eqf-scene-delete remove"></div></a></li></ul>').css({
					position: "absolute",
					"user-select": "none"
				});
				return ia && d.find(".copy").after($('<li class="paste" role="presentation"><a role="menuitem" tabindex="-1"><div class="eqf-print"></div>粘贴</a></li>')), d.find(".edit").click(function(b) {
					switch (b.stopPropagation(), c.type.toString().charAt(0)) {
					case "1":
						break;
					case "2":
						x(a.find(".element").get(0), c);
						break;
					case "x":
						x(a.find(".element").get(0), c);
						break;
						case "j":
						x(a.find(".element").get(0), c); //图表
						break;
					case "3":
						break;
					case "4":
						y(c);
						break;
					case "m"://百度地图
						y(c);
						break;
					case "h":
						z(c);
						break;
					case "5":
						C(c);
						break;
					case "6":
						A(c);
						break;
					case "7":
						break;
					case "8":
						B(c);
						break;
					case "9":
						break;
					case "g":
						break;
					case "p":
						J(c);
						break;
					case "v":
						N(c);
						break;
					case "r":
					case "c":
						D(c);
						break;
					case "a":
						E(c);
						break;
					case "l":
						H(c);
						break;
					case "s":
						I(c);
						break;
					case "i":
						F(c);
						break;
					case "d":
						G(c);
						break;
					case "n":
						P(c)
					}
					d.hide()
				}), d.find(".style").click(function(b) {
					b.stopPropagation(), R(c, function(b) {
						if (1 == c.type) for (var d in c.properties.labels) b.backgroundColor && (c.properties.labels[d].color.backgroundColor = b.backgroundColor, $(".label_content").css("background-color", b.backgroundColor)), b.color && (c.properties.labels[d].color.color = b.color, $(".label_content").css("color", b.color));
						else $(".element-box", a).css(b), $.extend(!0, c.css, b)
					}), d.hide()
				}), d.find(".animation").click(function(a) {
					a.stopPropagation(), S(c, function(a) {
						c.properties.anim = a
					}), d.hide()
				}), d.find(".link").click(function(a) {
					a.stopPropagation(), W(c), d.hide()
				}), d.find(".remove").click(function(a) {
					a.stopPropagation(), b.$broadcast("element.delete")
				}), d.find(".sound").click(function(a) {
					a.stopPropagation(), L(c, 4), d.hide()
				}), d.find(".trigger").click(function(a) {
					a.stopPropagation();
					var b = utilTrigger.getHandleType();
					$.each(b, function(a, b) {
						k.getSendIds(b.value, c.id)
					}), T(c, function(a) {
						c.properties.trigger = a
					}), d.hide()
				}), d.find(".down").click(function(b) {
					var c = a.prev();
					if (!(c.length <= 0)) {
						var d = a.css("zIndex");
						a.css("zIndex", c.css("zIndex")), c.css("zIndex", d), c.before(a)
					}
				}), d.find(".up").click(function(b) {
					var c = a.next();
					if (!(c.length <= 0)) {
						var d = a.css("zIndex");
						a.css("zIndex", c.css("zIndex")), c.css("zIndex", d), c.after(a)
					}
				}), d.find(".up-all").click(function(b) {
					var c = a.siblings("li"),
						d = c.last();
					d.after(a), a.css("zIndex", c.length + 1), c.each(function(a, b) {
						$(b).css("zIndex", a + 1)
					})
				}), d.find(".down-all").click(function(b) {
					var c = a.siblings("li"),
						d = c.first();
					d.before(a), a.css("zIndex", 1), c.each(function(a, b) {
						$(b).css("zIndex", a + 2)
					})
				}), d.find(".copy").click(function(a) {
					a.stopPropagation(), $(".modal-dialog")[0] || ca.copyElement(), d.hide()
				}), d.find(".paste").click(function(a) {
					a.stopPropagation(), $(".modal-dialog")[0] || ca.pasteElement(), d.hide()
				}), d.find(".cut").click(function(a) {
					a.stopPropagation(), U(c, function() {
						g.addPageHistory(ea.obj.id, ea.obj.elements)
					}), d.hide()
				}), 2 != c.type && 4 != c.type && "h" != c.type && "x" != c.type && d.find(".trigger").hide(), 2 != c.type && 4 != c.type && 5 != c.type && "h" != c.type && "x" != c.type && 501 != c.type && 502 != c.type && 503 != c.type && d.find(".sound").hide(), e.isAllowToAccess(e.accessDef.SCENE_EDIT_TRIGGER) || d.find(".trigger").hide(), e.isAllowToAccess(e.accessDef.SCENE_EDIT_SOUND) || d.find(".sound").hide(), 4 != c.type && "h" != c.type && "x" != c.type && d.find(".link").hide(), 4 != c.type && d.find(".cut").hide(), "p" == c.type && (d.find(".animation").hide(), d.find(".style").hide()), (6 == c.type || 601 == c.type) && d.find(".copy").hide(), d
			}
			if ("view" != d) {
				c.trigger && k.setTrigger(c.id, c.trigger);
				var h = $("#eq_main");
				c.sound && $('<div class="sound eqf-music">').click(function() {
					L(c)
				}).appendTo(a), a.on("contextmenu", ".element-box", function(d) {
					function e(a, b) {
						$("#" + b).remove(), a.css({
							left: d.pageX + h.scrollLeft() + 15,
							top: d.pageY + h.scrollTop(),
							zIndex: 10001
						}).appendTo(h), h.mousemove(function(c) {
							a = $("#" + b), (c.pageX < a.offset().left - 20 || c.pageX > a.offset().left + a.width() + 20 || c.pageY < a.offset().top - 20 || c.pageY > a.offset().top + a.height() + 20) && (a.hide(), $(this).unbind("mousemove"))
						})
					}
					if (d.stopPropagation(), "none" != $(".select-panel").css("display")) return !1;
					if ($("#nr").find(".mask-trigger").length) {
						if (ca.currentElemDef && b.$broadcast("create.trigger.menu", a, d), !$(".edit_area").find(".switch-original").length) {
							var g = $('<div class="switch">');
							a.append(g).children(".bar").hide()
						}
						return !1
					}
					$("#comp_setting:visible").length > 0 && "p" != c.type && (ca.currentElemDef = c, b.$broadcast("showStylePanel"));
					var i = f();
					return e(i, "popMenu"), !1
				}), a.on("click", function(b) {
					return b.stopPropagation(), $("#nr").find(".mask-trigger").length ? void 0 : (R(c, function(b) {
						if (1 == c.type) for (var d in c.properties.labels) b.backgroundColor && (c.properties.labels[d].color.backgroundColor = b.backgroundColor, $(".label_content").css("background-color", b.backgroundColor)), b.color && (c.properties.labels[d].color.color = b.color, $(".label_content").css("color", b.color));
						else $(".element-box", a).css(b), $.extend(!0, c.css, b)
					}), !1)
				}), a.attr("title", "按住鼠标进行拖动，点击鼠标进行编辑")
			}
		}), da.bindEditEvent("2", function(a, b) {
			X(a, b)
		}), da.bindEditEvent("x", function(a, b) {
			X(a, b)
		}), da.bindEditEvent("j", function(a, b) { //图表
			X(a, b)
		}), da.bindEditEvent("3", function(a, b) {}), da.bindEditEvent("v", function(a, b) {
			var c = $(".element", a)[0];
			$(c).unbind("dblclick"), $(c).bind("dblclick", function() {
				N(b), $("#popMenu").hide()
			})
		}), da.bindEditEvent("4", function(a, b) {
			var c = $(".element", a)[0];
			$(c).unbind("dblclick"), $(c).bind("dblclick", function() {
				return $("#nr").find(".mask-trigger").length ? !1 : (y(b), void $("#popMenu").hide())
			})
		}), da.bindEditEvent("m", function(a, b) { //百度地图-放大旋转
			var c = $(".element", a)[0];
			$(c).unbind("dblclick"), $(c).bind("dblclick", function() {
				return $("#nr").find(".mask-trigger").length ? !1 : (y(b), void $("#popMenu").hide())
			})
		}), da.bindEditEvent("n", function(a, b) {
			var c = $(".element", a)[0];
			$(c).bind("dblclick", function() {
				return $("#nr").find(".mask-trigger").length ? !1 : (P(b), void $("#popMenu").hide())
			})
		}), da.bindEditEvent("h", function(a, b) {
			var c = $(".element", a)[0];
			$(c).unbind("dblclick"), $(c).bind("dblclick", function() {
				return $("#nr").find(".mask-trigger").length ? !1 : (z(b), void $("#popMenu").hide())
			})
		}), da.bindEditEvent("5", function(a, b) {
			var c = $(".element", a)[0];
			$(c).unbind("dblclick"), $(c).bind("dblclick", function() {
				C(b), $("#popMenu").hide()
			})
		}), da.bindEditEvent("r", function(a, b) {
			var c = $(".element", a)[0];
			$(c).unbind("dblclick"), $(c).bind("dblclick", function() {
				D(b), $("#popMenu").hide()
			})
		}), da.bindEditEvent("c", function(a, b) {
			var c = $(".element", a)[0];
			$(c).unbind("dblclick"), $(c).bind("dblclick", function() {
				D(b), $("#popMenu").hide()
			})
		}), da.bindEditEvent("a", function(a, b) {
			var c = $(".element", a)[0];
			$(c).unbind("dblclick"), $(c).bind("dblclick", function() {
				E(b), $("#popMenu").hide()
			})
		}), da.bindEditEvent("p", function(a, b) {
			var c = $(".element", a)[0];
			$(c).unbind("dblclick"), $(c).bind("dblclick", function() {
				J(b), $("#popMenu").hide()
			}), i.setProperties(b.properties)
		}), da.bindEditEvent("6", function(a, b) {
			var c = $(".element", a)[0];
			$(c).unbind("dblclick"), $(c).bind("dblclick", function() {
				A(b), $("#popMenu").hide()
			})
		}), da.bindEditEvent("8", function(a, b) {
			var c = $(".element", a)[0];
			$(c).unbind("dblclick"), $(c).bind("dblclick", function() {
				B(b), $("#popMenu").hide()
			})
		}), da.bindEditEvent("l", function(a, b) {
			var c = $(".element", a)[0];
			$(c).unbind("dblclick"), $(c).bind("dblclick", function() {
				H(b), $("#popMenu").hide()
			})
		}), da.bindEditEvent("s", function(a, b) {
			var c = $(".element", a)[0];
			$(c).unbind("dblclick"), $(c).bind("dblclick", function() {
				I(b), $("#popMenu").hide()
			})
		}), da.bindEditEvent("i", function(a, b) {
			var c = $(".element", a)[0];
			$(c).unbind("dblclick"), $(c).bind("dblclick", function() {
				F(b), $("#popMenu").hide()
			})
		}), da.bindEditEvent("d", function(a, b) {
			var c = $(".element", a)[0];
			$(c).unbind("dblclick"), $(c).bind("dblclick", function() {
				G(b), $("#popMenu").hide()
			})
		}), da.bindEditEvent("7", function(a, b) {
			var d = $(".element", a)[0];
			d.addEventListener("click", function(a) {
				la || c.open({
					windowClass: "",
					templateUrl: "scene/console/map.tpl.html",
					controller: "MapConsoleCtrl"
				}).result.then(function(a) {
					var c = new BMap.Map("map_" + b.id);
					c.clearOverlays();
					var d = new BMap.Point(a.lng, a.lat),
						e = new BMap.Marker(d);
					c.addOverlay(e);
					var f = new BMap.Label(a.address, {
						offset: new BMap.Size(20, -10)
					});
					e.setLabel(f), c.centerAndZoom(d, 12), b.properties.pointX = a.lng, b.properties.pointY = a.lat, b.properties.x = a.lng, b.properties.y = a.lat, b.properties.markTitle = a.address
				})
			})
		}), ca.templateEditor = da, ca.getTplById = function(b) {
			var c = "m/scene/select?id=" + b,
				d = new Date;
			return c += "&time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, ca.createByTpl = function(b) {
			var c = PREFIX_URL + "index.php?c=scene&a=createBySys";
			return a({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(b)
			})
		}, ca.getSceneDetail = function(b, c) {
			var d = "index.php?c=scene&a=detail&id=" + b;
			return c && (d += (/\?/.test(d) ? "&" : "?") + "user=" + c), Z = a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + d
			}), Y = null, Z.then(function(a) {
				a.data.obj.bgAudio.url == "" ? a.data.obj.bgAudio = null : a.data.obj.bgAudio = a.data.obj.bgAudio
				Y = a.data.obj
			}), Z
		}, ca.getCurrentScene = function() {
			return Y
		}, ca.getCurrentScenePromise = function() {
			return Z
		}, ca.saveSceneSettings = function(b) {
			b = angular.copy(b), angular.isObject(b.bgAudio) && (b.bgAudio = JSON.stringify(b.bgAudio)),b.image = null;
			var c = "index.php?c=scene&a=saveSettings";
			return a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + c,
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				},
				data: JSON.stringify(b)
			})
		}, ca.publishScene = function(b) {
			var c = "index.php?c=scene&a=publish&id=" + b,
				d = new Date;
			return c += "&time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, ca.closeScene = function(b) {
			var c = "index.php?c=scene&a=off&id=" + b,
				d = new Date;
			return c += "&time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, ca.openScene = function(b) {
			var c = "index.php?c=scene&a=on&id=" + b,
				d = new Date;
			return c += "&time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, ca.createBlankScene = function(b, c, d) {
			var e = {
				name: b,
				type: c,
				pageMode: d
			},
				f = "index.php?c=scene&a=create";
			return a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + f,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(e)
			})
		}, ca.copySceneById = function(b) {
			var c = "index.php?c=scene&a=createByCopy&id=" + b;
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, ca.deleteSceneById = function(b, c) {
			var d = "index.php?c=scene&a=delscene&id=" + b;
			return c && (d += "&backup=" + c), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + d
			})
		}, ca.getCoverImages = function() {
			var b = "index.php?c=upfile&a=userList&bizType=99&fileType=1&time=" + (new Date).getTime();
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + b
			})
		}, ca.revoke = function(b) {
			var c = "m/scene/revoke?id=" + b + "&time=" + (new Date).getTime();
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, ca.getSceneByPage = function(b, c, e) {
			var f = "";
			c || e ? (f = "index.php?c=scene&a=createpage&id=" + b, e && (f += "&copy=true")) : f = "index.php?c=scene&a=design&id=" + b;
			var g = d.defer(),
				h = new Date;
			return f += (/\?/.test(f) ? "&" : "?") + "time=" + h.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + f
			}).then(function(a) {
				g.resolve(a), ea = a.data, ea.obj.elements || (ea.obj.elements = []), fa = ea.obj.elements;
				for (var b = 0; fa && b < fa.length; b++) ga[fa[b].id] = fa[b]
			}, function(a) {
				g.reject(a)
			}), g.promise
		}, ca.previewSceneTpl = function(b) {
			var c = "index.php?c=scene&a=syspageinfo&id=" + b,
				e = (d.defer(), new Date);
			return c += (/\?/.test(c) ? "&" : "?") + "time=" + e.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, ca.recentlyUsedTpls = function() {
			var b = "/m/scene/tpl/recently/used";
			return b += (/\?/.test(b) ? "&" : "?") + "time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + b
			})
		}, ca.recordTplUsage = function(b) {
			var c = "m/scene/usePageTpl?id=" + b;
			return a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + c
			})
		}, ca.getSceneTpl = function(b) {
			var c = f.get("tplCache") ? f.get("tplCache") : f("tplCache"),
				e = d.defer();
			if (c.get(b)) {
				var g = $.extend(!0, {}, c.get(b));
				g.data.obj.scene && g.data.obj.scene.bgAudio && (Y.bgAudio = g.data.obj.scene.bgAudio);
				for (var h = 0; h < g.data.obj.elements.length; h++) {
					var i = g.data.obj.elements[h];
					i.id = t(), i.sceneId = ea.obj.sceneId, i.pageId = ea.obj.id
				}
				fa = g.data.obj.elements;
				for (var j = 0; j < fa.length; j++) ga[fa[j].id] = fa[j];
				e.resolve(g)
			} else {
				var k = "index.php?c=scene&a=syspageinfo&id=" + b,
					l = new Date;
				k += (/\?/.test(k) ? "&" : "?") + "time=" + l.getTime(), a({
					withCredentials: !0,
					method: "GET",
					url: PREFIX_URL + k
				}).then(function(a) {
					c.put(a.data.obj.id, $.extend(!0, {}, a)), a.data.obj.scene && a.data.obj.scene.bgAudio && (Y.bgAudio = a.data.obj.scene.bgAudio);
					for (var b = 0; b < a.data.obj.elements.length; b++) {
						var d = a.data.obj.elements[b];
						d.id = t(), d.sceneId = ea.obj.sceneId, d.pageId = ea.obj.id
					}
					fa = a.data.obj.elements;
					for (var f = 0; f < fa.length; f++) ga[fa[f].id] = fa[f];
					e.resolve(a)
				}, function(a) {
					e.reject(a)
				})
			}
			return e.promise
		}, ca.saveScene = function(b) {
			var oldVal;
			for(var i = 0;i<b.elements.length;i++){
				if(b.elements[i].type == 2){
					var colorVal = b.elements[i].css.color;
					if(b.elements[i].content.split('color:')[1]){
						oldVal = b.elements[i].content.split('color:')[1].split(";")[0];
					}
					if(colorVal && colorVal != "#676767"){
						b.elements[i].content = b.elements[i].content.replace(oldVal,colorVal);
					}
				}
			}
			var c = "index.php?c=scene&a=savepage";
			return a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + c,
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				},
				data: JSON.stringify(b)
			})
		}, ca.deletePage = function(b) {
			var c = "index.php?c=scene&a=delPage&id=" + b;
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, ca.getBgImages = function(b) {
			var c = "m/scene/gallery/" + b,
				d = new Date;
			return c += (/\?/.test(c) ? "&" : "?") + "time=" + d.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			})
		}, ca.createCustomComp = ka, ca.openAudioModal = K, ca.openBgModal = O, ca.getElements = function() {
			return fa
		}, ca.getElementsMap = function() {
			return ga
		}, ca.deleteElement = o, ca.getSceneObj = function() {
			return ea
		}, ca.getTpls = function(b, c, d, e) {
			var f = "m/scene/listTpl";
			null != b && (f += (/\?/.test(f) ? "&" : "?") + "sceneType=" + b), f += (/\?/.test(f) ? "&" : "?") + "pageNo=" + (c ? c : 1), f += (/\?/.test(f) ? "&" : "?") + "pageSize=" + (d ? d : 12), e && (f += (/\?/.test(f) ? "&" : "?") + "orderBy=" + e);
			var g = new Date;
			return f += (/\?/.test(f) ? "&" : "?") + "time=" + g.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + f
			})
		}, ca.getCompanyTpls = function(b, c) {
			var d = "/m/scene/tpl/company/list?pageNo=" + b + "&pageSize=" + c;
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + d
			})
		}, ca.createCompanyTpls = function(b) {
			var c = "/m/scene/tpl/company/set?id=" + b;
			return a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + c
			})
		}, ca.clearCompanyTpls = function(b) {
			var c = "/m/scene/tpl/company/unset?id=" + b;
			return a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + c
			})
		}, ca.getPageTpls = function(c, d, e, f, g, h, i, j, k) {
			var l = "index.php?c=scene&a=syslist",
				m = new Date;
			l += (/\?/.test(l) ? "&" : "?") + "time=" + m.getTime();
			var n = {
				tplType: 1,
				bizType: d,
				tagId: e,
				order: h,
				freeTplSetting: i,
				name: j,
				createUser: k,
				pageNo: f ? f : 1,
				pageSize: g ? g : 12
			};
			return a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + l,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(n)
			}).then(function(a) {
				200 == a.data.code && (ca.scenes = a.data, b.$broadcast("getSampleList"))
			})
		}, ca.getPageTplTypesTwo = function(b, c) {
			var d = "index.php?c=upfile&a=systag&type=2&bizType=" + c,
				e = new Date;
			return d += (/\?/.test(d) ? "&" : "?") + "time=" + e.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + d
			})
		}, ca.saveMyTpl = function(b) {
			var c = "index.php?c=user&a=saveMyTpl";
			return a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + c,
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				},
				data: JSON.stringify(b)
			})
		}, ca.saveCompanyTpl = function(b) {
			var c = "index.php?c=company&a=saveMyTpl";
			return a({
				withCredentials: !0,
				method: "POST",
				url: PREFIX_URL + c,
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				},
				data: JSON.stringify(b)
			})
		}, ca.previewScene = function(b) {
			var c = "index.php?c=user&a=getMyTpl&id=" + b,
				e = new Date;
			c += (/\?/.test(c) ? "&" : "?") + "time=" + e.getTime();
			var g = d.defer();
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + c
			}).then(function(a) {
				for (var b = f.get("tplCache") ? f.get("tplCache") : f("tplCache"), c = 0; c < a.data.list.length; c++) {
					var d = {
						data: {
							obj: {
								elements: a.data.list[c].elements,
								scene: a.data.obj
							}
						}
					};
					b.put(a.data.list[c].id, $.extend(!0, {}, d))
				}
				g.resolve(a)
			}), g.promise
		}, ca.transferScene = function(b, c) {
			var d = PREFIX_URL + "index.php?c=scene&a=transfer";
			return d += "&loginName=" + c, d += "&id=" + b, d += "&time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "POST",
				url: d
			})
		}, ca.getActivities = function() {
			var b = PREFIX_S1_URL + "eqs/activity?all=1";
			return a({
				withCredentials: !0,
				method: "GET",
				url: b
			})
		}, ca.getSceneTemplatePrices = function() {
			var b = PREFIX_URL + "index.php?c=statics&a=scene_template_prices";
			return a({
				withCredentials: !0,
				method: "GET",
				url: b
			})
		}, ca.soundLink = function(b, c) {
			var d = "index.php?c=upfile&a=savewl&url=" + b + "&fileType=" + c,
				e = new Date;
			return d += "&time=" + e.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + d
			})
		}, ca
	}]), angular.module("services.select", []).factory("selectService", ["$rootScope", function(a) {
		var b = {},
			c = [];
		return b.addElement = function(b) {
			b += "", c.indexOf(b) >= 0 || (c.push(b), c.length > 1 && a.$broadcast("select.more"))
		}, b.deleteElement = function(b) {
			a.$broadcast("select.less.id", b);
			var d = c.indexOf(b + "");
			0 > d || (c.splice(d, 1), 0 === c.length && a.$broadcast("close.style.panel"), c.length <= 1 && a.$broadcast("select.less"))
		}, b.clearElements = function() {
			a.$broadcast("select.less", c), c = []
		}, b.getElements = function() {
			return c
		}, b
	}]), angular.module("services.spread", ["services.scene"]), angular.module("services.spread").factory("SpreadService", ["$http", "sceneService", "$rootScope", function(a, b, c) {
		var d = {},
			e = function(a) {
				var b = new Date;
				return b.setDate(b.getDate() + a), b.setHours(0), b.setMinutes(0), b.setSeconds(0), b.setMilliseconds(0), b.getTime()
			};
		d.getDataBySceneId = function(b, c, d, e, f, g, h) {
			var i = "index.php?c=Stat&id=" + b;
			g && (i += (/\?/.test(i) ? "&" : "?") + "user=" + g), h && (i += (/\?/.test(i) ? "&" : "?") + "extId=" + h), c && (i += "&startDate=" + c), d && (i += "&endDate=" + d), e && (i += "&pageSize=" + e), f && (i += "&pageNo=" + f);
			var j = new Date;
			return i += "&time=" + j.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + i
			})
		}, d.getDevice = function(b, c, d) {
			var e = "m/scene/pv/device?id=" + b;
			c && (e += "&startDate=" + c), d && (e += "&endDate=" + d);
			var f = new Date;
			return e += "&time=" + f.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + e
			})
		}, d.getDevicePv = function(a, b, f) {
			var g = e(b),
				h = e(f);
			d.getDevice(a, g, h).then(function(b) {
				c.$broadcast("scene.device", b.data.obj, a, g, h)
			}, function() {})
		}, d.getActivities = function() {
			var b = new Date;
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + "m/u/promotion/list?type=pc&time=" + b.getTime()
			})
		}, d.getActivityDetail = function(b) {
			var c = new Date;
			return a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + "m/u/promotion?code=" + b + "&time=" + c.getTime()
			})
		}, d.updateName = function(b) {
			var c = PREFIX_URL + "m/scene/expand/save";
			return a({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(b)
			})
		};
		c.branchid;
		return d.getSceneDetail = function(a, d) {
			b.getSceneDetail(a, d).then(function(a) {
				c.$broadcast("scene.detail", a.data.obj, d)
			}, function() {})
		}, d.getSceneData = function(a, b, f, g, h) {
			var i = e(b),
				j = e(f),
				k = f - b;
			d.getDataBySceneId(a, i, j, k, 0, g, h).then(function(b) {
				c.$broadcast("scene.data", b.data.list, a, i, j, g)
			}, function() {})
		}, d.expandWebs = [], d.getWebList = function(b, e, f) {
			var g = "m/scene/expand/list";
			b && (g += (/\?/.test(g) ? "&" : "?") + "id=" + b), f && (g += (/\?/.test(g) ? "&" : "?") + "user=" + f), g += (/\?/.test(g) ? "&" : "?") + "showPv=" + e, g += (/\?/.test(g) ? "&" : "?") + "time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: PREFIX_URL + g
			}).then(function(a) {
				a.data.success && (d.expandWebs = a.data.list, c.$broadcast("webs.update"))
			}, function(a) {})
		}, d.deleteWeb = function(b) {
			var e = PREFIX_URL + "m/scene/expand/delete";
			a({
				withCredentials: !0,
				method: "POST",
				url: e,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(b)
			}).then(function(a) {
				a.data.success && (d.expandWebs.splice(b.index, 1), c.$broadcast("webs.update"))
			}, function(a) {})
		}, d.queryRegion = function(b, d) {
			var e = PREFIX_URL + "m/scene/pv/region?id=" + b + "&startDate=" + d,
				f = {
					id: b,
					startDate: d
				};
			a({
				withCredentials: !0,
				method: "GET",
				url: e,
				data: $.param(f)
			}).then(function(a) {
				a.data.success && c.$broadcast("region.update", a.data.obj)
			})
		}, d.getShareWayList = function(b) {
			var d = PREFIX_URL + "m/scene/social/share/status?id=" + b;
			a({
				withCredentials: !0,
				method: "GET",
				url: d
			}).then(function(a) {
				a.data.success && c.$broadcast("shareway.update", a.data.list)
			})
		}, d.activeShareWay = function(b, d) {
			var e = PREFIX_URL + "m/scene/share?sceneId=" + b + "&type=" + d;
			a({
				withCredentials: !0,
				method: "POST",
				url: e,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			}).then(function(a) {
				a.data.success && c.$broadcast("active.shareway", d)
			})
		}, d.applyShareWay = function(b, d, e) {
			var f = PREFIX_URL + "m/scene/share/setting/save";
			b && (f += (/\?/.test(f) ? "&" : "?") + "id=" + b), d && (f += (/\?/.test(f) ? "&" : "?") + "type=" + d), e && (f += (/\?/.test(f) ? "&" : "?") + "value=" + e), a({
				withCredentials: !0,
				method: "POST",
				url: f,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			}).then(function(a) {
				a.data.success && c.$broadcast("apply.scene.share", a.data)
			})
		}, d
	}]), angular.module("services.staticRes", []), angular.module("services.staticRes").factory("staticResService", [function() {
		var a = {},
			b = [{
				name: "行业",
				value: "101"
			}, {
				name: "个人",
				value: "102"
			}, {
				name: "企业",
				value: "103"
			}, {
				name: "节假",
				value: "104"
			}, {
				// name: "风格",
				// value: "105"
			}, {
				// name: "品牌",
				// value: "106"
			}];
		a.getSceneType = function() {
			return b
		};
		var c = [{
			name: "版式",
			value: "1101"
		}, {
			name: "风格",
			value: "1103"
		}, {
			name: "互动",
			value: "1102"
		}];
		a.getBigTab = function() {
			return c
		};
		var d = {
			1101: [{
				id: 1,
				name: "图文",
				bizType: 1101
			}, {
				id: 2,
				name: "图集",
				bizType: 1101
			}, {
				id: 4,
				name: "文字",
				bizType: 1101
			}, {
				id: 5,
				name: "图表",
				bizType: 1101
			}],
			1102: [{
				id: 6,
				name: "报名表",
				bizType: 1102
			}, {
				id: 8,
				name: "留言",
				bizType: 1102
			}, {
				id: 9,
				name: "联系",
				bizType: 1102
			}],
			1103: [{
				id: 15,
				name: "黑白",
				bizType: 1103
			}, {
				id: 16,
				name: "红色",
				bizType: 1103
			}, {
				id: 17,
				name: "怀旧",
				bizType: 1103
			}, {
				id: 18,
				name: "现代",
				bizType: 1103
			}, {
				id: 19,
				name: "扁平化",
				bizType: 1103
			}, {
				id: 120,
				name: "黄色",
				bizType: 1103
			}, {
				id: 121,
				name: "绿色",
				bizType: 1103
			}, {
				id: 122,
				name: "紫色",
				bizType: 1103
			}, {
				id: 123,
				name: "黑色",
				bizType: 1103
			}, {
				id: 124,
				name: "白色",
				bizType: 1103
			}, {
				id: 125,
				name: "其他",
				bizType: 1103
			}, {
				id: 260,
				name: "English",
				bizType: 1103
			}, {
				id: 262,
				name: "Android",
				bizType: 1103
			}]
		};
		a.getPageTpls = function(a) {
			return a ? d[a] : d[1101].concat(d[1102]).concat(d[1103])
		};
		var e = [{
			id: 13178,
			name: "new",
			value: "210",
			remark: "group1/M00/61/89/yq0KA1T2vXqAGI-4AAAWKIt1ceE158.png"
		},{
			id: 13176,
			name: "hot",
			value: "211",
			remark: "group1/M00/61/89/yq0KA1T2vXqAH3MxAAAdfvrWmmM009.png"
		},{
			id: 13076,
			name: "风格",
			value: "203",
			remark: "group1/M00/61/89/yq0KA1T2vXqAH3MxAAAdfvrWmmM009.png"
		},{
			id: 13078,
			name: "节日",
			value: "205",
			remark: "group1/M00/61/89/yq0KA1T2vXqAGI-4AAAWKIt1ceE158.png"
		}, {
			id: 13075,
			name: "企业",
			value: "202",
			remark: "group1/M00/61/89/yq0KA1T2vXqAdp7RAAAOCH36lkY788.png"
		}, {
			id: 13074,
			name: "行业",
			value: "201",
			remark: "group1/M00/61/89/yq0KA1T2vXqARMyQAAASI6ZG0zM493.png"
		}, {
			id: 13077,
			name: "个人",
			value: "204",
			remark: "group1/M00/61/89/yq0KA1T2vXqAIorQAAAVuqdCoU4830.png"
		}, {
			id: 13073,
			name: "动物",
			value: "1201",
			remark: null
		},{
			id: 13177,
			name: "动漫",
			value: "1202",
			remark: null
		}];
		a.getBgTypes = function() {
			return e
		};
		var f = [{
			id: 13100,
			name: "new",
			value: "150",
			remark: "group1/M00/61/89/yq0KA1T2vXqAOVqkAAAX-MAtU0A633.png"
		},{
			id: 13101,
			name: "hot",
			value: "151",
			remark: "group1/M00/61/89/yq0KA1T2vXqAOVqkAAAX-MAtU0A633.png"
		},{
			id: 13084,
			name: "图标",
			value: "106",
			remark: "group1/M00/61/89/yq0KA1T2vXqAOVqkAAAX-MAtU0A633.png"
		}, {
			id: 13085,
			name: "动画",
			value: "107",
			remark: "group1/M00/61/89/yq0KA1T2vXqANcAcAAATIr_b2OM515.png"
		}, {
			id: 13083,
			name: "节日",
			value: "105",
			remark: "group1/M00/61/89/yq0KA1T2vXqAGI-4AAAWKIt1ceE158.png"
		}, {
			id: 13081,
			name: "风格",
			value: "103",
			remark: "group1/M00/61/89/yq0KA1T2vXqAH3MxAAAdfvrWmmM009.png"
		}, {
			id: 13080,
			name: "企业",
			value: "102",
			remark: "group1/M00/61/89/yq0KA1T2vXqAdp7RAAAOCH36lkY788.png"
		}, {
			id: 13079,
			name: "行业",
			value: "101",
			remark: "group1/M00/61/89/yq0KA1T2vXqARMyQAAASI6ZG0zM493.png"
		}, {
			id: 13082,
			name: "个人",
			value: "104",
			remark: "group1/M00/61/89/yq0KA1T2vXqAIorQAAAVuqdCoU4830.png"
		}, {
			id: 13086,
			name: "海外",
			value: "1101",
			remark: null
		}];
		a.getTpTypes = function() {
			return f
		};
		var g = [];
		a.getAudioTypes = function() {
			return g
		};
		var h = [];
		return a.getSoundTypes = function() {
			return h
		}, a
	}]), angular.module("services.dataCache").factory("storageService", [function() {
		var a = {};
		return a.clear = function() {
			window.localStorage && localStorage.clear()
		}, a.push = function(a, b) {
			window.localStorage && localStorage.setItem(a, b)
		}, a.get = function(a) {
			return window.localStorage ? localStorage.getItem(a) : void 0
		}, a
	}]), angular.module("services.file.upload", ["angularFileUpload", "services.file"]).factory("uploaderService", ["$rootScope", "$http", "$interval", "FileUploader", "fileService", "$translate", function(a, b, c, d, e, f) {
		var g, h = {};
		return h.uploader = function(b, e) {
			var h = 6;
			(2 == b || 4 == b) && (g = PREFIX_URL + "index.php?c=upfile&a=upload&bizType=0&fileType=" + b);
			var i, j = new d({
				url: g,
				withCredentials: !0,
				queueLimit: h,
				onAfterAddingAll: function(b) {
					a.$broadcast("uploadfiles.add"), j.uploadAll()
				},
				onSuccessItem: function(d, e, f, g) {
					function h() {
						c.cancel(i)
					}
					var i = c(function() {
						var c = null;
						d.progress >= 100 && (c = 4 == b ? {
							id: e.obj.id,
							src: e.obj.path,
							name: e.obj.name,
							size: e.obj.size
						} : 2 == b ? {
							id: e.obj.id,
							url: e.obj.path,
							name: e.obj.name,
							size: e.obj.size
						} : {
							tmbPath: e.obj.tmbPath,
							id: e.obj.id,
							path: e.obj.path,
							name: e.obj.name
						}, a.$broadcast("thumbnailList.update", c), h())
					}, 100)
				}
			}),
				k = e || 3145728;
			return "0" == b || "1" == b ? i = "|jpg|png|jpeg|bmp|gif|svg+xml|webp|" : ("4" == b || "2" == b) && (i = "|wav|mp3|mpeg|"), j.filters.push({
				name: "imageFilter",
				fn: function(a, b) {
					var c = "|" + a.type.slice(a.type.lastIndexOf("/") + 1) + "|";
					return -1 !== i.indexOf(c)
				}
			}), j.filters.push({
				name: "imageSizeFilter",
				fn: function(a, b) {
					var c = a.size;
					return c >= k && alert(f.instant("upload.SIZE_TIP1") + k / 1024 / 1024 + f.instant("upload.SIZE_TIP2")), k > c
				}
			}), j.filters.push({
				name: "fileNameFilter",
				fn: function(a, b) {
					return a.name.length > 50 && alert(f.instant("upload.NAME_LENGTH")), a.name.length <= 50
				}
			}), j
		}, h
	}]), angular.module("services.usercenter", []).factory("usercenterService", ["$http", "$rootScope", function(a, b) {
		var c = {};
		return c.getUserInfo = function() {
			var b = PREFIX_URL + "index.php?c=user&a=check";
			return b += "&time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: b
			})
		}, c.getCompanyScale = function() {
			var b = PREFIX_URL + "/base/class/company_scale";
			return b += "?time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: b
			})
		}, c.getCompanyIndustry = function() {
			var b = PREFIX_URL + "/base/class/company_industry";
			return b += "?time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: b
			})
		}, c.getCompanyInfo = function() {
			var b = PREFIX_URL + "index.php?c=company&a=info";
			return b += "&time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: b
			})
		}, c.getDesignerUserInfo = function(id) {
			var b = PREFIX_URL + "index.php?c=designer&a=userinfo";
			return b += "&time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: b
			})
		}, c.getProvince =function(){
            var b = PREFIX_URL +"index.php?c=Designer&a=getpro";
            return b +="&time=" + (new Date).getTime(), a({
                withCredentials: !0,
                method: "GET",
                url: b
            })
            
        },c.saveCompanyInfo = function(b) {
			//var c = PREFIX_URL + "m/u/company/save111";
			var c = PREFIX_URL + "index.php?c=company&a=save";
			return a({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(b)
			})

		}, c.saveDesignerInfo = function(b) {
			var c = PREFIX_URL + "index.php?c=designer&a=save";
			return a({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(b)
			});
		}, c.saveUserInfo = function(b) {
			var c = PREFIX_URL + "index.php?c=user&a=save";
			return a({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(b)
			})
		}, c.getUserXd = function() {
			var b = PREFIX_URL + "index.php?c=user&a=xd";
			return b += "&time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: b
			})
		}, c.getgiveXd = function(b) {
			var c = PREFIX_URL + "index.php?c=user&a=giveXd";
			return c += "&toUser=" + b.toUser, c += "&xdCount=" + b.xdCount, c += "&time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "POST",
				url: c
			})
		}, c.getUserInvoice = function() {
			var b = PREFIX_URL + "m/order/user/invoice";
			return b += "?time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: b
			})
		}, c.saveUserInvoice = function(b) {
			var c = PREFIX_URL + "m/order/user/save/invoice";
			return c += "?time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				},
				data: JSON.stringify(b)
			})
		}, c.saveOrderInvoice = function(b) {
			var c = PREFIX_URL + "m/order/invoice/save";
			return c += "?time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "POST",
				url: c,
				data: $.param(b),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			})
		}, c.getXdlog = function(b, c, d) {
			var e = PREFIX_URL + "index.php?c=user&a=xdlog&pageNo=" + c + "&pageSize=" + d;
			return e += "&time=" + (new Date).getTime(), b && (e += (/\?/.test(e) ? "&" : "?") + "type=" + b), e += (/\?/.test(e) ? "&" : "?") + "pageNo=" + c, e += (/\?/.test(e) ? "&" : "?") + "pageSize=" + d, a({
				withCredentials: !0,
				method: "POST",
				url: e
			})
		}, c.getXdStat = function() {
			var b = PREFIX_URL + "index.php?c=user&a=XdStat";
			return b += "&time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: b
			})
		}, c.relAccount = function(b, c, d, e) {
			var f = PREFIX_URL + "m/u/bind/email?loginName=" + c + "&loginPassword=" + d;
			return e && (f += "&register=1"), f += "&time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "POST",
				url: f,
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				}
			})
		}, c.relEmail = function(b, c, d) {
			var e = {
				email: b,
				pass: c,
				resend: d
			},
				f = PREFIX_URL + "index.php?c=user&a=email";
			return a({
				withCredentials: !0,
				method: "POST",
				url: f,
				data: $.param(e),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			})
		}, c.verifyEmail = function() {
			var b = PREFIX_URL + "index.php?c=usercenter&a=verify";
			return a({
				withCredentials: !0,
				method: "GET",
				url: b,
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				}
			})
		}, c.relMobile = function(b, c, d) {
			var e = PREFIX_URL + "/m/u/phone/verify?phone=" + b + "&pass=" + c + "&code=" + d;
			return e += "&time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "POST",
				url: e,
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				}
			})
		}, c.relMobileCode = function(b, c) {
			var d = PREFIX_URL + "m/u/bind/user/phone?phone=" + b;
			return c && (d += "&type=" + c), d += "&time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "POST",
				url: d,
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				}
			})
		}, c.companyMobile = function(b) {
			var c = PREFIX_URL + "m/u/company/smscode/send?phone=" + b;
			return c += "&time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				}
			})
		}, c.setRead = function(b) {
			var c = PREFIX_URL + "m/u/markRead?ids=" + b;
			return c += "&time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				}
			})
		}, c.getNewMessage = function(b, c, d, e) {
			var f = PREFIX_URL + "index.php?c=statics&a=msgList&pageNo=" + b + "&pageSize=" + c;
			return d && (f += "&unread=" + d), e && (f += "&system=" + e), f += "&time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: f
			})
		}, c.getBranches = function(b, c) {
			//var d = PREFIX_URL + "index.php?c=ad&a=subList";
			var d = PREFIX_URL + "index.php?c=company&a=subList";
			return b && (d += (/\?/.test(d) ? "&" : "&") + "pageSize=" + b), c && (d += (/\?/.test(d) ? "&" : "&") + "pageNo=" + c), d += (/\?/.test(d) ? "&" : "&") + "time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: d
			})
		}, c.getDepts = function(branchId) {
			//var b = PREFIX_URL + "m/u/tag/list";
			var b = PREFIX_URL + "index.php?c=Company&a=taglist&user_id=" + branchId;
			return b += "&time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: b
			})
		}, c.addDept = function(b) {
			//var c = PREFIX_URL + "m/u/tag/create";
			var c = PREFIX_URL + "index.php?c=Company&a=tagcreate";
			return a({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(b)
			})
		}, c.updateBranch = function(b) {
			//var c = PREFIX_URL + "m/u/sub/save";
			var c = PREFIX_URL + "index.php?c=Company&a=subsave";
			return a({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(b)
			})
		}, c.createBranch = function(b) {
			//var c = PREFIX_URL + "m/u/sub/create";
			var c = PREFIX_URL + "index.php?c=Company&a=subcreate";
			return a({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(b)
			})
		}, c.openBranch = function(b, c) {
			var d = PREFIX_URL;
			//return d += c ? "m/u/sub/turnOn?id=" + b : "m/u/sub/turnOff?id=" + b, a({
			return d += c ? "index.php?c=Company&a=subturnon&id=" + b : "index.php?c=Company&a=subturnoff&id=" + b, a({
				withCredentials: !0,
				method: "POST",
				url: d,
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				}
			})
		}, c.getDomain = function() {
			var b = PREFIX_URL + "m/u/domain";
			return b += "?time=" + (new Date).getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: b
			})
		}, c.bindDomain = function(b) {
			var c = PREFIX_URL + "m/u/domain/bind";
			return a({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(b)
			})
		}, c.resetBranchPass = function(c) {
			//var d = PREFIX_URL + "m/u/sub/pwd/reset",
			var d = PREFIX_URL + "index.php?c=Company&a=resetpwd",
				e = {
					id: c
				};
			a({
				withCredentials: !0,
				method: "POST",
				url: d,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(e)
			}).then(function(a) {
				a.data.success && b.$broadcast("reset.branch.success")
			}, function() {})
		}, c.saveApplyInfo = function(b) {
			var c = PREFIX_URL + "m/u/showker/apply";
			return a({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(b)
			})
		}, c.resetApplyInfo = function(b) {
			var c = PREFIX_URL + "m/u/showker/apply";
			return a({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(b)
			})
		}, c.getVisitorMsg = function() {
			var b = PREFIX_URL + "m/u/showker/detail",
				c = new Date;
			return b += "?time=" + c.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: b
			})
		}, c.getAPPlyMessage = function(b) {
			var c = PREFIX_S2_URL + "showker/tag?type=" + b;
			return a({
				withCredentials: !0,
				method: "GET",
				url: c
			})
		}, c.getUserScene = function() {
			var b = PREFIX_URL + "m/u/scene/list",
				c = new Date;
			return b += "?time=" + c.getTime(), a({
				withCredentials: !0,
				method: "GET",
				url: b
			})
		}, c.getUserStatus = function() {
			var b = PREFIX_URL + "m/u/showker/status";
			return a({
				withCredentials: !0,
				method: "GET",
				url: b
			})
		}, c.getCompanyQrCode = function(b, c, d) {
			var e = PREFIX_URL + "m/u/pay/member/url?goodsId=" + b + "&type=" + c;
			return d && (e += "&amount=" + d), a({
				withCredentials: !0,
				method: "GET",
				url: e
			})
		}, c.getUserMemberDetail = function(b) {
			var c = PREFIX_URL + "/m/u/member/detail?userId=" + b;
			return a({
				withCredentials: !0,
				method: "GET",
				url: c
			})
		}, c.getPayXdQrCode = function(b, c) {
			var d = PREFIX_URL + "m/u/pay/xd/url?goodsId=" + b + "&type=" + c;
			return a({
				withCredentials: !0,
				method: "GET",
				url: d
			})
		}, c.sendEmail = function(b) {
			var c = PREFIX_URL + "m/u/invite/user/email";
			return a({
				withCredentials: !0,
				method: "POST",
				url: c,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				data: $.param(b)
			})
		}, c.getInvoiceList = function(c, d) {
			var e = PREFIX_URL + "m/order/can/invoice/list";
			d && (e += (/\?/.test(e) ? "&" : "?") + "pageSize=" + d), c && (e += (/\?/.test(e) ? "&" : "?") + "pageNo=" + c), a({
				withCredentials: !0,
				method: "GET",
				url: e
			}).then(function(a) {
				a.data.success && b.$broadcast("get.invoice.list", a.data)
			})
		}, c
	}]), angular.module("templates-app", ["about.tpl.html", "active/active.tpl.html", "active/tab/active1.tpl.html", "data/edit/canedit.tpl.html", "data/edit/canread.tpl.html", "data/editData.tpl.html", "dialog/bindemail.tpl.html", "dialog/confirm.tpl.html", "dialog/message.tpl.html", "error.tpl.html", "error/error.tpl.html", "footer.tpl.html", "header.tpl.html", "help.tpl.html", "home/home.tpl.html", "main/console/group.tpl.html", "main/console/transferscene.tpl.html", "main/customer.tpl.html", "main/main.tpl.html", "main/recSceneList.tpl.html", "main/squareSceneList.tpl.html", "main/userGuide.tpl.html", "my/myscene.tpl.html", "my/upload.tpl.html", "notifications.tpl.html", "reg/agreement.tpl.html", "reg/reg.tpl.html", "sample/sample.tpl.html", "scene/console.tpl.html", "scene/console/angle-knob.tpl.html", "scene/console/anim.tpl.html", "scene/console/audio.tpl.html", "scene/console/bg.tpl.html", "scene/console/button.tpl.html", "scene/console/category.tpl.html", "scene/console/counter.tpl.html", "scene/console/cropimage.tpl.html", "scene/console/fake.tpl.html", "scene/console/imageCrop.tpl.html", "scene/console/input.tpl.html", "scene/console/link-component.tpl.html", "scene/console/link.tpl.html", "scene/console/map.tpl.html", "scene/console/microweb.tpl.html", "scene/console/pictures.tpl.html", "scene/console/pictures1.tpl.html", "scene/console/radio-checkbox.tpl.html", "scene/console/randomevent.tpl.html", "scene/console/rating.tpl.html", "scene/console/scene-setting-component.tpl.html", "scene/console/setting.tpl.html", "scene/console/shape.tpl.html", "scene/console/adr.tpl.html", "scene/console/sound-component.tpl.html", "scene/console/sound.tpl.html","scene/console/sound2.tpl.html", "scene/console/soundLink.tpl.html", "scene/console/statistics-component.tpl.html", "scene/console/style.tpl.html", "scene/console/tel.tpl.html", "scene/console/trigger.tpl.html", "scene/console/triggerelemlist.tpl.html", "scene/console/video.tpl.html", "scene/create.tpl.html", "scene/createNew.tpl.html", "scene/createUserGuide.tpl.html", "scene/edit/editbg/editbg.tpl.html", "scene/edit/select/select.tpl.html", "scene/effect/falling.tpl.html", "scene/effect/snowfly.tpl.html", "scene/page/page-tpl.tpl.html", "scene/pageeffect/fall.tpl.html", "scene/pageeffect/finger.tpl.html", "scene/pageeffect/fireworks.tpl.html", "scene/pageeffect/money.tpl.html", "scene/pageeffect/none.tpl.html", "scene/pageeffect/pageeffect.tpl.html", "scene/pageeffect/scratch.tpl.html", "scene/pageeffect/snow.tpl.html", "scene/preview.tpl.html", "scene/saveTemplate.tpl.html", "scene/scene.tpl.html", "scene/support/support.tpl.html", "scene/tplOption.tpl.html", "scene/userGuide.tpl.html","scene/console/ppt.tpl.html","scene/console/psd.tpl.html","show/active/active-xq.tpl.html", "show/active/active.tpl.html", "show/category/category.tpl.html", "show/category/nav.tpl.html", "show/index.tpl.html", "show/recommend/recommend.tpl.html", "show/search/search.tpl.html", "show/visitor/visitor-xq.tpl.html", "show/visitor/visitor.tpl.html", "spread/console/apply.tpl.html", "spread/spread.tpl.html", "spread/tab/data-collect.tpl.html", "spread/tab/share.tpl.html", "spread/tab/statistics.tpl.html", "spread/tab/subtab/domain-bind.tpl.html", "spread/tab/subtab/expand-web.tpl.html", "spread/tab/subtab/site-import.tpl.html", "spread/tab/subtab/social-share.tpl.html", "sysmessage.tpl.html", "usercenter/buyXd.tpl.html", "usercenter/console/branch.tpl.html", "usercenter/console/checkMobile.tpl.html", "usercenter/console/companyinfo.tpl.html", "usercenter/console/email_fail.tpl.html", "usercenter/console/email_succeed.tpl.html", "usercenter/console/invitation.tpl.html", "usercenter/console/invoice-list.tpl.html", "usercenter/console/invoice.tpl.html", "usercenter/console/register.tpl.html", "usercenter/console/relAccount.tpl.html", "usercenter/console/relEmail.tpl.html", "usercenter/console/resetbranchpass.tpl.html", "usercenter/console/serverinfo.tpl.html", "usercenter/console/upgrade_company.tpl.html", "usercenter/message.tpl.html", "usercenter/payment.tpl.html", "usercenter/paymentxd.tpl.html", "usercenter/request_reg.tpl.html", "usercenter/tab/account.tpl.html", "usercenter/tab/children.tpl.html", "usercenter/tab/domain.tpl.html", "usercenter/tab/member.tpl.html", "usercenter/tab/message.tpl.html", "usercenter/tab/privilege.tpl.html", "usercenter/tab/reset.tpl.html", "usercenter/tab/server.tpl.html", "usercenter/tab/trash.tpl.html", "usercenter/tab/xd.tpl.html", "usercenter/transfer.tpl.html", "usercenter/upgrade.tpl.html", "usercenter/upgradeTip.tpl.html", "usercenter/userCenterGuid.tpl.html","usercenter/userCenterGuidNext.tpl.html","usercenter/userCenterGuidNextNext.tpl.html", "usercenter/usercenter.tpl.html"])
}(window, window.angular);
