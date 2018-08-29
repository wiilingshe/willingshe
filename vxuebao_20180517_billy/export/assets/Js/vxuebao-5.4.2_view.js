/**
 * eqShow - v5.4.2 - 2015-11-20
 *
 *
 * Copyright (c) 2015
 * Licensed MIT <>
 */
if (!("classList" in document.documentElement)) {
		window.HTMLElement = window.HTMLElement || Element;
		Object.defineProperty(HTMLElement.prototype, 'classList', {
			get: function() {
				var self = this;
				function update(fn) {
					return function(value) {
						var classes = self.className.split(/\s+/g),
							index = classes.indexOf(value);
						
						fn(classes, index, value);
						self.className = classes.join(" ");
					}
				}
				
				return {                    
					add: update(function(classes, index, value) {
						if (!~index) classes.push(value);
					}),
					
					remove: update(function(classes, index) {
						if (~index) classes.splice(index, 1);
					}),
					
					toggle: update(function(classes, index, value) {
						if (~index)
							classes.splice(index, 1);
						else
							classes.push(value);
					}),
					
					contains: function(value) {
						return !!~self.className.split(/\s+/g).indexOf(value);
					},
					
					item: function(i) {
						return self.className.split(/\s+/g)[i] || null;
					}
				};
			}
		});
	}

