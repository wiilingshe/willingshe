!function(a, b) {
	function c(a) {
		function b(a, b, c) {
			return a[b] || (a[b] = c())
		}
		var c = b(a, "eqShow", Object);
		return b(c, "templateParser", function() {
			var a = {};
			return function(c, d) {
				if ("hasOwnProperty" === c){
					throw new Error("hasOwnProperty is not a valid name");
				}
				return d && a.hasOwnProperty(c) && (a[c] = null), b(a, c, d)
			}
		})
	}
	function d(b) {
		templateParser = c(a)
	}
	var e = a.eqShow || (a.eqShow = {});
	d(e)
}(window, document);

!function() {
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
					for (var b = r.length; b--; ){
						r[b].draw(), r[b].update(b);
					}
					for (var b = s.length; b--; ){
						s[b].draw(), s[b].update(b);
					}
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
				for (this.x = a, this.y = b, this.sx = a, this.sy = b, this.tx = c, this.ty = d, this.distanceToTarget = h(a, b, c, d), this.distanceTraveled = 0, this.coordinates = [], this.coordinateCount = 3; this.coordinateCount--; ){
					this.coordinates.push([this.x, this.y]);
				}
				this.angle = Math.atan2(d - b, c - a), this.speed = 10, this.acceleration = 1.05, this.brightness = g(50, 120)
			}
			function j(a, b) {
				for (this.x = a, this.y = b, this.coordinates = [], this.coordinateCount = 5; this.coordinateCount--; ){
					this.coordinates.push([this.x, this.y]);
				}
				this.angle = g(0, 2 * Math.PI), this.speed = g(1, 10), this.friction = .95, this.gravity = 1, this.hue = g(t - 100, t + 100), this.brightness = g(20, 80), this.alpha = 1, this.decay = g(.01, .015)
			}
			function k(a, b) {
				for (var c = 100; c--; ){
					s.push(new j(a, b))
				}
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
			1 == c && playVideo(b), 
			$('<canvas id="fireworks' + c + '"></canvas>').prependTo("#page" + c).css({
				position: "absolute",
				zIndex: 1
			});
			l = document.getElementById("fireworks" + c), 
			m = l.getContext("2d"), 
			l.width = p, 
			l.height = q, 
			f();
			i.prototype.update = function(a) {
				this.coordinates.pop(), 
				this.coordinates.unshift([this.x, this.y]), 
				this.speed *= this.acceleration;
				var b = Math.cos(this.angle) * this.speed, 
					c = Math.sin(this.angle) * this.speed;
				this.distanceTraveled = h(this.sx, this.sy, this.x + b, this.y + c), 
				this.distanceTraveled >= this.distanceToTarget ? (k(this.tx, this.ty), r.splice(a, 1)) : (this.x += b, this.y += c);

			}, i.prototype.draw = function() {
				m.beginPath(), 
				m.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]), 
				m.lineTo(this.x, this.y), 
				m.strokeStyle = "hsl(" + t + ", 100%, " + this.brightness + "%)", 
				m.stroke(), 
				m.beginPath(), 
				m.arc(this.tx, this.ty, 0, 0, 2 * Math.PI), 
				m.stroke()

			}, j.prototype.update = function(a) {
				this.coordinates.pop(), 
				this.coordinates.unshift([this.x, this.y]), 
				this.speed *= this.friction, 
				this.x += Math.cos(this.angle) * this.speed, 
				this.y += Math.sin(this.angle) * this.speed + this.gravity, 
				this.alpha -= this.decay, 
				this.alpha <= this.decay && s.splice(a, 1)

			}, j.prototype.draw = function() {
				m.beginPath(), 
				m.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]), 
				m.lineTo(this.x, this.y), 
				m.strokeStyle = "hsla(" + this.hue + ", 100%, " + this.brightness + "%, " + this.alpha + ")", 
				m.stroke()

			}
		}
	}
}();