function mobilecheck() {//检查手机 
	var a = !1;
	return function (b) {
		(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))) && (a = !0)
	}(navigator.userAgent || navigator.vendor || window.opera), a
}
function PCcheck()  { //检查电脑 
		var userAgentInfo = navigator.userAgent;  
		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
		var flag = true;  
		for (var v = 0; v < Agents.length; v++) {  
			if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
		}  
		return flag;  
}
function isWeixin() {//检查微信
	var a = navigator.userAgent.toLowerCase();
	return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1
}
function isAndroid() {
	var a = navigator.userAgent,
		b = (navigator.appVersion, a.indexOf("Android") > -1 || a.indexOf("Linux") > -1);
	return b
}
function tabletCheck() {//检查平板
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

//检查窗口高度
function checkHeight(){
	var windowHeight = $(".bg_white").height();
	return windowHeight > 700 ? 1.5 : 1.3;
}
//收集地图数据
var celectMap= [];

var copyFont = {
	number: [12, 13, 16, 18, 24, 32, 48],
	string: {
		"-webkit-xxx-large": 48,
		"xx-large": 32,
		"x-large": 24,
		"large": 18,
		"medium": 16,
		"small": 13,
		"x-small": 12
	}
};

function playVideo(a) {
	if (a && a.bgAudio) {
		var b = $("#media"),
			c = $("#audio_btn"),
			d = ($("#yinfu"), "");
		a.bgAudio.url ? d = 0 == a.bgAudio.url.indexOf("http://") ? a.bgAudio.url : PREFIX_FILE_HOST + a.bgAudio.url : !a.bgAudio.url && a.bgAudio.src && (d = 0 == a.bgAudio.src.indexOf("http://") ? a.bgAudio.src : PREFIX_FILE_HOST + a.bgAudio.src), b.attr("src", d), c.addClass("video_exist"), b.bind("canplay", function () {
			b.get(0).play()
		}).bind("play", function () {
			c.addClass("rotate")
		}).bind("pause", function () {
			c.removeClass("rotate")
		});
		var e = mobilecheck() ? "touchend" : "click";
		$("#audio_btn").show().on(e, function (a) {
			a.stopPropagation(), $(this).hasClass("rotate") ? b.get(0).pause() : (b.get(0).play(), utilSound.pause())
		})
	}
}
function renderPage(a, b, c) {
	loadPage();
	console.log('触发SCORM标准');
	a.templateParser("jsonParser").parse({
		def: c[b - 1],
		appendTo: "#page" + b,
		mode: "view"
	});
	var d, e, f = 1,
		g = $(".z-current").width(),
		h = $(".z-current").height();
	imageWidth = $(".m-img").width(), imageHeight = $(".m-img").height(), g / h >= 320 / 486 ? (f = h / 486, d = (g / f - 320) / 2) : (f = g / 320, e = (h / f - 486) / 2), window != window.top && ($(".phoneBox .nr").css({
		width: "100%",
		height: "100%",
		overflow: "hidden"/*,
		"transform-origin": "top left",
		transform: "scale(" + f + ")"*/
	}), mobilecheck() && $(".edit_area").css({
		"transform-origin": "top left",
		transform: "scale(" + f + ")"
	})), e && $(".edit_area").css({
		marginTop: e
	}), d && $(".edit_area").css({
		marginLeft: d
	}), tplCount == c.length && $("#eqMobileViewport").attr("content", "width=320, initial-scale=" + f + ", maximum-scale=" + f + ", user-scalable=no")
}
!
	function (a) {
		function b() {
			var a = {};
			this.addInterval = function (b, c) {
				a[b] = c
			}, this.deleteInterval = function (b) {
				a[b] && (clearInterval(a[b]), delete a[b])
			}, this.clearInterval = function () {
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
			this.getPicStyle = function (a) {
				if (void 0 === a) return b;
				for (var c = 0; c < b.length; c++) if (a === b[c].value) return b[c]
			}
		}

		a.utilPictures = new b
	}(window), function (a) {
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
		this.getSendType = function (b) {
			if (void 0 === b) return a;
			for (var c in a) if (b === a[c].value) return a[c];
			return null
		}, this.getHandleType = function (a) {
			if (void 0 === a) return b;
			for (var c in b) if (a === b[c].value) return b[c];
			return null
		}
	}

	a.utilTrigger = new b
}(window), function (a, b) {
	function c() {
		var a, c, d, e = [];
		b("#media");
		this.addAudio = function (a, f) {
			var g = new Audio;
			g.src = f, e.push({
				elem: a,
				audio: g
			}), b(g).bind("ended", function () {
				c = !1, d()
			})
		}, this.play = function (b, f, g) {
			console.log(444)
			var h;
			d = f;
			for (var i = 0; i < e.length; i++) e[i].elem == b && (h = e[i].audio);
			a == h && c ? (h.pause(), c = !1, f()) : a != h || c ? (a && a.pause(), h.currentTime = 0, h.play(), g(), c = !0, a = h) : (h.play(), c = !0, g())
		}, this.pause = function () {
			a && (a.pause(), c = !1)
		}
	}

	a.utilSound = new c
}(window, $), window.flux = {
	version: "1.4.4"
}, function (a) {
	flux.slider = function (b, c) {
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
		}, c),  this.height = this.options.height ? (!PCcheck() ? this.options.height : Math.round(parseInt(this.options.height)*(checkHeight()))) : null, this.width = this.options.width ? (!PCcheck() ? this.options.width : Math.round(parseInt(this.options.width)*(checkHeight()))) : null;//判断移动端&&修改大小
		var f = [];
		a(this.options.transitions).each(function (a, b) {
			var c = new flux.transitions[b](this),
				d = !0;
			c.options.requires3d && !flux.browser.supports3d && (d = !1), c.options.compatibilityCheck && (d = c.options.compatibilityCheck()), d && f.push(b)
		}), this.options.transitions = f, this.images = new Array, this.imageLoadedCount = 0, this.currentImageIndex = 0, this.nextImageIndex = 1, this.playing = !1, this.container = a('<div class="fluxslider"></div>').appendTo(this.element), this.surface = a('<div class="surface" style="position: relative"></div>').appendTo(this.container), this.container.bind("click", function (b) {
			a(b.target).hasClass("hasLink") && (window.location = a(b.target).data("href"))
		}), this.imageContainer = a('<div class="images loading1"></div>').css({
			position: "relative",
			overflow: "hidden"
		}).appendTo(this.surface), this.width && this.height && this.imageContainer.css({
			width: (!PCcheck() ? this.width : Math.round(parseInt(this.width)*(checkHeight()))) + "px",//判断移动端&&修改大小
			height: (!PCcheck() ? this.height : Math.round(parseInt(this.height)*(checkHeight()))) + "px"
		}), this.image1 = a('<div class="image1" style="height: 100%; width: 100%"></div>').appendTo(this.imageContainer), this.image2 = a('<div class="image2" style="height: 100%; width: 100%"></div>').appendTo(this.imageContainer), a(this.image1).add(this.image2).css({
			position: "absolute",
			top: "0px",
			left: "0px"
		}), this.element.find("img, a img").each(function (b, c) {
			var e = c.cloneNode(!1),
				f = a(c).parent();
			f.is("a") && a(e).data("href", f.attr("href")), d.images.push(e), a(c).remove()
		});
		for (var g = 0; g < this.images.length; g++) {
			var h = new Image;
			h.onload = function () {
				d.imageLoadedCount++, d.width = d.width ? d.width : this.width, d.height = d.height ? d.height : this.height, d.imageLoadedCount >= d.images.length && (d.finishedLoading(), d.setupImages())
			}, h.src = this.images[g].src
		}
		this.element.bind("fluxTransitionEnd", function (a, b) {
			d.options.onTransitionEnd && (a.preventDefault(), d.options.onTransitionEnd(b))
		}), this.options.autoplay && this.start();
		var i = {},
			j = {},
			k = 20;
		this.element.bind("mousedown touchstart", function (a) {
			"touchstart" == a.type ? i.left = a.originalEvent.touches[0].pageX : "mousedown" == a.type && (i.left = a.pageX)
		}).bind("mouseup touchend", function (a) {
			"touchend" == a.type ? j.left = a.originalEvent.changedTouches[0].pageX : "mouseup" == a.type && (j.left = a.pageX), j.left - i.left > k ? d.prev(null, {
				direction: "right"
			}) : i.left - j.left > k && d.next(null, {
				direction: "left"
			}), d.options.autoplay && (d.stop(), d.start())
		}), setTimeout(function () {
			a(window).focus(function () {
				d.isPlaying() && d.next()
			})
		}, 100)
	}, flux.slider.prototype = {
		constructor: flux.slider,
		playing: !1,
		start: function () {
			var a = this;
			this.playing = !0, this.interval = setInterval(function () {
				a.transition()
			}, this.options.delay), "function" == typeof this.options.onStartEnd && this.options.onStartEnd(this.interval)
		},
		stop: function () {
			this.playing = !1, clearInterval(this.interval), this.interval = null
		},
		isPlaying: function () {
			return this.playing
		},
		next: function (a, b) {
			b = b || {}, b.direction = "left", this.showImage(this.currentImageIndex + 1, a, b)
		},
		prev: function (a, b) {
			b = b || {}, b.direction = "right", this.showImage(this.currentImageIndex - 1, a, b)
		},
		showImage: function (a, b, c) {
			this.setNextIndex(a), this.setupImages(), this.transition(b, c)
		},
		finishedLoading: function () {
			var b = this;
			if (this.container.css({
					width: this.width + "px",
					height: this.height + "px"
				}), this.imageContainer.removeClass("loading1"), this.options.pagination && (this.pagination = a('<ul class="pagination"></ul>').css({
					margin: "0px",
					padding: "0px",
					"text-align": "center"
				}), this.pagination.bind("click", function (c) {
					c.preventDefault(), b.showImage(a(c.target).data("index"))
				}), a(this.images).each(function (c, d) {
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
				this.nextButton = a('<a href="#">»</a>').css(c).css3({
					"border-radius": "4px"
				}).appendTo(this.surface).bind("click", function (a) {
					a.preventDefault(), b.next()
				}), this.prevButton = a('<a href="#">«</a>').css(c).css3({
					"border-radius": "4px"
				}).appendTo(this.surface).bind("click", function (a) {
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
		setupImages: function () {
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
		transition: function (b, c) {
			if (void 0 == b || !flux.transitions[b]) {
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
		updateCaption: function () {
			var b = a(this.getImage(this.currentImageIndex)).attr("title");
			this.options.captions && this.captionBar && ("" !== b && this.captionBar.html(b), this.captionBar.css("opacity", "" === b ? 0 : 1))
		},
		getImage: function (a) {
			return a %= this.images.length, this.images[a]
		},
		setNextIndex: function (a) {
			void 0 == a && (a = this.currentImageIndex + 1), this.nextImageIndex = a, this.nextImageIndex > this.images.length - 1 && (this.nextImageIndex = 0), this.nextImageIndex < 0 && (this.nextImageIndex = this.images.length - 1)
		},
		increment: function () {
			this.currentImageIndex++, this.currentImageIndex > this.images.length - 1 && (this.currentImageIndex = 0)
		}
	}
}(window.jQuery || window.Zepto), function (a) {
	flux.browser = {
		init: function () {
			if (void 0 === flux.browser.supportsTransitions) {
				var b = (document.createElement("div"), ["-webkit", "-moz", "-o", "-ms"]);
				if (window.Modernizr && void 0 !== Modernizr.csstransitions ? flux.browser.supportsTransitions = Modernizr.csstransitions : flux.browser.supportsTransitions = this.supportsCSSProperty("Transition"), window.Modernizr && void 0 !== Modernizr.csstransforms3d) flux.browser.supports3d = Modernizr.csstransforms3d;
				else if (flux.browser.supports3d = this.supportsCSSProperty("Perspective"), flux.browser.supports3d && "webkitPerspective" in a("body").get(0).style) {
					var c = a('<div id="csstransform3d"></div>'),
						d = a('<style media="(transform-3d), (' + b.join("-transform-3d),(") + '-transform-3d)">div#csstransform3d { position: absolute; left: 9px }</style>');
					a("body").append(c), a("head").append(d), flux.browser.supports3d = 9 == c.get(0).offsetLeft, c.remove(), d.remove()
				}
			}
		},
		supportsCSSProperty: function (a) {
			for (var b = document.createElement("div"), c = ["Webkit", "Moz", "O", "Ms"], d = !1, e = 0; e < c.length; e++) c[e] + a in b.style && (d = d || !0);
			return d
		},
		translate: function (a, b, c) {
			return a = void 0 != a ? a : 0, b = void 0 != b ? b : 0, c = void 0 != c ? c : 0, "translate" + (flux.browser.supports3d ? "3d(" : "(") + a + "px," + b + (flux.browser.supports3d ? "px," + c + "px)" : "px)")
		},
		rotateX: function (a) {
			return flux.browser.rotate("x", a)
		},
		rotateY: function (a) {
			return flux.browser.rotate("y", a)
		},
		rotateZ: function (a) {
			return flux.browser.rotate("z", a)
		},
		rotate: function (a, b) {
			return !a in {
				x: "",
				y: "",
				z: ""
			} && (a = "z"), b = void 0 != b ? b : 0, flux.browser.supports3d ? "rotate3d(" + ("x" == a ? "1" : "0") + ", " + ("y" == a ? "1" : "0") + ", " + ("z" == a ? "1" : "0") + ", " + b + "deg)" : "z" == a ? "rotate(" + b + "deg)" : ""
		}
	}, a(function () {
		flux.browser.init()
	})
}(window.jQuery || window.Zepto), function (a) {
	a.fn.css3 = function (a) {
		var b = {},
			c = ["webkit", "moz", "ms", "o"];
		for (var d in a) {
			for (var e = 0; e < c.length; e++) b["-" + c[e] + "-" + d] = a[d];
			b[d] = a[d]
		}
		return this.css(b), this
	}, a.fn.transitionEnd = function (b) {
		for (var c = ["webkitTransitionEnd", "transitionend", "oTransitionEnd"], d = 0; d < c.length; d++) this.bind(c[d], function (d) {
			for (var e = 0; e < c.length; e++) a(this).unbind(c[e]);
			b && b.call(this, d)
		});
		return this
	}, flux.transition = function (b, c) {
		if (this.options = a.extend({
				requires3d: !1,
				after: function () {
				}
			}, c), this.slider = b, this.options.requires3d && !flux.browser.supports3d || !flux.browser.supportsTransitions || this.options.fallback === !0) {
			var d = this;
			this.options.after = void 0, this.options.setup = function () {
				d.fallbackSetup()
			}, this.options.execute = function () {
				d.fallbackExecute()
			}
		}
	}, flux.transition.prototype = {
		constructor: flux.transition,
		hasFinished: !1,
		run: function () {
			var a = this;
			void 0 !== this.options.setup && this.options.setup.call(this), this.slider.image1.css({
				"background-image": "none"
			}), this.slider.imageContainer.css("overflow", this.options.requires3d ? "visible" : "hidden"), setTimeout(function () {
				void 0 !== a.options.execute && a.slider.image1.css("background-color", ""), a.options.execute.call(a)
			}, 5)
		},
		finished: function () {
			this.hasFinished || (this.hasFinished = !0, this.options.after && this.options.after.call(this), this.slider.imageContainer.css("overflow", "hidden"), this.slider.setupImages(), this.slider.element.trigger("fluxTransitionEnd", {
				currentImage: this.slider.getImage(this.slider.currentImageIndex)
			}))
		},
		fallbackSetup: function () {
		},
		fallbackExecute: function () {
			this.finished()
		}
	}, flux.transitions = {}, flux.transition_grid = function (b, c) {
		return new flux.transition(b, a.extend({
			columns: 6,
			rows: 6,
			forceSquare: !1,
			setup: function () {
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
			execute: function () {
				var a = this,
					b = this.slider.image1.height(),
					c = this.slider.image1.find("div.barcontainer");
				this.slider.image2.hide(), c.last().transitionEnd(function (b) {
					a.slider.image2.show(), a.finished()
				}), c.css3({
					transform: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, b / 2, b / 2)
				})
			},
			renderTile: function (a, b, c, d, e, f, g) {
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function (a) {
	flux.transitions.bars = function (b, c) {
		return new flux.transition_grid(b, a.extend({
			columns: 10,
			rows: 1,
			delayBetweenBars: 40,
			renderTile: function (b, c, d, e, f, g, h) {
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
			execute: function () {
				var b = this,
					c = this.slider.image1.height(),
					d = this.slider.image1.find("div.tile");
				a(d[d.length - 1]).transitionEnd(function () {
					b.finished()
				}), setTimeout(function () {
					d.css({
						opacity: "0.5"
					}).css3({
						transform: flux.browser.translate(0, c)
					})
				}, 50)
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function (a) {
	flux.transitions.bars3d = function (b, c) {
		return new flux.transition_grid(b, a.extend({
			requires3d: !0,
			columns: 7,
			rows: 1,
			delayBetweenBars: 150,
			perspective: 1e3,
			renderTile: function (b, c, d, e, f, g, h) {
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
			execute: function () {
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
				this.slider.image2.hide(), c.last().transitionEnd(function (b) {
					a.slider.image1.css3({
						"transform-style": "flat"
					}), a.slider.image2.show(), a.finished()
				}), setTimeout(function () {
					c.css3({
						transform: flux.browser.rotateX(-90) + " " + flux.browser.translate(0, b / 2, b / 2)
					})
				}, 50)
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function (a) {
	flux.transitions.blinds = function (b, c) {
		return new flux.transitions.bars(b, a.extend({
			execute: function () {
				var b = this,
					c = (this.slider.image1.height(), this.slider.image1.find("div.tile"));
				a(c[c.length - 1]).transitionEnd(function () {
					b.finished()
				}), setTimeout(function () {
					c.css({
						opacity: "0.5"
					}).css3({
						transform: "scalex(0.0001)"
					})
				}, 50)
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function (a) {
	flux.transitions.zip = function (b, c) {
		return new flux.transitions.bars(b, a.extend({
			execute: function () {
				var b = this,
					c = this.slider.image1.height(),
					d = this.slider.image1.find("div.tile");
				a(d[d.length - 1]).transitionEnd(function () {
					b.finished()
				}), setTimeout(function () {
					d.each(function (b, d) {
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
}(window.jQuery || window.Zepto), function (a) {
	flux.transitions.blocks = function (b, c) {
		return new flux.transition_grid(b, a.extend({
			forceSquare: !0,
			delayBetweenBars: 100,
			renderTile: function (b, c, d, e, f, g, h) {
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
				}), void 0 === this.maxDelay && (this.maxDelay = 0), i > this.maxDelay && (this.maxDelay = i, this.maxDelayTile = b)
			},
			execute: function () {
				var b = this,
					c = this.slider.image1.find("div.tile");
				this.maxDelayTile.transitionEnd(function () {
					b.finished()
				}), setTimeout(function () {
					c.each(function (b, c) {
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
}(window.jQuery || window.Zepto), function (a) {
	flux.transitions.blocks2 = function (b, c) {
		return new flux.transition_grid(b, a.extend({
			cols: 12,
			forceSquare: !0,
			delayBetweenDiagnols: 150,
			renderTile: function (b, c, d, e, f, g, h) {
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
			execute: function () {
				var b = this,
					c = this.slider.image1.find("div.tile");
				c.last().transitionEnd(function () {
					b.finished()
				}), setTimeout(function () {
					c.each(function (b, c) {
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
}(window.jQuery || window.Zepto), function (a) {
	flux.transitions.cube = function (b, c) {
		return new flux.transition(b, a.extend({
			requires3d: !0,
			barWidth: 100,
			direction: "left",
			perspective: 1e3,
			setup: function () {
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
			execute: function () {
				var a = this;
				this.slider.image1.width(), this.slider.image1.height();
				this.slider.image2.hide(), this.cubeContainer.transitionEnd(function () {
					a.slider.image2.show(), a.finished()
				}), setTimeout(function () {
					a.cubeContainer.css3({
						transform: a.options.transitionStrings.call(a, a.options.direction, "container")
					})
				}, 50)
			},
			transitionStrings: function (a, b) {
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
}(window.jQuery || window.Zepto), function (a) {
	flux.transitions.tiles3d = function (b, c) {
		return new flux.transition_grid(b, a.extend({
			requires3d: !0,
			forceSquare: !0,
			columns: 5,
			perspective: 600,
			delayBetweenBarsX: 200,
			delayBetweenBarsY: 150,
			renderTile: function (b, c, d, e, f, g, h) {
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
			execute: function () {
				this.slider.image1.css3({
					perspective: this.options.perspective,
					"perspective-origin": "50% 50%"
				});
				var a = this,
					b = this.slider.image1.find("div.tile");
				this.slider.image2.hide(), b.last().transitionEnd(function (b) {
					a.slider.image2.show(), a.finished()
				}), setTimeout(function () {
					b.css3({
						transform: flux.browser.rotateY(180)
					})
				}, 50)
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function (a) {
	flux.transitions.turn = function (b, c) {
		return new flux.transition(b, a.extend({
			requires3d: !0,
			perspective: 1300,
			direction: "left",
			setup: function () {
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
			execute: function () {
				var a = this;
				this.slider.image1.find("div.tab").first().transitionEnd(function () {
					a.finished()
				}), setTimeout(function () {
					a.slider.image1.find("div.tab").css3({
						transform: flux.browser.rotateY("left" == a.options.direction ? -179 : 179)
					}), a.slider.image1.find("div.overlay").css({
						opacity: 0
					})
				}, 50)
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function (a) {
	flux.transitions.slide = function (b, c) {
		return new flux.transition(b, a.extend({
			direction: "left",
			setup: function () {
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
			execute: function () {
				var a = this,
					b = this.slider.image1.width();
				"left" == this.options.direction && (b = -b), this.slideContainer.transitionEnd(function () {
					a.finished()
				}), setTimeout(function () {
					a.slideContainer.css3({
						transform: flux.browser.translate(b)
					})
				}, 50)
			}
		}, c))
	}
}(window.jQuery || window.Zepto), function (a) {
	flux.transitions.explode = function (b, c) {
		return new flux.transition_grid(b, a.extend({
			columns: 6,
			forceSquare: !0,
			delayBetweenBars: 30,
			perspective: 800,
			requires3d: !0,
			renderTile: function (b, c, d, e, f, g, h) {
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
				}), void 0 === this.maxDelay && (this.maxDelay = 0), i > this.maxDelay && (this.maxDelay = i, this.maxDelayTile = b)
			},
			execute: function () {
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
				this.maxDelayTile.transitionEnd(function () {
					b.slider.image1.css3({
						"transform-style": "flat"
					}), b.finished()
				}), setTimeout(function () {
					c.each(function (b, c) {
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
}(window.jQuery || window.Zepto), function () {
	window.eqxiuSvg = {
		NAMESPACE: "http://www.w3.org/2000/svg",
		SYMBOLS: {
			"cog": '<path d="M32 17.969v-4l-4.781-1.992c-0.133-0.375-0.273-0.738-0.445-1.094l1.93-4.805-2.829-2.828-4.762 1.961c-0.363-0.176-0.734-0.324-1.117-0.461l-2.027-4.75h-4l-1.977 4.734c-0.398 0.141-0.781 0.289-1.16 0.469l-4.754-1.91-2.828 2.828 1.938 4.711c-0.188 0.387-0.34 0.781-0.485 1.188l-4.703 2.011v4l4.707 1.961c0.145 0.406 0.301 0.801 0.488 1.188l-1.902 4.742 2.828 2.828 4.723-1.945c0.379 0.18 0.766 0.324 1.164 0.461l2.023 4.734h4l1.98-4.758c0.379-0.141 0.754-0.289 1.113-0.461l4.797 1.922 2.828-2.828-1.969-4.773c0.168-0.359 0.305-0.723 0.438-1.094l4.782-2.039zM15.969 22c-3.312 0-6-2.688-6-6s2.688-6 6-6 6 2.688 6 6-2.688 6-6 6z"></path>',
			"fork": '<path d="M20 0v3.875c0 1.602-0.625 3.109-1.754 4.238l-11.316 11.254c-1.789 1.785-2.774 4.129-2.883 6.633h-4.047l6 6 6-6h-3.957c0.105-1.438 0.684-2.773 1.711-3.805l11.316-11.25c1.891-1.89 2.93-4.398 2.93-7.070v-3.875h-4zM23.953 26c-0.109-2.504-1.098-4.848-2.887-6.641l-2.23-2.215-2.836 2.821 2.242 2.23c1.031 1.027 1.609 2.367 1.715 3.805h-3.957l6 6 6-6h-4.047z"></path>',
			"cloud": '<path d="M24 10c-0.379 0-0.738 0.061-1.102 0.111-1.394-2.465-3.972-4.111-6.898-4.111-2.988 0-5.566 1.666-6.941 4.1-0.352-0.047-0.704-0.1-1.059-0.1-4.41 0-8 3.588-8 8 0 4.414 3.59 8 8 8h16c4.41 0 8-3.586 8-8 0-4.412-3.59-8-8-8zM24 22h-16c-2.207 0-4-1.797-4-4 0-2.193 1.941-3.885 4.004-3.945 0.008 0.943 0.172 1.869 0.5 2.744l3.746-1.402c-0.168-0.444-0.25-0.915-0.25-1.397 0-2.205 1.793-4 4-4 1.293 0 2.465 0.641 3.199 1.639-1.929 1.461-3.199 3.756-3.199 6.361h4c0-2.205 1.793-4 4-4s4 1.795 4 4c0 2.203-1.793 4-4 4z"></path>',
			"heart-stroke": '<path d="M23.113 6c2.457 0 4.492 1.82 4.836 4.188l-11.945 13.718-11.953-13.718c0.344-2.368 2.379-4.188 4.836-4.188 2.016 0 3.855 2.164 3.855 2.164l3.258 3.461 3.258-3.461c0 0 1.84-2.164 3.855-2.164zM23.113 2c-2.984 0-5.5 1.578-7.113 3.844-1.613-2.266-4.129-3.844-7.113-3.844-4.903 0-8.887 3.992-8.887 8.891v0.734l16.008 18.375 15.992-18.375v-0.734c0-4.899-3.984-8.891-8.887-8.891v0z"></path>',
			"windows": '<path d="M28.984,59.594V33.416H63V64L28.984,59.594z M28.984,4.406L63,0v30.584H28.984V4.406z M0,33.416h26.149v25.487L0,55.231V33.416z M0,8.769l26.149-3.672v25.487H0V8.769z"></path>',
			"pad": '<path d="M49,64H3c-1.657,0-3-1.343-3-3V3c0-1.657,1.343-3,3-3h46c1.657,0,3,1.343,3,3v58C52,62.657,50.657,64,49,64z M26,62c1.657,0,3-1.343,3-3s-1.343-3-3-3s-3,1.343-3,3S24.343,62,26,62z M45,6H7v48h38V6z"></path>',
			"sun": '<path d="M16.001 8c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 7.999-3.582 7.999-8s-3.581-8-7.999-8v0zM14 2c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM4 6c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM2 14c1.105 0 2 0.895 2 2 0 1.107-0.895 2-2 2s-2-0.893-2-2c0-1.105 0.895-2 2-2zM4 26c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM14 30c0-1.109 0.895-2 2-2 1.108 0 2 0.891 2 2 0 1.102-0.892 2-2 2-1.105 0-2-0.898-2-2zM24 26c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM30 18c-1.104 0-2-0.896-2-2 0-1.107 0.896-2 2-2s2 0.893 2 2c0 1.104-0.896 2-2 2zM24 6c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2z"></path>',
			"bolt": '<path d="M32 0l-24 16 6 4-14 12 24-12-6-4z"></path>',
			"pin": '<path d="M17.070 2.93c-3.906-3.906-10.234-3.906-14.141 0-3.906 3.904-3.906 10.238 0 14.14 0.001 0 7.071 6.93 7.071 14.93 0-8 7.070-14.93 7.070-14.93 3.907-3.902 3.907-10.236 0-14.14zM10 14c-2.211 0-4-1.789-4-4s1.789-4 4-4 4 1.789 4 4-1.789 4-4 4z"></path>',
			"clock": '<path d="M16 4c6.617 0 12 5.383 12 12s-5.383 12-12 12-12-5.383-12-12 5.383-12 12-12zM16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16v0zM21.422 18.578l-3.422-3.426v-7.152h-4.023v7.992c0 0.602 0.277 1.121 0.695 1.492l3.922 3.922 2.828-2.828z"></path>',
			"checkmark-circle": '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM13.52 23.383l-7.362-7.363 2.828-2.828 4.533 4.535 9.617-9.617 2.828 2.828-12.444 12.445z"></path>',
			"camera": '<path d="M16 20c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4-2.209 0-4-1.791-4-4zM28 8l-3.289-6.643c-0.27-0.789-1.016-1.357-1.899-1.357h-5.492c-0.893 0-1.646 0.582-1.904 1.385l-3.412 6.615h-8.004c-2.209 0-4 1.791-4 4v20h32v-20c0-2.209-1.789-4-4-4zM6 16c-1.105 0-2-0.895-2-2s0.895-2 2-2 2 0.895 2 2-0.895 2-2 2zM20 28c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>',
			"denied": '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM16 4c2.59 0 4.973 0.844 6.934 2.242l-16.696 16.688c-1.398-1.961-2.238-4.344-2.238-6.93 0-6.617 5.383-12 12-12zM16 28c-2.59 0-4.973-0.844-6.934-2.242l16.696-16.688c1.398 1.961 2.238 4.344 2.238 6.93 0 6.617-5.383 12-12 12z"></path>',
			"earth": '<path d="M27.314 4.686c3.022 3.022 4.686 7.040 4.686 11.314s-1.664 8.292-4.686 11.314c-3.022 3.022-7.040 4.686-11.314 4.686s-8.292-1.664-11.314-4.686c-3.022-3.022-4.686-7.040-4.686-11.314s1.664-8.292 4.686-11.314c3.022-3.022 7.040-4.686 11.314-4.686s8.292 1.664 11.314 4.686zM25.899 25.9c1.971-1.971 3.281-4.425 3.821-7.096-0.421 0.62-0.824 0.85-1.073-0.538-0.257-2.262-2.335-0.817-3.641-1.621-1.375 0.927-4.466-1.802-3.941 1.276 0.81 1.388 4.375-1.858 2.598 1.079-1.134 2.050-4.145 6.592-3.753 8.946 0.049 3.43-3.504 0.715-4.729-0.422-0.824-2.279-0.281-6.262-2.434-7.378-2.338-0.102-4.344-0.314-5.25-2.927-0.545-1.87 0.58-4.653 2.584-5.083 2.933-1.843 3.98 2.158 6.731 2.232 0.854-0.894 3.182-1.178 3.375-2.18-1.805-0.318 2.29-1.517-0.173-2.199-1.358 0.16-2.234 1.409-1.512 2.467-2.632 0.614-2.717-3.809-5.247-2.414-0.064 2.206-4.132 0.715-1.407 0.268 0.936-0.409-1.527-1.594-0.196-1.379 0.654-0.036 2.854-0.807 2.259-1.325 1.225-0.761 2.255 1.822 3.454-0.059 0.866-1.446-0.363-1.713-1.448-0.98-0.612-0.685 1.080-2.165 2.573-2.804 0.497-0.213 0.973-0.329 1.336-0.296 0.752 0.868 2.142 1.019 2.215-0.104-1.862-0.892-3.915-1.363-6.040-1.363-3.051 0-5.952 0.969-8.353 2.762 0.645 0.296 1.012 0.664 0.39 1.134-0.483 1.439-2.443 3.371-4.163 3.098-0.893 1.54-1.482 3.238-1.733 5.017 1.441 0.477 1.773 1.42 1.464 1.736-0.734 0.64-1.185 1.548-1.418 2.541 0.469 2.87 1.818 5.515 3.915 7.612 2.644 2.644 6.16 4.1 9.899 4.1s7.255-1.456 9.899-4.1z"></path>',
			"eye": '<path d="M16 4c-8.836 0-16 11.844-16 11.844s7.164 12.156 16 12.156 16-12.156 16-12.156-7.164-11.844-16-11.844zM16 24c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zM12 16c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4-2.209 0-4-1.791-4-4z"></path>',
			"globe": '<path d="M15 2c-8.284 0-15 6.716-15 15s6.716 15 15 15c8.284 0 15-6.716 15-15s-6.716-15-15-15zM23.487 22c0.268-1.264 0.437-2.606 0.492-4h3.983c-0.104 1.381-0.426 2.722-0.959 4h-3.516zM6.513 12c-0.268 1.264-0.437 2.606-0.492 4h-3.983c0.104-1.381 0.426-2.722 0.959-4h3.516zM21.439 12c0.3 1.28 0.481 2.62 0.54 4h-5.979v-4h5.439zM16 10v-5.854c0.456 0.133 0.908 0.355 1.351 0.668 0.831 0.586 1.625 1.488 2.298 2.609 0.465 0.775 0.867 1.638 1.203 2.578h-4.852zM10.351 7.422c0.673-1.121 1.467-2.023 2.298-2.609 0.443-0.313 0.895-0.535 1.351-0.668v5.854h-4.852c0.336-0.94 0.738-1.803 1.203-2.578zM14 12v4h-5.979c0.059-1.38 0.24-2.72 0.54-4h5.439zM2.997 22c-0.533-1.278-0.854-2.619-0.959-4h3.983c0.055 1.394 0.224 2.736 0.492 4h-3.516zM8.021 18h5.979v4h-5.439c-0.3-1.28-0.481-2.62-0.54-4zM14 24v5.854c-0.456-0.133-0.908-0.355-1.351-0.668-0.831-0.586-1.625-1.488-2.298-2.609-0.465-0.775-0.867-1.638-1.203-2.578h4.852zM19.649 26.578c-0.673 1.121-1.467 2.023-2.298 2.609-0.443 0.312-0.895 0.535-1.351 0.668v-5.854h4.852c-0.336 0.94-0.738 1.802-1.203 2.578zM16 22v-4h5.979c-0.059 1.38-0.24 2.72-0.54 4h-5.439zM23.98 16c-0.055-1.394-0.224-2.736-0.492-4h3.516c0.533 1.278 0.855 2.619 0.959 4h-3.983zM25.958 10h-2.997c-0.582-1.836-1.387-3.447-2.354-4.732 1.329 0.636 2.533 1.488 3.585 2.54 0.671 0.671 1.261 1.404 1.766 2.192zM5.808 7.808c1.052-1.052 2.256-1.904 3.585-2.54-0.967 1.285-1.771 2.896-2.354 4.732h-2.997c0.504-0.788 1.094-1.521 1.766-2.192zM4.042 24h2.997c0.583 1.836 1.387 3.447 2.354 4.732-1.329-0.636-2.533-1.488-3.585-2.54-0.671-0.671-1.261-1.404-1.766-2.192zM24.192 26.192c-1.052 1.052-2.256 1.904-3.585 2.54 0.967-1.285 1.771-2.896 2.354-4.732h2.997c-0.504 0.788-1.094 1.521-1.766 2.192z"></path>',
			"happy": '<path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM16 18.711c3.623 0 7.070-0.963 10-2.654-0.455 5.576-4.785 9.942-10 9.942-5.215 0-9.544-4.371-10-9.947 2.93 1.691 6.377 2.658 10 2.658zM8 11c0-1.657 0.895-3 2-3s2 1.343 2 3c0 1.657-0.895 3-2 3-1.105 0-2-1.343-2-3zM20 11c0-1.657 0.895-3 2-3s2 1.343 2 3c0 1.657-0.895 3-2 3-1.105 0-2-1.343-2-3z"></path>',
			"heart-fill": '<path d="M16 5.844c-1.613-2.266-4.129-3.844-7.113-3.844-4.903 0-8.887 3.992-8.887 8.891v0.734l16.008 18.375 15.992-18.375v-0.734c0-4.899-3.984-8.891-8.887-8.891-2.984 0-5.5 1.578-7.113 3.844z"></path>',
			"home": '<path d="M16 0l-16 16h4v16h24v-16h4l-16-16zM24 28h-6v-6h-4v6h-6v-14.344l8-5.656 8 5.656v14.344z"></path>',
			"iphone": '<path d="M16 0h-8c-4.418 0-8 3.582-8 8v16c0 4.418 3.582 8 8 8h8c4.418 0 8-3.582 8-8v-16c0-4.418-3.582-8-8-8zM12 30.062c-1.139 0-2.062-0.922-2.062-2.062s0.924-2.062 2.062-2.062 2.062 0.922 2.062 2.062-0.923 2.062-2.062 2.062zM20 24h-16v-16c0-2.203 1.795-4 4-4h8c2.203 0 4 1.797 4 4v16z"></path>',
			"lock": '<path d="M14 0c-5.508 0-9.996 4.484-9.996 10v2h-4.004v14c0 3.309 2.691 6 6 6h12c3.309 0 6-2.691 6-6v-16c0-5.516-4.488-10-10-10zM11.996 24c-1.101 0-1.996-0.895-1.996-2s0.895-2 1.996-2c1.105 0 2 0.895 2 2s-0.894 2-2 2zM20 12h-11.996v-2c0-3.309 2.691-6 5.996-6 3.309 0 6 2.691 6 6v2z"></path>',
			"mail": '<path d="M15.996 15.457l16.004-7.539v-3.918h-32v3.906zM16.004 19.879l-16.004-7.559v15.68h32v-15.656z"></path>',
			"rain": '<path d="M23.998 6c-0.375 0-0.733 0.061-1.103 0.111-1.389-2.465-3.969-4.111-6.895-4.111-2.987 0-5.565 1.666-6.94 4.1-0.353-0.047-0.705-0.1-1.060-0.1-4.41 0-8 3.588-8 8s3.59 8 8 8h15.998c4.414 0 8-3.588 8-8s-3.586-8-8-8zM23.998 18h-15.998c-2.207 0-4-1.795-4-4 0-2.193 1.941-3.885 4.004-3.945 0.009 0.943 0.172 1.869 0.5 2.744l3.746-1.402c-0.168-0.444-0.25-0.915-0.25-1.397 0-2.205 1.793-4 4-4 1.293 0 2.465 0.641 3.199 1.639-1.928 1.461-3.199 3.756-3.199 6.361h4c0-2.205 1.795-4 3.998-4 2.211 0 4 1.795 4 4s-1.789 4-4 4zM3.281 29.438c-0.75 0.75-1.969 0.75-2.719 0s-0.75-1.969 0-2.719 5.438-2.719 5.438-2.719-1.969 4.688-2.719 5.438zM11.285 29.438c-0.75 0.75-1.965 0.75-2.719 0-0.75-0.75-0.75-1.969 0-2.719 0.754-0.75 5.438-2.719 5.438-2.719s-1.965 4.688-2.719 5.438zM19.28 29.438c-0.75 0.75-1.969 0.75-2.719 0s-0.75-1.969 0-2.719 5.437-2.719 5.437-2.719-1.968 4.688-2.718 5.438z"></path>',
			"ribbon": '<path d="M8 20c-1.41 0-2.742-0.289-4-0.736v12.736l4-4 4 4v-12.736c-1.258 0.447-2.59 0.736-4 0.736zM0 8c0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8-4.418 0-8-3.582-8-8z"></path>',
			"sad": '<path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM8 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM20 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM9.997 24.398l-2.573-1.544c1.749-2.908 4.935-4.855 8.576-4.855 3.641 0 6.827 1.946 8.576 4.855l-2.573 1.544c-1.224-2.036-3.454-3.398-6.003-3.398-2.549 0-4.779 1.362-6.003 3.398z"></path>',
			"smiley": '<path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM8 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM20 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM22.003 19.602l2.573 1.544c-1.749 2.908-4.935 4.855-8.576 4.855s-6.827-1.946-8.576-4.855l2.573-1.544c1.224 2.036 3.454 3.398 6.003 3.398s4.779-1.362 6.003-3.398z"></path>',
			"star": '<path d="M22.137 19.625l9.863-7.625h-12l-4-12-4 12h-12l9.875 7.594-3.875 12.406 10.016-7.68 9.992 7.68z"></path>',
			"thin-arrow-down": '<path d="M4.586 19.414l10 10c0.781 0.781 2.047 0.781 2.828 0l10-10c0.781-0.781 0.781-2.047 0-2.828s-2.047-0.781-2.828 0l-6.586 6.586v-19.172c0-1.105-0.895-2-2-2s-2 0.895-2 2v19.172l-6.586-6.586c-0.391-0.39-0.902-0.586-1.414-0.586s-1.024 0.195-1.414 0.586c-0.781 0.781-0.781 2.047 0 2.828z"></path>',
			"thin-arrow-down-left": '<path d="M18 28c1.105 0 2-0.895 2-2s-0.895-2-2-2h-7.172l16.586-16.586c0.781-0.781 0.781-2.047 0-2.828-0.391-0.391-0.902-0.586-1.414-0.586s-1.024 0.195-1.414 0.586l-16.586 16.586v-7.172c0-1.105-0.895-2-2-2s-2 0.895-2 2v14h14z"></path>',
			"thin-arrow-down-right": '<path d="M28 14c0-1.105-0.895-2-2-2s-2 0.895-2 2v7.172l-16.586-16.586c-0.781-0.781-2.047-0.781-2.828 0-0.391 0.391-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414l16.586 16.586h-7.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h14v-14z"></path>',
			"thin-arrow-left": '<path d="M12.586 4.586l-10 10c-0.781 0.781-0.781 2.047 0 2.828l10 10c0.781 0.781 2.047 0.781 2.828 0s0.781-2.047 0-2.828l-6.586-6.586h19.172c1.105 0 2-0.895 2-2s-0.895-2-2-2h-19.172l6.586-6.586c0.39-0.391 0.586-0.902 0.586-1.414s-0.195-1.024-0.586-1.414c-0.781-0.781-2.047-0.781-2.828 0z"></path>',
			"thin-arrow-right": '<path d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"></path>',
			"thin-arrow-up": '<path d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z"></path>',
			"thin-arrow-up-left": '<path d="M4 18c0 1.105 0.895 2 2 2s2-0.895 2-2v-7.172l16.586 16.586c0.781 0.781 2.047 0.781 2.828 0 0.391-0.391 0.586-0.902 0.586-1.414s-0.195-1.024-0.586-1.414l-16.586-16.586h7.172c1.105 0 2-0.895 2-2s-0.895-2-2-2h-14v14z"></path>',
			"thin-arrow-up-right": '<path d="M26.001 4c-0 0-0.001 0-0.001 0h-11.999c-1.105 0-2 0.895-2 2s0.895 2 2 2h7.172l-16.586 16.586c-0.781 0.781-0.781 2.047 0 2.828 0.391 0.391 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586l16.586-16.586v7.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-14h-1.999z"></path>',
			"twitter": '<path d="M32 6.076c-1.177 0.522-2.443 0.875-3.771 1.034 1.355-0.813 2.396-2.099 2.887-3.632-1.269 0.752-2.674 1.299-4.169 1.593-1.198-1.276-2.904-2.073-4.792-2.073-3.626 0-6.565 2.939-6.565 6.565 0 0.515 0.058 1.016 0.17 1.496-5.456-0.274-10.294-2.888-13.532-6.86-0.565 0.97-0.889 2.097-0.889 3.301 0 2.278 1.159 4.287 2.921 5.465-1.076-0.034-2.088-0.329-2.974-0.821-0.001 0.027-0.001 0.055-0.001 0.083 0 3.181 2.263 5.834 5.266 6.437-0.551 0.15-1.131 0.23-1.73 0.23-0.423 0-0.834-0.041-1.235-0.118 0.835 2.608 3.26 4.506 6.133 4.559-2.247 1.761-5.078 2.81-8.154 2.81-0.53 0-1.052-0.031-1.566-0.092 2.905 1.863 6.356 2.95 10.064 2.95 12.076 0 18.679-10.004 18.679-18.68 0-0.285-0.006-0.568-0.019-0.849 1.283-0.926 2.396-2.082 3.276-3.398z"></path>',
			"umbrella": '<path d="M16 0c-8.82 0-16 7.178-16 16h4c0-0.826 0.676-1.5 1.5-1.5 0.828 0 1.5 0.674 1.5 1.5h4c0-0.826 0.676-1.5 1.5-1.5 0.828 0 1.5 0.674 1.5 1.5v10c0 1.102-0.895 2-2 2-1.102 0-2-0.898-2-2h-4c0 3.309 2.695 6 6 6 3.312 0 6-2.691 6-6v-10c0-0.826 0.676-1.5 1.5-1.5 0.828 0 1.498 0.674 1.498 1.5h4c0-0.826 0.68-1.5 1.5-1.5 0.828 0 1.5 0.674 1.5 1.5h4c0-8.822-7.172-16-15.998-16z"></path>',
			"unlock": '<path d="M14.004 0c-5.516 0-9.996 4.484-9.996 10h3.996c0-3.309 2.688-6 6-6 3.305 0 5.996 2.691 5.996 6v2h-20v14c0 3.309 2.695 6 6 6h12c3.305 0 6-2.691 6-6v-16c0-5.516-4.488-10-9.996-10zM12 24c-1.102 0-2-0.895-2-2s0.898-2 2-2c1.109 0 2 0.895 2 2s-0.891 2-2 2z"></path>',
			"user": '<path d="M12 16c-6.625 0-12 5.375-12 12 0 2.211 1.789 4 4 4h16c2.211 0 4-1.789 4-4 0-6.625-5.375-12-12-12zM6 6c0-3.314 2.686-6 6-6s6 2.686 6 6c0 3.314-2.686 6-6 6-3.314 0-6-2.686-6-6z"></path>',
			"wondering": '<path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM23.304 18.801l0.703 2.399-13.656 4-0.703-2.399zM8 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2zM20 10c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2-1.105 0-2-0.895-2-2z"></path>',
			"x-circle": '<path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM23.914 21.086l-2.828 2.828-5.086-5.086-5.086 5.086-2.828-2.828 5.086-5.086-5.086-5.086 2.828-2.828 5.086 5.086 5.086-5.086 2.828 2.828-5.086 5.086 5.086 5.086z"></path>',
			"android": '<path d="M50.143,45.057h-0.241c-2.13,0-3.857-1.735-3.857-3.875V24.713 c0-2.14,1.727-3.875,3.857-3.875h0.241c2.13,0,3.857,1.735,3.857,3.875v16.469C54,43.323,52.273,45.057,50.143,45.057z M39.777,51.112h-2.169v8.961c0,2.14-1.727,3.875-3.857,3.875h-0.241c-2.13,0-3.857-1.735-3.857-3.875v-8.961h-5.304v8.961 c0,2.14-1.727,3.875-3.857,3.875H20.25c-2.13,0-3.857-1.735-3.857-3.875v-8.961h-2.17c-2.663,0-4.821-2.169-4.821-4.844V21.565 h35.196v24.704C44.598,48.944,42.44,51.112,39.777,51.112z M18.451,5.498l-2.777-4.832c-0.1-0.174-0.041-0.396,0.132-0.496 l0.209-0.121c0.173-0.1,0.394-0.041,0.494,0.133l2.802,4.877c2.297-1.091,4.863-1.705,7.573-1.705c2.856,0,5.552,0.681,7.941,1.885 l2.906-5.056c0.1-0.174,0.321-0.233,0.494-0.133l0.209,0.121c0.173,0.1,0.232,0.322,0.132,0.496l-2.889,5.028 c4.989,2.866,8.459,8.094,8.901,14.169H9.191C9.643,13.645,13.271,8.316,18.451,5.498z M35.076,13.572 c0.865,0,1.567-0.705,1.567-1.574c0-0.87-0.702-1.574-1.567-1.574c-0.865,0-1.567,0.705-1.567,1.574 C33.509,12.867,34.21,13.572,35.076,13.572z M18.924,13.572c0.865,0,1.567-0.705,1.567-1.574c0-0.87-0.702-1.574-1.567-1.574 c-0.865,0-1.567,0.705-1.567,1.574C17.357,12.867,18.059,13.572,18.924,13.572z M4.098,45.057H3.857C1.727,45.057,0,43.323,0,41.182 V24.713c0-2.14,1.727-3.875,3.857-3.875h0.241c2.13,0,3.857,1.735,3.857,3.875v16.469C7.955,43.323,6.228,45.057,4.098,45.057z"></path>',
			"apple": '<path d="M43.061,34.522c0,8.67,8.393,12.374,8.393,12.374 c-2.057,8.63-9.252,15.172-9.252,15.172c-1.613,1.607-4.567,1.852-4.567,1.852c-2.377,0-5.309-1.34-5.309-1.34 c-2.259-1.299-5.426-1.301-5.426-1.301c-2.792,0-5.309,1.261-5.309,1.261C19.334,63.835,16.399,64,16.399,64 c-2.568,0-3.982-1.498-3.982-1.498C-0.546,50.658,0.003,35.271,0.003,35.271c0-19.645,15.576-19.586,15.576-19.586 c3.626,0,4.919,0.827,4.919,0.827c3.866,1.882,5.777,1.892,5.777,1.892c1.5,0,5.816-1.931,5.816-1.931 c2.223-1.052,5.778-1.064,5.778-1.064c8.325,0,11.984,6.424,11.984,6.424C42.702,26.182,43.061,34.522,43.061,34.522z M25.729,14.818C25.729,1.075,38.377,0,38.377,0C38.377,14.797,25.729,14.818,25.729,14.818z"></path>',
			"baidu": '<path d="M57.549,28.923c-0.219,7.717-6.714,8.677-6.714,8.677 c-8.176-0.648-7.673-8.677-7.673-8.677c-0.795-8.379,5.755-9.641,5.755-9.641C58,19.412,57.549,28.923,57.549,28.923z M37.407,20.246c-5.931,0-5.755-8.677-5.755-8.677c1.708-7.93,7.673-9.641,7.673-9.641c5.472,0.78,6.714,8.677,6.714,8.677 C44.174,21.255,37.407,20.246,37.407,20.246z M37.407,32.779c2.75,3.707,7.673,8.677,7.673,8.677 c7.267,4.21,7.673,10.605,7.673,10.605c0,13.939-14.387,10.605-14.387,10.605c-1.873-0.813-7.673-1.928-7.673-1.928h-4.796 c-2.325,0.456-10.551,1.928-10.551,1.928c-10.734,0-11.51-10.605-11.51-10.605c0-6.349,4.796-9.641,4.796-9.641 c6.151-4.696,9.592-9.641,9.592-9.641c5.137-7.284,9.591-6.749,9.591-6.749C33.569,25.744,37.407,32.779,37.407,32.779z M25.897,35.672H23.02v5.785h-6.714c-5.859,0.902-5.755,8.677-5.755,8.677c-0.551,5.375,5.755,7.713,5.755,7.713h9.591V35.672z M32.611,53.025V41.456h-4.796v12.533c-0.017,2.653,3.837,3.856,3.837,3.856h10.551v-16.39h-4.796v12.533h-2.877 C33.473,53.886,32.611,53.025,32.611,53.025z M17.265,46.277h5.755v7.713h-4.796c0,0-2.647-0.459-2.877-3.856 C15.346,50.133,15.452,46.899,17.265,46.277z M21.101,20.246c-6.799,0-6.714-10.605-6.714-10.605c0-9.31,6.714-9.641,6.714-9.641 c5.997,0,6.714,9.641,6.714,9.641C27.815,19.489,21.101,20.246,21.101,20.246z M6.714,33.743C0.544,33.743,0,24.102,0,24.102 c0-8.281,6.714-9.641,6.714-9.641c6.751,0,7.673,9.641,7.673,9.641C14.387,32.77,6.714,33.743,6.714,33.743z"></path>',
			"douban": '<path d="M0,64v-5.818h20.945c0,0-4.899-9.901-8.145-11.636l8.145-3.491 c0,0,5.56,12.555,5.818,15.127h13.964c0,0,5.825-11.048,5.818-15.127l6.982,3.491c0,0-3.36,10.254-5.295,11.512 c-0.447,0.029-0.656,0.069-0.523,0.124c0.157,0.065,0.336-0.002,0.523-0.124C51.09,57.875,64,58.182,64,58.182V64H0z M5.818,40.727 v-25.6h52.364v25.6H5.818z M48.873,20.945H15.127v13.964h33.745V20.945z M3.491,0H64v5.818H3.491V0z"></path>',
			"googleplay": '<path d="M55.532,34.556c-0.828,0.473-5.547,3.122-11.786,6.618 l-8.591-8.715l9.908-9.829c5.385,3.012,9.44,5.281,10.469,5.858C58,29.871,57.958,33.17,55.532,34.556z M3.177,0.02 c0.741-0.078,1.548,0.064,2.355,0.511c1.54,0.853,23.514,13.139,37.89,21.18l-9.536,9.46L3.177,0.02z M1.36,0.75l31.244,31.694 L2.074,62.731C0.89,62.224,0,61.115,0,59.574C0,56.662,0,5.559,0,3.55C0,2.412,0.532,1.401,1.36,0.75z M42.112,42.089 C27.972,50.01,7.556,61.427,5.419,62.575c-0.32,0.172-0.655,0.291-0.993,0.367l29.446-29.212L42.112,42.089z"></path>',
			"kaixinwang": '<path d="M60.549,30.164c0,0-3.494,8.614-16.984,12.25c0,0-0.502,11.237,0,15.076c0,0,1.59,4.938-4.718,3.769c0,0-6.539-0.588-13.21-9.423c0,0-2.071-1.431-2.831,0c0,0-5.588,5.249-9.436,7.538c0,0-7.049,0.734-7.549-3.769c0,0-2.985-13.205,0.944-21.672c0,0-0.269-2.116-0.944-2.827c0,0-8.864-10.313-4.718-22.615c0,0,1.108-1.884,5.661-0.942c0,0,7.295,4.273,8.492,4.711c0,0,3.262,0.609,3.774-0.942c0,0,7.578-9.802,14.153-11.307c0,0,7.228-0.583,7.549,6.596c0,0,2.168,10.163,1.887,13.192c0,0,1.659,4.159,4.718,3.769c0,0,9.924-0.088,12.266,1.885C59.605,25.453,61.958,26.999,60.549,30.164z M13.371,27.337c0.013-2.519-1.887-2.827-1.887-2.827c-3.341,0-2.831,1.884-2.831,1.884c-0.146,2.405,2.831,2.827,2.831,2.827C13.764,28.831,13.371,27.337,13.371,27.337zM14.314,32.991c-1.477,8.602,6.605,11.307,6.605,11.307c6.04,0.515,11.323-4.711,11.323-4.711c-7.647,2.452-11.323,0.942-11.323,0.942C14.869,38.902,14.314,32.991,14.314,32.991z M36.016,18.857c0,0-3.136-1.152-5.661,0.942c0,0-0.944,0.585-0.944-0.942c0,0-3.121-5.667-7.549-1.885c0,0-6.72,5.505-2.831,13.192c0,0,1.414,3.005,6.605,0.942c0,0,0.403,2.079,1.887,3.769c0,0,4.505,3.149,7.549-3.769C35.073,31.107,38.588,24.505,36.016,18.857z M41.678,33.933c0,0-3.622-0.382-3.774,2.827c0,0-0.038,2.695,2.831,2.827c0,0,2.968-0.587,2.831-2.827C43.565,36.76,43.968,33.933,41.678,33.933zM33.186,28.28c-2.024-0.756-1.887-3.769-1.887-3.769c0.251-1.965,2.831-2.827,2.831-2.827c2.763,0.114,0.944,3.769,0.944,3.769C34.54,29.362,33.186,28.28,33.186,28.28z M23.75,25.453c-2.17-0.976,0-4.711,0-4.711c1.118-2.725,2.831-1.885,2.831-1.885c2.222,0.41,0.944,3.769,0.944,3.769C27.212,24.78,23.75,25.453,23.75,25.453z"></path>',
			"laiwang": '<path d="M58.659,31.066V36.4h-5.618v-3.138h2.809v-4.707c3.787-6.594,2.185-13.179,2.185-13.179c-4.56-14.795-19.35-10.669-19.35-10.669c-0.413-0.661-4.057-2.51-4.057-2.51C38.404,0.023,43.679,0,43.679,0C59.986,1.348,61.78,14.748,61.78,14.748C64,25.266,58.659,31.066,58.659,31.066z M52.56,29.556c0,6.135-2.082,11.777-5.565,16.263v6.759h-7.79C35.388,54.753,30.98,56,26.28,56C11.766,56,0,44.16,0,29.556C0,14.951,11.766,3.111,26.28,3.111C40.794,3.111,52.56,14.951,52.56,29.556z M26.28,8.4c-11.611,0-21.024,9.472-21.024,21.156c0,11.684,9.413,21.156,21.024,21.156c3.336,0,6.489-0.786,9.291-2.178h7.405v-6.135c2.711-3.562,4.328-8.01,4.328-12.843C47.304,17.872,37.891,8.4,26.28,8.4z M37.411,32.667c-1.708,0-3.092-1.393-3.092-3.111c0-1.718,1.384-3.111,3.092-3.111c1.708,0,3.092,1.393,3.092,3.111C40.502,31.274,39.118,32.667,37.411,32.667z M26.28,32.667c-1.708,0-3.092-1.393-3.092-3.111c0-1.718,1.384-3.111,3.092-3.111c1.708,0,3.092,1.393,3.092,3.111C29.372,31.274,27.988,32.667,26.28,32.667z M15.15,32.667c-1.708,0-3.092-1.393-3.092-3.111c0-1.718,1.384-3.111,3.092-3.111c1.707,0,3.092,1.393,3.092,3.111C18.242,31.274,16.857,32.667,15.15,32.667z"></path>',
			"logo": '<path d="M148.981,8.452H153v2.684h-5.639c0,0-1.096-0.041-1.558-1.203l-1.246-2.468h-0.592V12h8.754l-1.277,3.455h1.464v5.059c0,0-0.127,1.542-2.305,1.542h-10.686v-2.468h9.191c0,0,0.222-0.072,0.218-0.216v-1.326h-2.617l0.779-3.085h-9.346l-1.215,5.152c0,0-0.526,2.224-2.742,1.944h-2.929v-2.684h1.589c0,0,0.487-0.065,0.592-0.494l0.935-3.918h-3.116V12h8.848V7.465h-0.498l-1.246,2.468c0,0-0.75,1.304-2.835,1.265h-4.175V8.452h3.801c0,0,0.486-0.029,0.685-0.432l0.187-0.555h-4.767v-2.56h8.848V3.918h-8.941V1.141h17.945c0,0,0.244-0.049,0.311-0.37V0.278h3.489v1.635c0,0-0.22,2.005-2.96,2.005h-5.982v0.956H153v2.591h-4.86l0.28,0.679C148.42,8.144,148.619,8.452,148.981,8.452zM132.313,29.738h-2.492c-0.235-1.372-1.34-1.234-1.34-1.234c-1.608,0-1.589,2.19-1.589,2.19c0,2.719,1.62,2.468,1.62,2.468c1.174,0,1.309-1.388,1.309-1.388h2.555c-0.293,3.657-3.832,3.517-3.832,3.517c-4.466,0-4.206-4.566-4.206-4.566c0-4.45,4.112-4.35,4.112-4.35C132.348,26.375,132.313,29.738,132.313,29.738z M124.525,4.997l-1.776-2.221h-10.811l-1.807,2.53c0,0-0.314,0.339-0.748,0.339h-3.147V2.869h1.34c0,0,0.099-0.001,0.187-0.154L109.633,0h15.266l1.9,2.622c0,0,0.13,0.167,0.374,0.154h1.09v2.776h-2.96C125.304,5.553,124.86,5.553,124.525,4.997z M103.807,30.54l3.084,4.535h-3.178l-1.495-2.529l-1.495,2.529H97.67l3.115-4.473l-2.804-4.01h3.084l1.277,2.344l1.277-2.344h2.96L103.807,30.54z M101.47,22.057h-4.735v-2.56h2.679c0.391,0,0.405-0.37,0.405-0.37v-4.35H86.111l-0.81,1.018c-0.476,0.574-1.277,0.494-1.277,0.494h-2.555v-2.931h0.716c0.4,0,0.53-0.247,0.53-0.247l1.277-2.098h-1.651V0.185h20.873v8.823c-0.05,2.132-2.118,2.098-2.118,2.098H88.074l-0.592,0.987h15.92v8.113C103.264,22.144,101.47,22.057,101.47,22.057z M99.258,2.961H85.924v1.45h13.334V2.961z M99.134,8.545c0,0,0.214-0.097,0.218-0.278V7.003H85.924v1.542H99.134z M84.18,18.91l2.337-3.177h4.268l-4.33,5.614c0,0-0.724,0.62-1.62,0.524h-3.458v-2.56h2.305C83.681,19.311,83.961,19.247,84.18,18.91z M87.388,28.751h-4.33v1.049h3.925v2.036h-3.925v1.08h4.455v2.159h-7.01v-8.483h6.885V28.751z M70.627,35.815l-1.776-3.085l1.807-3.054h3.552l1.807,3.085l-1.776,3.054H70.627z M17.197,17.954l1.807-3.054h3.552l1.807,3.085l-1.807,3.054h-3.583L17.197,17.954z M44.8,35.815l-5.016-8.637l3.614-6.108l5.016,8.576h13.677l6.761-11.661L62.06,6.324H48.414l-17.229,29.46l-20.78,0.062L0,17.923L10.375,0.154l20.811-0.031l5.016,8.637L32.619,14.9l-5.047-8.607H13.957L7.103,17.985l6.854,11.661h13.646l17.26-29.491h20.78l10.374,17.83l-10.406,17.83H44.8z M92.28,21.964h-3.521v-2.56h1.433c0.436,0.002,0.654-0.339,0.654-0.339l2.555-3.116h4.362l-4.299,5.553C93.035,21.922,92.28,21.964,92.28,21.964zM92.872,26.375c4.353,0,4.268,4.411,4.268,4.411c0,1.971-0.966,3.023-0.966,3.023l0.997,1.018L95.987,36l-1.122-1.172c-0.421,0.386-1.776,0.463-1.776,0.463c-4.572,0.019-4.393-4.473-4.393-4.473C88.83,26.208,92.872,26.375,92.872,26.375zM92.934,33.162c0,0,0.237-0.016,0.312-0.062l-0.717-0.71l1.184-1.141l0.685,0.709c0,0,0.187-0.29,0.187-1.08c0,0,0.181-2.375-1.682-2.375c0,0-1.651-0.176-1.651,2.406C91.252,30.91,91.207,33.162,92.934,33.162z M110.007,35.074h-2.555v-8.483h2.555V35.074z M111.222,26.591h2.555v5.306c0,1.379,1.34,1.265,1.34,1.265c1.259,0,1.309-1.296,1.309-1.296v-5.275h2.555v5.491c0,3.456-3.77,3.208-3.77,3.208c-4.308,0-3.988-3.27-3.988-3.27V26.591z M128.17,19.28v2.776h-21.746v-2.746h2.15V7.095h3.209V19.28h3.676V4.689h3.583V8.73h8.941v2.961h-8.941v7.589H128.17z M123.06,35.074h-2.43V32.73h2.43V35.074z M137.672,26.375c4.254,0,4.237,4.38,4.237,4.38c0,4.688-4.175,4.535-4.175,4.535c-4.524,0-4.268-4.658-4.268-4.658C133.699,26.191,137.672,26.375,137.672,26.375z M136.021,30.848c0,2.339,1.651,2.314,1.651,2.314c1.762,0,1.682-2.345,1.682-2.345c0.002-2.392-1.651-2.344-1.651-2.344C135.947,28.473,136.021,30.848,136.021,30.848z M148.109,31.589l1.215-4.997h3.645v8.483h-2.43v-5.553l-1.464,5.553h-1.932l-1.464-5.46v5.46h-2.43v-8.483h3.645L148.109,31.589z"></path>',
			"logo2": '<path d="M23.103,24l2.397-4.216h4.795l2.397,4.108l-2.397,4.216H25.5L23.103,24z M60.154,48l-6.756-11.568l4.795-8.216l6.756,11.46h18.308L92.41,24L83.256,8.324H64.949L41.846,48H13.949L0,24L13.949,0h27.897l6.756,11.568l-4.795,8.216l-6.756-11.46H18.744L9.59,24l9.154,15.676h18.308L60.154,0h27.897L102,24L88.051,48H60.154zM99.494,39.676L102,43.784L99.603,48h-4.904l-2.397-4.216l2.397-4.108H99.494z"></path>',
			"code": '<path d="M64,64h-7V50h7V64z M50,50v-7h7v7H50z M43,50h-7V36h14v7h-7V50zM64,36v7h-7v-7H64z M36,0h28v28H36V0z M40,24h20V4H40V24z M43,7h14v14H43V7z M0,36h28v28H0V36z M4,40v20h20V40H4z M7,43h14v14H7V43z M0,0h28v28H0V0z M4,24h20V4H4V24z M7,7h14v14H7V7z M50,57v7H36v-7H50z"></path>',
			"computer": '<path d="M61,44H38.676l6.199,8.769c0,0,1.125,1.64,0,3.231h-9.289h-6.697h-9.733c-1.156-1.591,0-3.231,0-3.231L25.527,44H3c-1.657,0-3-1.343-3-3V3c0-1.657,1.343-3,3-3h58c1.657,0,3,1.343,3,3v38C64,42.657,62.657,44,61,44z M32,42c1.105,0,2-0.895,2-2s-0.895-2-2-2c-1.105,0-2,0.895-2,2S30.895,42,32,42z M60,5H4v31h56V5z"></path>',
			"dengpao": '<path d="M40,44.969V52c0,3.314-2.686,6-6,6h-1v3.5c0,1.381-1.119,2.5-2.5,2.5h-11c-1.381,0-2.5-1.119-2.5-2.5V58h-1c-3.314,0-6-2.686-6-6v-7.041C3.936,40.403,0,33.171,0,25C0,11.193,11.193,0,25,0s25,11.193,25,25C50,33.173,46.068,40.413,40,44.969z M25,7C15.059,7,7,15.059,7,25c0,0.585,0.033,1.162,0.088,1.733c0.02,0.206,0.056,0.407,0.082,0.611c0.047,0.357,0.095,0.714,0.162,1.064c0.048,0.251,0.11,0.496,0.168,0.743c0.069,0.29,0.139,0.58,0.222,0.864c0.079,0.273,0.168,0.542,0.26,0.809c0.083,0.242,0.17,0.482,0.263,0.719c0.113,0.29,0.232,0.575,0.359,0.858c0.089,0.195,0.183,0.386,0.278,0.577c0.152,0.307,0.307,0.611,0.475,0.907c0.078,0.137,0.163,0.268,0.244,0.402c0.202,0.334,0.406,0.667,0.629,0.987c0.006,0.009,0.014,0.018,0.02,0.027c1.674,2.393,3.914,4.354,6.527,5.699C16.3,41.532,16,42.228,16,43v6c0,1.657,1.343,3,3,3h12c1.657,0,3-1.343,3-3v-6c0-0.772-0.3-1.468-0.778-2c2.998-1.544,5.497-3.904,7.222-6.788c0.062-0.103,0.127-0.203,0.186-0.306c0.177-0.31,0.34-0.629,0.499-0.951c0.09-0.181,0.179-0.361,0.262-0.545c0.13-0.286,0.251-0.577,0.366-0.871c0.093-0.236,0.179-0.474,0.261-0.715c0.091-0.267,0.18-0.535,0.259-0.808c0.084-0.287,0.154-0.578,0.224-0.871c0.058-0.245,0.119-0.487,0.167-0.736c0.068-0.353,0.117-0.712,0.164-1.072c0.026-0.202,0.062-0.401,0.081-0.605C42.967,26.163,43,25.586,43,25C43,15.059,34.941,7,25,7z M28.5,48h-7c-1.381,0-2.5-1.119-2.5-2.5v-1c0-1.381,1.119-2.5,2.5-2.5h7c1.381,0,2.5,1.119,2.5,2.5v1C31,46.881,29.881,48,28.5,48z"></path>',
			"normaluser": '<path d="M31.5,64C59.433,56.326,63,32.541,63,24.694C63,16.846,60.61,8.58,54.309,0C49.566,1.885,39.207,2.721,31.5,0C23.794,2.721,13.434,1.885,8.692,0C2.39,8.58,0,16.846,0,24.694C0,32.541,3.568,56.326,31.5,64z"></path>',
			"pengyou": '<path d="M52.671,41.29c0,0,3.271,9.101-5.532,11.011c0,0-7.661,1.98-11.065-11.011c0,0-3.688-10.606-3.688-12.846c0,0,11.041-2.228,18.442-1.835c0,0,11.116,0.842,11.065,9.175C61.892,35.785,62.397,43.503,52.671,41.29z M52.671,22.939c-5.253,0.729-21.208,3.67-21.208,3.67V7.34C31.264,1.286,39.762,0,39.762,0c7.386,0.19,6.455,7.34,6.455,7.34c10.325-4.012,11.065,7.34,11.065,7.34C57.501,18.724,52.671,22.939,52.671,22.939z M7.488,28.444c0,0-8.17-0.479-7.377-8.258c0,0-1.714-6.644,8.299-6.423c0,0-3.114-11.531,11.065-11.011c0,0,6.523-0.627,8.299,7.34c0,0,3.449,12.205,2.766,16.516C30.541,26.609,18.663,27.596,7.488,28.444z M31.463,28.444c-0.872,4.484,1.844,12.846,1.844,12.846c3.235,6.336,0.922,11.011,0.922,11.011c-2.931,8.699-11.987,7.34-11.987,7.34c-6.323-1.717-6.455-8.258-6.455-8.258c-5.134-0.13-7.377-1.835-7.377-1.835c-5.279-1.891-2.766-11.011-2.766-11.011C14.528,26.962,31.463,28.444,31.463,28.444z"></path>',
			"qq": '<path d="M173.94,152.517c0,0-7.239,0.531-15.89-15.949c0,0-7.897,20.246-13.904,24.921c0,0,15.89,5.883,15.89,17.943c0,0-2.979,19.937-36.746,19.937c0,0-22.406,0.632-30.787-13.956h-2.979v-0.309l-2.979,0.309C78.162,200,55.756,199.368,55.756,199.368c-33.767,0-36.746-19.937-36.746-19.937c0-12.06,15.89-17.943,15.89-17.943c-6.007-4.675-13.904-24.921-13.904-24.921c-8.651,16.48-15.89,15.949-15.89,15.949c-17.583-29.635,15.89-60.807,15.89-60.807c-5.712-18.322,5.959-26.915,5.959-26.915C29.54,0.66,89.523,0,89.523,0s59.983,0.66,62.568,64.795c0,0,11.671,8.593,5.959,26.915C158.05,91.709,191.523,122.882,173.94,152.517z"></path>',
			"qqliulanqi": '<path d="M64,55.332c0,4.57-3.122,8.311-7.081,8.642V64H31.793c-0.02,0-0.039-0.007-0.059-0.007C14.184,63.849,0,49.584,0,32C0,14.327,14.327,0,32,0s32,14.327,32,32c0,5.69-1.492,11.029-4.096,15.66C62.338,49.11,64,51.999,64,55.332z M32,14.222c-9.818,0-17.778,7.959-17.778,17.778c0,7.131,4.208,13.262,10.268,16.092c1.219-2.013,3.562-3.394,6.287-3.394c0.893,0,1.743,0.156,2.533,0.424c1.731-5.002,6.017-8.551,11.047-8.551c1.599,0,3.12,0.368,4.512,1.017c0.583-1.759,0.91-3.634,0.91-5.588C49.778,22.182,41.818,14.222,32,14.222z"></path>',
			"qqweibo": '<path d="M60.847,26.088c-8.08-2.418-13.422-13.494-13.422-13.494c-2.424,0-2.684-2.699-2.684-2.699c0-3.708,2.684-3.598,2.684-3.598c3.337,0,3.579,3.598,3.579,3.598c0.013,1.683-1.79,2.699-1.79,2.699c2.627,8.909,12.527,11.695,12.527,11.695C64,25.295,60.847,26.088,60.847,26.088z M54.583,16.192c0,0-1.339,0.621-0.895-0.9c0,0,1.906-1.828,1.79-5.398c0,0-0.266-8.096-8.053-8.096c0,0-7.158,0.059-7.158,8.096c0,0,0.001,8.096,7.158,8.096c0,0,1.785,1.974,0,1.799c0,0-8.948-0.952-8.948-9.895c0,0,0.135-9.895,9.843-9.895c0,0,8.948,1.557,8.948,9.895C57.267,9.895,56.836,14.713,54.583,16.192z M17.001,38.682h-3.579c0,0-2.586-0.992-0.895-2.699c0,0,17.896,2.971,17.896-14.393c0,0-0.252-13.494-13.422-13.494c0,0-14.317,1.116-14.317,14.393c0,0,0.037,4.655,1.79,6.297c0,0,0.568,3.071-1.79,0.9c0,0-2.521-3.105-2.684-7.197c0,0,1.061-17.092,17.001-17.092c0,0,16.107,0.699,16.107,16.193C33.108,21.59,32.527,38.682,17.001,38.682z M12.527,24.289c0,0-1.74-4.156,1.79-7.197c0,0,5.442-2.025,8.053,2.699c0,0,1.083,4.133-1.79,6.297c0,0-3.242,1.586-6.264,0c0,0-9.393,9.066-8.948,17.992c0.029,0.574,0,10.795,0,10.795S4.337,58,1.79,55.774V44.08C1.79,44.08,4.022,30.876,12.527,24.289z"></path>',
			"qqzone": '<path d="M49.096,31.429L51.726,55L32.438,43.651L13.151,55l1.753-22.698L0,19.206h21.918L32.438,0l11.397,19.206H64L49.096,31.429z M47.342,21.825H21.041l15.781,2.619L17.534,41.032h29.808L29.808,37.54L47.342,21.825z"></path>',
			"renren": '<path d="M26.667,0h12c0,0-5.9,40.406,25.333,51.726L58,63c0,0-20.229-14.581-24-29.179c0,0-12.018,22.795-27.333,28.516L0,54.379C0,54.379,31.489,46.61,26.667,0z"></path>',
			"sendcompany": '<path d="M56,37L32,13L8,37H0v-6L31,0h2l31,31v6H56z M53,38v26H39V43H25v21H11V38l21-21L53,38z"></path>',
			"scenegift": '<path d="M34.133,63.954V25.581H64v38.372H34.133z M0,12.791h14.821C8.033,11.603,8,4.996,8,4.996C8.056,0.071,13,0,13,0c9.28-0.03,15.986,11.202,16.888,12.791h4.237C35.125,11.201,42.504-0.046,51,0c0,0,5.046,0.083,5,4.996c0,0,0.061,6.606-6.823,7.794H64v8.527H0V12.791z M53,5.996c0.062-1.888-2-1.999-2-1.999c-8.038-0.049-13,8.993-13,8.993C50.389,13.03,53,5.996,53,5.996z M13,3.997c0,0-1.983,0.024-2,1.999s2.81,6.995,15,6.995C26,12.991,20.979,3.981,13,3.997z M29.867,63.954H0V25.581h29.867V63.954z"></path>',
			"scenesend": '<path d="M0,24.889L64,0L46.222,64L24.889,46.222l24.889-32l-32,24.889L0,24.889z M10.667,39.111l14.222,10.667L14.222,60.444L10.667,39.111z"></path>',
			"taobao": '<path d="M48.988,48.946c-4.903,0-7.901-1.579-7.901-1.579l0.79-3.947l7.111,0.789c6.122,0,6.321-5.526,6.321-5.526V14.21c0-7.378-7.901-7.895-7.901-7.895c-6.463,0-15.012,3.158-15.012,3.158l3.16,1.579c0.142,1.015-3.16,4.737-3.16,4.737h20.543v3.947H41.086v3.947h11.852v3.947H41.086v9.473l4.741-2.368l-0.79-3.947l4.741-1.579l3.951,10.263l-5.531,2.368l-1.58-3.947c-5.47,3.996-14.222,4.737-14.222,4.737h-7.111c-4.661,0-5.531-5.526-5.531-5.526v-7.105h7.111v3.158c-0.14,5.157,7.111,4.737,7.111,4.737V27.631H21.333v-3.947h12.642v-3.947h-5.531c-0.316,2.196-3.951,3.158-3.951,3.158s-2.819-0.519-3.16-1.579c2.749-1.888,6.321-9.473,6.321-9.473c-4.473,0.22-8.691,6.316-8.691,6.316l-4.741-3.947C19.296,12.449,22.914,0,22.914,0l7.111,1.579c0.106,1.229-1.58,4.737-1.58,4.737c11.708-3.875,23.704-3.158,23.704-3.158C63.475,4.407,64,15,64,15v21.315C64,49,48.988,48.946,48.988,48.946z M11.062,10.263c-5.479,0-5.531-4.737-5.531-4.737c0-5.404,5.531-4.737,5.531-4.737c5.138,0,5.531,4.737,5.531,4.737C16.593,10.074,11.062,10.263,11.062,10.263z M2.37,18.157l3.951-5.526c11.83,10.053,11.062,12.631,11.062,12.631c-0.264,5.059-9.482,22.105-9.482,22.105L0,41.841L11.852,29.21c1.392-1.303,0-3.947,0-3.947C11.562,22.982,2.37,18.157,2.37,18.157z"></path>',
			"tieba": '<path d="M64,28.804v33.072H36.267c0,0-0.933,0.052-1.067-2.134V32.005c0,0-1.165-3.201,5.333-3.201V1.067h6.4v4.267H64v6.401H46.933v17.069H64z M42.667,36.272v19.203h13.867V36.272H42.667z M14.933,55.475c0,0-4.911,5.24-12.8,6.401l-1.067-4.267c0,0,8.079-3.243,9.6-7.468V13.869c0,0,0.682-2.067,4.267-2.134c0,0,3.289,0.126,3.2,2.134V46.94c0,0,0.469,6.066,11.733,10.668L28.8,62.943C28.8,62.943,22.857,64,14.933,55.475z M23.467,9.601c0,0,0.113-3.437-8.533-3.201c0,0-8.533,0.099-8.533,3.201V46.94H0V0h29.867v46.94h-6.4V9.601z"></path>',
			"time": '<path d="M57.094,17.342L39.191,4.248c3.421-4.74,10.201-5.651,15.145-2.035C59.28,5.829,60.514,12.602,57.094,17.342z M56.896,34.986c0.016,15.224-12.23,27.578-27.352,27.594C14.421,62.597,2.149,50.268,2.133,35.044C2.117,19.821,14.363,7.466,29.485,7.45C44.608,7.434,56.88,19.762,56.896,34.986z M29.492,14.27c-10.206,0.011-18.663,7.491-20.294,17.297H8.966v6.895h0.231c1.633,9.824,10.118,17.308,20.339,17.297C39.742,55.75,48.2,48.269,49.83,38.463h0.232v-6.895h-0.23C48.199,21.743,39.713,14.26,29.492,14.27z M14.103,38.463v-6.895H26.09V16.915h6.849v14.653v6.895H26.09H14.103z M4.692,2.213c4.944-3.616,11.724-2.705,15.145,2.035L1.935,17.342C-1.486,12.602-0.251,5.829,4.692,2.213z"></path>',
			"uc": '<path d="M53.093,32.265c-7.527-5.77-19.034-7.054-19.034-7.054c5.833-1.908,12.021-7.054,12.021-7.054c-0.333-6.053,2.003-8.061,2.003-8.061c1.492,1.376,3.005,6.046,3.005,6.046C64,21.39,61.107,32.265,61.107,32.265H53.093z M26.046,26.219c0,0-16.028,6.346-16.028,20.153c0,0,0.893,11.278,8.172,13.661C12.446,58.893,0,55.07,0,43.35c0-15.233,13.134-18.434,14.025-27.207c0,0-1.021-8.061-7.012-8.061c0,0-4.643,0.683-6.01,2.015c0,0,5.962-10.617,18.032-10.077c0,0,12.937,0.063,14.025,11.084C33.058,11.104,34.791,19.555,26.046,26.219z M18.189,60.034c1.721,0.342,2.848,0.446,2.848,0.446C19.991,60.48,19.048,60.315,18.189,60.034z M16.028,48.388c0,0,0.948-8.061,8.014-8.061c0,0,9.016,0.132,9.016,8.061c0,0-0.119,9.069-8.014,9.069C25.044,57.457,16.028,58.129,16.028,48.388z M20.035,48.388c0,4.649,4.007,5.038,4.007,5.038c4.47,0,5.009-4.031,5.009-4.031c0-4.625-5.009-5.038-5.009-5.038C19.821,44.233,20.035,48.388,20.035,48.388z M37.065,48.388c0,0-0.189-12.092-11.019-12.092c0,0-4.6-1.381-11.019,3.023c0,0,3.518-7.19,12.021-7.054c0,0,15.761,0.647,16.028,17.13c0,0-0.817,6.053-3.005,7.054c0,0,7.737-1.618,10.018,4.031H28.049C28.049,60.48,36.582,59.201,37.065,48.388z M46.081,41.334c0,0-4.805-11.215-21.037-12.092c0,0,8.813-2.856,17.03,1.008l8.014,5.038c0,0,1.677,0.997,5.009,1.008c0,0,6.234,0.472,7.012,4.031c0,0-5.923-1.36-8.014,0C54.095,40.327,50.536,44.644,46.081,41.334z"></path>',
			"voice": '<path d="M38.246,32.653c0,9.68-7.396,17.645-16.902,18.686v8.482h8.451V64H8.667v-4.18h8.451v-8.482C7.612,50.298,0.216,42.333,0.216,32.653c0-1.815-0.485-2.548,0-4.209h4.111c-0.629,1.624,0.114,2.365,0.114,4.209c0,8.079,6.621,14.629,14.79,14.629S34.02,40.732,34.02,32.653c0-1.843,0.743-2.584,0.114-4.209h4.111C38.731,30.105,38.246,30.838,38.246,32.653z M19.231,42.667h-1.028c-5.393,0-9.764-4.321-9.764-9.651V9.651C8.438,4.321,12.81,0,18.203,0h1.028c5.393,0,9.764,4.321,9.764,9.651v23.365C28.995,38.346,24.623,42.667,19.231,42.667z"></path>',
			"wechat": '<path d="M171.484,138.214l6.938,21.872l-26.761-14.913c-72.415-0.249-66.407-49.709-66.407-49.709c0-28.146,34.69-40.761,34.69-40.761c75.009-16.33,78.301,42.749,78.301,42.749C198.245,125.746,171.484,138.214,171.484,138.214z M122.245,78.086c-4.418,0-8,3.582-8,8c0,4.418,3.582,8,8,8c4.418,0,8-3.582,8-8C130.245,81.667,126.663,78.086,122.245,78.086z M165.245,78.086c-4.418,0-8,3.582-8,8c0,4.418,3.582,8,8,8c4.418,0,8-3.582,8-8C173.245,81.667,169.663,78.086,165.245,78.086z M90.209,69.616c-17.464,24.322-4.956,47.72-4.956,47.72c-2.767,2.24-7.929,1.988-7.929,1.988H61.466l-36.673,16.901l8.92-25.849C-1.755,92.678,0.015,60.668,0.015,60.668v-2.982C6.983-1.914,70.386,0.024,70.386,0.024c30.227-0.665,46.584,12.924,46.584,12.924c19.951,11.217,24.779,32.808,24.779,32.808C107.066,46.955,90.209,69.616,90.209,69.616z M41.245,30.086c-6.075,0-11,4.925-11,11s4.925,11,11,11s11-4.925,11-11S47.32,30.086,41.245,30.086z M108.245,41.086c0-6.075-4.925-11-11-11c-6.075,0-11,4.925-11,11s4.925,11,11,11C103.32,52.086,108.245,47.161,108.245,41.086z"></path>',
			"weibo": '<path d="M199.389,65.394c0,0-0.493,9.988-10.011,9.988c0,0-10.252-1.807-7.007-11.985c0,0,11.965-41.924-36.038-47.942c0,0-17.018,5.194-17.018-6.991c0,0,1.506-7.99,8.008-7.99C137.322,0.473,204.096-9.8,199.389,65.394z M143.329,40.425c0,0-8.008,1.063-8.008-6.992c0,0,2.411-5.993,7.007-5.993c0,0,34.003-5.033,30.032,32.96c0,0-1.923,5.993-6.006,5.993c0,0-8.008,0.682-8.008-7.99C158.345,58.403,162.869,40.425,143.329,40.425z M133.318,45.419c0,0,17.018,0.911,17.018,16.979c0,0,0.245,9.102-4.004,12.984c0,0,29.031,6.811,29.031,28.965c0,0-0.251,56.931-91.097,56.931c0,0-84.09,0.922-84.09-52.936c0,0-4.081-25.111,27.029-54.933c31.109-29.822,48.801-30.962,57.061-30.962c0,0,16.017-0.976,16.017,15.98c0,0-0.412,11.219-3.003,14.982C97.28,53.409,116.344,45.419,133.318,45.419z M78.259,71.387c0,0-49.884,3.469-58.062,42.948c0,0-0.603,30.22,52.055,34.958c0,0,54.006,2.183,66.07-36.955C138.324,112.337,151.405,74.021,78.259,71.387z M73.12,142.2c-26.866-0.565-28.931-22.871-28.931-22.871c-1.094-30.22,32.921-32.815,32.921-32.815c31.985-0.314,30.926,25.854,30.926,25.854C106.16,142.199,73.12,142.2,73.12,142.2z M67.135,110.379c0,0-11.971,1.423-11.971,9.944c0,0-1.051,8.95,9.976,8.95c0,0,10.974-1.898,10.974-9.944C76.113,119.328,77.207,110.379,67.135,110.379z M83.097,106.401c0,0-3.99-0.664-3.99,2.983c0,0-0.929,2.983,2.993,2.983c0,0,3.99-0.785,3.99-3.978C86.089,108.39,85.751,106.401,83.097,106.401z"></path>',
			"yixin": '<path d="M45.364,58.38c4.124,2.52,10.259,2.797,10.259,2.797C44.551,65,36.341,63.943,30.867,61.901C13.807,61.829,0,48.002,0,30.952C0,13.858,13.879,0,31,0s31,13.858,31,30.952C62,42.869,55.251,53.207,45.364,58.38z M31,14.977c-8.837,0-16,7.153-16,15.975c0,5.364,2.656,10.098,6.718,12.996c-3.185,4.404-11.86,5.579-11.86,5.579c19.676,4.767,29.433-4.088,31.788-6.672C44.924,39.93,47,35.688,47,30.952C47,22.129,39.837,14.977,31,14.977z"></path>',
			"zhifubao": '<path d="M63.021,50L36.949,36.957c-10.737,11.987-22.813,10.87-22.813,10.87c-15.115,0-14.122-11.957-14.122-11.957C-0.088,22.841,15.222,25,15.222,25c8.559,0.109,18.468,3.261,18.468,3.261c3.55-4.164,4.345-9.783,4.345-9.783H10.877v-2.174h13.036V10.87H7.618V8.696h16.295V0h8.691v8.696h16.295v2.174H32.604v5.435h14.122c0.153,3.882-5.432,15.217-5.432,15.217l21.727,6.522V50z M14.136,28.261c0,0-11.95-2.295-11.95,7.609c0,0-1.54,7.609,10.863,7.609c0,0,11.464,0.271,17.381-9.783C30.431,33.696,23.002,28.261,14.136,28.261z"></path>'
		},
		boundingBox: function (a) {
			var b, c = a.parentNode,
				d = document.createElementNS(eqxiuSvg.NAMESPACE, "svg");
			return d.setAttribute("width", "0"), d.setAttribute("height", "0"), d.setAttribute("style", "visibility: hidden; position: absolute; left: 0; top: 0;"), d.appendChild(a), document.body.appendChild(d), b = a.getBBox(), c ? c.appendChild(a) : d.removeChild(a), document.body.removeChild(d), b
		},
		pointsToPolygon: function (a) {
			for (var b = []; a.length >= 2;) b.push(a.shift() + "," + a.shift());
			return b.join(" ")
		},
		symbol: function (a, b, c) {
			var d = c ? c : "#555",
				e = eqxiuSvg.SYMBOLS[a],
				f = '<g fill="' + d + '" id="path_' + b + '">' + e + "</g>";
			return f
		},
		ShapeFromType: function (a, b, c, d, e) {
			return b || (b = 64), c || (c = 64), /symbols\-/.test(a) ? eqxiuSvg.symbol(a.replace(/^symbols\-/, ""), d, e) : "rect" == a ? eqxiuSvg.rect(b, c) : "circle" == a ? eqxiuSvg.ellipse(b, c) : "diamond" == a ? eqxiuSvg.polygon(b, c, 4) : "octagon" == a ? eqxiuSvg.polygon(b, c, 8) : "triangle-up" == a ? eqxiuSvg.triangleUp(b, c) : "triangle-down" == a ? eqxiuSvg.triangleDown(b, c) : "triangle-left" == a ? eqxiuSvg.triangleLeft(b, c) : "triangle-right" == a ? eqxiuSvg.triangleRight(b, c) : "arrow-up" == a ? eqxiuSvg.arrowUp(b, c) : "arrow-down" == a ? eqxiuSvg.arrowDown(b, c) : "arrow-left" == a ? eqxiuSvg.arrowLeft(b, c) : "arrow-right" == a ? eqxiuSvg.arrowRight(b, c) : void 0
		},
		rect: function (a, b) {
			var c = document.createElementNS(eqxiuSvg.NAMESPACE, "rect");
			return c.setAttribute("width", a), c.setAttribute("height", b), c
		},
		ellipse: function (a, b) {
			var c = document.createElementNS(eqxiuSvg.NAMESPACE, "ellipse");
			return c.setAttribute("rx", a / 2), c.setAttribute("ry", b / 2), c.setAttribute("cx", a / 2), c.setAttribute("cy", b / 2), c
		},
		triangleUp: function (a, b) {
			var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
			return c.setAttribute("points", eqxiuSvg.pointsToPolygon([a / 2, 0, a, b, 0, b])), c
		},
		triangleDown: function (a, b) {
			var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
			return c.setAttribute("points", eqxiuSvg.pointsToPolygon([0, 0, a, 0, a / 2, b])), c
		},
		triangleLeft: function (a, b) {
			var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
			return c.setAttribute("points", eqxiuSvg.pointsToPolygon([0, b / 2, a, 0, a, b])), c
		},
		triangleRight: function (a, b) {
			var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
			return c.setAttribute("points", eqxiuSvg.pointsToPolygon([a, b / 2, 0, b, 0, 0])), c
		},
		arrowUp: function (a, b) {
			var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
			return c.setAttribute("points", eqxiuSvg.pointsToPolygon([.5 * a, 0, a, .5 * b, .7 * a, .5 * b, .7 * a, b, .3 * a, b, .3 * a, .5 * b, 0, .5 * b, .5 * a, 0])), c
		},
		arrowDown: function (a, b) {
			var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
			return c.setAttribute("points", eqxiuSvg.pointsToPolygon([.5 * a, b, a, .5 * b, .7 * a, .5 * b, .7 * a, 0, .3 * a, 0, .3 * a, .5 * b, 0, .5 * b, .5 * a, b])), c
		},
		arrowLeft: function (a, b) {
			var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
			return c.setAttribute("points", eqxiuSvg.pointsToPolygon([a, .3 * b, .5 * a, .3 * b, .5 * a, 0, 0, .5 * b, .5 * a, b, .5 * a, .7 * b, a, .7 * b, a, .3 * b])), c
		},
		arrowRight: function (a, b) {
			var c = document.createElementNS(eqxiuSvg.NAMESPACE, "polygon");
			return c.setAttribute("points", eqxiuSvg.pointsToPolygon([0, .3 * b, .5 * a, .3 * b, .5 * a, 0, a, .5 * b, .5 * a, b, .5 * a, .7 * b, 0, .7 * b])), c
		},
		polygon: function (a, b, c) {
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
}(), function (a, b) {
	function c(a) {
		function b(a, b, c) {
			return a[b] || (a[b] = c())
		}

		var c = b(a, "eqShow", Object);
		return b(c, "templateParser", function () {
			var a = {};
			return function (c, d) {
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
}(window, document), function (a) {
	function b(a, b, c, d) {
		var e = {},
			f = a / b,
			g = c / d;
		return f > g ? (e.width = c, e.height = c / f) : (e.height = d, e.width = d * f), e
	}

	function c(a, b) {
		"view" == i.mode && b.properties.url && $(a).bind(mobilecheck() ? "touchstart" : "click", function (a) {
			var c = b.properties.url;
			isNaN(c) ? window.open(c) : eqxiu.pageScroll(c)
		})
	}

	function d(a) {
		$(a).bind("touchstart mousedown", function (a) {
			a.stopPropagation()
		})
	}

	function e(a) {
		a.focus(function (a) {
			eqxiu.pauseAutoFlip()
		}).blur(function (a) {
			$(document).trigger("startAutoFlip")
		})
	}

	function f(a) {
		for (var b = $(a).find("a[data]"), c = 0; c < b.length; c++) {
			if (b[c] && "view" == i.mode) {
				$(b[c]).css("cursor", "pointer");
				var d = $(b[c]).attr("data");
				!
					function (a) {
						b[c].removeAttribute("href");
						$(b[c]).bind(mobilecheck() ? "touchstart" : "click", function (b) {
							eqxiu.pageScroll(a)
						})
					}(d)
			}
		}
	}

	function g(a, b) {
		if (b.trigger) {
			var c = $(a);
			j && clearTimeout(j), b.trigger.sends && b.trigger.sends.length && $.each(b.trigger.sends, function (a, b) {
				var triggerType = utilTrigger.getSendType(b.type).name;
				if(triggerType == "click"){
					triggerType = mobilecheck() ? "touchstart" : "click";//手机端touch\pc端click
				}
				c.bind(triggerType, function () {
					j = setTimeout(function () {
						$.each(b.handles, function (a, b) {
							var c = utilTrigger.getHandleType(b.type).name;
							$.each(b.ids, function (a, b) {
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
			0 == b.sound.src.indexOf("http://") ? b.sound.src = b.sound.src : b.sound.src = PREFIX_FILE_HOST + b.sound.src;
			utilSound.addAudio(a, b.sound.src);

			c.click(function () {
				console.log(333)
				document.getElementById('pageMusic').pause();
				utilSound.play(a, function () {
					d && d.play()
				}, function () {
					d && d.pause()
				})
			})
		}
	}

	var i = a.templateParser("jsonParser", function () {
		function a(a) {
			return function (b, c) {
				a[b] = c
			}
		}

		function b(a, b) {
			try {
				var c = l[("" + a.type).charAt(0)](a)
			} catch (d) {
				return
			}
			//判断移动端&&修改大小--零件
			if(PCcheck()){
				for(var key in a.properties.imgStyle){
					if(typeof(a.properties.imgStyle[key]) == "number"){
						a.properties.imgStyle[key] = Math.round(a.properties.imgStyle[key] *(checkHeight()));
					};
					if(typeof(a.properties.imgStyle[key]) == "string"){
						a.properties.imgStyle[key] = "-"+
													  Math.round(Number(a.properties.imgStyle[key].slice(1,-2))*(checkHeight()))
														+"px";
					};
							
				}
			}
			if (c) {
				var e = $('<li comp-drag comp-rotate class="comp-resize comp-rotate inside" id="inside_' + a.id + '" num="' + a.num + '" ctype="' + a.type + '"></li>');
				
					3 != ("" + a.type).charAt(0) && 1 != ("" + a.type).charAt(0) && e.attr("comp-resize", ""), 
					"p" == ("" + a.type).charAt(0) && e.removeAttr("comp-rotate"), 
					1 == ("" + a.type).charAt(0) && e.removeAttr("comp-drag"), 
					2 == ("" + a.type).charAt(0) && e.addClass("wsite-text"), 
					"x" == ("" + a.type).charAt(0) && e.addClass("show-text").css("color", a.css.color), 
					4 == ("" + a.type).charAt(0) && (a.properties.imgStyle && $(c).css(a.properties.imgStyle), e.addClass("wsite-image")), 
					"n" == ("" + a.type).charAt(0) && e.addClass("wsite-image"), 
					"h" == ("" + a.type).charAt(0) && e.addClass("wsite-shape"), 
					5 == ("" + a.type).charAt(0) && e.addClass("wsite-input"), 
					6 == ("" + a.type).charAt(0) && e.addClass("wsite-button"), 
					8 == ("" + a.type).charAt(0) && e.addClass("wsite-button"), 
					"v" == ("" + a.type).charAt(0) && e.addClass("wsite-video"), 
					e.mouseenter(function () {
						$(this).addClass("inside-hover")
					}), e.mouseleave(function () {
						$(this).removeClass("inside-hover")
					});
				//if ("edit" == i.mode || "x" != ("" + a.type).charAt(0)) {
					var f = $('<div class="element-box">').append($('<div class="element-box-contents">').append(c));
					e.append(f);
					5 != ("" + a.type).charAt(0) && 6 != ("" + a.type).charAt(0) && "r" != a.type && "c" != a.type && "a" != a.type && "8" != a.type && "l" != a.type && "s" != a.type && "i" != a.type && "h" != a.type || "edit" != b || $(c).before($('<div class="element" style="position: absolute; height: 100%; width: 100%;z-index: 1;">'))
				//}
				//判断移动端&&修改大小
				if(PCcheck()){
					if (a.css) {
						//debugger;
						var g = ((checkHeight() * 320)) - parseInt(a.css.left);
						e.css({
							width: g
						}), e.css({
							width: Math.ceil(parseInt(a.css.width)*(checkHeight())),
							height: Math.ceil(parseInt(a.css.height)*(checkHeight())),
							left: Math.ceil(parseInt(a.css.left)*(checkHeight())),
							top: Math.ceil(parseInt(a.css.top)*(checkHeight())),
							zIndex: a.css.zIndex,
							bottom: Math.ceil(parseInt(a.css.bottom)*(checkHeight())),
							transform: a.css.transform
						});
						(0 === a.css.boxShadowSize || "0" == a.css.boxShadowSize) && (a.css.boxShadow = "rgba(0,0,0,0) 0 0 0");

						if ("edit" != i.mode && "x" == ("" + a.type).charAt(0)) {
							e.append(f);
							e.find(".element-box").css({
								borderStyle: a.css.borderStyle,
								borderWidth: a.css.borderWidth,
								borderColor: a.css.borderColor,
								borderTopLeftRadius: a.css.borderTopLeftRadius,
								borderTopRightRadius: a.css.borderTopRightRadius,
								borderBottomRightRadius: a.css.borderBottomRightRadius,
								borderBottomLeftRadius: a.css.borderBottomLeftRadius,
								lineHeight: a.css.lineHeight,
								boxShadow: a.css.boxShadow,
								backgroundColor: a.css.backgroundColor,
								opacity: a.css.opacity,
								width: "100%",
								height: "100%",
								overflow: "hidden"
							}), e.find("img").css({
								width: "100%"
							});
							return e;
						}
						isAndroid() && isWeixin() && 4 == a.type && "0px" != a.css.borderRadius && 0 == a.css.borderWidth && a.properties.anim && (a.css.borderWidth = 1, a.css.borderColor = "rgba(0,0,0,0)"), f.css(a.css).css({
							width: "100%",
							height: "100%",
							transform: "none"
						}), f.children(".element-box-contents").css({
							width: "100%",
							height: "100%"
						}), 4 != ("" + a.type).charAt(0) && "n" != ("" + a.type).charAt(0) && "m" != ("" + a.type).charAt(0) && "p" != ("" + a.type).charAt(0) && "h" != ("" + a.type).charAt(0) && $(c).css({
							width: Math.round(parseInt(a.css.width)*(checkHeight())),//修改大小
							height: Math.round(parseInt(a.css.height)*(checkHeight()))
						}), "h" == ("" + a.type).charAt(0) && ($(c).find("g").length ? $(c).find("g").attr("fill", a.css.color) : $(c).children().attr("fill", a.css.color), f.children(".element-box-contents").css("position", "relative"));
						"i" == ("" + a.type).charAt(0) && "d" != ("" + a.type).charAt(0) && (e.find(".counter-lr").find(".icon").css("line-height", Math.ceil(parseInt(a.css.height)*(checkHeight()))+"px"))
					}
				}else{
					if (a.css) {
						var g = 320 - a.css.left;
						e.css({
							width: g
						}), e.css({
							width: a.css.width,
							height: a.css.height,
							left: a.css.left,
							top: a.css.top,
							zIndex: a.css.zIndex,
							bottom: a.css.bottom,
							transform: a.css.transform
						});
						(0 === a.css.boxShadowSize || "0" == a.css.boxShadowSize) && (a.css.boxShadow = "rgba(0,0,0,0) 0 0 0");

						if ("edit" != i.mode && "x" == ("" + a.type).charAt(0)) {
							e.append(f);
							e.find(".element-box").css({
								borderStyle: a.css.borderStyle,
								borderWidth: a.css.borderWidth,
								borderColor: a.css.borderColor,
								borderTopLeftRadius: a.css.borderTopLeftRadius,
								borderTopRightRadius: a.css.borderTopRightRadius,
								borderBottomRightRadius: a.css.borderBottomRightRadius,
								borderBottomLeftRadius: a.css.borderBottomLeftRadius,
								boxShadow: a.css.boxShadow,
								lineHeight: a.css.lineHeight,
								backgroundColor: a.css.backgroundColor,
								opacity: a.css.opacity,
								width: "100%",
								height: "100%",
								overflow: "hidden"
							});
							e.find("img").css({
								width: "100%"
							});
							return e;
						}
						isAndroid() && isWeixin() && 4 == a.type && "0px" != a.css.borderRadius && 0 == a.css.borderWidth && a.properties.anim && (a.css.borderWidth = 1, a.css.borderColor = "rgba(0,0,0,0)"), f.css(a.css).css({
							width: "100%",
							height: "100%",
							transform: "none"
						}), f.children(".element-box-contents").css({
							width: "100%",
							height: "100%"
						}), 4 != ("" + a.type).charAt(0) && "n" != ("" + a.type).charAt(0) && "m" != ("" + a.type).charAt(0) && "p" != ("" + a.type).charAt(0) && "h" != ("" + a.type).charAt(0) && $(c).css({
							width: a.css.width,
							height: a.css.height
						}), "h" == ("" + a.type).charAt(0) && ($(c).find("g").length ? $(c).find("g").attr("fill", a.css.color) : $(c).children().attr("fill", a.css.color), f.children(".element-box-contents").css("position", "relative"));
						"i" == ("" + a.type).charAt(0) && "d" != ("" + a.type).charAt(0) && (e.find(".counter-lr").find(".counter-container").css("line-height", parseInt(a.css.height)+"px"))
					}
				}
				return e
			}
		}

		function c(a) {
			for (var b = 0; b < a.length - 1; b++) {
				for (var c = b + 1; c < a.length; c++) {
					if (a[b].css && a[c].css && parseInt(a[b].css.zIndex) && parseInt(a[c].css.zIndex) && (parseInt(a[b].css.zIndex, 10) > parseInt(a[c].css.zIndex, 10))) {
						var d = a[b];
						a[b] = a[c], a[c] = d
					}
				}
			}
			for (var e = 0; e < a.length; e++) {
				a[e].css && parseInt(a[e].css.zIndex) && (a[e].css.zIndex = e + 1 + "");
			}
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
				for (var p = 0; p < o.length; p++) {
					o[p](k, i[f], e);
				}
				n[("" + i[f].type).charAt(0)] && (n[("" + i[f].type).charAt(0)](k, i[f]), "edit" != e && (g(k, i[f]), h(k, i[f])));
				"edit" == e && m[("" + i[f].type).charAt(0)] && m[("" + i[f].type).charAt(0)](k, i[f]);
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
			//判断移动端&&修改大小
			p = containerWidth = !PCcheck() ? 320 : (checkHeight() * 320),
			q = containerHeight = !PCcheck() ? 486 : (checkHeight() * 486),
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
				parse: function (a) {
					 var b = !PCcheck() ? ($('<div class="edit_wrapper" data-scene-id="' + a.def.sceneId + '"><ul eqx-edit-destroy id="edit_area' + a.def.id + '" comp-droppable paste-element class="edit_area weebly-content-area weebly-area-active edit_area1"></div>')) : (($(".bg_white").height() > 700 ? $('<div class="edit_wrapper" data-scene-id="' + a.def.sceneId + '"><ul eqx-edit-destroy id="edit_area' + a.def.id + '" comp-droppable paste-element class="edit_area weebly-content-area weebly-area-active edit_area5"></div>') : $('<div class="edit_wrapper" data-scene-id="' + a.def.sceneId + '"><ul eqx-edit-destroy id="edit_area' + a.def.id + '" comp-droppable paste-element class="edit_area weebly-content-area weebly-area-active edit_area3"></div>'))),//判断移动端&&修改大小
						c = this.mode = a.mode;
					this.def = a.def;
					"view" == c && tplCount++;
					var e = $(a.appendTo);
					return containerWidth = e.width(), containerHeight = e.height(), r = p / containerWidth, s = q / containerHeight, d(a.def, b.appendTo($(a.appendTo)), c)
				}
			};
		return t
	});
	i.addInterceptor(function (a, b, c) {
		eqxCommon.animation(a, b, c)
	}), i.addComponent("1", function (a) {
		var b = document.createElement("div");
		b.id = a.id;
		b.setAttribute("class", "element comp_title");
		a.content && (b.textContent = a.content);

		if (a.css) {
			var c, d = a.css;
			for (c in d) {
				b.style[c] = d[c]
			}
		}
		if (a.properties.labels) {
			for (var e = a.properties.labels, f = 0; f < e.length; f++) {
				$('<a class = "label_content" style = "display: inline-block;">').appendTo($(b)).html(e[f].title).css(e[f].color).css("width", 100 / e.length + "%");
			}
		}
		return b
	}), i.addComponent("2", function (a) {
		var b = document.createElement("div");
		if(PCcheck()){//判断移动端&&修改大小
			if((a.content).indexOf("font-size")){
				var content = a.content; 
				var re = /font-size/g; // 注意g将全文匹配，不加将永远只返回第一个匹配。 
				var arr; 
				while((arr = re.exec(content)) !=null){ //exec使arr返回匹配的第一个，while循环一次将使re在g作用寻找下一个匹配。 
					var position = arr.index;
					var head = a.content.slice(0,position+11);
					var fontSize = Math.round(Number(a.content.slice(position+11,position+13))*(checkHeight()));
					var foot = a.content.slice(position+13);
					if(!isNaN(fontSize)){
						a.content = head + fontSize + foot;
					}else{
						var arr;
						if($($(a.content)[0]).css("font-size")){
							arr = $(a.content);
						}else{
							arr = $($(a.content)[0]).find("span").length > 0 ? $($(a.content)[0]).find("span"): $($(a.content)[0]).find("b");
						}
						for(var i = 0; i< arr.length; i++) {
							var font = $($(arr[i])[0]).css("font-size");
							font.indexOf("px") >= 0 && (font = Number(font.slice(0,font.indexOf("px"))))
							fontSize = Math.round(Number(copyFont.string[font])*(checkHeight()));
							if(!isNaN(fontSize)){
								fontSize = "font-size: " + fontSize + "px"
								var regExp;
								switch(font){
									case "x-small":
										regExp = /font-size: x-small/g;
										 break;
									case "small":
										regExp = /font-size: small/g;
										 break;
									case "medium":
										regExp = /font-size: medium/g;
										 break;
									case "large":
										regExp = /font-size: large/g;
										 break;
									case "x-large":
										regExp = /font-size: x-large/g;
										 break;
									case "xx-large":
										regExp = /font-size: xx-large/g;
										 break; 
									case "-webkit-xxx-large":
										regExp = /font-size: -webkit-xxx-large/g;
										 break;
								}
								var newstr = a.content.replace(regExp, fontSize);
								a.content = newstr
							}
							
						}
					}
				} 
			}
			if((a.content).indexOf("size=") >= 0){
				var content = a.content; 
				var re = /size=/g; // 注意g将全文匹配，不加将永远只返回第一个匹配。 
				var arr; 
				while((arr = re.exec(content)) !=null){ //exec使arr返回匹配的第一个，while循环一次将使re在g作用寻找下一个匹配。 
					var position = arr.index;
					var head, fontSize, foot;
					if(a.content.slice(position, position+6) == 'size="'){
						head = a.content.slice(0,position);
						fontSize = Math.round(copyFont.number[Number(a.content.slice(position+6,position+7))-1]*(checkHeight()));
						foot = a.content.slice(position+8);
					}else if(a.content.slice(position+6).indexOf("size=") > 0){
						var contentText = a.content.slice(position+6);
						var newposition = a.content.slice(position+6).indexOf("size=");
						head = a.content.slice(0, position + newposition+6)
						fontSize = Math.round(copyFont.number[Number(contentText.slice(newposition+6,newposition+7))-1]*(checkHeight()));
						foot = a.content.slice(position + newposition+14);
					};
					if(!isNaN(fontSize)){
						a.content = head+ "style='font-size:" + fontSize + "px'" + foot;
					}
				} 
			}

			if((a.content).indexOf("line-height")){
				var position1 = (a.content).indexOf("line-height");
					var head1 = a.content.slice(0,position1+13);
					var fontSize1 = Math.round(Number(a.content.slice(position1+13,position1+17))*(checkHeight()));
					var foot1 = a.content.slice(position1+17);
					if(fontSize1){
						a.content = head1 + fontSize1 + foot1;
					}
			}
		}
		b.id = a.id;
		b.setAttribute("ctype", a.type);

		!PCcheck() ? b.setAttribute("class", "element comp_paragraph editable-text comp_paragraph1") : ($(".bg_white").height() > 700 ? b.setAttribute("class", "element comp_paragraph editable-text comp_paragraph5") :b.setAttribute("class", "element comp_paragraph editable-text comp_paragraph3"));
		a.content && (b.innerHTML = a.content);
		b.style.cursor = "default";

		return b
	}), i.addComponent("x", function (a) {
		var b = document.createElement("div");
		if(PCcheck()){//判断移动端&&修改大小
			if((a.content).indexOf("font-size")){
				var content = a.content; 
				var re = /font-size/g; // 注意g将全文匹配，不加将永远只返回第一个匹配。 
				var arr; 
				while((arr = re.exec(content)) !=null){ //exec使arr返回匹配的第一个，while循环一次将使re在g作用寻找下一个匹配。 
					var position = arr.index;
					var head = a.content.slice(0,position+11);
					var fontSize = Math.round(Number(a.content.slice(position+11,position+13))*(checkHeight()));
					var foot = a.content.slice(position+13);
					if(fontSize){
						a.content = head + fontSize + foot;
					}
				} 
			}
			if((a.content).indexOf("line-height")){
				var position1 = (a.content).indexOf("line-height");
					var head1 = a.content.slice(0,position1+13);
					var fontSize1 = Math.round(Number(a.content.slice(position1+13,position1+17))*(checkHeight()));
					var foot1 = a.content.slice(position1+17);
					if(fontSize1){
						a.content = head1 + fontSize1 + foot1;
					}
			}
		}
		b.id = a.id;
		b.setAttribute("ctype", a.type);
		!PCcheck() ? b.setAttribute("class", "element comp_paragraph editable-text comp_paragraph1") : ($(".bg_white").height() > 700 ? b.setAttribute("class", "element comp_paragraph editable-text comp_paragraph5") :b.setAttribute("class", "element comp_paragraph editable-text comp_paragraph3"));
		a.content && (b.innerHTML = a.content);
		b.style.cursor = "default";

		return b
	}), i.addComponent("3", function (a, b) {
		var c, d = document.createElement("div");
		if("edit" == i.mode){
			c = b ? b.parent(".edit_wrapper") : $("#nr .edit_wrapper");
			d.setAttribute("class", "wrapper-background");
			d.setAttribute("id", a.id);
		}else if("view" == i.mode){
			c = b ? b.parent(".edit_wrapper") : $("#edit_area" + i.def.id).parent(".edit_wrapper");
			d.setAttribute("id", "wrapper-background" + i.def.id);
		}
		$(d).prependTo(c).css({
			width: "100%",
			height: "100%"
		});
		var e, f = new Image;
		if(a.properties.imgSrc){
			e = a.properties.imgSrc;
			/^http.*!/.test(e) ? (f.src = e, d.style.backgroundImage = "url(" + e + ")") : (f.src = PREFIX_FILE_HOST + e, d.style.backgroundImage = "url(" + PREFIX_FILE_HOST + e + ")");
			d.style.backgroundOrigin = "element content-box";
			// d.style.backgroundSize = "cover";
			if(a.properties.id == 0){
                d.style.backgroundSize = "contain";
            }else{
                d.style.backgroundSize = "cover";
            }
            d.style.backgroundRepeat = "no-repeat";
			d.style.backgroundPosition = "50% 50%";
			if(a.effect){
				"scaleUp" == a.effect.type ? $(d).css({
					animation: "scaleUp 7s ease 1s",
					"animation-fill-mode": "both"
				}) : "scaleDown" == a.effect.type && $(d).css({
					animation: "scaleDown 7s ease 1s",
					"animation-fill-mode": "both"
				})
			}
		}else{
			a.properties.bgColor && (d.style.backgroundColor = a.properties.bgColor);
		}

		return d
	}), i.addComponent("4", function (a) {
		if(a.properties.src){
			var b = document.createElement("img");
			b.id = a.id;
			b.setAttribute("ctype", a.type);
			b.setAttribute("class", "element comp_image editable-image");
			/^http.*/.test(a.properties.src) ? b.src = a.properties.src : b.src = PREFIX_FILE_HOST + a.properties.src;

			return b
		}
		
	}), i.addComponent("h", function (a) {
		if(PCcheck()){//判断移动端&&修改大小
			if(a.css["borderRadius"]){
				a.css["borderRadius"] = Math.round(Number(a.css["borderRadius"].slice(0,-2))*(checkHeight()))+"px";
				a.css["borderBottomLeftRadius"] = Math.round(Number(a.css["borderRadius"].slice(0,-2))*(checkHeight()))+"px";
				a.css["borderBottomRightRadius"] = Math.round(Number(a.css["borderRadius"].slice(0,-2))*(checkHeight()))+"px";
				a.css["borderTopLeftRadius"] = Math.round(Number(a.css["borderRadius"].slice(0,-2))*(checkHeight()))+"px";
				a.css["borderTopRightRadius"] = Math.round(Number(a.css["borderRadius"].slice(0,-2))*(checkHeight()))+"px";
			}
		}
		var b, c;
		if (a.properties.type.indexOf("symbol") < 0) {
			var b = document.createElementNS(eqxiuSvg.NAMESPACE, "svg");
			b.id = a.id;
			b.setAttribute("class", "element svg-element");
			b.setAttribute("xmlns", eqxiuSvg.NAMESPACE);
			b.setAttribute("version", "1.1");
			b.setAttribute("width", "100%");
			b.setAttribute("height", "100%");
			b.setAttribute("preserveAspectRatio", "none");
			c = eqxiuSvg.ShapeFromType(a.properties.type);
			c.setAttribute("fill", "#555"), b.appendChild(c);
			s = eqxiuSvg.boundingBox(c);
			viewBox = [Math.round(s.x) || 0, Math.round(s.y) || 0, Math.round(s.width) || 32, Math.round(s.height) || 32].join(" ");
			b.setAttribute("viewBox", viewBox);

			return b
		}
		b = document.createElement("div");
		c = eqxiuSvg.ShapeFromType(a.properties.type, 100, 100, a.id, a.css.color);
		b = '<svg id="' + a.id + '" class="element svg-element" ctype="' + a.type + '" xmlns="' + eqxiuSvg.NAMESPACE + '" version="1.1" width="100%" height="100%" preserveAspectRatio="xMidYMid" viewBox="' + a.properties.viewBox + '">' + c + "</svg>";

		return b;
	}), i.addComponent("v", function (a) {
		var b = document.createElement("div");
		var c = document.createElement("a");
		$(c).appendTo($(b));

		b.setAttribute("class", "element video_area");
		c.setAttribute("class", "element video_box");
		b.id = a.id, b.setAttribute("ctype", a.type);
		b.setAttribute("type", a.properties.type);
		a.properties.src && b.setAttribute("videourl", a.properties.src);

		return b
	}), i.addComponent("5", function (a) {
		var b = document.createElement("textarea");
		b.id = a.id;
		b.setAttribute("ctype", a.type);
		!PCcheck() ? b.setAttribute("class", "element comp_input editable-text comp_input1") : ($(".bg_white").height() > 700 ? b.setAttribute("class", "element comp_input editable-text comp_input5") : b.setAttribute("class", "element comp_input editable-text comp_input3"));
		b.setAttribute("maxlength", "300");
		a.properties.required && b.setAttribute("required", a.properties.required);
		a.properties.placeholder && b.setAttribute("placeholder", a.properties.placeholder);
		b.setAttribute("name", "eq[f_" + a.id + "]");
		b.style.width = "100%";

		return b
	}), i.addComponent("r", function (a) {
		var b = !PCcheck() ? $('<div class="element comp_radio editable-text comp_radio1" id="' + a.id + '"></div>') : ($(".bg_white").height() > 700 ? $('<div class="element comp_radio editable-text comp_radio5" id="' + a.id + '"></div>') : $('<div class="element comp_radio editable-text comp_radio3" id="' + a.id + '"></div>'));
		b.attr("ctype", a.type);
		b.attr("required", a.properties.required);
		b.attr("title", a.title);
		b.attr("name", "eq[f_" + a.id + "]");

		var c = $('<div class="radio-title">' + a.title + "</div>");
		a.properties.titleStyle && c.css(a.properties.titleStyle);
		b.append(c);
		var d = $('<div class="options"></div>'),
			e = JSON.parse(a.choices);
		$.each(e.options, function (b, c) {
			var f = $('<div class="option-group"><label class="option-label" for="' + (a.id + "" + (b + 1)) + '"><input class="option" id="' + (a.id + "" + (b + 1)) + '" type="radio" name="eq[f_' + a.id + ']" value="' + c.id + '">' + c.label + "</label></div>");
			a.properties.optionStyle && b < e.options.length - 1 && f.css(a.properties.optionStyle);
			d.append(f);
		});
		b.append(d);
		b.width("100%");

		return b.get(0)
	}), i.addComponent("c", function (a) {
		var b = !PCcheck() ? $('<div class="element comp_radio editable-text comp_radio1" id="' + a.id + '"></div>') : ($(".bg_white").height() > 700 ? $('<div class="element comp_radio editable-text comp_radio5" id="' + a.id + '"></div>') : $('<div class="element comp_radio editable-text comp_radio3" id="' + a.id + '"></div>'));
		b.attr("ctype", a.type);
		b.attr("required", a.properties.required);
		b.attr("title", a.title);
		b.attr("name", "eq[f_" + a.id + "]");

		var c = $('<div class="radio-title">' + a.title + "(可多选)</div>");
		a.properties.titleStyle && c.css(a.properties.titleStyle);
		b.append(c);

		var d = $('<div class="options"></div>'),
			e = JSON.parse(a.choices);
		$.each(e.options, function (b, c) {
			var f = $('<div class="option-group"><label class="option-label" for="' + (a.id + "" + (b + 1)) + '"><input class="option" id="' + (a.id + "" + (b + 1)) + '" type="checkbox" name="eq[f_' + a.id + ']" value="' + c.id + '">' + c.label + "</label></div>");
			a.properties.optionStyle && b < e.options.length - 1 && f.css(a.properties.optionStyle);
			d.append(f)
		});
		b.append(d);
		b.width("100%");

		return b.get(0)
	}), i.addComponent("a", function (a) {
		if(PCcheck()){//判断移动端&&修改大小--添加评分
		   if(typeof(a.css["lineHeight"]) == "string"){
				a.css["lineHeight"] = Math.round(Number((a.css["lineHeight"]).slice(0,-2)) * (checkHeight()))+"px";
			} 
		}
		var b = !PCcheck() ? $('<div class="element comp_rating editable-text comp_rating1" id="' + a.id + '"></div>') : ($(".bg_white").height() > 700 ? $('<div class="element comp_rating editable-text comp_rating5" id="' + a.id + '"></div>') : $('<div class="element comp_rating editable-text comp_rating3" id="' + a.id + '"></div>'));
		b.attr("ctype", a.type);
		b.attr("required", a.properties.required);
		b.attr("title", a.title);
		b.attr("name", "eq[f_" + a.id + "]");
		b.append(!PCcheck() ? $('<div class="rating-title rating-title1">' + a.title + "</div>") : ($(".bg_white").height() > 700 ? $('<div class="rating-title rating-title5">' + a.title + "</div>") : $('<div class="rating-title rating-title3">' + a.title + "</div>")));

		var c = !PCcheck() ? $('<div class="rating-icons rating-icons1"></div>') : ($(".bg_white").height() > 700 ? $('<div class="rating-icons rating-icons5"></div>') : $('<div class="rating-icons rating-icons3"></div>'));

		for (var d = 0; 5 > d; d++) {
			c.append($('<i class="' + a.properties.icon + "-line " + a.properties.size + '">').css("color", a.properties.color));
		}
		b.append(c);
		b.append($('<input type="hidden" name="eq[f_' + a.id + ']" value="">'));
		b.width("100%");

		return b.get(0)
	}), i.addComponent("p", function (a) {
		if (a.properties && a.properties.children) {//判断移动端&&修改大小
			var c = !PCcheck() ? a.css.width : Math.round(parseInt(a.css.width)*(checkHeight())),
				d = !PCcheck() ? a.css.height : Math.round(parseInt(a.css.height)*(checkHeight())),
				e = $('<div id="' + a.id + '" class="slider element" ctype="' + a.type + '"></div>');
			a.properties.bgColor && e.css("backgroundColor", a.properties.bgColor);

			$.each(a.properties.children, function (a, f) {
				var g = b(f.width, f.height, c, d),
					h = $('<img src="' + PREFIX_FILE_HOST + f.src + '">');
				h.css({//判断移动端&&修改大小
					margin: (d - g.height) / 2 + "px " + (c - g.width) / 2 + "px",
					width: !PCcheck() ? g.width : Math.round(parseInt(g.width)*(checkHeight())),
					height: !PCcheck() ? g.height : Math.round(parseInt(g.height)*(checkHeight()))
				}), e.append(h)
			});
			utilPictures.deleteInterval(a.id);

			return e.get(0)
		}
	}), i.addComponent("n", function (a) {
		if (a.properties && a.properties.pics.length) {
			var b = (a.css.width, a.css.height, $('<div id="' + a.id + '" class="random-event element comp_image editable-image" ctype="' + a.type + '"></div>'));
			$.each(a.properties.pics, function (a, c) {
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
			});

			return b.get(0)
		}
	}), i.addComponent("6", function (a) {
		var b = document.createElement("button");//判断移动端&&修改大小--提交按钮
		b.id = a.id;
		b.setAttribute("ctype", a.type);
		!PCcheck() ? b.setAttribute("class", "element comp_button editable-text comp_button1") : ($(".bg_white").height() > 700 ? b.setAttribute("class", "element comp_button editable-text comp_button5") : b.setAttribute("class", "element comp_button editable-text comp_button3"));

		if (a.properties.title) {
			var c = a.properties.title.replace(/ /g, "&nbsp;");
			b.innerHTML = c
		}
		b.style.width = "100%";

		return b;
	}), i.addComponent("t", function (a) {
		var b = document.createElement("button");//判断移动端&&修改大小--表单跳转
		b.id = a.id;
		b.setAttribute("ctype", a.type);
		!PCcheck() ? b.setAttribute("class", "element comp_button editable-text comp_button1") : ($(".bg_white").height() > 700 ? b.setAttribute("class", "element comp_button editable-text comp_button5") : b.setAttribute("class", "element comp_button editable-text comp_button3"));

		if (a.properties.title) {
			var c = a.properties.title.replace(/ /g, "&nbsp;");
			b.innerHTML = c
		}
		b.style.width = "100%";
		b.style.backgroundColor = a.css.backgroundColor;

		return b
	}), i.addComponent("8", function (a) {
		var b = document.createElement("a");//判断移动端&&修改大小--添加电话
		b.id = a.id, b.setAttribute("ctype", a.type), !PCcheck()? b.setAttribute("class", "element comp_anchor comp_anchor1 editable-text") : ($(window).height() > 750 ? b.setAttribute("class", "element comp_anchor comp_anchor5 editable-text") : b.setAttribute("class", "element comp_anchor comp_anchor3 editable-text"));
		var c = null;
		a.properties.imgSrc ? (c = $('<img style="width: 100%; height: 100%;" src="' + (PREFIX_FILE_HOST + a.properties.imgSrc) + '"></img>'), $(b).html(c), "view" == i.mode && $(b).attr("href", "tel:" + a.properties.number)) : a.properties.title && (c = a.properties.title.replace(/ /g, "&nbsp;"), $(b).html(c), "view" == i.mode && $(b).attr("href", "tel:" + a.properties.number));

		b.style.cursor = "default";
		b.style.width = "100%";

		return b
	}), i.addComponent("l", function (a) {////判断移动端&&修改大小--添加链接&一键拨号
		var b = document.createElement("a");
		b.id = a.id, b.setAttribute("ctype", a.type), !PCcheck()? b.setAttribute("class", "element comp_anchor comp_anchor1 editable-text") : ($(window).height() > 750 ? b.setAttribute("class", "element comp_anchor comp_anchor5 editable-text") : b.setAttribute("class", "element comp_anchor comp_anchor3 editable-text"));
		var c = null;
		a.properties.imgSrc ? (c = $('<img style="width: 100%; height: 100%;" src="' + (PREFIX_FILE_HOST + a.properties.imgSrc) + '"></img>'), $(b).html(c)) : a.properties.title && (c = a.properties.title.replace(/ /g, "&nbsp;"), $(b).html(c));

		b.style.cursor = "default";
		b.style.width = "100%";

		return b
	}), i.addComponent("s", function (a) {////判断移动端&&修改大小--添加音效
		var b = document.createElement("a");
		b.id = a.id, b.setAttribute("ctype", a.type), !PCcheck()? b.setAttribute("class", "element comp_anchor comp_anchor1 editable-text") : ($(window).height() > 750 ? b.setAttribute("class", "element comp_anchor comp_anchor5 editable-text") : b.setAttribute("class", "element comp_anchor comp_anchor3 editable-text"));
		var c = null;
		a.properties.imgSrc ? (c = $('<img style="width: 100%; height: 100%;" src="' + (PREFIX_FILE_HOST + a.properties.imgSrc) + '"></img>'), $(b).html(c)) : a.properties.title && (c = a.properties.title.replace(/ /g, "&nbsp;"), $(b).html(c));

		b.style.cursor = "default";
		b.style.width = "100%";

		return b;
	}), i.addComponent("i", function (b) {//计数--喜欢
		if(PCcheck()){//判断移动端&&修改大小
			if(typeof(b.css["lineHeight"]) == "string"){
				b.css["lineHeight"] = Math.round(Number((b.css["lineHeight"]).slice(0,-2)) * (checkHeight()))+"px";
			}else{
				if(typeof(b.css["height"]) == "string"){
					b.css["lineHeight"] = Math.round(Number((b.css["height"]).slice(0,-2)) * (checkHeight()))+"px";
				}else{
					b.css["lineHeight"] = Math.round(b.css["height"] * checkHeight())+"px";
				}
			}
			if(typeof(b.css["borderRadius"]) == "string"){
				b.css["borderRadius"] = Math.round(Number((b.css["borderRadius"]).slice(0,-2)) * (checkHeight()))+"px";
				if(b.css["borderBottomLeftRadius"]){
					b.css["borderBottomLeftRadius"] = Math.round(Number((b.css["borderBottomLeftRadius"]).slice(0,-2)) * (checkHeight()))+"px";
					b.css["borderBottomRightRadius"] = Math.round(Number((b.css["borderBottomRightRadius"]).slice(0,-2)) * (checkHeight()))+"px";
					b.css["borderTopLeftRadius"] = Math.round(Number((b.css["borderTopLeftRadius"]).slice(0,-2)) * (checkHeight()))+"px";
					b.css["borderTopRightRadius"] = Math.round(Number((b.css["borderTopRightRadius"]).slice(0,-2)) * (checkHeight()))+"px";
				}
				
			}else{
				b.css["borderRadius"] = Math.round(Number((b.css["borderRadius"])) * (checkHeight()));
				if(b.css["borderBottomLeftRadius"]){
					b.css["borderBottomLeftRadius"] = Math.round(Number((b.css["borderBottomLeftRadius"])) * (checkHeight()));
					b.css["borderBottomRightRadius"] = Math.round(Number((b.css["borderBottomRightRadius"])) * (checkHeight()));
					b.css["borderTopLeftRadius"] = Math.round(Number((b.css["borderTopLeftRadius"])) * (checkHeight()));
					b.css["borderTopRightRadius"] = Math.round(Number((b.css["borderTopRightRadius"])) * (checkHeight()));
				}
				
			} 
			/*if(typeof(b.css["width"]) == "string"){
				b.css["width"] = Math.round(Number((b.css["width"]).slice(0,-2)) * (checkHeight()))+"px";
			} else{
				b.css["width"] = Math.round(b.properties["width"] * (checkHeight()));
			} */
		}
		var c = !PCcheck() ? $('<div class="element comp_counter not-voted editable-text comp_counter1" id="' + b.id + '"></div>') : ($(".bg_white").height() > 700 ? $('<div class="element comp_counter not-voted editable-text comp_counter5" id="' + b.id + '"></div>') : $('<div class="element comp_counter not-voted editable-text comp_counter3" id="' + b.id + '"></div>'));
		c.attr("ctype", b.type), c.attr("name", "eq[f_" + b.id + "]"), c.addClass(b.properties.layout).addClass(b.properties.size);
		var d = $('<div class="counter-container"></div>');
		b.properties.imgSrc ? d.append($('<img class="counter-elem counter-icon" style="width: 115px; height: 115px; margin: 0 auto;" src="' + (PREFIX_FILE_HOST + b.properties.imgSrc) + '"></img>')) : d.append($('<i class="counter-elem icon iconfont ' + b.properties.icon + '"></i>'));
		var e = $('<span class="counter-elem counter-number">0</span>').css("color", b.properties.color);
		if (d.append(e), "view" == i.mode ? a.counterValues && a.counterValues.then(function (c) {
				var d = c.map[b.id] || 0;
				e.attr("data-counter-number", d);
				var f = a.fixedNum(d);
				e.text(f)
			}) : c.removeClass("not-voted"), c.width("100%"), "counter-tb" === b.properties.layout) {
			var f = 0;
			f = b.properties.imgSrc ? "counter-l" == b.properties.size ? (PCcheck() ? Math.round(62 * (checkHeight())) : 62) : "counter-m" == b.properties.size ? (PCcheck() ? Math.round(57 * (checkHeight())) : 57) : (PCcheck() ? Math.round(53 * (checkHeight())) : 53) : "counter-l" == b.properties.size ? (PCcheck() ? Math.round(30 * (checkHeight())) : 30) : "counter-m" == b.properties.size ? (PCcheck() ? Math.round(20 * (checkHeight())) : 20) : (PCcheck() ? Math.round(15 * (checkHeight())) : 15), d.css("margin-top", -f)
		}
		return "edit" != i.mode && setTimeout(function () {
			/*var a = {
				width: "auto",
				"min-width": b.css.width
			};
			c.css(a), c.parents("li.comp-resize").css(a)*/
		}, 100), c.append(d)/*, b.css.lineHeight && c.css("line-height", b.css.lineHeight)*/, c.get(0)
	}), i.addComponent("d", function (b) {
		if(PCcheck()){//判断移动端&&修改大小
			if(typeof(b.css["lineHeight"]) == "string"){
				b.css["lineHeight"] = Math.round(Number((b.css["lineHeight"]).slice(0,-2)) * (checkHeight()))+"px";
			}
			if(typeof(b.css["borderRadius"]) == "string"){
				b.css["borderRadius"] = Math.round(Number((b.css["borderRadius"]).slice(0,-2)) * (checkHeight()))+"px";
				if(b.css["borderBottomLeftRadius"]){
					b.css["borderBottomLeftRadius"] = Math.round(Number((b.css["borderBottomLeftRadius"]).slice(0,-2)) * (checkHeight()))+"px";
					b.css["borderBottomRightRadius"] = Math.round(Number((b.css["borderBottomRightRadius"]).slice(0,-2)) * (checkHeight()))+"px";
					b.css["borderTopLeftRadius"] = Math.round(Number((b.css["borderTopLeftRadius"]).slice(0,-2)) * (checkHeight()))+"px";
					b.css["borderTopRightRadius"] = Math.round(Number((b.css["borderTopRightRadius"]).slice(0,-2)) * (checkHeight()))+"px";
				}
				
			}else{
				b.css["borderRadius"] = Math.round(Number((b.css["borderRadius"])) * (checkHeight()));
				if(b.css["borderBottomLeftRadius"]){
					b.css["borderBottomLeftRadius"] = Math.round(Number((b.css["borderBottomLeftRadius"])) * (checkHeight()));
					b.css["borderBottomRightRadius"] = Math.round(Number((b.css["borderBottomRightRadius"])) * (checkHeight()));
					b.css["borderTopLeftRadius"] = Math.round(Number((b.css["borderTopLeftRadius"])) * (checkHeight()));
					b.css["borderTopRightRadius"] = Math.round(Number((b.css["borderTopRightRadius"])) * (checkHeight()));
				}
				
			}
		}
		var c = !PCcheck() ? $('<div class="element comp_counter editable-text comp_counter1" id="' + b.id + '"></div>') : ($(".bg_white").height() > 700 ? $('<div class="element comp_counter editable-text comp_counter5" id="' + b.id + '"></div>') : $('<div class="element comp_counter editable-text comp_counter3" id="' + b.id + '"></div>'));
		c.attr("ctype", b.type), c.addClass(b.properties.layout).addClass(b.properties.size);
		var d = $('<div class="counter-container"></div>');
		d.append($('<i class="counter-elem icon iconfont ' + b.properties.icon + '"></i>'));
		var e = $('<span class="counter-elem counter-number">0</span>').css("color", b.properties.color);
		d.append(e);

		"view" == i.mode && a.showCount && a.showCount.then(function (b) {
			var c = a.fixedNum(b),
				d = c || 0;
			e.text(d)
		});

		c.width("100%");
		if ("counter-tb" === b.properties.layout) {
            var f = 0;
            if("counter-l" == b.properties.size){
                f = PCcheck() ? Math.round(30 * (checkHeight())) : 30;
            }else if("counter-m" == b.properties.size){
                f = PCcheck() ? Math.round(20 * (checkHeight())) : 20;
            }else{
                f = PCcheck() ? Math.round(15 * (checkHeight())) : 15;
            }
            d.css("margin-top", -f)
        }
		c.append(d);
		b.css.lineHeight && c.css("line-height", b.css.lineHeight);

		return c.get(0)
	}), i.addComponent("7", function (a) {
		var b = document.createElement("div");
		b.id = "map_" + a.id;
		b.setAttribute("class", "element comp_map_wrapper");
		a.content && (b.textContent = a.content);
		if (a.css) {
			var c, d = a.css;
			for (c in d) {
				b.style[c] = d[c]
			}
		}
		b.style.height = "250px";

		return b;
	}), i.bindAfterRenderEvent("1", function (a, b) {
		if (a = $("div", a)[0], "view" == i.mode && 1 == b.type) {
			var c = b.properties.labels;
			for (key in c){!
				function (b) {
					$($(a).find(".label_content")[b]).on("click", function () {
						pageScroll(c[b])
					})
				}(key)
			}
		}
	}), i.bindAfterRenderEvent("8", function (a, b) {
		a = $("a", a)[0];
		var c = {
			id: b.sceneId,
			num: b.properties.number
		};
		if ("view" == i.mode) {
			var d = function () {
				$.ajax({
					cache: !0,
					type: "POST",
					url: PREFIX_S1_URL + "index.php?c=scene&a=dial",
					data: $.param(c),
					async: !1,
					error: function (a) {
						layer.alert("Connection error")
					},
					success: function (a) {
					}
				})
			};
			a.addEventListener("click", d)
		}
	}), i.bindAfterRenderEvent("l", function (a, b) {
		if (a = $("a", a)[0]) {
			c(a, b)
		}
	}), i.bindAfterRenderEvent("s", function (a, b) {
		a = $("a", a)[0], c(a, b)
	}), i.bindAfterRenderEvent("i", function (b, c) {
	   if ("view" == i.mode) {
			var d = $(b).find(".icon");
			var round = $(b).find(".element-box");
			var css = c;
			var elem = $(b).find(".counter-elem");
			d.click(function (e) {
				//debugger;
				console.log('12');

				var f = {
						sceneId: c.sceneId,
						fieldId: c.id
					},
					g = $(b);
				$.ajax({
					cache: !0,
					type: "POST",
					url: PREFIX_S1_URL + "index.php?c=scene&a=counterset",
					data: $.param(f),
					async: !1,
					error: function (a) {
						layer.alert("Connection error")
					},
					success: function (b) {
						d.unbind("click"), g.find(".comp_counter").removeClass("not-voted");
						var c = $(".counter-number", g),
							e = (parseInt(c.attr("data-counter-number"), 10) || 0) + 1;
						c.attr("data-counter-number", e);
						var f = a.fixedNum(e);
						$(".counter-number", g).text(f);
						round.attr("style", "color:"+css.css["backgroundColor"]+";background-color:"+css.css["color"]+";width:100%;height:100%;border-radius:"+parseInt(css.css.borderRadius)+"px"+";line-height:"+css.css["lineHeight"]);
					}
				})
			})
		}
	}), i.bindAfterRenderEvent("4", function (a, b) {
		c(a, b)
	}), i.bindAfterRenderEvent("x", function (a, b) {
		c(a, b)
	}), i.bindAfterRenderEvent("n", function (a, b) {
	}), i.bindAfterRenderEvent("h", function (a, b) {
		c(a, b)
	}), i.bindAfterRenderEvent("5", function (a, b) {
		var c = mobilecheck();
		d($(a).find("textarea")), e($(a).find("textarea")), "view" == i.mode && c && parseFloat(b.css.top) >= 200 && ($(a).find("textarea").focus(function (b) {
			$(a).closest(".edit_area").css({
				top: "-150px"
			})
		}), $(a).find("textarea").blur(function (b) {
			$(a).closest(".edit_area").css({
				top: 0
			})
		}))
	}), i.bindAfterRenderEvent("r", function (a, b) {
		"view" == i.mode && d($(a).find("label"))
	}), i.bindAfterRenderEvent("c", function (a, b) {
		"view" == i.mode && d($(a).find("label"))
	}), i.bindAfterRenderEvent("v", function (a, b) {
		/*function autoClick(){
			$(a).find(".video_box").trigger(mobilecheck() ? "touchstart" : 'click');  
		}
		$autoFun=setTimeout(autoClick,0);*/
		"view" == i.mode && $(a).find(".video_box").bind(mobilecheck() ? "touchstart" : "click", function () {
			if(b.properties.type == "v1"){
				$(a).find(".video_box").hide();
				$("#audio_btn").hasClass("video_exist") && ($("#audio_btn").hide(), $("#media")[0].pause());
				utilSound.pause();
				$('<div class="video_mask" id="mask_' + b.id + '"></div>').appendTo($(a));
				$('<a class = "close_mask" id="close_' + b.id + '"></a>').appendTo($(a));
				$(b.properties.src).appendTo($("#mask_" + b.id)).attr("style", "position: absolute;height: 100%;").attr("width", "100%").removeAttr("height");
				$("#close_" + b.id).bind(mobilecheck() ? "touchstart" : "click", function () {
					$(a).find(".video_box").show();
					$("#mask_" + b.id).remove();
					$("#close_" + b.id).remove();
					$("#audio_btn").hasClass("video_exist") && $("#audio_btn").show(function () {
						$("#media")[0].play()
					})
				})
			}else{
				var src = /^http.*/.test(b.properties.src) ? b.properties.src : (PREFIX_FILE_HOST + b.properties.src);
				$("#audio_btn").hasClass("video_exist") && ($("#audio_btn").hide(), $("#media")[0].pause());
				utilSound.pause();
				$('<div class="video_mask" id="mask_' + b.id + '"></div>').appendTo($(a));
				$('<a class = "close_mask" id="close_' + b.id + '"></a>').appendTo($(a));
				$("<video src='"+ src +"' controls='controls'></video>").appendTo($("#mask_" + b.id)).attr("style", "position: absolute;height: 100%;").attr("width", "100%").removeAttr("height");
				$("#close_" + b.id).bind(mobilecheck() ? "touchstart" : "click", function () {
					$("#mask_" + b.id).remove();
					$("#close_" + b.id).remove();
					$("#audio_btn").hasClass("video_exist") && $("#audio_btn").show(function () {
						$("#media")[0].play();
					})
				})
			}
			
		})
	}), i.bindAfterRenderEvent("2", function (a, b) {
		f(a)
	}), i.bindAfterRenderEvent("6", function (a, b) {
		if (a = $("button", a)[0], "view" == i.mode) {
			var c = {
					REQUIRED: "为必填项！",
					WRONG_PHONE_NUMBER_FORMAT: "手机号码格式错误！",
					WRONG_EMAIL_FORMAT: "邮箱格式错误！",
					FILL_OUT_THE_FORM: "请填写表单！",
					DUPLICATED_SUBMISSION: "请不要重复提交！",
					THANKS_FOR_PARTICIPATION: "您提交的信息已经咻咻地跑到我们的数据库啦！灰常感谢您的参与呐~！"
				},
				d = function (a, b, d) {
					var e = !0,
						f = {};
					if ($("textarea", d).each(function () {
							if (e) {
								if ("required" == $(this).attr("required") && "" == $(this).val().trim()) return layer.alert($(this).attr("placeholder") + c.REQUIRED), void(e = !1);
								if ("502" == $(this).attr("ctype") && "" !== $(this).val().trim()) {
									var a = new RegExp(/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/g);
									if (!a.test($(this).val())) {
										return layer.alert("手机号码格式错误！"), void(e = !1)
									}
								}
								if ("503" == $(this).attr("ctype") && "" !== $(this).val().trim()) {
									var b = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g);
									if (!b.test($(this).val())) {
										return layer.alert("邮箱格式错误！"), void(e = !1)
									}
								}
								f[$(this).attr("name")] = $(this).val()
							}
						}), $("input:checked", d).each(function () {
							var a = $(this);
							f[a.attr("name")] ? f[a.attr("name")] += "," + a.val() : f[a.attr("name")] = a.val()
						}), $('.comp_radio[required="required"]', d).each(function () {
							var a = $(this);
							f[a.attr("name")] || (layer.alert(a.attr("title") + c.REQUIRED), e = !1)
						}), $('input[type="hidden"]', d).each(function () {
							f[$(this).attr("name")] = $(this).val()
						}), $('.comp_rating[required="required"]', d).each(function () {
							var a = $(this);
							f[a.attr("name")] && "0" != f[a.attr("name")] || (layer.alert(a.attr("title") + "为必填项！"), e = !1)
						}), e) {
						var g = !1;
						if ($.isEmptyObject(f)) return void(g = !0);
						for (var h in f) {
							if ("" !== f[h]) {
								g = !0;
								break
							}
						}
						return g ? void $.ajax({
							cache: !0,
							type: "POST",
							url: PREFIX_S1_URL + "index.php?c=scenedata&a=add&id=" + b,
							data: $.param(f),
							async: !1,
							error: function (a) {
								layer.alert("Connection error")
							},
							success: function (b) {
								$(a).unbind("click").click(function () {
									layer.alert("请不要重复提交！")
								}), layer.alert("您提交的信息已经咻咻地跑到我们的数据库啦！灰常感谢您的参与呐~！")
							}
						}) : void layer.alert("请填写表单！")
					}
				};
			i.def.sceneId;
			$(a).bind(mobilecheck() ? "touchstart" : "click", function () {
				var b, c = $(a).parents(".edit_wrapper").attr("data-scene-id");
				b = c ? $(a).parents(".nr").find('.edit_wrapper[data-scene-id="' + c + '"]') : $(a).parents(".nr"), d(this, c, b)
			})
		}
	}), i.bindAfterRenderEvent("t", function (a, b) {
		$(a).bind("click", function(){
			b.properties.title == "下一页" ? eqxiu.nextPage() : eqxiu.prePage();
		});

	}), i.bindAfterRenderEvent("7", function (a, b) {
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
	}), i.bindAfterRenderEvent("p", function (a, b) {
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
				onStartEnd: function (a) {
					utilPictures.addInterval(b.id, a)
				}
			})
		}
	}), i.bindAfterRenderEvent("a", function (a, b) {
		function c(a) {
			f.each(function (b, c) {
				$(c).removeClass(h).addClass(h + "-line"), a >= b && $(c).removeClass(h + "-line").addClass(h)
			})
		}

		var e = $(a);
		if ("view" == i.mode) {
			var f = e.find("i"),
				g = e.find("input"),
				h = b.properties.icon;
			f.each(function (a, b) {
				$(b).bind(mobilecheck() ? "touchstart" : "click", function () {
					c(a), g.val(a + 1)
				}), $(b).bind("mouseenter", function () {
					c(a)
				})
			}), e.find(".rating-icons").bind("mouseleave", function () {
				c(parseInt(g.val(), 10) - 1)
			}), d(e.find(".rating-icons"))
		}
	});
	var j
}(window.eqShow);
	var tplCount = 0,
	eqxCommon = function () {
		var a = function(a) {
				var b, c, d = a.type;
				0 === d && (b = "fadeIn"); 
				1 === d && (
					c = a.direction, 
					0 === c && (b = "fadeInLeft"), 
					1 === c && (b = "fadeInDown"), 
					2 === c && (b = "fadeInRight"), 
					3 === c && (b = "fadeInUp")
				);
				2 === d && (
					c = a.direction, 
					0 === c && (b = "bounceInLeft"), 
					1 === c && (b = "bounceInDown"), 
					2 === c && (b = "bounceInRight"), 
					3 === c && (b = "bounceInUp")
				);
				3 === d && (b = "bounce"); 
				4 === d && (b = "zoomIn");
				5 === d && (b = "rubberBand");
				6 === d && (b = "wobble");
				7 === d && (b = "rotateIn");
				8 === d && (b = "flip");
				9 === d && (b = "swing"); 
				10 === d && (b = "fadeOut");
				11 === d && (b = "flipOutY");
				12 === d && (b = "rollIn");
				13 === d && (b = "lightSpeedIn");
				14 === d && (b = "bounceOut"); 
				15 === d && (b = "rollOut"); 
				16 === d && (b = "lightSpeedOut");
				17 === d && (
					c = a.direction, 
					0 === c && (b = "fadeOutRight"), 
					1 === c && (b = "fadeOutDown"), 
					2 === c && (b = "fadeOutLeft"), 
					3 === c && (b = "fadeOutUp")
				);
				18 === d && (b = "zoomOut");
				19 === d && (
					c = a.direction, 
					0 === c && (b = "bounceOutRight"), 
					1 === c && (b = "bounceOutDown"), 
					2 === c && (b = "bounceOutLeft"), 
					3 === c && (b = "bounceOutUp")
				);
				20 === d && (b = "flipInY");
				21 === d && (b = "tada"); 
				22 === d && (b = "jello");
				23 === d && (b = "flash"); 
				24 === d && (b = "flipInX");
				25 === d && (b = "flipOutX");

				return b
			},
			b = function (a, b, c) {
				function d(a, b, f) {
					if (f.length && e < f.length) {
						a.css("animation", "");
						a.get(0);
						a.css("animation", b[e] + " " + f[e].duration + "s ease " + f[e].delay + "s " + (f[e].countNum ? f[e].countNum : "")), "view" == c ? (f[e].count && e == f.length - 1 && a.css("animation-iteration-count", "infinite"), a.css("animation-fill-mode", "both")) : (a.css("animation-iteration-count", "1"), a.css("animation-fill-mode", "backwards")), f[e].linear && a.css("animation-timing-function", "linear"), a.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
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
					b.properties.anim.trigger ? a.click(function () {
						d(g, h, b.properties.anim)
					}) : d(g, i, j)
				}
			},
			c = function (a, b) {
				var c = $(a);
				if (b.trigger && b.trigger.receives && b.trigger.receives.length) {
					$.each(b.trigger.receives, function (a, d) {
						if (d.ids.length) {
							var e = utilTrigger.getHandleType(d.type).name;
							("show" == e || "randomEvent" == e) && c.hide(), "hide" == e && c.show(), c.bind(e, function () {
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
			d = function () {
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
eqShow.getShowCount = function (a) {
	return this.showCount = $.ajax({
		type: "GET",
		url: PREFIX_S1_URL + "index.php?c=scene&a=pv&sceneId=" + a,
		xhrFields: {
			withCredentials: !0
		},
		error: function (a) {
			layer.alert("Connection error")
		},
		crossDomain: !0
	}), this.showCount
}, eqShow.fixedNum = function (a) {
	var b;
	return 1e4 > a ? b = a : a >= 1e4 && 1e8 > a ? b = (a / 1e4).toFixed(2) + "万" : a >= 1e8 && (b = (a / 1e8).toFixed(2) + "亿"), b
}, eqShow.showProgressBar = function (a, b, c) {
	if (a.obj.property.slideNumber) {
		var d = $('<div class="progress"></div>'),
			e = $("<span></span>"),
			f = $('<em class="page-tip"></em>');
		d.append(e).append(f), c && a.obj.property.slideDisplay ? c.append(d.css("display", a.obj.property.slideDisplay)) : $("#nr").append(d.css("display", "block"))
	}
	var g = function () {
		a.obj.property.slideNumber && e && setTimeout(function () {
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
	g(), b.eq(0).find(".u-arrow-bottom").css("bottom", "30px"), eqShow.progressInterval = setInterval(function () {
		g()
	}, 300)
}, eqShow.selectElement = function (a) {
	var b;
	return b = $("#inside_" + a, ".phone-view").length ? $("#inside_" + a, ".phone-view") : $("#inside_" + a)
}, function (a) {
	function b(b) {
		return b.classList ? b.classList : a(b).attr("class").match(/\S+/gi)
	}

	a.fn.ShareLink = function (c) {
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
			g = {
				twitter: "https://twitter.com/intent/tweet?url={url}&text={text}",
				pinterest: "https://www.pinterest.com/pin/create/button/?media={image}&url={url}&description={text}",
				facebook: "https://www.facebook.com/sharer.php?u={url}",
				vk: "https://vkontakte.ru/share.php?url={url}&title={title}&description={text}&image={image}&noparse=true",
				linkedin: "https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={text}&source={url}",
				myworld: "https://connect.mail.ru/share?url={url}&title={title}&description={text}&imageurl={image}",
				odnoklassniki: "http://odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl={url}&st.comments={text}",
				tumblr: "https://tumblr.com/share?s=&v=3&t={title}&u={url}",
				blogger: "https://blogger.com/blog-this.g?t={text}&n={title}&u={url}",
				delicious: "https://delicious.com/save?url={url}&title={title}",
				plus: "https://plus.google.com/share?url={url}",
				digg: "https://digg.com/submit?url={url}&title={title}",
				reddit: "http://reddit.com/submit?url={url}&title={title}",
				stumbleupon: "https://www.stumbleupon.com/submit?url={url}&title={title}",
				pocket: "https://getpocket.com/edit?url={url}&title={title}",
				chiq: "http://www.chiq.com/create/bookmarklet?u={url}&i={image}&d={title}&c={url}",
				qrifier: "http://qrifier.com/q?inc=qr&type=url&size=350&string={url}",
				qrsrc: "http://www.qrsrc.com/default.aspx?shareurl={url}",
				qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}",
				tulinq: "http://www.tulinq.com/enviar?url={url}&title={title}",
				misterwong: "http://www.mister-wong.com/index.php?action=addurl&bm_url={url}&bm_description={title}&bm_notice=",
				sto_zakladok: "http://www.100zakladok.ru/save/?bmurl={url}&bmtitle={title}",
				two_linkme: "http://www.2linkme.com/?collegamento={url}&id=2lbar",
				adifni: "http://www.adifni.com/account/bookmark/?bookmark_url={url}",
				amazonwishlist: "http://www.amazon.com/gp/wishlist/static-add?u={url}&t={title}",
				amenme: "http://www.amenme.com/AmenMe/Amens/AmenToThis.aspx?url={url}&title={title}",
				aim: "http://lifestream.aol.com/share/?url={url}&title={title}&description={text} ",
				aolmail: "http://webmail.aol.com/25045/aol/en-us/Mail/compose-message.aspx?to=&subject={title}&body={{content}}",
				arto: "http://www.arto.com/section/linkshare/?lu={url}&ln={title}",
				baidu: "http://cang.baidu.com/do/add?it={title}&iu={url}&fr=ien&dc={text}",
				bitly: "https://bitly.com/a/bitmarklet?u={url}",
				bizsugar: "http://www.bizsugar.com/bizsugarthis.php?url={url}",
				blinklist: "http://www.blinklist.com/blink?u={url}&t={title}&d={text}",
				blip: "http://blip.pl/dashboard?body={title}%3A%20{url}",
				blogmarks: "http://blogmarks.net/my/new.php?mini=1&simple=1&url={url}&title={title}&content={text}",
				blurpalicious: "http://www.blurpalicious.com/submit/?url={url}&title={title}&desc={text}",
				bobrdobr: "http://bobrdobr.ru/addext.html?url={url}&title={title}&desc={text}",
				bonzobox: "http://bonzobox.com/toolbar/add?u={url}&t={title}&desc={text}",
				bookmerkende: "http://www.bookmerken.de/?url={url}&title={title}",
				box: "https://www.box.net/api/1.0/import?import_as=link&url={url}&name={title}&description={text}",
				bryderi: "http://bryderi.se/add.html?u={url}",
				buddymarks: "http://buddymarks.com/add_bookmark.php?bookmark_title={title}&bookmark_url={url}&bookmark_desc={text}",
				camyoo: "http://www.camyoo.com/note.html?url={url}",
				care2: "http://www.care2.com/news/compose?sharehint=news&share[share_type]news&bookmarklet=Y&share[title]={title}&share[link_url]={url}&share[content]={text}",
				citeulike: "http://www.citeulike.org/posturl?url={url}&title={title}",
				classicalplace: "http://www.classicalplace.com/?u={url}&t={title}&c={text}",
				cosmiq: "http://www.cosmiq.de/lili/my/add?url={url}",
				diggita: "http://www.diggita.it/submit.php?url={url}&title={title}",
				diigo: "http://www.diigo.com/post?url={url}&title={title}&desc={text}",
				domelhor: "http://domelhor.net/submit.php?url={url}&title={title}",
				dotnetshoutout: "http://dotnetshoutout.com/Submit?url={url}&title={title}",
				douban: "http://www.douban.com/recommend/?url={url}&title={title}",
				dropjack: "http://www.dropjack.com/submit.php?url={url}",
				edelight: "http://www.edelight.de/geschenk/neu?purl={url}",
				ekudos: "http://www.ekudos.nl/artikel/nieuw?url={url}&title={title}&desc={text}",
				elefantapl: "http://elefanta.pl/member/bookmarkNewPage.action?url={url}&title={title}&bookmarkVO.notes=",
				embarkons: "http://www.embarkons.com/sharer.php?u={url}&t={title}",
				evernote: "http://www.evernote.com/clip.action?url={url}&title={title}",
				extraplay: "http://www.extraplay.com/members/share.php?url={url}&title={title}&desc={text}",
				ezyspot: "http://www.ezyspot.com/submit?url={url}&title={title}",
				fabulously40: "http://fabulously40.com/writeblog?subject={title}&body={url}",
				informazione: "http://fai.informazione.it/submit.aspx?url={url}&title={title}&desc={text}",
				fark: "http://www.fark.com/cgi/farkit.pl?u={url}&h={title}",
				farkinda: "http://www.farkinda.com/submit?url={url}",
				favable: "http://www.favable.com/oexchange?url={url}&title={title}&desc={text}",
				favlogde: "http://www.favlog.de/submit.php?url={url}",
				flaker: "http://flaker.pl/add2flaker.php?title={title}&url={url}",
				folkd: "http://www.folkd.com/submit/{url}",
				fresqui: "http://fresqui.com/enviar?url={url}",
				friendfeed: "http://friendfeed.com/share?url={url}&title={title}",
				funp: "http://funp.com/push/submit/?url={url}",
				fwisp: "http://fwisp.com/submit.php?url={url}",
				givealink: "http://givealink.org/bookmark/add?url={url}&title={title}",
				gmail: "http://mail.google.com/mail/?view=cm&fs=1&to=&su={title}&body={text}&ui=1",
				goodnoows: "http://goodnoows.com/add/?url={url}",
				google: "http://www.google.com/bookmarks/mark?op=add&bkmk={url}&title={title}&annotation={text}",
				googletranslate: "http://translate.google.com/translate?hl=en&u={url}&tl=en&sl=auto",
				greaterdebater: "http://greaterdebater.com/submit/?url={url}&title={title}",
				hackernews: "http://news.ycombinator.com/submitlink?u={url}&t={title}",
				hatena: "http://b.hatena.ne.jp/bookmarklet?url={url}&btitle={title}",
				hedgehogs: "http://www.hedgehogs.net/mod/bookmarks/add.php?address={url}&title={title}",
				hotmail: "http://www.hotmail.msn.com/secure/start?action=compose&to=&subject={title}&body={{content}}",
				w3validator: "http://validator.w3.org/check?uri={url}&charset=%28detect+automatically%29&doctype=Inline&group=0",
				ihavegot: "http://www.ihavegot.com/share/?url={url}&title={title}&desc={text}",
				instapaper: "http://www.instapaper.com/edit?url={url}&title={title}&summary={text}",
				isociety: "http://isociety.be/share/?url={url}&title={title}&desc={text}",
				iwiw: "http://iwiw.hu/pages/share/share.jsp?v=1&u={url}&t={title}",
				jamespot: "http://www.jamespot.com/?action=spotit&u={url}&t={title}",
				jumptags: "http://www.jumptags.com/add/?url={url}&title={title}",
				kaboodle: "http://www.kaboodle.com/grab/addItemWithUrl?url={url}&pidOrRid=pid=&redirectToKPage=true",
				kaevur: "http://kaevur.com/submit.php?url={url}",
				kledy: "http://www.kledy.de/submit.php?url={url}&title={title}",
				librerio: "http://www.librerio.com/inbox?u={url}&t={title}",
				linkuj: "http://linkuj.cz?id=linkuj&url={url}&title={title}&description={text}&imgsrc=",
				livejournal: "http://www.livejournal.com/update.bml?subject={title}&event={url}",
				logger24: "http://logger24.com/?url={url}",
				mashbord: "http://mashbord.com/plugin-add-bookmark?url={url}",
				meinvz: "http://www.meinvz.net/Suggest/Selection/?u={url}&desc={title}&prov=addthis.com",
				mekusharim: "http://mekusharim.walla.co.il/share/share.aspx?url={url}&title={title}",
				memori: "http://memori.ru/link/?sm=1&u_data[url]={url}",
				meneame: "http://www.meneame.net/submit.php?url={url}",
				mixi: "http://mixi.jp/share.pl?u={url}",
				moemesto: "http://moemesto.ru/post.php?url={url}&title={title}",
				myspace: "http://www.myspace.com/Modules/PostTo/Pages/?u={url}&t={title}&c=",
				n4g: "http://www.n4g.com/tips.aspx?url={url}&title={title}",
				netlog: "http://www.netlog.com/go/manage/links/?view=save&origin=external&url={url}&title={title}&description={text}",
				netvouz: "http://netvouz.com/action/submitBookmark?url={url}&title={title}&popup=no&description={text}",
				newstrust: "http://newstrust.net/submit?url={url}&title={title}&ref=addthis",
				newsvine: "http://www.newsvine.com/_tools/seed&save?u={url}&h={title}&s={text}",
				nujij: "http://nujij.nl/jij.lynkx?u={url}&t={title}&b={text}",
				oknotizie: "http://oknotizie.virgilio.it/post?title={title}&url={url}",
				oyyla: "http://www.oyyla.com/gonder?phase=2&url={url}",
				pdfonline: "http://savepageaspdf.pdfonline.com/pdfonline/pdfonline.asp?cURL={url}",
				pdfmyurl: "http://pdfmyurl.com?url={url}",
				phonefavs: "http://phonefavs.com/bookmarks?action=add&address={url}&title={title}",
				plaxo: "http://www.plaxo.com/events?share_link={url}&desc={text}",
				plurk: "http://www.plurk.com/m?content={url}+({title})&qualifier=shares ",
				posteezy: "http://posteezy.com/node/add/story?title={title}&body={url}",
				pusha: "http://www.pusha.se/posta?url={url}&title={title}&description={text}",
				rediff: "http://share.rediff.com/bookmark/addbookmark?title={title}&bookmarkurl={url}",
				redkum: "http://www.redkum.com/add?url={url}&step=1&title={title}",
				scoopat: "http://scoop.at/submit?url={url}&title={title}&body={text}",
				sekoman: "http://sekoman.lv/home?status={title}&url={url}",
				shaveh: "http://shaveh.co.il/submit.php?url={url}&title={title}",
				shetoldme: "http://shetoldme.com/publish?url={url}&title={title}&body={text}",
				sinaweibo: "http://v.t.sina.com.cn/share/share.php?url={url}&title={title}",
				sodahead: "http://www.sodahead.com/news/submit/?url={url}&title={title}",
				sonico: "http://www.sonico.com/share.php?url={url}&title={title}",
				springpad: "http://springpadit.com/s?type=lifemanagr.Bookmark&url={url}&name={title}",
				startaid: "http://www.startaid.com/index.php?st=AddBrowserLink&type=Detail&v=3&urlname={url}&urltitle={title}&urldesc={text}",
				startlap: "http://www.startlap.hu/sajat_linkek/addlink.php?url={url}&title={title}",
				studivz: "http://www.studivz.net/Suggest/Selection/?u={url}&desc={title}&prov=addthis.com",
				stuffpit: "http://www.stuffpit.com/add.php?produrl={url}",
				stumpedia: "http://www.stumpedia.com/submit?url={url}",
				svejo: "http://svejo.net/story/submit_by_url?url={url}&title={title}&summary={text}",
				symbaloo: "http://www.symbaloo.com/en/add/?url={url}&title={title}",
				thewebblend: "http://thewebblend.com/submit?url={url}&title={title}",
				thinkfinity: "http://www.thinkfinity.org/favorite-bookmarklet.jspa?url={url}&subject={title}",
				thisnext: "http://www.thisnext.com/pick/new/submit/url/?description={text}&name={title}&url={url}",
				tuenti: "http://www.tuenti.com/share?url={url}",
				typepad: "http://www.typepad.com/services/quickpost/post?v=2&qp_show=ac&qp_title={title}&qp_href={url}&qp_text={text}",
				viadeo: "http://www.viadeo.com/shareit/share/?url={url}&title={title}&urlaffiliate=32005&encoding=UTF-8",
				virb: "http://virb.com/share?external&v=2&url={url}&title={title}",
				visitezmonsite: "http://www.visitezmonsite.com/publier?url={url}&title={title}&body={text}",
				vybralisme: "http://vybrali.sme.sk/sub.php?url={url}",
				webnews: "http://www.webnews.de/einstellen?url={url}&title={title}",
				wirefan: "http://www.wirefan.com/grpost.php?d=&u={url}&h={title}&d={text}",
				wordpress: "http://wordpress.com/wp-admin/press-this.php?u={url}&t={title}&s={text}&v=2",
				wowbored: "http://www.wowbored.com/submit.php?url={url}",
				wykop: "http://www.wykop.pl/dodaj?url={url}&title={title}&desc={text}",
				yahoobkm: "http://bookmarks.yahoo.com/toolbar/savebm?opener=tb&u={url}&t={title}&d={text}",
				yahoomail: "http://compose.mail.yahoo.com/?To=&Subject={title}&body={{content}}",
				yammer: "https://www.yammer.com/home/bookmarklet?bookmarklet_pop=1&u={url}&t={title}",
				yardbarker: "http://www.yardbarker.com/author/new/?pUrl={url}&pHead={title}",
				yigg: "http://www.yigg.de/neu?exturl={url}&exttitle={title}&extdesc={text}",
				yoolink: "http://go.yoolink.to/addorshare?url_value={url}&title={title}",
				yorumcuyum: "http://www.yorumcuyum.com/?baslik={title}&link={url}",
				youmob: "http://youmob.com/mobit.aspx?title={title}&mob={url}",
				zakladoknet: "http://zakladok.net/link/?u={url}&t={title}",
				ziczac: "http://ziczac.it/a/segnala/?gurl={url}&gtit={title}"
			};
		this.each(function (e, h) {
			for (var i = b(h), e = 0; e < i.length; e++) {
				var j = i[e];
				if (j.substr(0, f) == c.class_prefix && g[j.substr(f)]) {
					var k = d(j.substr(f));
					a(h).attr("href", k).click(function () {
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
}(jQuery), function () {
	eqShow.shakeTrigger = function (a, b) {
		function c(a) {
			var b = a.accelerationIncludingGravity,
				e = (new Date).getTime();
			if (e - j > 100) {
				var n = parseInt(e - j);
				j = e, f = b.x, g = b.y, h = b.z;
				var o = Math.abs(f + g + h - k - l - m) / n * 1e4;
				o > i && (window.removeEventListener("devicemotion", c, !0), d.sends && d.sends.length && $.each(d.sends, function (a, b) {
					time = setTimeout(function () {
						$.each(b.handles, function (a, b) {
							var c = utilTrigger.getHandleType(b.type).name;
							$.each(b.ids, function (a, b) {
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
}(), function (a) {
	function b(a, b, i) {
		var j = 0,
			k = [0],
			l = "",
			m = null,
			l = i || "UTF8";
		if ("UTF8" !== l && "UTF16" !== l) throw "encoding must be UTF8 or UTF16";
		if ("HEX" === b) {
			if (0 !== a.length % 2) throw "srcString of HEX type must be in byte increments";
			m = d(a), j = m.binLen, k = m.value
		} else if ("ASCII" === b || "TEXT" === b) m = c(a, l), j = m.binLen, k = m.value;
		else {
			if ("B64" !== b) throw "inputFormat must be HEX, TEXT, ASCII, or B64";
			m = e(a), j = m.binLen, k = m.value
		}
		this.getHash = function (a, b, c, d) {
			var e, i = null,
				l = k.slice(),
				m = j;
			if (3 === arguments.length ? "number" != typeof c && (d = c, c = 1) : 2 === arguments.length && (c = 1), c !== parseInt(c, 10) || 1 > c) throw "numRounds must a integer >= 1";
			switch (b) {
				case "HEX":
					i = f;
					break;
				case "B64":
					i = g;
					break;
				default:
					throw "format must be HEX or B64"
			}
			if ("SHA-1" !== a) throw "Chosen SHA variant is not supported";
			for (e = 0; c > e; e++) l = o(l, m), m = 160;
			return i(l, h(d))
		}, this.getHMAC = function (a, b, i, m, n) {
			var p, q, r, s, t = [],
				u = [];
			switch (p = null, m) {
				case "HEX":
					m = f;
					break;
				case "B64":
					m = g;
					break;
				default:
					throw "outputFormat must be HEX or B64"
			}
			if ("SHA-1" !== i) throw "Chosen SHA variant is not supported";
			if (q = 64, s = 160, "HEX" === b) p = d(a), r = p.binLen, p = p.value;
			else if ("ASCII" === b || "TEXT" === b) p = c(a, l), r = p.binLen, p = p.value;
			else {
				if ("B64" !== b) throw "inputFormat must be HEX, TEXT, ASCII, or B64";
				p = e(a), r = p.binLen, p = p.value
			}
			if (a = 8 * q, b = q / 4 - 1, r / 8 > q) {
				if ("SHA-1" !== i) throw "Unexpected error in HMAC implementation";
				p = o(p, r), p[b] &= 4294967040
			} else q > r / 8 && (p[b] &= 4294967040);
			for (q = 0; b >= q; q += 1) t[q] = 909522486 ^ p[q], u[q] = 1549556828 ^ p[q];
			if ("SHA-1" !== i) throw "Unexpected error in HMAC implementation";
			return i = o(u.concat(o(t.concat(k), a + j)), a + s), m(i, h(n))
		}
	}

	function c(a, b) {
		var c, d, e = [],
			f = [],
			g = 0;
		if ("UTF8" === b) for (d = 0; d < a.length; d += 1) for (c = a.charCodeAt(d), f = [], c > 2048 ? (f[0] = 224 | (61440 & c) >>> 12, f[1] = 128 | (4032 & c) >>> 6, f[2] = 128 | 63 & c) : c > 128 ? (f[0] = 192 | (1984 & c) >>> 6, f[1] = 128 | 63 & c) : f[0] = c, c = 0; c < f.length; c += 1) e[g >>> 2] |= f[c] << 24 - g % 4 * 8, g += 1;
		else if ("UTF16" === b) for (d = 0; d < a.length; d += 1) e[g >>> 2] |= a.charCodeAt(d) << 16 - g % 4 * 8, g += 2;
		return {
			value: e,
			binLen: 8 * g
		}
	}

	function d(a) {
		var b, c, d = [],
			e = a.length;
		if (0 !== e % 2) throw "String of HEX type must be in byte increments";
		for (b = 0; e > b; b += 2) {
			if (c = parseInt(a.substr(b, 2), 16), isNaN(c)) throw "String of HEX type contains invalid characters";
			d[b >>> 3] |= c << 24 - b % 8 * 4
		}
		return {
			value: d,
			binLen: 4 * e
		}
	}

	function e(a) {
		var b, c, d, e, f, g = [],
			h = 0;
		if (-1 === a.search(/^[a-zA-Z0-9=+\/]+$/)) throw "Invalid character in base-64 string";
		if (b = a.indexOf("="), a = a.replace(/\=/g, ""), -1 !== b && b < a.length) throw "Invalid '=' found in base-64 string";
		for (c = 0; c < a.length; c += 4) {
			for (f = a.substr(c, 4), d = e = 0; d < f.length; d += 1) b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(f[d]), e |= b << 18 - 6 * d;
			for (d = 0; d < f.length - 1; d += 1) g[h >> 2] |= (e >>> 16 - 8 * d & 255) << 24 - h % 4 * 8, h += 1
		}
		return {
			value: g,
			binLen: 8 * h
		}
	}

	function f(a, b) {
		var c, d, e = "",
			f = 4 * a.length;
		for (c = 0; f > c; c += 1) d = a[c >>> 2] >>> 8 * (3 - c % 4), e += "0123456789abcdef".charAt(d >>> 4 & 15) + "0123456789abcdef".charAt(15 & d);
		return b.outputUpper ? e.toUpperCase() : e
	}

	function g(a, b) {
		var c, d, e, f = "",
			g = 4 * a.length;
		for (c = 0; g > c; c += 3) for (e = (a[c >>> 2] >>> 8 * (3 - c % 4) & 255) << 16 | (a[c + 1 >>> 2] >>> 8 * (3 - (c + 1) % 4) & 255) << 8 | a[c + 2 >>> 2] >>> 8 * (3 - (c + 2) % 4) & 255, d = 0; 4 > d; d += 1) f = 8 * c + 6 * d <= 32 * a.length ? f + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >>> 6 * (3 - d) & 63) : f + b.b64Pad;
		return f
	}

	function h(a) {
		var b = {
			outputUpper: !1,
			b64Pad: "="
		};
		try {
			a.hasOwnProperty("outputUpper") && (b.outputUpper = a.outputUpper), a.hasOwnProperty("b64Pad") && (b.b64Pad = a.b64Pad)
		} catch (c) {
		}
		if ("boolean" != typeof b.outputUpper) throw "Invalid outputUpper formatting option";
		if ("string" != typeof b.b64Pad) throw "Invalid b64Pad formatting option";
		return b
	}

	function i(a, b) {
		return a << b | a >>> 32 - b
	}

	function j(a, b, c) {
		return a ^ b ^ c
	}

	function k(a, b, c) {
		return a & b ^ ~a & c
	}

	function l(a, b, c) {
		return a & b ^ a & c ^ b & c
	}

	function m(a, b) {
		var c = (65535 & a) + (65535 & b);
		return ((a >>> 16) + (b >>> 16) + (c >>> 16) & 65535) << 16 | 65535 & c
	}

	function n(a, b, c, d, e) {
		var f = (65535 & a) + (65535 & b) + (65535 & c) + (65535 & d) + (65535 & e);
		return ((a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (e >>> 16) + (f >>> 16) & 65535) << 16 | 65535 & f
	}

	function o(a, b) {
		var c, d, e, f, g, h, o, p, q, r = [],
			s = k,
			t = j,
			u = l,
			v = i,
			w = m,
			x = n,
			y = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
		for (a[b >>> 5] |= 128 << 24 - b % 32, a[(b + 65 >>> 9 << 4) + 15] = b, q = a.length, o = 0; q > o; o += 16) {
			for (c = y[0], d = y[1], e = y[2], f = y[3], g = y[4], p = 0; 80 > p; p += 1) r[p] = 16 > p ? a[p + o] : v(r[p - 3] ^ r[p - 8] ^ r[p - 14] ^ r[p - 16], 1), h = 20 > p ? x(v(c, 5), s(d, e, f), g, 1518500249, r[p]) : 40 > p ? x(v(c, 5), t(d, e, f), g, 1859775393, r[p]) : 60 > p ? x(v(c, 5), u(d, e, f), g, 2400959708, r[p]) : x(v(c, 5), t(d, e, f), g, 3395469782, r[p]), g = f, f = e, e = v(d, 30), d = c, c = h;
			y[0] = w(c, y[0]), y[1] = w(d, y[1]), y[2] = w(e, y[2]), y[3] = w(f, y[3]), y[4] = w(g, y[4])
		}
		return y
	}

	"function" == typeof define ? define(function () {
		return b
	}) : "undefined" != typeof exports ? "undefined" != typeof module && module.exports ? module.exports = exports = b : exports = b : a.jsSHA = b
}(this), function (a, b) {
	a.completeEffect = function (a) {
		return a.find(".lock").get(0) ? !1 : !0
	}
}(window, jQuery), function () {//特效资源
	window.eqx = {}, window.eqx.money = {
		config: {
			mode: 3,
			effectCallback: "editMoney",
			imageCallback: "countMoney",
			resources: [{
				url: "view/js/countMoney.js",
				type: "js"
			}, {
				url: "assets/images/money/moneybg.png",
				type: "image"
			}, {
				url: "assets/images/money/moremoney.png",
				type: "image"
			}, {
				url: "assets/images/money/flymoney.png",
				type: "image"
			}, {
				url: "assets/images/money/float.png",
				type: "image"
			}, {
				url: "assets/images/money/float2.png",
				type: "image"
			}, {
				url: "assets/images/money/float3.png",
				type: "image"
			}]
		}
	}, window.eqx.snowFly = {
		config: {
			mode: 4,
			effectCallback: "flyAction",
			resources: [{
				url: "view/js/effect/snoweffect.js",
				type: "js"
			}, {
				url:"view/js/effect/threecanvas.js",
				type: "js"
			}]
		}
	}, window.eqx.rainyDay = {
		config: {
			mode: 4,
			effectCallback: "rainyEffect",
			resources: [{
				url: "view/js/effect/rainyday.js",
				type: "js"
			}, {
				url: "view/js/effect/rainyeffect.js",
				type: "js"
			}]
		}
	}, window.eqx.fireWorks = {
		config: {
			mode: 4,
			effectCallback: "fireWorks",
			resources: [{
				url: "view/js/effect/fireworks.js",
				type: "js"
			}]
		}
	}
}(), function () {//加载资源（js、css）
	function a(a) {
		resources.loaded = !0, a instanceof Array ? a.forEach(function (a) {
			b(a)
		}) : b(a)
	}

	function b(a) {
		if ("loading" != f[a.url]) {
			if (f[a.url]) return f[a.url];
			if (f[a.url] = !1, "image" == a.type) {
				var b = new Image;
				f[a.url] = "loading", b.onload = function () {
					f[a.url] = b, d() && g.forEach(function (a) {
						a()
					})
				}, b.src = a.url
			} else {
				"js" == a.type && (f[a.url] = "loading", $.getScript(a.url, function (b, c, e) {
					f[a.url] = !0, d() && g.forEach(function (a) {
						a()
					})
				}))
			}
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
}(), function (a, b) {//翻书翻页方式
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
		b ? (c = a.x, d = a.y) : B ? (c = r.x - n.offset().left, d = r.y - n.offset().top) : (c = a.pageX - n.offset().left, d = a.pageY - n.offset().top), t ? (F = 16, e = -n.width(), g = n.height(), C = setInterval(function () {
			c = F >= c - e ? c : c - F, d = F >= g - d ? d : d + F, f({
				x: c,
				y: d
			}), F >= c - e && F >= g - d && (clearInterval(C), h())
		}, 10)) : u ? (F = 16, e = -n.width(), g = 0, C = setInterval(function () {
			c = F >= c - e ? c : c - F, d = F >= d - g ? d : d - F, f({
				x: c,
				y: d
			}), F >= c - e && F >= d - g && (clearInterval(C), h())
		}, 1)) : v ? (F = 5, e = -n.width(), C = setInterval(function () {
			c = F >= c - e ? c : c - F, f({
				x: c,
				y: d
			}), F >= c - e && (clearInterval(C), h())
		}, 1)) : w && (F = 3, e = n.width(), g = 0, C = setInterval(function () {
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
		a[e - 1].elements && a[e - 1].elements.length && b.each(a[e - 1].elements, function (a, c) {
			"d" == c.type && eqShow.getShowCount(W.obj.id).then(function (a) {
				var d = eqShow.fixedNum(a);
				b("#" + c.id).find(".counter-number").text(d)
			})
		}), $ || eqShow.showProgressBar(W, b("#nr").find(".main-page")), $ = !0
	}

	function i(a) {
		if (a) {
			var c = b(a).find(".m-img").attr("id").substring(4);
			b(a).find("li").each(function (a) {
				for (var d = 0; d < W.list[c - 1].elements.length; d++) {
					W.list[c - 1].elements[d].id == parseInt(b(this).attr("id").substring(7), 10) && eqxCommon.animation(b(this), W.list[c - 1].elements[d], "view")
				}
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
		}, w = !0, C = setInterval(function () {
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
		}, B && p ? v = !0 : t = !0, Y = setInterval(function () {
			r.x -= 5, r.y -= 5, d(r, "mock"), r.x <= 200 && (clearInterval(Y), e(r, "mock"), A || z || m())
		}, 1))
	}

	function l() {
		_ = setInterval(function () {
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
	a.turnBook = function (a) {
		W = a, W.obj.property.autoFlip && W.obj.property.autoFlipTime && (X = W.obj.property.autoFlipTime, l()), A = W.obj.property.triggerLoop, b('<div class="turning"></div>').appendTo(".nr"), b(".main-page").css({
			width: b(".nr").width() + "px",
			height: b(".nr").height() + "px"
		}), n.on(B ? "touchstart" : "mousedown", function (a) {
			"feeling" == E && (c(a), b(".main-page").css({
				width: n.width() + "px",
				height: n.height() + "px"
			}))
		}).on(B ? "touchmove" : "mousemove", function (a) {
			("started" == E || "turning" == E) && d(a)
		}).on(B ? "touchend" : "mouseup mouseleave", function (a) {
			return Z = !1, b(".z-current").get(0) ? 0 == s ? (x = !0, void(E = "feeling")) : void("turning" == E && e(a)) : void 0
		})
	};
	var $ = !1;
	a.flipBookScroll = function (a) {
		Z = !0;
		for (var c, d = 0, e = W.list.length; e > d; d++) {
			a == W.list[d].id && (c = W.list[d].num);
		}
		c || (c = a), y = b(".z-current").get(0);
		var f = b(y).find(".m-img").attr("id").substring(4),
			g = b(y).parent(".flip-mask").siblings(".flip-mask").find(".main-page").find("#page" + c);
		g && (z = b(g).parent(".main-page").get(0), f > c ? j() : c > f && k())
	}, b(document).on("bookFlipPre", function (a) {
		j()
	}), b(document).on("bookFlipNext", function (a) {
		k()
	});
	var _
}(window, jQuery);
var eqxiu = function () {
	function a(a) {
		if ("10" != m._scrollMode) {
			B = !0;
			for (var d, e = 0, f = m._pageData.length; f > e; e++) {
				a == m._pageData[e].id && (d = m._pageData[e].num);
			}
			d || (d = a);
			var g = $(m.$currentPage).find(".m-img").attr("id").substring(4),
				h = $(m.$currentPage).siblings(".main-page").find("#page" + d);
			if (!h) return;
			m.$activePage = $(h).parent(".main-page").get(0), g > d ? b() : d > g && c()
		} else {
			flipBookScroll(a)
		}
	}

	function b(a) {
		//向上翻页按钮按钮 链接控制
		if(this._pageData != undefined){
			var qa = $(".z-active").get(0) ? $(".z-active").get(0) : $(".z-current").get(0);
			var page = parseInt($(qa).find(".m-img").attr("id").substring(4));
			var currentData = this._pageData[page-1].elements;
			for(var i = 0; i<currentData.length; i++){
				var allnum = currentData[i].properties.url;
				if(currentData[i].properties && currentData[i].properties.url){
					if(!isNaN(allnum)){
						return !1;
					}
				}else if(currentData[i].content && currentData[i].content.indexOf("data=") > 0){
					return !1;
				}
			}
		}
		if (!(v && 2 == a || w && 1 == a)) {
			if ("10" != m._scrollMode) {
				var b = 0;
				n();
				var c = setInterval(function () {
					b += 2;
					if("0" == m._scrollMode || "1" == m._scrollMode || "2" == m._scrollMode || "6" == m._scrollMode || "7" == m._scrollMode || "8" == m._scrollMode || "11" == m._scrollMode || "12" == m._scrollMode){
						H = b;
					}else if("3" == m._scrollMode || "4" == m._scrollMode || "5" == m._scrollMode || "9" == m._scrollMode){
						G = b;
					}
					o();
					b >= 21 && (clearInterval(c), p());
				}, 1)
			} else {
				$(document).trigger("bookFlipPre")
			}
		}
	}

	function c(a) {
		//向下翻页按钮 链接控制
		if(this._pageData != undefined){
			var qa = $(".z-active").get(0) ? $(".z-active").get(0) : $(".z-current").get(0);
			var page = parseInt($(qa).find(".m-img").attr("id").substring(4));
			var currentData = this._pageData[page-1].elements;
			for(var i = 0; i<currentData.length; i++){
				var allnum = currentData[i].properties.url;
				if(currentData[i].properties && currentData[i].properties.url){
					if(!isNaN(allnum)){
						return !1;
					}
				}else if(currentData[i].content && currentData[i].content.indexOf("data=") > 0){
					return !1;
				}
			}
		}
		if (!(v && 2 == a || w && 1 == a)) {
			if ("10" != m._scrollMode) {
				t = !1;
				var b = 0;
				n();
				var c = setInterval(function () {
					b -= 2;
					if("0" == m._scrollMode || "1" == m._scrollMode || "2" == m._scrollMode || "6" == m._scrollMode || "7" == m._scrollMode || "8" == m._scrollMode || "11" == m._scrollMode || "12" == m._scrollMode){
						H = b;
					}else if("3" == m._scrollMode || "4" == m._scrollMode || "5" == m._scrollMode || "9" == m._scrollMode){
						G = b;
					}
					o();
					-21 >= b && (clearInterval(c), p(), A || m.$activePage || clearInterval(y));
				}, 1)
			} else {
				$(document).trigger("bookFlipNext")
			}
		}
	}

	function d() {
		y = setInterval(function () {
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
		N = function (a, b, c, e) {
			function f(a, b, c) {
				for (var d = ["", "webkit", "moz"], e = 0, f = d.length; f > e; e++) {
					0 != e || mobilecheck() || (b = b.substring(0, 1).toLowerCase() + b.substring(1, b.length));
					var g = c instanceof Array ? c[e] : c,
						h = d[e] + b;
					a[h] = g
				}
			}

			function g(a, b, c) {
				for (var d = ["", "-webkit-", "-moz-"], e = 0; e < d.length; e++) {
					a.css(d[e] + b, c)
				}
			}

			function h(a) {
				var b;
				return b = $("#inside_" + a, ".phone-view").length ? $("#inside_" + a, ".phone-view") : $("#inside_" + a)
			}

			function i() {
				m._isDisableFlipPage = !0;
				var a;
				if("0" == b || "1" == b || "2" == b || "6" == b || "9" == b || "11" == b || "12" == b){
					a = H > 0 ? -s : s;
					g($(m.$activePage), "transform", "translateY(" + a + "px)");
					g($(m.$currentPage), "transform", "translateY(0) scale(1)");
				}else if("3" == b || "5" == b){
					a = G > 0 ? -r : r;
					g($(m.$activePage), "transform", "translateX(" + a + "px)");
					g($(m.$currentPage), "transform", "translateX(0) scale(1)");
				}
				setTimeout(function() {
					$(m.$currentPage).attr("style", "");
					$(m.$activePage).attr("style", "");
					$(m.$activePage).removeClass("z-active z-move");
					m._isDisableFlipPage = !1;

				}, 500)
			}

			function j() {
				if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) {
					if (H > 0) {
						if (m._isDisableFlipPrevPage) return;
						J || K ? (J = !1, K = !1, Z(!0), _(!0, "bottom center", "translateY", s)) : aa(!0, "translateY", s, H, m._scrollMode)
					} else if (0 > H) {
						if (m._isDisableFlipNextPage) return;
						!J || K ? (J = !0, K = !1, Z(!1), _(!1, "top center", "translateY", s)) : aa(!1, "translateY", s, H, m._scrollMode)
					}
				}
			}

			function k() {
				Math.abs(H) > Math.abs(G) && Math.abs(H) > 20 ? (ba("translateY", H, s, m._scrollMode), $(document).trigger("flipend")) : (m._isDisableFlipPage = !1, i())
			}

			function l() {
				if (Math.abs(G) > Math.abs(H) && completeEffect($(m.$currentPage))) {
					if (G > 0) {
						if (m._isDisableFlipPrevPage) return;
						if(J || K){
							J = !1;
							K = !1;
							Z(!0);
							_(!0, "center right", "translateX", r)

						}else{
							aa(!0, "translateX", r, G, m._scrollMode);
						}
					} else if (0 > G) {
						if (m._isDisableFlipNextPage) return;
						if(!J || K){
							J = !0;
							K = !1;
							Z(!1);
							_(!1, "center left", "translateX", r);

						}else{
							aa(!1, "translateX", r, G, m._scrollMode);
						}
					}
				}
			}

			function q() {
				if(Math.abs(G) > Math.abs(H) && Math.abs(G) > 20){
					ba("translateX", G, r, m._scrollMode);
					$(document).trigger("flipend");
				}else{
					m._isDisableFlipPage = !1;
					i();
				}
			}

			function t() {
				if (Math.abs(G) > Math.abs(H) && completeEffect($(m.$currentPage))) {
					if (G > 0) {
						if (m._isDisableFlipPrevPage) return;
						if(J || K){
							J = !1;
							K = !1;
							Z(!0);
							r = C ? window.innerWidth : $(".nr").width();
							_(!0, "", "translateX", r);
						}else{
							aa(!0, "translateX", r, G, m._scrollMode);
						}
					} else if (0 > G) {
						if (m._isDisableFlipNextPage) return;
						if(!J || K){
							J = !0;
							K = !1;
							Z(!1);
							r = C ? window.innerWidth : $(".nr").width();
							_(!1, "", "translateX", r);
						}else{
							aa(!1, "translateX", r, G, m._scrollMode);
						}
					}
				}
			}

			function y() {
				if(Math.abs(G) > Math.abs(H) && Math.abs(G) > 20){
					ba("translateX", G, r, m._scrollMode);
					$(document).trigger("flipend");
				}else{
					m._isDisableFlipPage = !1;
					i();
				}
			}

			function N() {
				if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) {
					if (H > 0) {
						if (m._isDisableFlipPrevPage) return;
						if(J || K){
							J = !1;
							K = !1;
							Z(!0);
							s = C ? window.innerHeight : $(".nr").height();
							_(!0, "", "translateY", s);
						}else{
							aa(!0, "translateY", s, H, m._scrollMode);
						}
					} else if (0 > H) {
						if (m._isDisableFlipNextPage) return;
						if(!J || K){
							J = !0;
							K = !1;
							Z(!1);
							s = C ? window.innerHeight : $(".nr").height();
							_(!1, "", "translateY", s);

						}else{
							aa(!1, "translateY", s, H, m._scrollMode);
						}
					}
				}
			}

			function O() {
				if(Math.abs(H) > Math.abs(G) && Math.abs(H) > 20){
					ba("translateY", H, s, m._scrollMode);
					$(document).trigger("flipend");
				}else{
					m._isDisableFlipPage = !1;
					i();
				}
			}

			function P() {
				if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) {
					if (H > 0) {
						if (m._isDisableFlipNextPage) return;
						if(!J || K){
							J = !0;
							K = !1;
							m.$activePage && $(m.$activePage).removeClass("z-move z-active");
							Z(!0);
							f(m.$activePage.style, "Transform", "rotateX(90deg) translateY(-" + s / 2 + "px) translateZ(" + s / 2 + "px)");
							f(ca.get(0).style, "Perspective", "700px");
							f(ca.get(0).style, "TransformStyle", "preserve-3d");
						}
						if(m.$activePage && m.$activePage.classList.contains("main-page")){
							$(m.$activePage).addClass("z-active z-move").trigger("active").css("zIndex", 1);
							f(m.$currentPage.style, "Transform", "rotateX(-" + H / s * 90 + "deg) translateY(" + H / 2 + "px) translateZ(" + H / 2 + "px)");
							f(m.$activePage.style, "Transform", "rotateX(" + (90 - H / s * 90) + "deg) translateY(" + (-(s / 2) + H / 2) + "px) translateZ(" + (s / 2 - H / 2) + "px)");
						}
					} else if (0 > H) {
						if (m._isDisableFlipNextPage) return;
						if(!J || K){
							J = !0;
							K = !1;
							m.$activePage && $(m.$activePage).removeClass("z-move z-active");
							Z(!1);
							f(m.$activePage.style, "Transform", "rotateX(-90deg) translateY(-" + s / 2 + "px) translateZ(-" + s / 2 + "px)");
							f(ca.get(0).style, "Perspective", "700px"), f(ca.get(0).style, "TransformStyle", "preserve-3d");
						}
						if(m.$activePage && m.$activePage.classList.contains("main-page")){
							$(m.$activePage).addClass("z-active z-move").trigger("active").css("zIndex", 0);
							f(m.$currentPage.style, "Transform", "rotateX(" + -H / s * 90 + "deg) translateY(" + H / 2 + "px) translateZ(" + -H / 2 + "px)");
							f(m.$activePage.style, "Transform", "rotateX(" + (-90 - H / s * 90) + "deg) translateY(" + (s / 2 + H / 2) + "px) translateZ(" + (s / 2 + H / 2) + "px)");
						}else{
							f(m.$currentPage.style, "Transform", "translateX(0px) scale(1)");
							m.$activePage = null;
						}
					}
				}
			}

			function Q() {
				if(Math.abs(H) > Math.abs(G) && Math.abs(H) > 20){
					H > 0 ? f(m.$currentPage.style, "Transform", "rotateX(-90deg) translateY(" + s / 2 + "px) translateZ(" + s / 2 + "px)") : f(m.$currentPage.style, "Transform", "rotateX(90deg) translateY(-" + s / 2 + "px) translateZ(" + s / 2 + "px)");
					f(m.$currentPage.style, "zIndex", "0");
					f(m.$activePage.style, "Transform", "rotateX(0deg) translateY(0px) translateZ(0px)");
					f(m.$activePage.style, "zIndex", "2");
					$(document).trigger("flipend");
				}else{
					f(m.$currentPage.style, "Transition", "none");
					f(m.$activePage.style, "Transition", "none");
					m._isDisableFlipPage = !1;
					i();
				}
			}

			function R() {
				if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) {
					if (H > 0) {
						if (m._isDisableFlipNextPage) return;
						if(!J || K){
							J = !0;
							K = !1;
							m.$activePage && $(m.$activePage).removeClass("z-move z-active");
							Z(!0);
							g(ca, "perspective", "700px");
							g(ca, "transform-style", "preserve-3d");
							f(m.$activePage.style, "TransformOrigin", "top");
							f(m.$activePage.style, "Transform", "rotateX(90deg)");

						}
						if(m.$activePage && m.$activePage.classList.contains("main-page")){
							$(m.$activePage).addClass("z-active z-move").trigger("active");
							f(m.$activePage.style, "Transform", "rotateX(" + (90 - H / s * 90) + "deg) ");

						}
					} else if (0 > H) {
						if (m._isDisableFlipNextPage) return;
						if(!J || K){
							J = !0;
							K = !1;
							m.$activePage && $(m.$activePage).removeClass("z-move z-active");
							Z(!1);
							f(m.$activePage.style, "TransformOrigin", "bottom");
							f(m.$activePage.style, "Transform", "rotateX(-90deg)");
							g(ca, "perspective", "700px");
							g(ca, "transform-style", "preserve-3d");

						}
						if(m.$activePage && m.$activePage.classList.contains("main-page")){
							$(m.$activePage).addClass("z-active z-move").trigger("active");
							f(m.$activePage.style, "Transform", "rotateX(" + (-90 - H / s * 90) + "deg) ");

						}else{
							f(m.$currentPage.style, "Transform", "translateX(0px) scale(1)");
							m.$activePage = null;
						}
					}
				}
			}

			function S() {
				if(Math.abs(H) > Math.abs(G) && Math.abs(H) > 20){
					H > 0 ? f(m.$activePage.style, "Transform", "rotateX(0deg)") : f(m.$activePage.style, "Transform", "rotateX(0deg)");
					$(document).trigger("flipend");
				}else{
					f(m.$currentPage.style, "Transition", "none");
					f(m.$activePage.style, "Transition", "none");
					m._isDisableFlipPage = !1;
					i();
				}
			}

			function T() {
				if (Math.abs(H) > Math.abs(G) && completeEffect($(m.$currentPage))) {
					if (H > 0) {
						if (m._isDisableFlipPrevPage) return;
						if(J || K){
							J = !1;
							K = !1;
							m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move"));
							Z(!0);
							m.$activePage.style.zIndex = 2;

							if(m.$activePage && m.$activePage.classList.contains("main-page")){
								m.$activePage.classList.add("z-active");
								m.$activePage.classList.add("z-move");
							}

							m.$activePage.style.opacity = 0;

						}
					} else if (0 > H) {
						if (m._isDisableFlipNextPage) return;
						if(!J || K){
							J = !0;
							K = !1;
							m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move"));
							Z(!1);
							m.$activePage.style.zIndex = 2;

							if(m.$activePage && m.$activePage.classList.contains("main-page")){
								m.$activePage.classList.add("z-active");
								m.$activePage.classList.add("z-move");
							}

							m.$activePage.style.opacity = 0
						}
					}
					var a = Math.abs(H) / s * 1.3;
					m.$activePage.style.opacity = a.toFixed(1), a.toFixed(3) <= 1 && g($(m.$activePage), "transform", "scale(" + a.toFixed(3) + ")")
				}
			}

			function U() {
				Math.abs(H) > Math.abs(G) && Math.abs(H) > 20 ? (g($(m.$activePage), "transform", "scale(1)"), m.$activePage.style.opacity = 1, $(document).trigger("flipend")) : (f(m.$currentPage.style, "Transition", "none"), f(m.$activePage.style, "Transition", "none"), m._isDisableFlipPage = !1, i())
			}

			function V() {
				if (Math.abs(G) > Math.abs(H) && completeEffect($(m.$currentPage))){
					if (G > 0) {
						if (m._isDisableFlipPrevPage) return;
						if(J || K){
							J = !1;
							K = !1;
							m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move"));
							Z(!0);

							if(m.$activePage && m.$activePage.classList.contains("main-page")){
								m.$activePage.classList.add("z-active");
								m.$activePage.classList.add("z-move");
								g($(m.$activePage), "Transform", "scale(0.3) translateX(0) translateZ(-" + s + "px) rotateY(45deg)");
								m.$activePage.style.zIndex = "0";
							}

							g(ca, "perspective", "1000px");
							m.$currentPage.style.zIndex = "100";

						}else{
							if(m.$activePage){
								if(r / 4 >= G){
									g($(m.$currentPage), "Transform", "translateX(" + G + "px)");
								}else{
									g($(m.$currentPage), "Transform", "translateX(" + 1.5 * G + "px) scale(" + ((5 * r / 4 - G) / r).toFixed(3) + ") rotateY(" + G / r * 45 + "deg) translateZ(-" + (G - r / 4) + "px)");
								}
							}
						}
					} else if (0 > G) {
						if (m._isDisableFlipNextPage) return;
						if(!J || K){
							J = !0;
							K = !1;
							m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move"));
							Z(!1);

							if(m.$activePage && m.$activePage.classList.contains("main-page")){
								m.$activePage.classList.add("z-active");
								m.$activePage.classList.add("z-move");
								g($(m.$activePage), "Transform", "scale(0.3) translateX(" + (r + 300) + "px) translateZ(-" + s + "px) rotateY(-45deg)");
								m.$activePage.style.zIndex = "0";
							}

							g(ca, "perspective", "1000px");
							m.$currentPage.style.zIndex = "100";

						}else{
							if(m.$activePage){
								if(G >= -r / 4){
									g($(m.$currentPage), "Transform", "translateX(" + G + "px)")
								}else{
									g($(m.$currentPage), "Transform", "translateX(" + 1.5 * G + "px) scale(" + ((5 * r / 4 + G) / r).toFixed(3) + ") rotateY(" + G / r * 45 + "deg) translateZ(" + (G + r / 4) + "px)");
								}

								g($(m.$activePage), "Transform", "scale(" + (.3 - (G + r / 4) / r).toFixed(3) + ") translateX(" + (-G - r / 4 + 200) + "px) translateZ(" + (-G - 3 * r / 4) + "px) rotateY(-" + (45 + (G + r / 4) / r * 45) + "deg)");
							}
						}
					}
				}
			}

			function W() {
				if(Math.abs(G) > Math.abs(H) && Math.abs(G) > 20){
					if(G > 0){
						m.$currentPage.style.webkitTransformOrigin = "left";
						m.$currentPage.style.webkitTransform = "translateX(0) translateZ(-" + s + "px) rotateY(0) scale(0.2)";
						m.$activePage.style.webkitTransform = "translateX(0) translateZ(0) rotateY(0) scale(1)";
						m.$currentPage.style.zIndex = "0";
						m.$activePage.style.zIndex = "1";

					}else{
						m.$currentPage.style.webkitTransformOrigin = "right";
						m.$currentPage.style.webkitTransform = "translateX(" + r + "px) translateZ(-" + s + "px) rotateY(0) scale(0.2)";
						m.$activePage.style.webkitTransform = "translateX(0) translateZ(0) rotateY(0) scale(1)";
						m.$activePage.style.zIndex = "1";
						m.$currentPage.style.zIndex = "0";
					}
					$(document).trigger("flipend");
				}else{
					f(m.$currentPage.style, "Transition", "none");
					f(m.$activePage.style, "Transition", "none");
					m._isDisableFlipPage = !1;
					i();

				}
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
				if(Math.abs(H) > Math.abs(G) && Math.abs(H) > 20){
					g($(m.$currentPage), "transform", "translateY(" + s + "px) rotate(" + Math.abs(H) / s * 90 + "deg)");
					$(m.$currentPage).css({
						opacity: .5
					});
					$(document).trigger("flipend");
				}else{
					f(m.$currentPage.style, "Transition", "none");
					f(m.$activePage.style, "Transition", "none");
					m._isDisableFlipPage = !1;
					i();
				}
			}

			function Z(a) {
				if(!B){
					if(a){
						if(m.$currentPage.previousElementSibling && m.$currentPage.previousElementSibling.classList.contains("main-page")){
							m.$activePage = m.$currentPage.previousElementSibling;
						}else{
							A ? m.$activePage = m._$pages.last().get(0) : m.$activePage = !1;
						}
					}else{
						if(m.$currentPage.nextElementSibling && m.$currentPage.nextElementSibling.classList.contains("main-page")){
							m.$activePage = m.$currentPage.nextElementSibling;
						}else{
							A ? m.$activePage = m._$pages.first().get(0) : m.$activePage = !1;
						}
					}
				}
			}

			function _(a, b, c, d) {
				m.$activePage && (m.$activePage.classList.remove("z-active"), m.$activePage.classList.remove("z-move"));
				if (m.$activePage && m.$activePage.classList.contains("main-page")) {
					m.$activePage.classList.add("z-active"), m.$activePage.classList.add("z-move");
					var e = a ? "-" : "";
					m.$activePage.style.webkitTransition = "none";
					m.$activePage.style.webkitTransform = c + "(" + e + d + "px)";
					m.$activePage.style.mozTransition = "none";
					m.$activePage.style.mozTransform = c + "(" + e + d + "px)";
					m.$activePage.style.transition = "none";
					m.$activePage.style.transform = c + "(" + e + d + "px)";
					$(m.$activePage).trigger("active");
					b && g($(m.$currentPage), "transform-origin", b);
				} else {
					f(m.$currentPage.style, "Transform", c + "(0px) scale(1)")
				}
			}

			function aa(a, b, c, d, e) {
				if (m.$activePage) {
					var f = a ? "-" : "";
					g($(m.$activePage), "transform", b + "(" + f + (c - Math.abs(d)) + "px)");
					"1" == e || "3" == e ? g($(m.$currentPage), "transform", "scale(" + ((c - Math.abs(d)) / s).toFixed(3) + ")") : ("5" == e || "11" == e) && g($(m.$currentPage), "transform", b + "(" + d + "px)")
				}
			}

			function ba(a, b, c, d) {
				if ("1" == d || "3" == d) {
					g($(m.$currentPage), "transform", "scale(0.2)");
				}else if ("5" == d || "11" == d) {
					var e = b > 0 ? "" : "-";
					g($(m.$currentPage), "transform", a + "(" + e + c + "px)")
				} else {
					g($(m.$currentPage), "transform", "scale(1)");
				}
				g($(m.$activePage), "transform", a + "(0px)");


				var nowPage = m.$activePage.firstElementChild.getAttribute('id');
				console.log(nowPage);
				//到达最后一页
				if (nowPage === ('page' + tplCount)) {
					doQuit("completed");
					console.log('SCORM标准完毕');
				}

				//修改开始
			}
			function playPageMusic(){//播放当页音乐
				//修改开始
				//nowPage的不足，第一遍循环获取是从2开始的
				var nowPage = m.$activePage.firstElementChild.getAttribute('id');

				var pageNum = parseInt(nowPage.substr(4));

				if (pageNum == 1) {
					if(pageMusics[0]){
						aud.setAttribute('src', pageMusics[0].url.substr(0,5) == "index" ? pageMusics[0].url.split('index.php')[1] :(pageMusics[0].url))
					}else{
						aud.setAttribute('src', "");
					}
					document.getElementById('pageMusic').play();
				} else {
					if(pageMusics[pageNum]){
						aud.setAttribute('src', pageMusics[pageNum].url.substr(0,5) == "index" ? pageMusics[pageNum].url.split('index.php')[1] :(pageMusics[pageNum].url));
					}else{
						aud.setAttribute('src', "");
					}
					document.getElementById('pageMusic').play();
				}
				document.getElementById("pageMusic").play();
				//修改结束
			}
			this._$app = a;
			this._$pages = this._$app.find(".main-page");
			this.$currentPage = this._$pages.eq(0);
			this.$activePage = null;
			this._isInitComplete = !1;
			this._isDisableFlipPage = !1;
			this._isDisableFlipPrevPage = !1;
			this._isDisableFlipNextPage = !1;
			this._scrollMode = b;
			this._pageData = c;
			this.pageData = e;
			b = b, m = this;
			r = C || D ? window.innerWidth : a.width();
			s = C || D ? window.innerHeight : a.height();

			var ca = $("#con"),
				da = !1;

			var isAllowToScroll, currentIndex, currentData;

			function isAllowToScroll(index){
				currentIndex = index - 1;
				currentData = c[currentIndex].elements;
				for(var i = 0; i<currentData.length; i++){
					var allnum = currentData[i].properties.url;
					if(currentData[i].properties && currentData[i].properties.url){
						if(!isNaN(allnum)){
							return !1;
						}
					}else if(currentData[i].content && currentData[i].content.indexOf("data=") > 0){
						return !1;
					}
				}
				return !0;
			}
			
			 ("8" == b || "9" == b) && (M = .7, L = 800);
			0 == b || 1 == b || 2 == b || 6 == b || 7 == b || 8 == b || 11 == b || 12 == b ? w = !0 : (3 == b || 4 == b || 5 == b || 10 == b) && (v = !0);
			if(w){
				x = $(".ctrl_panel_dir .ctrl-down");
				$nextCtrl = $(".ctrl_panel_dir .ctrl-up");
			}else if(v){
				x = $(".ctrl_panel_dir .ctrl-right");
				$nextCtrl = $(".ctrl_panel_dir .ctrl-left");
			}
			e.obj.property.hasOwnProperty("triggerLoop") || (e.obj.property.triggerLoop = !0);
			A = e.obj.property.triggerLoop;
			e.obj.property.autoFlip && (u = 1e3 * e.obj.property.autoFlipTime, d());
			if (c[0].elements && c[0].elements.length) {
				for (var ea = 0; ea < c[0].elements.length; ea++) {
					eqShow.shakeTrigger(c, m.$currentPage);
					var fa = h(c[0].elements[ea].id);
					eqxCommon.bindTrigger(fa, c[0].elements[ea])
				}
			}
			!
			function () {
				z.on("scroll.elasticity", function (a) {
					a.preventDefault()
				}).on("touchmove.elasticity", function (a) {
					a.preventDefault()
				}), z.delegate("img", "mousemove", function (a) {
					a.preventDefault()
				})
			}();

			if("10" != b){
				var index, isAllow;
				m._$app.on("mousedown touchstart", function(a) {
					index = $(m.$currentPage).find(".m-img").attr("id").slice(4);
					isAllow = isAllowToScroll(index);
					isAllow && n(a)
				}).on("mousemove touchmove", function(a) {
					isAllow && o(a)
				}).on("mouseup touchend mouseleave", function(a) {
					isAllow && p(a)
				})
			}else{
				turnBook(e);//翻书翻页方式
			}

			n = function (a) {
				da = !1;
				C && a && (a = event);

				if(!m._isDisableFlipPage){
					m.$currentPage = m._$pages.filter(".z-current").get(0);
					B || (m.$activePage = null);
					if(m.$currentPage && completeEffect($(m.$currentPage))){
						I = !0; 
						J = !1; 
						K = !0; 
						G = 0; 
						H = 0; 
						a && "mousedown" == a.type ? (E = a.pageX, F = a.pageY) : a && "touchstart" == a.type && (E = a.touches ? a.touches[0].pageX : a.originalEvent.touches[0].pageX, F = a.touches ? a.touches[0].pageY : a.originalEvent.touches[0].pageY);
						m.$currentPage.classList.add("z-move");
						f(m.$currentPage.style, "Transition", "none");
						"12" == m._scrollMode && (m.$currentPage.style.zIndex = 3);
					}
				}
			}, o = function (a) {
				if (C && a && (a = event), I && m._$pages.length > 1) {
					if(a && "mousemove" == a.type){
						G = a.pageX - E, H = a.pageY - F
					}else{
						if(a && "touchmove" == a.type){
							G = (a.touches ? a.touches[0].pageX : a.originalEvent.touches[0].pageX) - E;
							H = (a.touches ? a.touches[0].pageY : a.originalEvent.touches[0].pageY) - F;
						}
					}
					if (!da && (Math.abs(G) > 20 || Math.abs(H) > 20)) {
						if (m.$activePage) {
							var b = $(m.$activePage).find(".m-img").attr("id").substring(4);
							$(m.$activePage).find("li").each(function (a) {
								for (var c = 0; c < m._pageData[b - 1].elements.length; c++) {
									if (m._pageData[b - 1].elements[c].id == parseInt($(this).attr("id").substring(7), 10)) {
										eqxCommon.animation($(this), m._pageData[b - 1].elements[c], "view");
										var d = h(m._pageData[b - 1].elements[c].id);
										eqxCommon.bindTrigger(d, m._pageData[b - 1].elements[c])
									}
								}
							})
						}
						da = !0
					}

					if("0" == m._scrollMode || "2" == m._scrollMode || "1" == m._scrollMode){
						j();
					}else if("4" == m._scrollMode || "3" == m._scrollMode){
						l();
					}else if("5" == m._scrollMode){
						t();
					}else if("6" == m._scrollMode){
						P();
					}else if("7" == m._scrollMode){
						R();
					}else if("8" == m._scrollMode){
						T();
					}else if("9" == m._scrollMode){
						V();
					}else if("11" == m._scrollMode){
						N();
					}else if("12" == m._scrollMode){
						X();
					}
				}
			}, p = function (a) {
				if (I && completeEffect($(m.$currentPage))) {
					if (I = !1, m.$activePage) {
						m._isDisableFlipPage = !0;
						var b;
						/*b = "6" == m._scrollMode || "7" == m._scrollMode ? "cubic-bezier(0,0,0.99,1)" : "12" == m._scrollMode ? "cubic-bezier(.17,.67,.87,.13)" : "linear";*/
						if("6" == m._scrollMode || "7" == m._scrollMode){
							b = "cubic-bezier(0,0,0.99,1)"
						}else if("12" == m._scrollMode){
							b = "cubic-bezier(.17,.67,.87,.13)"
						}else{
							b = "linear";
						}
						m.$currentPage.style.webkitTransition = "-webkit-transform " + M + "s " + b;
						m.$activePage.style.webkitTransition = "-webkit-transform " + M + "s " + b;
						m.$currentPage.style.mozTransition = "-moz-transform " + M + "s " + b;
						m.$activePage.style.mozTransition = "-moz-transform " + M + "s " + b;
						m.$currentPage.style.transition = "transform " + M + "s " + b;
						m.$activePage.style.transition = "transform " + M + "s " + b;

						/*"0" == m._scrollMode || "2" == m._scrollMode || "1" == m._scrollMode ? k() : "4" == m._scrollMode || "3" == m._scrollMode ? q() : "5" == m._scrollMode ? y() : "6" == m._scrollMode ? Q() : "7" == m._scrollMode ? S() : "8" == m._scrollMode ? U() : "9" == m._scrollMode ? W() : "11" == m._scrollMode ? O() : "12" == m._scrollMode && Y();*/
						if("0" == m._scrollMode || "1" == m._scrollMode || "2" == m._scrollMode){
							k();
						}else if("3" == m._scrollMode || "4" == m._scrollMode){
							q();
						}else if("5" == m._scrollMode){
							y();
						}else if("6" == m._scrollMode){
							Q();
						}else if("7" == m._scrollMode){
							S();
						}else if("8" == m._scrollMode){
							U();
						}else if("9" == m._scrollMode){
							W();
						}else if("11" == m._scrollMode){
							O();
						}else if("12" == m._scrollMode){
							Y();
						}
						playPageMusic();
					} else {
						m.$currentPage.classList.remove("z-move");
					}
				}
				B = !1
			};
			$(document).on("flipend", function (a) {
				completeEffect($(m.$activePage)) || $("#audio_btn").css("opacity", 0);
				var d = $("#report0"),
					g = $(m.$activePage).find(".m-img").attr("id").substring(4);
				c = m._pageData, c[g - 1].elements && c[g - 1].elements.length && $.each(c[g - 1].elements, function (a, b) {
					"d" == b.type && eqShow.getShowCount(e.obj.id).then(function (a) {
						var c = eqShow.fixedNum(a);
						$("#" + b.id).find(".counter-number").text(c)
					})
				}), setTimeout(function () {
					f(m.$currentPage.style, "Transition", "none");
					$(m.$activePage).removeClass("z-active z-move").addClass("z-current");
					$(m.$currentPage).removeClass("z-current z-move");
					m._isDisableFlipPage = !1;
					m.$currentPage = $(m.$activePage).trigger("current");
					$(m.$currentPage).trigger("hide");
					utilSound.pause();
					d.length && d.remove();
					("8" == b || "9" == b || "12" == b) && ($(m.$currentPage).css("z-index", "1"), $(".main-page").attr("style", ""));
					eqShow.shakeTrigger(c, m.$currentPage);
					A || (1 == g ? x.removeClass("enabled") : g == m._pageData.length ? $nextCtrl.removeClass("enabled") : (x.addClass("enabled"), $nextCtrl.addClass("enabled")));
				}, L)
			});
			$(document).on("startAutoFlip", function (a) {
				e.obj.property.autoFlip && d()
			});
			eqShow.showProgressBar(e, m._$pages, a);
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
	function (a, b) {
		function c(a, c) {
			if (!b("#report0").length) {
				var e = [];
				e[0] = '', b(e[0]).appendTo("#page" + a), b(e[1]).appendTo("#report0");
				for (var f = 2; 4 >= f; f++) b(e[f]).appendTo("#report1");
				d(c)
			}
		}

		function d(a) {
			if (g.length) return void e(g, a);
			var c = PREFIX_URL + "base/class/expose_types";
			b.ajax({
				type: "GET",
				url: c,
				xhrFields: {
					withCredentials: !0
				},
				crossDomain: !0
			}).then(function (b) {
				if (b.success) {
					g = b.list, e(g, a)
				}
			})
		}

		function e(a, c) {
			for (var d, e = 0, g = a.length; g > e; e++) {
				var h = '<li value="' + a[e].value + '"><span>' + a[e].name + "</span></li>";
				b(h).appendTo("#reportList")
			}
			var i = b("#reportList").find("li").eq(0);
			i.addClass("active"), d = i.val(), b("#reportList").find("li").click(function (a) {
				b(this).siblings().removeClass("active"), b(this).addClass("active"), d = b(this).val()
			}), b("#reportSubmit").click(function (a) {
				f(c, d)
			}), b("#report0").parent(".m-img").click(function (a) {
				b("#report0").remove()
			}), b("#report0").click(function (a) {
				a.stopPropagation()
			})
		}

		function f(a, c) {
			var d = PREFIX_URL + "eqs/expose",
				e = {
					sceneId: a,
					type: c
				};
			b.ajax({
				type: "POST",
				url: d,
				data: b.param(e),
				xhrFields: {
					withCredentials: !0
				},
				crossDomain: !0
			}).then(function (a) {
				a.success && (b("#report0").remove(), alert("举报成功！"))
			}, function (a) {
				b("#report0").remove()
			})
		}

		a.addReport = function (a, d) {
			var e = '<li comp-drag="" comp-rotate="" class="comp-resize comp-rotate inside wsite-text" id="inside_439881" num="1" ctype="2" comp-resize="" style="width: 320px; height: 36px; left: -250px; top: 420px; z-index: 999;"><div class="element-box" style="height: 100%; z-index: 3; width: 100%; left: 0px; top: 420px; transform: none;-webkit-animation: fadeIn 3s ease 1s both;-webkit-animation-play-state: initial;\\"><div class="element-box-contents" style="width: 100%; height: 100%;"><div id="439881" ctype="2" class="element comp_paragraph editable-text" style="cursor: default; width: 320px; height: 36px;"></div></div></div></li>',
				f = b("#page" + a).find(".edit_wrapper").find("ul");
			b(e).appendTo(f).click(function (b) {
				b.stopPropagation(), c(a, d)
			})
		};
		var g = []
	}(window, jQuery), function (window, $) {
	function appendActivityPage(a, b) {
		a.obj.property.activityPageId && (activityPagePromise = $.ajax({
			type: "GET",
			url: PREFIX_S2_URL + "?c=scene&a=getlastpagebg&id=" + a.obj.property.activityPageId,
			crossDomain: !0,
			success: function (a) {
				a.obj && b.push(a.obj)
			}
		}))
	}

	function internationalLastPage(a, b, c) {
		var d = '{"id":"","sceneId":"","num":2,"name":null,"properties":null,"elements":[{"id":439880,"pageId":129810,"sceneId":16060,"num":0,"type":"3","isInput":0,"title":null,"content":null,"status":1,"css":{},"properties":{"bgColor":"#E6E9EE"}},{"id":439881,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;\\"><span style=\\"line-height: 1; background-color: initial;\\"><font size=\\"4\\" color=\\"#888888\\"><b>场景名称</b></font></span></div>","status":1,"css":{"height":"65","zIndex":"10","width":"320","left":"0px","top":"77px"},"properties":{}},{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"borderRadius":"10px","borderStyle":"solid","zIndex":"9","borderColor":"rgba(0,0,0,1)","paddingTop":"0px","height":"141","backgroundColor":"","color":"","boxShadow":"0px 0px 0px #333333","borderWidth":"0px","width":"142.13709677419354","left":"92px","paddingBottom":"0px","top":"177px"},"properties":{"height":"100px","imgStyle":{"width":142,"height":142,"marginTop":"-0.5px","marginLeft":"0px"},"width":"100px","src":"group1/M00/BA/DA/yq0KA1Rq8COAAYRjAAKU4OVYum0889.jpg"}},{"id":439883,"pageId":129810,"sceneId":16060,"num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"height":"16","zIndex":"11","width":"280","left":"21px","top":"122px"},"properties":{"height":"100px","imgStyle":{"width":280,"height":73,"marginTop":"-24px","marginLeft":"0px"},"width":"100px","src":"' + CLIENT_CDN + 'view/images/line.png"}},';
		if(100 == a.obj.bizType && isMobile){
			d += '{"id":439884,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div id=\\"eqx-share-container\\" style=\\"text-align: center;padding-top: 0;\\"></div>","status":1,"css":{"height":"45","zIndex":"11","width":"280","left":"21px","top":"360px","text-align": "center"},"properties":{"anim":[{"type":20,"direction":0,"duration":"1","delay":"1","countNum":"1"}]}},';
		}

		d += '{"id":439885,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;padding-top: 0;\\"><span style=\\"font-size: small; line-height: 1; background-color: initial;\\"><a href=\\"' + PREFIX_S1_URL + "eqs/link?id=16060&amp;url=" + encodeURIComponent(redirectUrl) + '\\" target=\\"_blank\\"><img style=\\"width: 140px;\\" src=\\"' + CLIENT_CDN + 'assets/images/available-on-the-app-store.png\\"></a></span></div>","status":1,"css":{"borderRadius":"0px","borderStyle":"solid","height":"50","paddingTop":"0px","borderColor":"rgba(222,220,227,1)","zIndex":"12","boxShadow":"0px 0px 0px rgba(200,200,200,0.6)","color":"","backgroundColor":"rgba(255,255,255,0)","borderWidth":"0px","width":"320","left":"1px","paddingBottom":"20px","top":"410px"},"properties":{"anim":{"type":1,"direction":3,"duration":"1","delay":"0.6"}}}]}';

		return d;
	}

	function eqFreepage(a, b, c) {
		function d(a, b, c) {
			if(activityPagePromise){
				activityPagePromise.done(function () {
					c.list.push(a);
					parsePage(b, c);
				}).fail(function () {
					c.list.push(a);
					parsePage(b, c);
				})
			}else{
				c.list.push(a);
				parsePage(b, c);
			}
		}

		//判断移动端&&修改大小
		var e = '{"id":"","sceneId":"","num":2,"name":null,"properties":null,"elements":[{"id":439880,"pageId":129810,"sceneId":16060,"num":0,"type":"3","isInput":0,"title":null,"content":null,"status":1,"css":{},"properties":{"bgColor":"#E6E9EE"}},{"id":439881,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;\\"><span style=\\"line-height: 1; background-color: initial;\\"><font size=\\"4\\" color=\\"#888888\\"><b>'+a.obj.name+'</b></font></span></div>","status":1,"css":{"height":"65","zIndex":"10","width":"320","left":"0px","top":"77px"},"properties":{}},{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"borderRadius":"10px","borderStyle":"solid","zIndex":"9","borderColor":"rgba(0,0,0,1)","paddingTop":"0px","height":"141","backgroundColor":"","color":"","boxShadow":"0px 0px 0px #333333","borderWidth":"0px","width":"142.13709677419354","left":"92px","paddingBottom":"0px","top":"177px"},"properties":{"height":"100px","imgStyle":{"width":142,"height":142,"marginTop":"-0.5px","marginLeft":"0px"},"width":"100px","src":"group1/M00/BA/DA/yq0KA1Rq8COAAYRjAAKU4OVYum0889.jpg"}},{"id":439883,"pageId":129810,"sceneId":16060,"num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"height":"16","zIndex":"11","width":"280","left":"21px","top":"122px"},"properties":{"height":"100px","imgStyle":{"width":280,"height":73,"marginTop":"-24px","marginLeft":"0px"},"width":"100px","src":"' + CLIENT_CDN + 'view/images/line.png"}},{"id":439885,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;padding-top: 0;\\" id=\\"scenead\\"><span style=\\"font-size: small; line-height: 1; background-color: initial;\\"><a href=\\"' + PREFIX_S1_URL + "index.php?c=scene&a=link&id=16060&amp;url=" + encodeURIComponent(lastpagelink) + '\\" target=\\"_blank\\"><font color=\\"#888888\\">免费创建一个微课？→</font><font color=\\"#23a3d3\\">' + lastpagetext + '</font></a></span></div>","status":1,"css":{"borderRadius":"0px","borderStyle":"solid","height":"30","paddingTop":"0px","borderColor":"rgba(222,220,227,1)","zIndex":"12","boxShadow":"0px 0px 0px rgba(200,200,200,0.6)","color":"","backgroundColor":"rgba(255,255,255,0)","borderWidth":"0px","width":"320","left":"1px","paddingBottom":"20px","top":"420px"},"properties":{"anim":{"type":1,"direction":3,"duration":"1","delay":"0.6"}}}]}';

		100 == a.obj.bizType && (e = internationalLastPage(a, b, c));

		var f = '{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"borderRadius":"10px","borderStyle":"solid","zIndex":"9","borderColor":"rgba(0,0,0,1)","paddingTop":"0px","height":"141","backgroundColor":"","color":"","boxShadow":"0px 0px 0px #333333","borderWidth":"0px","width":"142.13709677419354","left":"92px","paddingBottom":"0px","top":"177px"},"properties":{"height":"100px","imgStyle":{"width":142,"height":142,"marginTop":"-0.5px","marginLeft":"0px"},"width":"100px","src":"group1/M00/BA/DA/yq0KA1Rq8COAAYRjAAKU4OVYum0889.jpg"}}',
			g = '{"id":81395,"pageId":"","sceneId":"","num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"borderRadius":"%","borderStyle":"solid","height":"158","zIndex":"1000","paddingTop":"0px","borderColor":"rgba(0,0,0,1)","boxShadow":"0 0px 0px #333333","color":"#000000","backgroundColor":"white","borderWidth":"0px","width":"158","left":"84px","paddingTop":"11px","paddingLeft":"10px","top":"170px"},"properties":{"height":"100px","imgStyle":{"width":139,"height":136,"marginTop":"0px","marginLeft":"0px"},"width":"100px","src":"group1/M00/01/30/yq0JCFQpOR-AOULFAAFBPO1yzBQ984.jpg"}}',
			h = '{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div class=\\"bottom-logo\\" style=\\"text-align: center;cursor:pointer;height:136px;width:139px;\\"><em style=\\"color:white;line-height:136px;font-size:120px;\\" class=\\"eqf-eqxiu\\"></em></div>","status":1,"css":{"height":"158","width":"158","left":"84px","top":"170px","backgroundColor":"white"},"properties":{}}',
			i = '{"id":81465,"pageId":"","sceneId":"","num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;\\"><font color=\\"#ffffff\\" size=\\"3\\">击此处进行编辑</font></div>","status":1,"css":{"zIndex":"102","height":"65","width":"320","left":"0px","top":"70px"},"properties":{}}',
			j = '{"id":2557867,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div class=\\"logo-shadow1\\" style=\\"text-align: center;cursor:pointer;height:127px;width:220px;transform:rotate(-45deg);-webkit-transform:rotate(-45deg);position:absolute;left:20px;top:56px;\\"></div>","status":1,"css":{"height":"257","width":"257","left":"78px","top":"175px"},"properties":{}}',
			k = '{"id":439883,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"width:280px;height:1px;background-color:rgba(60,60,60,0.4);cursor:pointer;position:absolute;left:0;-webkit-filter:drop-shadow(0px 1px 0px rgba(60,60,60,0.4));top:12px;\\"></div>","status":1,"css":{"height":"24","width":"280","left":"21px","top":"122px"},"properties":{}}';
		if (ad = 1, a.obj.property.lastPageId) {
			customLastPage = !0;
			$.ajax({
				type: "GET",
				url: PREFIX_S2_URL + "?c=scene&a=getlastpagebg&id=" + a.obj.property.lastPageId,
				crossDomain: !0,
				success: function (c) {
					if (!c.obj) {
						e = e.replace(/id=16060/, "id=" + a.obj.id);
						var f = JSON.parse(e);
						f.num = a.list.length + 1;
						f.elements[2].properties.src = a.obj.cover;
						f.elements[1].content = f.elements[1].content.replace(/场景名称/, a.obj.name);
						f.elements[1].properties.height = 65;
						f.elements[1].height = 65;

						return void d(f, b, a)
					}
					c.obj.sceneId = a.obj.id;
					for (var l, m = 0; m < c.obj.elements.length; m++){
						"4" != c.obj.elements[m].type || "group1/M00/A5/5E/yq0KA1QmePmAKr7yAAEByp5jyLc752.jpg" != c.obj.elements[m].properties.src && "group1/M00/C5/9D/yq0KA1SH1zuAFgkLAAAFgBR8hJs456.png" != c.obj.elements[m].properties.src && "group1/M00/C5/3F/yq0KA1SHp-2AQZZZAAB-7rIaK6I743.png" != c.obj.elements[m].properties.src && "group1/M00/C5/9D/yq0KA1SH1zuAeQuFAAAFfUkeXDc110.png" != c.obj.elements[m].properties.src || (c.obj.elements.splice(m, 1), m--);
					}
					if("group1/M00/61/8A/yq0KA1T2vYSAEgo7AACovQVgHxk048.jpg" != a.obj.cover){
						l = JSON.parse(g);
						l.properties.src = a.obj.cover;
					}else{
						l = JSON.parse(h);
					}

					c.obj.elements.push(l);
					c.obj.elements.push(JSON.parse(j));
					c.obj.elements.push(JSON.parse(k));
					var n = JSON.parse(i);
					n.content = n.content.replace(/击此处进行编辑/, a.obj.name), c.obj.elements.push(n);
					for (var m = 0; m < c.obj.elements.length; m++){
						if("2" == c.obj.elements[m].type && /http:\/\/service.eqxiu.com\/eqs\/link/.test(c.obj.elements[m].content)){
							c.obj.elements[m].content = c.obj.elements[m].content.replace(/;url=.*com"/, ";url=" + encodeURIComponent(redirectUrl) + '"');
						}
					}
					d(c.obj, b, a);
				}
			});
		}else {
			e = e.replace(/id=16060/, "id=" + a.obj.id);
			var l = JSON.parse(e);
			l.num = a.list.length + 1, "group1/M00/61/8A/yq0KA1T2vYSAEgo7AACovQVgHxk048.jpg" != a.obj.cover && (l.elements[2] = JSON.parse(f), l.elements[2].properties.src = a.obj.cover), l.elements[1].content = l.elements[1].content.replace(/场景名称/, a.obj.name), d(l, b, a)
		}
	}

	function eqDefaultBottomLabel(a, b) {
		var c = '{"id":480292,"pageId":136042,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;transform: none;-webkit-animation: fadeIn 2s ease 1s both;-webkit-animation-play-state: initial;\\"><a href=\\"' + PREFIX_S1_URL + "eqs/link?id=16060&amp;url=" + encodeURIComponent(redirectUrl) + '\\" target=\\"_blank\\" style=\\"font-size: x-small;display:block;line-height: 10px;\\"><font color=\\"#ffffff\\">' + companyName + '</font></a></div>","status":1,"css":{"zIndex":"1000","height":"20","width":"129","left":"97px","top":"418px","backgroundColor":"rgba(0,0,0,0.6)","borderRadius":"20px"},"properties":{"anim":{"type":0,"direction":0,"duration":2,"delay":"0"}}}';
		ad = 2;

		var d;
		c = c.replace(/id=16060/, "id=" + a.obj.id);
		d = b[b.length - 1].elements;
		b[b.length - 1].elements || (d = b[b.length - 1].elements = []);
		d.push(JSON.parse(c));
		parsePage(b, a);
	}

	function eqCustomBottomLabel(a, b) {
		ad = 2;
		$.ajax({
			type: "GET",
			url: PREFIX_S2_URL + "?c=scene&a=getlastpagebg&id=" + a.obj.property.bottomLabel.id,
			crossDomain: !0,
			success: function (c) {
				if (!c.obj) {
					return void eqDefaultBottomLabel(a, b);
				}
				var d = c.obj.elements,
					e = 0;
				for (d.length; e < d.length; e++) {
					var f = d[e];
					f.sceneId = a.obj.id;
					f.pageId = b[b.length - 1].id;

					if (a.obj.property.bottomLabel.name && a.obj.property.bottomLabel.url && "http://" != a.obj.property.bottomLabel.url) {
						if(2 == f.type && f.content.indexOf("EQXIU.COM科技公司") > 0){
							f.content = f.content.replace(/EQXIU.COM科技公司/, '<a href="' + PREFIX_S1_URL + "eqs/link?id=" + a.obj.id + "&amp;url=" + encodeURIComponent(a.obj.property.bottomLabel.url) + '" target=_blank>' + a.obj.property.bottomLabel.name + "</a>");
						}
					}else if (a.obj.property.bottomLabel.name) {
						if(2 == f.type && f.content.indexOf("EQXIU.COM科技公司") > 0){
							f.content = f.content.replace(/EQXIU.COM科技公司/, a.obj.property.bottomLabel.name);
						}
					}else if (/易企秀技术支持/.test(f.content)) {
						f.content = '<div style="text-align: center;">' + f.content + "</div>";
						var g = {
							zIndex: "1000",
							height: "33",
							width: "129",
							left: "97px"
						};
						$.extend(f.css, g);
					} else {
						2 == f.type && f.content && (f.content = "");
					}
					f.css.zIndex = 200;
					a.list[a.list.length - 1].elements || (a.list[a.list.length - 1].elements = []), a.list[a.list.length - 1].elements.push(f);
					customLastPage = !0;
				}
				parsePage(b, a);
			}
		})
	}

	function eqHideAll(a, b) {
		ad = 0, parsePage(b, a)
	}

	function parsePage(pages, data) {
		var nr = document.getElementById("audio_btn");
		var audio = document.createElement("audio");
		audio.id = "pageMusic";
		audio.setAttribute("autoplay", "");
		nr.appendChild(audio);
		window.pageMusics = [];
		aud = document.getElementById("pageMusic");
		for (var i = 0; i < data.obj.music_url.length; i++) {
			if( data.obj.music_url[i] != null && data.obj.music_url[i].num != null){
				var music = data.obj.music_url[i];
				var pageNo = data.obj.music_url[i].num;
				if (pageNo == 1) {
					pageMusics[0] = music;
				} else {
					pageMusics[pageNo] = music;
				}
			}
		}
			

		
	function audioAutoPlayTwo(){
		$(document).bind("WeixinJSBridgeReady", function () {
			document.getElementById("pageMusic").play();
		}, false);
		// $(document).bind('touchstart', function() {
		// 	document.getElementById("pageMusic").play();
		// }, false);
		// document.getElementById("pageMusic").play();
		document.addEventListener('touchstart',function(){
                    var a = window.navigator.userAgent;
                    if(a.indexOf('Android')<0){
                        document.getElementById("pageMusic").play();
                        playCount++;
                    }
                })
	}
	audioAutoPlayTwo();

	var playCount = 0;

		window.addEventListener("hashchange", function(){
			playCount = 0;
		});




	pageMusics[0] ? aud.setAttribute('src', pageMusics[0].url) : aud.setAttribute('src', "");
	var pageInfo = [], init = !1, audioObj = {
		bgAudio: data.obj.bgAudio
	};
	for (pageNum = 1; pageNum <= pages.length; pageNum++) {
		$('<section class="main-page"><div class="m-img" id="page' + pageNum + '"></div></section>').appendTo(".nr");
		if(10 == pageMode){
			$("#page" + pageNum).parent(".main-page").wrap('<div class="flip-mask" id="flip' + pageNum + '"></div>');
			$(".main-page").css({
				width: $(".nr").width() + "px",
				height: $(".nr").height() + "px"
			})
		}

		if(pages.length > 1){
			var isHaveLinkUrl = !1;
			for(var j = 0; j<pages[pageNum - 1].elements.length; j++){
				if(pages[pageNum - 1].elements[j].properties && pages[pageNum - 1].elements[j].properties.url){
					isHaveLinkUrl = !0;
				}
				if(pages[pageNum - 1].elements[j].content && pages[pageNum - 1].elements[j].content.indexOf("data=") > 0){
					isHaveLinkUrl = !0;
				}
			}
			if((0 == pageMode || 1 == pageMode || 2 == pageMode || 6 == pageMode || 7 == pageMode || 8 == pageMode || 11 == pageMode || 12 == pageMode) && !isHaveLinkUrl){
				$('<section class="u-arrow-bottom"><img src="' + CLIENT_CDN + 'view/images/btn01_arrow.png" /></section>').appendTo("#page" + pageNum);

			}else if((3 == pageMode || 4 == pageMode || 5 == pageMode || 9 == pageMode || 10 == pageMode) && !isHaveLinkUrl){

				$('<section class="u-arrow-right"><img src="' + CLIENT_CDN + 'view/images/btn01_arrow_right.png" /></section>').appendTo("#page" + pageNum);
			}
		}

		if(1 == pageNum){
			$(".loading").hide();
			$(".main-page").eq(0).addClass("z-current");
			pages[pageNum - 1].elements && pages[pageNum - 1].elements.length && $.each(pages[pageNum - 1].elements, function (a, b) {
				"d" == b.type && eqShow.getShowCount(data.obj.id)
			})
		}

		if(pages[pageNum - 1].properties && !$.isEmptyObject(pages[pageNum - 1].properties)){//有特效
					
			if(pages[pageNum - 1].properties.image || pages[pageNum - 1].properties.scratch){//有涂抹特效
				if(scriptLoaded.scratch){ 
					addScratchEffect(pages, pageNum);
				}else{ 
					! function (a) {
						$.getScript(CLIENT_CDN + "view/js/scratch_effect.js", function (b, c, d) {
							scriptLoaded.scratch = !0;
							addScratchEffect(audioObj, pages, a);
							renderPage(eqShow, pageNum, pages);
						})
					}(pageNum)
				}
			}else if(pages[pageNum - 1].properties.finger){ //否则，有指纹特效
				pageInfo.push({
					num: pageNum,
					finger: pages[pageNum - 1].properties.finger
				});
				init || (init = !0, $.getScript(CLIENT_CDN + "view/js/lock_effect.js", function (a, b, c) {
					test(audioObj, pages, pageInfo, $(".m-img").width(), $(".m-img").height())
				}))
			}else if(pages[pageNum - 1].properties.fallingObject){ //否则，有降落福字特效
				scriptLoaded.fallingObject ? (
					fallingObject(pages, pageNum)) : (!
						function (a) {
							$.getScript(CLIENT_CDN + "view/js/falling_object.js", function (b, c, d) {
								scriptLoaded.fallingObject = !0, 
								fallingObject(pages, a), 
								1 == a && playVideo(audioObj)
							});
							renderPage(eqShow, pageNum, pages);
						}(pageNum))
			}else if(pages[pageNum - 1].properties.effect){//否则，有其他特效
				!function (a) {
					resources.load(window.eqx[pages[a - 1].properties.effect.name].config.resources), resources.onReady(function () {
						window[pages[a - 1].properties.effect.name].doEffect(audioObj, a, pages, renderPage)
					});
					renderPage(eqShow, pageNum, pages);
				}(pageNum)
			}else{ 
				renderPage(eqShow, pageNum, pages);
				1 == pageNum && playVideo(audioObj)//否则
			}
		}else{//否则，没有特效
			renderPage(eqShow, pageNum, pages), 
			1 == pageNum && playVideo(audioObj)
		}
		if (pageNum == pages.length) {
			eqxiu.app($(".nr"), data.obj.pageMode, pages, data);
			if (isMobile || $("img").on("dragstart", function (a) {
					a.preventDefault()
				}), !preview) {

			}
		}
	}
		$("#pageinfo h3").text(data.obj.name),$("#pageinfo p").text(data.obj.description),$(".author i").text(data.obj.userName),$(".readit i").text(data.obj.showCount);
		$(function(){
			
				//纵向缩略图逻辑
				var mainPage = $("#nr .main-page").clone();
				for(var i = 0;i<mainPage.length;i++){
					$(mainPage[i]).find(".m-img").attr("id","minipage"+(i+1));
					setMargin(i,5);
					for(var j = 0;j<pages[i].elements.length;j++){
						(function(i){
							$("#minipage"+(i+1)).bind("click",function(){
								if(i+1 != mainPage.length){
									eqxiu.pageScroll(pages[i].id);
								}else{
									$("#nr .main-page").removeClass("z-current");
									$("#page"+mainPage.length).closest(".main-page").addClass("z-current");
									$("#minipage"+mainPage.length).closest(".main-page").addClass("z-current");
								}
							});
						})(i);
					}
				}
				//预览页的排版
				function setMargin(a,b){
					var lang = parseInt(i / b);
					var mode = parseInt(i % b);
					$(mainPage[a]).css("margin-left",483*mode+50*mode);
					$(mainPage[a]).css("margin-top",729*lang+50*lang); 
					$(".miniPage").append($(mainPage[a]));
				}
				!PCcheck() && ($("#mainBox-left").hide() , $("#horizon-screen").hide(),$(".ctrl_panel").hide(),$("#screen_panel").hide());
				$(".bg_white").height() > 700 ? $(".miniPage").css({
					"transform":"scale(0.25)",
					"margin-left": -990,
					"width": 2622
				}) : $(".miniPage").css({
					"transform":"scale(0.2)",
					"margin-left": -1048,
					"width": 2622
				});
				//横向预览框&缩略图逻辑
				//横屏弹窗
				var conscreen = $("#con").clone(); 
				$("#conbox").append($(conscreen));
				$("#horizon-screen #audio_btn").remove();
				$("#horizon-screen #pageMusic").remove();
				$("#conbox #screen_panel").remove();
				$("#conbox .ctrl_panel").remove();
				//eqxiu.pageScroll
				var mainPageElli = $("#conbox .main-page").clone();
				for(var i = 0;i<mainPageElli.length;i++){
					//$($("#conbox").find(".m-img")[i]).attr("id","Ellipage"+(i+1));
					$(mainPageElli[i]).find(".m-img").attr("id","mainPageElli"+(i+1));
					setMarginElli(i,1);
					for(var j = 0;j<pages[i].elements.length;j++){
						(function(i,j){
							$("#mainPageElli"+(i+1)).bind("click",function(){
								if(i+1 != mainPageElli.length){
									eqxiu.pageScroll(pages[i].id);
								}else{
									$("#conbox .main-page").removeClass("z-current");
									$("#conbox #page"+mainPage.length).closest(".main-page").addClass("z-current");
								}
							});
							if(pages[i].elements[j].properties.url){  
								$("#conbox #inside_"+pages[i].elements[j].id).bind("click",function(){
									eqxiu.pageScroll(pages[i].elements[j].properties.url);//链接
								});
							}
							if((pages[i].elements[j].properties.title == "下一页") || (pages[i].elements[j].properties.title == "上一页")){  
								$("#conbox #inside_"+pages[i].elements[j].id).bind("click",function(){
									pages[i].elements[j].properties.title == "下一页" ? eqxiu.nextPage() : eqxiu.prePage();//表单跳转
								});
							}
							eqxCommon.bindTrigger("#conbox #inside_"+pages[i].elements[j].id, pages[i].elements[j])//触发receives
							setSend("#conbox #inside_"+pages[i].elements[j].id, pages[i].elements[j]);//触发 sends
							setSound("#conbox #inside_"+pages[i].elements[j].id, pages[i].elements[j]);//声音 单页音乐和背景音乐
						})(i,j);
					}
				}
				function setSend(elem, obj) {//触发 sends
					if (obj.trigger) {
						var c = $(elem);
						j && clearTimeout(j), obj.trigger.sends && obj.trigger.sends.length && $.each(obj.trigger.sends, function (a, b) {
							c.bind(utilTrigger.getSendType(b.type).name, function () {
								j = setTimeout(function () {
									$.each(b.handles, function (a, b) {
										var c = utilTrigger.getHandleType(b.type).name;
										$.each(b.ids, function (a, b) {
											var d;
											d = $("#inside_" + b, ".phone-view").length ? $("#conbox #inside_" + b, ".phone-view") : $("#conbox #inside_" + b), d.trigger(c)
										})
									})
								}, 1e3 * b.delay)
							})
						})
					}
				}
				function setSound(elem, obj) {
					if (obj.sound) {
						var c = $(elem),
							d = $("#media").get(0);
						0 == obj.sound.src.indexOf("http://") ? obj.sound.src = obj.sound.src : obj.sound.src = PREFIX_FILE_HOST + obj.sound.src;

						utilSound.addAudio(elem, obj.sound.src);

						c.click(function () {
							utilSound.play(elem, function () {
								d && d.play()
							}, function () {
								d && d.pause()
							})
						})
					}
				}
				function setMarginElli(a,b){
					$(mainPageElli[a]).css("top",483*a+50*a-90); 
					$(".miniPageElli").append($(mainPageElli[a]));
					
				} 
				$("#horizon-screen-box").hide();
				$("#close").bind("click",function(){
					$("#horizon-screen").hide();
					$("#horizon-screen-box").hide();
					eqxiu.app($(".nr"), data.obj.pageMode, pages, data);//竖向预览框的翻页和滑动
				}); 
				$("#hengping").bind("click",function(){
					if($("#horizon-screen").hide()){
						$("#horizon-screen").show(); 
						$("#horizon-screen-box").show();
						//$("#conbox #loading").before($('<audio id="pageMusicElli" autoplay ></audio>'))
						eqxiu.app($("#horizon-screen-box .nr"), data.obj.pageMode, pages, data);//横向预览框翻页和滑动
					}
				});
			})

		if (data.obj.createTime > 14165028e5) {
			if (100 != data.obj.bizType && !data.obj.property.hideEqAd && 1 == data.obj.property.eqAdType) {
				return void addReport(pages.length, data.obj.id);
			}
			100 == data.obj.bizType || data.obj.property.eqAdType || data.obj.property.hideEqAd || data.obj.property.isAdvancedUser || addReport(pages.length, data.obj.id)
		}
		if (100 == data.obj.bizType) {
			var $eqxShareContainer = $("#eqx-share-container");
			with ($eqxShareContainer.length && ($eqxShareContainer.append($('<div class="eqx-share">\n    <a class="eqx-share-btn btn-facebook"><span class="eqx-share-icon icon-facebook"></span></a>\n    <a class="eqx-share-btn btn-twitter"><span class="eqx-share-icon icon-twitter"></span></a>\n    <a class="eqx-share-btn btn-plus"><span class="eqx-share-icon icon-google_plus"></span></a>\n    <a class="eqx-share-btn btn-linkedin"><span class="eqx-share-icon icon-linkedin"></span></a>\n    <a class="eqx-share-btn btn-pinterest"><span class="eqx-share-icon icon-pinterest"></span></a>\n    <a class="addthis_sharing_toolbox"></a>\n</div>')), $(".eqx-share-btn").ShareLink({
				title: data.obj.name,
				text: data.obj.description,
				image: PREFIX_FILE_HOST + data.obj.cover,
				url: window.location.href.split("#")[0],
				class_prefix: "btn-"
			})), document) 0[(getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = "http://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-55c029461a7d08e5"]
		}
	}

	function addReportToLastPage(pages, data) {//貌似无用
		if (data.obj.createTime > 14165028e5) {
			if (100 != data.obj.bizType && !data.obj.property.hideEqAd && 1 == data.obj.property.eqAdType) return void addReport(pages.length, data.obj.id);
			100 == data.obj.bizType || data.obj.property.eqAdType || data.obj.property.hideEqAd || data.obj.property.isAdvancedUser || addReport(pages.length, data.obj.id)
		}
		if (100 == data.obj.bizType) {
			var $eqxShareContainer = $("#eqx-share-container");
			with ($eqxShareContainer.length && ($eqxShareContainer.append($('<div class="eqx-share">\n    <a class="eqx-share-btn btn-facebook"><span class="eqx-share-icon icon-facebook"></span></a>\n    <a class="eqx-share-btn btn-twitter"><span class="eqx-share-icon icon-twitter"></span></a>\n    <a class="eqx-share-btn btn-plus"><span class="eqx-share-icon icon-google_plus"></span></a>\n    <a class="eqx-share-btn btn-linkedin"><span class="eqx-share-icon icon-linkedin"></span></a>\n    <a class="eqx-share-btn btn-pinterest"><span class="eqx-share-icon icon-pinterest"></span></a>\n    <a class="addthis_sharing_toolbox"></a>\n</div>')), $(".eqx-share-btn").ShareLink({
				title: data.obj.name,
				text: data.obj.description,
				image: PREFIX_FILE_HOST + data.obj.cover,
				url: window.location.href.split("#")[0],
				class_prefix: "btn-"
			})), document) 0[(getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = "http://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-55c029461a7d08e5"]
		}
	}

	function addEnabledClassToPageCtrl(a) {//貌似无用
		var b, c, d = a.obj.pageMode,
			e = a.obj.property.triggerLoop;
		0 == d || 1 == d || 2 == d || 6 == d || 7 == d || 8 == d || 11 == d || 12 == d ? b = !0 : (3 == d || 4 == d || 5 == d || 10 == d) && (c = !0), setTimeout(function () {
			b ? ($(".ctrl_panel_dir .ctrl-up").addClass("enabled"), e && $(".ctrl_panel_dir .ctrl-down").addClass("enabled")) : c && ($(".ctrl_panel_dir .ctrl-left").addClass("enabled"), e && $(".ctrl_panel_dir .ctrl-right").addClass("enabled"))
		}, 0)
	}

	var redirectUrl, companyName, pageMode, preview, param, ad, customLastPage = !1,
		isMobile = mobilecheck(),
		scriptLoaded = [],
		activityPagePromise = null;
	window.appendLastPage = function (a, b, c, d, e, f) {
		pageMode = c;
		preview = d;
		param = e;
		ad = f;

		if(100 == a.obj.bizType){
			redirectUrl = "https://itunes.apple.com/us/app/easyshow-free-h5-sence-slides/id987351120?mt=8";
			companyName = "Hypefolio";
		}else{
			redirectUrl = your_demain;
			companyName = "易企秀技术支持";
		}

		appendActivityPage(a, b);

		if (a.obj.createTime > 14165028e5) {
			if (100 == a.obj.bizType) {
				eqFreepage(a, b);
			}else if (a.obj.property.hideEqAd) {
				eqHideAll(a, b);
			}else {
				if (a.obj.property && a.obj.property.eqAdType) {
					switch (a.obj.property.eqAdType) {
						case 1:
							return void eqFreepage(a, b);
						case 2:
							return void eqDefaultBottomLabel(a, b);
						case 3:
							return void eqCustomBottomLabel(a, b)
					}
				}
				if(a.obj.property.isAdvancedUser){
					if(a.obj.property && a.obj.property.bottomLabel && a.obj.property.bottomLabel.id){
						eqCustomBottomLabel(a, b);
					}else{
						eqDefaultBottomLabel(a, b);
					}

				}else{
					eqFreepage(a, b)
				}
			} 
		}else {
			eqHideAll(a, b)
		}
	}, isMobile && $(".nr").css({
		width: "100%",
		height: "100%"
	})
}(window, jQuery), function (window, $) {
	function getCounterValues(a) {
		var b = {
			sceneId: a.obj.id,
			fieldIds: ""
		};
		$.each(a.list, function (a, c) {
			c.elements && $.each(c.elements, function (a, c) {
				"i" === c.type && (b.fieldIds += (b.fieldIds ? "," : "") + c.id)
			})
		}), b.fieldIds && (window.eqShow.counterValues = $.ajax({
			type: "GET",
			url: PREFIX_S1_URL + "index.php?c=scene&a=countervalues",
			data: $.param(b),
			xhrFields: {
				withCredentials: !0
			},
			error: function (a) {
				layer.alert("Connection error")
			},
			crossDomain: !0
		}))
	}

	function getRequestUrl() {
		var a;
		if(preview){
			if(isNewPreviewLocation){
				a = PREFIX_URL + "index.php?c=scene&a=view&id=" + sceneId + "&preview=preview" + ".data";
			}else{
				a = PREFIX_URL + "index.php?c=scene&a=view&id=" + sceneId + "&preview=preview";
			}
			branchid && (a += (/\?/.test(a) ? "&" : "?") + "user=" + branchid);
		}else{
			if(mobileview){
				a = PREFIX_URL + "event/9100?p1=" + sceneId;
			}else{
				if(window.scene && window.scene.id){
					if(window.isCheck){
						a = PREFIX_SERVER_HOST + "m/eqs/view/page/" + window.scene.id;
					}else{
						a = PREFIX_S1_URL + "index.php?c=scene&a=view&id=" + window.scene.id;
					}
				}else{
					a = PREFIX_S1_URL + "eqs/v-" + sceneId;
				}
			}

		}

		a += (/\?/.test(a) ? "&" : "?") + "time=" + (new Date).getTime();

		return a;
	}

	function combineUrl(a, b, c) {//貌似无用
		b && (a += "?1=1", a += /\?.*/.test(b) ? "&" + b.substring(1) : /\&.*/.test(b) ? b : "&" + b);
		a += (/\?/.test(a) ? "&" : "?") + "ad=" + c;
		a += (/\?/.test(a) ? "&" : "?") + "time=" + (new Date).getTime();

		return a;
	}

	function bindShare(data) {
		if (mobilecheck() || tabletCheck()) {
			isWeixin() && configWeixin(data);
		}else if (100 != data.obj.bizType) {
			with (window._bd_share_config = {
				common: {
					bdSnsKey: {},
					bdText: data.obj.name,
					bdSign: "on",
					bdDesc: data.obj.name,
					bdUrl: PREFIX_HOST + "/v-" + sceneId,
					bdStyle: "0",
					bdSize: "32"
				},
				share: {}
			}, document) {
				0[(getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = "http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=" + ~(-new Date / 36e5)]
			}
		}
	}

	function getDomain(a) {
		var b = "null";
		("undefined" == typeof a || null == a) && (a = window.location.href);
		var c = /.*\:\/\/([^\/]*).*/,
			d = a.match(c);
		return "undefined" != typeof d && null != d && (b = d[1]), b
	}

	function configWeixin(a) {
		var b = location.href.split("#")[0],
			c = getDomain(b),
			d = Date.now(),
			e = "eqs/wx/ticket",
			f = getDomain(PREFIX_HOST);
		b.indexOf(f) < 0 && (e += (/\?/.test(e) ? "&" : "?") + "domain=" + c), e += (/\?/.test(e) ? "&" : "?") + "time=" + (new Date).getTime(), $.ajax({
			type: "GET",
			url: PREFIX_S1_URL + e,
			crossDomain: !0
		}).then(function (b) {
			b.success && b.obj.appId && b.obj.ticket && -1 != b.obj.ticket && bindWeixinEventWithSDK(b.obj.appId, b.obj.ticket, a, d)
		}, function (a) {
		})
	}

	function bindWeixinEventWithSDK(a, b, c, d) {
		var e = location.href.split("#")[0],
			f = "eqxiuview",
			g = "jsapi_ticket=" + b + "&noncestr=" + f + "&timestamp=" + d + "&url=" + e,
			h = new jsSHA(g, "TEXT"),
			i = h.getHash("SHA-1", "HEX");
		wx.config({
			debug: !1,
			appId: a,
			timestamp: d,
			nonceStr: f,
			signature: i,
			jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
		}), wx.ready(function () {
			shareWeixinWhenReady(e, c)
		})
	}

	function shareWeixinWhenReady(a, b) {
		var c = b.obj.name,
			d = b.obj.cover,
			e = b.obj.description;
		e || (e = " "), wx.onMenuShareTimeline({
			title: c,
			link: a,
			imgUrl: PREFIX_FILE_HOST + d,
			success: function () {
			},
			cancel: function () {
			}
		}), wx.onMenuShareAppMessage({
			title: c,
			desc: e,
			link: a,
			imgUrl: PREFIX_FILE_HOST + d,
			success: function () {
			},
			cancel: function () {
			}
		}), wx.onMenuShareQQ({
			title: c,
			desc: e,
			link: a,
			imgUrl: PREFIX_FILE_HOST + d,
			success: function () {
			},
			cancel: function () {
			}
		}), wx.onMenuShareWeibo({
			title: c,
			desc: e,
			link: a,
			imgUrl: PREFIX_FILE_HOST + d,
			success: function () {
			},
			cancel: function () {
			}
		}), $("#media").get(0).play()
	}

	function parseJson(a, b) {
		isNewPreviewLocation || window.scene || (document.title = a.obj.name, $("#metaDescription").attr("content", a.obj.name + ", " + a.obj.description + ", 由易企秀免费移动场景应用自营销管家提供技术支持"), $(".scene_title").text(a.obj.name));
		b || bindShare(a);
		pageMode = a.obj.pageMode;
		var c = [];
		a.obj.property && (a.obj.property = JSON.parse(a.obj.property) || {});
		a.obj.bgAudio && "string" == typeof a.obj.bgAudio && (a.obj.bgAudio = JSON.parse(a.obj.bgAudio) || null);
		c = a.list;
		if(c.length <= 0){
			alert("此场景不存在!");
			return void(window.location.href = your_demain);
		}else{
			return void appendLastPage(a, c, pageMode, preview, param, ad);
		}

	}

	var url, preview, mobileview, pageMode, branchid, ad = 0;
	$.ajaxSetup({
		cache: !0
	});
	var isNewPreviewLocation = false;
	url = '';
	var sceneId = 0;
	isNewPreviewLocation && (sceneId = 0);
	var param = 0;
	if (( window.preview || isNewPreviewLocation) && (preview = !0), !(mobilecheck() || tabletCheck() /*&& window == window.top*/)) {//解决wizbank学习网站ipad打开问题

		var addElmentsForPc = function (a) {

			var b = document.getElementsByTagName("head")[0],
				c = document.createElement("link");
			c.href = CLIENT_CDN + "assets/Css/pcviewer.css", 
			c.rel = "stylesheet", 
			b.appendChild(c);
			if(window != window.top){
				$("body").css("background-image", "none"); 
				$("#con").before('<div id="code"><span>扫我在手机上观看</span><div style="text-align: center;background:#fff;  margin-top: 3px;" id="codeImg"/></div>');
				var href = window.location.href;
				console.log(href);
				$("#codeImg").qrcode({
					render: "canvas",
					width: 100,
					height: 100,
					text: href + "?eqrcode=1"
				}); 
				if(window.location.href.indexOf("hidePhone") > 0){
					$(".top").hide(), 
					$(".bottom").hide(), 
					$(".phone_menubar").hide(), 
					$(".scene_title_baner").attr("style", "display:none !important"), 
					$("body").css({
						"background-color": "rgba(0,0,0,0.6)"
					}), 
					$(".p-index").wrap('<div class = "phone_panel"></div>'), 
					$('<div class = "ctrl_panel_dir"></div>').appendTo($(".phone_panel")), 
					setTimeout(function () {
						$(".phone_panel").css({
							position: "absolute",
							width: "94%",
							height: "94%",
							top: "3%",
							left: "3%",
							"margin-top": 0,
							"margin-left": 0
						});
						var a = $(".ctrl_panel_dir");
						$(".ctrl_panel_dir").css({
							position: "fixed",
							bottom: "3%",
							right: "3%"
						}), $(".phoneBox").css({
							width: "100%",
							height: "100%"
						}), 
						$('<div class="ctrl-left" onclick = "eqxiu.prePage(1)"></div>').appendTo(a), 
						$('<div class="ctrl-right" onclick = "eqxiu.nextPage(1)"></div>').appendTo(a), 
						$('<div class="ctrl-up" onclick = "eqxiu.prePage(2)"></div>').appendTo(a), 
						$('<div class="ctrl-down" onclick = "eqxiu.nextPage(2)"></div>').appendTo(a)
					}, 100)
				};
			}else{
				$("body").css("backgroundImage", "url(view/images/previewbg_spring.jpg)");
				
				if(window.scene && 100 == window.scene.bizType){
					$("#con").before('<div id="code" style="margin-top: -200px;">\n    <div style="font-size: 14px;">Share your folio on social network!</div>\n    <div class="eqx-share">\n        <a class="eqx-share-btn btn-facebook"><span class="eqx-share-icon icon-facebook"></span></a>\n        <a class="eqx-share-btn btn-twitter"><span class="eqx-share-icon icon-twitter"></span></a>\n        <a class="eqx-share-btn btn-plus"><span class="eqx-share-icon icon-google_plus"></span></a>\n        <a class="eqx-share-btn btn-linkedin"><span class="eqx-share-icon icon-linkedin"></span></a>\n        <a class="eqx-share-btn btn-pinterest"><span class="eqx-share-icon icon-pinterest"></span></a>\n        <a class="addthis_sharing_toolbox"></a>\n    </div>\n    <div id="view_reg" style="border: none;margin-bottom: 26px;"><span>\n        <a target="_blank" href=' + your_demain + ' style="color: #fff;border-bottom-color: #fff;font-size: 14px;">So Cool, Let me try it!</a>\n    </span></div>\n    <div style="text-align: center;background:#fff;padding: 10px;" id="codeImg"/> \n    <div style="text-align: center;font-size: 14px;">Scan the QR Code!</div>\n    <div id="support">Powered BY <a target="_blank" href=' + your_demain + '><img id="logoSmall" style="width: 64px;vertical-align: bottom;" src="' + CLIENT_CDN + 'view/images/hypefolio-logo.png"/></a></div></div>');

					$(".eqx-share-btn").ShareLink({
						title: window.scene.name,
						text: window.scene.description,
						image: PREFIX_FILE_HOST + window.scene.cover,
						url: window.location.href.split("#")[0],
						class_prefix: "btn-"//添加标题和描述&&修改大小
					})
				}else{
					$("#con").before('<div id="code"><span>扫我在手机上观看</span><div style="text-align: center;background:#fff;  margin-top: 3px;" id="codeImg"/></div><div id="support">技术支持 BY <a target="_blank" href=' + your_demain + '><img id="logoSmall" src="' + CLIENT_CDN + 'view/images/logobai.png"/></a></div></div>')
				}

				var b, c = getDomain(PREFIX_HOST);
				b = window.location.href.indexOf(c) >= 0 ? parseInt(10 * Math.random(), 10) % 2 ? PREFIX_URL : PREFIX_URL : PREFIX_URL;
				$("#codeImg").qrcode({
					render: "canvas",
					width: 100,
					height: 100,
					text: b + "v-" + a + "?eqrcode=1"
				}); 
				$(".p-index").wrap('<div class = "phone_panel"></div>');
				$('<div class = "ctrl_panel"></div>').appendTo($(".phone_panel"));
				setTimeout(function () {//判断移动端&&修改大小---滑动控制按钮
					if(window.scene && 100 == window.scene.bizType){
						$(".phone_menubar").addClass("hypefolio");
						$('<a id = "pre_page" type = "button" class = "pre_btn btn btn5" onclick = "eqxiu.prePage()">\n    <span style="transform: rotateZ(90deg);display: inline-block;font-size: 36px;">&lt;</span>\n</a>').prependTo($(".ctrl_panel"));
						$('<a id = "next_page" type = "button" class = "next_btn btn btn5" onclick = "eqxiu.nextPage()">\n    <span style="transform: rotateZ(90deg);display: inline-block;font-size: 36px;margin-top: 5px;">&gt;</span>\n</a>').appendTo($(".ctrl_panel"));
					}

				}, 100)
			}
		};
		addElmentsForPc(sceneId)
	}
	//检测是否手机端&&修改大小
	function classReplace(obj,class1,class2,class3){
		if(arguments.length > 3){
			return $(obj).removeClass(class1).removeClass(class2).addClass(class3);
		}else{
			return $(obj).removeClass(class1).addClass(class2);
		}
	}
	if(PCcheck()){
		/*alert("电脑");*/
		if($(window).height() > 750){
			classReplace(".phone_panel","phone_panel1","phone_panel3","phone_panel5");
			classReplace(".phoneBox","phoneBox1","phoneBox3","phoneBox5");
			classReplace(".phoneBox .nr","nr1","nr3","nr5");
			classReplace(".bg_white","bg_white3","bg_white5");
			classReplace("#mainBox-left","mainBox-left3","mainBox-left5");
			classReplace(".otherOptions","otherOptions3","otherOptions5");
			classReplace("#user","user3","user5");
			classReplace("#userlogo","userlogo3","userlogo5");
			classReplace("#pageinfo","pageinfo3","pageinfo5");
			classReplace(".miniPage","miniPage3","miniPage5");
			classReplace("#code","code3","code5");
			classReplace("#author","author3","author5");
			classReplace("#conbox","conbox3","conbox5");
			classReplace("#horizon-screen .miniPageElli","miniPageElli3","miniPageElli5");
			classReplace("#horizon-screen #horizon-screen-box","horizon-screen-box3","horizon-screen-box5");
			classReplace("#close","close3","close5");
			classReplace("#screen_panel","screen_panel3","screen_panel5");
			classReplace(".ctrl_panel","ctrl_panel3","ctrl_panel5");
		}else{
			classReplace(".phone_panel","phone_panel1","phone_panel5","phone_panel3");
			classReplace(".phoneBox","phoneBox1","phoneBox5","phoneBox3");
			classReplace(".phoneBox .nr","nr1","nr5","nr3");
			classReplace(".bg_white","bg_white5","bg_white3");
			classReplace("#mainBox-left","mainBox-left","mainBox-left3");
			classReplace(".otherOptions","otherOptions5","otherOptions3");
			classReplace("#user","user5","user3");
			classReplace("#userlogo","userlogo5","userlogo3");
			classReplace("#pageinfo","pageinfo5","pageinfo3");
			classReplace(".miniPage","miniPage5","miniPage3");
			classReplace("#code","code5","code3");
			classReplace("#author","author5","author3");
			classReplace("#conbox","conbox5","conbox3");
			classReplace("#horizon-screen .miniPageElli","miniPageElli5","miniPageElli3");
			classReplace("#horizon-screen #horizon-screen-box","horizon-screen-box5","horizon-screen-box3");
			classReplace("#close","close5","close3");
			classReplace("#screen_panel","screen_panel5","screen_panel3");
			classReplace(".ctrl_panel","ctrl_panel5","ctrl_panel3");
		}
	}else{
		/*alert("手机");*/
		classReplace(".phone_panel","phone_panel5","phone_panel3","phone_panel1");
		classReplace(".phoneBox","phoneBox5","phoneBox3","phoneBox1");
		classReplace(".phoneBox .nr","nr5","nr3","nr1");
	}

	jQuery.support.cors = !0, eqShow.bootstrap = function () {
		var a = jsondata;
		parseJson(a, !1)
	}, eqShow.bootstrapWithPassword = function () {
		function a() {
			$("#verifyTip").addClass("shake").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
				$(this).removeClass("shake"), c()
			})
		}

		function b(b) {
			$("#loading").show(), $.ajax({
				type: "GET",
				url: g,
				data: $.param({
					password: b
				}),
				xhrFields: {
					withCredentials: !0
				},
				success: function (b) {
					200 === b.code ? (b.obj = b.obj || window.scene, $("#verifyCode").remove(), parseJson(b, !0)) : ($("#loading").hide(), $("#verifyCode").show(), a())
				},
				crossDomain: !0
			})
		}

		function c() {
			$(".password-indicator li").each(function (a, b) {
				a < o.length ? $(b).addClass("active") : $(b).removeClass("active")
			})
		}

		function d(a) {
			var d = $(a.target);
			d.addClass("active"), o += d.text(), c(), 4 == o.length && (b(o), o = ""), setTimeout(function () {
				d.removeClass("active")
			}, 100)
		}

		function e(a) {
			o = "", c()
		}

		function f(a) {
			o && (o = o.substring(0, o.length - 1), c())
		}

		var g = getRequestUrl();
		if ($("#loading").hide(), $("#verifyCode").show(), window.scene) {
			var h = {
				name: window.scene.name,
				cover: window.scene.cover,
				description: window.scene.description
			};
			bindShare({
				obj: h
			})
		}
		var i = mobilecheck(),
			j = tabletCheck();
		if(!i || i && /Android (\d+\.\d+)/.test(navigator.userAgent)){
			$(".password-numbers>span").on("click", d);
			$("#btnClear").on("click", e);
			$("#btnCancel").on("click", f);
		}else{
			$(".password-numbers>span").on("touchstart", d);
			$("#btnClear").on("touchstart", e);
			$("#btnCancel").on("touchstart", f);
		}

		if (i || j) {
			var k, l = $(".container"),
				m = l.width(),
				n = l.height();
			k = Math.floor(10 * Math.min(document.documentElement.clientHeight / n, document.documentElement.clientWidth / m)) / 10, l.css("transform", "scale(" + k + ", " + k + ")")
		}
		var o = ""
	}
}(window, jQuery), $(".main").show(), $.easing.jswing = $.easing.swing, $.extend($.easing, {
	def: "easeOutQuad",
	swing: function (a, b, c, d, e) {
		return $.easing[$.easing.def](a, b, c, d, e)
	},
	easeInQuad: function (a, b, c, d, e) {
		return d * (b /= e) * b + c
	},
	easeOutQuad: function (a, b, c, d, e) {
		return -d * (b /= e) * (b - 2) + c
	},
	easeInOutQuad: function (a, b, c, d, e) {
		return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
	},
	easeInCubic: function (a, b, c, d, e) {
		return d * (b /= e) * b * b + c
	},
	easeOutCubic: function (a, b, c, d, e) {
		return d * ((b = b / e - 1) * b * b + 1) + c
	},
	easeInOutCubic: function (a, b, c, d, e) {
		return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
	},
	easeInQuart: function (a, b, c, d, e) {
		return d * (b /= e) * b * b * b + c
	},
	easeOutQuart: function (a, b, c, d, e) {
		return -d * ((b = b / e - 1) * b * b * b - 1) + c
	},
	easeInOutQuart: function (a, b, c, d, e) {
		return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
	},
	easeInQuint: function (a, b, c, d, e) {
		return d * (b /= e) * b * b * b * b + c
	},
	easeOutQuint: function (a, b, c, d, e) {
		return d * ((b = b / e - 1) * b * b * b * b + 1) + c
	},
	easeInOutQuint: function (a, b, c, d, e) {
		return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
	},
	easeInSine: function (a, b, c, d, e) {
		return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
	},
	easeOutSine: function (a, b, c, d, e) {
		return d * Math.sin(b / e * (Math.PI / 2)) + c
	},
	easeInOutSine: function (a, b, c, d, e) {
		return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
	},
	easeInExpo: function (a, b, c, d, e) {
		return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
	},
	easeOutExpo: function (a, b, c, d, e) {
		return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
	},
	easeInOutExpo: function (a, b, c, d, e) {
		return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
	},
	easeInCirc: function (a, b, c, d, e) {
		return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
	},
	easeOutCirc: function (a, b, c, d, e) {
		return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
	},
	easeInOutCirc: function (a, b, c, d, e) {
		return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
	},
	easeInElastic: function (a, b, c, d, e) {
		var f = 1.70158,
			g = 0,
			h = d;
		if (0 == b) return c;
		if (1 == (b /= e)) return c + d;
		if (g || (g = .3 * e), h < Math.abs(d)) {
			h = d;
			var f = g / 4
		} else var f = g / (2 * Math.PI) * Math.asin(d / h);
		return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g)) + c
	},
	easeOutElastic: function (a, b, c, d, e) {
		var f = 1.70158,
			g = 0,
			h = d;
		if (0 == b) return c;
		if (1 == (b /= e)) return c + d;
		if (g || (g = .3 * e), h < Math.abs(d)) {
			h = d;
			var f = g / 4
		} else var f = g / (2 * Math.PI) * Math.asin(d / h);
		return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * (2 * Math.PI) / g) + d + c
	},
	easeInOutElastic: function (a, b, c, d, e) {
		var f = 1.70158,
			g = 0,
			h = d;
		if (0 == b) return c;
		if (2 == (b /= e / 2)) return c + d;
		if (g || (g = e * (.3 * 1.5)), h < Math.abs(d)) {
			h = d;
			var f = g / 4
		} else var f = g / (2 * Math.PI) * Math.asin(d / h);
		return 1 > b ? -.5 * (h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g)) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g) * .5 + d + c
	},
	easeInBack: function (a, b, c, d, e, f) {
		return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c
	},
	easeOutBack: function (a, b, c, d, e, f) {
		return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
	},
	easeInOutBack: function (a, b, c, d, e, f) {
		return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * (b * b * (((f *= 1.525) + 1) * b - f)) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
	},
	easeInBounce: function (a, b, c, d, e) {
		return d - $.easing.easeOutBounce(a, e - b, 0, d, e) + c
	},
	easeOutBounce: function (a, b, c, d, e) {
		return (b /= e) < 1 / 2.75 ? d * (7.5625 * b * b) + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
	},
	easeInOutBounce: function (a, b, c, d, e) {
		return e / 2 > b ? .5 * $.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * $.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
	}
});