!function(a) {
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
		for (var b = $(a).find("a[data]"), c = 0; c < b.length; c++){
			if (b[c] && "view" == i.mode) {
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
	}
	function g(a, b) {
		if (b.trigger) {
			var c = $(a);
			j && clearTimeout(j);
			b.trigger.sends && b.trigger.sends.length && $.each(b.trigger.sends, function(a, b) {
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
			0 == b.sound.src.indexOf("http://") ? b.sound.src = b.sound.src : b.sound.src = PREFIX_FILE_HOST + b.sound.src;
			utilSound.addAudio(a, b.sound.src), c.click(function() {
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
				var e = $('<li comp-drag comp-rotate class="comp-resize comp-rotate inside" id="inside_' + a.id + '" num="' + a.num + '" ctype="' + a.type + '"></li>');
				
				3 != ("" + a.type).charAt(0) && 1 != ("" + a.type).charAt(0) && e.attr("comp-resize", ""), 
				"p" == ("" + a.type).charAt(0) && e.removeAttr("comp-rotate"), 
				1 == ("" + a.type).charAt(0) && e.removeAttr("comp-drag"), 
				2 == ("" + a.type).charAt(0) && e.addClass("wsite-text"), 
				"x" == ("" + a.type).charAt(0) && e.addClass("show-text"), 
				4 == ("" + a.type).charAt(0) && (a.properties.imgStyle && $(c).css(a.properties.imgStyle), e.addClass("wsite-image")), 
				"n" == ("" + a.type).charAt(0) && e.addClass("wsite-image"), 
				"h" == ("" + a.type).charAt(0) && e.addClass("wsite-shape"), 
				5 == ("" + a.type).charAt(0) && e.addClass("wsite-input"), 
				6 == ("" + a.type).charAt(0) && e.addClass("wsite-button"), 
				8 == ("" + a.type).charAt(0) && e.addClass("wsite-button"), 
				"v" == ("" + a.type).charAt(0) && e.addClass("wsite-video"), 
				e.mouseenter(function() {
					$(this).addClass("inside-hover")
				}), e.mouseleave(function() {
					$(this).removeClass("inside-hover")
				});
				if ("edit" == i.mode || "x" != ("" + a.type).charAt(0)) {
					var f = $('<div class="element-box">').append($('<div class="element-box-contents">').append(c));
					e.append(f), 5 != ("" + a.type).charAt(0) && 6 != ("" + a.type).charAt(0) && "r" != a.type && "c" != a.type && "a" != a.type && "8" != a.type && "l" != a.type && "s" != a.type && "i" != a.type && "h" != a.type || "edit" != b || $(c).before($('<div class="element" style="position: absolute; height: 100%; width: 100%;z-index: 1;">'))
				}
				if (a.css) {
					var g = 320 - parseInt(a.css.left);
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
					}), (0 === a.css.boxShadowSize || "0" == a.css.boxShadowSize) && (a.css.boxShadow = "rgba(0,0,0,0) 0 0 0");

					if ("edit" != i.mode && "x" == ("" + a.type).charAt(0)){
						e.append(c), e.find(".element-box").css({
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
					}), 4 != ("" + a.type).charAt(0) && "n" != ("" + a.type).charAt(0) && "p" != ("" + a.type).charAt(0) && "h" != ("" + a.type).charAt(0) && $(c).css({
						width: a.css.width,
						height: a.css.height
					});
					if ("h" == ("" + a.type).charAt(0)) {
						$(c).find("g").length ? $(c).find("g").attr("fill", a.css.color) : $(c).children().attr("fill", a.css.color);
						f.children(".element-box-contents").css("position", "relative");
					}
					"i" == ("" + a.type).charAt(0) && "d" != ("" + a.type).charAt(0) && (e.find(".counter-lr").find(".icon").css("line-height", parseInt(a.css.height) + "px"))
				}

				return e
			}
		}
		function c(a) {
			for (var b = 0; b < a.length - 1; b++) {
				for (var c = b + 1; c < a.length; c++) {
					if (a[b].css && a[c].css && (parseInt(a[b].css.zIndex, 10) > parseInt(a[c].css.zIndex, 10))) {
						var d = a[b];
						a[b] = a[c], a[c] = d
					}
				}
			}
			for (var e = 0; e < a.length; e++) {
				if (a[e].css && !isNaN(parseInt(a[e].css.zIndex))) {
					a[e].css.zIndex = e + 1 + "";
				}
			}
			return a
		}
		function d(a, d, e) {
			d = d.find(".edit_area");
			var f, i = a.elements;
			if (i){
				for (i = c(i), f = 0; f < i.length; f++){
					if (i[f].sceneId = a.sceneId, 3 == i[f].type) {
						var j = l[("" + i[f].type).charAt(0)](i[f], d);
						"edit" == e && m[("" + i[f].type).charAt(0)] && m[("" + i[f].type).charAt(0)](j, i[f])
					} else {
						var k = b(i[f], e);
						if (!k){
							continue;
						}
						d.append(k);
						for (var p = 0; p < o.length; p++){
							o[p](k, i[f], e);
						}
						n[("" + i[f].type).charAt(0)] && (n[("" + i[f].type).charAt(0)](k, i[f]), "edit" != e && (g(k, i[f]), h(k, i[f])));
						"edit" == e && m[("" + i[f].type).charAt(0)] && m[("" + i[f].type).charAt(0)](k, i[f]);
					}
				}
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
				var b = $('<div class="edit_wrapper"  data-scene-id="' + a.def.sceneId + '"><div class="edit_areaBox" comp-resize ><ul eqx-edit-destroy id="edit_area' + a.def.id + '" comp-droppable paste-element class="edit_area weebly-content-area weebly-area-active"></ul></div><div class="box" outer-box><div class="internal-box"></div></div></div>'), 
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
			for (c in d){
				b.style[c] = d[c]
			}
		}
		if (a.properties.labels){
			for (var e = a.properties.labels, f = 0; f < e.length; f++){
				$('<a class = "label_content" style = "display: inline-block;">').appendTo($(b)).html(e[f].title).css(e[f].color).css("width", 100 / e.length + "%");
			}
		}
		return b
	}), i.addComponent("2", function(a) {
		var b = document.createElement("div");
		b.id = a.id, 
		b.setAttribute("ctype", a.type), 
		b.setAttribute("class", "element comp_paragraph editable-text"), 
		a.content && (b.innerHTML = a.content), 
		b.style.cursor = "default";

		return b
	}), i.addComponent("x", function(a) {
		var b;
		if (!mobilecheck() && window.top == window && $(".create_left").get(0) && (i.mode = "edit"), "edit" == i.mode){
			b = document.createElement("div"), 
			b.id = a.id, 
			b.setAttribute("ctype", a.type), 
			b.setAttribute("class", "element comp_paragraph editable-text"), 
			a.content && (b.innerHTML = a.content), 
			b.style.cursor = "default";

		}else{
			var b = '<div class="element-box"><img src="' + a.properties.dataUrl + '"></div>';
		}
		return b
	}), i.addComponent("3", function(a, b) {
		var pageHeight;
		(sessionStorage.getItem("longpageID") == a.pageId) && (pageHeight = sessionStorage.getItem("longpageHeight"));
		var c, d = document.createElement("div");
		d.setAttribute("id", i.def.id), d.setAttribute("class", "wrapper-background"), $(d).prependTo(b.parent()).css({
			height: pageHeight ? pageHeight : 486
		});
		var e, f = new Image;
		if(a.properties.imgSrc){
			e = a.properties.imgSrc;
			if(/^http.*!/.test(e)){
				f.src = e;
				d.style.backgroundImage = "url(" + e + ")";
			}else{
				f.src = PREFIX_FILE_HOST + "/" + e;
				d.style.backgroundImage = "url(" + PREFIX_FILE_HOST + "/" + e + ")";
			}
			d.style.backgroundOrigin = "element content-box";
			if(a.properties.id == 0){
                d.style.backgroundSize = "contain";
            }else{
                d.style.backgroundSize = "cover";
            }
			d.style.backgroundPosition = "50% 50%";
			d.style.backgroundRepeat = "no-repeat";
			a.effect && ("scaleUp" == a.effect.type ? $(d).css({
				animation: "scaleUp 7s ease 1s",
				"animation-fill-mode": "both"
			}) : "scaleDown" == a.effect.type && $(d).css({
				animation: "scaleDown 7s ease 1s",
				"animation-fill-mode": "both"
			}))
		}else{
			a.properties.bgColor && (d.style.backgroundColor = a.properties.bgColor);
		}

		return d;
	}),i.addComponent("4", function(a) {
			if(a.properties.src){
				var b = document.createElement("img");
				b.id = a.id;
				b.setAttribute("ctype", a.type);
				b.setAttribute("class", "element comp_image editable-image");
				/^http.*/.test(a.properties.src) ? b.src = a.properties.src : b.src = PREFIX_FILE_HOST + a.properties.src;

				return b
			}
			
		}),i.addComponent("m", function(a) {
		//拼接百度地图标签
		var b = document.createElement("div");
		b.id = a.id, 
		b.setAttribute("ctype", a.type), 
		b.setAttribute("class", "element comp_image editable-image"), 
		b.setAttribute("style", "background: url(" + a.properties.mapSrc + ") no-repeat center center");

		return b;
	}), i.addComponent("h", function(a) {
		/*'<defs fill="rgba(199,101,101,1)">' + 
				'<filter id="f1" x="-50%" y="-50%" width="200%" height="200%">' + 
					'<feOffset result="offOut" in="SourceAlpha" dx="0" dy="0"></feOffset>' + 
					'<feGaussianBlur result="blurOut" in="offOut" stdDeviation="5"></feGaussianBlur>' +
					'<feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>' + 
				'</filter>'  +
			'</defs>'*/
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
			c.setAttribute("fill", "#555");
			b.appendChild(c);
			s = eqxiuSvg.boundingBox(c);
			viewBox = [Math.round(s.x) || 0, Math.round(s.y) || 0, Math.round(s.width) || 32, Math.round(s.height) || 32].join(" ");
			b.setAttribute("viewBox", viewBox);

			return b
		}
		b = document.createElement("div"), 
		c = eqxiuSvg.ShapeFromType(a.properties.type, 100, 100, a.id, a.css.color), 
		b = '<svg id="' + a.id + '" class="element svg-element" ctype="' + a.type + '" xmlns="' + eqxiuSvg.NAMESPACE + '" version="1.1" width="100%" height="100%" preserveAspectRatio="xMidYMid" viewBox="' + a.properties.viewBox + '">' + c + "</svg>";

		return b;
	}), i.addComponent("v", function(a) {
		var b = document.createElement("div");
		var c = document.createElement("a");
		$(c).appendTo($(b));
		b.setAttribute("class", "element video_area"), 
		c.setAttribute("class", "element video_box"), 
		b.id = a.id, 
		b.setAttribute("ctype", a.type), 
		a.properties.src && b.setAttribute("videourl", a.properties.src);

		return b
	}), i.addComponent("5", function(a) {
		var b = document.createElement("input");
		b.id = a.id, 
		b.setAttribute("ctype", a.type), 
		b.setAttribute("class", "element comp_input editable-text"), 
		b.setAttribute("maxlength", "300"), 
		a.properties.required && b.setAttribute("required", a.properties.required), 
		a.properties.placeholder && b.setAttribute("value", a.properties.placeholder), 
		b.setAttribute("name", "eq[f_" + a.id + "]"), 
		b.style.width = "100%";
		b.style.color = a.css.color;

		return b;
	}), i.addComponent("r", function(a) {
		var b = $('<div class="element comp_radio editable-text" id="' + a.id + '"></div>');
		b.attr("ctype", a.type), 
		b.attr("required", a.properties.required), 
		b.attr("title", a.title), 
		b.attr("name", "eq[f_" + a.id + "]");

		var c = $('<div class="radio-title">' + a.title + " (单选)</div>");
		a.properties.titleStyle && c.css(a.properties.titleStyle), b.append(c);
		var d = $('<div class="options"></div>'), 
		e = JSON.parse(a.choices);
		$.each(e.options, function(b, c) {
			var f = $('<div class="option-group"><label class="option-label" for="' + (a.id + "" + (b + 1)) + '"><input class="option" id="' + (a.id + "" + (b + 1)) + '" type="radio" name="eq[f_' + a.id + ']" value="' + c.id + '">' + c.label + "</label></div>");
			a.properties.optionStyle && b < e.options.length - 1 && f.css(a.properties.optionStyle);
			d.append(f);
		}), 
		b.append(d);
		b.width("100%");

		return b.get(0);
	}), i.addComponent("c", function(a) {
		var b = $('<div class="element comp_radio editable-text" id="' + a.id + '"></div>');
		b.attr("ctype", a.type), 
		b.attr("required", a.properties.required), 
		b.attr("title", a.title), 
		b.attr("name", "eq[f_" + a.id + "]");

		var c = $('<div class="radio-title">' + a.title + " (可多选)</div>");
		a.properties.titleStyle && c.css(a.properties.titleStyle), b.append(c);
		var d = $('<div class="options"></div>'), 
		e = JSON.parse(a.choices);
		$.each(e.options, function(b, c) {
			var f = $('<div class="option-group"><label class="option-label" for="' + (a.id + "" + (b + 1)) + '"><input class="option" id="' + (a.id + "" + (b + 1)) + '" type="checkbox" name="eq[f_' + a.id + ']" value="' + c.id + '">' + c.label + "</label></div>");
			a.properties.optionStyle && b < e.options.length - 1 && f.css(a.properties.optionStyle);
			d.append(f)

		});
		b.append(d);
		b.width("100%");

		return b.get(0);
	}), i.addComponent("a", function(a) {
		var b = $('<div class="element comp_rating editable-text" id="' + a.id + '"></div>');
		b.attr("ctype", a.type), 
		b.attr("required", a.properties.required), 
		b.attr("title", a.title), 
		b.attr("name", "eq[f_" + a.id + "]"), 
		b.append($('<div class="rating-title">' + a.title + "</div>"));

		for (var c = $('<div class="rating-icons"></div>'), d = 0; 5 > d; d++){
			c.append($('<i class="' + a.properties.icon + "-line " + a.properties.size + '">').css("color", a.properties.color));
		}
		b.append(c), 
		b.append($('<input type="hidden" name="eq[f_' + a.id + ']" value="">')), 
		b.width("100%");

		return b.get(0)
	}), i.addComponent("p", function(a) {
		if (a.properties && a.properties.children) {
			var c = a.css.width, 
				d = a.css.height, 
				e = $('<div id="' + a.id + '" class="slider element" ctype="' + a.type + '"></div>');
			a.properties.bgColor && e.css("backgroundColor", a.properties.bgColor);
			$.each(a.properties.children, function(a, f) {
				var g = b(f.width, f.height, c, d), 
				h = $('<img src="' + PREFIX_FILE_HOST + f.src + '">');
				h.css({
					margin: (d - g.height) / 2 + "px " + (c - g.width) / 2 + "px",
					width: g.width,
					height: g.height
				}), e.append(h)
			});
			utilPictures.deleteInterval(a.id);

			return e.get(0)
		}
	}), i.addComponent("n", function(a) {
		if (a.properties && a.properties.pics.length) {
			var b = (a.css.width, a.css.height, $('<div id="' + a.id + '" class="random-event element comp_image editable-image" ctype="' + a.type + '"></div>'));
			$.each(a.properties.pics, function(a, c) {
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
				}));
				b.append(d)
			});

			return b.get(0)
		}
	}), i.addComponent("6", function(a) {
		var b = document.createElement("button");
		b.id = a.id, 
		b.setAttribute("ctype", a.type), 
		b.setAttribute("class", "element comp_button editable-text");

		if (a.properties.title) {
			var c = a.properties.title.replace(/ /g, "&nbsp;");
			b.innerHTML = c
		}
		b.style.width = "100%";

		return b;
	}), i.addComponent("t", function(a) {
		var b = document.createElement("button");
		b.id = a.id, 
		b.setAttribute("ctype", a.type), 
		b.setAttribute("class", "element comp_button editable-text");

		if (a.properties.title) {
			var c = a.properties.title.replace(/ /g, "&nbsp;");
			b.innerHTML = c
		}
		b.style.width = "100%";

		return b
	}), i.addComponent("8", function(a) {
		var b = document.createElement("a");
		b.id = a.id, 
		b.setAttribute("ctype", a.type), 
		b.setAttribute("class", "element comp_anchor editable-text");
		var c = null;
		if(a.properties.imgSrc){
			c = $('<img style="width: 100%; height: 100%;" src="' + (PREFIX_FILE_HOST + a.properties.imgSrc) + '"></img>');
			$(b).html(c);
			"view" == i.mode && $(b).attr("href", "tel:" + a.properties.number);

		}else if(a.properties.title){
			c = a.properties.title.replace(/ /g, "&nbsp;");
			$(b).html(c);
			"view" == i.mode && $(b).attr("href", "tel:" + a.properties.number);
		}
		b.style.cursor = "default";
		b.style.width = "100%";

		return b;
	}), i.addComponent("l", function(a) {
		var b = document.createElement("a");
		b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_anchor editable-text");
		var c = null;
		if(a.properties.imgSrc){
			c = $('<img style="width: 100%; height: 100%;" src="' + (PREFIX_FILE_HOST + a.properties.imgSrc) + '"></img>');
			$(b).html(c);
		}else if(a.properties.title){
			c = a.properties.title.replace(/ /g, "&nbsp;");
			$(b).html(c);
		}
		b.style.cursor = "default";
		b.style.width = "100%";

		return b;
	}), i.addComponent("s", function(a) {
		var b = document.createElement("a");
		b.id = a.id, b.setAttribute("ctype", a.type), b.setAttribute("class", "element comp_anchor editable-text");
		var c = null;
		if(a.properties.imgSrc){
			c = $('<img style="width: 100%; height: 100%;" src="' + (PREFIX_FILE_HOST + a.properties.imgSrc) + '"></img>');
			$(b).html(c);
		}else if(a.properties.title){
			c = a.properties.title.replace(/ /g, "&nbsp;");
			$(b).html(c);
		}
		b.style.cursor = "default";
		b.style.width = "100%";

		return b
	}), i.addComponent("i", function(b) {//计数
		var c = $('<div class="element comp_counter not-voted editable-text" id="' + b.id + '"></div>');
		c.attr("ctype", b.type), 
		c.attr("name", "eq[f_" + b.id + "]"), 
		c.addClass(b.properties.layout).addClass(b.properties.size);

		var d = $('<div class="counter-container"></div>');
		b.properties.imgSrc ? d.append($('<img class="counter-elem counter-icon" style="width: 115px; height: 115px; margin: 0 auto;" src="' + (PREFIX_FILE_HOST + b.properties.imgSrc) + '"></img>')) : d.append($('<i class="counter-elem icon iconfont ' + b.properties.icon + '"></i>').css("color", b.properties.color));
		var e = $('<span class="counter-elem counter-number">0</span>').css("color", b.properties.color);
		d.append(e), 
		"view" == i.mode ? a.counterValues && a.counterValues.then(function(c) {
			var d = c.map[b.id] || 0;
			e.attr("data-counter-number", d);
			var f = a.fixedNum(d);
			e.text(f)
		}) : c.removeClass("not-voted");
		c.width("100%");

		if ("counter-tb" === b.properties.layout) {
			var f = 0;
			if(b.properties.imgSrc){
				f = "counter-l" == b.properties.size ? 77 : ("counter-m" == b.properties.size ? 71 : 66)
			}else{
				f = "counter-l" == b.properties.size ? 30 : ("counter-m" == b.properties.size ? 20 : 15)
			}
			d.css("margin-top", -f);
		}
		"edit" != i.mode && setTimeout(function() {
			var a = {
				width: "auto",
				"min-width": b.css.width
			};
			c.css(a);
			c.parents("li.comp-resize").css(a);
		}, 100);
		c.append(d);
		b.css.lineHeight && c.css("line-height", b.css.lineHeight);

		return c.get(0)
	}), i.addComponent("d", function(b) {
		var c = $('<div class="element comp_counter editable-text" id="' + b.id + '"></div>');
		c.attr("ctype", b.type), 
		c.addClass(b.properties.layout).addClass(b.properties.size);

		var d = $('<div class="counter-container"></div>');
		d.append($('<i class="counter-elem icon iconfont ' + b.properties.icon + '"></i>').css("color", b.properties.color));

		var e = $('<span class="counter-elem counter-number">0</span>').css("color", b.properties.color);
		d.append(e);

		"view" == i.mode && a.showCount && a.showCount.then(function(b) {
			var c = a.fixedNum(b), 
			d = c || 0;
			e.text(d)
		}), c.width("100%");

		if ("counter-tb" === b.properties.layout) {
			var f = 0;
			f = "counter-l" == b.properties.size ? 30 : "counter-m" == b.properties.size ? 20 : 15;
			d.css("margin-top", -f);
		}
		c.append(d);
		b.css.lineHeight && c.css("line-height", b.css.lineHeight);

		return c.get(0)
	}), i.addComponent("7", function(a) {
		var b = document.createElement("div");
		b.id = "map_" + a.id, 
		b.setAttribute("class", "element comp_map_wrapper"), 
		a.content && (b.textContent = a.content);

		if (a.css) {
			var c, d = a.css;
			for (c in d)
				b.style[c] = d[c]
		}
		b.style.height = "250px";

		return b;
	}), i.bindAfterRenderEvent("1", function(a, b) {
		a = $("div", a)[0];
		if ("view" == i.mode && 1 == b.type) {
			var c = b.properties.labels;
			for (key in c){
				!
				function(b) {
					$($(a).find(".label_content")[b]).on("click", function() {
						pageScroll(c[b])
					})
				}(key)
			}
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
					success: function(a) {
					}
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
		a = $("a", a)[0], "view" == i.mode && $(a).click(function(a) {
		})
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
	}), i.bindAfterRenderEvent("m", function(a, b) { //添加百度地图类型函数，暂不知道何用
		c(a, b)
	}), i.bindAfterRenderEvent("x", function(a, b) {
		c(a, b)
	}), i.bindAfterRenderEvent("n", function(a, b) {
	}), i.bindAfterRenderEvent("h", function(a, b) {
		"view" == i.mode && b.properties.url && $(a).click(function(a) {
			var c = b.properties.url;
			isNaN(c) ? window.open(c) : eqxiu.pageScroll(c)
		})
	}), i.bindAfterRenderEvent("5", function(a, b) {
		var c = mobilecheck();
		d($(a).find("textarea")), 
		e($(a).find("textarea")), 
		"view" == i.mode && c && parseFloat(b.css.top) >= 200 && ($(a).find("textarea").focus(function(b) {
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
			$(a).hide();
			$("#audio_btn").hasClass("video_exist") && ($("#audio_btn").hide(), $("#media")[0].pause());
			utilSound.pause();
			$('<div class="video_mask page_effect lock" id="mask_' + b.id + '"></div>').appendTo($(a).closest(".m-img"));
			$('<a class = "close_mask" id="close_' + b.id + '"></a>').appendTo($(a).closest(".m-img"));
			$(b.properties.src).appendTo($("#mask_" + b.id)).attr("style", "position: absolute;top:0; min-height: 45%; max-height: 100%; top: 20%;").attr("width", "100%").removeAttr("height");
			$("#close_" + b.id).bind("click", function() {
				$(a).show();
				$("#mask_" + b.id).remove();
				$("#close_" + b.id).remove();
				$("#audio_btn").hasClass("video_exist") && $("#audio_btn").show(function() {
					$("#media")[0].play();
				})
			})
		})
	}), i.bindAfterRenderEvent("2", function(a, b) {
		f(a)
	}), i.bindAfterRenderEvent("6", function(a, b) {
		a = $("button", a)[0];
		if ("view" == i.mode) {
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
						if ("required" == $(this).attr("required") && "" == $(this).val().trim()){
							return layer.alert($(this).attr("placeholder") + c.REQUIRED), void (e = !1);
						}
						if ("502" == $(this).attr("ctype") && "" !== $(this).val().trim()) {
							var a = new RegExp(/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/g);
							if (!a.test($(this).val())){
								return layer.alert("手机号码格式错误！"), void (e = !1)
							}
						}
						if ("503" == $(this).attr("ctype") && "" !== $(this).val().trim()) {
							var b = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g);
							if (!b.test($(this).val())){
								return layer.alert("邮箱格式错误！"), void (e = !1)
							}
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
					if ($.isEmptyObject(f)){
						return void (g = !0);
					}
					for (var h in f){
						if ("" !== f[h]) {
							g = !0;
							break
						}
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
				var b, 
					c = $(a).parents(".edit_wrapper").attr("data-scene-id");
				b = c ? $(a).parents(".nr").find('.edit_wrapper[data-scene-id="' + c + '"]') : $(a).parents(".nr");
				d(this, c, b);
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
		e.setLabel(f);
		c.disableDoubleClickZoom();
		c.centerAndZoom(d, 15);

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
					c(a);
					g.val(a + 1);
				}), $(b).bind("mouseenter", function() {
					c(a)
				})
			}), e.find(".rating-icons").bind("mouseleave", function() {
				c(parseInt(g.val(), 10) - 1)
			}), d(e.find(".rating-icons"))
		}
	});
	var j
}(window.eqShow);
!function() {
	eqShow.shakeTrigger = function(a, b) {
		function c(a) {
			var b = a.accelerationIncludingGravity, 
			e = (new Date).getTime();
			if (e - j > 100) {
				var n = parseInt(e - j);
				j = e, 
				f = b.x, 
				g = b.y, 
				h = b.z;

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
				}));
				k = f, 
				l = g, 
				m = h
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
		d.append(e).append(f);
		c && a.obj.property.slideDisplay ? c.append(d.css("display", a.obj.property.slideDisplay)) : $("#nr").append(d.css("display", "block"));
	}
	var g = function() {
		a.obj.property.slideNumber && e && setTimeout(function() {
			var a = $(".z-active").get(0) ? $(".z-active").get(0) : $(".z-current").get(0);
			if (a) {
				var c = $(a).find(".m-img").attr("id").substring(4), 
					g = b.length, 
					h = c / g, 
					i = 100;
				f.text(c + "/" + g);
				e.css("width", parseFloat(d.width()) * h);
				$(a).find(".lock").length && (i = 0), d.css("z-index", i);
			}
		}, 100)
	};
	g();
	b.eq(0).find(".u-arrow-bottom").css("bottom", "30px");
	eqShow.progressInterval = setInterval(function() {
		g()
	}, 300)
}, eqShow.selectElement = function(a) {
	var b;
	return b = $("#inside_" + a, ".phone-view").length ? $("#inside_" + a, ".phone-view") : $("#inside_" + a)
};
